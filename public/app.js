/* FIT.AI — caderno de treino de calistenia (HTML/CSS/JS puro) */
(() => {
  "use strict";

  const A = (f) => `assets/${f}`;
  const DIAS = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];
  const INICIAIS = ["S", "T", "Q", "Q", "S", "S", "D"];
  const MESES = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

  /* ---------- Programa de treino ---------- */
  // E(id, nome, séries, reps|"min–max", { un: "reps"|"s"|"min"|"tiro", lado, obs })
  const E = (id, nome, s, r, o = {}) => {
    const min = typeof r === "string" ? parseInt(r, 10) : r;
    return { id, nome, s, r, un: o.un || "reps", lado: !!o.lado, obs: o.obs || "", meta: o.un === "tiro" ? s : s * min };
  };
  const D = (foco, titulo, ex, obs = "") => ({ foco, titulo, ex, obs });
  // Programa de EXEMPLO. Se existir public/programa-pessoal.js (Treino da Fera), ele substitui este.
  const EXEMPLO = (E, D) => {
    const BASE = D("Fullbody", "Circuito Base", [E("flexao", "Flexões", 3, "10–15"), E("agachamento", "Agachamentos", 3, "15–20"), E("abdominal", "Abdominais", 3, "15–20")], "60 s de descanso entre as séries.");
    const LIVRE = D("Opcional", "Descanso ativo", [E("caminhada", "Caminhada leve", 1, 20, { un: "min" }), E("alongamento", "Alongamento geral", 1, 10, { un: "min" })], "Dia leve: movimente o corpo sem cansar.");
    const TIRO = D("Tiro", "Tiro · 4 × 200 m", [E("trote", "Aquecimento: trote leve", 1, 10, { un: "min" }),
      E("tiro-200", "Tiro de 200 m", 4, 200, { un: "tiro", obs: "Forte, mas controlado · anote o tempo de cada tiro em segundos" })], "2 a 3 min de descanso entre os tiros");
    const PROGRAMA = [
      { nome: "Base", nota: "<b>Técnica primeiro:</b> movimento completo e controlado. Pare a série 2 repetições antes da falha.", dias: [
        D("Empurrar", "Empurrar · Base", [E("flexao-comum", "Flexão comum", 3, "8–12"), E("flexao-inclinada", "Flexão inclinada", 3, "10–15", { obs: "Mãos num banco ou degrau" }), E("mergulho-banco", "Mergulho no banco", 3, "8–12")], "90 s de descanso"),
        D("Pernas", "Pernas · Base", [E("agachamento", "Agachamento livre", 3, "15–20"), E("afundo", "Afundo alternado", 3, 10, { lado: true }), E("ponte-gluteos", "Ponte de glúteos", 3, "15–20")], "90 s de descanso"),
        BASE,
        D("Puxar", "Puxar · Base", [E("barra-australiana", "Remada australiana", 3, "8–12", { obs: "Numa mesa firme ou barra baixa" }), E("barra-negativa", "Barra negativa", 3, "3–5", { obs: "Desça em 4 s" }), E("superman", "Superman", 3, 15)], "90 s de descanso"),
        D("Core", "Core · Base", [E("prancha", "Prancha", 3, "30–45", { un: "s" }), E("elevacao-pernas", "Elevação de pernas deitado", 3, "10–15"), E("prancha-lateral", "Prancha lateral", 2, 20, { un: "s", lado: true })]),
        LIVRE, LIVRE] },
      { nome: "Volume", nota: "<b>Mais repetições:</b> tente somar 1 a 2 repetições por série em relação à semana passada.", dias: [
        D("Empurrar", "Empurrar · Volume", [E("flexao-comum", "Flexão comum", 4, "10–15"), E("flexao-diamante", "Flexão diamante", 3, "6–10"), E("flexao-pike", "Flexão pike", 3, "6–10", { obs: "Quadril alto, foco no ombro" })], "75 s de descanso"),
        D("Pernas", "Pernas · Volume", [E("agachamento", "Agachamento livre", 4, "20–25"), E("agachamento-bulgaro", "Agachamento búlgaro", 3, 10, { lado: true }), E("panturrilha-em-pe", "Panturrilha em pé", 3, "20–25")], "75 s de descanso"),
        TIRO,
        D("Puxar", "Puxar · Volume", [E("barra-australiana", "Remada australiana", 4, "10–15"), E("chin-up", "Barra supinada", 3, "3–8", { obs: "Use elástico se precisar" }), E("barra-isometrica", "Isometria no topo da barra", 3, 10, { un: "s" })], "75 s de descanso"),
        D("Core", "Core · Volume", [E("prancha", "Prancha", 3, "45–60", { un: "s" }), E("abdominal-bicicleta", "Abdominal bicicleta", 3, 20), E("hollow", "Hollow body hold", 3, "15–20", { un: "s" })]),
        BASE, LIVRE] },
      { nome: "Força", nota: "<b>Variações mais difíceis:</b> poucas repetições, descanso longo e execução perfeita.", dias: [
        D("Empurrar", "Empurrar · Força", [E("flexao-arqueiro", "Flexão arqueiro", 4, "4–6", { lado: true }), E("flexao-pes-elevados", "Flexão com pés elevados", 4, "8–10"), E("flexao-pike", "Flexão pike", 4, "6–8")], "2 min de descanso"),
        D("Pernas", "Pernas · Força", [E("pistol-squat", "Pistol squat assistido", 4, "4–6", { lado: true, obs: "Segure num batente para equilibrar" }), E("agachamento-salto", "Agachamento com salto", 4, 8), E("panturrilha-unilateral", "Panturrilha unilateral", 3, 12, { lado: true })], "2 min de descanso"),
        TIRO,
        D("Puxar", "Puxar · Força", [E("barra-pronada", "Barra fixa pronada", 5, "3–6"), E("remada-uma-mao", "Remada australiana com uma mão", 3, "4–6", { lado: true }), E("barra-negativa", "Barra negativa", 3, 3, { obs: "Desça em 6 s" })], "2 min de descanso"),
        D("Core", "Core · Força", [E("l-sit", "L-sit (progressão)", 4, "8–15", { un: "s" }), E("abdominal-pendurado", "Elevação de joelhos na barra", 4, "8–12")]),
        BASE, LIVRE] },
      { nome: "Resistência", nota: "<b>Circuito:</b> um exercício atrás do outro, descanse só no fim de cada volta.", dias: [
        D("Superior", "Superior · Circuito", [E("flexao-comum", "Flexão comum", 4, 15), E("barra-australiana", "Remada australiana", 4, 12), E("mergulho-banco", "Mergulho no banco", 4, 12)], "4 voltas · 90 s entre voltas"),
        D("Inferior", "Inferior · Circuito", [E("agachamento", "Agachamento livre", 4, 25), E("afundo", "Afundo alternado", 4, 12, { lado: true }), E("agachamento-isometrico", "Isometria na parede", 4, 30, { un: "s" })], "4 voltas · 90 s entre voltas"),
        TIRO,
        D("Superior", "Superior · Circuito", [E("flexao-diamante", "Flexão diamante", 4, 10), E("chin-up", "Barra supinada", 4, "4–8"), E("flexao-pike", "Flexão pike", 4, 8)], "4 voltas · 90 s entre voltas"),
        D("Inferior", "Inferior · Circuito", [E("agachamento-salto", "Agachamento com salto", 4, 12), E("ponte-gluteos", "Ponte de glúteos", 4, 20), E("panturrilha-em-pe", "Panturrilha em pé", 4, 25)], "4 voltas · 90 s entre voltas"),
        BASE, LIVRE] },
    ];
    const EMERGENCIA = D("Emergência", "Emergência · 15 min", [E("flexao", "Flexões", 1, 50), E("agachamento", "Agachamentos", 1, 50), E("abdominal", "Abdominais", 1, 50)],
      "Cronômetro de 15 min. Avance no seu ritmo; quando o tempo acabar, missão cumprida.");
    return { nome: "Calistenia Base", ciclo: "Depois da semana 4 o ciclo recomeça na semana 1: repita o programa tentando fazer um pouco melhor. Se ficar mais de 7 dias parado, volte com cargas mais leves.", programa: PROGRAMA, emergencia: EMERGENCIA };
  };
  const P = (typeof window.FITAI_PROGRAMA === "function" ? window.FITAI_PROGRAMA : EXEMPLO)(E, D);
  const PROGRAMA = P.programa, EMERGENCIA = P.emergencia, NOME_PROG = P.nome, CICLO = P.ciclo;
  // Calistenia no catálogo de programas (nível e descrição podem vir do programa pessoal)
  const CALI = { k: "plano", nome: NOME_PROG, curto: NOME_PROG, nivel: P.nivel || "Avançado", ordem: P.ordem || 3,
    sobre: P.sobre || "Calistenia com barra: flexões, barras, agachamentos e core, anotando as repetições de cada série com progressão semana a semana. Pede força de base (conseguir fazer algumas barras ajuda muito)." };
  const IMG = { Empurrar: "login.jpg", Superior: "login.jpg", Puxar: "treino-superiores-2.jpg", Pernas: "treino-inferiores-1.jpg",
    Perna: "treino-inferiores-1.jpg", Inferior: "treino-inferiores-1.jpg", Core: "treino-inferiores-2.jpg", Tiro: "treino-inferiores-1.jpg" };
  const imgDe = (t) => A(IMG[t.foco] || "banner-home.jpg");
  const TODOS_EX = [...new Map(PROGRAMA.flatMap((s) => s.dias).concat([EMERGENCIA]).flatMap((d) => d.ex || []).reverse().map((e) => [e.id, e])).values()].reverse();
  const EXI = Object.fromEntries(TODOS_EX.map((e) => [e.id, e]));
  const UN = { reps: "", s: "s", min: "min", tiro: "s" };
  const prescricao = (e) => e.un === "tiro" ? `${e.s} × ${e.r} m` : `${e.s > 1 ? `${e.s} × ` : ""}${e.r}${UN[e.un]}${e.lado ? " por lado" : ""}`;

  /* Dicas do Coach: id -> [execução, erros] (orientações dos PDFs quando existem) */
  const DICAS = {
    "flexao-comum": ["Mãos um pouco mais abertas que os ombros, corpo em prancha (glúteo e abdome contraídos). Desça até o peito quase tocar o chão, cotovelos a ~45° do tronco, e empurre.", "Quadril caído ou empinado, amplitude curta e cotovelos abertos a 90°."],
    flexao: ["Corpo em prancha, mãos na linha do peito. Desça controlando e empurre sem perder o alinhamento. Se não conseguir com os pés no chão, apoie os joelhos.", "Perder a prancha no fim das séries por cansaço — se o quadril cair, pare, respire e volte com a técnica limpa."],
    "flexao-diamante": ["Mãos juntas embaixo do peito formando um diamante. Cotovelos descem rente ao corpo, descendo até encostar o peito — foco no tríceps.", "Deixar os cotovelos abrirem e não completar a descida."],
    "flexao-aberta": ["Mãos bem mais abertas que os ombros. Desça o peito entre as mãos — mais foco no peitoral.", "Abrir tanto que o ombro incomoda e encurtar a descida."],
    "flexao-mike-tyson": ["Variação dinâmica e intensa para peito, ombro e tríceps. Siga a demonstração da aula e mantenha o abdome firme.", "Acelerar e perder o controle — qualidade antes da velocidade."],
    "flexao-explosiva": ["Desça controlando e empurre com força máxima para as mãos saírem do chão. Aterrisse com cotovelos levemente flexionados.", "Aterrissar com os braços travados e perder a prancha."],
    "flexao-militar": ["Mãos na largura dos ombros e cotovelos colados ao corpo, apontando para trás. Corpo em prancha rígida.", "Abrir os cotovelos e deixar o quadril cair."],
    "flexao-pike": ["Quadril bem alto, corpo em V invertido. Desça a cabeça em direção ao chão à frente das mãos e empurre — foco no ombro.", "Quadril baixo (vira flexão comum) e cotovelos abrindo demais."],
    "flexao-leve": ["Flexões em ritmo confortável, só para manter o sangue circulando no finalizador.", "Transformar o finalizador em teste de força."],
    hspu: ["Escolha a progressão em que 6 repetições já sejam difíceis: pike push-up → pike com pés elevados → handstand push-up na parede → HSPU com maior amplitude.", "Escolher uma versão fácil demais (vira resistência, não força) ou perder o controle da descida."],
    "flexao-arqueiro": ["Mãos bem abertas: desça em direção a uma das mãos enquanto o outro braço fica quase estendido. Desça controlado e suba com força.", "Girar o quadril e deixar o braço de apoio fazer todo o trabalho."],
    "flexao-unilateral": ["Progrida: pernas mais abertas e mão de apoio mais elevada deixam mais fácil. Conforme evoluir, aproxime os pés e reduza a assistência.", "Girar o tronco para compensar e descer sem controle."],
    "pseudo-planche": ["Incline os ombros à frente das mãos durante todo o movimento. A dificuldade vem da alavanca do corpo, não do número de repetições.", "Ombros voltando para trás das mãos ao cansar."],
    "barra-aberta": ["Pegada bem mais aberta que os ombros, palmas para frente. Puxe o peito em direção à barra com descida controlada — foco na dorsal.", "Balançar o corpo e não estender os braços na descida."],
    "barra-fechada": ["Mãos próximas na barra. Puxe até o queixo passar, cotovelos rente ao corpo.", "Subir só até a metade e soltar o corpo na descida."],
    "barra-pronada": ["Palmas para frente, mãos na largura dos ombros. Escápulas para baixo antes de puxar e suba até o queixo passar da barra.", "Encolher os ombros e usar impulso das pernas."],
    "chin-up": ["Pegada supinada (palmas para você) na largura dos ombros. Puxe até o queixo passar da barra — muito bíceps.", "Encurtar a amplitude e balançar."],
    "barra-australiana": ["Barra na altura do quadril, corpo reto embaixo dela. Puxe o peito até a barra com o cotovelo junto ao corpo. Quanto mais horizontal, mais difícil.", "Quadril caindo (corpo em V) e não encostar o peito."],
    "remada-australiana-fin": ["Remada australiana em ritmo controlado no finalizador, 15 repetições.", "Perder o alinhamento do corpo."],
    "barra-isometrica": ["Suba até o queixo passar da barra e segure parado, escápulas para baixo e abdome firme.", "Ficar com os braços meio estendidos e prender a respiração."],
    "remada-aberta": ["Pegada aberta, corpo reto. Puxe o peito até a barra. Corpo mais horizontal = mais difícil.", "Quadril caindo e puxar só com os braços."],
    "remada-fechada": ["Pegada fechada, cotovelos rente ao corpo. Puxe pensando em levar os cotovelos para trás — foco na dorsal.", "Encolher os ombros."],
    "drop-aberta": ["Sem descanso: 8 barras abertas + 8 remadas abertas mais horizontal, depois 8 remadas 1 passo à frente e mais 8 com mais 1 passo à frente.", "Parar para descansar entre as etapas."],
    "drop-supinada": ["Sem descanso: 8 chin-ups + 8 remadas fechadas mais horizontal, depois 8 remadas 1 passo à frente e mais 8 com mais 1 passo à frente.", "Parar para descansar entre as etapas."],
    "barra-uma-mao": ["Uma mão na barra e a outra ajudando (no pulso, antebraço ou numa toalha). Use a assistência do outro braço conforme necessário.", "Girar o corpo e puxar com o braço de apoio."],
    "remada-uma-mao": ["Uma mão na barra baixa, corpo reto. Puxe com o cotovelo junto ao corpo, sem girar o tronco.", "Rotacionar o tronco para ajudar."],
    abdominal: ["Lombar apoiada no chão. Suba enrolando a coluna, contraindo o abdome, e desça devagar. Mãos não puxam a cabeça.", "Puxar o pescoço e usar impulso."],
    "abdominal-canivete": ["Deitado, braços estendidos atrás da cabeça. Suba tronco e pernas ao mesmo tempo, tocando as mãos nos pés, e desça controlando.", "Dobrar muito os joelhos e cair na descida."],
    "abdominal-pendurado": ["Pendurado na barra, sem balanço. Eleve as pernas enrolando a pelve; se ficar fácil, leve os pés até a barra.", "Balançar e usar impulso — se balançar, pause e estabilize."],
    "core-barra": ["Pendurado na barra: elevação de joelhos ou pernas, sem balanço, 10 por série.", "Usar impulso do balanço."],
    "l-sit": ["Mãos no chão ou paralelas, braços travados, ombros para baixo. Progressão: tuck sit → L-sit com uma perna → L-sit completo.", "Ombros subindo nas orelhas e joelhos dobrando."],
    "dragon-flag": ["Deitado no banco segurando atrás da cabeça, corpo reto como uma tábua. Progressão: tuck → uma perna → negativas → completo.", "Dobrar o quadril e despencar na descida."],
    hollow: ["Deitado, lombar pressionada contra o chão, braços e pernas estendidos e elevados — corpo em forma de banana.", "Lombar desgrudando do chão."],
    "rkc-plank": ["Prancha de curta duração com contração máxima: abdômen, glúteos, quadríceps, dorsais e braços. Imagine puxar os cotovelos em direção aos pés.", "Fazer uma prancha relaxada e longa — aqui o objetivo é tensão total."],
    agachamento: ["Pés na largura dos ombros, pontas levemente para fora. Quadril para trás e para baixo até pelo menos a paralela, joelhos na linha dos pés.", "Joelhos caindo para dentro e calcanhar saindo do chão."],
    "agachamento-sumo": ["Pés bem afastados, pontas para fora. Desça com o tronco reto, joelhos apontando para os pés.", "Joelhos caindo para dentro."],
    "agachamento-isometrico": ["Costas na parede, joelhos a 90°, segure o tempo todo sem apoiar as mãos nas pernas.", "Subir o quadril acima da linha dos joelhos."],
    "pistol-squat": ["Uma perna estendida à frente, desça até o máximo e empurre. Apoie-se em algo se precisar; sem pistol, faça agachamento padrão.", "Calcanhar saindo do chão e joelho caindo para dentro."],
    afundo: ["Passo à frente, desça até o joelho de trás quase tocar o chão, alternando as pernas.", "Joelho da frente caindo para dentro e passo curto demais."],
    "afundo-reverso": ["Passo para trás, tronco levemente inclinado, desça até roçar o joelho no chão e volte empurrando com a perna da frente.", "Perder o equilíbrio por passo muito estreito."],
    "flexao-nordica-reversa": ["De joelhos, mãos no peito, corpo reto do joelho à cabeça. Incline para trás o máximo que controlar e volte — foco no quadríceps.", "Dobrar o quadril em vez de manter o corpo reto."],
    "ponte-gluteos": ["Deitado, pés apoiados perto do quadril. Empurre o quadril para cima o máximo que conseguir, contraia o glúteo e desça.", "Arquear a lombar em vez de usar o glúteo."],
    "panturrilha-em-pe": ["Suba na ponta dos pés o máximo possível e desça tudo, esticando bem.", "Amplitude curta e quicar."],
    "panturrilha-unilateral": ["Num degrau, com apoio para a mão. Suba numa perna só, segure no topo e desça abaixo da linha do degrau.", "Amplitude curta e pressa."],
    pulos: ["Aterrisse na ponta dos pés com joelhos levemente flexionados, amortecendo. Ritmo constante.", "Aterrissar com as pernas travadas."],
    trote: ["Corrida tranquila de 10 minutos para preparar o corpo antes dos tiros.", "Começar rápido demais e chegar cansado nos tiros."],
    "tiro-200": ["Aqueça 10 min. Corra 200 m na velocidade máxima, sustentando do começo ao fim. Descanse 3–5 min entre os tiros. Anote o tempo de cada tiro.", "Pular o aquecimento e descansar pouco entre os tiros (o objetivo é explosão máxima em todos)."],
  };

  /* ---------- Datas (fuso local) ---------- */
  const pad = (n) => String(n).padStart(2, "0");
  const keyOf = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const parseKey = (k) => { const [y, m, d] = k.split("-").map(Number); return new Date(y, m - 1, d); };
  const addDays = (d, n) => { const x = new Date(d.getFullYear(), d.getMonth(), d.getDate()); x.setDate(x.getDate() + n); return x; };
  const mondayOf = (d) => addDays(d, -((d.getDay() + 6) % 7));
  const diffDays = (a, b) => Math.round((parseKey(keyOf(b)) - parseKey(keyOf(a))) / 864e5);
  const ddmm = (k) => k.slice(8, 10) + "/" + k.slice(5, 7);
  const hoje = new Date();
  const hojeKey = keyOf(hoje);
  const hojeDia = (hoje.getDay() + 6) % 7;

  /* ---------- Programas em vídeo (public/insanity.js = MAX:30, public/insanity60.js = Insanity) ----------
     Cada um tem uma chave (k) que também é a chave do estado (S[k]), da rota (#/k/semana/dia) e do campo
     "programa" no Supabase. O MAX:30 usa "insanity" para continuar lendo os registros antigos. */
  const VPROGS = [window.FITAI_INSANITY, window.FITAI_INSANITY60].filter((p) => p && p.semanas && p.semanas.length);
  VPROGS.forEach((p) => { p.k = p.k || "insanity"; p.trocas = p.trocas || {}; p.trocaAte = p.trocaAte ?? 0; p.curto = p.curto || p.nome; });
  const VP = Object.fromEntries(VPROGS.map((p) => [p.k, p]));
  const VKEYS = VPROGS.map((p) => p.k);
  const vazioVP = () => ({ inicio: null, logs: {} });
  const vazioHiper = () => ({ perfil: {}, etapa: 0, plano: null, inicio: null, logs: {}, checkins: [], msgs: [] });
  // Catálogo em ordem de nível: o caminho natural é do primeiro ao último (MAX:30 → Insanity → calistenia)
  // Hipertrofia (academia) é um programa à parte: entra no catálogo (dá para escolher como principal), mas não no caminho de níveis
  const HIPER = { k: "hiper", nome: "Hipertrofia", curto: "Hipertrofia", nivel: "Academia", ordem: 99, extra: true,
    sobre: "Musculação na academia: o Coach AI faz uma entrevista (objetivo, dias, experiência, peso) e monta o treino semanal, com registro de carga e repetições, vídeo de execução em cada exercício e revisão semanal do plano." };
  const CATALOGO = [...VPROGS, CALI, ...(window.FITAI_ACADEMIA ? [HIPER] : [])].sort((a, b) => (a.ordem || 9) - (b.ordem || 9));
  const TRILHA = CATALOGO.filter((x) => !x.extra); // caminho natural de níveis
  const progDe = (k) => CATALOGO.find((x) => x.k === k) || null;
  const NIVEIS = [
    ["Iniciante", "Estou começando ou voltando agora"],
    ["Intermediário", "Já treino com regularidade"],
    ["Avançado", "Treino pesado há tempo (faço barra)"],
  ];
  const recomendado = (nivel) => TRILHA.find((x) => x.nivel === nivel) || TRILHA[0];
  const caminhoTxt = () => TRILHA.map((x) => x.nome).join(" → ");
  // Programa de vídeo começa na segunda desta semana; de sexta em diante, na próxima segunda
  const inicioNovo = () => keyOf(hojeDia >= 4 ? addDays(mondayOf(hoje), 7) : mondayOf(hoje));
  function escolherPrograma(k) {
    S.principal = k;
    if (VP[k] && !S[k].inicio) S[k].inicio = inicioNovo();
    save();
  }

  /* ---------- Estado ---------- */
  const KEY = "fitai-state-v1";
  const padrao = { user: null, logado: false, onboarded: false, inicio: keyOf(mondayOf(hoje)), logs: {}, perfil: { peso: "", altura: "", idade: "" } };
  let S = load();
  function load() {
    try {
      const s = { ...padrao, ...JSON.parse(localStorage.getItem(KEY) || "{}") };
      if (!s.logs || typeof s.logs !== "object") s.logs = {};
      s.perfil = { ...padrao.perfil, ...(s.perfil || {}) };
      for (const k of VKEYS) {
        s[k] = { ...vazioVP(), ...(s[k] || {}) };
        if (!s[k].logs || typeof s[k].logs !== "object") s[k].logs = {};
      }
      s.hiper = { ...vazioHiper(), ...(s.hiper || {}) };
      if (!s.hiper.logs || typeof s.hiper.logs !== "object") s.hiper.logs = {};
      if (s.user && !s.user.id) { s.logado = false; s.user = null; s.sessao = null; } // login antigo (antes do Supabase): entra de novo
      return s;
    } catch { return { ...padrao, ...Object.fromEntries(VKEYS.map((k) => [k, vazioVP()])), hiper: vazioHiper() }; }
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch {} if (typeof agendarSync === "function") agendarSync(); }

  const semanasDesde = (d) => Math.floor(diffDays(parseKey(S.inicio), d) / 7);
  const semanaDe = (d) => { const n = semanasDesde(d); return n < 0 ? -1 : n % PROGRAMA.length; };
  const cicloDe = (d) => Math.max(0, Math.floor(semanasDesde(d) / PROGRAMA.length)) + 1;
  const treino = (w, d) => (w === "E" ? (d === 0 ? EMERGENCIA : null) : PROGRAMA[w] ? PROGRAMA[w].dias[d] : null);
  const nomeSemana = (w) => (w === "E" ? "Treino de emergência" : `Semana ${w + 1} · ${PROGRAMA[w].nome}`);
  const logHoje = () => S.logs[hojeKey];
  const ativoHoje = () => { const l = logHoje(); if (l) return { w: l.w, d: l.d }; const w = semanaDe(hoje); return { w: Math.max(w, 0), d: hojeDia }; };
  const soma = (a) => a.reduce((x, y) => x + y, 0);
  const feito = (k) => !!(S.logs[k] && S.logs[k].done) || VKEYS.some((p) => insFeito(p, k)) || hxFeito(k);
  const parcial = (k) => !!(S.logs[k] && Object.values(S.logs[k].sets || {}).some((s) => s.length)) || VKEYS.some((p) => insParcial(p, k)) || hxParcial(k);
  const diasVideo = () => [...VKEYS.flatMap((p) => Object.keys(S[p].logs)), ...Object.keys(S.hiper.logs)]; // dias dos programas fora da calistenia
  const principal = () => (S.principal && progDe(S.principal) ? S.principal : "plano");

  function sequencia() {
    let d = feito(hojeKey) ? hoje : addDays(hoje, -1), c = 0;
    while (feito(keyOf(d))) { c++; d = addDays(d, -1); }
    return c;
  }
  const treinosFeitos = () => [...new Set([...Object.keys(S.logs), ...diasVideo()])].filter(feito).length;
  const tempoTotal = () => soma(Object.values(S.logs).map((l) => l.dur || 0)) + soma(VKEYS.flatMap((p) => Object.values(S[p].logs)).map((l) => minVideo(l) * 60)) + soma(Object.values(S.hiper.logs).map((l) => hxMin(l) * 60));
  function taxaConclusao() {
    const dias = diffDays(parseKey(S.inicio), hoje) + (feito(hojeKey) ? 1 : 0);
    if (dias <= 0) return treinosFeitos() ? 100 : 0;
    return Math.min(100, Math.round((treinosFeitos() / dias) * 100));
  }
  function historico(id) {
    return Object.keys(S.logs).sort().filter((k) => (S.logs[k].sets?.[id] || []).length)
      .map((k) => { const s = S.logs[k].sets[id]; return { k, total: soma(s), best: menorMelhor(id) ? Math.min(...s) : Math.max(...s) }; });
  }
  const menorMelhor = (id) => EXI[id] && EXI[id].un === "tiro";
  const anterior = (id) => historico(id).filter((h) => h.k < hojeKey).pop();
  const recorde = (id) => { const b = historico(id).map((h) => h.best); return b.length ? (menorMelhor(id) ? Math.min(...b) : Math.max(...b)) : 0; };
  function ultimoTreino() { const ks = [...new Set([...Object.keys(S.logs), ...diasVideo()])].filter(feito).sort(); return ks.length ? ks[ks.length - 1] : null; }
  const fmtDur = (seg) => { const h = Math.floor(seg / 3600), m = Math.floor((seg % 3600) / 60); return h ? `${h}h${pad(m)}m` : `${m}min`; };

  /* ---------- Programas em vídeo: funções (p = chave do programa; IDs dos vídeos vêm de /api/videos) ---------- */
  const INS_VID = { ...(window.FITAI_INSANITY_VIDEOS || {}) }; // { idDoVideo: "idNoDrive" ou "idNoDrive|resourcekey" }
  const INSV = Object.fromEntries(VPROGS.flatMap((p) => p.videos.map((v) => [v.id, v])));
  // Arquivos antigos do Drive (antes de 2021) só abrem com a resourcekey junto
  const driveUrl = (id, modo) => {
    const [f, rk] = String(INS_VID[id] || "").split("|");
    return f ? `https://drive.google.com/file/d/${encodeURIComponent(f)}/${modo}${rk ? `?resourcekey=${encodeURIComponent(rk)}` : ""}` : "";
  };
  const insLink = (id) => driveUrl(id, "view");
  const insSemanaDe = (p, d) => (S[p].inicio ? Math.floor(diffDays(parseKey(S[p].inicio), d) / 7) : -1);
  const insDia = (p, w, d) => (VP[p].semanas[w] ? VP[p].semanas[w].dias[d] : null);
  const insData = (p, w, d) => keyOf(addDays(parseKey(S[p].inicio), w * 7 + d));
  const insHoje = (p) => { const w = insSemanaDe(p, hoje); return w >= 0 && w < VP[p].semanas.length ? { w, d: hojeDia } : null; };
  const insAlt = (p, w, id) => (w < VP[p].trocaAte && VP[p].trocas[id]) || null; // MAX:30: Sweat Fest pode substituir o Sweat Intervals no mês 1
  function insFeito(p, k) {
    const l = S[p].logs[k];
    if (!l) return false;
    if ((l.avulso || []).length) return true; // vídeo feito fora do calendário (extra, bônus ou de outro dia) conta como treino
    const t = insDia(p, l.w, l.d);
    return !!(t && t.ids.length && t.ids.every((id) => l.feitos.includes(id) || (insAlt(p, l.w, id) && l.feitos.includes(insAlt(p, l.w, id)))));
  }
  const insParcial = (p, k) => !!(S[p].logs[k] && (S[p].logs[k].feitos.length || (S[p].logs[k].avulso || []).length));
  const vidsDe = (l) => [...(l.feitos || []), ...(l.avulso || [])];
  // Minutos de um dia de vídeo: o cronômetro, quando usado; sem ele, a duração dos vídeos feitos
  const minVideo = (l) => (l.dur ? Math.round(l.dur / 60) : soma(vidsDe(l).map((id) => INSV[id]?.min || 0)));
  const segDe = (txt) => { const m = String(txt).trim().match(/^(\d{1,2})(?:[:.,h](\d{1,2}))?$/); return m && +(m[2] || 0) < 60 ? +m[1] * 60 + +(m[2] || 0) : null; };
  const mmss = (seg) => `${Math.floor(seg / 60)}:${pad(seg % 60)}`;
  // Fit Test (Insanity): repetições por movimento, em ordem de data
  const fitHist = (p) => Object.keys(S[p].logs).sort().filter((k) => Array.isArray(S[p].logs[k].fit) && S[p].logs[k].fit.some((n) => n > 0)).map((k) => ({ k, fit: S[p].logs[k].fit }));
  const NOMES_MAXOUT = VPROGS.filter((p) => p.maxOut).map((p) => p.nome).join(" e ") || "Insanity";
  function insMaxHist(p, id) {
    return Object.keys(S[p].logs).sort().filter((k) => S[p].logs[k].max?.[id]).map((k) => ({ k, seg: S[p].logs[k].max[id] }));
  }


  /* ---------- Strava ----------
     As corridas chegam em strava.json, gerado pelo Claude a partir do MCP do Strava.
     Formato: { atualizado: ISO, corridas: [{ id, nome, data: "YYYY-MM-DD", hora: "HH:MM",
       dist: metros, tempo: segundos em movimento, elev, fc, rota: polyline, voltas: [{ dist, tempo }] }] } */
  let STRAVA = null;
  fetch("strava.json", { cache: "no-store" }).then((r) => (r.ok ? r.json() : null)).then((d) => {
    if (!d || !Array.isArray(d.corridas)) return;
    STRAVA = d;
    if (["home", "treino", "evolucao"].includes(location.hash.split("/")[1])) render();
  }).catch(() => {});
  const corridas = () => (STRAVA ? STRAVA.corridas.slice() : []).sort((a, b) => (b.data + (b.hora || "")).localeCompare(a.data + (a.hora || "")));
  const corridasDe = (k) => corridas().filter((c) => c.data === k);
  const km = (m) => (m / 1000).toFixed(m < 10000 ? 2 : 1).replace(".", ",");
  const ritmo = (seg, m) => { if (!m) return "—"; const p = Math.round(seg / (m / 1000)); return `${Math.floor(p / 60)}:${String(p % 60).padStart(2, "0")}`; };
  const tirosDe = (c) => (c.voltas || []).filter((v) => v.dist >= 150 && v.dist <= 260).map((v) => Math.round(v.tempo));
  function decodePolyline(str) {
    let i = 0, lat = 0, lng = 0; const pts = [];
    while (i < str.length) {
      for (let k = 0; k < 2; k++) {
        let b, shift = 0, res = 0;
        do { b = str.charCodeAt(i++) - 63; res |= (b & 31) << shift; shift += 5; } while (b >= 32 && i < str.length);
        const dv = res & 1 ? ~(res >> 1) : res >> 1;
        if (k === 0) lat += dv; else lng += dv;
      }
      pts.push([lat / 1e5, lng / 1e5]);
    }
    return pts;
  }
  function rotaSvg(poly, W = 64, H = 64) {
    let pts = [];
    try { pts = poly ? decodePolyline(poly) : []; } catch {}
    if (pts.length < 2) return `<span class="rota vazia">${icon("timer.svg", 20)}</span>`;
    const c0 = Math.cos((pts[0][0] * Math.PI) / 180);
    const xs = pts.map((p) => p[1] * c0), ys = pts.map((p) => -p[0]);
    const mnX = Math.min(...xs), mxX = Math.max(...xs), mnY = Math.min(...ys), mxY = Math.max(...ys);
    const m = 7, sc = Math.min((W - 2 * m) / (mxX - mnX || 1e-9), (H - 2 * m) / (mxY - mnY || 1e-9));
    const ox = (W - (mxX - mnX) * sc) / 2, oy = (H - (mxY - mnY) * sc) / 2;
    const X = (i) => ((xs[i] - mnX) * sc + ox).toFixed(1), Y = (i) => ((ys[i] - mnY) * sc + oy).toFixed(1);
    const d = pts.map((_, i) => `${i ? "L" : "M"}${X(i)} ${Y(i)}`).join("");
    const z = pts.length - 1;
    return `<svg class="rota" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" aria-hidden="true">
      <path d="${d}" fill="none" stroke="#fc4c02" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"/>
      <circle cx="${X(0)}" cy="${Y(0)}" r="3" fill="#fff" stroke="#fc4c02" stroke-width="1.6"/><circle cx="${X(z)}" cy="${Y(z)}" r="3" fill="#fc4c02"/></svg>`;
  }
  function corridaCard(c) {
    const dt = parseKey(c.data);
    const quando = `${DIAS[(dt.getDay() + 6) % 7].slice(0, 3)}, ${pad(dt.getDate())} ${MESES[dt.getMonth()]}${c.hora ? " · " + c.hora : ""}`;
    return `<a class="run" href="https://www.strava.com/activities/${encodeURIComponent(c.id)}" target="_blank" rel="noopener" aria-label="${esc(c.nome)}, ${km(c.dist)} km. Ver no Strava">
      ${rotaSvg(c.rota)}
      <div class="run-info">
        <strong>${esc(c.nome)}</strong><small>${quando}</small>
        <div class="run-nums"><span><b>${km(c.dist)}</b> km</span><span><b>${ritmo(c.tempo, c.dist)}</b> /km</span><span><b>${fmtDur(c.tempo)}</b></span>${c.fc ? `<span><b>${Math.round(c.fc)}</b> bpm</span>` : ""}</div>
      </div>
      <span class="run-link">Ver no Strava</span></a>`;
  }
  function secaoCorridas() {
    if (!veCorridas()) return "";
    const cs = corridas();
    const head = `<div class="sec-head"><h2>Corridas</h2><span class="strava-tag">Strava</span></div>`;
    if (!cs.length) return `<div class="section">${head}<p class="note">Nenhuma corrida sincronizada ainda. No Claude Code, peça: <b>“sincroniza minhas corridas do Strava”</b>.</p></div>`;
    const dist = soma(cs.map((c) => c.dist)), tempo = soma(cs.map((c) => c.tempo));
    const at = STRAVA.atualizado ? new Date(STRAVA.atualizado) : null;
    return `<div class="section">${head}
      <div class="stats-row">
        ${stat("circle-check.svg", cs.length, "Corridas")}
        ${stat("zap.svg", km(dist), "Km no total")}
        ${stat("timer.svg", ritmo(tempo, dist), "Ritmo médio")}
      </div>
      <div class="runs">${cs.slice(0, 5).map(corridaCard).join("")}</div>
      ${at ? `<p class="note small">Sincronizado em ${pad(at.getDate())}/${pad(at.getMonth() + 1)} às ${pad(at.getHours())}:${pad(at.getMinutes())}</p>` : ""}
    </div>`;
  }
  function corridaHoje(t) {
    if (!veCorridas()) return "";
    const cs = corridasDe(hojeKey);
    if (!cs.length) return "";
    const tem = t.ex.some((e) => e.un === "tiro");
    const tiros = tem ? cs.flatMap(tirosDe).slice(0, 5) : [];
    const botao = tiros.length ? `<button class="btn btn-blue" id="puxar-tiros" data-tiros="${tiros.join(",")}">Usar ${tiros.length} ${tiros.length > 1 ? "tiros" : "tiro"} do Strava (${tiros.join("s, ")}s)</button>`
      : tem ? `<p class="note small">Para o app puxar os tempos, marque uma volta no relógio a cada tiro de 200 m.</p>` : "";
    return `<div class="runs"><span class="field-lbl">Corrida de hoje no Strava</span>${cs.map(corridaCard).join("")}${botao}</div>`;
  }
  /* Resumo do treino para a descrição de uma atividade no Strava */
  function resumoTreino(k) {
    const l = S.logs[k]; if (!l) return "";
    const t = treino(l.w, l.d); if (!t) return "";
    const linhas = t.ex.filter((e) => (l.sets[e.id] || []).length).map((e) => {
      const s = l.sets[e.id], u = UN[e.un];
      return e.un === "tiro" ? `${e.nome}: ${s.map((n) => n + "s").join(" · ")} (melhor ${Math.min(...s)}s)` : `${e.nome}: ${s.join("+")}${u ? " " + u : ""} = ${soma(s)}${u}`;
    });
    return [`${t.titulo} — ${nomeSemana(l.w)}`, ...linhas, l.dur ? `Tempo: ${fmtDur(l.dur)}` : "", "Registrado no FIT.AI 🔥"].filter(Boolean).join("\n");
  }

  /* ---------- Helpers ---------- */
  const $ = (s, el = document) => el.querySelector(s);
  const app = $("#app");
  const esc = (t) => String(t).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const icon = (f, s = 14) => `<img src="${A(f)}" width="${s}" height="${s}" alt="">`;
  const check = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>`;
  const primeiroNome = () => (S.user && S.user.primeiro) || "Atleta";
  const nomeCompleto = () => (S.user && S.user.nome) || "Visitante";
  const fotoPerfil = () => (S.user && S.user.foto) || S.fotoLocal || A("avatar.jpg");

  function toast(msg, ms = 2500) {
    document.querySelectorAll(".toast").forEach((t) => t.remove());
    const t = document.createElement("div");
    t.className = "toast"; t.textContent = msg;
    $(".device").appendChild(t);
    setTimeout(() => t.remove(), ms);
  }
  function setToolbar(tab) {
    const tb = $("#toolbar");
    tb.hidden = !tab;
    const plano = tb.querySelector('[data-tab="plano"]'); // o botão de calendário abre o programa principal
    if (plano) plano.setAttribute("href", `#/${principal()}`);
    tb.querySelectorAll(".tb-item").forEach((a) => {
      const on = a.dataset.tab === tab, img = a.querySelector("img");
      img.src = on ? img.dataset.on : img.dataset.off;
      on ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current");
    });
  }

  /* ---------- Componentes ---------- */
  function workoutCard(w, d, { link = true, botao = "" } = {}) {
    const t = treino(w, d);
    const tag = link ? "a" : "div";
    const href = link ? `href="#/treino/${w}/${d}"` : "";
    const reps = soma(t.ex.filter((e) => e.un === "reps").map((e) => e.meta));
    const meta = `<span>${icon("dumbbell.svg")}${t.ex.length} ${t.ex.length > 1 ? "exercícios" : "exercício"}</span>${reps ? `<span>${icon("timer.svg")}${reps}+ reps</span>` : w === "E" ? `<span>${icon("timer.svg")}15 min</span>` : ""}`;
    return `<${tag} class="wcard${t.foco === "Opcional" ? " pending" : ""}" ${href} aria-label="${nomeSemana(w)}, ${w === "E" ? "" : DIAS[d]}: ${esc(t.titulo)}">
      <img class="cover" src="${imgDe(t)}" alt="" loading="lazy">
      <span class="pill glass">${icon("calendar-14.svg")}${w === "E" ? "Plano B" : `${DIAS[d]} · ${esc(t.foco)}`}</span>
      <div class="bottom">
        <div class="info"><h3>${esc(t.titulo)}</h3><div class="meta">${meta}</div></div>
        ${botao}
      </div></${tag}>`;
  }

  function weekStrip() {
    const seg = mondayOf(hoje);
    return INICIAIS.map((l, i) => {
      const k = keyOf(addDays(seg, i));
      let c = feito(k) ? "b" : parcial(k) ? "l" : "";
      if (i === hojeDia) c += " today";
      return `<div class="day"><span class="sq ${c}"></span>${l}</div>`;
    }).join("");
  }

  /* Músculos trabalhados por exercício de calistenia (Treino da Fera e programa de exemplo)
     e o mapa da imagem (assets/musculos/<mapa>.webp) */
  const MUSC_EX = {
    flexao: ["empurrar", "Peitoral, tríceps e ombros (frente), com o core firme"],
    "flexao-comum": ["empurrar", "Peitoral, tríceps e ombros (frente), com o core firme"],
    "flexao-leve": ["empurrar", "Peitoral, tríceps e ombros (frente)"],
    "flexao-diamante": ["empurrar", "Tríceps (ênfase), peitoral e ombros"],
    "flexao-aberta": ["empurrar", "Peitoral (ênfase), ombros e tríceps"],
    "flexao-mike-tyson": ["empurrar", "Tríceps, peitoral e ombros"],
    "flexao-explosiva": ["empurrar", "Peitoral, tríceps e ombros, com potência"],
    "flexao-arqueiro": ["empurrar", "Peitoral e tríceps com mais carga num braço, ombros e core"],
    "flexao-unilateral": ["empurrar", "Peitoral, tríceps, ombros e core (anti-rotação)"],
    "flexao-inclinada": ["empurrar", "Peitoral, tríceps e ombros (versão mais leve)"],
    "flexao-pes-elevados": ["empurrar", "Peitoral superior, ombros e tríceps"],
    "mergulho-banco": ["empurrar", "Tríceps (ênfase), peitoral e ombros"],
    "pseudo-planche": ["ombros", "Ombros (frente), peitoral, tríceps, bíceps e core"],
    "flexao-militar": ["ombros", "Ombros e tríceps, com peitoral superior"],
    "flexao-pike": ["ombros", "Ombros, tríceps e trapézio"],
    hspu: ["ombros", "Ombros, tríceps e trapézio, com core para estabilizar"],
    "barra-aberta": ["puxar", "Dorsais (largura das costas), bíceps e parte de trás dos ombros"],
    "barra-fechada": ["puxar", "Dorsais, bíceps e antebraços"],
    "barra-pronada": ["puxar", "Dorsais, bíceps, trapézio e antebraços"],
    "barra-negativa": ["puxar", "Dorsais e bíceps (fase de descida), antebraços"],
    "barra-isometrica": ["puxar", "Bíceps, dorsais e antebraços (isometria)"],
    "barra-uma-mao": ["puxar", "Dorsais e bíceps de um lado, antebraço e core"],
    "chin-up": ["puxar", "Bíceps (ênfase) e dorsais, com antebraços"],
    "drop-aberta": ["puxar", "Dorsais, meio das costas, bíceps e antebraços (até a falha)"],
    "drop-supinada": ["puxar", "Bíceps, dorsais e meio das costas (até a falha)"],
    "barra-australiana": ["puxar", "Meio das costas (romboides e trapézio), dorsais, bíceps e parte de trás dos ombros"],
    "remada-aberta": ["puxar", "Meio das costas, parte de trás dos ombros e bíceps"],
    "remada-fechada": ["puxar", "Dorsais (ênfase), bíceps e meio das costas"],
    "remada-uma-mao": ["puxar", "Dorsal e meio das costas de um lado, bíceps e core (anti-rotação)"],
    "remada-australiana-fin": ["puxar", "Meio das costas, dorsais e bíceps"],
    abdominal: ["core", "Reto abdominal"],
    "abdominal-bicicleta": ["core", "Oblíquos e reto abdominal"],
    "abdominal-canivete": ["core", "Reto abdominal inteiro e flexores do quadril"],
    "abdominal-pendurado": ["core", "Abdômen inferior, flexores do quadril e pegada (antebraços)"],
    "elevacao-pernas": ["core", "Abdômen inferior e flexores do quadril"],
    "core-barra": ["core", "Abdômen, oblíquos, flexores do quadril e pegada"],
    "l-sit": ["core", "Abdômen, flexores do quadril, tríceps e ombros"],
    "dragon-flag": ["core", "Abdômen inteiro, lombar e dorsais"],
    hollow: ["core", "Abdômen (reto e transverso) e flexores do quadril"],
    prancha: ["core", "Abdômen (transverso e reto), ombros e glúteos"],
    "prancha-lateral": ["core", "Oblíquos, quadrado lombar e ombro de apoio"],
    "rkc-plank": ["core", "Abdômen, glúteos, quadríceps e dorsais em tensão total"],
    agachamento: ["inferiores", "Quadríceps, glúteos e posteriores"],
    "agachamento-sumo": ["inferiores", "Glúteos, adutores (parte interna da coxa) e quadríceps"],
    "agachamento-bulgaro": ["inferiores", "Quadríceps e glúteos (uma perna por vez), com equilíbrio"],
    "agachamento-isometrico": ["inferiores", "Quadríceps e glúteos (isometria)"],
    "pistol-squat": ["inferiores", "Quadríceps, glúteos e equilíbrio (uma perna)"],
    afundo: ["inferiores", "Quadríceps, glúteos e posteriores"],
    "afundo-reverso": ["inferiores", "Glúteos (ênfase), quadríceps e posteriores"],
    "flexao-nordica-reversa": ["inferiores", "Quadríceps (ênfase) e flexores do quadril"],
    "ponte-gluteos": ["gluteos", "Glúteos e posteriores da coxa"],
    superman: ["gluteos", "Lombar, glúteos e posteriores"],
    "panturrilha-em-pe": ["panturrilha", "Panturrilhas (gastrocnêmio e sóleo)"],
    "panturrilha-unilateral": ["panturrilha", "Panturrilhas (uma perna por vez)"],
    "agachamento-salto": ["pernas", "Quadríceps, glúteos e panturrilhas (pliometria), com core"],
    pulos: ["pernas", "Quadríceps, glúteos e panturrilhas (pliometria), com core"],
    trote: ["pernas", "Pernas, glúteos e panturrilhas (aquecimento)"],
    caminhada: ["pernas", "Pernas e glúteos, em ritmo leve"],
    "tiro-200": ["pernas", "Quadríceps, posteriores, glúteos e panturrilhas (velocidade)"],
    alongamento: ["corpo", "Corpo inteiro (mobilidade e flexibilidade)"],
  };
  // Bloco "músculos + mapa" usado nos cards de exercício e de vídeo
  const muscHtml = (texto, mapa, nome) => texto ? `<details class="musc"><summary><span>💪 ${esc(texto)}</span></summary>
    ${mapa ? `<img src="${A(`musculos/${mapa}.webp`)}" alt="Mapa muscular de ${esc(nome)}: ${esc(texto)}" loading="lazy" width="900" height="675">` : ""}</details>` : "";
  function exCard(e, editavel) {
    const sets = editavel ? (logHoje()?.sets?.[e.id] || []) : [];
    const prev = anterior(e.id), rec = recorde(e.id);
    const tiro = e.un === "tiro";
    const total = tiro ? sets.length : soma(sets), pct = Math.min(100, Math.round((total / e.meta) * 100));
    const ok = total >= e.meta;
    const u = UN[e.un];
    const resta = e.meta - total;
    const minR = typeof e.r === "string" ? parseInt(e.r, 10) : e.r;
    const sug = tiro ? (prev ? prev.best : 35) : Math.max(1, Math.min(resta > 0 ? resta : minR, prev ? prev.best : Math.min(minR, 20)));
    return `<div class="ex${ok ? " done" : ""}" data-ex="${e.id}">
      <div class="ex-top">
        <span class="ex-name"><span class="ex-check">${check}</span>${esc(e.nome)}</span>
        <button class="ask" data-ask="${e.id}" aria-label="Perguntar ao Coach AI sobre ${esc(e.nome)}">${icon("circle-question.svg", 20)}</button>
      </div>
      <div class="ex-tags">
        <span class="pill gray">${prescricao(e)}</span>
        ${prev ? `<span class="pill gray">Última ${tiro ? prev.best : prev.total}${u}</span>` : ""}
        ${rec ? `<span class="pill gray">${icon("zap.svg")}${tiro ? "Melhor" : "Máx"} ${rec}${u}</span>` : ""}
      </div>
      ${e.obs ? `<p class="ex-obs">${esc(e.obs)}</p>` : ""}
      ${MUSC_EX[e.id] ? muscHtml(MUSC_EX[e.id][1], MUSC_EX[e.id][0], e.nome) : ""}
      ${editavel ? `
      <div class="sets">
        ${sets.map((s, i) => `<button class="set" data-del="${i}" title="Toque para remover" aria-label="Série ${i + 1}: ${s}${u}. Toque para remover">${s}${u}</button>`).join("")}
        <form class="add-set" data-add="${e.id}">
          <input type="number" inputmode="numeric" min="1" max="999" value="${sug}" aria-label="${tiro ? "Tempo em segundos do tiro" : e.un === "reps" ? "Repetições da série" : "Valor da série"} ${sets.length + 1} de ${esc(e.nome)}">
          <button type="submit" class="btn btn-blue">${tiro ? "+ Tiro" : "+ Série"}</button>
        </form>
      </div>
      <div class="progress"><div class="bar"><i style="width:${pct}%"></i></div><span>${tiro ? `${total}/${e.meta} tiros` : `${total}/${e.meta}${u}`}</span></div>` : ""}
    </div>`;
  }

  function stat(ic, val, lbl, { up = false, edit = "" } = {}) {
    const tag = edit ? "button" : "div";
    return `<${tag} class="stat${edit ? " editable" : ""}" ${edit ? `data-edit="${edit}" aria-label="Editar ${lbl}"` : ""}><span class="stat-ico">${icon(ic, 16)}</span>
      <div class="stat-val"><strong>${val}</strong><span${up ? ' class="up"' : ""}>${lbl}</span></div></${tag}>`;
  }

  /* Insanity: componentes */
  const INS_IMG = { Cardio: "banner-home.jpg", Tabata: "login.jpg", Potência: "login.jpg", Pliometria: "login.jpg", Teste: "banner-plano.jpg", Intervalos: "banner-home.jpg", Core: "treino-inferiores-2.jpg", Força: "treino-superiores-2.jpg", Luta: "treino-inferiores-1.jpg", Recuperação: "treino-inferiores-2.jpg", Abdômen: "treino-inferiores-2.jpg" };
  const progSwitch = (on) => {
    const abas = [["plano", NOME_PROG], ...VPROGS.map((p) => [p.k, VPROGS.length > 1 ? p.curto : p.nome]), ...(ACAD.length ? [["hiper", HIPER.curto]] : [])];
    return `<nav class="seg prog" aria-label="Programa" style="grid-template-columns:repeat(${abas.length},1fr)">
      ${abas.map(([r, nome]) => `<a href="#/${r}" class="${on === r ? "on" : ""}"${on === r ? ' aria-current="page"' : ""}>${esc(nome)}</a>`).join("")}</nav>`;
  };
  function insCard(p, w, d, { link = true } = {}) {
    const P = VP[p], t = insDia(p, w, d), tag = link ? "a" : "div";
    const min = soma(t.ids.map((id) => INSV[id].min || 0));
    const k = S[p].inicio ? insData(p, w, d) : null;
    const ok = k && insFeito(p, k);
    const meta = t.ids.length ? `<span>${icon("timer.svg")}${min ? `${min} min` : "vídeo"}</span><span>${icon("zap.svg")}${t.ids.length} ${t.ids.length > 1 ? "vídeos" : "vídeo"}</span>` : `<span>${t.fim ? "Programa concluído" : "Recupere o corpo"}</span>`;
    return `<${tag} class="wcard${t.ids.length ? "" : " pending"}" ${link && t.ids.length ? `href="#/${p}/${w}/${d}"` : ""} aria-label="${esc(P.nome)}, semana ${w + 1}, ${DIAS[d]}: ${esc(t.titulo)}">
      <img class="cover" src="${A(INS_IMG[t.ids.length ? INSV[t.ids[0]].tipo : ""] || "banner-plano.jpg")}" alt="" loading="lazy">
      <span class="pill glass">${icon("calendar-14.svg")}${DIAS[d]} · ${t.ids.length ? esc(INSV[t.ids[0]].tipo) : "Descanso"}${ok ? " · ✓" : ""}</span>
      <div class="bottom"><div class="info"><h3>${esc(t.titulo)}</h3><div class="meta">${meta}</div></div></div></${tag}>`;
  }
  // editavel = dia do calendário que já chegou. Fora disso (extra, bônus, dia futuro, programa não iniciado),
  // o vídeo é "avulso": se fizer, conta como treino de hoje.
  function insVideoCard(p, id, k, editavel, rotulo = "") {
    const P = VP[p], v = INSV[id], av = !editavel, kk = editavel ? k : hojeKey;
    const l = S[p].logs[kk] || { feitos: [], max: {} };
    const ok = (av ? l.avulso || [] : l.feitos).includes(id);
    const hist = P.maxOut ? insMaxHist(p, id) : [], ant = hist.filter((h) => h.k < k).pop(), best = hist.length ? Math.max(...hist.map((h) => h.seg)) : 0;
    const link = insLink(id);
    const fit = v.fitTest && P.fitTest, fitAnt = fit ? fitHist(p).filter((h) => h.k < kk).pop() : null;
    return `<div class="ex ins${ok ? " done" : ""}" data-ins="${id}" data-kc="${k || ""}" data-ed="${editavel ? 1 : 0}">
      <div class="ex-top">
        <span class="ex-name"><span class="ex-check">${check}</span><span>${rotulo ? `<small class="ins-rot">${esc(rotulo)}</small>` : ""}${esc(v.nome)}</span></span>
        <button class="ask" data-ask-ins="${id}" data-p="${p}" aria-label="Perguntar ao Coach AI sobre ${esc(v.nome)}">${icon("circle-question.svg", 20)}</button>
      </div>
      <div class="ex-tags">
        ${v.min ? `<span class="pill gray">${v.min} min</span>` : ""}<span class="pill gray">${esc(v.tipo)}</span>
        ${ant ? `<span class="pill gray">Último Max Out ${mmss(ant.seg)}</span>` : ""}
        ${best ? `<span class="pill gray">${icon("zap.svg")}Melhor ${mmss(best)}</span>` : ""}
        ${fitAnt ? `<span class="pill gray">Fit Test anterior: ${soma(fitAnt.fit.map((n) => n || 0))} reps</span>` : ""}
      </div>
      <p class="ex-obs">${esc(v.desc)}</p>
      ${muscHtml(v.musculos, v.mapa, v.nome)}
      ${link ? `<button class="btn btn-blue ins-play" data-ins-play="${id}">▶ Assistir</button>`
        : uid ? `<button class="btn btn-blue ins-play" data-ins-carregar>▶ Carregar vídeos</button>` : `<p class="ex-obs">Entre com sua conta para assistir aos vídeos.</p>`}
      ${fit ? `<form class="fit-test" data-fit="${id}" data-p="${p}" data-k="${kk}">
        <div class="fit-grid">${P.fitTest.map((m, i) => `<label><span>${esc(m)}</span><input type="number" inputmode="numeric" min="0" max="999" name="m${i}" value="${l.fit?.[i] ?? ""}" placeholder="${fitAnt?.fit[i] ?? "reps"}" aria-label="Repetições de ${esc(m)}"></label>`).join("")}</div>
        <button type="submit" class="btn btn-blue">Salvar Fit Test</button>
      </form>` : ""}
      ${av ? `<p class="ex-obs avulso">Fora do calendário de hoje: se fizer, conta como treino de hoje.</p>` : ""}
      <div class="ins-row">
        ${P.maxOut ? `<form class="add-set ins-max" data-max="${id}" data-p="${p}" data-k="${kk}">
          <input type="text" inputmode="numeric" maxlength="5" placeholder="mm:ss" value="${l.max?.[id] ? mmss(l.max[id]) : ""}" aria-label="Tempo do Max Out em ${esc(v.nome)} (minutos:segundos)">
          <button type="submit" class="btn btn-blue">Max Out</button>
        </form>` : ""}
        <button class="btn btn-outline${ok ? " done" : ""} ins-feito" data-ins-feito="${id}" data-p="${p}" data-k="${kk}" data-av="${av ? 1 : 0}">${ok ? "Feito ✓" : "Marcar feito"}</button>
      </div>
    </div>`;
  }

  /* ---------- Telas ---------- */
  let planoSemana = null; const insSemana = {};
  const telas = {
    login() {
      setToolbar(null);
      if (loginModo) return telaLoginEmail();
      return `<section class="screen login">
        <div class="login-photo"><img src="${A("login-hero.jpg")}" alt="Atleta fazendo flexão"></div>
        <img class="login-logo" src="${A("logo-fitai.svg")}" width="85" height="38" alt="FIT.AI">
        <div class="login-panel">
          <div class="top">
            <h1>O app que vai transformar a forma como você treina.</h1>
            <button class="btn btn-google" id="google">${icon("google.svg", 16)}Fazer login com Google</button>
            <button class="btn btn-email" id="email-login">Entrar com e-mail e senha</button>
            <button class="visitante" id="visitante">Entrar como visitante</button>
          </div>
          <small>©2026 Copyright FIT.AI. Todos os direitos reservados</small>
        </div></section>`;
    },

    onboarding() {
      setToolbar(null);
      return `<section class="screen onboarding">
        <header class="chat-head"><div class="coach">
          <span class="coach-avatar">${icon("sparkles-blue.svg", 18)}</span>
          <span class="coach-txt"><strong>Coach AI</strong><span class="online">${icon("dot-online.svg", 8)}Online</span></span>
        </div></header>
        <div class="chat-msgs" id="ob-msgs"></div>
        <div class="chat-foot">
          <div class="chips" id="ob-chips"></div>
          <form class="composer" id="ob-form" autocomplete="off">
            <input type="text" id="ob-input" placeholder="Digite sua mensagem" aria-label="Mensagem">
            <button type="submit" class="send" aria-label="Enviar">${icon("arrow-up.svg", 20)}</button>
          </form>
        </div></section>`;
    },

    home() {
      setToolbar("home");
      const { w, d } = ativoHoje();
      const t = treino(w, d);
      const ult = ultimoTreino();
      const parado = ult && diffDays(parseKey(ult), hoje) > 7 && !parcial(hojeKey);
      const sub = semanaDe(hoje) < 0 ? "Seu programa começa em breve." : feito(hojeKey) ? "Treino de hoje concluído! 🔥" : parcial(hojeKey) ? "Bora terminar o treino?" : "Bora treinar hoje?";
      return `<section class="screen has-toolbar">
        <div class="banner" style="--grad: linear-gradient(242.47deg, rgba(0,0,0,0) 34.46%, #000 100%)">
          <div class="banner-bg"><img class="home-img" src="${A("banner-home.jpg")}" alt=""></div>
          <span class="logo-txt">Fit.ai</span>
          <div class="banner-row">
            <div class="hello"><h1>Olá, ${esc(primeiroNome())}</h1><p>${sub}</p></div>
            <a class="btn btn-blue" href="${principal() === "plano" ? `#/treino/${w}/${d}` : principal() === "hiper" ? hxLinkHoje() : linkHojeVideo(principal())}">Bora!</a>
          </div>
        </div>
        <div class="section">
          <div class="sec-head"><h2>Consistência</h2><a href="#/evolucao">Ver histórico</a></div>
          <div class="week-row">
            <div class="week">${weekStrip()}</div>
            <div class="flame" aria-label="${sequencia()} dias de sequência">${icon("flame.svg", 16)}<span>${sequencia()}</span></div>
          </div>
        </div>
        <div class="section">
          ${grupoHome()}
          ${ACAD.length && principal() !== "hiper" ? hxHome(false) : ""}
          ${principal() === "plano" ? `<div class="sec-head"><h2>Treino de Hoje</h2><a href="#/plano">${nomeSemana(w)}${w !== "E" && cicloDe(hoje) > 1 ? ` · Ciclo ${cicloDe(hoje)}` : ""}</a></div>` : principal() === "hiper" ? hxHome(true) : treinoHojeVideo(principal())}
          ${parado ? `<p class="note retomada"><b>Voltou? 💪 Protocolo de retomada:</b> nem do zero, nem do máximo. Faça o treino de hoje dentro da sua capacidade atual e recupere o ritmo nos próximos dias.</p>` : ""}
          ${t && principal() === "plano" ? workoutCard(w, d) : ""}
          ${videoHome(principal())}
          ${w !== "E" ? `<a class="emerg" href="#/treino/E/0"><span>${icon("zap-blue.svg", 20)}</span><div><strong>Sem tempo hoje?</strong><small>Treino de emergência · 15 min · 100/100/100</small></div></a>` : ""}
        </div></section>`;
    },

    plano(sem) {
      setToolbar("plano");
      const atual = Math.max(0, semanaDe(hoje));
      const w = sem !== undefined && PROGRAMA[sem] ? Number(sem) : planoSemana ?? atual;
      planoSemana = w;
      return `<section class="screen has-toolbar">
        <div class="banner" style="--grad: linear-gradient(238.09deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.8) 100%)">
          <div class="banner-bg"><img class="plano-img" src="${A("banner-plano.jpg")}" alt=""></div>
          <span class="logo-txt">Fit.ai</span>
          <div class="plano-title">
            <span class="pill blue">${icon("goal.svg", 16)}${esc(NOME_PROG)}</span>
            <h1>Plano de Treino</h1>
          </div>
        </div>
        ${progSwitch("plano")}
        <div class="week-tabs" role="tablist">
          ${PROGRAMA.map((s, i) => `<a role="tab" aria-selected="${i === w}" class="wtab${i === w ? " on" : ""}" href="#/plano/${i}">
            <strong>Semana ${i + 1}${i === atual ? " •" : ""}</strong><span>${s.nome}</span></a>`).join("")}
        </div>
        <p class="note week-note">${PROGRAMA[w].nota}</p>
        <div class="list" style="padding-top:8px">${PROGRAMA[w].dias.map((_, d) => workoutCard(w, d)).join("")}</div></section>`;
    },

    treino(w, d) {
      w = w === "E" ? "E" : Number(w); d = Number(d);
      const t = treino(w, d);
      if (!t || !(d >= 0 && d < 7)) return telas.plano();
      setToolbar("plano");
      const at = ativoHoje();
      const ehHoje = at.w === w && at.d === d;
      const head = `<div class="page-head">
          <a class="icon-btn" href="${ehHoje || w === "E" ? "#/home" : `#/plano/${w}`}" aria-label="Voltar">${icon("chevron-left.svg", 24)}</a>
          <h1>${ehHoje ? "Treino de Hoje" : w === "E" ? "Treino de Emergência" : `Semana ${w + 1} · ${DIAS[d]}`}</h1><span class="spacer"></span></div>`;
      if (!t.ex) {
        return `<section class="screen has-toolbar"><div class="list" style="gap:20px">${head}${workoutCard(w, d, { link: false })}
          <p class="note">Os exercícios da <b>Semana ${w + 1} · ${PROGRAMA[w].nome}</b> ainda não foram cadastrados. Envie o PDF dessa semana para montar o treino de ${esc(t.foco.toLowerCase())}.</p></div></section>`;
      }
      const botao = ehHoje ? `<button class="btn btn-blue" id="iniciar">${timer.ativo ? relogio() : timer.seg ? "Continuar" : "Iniciar Treino"}</button>` : "";
      const notas = [w !== "E" ? PROGRAMA[w].nota : "", t.obs ? esc(t.obs) : ""].filter(Boolean);
      return `<section class="screen has-toolbar"><div class="list" style="gap:20px">
        ${head}
        ${workoutCard(w, d, { link: false, botao })}
        ${notas.length ? `<div class="note-box">${notas.map((n) => `<p>${n}</p>`).join("")}</div>` : ""}
        ${ehHoje ? "" : `<button class="btn btn-outline" id="trocar" data-w="${w}" data-d="${d}">Fazer este treino hoje</button>`}
        ${ehHoje ? corridaHoje(t) : ""}
        <div class="ex-list">${t.ex.map((e) => exCard(e, ehHoje)).join("")}</div>
        ${ehHoje ? `<button class="btn btn-outline${feito(hojeKey) ? " done" : ""}" id="concluir">${feito(hojeKey) ? "Treino concluído ✓" : "Marcar como concluído"}</button>` : ""}
        ${ehHoje && feito(hojeKey) ? `<button class="btn btn-outline btn-strava" id="resumo">Copiar resumo para o Strava</button>` : ""}
        </div></section>`;
    },


    evolucao() {
      setToolbar("evolucao");
      const seq = sequencia();
      return `<section class="screen has-toolbar">
        <header class="header"><span class="logo-txt dark">Fit.ai</span></header>
        ${evoSwitch("eu")}
        <div style="padding:16px 20px 0">
          <div class="streak">
            <img class="cover" src="${A(seq > 0 ? "streak-fire.jpg" : "streak-gray.jpg")}" alt="">
            <span class="streak-icon">${icon(seq > 0 ? "streak-icon.svg" : "streak-icon-gray.svg", 32)}</span>
            <div class="streak-num"><strong>${seq} ${seq === 1 ? "dia" : "dias"}</strong><span>Sequência Atual</span></div>
          </div>
        </div>
        <div class="section">
          <div class="sec-head"><h2>Consistência</h2></div>
          ${heatmap()}
          <div class="stats-row">
            ${stat("circle-check.svg", treinosFeitos(), "Treinos Feitos")}
            ${stat("circle-percent.svg", taxaConclusao() + "%", "Taxa de conclusão")}
          </div>
          ${stat("hourglass.svg", fmtDur(tempoTotal()), "Tempo Total")}
        </div>
        <div class="section"><div class="sec-head"><h2>Este mês</h2></div>${painelPessoal()}</div>
        <div class="section"><div class="sec-head"><h2>Conquistas</h2></div>${medalhas()}</div>
        ${VPROGS.some((P) => P.maxOut) ? `<div class="section"><div class="sec-head"><h2>Max Out · ${esc(NOMES_MAXOUT)}</h2></div><div id="max-box">${graficoMaxOut()}</div></div>` : ""}
        ${VPROGS.filter((P) => P.fitTest && fitHist(P.k).length).map((P) => `<div class="section"><div class="sec-head"><h2>Fit Test · ${esc(P.nome)}</h2></div>${tabelaFitTest(P.k)}</div>`).join("")}
        <div class="section">
          <div class="sec-head"><h2>Progresso por exercício</h2></div>
          ${progresso()}
        </div>
        ${secaoCorridas()}</section>`;
    },

    grupo: (p1, p2) => telaGrupo(p1, p2),

    perfil() {
      setToolbar("perfil");
      const w = semanaDe(hoje);
      const P = S.perfil;
      return `<section class="screen has-toolbar">
        <header class="header"><span class="logo-txt dark">Fit.ai</span></header>
        <div style="padding:20px;display:flex;flex-direction:column;gap:20px">
          <div class="profile">
            <button class="foto-btn" id="trocar-foto" aria-label="Trocar foto de perfil"><img src="${esc(fotoPerfil())}" alt="Foto de ${esc(nomeCompleto())}" referrerpolicy="no-referrer"><span class="foto-cam" aria-hidden="true">📷</span></button>
            <input type="file" id="foto-arquivo" accept="image/*" hidden>
            <div><button class="nome-btn" id="trocar-nome" ${S.user ? "" : "disabled"}><strong>${esc(nomeCompleto())}</strong></button><span>${uid && S.user?.email ? esc(S.user.email) : `${esc(NOME_PROG)} · Semana ${Math.max(w, 0) + 1}`}</span></div></div>
          ${uid ? "" : `<div class="note-box"><p>Você está como <b>visitante</b>: seus treinos ficam só neste aparelho. Entre com uma conta para salvar na nuvem, participar de grupos e aparecer no ranking.</p><button class="btn btn-blue" id="ir-login">Entrar ou criar conta</button></div>`}
          <div class="stats-grid">
            ${stat("weight.svg", P.peso || "—", "Kg", { up: true, edit: "peso" })}
            ${stat("ruler.svg", P.altura || "—", "Cm", { up: true, edit: "altura" })}
            ${stat("user-small.svg", P.idade || "—", "Anos", { up: true, edit: "idade" })}
            ${stat("circle-check.svg", treinosFeitos(), "Treinos", { up: true })}
          </div>
          <div class="field">
            <span class="field-lbl">Seu programa principal · caminho: ${esc(caminhoTxt())}</span>
            <div class="prog-cat">${CATALOGO.map((x, i) => `<button class="prog-opt${principal() === x.k ? " on" : ""}" data-principal="${x.k}">
              <span class="po-n">${i + 1}</span><span class="po-txt"><strong>${esc(x.nome)}</strong><small>${esc(x.nivel)}${S.nivel === x.nivel ? " · seu nível" : ""}</small></span>${principal() === x.k ? "<b>✓</b>" : ""}</button>`).join("")}</div>
          </div>
          <div class="perfil-rec">
            <div class="sec-head"><h2>Meus recordes</h2>${uid ? `<span>visíveis para o seu grupo</span>` : ""}</div>
            ${recordesHtml(linhasLocais(), "Registre o Max Out no MAX:30 ou faça o Fit Test do Insanity para ver seus recordes aqui.")}
          </div>
          <div class="field">
            <span class="field-lbl">Em qual semana do programa você está?</span>
            <div class="seg">${PROGRAMA.map((s, i) => `<button class="${i === w ? "on" : ""}" data-semana="${i}">${i + 1}</button>`).join("")}</div>
          </div>
          <div class="field">
            <span class="field-lbl">${uid ? "Seus treinos ficam salvos na sua conta e neste aparelho." : "Seus dados ficam salvos neste aparelho. Faça backup de vez em quando."}</span>
            <div class="row2">
              <button class="btn btn-outline" id="exportar">Exportar backup</button>
              <button class="btn btn-outline" id="importar">Importar backup</button>
            </div>
            <input type="file" id="arquivo" accept="application/json,.json" hidden>
          </div>
          <button class="btn logout" id="sair">${uid ? "Sair da conta" : "Sair do modo visitante"}${icon("log-out.svg", 16)}</button>
        </div></section>`;
    },
  };
  VKEYS.forEach((p) => { telas[p] = (p1, p2) => telaVideo(p, p1, p2); });

  /* ==========================================================
     Hipertrofia (academia): entrevista com o Coach AI, plano semanal gerado pela IA (/api/hiper),
     registro de carga × repetições, vídeo do YouTube em cada exercício e revisão semanal do plano.
     S.hiper = { perfil, etapa, plano, inicio, logs: { data: { d, sets: { id: [{ kg, r }] }, done } },
                 checkins: [{ k, peso }], msgs: [{ k, txt, tipo }], anterior, atualizado }
     ========================================================== */
  const ACAD = window.FITAI_ACADEMIA || [];
  const ACI = Object.fromEntries(ACAD.map((e) => [e.id, e]));
  const hxDia = (d) => (S.hiper.plano?.dias || []).find((x) => x.dia === d) || null;
  const fmtKg = (n) => String(Math.round(n * 10) / 10).replace(".", ",");
  const faixa = (r) => { const n = String(r).match(/\d+/g) || []; const a = +n[0] || 10; return [a, +(n[1] || a)]; };
  const hxUn = (ex) => (ACI[ex.id]?.equip === "cardio" ? "min" : /\d\s*s\b|seg/i.test(ex.reps) ? "s" : "reps");
  const fmtSet = (s, un) => (un === "min" ? `${s.r} min` : un === "s" ? `${s.kg ? `${fmtKg(s.kg)}kg · ` : ""}${s.r}s` : s.kg ? `${fmtKg(s.kg)}kg×${s.r}` : `${s.r} reps`);
  const hxDesc = (s) => (s >= 60 ? `${Math.floor(s / 60)}${s % 60 ? `:${pad(s % 60)}` : ""} min` : `${s}s`);
  const hxMinDia = (t) => Math.round(soma(t.exercicios.map((e) => (hxUn(e) === "min" ? faixa(e.reps)[0] * 60 : e.series * ((e.descanso || 90) + 40)))) / 60);
  const maxKg = (sets) => Math.max(0, ...sets.map((s) => s.kg || 0));
  function hxFeito(k) { return !!S.hiper?.logs[k]?.done; }
  function hxParcial(k) { const l = S.hiper?.logs[k]; return !!l && Object.values(l.sets || {}).some((s) => s.length); }
  // Minutos de um dia de academia: descanso + ~40 s por série registrada; cardio conta os minutos anotados
  function hxMin(l) {
    const t = hxDia(l.d);
    let seg = 0;
    for (const [id, s] of Object.entries(l.sets || {})) {
      if (ACI[id]?.equip === "cardio") { seg += soma(s.map((x) => x.r || 0)) * 60; continue; }
      seg += s.length * ((t?.exercicios.find((e) => e.id === id)?.descanso || 90) + 40);
    }
    return Math.min(300, Math.round(seg / 60));
  }
  const hxVolume = (l) => soma(Object.values(l.sets || {}).flat().map((s) => (s.kg || 0) * (s.r || 0)));
  const hxHist = (id) => Object.keys(S.hiper.logs).sort().filter((k) => (S.hiper.logs[k].sets?.[id] || []).length).map((k) => ({ k, sets: S.hiper.logs[k].sets[id] }));
  const hxAnterior = (id) => hxHist(id).filter((h) => h.k < hojeKey).pop() || null;
  // Dupla progressão: bateu o topo da faixa em todas as séries com a mesma carga → sobe a carga; senão, mais repetições
  function hxMeta(ex) {
    const prev = hxAnterior(ex.id), un = hxUn(ex);
    if (!prev || un === "min") return null;
    const [, mx] = faixa(ex.reps), kg = maxKg(prev.sets);
    if (!kg) return { txt: `Última vez: ${prev.sets.map((s) => s.r).join(", ")}${un === "s" ? " s" : " reps"}. Tente superar em pelo menos uma série.` };
    const topo = prev.sets.filter((s) => s.kg === kg);
    if (topo.length >= ex.series && topo.every((s) => s.r >= mx)) {
      const inc = ACI[ex.id]?.equip === "halter" ? 2 : Math.max(2.5, Math.round((kg * 0.05) / 2.5) * 2.5);
      return { kg: kg + inc, txt: `Você bateu ${mx} reps em todas as séries: suba para ${fmtKg(kg + inc)} kg.` };
    }
    return { kg, txt: `Mantenha ${fmtKg(kg)} kg e busque ${mx} reps em todas as séries.` };
  }
  const hxLogHoje = () => S.hiper.logs[hojeKey] || null;
  const hxDiaHoje = () => { const l = hxLogHoje(); return l ? l.d : hxDia(hojeDia) ? hojeDia : null; };
  const hxLinkHoje = () => (S.hiper.plano && hxDiaHoje() !== null ? `#/hiper/${hxDiaHoje()}` : "#/hiper");
  const hxFeitoNaSemana = (d) => Object.entries(S.hiper.logs).some(([k, l]) => l.d === d && l.done && k >= keyOf(mondayOf(hoje)));
  const HX_IMG = [[/costa|puxar|pull/i, "treino-superiores-2.jpg"], [/perna|inferior|gl[uú]te|lower|leg/i, "treino-inferiores-1.jpg"], [/abd|core/i, "treino-inferiores-2.jpg"],
    [/bra[çc]|b[ií]ceps|tr[ií]ceps/i, "treino-superiores-2.jpg"], [/peito|ombro|superior|push|upper|empurr/i, "login.jpg"]];
  const hxImg = (foco) => A((HX_IMG.find(([re]) => re.test(foco)) || [0, "banner-home.jpg"])[1]);

  function hxCard(t, { link = true } = {}) {
    const tag = link ? "a" : "div", ok = hxFeitoNaSemana(t.dia);
    return `<${tag} class="wcard" ${link ? `href="#/hiper/${t.dia}"` : ""} aria-label="${DIAS[t.dia]}: ${esc(t.titulo)}">
      <img class="cover" src="${hxImg(t.foco + " " + t.titulo)}" alt="" loading="lazy">
      <span class="pill glass">${icon("calendar-14.svg")}${DIAS[t.dia]} · ${esc(t.foco)}${ok ? " · ✓" : ""}</span>
      <div class="bottom"><div class="info"><h3>${esc(t.titulo)}</h3><div class="meta"><span>${icon("timer.svg")}~${hxMinDia(t)} min</span><span>${icon("zap.svg")}${t.exercicios.length} ${t.exercicios.length === 1 ? "exercício" : "exercícios"}</span></div></div></div></${tag}>`;
  }
  const hxBanner = (titulo, selo = "Academia") => `<div class="banner" style="--grad: linear-gradient(238.09deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.8) 100%)">
      <div class="banner-bg"><img class="plano-img" src="${A("treino-superiores-2.jpg")}" alt=""></div>
      <span class="logo-txt">Fit.ai</span>
      <div class="plano-title"><span class="pill blue">${icon("goal.svg", 16)}${esc(selo)}</span><h1>${esc(titulo)}</h1></div></div>`;

  /* ---------- Entrevista ---------- */
  const HX_PASSOS = [
    { k: "objetivo", q: "Qual é o seu principal objetivo?", op: ["Ganhar massa muscular", "Perder gordura", "Definir (perder gordura sem perder músculo)", "Ganhar força", "Saúde e condicionamento"] },
    { k: "experiencia", q: "Há quanto tempo você treina musculação?", op: ["Nunca treinei", "Menos de 6 meses", "De 6 meses a 2 anos", "Mais de 2 anos"] },
    { k: "dias", q: "Quantos dias por semana você consegue treinar?", op: ["2", "3", "4", "5", "6"], fmt: (v) => `${v} dias por semana` },
    { k: "diasSemana", q: "Quais dias ficam melhores para você? Toque nos dias e depois em <b>Pronto</b>.", multi: true },
    { k: "tempo", q: "Quanto tempo você tem para cada treino?", op: ["45 min", "1 hora", "1h15", "1h30"] },
    { k: "local", q: "Onde você vai treinar?", op: ["Academia completa", "Academia simples (poucos aparelhos)", "Em casa com halteres"] },
    { k: "foco", q: "Quer dar prioridade a alguma parte do corpo?", op: ["Equilibrado", "Peito e braços", "Costas e ombros", "Pernas e glúteos", "Abdômen"] },
    { k: "sexo", q: "Para calibrar volume e cargas: qual o seu sexo?", op: ["Masculino", "Feminino", "Prefiro não dizer"] },
    { k: "idade", q: "Qual a sua idade?", num: [14, 99], un: "anos", perfil: "idade" },
    { k: "peso", q: "Qual o seu peso hoje, em kg?", num: [30, 300], un: "kg", perfil: "peso" },
    { k: "altura", q: "E a sua altura, em cm?", num: [120, 230], un: "cm", perfil: "altura" },
    { k: "limitacoes", q: "Tem alguma dor, lesão ou exercício que você não pode fazer? Se tiver, escreva aqui embaixo.", op: ["Nenhuma"], livre: true },
    { k: "extra", q: "Quer me contar mais alguma coisa? Rotina, cardio, exercício que ama ou odeia… Se não, é só tocar no botão.", op: ["Não, pode montar!"], livre: true },
  ];
  let hxGerando = false, hxRefazer = false, hxRevisando = false, hxChat = false;
  const hxResp = (p, v) => (p.multi ? (Array.isArray(v) && v.length ? v.map((d) => DIAS[d]).join(", ") : "Tanto faz") : p.fmt ? p.fmt(v) : p.num ? `${String(v).replace(".", ",")} ${p.un}` : String(v ?? ""));
  // Tela do Hipertrofia antes do plano: a entrevista acontece no chat do Coach (botão do meio)
  function telaHxComecar() {
    const et = Math.min(S.hiper.etapa || 0, HX_PASSOS.length);
    return `<section class="screen has-toolbar">
      ${hxBanner("Hipertrofia", "Coach AI")}
      ${progSwitch("hiper")}
      <div class="section"><div class="note-box">
        <p><b>Treino de academia feito para você.</b> O Coach AI faz ${HX_PASSOS.length} perguntas rápidas (objetivo, dias, experiência, peso…) e monta seu plano semanal.</p>
        <p>Depois ele acompanha suas cargas e ajusta o treino toda semana. Cada exercício tem vídeo de execução.</p>
        <button class="btn btn-blue" data-hx-chat ${hxGerando ? "disabled" : ""}>${hxGerando ? "Montando seu treino…" : et ? `Continuar com o Coach (${et}/${HX_PASSOS.length})` : "Montar meu treino com o Coach"}</button>
      </div></div></section>`;
  }
  const HX_DIAS_ATALHO = { 2: ["Segunda e quinta", "Terça e sexta"], 3: ["Segunda, quarta e sexta", "Terça, quinta e sábado"], 4: ["Segunda, terça, quinta e sexta"], 5: ["Segunda a sexta"], 6: ["Segunda a sábado"] };
  const HX_DIA_NOMES = ["seg", "ter", "qua", "qui", "sex", "sab", "dom"];
  // "seg, qua e sex", "segunda a sexta", "tanto faz" -> [0, 2, 4] | [] | null (não entendi)
  function hxDiasDe(t) {
    if (/tanto faz|qualquer|sem prefer/.test(t)) return [];
    const idx = (w) => HX_DIA_NOMES.findIndex((n) => w.startsWith(n));
    const faixa = t.match(/(seg|ter|qua|qui|sex|sab|dom)\w*\s+(?:a|ate)\s+(seg|ter|qua|qui|sex|sab|dom)/);
    if (faixa) { const a = idx(faixa[1]), b = idx(faixa[2]); if (a >= 0 && b >= a) return Array.from({ length: b - a + 1 }, (_, i) => a + i); }
    const ds = [...new Set((t.match(/[a-z]+/g) || []).map(idx).filter((i) => i >= 0))].sort();
    return ds.length ? ds : null;
  }
  // Grava a resposta da etapa atual. Devolve "" se aceitou ou o motivo de não aceitar.
  function hxResponder(texto) {
    const p = HX_PASSOS[S.hiper.etapa || 0], t = norm(texto);
    if (!p) return "";
    let v;
    if (p.multi) {
      v = hxDiasDe(t);
      if (v === null) return "Não entendi os dias. Escreva, por exemplo, <b>seg, qua e sex</b>, ou toque numa opção.";
      const n = Number(S.hiper.perfil.dias) || 0;
      if (v.length && n && v.length !== n) return `Você disse ${n} dias por semana, mas escolheu ${v.length}. Escolha ${n} dias ou toque em <b>Tanto faz</b>.`;
    } else if (p.num) {
      const n = Number((String(texto).replace(",", ".").match(/\d+(\.\d+)?/) || [])[0]);
      if (!(n >= p.num[0] && n <= p.num[1])) return `Me diga um número entre ${p.num[0]} e ${p.num[1]} (${p.un}).`;
      v = String(Math.round(n * 10) / 10);
      if (p.perfil) S.perfil[p.perfil] = v;
    } else if (p.k === "dias") {
      const n = Number((t.match(/\d/) || [])[0]);
      if (!(n >= 1 && n <= 7)) return "Quantos dias por semana? Um número de 1 a 7.";
      v = String(n);
    } else {
      v = (p.op || []).find((o) => norm(o) === t) || String(texto).trim().slice(0, 400);
    }
    S.hiper.perfil[p.k] = v;
    S.hiper.etapa = (S.hiper.etapa || 0) + 1;
    save();
    return "";
  }
  const hxOpcoes = (p) => {
    if (p.multi) return [...(HX_DIAS_ATALHO[Number(S.hiper.perfil.dias)] || []), "Tanto faz"];
    if (p.num) return p.perfil && S.perfil[p.perfil] ? [`${String(S.perfil[p.perfil]).replace(".", ",")} ${p.un}`] : [];
    return (p.op || []).map((o) => (p.fmt ? p.fmt(o) : o));
  };
  async function hxPerguntaChat(ms = 500) {
    const p = HX_PASSOS[S.hiper.etapa || 0], et = S.hiper.etapa || 0;
    const stop = typing(msgsEl); await wait(ms); stop();
    if (!p) {
      addMsg(msgsEl, "Tudo pronto! Posso montar seu treino? 🏋️", false, chatLog);
      setChips(chipsEl, ["Montar meu treino", "Mudar a última resposta", "Cancelar"], true);
      return;
    }
    const q = p.multi ? "Quais dias ficam melhores? Toque numa opção ou escreva os dias (ex.: <b>seg, qua e sex</b>)." : p.num ? `${p.q} É só digitar.` : p.livre ? p.q.replace("aqui embaixo", "no campo abaixo") : p.q;
    addMsg(msgsEl, `<span class="hx-passo">${et + 1}/${HX_PASSOS.length}</span> ${q}`, false, chatLog);
    setChips(chipsEl, [...hxOpcoes(p), ...(et ? ["Voltar"] : []), "Cancelar"]);
    const inp = $("#chat-input");
    inp.placeholder = p.num ? `Digite em ${p.un}` : "Digite sua resposta";
    inp.inputMode = p.num ? "decimal" : "text";
    if (p.num || p.livre) inp.focus();
  }
  async function hxIniciarChat(refazer = false) {
    if (!layer.hidden && hxChat) return;
    if (layer.hidden) openChat();
    hxChat = true; hxRefazer = refazer;
    if (refazer) S.hiper.etapa = 0;
    const et = S.hiper.etapa || 0;
    const stop = typing(msgsEl); await wait(500); stop();
    addMsg(msgsEl, et && et < HX_PASSOS.length ? "Vamos continuar de onde paramos. 💪"
      : `${refazer ? "Vamos montar um treino novo!" : `Bora montar seu treino de academia, ${esc(primeiroNome())}! 💪`} São ${HX_PASSOS.length} perguntas rápidas e depois eu monto seu plano semanal, com vídeo de execução em cada exercício.`, false, chatLog);
    hxPerguntaChat(600);
  }
  function hxSairChat(msg) {
    hxChat = false;
    const inp = $("#chat-input"); inp.placeholder = "Digite sua mensagem"; inp.inputMode = "text";
    if (msg) addMsg(msgsEl, msg, false, chatLog);
    setChips(chipsEl, CHIPS_HOJE);
  }
  // Mensagem digitada ou chip tocado durante a entrevista
  async function hxChatResposta(texto) {
    const t = norm(texto), et = S.hiper.etapa || 0;
    if (t === "cancelar") return hxSairChat(`Tudo bem! Suas respostas ficam salvas. Quando quiser continuar, toque em <b>Hipertrofia</b>.`);
    if (t === "voltar" || t === "mudar a ultima resposta") { S.hiper.etapa = Math.max(0, et - 1); save(); return hxPerguntaChat(); }
    if (!HX_PASSOS[et]) {
      if (/montar|sim|pode|bora|manda/.test(t)) return hxGerar();
      return hxPerguntaChat();
    }
    const erro = hxResponder(texto);
    if (erro) { const stop = typing(msgsEl); await wait(400); stop(); addMsg(msgsEl, erro, false, chatLog); return; }
    hxPerguntaChat();
  }
  async function hxApi(corpo) {
    const token = await tokenSB();
    try {
      const r = await fetch("/api/hiper", { method: "POST", headers: { "content-type": "application/json", ...(token ? { authorization: `Bearer ${token}` } : {}) }, body: JSON.stringify(corpo) });
      const d = await r.json().catch(() => ({}));
      if (r.ok && d.plano) return d;
      toast(d.erro === "limite" ? "Você chegou ao limite do Coach por hoje. Tente amanhã. 💪" : d.erro === "ocupado" ? "O Coach está com muita gente agora. Tente de novo em 1 minuto." : "Não consegui falar com o Coach agora. Tente de novo.", 4500);
    } catch { toast("Sem conexão com o Coach. Confira a internet e tente de novo."); }
    return null;
  }
  const hxPerfil = () => ({ ...S.hiper.perfil, idade: S.hiper.perfil.idade || S.perfil.idade, peso: S.perfil.peso || S.hiper.perfil.peso, altura: S.hiper.perfil.altura || S.perfil.altura });
  async function hxGerar() {
    if (hxGerando) return;
    hxGerando = true; busy = true; setChips(chipsEl, []);
    addMsg(msgsEl, "Montando seu treino com base nas suas respostas… leva uns 30 segundos. ⏳", false, chatLog);
    const stop = typing(msgsEl);
    const r = await hxApi({ acao: "plano", perfil: hxPerfil() });
    stop(); hxGerando = false; busy = false;
    if (!r) { addMsg(msgsEl, "Não consegui montar agora. Toque em <b>Montar meu treino</b> para tentar de novo.", false, chatLog); setChips(chipsEl, ["Montar meu treino", "Cancelar"], true); return; }
    if (S.hiper.plano) S.hiper.anterior = S.hiper.plano;
    S.hiper.plano = r.plano; S.hiper.inicio = hojeKey; S.hiper.atualizado = Date.now(); hxRefazer = false;
    hxMsg(r.mensagem, "plano"); save();
    hxSairChat();
    const m = { html: `${md(r.mensagem)}<p>Seu plano: <b>${esc(r.plano.nome)}</b>, ${r.plano.dias.length} treinos por semana (${r.plano.dias.map((d) => DIAS[d.dia].slice(0, 3)).join(", ")}).</p>`, me: false, txt: r.mensagem };
    chatLog.push(m); msgsEl.insertAdjacentHTML("beforeend", bubbleHTML(m)); msgsEl.scrollTo({ top: msgsEl.scrollHeight, behavior: "smooth" });
    setChips(chipsEl, ["Ver meu treino", "Por que esse treino?"], true);
  }
  function hxMsg(txt, tipo) { S.hiper.msgs = [...(S.hiper.msgs || []), { k: hojeKey, txt: String(txt || "").slice(0, 1500), tipo }].slice(-12); }

  /* ---------- Plano da semana e acompanhamento ---------- */
  function hxHistoricoTexto(dias = 35) {
    const desde = keyOf(addDays(hoje, -dias));
    return Object.keys(S.hiper.logs).sort().filter((k) => k >= desde).map((k) => {
      const l = S.hiper.logs[k], t = hxDia(l.d);
      return `${k} (${t ? t.titulo : DIAS[l.d]})${l.done ? "" : " [incompleto]"}: ` + (Object.entries(l.sets || {}).filter(([, s]) => s.length)
        .map(([id, s]) => { const ex = t?.exercicios.find((e) => e.id === id) || { id, reps: "" }; return `${ACI[id]?.nome || id} ${s.map((x) => fmtSet(x, hxUn(ex))).join(", ")}`; }).join("; ") || "sem séries");
    }).join("\n") || "sem registros";
  }
  const hxCheckinsTexto = () => (S.hiper.checkins || []).slice(-10).map((c) => `${c.k}: ${String(c.peso).replace(".", ",")} kg`).join("\n") || "nenhum";
  const hxSemanas = () => (S.hiper.inicio ? Math.max(1, Math.floor(diffDays(mondayOf(parseKey(S.hiper.inicio)), hoje) / 7) + 1) : 1);
  const hxUltRevisao = () => [...(S.hiper.msgs || [])].reverse().find((m) => m.tipo === "revisao" || m.tipo === "plano")?.k || S.hiper.inicio || hojeKey;
  const hxTreinosDesde = (k) => Object.entries(S.hiper.logs).filter(([d, l]) => d > k && l.done).length;
  function hxPorSemana(n = 8) {
    const seg = mondayOf(hoje);
    return Array.from({ length: n }, (_, i) => {
      const ini = addDays(seg, -(n - 1 - i) * 7), a = keyOf(ini), b = keyOf(addDays(ini, 6));
      return { k: a, v: Math.round(soma(Object.entries(S.hiper.logs).filter(([k]) => k >= a && k <= b).map(([, l]) => hxVolume(l))) / 100) / 10 };
    });
  }
  function telaHxPlano() {
    const pl = S.hiper.plano, msg = (S.hiper.msgs || [])[S.hiper.msgs.length - 1];
    const feitosSemana = pl.dias.filter((t) => hxFeitoNaSemana(t.dia)).length;
    const ult = hxUltRevisao(), novos = hxTreinosDesde(ult);
    const revisar = diffDays(parseKey(ult), hoje) >= 7 && novos >= 2;
    const ck = S.hiper.checkins || [], ckUlt = ck[ck.length - 1], ck0 = ck[0];
    const vol = hxPorSemana(), totalTreinos = Object.values(S.hiper.logs).filter((l) => l.done).length;
    const pesoSerie = ck.slice(-8).map((c) => ({ k: c.k, v: Number(c.peso) }));
    const extras = [pl.progressao && `<p><b>Progressão:</b> ${esc(pl.progressao)}</p>`, pl.cardio && `<p><b>Cardio:</b> ${esc(pl.cardio)}</p>`, pl.alimentacao && `<p><b>Alimentação:</b> ${esc(pl.alimentacao)}</p>`].filter(Boolean);
    return `<section class="screen has-toolbar">
      ${hxBanner(pl.nome, pl.divisao || "Academia")}
      ${progSwitch("hiper")}
      ${msg ? `<div class="section"><div class="note-box hx-coach"><p><b>${icon("sparkles-blue.svg", 14)} Coach AI · ${msg.k === hojeKey ? "hoje" : ddmm(msg.k)}</b></p>${md(msg.txt)}
        ${msg.tipo === "revisao" && S.hiper.anterior ? `<button class="lnk-btn" data-hx-desfazer>Voltar ao plano anterior</button>` : ""}</div></div>` : ""}
      <p class="note week-note">Semana ${hxSemanas()} do plano · <b>${feitosSemana} de ${pl.dias.length}</b> treinos feitos nesta semana.${pl.resumo ? ` ${esc(pl.resumo)}` : ""}</p>
      <div class="list" style="padding-top:8px">${pl.dias.map((t) => hxCard(t)).join("")}</div>
      ${extras.length ? `<div class="section" style="padding-top:0"><div class="note-box">${extras.join("")}</div></div>` : ""}
      <div class="section">
        <div class="sec-head"><h2>Acompanhamento</h2></div>
        ${revisar ? `<div class="note-box"><p><b>Hora da revisão semanal!</b> Você fez ${novos} treinos desde a última análise. O Coach olha suas cargas e ajusta o plano.</p></div>` : ""}
        <div class="stats-row">
          ${stat("circle-check.svg", totalTreinos, "Treinos na academia")}
          ${stat("weight.svg", ckUlt ? `${fmtKg(Number(ckUlt.peso))}` : "—", ckUlt && ck0 && ck.length > 1 ? `kg (${Number(ckUlt.peso) - Number(ck0.peso) >= 0 ? "+" : ""}${fmtKg(Number(ckUlt.peso) - Number(ck0.peso))})` : "kg · peso")}
        </div>
        <p class="note hx-graf">Volume por semana (toneladas: carga × repetições)</p>
        ${barras(vol, { fmt: (v) => String(v).replace(".", ","), aria: "Volume de treino por semana" })}
        ${pesoSerie.length > 1 ? `<p class="note hx-graf">Peso corporal nos check-ins (kg)</p>${barras(pesoSerie, { fmt: (v) => fmtKg(v), aria: "Peso nos check-ins" })}` : ""}
        <div class="hx-acoes">
          <button class="btn btn-blue" data-hx-revisar ${hxRevisando ? "disabled" : ""}>${hxRevisando ? "Coach analisando seus treinos…" : "Revisar meu treino com o Coach"}</button>
          <button class="btn btn-outline" data-hx-checkin>Check-in de peso</button>
          <button class="btn btn-outline" data-hx-perguntar>Perguntar ao Coach</button>
          <button class="lnk-btn" data-hx-refazer>Refazer a entrevista e montar outro treino</button>
        </div>
      </div></section>`;
  }
  async function hxRevisar() {
    if (hxRevisando) return;
    const fb = prompt("Como foram os treinos? Quer mudar algo (exercício, dias, foco, alguma dor)? Pode deixar em branco.", "");
    if (fb === null) return;
    hxRevisando = true; render();
    const r = await hxApi({ acao: "revisao", perfil: hxPerfil(), plano: S.hiper.plano, historico: hxHistoricoTexto(), checkins: hxCheckinsTexto(), feedback: fb });
    hxRevisando = false;
    if (r) {
      S.hiper.anterior = S.hiper.plano; S.hiper.plano = r.plano; S.hiper.atualizado = Date.now();
      hxMsg(r.mensagem, "revisao"); save(); toast("Plano revisado ✓", 3000);
    }
    render(); if (r) scrollTo(0, 0);
  }
  function hxCheckin() {
    const v = prompt("Seu peso hoje (kg):", S.perfil.peso || "");
    if (v === null) return;
    const n = Number(String(v).replace(",", "."));
    if (!(n >= 30 && n <= 300)) { toast("Digite um peso entre 30 e 300 kg."); return; }
    const ck = (S.hiper.checkins || []).filter((c) => c.k < keyOf(mondayOf(hoje))); // um check-in por semana (o último vale)
    ck.push({ k: hojeKey, peso: Math.round(n * 10) / 10 });
    S.hiper.checkins = ck.slice(-30); S.perfil.peso = String(Math.round(n * 10) / 10); S.hiper.atualizado = Date.now();
    save(); render(); toast("Check-in salvo ✓");
  }

  /* ---------- Dia de treino ---------- */
  function hxExCard(ex, editavel) {
    const c = ACI[ex.id] || { nome: ex.id, musculos: "", exec: "", erros: "" }, un = hxUn(ex);
    const sets = editavel ? (hxLogHoje()?.sets?.[ex.id] || []) : [];
    const prev = hxAnterior(ex.id), meta = hxMeta(ex), ult = sets[sets.length - 1];
    const kgSug = ult ? ult.kg || "" : meta?.kg ?? (prev ? maxKg(prev.sets) || "" : "");
    const rSug = ult ? ult.r : un === "min" ? faixa(ex.reps)[0] : faixa(ex.reps)[1];
    const q = encodeURIComponent(`${c.nome} execução correta`);
    return `<div class="ex hx${sets.length >= ex.series ? " done" : ""}" data-hx-ex="${ex.id}">
      <div class="ex-top"><span class="ex-name"><span class="ex-check">${check}</span>${esc(c.nome)}</span>
        <button class="ask" data-hx-ask="${ex.id}" aria-label="Perguntar ao Coach AI sobre ${esc(c.nome)}">${icon("circle-question.svg", 20)}</button></div>
      <div class="ex-tags"><span class="pill gray">${ex.series} × ${esc(ex.reps)}</span><span class="pill gray">${icon("timer.svg")}${hxDesc(ex.descanso)}</span>
        ${prev ? `<span class="pill gray">Última: ${esc(prev.sets.map((s) => fmtSet(s, un)).join(" · "))}</span>` : ""}</div>
      ${meta && editavel ? `<p class="hx-meta">🎯 ${esc(meta.txt)}</p>` : ""}
      ${ex.obs ? `<p class="ex-obs">${esc(ex.obs)}</p>` : ""}
      <div class="hx-video">${c.yt ? `<button class="btn btn-outline hx-play" data-hx-play="${ex.id}">▶ Ver como fazer</button>` : ""}
        <a class="lnk-btn" href="https://www.youtube.com/results?search_query=${q}" target="_blank" rel="noopener">${c.yt ? "Mais vídeos no YouTube" : "Ver vídeos no YouTube"}</a></div>
      ${c.exec ? `<details class="musc hx-como"><summary><span>📋 ${esc(c.musculos || "Como fazer")}</span></summary>
        <div class="hx-dica"><p><b>Execução:</b> ${esc(c.exec)}</p><p><b>Evite:</b> ${esc(c.erros)}</p></div></details>` : ""}
      ${editavel ? `<div class="sets">
        ${sets.map((s, i) => `<button class="set" data-hx-del="${i}" title="Toque para remover" aria-label="Série ${i + 1}: ${esc(fmtSet(s, un))}. Toque para remover">${esc(fmtSet(s, un))}</button>`).join("")}
        <form class="add-set hx-add" data-hx-add="${ex.id}">
          ${un !== "min" ? `<input name="kg" type="number" inputmode="decimal" step="0.5" min="0" max="999" value="${kgSug}" placeholder="kg" aria-label="Carga em kg (deixe vazio se for sem peso)"><span class="hx-x">${un === "s" ? "kg ·" : "×"}</span>` : ""}
          <input name="r" type="number" inputmode="numeric" min="1" max="999" value="${rSug}" aria-label="${un === "reps" ? "Repetições" : un === "s" ? "Segundos" : "Minutos"}">
          <button type="submit" class="btn btn-blue">${un === "min" ? "+ min" : "+ Série"}</button></form></div>
      <div class="progress"><div class="bar"><i style="width:${Math.min(100, Math.round((sets.length / ex.series) * 100))}%"></i></div><span>${sets.length}/${ex.series} ${un === "min" ? "registros" : "séries"}</span></div>` : ""}
    </div>`;
  }
  function telaHxDia(d) {
    const t = hxDia(d), lh = hxLogHoje();
    const ehHoje = lh ? lh.d === d : d === hojeDia;
    const done = ehHoje && hxFeito(hojeKey);
    return `<section class="screen has-toolbar"><div class="list" style="gap:20px">
      <div class="page-head">
        <a class="icon-btn" href="#/hiper" aria-label="Voltar">${icon("chevron-left.svg", 24)}</a>
        <h1>${ehHoje ? "Treino de Hoje" : DIAS[d]}</h1><span class="spacer"></span></div>
      ${hxCard(t, { link: false })}
      ${ehHoje ? `<div class="note-box"><p>Anote <b>carga × repetições</b> de cada série. Na próxima vez, o app compara e diz quando subir a carga. Toque em <b>▶ Ver como fazer</b> para assistir à execução.</p></div>`
        : `<button class="btn btn-outline" data-hx-hoje="${d}">Fazer este treino hoje</button>`}
      <div class="ex-list">${t.exercicios.map((ex) => hxExCard(ex, ehHoje)).join("")}</div>
      ${ehHoje ? `<button class="btn btn-outline${done ? " done" : ""}" data-hx-concluir>${done ? "Treino concluído ✓" : "Marcar como concluído"}</button>` : ""}
      </div></section>`;
  }
  function hxRefazerCard(id) {
    const el = document.querySelector(`.ex.hx[data-hx-ex="${CSS.escape(id)}"]`), t = hxDia(hxLogHoje()?.d), ex = t?.exercicios.find((e) => e.id === id);
    if (el && ex) el.outerHTML = hxExCard(ex, true);
  }
  function hxGarantirLog(d) {
    if (!S.hiper.logs[hojeKey]) S.hiper.logs[hojeKey] = { d, sets: {}, done: false };
    return S.hiper.logs[hojeKey];
  }

  /* ---------- Tela inicial e Coach ---------- */
  function hxHome(principalAqui) {
    const titulo = principalAqui ? "Treino de Hoje" : "Academia";
    if (!S.hiper.plano) return `<div class="sec-head"><h2>${titulo}</h2><a href="#/hiper">Hipertrofia</a></div><a class="emerg" href="#/hiper" data-hx-chat><span>${icon("sparkles-blue.svg", 20)}</span><div><strong>Monte seu treino de academia</strong><small>${S.hiper.etapa ? "Continue a conversa com o Coach AI" : "O Coach AI faz umas perguntas e monta seu plano"}</small></div></a>`;
    const d = hxDiaHoje(), t = d !== null ? hxDia(d) : null;
    const head = `<div class="sec-head"><h2>${titulo}</h2><a href="#/hiper">${esc(S.hiper.plano.nome)}</a></div>`;
    if (t) return head + hxCard(t);
    const prox = S.hiper.plano.dias.find((x) => x.dia > hojeDia) || S.hiper.plano.dias[0];
    return head + `<a class="emerg" href="#/hiper"><span>${icon("calendar-14.svg", 20)}</span><div><strong>Hoje é dia de descanso na academia</strong><small>Próximo treino: ${DIAS[prox.dia]} · ${esc(prox.titulo)}</small></div></a>`;
  }
  function hxProgramaTexto() {
    const pl = S.hiper.plano;
    if (!pl) return `# Programa extra: Hipertrofia (academia)\nTreino de musculação montado pelo Coach AI depois de uma entrevista (objetivo, dias, experiência, peso etc.). A pessoa ainda não montou o plano: para começar, abra a aba Hipertrofia.`;
    return [`# Programa extra: Hipertrofia (academia) — plano "${pl.nome}" (${pl.divisao}), montado pelo Coach AI`, pl.resumo, `Progressão: ${pl.progressao}`, pl.cardio && `Cardio: ${pl.cardio}`, pl.alimentacao && `Alimentação: ${pl.alimentacao}`,
      ...pl.dias.map((t) => `## ${DIAS[t.dia]} · ${t.titulo}\n${t.exercicios.map((e) => `- ${ACI[e.id]?.nome || e.id} [${e.id}] (${ACI[e.id]?.musculos || ""}): ${e.series}×${e.reps}, descanso ${e.descanso}s${e.obs ? ` — ${e.obs}` : ""}`).join("\n")}`),
      `Entrevista: ${HX_PASSOS.map((p) => `${p.k}: ${hxResp(p, S.hiper.perfil[p.k])}`).join("; ")}`,
      "Para mudar o plano (trocar exercício, dias ou foco), oriente a pessoa a tocar em \"Revisar meu treino com o Coach\" na aba Hipertrofia e escrever o pedido."].filter(Boolean).join("\n");
  }
  function hxContextoTexto() {
    if (!S.hiper.plano) return "";
    const d = hxDiaHoje(), t = d !== null ? hxDia(d) : null;
    return [`Hipertrofia (academia): semana ${hxSemanas()} do plano. Hoje: ${t ? `${t.titulo}${hxFeito(hojeKey) ? " (feito)" : hxParcial(hojeKey) ? " (em andamento)" : ""}` : "descanso"}.`,
      `Registros da academia (carga × reps):\n${hxHistoricoTexto(28)}`, `Check-ins de peso:\n${hxCheckinsTexto()}`].join("\n");
  }
  const hxDados = () => (S.hiper.plano || S.hiper.etapa ? { perfil: S.hiper.perfil, etapa: S.hiper.etapa || 0, plano: S.hiper.plano, inicio: S.hiper.inicio, checkins: S.hiper.checkins || [], msgs: (S.hiper.msgs || []).slice(-6), atualizado: S.hiper.atualizado || 0 } : null);

  telas.hiper = (p1) => {
    setToolbar("plano");
    if (!S.hiper.plano) return telaHxComecar();
    if (p1 !== undefined && hxDia(Number(p1))) return telaHxDia(Number(p1));
    return telaHxPlano();
  };

  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-hx-chat],[data-hx-play],[data-hx-del],[data-hx-hoje],[data-hx-concluir],[data-hx-ask],[data-hx-revisar],[data-hx-checkin],[data-hx-perguntar],[data-hx-refazer],[data-hx-desfazer]");
    if (!t) return;
    const ds = t.dataset;
    if (t.hasAttribute("data-hx-chat")) { e.preventDefault(); hxIniciarChat(); }
    else if (ds.hxPlay) {
      const c = ACI[ds.hxPlay];
      t.closest(".hx-video").innerHTML = `<div class="video-frame hx-frame"><iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(c.yt)}?rel=0&playsinline=1&autoplay=1" title="${esc(c.nome)}: execução"
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe></div>
        <a class="lnk-btn" href="https://www.youtube.com/watch?v=${encodeURIComponent(c.yt)}" target="_blank" rel="noopener">Não carregou? Abrir no YouTube</a>`;
    } else if (ds.hxDel !== undefined) {
      const id = t.closest(".ex.hx").dataset.hxEx, l = hxLogHoje();
      if (!l?.sets[id]) return;
      l.sets[id].splice(Number(ds.hxDel), 1); save(); hxRefazerCard(id);
    } else if (ds.hxHoje !== undefined) {
      const d = Number(ds.hxHoje), l = hxLogHoje();
      if (l && hxParcial(hojeKey) && !confirm("Você já anotou séries hoje em outro treino. Trocar para este? (as séries de hoje serão apagadas)")) return;
      S.hiper.logs[hojeKey] = { d, sets: {}, done: false }; save(); render(); toast("Treino de hoje trocado.");
    } else if (t.hasAttribute("data-hx-concluir")) {
      const l = hxGarantirLog(hxDiaHoje() ?? hojeDia);
      l.done = !l.done; save(); render();
      if (l.done) toast(`Treino concluído! 🔥 ${sequencia()} ${sequencia() === 1 ? "dia" : "dias"} seguidos`);
    } else if (ds.hxAsk) openChat(`Como executar corretamente o ${ACI[ds.hxAsk]?.nome || ds.hxAsk}? Quais os erros comuns e que carga eu deveria usar hoje?`);
    else if (t.hasAttribute("data-hx-revisar")) hxRevisar();
    else if (t.hasAttribute("data-hx-checkin")) hxCheckin();
    else if (t.hasAttribute("data-hx-perguntar")) openChat("Como está minha evolução na academia? O que devo focar nos próximos treinos?");
    else if (t.hasAttribute("data-hx-refazer")) {
      if (!confirm("Refazer a entrevista? Seu treino atual continua até você montar o novo.")) return;
      hxIniciarChat(true);
    } else if (t.hasAttribute("data-hx-desfazer")) {
      if (!confirm("Voltar ao plano anterior à última revisão?")) return;
      S.hiper.plano = S.hiper.anterior; S.hiper.anterior = null; S.hiper.atualizado = Date.now();
      hxMsg("Voltamos ao plano anterior. Quando quiser, peça outra revisão.", "plano"); save(); render();
    }
  });
  document.addEventListener("submit", (ev) => {
    const f = ev.target;
    if (!f.matches("[data-hx-add]")) return;
    ev.preventDefault();
    const id = f.dataset.hxAdd, r = parseInt(f.elements.r.value, 10), kg = f.elements.kg ? Number(String(f.elements.kg.value).replace(",", ".")) || 0 : 0;
    if (!(r > 0 && r < 1000) || kg < 0 || kg > 999) { toast("Confira os números da série."); return; }
    const l = hxGarantirLog(hxDiaHoje() ?? hojeDia);
    (l.sets[id] = l.sets[id] || []).push({ ...(kg ? { kg: Math.round(kg * 10) / 10 } : {}), r });
    save(); hxRefazerCard(id);
    const t = hxDia(l.d), feitas = t ? t.exercicios.every((e) => (l.sets[e.id] || []).length >= e.series) : false;
    if (feitas && !l.done) toast("Todas as séries anotadas! Toque em Marcar como concluído. 💪", 3500);
  });


  /* Tela de um programa em vídeo (#/chave, #/chave/semana, #/chave/semana/dia) */
  function telaVideo(p, p1, p2) {
    setToolbar("plano");
    const P = VP[p], total = P.semanas.length;
    if (p2 !== undefined) return telaVideoDia(p, Number(p1), Number(p2));
    const atual = insSemanaDe(p, hoje);
    const w = p1 !== undefined && P.semanas[p1] ? Number(p1) : insSemana[p] ?? Math.min(Math.max(atual, 0), total - 1);
    insSemana[p] = w;
    const status = !S[p].inicio ? `<p class="note week-note">Escolha em qual semana você está para o app montar o calendário e mostrar o treino do dia na tela inicial.</p>`
      : atual >= total ? `<p class="note week-note"><b>Programa concluído! 🏆</b> Quer recomeçar? Escolha a semana abaixo.</p>`
      : atual < 0 ? `<p class="note week-note">Seu ${esc(P.nome)} começa na segunda, ${ddmm(S[p].inicio)}.</p>` : "";
    return `<section class="screen has-toolbar">
      <div class="banner" style="--grad: linear-gradient(238.09deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.8) 100%)">
        <div class="banner-bg"><img class="plano-img" src="${A(P.banner || "banner-home.jpg")}" alt=""></div>
        <span class="logo-txt">Fit.ai</span>
        <div class="plano-title"><span class="pill blue">${icon("goal.svg", 16)}${esc(P.selo || "")}</span><h1>${esc(P.nome)}</h1></div>
      </div>
      ${progSwitch(p)}
      <div class="week-tabs" role="tablist">
        ${P.semanas.map((s, i) => `<a role="tab" aria-selected="${i === w}" class="wtab${i === w ? " on" : ""}" href="#/${p}/${i}">
          <strong>Semana ${i + 1}${i === atual ? " •" : ""}</strong><span>${s.nome.split(" · ")[0]}</span></a>`).join("")}
      </div>
      ${status}
      <p class="note week-note">${P.nota}</p>
      <div class="list" style="padding-top:8px">${P.semanas[w].dias.map((_, d) => insCard(p, w, d)).join("")}</div>
      ${P.extra ? `<div class="section">
        <div class="sec-head"><h2>${esc(P.extraTitulo || "Extra")}</h2></div>
        ${insVideoCard(p, P.extra, null, false)}
        ${timerBox(p, hojeKey)}
      </div>` : ""}
      <div class="section">
        <div class="field">
          <span class="field-lbl">Em qual semana do ${esc(P.nome)} você está?</span>
          <div class="seg seg8" style="grid-template-columns:repeat(${total},1fr)">${P.semanas.map((_, i) => `<button class="${S[p].inicio && i === atual ? "on" : ""}" data-ins-semana="${i}" data-p="${p}">${i + 1}</button>`).join("")}</div>
        </div>
        ${S[p].inicio ? `<button class="btn btn-outline" id="ins-parar" data-p="${p}" style="margin-top:12px">Pausar ${esc(P.nome)}</button>` : ""}
      </div></section>`;
  }
  // Tela inicial: o treino de hoje do programa principal, quando ele é em vídeo
  const linkHojeVideo = (p) => { const h = insHoje(p); return h ? `#/${p}/${h.w}/${h.d}` : `#/${p}`; };
  function treinoHojeVideo(p) {
    const P = VP[p], h = insHoje(p), w = insSemanaDe(p, hoje);
    const head = `<div class="sec-head"><h2>Treino de Hoje</h2><a href="#/${p}${h ? `/${h.w}` : ""}">${esc(P.curto)}${h ? ` · Semana ${h.w + 1}` : ""}</a></div>`;
    if (h) return head + insCard(p, h.w, h.d);
    if (S[p].inicio && w < 0) return head + `<a class="emerg" href="#/${p}"><span>${icon("calendar-14.svg", 20)}</span><div><strong>Seu ${esc(P.nome)} começa na segunda, ${ddmm(S[p].inicio)}</strong><small>Toque para ver o calendário da semana 1</small></div></a>`;
    if (S[p].inicio) return head + `<a class="emerg" href="#/${p}"><span>${icon("flame.svg", 20)}</span><div><strong>${esc(P.nome)} concluído! 🏆</strong><small>Próximo passo do caminho: ${esc(proximoDe(p)?.nome || "repetir o programa")}</small></div></a>`;
    return head + `<a class="emerg" href="#/${p}"><span>${icon("flame.svg", 20)}</span><div><strong>${esc(P.nome)}</strong><small>Toque para escolher a semana e começar</small></div></a>`;
  }
  const proximoDe = (k) => { const i = TRILHA.findIndex((x) => x.k === k); return i >= 0 ? TRILHA[i + 1] || null : null; };
  // Tela inicial: o treino de hoje dos outros programas em vídeo em andamento (ou atalhos, se nenhum começou)
  function videoHome(excluir = null) {
    const ativos = VPROGS.filter((P) => S[P.k].inicio && P.k !== excluir);
    if (!ativos.length) return excluir ? "" : VPROGS.map((P) => `<a class="emerg" href="#/${P.k}"><span>${icon("flame.svg", 20)}</span><div><strong>${esc(P.nome)}</strong><small>${esc(P.resumo || "Programa em vídeo · toque para começar")}</small></div></a>`).join("");
    return ativos.map((P) => {
      const h = insHoje(P.k);
      return h ? `<div class="sec-head" style="margin-top:8px"><h2>${esc(P.nome)}</h2><a href="#/${P.k}/${h.w}">Semana ${h.w + 1} · ${P.semanas[h.w].nome.split(" · ")[0]}</a></div>${insCard(P.k, h.w, h.d)}` : "";
    }).join("");
  }
  function telaVideoDia(p, w, d) {
    const P = VP[p], t = insDia(p, w, d);
    if (!t || !t.ids.length) return telaVideo(p, String(w));
    const k = S[p].inicio ? insData(p, w, d) : null;
    const editavel = !!k && k <= hojeKey;
    const alt = t.ids.map((id) => insAlt(p, w, id)).filter(Boolean);
    const quando = k ? (k === hojeKey ? "Hoje" : ddmm(k)) : "";
    return `<section class="screen has-toolbar"><div class="list" style="gap:20px">
      <div class="page-head">
        <a class="icon-btn" href="#/${p}/${w}" aria-label="Voltar">${icon("chevron-left.svg", 24)}</a>
        <h1>${k === hojeKey ? `${esc(P.curto)} de hoje` : `Semana ${w + 1} · ${DIAS[d]}`}</h1><span class="spacer"></span></div>
      ${insCard(p, w, d, { link: false })}
      ${timerBox(p, editavel ? k : hojeKey)}
      <div class="note-box"><p>${P.nota}</p>${quando && !editavel ? `<p>Este treino está marcado para <b>${quando}</b>. Se fizer agora, conta como treino de hoje.</p>` : ""}${!k ? `<p>Escolha sua semana na tela do ${esc(P.nome)} para seguir o calendário. Dá para fazer os vídeos mesmo assim: contam como treino de hoje.</p>` : ""}</div>
      <div class="ex-list">
        ${t.ids.map((id, i) => insVideoCard(p, id, k, editavel, t.ids.length > 1 ? (i ? "Depois" : "Principal") : "")).join("")}
        ${alt.map((id) => insVideoCard(p, id, k, editavel, "Alternativa")).join("")}
      </div>
      ${insFeito(p, editavel ? k : hojeKey) ? `<p class="note" style="text-align:center">Treino concluído! 🔥</p>` : ""}
      </div></section>`;
  }

  /* Mapa de consistência: últimas 15 semanas (seg→dom) */
  function heatmap() {
    const ini = addDays(mondayOf(hoje), -14 * 7);
    const cols = Array.from({ length: 15 }, (_, i) => addDays(ini, i * 7));
    const segs = [];
    cols.forEach((c, i) => { if (!i || c.getMonth() !== cols[i - 1].getMonth()) segs.push({ i, m: c.getMonth() }); });
    const labels = segs.map((s, j) => {
      const fim = j + 1 < segs.length ? segs[j + 1].i : 15;
      return fim - s.i >= 2 ? `<span class="mlabel" style="grid-column:${s.i + 1}/${fim + 1}">${MESES[s.m]}</span>` : "";
    }).join("");
    const html = cols.map((c, i) => `<div class="col" style="grid-column:${i + 1}">${Array.from({ length: 7 }, (_, r) => {
      const d = addDays(c, r), k = keyOf(d);
      let cl = feito(k) ? "b" : parcial(k) ? "l" : "";
      if (k === hojeKey) cl += " today";
      else if (d > hoje) cl += " f";
      return `<span class="sq ${cl}" title="${ddmm(k)}"></span>`;
    }).join("")}</div>`).join("");
    return `<div class="heat" role="img" aria-label="Mapa de treinos das últimas 15 semanas">${labels}${html}</div>`;
  }

  /* Gráfico de progresso */
  let evoEx = null;
  function progresso() {
    const comHist = TODOS_EX.filter((e) => historico(e.id).length);
    if (!comHist.length) return `<p class="note">Registre as repetições de cada série no treino de hoje. Aqui você vai ver sua evolução semana a semana em cada exercício. 💪</p>`;
    if (!evoEx || !comHist.some((e) => e.id === evoEx)) evoEx = comHist[0].id;
    const ex = TODOS_EX.find((e) => e.id === evoEx);
    const h = historico(evoEx).slice(-8);
    const tiro = ex.un === "tiro";
    const val = (x) => (tiro ? x.best : x.total);
    const max = Math.max(...h.map(val), tiro ? 0 : ex.meta);
    const W = 313, H = 150, top = 22, base = H - 22, bw = Math.min(28, (W / h.length) * 0.55);
    const step = W / h.length;
    const yMeta = base - (ex.meta / max) * (base - top);
    const bars = h.map((x, i) => {
      const bh = Math.max(3, (val(x) / max) * (base - top));
      const cx = step * i + step / 2;
      return `<rect x="${cx - bw / 2}" y="${base - bh}" width="${bw}" height="${bh}" rx="6" fill="${i === h.length - 1 ? "#2b54ff" : "#d5dffe"}"/>
        <text x="${cx}" y="${base - bh - 6}" text-anchor="middle" class="cv">${val(x)}${UN[ex.un]}</text>
        <text x="${cx}" y="${H - 4}" text-anchor="middle" class="cd">${ddmm(x.k)}</text>`;
    }).join("");
    const primeiro = val(h[0]), ultimo = val(h[h.length - 1]);
    const evo = primeiro ? Math.round(((tiro ? primeiro - ultimo : ultimo - primeiro) / primeiro) * 100) : 0;
    return `<div class="chips evo-chips">${comHist.map((e) => `<button class="chip${e.id === evoEx ? " primary" : ""}" data-evo="${e.id}">${esc(e.nome)}</button>`).join("")}</div>
      <div class="chart">
        <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${tiro ? "Melhor tempo de tiro" : "Total"} de ${esc(ex.nome)} por treino">
          ${tiro ? "" : `<line x1="0" x2="${W}" y1="${yMeta}" y2="${yMeta}" stroke="#2b54ff" stroke-width="1" stroke-dasharray="4 4" opacity=".5"/>
          <text x="${W}" y="${yMeta - 5}" text-anchor="end" class="cm">meta ${ex.meta}${UN[ex.un]}</text>`}
          ${bars}
        </svg>
      </div>
      <div class="stats-row">
        ${stat("zap.svg", recorde(evoEx) + UN[ex.un], tiro ? "Melhor tiro" : "Melhor série")}
        ${tiro ? stat("circle-check.svg", historico(evoEx).reduce((a, x) => a + S.logs[x.k].sets[evoEx].length, 0), "Tiros feitos") : stat("circle-check.svg", Math.max(...historico(evoEx).map((x) => x.total)) + UN[ex.un], "Melhor total")}
        ${stat("circle-percent.svg", (evo > 0 ? "+" : "") + evo + "%", "Evolução")}
      </div>`;
  }

  /* ---------- Timer ---------- */
  const timer = { ativo: false, seg: 0, id: null };
  const fmt = (s) => `${pad(Math.floor(s / 60))}:${pad(s % 60)}`;
  const relogio = () => (ativoHoje().w === "E" ? fmt(Math.max(0, 900 - timer.seg)) : fmt(timer.seg));
  function toggleTimer() {
    if (timer.ativo) { clearInterval(timer.id); timer.ativo = false; return "Continuar"; }
    timer.ativo = true;
    timer.id = setInterval(() => {
      timer.seg++;
      const b = $("#iniciar"); if (b) b.textContent = relogio();
      if (ativoHoje().w === "E" && timer.seg >= 900) {
        clearInterval(timer.id); timer.ativo = false;
        if (navigator.vibrate) navigator.vibrate([300, 150, 300]);
        toast("15 minutos! Missão cumprida. 🔥");
      }
    }, 1000);
    if (!timer.seg) toast(ativoHoje().w === "E" ? "15 minutos valendo! 💪" : "Treino iniciado. Bora! 💪");
    return relogio();
  }

  /* ---------- Registro ---------- */
  function garantirLog() {
    if (!S.logs[hojeKey]) { const { w, d } = ativoHoje(); S.logs[hojeKey] = { w, d, sets: {}, dur: 0, done: false }; }
    return S.logs[hojeKey];
  }
  function refazerCard(id) {
    const { w, d } = ativoHoje();
    const e = treino(w, d).ex.find((x) => x.id === id);
    const el = document.querySelector(`.ex[data-ex="${id}"]`);
    if (!el || !e) return;
    const foco = document.activeElement && el.contains(document.activeElement);
    el.outerHTML = exCard(e, true);
    if (foco) document.querySelector(`.ex[data-ex="${id}"] input`)?.focus({ preventScroll: true });
  }

  document.addEventListener("submit", async (ev) => {
    if (ev.target.id !== "form-desafio") return;
    ev.preventDefault();
    const d = Object.fromEntries(new FormData(ev.target));
    const titulo = String(d.titulo || "").trim().slice(0, 80), link = String(d.link || "").trim();
    if (!titulo) { toast("Dê um título ao desafio."); return; }
    if (link && !/^https:\/\//i.test(link)) { toast("O link precisa começar com https://"); return; }
    const btn = ev.target.querySelector("button[type=submit]"); btn.disabled = true;
    const { error } = await sb.from("desafios").insert({ grupo_id: G.sel, semana: semanaAtual(), titulo, descricao: String(d.descricao || "").trim().slice(0, 500), link: link || null, medida: MEDIDAS[d.medida] ? d.medida : "feito", criado_por: uid });
    btn.disabled = false;
    if (error) { toast(/duplicate|unique/i.test(error.message) ? "Alguém já lançou o desafio desta semana." : "Não consegui lançar o desafio."); formDesafio = null; carregarGrupos(true); return; }
    formDesafio = null; await carregarGrupos(true);
    toast("Desafio lançado! Avise a galera. ⚔️");
  });
  document.addEventListener("submit", (ev) => {
    const mx = ev.target.closest(".ins-max");
    if (mx) { ev.preventDefault(); salvarMaxOut(mx); return; }
    const ft = ev.target.closest(".fit-test");
    if (ft) { ev.preventDefault(); salvarFitTest(ft); return; }
    const f = ev.target.closest(".add-set[data-add]");
    if (!f) return;
    ev.preventDefault();
    const n = parseInt(f.querySelector("input").value, 10);
    if (!(n > 0 && n < 1000)) { toast("Digite um número de repetições."); return; }
    const l = garantirLog();
    const antes = historico(f.dataset.add).filter((h) => h.k < hojeKey).map((h) => h.best);
    const recAntes = antes.length ? (menorMelhor(f.dataset.add) ? Math.min(...antes) : Math.max(...antes)) : 0;
    (l.sets[f.dataset.add] = l.sets[f.dataset.add] || []).push(n);
    save();
    const id = f.dataset.add;
    const e = TODOS_EX.find((x) => x.id === id);
    const tot = e.un === "tiro" ? l.sets[id].length : soma(l.sets[id]);
    if (tot >= e.meta && tot - n < e.meta) toast(`${e.nome}: meta batida! ✅`);
    else if (recAntes > 0 && (menorMelhor(id) ? n < recAntes : n > recAntes)) toast(`Novo recorde em ${e.nome}: ${n}${UN[e.un]}! 🏆`);
    refazerCard(id);
  });

  /* Vídeos do Insanity: vêm de /api/videos para quem está logado (interativo = avisa se der erro) */
  let souDono = false; // o servidor diz se a conta é a do dono (ALLOWED_EMAIL)
  const veCorridas = () => !uid || souDono; // as corridas do Strava são do dono; visitante vê como demonstração
  // idVideo: o vídeo cujo botão foi tocado (para explicar por que ele não veio)
  async function carregarVideos(interativo = false, idVideo = null) {
    if ((!interativo && Object.keys(INS_VID).length) || !uid || location.protocol === "file:") return false;
    const token = await tokenSB();
    if (!token) return false;
    try {
      const r = await fetch("/api/videos", { headers: { authorization: `Bearer ${token}` } });
      if (!r.ok) {
        const e = await r.json().catch(() => ({}));
        if (interativo) toast(r.status === 401 ? "Entre de novo na sua conta para ver os vídeos." : e.variaveis ? `Configuração dos vídeos com erro: ${e.variaveis.join(", ")}` : `Não consegui carregar os vídeos agora (erro ${r.status}).`);
        return false;
      }
      const dados = await r.json();
      Object.assign(INS_VID, dados.videos || {});
      souDono = !!dados.dono;
      if (VP[location.hash.split("/")[1]]) render();
      if (idVideo && !INS_VID[idVideo]) {
        // O vídeo pedido não veio: diz o que o servidor encontrou, para achar o erro na configuração
        const P = VPROGS.find((x) => x.videos.some((v) => v.id === idVideo));
        const esperado = P && P.k !== "insanity" ? `FITAI_VIDEOS_${P.k === "insanity60" ? "INSANITY" : P.k.toUpperCase()}` : "FITAI_INSANITY_VIDEOS";
        const lidas = Object.entries(dados.fontes || {}).map(([n, q]) => `${n} (${q} vídeos)`).join(", ") || "nenhuma";
        const erro = (dados.variaveis_com_erro || []).length ? ` Com erro: ${dados.variaveis_com_erro.join(", ")}.` : "";
        toast(`Esse vídeo não está na configuração. O servidor precisa de ${esperado}. Variáveis lidas: ${lidas}.${erro}`, 9000);
        return false;
      }
      return true;
    } catch { if (interativo) toast("Não consegui carregar os vídeos agora."); return false; }
  }

  /* Player dos vídeos dentro do app (pré-visualização do Google Drive; o arquivo precisa estar
     compartilhado como "qualquer pessoa com o link") */
  function abrirVideo(id) {
    const v = INSV[id], drive = INS_VID[id];
    if (!v || !drive) return;
    let dlg = document.getElementById("video-dlg");
    if (!dlg) {
      dlg = document.createElement("dialog");
      dlg.id = "video-dlg"; dlg.className = "video-dlg";
      dlg.addEventListener("close", () => { dlg.innerHTML = ""; }); // para o vídeo ao fechar
      dlg.addEventListener("click", (e) => { if (e.target === dlg || e.target.closest("[data-video-fechar]")) dlg.close(); });
      $(".device").appendChild(dlg);
    }
    dlg.setAttribute("aria-label", v.nome);
    dlg.innerHTML = `<div class="video-box">
        <div class="video-head"><strong>${esc(v.nome)}</strong><button class="video-x" data-video-fechar aria-label="Fechar vídeo">✕</button></div>
        <div class="video-frame"><iframe src="${driveUrl(id, "preview")}" title="${esc(v.nome)}" allow="autoplay; fullscreen"></iframe></div>
        <a class="video-alt" href="${driveUrl(id, "view")}" target="_blank" rel="noopener">Não carregou? Abrir no Google Drive</a>
      </div>`;
    dlg.showModal();
  }

  /* ---------- Cronômetro dos treinos em vídeo ----------
     Fica salvo (S.vtimer = { p, k, ini }) para sobreviver a recarregar a página ou bloquear o celular.
     Ao pausar, o tempo soma em log.dur. Esse tempo vai para o Supabase e entra no ranking "Tempo" do grupo. */
  const vtDecorrido = () => (S.vtimer ? Math.max(0, Math.round((Date.now() - S.vtimer.ini) / 1000)) : 0);
  const vtAtivo = (p, k) => !!(S.vtimer && S.vtimer.p === p && S.vtimer.k === k);
  const vtTotal = (p, k) => (S[p].logs[k]?.dur || 0) + (vtAtivo(p, k) ? vtDecorrido() : 0);
  const fmtCrono = (s) => (s >= 3600 ? `${Math.floor(s / 3600)}:` : "") + `${pad(Math.floor((s % 3600) / 60))}:${pad(s % 60)}`;
  function timerBox(p, k) {
    const on = vtAtivo(p, k), tot = vtTotal(p, k);
    return `<div class="vtimer${on ? " on" : ""}" data-vt-p="${p}" data-vt-k="${k}">
      <div class="vt-info"><span class="vt-lbl">Cronômetro${k !== hojeKey ? ` · ${ddmm(k)}` : ""}</span><strong class="vt-val">${fmtCrono(tot)}</strong></div>
      <div class="vt-btns">
        ${tot && !on ? `<button class="btn btn-outline vt-edit" data-vt-edit>Ajustar</button>` : ""}
        <button class="btn btn-blue" data-vt-toggle>${on ? "Pausar" : tot ? "Continuar" : "Iniciar"}</button>
      </div></div>`;
  }
  function vtParar() {
    if (!S.vtimer) return;
    const { p, k } = S.vtimer, seg = vtDecorrido();
    S.vtimer = null;
    if (VP[p] && seg > 0) { const l = insLogDe(p, k); l.dur = Math.min(6 * 3600, (l.dur || 0) + seg); }
  }
  let vtInterval = null;
  function vtTick() {
    clearInterval(vtInterval);
    if (!S.vtimer) return;
    vtInterval = setInterval(() => {
      if (!S.vtimer) return clearInterval(vtInterval);
      document.querySelectorAll(`.vtimer[data-vt-p="${S.vtimer.p}"][data-vt-k="${S.vtimer.k}"] .vt-val`).forEach((el) => (el.textContent = fmtCrono(vtTotal(S.vtimer.p, S.vtimer.k))));
    }, 1000);
  }
  function vtAlternar(box) {
    const p = box.dataset.vtP, k = box.dataset.vtK;
    if (vtAtivo(p, k)) { vtParar(); save(); toast(insFeito(p, k) ? "Cronômetro pausado ✓" : "Cronômetro pausado. Marque os vídeos como feitos para o tempo contar no ranking."); }
    else { vtParar(); S.vtimer = { p, k, ini: Date.now() }; save(); toast("Cronômetro valendo! 💪"); }
    box.outerHTML = timerBox(p, k);
    vtTick();
  }
  function vtAjustar(box) {
    const p = box.dataset.vtP, k = box.dataset.vtK, l = insLogDe(p, k);
    const r = prompt("Tempo de treino em minutos:", String(Math.round((l.dur || 0) / 60)));
    if (r === null) return;
    const min = Math.round(Number(String(r).replace(",", ".")));
    if (!Number.isFinite(min) || min < 0 || min > 360) { toast("Digite os minutos (0 a 360)."); return; }
    l.dur = min * 60; save(); box.outerHTML = timerBox(p, k);
  }

  /* ---------- Registro dos programas em vídeo ---------- */
  function insLogDe(p, k) {
    if (!S[p].logs[k]) {
      const n = S[p].inicio ? diffDays(parseKey(S[p].inicio), parseKey(k)) : -1;
      S[p].logs[k] = n >= 0 ? { w: Math.floor(n / 7), d: n % 7, feitos: [], max: {} } : { w: -1, d: -1, feitos: [], max: {} };
    }
    return S[p].logs[k];
  }
  function insRefazer(p, id) {
    const el = document.querySelector(`.ex.ins[data-ins="${id}"]`);
    if (!el) return render();
    const rot = el.querySelector(".ins-rot")?.textContent || "";
    el.outerHTML = insVideoCard(p, id, el.dataset.kc || null, el.dataset.ed === "1", rot);
  }
  function salvarMaxOut(f) {
    const p = f.dataset.p, id = f.dataset.max, k = f.dataset.k;
    const txt = f.querySelector("input").value, seg = segDe(txt);
    const l = insLogDe(p, k), era = insFeito(p, k);
    if (!txt.trim()) { delete l.max[id]; save(); insRefazer(p, id); return; }
    if (seg === null || seg > 60 * 60) { toast("Digite o tempo como mm:ss (ex.: 12:30)."); return; }
    const antes = insMaxHist(p, id).filter((h) => h.k !== k).map((h) => h.seg);
    l.max[id] = seg;
    marcarVideo(p, l, id);
    save(); insRefazer(p, id);
    if (antes.length && seg > Math.max(...antes)) toast(`Novo recorde de Max Out em ${INSV[id].nome}: ${mmss(seg)}! 🏆`);
    else toast("Max Out salvo ✓");
    if (insFeito(p, k) !== era) render();
  }
  // Marca o vídeo como feito: no calendário, se ele é do dia; senão, como avulso
  function marcarVideo(p, l, id) {
    const t = insDia(p, l.w, l.d), doDia = t && (t.ids.includes(id) || t.ids.some((x) => insAlt(p, l.w, x) === id));
    const arr = doDia ? l.feitos : (l.avulso = l.avulso || []);
    if (!arr.includes(id)) arr.push(id);
  }
  function salvarFitTest(f) {
    const p = f.dataset.p, id = f.dataset.fit, k = f.dataset.k;
    const l = insLogDe(p, k), era = insFeito(p, k);
    const fit = VP[p].fitTest.map((_, i) => { const v = f.elements[`m${i}`].value.trim(); const n = Math.round(Number(v)); return v !== "" && Number.isFinite(n) && n >= 0 && n < 1000 ? n : null; });
    if (!fit.some((n) => n !== null)) { delete l.fit; save(); insRefazer(p, id); toast("Fit Test apagado."); return; }
    const ant = fitHist(p).filter((h) => h.k < k).pop();
    l.fit = fit;
    marcarVideo(p, l, id);
    save(); insRefazer(p, id);
    const tot = soma(fit.map((n) => n || 0)), dif = ant ? tot - soma(ant.fit.map((n) => n || 0)) : 0;
    toast(ant ? `Fit Test salvo ✓ ${tot} reps (${dif >= 0 ? "+" : ""}${dif} desde o último)` : `Fit Test salvo ✓ ${tot} reps no total`);
    if (insFeito(p, k) !== era) render();
  }
  // Evolução: tabela com os meus Fit Tests (linhas = movimentos, colunas = testes)
  const tabelaFitTest = (p) => tabelaFit(fitTests(linhasLocais()).filter((x) => x.p === p), VP[p].fitTest);


  /* ==========================================================
     Comunidade (Supabase): sincronização, métricas, medalhas, grupos, foto
     ========================================================== */

  /* Cada dia de treino vira uma linha: { data, programa, titulo, concluido, minutos, detalhes } */
  // Minutos da calistenia: o cronômetro, quando usado; sem ele, 3 min por série registrada (estimativa).
  const minCalistenia = (l) => (l.dur ? Math.round(l.dur / 60) : Math.min(120, 3 * soma(Object.values(l.sets || {}).map((s) => s.length))));
  function linhasLocais() {
    const out = [];
    for (const [k, l] of Object.entries(S.logs)) {
      const t = treino(l.w, l.d);
      out.push({ data: k, programa: "calistenia", titulo: (t ? t.titulo : "Treino").slice(0, 120), concluido: !!l.done, minutos: Math.min(600, minCalistenia(l)),
        detalhes: { w: l.w, d: l.d, sets: l.sets || {}, dur: l.dur || 0, done: !!l.done } });
    }
    for (const p of VKEYS) for (const [k, l] of Object.entries(S[p].logs)) {
      const t = insDia(p, l.w, l.d), av = (l.avulso || []).map((id) => INSV[id]?.nome || id);
      const titulo = t && t.ids.length && l.feitos.length ? t.titulo + (av.length ? ` + ${av.join(" + ")}` : "") : av.length ? av.join(" + ") : t ? t.titulo : VP[p].nome;
      out.push({ data: k, programa: p, titulo: titulo.slice(0, 120), concluido: insFeito(p, k), minutos: Math.min(600, minVideo(l)),
        detalhes: { w: l.w, d: l.d, feitos: l.feitos, max: l.max || {}, ...(l.avulso?.length ? { avulso: l.avulso } : {}), ...(l.dur ? { dur: l.dur } : {}), ...(l.fit ? { fit: l.fit } : {}) } });
    }
    for (const [k, l] of Object.entries(S.hiper.logs)) {
      const t = hxDia(l.d);
      out.push({ data: k, programa: "hiper", titulo: (t ? t.titulo : "Academia").slice(0, 120), concluido: !!l.done, minutos: Math.min(600, hxMin(l)),
        detalhes: { d: l.d, sets: l.sets || {}, done: !!l.done } });
    }
    return out;
  }

  /* ---------- Sincronização com o Supabase ---------- */
  const SYNC_KEY = "fitai-sync-v1";
  let enviados = (() => { try { return JSON.parse(localStorage.getItem(SYNC_KEY) || "{}"); } catch { return {}; } })();
  const guardarEnviados = () => { try { localStorage.setItem(SYNC_KEY, JSON.stringify(enviados)); } catch {} };
  let syncTimer = null, sincronizando = false, deNovo = false;
  function agendarSync() {
    clearTimeout(syncTimer);
    syncTimer = setTimeout(() => { verificarConquistas(); if (uid) sincronizar(); }, 1200);
  }
  async function sincronizar() {
    if (!uid || !sb) return;
    if (sincronizando) { deNovo = true; return; }
    sincronizando = true;
    try {
      const chave = (r) => `${uid}|${r.data}|${r.programa}`;
      const linhas = linhasLocais().filter((r) => enviados[chave(r)] !== JSON.stringify(r));
      if (linhas.length) {
        const agora = new Date().toISOString();
        const { error } = await sb.from("treinos").upsert(linhas.map((r) => ({ ...r, usuario_id: uid, atualizado_em: agora })));
        if (!error) { linhas.forEach((r) => (enviados[chave(r)] = JSON.stringify(r))); guardarEnviados(); G.carregadoEm = 0; }
      }
      const hx = hxDados();
      if (hx && enviados[`${uid}|hiper`] !== JSON.stringify(hx)) {
        const { error } = await sb.from("hiper").upsert({ usuario_id: uid, dados: hx, atualizado_em: new Date().toISOString() });
        if (!error) { enviados[`${uid}|hiper`] = JSON.stringify(hx); guardarEnviados(); }
      }
      const cfg = { inicio: S.inicio, ...Object.fromEntries(VKEYS.map((p) => [p, S[p].inicio])), principal: S.principal || null, nivel: S.nivel || null };
      if (enviados[`${uid}|cfg`] !== JSON.stringify(cfg)) {
        const { error } = await sb.from("perfis").update({ config: cfg }).eq("id", uid);
        if (!error) { enviados[`${uid}|cfg`] = JSON.stringify(cfg); guardarEnviados(); }
      }
    } catch {} finally {
      sincronizando = false;
      if (deNovo) { deNovo = false; sincronizar(); }
    }
  }
  // Ao entrar: traz os treinos da conta que ainda não estão neste aparelho
  async function puxarTreinos() {
    if (!uid || !sb) return;
    const { data, error } = await sb.from("treinos").select("data, programa, detalhes").eq("usuario_id", uid);
    if (error || !data) return;
    let mudou = false;
    for (const r of data) {
      const d = r.detalhes || {};
      if (!/^\d{4}-\d{2}-\d{2}$/.test(r.data)) continue;
      if (r.programa === "calistenia" && !S.logs[r.data]) {
        S.logs[r.data] = { w: d.w === "E" ? "E" : Number(d.w) || 0, d: Number(d.d) || 0, sets: d.sets && typeof d.sets === "object" ? d.sets : {}, dur: Number(d.dur) || 0, done: !!d.done }; mudou = true;
      }
      if (r.programa === "hiper" && !S.hiper.logs[r.data]) {
        const sets = {};
        for (const [id, v] of Object.entries(d.sets && typeof d.sets === "object" ? d.sets : {})) if (Array.isArray(v)) sets[id] = v.filter((x) => x && Number(x.r) > 0).map((x) => ({ ...(Number(x.kg) > 0 ? { kg: Number(x.kg) } : {}), r: Number(x.r) }));
        S.hiper.logs[r.data] = { d: Number(d.d) || 0, sets, done: !!d.done }; mudou = true;
      }
      if (VP[r.programa] && !S[r.programa].logs[r.data]) {
        S[r.programa].logs[r.data] = { w: Number(d.w) || 0, d: Number(d.d) || 0, feitos: Array.isArray(d.feitos) ? d.feitos.filter((x) => INSV[x]) : [], max: d.max && typeof d.max === "object" ? d.max : {},
          ...(Array.isArray(d.fit) ? { fit: d.fit.map((n) => (Number.isFinite(n) ? n : null)) } : {}),
          ...(Array.isArray(d.avulso) ? { avulso: d.avulso.filter((x) => INSV[x]) } : {}), ...(Number(d.dur) > 0 ? { dur: Number(d.dur) } : {}) }; mudou = true;
      }
    }
    // Plano da academia: traz da conta se este aparelho não tem plano ou tem um mais antigo
    try {
      const { data: hx } = await sb.from("hiper").select("dados").eq("usuario_id", uid).maybeSingle();
      const r = hx?.dados;
      if (r && (r.plano || r.etapa) && (!S.hiper.plano || (r.atualizado || 0) > (S.hiper.atualizado || 0))) {
        Object.assign(S.hiper, { perfil: r.perfil || {}, etapa: r.etapa || 0, plano: r.plano || null, inicio: r.inicio || null, checkins: r.checkins || [], msgs: r.msgs || [], atualizado: r.atualizado || 0 });
        mudou = true;
      }
      if (r) enviados[`${uid}|hiper`] = JSON.stringify(hxDados());
    } catch {}
    if (mudou) { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch {} }
    const naConta = new Set(data.map((r) => `${r.data}|${r.programa}`));
    linhasLocais().filter((r) => naConta.has(`${r.data}|${r.programa}`)).forEach((r) => (enviados[`${uid}|${r.data}|${r.programa}`] = JSON.stringify(r)));
    guardarEnviados();
  }

  /* ---------- Métricas (servem para mim e para cada pessoa do grupo) ---------- */
  const feitas = (rows) => rows.filter((r) => r.concluido);
  function sequencias(rows) {
    const dias = new Set(feitas(rows).map((r) => r.data));
    let d = dias.has(hojeKey) ? hoje : addDays(hoje, -1), atual = 0;
    while (dias.has(keyOf(d))) { atual++; d = addDays(d, -1); }
    let melhor = 0, run = 0, prev = null;
    for (const k of [...dias].sort()) { run = prev && diffDays(parseKey(prev), parseKey(k)) === 1 ? run + 1 : 1; melhor = Math.max(melhor, run); prev = k; }
    return { atual, melhor };
  }
  const maxOuts = (rows) => rows.filter((r) => VP[r.programa]?.maxOut)
    .flatMap((r) => Object.entries(r.detalhes?.max || {}).map(([v, s]) => ({ k: r.data, v, s: Number(s) || 0 }))).filter((m) => m.s > 0 && INSV[m.v]);
  // Fit Tests das linhas (Insanity): [{ k, p, fit, total }] em ordem de data
  const fitTests = (rows) => rows.filter((r) => VP[r.programa]?.fitTest && Array.isArray(r.detalhes?.fit) && r.detalhes.fit.some((n) => n > 0))
    .map((r) => ({ k: r.data, p: r.programa, fit: r.detalhes.fit, total: soma(r.detalhes.fit.map((n) => Number(n) || 0)) })).sort((a, b) => a.k.localeCompare(b.k));
  // Melhor Max Out por vídeo: [{ v, best, ultimo, n }]
  function melhoresMax(rows) {
    const por = {};
    maxOuts(rows).sort((a, b) => a.k.localeCompare(b.k)).forEach((m) => { const x = (por[m.v] = por[m.v] || { v: m.v, best: 0, ultimo: 0, n: 0 }); x.best = Math.max(x.best, m.s); x.ultimo = m.s; x.n++; });
    return Object.values(por).sort((a, b) => b.best - a.best);
  }
  function tabelaFit(lista, mov) {
    const h = lista.slice(-5), tot = (f) => soma(f.map((n) => Number(n) || 0));
    return `<div class="fit-tab-wrap"><table class="fit-tab">
      <thead><tr><th>Movimento</th>${h.map((x, i) => `<th>${i + 1}º<small>${ddmm(x.k)}</small></th>`).join("")}</tr></thead>
      <tbody>${mov.map((m, i) => `<tr><td>${esc(m)}</td>${h.map((x) => `<td>${x.fit[i] ?? "—"}</td>`).join("")}</tr>`).join("")}
      <tr class="tot"><td>Total</td>${h.map((x) => `<td>${tot(x.fit)}</td>`).join("")}</tr></tbody></table></div>
      ${h.length > 1 ? `<p class="note small">Do 1º ao último teste: ${tot(h[h.length - 1].fit) - tot(h[0].fit) >= 0 ? "+" : ""}${tot(h[h.length - 1].fit) - tot(h[0].fit)} repetições no total.</p>` : ""}`;
  }
  // Bloco "Recordes": Max Out (melhor por vídeo) e Fit Test. Usado no meu perfil e no perfil de quem está no grupo.
  function recordesHtml(rows, vazio) {
    const mb = melhoresMax(rows), ft = fitTests(rows);
    if (!mb.length && !ft.length) return `<p class="note">${vazio}</p>`;
    const max = mb.length ? `<div class="sec-head" style="margin-top:4px"><h2>Max Out</h2><span>${mb.length} ${mb.length === 1 ? "vídeo" : "vídeos"}</span></div>
      <ul class="rec-list">${mb.map((x) => `<li><span>${esc(INSV[x.v].nome)}<small>${x.n} ${x.n === 1 ? "registro" : "registros"} · último ${mmss(x.ultimo)}</small></span><strong>${icon("zap.svg")}${mmss(x.best)}</strong></li>`).join("")}</ul>` : "";
    const fit = VPROGS.filter((P) => P.fitTest).map((P) => { const l = ft.filter((x) => x.p === P.k); return l.length ? `<div class="sec-head" style="margin-top:12px"><h2>Fit Test · ${esc(P.nome)}</h2><span>${l[l.length - 1].total} reps</span></div>${tabelaFit(l, P.fitTest)}` : ""; }).join("");
    return max + fit;
  }
  function kpis(rows) {
    const f = feitas(rows), mx = maxOuts(rows);
    const ft = fitTests(rows);
    return { treinos: f.length, minutos: soma(f.map((r) => r.minutos || 0)), dias: new Set(f.map((r) => r.data)).size, maxMedio: mx.length ? Math.round(soma(mx.map((m) => m.s)) / mx.length) : 0, maxouts: mx.length,
      fit: ft.length ? ft[ft.length - 1].total : 0, fitEvo: ft.length > 1 ? ft[ft.length - 1].total - ft[0].total : 0, fits: ft.length };
  }
  const PERIODOS = {
    semana: ["Semana", () => keyOf(mondayOf(hoje))],
    mes: ["Mês", () => keyOf(new Date(hoje.getFullYear(), hoje.getMonth(), 1))],
    tudo: ["12 semanas", () => keyOf(addDays(mondayOf(hoje), -7 * 11))],
  };
  const noPeriodo = (rows, p) => { const ini = PERIODOS[p][1](); return rows.filter((r) => r.data >= ini && r.data <= hojeKey); };
  function porSemana(rows, n = 8, campo = "treinos") {
    const seg = mondayOf(hoje), f = feitas(rows);
    return Array.from({ length: n }, (_, i) => {
      const ini = addDays(seg, -(n - 1 - i) * 7), a = keyOf(ini), b = keyOf(addDays(ini, 6));
      const s = f.filter((r) => r.data >= a && r.data <= b);
      return { k: a, v: campo === "minutos" ? soma(s.map((r) => r.minutos || 0)) : s.length };
    });
  }
  const fmtMin = (m) => (m >= 60 ? `${Math.floor(m / 60)}h${pad(m % 60)}` : `${m}min`);

  /* Gráfico de barras simples (SVG) */
  function barras(serie, { fmt = (v) => v, rotulo = (x) => ddmm(x.k), meta = 0, aria = "Gráfico" } = {}) {
    const W = 313, H = 150, top = 22, base = H - 22;
    const max = Math.max(1, meta, ...serie.map((x) => x.v));
    const step = W / serie.length, bw = Math.min(28, step * 0.55);
    const bars = serie.map((x, i) => {
      const bh = x.v ? Math.max(3, (x.v / max) * (base - top)) : 2, cx = step * i + step / 2;
      return `<rect x="${cx - bw / 2}" y="${base - bh}" width="${bw}" height="${bh}" rx="6" fill="${i === serie.length - 1 ? "#2b54ff" : "#d5dffe"}"/>
        ${x.v ? `<text x="${cx}" y="${base - bh - 6}" text-anchor="middle" class="cv">${fmt(x.v)}</text>` : ""}
        <text x="${cx}" y="${H - 4}" text-anchor="middle" class="cd">${esc(rotulo(x))}</text>`;
    }).join("");
    const yMeta = base - (meta / max) * (base - top);
    return `<div class="chart"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(aria)}">
      ${meta ? `<line x1="0" x2="${W}" y1="${yMeta}" y2="${yMeta}" stroke="#2b54ff" stroke-width="1" stroke-dasharray="4 4" opacity=".5"/><text x="${W}" y="${yMeta - 5}" text-anchor="end" class="cm">meta ${meta}</text>` : ""}
      ${bars}</svg></div>`;
  }

  /* ---------- Medalhas pessoais ---------- */
  function metricasConquista(rows) {
    const f = feitas(rows), mx = maxOuts(rows).sort((a, b) => a.k.localeCompare(b.k));
    const semanas = {};
    f.forEach((r) => { const s = keyOf(mondayOf(parseKey(r.data))); semanas[s] = (semanas[s] || 0) + 1; });
    let recordes = 0; const best = {};
    mx.forEach((m) => { if (best[m.v] && m.s > best[m.v]) recordes++; best[m.v] = Math.max(best[m.v] || 0, m.s); });
    return { treinos: f.length, melhor: sequencias(rows).melhor, horas: Math.floor(soma(f.map((r) => r.minutos || 0)) / 60),
      melhorSemana: Math.max(0, ...Object.values(semanas)), maxouts: mx.length, recordes,
      insanity: f.filter((r) => VP[r.programa]).length, grupos: (G.grupos || []).length, fits: fitTests(rows).length,
      fitEvo: (() => { const ft = fitTests(rows); return ft.length > 1 ? ft[ft.length - 1].total - ft[0].total : 0; })(), desafios: G.meusDesafios || 0 };
  }
  const CONQ = [
    ["primeiro", "🎯", "Primeiro treino", (m) => [m.treinos, 1]],
    ["t10", "💪", "10 treinos", (m) => [m.treinos, 10]],
    ["t25", "🔥", "25 treinos", (m) => [m.treinos, 25]],
    ["t50", "⚡", "50 treinos", (m) => [m.treinos, 50]],
    ["t100", "🏆", "100 treinos", (m) => [m.treinos, 100]],
    ["seq3", "📅", "3 dias seguidos", (m) => [m.melhor, 3]],
    ["seq7", "🗓️", "7 dias seguidos", (m) => [m.melhor, 7]],
    ["seq14", "🧱", "14 dias seguidos", (m) => [m.melhor, 14]],
    ["seq30", "👑", "30 dias seguidos", (m) => [m.melhor, 30]],
    ["semana5", "🚀", "5 treinos numa semana", (m) => [m.melhorSemana, 5]],
    ["h10", "⏱️", "10 horas de treino", (m) => [m.horas, 10]],
    ["h50", "⌛", "50 horas de treino", (m) => [m.horas, 50]],
    ["maxout", "🥵", "Primeiro Max Out", (m) => [m.maxouts, 1]],
    ["maxrec", "📈", "Recorde de Max Out", (m) => [m.recordes, 1]],
    ["ins24", "🌀", "24 treinos de Insanity", (m) => [m.insanity, 24]],
    ["ins48", "💀", "Insanity completo (48)", (m) => [m.insanity, 48]],
    ["fit1", "📋", "Primeiro Fit Test", (m) => [m.fits, 1]],
    ["fit50", "📈", "+50 reps no Fit Test", (m) => [m.fitEvo, 50]],
    ["fit5", "🏁", "5 Fit Tests (Insanity completo)", (m) => [m.fits, 5]],
    ["grupo", "🤝", "Entrou num grupo", (m) => [m.grupos, 1]],
    ["desafio1", "⚔️", "Primeiro desafio", (m) => [m.desafios, 1]],
    ["desafio5", "🥋", "5 desafios", (m) => [m.desafios, 5]],
    ["desafio10", "🦾", "10 desafios", (m) => [m.desafios, 10]],
  ];
  const CONQI = Object.fromEntries(CONQ.map((c) => [c[0], c]));
  function verificarConquistas(silencioso = false) {
    const m = metricasConquista(linhasLocais());
    S.conquistas = S.conquistas || {};
    const novas = CONQ.filter(([id, , , f]) => { const [v, alvo] = f(m); return v >= alvo && !S.conquistas[id]; });
    novas.forEach(([id]) => (S.conquistas[id] = hojeKey));
    if (novas.length) {
      try { localStorage.setItem(KEY, JSON.stringify(S)); } catch {}
      if (!silencioso) novas.slice(0, 2).forEach(([, ic, nome], i) => setTimeout(() => toast(`${ic} Nova conquista: ${nome}!`), i * 2600));
    }
    if (uid && sb) {
      const todas = Object.keys(S.conquistas).filter((c) => CONQI[c] && enviados[`${uid}|conq|${c}`] !== "1");
      if (todas.length) sb.from("conquistas").upsert(todas.map((codigo) => ({ usuario_id: uid, codigo })), { onConflict: "usuario_id,codigo", ignoreDuplicates: true })
        .then(({ error }) => { if (!error) { todas.forEach((c) => (enviados[`${uid}|conq|${c}`] = "1")); guardarEnviados(); } });
    }
  }
  function medalhas() {
    const m = metricasConquista(linhasLocais()), S2 = S.conquistas || {};
    const ganhas = CONQ.filter(([id]) => S2[id]).length;
    return `<p class="note small">${ganhas} de ${CONQ.length} conquistas</p><div class="badges">${CONQ.map(([id, ic, nome, f]) => {
      const [v, alvo] = f(m), ok = !!S2[id];
      return `<div class="badge${ok ? " on" : ""}" title="${esc(nome)}"><span class="b-ic">${ic}</span><strong>${esc(nome)}</strong><small>${ok ? `Desde ${ddmm(S2[id])}` : `${Math.min(v, alvo)}/${alvo}`}</small></div>`;
    }).join("")}</div>`;
  }

  /* ---------- Avatar e foto de perfil ---------- */
  const iniciais = (n) => String(n || "?").trim().split(/\s+/).slice(0, 2).map((p) => p[0]).join("").toUpperCase() || "?";
  const avatar = (p, s = 36) => p && p.foto_url
    ? `<img class="av" src="${esc(p.foto_url)}" width="${s}" height="${s}" alt="" referrerpolicy="no-referrer" loading="lazy">`
    : `<span class="av av-ini" style="width:${s}px;height:${s}px;font-size:${Math.round(s * 0.38)}px">${esc(iniciais(p && p.nome))}</span>`;
  function reduzirFoto(arquivo, lado = 320) {
    return new Promise((ok, falha) => {
      const img = new Image(), url = URL.createObjectURL(arquivo);
      img.onload = () => {
        const c = document.createElement("canvas"); c.width = c.height = lado;
        const m = Math.min(img.width, img.height);
        c.getContext("2d").drawImage(img, (img.width - m) / 2, (img.height - m) / 2, m, m, 0, 0, lado, lado);
        URL.revokeObjectURL(url);
        c.toBlob((b) => (b ? ok(b) : falha(new Error("foto"))), "image/jpeg", 0.85);
      };
      img.onerror = () => { URL.revokeObjectURL(url); falha(new Error("foto")); };
      img.src = url;
    });
  }
  async function trocarFoto(arquivo) {
    if (!arquivo || !/^image\//.test(arquivo.type)) { toast("Escolha uma imagem."); return; }
    try {
      const blob = await reduzirFoto(arquivo);
      if (uid && sb) {
        toast("Enviando foto…");
        const caminho = `${uid}/perfil.jpg`;
        const up = await sb.storage.from("fotos").upload(caminho, blob, { upsert: true, contentType: "image/jpeg", cacheControl: "3600" });
        if (up.error) throw up.error;
        const url = `${sb.storage.from("fotos").getPublicUrl(caminho).data.publicUrl}?v=${Date.now()}`;
        const { error } = await sb.from("perfis").update({ foto_url: url }).eq("id", uid);
        if (error) throw error;
        S.user.foto = url; G.carregadoEm = 0;
      } else {
        S.fotoLocal = await new Promise((ok) => { const r = new FileReader(); r.onload = () => ok(r.result); r.readAsDataURL(blob); });
      }
      save(); render(); toast("Foto atualizada ✓");
    } catch { toast("Não consegui trocar a foto. Tente outra imagem."); }
  }
  async function trocarNome() {
    const n = prompt("Seu nome:", S.user ? S.user.nome : "");
    if (n === null) return;
    const nome = n.trim().slice(0, 60);
    if (!nome) return;
    if (uid && sb) { const { error } = await sb.from("perfis").update({ nome }).eq("id", uid); if (error) { toast("Não consegui salvar o nome."); return; } G.carregadoEm = 0; }
    if (S.user) { S.user.nome = nome; S.user.primeiro = nome.split(" ")[0]; }
    save(); render();
  }

  /* ---------- Grupos ---------- */
  const G = { grupos: null, sel: null, membros: [], perfis: {}, linhas: [], conq: [], desafios: [], feitos: [], meusDesafios: null, carregadoEm: 0, carregando: false, erro: false, periodo: "semana", rank: "treinos" };
  async function carregarGrupos(forcar = false) {
    if (!uid || !sb || G.carregando) return;
    if (!forcar && G.grupos && Date.now() - G.carregadoEm < 60000) return;
    G.carregando = true;
    try {
      const { data, error } = await sb.from("grupos").select("id, nome, codigo, meta_semanal, dono, criado_em").order("criado_em");
      if (error) throw error;
      G.grupos = data || [];
      if (!G.grupos.some((g) => g.id === G.sel)) G.sel = G.grupos[0]?.id || null;
      const meus = await sb.from("desafio_feitos").select("desafio_id").eq("usuario_id", uid);
      if (!meus.error) G.meusDesafios = (meus.data || []).length;
      if (G.sel) await carregarGrupo(G.sel);
      else { G.desafios = []; G.feitos = []; }
      G.carregadoEm = Date.now(); G.erro = false;
    } catch (e) { console.error("grupos", e); G.erro = true; G.carregadoEm = Date.now(); if (!G.grupos) G.grupos = []; }
    G.carregando = false;
    if (/^#\/(grupo|home)/.test(location.hash)) render();
  }
  async function carregarGrupo(id) {
    const ms = await sb.from("membros").select("usuario_id").eq("grupo_id", id);
    const ids = (ms.data || []).map((m) => m.usuario_id);
    const desde = PERIODOS.tudo[1]();
    const [pf, tr, cq] = await Promise.all([
      sb.from("perfis").select("id, nome, foto_url").in("id", ids),
      sb.from("treinos").select("usuario_id, data, programa, titulo, concluido, minutos, detalhes, atualizado_em").in("usuario_id", ids).gte("data", keyOf(addDays(parseKey(desde), -35))),
      sb.from("conquistas").select("usuario_id, codigo, ganha_em").in("usuario_id", ids).order("ganha_em", { ascending: false }).limit(30),
    ]);
    const ds = await sb.from("desafios").select("id, semana, titulo, descricao, link, medida, criado_por, criado_em").eq("grupo_id", id).gte("semana", keyOf(addDays(mondayOf(hoje), -7 * 11))).order("semana", { ascending: false });
    const dids = (ds.data || []).map((d) => d.id);
    const fs = dids.length ? await sb.from("desafio_feitos").select("desafio_id, usuario_id, resultado, prova, feito_em").in("desafio_id", dids) : { data: [] };
    G.desafios = ds.data || []; G.feitos = fs.data || [];
    G.membros = ids;
    G.perfis = Object.fromEntries((pf.data || []).map((p) => [p.id, p]));
    G.linhas = tr.data || [];
    G.conq = cq.data || [];
  }
  const grupoSel = () => (G.grupos || []).find((g) => g.id === G.sel) || null;
  const linhasDe = (id) => (id === uid ? linhasLocais().map((r) => ({ ...r, usuario_id: uid })) : G.linhas.filter((r) => r.usuario_id === id));
  const linhasGrupo = () => G.membros.flatMap(linhasDe);
  async function entrarComCodigo(codigo) {
    codigo = String(codigo || "").trim().toUpperCase();
    if (!codigo) return;
    if (!uid) { S.convite = codigo; S.logado = false; save(); toast("Entre com sua conta para participar do grupo."); location.hash = "#/login"; return; }
    const { data, error } = await sb.rpc("entrar_grupo", { p_codigo: codigo });
    S.convite = null; save();
    if (error) { toast(/codigo_invalido/.test(error.message) ? "Código não encontrado. Confira com quem te convidou." : /muitos_grupos/.test(error.message) ? "Você já está em grupos demais." : "Não consegui entrar no grupo agora."); return; }
    G.sel = data.id; await carregarGrupos(true); verificarConquistas();
    toast(`Você entrou no grupo ${data.nome}! 🤝`);
    location.hash = "#/grupo";
  }
  async function criarGrupo() {
    const nome = (prompt("Nome do grupo (ex.: Amigos do treino):") || "").trim().slice(0, 40);
    if (!nome) return;
    const meta = parseInt(prompt("Meta de treinos do grupo por semana (somando todo mundo):", "12"), 10);
    const { data, error } = await sb.rpc("criar_grupo", { p_nome: nome, p_meta: meta > 0 && meta <= 500 ? meta : 12 });
    if (error) { toast(/muitos_grupos/.test(error.message) ? "Você já criou grupos demais." : "Não consegui criar o grupo agora."); return; }
    G.sel = data.id; await carregarGrupos(true); verificarConquistas();
    toast("Grupo criado! Agora convide a galera. 🔥");
  }
  function convidar(g) {
    const link = `${location.origin}/#/grupo/entrar/${g.codigo}`;
    const txt = `Bora treinar comigo no FIT.AI? 💪 Entra no grupo "${g.nome}": ${link} (código ${g.codigo})`;
    if (navigator.share && matchMedia("(pointer: coarse)").matches) navigator.share({ title: "FIT.AI", text: txt }).catch(() => {});
    else if (navigator.clipboard) navigator.clipboard.writeText(txt).then(() => toast("Convite copiado. Cole no WhatsApp. 📲"), () => prompt("Copie o convite:", txt));
    else prompt("Copie o convite:", txt);
  }

  // Medalhas do grupo (calculadas nas últimas 12 semanas)
  function medalhasGrupo(g) {
    const rows = feitas(linhasGrupo()).filter((r) => r.data >= PERIODOS.tudo[1]());
    const semanas = {}, porDia = {};
    rows.forEach((r) => { const s = keyOf(mondayOf(parseKey(r.data))); semanas[s] = (semanas[s] || 0) + 1; (porDia[r.data] = porDia[r.data] || new Set()).add(r.usuario_id); });
    const metas = Object.entries(semanas).filter(([s, n]) => s < keyOf(mondayOf(hoje)) && n >= g.meta_semanal).length + ((semanas[keyOf(mondayOf(hoje))] || 0) >= g.meta_semanal ? 1 : 0);
    const todos = G.membros.length > 1 ? Object.values(porDia).filter((s) => s.size >= G.membros.length).length : 0;
    const seq = sequencias(rows.map((r) => ({ ...r, concluido: true }))).melhor;
    const lista = [
      ["🎯", "Meta da semana", metas, 1, `${metas} ${metas === 1 ? "semana" : "semanas"}`],
      ["🙌", "Todo mundo treinou", todos, 1, `${todos} ${todos === 1 ? "dia" : "dias"}`],
      ["🔥", "Grupo em chamas", seq, 7, seq >= 7 ? `${seq} dias seguidos` : `${seq}/7 dias seguidos`],
      ["💯", "100 treinos juntos", rows.length, 100, `${Math.min(rows.length, 100)}/100`],
      ["⚔️", "4 desafios da semana", ...(() => { const n = G.desafios.filter((d) => G.feitos.some((f) => f.desafio_id === d.id)).length; return [n, 4, `${Math.min(n, 4)}/4 semanas`]; })()],
    ];
    return `<div class="badges">${lista.map(([ic, nome, v, alvo, txt]) => `<div class="badge${v >= alvo ? " on" : ""}"><span class="b-ic">${ic}</span><strong>${nome}</strong><small>${txt}</small></div>`).join("")}</div>`;
  }
  function atividade() {
    const nomeDe = (id) => esc((G.perfis[id]?.nome || "Alguém").split(" ")[0]);
    const tr = feitas(G.linhas).filter((r) => r.data >= keyOf(addDays(hoje, -10))).map((r) => {
      const mx = Object.entries(r.detalhes?.max || {}).filter(([v]) => INSV[v]);
      const crono = Number(r.detalhes?.dur) > 0 ? ` · ⏱ ${fmtMin(Math.round(r.detalhes.dur / 60))}` : "";
      const txt = crono + (mx.length === 1 ? ` · cansou aos ${mmss(Number(mx[0][1]))}` : mx.length ? ` · Max Out: ${esc(mx.map(([v, s]) => `${INSV[v].nome} ${mmss(Number(s))}`).join(", "))}` : "");
      return { t: r.atualizado_em || r.data, id: r.usuario_id, html: `<b>${nomeDe(r.usuario_id)}</b> concluiu <b>${esc(r.titulo)}</b>${txt}`, k: r.data };
    });
    const cq = G.conq.filter((c) => CONQI[c.codigo]).map((c) => ({ t: c.ganha_em, id: c.usuario_id, html: `<b>${nomeDe(c.usuario_id)}</b> ganhou ${CONQI[c.codigo][1]} <b>${esc(CONQI[c.codigo][2])}</b>`, k: c.ganha_em.slice(0, 10) }));
    const df = G.feitos.map((f) => { const d = G.desafios.find((x) => x.id === f.desafio_id); return d && { t: f.feito_em, id: f.usuario_id, html: `<b>${nomeDe(f.usuario_id)}</b> cumpriu o desafio <b>${esc(d.titulo)}</b>${f.resultado ? ` · ${esc(fmtRes(d, f.resultado))}` : ""} ⚔️`, k: String(f.feito_em || hojeKey).slice(0, 10) }; }).filter(Boolean);
    const itens = [...tr, ...cq, ...df].sort((a, b) => String(b.t).localeCompare(String(a.t))).slice(0, 12);
    if (!itens.length) return `<p class="note">Ainda sem atividade. Conclua um treino e puxe o grupo! 💪</p>`;
    return `<ul class="feed">${itens.map((i) => `<li>${avatar(G.perfis[i.id], 32)}<p>${i.html}<small>${ddmm(i.k)}</small></p></li>`).join("")}</ul>`;
  }
  const RANKS = {
    treinos: ["Treinos", (k) => k.treinos, (v) => `${v}`],
    minutos: ["Tempo", (k) => k.minutos, (v) => fmtMin(v)],
    sequencia: ["Sequência", (k) => k.seq, (v) => `${v} ${v === 1 ? "dia" : "dias"}`],
    maxout: ["Max Out", (k) => k.maxMedio, (v) => (v ? mmss(v) : "—")],
    fit: ["Fit Test", (k) => k.fit, (v) => (v ? `${v} reps` : "—")],
    fitevo: ["Evolução Fit Test", (k) => k.fitEvo, (v) => (v ? `${v > 0 ? "+" : ""}${v} reps` : "—")],
  };
  function ranking() {
    const [, val, fmt] = RANKS[G.rank];
    const lista = G.membros.map((id) => { const rows = linhasDe(id); return { id, p: G.perfis[id], k: { ...kpis(noPeriodo(rows, G.periodo)), seq: sequencias(rows).atual } }; })
      .sort((a, b) => val(b.k) - val(a.k) || b.k.treinos - a.k.treinos);
    const med = ["🥇", "🥈", "🥉"];
    return `<ol class="rank">${lista.map((x, i) => `<li class="${x.id === uid ? "eu" : ""}" data-membro="${x.id}" role="link" tabindex="0" aria-label="Ver perfil de ${esc(x.p?.nome || "Atleta")}">
      <span class="pos">${val(x.k) && i < 3 ? med[i] : i + 1}</span>${avatar(x.p, 36)}
      <span class="nome">${esc(x.p?.nome || "Atleta")}${x.id === uid ? " <small>(você)</small>" : ""}</span>
      <strong>${fmt(val(x.k))}</strong></li>`).join("")}</ol>
      ${G.rank === "maxout" ? `<p class="note small">Média do Max Out nos vídeos do ${esc(NOMES_MAXOUT)} no período: quanto mais tarde a pessoa cansou, melhor.</p>` : ""}
      ${G.rank === "fit" ? `<p class="note small">Total de repetições no último Fit Test do Insanity feito no período.</p>` : ""}
      ${G.rank === "fitevo" ? `<p class="note small">Quantas repetições a pessoa ganhou do primeiro ao último Fit Test do período.</p>` : ""}
      ${G.rank === "minutos" ? `<p class="note small">Tempo dos vídeos concluídos e do cronômetro. Na calistenia sem cronômetro, conta 3 min por série.</p>` : ""}`;
  }
  const evoSwitch = (on) => `<nav class="seg prog" aria-label="Evolução">
      <a href="#/evolucao" class="${on === "eu" ? "on" : ""}">Minha evolução</a>
      <a href="#/grupo" class="${on === "grupo" ? "on" : ""}">Grupo</a></nav>`;
  function telaGrupo(p1, p2) {
    setToolbar("evolucao");
    if (p1 === "entrar" && p2) { setTimeout(() => entrarComCodigo(p2), 0); return `<section class="screen has-toolbar"><p class="note" style="padding:40px 20px">Entrando no grupo…</p></section>`; }
    if (p1 === "membro" && p2 && uid && G.grupos) return telaMembro(p2);
    const head = `<header class="header"><span class="logo-txt dark">Fit.ai</span></header>${evoSwitch("grupo")}`;
    if (!uid) return `<section class="screen has-toolbar">${head}<div class="section">
      <p class="note">Os grupos juntam amigos num ranking de treinos, tempo, sequência e Max Out. Para participar, entre com uma conta.</p>
      <button class="btn btn-blue" id="ir-login" style="width:100%">Entrar ou criar conta</button></div></section>`;
    if (!G.grupos || (Date.now() - G.carregadoEm > 60000 && !G.carregando)) carregarGrupos();
    if (!G.grupos) return `<section class="screen has-toolbar">${head}<p class="note" style="padding:20px">Carregando seus grupos…</p></section>`;
    if (!G.grupos.length) return `<section class="screen has-toolbar">${head}<div class="section">
      ${G.erro ? `<p class="note">Não consegui carregar os grupos agora. Confira a internet e tente de novo.</p>` : ""}
      <div class="note-box"><p><b>Treinar junto rende mais.</b> Crie um grupo e mande o convite no WhatsApp, ou entre com o código que um amigo te mandou.</p></div>
      <div class="row2" style="margin-top:12px"><button class="btn btn-blue" id="g-criar">Criar grupo</button><button class="btn btn-outline" id="g-codigo">Tenho um código</button></div>
      </div></section>`;
    const g = grupoSel(), rows = linhasGrupo(), kp = kpis(noPeriodo(rows, G.periodo));
    const semana = feitas(rows).filter((r) => r.data >= keyOf(mondayOf(hoje)) && r.data <= hojeKey).length;
    const ativos = new Set(feitas(noPeriodo(rows, G.periodo)).map((r) => r.usuario_id)).size;
    const pct = Math.min(100, Math.round((semana / g.meta_semanal) * 100));
    return `<section class="screen has-toolbar">${head}
      <div class="chips g-chips">${G.grupos.map((x) => `<button class="chip${x.id === G.sel ? " primary" : ""}" data-g-sel="${x.id}">${esc(x.nome)}</button>`).join("")}<button class="chip" id="g-criar">+ Criar</button><button class="chip" id="g-codigo">Código</button></div>
      <div class="section">
        <div class="g-head"><div><h2>${esc(g.nome)}</h2><small>${G.membros.length} ${G.membros.length === 1 ? "pessoa" : "pessoas"} · código <b>${esc(g.codigo)}</b></small></div>
          <button class="btn btn-blue" id="g-convidar">Convidar</button></div>
        <div class="avs">${G.membros.slice(0, 12).map((id) => avatar(G.perfis[id], 34)).join("")}</div>
        <div class="meta-g"><div class="sec-head"><h2>Meta da semana</h2><span>${semana}/${g.meta_semanal} treinos</span></div>
          <div class="progress"><div class="bar"><i style="width:${pct}%"></i></div><span>${pct}%</span></div>
          ${g.dono === uid ? `<button class="lnk-btn" id="g-meta">Mudar meta</button>` : ""}</div>
        ${cardDesafio(g)}
        <div class="sec-head"><h2>Conquistas da semana</h2><span>${G.desafios.filter((d) => G.feitos.some((f) => f.desafio_id === d.id)).length} de 12 semanas</span></div>
        ${historicoDesafios()}
      </div>
      <div class="section">
        <div class="seg seg3">${Object.entries(PERIODOS).map(([k, [n]]) => `<button class="${G.periodo === k ? "on" : ""}" data-g-periodo="${k}">${n}</button>`).join("")}</div>
        <div class="stats-row" style="margin-top:12px">
          ${stat("circle-check.svg", kp.treinos, "Treinos do grupo")}
          ${stat("hourglass.svg", fmtMin(kp.minutos), "Tempo total")}
        </div>
        <div class="stats-row">
          ${stat("user-small.svg", `${ativos}/${G.membros.length}`, "Pessoas ativas")}
          ${stat("flame.svg", kp.maxMedio ? mmss(kp.maxMedio) : "—", "Max Out médio")}
        </div>
      </div>
      <div class="section">
        <div class="sec-head"><h2>Ranking · ${PERIODOS[G.periodo][0]}</h2></div>
        <div class="chips">${Object.entries(RANKS).map(([k, [n]]) => `<button class="chip${G.rank === k ? " primary" : ""}" data-g-rank="${k}">${n}</button>`).join("")}</div>
        ${ranking()}
      </div>
      <div class="section"><div class="sec-head"><h2>Treinos do grupo por semana</h2></div>
        ${barras(porSemana(rows, 8), { meta: g.meta_semanal, aria: "Treinos do grupo nas últimas 8 semanas" })}</div>
      <div class="section"><div class="sec-head"><h2>Conquistas do grupo</h2></div>${medalhasGrupo(g)}</div>
      <div class="section"><div class="sec-head"><h2>Atividade recente</h2><button class="lnk-btn" id="g-atualizar">Atualizar</button></div>${atividade()}</div>
      <div class="section"><button class="btn btn-outline" id="g-sair">Sair do grupo</button></div>
    </section>`;
  }
  // Perfil de alguém do grupo: números, Max Out e Fit Test (o que a pessoa sincronizou)
  function telaMembro(id) {
    const p = G.perfis[id];
    if (!p || !G.membros.includes(id)) return telaGrupo();
    const rows = linhasDe(id), k = kpis(rows), sq = sequencias(rows);
    return `<section class="screen has-toolbar"><div class="list" style="gap:20px">
      <div class="page-head"><a class="icon-btn" href="#/grupo" aria-label="Voltar">${icon("chevron-left.svg", 24)}</a><h1>Perfil</h1><span class="spacer"></span></div>
      <div class="profile">${avatar(p, 56)}<div><strong>${esc(p.nome || "Atleta")}${id === uid ? " (você)" : ""}</strong><span>${esc(grupoSel()?.nome || "Grupo")}</span></div></div>
      <div class="stats-row">${stat("circle-check.svg", k.treinos, "Treinos")}${stat("hourglass.svg", fmtMin(k.minutos), "Tempo")}</div>
      <div class="stats-row">${stat("flame.svg", `${sq.atual}`, "Sequência atual")}${stat("zap.svg", `${sq.melhor}`, "Melhor sequência")}</div>
      <div>${recordesHtml(rows, `${esc((p.nome || "Essa pessoa").split(" ")[0])} ainda não registrou Max Out nem Fit Test.`)}</div>
      </div></section>`;
  }
  function grupoHome() {
    if (!uid) return "";
    if (!G.grupos) { carregarGrupos(); return ""; }
    const g = grupoSel();
    if (!g) return `<a class="emerg" href="#/grupo"><span>${icon("user-small.svg", 20)}</span><div><strong>Treine com os amigos</strong><small>Crie um grupo ou entre com um código</small></div></a>`;
    const semana = feitas(linhasGrupo()).filter((r) => r.data >= keyOf(mondayOf(hoje)) && r.data <= hojeKey).length;
    const pct = Math.min(100, Math.round((semana / g.meta_semanal) * 100));
    return `<a class="g-card" href="#/grupo"><div class="sec-head"><h2>${esc(g.nome)}</h2><span>${semana}/${g.meta_semanal} na semana</span></div>
      <div class="progress"><div class="bar"><i style="width:${pct}%"></i></div><span>${pct}%</span></div>
      ${(() => { const d = desafioDaSemana(), n = d ? feitosDe(d).length : 0;
        return `<p class="d-mini">⚔️ ${d ? `${esc(d.titulo)} · ${n ? `🏅 ${n} cumpriu${n > 1 ? "ram" : ""}` : "ninguém cumpriu ainda"}` : "Sem desafio esta semana. Lance um!"}</p>`; })()}
      <div class="avs">${G.membros.slice(0, 8).map((id) => avatar(G.perfis[id], 28)).join("")}</div></a>`;
  }

  /* ---------- Desafio da semana (por grupo) ---------- */
  // medida: feito (só cumprir) | reps (mais é melhor) | tempo (completar no menor tempo) | duracao (aguentar mais tempo)
  const MEDIDAS = { feito: "Só cumprir", reps: "Repetições (mais é melhor)", tempo: "Tempo para completar (menor é melhor)", duracao: "Tempo aguentando (mais é melhor)" };
  const MODELOS = [
    { titulo: "100 burpees", descricao: "100 burpees completos (peito no chão e salto no fim). Pode descansar quando quiser; vale o tempo total.", medida: "tempo" },
    { titulo: "Prancha máxima", descricao: "Prancha com antebraços no chão e corpo reto. Para quando o quadril cair.", medida: "duracao" },
    { titulo: "Flexões em 2 minutos", descricao: "Máximo de flexões com técnica limpa em 2 minutos. Pode pausar no alto.", medida: "reps" },
    { titulo: "Max Out Cardio sem parar", descricao: "Faça o Max Out Cardio e anote o minuto em que precisou parar pela primeira vez.", medida: "duracao" },
    { titulo: "300 agachamentos no dia", descricao: "300 agachamentos ao longo do dia, divididos como quiser.", medida: "feito" },
  ];
  const semanaAtual = () => keyOf(mondayOf(hoje));
  const fmtRes = (d, v) => (v == null ? "" : d.medida === "reps" ? `${v} reps` : mmss(v));
  const melhorPrimeiro = (d) => (a, b) => d.medida === "tempo" ? (a.resultado ?? 1e9) - (b.resultado ?? 1e9) : d.medida === "feito" ? String(a.feito_em).localeCompare(String(b.feito_em)) : (b.resultado ?? 0) - (a.resultado ?? 0);
  const feitosDe = (d) => G.feitos.filter((f) => f.desafio_id === d.id).sort(melhorPrimeiro(d));
  const desafioDaSemana = () => G.desafios.find((d) => d.semana === semanaAtual()) || null;
  let formDesafio = null; // null | índice do modelo ("" = em branco)
  function cardDesafio(g) {
    const d = desafioDaSemana();
    const fim = 6 - hojeDia, prazo = fim === 0 ? "termina hoje" : `${fim} ${fim === 1 ? "dia" : "dias"} para acabar`;
    if (formDesafio !== null) {
      const m = MODELOS[formDesafio] || { titulo: "", descricao: "", medida: "feito" };
      return `<form class="desafio form-desafio" id="form-desafio">
        <div class="sec-head"><h2>Lançar desafio da semana</h2></div>
        <div class="chips">${MODELOS.map((x, i) => `<button type="button" class="chip${String(i) === String(formDesafio) ? " primary" : ""}" data-modelo="${i}">${esc(x.titulo)}</button>`).join("")}<button type="button" class="chip${formDesafio === "" ? " primary" : ""}" data-modelo="">Em branco</button></div>
        <label>Título<input name="titulo" required maxlength="80" value="${esc(m.titulo)}" placeholder="Ex.: Desafio do reel"></label>
        <label>Como fazer<textarea name="descricao" maxlength="500" rows="3" placeholder="Explique a regra do desafio">${esc(m.descricao)}</textarea></label>
        <label>Link do vídeo (opcional)<input name="link" type="url" inputmode="url" maxlength="300" placeholder="https://www.instagram.com/reel/..."></label>
        <label>Como medir<select name="medida">${Object.entries(MEDIDAS).map(([k, n]) => `<option value="${k}"${k === m.medida ? " selected" : ""}>${n}</option>`).join("")}</select></label>
        <div class="row2"><button type="button" class="btn btn-outline" id="desafio-cancelar">Cancelar</button><button type="submit" class="btn btn-blue">Lançar</button></div>
      </form>`;
    }
    if (!d) return `<div class="desafio vazio"><div class="sec-head"><h2>⚔️ Desafio da semana</h2><span>${prazo}</span></div>
      <p class="note">Ninguém lançou o desafio desta semana. Basta <b>uma pessoa</b> cumprir para o grupo ganhar a conquista da semana.</p>
      <button class="btn btn-blue" id="desafio-novo">Lançar desafio</button></div>`;
    const fs = feitosDe(d), eu = fs.find((f) => f.usuario_id === uid), med = ["🥇", "🥈", "🥉"];
    const podeApagar = d.criado_por === uid || g.dono === uid;
    return `<div class="desafio${fs.length ? " ok" : ""}">
      <div class="sec-head"><h2>⚔️ ${esc(d.titulo)}</h2><span>${prazo}</span></div>
      ${d.descricao ? `<p class="d-desc">${esc(d.descricao)}</p>` : ""}
      <div class="ex-tags"><span class="pill gray">${esc(MEDIDAS[d.medida].split(" (")[0])}</span><span class="pill gray">por ${esc((G.perfis[d.criado_por]?.nome || "alguém").split(" ")[0])}</span></div>
      ${d.link ? `<a class="btn btn-outline" href="${esc(d.link)}" target="_blank" rel="noopener">▶ Ver o desafio</a>` : ""}
      <p class="d-status">${fs.length ? `🏅 <b>Conquista da semana garantida!</b> ${fs.length} ${fs.length === 1 ? "pessoa cumpriu" : "pessoas cumpriram"}.` : "Ninguém cumpriu ainda. Bora ser o primeiro? 💪"}</p>
      ${fs.length ? `<ol class="rank">${fs.map((f, i) => `<li class="${f.usuario_id === uid ? "eu" : ""}"><span class="pos">${d.medida !== "feito" && i < 3 ? med[i] : "✓"}</span>${avatar(G.perfis[f.usuario_id], 32)}
        <span class="nome">${esc(G.perfis[f.usuario_id]?.nome || "Atleta")}</span>${f.prova ? `<a class="lnk-btn" href="${esc(f.prova)}" target="_blank" rel="noopener">prova</a>` : ""}<strong>${esc(fmtRes(d, f.resultado))}</strong></li>`).join("")}</ol>` : ""}
      ${eu ? `<button class="btn btn-outline done" id="desafio-desfazer" data-id="${d.id}">Você cumpriu ✓ (toque para desfazer)</button>` : `<button class="btn btn-blue" id="desafio-cumpri" data-id="${d.id}">✅ Cumpri o desafio</button>`}
      ${podeApagar ? `<button class="lnk-btn" id="desafio-apagar" data-id="${d.id}">Apagar desafio</button>` : ""}
    </div>`;
  }
  function historicoDesafios() {
    const semanas = Array.from({ length: 8 }, (_, i) => keyOf(addDays(mondayOf(hoje), -(7 - i) * 7)));
    const ok = (s) => G.desafios.some((d) => d.semana === s && G.feitos.some((f) => f.desafio_id === d.id));
    return `<div class="semanas">${semanas.map((s) => {
      const d = G.desafios.find((x) => x.semana === s), c = ok(s), atual = s === semanaAtual();
      return `<div class="sem${c ? " on" : ""}${atual ? " atual" : ""}" title="${d ? esc(d.titulo) : "Sem desafio"}"><span>${c ? "🏅" : atual ? "⏳" : "—"}</span><small>${ddmm(s)}</small></div>`;
    }).join("")}</div>`;
  }
  async function cumprirDesafio(id) {
    const d = G.desafios.find((x) => x.id === id);
    if (!d) return;
    let resultado = null;
    if (d.medida === "reps") {
      const n = parseInt(prompt("Quantas repetições?") || "", 10);
      if (!(n > 0 && n <= 100000)) { toast("Digite o número de repetições."); return; }
      resultado = n;
    } else if (d.medida !== "feito") {
      const t = prompt(d.medida === "tempo" ? "Em quanto tempo você completou? (mm:ss)" : "Quanto tempo você aguentou? (mm:ss)");
      if (t === null) return;
      resultado = segDe(t);
      if (!resultado) { toast("Digite o tempo como mm:ss (ex.: 6:30)."); return; }
    }
    let prova = (prompt("Link da prova (opcional): vídeo no Instagram, Drive, YouTube…") || "").trim();
    if (prova && !/^https:\/\//i.test(prova)) prova = "";
    const { error } = await sb.from("desafio_feitos").upsert({ desafio_id: id, usuario_id: uid, resultado, prova: prova || null });
    if (error) { toast("Não consegui salvar. Tente de novo."); return; }
    const primeiro = !G.feitos.some((f) => f.desafio_id === id);
    G.meusDesafios = (G.meusDesafios || 0) + 1;
    await carregarGrupos(true); verificarConquistas();
    toast(primeiro ? "🏅 Conquista da semana garantida para o grupo!" : "Desafio cumprido! 🔥");
  }

  /* ---------- Minha evolução: KPIs e gráficos ---------- */
  let evoMax = null;
  function painelPessoal() {
    const rows = linhasLocais(), mes = kpis(noPeriodo(rows, "mes")), sq = sequencias(rows);
    const sem = porSemana(rows, 8), media = Math.round((soma(sem.map((x) => x.v)) / 8) * 10) / 10;
    return `<div class="stats-row">${stat("circle-check.svg", mes.treinos, "Treinos no mês")}${stat("hourglass.svg", fmtMin(mes.minutos), "Tempo no mês")}</div>
      <div class="stats-row">${stat("flame.svg", `${sq.melhor}`, "Melhor sequência")}${stat("calendar.svg", String(media).replace(".", ","), "Treinos/semana")}</div>
      <div class="sec-head" style="margin-top:8px"><h2>Treinos por semana</h2></div>
      ${barras(sem, { aria: "Treinos por semana nas últimas 8 semanas" })}
      <div class="sec-head" style="margin-top:8px"><h2>Minutos por semana</h2></div>
      ${barras(porSemana(rows, 8, "minutos"), { aria: "Minutos de treino por semana", fmt: (v) => v })}`;
  }
  function graficoMaxOut() {
    const mx = maxOuts(linhasLocais());
    if (!mx.length) return `<p class="note">Registre o Max Out nos vídeos do ${esc(NOMES_MAXOUT)} para ver aqui em que minuto você cansou em cada treino. 🥵</p>`;
    const vids = [...new Set(mx.map((m) => m.v))];
    if (!vids.includes(evoMax)) evoMax = vids[0];
    const h = mx.filter((m) => m.v === evoMax).sort((a, b) => a.k.localeCompare(b.k)).slice(-8);
    const best = Math.max(...h.map((m) => m.s)), dur = (INSV[evoMax].min || 0) * 60;
    const evo = h.length > 1 ? h[h.length - 1].s - h[0].s : 0;
    return `<div class="chips evo-chips">${vids.map((v) => `<button class="chip${v === evoMax ? " primary" : ""}" data-evo-max="${v}">${esc(INSV[v].nome)}</button>`).join("")}</div>
      ${barras(h.map((m) => ({ k: m.k, v: m.s })), { fmt: mmss, meta: dur, aria: `Max Out em ${INSV[evoMax].nome}` }).replace(/meta (\d+)/, () => `fim ${mmss(dur)}`)}
      <div class="stats-row">${stat("zap.svg", mmss(best), "Melhor Max Out")}${stat("arrow-up.svg", (evo >= 0 ? "+" : "−") + mmss(Math.abs(evo)), "Desde o 1º registro")}</div>`;
  }

  /* ---------- Router ---------- */
  function render() {
    let [, rota = "", p1, p2] = location.hash.split("/");
    if (rota === "grupo" && p1 === "entrar" && /^[A-Za-z0-9]{4,12}$/.test(p2 || "") && !uid) { S.convite = p2.toUpperCase(); save(); }
    if (!S.logado) rota = "login";
    else if (!S.onboarded && rota !== "login") rota = "onboarding";
    else if (!telas[rota] || rota === "login" || rota === "onboarding") rota = "home";
    if (rota === "treino" && (p2 === undefined || !treino(p1 === "E" ? "E" : Number(p1), Number(p2)))) rota = "home";
    let alvo = `#/${rota}`;
    if (rota === "treino") alvo += `/${p1}/${p2}`;
    else if (VP[rota] && p1 !== undefined) alvo += `/${p1}` + (p2 !== undefined ? `/${p2}` : "");
    else if (rota === "grupo" && (p1 === "entrar" || p1 === "membro") && p2) alvo += `/${p1}/${p2}`;
    else if ((rota === "plano" || rota === "hiper") && p1 !== undefined) alvo += `/${p1}`;
    if (location.hash !== alvo) history.replaceState(null, "", alvo);
    closeChat(true);
    app.innerHTML = telas[rota](p1, p2);
    if (rota === "onboarding") startOnboarding();
    const tab = document.querySelector(".wtab.on");
    if (tab) tab.scrollIntoView({ inline: "center", block: "nearest" });
  }
  window.addEventListener("hashchange", render);

  /* ---------- Contas (Supabase Auth): e-mail e senha ou Google ---------- */
  const SB_URL = "https://thckpqzvvjujuseqeusz.supabase.co";
  const SB_KEY = "sb_publishable_t8SLyWZNLgSHj_4B158EyA_tpHm_DmV";
  const sb = window.supabase ? window.supabase.createClient(SB_URL, SB_KEY, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } }) : null;
  let uid = null; // id do usuário logado no Supabase (null = visitante)
  const tokenSB = async () => (sb ? (await sb.auth.getSession()).data.session?.access_token || null : null);

  let loginModo = null; // null | "entrar" | "cadastro"
  function telaLoginEmail() {
    const cad = loginModo === "cadastro";
    return `<section class="screen login">
      <div class="login-photo"><img src="${A("login-hero.jpg")}" alt=""></div>
      <img class="login-logo" src="${A("logo-fitai.svg")}" width="85" height="38" alt="FIT.AI">
      <div class="login-panel form-mode">
        <div class="seg seg-login" role="tablist">
          <button type="button" role="tab" aria-selected="${!cad}" class="${cad ? "" : "on"}" data-modo="entrar">Entrar</button>
          <button type="button" role="tab" aria-selected="${cad}" class="${cad ? "on" : ""}" data-modo="cadastro">Criar conta</button>
        </div>
        <form id="form-login" class="form-login" novalidate>
          ${cad ? `<label>Nome<input name="nome" autocomplete="name" required maxlength="60" placeholder="Seu nome"></label>` : ""}
          <label>E-mail<input name="email" type="email" inputmode="email" autocomplete="email" required placeholder="voce@email.com"></label>
          <label>Senha<input name="senha" type="password" autocomplete="${cad ? "new-password" : "current-password"}" required minlength="${cad ? 8 : 1}" placeholder="${cad ? "Mínimo 8 caracteres" : "Sua senha"}"></label>
          <p class="form-erro" id="login-erro" role="alert"></p>
          <button class="btn btn-google" type="submit">${cad ? "Criar conta" : "Entrar"}</button>
        </form>
        ${cad ? "" : `<button class="visitante" id="esqueci">Esqueci a senha</button>`}
        <button class="visitante" id="voltar-login">Voltar</button>
      </div></section>`;
  }
  function erroLogin(e) {
    const m = String(e?.message || e || "").toLowerCase();
    if (m.includes("invalid login")) return "E-mail ou senha incorretos.";
    if (m.includes("already registered") || m.includes("already been registered")) return "Esse e-mail já tem conta. Toque em Entrar.";
    if (m.includes("email not confirmed")) return "Confirme seu e-mail pelo link que enviamos e tente de novo.";
    if (m.includes("password")) return "A senha precisa ter pelo menos 8 caracteres.";
    if (m.includes("rate") || m.includes("too many")) return "Muitas tentativas. Espere alguns minutos e tente de novo.";
    if (m.includes("email")) return "Confira o e-mail.";
    return "Não foi possível entrar agora. Tente de novo.";
  }
  document.addEventListener("submit", async (ev) => {
    if (ev.target.id !== "form-login") return;
    ev.preventDefault();
    const f = ev.target, btn = f.querySelector("button[type=submit]"), erro = $("#login-erro");
    const d = Object.fromEntries(new FormData(f));
    if (!sb) { erro.textContent = "Sem conexão com o servidor de contas. Tente de novo."; return; }
    if (loginModo === "cadastro" && !String(d.nome || "").trim()) { erro.textContent = "Digite seu nome."; return; }
    erro.textContent = ""; btn.disabled = true; btn.style.opacity = ".7";
    try {
      if (loginModo === "cadastro") {
        const { data, error } = await sb.auth.signUp({ email: d.email.trim(), password: d.senha, options: { data: { nome: d.nome.trim().slice(0, 60) }, emailRedirectTo: location.origin + "/" } });
        if (error) throw error;
        if (!data.session) { loginModo = "entrar"; render(); toast("Conta criada! Confirme pelo link que mandamos no seu e-mail. 📩"); return; }
      } else {
        const { error } = await sb.auth.signInWithPassword({ email: d.email.trim(), password: d.senha });
        if (error) throw error;
      }
      loginModo = null; // onAuthStateChange cuida do resto
    } catch (e) {
      erro.textContent = erroLogin(e);
      btn.disabled = false; btn.style.opacity = "";
    }
  });
  async function loginGoogle(btn) {
    if (!sb) { toast("Sem conexão com o servidor de contas."); return; }
    btn.disabled = true; btn.style.opacity = ".7";
    const { error } = await sb.auth.signInWithOAuth({ provider: "google", options: { redirectTo: location.origin + "/" } });
    if (error) { btn.disabled = false; btn.style.opacity = ""; toast("Não foi possível entrar com o Google."); }
  }
  async function esqueciSenha() {
    const email = prompt("Seu e-mail para receber o link de nova senha:");
    if (!email || !sb) return;
    const { error } = await sb.auth.resetPasswordForEmail(email.trim(), { redirectTo: location.origin + "/#/nova-senha" });
    toast(error ? erroLogin(error) : "Se o e-mail tiver conta, o link chega em instantes. 📩");
  }
  function entrar(user) {
    S.logado = true; S.user = user; save();
    location.hash = S.onboarded ? "#/home" : "#/onboarding";
  }
  // Sessão do Supabase -> estado do app
  async function aoLogar(session) {
    const u = session.user, novo = uid !== u.id;
    // Outra conta neste aparelho: não mistura os treinos de uma pessoa com os da outra
    if (S.contaId && S.contaId !== u.id) { S.logs = {}; VKEYS.forEach((p) => (S[p] = vazioVP())); S.conquistas = {}; S.onboarded = false; G.grupos = null; }
    S.contaId = u.id;
    uid = u.id;
    let perfil = null;
    try { perfil = (await sb.from("perfis").select("nome, foto_url, config").eq("id", uid).maybeSingle()).data; } catch {}
    const meta = u.user_metadata || {};
    const nome = (perfil?.nome || meta.nome || meta.full_name || meta.name || u.email.split("@")[0]).trim();
    const user = { id: uid, nome, primeiro: nome.split(" ")[0], foto: perfil?.foto_url || meta.avatar_url || null, email: u.email };
    if (perfil?.config) {
      if (perfil.config.inicio && !Object.keys(S.logs).length) S.inicio = perfil.config.inicio;
      for (const p of VKEYS) if (perfil.config[p] !== undefined && !Object.keys(S[p].logs).length) S[p].inicio = perfil.config[p];
      if (perfil.config.principal && !S.principal) S.principal = perfil.config.principal;
      if (perfil.config.nivel && !S.nivel) S.nivel = perfil.config.nivel;
      if (perfil.config.principal) S.onboarded = true; // já escolheu o programa em outro aparelho
    }
    if (!S.logado || !S.user || S.user.id !== uid) entrar(user);
    else { S.user = user; save(); }
    if (novo) { await puxarTreinos(); sincronizar(); verificarConquistas(true); if (S.convite) entrarComCodigo(S.convite); carregarVideos(); }
    render();
  }
  if (sb) {
    sb.auth.onAuthStateChange((evento, session) => {
      if (session && (evento === "SIGNED_IN" || evento === "INITIAL_SESSION")) setTimeout(() => aoLogar(session), 0);
      if (evento === "PASSWORD_RECOVERY") setTimeout(async () => {
        const nova = prompt("Digite a nova senha (mínimo 8 caracteres):");
        if (nova) { const { error } = await sb.auth.updateUser({ password: nova }); toast(error ? erroLogin(error) : "Senha trocada ✓"); }
      }, 300);
      if (evento === "SIGNED_OUT") uid = null;
    });
  }

  /* ---------- Cliques ---------- */
  document.addEventListener("click", (e) => {
    const t = e.target.closest("button, a, [data-membro]");
    if (!t) return;
    if (t.id === "google") loginGoogle(t);
    else if (t.id === "visitante") entrar(null);
    else if (t.id === "email-login") { loginModo = "entrar"; render(); }
    else if (t.id === "voltar-login") { loginModo = null; render(); }
    else if (t.dataset.modo) { loginModo = t.dataset.modo; render(); }
    else if (t.id === "esqueci") esqueciSenha();
    else if (t.id === "ir-login") { S.logado = false; save(); location.hash = "#/login"; }
    else if (t.id === "trocar-foto") $("#foto-arquivo").click();
    else if (t.id === "trocar-nome") trocarNome();
    else if (t.id === "g-criar") criarGrupo();
    else if (t.id === "desafio-novo") { formDesafio = 0; render(); }
    else if (t.dataset.modelo !== undefined) { formDesafio = t.dataset.modelo === "" ? "" : Number(t.dataset.modelo); render(); }
    else if (t.id === "desafio-cancelar") { formDesafio = null; render(); }
    else if (t.id === "desafio-cumpri") cumprirDesafio(t.dataset.id);
    else if (t.id === "desafio-desfazer") {
      if (!confirm("Desfazer seu cumprimento do desafio?")) return;
      sb.from("desafio_feitos").delete().eq("desafio_id", t.dataset.id).eq("usuario_id", uid).then(({ error }) => { if (error) toast("Não consegui desfazer."); else { G.meusDesafios = Math.max(0, (G.meusDesafios || 1) - 1); carregarGrupos(true); } });
    } else if (t.id === "desafio-apagar") {
      if (!confirm("Apagar o desafio desta semana? Os cumprimentos dele também somem.")) return;
      sb.from("desafios").delete().eq("id", t.dataset.id).then(({ error }) => { if (error) toast("Não consegui apagar."); else carregarGrupos(true); });
    }
    else if (t.id === "g-codigo") entrarComCodigo(prompt("Código do grupo:") || "");
    else if (t.dataset.gSel) { G.sel = t.dataset.gSel; G.carregadoEm = 0; carregarGrupos(true); }
    else if (t.id === "g-convidar") convidar(grupoSel());
    else if (t.dataset.gPeriodo) { G.periodo = t.dataset.gPeriodo; render(); }
    else if (t.dataset.gRank) { G.rank = t.dataset.gRank; render(); }
    else if (t.dataset.membro) location.hash = `#/grupo/membro/${t.dataset.membro}`;
    else if (t.dataset.principal) {
      const x = progDe(t.dataset.principal);
      if (!x || x.k === principal()) return;
      escolherPrograma(x.k);
      toast(VP[x.k] && insSemanaDe(x.k, hoje) < 0 ? `${x.nome} é seu programa principal. Começa na segunda, ${ddmm(S[x.k].inicio)}. 💪` : `${x.nome} é seu programa principal agora. 💪`, 4000);
      render();
    }
    else if (t.id === "g-atualizar") { carregarGrupos(true); toast("Atualizando…"); }
    else if (t.id === "g-meta") {
      const g = grupoSel(), n = parseInt(prompt("Meta de treinos do grupo por semana:", g.meta_semanal), 10);
      if (n > 0 && n <= 500) sb.from("grupos").update({ meta_semanal: n }).eq("id", g.id).then(({ error }) => { if (error) toast("Não consegui mudar a meta."); else { g.meta_semanal = n; render(); } });
    } else if (t.id === "g-sair") {
      const g = grupoSel();
      if (!confirm(`Sair do grupo ${g.nome}?${g.dono === uid ? " Você criou este grupo; ele continua para os outros." : ""}`)) return;
      sb.from("membros").delete().eq("grupo_id", g.id).eq("usuario_id", uid).then(({ error }) => { if (error) toast("Não consegui sair do grupo."); else { G.sel = null; carregarGrupos(true); toast("Você saiu do grupo."); } });
    } else if (t.dataset.evoMax) { evoMax = t.dataset.evoMax; $("#max-box").innerHTML = graficoMaxOut(); }
    else if (t.id === "sair") { if (sb && uid) sb.auth.signOut(); uid = null; S.logado = false; S.user = null; S.sessao = null; save(); chatLog = []; location.hash = "#/login"; }
    else if (t.id === "iniciar") t.textContent = toggleTimer();
    else if (t.hasAttribute("data-ins-carregar")) { t.disabled = true; carregarVideos(true, t.closest(".ex.ins")?.dataset.ins).then((ok) => { if (ok) toast("Vídeos carregados ✓ Toque em Assistir."); else t.disabled = false; }); }
    else if (t.hasAttribute("data-ins-play")) abrirVideo(t.dataset.insPlay);
    else if (t.hasAttribute("data-vt-toggle")) vtAlternar(t.closest(".vtimer"));
    else if (t.hasAttribute("data-vt-edit")) vtAjustar(t.closest(".vtimer"));
    else if (t.dataset.insFeito) {
      const p = t.dataset.p, id = t.dataset.insFeito, k = t.dataset.k, l = insLogDe(p, k), era = insFeito(p, k);
      const arr = t.dataset.av === "1" ? (l.avulso = l.avulso || []) : l.feitos, i = arr.indexOf(id);
      i >= 0 ? arr.splice(i, 1) : arr.push(id);
      save();
      if (insFeito(p, k) !== era) { render(); if (insFeito(p, k)) toast(`Treino concluído! 🔥 ${sequencia()} ${sequencia() === 1 ? "dia" : "dias"} seguidos`); }
      else insRefazer(p, id);
    } else if (t.dataset.insSemana !== undefined) {
      const p = t.dataset.p, n = Number(t.dataset.insSemana);
      S[p].inicio = keyOf(addDays(mondayOf(hoje), -n * 7));
      insSemana[p] = null; save(); render();
      toast(`${VP[p].nome}: você está na Semana ${n + 1}.`);
    } else if (t.id === "ins-parar") {
      const p = t.dataset.p;
      if (!confirm(`Pausar o ${VP[p].nome}? Seus registros continuam salvos.`)) return;
      S[p].inicio = null; insSemana[p] = null; save(); render();
    } else if (t.dataset.askIns) {
      const P = VP[t.dataset.p];
      openChat(`Como fazer o treino ${INSV[t.dataset.askIns].nome} do ${P.nome}? ${P.maxOut ? "Dicas para aguentar mais tempo antes do Max Out?" : "Dicas para dar o máximo e evoluir no Fit Test?"}`);
    }
    else if (t.id === "trocar") {
      const l = logHoje();
      if (l && parcial(hojeKey) && !confirm("Você já registrou séries hoje em outro treino. Trocar para este? (as séries de hoje serão apagadas)")) return;
      S.logs[hojeKey] = { w: t.dataset.w === "E" ? "E" : Number(t.dataset.w), d: Number(t.dataset.d), sets: {}, dur: 0, done: false };
      save(); render(); toast("Treino de hoje trocado.");
    } else if (t.id === "concluir") {
      const l = garantirLog();
      if (l.done) l.done = false;
      else {
        l.done = true;
        if (timer.seg) { l.dur = timer.seg; clearInterval(timer.id); Object.assign(timer, { ativo: false, seg: 0 }); }
      }
      save(); render();
      if (l.done) toast(`Treino concluído! 🔥 ${sequencia()} ${sequencia() === 1 ? "dia" : "dias"} seguidos`);
    } else if (t.id === "puxar-tiros") {
      const l = garantirLog();
      const atuais = l.sets["tiro-200"] || [];
      if (atuais.length && !confirm(`Substituir os ${atuais.length} tiros já anotados pelos tempos do Strava?`)) return;
      l.sets["tiro-200"] = t.dataset.tiros.split(",").map(Number).filter((n) => n > 0);
      save(); render(); toast("Tiros importados do Strava ✓");
    } else if (t.id === "resumo") {
      const txt = resumoTreino(hojeKey);
      const ok = () => toast("Resumo copiado. Cole na descrição da atividade ou peça ao Claude para postar.");
      if (navigator.share && matchMedia("(pointer: coarse)").matches) navigator.share({ title: "Treino FIT.AI", text: txt }).catch(() => {});
      else if (navigator.clipboard) navigator.clipboard.writeText(txt).then(ok, () => prompt("Copie o resumo:", txt));
      else prompt("Copie o resumo:", txt);
    } else if (t.dataset.del !== undefined) {
      const id = t.closest(".ex").dataset.ex;
      const l = garantirLog();
      l.sets[id].splice(Number(t.dataset.del), 1);
      save(); refazerCard(id);
    } else if (t.dataset.evo) {
      evoEx = t.dataset.evo;
      const sec = t.closest(".section");
      sec.innerHTML = `<div class="sec-head"><h2>Progresso por exercício</h2></div>${progresso()}`;
    } else if (t.dataset.edit) {
      const campo = t.dataset.edit;
      const lbl = { peso: "Seu peso (kg)", altura: "Sua altura (cm)", idade: "Sua idade" }[campo];
      const v = prompt(lbl, S.perfil[campo] || "");
      if (v !== null) { S.perfil[campo] = v.trim().replace(",", ".").slice(0, 6); save(); render(); }
    } else if (t.dataset.semana !== undefined) {
      S.inicio = keyOf(addDays(mondayOf(hoje), -Number(t.dataset.semana) * 7));
      planoSemana = null; save(); render();
      toast(`Você está na Semana ${Number(t.dataset.semana) + 1}.`);
    } else if (t.id === "exportar") {
      const blob = new Blob([JSON.stringify({ app: "fitai", versao: 1, inicio: S.inicio, perfil: S.perfil, logs: S.logs, ...Object.fromEntries(VKEYS.map((p) => [p, S[p]])), hiper: S.hiper, conquistas: S.conquistas || {} }, null, 2)], { type: "application/json" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob); a.download = `fitai-backup-${hojeKey}.json`; a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    } else if (t.id === "importar") {
      $("#arquivo").click();
    } else if (t.dataset.ask) {
      const ex = TODOS_EX.find((x) => x.id === t.dataset.ask);
      openChat(`Como executar corretamente o exercício ${ex.nome}? Quais são os erros comuns?`);
    } else if (t.hasAttribute("data-open-chat")) openChat();
    else if (t.hasAttribute("data-close-chat")) closeChat();
  });
  document.addEventListener("change", async (e) => {
    if (e.target.id === "foto-arquivo" && e.target.files[0]) { trocarFoto(e.target.files[0]); e.target.value = ""; return; }
    if (e.target.id !== "arquivo" || !e.target.files[0]) return;
    try {
      const d = JSON.parse(await e.target.files[0].text());
      if (d.app !== "fitai" || typeof d.logs !== "object") throw 0;
      S.logs = { ...S.logs, ...d.logs }; if (d.inicio) S.inicio = d.inicio; if (d.perfil) S.perfil = { ...S.perfil, ...d.perfil };
      for (const p of VKEYS) if (d[p] && typeof d[p].logs === "object") S[p] = { inicio: d[p].inicio ?? S[p].inicio, logs: { ...S[p].logs, ...d[p].logs } };
      if (d.hiper && typeof d.hiper.logs === "object") S.hiper = { ...S.hiper, ...(S.hiper.plano ? {} : d.hiper), logs: { ...S.hiper.logs, ...d.hiper.logs } };
      save(); render(); toast("Backup importado ✓");
    } catch { toast("Arquivo de backup inválido."); }
  });
  $(".chat-backdrop").addEventListener("click", () => closeChat());
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeChat();
    if ((e.key === "Enter" || e.key === " ") && e.target.dataset?.membro) { e.preventDefault(); location.hash = `#/grupo/membro/${e.target.dataset.membro}`; }
  });

  /* ---------- Chat (Coach AI) ---------- */
  const layer = $("#chat-layer"), msgsEl = $("#chat-msgs"), chipsEl = $("#chat-chips");
  const CHIPS_PADRAO = ["Treino de hoje", "Minha evolução", "Como funciona o programa?"];
  const CHIPS_HOJE = ["Insanity", "Calistenia", "Hipertrofia", "Minha evolução"];
  let chatLog = [];
  let busy = false;

  // Texto solto (com <b>, <br>…) vai dentro de um <p>: a bolha é flex em coluna e quebraria a frase em pedaços
  const bubbleHTML = (m) => `<div class="msg${m.me ? " me" : ""}"><div class="bubble">${/^\s*<(p|ul|ol|div|h\d)\b/i.test(m.html) ? m.html : `<p>${m.html}</p>`}</div></div>`;
  function addMsg(box, html, me = false, log = null) {
    const m = { html, me };
    if (log) log.push(m);
    box.insertAdjacentHTML("beforeend", bubbleHTML(m));
    box.scrollTo({ top: box.scrollHeight, behavior: "smooth" });
  }
  function typing(box) {
    box.insertAdjacentHTML("beforeend", `<div class="msg" data-typing><div class="bubble"><span class="typing"><i></i><i></i><i></i></span></div></div>`);
    box.scrollTo({ top: box.scrollHeight, behavior: "smooth" });
    return () => box.querySelector("[data-typing]")?.remove();
  }
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  function setChips(box, list, primary = false) {
    box.innerHTML = list.map((c) => `<button type="button" class="chip${primary ? " primary" : ""}" data-chip="${esc(c)}">${esc(c)}</button>`).join("");
    box.scrollLeft = 0;
    box.classList.toggle("wrap", box === chipsEl && hxChat); // na entrevista as opções quebram linha (todas à vista)
  }
  function openChat(pergunta) {
    layer.hidden = false;
    layer.classList.remove("closing");
    if (!chatLog.length) chatLog.push({ html: `Olá, ${esc(primeiroNome())}! O que vamos fazer hoje? 💪`, me: false });
    msgsEl.innerHTML = chatLog.map(bubbleHTML).join("");
    msgsEl.scrollTop = msgsEl.scrollHeight;
    if (!chipsEl.children.length) setChips(chipsEl, CHIPS_HOJE);
    if (pergunta) send(pergunta);
    else if (matchMedia("(hover: hover)").matches) $("#chat-input").focus();
  }
  function closeChat(instant = false) {
    if (layer.hidden) return;
    if (instant) { layer.hidden = true; return; }
    layer.classList.add("closing");
    setTimeout(() => { layer.hidden = true; layer.classList.remove("closing"); }, 200);
  }
  async function send(texto) {
    texto = texto.trim();
    if (!texto || busy) return;
    if (hxChat) { addMsg(msgsEl, esc(texto), true, chatLog); hxChatResposta(texto); return; }
    if (atalhoHoje(texto)) return;
    busy = true;
    addMsg(msgsEl, esc(texto), true, chatLog);
    chatLog[chatLog.length - 1].txt = texto;
    if (!iaOff) {
      const ok = await coachIA();
      if (ok) { setChips(chipsEl, CHIPS_PADRAO); busy = false; return; }
    }
    const r = responder(texto);
    const stop = typing(msgsEl);
    await wait(650 + Math.min(1200, r.html.length * 3));
    stop();
    addMsg(msgsEl, r.html, false, chatLog);
    setChips(chipsEl, r.chips || CHIPS_PADRAO);
    busy = false;
  }
  // Chips "O que vamos fazer hoje?": abrem o treino do programa escolhido (ou a entrevista do Hipertrofia)
  function atalhoHoje(texto) {
    const t = norm(texto);
    if (!["insanity", "calistenia", "hipertrofia", "academia", "ver meu treino"].includes(t)) return false;
    addMsg(msgsEl, esc(texto), true, chatLog);
    const ir = async (msg, hash) => {
      const stop = typing(msgsEl); await wait(450); stop();
      addMsg(msgsEl, msg, false, chatLog);
      await wait(900);
      setChips(chipsEl, CHIPS_HOJE); // na próxima vez que abrir, o Coach oferece de novo as opções do dia
      if (location.hash === hash) closeChat(); else location.hash = hash;
    };
    if (t === "calistenia") {
      const { w, d } = ativoHoje(), tr = treino(w, d);
      ir(tr ? `Bora de <b>${esc(NOME_PROG)}</b>! Hoje é <b>${esc(tr.titulo)}</b>. Abrindo… 💪` : `Abrindo o <b>${esc(NOME_PROG)}</b>… 💪`, tr ? `#/treino/${w}/${d}` : "#/plano");
    } else if (t === "insanity") {
      const P = VP[principal()] || VPROGS.find((x) => S[x.k].inicio) || VPROGS[0];
      if (!P) { ir("Nenhum programa do Insanity disponível.", "#/home"); return true; }
      const h = insHoje(P.k), tit = h ? insDia(P.k, h.w, h.d).titulo : "";
      ir(`Bora de <b>${esc(P.nome)}</b>!${tit ? ` Hoje é <b>${esc(tit)}</b>.` : ""} Abrindo… 🔥`, linkHojeVideo(P.k));
    } else if (!S.hiper.plano) hxIniciarChat();
    else {
      const d = hxDiaHoje();
      ir(d !== null ? `Bora pra academia! Hoje é <b>${esc(hxDia(d).titulo)}</b>. Abrindo… 🏋️` : "Hoje é dia de descanso no seu plano de academia. Abrindo o plano da semana.", hxLinkHoje());
    }
    return true;
  }
  $("#chat-form").addEventListener("submit", (e) => { e.preventDefault(); const i = $("#chat-input"); send(i.value); i.value = ""; });
  chipsEl.addEventListener("click", (e) => { const c = e.target.closest("[data-chip]"); if (c) send(c.dataset.chip); });

  /* ---------- Coach AI de verdade (Claude, via /api/coach) ---------- */
  let iaOff = location.protocol === "file:";
  function md(t) {
    const linhas = esc(t.trim()).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").split("\n");
    let html = "", lista = false;
    for (const l of linhas) {
      const item = l.match(/^\s*[-•*]\s+(.*)/);
      if (item) { if (!lista) { html += "<ul>"; lista = true; } html += `<li>${item[1]}</li>`; continue; }
      if (lista) { html += "</ul>"; lista = false; }
      if (l.trim()) html += `<p>${l}</p>`;
    }
    return html + (lista ? "</ul>" : "");
  }
  function linhaEx(e) {
    const alvo = typeof e.r === "string" ? e.r : e.r;
    const mu = MUSC_EX[e.id] ? ` (músculos: ${MUSC_EX[e.id][1]})` : "";
    return `${e.nome} [${e.id}]${mu}: ${e.un === "tiro" ? `${e.s} tiros de 200 m (tempo em s, menor é melhor)` : `${e.s}×${alvo}${e.un === "reps" ? " reps" : " " + e.un}${e.lado ? " por lado" : ""}`}${e.obs ? ` — ${e.obs}` : ""}`;
  }
  function programaTexto() {
    const sem = PROGRAMA.map((s, w) => [`## Semana ${w + 1} · ${s.nome}`, s.nota.replace(/<[^>]+>/g, ""),
      ...s.dias.map((t, d) => `### ${DIAS[d]} · ${t.foco} · ${t.titulo}${t.obs ? ` (${t.obs})` : ""}\n${(t.ex || []).map((e) => "- " + linhaEx(e)).join("\n")}`)].join("\n"));
    const ins = VPROGS.map((P) => [`# Programa paralelo: ${P.nome} (vídeos, ${P.semanas.length} semanas${P.selo ? `, ${P.selo}` : ""})`,
      P.coach || "",
      ...P.semanas.map((s, w) => `## Semana ${w + 1} (${s.nome}): ${s.dias.map((t, d) => `${DIAS[d]}: ${t.titulo}`).join(" | ")}`),
      `Vídeos: ${P.videos.map((v) => `${v.nome}${v.min ? ` (${v.min} min)` : ""} — ${v.desc}${v.musculos ? ` Músculos: ${v.musculos}.` : ""}`).join("; ")}`].filter(Boolean).join("\n")).join("\n\n");
    const caminho = [`# Programas do app e caminho recomendado (do mais acessível ao mais avançado)`,
      ...TRILHA.map((x, i) => `${i + 1}. ${x.nome} — nível ${x.nivel}. ${x.sobre}`),
      `Caminho natural: ${caminhoTxt()}. Quem está começando ou voltando começa pelo ${TRILHA[0].nome}.`,
      `Fora do caminho, para quem quer treinar em academia: ${HIPER.nome} — ${HIPER.sobre}`,
      "Como recomendar: pergunte (ou use o contexto) o nível e a rotina da pessoa e indique UM programa para começar, explicando o porquê em uma frase. Iniciante → 1º programa; já treina com regularidade → 2º; treina pesado e faz barra → 3º. Na dúvida, o mais acessível.",
      "Quando avançar: ao terminar o programa atual com constância (poucas faltas) e evolução clara (Max Out mais tarde nos vídeos do MAX:30; mais repetições no Fit Test do Insanity), sugira o próximo do caminho. Se a pessoa falhou muitos treinos ou parou mais de 2 semanas, sugira repetir o programa atual em vez de avançar.",
      "Para trocar o programa principal no app: Perfil → Seu programa principal."].join("\n");
    return [caminho, `# Programa: ${NOME_PROG} (nível ${CALI.nivel})`, ...sem, `## Treino de emergência (15 min)\n${EMERGENCIA.ex.map((e) => "- " + linhaEx(e)).join("\n")}`,
      CICLO, ins, ACAD.length ? hxProgramaTexto() : ""].filter(Boolean).join("\n\n");
  }
  function contextoTexto(comCorridas) {
    const { w, d } = ativoHoje(), t = treino(w, d);
    const P = S.perfil, out = [];
    out.push(`Hoje: ${DIAS[hojeDia]}, ${hojeKey}. ${nomeSemana(w)}, ciclo ${cicloDe(hoje)}. Treino de hoje: ${t ? t.titulo : "—"}.`);
    out.push(`Perfil: ${P.peso || "?"} kg, ${P.altura || "?"} cm, ${P.idade || "?"} anos. Sequência atual: ${sequencia()} dias. Treinos concluídos: ${treinosFeitos()}.`);
    out.push(`Nível informado: ${S.nivel || "não informado"}. Programa principal: ${progDe(principal())?.nome || NOME_PROG}.`);
    const lh = logHoje();
    if (lh) out.push(`Registrado hoje (${lh.done ? "concluído" : "em andamento"}): ${Object.entries(lh.sets || {}).filter(([, v]) => v.length).map(([id, v]) => `${EXI[id]?.nome || id} ${v.join("+")}`).join("; ") || "nada ainda"}.`);
    const dias = Object.keys(S.logs).sort().filter((k) => k < hojeKey).slice(-21);
    out.push("Últimos treinos:");
    out.push(dias.length ? dias.map((k) => { const l = S.logs[k], tt = treino(l.w, l.d);
      return `- ${k} ${tt ? tt.titulo : ""}${l.done ? "" : " (incompleto)"}: ${Object.entries(l.sets || {}).filter(([, v]) => v.length).map(([id, v]) => `${EXI[id]?.nome || id} ${v.join("+")}`).join("; ") || "sem séries"}`; }).join("\n") : "- nenhum registro ainda");
    const recs = TODOS_EX.filter((e) => historico(e.id).length).map((e) => { const h = historico(e.id), u = UN[e.un] || "";
      return `- ${e.nome}: recorde ${recorde(e.id)}${u} (${menorMelhor(e.id) ? "melhor tiro" : "melhor série"}), último total ${h[h.length - 1].total}${u} em ${h[h.length - 1].k}, ${h.length} treinos`; });
    if (recs.length) out.push("Recordes por exercício:\n" + recs.join("\n"));
    for (const P of VPROGS) {
      const p = P.k, ih = insHoje(p);
      if (!S[p].inicio) continue;
      out.push(ih ? `${P.nome}: semana ${ih.w + 1} de ${P.semanas.length}. Hoje: ${insDia(p, ih.w, ih.d).titulo}${insFeito(p, hojeKey) ? " (feito)" : insParcial(p, hojeKey) ? " (em andamento)" : ""}.` : `${P.nome}: fora do calendário (início ${S[p].inicio}).`);
      const ik = Object.keys(S[p].logs).sort().slice(-21);
      if (ik.length) out.push(`Registros do ${P.nome}:\n` + ik.map((k) => { const l = S[p].logs[k];
        const fit = l.fit && P.fitTest ? ` | Fit Test: ${P.fitTest.map((m, i) => `${m} ${l.fit[i] ?? "—"}`).join(", ")}` : "";
        return `- ${k}: ${l.feitos.map((id) => `${INSV[id]?.nome || id}${l.max?.[id] ? ` (Max Out ${mmss(l.max[id])})` : ""}`).join("; ") || "nada"}${fit}`; }).join("\n"));
    }
    const hxc = hxContextoTexto();
    if (hxc) out.push(hxc);
    const cs = comCorridas ? corridas().slice(0, 10) : [];
    if (comCorridas) out.push("Corridas do Strava:\n" + (cs.length ? cs.map((c) => `- ${c.data} ${c.nome}: ${km(c.dist)} km, ${fmtDur(c.tempo)}, ritmo ${ritmo(c.tempo, c.dist)}/km${c.fc ? `, FC ${Math.round(c.fc)}` : ""}`).join("\n") : "- nenhuma sincronizada"));
    return out.join("\n");
  }
  async function coachIA() {
    // Logado com Google: manda o token (se for o dono, o servidor usa o modelo completo). Visitante: vai sem token.
    const token = await tokenSB();
    const mensagens = chatLog.filter((m) => m.txt).map((m) => ({ role: m.me ? "user" : "assistant", content: m.txt }));
    const stop = typing(msgsEl);
    let r;
    try {
      r = await fetch("/api/coach", { method: "POST", headers: { "content-type": "application/json", ...(token ? { authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({ mensagens, programa: programaTexto(), contexto: contextoTexto(!!token && souDono) }) });
    } catch { stop(); return false; }
    if (!r.ok || !r.body) {
      stop();
      const e = await r.json().catch(() => ({}));
      iaOff = true;
      toast(e.erro === "limite" ? "Você chegou ao limite de perguntas de hoje. Seguimos com respostas prontas. 💪" : "Coach AI offline. Usando respostas prontas.");
      return false;
    }
    stop();
    const m = { html: "", me: false, txt: "" };
    chatLog.push(m);
    msgsEl.insertAdjacentHTML("beforeend", bubbleHTML(m));
    const bolha = msgsEl.lastElementChild.querySelector(".bubble");
    const leitor = r.body.getReader(), dec = new TextDecoder();
    for (;;) {
      const { value, done } = await leitor.read();
      if (done) break;
      m.txt += dec.decode(value, { stream: true });
      m.html = md(m.txt);
      bolha.innerHTML = m.html;
      msgsEl.scrollTop = msgsEl.scrollHeight;
    }
    if (!m.txt.trim()) { m.txt = "Não consegui responder agora. Tente de novo."; m.html = md(m.txt); bolha.innerHTML = m.html; }
    return true;
  }

  const norm = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  const EX_POR_NOME = [...TODOS_EX].sort((a, b) => b.nome.length - a.nome.length);

  function responder(texto) {
    const t = norm(texto);
    const ex = EX_POR_NOME.find((e) => t.includes(norm(e.nome))) || (t.includes("flex") ? TODOS_EX.find((e) => e.id === "flexao") : null);
    if (ex && DICAS[ex.id]) {
      const [exec, erros] = DICAS[ex.id];
      const q = encodeURIComponent(`${ex.nome} calistenia execução`);
      const prev = anterior(ex.id), rec = recorde(ex.id);
      let html = `<p><b>Execução:</b> ${exec}</p><p><b>Erros:</b> ${erros}</p>`;
      if (prev) html += `<p><b>Seu histórico:</b> no último treino você fez ${prev.total} no total (melhor série: ${prev.best}). Recorde: ${rec}. Tente superar pelo menos 1 repetição na melhor série hoje!</p>`;
      html += `<p>Quer ver na prática? <a href="https://www.youtube.com/results?search_query=${q}" target="_blank" rel="noopener" class="lnk">Veja vídeos de ${esc(ex.nome)} no YouTube</a>.</p>`;
      return { html };
    }
    if (t.includes("evolu") || t.includes("progresso") || t.includes("recorde")) {
      const linhas = TODOS_EX.map((e) => ({ e, h: historico(e.id) })).filter((x) => x.h.length)
        .map(({ e, h }) => {
          const a = h[0].total, b = h[h.length - 1].total;
          const p = a ? Math.round(((b - a) / a) * 100) : 0;
          return `• <b>${esc(e.nome)}</b>: melhor série ${recorde(e.id)}${h.length > 1 ? `, total ${a} → ${b} (${p >= 0 ? "+" : ""}${p}%)` : ""}`;
        });
      if (!linhas.length) return { html: "Ainda não tenho registros seus. Abra o treino de hoje e anote as repetições de cada série — a partir do segundo treino já consigo te mostrar a evolução. 💪", chips: ["Treino de hoje"] };
      return { html: `<p>Sua evolução até agora (${treinosFeitos()} treinos concluídos, sequência de ${sequencia()} dias):</p><p>${linhas.join("<br>")}</p>` };
    }
    if (t.includes("hoje")) {
      const { w, d } = ativoHoje(); const tr = treino(w, d);
      const quando = w === "E" ? "Hoje você escolheu o <b>Treino de emergência</b>" : `Hoje é <b>${DIAS[d]} da Semana ${w + 1} (${PROGRAMA[w].nome})</b>`;
      return { html: `${quando}: <b>${esc(tr.titulo)}</b>.<br>${tr.ex.map((e) => `• ${esc(e.nome)}: ${prescricao(e)}`).join("<br>")}${tr.obs ? `<br><br>${esc(tr.obs)}` : ""}<br><br>Anote cada série no treino. Bora! 🔥` };
    }
    if (t.includes("comec") || t.includes("nivel") || t.includes("qual programa") || t.includes("qual treino") || t.includes("iniciante") || t.includes("proximo programa")) {
      const r = recomendado(S.nivel || "Iniciante");
      return { html: `O caminho natural no FIT.AI é <b>${esc(caminhoTxt())}</b>.<br>${TRILHA.map((x, i) => `${i + 1}. <b>${esc(x.nome)}</b> (${esc(x.nivel)}): ${esc(x.sobre)}`).join("<br>")}<br><br>${S.nivel ? `Pelo seu nível (${esc(S.nivel)}), comece pelo <b>${esc(r.nome)}</b>.` : `Começando ou voltando? Vá de <b>${esc(TRILHA[0].nome)}</b>.`} Prefere academia? O <b>${esc(HIPER.nome)}</b> monta um treino de musculação só para você. Para trocar: Perfil → Seu programa principal.` };
    }
    if (t.includes("programa") || t.includes("funciona") || t.includes("semana")) {
      return { html: `O <b>${esc(NOME_PROG)}</b> tem ${PROGRAMA.length} semanas: ${PROGRAMA.map((s, i) => `<b>${i + 1}. ${s.nome}</b>`).join(", ")}. Você está na <b>Semana ${Math.max(0, semanaDe(hoje)) + 1}</b>${cicloDe(hoje) > 1 ? ` do ciclo ${cicloDe(hoje)}` : ""}. ${esc(CICLO)} Só aumente a dificuldade quando ficar claramente fácil.` };
    }
    if (/^(oi|ola|e ai|eai|bom dia|boa tarde|boa noite|hey)\b/.test(t)) return { html: `Fala, ${esc(primeiroNome())}! 👋 Bora treinar? Posso te mostrar o treino de hoje ou sua evolução.` };
    if (t.includes("dor") || t.includes("lesao") || t.includes("machuc")) return { html: "Se sentir dor aguda, pare o exercício. Dor articular ou que não passa merece avaliação de um profissional de saúde. Em dias assim, prefira uma variação mais leve (ex.: flexão com joelhos apoiados ou barra australiana)." };
    return { html: "Posso te ajudar com a execução dos exercícios (toque no <b>?</b> ao lado de cada um), mostrar o treino de hoje ou sua evolução. 😉" };
  }

  /* ---------- Onboarding ---------- */
  async function startOnboarding() {
    const box = $("#ob-msgs"), chips = $("#ob-chips"), form = $("#ob-form");
    let etapa = "inicio";
    const falar = async (html, ms = 700) => { const stop = typing(box); await wait(ms); stop(); addMsg(box, html); };
    const SEMANAS = PROGRAMA.map((s, i) => `Semana ${i + 1} · ${s.nome}`);
    const intro = [
      S.user ? `Bem-vindo ao FIT.AI, ${esc(primeiroNome())}! 🎉` : "Bem-vindo ao FIT.AI! 🎉",
      `Aqui tem ${TRILHA.length} programas, do mais acessível ao mais puxado: <b>${esc(caminhoTxt())}</b>, e o <b>${esc(HIPER.nome)}</b> para quem treina em academia. Você registra cada treino, acompanha a evolução e tem uma IA disponível 24h para te guiar.`,
      "Vou te indicar por onde começar. Como está seu condicionamento hoje?",
    ];
    for (const [i, m] of intro.entries()) await falar(m, i === 1 ? 1000 : 600);
    setChips(chips, NIVEIS.map(([, txt]) => txt));
    etapa = "nivel";

    async function escolhido(x) {
      chips.innerHTML = "";
      if (x.k === "plano") {
        S.principal = "plano"; save();
        etapa = "semana";
        await falar(`Fechado: <b>${esc(x.nome)}</b>! Em qual semana dele você está agora?`);
        setChips(chips, SEMANAS);
        return;
      }
      escolherPrograma(x.k);
      etapa = "fim";
      if (x.k === "hiper") {
        await falar(`Fechado: <b>${esc(x.nome)}</b>! Na próxima tela eu te faço umas perguntas rápidas (objetivo, dias, experiência, peso) e monto seu treino de academia. 🏋️`, 1000);
        setChips(chips, ["Montar meu treino"], true);
        return;
      }
      const w = insSemanaDe(x.k, hoje);
      await falar(w < 0
        ? `Fechado: <b>${esc(x.nome)}</b>! Sua semana 1 começa na <b>segunda, ${ddmm(S[x.k].inicio)}</b>. Até lá, dá para conhecer os vídeos e fazer um extra: tudo conta. 💪`
        : `Fechado: <b>${esc(x.nome)}</b>! Você está na <b>semana 1</b>. Abra o treino de hoje, toque em Assistir e marque cada vídeo como feito. ${VP[x.k].maxOut ? "Anote também o seu <b>Max Out</b>: é ele que mostra a sua evolução." : "Nos dias de <b>Fit Test</b>, anote as repetições de cada movimento."} 🔥`, 1100);
      setChips(chips, ["Ver meu programa"], true);
    }

    async function responder(txt) {
      const t = norm(txt);
      if (etapa === "nivel") {
        addMsg(box, esc(txt), true);
        const n = NIVEIS.find(([, frase]) => norm(frase) === t) || NIVEIS.find(([nv]) => t.includes(norm(nv)));
        if (!n) return falar("Toque numa das opções abaixo. 😉");
        S.nivel = n[0]; save();
        const r = recomendado(n[0]);
        etapa = "programa"; chips.innerHTML = "";
        await falar(`Pelo que você disse, comece pelo <b>${esc(r.nome)}</b>: ${esc(r.sobre)}`, 1100);
        if (r !== TRILHA[0]) await falar(`Se preferir ir com calma, o caminho natural começa pelo <b>${esc(TRILHA[0].nome)}</b>.`);
        setChips(chips, [`Começar o ${r.nome}`, ...CATALOGO.filter((x) => x !== r).map((x) => `Prefiro o ${x.nome}`)]);
      } else if (etapa === "programa") {
        addMsg(box, esc(txt), true);
        const x = CATALOGO.find((p) => t.endsWith(norm(p.nome)));
        if (!x) return falar("Toque numa das opções abaixo. 😉");
        await escolhido(x);
      } else if (etapa === "semana") {
        addMsg(box, esc(txt), true);
        const n = Number((t.match(/[1-9]/) || [])[0]);
        if (!n || n > PROGRAMA.length) return falar("Toque em uma das semanas abaixo. 😉");
        S.inicio = keyOf(addDays(mondayOf(hoje), -(n - 1) * 7));
        etapa = "fim"; chips.innerHTML = "";
        const tr = treino(n - 1, hojeDia);
        await falar(`Perfeito! Hoje é <b>${DIAS[hojeDia]} da Semana ${n}</b>: <b>${esc(tr.titulo)}</b>. Em cada exercício, anote as repetições de cada série. Eu comparo com o treino anterior e te mostro a evolução. 🔥`, 1100);
        setChips(chips, ["Ver treino de hoje"], true);
      } else if (etapa === "fim") {
        S.onboarded = true; save(); location.hash = principal() === "plano" ? "#/home" : `#/${principal()}`;
        if (principal() === "hiper" && !S.hiper.plano) setTimeout(() => hxIniciarChat(), 500);
      }
    }
    chips.addEventListener("click", (e) => { const c = e.target.closest("[data-chip]"); if (c) responder(c.dataset.chip); });
    form.addEventListener("submit", (e) => { e.preventDefault(); const i = $("#ob-input"); if (i.value.trim()) responder(i.value.trim()); i.value = ""; });
  }

  render();
  carregarVideos();
  vtTick(); // cronômetro de vídeo que ficou rodando antes de recarregar a página
})();
