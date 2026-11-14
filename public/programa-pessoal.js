/* Treino da Fera (Arbon): o programa de calistenia do FIT.AI, nível avançado do caminho
   MAX:30 → Insanity → Treino da Fera. Se este arquivo não existir, o app usa o programa
   de exemplo que está no app.js. */
window.FITAI_PROGRAMA = (E, D) => {
  const DESAFIO = D("Fullbody", "Desafio da Fera", [E("flexao", "Flexões", 1, 100), E("abdominal", "Abdominais", 1, 100), E("agachamento", "Agachamentos", 1, 100)], "Acordar e mandar: divida em quantas séries precisar.");
  const SUPERIOR = D("Superior", "Superior · Supersérie", [
    E("flexao-comum", "Flexão tradicional", 3, "15–25", { obs: "Supersérie A · direto para a barra" }),
    E("barra-pronada", "Barra fixa pronada", 3, "5–12", { obs: "Supersérie A · sem barra? use elástico" }),
    E("flexao-diamante", "Flexão diamante", 3, "10–20", { obs: "Supersérie B · mãos juntas, peito encosta" }),
    E("chin-up", "Barra fixa supinada", 3, "5–10", { obs: "Supersérie B" }),
    E("flexao-pike", "Flexão pike", 3, "8–15", { obs: "Supersérie C · quadril bem alto" }),
    E("barra-australiana", "Remada australiana", 3, "12–20", { obs: "Supersérie C · cotovelo junto ao corpo" }),
    E("flexao-leve", "Finalizador: flexões leves", 2, 15, { obs: "60 s entre séries" }),
    E("remada-australiana-fin", "Finalizador: remada australiana", 2, 15, { obs: "60 s entre séries" })],
    "3 voltas por bloco · 15–20 s entre exercícios · 75–90 s entre voltas");
  const INFERIOR = D("Inferior", "Inferior · Triset", [
    E("agachamento", "Agachamento completo", 3, "20–30", { obs: "Triset A · quadril até a paralela" }),
    E("ponte-gluteos", "Ponte de glúteos", 3, "20–25", { obs: "Triset A" }),
    E("panturrilha-em-pe", "Panturrilha em pé", 3, "25–35", { obs: "Triset A · estica e desce tudo" }),
    E("afundo-reverso", "Afundo reverso", 3, 12, { lado: true, obs: "Triset B · joelho quase no chão" }),
    E("agachamento-sumo", "Agachamento sumô", 3, "20–25", { obs: "Triset B · pontas dos pés para fora" }),
    E("panturrilha-unilateral", "Panturrilha unilateral", 3, "12–20", { lado: true, obs: "Triset B" }),
    E("agachamento-isometrico", "Finalizador: isometria na parede", 2, 30, { un: "s", obs: "45 s de descanso" })],
    "3 voltas por bloco · 20 s entre exercícios · 90 s entre voltas");
  const TIRO = (extra = "") => D("Tiro", "Tiro · 5 × 200 m", [
    E("trote", "Aquecimento: trote leve", 1, 10, { un: "min" }),
    E("tiro-200", "Tiro de 200 m", 5, 200, { un: "tiro", obs: "Velocidade máxima · anote o tempo de cada tiro em segundos" })],
    "3 a 5 min de descanso entre os tiros" + extra);
  const OPCIONAL = D("Opcional", "Opcional", [E("flexao", "Flexões", 1, 100), E("agachamento", "Agachamentos", 1, 100), E("abdominal", "Abdominais", 1, 100)], "Dia opcional: se quiser treinar, faça o 100/100/100 no seu ritmo.");

  const PROGRAMA = [
    { nome: "Ativação", nota: "Antes de cada treino: <b>Respiração do Fogo</b> — sentado, 5 séries (pode dar tontura). Sem regra: movimente o corpo e faça força, com cuidado.", dias: [
      D("Empurrar", "100 Flexões", [E("flexao-comum", "Flexão comum", 1, 20), E("flexao-diamante", "Flexão diamante", 1, 20), E("flexao-aberta", "Flexão aberta", 1, 20),
        E("flexao-mike-tyson", "Flexão Mike Tyson", 1, 20), E("flexao-explosiva", "Flexão explosiva", 1, 20)]),
      D("Puxar", "50 Barras", [E("barra-aberta", "Barra aberta", 1, 10), E("barra-fechada", "Barra fechada", 1, 10), E("barra-pronada", "Barra pronada", 1, 10),
        E("barra-australiana", "Barra australiana", 1, 10), E("barra-isometrica", "Barra isométrica", 1, 10)]),
      DESAFIO,
      D("Core", "Treino de Core", [E("abdominal-pendurado", "Abdominal pendurado", 1, 100)]),
      D("Pernas", "100 Pulos", [E("pulos", "Pulos", 1, 100)]),
      DESAFIO, DESAFIO] },
    { nome: "Volume", nota: "<b>Esmague:</b> no ponto final de cada repetição, contração máxima para romper a fibra. Descanso de 1 min.", dias: [
      D("Empurrar", "Treino de Empurrar", [E("flexao-comum", "Flexão tradicional", 3, 15), E("flexao-militar", "Flexão militar", 3, 15),
        E("flexao-pike", "Flexão pike", 3, 15), E("flexao-diamante", "Flexão diamante", 3, 15)], "1 min de descanso"),
      D("Perna", "Treino de Pernas", [E("agachamento", "Agachamentos", 1, 50), E("pistol-squat", "Pistol squat", 4, 10, { lado: true }),
        E("afundo", "Afundo alternado", 4, 16), E("flexao-nordica-reversa", "Flexão nórdica reversa", 3, 12)]),
      D("Disciplina", "Treino de Disciplina", [E("flexao", "Flexões", 4, 25, { obs: "Desça em 3 s e suba explosivo · joelhos apoiados se precisar" })], "1 min de descanso · total: 100 flexões"),
      D("Core", "Treino de Core", [E("core-barra", "Core na barra", 10, 10)]),
      D("Puxar", "Treino de Puxar", [E("barra-aberta", "Barra pronada aberta", 4, 8, { obs: "Descida controlada · foco na dorsal" }),
        E("remada-aberta", "Remada aberta", 3, 8, { obs: "Corpo mais horizontal = mais difícil" }),
        E("chin-up", "Chin-up", 4, 8, { obs: "Pegada supinada · largura dos ombros" }),
        E("remada-fechada", "Remada fechada", 3, 10, { obs: "Pegada fechada · foco na dorsal" }),
        E("drop-aberta", "Drop set pegada aberta", 1, 32, { obs: "8 barras + 8 remadas, avançando 1 passo a cada 8 · sem descanso" }),
        E("drop-supinada", "Drop set pegada supinada", 1, 32, { obs: "8 chin-ups + 8 remadas fechadas, avançando 1 passo a cada 8 · sem descanso" })]),
      D("Autodisciplina", "Autodisciplina", [E("agachamento", "Agachamentos", 10, 10)], "1 min de descanso · total: 100"),
      D("Disciplina", "Treino de Disciplina", [E("abdominal-canivete", "Abdominal canivete", 10, 10)])] },
    { nome: "Densidade", nota: "<b>Força:</b> escolha variações em que poucas repetições já sejam realmente difíceis. Descansos longos.", dias: [
      D("Empurrar", "Empurrada de Força", [
        E("hspu", "Handstand push-up (progressão)", 5, "3–6", { obs: "Descanso 3 min · pike → pés elevados → parede → amplitude" }),
        E("flexao-arqueiro", "Flexão arqueiro", 4, "4–6", { lado: true, obs: "Descanso 2 min 30 s" }),
        E("flexao-unilateral", "Flexão unilateral (progressão)", 4, "3–5", { lado: true, obs: "Descanso 3 min" }),
        E("pseudo-planche", "Pseudo planche push-up", 3, "5–8", { obs: "Descanso 2 min · ombros à frente das mãos" })]),
      D("Perna", "Treino de Pernas", [
        E("pistol-squat", "Pistol squat", 5, 6, { lado: true, obs: "Descanso ~3 min · sem pistol? agachamento padrão" }),
        E("afundo-reverso", "Afundo reverso", 4, 6, { lado: true, obs: "Mãos na cabeça, tronco inclinado" }),
        E("flexao-nordica-reversa", "Flexão nórdica reversa", 3, 5, { obs: "De joelhos, mãos no peito" }),
        E("panturrilha-unilateral", "Panturrilha unilateral", 3, 8, { lado: true, obs: "2 s no topo · direto, sem descanso" })]),
      D("Disciplina", "Disciplina da Força", [E("pistol-squat", "Pistol squat", 1, 50), E("flexao-unilateral", "Push-up com uma mão", 1, 50), E("abdominal-canivete", "Abdominal canivete", 1, 50)]),
      D("Puxar", "Treino de Puxar", [E("barra-uma-mao", "Barra com uma mão", 5, 5, { lado: true, obs: "Com assistência do outro braço" }),
        E("remada-uma-mao", "Remada com uma mão", 5, 5, { lado: true })]),
      D("Core", "Core e Tensão Corporal", [
        E("l-sit", "L-sit", 5, "10–20", { un: "s", obs: "Descanso 90–120 s · tuck → uma perna → completo" }),
        E("dragon-flag", "Dragon flag", 4, "3–6", { obs: "Descanso 2 min 30 s a 3 min" }),
        E("abdominal-pendurado", "Hanging leg raise", 4, "5–8", { obs: "Descanso 2 min · sem balanço" }),
        E("hollow", "Hollow body hold", 3, "20–30", { un: "s", obs: "Descanso 90 s · lombar colada no chão" }),
        E("rkc-plank", "RKC plank", 4, "10–20", { un: "s", obs: "Tensão total · descanso 60–90 s" })]),
      OPCIONAL, OPCIONAL] },
    { nome: "Vascularização", nota: "<b>Pump:</b> repetições altas, descanso curto e movimento contínuo. Faça o bloco em sequência e só depois descanse.", dias: [
      SUPERIOR, INFERIOR, TIRO(), SUPERIOR, INFERIOR, TIRO(), TIRO(" · + mobilidade extra")] },
  ];
  const EMERGENCIA = D("Emergência", "Emergência · 15 min", [E("flexao", "Flexões", 1, 100), E("agachamento", "Agachamentos", 1, 100), E("abdominal", "Abdominais", 1, 100)],
    "Cronômetro de 15 min. Avance no seu ritmo; quando o tempo acabar, missão cumprida.");
  return {
    nome: "Treino da Fera",
    ciclo: "Depois da semana 4 o ciclo recomeça na semana 1 (Mapa dos 90 dias: repetir e ficar melhor). Se ficar mais de 7 dias parado: protocolo de retomada (voltar dentro da capacidade atual).",
    programa: PROGRAMA,
    emergencia: EMERGENCIA,
  };
};
