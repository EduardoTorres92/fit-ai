// Hipertrofia: o Coach AI monta o treino de academia a partir da entrevista e revisa o plano com o histórico.
// POST /api/hiper  { acao: "plano" | "revisao", perfil, plano?, historico?, checkins?, feedback? }
// Resposta: { mensagem, plano } (o plano usa só exercícios do catálogo public/academia.js, que têm vídeo e dica).
// Gerar um plano conta como 3 perguntas do limite diário do Coach (é uma chamada maior).
import Anthropic from "@anthropic-ai/sdk";
import { emailDoToken } from "../lib/dono.mjs";
import { ehEmailDono } from "../lib/sessao.mjs";
import { cabeNoLimite, LIMITE_MEMBRO_DIA, LIMITE_VISITANTE_DIA } from "../lib/limite.mjs";
import "../../public/academia.js";

const CAT = globalThis.FITAI_ACADEMIA || [];
const CATI = Object.fromEntries(CAT.map((e) => [e.id, e]));
const DIAS = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];
const json = (status, body) => new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" } });
const txt = (v, n) => String(v ?? "").replace(/\s+/g, " ").trim().slice(0, n);
const num = (v, min, max, pad) => { const n = Math.round(Number(v)); return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : pad; };

const FERRAMENTA = {
  name: "salvar_plano",
  description: "Salva o plano semanal de treino de academia da pessoa e a mensagem do coach para ela.",
  input_schema: {
    type: "object",
    properties: {
      mensagem: { type: "string", description: "Mensagem curta para a pessoa (3 a 6 frases): explica a lógica do plano ou o que mudou e por quê, e o foco das próximas semanas. Português do Brasil, tom de personal trainer parceiro." },
      plano: {
        type: "object",
        properties: {
          nome: { type: "string", description: "Nome curto do plano, ex.: 'Hipertrofia ABC · 3x/semana'" },
          divisao: { type: "string", description: "Ex.: Full body, AB, ABC, Upper/Lower, Push/Pull/Legs" },
          resumo: { type: "string", description: "1 ou 2 frases sobre a estratégia (volume, faixa de repetições, progressão)." },
          dias: {
            type: "array",
            description: "Só os dias de treino. dia = 0 (segunda) a 6 (domingo). Espalhe com descanso entre os dias quando possível.",
            items: {
              type: "object",
              properties: {
                dia: { type: "integer", minimum: 0, maximum: 6 },
                titulo: { type: "string", description: "Ex.: 'A · Peito, ombros e tríceps'" },
                foco: { type: "string", description: "Grupo principal em 1 ou 2 palavras, ex.: Peito, Costas, Pernas, Superior, Inferior, Full body" },
                exercicios: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: { type: "string", description: "id do exercício, exatamente como no catálogo" },
                      series: { type: "integer", minimum: 1, maximum: 6 },
                      reps: { type: "string", description: "Faixa de repetições, ex.: '8-12', ou tempo, ex.: '30-45 s', ou minutos para cardio, ex.: '20 min'" },
                      descanso: { type: "integer", description: "Descanso entre séries em segundos" },
                      obs: { type: "string", description: "Observação curta opcional (cadência, técnica, carga inicial sugerida)" },
                    },
                    required: ["id", "series", "reps", "descanso"],
                  },
                },
              },
              required: ["dia", "titulo", "foco", "exercicios"],
            },
          },
          progressao: { type: "string", description: "Regra de progressão de carga em 1 ou 2 frases (ex.: dupla progressão)." },
          cardio: { type: "string", description: "Orientação de cardio, se fizer sentido para o objetivo." },
          alimentacao: { type: "string", description: "1 ou 2 frases de orientação geral de alimentação para o objetivo (sem dieta detalhada)." },
        },
        required: ["nome", "divisao", "resumo", "dias", "progressao"],
      },
    },
    required: ["mensagem", "plano"],
  },
};

const SISTEMA = `Você é o Coach AI do FIT.AI e monta treinos de musculação (academia) como um personal trainer experiente.
Regras:
- Use SOMENTE exercícios do catálogo (pelo id exato). Respeite o equipamento disponível: em casa com halteres, use só "halter", "corpo" e "cardio"; academia simples evita "maquina" pouco comum (hack, peck-deck, crucifixo inverso).
- Distribua o treino nos dias da semana pedidos, com divisão adequada à experiência: iniciante → full body ou AB; intermediário → AB, ABC ou Upper/Lower; avançado → ABC, ABCD ou Push/Pull/Legs.
- Volume por sessão compatível com o tempo disponível (cerca de 1 série a cada 2–3 min, incluindo descanso). Em geral 4 a 7 exercícios por dia.
- Hipertrofia: 6–12 repetições nos compostos, 10–15 nos isoladores, descanso 60–120 s. Força: 4–6 repetições nos compostos, descanso 2–3 min. Perda de gordura: manter musculação pesada e adicionar cardio. Saúde/condicionamento: full body moderado.
- Priorize os grupos musculares que a pessoa pediu, sem abandonar os outros.
- Limitações ou dores: evite os exercícios que agravam e diga isso na mensagem. Se a pessoa relatar dor aguda ou lesão séria, oriente procurar um profissional de saúde.
- Na revisão, use o histórico real de cargas e repetições: se a pessoa bateu o topo da faixa em todas as séries, sugira subir a carga; se ficou abaixo do mínimo, manter ou reduzir; troque exercícios só quando houver motivo (estagnação de 3+ semanas, dor, falta de equipamento, pedido da pessoa). Comente o peso corporal dos check-ins em relação ao objetivo.
- Você não é médico nem nutricionista; alimentação só em linhas gerais.
- Responda chamando a ferramenta salvar_plano.`;

