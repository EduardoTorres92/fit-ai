/* FIT.AI — Insanity MAX:30 com Ab Maximizer (calendário de 8 semanas).
   Os links dos vídeos NÃO ficam aqui: ficam em public/insanity-videos.js (fora do GitHub),
   no formato window.FITAI_INSANITY_VIDEOS = { "cardio-challenge": "<id do arquivo no Drive>", ... } */
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
    nome: "Insanity MAX:30",
    videos: VIDEOS,
    semanas: SEMANAS,
    trocas: { "sweat-intervals": "sweat-fest" },
    extra: "max-out-15",
    nota: "Em cada vídeo, anote o seu <b>Max Out</b>: o momento em que você precisou parar pela primeira vez. A meta é empurrar esse tempo para mais tarde a cada semana.",
  };
})();
