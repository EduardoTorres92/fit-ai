// CrossFit: lê a foto do quadro do WOD ou monta um WOD com o Coach AI.
// POST /api/wod  { acao: "foto", imagem: "<jpeg em base64>" }  |  { acao: "gerar", pedido, perfil }
// Resposta: { wod, mensagem? } ou { erro }. O WOD é conferido aqui antes de voltar para o app.
// Ler a foto ou montar um WOD conta como 2 perguntas do limite diário do Coach.
import Anthropic from "@anthropic-ai/sdk";
import { emailDoToken } from "../lib/dono.mjs";
import { ehEmailDono, donoNaReq } from "../lib/sessao.mjs";
import { cabeNoLimite, LIMITE_MEMBRO_DIA, LIMITE_VISITANTE_DIA } from "../lib/limite.mjs";

const json = (status, body) => new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" } });
const txt = (v, n) => String(v ?? "").replace(/\s+/g, " ").trim().slice(0, n);
const num = (v, min, max) => { const n = Math.round(Number(v)); return Number.isFinite(n) && n >= min ? Math.min(max, n) : null; };
export const TIPOS = ["for_time", "amrap", "emom", "tabata", "intervalos", "forca", "livre"];

const PARTE = {
  type: "object",
  properties: {
    nome: { type: "string", description: "Nome do bloco como no quadro: Aquecimento, Força, Skill, WOD, Metcon, Acessório, Cooldown…" },
    tipo: { type: "string", enum: TIPOS, description: "for_time (completar no menor tempo), amrap (máximo de voltas no tempo), emom (a cada minuto), tabata (20s/10s × 8), intervalos (ex.: 5 × 3 min com descanso), forca (séries de carga, ex.: 5×3 back squat), livre (sem formato)" },
    minutos: { type: "integer", description: "AMRAP/EMOM/intervalos: duração total em minutos. For time: time cap, se houver. Omitir se não houver." },
    rodadas: { type: "integer", description: "For time em voltas (ex.: '5 rounds for time' = 5), séries da força, ou blocos dos intervalos." },
    esquema: { type: "string", description: "Esquema de repetições quando houver, ex.: '21-15-9', '5-5-5-5-5', 'E2MOM'." },
    movimentos: {
      type: "array",
      items: {
        type: "object",
        properties: {
          nome: { type: "string", description: "Nome do movimento em português ou como no quadro (thruster, pull-up, double under, wall ball…). Expanda abreviações comuns: DU = double under, T2B = toes to bar, HSPU = handstand push-up, KB = kettlebell, C2B = chest to bar, MU = muscle up, WB = wall ball, OHS = overhead squat, DL = deadlift, PC = power clean, BJ = box jump." },
          reps: { type: "string", description: "Repetições, distância ou calorias, ex.: '15', '400 m', '12 cal', '30 s'." },
          carga: { type: "string", description: "Carga indicada, ex.: '43/29 kg', '95/65 lb', '70% 1RM', '20/14 lb'. Omitir se não houver." },
        },
        required: ["nome"],
      },
    },
    descricao: { type: "string", description: "Texto curto do bloco como deve ser lido (ex.: 'EMOM 12: min ímpar 12 cal remo, min par 10 burpees'). Útil quando o formato for complexo." },
  },
  required: ["nome", "tipo", "movimentos"],
};
const FERRAMENTA = {
  name: "salvar_wod",
  description: "Salva o WOD estruturado.",
  input_schema: {
    type: "object",
    properties: {
      legivel: { type: "boolean", description: "false se a imagem não tem um treino legível (foto de outra coisa, muito borrada)." },
      titulo: { type: "string", description: "Nome do WOD (ex.: 'Fran', 'Murph', 'Hero WOD Murph') ou um título curto e descritivo (ex.: 'AMRAP 15 · Thruster e Pull-up')." },
      partes: { type: "array", items: PARTE, description: "Os blocos na ordem do quadro." },
      pontuado: { type: "integer", description: "Índice (a partir de 0) do bloco principal que vale como resultado do dia (o WOD/Metcon)." },
      obs: { type: "string", description: "Observações do quadro (escalas, estímulo, dicas). Curto." },
      mensagem: { type: "string", description: "Só no modo gerar: 2 a 4 frases do Coach explicando o estímulo e como escalar." },
    },
    required: ["titulo", "partes"],
  },
};

const SIS_FOTO = `Você lê fotos do quadro (whiteboard) de treino de um box de CrossFit e transcreve o WOD em dados estruturados para o app FIT.AI.
- Transcreva o que está escrito, sem inventar movimentos, repetições ou cargas. Se algo estiver ilegível, deixe de fora.
- Se houver vários WODs no quadro (ex.: dias diferentes, turmas), use o do dia de hoje ou, sem como saber, o mais destacado.
- Cargas masculino/feminino ficam juntas, como no quadro (ex.: '43/29 kg').
- Use o tipo certo de cada bloco e marque em "pontuado" o bloco principal (o metcon que vale como resultado).
- Se não houver treino legível na imagem, chame a ferramenta com legivel = false e partes vazias.
- Responda SEMPRE chamando a ferramenta salvar_wod.`;
const SIS_GERAR = `Você é o Coach AI do FIT.AI e programa WODs de CrossFit como um coach experiente (L2).
- Monte um treino do dia completo e realista: Aquecimento (5–10 min), um bloco de Força ou Skill quando fizer sentido, e o WOD (metcon) principal. Cooldown opcional.
- Respeite o nível, o equipamento, o tempo e as limitações informadas. Sem equipamento: só peso do corpo e corrida.
- Benchmarks conhecidos (Fran, Cindy, Grace, Helen, Murph…) podem aparecer quando combinarem com o pedido.
- Cargas no padrão masculino/feminino em kg (ex.: '43/29 kg'), com escala na mensagem.
- Use o tipo certo de cada bloco e marque em "pontuado" o WOD principal.
- A mensagem tem 2 a 4 frases, em português do Brasil, tom de coach parceiro: estímulo pretendido e como escalar.
- Você não é médico; dor ou lesão séria → procurar um profissional.
- Responda SEMPRE chamando a ferramenta salvar_wod.`;

