// Programas montados pelo Coach AI: Hipertrofia (academia) e Calistenia 21 dias.
// POST /api/hiper  { programa: "hiper" | "c21", acao: "plano" | "revisao", perfil, plano?, historico?, checkins?, feedback? }
// Resposta: { mensagem, plano }. O plano usa só exercícios do catálogo do programa (public/academia.js ou
// public/calistenia21.js) e é conferido aqui antes de voltar para o app.
// Gerar ou revisar um plano conta como 3 perguntas do limite diário do Coach (é uma chamada maior).
import Anthropic from "@anthropic-ai/sdk";
import { emailDoToken } from "../lib/dono.mjs";
import { ehEmailDono } from "../lib/sessao.mjs";
import { cabeNoLimite, LIMITE_MEMBRO_DIA, LIMITE_VISITANTE_DIA } from "../lib/limite.mjs";
import { REFERENCIA, LEGENDA } from "../lib/ref-calistenia21.mjs";
import "../../public/academia.js";
import "../../public/calistenia21.js";

const DIAS = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];
const json = (status, body) => new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" } });
const txt = (v, n) => String(v ?? "").replace(/\s+/g, " ").trim().slice(0, n);
const num = (v, min, max, pad) => { const n = Math.round(Number(v)); return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : pad; };
const indice = (cat) => Object.fromEntries(cat.map((e) => [e.id, e]));

const COMUM = `- Use SOMENTE exercícios do catálogo, pelo id exato.
- Limitações ou dores: evite os exercícios que agravam e diga isso na mensagem. Se a pessoa relatar dor aguda ou lesão séria, oriente procurar um profissional de saúde.
- Na revisão, use o histórico real (cargas, repetições e tempos): quem bateu o alvo em todas as séries progride; quem ficou abaixo mantém ou recua; troque exercícios só com motivo (estagnação, dor, falta de equipamento, pedido da pessoa). Comente o peso dos check-ins em relação ao objetivo.
- Você não é médico nem nutricionista; alimentação só em linhas gerais.
- Responda SEMPRE chamando a ferramenta salvar_plano (nunca só com texto). A mensagem é curta (3 a 6 frases), em português do Brasil, tom de personal trainer parceiro.`;

const PROGRAMAS = {
  hiper: {
    cat: globalThis.FITAI_ACADEMIA || [], semanas: 0, maxEx: 10,
    sistema: `Você é o Coach AI do FIT.AI e monta treinos de musculação (academia) como um personal trainer experiente.
Regras:
- Respeite o equipamento: em casa com halteres, use só "halter", "corpo" e "cardio"; academia simples evita máquinas pouco comuns (hack, peck-deck, crucifixo inverso).
- O plano é SEMANAL (repete toda semana): um item em "dias" por dia de treino, sem o campo semana. Divisão pela experiência: iniciante → full body ou AB; intermediário → AB, ABC ou Upper/Lower; avançado → ABC, ABCD ou Push/Pull/Legs.
- Volume compatível com o tempo (cerca de 1 série a cada 2–3 min, contando o descanso); em geral 4 a 7 exercícios por dia.
- Hipertrofia: 6–12 repetições nos compostos, 10–15 nos isoladores, descanso 60–120 s. Força: 4–6 repetições, descanso 2–3 min. Perda de gordura: musculação pesada + cardio. Saúde: full body moderado.
- Exercícios de tempo (prancha) usam reps em segundos, ex.: "30-45 s". Cardio usa minutos, ex.: "20 min".
- Priorize os grupos que a pessoa pediu, sem abandonar os outros.
${COMUM}`,
  },
  c21: {
    cat: globalThis.FITAI_CAL21 || [], semanas: 3, maxEx: 12,
    sistema: `Você é o Coach AI do FIT.AI e monta programas de CALISTENIA DE 21 DIAS (3 semanas) para resistência muscular, a partir dos treinos de referência do treinador que estão em <referencia>.
Regras:
- Siga o estilo da referência: cada treino é um CIRCUITO de 7 a 10 exercícios feito em voltas ("3x" = 3 voltas), misturando cardio (polichinelo, skipping, pé na bunda, burpee), força (flexões, agachamentos, afundos, barra) e core (prancha, abdominais). Alterne treinos de corpo inteiro, pernas e superior/core como na referência.
- Equipamento: "Só peso do corpo" → só exercícios com equip "corpo" (base nos treinos de peso do corpo); "Tenho barra fixa" → "corpo" e "barra" (base nos treinos com barra fixa); com paralelas também "paralela".
- Nível: iniciante → versões mais fáceis (flexão de joelhos, inclinada, pistol com apoio), 2 a 3 voltas, menos repetições e tempos menores (20–30 s); intermediário → como a referência; avançado → variações explosivas e unilaterais, 3 a 4 voltas, 40–60 s.
- O programa tem 3 semanas: use o campo "semana" (0, 1 e 2) e "dia" (0 = segunda … 6 = domingo) em cada treino. Treine nos dias da semana que a pessoa pediu; os outros dias são descanso. A semana 2 e a semana 3 ficam um pouco mais difíceis (mais repetições, mais tempo ou variação mais difícil). Pode repetir treinos de uma semana para outra com progressão, como a referência faz.
- Seja enxuto: no máximo 10 exercícios por treino; "obs" só quando for essencial (ex.: versão mais fácil).
- Cada exercício: "series" = número de voltas do circuito (igual a "rodadas" do dia); "reps" = repetições (ex.: "15"), "máx" ou tempo em segundos (ex.: "30 s"); "descanso" = pausa até o próximo exercício, em segundos (0 a 20). No dia, "rodadas" = voltas e "descansoRodada" = pausa entre as voltas (45 a 90 s).
- Duração compatível com o tempo por treino que a pessoa informou.
${COMUM}

<referencia>
${LEGENDA}

${REFERENCIA}
</referencia>`,
  },
};
for (const P of Object.values(PROGRAMAS)) P.ci = indice(P.cat);

