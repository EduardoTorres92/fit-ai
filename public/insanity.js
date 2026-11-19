/* FIT.AI — Insanity MAX:30 com Ab Maximizer (calendário de 8 semanas).
   Os links dos vídeos NÃO ficam aqui: vêm de /api/videos (variável FITAI_INSANITY_VIDEOS no servidor). */
window.FITAI_INSANITY = (() => {
  const V = (id, nome, min, tipo, desc) => ({ id, nome, min, tipo, desc });
  const VIDEOS = [
    V("cardio-challenge", "Cardio Challenge", 30, "Cardio", "Teste de cardio do mês 1: intervalos sem descanso. Anote o tempo do seu Max Out."),
    V("tabata-power", "Tabata Power", 30, "Tabata", "Rounds Tabata (20 s forte / 10 s descanso) focados em potência e pliometria."),
    V("sweat-intervals", "Sweat Intervals", 30, "Cardio", "Intervalos de cardio com pouco descanso para suar do início ao fim."),
    V("sweat-fest", "Sweat Fest", null, "Cardio", "Pode substituir o Sweat Intervals no mês 1."),
    V("tabata-strength", "Tabata Strength", 30, "Tabata", "Rounds Tabata com foco em força e resistência muscular."),
    V("friday-fight-1", "Friday Fight Night · Round 1", 30, "Luta", "Treino de sexta inspirado em luta: socos, chutes e cardio."),
    V("pulse", "Pulse", 20, "Recuperação", "Sábado de cardio mais curto para manter o ritmo."),
    V("max-out-cardio", "Max Out Cardio", 30, "Cardio", "Mês 2: cardio mais intenso, sem pausas planejadas."),
    V("max-out-power", "Max Out Power", 30, "Potência", "Mês 2: pliometria e explosão."),
    V("max-out-sweat", "Max Out Sweat", 30, "Cardio", "Mês 2: intervalos longos para queimar ao máximo."),
    V("max-out-strength", "Max Out Strength", 30, "Força", "Mês 2: força com o peso do corpo em alta intensidade."),
    V("friday-fight-2", "Friday Fight Night · Round 2", 30, "Luta", "Versão mais difícil do treino de luta de sexta."),
    V("ab-attack-10", "Ab Attack 10", 10, "Abdômen", "Ab Maximizer: 10 min de abdômen depois do treino principal."),
    V("max-out-abs", "Max Out Abs", 15, "Abdômen", "Ab Maximizer: abdômen alternando exercícios sentado e em pé."),
    V("360-abs", "360° Abs", 16, "Abdômen", "Ab Maximizer: abdômen e core no chão, em prancha e mais."),
    V("max-out-15", "Max Out 15", 15, "Cardio", "15 min de cardio intenso. Bom para dias sem tempo."),
  ];
  // Músculos trabalhados (análise do conteúdo de cada treino) e o mapa usado na imagem (assets/musculos/<mapa>.webp)
  const MUSC = {
    "cardio-challenge": ["pernas", "Quadríceps, glúteos, posteriores, panturrilhas e abdômen"],
    "tabata-power": ["pernas", "Quadríceps, glúteos, posteriores e panturrilhas (saltos), com o core firme"],
    "sweat-intervals": ["pernas", "Pernas, glúteos e abdômen, com ombros nos movimentos de braço"],
    "sweat-fest": ["pernas", "Pernas, glúteos e abdômen, com ombros nos movimentos de braço"],
    "tabata-strength": ["forca", "Peitoral, ombros, tríceps, quadríceps, glúteos e abdômen"],
    "friday-fight-1": ["luta", "Ombros, oblíquos, abdômen, glúteos, quadríceps e panturrilhas"],
    "pulse": ["estabilidade", "Abdômen, oblíquos, lombar, glúteos e quadríceps, em ritmo moderado"],
    "max-out-cardio": ["pernas", "Quadríceps, glúteos, posteriores, panturrilhas e abdômen"],
    "max-out-power": ["pernas", "Quadríceps, glúteos, posteriores e panturrilhas (pliometria), com core"],
    "max-out-sweat": ["corpo", "Corpo inteiro: pernas, glúteos, core, ombros e peitoral"],
    "max-out-strength": ["forca", "Peitoral, ombros, tríceps, quadríceps, glúteos e abdômen"],
    "friday-fight-2": ["luta", "Ombros, oblíquos, abdômen, glúteos, quadríceps e panturrilhas"],
    "ab-attack-10": ["core", "Reto abdominal, oblíquos e flexores do quadril"],
    "max-out-abs": ["core", "Abdômen, oblíquos e flexores do quadril, sentado e em pé"],
    "360-abs": ["core", "Abdômen, oblíquos, lombar e ombros (pranchas)"],
    "max-out-15": ["pernas", "Pernas, glúteos e abdômen"],
  };
  VIDEOS.forEach((v) => { if (MUSC[v.id]) [v.mapa, v.musculos] = MUSC[v.id]; });
  const DESCANSO = { titulo: "Descanso", ids: [] };
  const dia = (titulo, ...ids) => ({ titulo, ids });
  const s = (ids) => dia(ids.map((i) => VIDEOS.find((v) => v.id === i).nome.replace(" · ", " ")).join(" + "), ...ids);
  const mes1 = (forca, [seg, qua, sab]) => [s(["cardio-challenge", ...seg]), s([forca]), s(["sweat-intervals", ...qua]), s([forca]), s(["friday-fight-1"]), s(["pulse", ...sab]), DESCANSO];
  const mes2 = ([seg, qua, sab]) => [s(["max-out-cardio", ...seg]), s(["max-out-power"]), s(["max-out-sweat", ...qua]), s(["max-out-strength"]), s(["friday-fight-2"]), s(["pulse", ...sab]), DESCANSO];
  const AA = ["ab-attack-10"], MA = ["max-out-abs"], A360 = ["360-abs"];
  const SEMANAS = [
    { nome: "Mês 1 · S1", dias: mes1("tabata-power", [[], [], []]) },
    { nome: "Mês 1 · S2", dias: mes1("tabata-power", [AA, AA, AA]) },
    { nome: "Mês 1 · S3", dias: mes1("tabata-strength", [MA, A360, AA]) },
    { nome: "Mês 1 · S4", dias: mes1("tabata-strength", [A360, MA, AA]) },
    { nome: "Mês 2 · S1", dias: mes2([[], [], []]) },
    { nome: "Mês 2 · S2", dias: mes2([AA, AA, AA]) },
    { nome: "Mês 2 · S3", dias: mes2([MA, A360, AA]) },
    { nome: "Mês 2 · S4", dias: mes2([A360, MA, AA]) },
  ];
  // Última semana: sábado é o Cardio Challenge final e domingo é a conclusão.
  SEMANAS[7].dias[5] = dia("Cardio Challenge final", "cardio-challenge");
  SEMANAS[7].dias[6] = { titulo: "Challenge Complete 🏆", ids: [], fim: true };
  return {
    k: "insanity", // chave antiga: os registros do MAX:30 já salvos usam "insanity"
    nome: "Insanity MAX:30",
    curto: "MAX:30",
    selo: "Ab Maximizer · 8 semanas",
    resumo: "Ab Maximizer · 8 semanas de vídeos · toque para começar",
    banner: "cards/forca-1.jpg",
    maxOut: true,
    nivel: "Iniciante",
    ordem: 1,
    sobre: "30 min por dia, 6 dias por semana, sem equipamento. Cardio e força com o peso do corpo, e cada um ajusta a intensidade (o Max Out mostra até onde aguentou). O melhor ponto de partida: cria o hábito e a base de condicionamento.",
    trocaAte: 4,
    extraTitulo: "Sem tempo?",
    coach: "O usuário registra o Max Out de cada vídeo (minuto em que precisou parar pela primeira vez; quanto mais tarde, melhor).",
    videos: VIDEOS,
    semanas: SEMANAS,
    trocas: { "sweat-intervals": "sweat-fest" },
    extra: "max-out-15",
    nota: "Em cada vídeo, anote o seu <b>Max Out</b>: o momento em que você precisou parar pela primeira vez. A meta é empurrar esse tempo para mais tarde a cada semana.",
  };
})();
