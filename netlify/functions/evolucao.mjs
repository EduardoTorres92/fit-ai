// Evolução por foto: o Coach AI compara as fotos de frente e de lado de um check-in com as anteriores.
// POST /api/evolucao  { atual: { data, frente?, lado?, peso? }, anteriores: [{ data, frente?, lado?, peso? }], idade?, contexto? }
// "frente" e "lado" são caminhos no bucket privado "evolucao" (<uid>/<data>-frente.jpg). As fotos são baixadas aqui
// com o token da própria pessoa, então a regra do Storage garante que ninguém analisa a foto de outra pessoa.
// Resposta: texto em streaming (como o /api/coach). Conta como 3 perguntas do limite diário.
import Anthropic from "@anthropic-ai/sdk";
import { emailDoToken } from "../lib/dono.mjs";
import { ehEmailDono } from "../lib/sessao.mjs";
import { cabeNoLimite, LIMITE_MEMBRO_DIA } from "../lib/limite.mjs";

const SB_URL = process.env.SUPABASE_URL || "https://thckpqzvvjujuseqeusz.supabase.co";
const SB_KEY = process.env.SUPABASE_PUBLISHABLE_KEY || "sb_publishable_t8SLyWZNLgSHj_4B158EyA_tpHm_DmV";
const json = (status, body) => new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" } });
const txt = (v, n) => String(v ?? "").replace(/\s+/g, " ").trim().slice(0, n);
const CAMINHO = /^[0-9a-f-]{36}\/\d{4}-\d{2}-\d{2}-(frente|lado)\.jpg$/;
const DATA = /^\d{4}-\d{2}-\d{2}$/;

export const SISTEMA = `Você é o Coach AI do FIT.AI e analisa a evolução física de quem treina comparando fotos de check-in (de frente e de lado), tiradas a cada 15 dias ou mais.
Você recebe as fotos em ordem cronológica, cada uma com data, ângulo e peso informado, e um resumo dos treinos da pessoa.
Como analisar:
- Compare o check-in atual com o anterior e com o primeiro. Fale só do que dá para ver: definição muscular (ombros, braços, peitoral, abdômen, costas, pernas), volume, cintura, postura (ombros, cabeça, curvatura lombar) e simetria.
- Seja honesto: se não dá para ver diferença, diga isso com naturalidade. 15 dias é pouco tempo; mudanças pequenas são normais.
- Diferenças de luz, distância, ângulo, roupa ou bomba muscular atrapalham a comparação. Quando isso acontecer, avise e dê uma dica para a próxima foto.
- Não estime percentual de gordura, peso ou medidas a partir da foto. Use o peso informado só como dado da pessoa.
- Não comente aparência, beleza ou atratividade, e não compare com padrões de corpo. Nada de linguagem que envergonhe o corpo.
- Ligue o que viu aos treinos registrados e dê 2 ou 3 sugestões práticas para os próximos 15 dias (treino, constância, sono, proteína, água).
- Se as fotos sugerirem magreza extrema, perda muito rápida ou a pessoa mencionar dieta restritiva, oriente com cuidado a procurar um profissional de saúde, sem dar metas de peso.
- Se uma imagem não for uma foto do corpo para acompanhamento, ou tiver nudez além de roupa de banho ou de treino, não analise essa imagem e peça outra com roupa de treino.
- Você não é médico nem nutricionista; não faça diagnósticos.
Como responder:
- Português do Brasil, tom de parceiro de treino. Para ler no celular: até 10 frases curtas ou listas com "- ".
- Comece com uma frase de resumo da evolução. Depois: o que mudou, o que ainda não dá para ver, e o foco para os próximos 15 dias.
- No primeiro check-in (sem fotos anteriores), descreva o ponto de partida com respeito, diga o que vai observar nos próximos e dê o foco inicial.
- Formatação permitida: **negrito** e listas com "- ". Sem tabelas e sem títulos.`;

async function baixar(caminho, token) {
  const r = await fetch(`${SB_URL}/storage/v1/object/authenticated/evolucao/${caminho}`, { headers: { apikey: SB_KEY, authorization: `Bearer ${token}` } });
  if (!r.ok) return null;
  const b = Buffer.from(await r.arrayBuffer());
  return b.length > 500 && b.length <= 1_048_576 ? b.toString("base64") : null;
}

export function lerCheckin(c) {
  if (!c || typeof c !== "object" || !DATA.test(String(c.data || ""))) return null;
  const fotos = ["frente", "lado"].filter((k) => typeof c[k] === "string" && CAMINHO.test(c[k]) && c[k].endsWith(`${c.data}-${k}.jpg`));
  if (!fotos.length) return null;
  const peso = Number(c.peso);
  return { data: c.data, fotos: fotos.map((k) => ({ angulo: k, caminho: c[k] })), ...(peso >= 25 && peso <= 400 ? { peso } : {}) };
}