const FERRAMENTA = {
  name: "salvar_plano",
  description: "Salva o plano de treino da pessoa e a mensagem do coach para ela.",
  input_schema: {
    type: "object",
    properties: {
      mensagem: { type: "string", description: "Mensagem curta para a pessoa (3 a 6 frases): a lógica do plano ou o que mudou e por quê, e o foco das próximas semanas." },
      plano: {
        type: "object",
        properties: {
          nome: { type: "string", description: "Nome curto do plano, ex.: 'Hipertrofia ABC · 3x/semana' ou 'Resistência 21 dias · 4x/semana'" },
          divisao: { type: "string", description: "Ex.: Full body, ABC, Upper/Lower, Circuitos" },
          resumo: { type: "string", description: "1 ou 2 frases sobre a estratégia." },
          dias: {
            type: "array",
            description: "Só os dias de treino.",
            items: {
              type: "object",
              properties: {
                semana: { type: "integer", minimum: 0, maximum: 2, description: "Só no programa de 21 dias: 0, 1 ou 2." },
                dia: { type: "integer", minimum: 0, maximum: 6, description: "0 = segunda … 6 = domingo" },
                titulo: { type: "string", description: "Ex.: 'A · Peito e tríceps' ou 'Treino 3 · Superior e core'" },
                foco: { type: "string", description: "Grupo principal em 1 ou 2 palavras" },
                rodadas: { type: "integer", minimum: 1, maximum: 6, description: "Voltas do circuito (programa de 21 dias)" },
                descansoRodada: { type: "integer", description: "Descanso entre as voltas, em segundos" },
                exercicios: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: { type: "string" },
                      series: { type: "integer", minimum: 1, maximum: 6 },
                      reps: { type: "string", description: "Ex.: '8-12', '15', 'máx', '30 s' ou '20 min' (cardio)" },
                      descanso: { type: "integer", description: "Descanso em segundos" },
                      obs: { type: "string", description: "Observação curta opcional" },
                    },
                    required: ["id", "series", "reps", "descanso"],
                  },
                },
              },
              required: ["dia", "titulo", "foco", "exercicios"],
            },
          },
          progressao: { type: "string", description: "Regra de progressão em 1 ou 2 frases." },
          cardio: { type: "string" },
          alimentacao: { type: "string", description: "1 ou 2 frases de orientação geral." },
        },
        required: ["nome", "divisao", "resumo", "dias", "progressao"],
      },
    },
    required: ["mensagem", "plano"],
  },
};

// Confere o plano devolvido pela IA: ids do catálogo, números dentro dos limites, um treino por dia (e por semana no 21 dias).
function limparPlano(p, P) {
  if (!p || typeof p !== "object" || !Array.isArray(p.dias)) return null;
  const vistos = new Set();
  const dias = p.dias.map((d) => {
    const dia = num(d?.dia, 0, 6, -1), semana = P.semanas ? num(d?.semana, 0, P.semanas - 1, -1) : null;
    const chave = `${semana}-${dia}`;
    if (dia < 0 || semana === -1 || vistos.has(chave)) return null;
    const rodadas = P.semanas ? num(d.rodadas, 1, 6, 3) : null;
    const ex = (Array.isArray(d.exercicios) ? d.exercicios : []).filter((e) => P.ci[e?.id]).slice(0, P.maxEx).map((e) => ({
      id: e.id, series: num(rodadas || e.series, 1, 6, 3), reps: txt(e.reps, 20) || "10", descanso: num(e.descanso, 0, P.semanas ? 60 : 300, P.semanas ? 15 : 90),
      ...(txt(e.obs, 160) ? { obs: txt(e.obs, 160) } : {}),
    }));
    if (!ex.length) return null;
    vistos.add(chave);
    return { ...(P.semanas ? { semana, rodadas, descansoRodada: num(d.descansoRodada, 0, 300, 60) } : {}), dia,
      titulo: txt(d.titulo, 60) || `Treino de ${DIAS[dia]}`, foco: txt(d.foco, 20) || P.ci[ex[0].id].grupo, exercicios: ex };
  }).filter(Boolean).sort((a, b) => (a.semana ?? 0) - (b.semana ?? 0) || a.dia - b.dia);
  if (!dias.length) return null;
  return { nome: txt(p.nome, 60) || "Meu treino", divisao: txt(p.divisao, 30), resumo: txt(p.resumo, 400), progressao: txt(p.progressao, 300),
    cardio: txt(p.cardio, 300), alimentacao: txt(p.alimentacao, 300), ...(P.semanas ? { semanas: P.semanas } : {}), dias };
}

