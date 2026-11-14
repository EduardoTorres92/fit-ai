/* FIT.AI — Insanity (o original, 60 dias / 9 semanas), montado a partir do calendário oficial
   ("Sample Insanity Calendar"): mês 1, semana de recuperação, mês 2 e Fit Test final.
   Os links dos vídeos NÃO ficam aqui: vêm de /api/videos (variável FITAI_VIDEOS_INSANITY no servidor).
   Durações aproximadas, em minutos. */
window.FITAI_INSANITY60 = (() => {
  const V = (id, nome, min, tipo, desc, extra = {}) => ({ id, nome, min, tipo, desc, ...extra });
  const VIDEOS = [
    V("fit-test", "Fit Test", 30, "Teste", "Teste de condicionamento: 8 movimentos de 1 minuto. Anote as repetições de cada um e compare com o teste anterior.", { fitTest: true }),
    V("plyometric-cardio-circuit", "Plyometric Cardio Circuit", 42, "Pliometria", "Circuito de saltos e cardio, com treino de pernas e explosão."),
    V("cardio-power-resistance", "Cardio Power & Resistance", 40, "Força", "Cardio intercalado com exercícios de força usando o peso do corpo."),
    V("cardio-recovery", "Cardio Recovery", 33, "Recuperação", "Treino mais leve de alongamento e força para o corpo se recuperar."),
    V("pure-cardio", "Pure Cardio", 39, "Cardio", "Cardio sem pausa, do começo ao fim. O mais puxado do mês 1."),
    V("cardio-abs", "Cardio Abs", 16, "Abdômen", "Abdômen em ritmo de cardio, feito depois do treino principal."),
    V("core-cardio-balance", "Core Cardio & Balance", 38, "Core", "Semana de recuperação: core, equilíbrio e cardio moderado."),
    V("max-interval-circuit", "Max Interval Circuit", 60, "Intervalos", "Mês 2: intervalos longos de alta intensidade com pausas curtas."),
    V("max-interval-plyo", "Max Interval Plyo", 55, "Pliometria", "Mês 2: pliometria pesada e exercícios de força explosiva."),
    V("max-cardio-conditioning", "Max Cardio Conditioning", 48, "Cardio", "Mês 2: cardio em blocos longos, para resistência máxima."),
    V("max-recovery", "Max Recovery", 48, "Recuperação", "Mês 2: recuperação ativa com força e alongamento."),
    V("max-interval-sports-training", "Max Interval Sports Training", 50, "Intervalos", "Mês 2: movimentos de esporte (agilidade, saltos, sprints) em intervalos."),
    V("insane-abs", "Insane Abs", 31, "Abdômen", "Mês 2: abdômen e core em alta intensidade."),
    V("upper-body-weight-training", "Upper Body Weight Training", 50, "Força", "Bônus: treino de superiores com halteres. Fora do calendário."),
  ];
  // Músculos trabalhados (análise do conteúdo de cada treino) e o mapa usado na imagem (assets/musculos/<mapa>.webp)
  const MUSC = {
    "fit-test": ["corpo", "Corpo inteiro: pernas, glúteos, core, ombros, peitoral e tríceps"],
    "plyometric-cardio-circuit": ["pernas", "Quadríceps, glúteos, posteriores e panturrilhas (saltos), com core"],
    "cardio-power-resistance": ["forca", "Peitoral, ombros, tríceps, quadríceps, glúteos e abdômen"],
    "cardio-recovery": ["estabilidade", "Quadríceps e glúteos (isometria), abdômen e lombar, com alongamento"],
    "pure-cardio": ["pernas", "Pernas, glúteos, panturrilhas e core, sem pausa"],
    "cardio-abs": ["core", "Reto abdominal, oblíquos e flexores do quadril"],
    "core-cardio-balance": ["estabilidade", "Abdômen, oblíquos, lombar, glúteos e equilíbrio"],
    "max-interval-circuit": ["corpo", "Corpo inteiro: pernas, glúteos, core, peitoral, ombros e tríceps"],
    "max-interval-plyo": ["forca", "Quadríceps, glúteos e panturrilhas (pliometria), peitoral, ombros e tríceps"],
    "max-cardio-conditioning": ["pernas", "Quadríceps, glúteos, posteriores, panturrilhas e abdômen"],
    "max-recovery": ["estabilidade", "Quadríceps e glúteos (isometria), core e ombros, com alongamento"],
    "max-interval-sports-training": ["luta", "Pernas, glúteos, panturrilhas, oblíquos e ombros (agilidade e saltos)"],
    "insane-abs": ["core", "Abdômen, oblíquos, lombar e flexores do quadril"],
    "upper-body-weight-training": ["superior", "Peitoral, costas, ombros, bíceps e tríceps (com halteres)"],
  };
  VIDEOS.forEach((v) => { if (MUSC[v.id]) [v.mapa, v.musculos] = MUSC[v.id]; });
  const N = Object.fromEntries(VIDEOS.map((v) => [v.id, v.nome]));
  const OFF = { titulo: "Descanso", ids: [] };
  const d = (...ids) => ({ titulo: ids.map((i) => N[i]).join(" + "), ids });
  const FT = "fit-test", PCC = "plyometric-cardio-circuit", CPR = "cardio-power-resistance", CR = "cardio-recovery",
    PC = "pure-cardio", CA = "cardio-abs", CCB = "core-cardio-balance", MIC = "max-interval-circuit", MIP = "max-interval-plyo",
    MCC = "max-cardio-conditioning", MR = "max-recovery", MIST = "max-interval-sports-training", IA = "insane-abs";
  // Segunda a domingo (o 7º dia do calendário é sempre o descanso, menos na última semana)
  const SEMANAS = [
    { nome: "Mês 1 · S1", dias: [d(FT), d(PCC), d(CPR), d(CR), d(PC), d(PCC), OFF] },
    { nome: "Mês 1 · S2", dias: [d(CPR), d(PC), d(PCC), d(CR), d(CPR), d(PC, CA), OFF] },
    { nome: "Mês 1 · S3", dias: [d(FT), d(PCC), d(PC, CA), d(CR), d(CPR), d(PCC), OFF] },
    { nome: "Mês 1 · S4", dias: [d(PC, CA), d(CPR), d(PCC), d(CR), d(PC, CA), d(PCC), OFF] },
    { nome: "Recuperação", dias: [d(CCB), d(CCB), d(CCB), d(CCB), d(CCB), d(CCB), OFF] },
    { nome: "Mês 2 · S1", dias: [d(FT, MIC), d(MIP), d(MCC), d(MR), d(MIC), d(MIP), OFF] },
    { nome: "Mês 2 · S2", dias: [d(MCC), d(MIC), d(MIP), d(MR), d(MCC, IA), d(MIST), OFF] },
    { nome: "Mês 2 · S3", dias: [d(FT, MIC), d(MIP), d(MCC, IA), d(MR), d(MIC), d(MIST), OFF] },
    { nome: "Mês 2 · S4", dias: [d(MIP), d(MCC, IA), d(MIC), d(MIST), d(MIP), d(MCC, IA), { titulo: "Fit Test final 🏆", ids: [FT] }] },
  ];
  return {
    k: "insanity60",
    nome: "Insanity",
    curto: "Insanity",
    selo: "60 dias · 9 semanas",
    resumo: "O original · 60 dias de vídeos · toque para começar",
    banner: "login.jpg",
    maxOut: false,
    nivel: "Intermediário",
    ordem: 2,
    sobre: "40 a 60 min por dia, 6 dias por semana, sem equipamento. Intervalos máximos com descanso curto; exige base de cardio. O mês 2 é bem mais longo e intenso. O Fit Test a cada 2 semanas mostra a evolução.",
    videos: VIDEOS,
    semanas: SEMANAS,
    extra: "upper-body-weight-training",
    extraTitulo: "Bônus",
    fitTest: ["Switch Kicks", "Power Jacks", "Power Knees", "Power Jumps", "Globe Jumps", "Suicide Jumps", "Push-Up Jacks", "Low Plank Oblique"],
    nota: "Faça o <b>Fit Test</b> no começo, nas semanas 3, 6 e 8 e no fim: anote quantas repetições fez em cada movimento e veja a evolução. Nos outros dias, é dar o máximo e marcar o vídeo como feito.",
    coach: "O usuário marca cada vídeo como feito e, nos dias de Fit Test, anota as repetições de 8 movimentos (Switch Kicks, Power Jacks, Power Knees, Power Jumps, Globe Jumps, Suicide Jumps, Push-Up Jacks, Low Plank Oblique). Mais repetições = melhor.",
  };
})();
