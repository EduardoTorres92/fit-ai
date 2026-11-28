// Sensei: a persona do Coach no app (o mestre do estilo da pessoa) e as ferramentas para anotar o treino pela conversa.
// As ferramentas não gravam nada aqui: validam contra a agenda que o próprio app mandou e devolvem um "registro"
// que o app aplica no aparelho (o mesmo formato do bot do Telegram).

// Só os mestres que existem no app: o nome vem do app, mas a persona é montada aqui (sem texto livre do cliente)
const ESTILOS = {
  ninja: { nome: "Ninja", m: "Kenji", f: "Yuna", tom: "rápido e explosivo: frases curtas e energia alta, fala de ritmo, intensidade e de voltar ao combate depois de cada pausa" },
  monge: { nome: "Monge", m: "Tenzin", f: "Mei", tom: "calmo e preciso: valoriza controle, respiração e cada repetição perfeita; elogia a paciência" },
  gladiador: { nome: "Gladiador", m: "Tito", f: "Lívia", tom: "de arena: firme e motivador, fala de carga, progressão e honra no treino, sem exagero" },
  batedor: { nome: "Batedor", m: "Zion", f: "Kaya", tom: "de trilha: constante e estratégico, fala de ritmo, distância, terreno e de chegar inteiro" },
  berserker: { nome: "Berserker", m: "Bjorn", f: "Freya", tom: "intenso e brincalhão, com fúria nórdica controlada: celebra o esforço do WOD, mas cobra técnica antes da carga" },
  ronin: { nome: "Ronin", m: "Takeshi", f: "Ayame", tom: "versátil e independente: fala de equilíbrio entre modalidades e de escolher o próprio caminho" },
};

export function personaSensei(s) {
  const E = ESTILOS[s?.estilo];
  if (!E) return "";
  const g = s.genero === "f" ? "f" : "m", nome = E[g];
  return `\n\nNeste app você é ${g === "f" ? "a" : "o"} **Sensei ${nome}**, ${g === "f" ? "mestra" : "mestre"} do estilo ${E.nome} que conduz a pessoa na jornada. Tom: ${E.tom}.
- Fale como ${nome}, em primeira pessoa, mas sem teatro: a persona dá o sabor, o conteúdo continua técnico, correto e seguro. Use no máximo um toque de personagem por resposta.
- Se perguntarem, você é uma IA (o Sensei do FIT.AI). Nunca use a persona para pressionar alguém a treinar com dor ou sem descanso.
- Técnica de um movimento: além de explicar curto, lembre que o Dojo do app tem o vídeo e o passo a passo dos fundamentos (agachamento, flexão, prancha, barra fixa, afundo, ponte de glúteo, burpee, polichinelo, mountain climber, agachamento com salto, levantamento terra, passada da corrida e pular corda).`;
}

export const FERRAMENTAS_SENSEI = [
  { name: "anotar_series", description: "Anota as séries que a pessoa diz que JÁ fez de um exercício do treino (repetições, ou segundos/minutos quando a unidade for s/min). Use o id que aparece na agenda daquele dia. Os valores somam às séries já anotadas. Não use para planos ou intenções.",
    input_schema: { type: "object", properties: {
      exercicio_id: { type: "string", description: "id do exercício na agenda (ex.: flexao-comum)" },
      valores: { type: "array", items: { type: "number" }, description: "Um valor por série, na ordem (ex.: [10, 9, 8])" },
      cargas_kg: { type: "array", items: { type: "number" }, description: "Carga de cada série em kg, só em exercícios com carga (opcional)" },
      data: { type: "string", description: "AAAA-MM-DD. Padrão: hoje." } }, required: ["exercicio_id", "valores"] } },
  { name: "anotar_max_out", description: "Anota o Max Out de um vídeo do MAX:30 que a pessoa já fez: o tempo do vídeo em que precisou parar pela primeira vez. Converta mm:ss para segundos (12:30 → 750). Também marca o vídeo como feito.",
    input_schema: { type: "object", properties: {
      video_id: { type: "string", description: "id do vídeo na agenda (ex.: cardio-challenge)" },
      segundos: { type: "integer", description: "Tempo do Max Out em segundos" },
      data: { type: "string", description: "AAAA-MM-DD. Padrão: hoje." } }, required: ["video_id", "segundos"] } },
  { name: "marcar_treino_feito", description: "Marca como concluído o treino do programa principal numa data, quando a pessoa disser que já fez o treino inteiro (hoje, se ela não disser o dia).",
    input_schema: { type: "object", properties: { data: { type: "string", description: "AAAA-MM-DD. Padrão: hoje." } } } },
  { name: "anotar_agua", description: "Anota água que a pessoa disse que bebeu agora (em ml; um copo comum tem cerca de 250 ml, uma garrafinha 500 ml).",
    input_schema: { type: "object", properties: { ml: { type: "integer", description: "Quantidade em ml, de 50 a 2000." } }, required: ["ml"] } },
];