export function limparWod(w) {
  if (!w || typeof w !== "object" || w.legivel === false) return null;
  const partes = (Array.isArray(w.partes) ? w.partes : []).slice(0, 8).map((p) => {
    const movimentos = (Array.isArray(p?.movimentos) ? p.movimentos : []).slice(0, 15).map((m) => ({
      nome: txt(m?.nome, 60), ...(txt(m?.reps, 30) ? { reps: txt(m.reps, 30) } : {}), ...(txt(m?.carga, 30) ? { carga: txt(m.carga, 30) } : {}),
    })).filter((m) => m.nome);
    const descricao = txt(p?.descricao, 300);
    if (!movimentos.length && !descricao) return null;
    const minutos = num(p?.minutos, 1, 120), rodadas = num(p?.rodadas, 1, 100);
    return { nome: txt(p?.nome, 30) || "WOD", tipo: TIPOS.includes(p?.tipo) ? p.tipo : "livre",
      ...(minutos ? { minutos } : {}), ...(rodadas ? { rodadas } : {}), ...(txt(p?.esquema, 40) ? { esquema: txt(p.esquema, 40) } : {}),
      movimentos, ...(descricao ? { descricao } : {}) };
  }).filter(Boolean);
  if (!partes.length) return null;
  let pontuado = num(w.pontuado, 0, partes.length - 1);
  if (pontuado == null) { const i = partes.findIndex((p) => ["for_time", "amrap", "emom", "tabata", "intervalos"].includes(p.tipo)); pontuado = i >= 0 ? i : partes.length - 1; }
  return { titulo: txt(w.titulo, 60) || partes[pontuado].nome, partes, pontuado, ...(txt(w.obs, 300) ? { obs: txt(w.obs, 300) } : {}) };
}

export default async (req, context) => {
  if (req.method !== "POST") return json(405, { erro: "metodo" });
  if (!process.env.ANTHROPIC_API_KEY) return json(500, { erro: "sem_chave" });
  let c;
  try { c = await req.json(); } catch { return json(400, { erro: "json" }); }
  const foto = c.acao === "foto";
  const imagem = foto ? String(c.imagem || "").replace(/^data:image\/\w+;base64,/, "") : "";
  if (foto && (!/^[A-Za-z0-9+/=]+$/.test(imagem) || imagem.length < 1000 || imagem.length > 1_400_000)) return json(400, { erro: "imagem" });

  const token = (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  const email = await emailDoToken(token).catch(() => null);
  const dono = donoNaReq(email, req);
  if (!dono) {
    try {
      const quem = email ? `conta:${email}` : context?.ip || "sem-ip";
      if (!(await cabeNoLimite(quem, email ? LIMITE_MEMBRO_DIA : LIMITE_VISITANTE_DIA, 2))) return json(429, { erro: "limite" });
    } catch (e) { console.error("limite indisponível", e?.message); return json(503, { erro: "limite_indisponivel" }); }
  }

  const perfil = c.perfil && typeof c.perfil === "object" ? Object.entries(c.perfil).slice(0, 12).map(([k, v]) => `${txt(k, 20)}: ${txt(v, 200)}`).join("\n") : "";
  const content = foto
    ? [{ type: "image", source: { type: "base64", media_type: "image/jpeg", data: imagem } }, { type: "text", text: "Transcreva o WOD deste quadro." }]
    : [{ type: "text", text: `<perfil>\n${perfil || "sem dados"}\n</perfil>\nPedido: ${txt(c.pedido, 500) || "um WOD de hoje, equilibrado, de 45 a 60 minutos no total"}` }];

  const client = new Anthropic(), enc = new TextEncoder();
  const body = new ReadableStream({
    async start(ctrl) {
      const vivo = setInterval(() => { try { ctrl.enqueue(enc.encode(" ")); } catch {} }, 8000); // mantém a conexão viva no proxy
      let saida;
      try {
        const r = await client.messages.create({
          model: dono ? "claude-opus-5-5" : "claude-sonnet-5-5", max_tokens: 4000,
          system: foto ? SIS_FOTO : SIS_GERAR, tools: [FERRAMENTA], tool_choice: { type: "auto" },
          messages: [{ role: "user", content }],
        });
        let entrada = r.content.find((b) => b.type === "tool_use")?.input;
        if (!entrada) {
          const t = r.content.filter((b) => b.type === "text").map((b) => b.text).join("");
          try { entrada = JSON.parse(t.slice(t.indexOf("{"), t.lastIndexOf("}") + 1)); } catch {}
        }
        const wod = limparWod(entrada);
        saida = wod ? { wod, ...(!foto && txt(entrada.mensagem, 800) ? { mensagem: txt(entrada.mensagem, 800) } : {}) } : { erro: foto ? "ilegivel" : "wod_invalido" };
      } catch (e) {
        const status = e instanceof Anthropic.APIError ? e.status : 0;
        console.error("wod erro", c.acao, status, e?.message);
        saida = { erro: status === 429 ? "ocupado" : "ia" };
      } finally { clearInterval(vivo); }
      ctrl.enqueue(enc.encode(JSON.stringify(saida)));
      ctrl.close();
    },
  });
  return new Response(body, { headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", "x-accel-buffering": "no" } });
};

export const config = { path: "/api/wod" };