const ROTULOS = { objetivo: "Objetivo", experiencia: "Experiência", nivel: "Nível", equipamento: "Equipamento", dias: "Dias por semana", diasSemana: "Dias preferidos",
  tempo: "Tempo por treino", local: "Onde treina", foco: "Prioridade", sexo: "Sexo", idade: "Idade", peso: "Peso (kg)", altura: "Altura (cm)", limitacoes: "Limitações/dores", extra: "Outras informações" };
const linhaPerfil = (p = {}) => Object.entries(ROTULOS).filter(([k]) => p[k] !== undefined && p[k] !== "").map(([k, r]) =>
  `${r}: ${k === "diasSemana" ? (Array.isArray(p[k]) && p[k].length ? p[k].map((d) => DIAS[d] || "").join(", ") : "sem preferência") : txt(p[k], 400)}`).join("\n");

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
  const P = PROGRAMAS[c.programa] || PROGRAMAS.hiper;
  const acao = c.acao === "revisao" ? "revisao" : "plano";
  const catalogo = P.cat.map((e) => `${e.id} | ${e.nome} | ${e.grupo} | ${e.equip}${e.med === "s" ? " | tempo" : ""}`).join("\n");
  const partes = [`<perfil>\n${linhaPerfil(c.perfil)}\n</perfil>`, `<catalogo>\nid | nome | grupo | equipamento\n${catalogo}\n</catalogo>`];
  if (acao === "revisao") {
    partes.push(`<plano_atual>\n${txt(JSON.stringify(c.plano || {}), 14000)}\n</plano_atual>`);
    partes.push(`<historico>\n${String(c.historico || "sem registros").slice(0, 12000)}\n</historico>`);
    partes.push(`<checkins>\n${String(c.checkins || "nenhum").slice(0, 2000)}\n</checkins>`);
    partes.push(`Pedido da pessoa: ${txt(c.feedback, 600) || "revisar o plano com base no histórico"}`);
    partes.push(P.semanas ? "Monte o próximo ciclo de 21 dias (ou ajuste o atual, se ele ainda não terminou) com base no histórico, explicando na mensagem o que mudou." : "Revise o plano: mantenha o que está funcionando, ajuste onde o histórico pedir e explique na mensagem o que mudou.");
  } else partes.push(P.semanas ? "Monte o programa de 21 dias para esta pessoa." : "Monte o plano semanal inicial para esta pessoa.");

  // Montar 21 dias pode levar mais de um minuto: a resposta já sai com status 200 e manda um espaço a cada
  // 8 s (o JSON aceita espaços antes) para o proxy da hospedagem não derrubar a conexão parada. Erros vêm em { erro }.
  const client = new Anthropic(), enc = new TextEncoder();
  const body = new ReadableStream({
    async start(ctrl) {
      const vivo = setInterval(() => { try { ctrl.enqueue(enc.encode(" ")); } catch {} }, 8000);
      let saida;
      try {
        const r = await client.messages.create({
          model: dono ? "claude-opus-5-5" : "claude-sonnet-5-5", max_tokens: P.semanas ? 16000 : 8000,
          system: P.sistema, tools: [FERRAMENTA], tool_choice: { type: "auto" }, // o Opus 5.5 não aceita forçar a ferramenta; o sistema pede para chamá-la
          messages: [{ role: "user", content: partes.join("\n\n") }],
        });
        // Normalmente vem na ferramenta; se a IA responder em texto, tenta ler o JSON do texto
        let entrada = r.content.find((b) => b.type === "tool_use")?.input;
        if (!entrada) {
          const texto = r.content.filter((b) => b.type === "text").map((b) => b.text).join("");
          try { entrada = JSON.parse(texto.slice(texto.indexOf("{"), texto.lastIndexOf("}") + 1)); } catch {}
        }
        const plano = limparPlano(entrada?.plano, P);
        saida = plano ? { mensagem: txt(entrada.mensagem, 1500), plano } : { erro: "plano_invalido" };
        if (!plano) console.error("hiper plano inválido", c.programa, r.stop_reason);
      } catch (e) {
        const status = e instanceof Anthropic.APIError ? e.status : 0;
        console.error("hiper erro", c.programa, status, e?.message);
        saida = { erro: status === 429 ? "ocupado" : "ia" };
      } finally { clearInterval(vivo); }
      ctrl.enqueue(enc.encode(JSON.stringify(saida)));
      ctrl.close();
    },
  });
  return new Response(body, { headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", "x-accel-buffering": "no" } });
};

export const config = { path: "/api/hiper" };