const DATA = /^\d{4}-\d{2}-\d{2}$/;
const somarDia = (k, n) => new Date(Date.parse(`${k}T12:00:00Z`) + n * 864e5).toISOString().slice(0, 10);

// Agenda vinda do app: [{ data, titulo, descanso, ex: [{ id, nome, un, carga, maxOut }] }] (hoje e os 7 dias anteriores)
export function limparAgenda(lista) {
  return (Array.isArray(lista) ? lista : []).slice(0, 10).filter((a) => a && DATA.test(String(a.data))).map((a) => ({
    data: a.data, titulo: String(a.titulo || "").slice(0, 80), descanso: !!a.descanso,
    ex: (Array.isArray(a.ex) ? a.ex : []).slice(0, 30).map((e) => ({ id: String(e.id || "").slice(0, 60), nome: String(e.nome || "").slice(0, 80), un: String(e.un || "reps").slice(0, 8), carga: !!e.carga, maxOut: !!e.maxOut })),
  }));
}
export function agendaParaSistema(agenda, hoje) {
  if (!agenda.length) return "";
  return `\n\n<agenda_para_anotar>\nHoje é ${hoje}. Para anotar o que a pessoa já fez, use as ferramentas com estes ids:\n${agenda.map((a) => `${a.data}: ${a.descanso ? "descanso" : `${a.titulo} | ${a.ex.map((e) => `${e.id}=${e.nome}${e.maxOut ? " [Max Out]" : e.un !== "video" ? ` [${e.un}${e.carga ? ", kg" : ""}]` : ""}`).join("; ")}`}`).join("\n")}\n</agenda_para_anotar>
Ao anotar, confirme em uma frase o que entrou (ex.: "Anotei: flexão 10, 9 e 8") e siga a conversa. Se faltar algum número, pergunte antes de anotar.`;
}

// Valida uma chamada de ferramenta. Devolve { texto (para o modelo), reg (para o app) }
export function usarFerramentaSensei(nome, entrada, agenda, hoje) {
  const k = DATA.test(String(entrada?.data || "")) ? entrada.data : hoje;
  if (nome === "anotar_agua") {
    const ml = Math.round(Number(entrada?.ml));
    if (!(ml >= 50 && ml <= 2000)) return { texto: "Quantidade inválida (use de 50 a 2000 ml)." };
    return { texto: `Anotado: ${ml} ml de água.`, reg: { tipo: "agua", ml } };
  }
  if (k > hoje || k < somarDia(hoje, -7)) return { texto: "Só dá para anotar treinos de hoje ou dos últimos 7 dias." };
  const a = agenda.find((x) => x.data === k);
  if (nome === "marcar_treino_feito") {
    if (!a || a.descanso) return { texto: `Não há treino do programa principal em ${k} para marcar.` };
    return { texto: `Marcado: treino de ${k} (${a.titulo}) como feito.`, reg: { tipo: "feito", data: k } };
  }
  if (nome !== "anotar_series" && nome !== "anotar_max_out") return { texto: "Ferramenta desconhecida." };
  const lista = a?.ex || [], id = String(entrada?.[nome === "anotar_series" ? "exercicio_id" : "video_id"] || ""), e = lista.find((x) => x.id === id);
  if (!e) return { texto: `Não achei esse id no treino de ${k}. Ids válidos: ${lista.map((x) => `${x.id} (${x.nome})`).join(", ") || "nenhum"}.` };
  if (nome === "anotar_max_out") {
    const seg = Math.round(Number(entrada?.segundos));
    if (!e.maxOut) return { texto: `${e.nome} não tem Max Out.` };
    if (!(seg > 0 && seg <= 3600)) return { texto: "Tempo inválido." };
    return { texto: `Anotado: Max Out de ${e.nome} em ${Math.floor(seg / 60)}:${String(seg % 60).padStart(2, "0")}.`, reg: { tipo: "max", data: k, ex: id, seg, nome: e.nome } };
  }
  if (e.un === "video") return { texto: `${e.nome} é um vídeo: para ele só existe Max Out ou marcar o treino como feito.` };
  const valores = (Array.isArray(entrada?.valores) ? entrada.valores : []).map(Number).filter((n) => Number.isFinite(n) && n > 0 && n <= 900).slice(0, 20);
  if (!valores.length) return { texto: "Nenhum valor válido." };
  const kg = e.carga && Array.isArray(entrada?.cargas_kg) ? entrada.cargas_kg.map(Number).map((x) => (x > 0 && x <= 400 ? x : 0)).slice(0, 20) : [];
  return { texto: `Anotado: ${e.nome} — ${valores.map((v, i) => (kg[i] > 0 ? `${kg[i]}kg×${v}` : v)).join(", ")}.`, reg: { tipo: "series", data: k, ex: id, valores, ...(kg.some((x) => x > 0) ? { kg } : {}), nome: e.nome } };
}