// Confere o plano devolvido pela IA: só ids do catálogo, números dentro dos limites, um treino por dia.
function limparPlano(p) {
  if (!p || typeof p !== "object" || !Array.isArray(p.dias)) return null;
  const vistos = new Set();
  const dias = p.dias.map((d) => {
    const dia = num(d?.dia, 0, 6, -1);
    if (dia < 0 || vistos.has(dia)) return null;
    const ex = (Array.isArray(d.exercicios) ? d.exercicios : []).filter((e) => CATI[e?.id]).slice(0, 10).map((e) => ({
      id: e.id, series: num(e.series, 1, 6, 3), reps: txt(e.reps, 20) || "10-12", descanso: num(e.descanso, 15, 300, 90), ...(txt(e.obs, 160) ? { obs: txt(e.obs, 160) } : {}),
    }));
    if (!ex.length) return null;
    vistos.add(dia);
    return { dia, titulo: txt(d.titulo, 60) || `Treino de ${DIAS[dia]}`, foco: txt(d.foco, 20) || CATI[ex[0].id].grupo, exercicios: ex };
  }).filter(Boolean).sort((a, b) => a.dia - b.dia);
  if (!dias.length) return null;
  return { nome: txt(p.nome, 60) || "Hipertrofia", divisao: txt(p.divisao, 30), resumo: txt(p.resumo, 400), progressao: txt(p.progressao, 300),
    cardio: txt(p.cardio, 300), alimentacao: txt(p.alimentacao, 300), dias };
}

const linhaPerfil = (p = {}) => [
  `Objetivo: ${txt(p.objetivo, 60) || "?"}`, `Experiência: ${txt(p.experiencia, 40) || "?"}`, `Dias por semana: ${txt(p.dias, 4) || "?"}`,
  `Dias preferidos: ${Array.isArray(p.diasSemana) && p.diasSemana.length ? p.diasSemana.map((d) => DIAS[d] || "").join(", ") : "sem preferência"}`,
  `Tempo por treino: ${txt(p.tempo, 20) || "?"}`, `Sexo: ${txt(p.sexo, 20) || "?"}`, `Idade: ${txt(p.idade, 4) || "?"}`, `Peso: ${txt(p.peso, 6) || "?"} kg`, `Altura: ${txt(p.altura, 5) || "?"} cm`,
  `Onde treina: ${txt(p.local, 60) || "?"}`, `Prioridade: ${txt(p.foco, 60) || "equilibrado"}`, `Limitações/dores: ${txt(p.limitacoes, 300) || "nenhuma"}`, `Outras informações: ${txt(p.extra, 400) || "—"}`,
].join("\n");

export default async (req, context) => {
  if (req.method !== "POST") return json(405, { erro: "metodo" });
  if (!process.env.ANTHROPIC_API_KEY) return json(500, { erro: "sem_chave" });
  const token = (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  const email = await emailDoToken(token).catch(() => null);
  const dono = ehEmailDono(email);
  if (!dono) {
    try {
      const quem = email ? `conta:${email}` : context?.ip || "sem-ip";
      if (!(await cabeNoLimite(quem, email ? LIMITE_MEMBRO_DIA : LIMITE_VISITANTE_DIA, 3))) return json(429, { erro: "limite" });
    } catch (e) { console.error("limite indisponível", e?.message); return json(503, { erro: "limite_indisponivel" }); }
  }

  let c;
  try { c = await req.json(); } catch { return json(400, { erro: "json" }); }
  const acao = c.acao === "revisao" ? "revisao" : "plano";
  const catalogo = CAT.map((e) => `${e.id} | ${e.nome} | ${e.grupo} | ${e.equip}`).join("\n");
  const partes = [`<perfil>\n${linhaPerfil(c.perfil)}\n</perfil>`, `<catalogo>\nid | nome | grupo | equipamento\n${catalogo}\n</catalogo>`];
  if (acao === "revisao") {
    partes.push(`<plano_atual>\n${txt(JSON.stringify(c.plano || {}), 8000)}\n</plano_atual>`);
    partes.push(`<historico>\n${String(c.historico || "sem registros").slice(0, 12000)}\n</historico>`);
    partes.push(`<checkins>\n${String(c.checkins || "nenhum").slice(0, 2000)}\n</checkins>`);
    partes.push(`Pedido da pessoa: ${txt(c.feedback, 600) || "revisar o plano com base no histórico"}`);
    partes.push("Revise o plano: mantenha o que está funcionando, ajuste cargas/repetições/exercícios onde o histórico pedir e explique na mensagem o que mudou.");
  } else partes.push("Monte o plano semanal inicial para esta pessoa.");

  const client = new Anthropic();
  let r;
  try {
    r = await client.messages.create({
      model: dono ? "claude-opus-5-5" : "claude-sonnet-5-5", max_tokens: 8000,
      system: SISTEMA, tools: [FERRAMENTA], tool_choice: { type: "tool", name: FERRAMENTA.name },
      messages: [{ role: "user", content: partes.join("\n\n") }],
    });
  } catch (e) {
    const status = e instanceof Anthropic.APIError ? e.status : 0;
    console.error("hiper erro", status, e?.message);
    return json(502, { erro: status === 429 ? "ocupado" : "ia" });
  }
  const uso = r.content.find((b) => b.type === "tool_use");
  const plano = limparPlano(uso?.input?.plano);
  if (!plano) return json(502, { erro: "plano_invalido" });
  return json(200, { mensagem: txt(uso.input.mensagem, 1500), plano });
};

export const config = { path: "/api/hiper" };
