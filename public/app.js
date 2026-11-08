/* FIT.AI — caderno de treino de calistenia (HTML/CSS/JS puro) */
(() => {
  "use strict";

  const A = (f) => `assets/${f}`;
  const GOOGLE_CLIENT_ID = "900778689263-mgkn7nbs66bk3h7cqi19gmo1t7o7ivne.apps.googleusercontent.com";
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
  // Programa de EXEMPLO (aberto, para o GitHub). Se existir public/programa-pessoal.js, ele substitui este.
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

  /* ---------- Estado ---------- */
  const KEY = "fitai-state-v1";
  const padrao = { user: null, logado: false, onboarded: false, inicio: keyOf(mondayOf(hoje)), logs: {}, perfil: { peso: "", altura: "", idade: "" } };
  let S = load();
  function load() {
    try {
      const s = { ...padrao, ...JSON.parse(localStorage.getItem(KEY) || "{}") };
      if (!s.logs || typeof s.logs !== "object") s.logs = {};
      s.perfil = { ...padrao.perfil, ...(s.perfil || {}) };
      return s;
    } catch { return { ...padrao }; }
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch {} }

  const semanasDesde = (d) => Math.floor(diffDays(parseKey(S.inicio), d) / 7);
  const semanaDe = (d) => { const n = semanasDesde(d); return n < 0 ? -1 : n % PROGRAMA.length; };
  const cicloDe = (d) => Math.max(0, Math.floor(semanasDesde(d) / PROGRAMA.length)) + 1;
  const treino = (w, d) => (w === "E" ? (d === 0 ? EMERGENCIA : null) : PROGRAMA[w] ? PROGRAMA[w].dias[d] : null);
  const nomeSemana = (w) => (w === "E" ? "Treino de emergência" : `Semana ${w + 1} · ${PROGRAMA[w].nome}`);
  const logHoje = () => S.logs[hojeKey];
  const ativoHoje = () => { const l = logHoje(); if (l) return { w: l.w, d: l.d }; const w = semanaDe(hoje); return { w: Math.max(w, 0), d: hojeDia }; };
  const soma = (a) => a.reduce((x, y) => x + y, 0);
  const feito = (k) => !!(S.logs[k] && S.logs[k].done);
  const parcial = (k) => !!(S.logs[k] && Object.values(S.logs[k].sets || {}).some((s) => s.length));

  function sequencia() {
    let d = feito(hojeKey) ? hoje : addDays(hoje, -1), c = 0;
    while (feito(keyOf(d))) { c++; d = addDays(d, -1); }
    return c;
  }
  const treinosFeitos = () => Object.keys(S.logs).filter(feito).length;
  const tempoTotal = () => soma(Object.values(S.logs).map((l) => l.dur || 0));
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
  function ultimoTreino() { const ks = Object.keys(S.logs).filter(feito).sort(); return ks.length ? ks[ks.length - 1] : null; }
  const fmtDur = (seg) => { const h = Math.floor(seg / 3600), m = Math.floor((seg % 3600) / 60); return h ? `${h}h${pad(m)}m` : `${m}min`; };


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
  const fotoPerfil = () => (S.user && S.user.foto) || A("avatar.jpg");

  function toast(msg) {
    document.querySelectorAll(".toast").forEach((t) => t.remove());
    const t = document.createElement("div");
    t.className = "toast"; t.textContent = msg;
    $(".device").appendChild(t);
    setTimeout(() => t.remove(), 2500);
  }
  function setToolbar(tab) {
    const tb = $("#toolbar");
    tb.hidden = !tab;
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

  /* ---------- Telas ---------- */
  let planoSemana = null;
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
            <a class="btn btn-blue" href="#/treino/${w}/${d}">Bora!</a>
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
          <div class="sec-head"><h2>Treino de Hoje</h2><a href="#/plano">${nomeSemana(w)}${w !== "E" && cicloDe(hoje) > 1 ? ` · Ciclo ${cicloDe(hoje)}` : ""}</a></div>
          ${parado ? `<p class="note retomada"><b>Voltou? 💪 Protocolo de retomada:</b> nem do zero, nem do máximo. Faça o treino de hoje dentro da sua capacidade atual e recupere o ritmo nos próximos dias.</p>` : ""}
          ${t ? workoutCard(w, d) : ""}
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
        <div style="padding:0 20px">
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
        <div class="section">
          <div class="sec-head"><h2>Progresso por exercício</h2></div>
          ${progresso()}
        </div>
        ${secaoCorridas()}</section>`;
    },

    perfil() {
      setToolbar("perfil");
      const w = semanaDe(hoje);
      const P = S.perfil;
      return `<section class="screen has-toolbar">
        <header class="header"><span class="logo-txt dark">Fit.ai</span></header>
        <div style="padding:20px;display:flex;flex-direction:column;gap:20px">
          <div class="profile"><img src="${esc(fotoPerfil())}" alt="Foto de ${esc(nomeCompleto())}" referrerpolicy="no-referrer">
            <div><strong>${esc(nomeCompleto())}</strong><span>${esc(NOME_PROG)} · Semana ${Math.max(w, 0) + 1}</span></div></div>
          <div class="stats-grid">
            ${stat("weight.svg", P.peso || "—", "Kg", { up: true, edit: "peso" })}
            ${stat("ruler.svg", P.altura || "—", "Cm", { up: true, edit: "altura" })}
            ${stat("user-small.svg", P.idade || "—", "Anos", { up: true, edit: "idade" })}
            ${stat("circle-check.svg", treinosFeitos(), "Treinos", { up: true })}
          </div>
          <div class="field">
            <span class="field-lbl">Em qual semana do programa você está?</span>
            <div class="seg">${PROGRAMA.map((s, i) => `<button class="${i === w ? "on" : ""}" data-semana="${i}">${i + 1}</button>`).join("")}</div>
          </div>
          <div class="field">
            <span class="field-lbl">Seus dados ficam salvos neste aparelho. Faça backup de vez em quando.</span>
            <div class="row2">
              <button class="btn btn-outline" id="exportar">Exportar backup</button>
              <button class="btn btn-outline" id="importar">Importar backup</button>
            </div>
            <input type="file" id="arquivo" accept="application/json,.json" hidden>
          </div>
          <button class="btn logout" id="sair">Sair da conta${icon("log-out.svg", 16)}</button>
        </div></section>`;
    },
  };

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

  document.addEventListener("submit", (ev) => {
    const f = ev.target.closest(".add-set");
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

  /* ---------- Router ---------- */
  function render() {
    let [, rota = "", p1, p2] = location.hash.split("/");
    if (!S.logado) rota = "login";
    else if (!S.onboarded && rota !== "login") rota = "onboarding";
    else if (!telas[rota] || rota === "login" || rota === "onboarding") rota = "home";
    if (rota === "treino" && (p2 === undefined || !treino(p1 === "E" ? "E" : Number(p1), Number(p2)))) rota = "home";
    let alvo = `#/${rota}`;
    if (rota === "treino") alvo += `/${p1}/${p2}`;
    else if (rota === "plano" && p1 !== undefined) alvo += `/${p1}`;
    if (location.hash !== alvo) history.replaceState(null, "", alvo);
    closeChat(true);
    app.innerHTML = telas[rota](p1, p2);
    if (rota === "onboarding") startOnboarding();
    const tab = document.querySelector(".wtab.on");
    if (tab) tab.scrollIntoView({ inline: "center", block: "nearest" });
  }
  window.addEventListener("hashchange", render);

  /* ---------- Login com e-mail e senha (contas no servidor, /api/auth) ---------- */
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
        <button class="visitante" id="voltar-login">Voltar</button>
      </div></section>`;
  }
  const ERROS_LOGIN = {
    email_invalido: "Confira o e-mail.", nome_invalido: "Digite seu nome.", senha_curta: "A senha precisa ter pelo menos 8 caracteres.",
    ja_cadastrado: "Esse e-mail já tem conta. Toque em Entrar.", senha_errada: "E-mail ou senha incorretos.",
    muitas_tentativas: "Muitas tentativas. Espere 15 minutos e tente de novo.",
  };
  document.addEventListener("submit", async (ev) => {
    if (ev.target.id !== "form-login") return;
    ev.preventDefault();
    const f = ev.target, btn = f.querySelector("button[type=submit]"), erro = $("#login-erro");
    const dados = Object.fromEntries(new FormData(f));
    erro.textContent = ""; btn.disabled = true; btn.style.opacity = ".7";
    try {
      const r = await fetch("/api/auth", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ acao: loginModo, ...dados }) });
      const d = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(ERROS_LOGIN[d.erro] || "Não foi possível entrar agora. Tente de novo.");
      S.sessao = d.token; loginModo = null;
      entrar({ nome: d.nome, primeiro: d.nome.split(" ")[0], foto: null, email: d.email });
    } catch (e) {
      erro.textContent = e.message || "Sem conexão. Tente de novo.";
      btn.disabled = false; btn.style.opacity = "";
    }
  });

  /* ---------- Login com Google ---------- */
  function entrar(user) {
    S.logado = true; S.user = user; save();
    location.hash = S.onboarded ? "#/home" : "#/onboarding";
  }
  function loginGoogle(btn) {
    if (!(window.google && google.accounts && google.accounts.oauth2)) { toast("Carregando o login do Google… tente de novo."); return; }
    const reset = () => { btn.disabled = false; btn.style.opacity = ""; };
    btn.disabled = true; btn.style.opacity = ".7";
    const client = google.accounts.oauth2.initTokenClient({
      client_id: GOOGLE_CLIENT_ID,
      scope: "openid profile email",
      callback: async (resp) => {
        if (resp.error) { reset(); toast("Login cancelado."); return; }
        guardarToken(resp);
        try {
          const r = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", { headers: { Authorization: `Bearer ${resp.access_token}` } });
          if (!r.ok) throw new Error(r.status);
          const u = await r.json();
          const nome = u.name || u.given_name || "Atleta";
          entrar({ nome, primeiro: u.given_name || nome.split(" ")[0], foto: u.picture || null });
        } catch { reset(); toast("Não foi possível entrar com o Google."); }
      },
      error_callback: () => { reset(); toast("Login cancelado."); },
    });
    client.requestAccessToken();
  }

  /* Token do Google: guardado só nesta aba (sessionStorage), usado para o Coach AI provar que é você. */
  const TK = "fitai-gtoken";
  function guardarToken(resp) {
    try { sessionStorage.setItem(TK, JSON.stringify({ t: resp.access_token, exp: Date.now() + (Number(resp.expires_in) || 3600) * 1000 - 60000 })); } catch {}
  }
  function pegarToken() {
    try { const g = JSON.parse(sessionStorage.getItem(TK) || "null"); if (g && g.exp > Date.now()) return Promise.resolve(g.t); } catch {}
    if (!(window.google && google.accounts && google.accounts.oauth2)) return Promise.resolve(null);
    return new Promise((ok) => {
      google.accounts.oauth2.initTokenClient({
        client_id: GOOGLE_CLIENT_ID, scope: "openid profile email",
        callback: (resp) => { if (resp.error) return ok(null); guardarToken(resp); ok(resp.access_token); },
        error_callback: () => ok(null),
      }).requestAccessToken({ prompt: "" });
    });
  }

  /* ---------- Cliques ---------- */
  document.addEventListener("click", (e) => {
    const t = e.target.closest("button, a");
    if (!t) return;
    if (t.id === "google") loginGoogle(t);
    else if (t.id === "visitante") entrar(null);
    else if (t.id === "email-login") { loginModo = "entrar"; render(); }
    else if (t.id === "voltar-login") { loginModo = null; render(); }
    else if (t.dataset.modo) { loginModo = t.dataset.modo; render(); }
    else if (t.id === "sair") { S.logado = false; S.user = null; S.sessao = null; save(); chatLog = []; location.hash = "#/login"; }
    else if (t.id === "iniciar") t.textContent = toggleTimer();
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
      const blob = new Blob([JSON.stringify({ app: "fitai", versao: 1, inicio: S.inicio, perfil: S.perfil, logs: S.logs }, null, 2)], { type: "application/json" });
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
    if (e.target.id !== "arquivo" || !e.target.files[0]) return;
    try {
      const d = JSON.parse(await e.target.files[0].text());
      if (d.app !== "fitai" || typeof d.logs !== "object") throw 0;
      S.logs = { ...S.logs, ...d.logs }; if (d.inicio) S.inicio = d.inicio; if (d.perfil) S.perfil = { ...S.perfil, ...d.perfil };
      save(); render(); toast("Backup importado ✓");
    } catch { toast("Arquivo de backup inválido."); }
  });
  $(".chat-backdrop").addEventListener("click", () => closeChat());
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeChat(); });

  /* ---------- Chat (Coach AI) ---------- */
  const layer = $("#chat-layer"), msgsEl = $("#chat-msgs"), chipsEl = $("#chat-chips");
  const CHIPS_PADRAO = ["Treino de hoje", "Minha evolução", "Como funciona o programa?"];
  let chatLog = [];
  let busy = false;

  const bubbleHTML = (m) => `<div class="msg${m.me ? " me" : ""}"><div class="bubble">${m.html}</div></div>`;
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
  }
  function openChat(pergunta) {
    layer.hidden = false;
    layer.classList.remove("closing");
    if (!chatLog.length) chatLog.push({ html: `Olá, ${esc(primeiroNome())}! Sou seu Coach AI. Posso explicar a execução dos exercícios, mostrar sua evolução ou o treino de hoje.`, me: false });
    msgsEl.innerHTML = chatLog.map(bubbleHTML).join("");
    msgsEl.scrollTop = msgsEl.scrollHeight;
    if (!chipsEl.children.length) setChips(chipsEl, CHIPS_PADRAO);
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
    return `${e.nome} [${e.id}]: ${e.un === "tiro" ? `${e.s} tiros de 200 m (tempo em s, menor é melhor)` : `${e.s}×${alvo}${e.un === "reps" ? " reps" : " " + e.un}${e.lado ? " por lado" : ""}`}${e.obs ? ` — ${e.obs}` : ""}`;
  }
  function programaTexto() {
    const sem = PROGRAMA.map((s, w) => [`## Semana ${w + 1} · ${s.nome}`, s.nota.replace(/<[^>]+>/g, ""),
      ...s.dias.map((t, d) => `### ${DIAS[d]} · ${t.foco} · ${t.titulo}${t.obs ? ` (${t.obs})` : ""}\n${(t.ex || []).map((e) => "- " + linhaEx(e)).join("\n")}`)].join("\n"));
    return [`# Programa: ${NOME_PROG}`, ...sem, `## Treino de emergência (15 min)\n${EMERGENCIA.ex.map((e) => "- " + linhaEx(e)).join("\n")}`,
      CICLO].join("\n\n");
  }
  function contextoTexto(comCorridas) {
    const { w, d } = ativoHoje(), t = treino(w, d);
    const P = S.perfil, out = [];
    out.push(`Hoje: ${DIAS[hojeDia]}, ${hojeKey}. ${nomeSemana(w)}, ciclo ${cicloDe(hoje)}. Treino de hoje: ${t ? t.titulo : "—"}.`);
    out.push(`Perfil: ${P.peso || "?"} kg, ${P.altura || "?"} cm, ${P.idade || "?"} anos. Sequência atual: ${sequencia()} dias. Treinos concluídos: ${treinosFeitos()}.`);
    const lh = logHoje();
    if (lh) out.push(`Registrado hoje (${lh.done ? "concluído" : "em andamento"}): ${Object.entries(lh.sets || {}).filter(([, v]) => v.length).map(([id, v]) => `${EXI[id]?.nome || id} ${v.join("+")}`).join("; ") || "nada ainda"}.`);
    const dias = Object.keys(S.logs).sort().filter((k) => k < hojeKey).slice(-21);
    out.push("Últimos treinos:");
    out.push(dias.length ? dias.map((k) => { const l = S.logs[k], tt = treino(l.w, l.d);
      return `- ${k} ${tt ? tt.titulo : ""}${l.done ? "" : " (incompleto)"}: ${Object.entries(l.sets || {}).filter(([, v]) => v.length).map(([id, v]) => `${EXI[id]?.nome || id} ${v.join("+")}`).join("; ") || "sem séries"}`; }).join("\n") : "- nenhum registro ainda");
    const recs = TODOS_EX.filter((e) => historico(e.id).length).map((e) => { const h = historico(e.id), u = UN[e.un] || "";
      return `- ${e.nome}: recorde ${recorde(e.id)}${u} (${menorMelhor(e.id) ? "melhor tiro" : "melhor série"}), último total ${h[h.length - 1].total}${u} em ${h[h.length - 1].k}, ${h.length} treinos`; });
    if (recs.length) out.push("Recordes por exercício:\n" + recs.join("\n"));
    const cs = comCorridas ? corridas().slice(0, 10) : [];
    if (comCorridas) out.push("Corridas do Strava:\n" + (cs.length ? cs.map((c) => `- ${c.data} ${c.nome}: ${km(c.dist)} km, ${fmtDur(c.tempo)}, ritmo ${ritmo(c.tempo, c.dist)}/km${c.fc ? `, FC ${Math.round(c.fc)}` : ""}`).join("\n") : "- nenhuma sincronizada"));
    return out.join("\n");
  }
  async function coachIA() {
    // Logado com Google: manda o token (se for o dono, o servidor usa o modelo completo). Visitante: vai sem token.
    const token = S.sessao || (S.user ? await pegarToken() : null);
    const mensagens = chatLog.filter((m) => m.txt).map((m) => ({ role: m.me ? "user" : "assistant", content: m.txt }));
    const stop = typing(msgsEl);
    let r;
    try {
      r = await fetch("/api/coach", { method: "POST", headers: { "content-type": "application/json", ...(token ? { authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({ mensagens, programa: programaTexto(), contexto: contextoTexto(!!token) }) });
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
      `Aqui você segue o ${esc(NOME_PROG)}, registra as repetições de cada série e acompanha sua evolução semana a semana — com uma IA disponível 24h para te guiar em cada exercício.`,
      "Vamos configurar seu perfil?",
    ];
    for (const [i, m] of intro.entries()) await falar(m, i === 1 ? 1000 : 600);
    setChips(chips, ["Começar!"], true);

    async function responder(txt) {
      const t = norm(txt);
      if (etapa === "inicio") {
        etapa = "semana"; chips.innerHTML = "";
        addMsg(box, esc(txt), true);
        await falar(`Em qual semana do ${esc(NOME_PROG)} você está agora?`);
        setChips(chips, SEMANAS);
      } else if (etapa === "semana") {
        addMsg(box, esc(txt), true);
        const n = Number((t.match(/[1-4]/) || [])[0]);
        if (!n) return falar("Toque em uma das semanas abaixo. 😉");
        S.inicio = keyOf(addDays(mondayOf(hoje), -(n - 1) * 7));
        etapa = "fim"; chips.innerHTML = "";
        const tr = treino(n - 1, hojeDia);
        await falar(`Perfeito! Hoje é <b>${DIAS[hojeDia]} da Semana ${n}</b>: <b>${esc(tr.titulo)}</b>. Em cada exercício, anote as repetições de cada série. Eu comparo com o treino anterior e te mostro a evolução. 🔥`, 1100);
        setChips(chips, ["Ver treino de hoje"], true);
      } else if (etapa === "fim") {
        S.onboarded = true; save(); location.hash = "#/home";
      }
    }
    chips.addEventListener("click", (e) => { const c = e.target.closest("[data-chip]"); if (c) responder(c.dataset.chip); });
    form.addEventListener("submit", (e) => { e.preventDefault(); const i = $("#ob-input"); if (i.value.trim()) responder(i.value.trim()); i.value = ""; });
  }

  render();
})();