export default async (req) => {
  if (req.method !== "POST") return json(405, { erro: "metodo" });
  if (!process.env.ANTHROPIC_API_KEY) return json(500, { erro: "sem_chave" });
  let c;
  try { c = await req.json(); } catch { return json(400, { erro: "json" }); }
  const idade = Number(c.idade);
  if (Number.isFinite(idade) && idade > 0 && idade < 18) return json(403, { erro: "idade" });

  const token = (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  const email = await emailDoToken(token).catch(() => null);
  if (!email) return json(401, { erro: "login" });

  const atual = lerCheckin(c.atual);
  if (!atual) return json(400, { erro: "fotos" });
  const anteriores = (Array.isArray(c.anteriores) ? c.anteriores : []).map(lerCheckin).filter((x) => x && x.data < atual.data)
    .sort((a, b) => a.data.localeCompare(b.data)).filter((x, i, a) => i === 0 || x.data !== a[i - 1].data).slice(-2);
  // Todas as fotos têm de ser da mesma pessoa (mesma pasta)
  const dono = atual.fotos[0].caminho.split("/")[0];
  if ([atual, ...anteriores].some((k) => k.fotos.some((f) => !f.caminho.startsWith(`${dono}/`)))) return json(400, { erro: "fotos" });

  const souDono = ehEmailDono(email);
  if (!souDono) {
    try {
      if (!(await cabeNoLimite(`conta:${email}`, LIMITE_MEMBRO_DIA, 3))) return json(429, { erro: "limite" });
    } catch (e) { console.error("limite indisponível", e?.message); return json(503, { erro: "limite_indisponivel" }); }
  }

  // Baixa as fotos com o token da pessoa (o Storage só entrega as dela)
  const content = [];
  const ordem = [...anteriores, atual];
  let baixadas = 0;
  for (const [i, k] of ordem.entries()) {
    const rotulo = k === atual ? "Check-in ATUAL" : i === 0 && anteriores.length === 2 ? "Primeiro check-in" : "Check-in anterior";
    content.push({ type: "text", text: `${rotulo} — ${k.data}${k.peso ? `, peso informado ${k.peso} kg` : ""}:` });
    for (const f of k.fotos) {
      const b64 = await baixar(f.caminho, token);
      if (!b64) { if (k === atual) return json(400, { erro: "fotos" }); continue; }
      baixadas++;
      content.push({ type: "text", text: `Foto de ${f.angulo}:` }, { type: "image", source: { type: "base64", media_type: "image/jpeg", data: b64 } });
    }
  }
  if (!baixadas) return json(400, { erro: "fotos" });
  const ctx = txt(c.contexto, 3000);
  content.push({ type: "text", text: `${ctx ? `<treinos>\n${ctx}\n</treinos>\n` : ""}${anteriores.length ? "Analise a evolução do check-in atual em relação aos anteriores." : "Este é o primeiro check-in: descreva o ponto de partida."}` });

  const client = new Anthropic(), enc = new TextEncoder();
  const stream = client.messages.stream({
    model: souDono ? "claude-opus-5-5" : "claude-sonnet-5-5", max_tokens: 3000,
    system: SISTEMA, messages: [{ role: "user", content }],
  });
  const body = new ReadableStream({
    async start(ctrl) {
      // Até o primeiro trecho de texto (6 fotos demoram), manda espaços para o proxy não fechar a conexão
      let vivo = setInterval(() => { try { ctrl.enqueue(enc.encode(" ")); } catch {} }, 8000);
      try {
        for await (const ev of stream) if (ev.type === "content_block_delta" && ev.delta.type === "text_delta") { if (vivo) { clearInterval(vivo); vivo = null; } ctrl.enqueue(enc.encode(ev.delta.text)); }
        const final = await stream.finalMessage();
        if (final.stop_reason === "refusal") ctrl.enqueue(enc.encode("\n\nNão consegui analisar essas fotos. Tente outras, com roupa de treino e boa luz."));
      } catch (e) {
        const status = e instanceof Anthropic.APIError ? e.status : 0;
        console.error("evolucao erro", status, e?.message);
        ctrl.enqueue(enc.encode(status === 429 ? "\n\n[Muitos pedidos seguidos. Espere um minuto.]" : "\n\n[Falha ao analisar. Tente de novo.]"));
      } finally { if (vivo) clearInterval(vivo); ctrl.close(); }
    },
  });
  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store", "x-accel-buffering": "no" } });
};

export const config = { path: "/api/evolucao" };
