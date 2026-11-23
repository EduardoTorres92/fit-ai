// Corrida, caminhada ou pedalada pelo print: a IA lê a captura de tela (Strava, Garmin, Nike Run, relógio, esteira…)
// e devolve os números para a pessoa conferir antes de salvar. A imagem não é guardada.
// POST /api/corrida  { imagem: "<jpeg em base64>" }  →  { atividade } ou { erro }
// Conta como 1 pergunta do limite diário do Coach.
import Anthropic from "@anthropic-ai/sdk";
import { emailDoToken } from "../lib/dono.mjs";
import { donoNaReq } from "../lib/sessao.mjs";
import { cabeNoLimite, LIMITE_MEMBRO_DIA, LIMITE_VISITANTE_DIA } from "../lib/limite.mjs";

const json = (status, body) => new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" } });
const txt = (v, n) => String(v ?? "").replace(/\s+/g, " ").trim().slice(0, n);
const num = (v, min, max) => { const n = Number(v); return Number.isFinite(n) && n >= min && n <= max ? n : null; };
export const TIPOS_ATIV = ["corrida", "caminhada", "bike", "esteira"];

const FERRAMENTA = {
  name: "salvar_atividade",
  description: "Salva os números da atividade lidos na imagem.",
  input_schema: {
    type: "object",
    properties: {
      legivel: { type: "boolean", description: "false se a imagem não mostra uma atividade com distância ou tempo legíveis." },
      tipo: { type: "string", enum: TIPOS_ATIV, description: "corrida (ao ar livre), caminhada (ou trilha/hike), bike (pedal, ciclismo, bike ergométrica) ou esteira (corrida/caminhada em esteira)." },
      data: { type: "string", description: "Data da atividade em AAAA-MM-DD, só se aparecer na imagem (resolva 'hoje'/'ontem' só se a data de hoje for informada). Omitir se não aparecer." },
      distancia_km: { type: "number", description: "Distância em km (converta milhas: 1 mi = 1,609 km)." },
      tempo_s: { type: "integer", description: "Tempo em movimento (moving time) em segundos; se só houver tempo total, use ele." },
      elevacao_m: { type: "integer", description: "Ganho de elevação em metros, se aparecer." },
      fc_media: { type: "integer", description: "Frequência cardíaca média (bpm), se aparecer." },
      calorias: { type: "integer", description: "Calorias, se aparecer." },
      app: { type: "string", description: "De onde é o print: Strava, Garmin, Nike Run Club, Apple Fitness, Samsung Health, relógio, esteira…" },
      titulo: { type: "string", description: "Nome da atividade como aparece no print (ex.: 'Corrida matinal'), se houver. Curto." },
    },
    required: ["legivel"],
  },
};
const SISTEMA = `Você lê capturas de tela de atividades de corrida, caminhada e ciclismo (Strava, Garmin Connect, Nike Run Club, Apple Fitness, relógios, painel de esteira) e transcreve os números para o app FIT.AI.
- Transcreva só o que está na imagem, sem inventar. Ritmo (min/km) não é tempo: o tempo é a duração da atividade.
- Distância em km e tempo em segundos (ex.: 32:15 = 1935; 1:05:20 = 3920).
- Se a imagem tiver várias atividades, use a mais destacada (a de cima ou a aberta).
- Se não houver atividade legível, chame a ferramenta com legivel = false.
- Responda SEMPRE chamando a ferramenta salvar_atividade.`;

export function limparAtividade(a) {
  if (!a || typeof a !== "object" || a.legivel === false) return null;
  const dist = num(a.distancia_km, 0.05, 500), tempo = num(a.tempo_s, 30, 86400);
  if (!dist && !tempo) return null;
  const tipo = TIPOS_ATIV.includes(a.tipo) ? a.tipo : "corrida", data = /^\d{4}-\d{2}-\d{2}$/.test(String(a.data || "")) ? a.data : null;
  const elev = num(a.elevacao_m, 0, 10000), fc = num(a.fc_media, 40, 230), kcal = num(a.calorias, 1, 10000);
  return { tipo, ...(data ? { data } : {}), ...(dist ? { km: Math.round(dist * 100) / 100 } : {}), ...(tempo ? { tempo: Math.round(tempo) } : {}),
    ...(elev != null ? { elev: Math.round(elev) } : {}), ...(fc ? { fc: Math.round(fc) } : {}), ...(kcal ? { kcal: Math.round(kcal) } : {}),
    ...(txt(a.app, 30) ? { app: txt(a.app, 30) } : {}), ...(txt(a.titulo, 60) ? { titulo: txt(a.titulo, 60) } : {}) };
}

export default async (req, context) => {
  if (req.method !== "POST") return json(405, { erro: "metodo" });
  if (!process.env.ANTHROPIC_API_KEY) return json(500, { erro: "sem_chave" });
  let c;
  try { c = await req.json(); } catch { return json(400, { erro: "json" }); }
  const imagem = String(c.imagem || "").replace(/^data:image\/\w+;base64,/, "");
  if (!/^[A-Za-z0-9+/=]+$/.test(imagem) || imagem.length < 1000 || imagem.length > 1_400_000) return json(400, { erro: "imagem" });
  const hoje = /^\d{4}-\d{2}-\d{2}$/.test(String(c.hoje || "")) ? c.hoje : null;

  const token = (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  const email = await emailDoToken(token).catch(() => null);
  if (!donoNaReq(email, req)) {
    try {
      const quem = email ? `conta:${email}` : context?.ip || "sem-ip";
      if (!(await cabeNoLimite(quem, email ? LIMITE_MEMBRO_DIA : LIMITE_VISITANTE_DIA, 1))) return json(429, { erro: "limite" });
    } catch (e) { console.error("limite indisponível", e?.message); return json(503, { erro: "limite_indisponivel" }); }
  }

  try {
    const r = await new Anthropic().messages.create({
      model: "claude-sonnet-5-5", max_tokens: 800, system: SISTEMA, tools: [FERRAMENTA], tool_choice: { type: "auto" }, // o Sonnet 5.5 não aceita forçar a ferramenta
      messages: [{ role: "user", content: [
        { type: "image", source: { type: "base64", media_type: "image/jpeg", data: imagem } },
        { type: "text", text: `Transcreva a atividade deste print.${hoje ? ` Hoje é ${hoje}.` : ""}` },
      ] }],
    });
    let entrada = r.content.find((b) => b.type === "tool_use")?.input;
    if (!entrada) {
      const t = r.content.filter((b) => b.type === "text").map((b) => b.text).join("");
      try { entrada = JSON.parse(t.slice(t.indexOf("{"), t.lastIndexOf("}") + 1)); } catch {}
    }
    const atividade = limparAtividade(entrada);
    return json(200, atividade ? { atividade } : { erro: "ilegivel" });
  } catch (e) {
    const status = e instanceof Anthropic.APIError ? e.status : 0;
    console.error("corrida erro", status, e?.message);
    return json(200, { erro: status === 429 ? "ocupado" : "ia" });
  }
};

export const config = { path: "/api/corrida" };
