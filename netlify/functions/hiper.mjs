// Programas montados pelo Coach AI: Hipertrofia (academia) e Calistenia 21 dias.
// POST /api/hiper  { programa: "hiper" | "c21" | "run", acao: "plano" | "revisao", perfil, plano?, historico?, checkins?, feedback? }
// Resposta: { mensagem, plano }. O plano usa só exercícios do catálogo do programa (public/academia.js ou
// public/calistenia21.js) e é conferido aqui antes de voltar para o app.
// Gerar ou revisar um plano conta como 3 perguntas do limite diário do Coach (é uma chamada maior).
import Anthropic from "@anthropic-ai/sdk";
import { emailDoToken } from "../lib/dono.mjs";
import { ehEmailDono, donoNaReq } from "../lib/sessao.mjs";
import { cabeNoLimite, LIMITE_MEMBRO_DIA, LIMITE_VISITANTE_DIA } from "../lib/limite.mjs";
import { REFERENCIA, LEGENDA } from "../lib/ref-calistenia21.mjs";
import { ROTEIRO_FORTALECIMENTO, CALENDARIO_CALISTENICO } from "../lib/ref-calistenia-base.mjs";
import "../../public/academia.js";
import "../../public/calistenia21.js";
import "../../public/corrida.js";

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

// Corrida e Híbrido: corrida + força do corredor + calistenia + academia (sem ids repetidos; a calistenia vem antes da academia)
const RUN_CAT = (() => {
  const run = globalThis.FITAI_CORRIDA || [], cal = globalThis.FITAI_CAL21 || [], ac = globalThis.FITAI_ACADEMIA || [];
  const ids = new Set([...run, ...cal].map((e) => e.id));
  return [...run, ...cal, ...ac.filter((e) => !ids.has(e.id))];
})();

const PROGRAMAS = {
  run: {
    cat: RUN_CAT, semanas: 0, maxEx: 10,
    sistema: `Você é o Coach AI do FIT.AI e monta treinos de CORRIDA e TREINO HÍBRIDO (corrida + força) como um treinador de corrida experiente.
Regras:
- O plano é SEMANAL (repete toda semana, o Coach revisa toda semana): um item em "dias" por dia de treino, sem o campo semana.
- Sessões de corrida (grupo "Corrida", equipamento "corrida") usam reps em minutos, ex.: "30 min", e series = 1. Tiros (equipamento "tiro") usam series = número de tiros e reps = distância ou tempo do tiro, ex.: series 6, reps "400 m"; o descanso é a recuperação entre tiros, em segundos. Comece os dias de tiro ou tempo run com run-aquecimento e, se couber, run-educativos ou run-strides.
- Distribuição da semana (80/20): a maior parte da corrida em ritmo leve (rodagem, regenerativo, longão) e no máximo 1 a 2 sessões fortes (tiros, tempo run, fartlek, subida). Longão 1x por semana a partir de quem já corre 5 km. Nunca dois dias fortes seguidos.
- Iniciante ou voltando: comece com run-caminhada-corrida e progrida o tempo correndo; sem tiros nas primeiras semanas.
- Objetivo de prova (5 km, 10 km, meia): monte a semana para a distância; meia maratona pede longão progressivo.
- Híbrido (correr e ganhar força) e HYROX: 2 a 3 sessões de corrida + 2 a 3 de força; pode MISTURAR estilos no mesmo dia (ex.: rodagem curta + força de pernas, ou circuito híbrido com run-farmer-walk, run-wall-ball, run-afundo-caminhando, run-burpee-salto-frente e corrida). Coloque força de pernas longe do dia de tiros e do longão.
- Força: siga onde a pessoa treina. Academia → exercícios de barra, halter, máquina e polia; em casa com halteres → halter e corpo; só peso do corpo ou barra fixa → exercícios da calistenia (corpo, barra). "Só quero correr" → apenas força do corredor (run-panturrilha-excentrica, run-elevacao-pelvica-unilateral, run-stiff-unilateral, run-prancha-lateral-abducao, run-saltos-pliometricos, prancha) 1 a 2x por semana, no fim de uma corrida leve.
- Força do corredor sempre presente pelo menos 1x por semana (panturrilha e glúteo previnem lesão).
- O tempo total de cada dia cabe no tempo que a pessoa tem.
- Use o ritmo informado (pace) para orientar na observação (obs) os ritmos de cada sessão (ex.: "rodagem a 6:30–7:00/km", "tiros a 5:20/km"). Sem ritmo informado, oriente pela conversa (dá para conversar = leve; só palavras soltas = forte).
- Dores em joelho, canela ou tornozelo: reduza o volume e o impacto (troque parte da corrida por run-bike, run-remo ou run-esteira-inclinada) e diga isso na mensagem.
${COMUM}`,
  },
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
    sistema: `Você é o Coach AI do FIT.AI e monta programas de CALISTENIA DE 21 DIAS (3 semanas), a partir do material do treinador: os treinos de 21 dias de resistência (<referencia>), o Roteiro de Fortalecimento (<fortalecimento>) e o Calendário Calistênico (<calendario>).
Qual base usar:
- Iniciante (ainda não faz 4–6 barras ou 15–20 flexões): monte em cima do Roteiro de Fortalecimento (negativas, isometrias, australianas, flexão inclinada e de joelhos, ativação escapular, core), misturado com circuitos leves dos 21 dias. Sem barra, troque os dias de barra por remada/core com peso do corpo.
- Intermediário: os circuitos dos 21 dias, com dias de força como "Força e resistência" e "Isometria e controle" do calendário se tiver barra.
- Avançado ou objetivo de habilidades (parada de mão, front lever, planche, muscle up): combine circuitos de resistência com dias de habilidade do calendário (handstand, front lever, planche, muscle up, L-sit, explosão e controle), no nível certo.
- Dias de habilidade e de força usam séries tradicionais (circuito = false, séries e descanso por exercício, como no calendário: 2–5 séries, descanso de 90 a 180 s, mais curto que no material para caber no tempo). Dias de resistência são circuitos (circuito = true).
Regras:
- Nos circuitos, siga o estilo da referência: cada treino é um CIRCUITO de 7 a 10 exercícios feito em voltas ("3x" = 3 voltas), misturando cardio (polichinelo, skipping, pé na bunda, burpee), força (flexões, agachamentos, afundos, barra) e core (prancha, abdominais). Alterne treinos de corpo inteiro, pernas e superior/core como na referência.
- Equipamento: "Só peso do corpo" → só exercícios com equip "corpo" (base nos treinos de peso do corpo); "Tenho barra fixa" → "corpo" e "barra" (base nos treinos com barra fixa); com paralelas também "paralela".
- Nível: iniciante → versões mais fáceis (flexão de joelhos, inclinada, pistol com apoio), 2 a 3 voltas, menos repetições e tempos menores (20–30 s); intermediário → como a referência; avançado → variações explosivas e unilaterais, 3 a 4 voltas, 40–60 s.
- O programa tem 3 semanas: use o campo "semana" (0, 1 e 2) e "dia" (0 = segunda … 6 = domingo) em cada treino. Treine nos dias da semana que a pessoa pediu; os outros dias são descanso. A semana 2 e a semana 3 ficam um pouco mais difíceis (mais repetições, mais tempo ou variação mais difícil). Pode repetir treinos de uma semana para outra com progressão, como a referência faz.
- Seja enxuto: no máximo 10 exercícios por treino; "obs" só quando for essencial (ex.: versão mais fácil).
- Circuito: "series" de cada exercício = número de voltas (igual a "rodadas" do dia); "descanso" = pausa até o próximo exercício (0 a 20 s); "descansoRodada" = pausa entre as voltas (45 a 90 s).
- Séries tradicionais (circuito = false): sem "rodadas"; "series" e "descanso" (60 a 180 s) por exercício.
- "reps" = repetições (ex.: "15", "6-8"), "máx" ou tempo em segundos (ex.: "30 s", "10-15 s").
- Duração compatível com o tempo por treino que a pessoa informou.
${COMUM}

<referencia>
${LEGENDA}

${REFERENCIA}
</referencia>

<fortalecimento>
${ROTEIRO_FORTALECIMENTO}
</fortalecimento>

<calendario>
${CALENDARIO_CALISTENICO}
</calendario>`,
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
                circuito: { type: "boolean", description: "Programa de 21 dias: true = circuito em voltas; false = séries tradicionais (força/habilidade)" },
                rodadas: { type: "integer", minimum: 1, maximum: 6, description: "Voltas do circuito (só quando circuito = true)" },
                descansoRodada: { type: "integer", description: "Descanso entre as voltas, em segundos" },
                exercicios: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: { type: "string" },
                      series: { type: "integer", minimum: 1, maximum: 12, description: "Séries (até 6) ou número de tiros (até 12)" },
                      reps: { type: "string", description: "Ex.: '8-12', '15', 'máx', '30 s', '20 min' (cardio e corrida) ou '400 m' (tiro)" },
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
    const circuito = P.semanas && d.circuito !== false && d.rodadas != null; // no 21 dias, dias de força/habilidade vêm sem voltas
    const rodadas = circuito ? num(d.rodadas, 1, 6, 3) : null;
    const ex = (Array.isArray(d.exercicios) ? d.exercicios : []).filter((e) => P.ci[e?.id]).slice(0, P.maxEx).map((e) => ({
      id: e.id, series: num(rodadas || e.series, 1, P.ci[e.id].equip === "tiro" ? 12 : 6, 3), reps: txt(e.reps, 20) || "10", descanso: num(e.descanso, 0, circuito ? 60 : 300, circuito ? 15 : 90),
      ...(txt(e.obs, 160) ? { obs: txt(e.obs, 160) } : {}),
    }));
    if (!ex.length) return null;
    vistos.add(chave);
    return { ...(P.semanas ? { semana } : {}), ...(circuito ? { rodadas, descansoRodada: num(d.descansoRodada, 0, 300, 60) } : {}), dia,
      titulo: txt(d.titulo, 60) || `Treino de ${DIAS[dia]}`, foco: txt(d.foco, 20) || P.ci[ex[0].id].grupo, exercicios: ex };
  }).filter(Boolean).sort((a, b) => (a.semana ?? 0) - (b.semana ?? 0) || a.dia - b.dia);
  if (!dias.length) return null;
  return { nome: txt(p.nome, 60) || "Meu treino", divisao: txt(p.divisao, 30), resumo: txt(p.resumo, 400), progressao: txt(p.progressao, 300),
    cardio: txt(p.cardio, 300), alimentacao: txt(p.alimentacao, 300), ...(P.semanas ? { semanas: P.semanas } : {}), dias };
}

const ROTULOS = { pace: "Ritmo/tempo em 5 km", forca: "Onde treina força", objetivo: "Objetivo", experiencia: "Experiência", nivel: "Nível", equipamento: "Equipamento", dias: "Dias por semana", diasSemana: "Dias preferidos",
  tempo: "Tempo por treino", local: "Onde treina", foco: "Prioridade", sexo: "Sexo", idade: "Idade", peso: "Peso (kg)", altura: "Altura (cm)", limitacoes: "Limitações/dores", extra: "Outras informações", etapa: "Etapa da trilha" };
const linhaPerfil = (p = {}) => Object.entries(ROTULOS).filter(([k]) => p[k] !== undefined && p[k] !== "").map(([k, r]) =>
  `${r}: ${k === "diasSemana" ? (Array.isArray(p[k]) && p[k].length ? p[k].map((d) => DIAS[d] || "").join(", ") : "sem preferência") : txt(p[k], 400)}`).join("\n");

export default async (req, context) => {
  if (req.method !== "POST") return json(405, { erro: "metodo" });
  if (!process.env.ANTHROPIC_API_KEY) return json(500, { erro: "sem_chave" });
  const token = (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  const email = await emailDoToken(token).catch(() => null);
  const dono = donoNaReq(email, req);
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
