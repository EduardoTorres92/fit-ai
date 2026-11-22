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
  // Fotos dos cards (assets/cards): várias por tipo; a variante sai de um hash do nome, para não repetir a mesma foto em todo card
  const C = (n) => `cards/${n}.jpg`;
  const varia = (lista, chave) => { let h = 0; for (const ch of String(chave)) h = (h * 31 + ch.charCodeAt(0)) >>> 0; return lista[h % lista.length]; };
  const IMG = { Empurrar: ["calistenia-paralelas"], Superior: ["calistenia-paralelas", "calistenia-barra"], Puxar: ["calistenia-barra"], Pernas: ["forca-1", "potencia-1"],
    Perna: ["forca-1", "potencia-1"], Inferior: ["forca-1", "potencia-1"], Core: ["core-1", "core-2"], Tiro: ["cardio-2", "cardio-1"] };
  const imgDe = (t) => A(C(varia(IMG[t.foco] || ["forca-1", "calistenia-barra", "core-2"], t.titulo)));
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
  // "Hoje" é calculado ao abrir o app. Aba ou app aberto desde ontem (comum no tablet e no app instalado):
  // o treino de hoje seria anotado no dia errado. Quando a data muda, recarrega (o vídeo aberto reabre sozinho).
  function conferirDia() {
    if (document.visibilityState !== "visible" || keyOf(new Date()) === hojeKey) return;
    if (document.querySelector("dialog[open]:not(#video-dlg)") || cfTm) return; // com o timer do CrossFit rodando, espera ele parar (o intervalo confere de novo)
    location.reload();
  }
  document.addEventListener("visibilitychange", conferirDia);
  window.addEventListener("focus", conferirDia);
  setInterval(conferirDia, 60000);

  /* ---------- Programas em vídeo (public/insanity.js = MAX:30, public/insanity60.js = Insanity) ----------
     Cada um tem uma chave (k) que também é a chave do estado (S[k]), da rota (#/k/semana/dia) e do campo
     "programa" no Supabase. O MAX:30 usa "insanity" para continuar lendo os registros antigos. */
  const VPROGS = [window.FITAI_INSANITY, window.FITAI_INSANITY60].filter((p) => p && p.semanas && p.semanas.length);
  VPROGS.forEach((p) => { p.k = p.k || "insanity"; p.trocas = p.trocas || {}; p.trocaAte = p.trocaAte ?? 0; p.curto = p.curto || p.nome; });
  const VP = Object.fromEntries(VPROGS.map((p) => [p.k, p]));
  const VKEYS = VPROGS.map((p) => p.k);
  const vazioVP = () => ({ inicio: null, logs: {} });
  const vazioIA = () => ({ perfil: {}, etapa: 0, plano: null, inicio: null, logs: {}, checkins: [], msgs: [] });
  const IA_KEYS = ["hiper", "c21", "run"]; // programas montados pelo Coach AI (o motor fica mais abaixo)
  // Catálogo em ordem de nível: o caminho natural é do primeiro ao último (MAX:30 → Insanity → calistenia)
  // Hipertrofia (academia) é um programa à parte: entra no catálogo (dá para escolher como principal), mas não no caminho de níveis
  const HIPER = { k: "hiper", nome: "Hipertrofia", curto: "Hipertrofia", nivel: "Academia", ordem: 99, extra: true,
    sobre: "Musculação na academia: o Coach AI faz uma entrevista (objetivo, dias, experiência, peso) e monta o treino semanal, com registro de carga e repetições, vídeo de execução em cada exercício e revisão semanal do plano." };
  const C21 = { k: "c21", nome: "Calistenia 21 dias", curto: "21 dias", nivel: "Montado pelo Coach", ordem: 98, extra: true,
    sobre: "Calistenia de resistência em 3 semanas, montada pelo Coach AI no seu nível a partir dos treinos do treinador: circuitos com peso do corpo ou barra fixa, contador de voltas e cronômetro." };
  const RUNP = { k: "run", nome: "Corrida e Híbrido", curto: "Corrida", nivel: "Montado pelo Coach", ordem: 96, extra: true,
    sobre: "Corrida do primeiro trote à meia maratona, ou treino híbrido: o Coach AI mistura corrida (rodagem, tiros, longão) com força na academia ou com o peso do corpo, no seu nível e nos seus dias." };
  const CF = { k: "cf", nome: "CrossFit", curto: "CrossFit", nivel: "Box ou garagem", ordem: 97, extra: true,
    sobre: "O WOD do dia do seu box: tire uma foto do quadro e a IA lança o treino (blocos, formato, movimentos e cargas); cronômetro de For Time, AMRAP, EMOM e Tabata, resultado RX/Scaled e recordes nos WODs repetidos. Sem box, o Coach monta um WOD." };
  const CATALOGO = [...VPROGS, CALI, ...(window.FITAI_CAL21 ? [C21] : []), ...(window.FITAI_ACADEMIA ? [HIPER] : []), ...(window.FITAI_CORRIDA ? [RUNP] : []), CF].sort((a, b) => (a.ordem || 9) - (b.ordem || 9));
  const TRILHA = CATALOGO.filter((x) => !x.extra); // caminho natural de níveis
  const progDe = (k) => CATALOGO.find((x) => x.k === k) || null;
  const NIVEIS = [
    ["Iniciante", "Estou começando ou voltando agora"],
    ["Intermediário", "Já treino com regularidade"],
    ["Avançado", "Treino pesado há tempo (faço barra)"],
  ];
  const recomendado = (nivel) => (!donoAtivo() && VP.insanity ? VP.insanity : TRILHA.find((x) => x.nivel === nivel) || TRILHA[0]);
  const caminhoTxt = () => TRILHA.map((x) => x.nome).join(" → ");
  // Programa de vídeo começa na segunda desta semana; de sexta em diante, na próxima segunda
  const inicioNovo = () => keyOf(hojeDia >= 4 ? addDays(mondayOf(hoje), 7) : mondayOf(hoje));
  function escolherPrograma(k) {
    S.principal = k;
    if (VP[k] && !S[k].inicio) S[k].inicio = inicioNovo();
    save();
  }

  /* Visão de usuário comum (só o dono liga, no Perfil): as funções do servidor tratam a conta como membro
     (Coach com o modelo e o limite de membro, Hipertrofia, CrossFit e Evolução). /api/videos e /api/telegram continuam como dono. */
  {
    const f0 = window.fetch.bind(window);
    window.fetch = (u, o = {}) => {
      if (typeof u === "string" && /^\/api\/(coach|hiper|wod|evolucao)\b/.test(u) && (() => { try { return JSON.parse(localStorage.getItem("fitai-state-v1") || "{}").verComoMembro; } catch { return false; } })())
        o = { ...o, headers: { ...(o.headers || {}), "x-fitai-membro": "1" } };
      return f0(u, o);
    };
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
      for (const k of IA_KEYS) {
        s[k] = { ...vazioIA(), ...(s[k] || {}) };
        if (!s[k].logs || typeof s[k].logs !== "object") s[k].logs = {};
      }
      s.cf = { logs: {}, perfil: {}, ...(s.cf || {}) };
      s.corrida = { logs: {}, ...(s.corrida || {}) };
      if (!s.corrida.logs || typeof s.corrida.logs !== "object") s.corrida.logs = {};
      if (!s.cf.logs || typeof s.cf.logs !== "object") s.cf.logs = {};
      if (s.user && !s.user.id) { s.logado = false; s.user = null; s.sessao = null; } // login antigo (antes do Supabase): entra de novo
      return s;
    } catch { return { ...padrao, ...Object.fromEntries(VKEYS.map((k) => [k, vazioVP()])), ...Object.fromEntries(IA_KEYS.map((k) => [k, vazioIA()])), cf: { logs: {}, perfil: {} }, corrida: { logs: {} } }; }
  }
  let CACHE_CHEFES = null; // chefes calculados do histórico (zera a cada save)
  function save() { CACHE_CHEFES = null; try { localStorage.setItem(KEY, JSON.stringify(S)); } catch {} if (typeof agendarSync === "function") agendarSync(); }

  const semanasDesde = (d) => Math.floor(diffDays(parseKey(S.inicio), d) / 7);
  const semanaDe = (d) => { const n = semanasDesde(d); return n < 0 ? -1 : n % PROGRAMA.length; };
  const cicloDe = (d) => Math.max(0, Math.floor(semanasDesde(d) / PROGRAMA.length)) + 1;
  const treino = (w, d) => (w === "E" ? (d === 0 ? EMERGENCIA : null) : PROGRAMA[w] ? PROGRAMA[w].dias[d] : null);
  const nomeSemana = (w) => (w === "E" ? "Treino de emergência" : `Semana ${w + 1} · ${PROGRAMA[w].nome}`);
  const logHoje = () => S.logs[hojeKey];
  const ativoHoje = () => { const l = logHoje(); if (l) return { w: l.w, d: l.d }; const w = semanaDe(hoje); return { w: Math.max(w, 0), d: hojeDia }; };
  const soma = (a) => a.reduce((x, y) => x + y, 0);
  const feito = (k) => !!(S.logs[k] && S.logs[k].done) || VKEYS.some((p) => insFeito(p, k)) || iaFeito(k) || !!S.cf?.logs[k]?.done;
  const parcial = (k) => !!(S.logs[k] && Object.values(S.logs[k].sets || {}).some((s) => s.length)) || VKEYS.some((p) => insParcial(p, k)) || iaParcial(k) || !!S.cf?.logs[k]?.wod;
  const diasVideo = () => [...VKEYS.flatMap((p) => Object.keys(S[p].logs)), ...iaDiasComLog(), ...Object.keys(S.cf?.logs || {})]; // dias dos programas fora da calistenia
  const principal = () => (S.principal && progDe(S.principal) ? S.principal : "plano");

  function sequencia() {
    let d = feito(hojeKey) ? hoje : addDays(hoje, -1), c = 0;
    while (feito(keyOf(d))) { c++; d = addDays(d, -1); }
    return c;
  }
  const treinosFeitos = () => [...new Set([...Object.keys(S.logs), ...diasVideo()])].filter(feito).length;
  const tempoTotal = () => soma(Object.values(S.logs).map((l) => l.dur || 0)) + soma(VKEYS.flatMap((p) => Object.values(S[p].logs)).map((l) => minVideo(l) * 60)) + iaMinTotal() * 60;
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
  // Estrutura dos vídeos do MAX:30 (exercícios, rodadas e tempos aproximados), de insanity-estrutura.js
  const EST = window.FITAI_MAX30_ESTRUTURA || {};
  const estHtml = (id) => { const e = EST[id]; if (!e) return "";
    return `<details class="ins-est"><summary>Ver exercícios e tempos</summary>
      <p class="ex-obs">${esc(e.formato)}${e.obs ? ` ${esc(e.obs)}` : ""}</p>
      <ol class="est-lista">${e.blocos.map(([t, b]) => `<li>${t ? `<span class="est-t">${esc(t)}</span>` : ""}<span>${esc(b)}</span></li>`).join("")}</ol>
      <p class="ex-obs">Tempos com "~" são aproximados.</p></details>`; };
  const estTexto = (P) => { const vs = P.videos.filter((v) => EST[v.id]); if (!vs.length) return "";
    return [`## Estrutura dos vídeos do ${P.nome} (tempos aproximados desde o início do vídeo; use para saber em que exercício a pessoa estava no Max Out)`,
      ...vs.map((v) => { const e = EST[v.id]; return `### ${v.nome} (${e.duracao})\n${e.formato}${e.obs ? ` ${e.obs}` : ""}\n${e.blocos.map(([t, b]) => `- ${t ? `${t} ` : ""}${b}`).join("\n")}`; })].join("\n"); };
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
  // Menu: um botão só (abre a Circular Navigation) + o Coach AI ao lado
  const MENU_ITENS = () => [
    { name: "Início", icon: "house", href: "#/home", tab: "home" },
    { name: "Treinos", icon: "calendar-days", href: `#/${principal()}`, tab: "plano" },
    { name: "CrossFit", icon: "dumbbell", href: "#/cf", tab: "cf" },
    { name: "Nutrição", icon: "apple", href: "#/nutricao", tab: "nutricao" },
    { name: "Coach AI", icon: "sparkles", href: "#/coach", tab: "coach" },
    { name: "Evolução", icon: "chart-column", href: "#/evolucao", tab: "evolucao" },
    { name: "Grupo", icon: "users", href: "#/grupo", tab: "grupo" },
    { name: "Perfil", icon: "user", href: "#/perfil", tab: "perfil" },
  ];
  let tabAtual = "home", menuNav = null;
  function setToolbar(tab) {
    const tb = $("#toolbar"), sb = $("#sidebar");
    tb.hidden = !tab; sb.hidden = !tab;
    document.body.classList.toggle("com-menu", !!tab); // no tablet e no computador, o menu vira barra lateral
    if (!tab) return;
    tabAtual = tab === "evolucao" && location.hash.startsWith("#/grupo") ? "grupo" : tab;
    const itens = MENU_ITENS(), it = itens.find((x) => x.tab === tabAtual);
    $("#tb-atual").textContent = it ? it.name : "Menu";
    if (window.CircularNav) $("#sb-links").innerHTML = itens.filter((x) => x.tab !== "coach").map((x) =>
      `<a href="${x.href}" class="sb-link${x.tab === tabAtual ? " on" : ""}"${x.tab === tabAtual ? ' aria-current="page"' : ""}>${window.CircularNav.icone(x.icon, "sb-ic")}<span>${x.name}</span></a>`).join("");
  }
  function abrirMenu() {
    if (!window.CircularNav) return;
    const itens = MENU_ITENS();
    menuNav = window.CircularNav.criar({
      itens, label: "Navegação do Fit.ai", closeLabel: "Fechar navegação",
      onNavigate: (item, e) => {
        if (item.tab === "coach") { e.preventDefault(); setTimeout(() => openChat(), 420); }
      },
    });
    const btn = $("#tb-menu");
    btn.setAttribute("aria-expanded", "true");
    menuNav.abrir(itens.find((x) => x.tab === tabAtual)?.href);
    const obs = setInterval(() => { if (!menuNav.aberto) { btn.setAttribute("aria-expanded", "false"); clearInterval(obs); } }, 300);
  }
  document.addEventListener("click", (e) => { if (e.target.closest("#tb-menu")) abrirMenu(); });

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
  const INS_IMG = { Cardio: ["cardio-1", "cardio-2"], Intervalos: ["cardio-2", "cardio-1"], Tabata: ["potencia-1", "potencia-2"], Potência: ["potencia-2", "potencia-1"], Pliometria: ["potencia-1"],
    Teste: ["teste-1"], Core: ["core-2", "core-1"], Abdômen: ["core-1", "core-2"], Força: ["forca-1"], Luta: ["luta-1"], Recuperação: ["recuperacao-1"] };
  const progSwitch = (on) => {
    const abas = [["plano", NOME_PROG], ...VPROGS.map((p) => [p.k, VPROGS.length > 1 ? p.curto : p.nome]), ...IAK.map((k) => [k, progDe(k)?.curto || IA[k].nome]), ["cf", "CrossFit"]].filter(([k]) => liberado(k));
    const rolar = abas.length > 4; // muitas abas: vira uma faixa que rola para o lado
    return `<nav class="seg prog${rolar ? " rolar" : ""}" aria-label="Programa" ${rolar ? "" : `style="grid-template-columns:repeat(${abas.length},1fr)"`}>
      ${abas.map(([r, nome]) => `<a href="#/${r}" class="${on === r ? "on" : ""}"${on === r ? ' aria-current="page"' : ""}>${esc(nome)}</a>`).join("")}</nav>`;
  };
  function insCard(p, w, d, { link = true } = {}) {
    const P = VP[p], t = insDia(p, w, d), tag = link ? "a" : "div";
    const min = soma(t.ids.map((id) => INSV[id].min || 0));
    const k = S[p].inicio ? insData(p, w, d) : null;
    const ok = k && insFeito(p, k);
    const meta = t.ids.length ? `<span>${icon("timer.svg")}${min ? `${min} min` : "vídeo"}</span><span>${icon("zap.svg")}${t.ids.length} ${t.ids.length > 1 ? "vídeos" : "vídeo"}</span>` : `<span>${t.fim ? "Programa concluído" : "Recupere o corpo"}</span>`;
    return `<${tag} class="wcard${t.ids.length ? "" : " pending"}" ${link && t.ids.length ? `href="#/${p}/${w}/${d}"` : ""} aria-label="${esc(P.nome)}, semana ${w + 1}, ${DIAS[d]}: ${esc(t.titulo)}">
      <img class="cover" src="${A(C(t.ids.length ? (INS_IMG[INSV[t.ids[0]].tipo] || ["cardio-1"])[(Math.floor(d / 2) + w) % (INS_IMG[INSV[t.ids[0]].tipo] || ["cardio-1"]).length] : "recuperacao-1"))}" alt="" loading="lazy">
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
    const boss = id === "cardio-challenge" || v.fitTest ? chefes().find((c) => c.k === (v.fitTest ? "shaunt-ft" : "shaunt-cc")) : null;
    return `${boss ? chefeBanner(boss, boss.derrotado ? "Chefe já derrotado · revanche" : "Dia de chefe!") : ""}<div class="ex ins${ok ? " done" : ""}" data-ins="${id}" data-kc="${k || ""}" data-ed="${editavel ? 1 : 0}">
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
      ${estHtml(id)}
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
      return `<section class="screen quiz" id="quiz"></section>`;
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
            <a class="btn btn-blue" href="${principal() === "plano" ? `#/treino/${w}/${d}` : principal() === "cf" ? "#/cf" : IA[principal()] ? iaLinkHoje(principal()) : linkHojeVideo(principal())}">Bora!</a>
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
          ${principal() === "cf" ? cfHome(true) : principal() === "plano" ? `<div class="sec-head"><h2>Treino de Hoje</h2><a href="#/plano">${nomeSemana(w)}${w !== "E" && cicloDe(hoje) > 1 ? ` · Ciclo ${cicloDe(hoje)}` : ""}</a></div>` : IA[principal()] ? iaHome(principal(), true) : treinoHojeVideo(principal())}
          ${parado ? `<p class="note retomada"><b>Voltou? 💪 Protocolo de retomada:</b> nem do zero, nem do máximo. Faça o treino de hoje dentro da sua capacidade atual e recupere o ritmo nos próximos dias.</p>` : ""}
          ${t && principal() === "plano" ? workoutCard(w, d) : ""}
          ${trilha() === "hibrido" && !donoAtivo() && IA[forcaHibrido()] && principal() !== forcaHibrido() ? iaHome(forcaHibrido(), false) : ""}
          ${temporadaHome()}
          ${missoesHome()}
          ${ativHome()}
          ${desafioHome()}
          ${grupoHome()}
          <div class="emerg agua-home"><span>💧</span><div><strong>Água: ${fmtL(aguaHoje())} de ${fmtL(nutriMetas().agua)}</strong><small>${S.aguaLembrete?.on ? `Lembrete a cada ${S.aguaLembrete.intervalo} min` : `<a href="#/nutricao" class="lnk">Ligar lembrete de água</a>`}</small></div><button class="btn btn-blue" data-agua="300">+300 ml</button></div>
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
        ${fichaMini()}
        <button type="button" class="evo-card" data-evo-foto><span class="stat-ico">${icon("camera.svg", 18)}</span>
          <span><strong>Evolução por foto</strong><span class="t">Check-in de frente e de lado a cada 15 dias. Só você vê.</span></span></button>
        <div class="section evo-dash">
          ${resumoEvo()}
          <div class="sec-head"><h2>Consistência</h2><span>meta ${metaSemana()} por semana</span></div>
          ${cartaoTreinos()}
          ${calendarioEvo()}
          ${cartaoMinutos()}
        </div>
        <div class="section evo-dash">
          <div class="sec-head"><h2>Equilíbrio do treino</h2><span>4 semanas</span></div>
          ${radarEquilibrio()}
        </div>
        <div class="section evo-dash">
          <div class="sec-head"><h2>Evolução nos movimentos</h2></div>
          ${radarMovimentos()}
          <div class="sec-head" style="margin-top:6px"><h2>Progresso por exercício</h2></div>
          ${cartaoExercicio()}
        </div>
        <div class="section"><div class="sec-head"><h2>Conquistas</h2></div>${medalhas()}</div>
        ${VPROGS.some((P) => P.maxOut) ? `<div class="section evo-dash"><div class="sec-head"><h2>Max Out · ${esc(NOMES_MAXOUT)}</h2></div><div id="max-box">${cartaoMaxOut()}</div></div>` : ""}
        ${VPROGS.filter((P) => P.fitTest && fitHist(P.k).length).map((P) => `<div class="section"><div class="sec-head"><h2>Fit Test · ${esc(P.nome)}</h2></div>${tabelaFitTest(P.k)}</div>`).join("")}
        ${secaoAtividades()}
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
            <button class="foto-btn" id="trocar-foto" aria-label="Trocar foto de perfil"><img src="${esc(fotoPerfil())}" alt="Foto de ${esc(nomeCompleto())}" referrerpolicy="no-referrer"><span class="foto-cam" aria-hidden="true">📷</span><img class="foto-classe" src="${classeImg(meuNivel().slug)}" alt="" aria-hidden="true"></button>
            <input type="file" id="foto-arquivo" accept="image/*" hidden>
            <div><button class="nome-btn" id="trocar-nome" ${S.user ? "" : "disabled"}><strong>${esc(nomeCompleto())}</strong></button><span>${uid && S.user?.email ? esc(S.user.email) : `${esc(NOME_PROG)} · Semana ${Math.max(w, 0) + 1}`}</span></div></div>
          ${nivelCard()}
          ${temporadaPerfilHtml()}
          ${ligasPerfilHtml(linhasLocais(), true, meuOpts())}
          ${uid ? "" : `<div class="note-box"><p>Você está como <b>visitante</b>: seus treinos ficam só neste aparelho. Entre com uma conta para salvar na nuvem, participar de grupos e aparecer no ranking.</p><button class="btn btn-blue" id="ir-login">Entrar ou criar conta</button></div>`}
          <div class="stats-grid">
            ${stat("weight.svg", P.peso || "—", "Peso (kg)", { edit: "peso" })}
            ${stat("ruler.svg", P.altura || "—", "Altura (cm)", { edit: "altura" })}
            ${stat("user-small.svg", P.idade || "—", "Idade (anos)", { edit: "idade" })}
            ${stat("circle-check.svg", treinosFeitos(), "Treinos feitos")}
          </div>
          ${trilhaHtml()}
          <div class="field">
            <span class="field-lbl">Aparência</span>
            <div class="tema-seg" role="group" aria-label="Tema">${[["claro", "☀️ Claro"], ["escuro", "🌙 Escuro"], ["auto", "Automático"]].map(([v, l]) => `<button type="button" data-tema="${v}" aria-pressed="${temaEscolhido() === v}">${l}</button>`).join("")}</div>
          </div>
          <div class="field">
            <span class="field-lbl">Seu programa principal</span>
            <div class="prog-cat">${CATALOGO.map((x, i) => `<button class="prog-opt${principal() === x.k ? " on" : ""}${travado(x.k) ? " lock" : ""}" data-principal="${x.k}"${travado(x.k) ? ' aria-disabled="true"' : ""}>
              <span class="po-n">${travado(x.k) ? "🔒" : i + 1}</span><span class="po-txt"><strong>${esc(x.nome)}</strong><small>${travado(x.k) ? esc(motivoTrava(x.k)[0].toUpperCase() + motivoTrava(x.k).slice(1)) : `${esc(x.nivel)}${S.nivel === x.nivel ? " · seu nível" : ""}`}</small></span>${principal() === x.k ? "<b>✓</b>" : ""}</button>`).join("")}</div>
          </div>
          <div class="perfil-rec">
            <div class="sec-head"><h2>Meus recordes</h2>${uid ? `<span>visíveis para o seu grupo</span>` : ""}</div>
            ${recordesHtml(linhasLocais(), "Registre o Max Out no MAX:30 ou faça o Fit Test do Insanity para ver seus recordes aqui.")}
          </div>
          <div class="field">
            <span class="field-lbl">Em qual semana do programa você está?</span>
            <div class="seg">${PROGRAMA.map((s, i) => `<button class="${i === w ? "on" : ""}" data-semana="${i}">${i + 1}</button>`).join("")}</div>
          </div>
          ${tgCard()}
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
     Programas montados pelo Coach AI: Hipertrofia (academia) e Calistenia 21 dias.
     Mesmo motor: entrevista no chat do Coach → /api/hiper monta o plano → registro de cada série (carga, repetições
     ou tempo) com contador de séries, cronômetro, descanso, grupos musculares, dicas/vídeo e revisão com o histórico.
     S[pk] = { perfil, etapa, plano, inicio, logs: { data: { d, w, sets: { id: [{ kg, r }] }, done } }, checkins, msgs, anterior, atualizado }
     plano.dias = [{ dia (0 = seg), semana? (só no 21 dias), titulo, foco, rodadas?, descansoRodada?, exercicios: [{ id, series, reps, descanso, obs }] }]
     ========================================================== */
  const ACAD = window.FITAI_ACADEMIA || [], CAL21 = window.FITAI_CAL21 || [];
  const IA = {};
  if (ACAD.length) IA.hiper = {
    k: "hiper", nome: "Hipertrofia", rotulo: "Academia", cat: ACAD, banner: "cards/academia-costas.jpg", semanas: 0, carga: true,
    convite: "Treino de academia feito para você", resumoConvite: "O Coach AI faz {n} perguntas rápidas (objetivo, dias, experiência, peso…) e monta seu plano semanal. Depois ele acompanha suas cargas e ajusta o treino toda semana. Cada exercício tem vídeo de execução.",
    intro: "Bora montar seu treino de academia", oQue: "seu plano semanal, com vídeo de execução em cada exercício",
    passos: [
      { k: "objetivo", q: "Qual é o seu principal objetivo?", op: ["Ganhar massa muscular", "Perder gordura", "Definir (perder gordura sem perder músculo)", "Ganhar força", "Saúde e condicionamento"] },
      { k: "experiencia", q: "Há quanto tempo você treina musculação?", op: ["Nunca treinei", "Menos de 6 meses", "De 6 meses a 2 anos", "Mais de 2 anos"] },
      { k: "dias", q: "Quantos dias por semana você consegue treinar?", op: ["2", "3", "4", "5", "6"], fmt: (v) => `${v} dias por semana` },
      { k: "diasSemana", q: "Quais dias ficam melhores?", multi: true },
      { k: "tempo", q: "Quanto tempo você tem para cada treino?", op: ["45 min", "1 hora", "1h15", "1h30"] },
      { k: "local", q: "Onde você vai treinar?", op: ["Academia completa", "Academia simples (poucos aparelhos)", "Em casa com halteres"] },
      { k: "foco", q: "Quer dar prioridade a alguma parte do corpo?", op: ["Equilibrado", "Peito e braços", "Costas e ombros", "Pernas e glúteos", "Abdômen"] },
      { k: "sexo", q: "Para calibrar volume e cargas: qual o seu sexo?", op: ["Masculino", "Feminino", "Prefiro não dizer"] },
      { k: "idade", q: "Qual a sua idade?", num: [14, 99], un: "anos", perfil: "idade" },
      { k: "peso", q: "Qual o seu peso hoje, em kg?", num: [30, 300], un: "kg", perfil: "peso" },
      { k: "altura", q: "E a sua altura, em cm?", num: [120, 230], un: "cm", perfil: "altura" },
      { k: "limitacoes", q: "Tem alguma dor, lesão ou exercício que você não pode fazer? Se tiver, escreva no campo abaixo.", op: ["Nenhuma"], livre: true },
      { k: "extra", q: "Quer me contar mais alguma coisa? Rotina, cardio, exercício que ama ou odeia… Se não, é só tocar no botão.", op: ["Não, pode montar!"], livre: true },
    ],
  };
  if (CAL21.length) IA.c21 = {
    k: "c21", nome: "Calistenia 21 dias", rotulo: "Calistenia 21 dias", cat: CAL21, banner: "cards/calistenia-barra.jpg", semanas: 3, carga: false,
    convite: "Calistenia em 21 dias, montada para você", resumoConvite: "O Coach AI faz {n} perguntas (nível, objetivo, equipamento, dias…) e monta 3 semanas com base no material do treinador: circuitos de 21 dias, Roteiro de Fortalecimento (para chegar às primeiras barras e flexões) e Calendário Calistênico (habilidades). Você marca cada série ou volta, o tempo das isometrias e vê a evolução.",
    intro: "Bora montar sua Calistenia 21 dias", oQue: "3 semanas de circuitos no seu nível, baseadas nos treinos do treinador",
    passos: [
      { k: "nivel", q: "Qual o seu nível hoje?", op: ["Iniciante: ainda não faço 4–6 barras ou 15–20 flexões", "Intermediário: faço 4–6 barras e 15–20 flexões", "Avançado: faço mais de 10 barras e já treino habilidades"] },
      { k: "objetivo", q: "Qual o seu objetivo nesses 21 dias?", op: ["Resistência muscular", "Perder gordura", "Ganhar força (primeira barra, mais flexões)", "Aprender habilidades (parada de mão, front lever, planche, muscle up)", "Condicionamento e saúde"] },
      { k: "equipamento", q: "O que você tem para treinar?", op: ["Só peso do corpo", "Tenho barra fixa", "Barra fixa e paralelas"] },
      { k: "dias", q: "Quantos dias por semana você vai treinar?", op: ["3", "4", "5", "6"], fmt: (v) => `${v} dias por semana` },
      { k: "diasSemana", q: "Quais dias ficam melhores?", multi: true },
      { k: "tempo", q: "Quanto tempo você tem por treino?", op: ["20 min", "30 min", "45 min"] },
      { k: "foco", q: "Quer dar prioridade a alguma parte?", op: ["Corpo todo", "Superior (peito, costas e braços)", "Pernas e glúteos", "Abdômen e core"] },
      { k: "sexo", q: "Para calibrar o volume: qual o seu sexo?", op: ["Masculino", "Feminino", "Prefiro não dizer"] },
      { k: "idade", q: "Qual a sua idade?", num: [14, 99], un: "anos", perfil: "idade" },
      { k: "peso", q: "Qual o seu peso hoje, em kg?", num: [30, 300], un: "kg", perfil: "peso" },
      { k: "altura", q: "E a sua altura, em cm?", num: [120, 230], un: "cm", perfil: "altura" },
      { k: "limitacoes", q: "Tem alguma dor ou lesão (punho, ombro, joelho…)? Se tiver, escreva no campo abaixo.", op: ["Nenhuma"], livre: true },
      { k: "extra", q: "Quer me contar mais alguma coisa? Se não, é só tocar no botão.", op: ["Não, pode montar!"], livre: true },
    ],
  };
  // Corrida e Híbrido: sessões de corrida + força do corredor + academia e calistenia (o Coach mistura os estilos)
  const RUNC = window.FITAI_CORRIDA || [];
  if (RUNC.length) {
    const ids = new Set([...RUNC, ...CAL21].map((e) => e.id));
    IA.run = {
      k: "run", nome: "Corrida e Híbrido", rotulo: "Corrida", cat: [...RUNC, ...CAL21, ...ACAD.filter((e) => !ids.has(e.id))], banner: "cards/cardio-1.jpg", semanas: 0, carga: true,
      cargaEx: (c) => ["barra", "halter", "maquina", "polia"].includes(c?.equip),
      convite: "Corrida ou treino híbrido feito para você", resumoConvite: "O Coach AI faz {n} perguntas (nível, objetivo, prova, dias, onde treina força…) e monta a sua semana misturando corrida (rodagem, tiros, longão) com força na academia ou com o peso do corpo. Você anota os minutos de cada corrida e o tempo de cada tiro, e manda o print do Strava ou do relógio para virar XP.",
      intro: "Bora montar sua corrida", oQue: "sua semana de corrida e força, no seu nível",
      passos: [
        { k: "nivel", q: "Como está a sua corrida hoje?", op: ["Nunca corri ou estou voltando", "Corro até 5 km", "Corro 10 km", "Já fiz meia maratona ou mais"] },
        { k: "objetivo", q: "Qual é o seu objetivo?", op: ["Começar a correr", "Completar 5 km", "Completar 10 km", "Meia maratona (21 km)", "Melhorar o meu tempo", "Híbrido: correr e ganhar força", "Prova híbrida (HYROX)", "Perder gordura"] },
        { k: "pace", q: "Sabe o seu tempo em 5 km ou o seu ritmo médio? Escreva abaixo (ex.: 30 min, 6:00/km).", op: ["Não sei"], livre: true },
        { k: "forca", q: "E a força, onde você treina?", op: ["Academia", "Em casa com halteres", "Só peso do corpo", "Barra fixa e peso do corpo", "Só quero correr"] },
        { k: "dias", q: "Quantos dias por semana você consegue treinar (corrida + força)?", op: ["3", "4", "5", "6"], fmt: (v) => `${v} dias por semana` },
        { k: "diasSemana", q: "Quais dias ficam melhores?", multi: true },
        { k: "tempo", q: "Quanto tempo você tem por treino?", op: ["30 min", "45 min", "1 hora", "1h30"] },
        { k: "sexo", q: "Para calibrar volume e ritmo: qual o seu sexo?", op: ["Masculino", "Feminino", "Prefiro não dizer"] },
        { k: "idade", q: "Qual a sua idade?", num: [14, 99], un: "anos", perfil: "idade" },
        { k: "peso", q: "Qual o seu peso hoje, em kg?", num: [30, 300], un: "kg", perfil: "peso" },
        { k: "altura", q: "E a sua altura, em cm?", num: [120, 230], un: "cm", perfil: "altura" },
        { k: "limitacoes", q: "Tem alguma dor ou lesão (joelho, canela, tornozelo, lombar…)? Se tiver, escreva no campo abaixo.", op: ["Nenhuma"], livre: true },
        { k: "extra", q: "Tem alguma prova marcada ou quer me contar mais alguma coisa? Se não, é só tocar no botão.", op: ["Não, pode montar!"], livre: true },
      ],
    };
  }
  const IAK = Object.keys(IA);
  for (const I of Object.values(IA)) I.ci = Object.fromEntries(I.cat.map((e) => [e.id, e]));
  const exDe = (pk, id) => IA[pk]?.ci[id] || null;
  /* Animações 3D de execução (certo × errado), em assets/anim/<arquivo>.mp4 + .jpg (capa).
     Academia: o arquivo tem o mesmo id do exercício. Calistenia: id do exercício → arquivo. */
  const ANIM_HIPER = "supino-reto-barra supino-reto-halteres supino-inclinado-halteres crucifixo-halteres crossover peck-deck paralelas puxada-frente barra-fixa remada-curvada remada-baixa remada-unilateral pulldown-corda levantamento-terra desenvolvimento-halteres elevacao-lateral crucifixo-inverso face-pull encolhimento rosca-direta rosca-alternada rosca-martelo rosca-scott triceps-corda triceps-testa triceps-frances agachamento-livre agachamento-goblet leg-press hack cadeira-extensora stiff afundo agachamento-bulgaro elevacao-pelvica cadeira-abdutora panturrilha-pe abdominal-supra mesa-flexora cadeira-flexora cadeira-adutora panturrilha-sentado esteira bike prancha abdominal-infra".split(" ");
  // Calistenia com GIF (arquivo cal-<id>)
  const ANIM_CAL = "polichinelo skipping pe-na-bunda false-rope deslocamento-lateral mountain-climbers burpee agachamento agachamento-salto agachamento-isometrico afundo-elevacao afundo-saltando passada-lateral agachamento-reverencia agachamento-chute salto-frontal pistol-suporte ponte flexao-joelhos flexao-inclinada flexao-declinada flexao-explosiva flexao-diamante flexao-pike flexao-pike-elevada flexao-handstand extensao-triceps-barra dip-coreana-iso caminhada-pike barra-supinada escapula-barra superman-hold isometria-topo-barra barra-assistida prancha prancha-lateral prancha-alcance prancha-joelho-cotovelo prancha-rotacao prancha-toque-ombro prancha-elevacao-perna prancha-alta-baixa prancha-alta-baixa-flexao side-crunch chair-crunch sit-up canivete toe-touches bike leg-raises leg-flutters canoa-hold flexao-hold afundo-explosivo".split(" ");
  const ANIM = {
    hiper: Object.fromEntries(ANIM_HIPER.map((id) => [id, id])),
    c21: null,
    _c21: { ...Object.fromEntries(ANIM_CAL.map((id) => [id, `cal-${id}`])), "agachamento-sumo": "agachamento-sumo", afundo: "afundo-peso-corpo", "step-up": "step-up", panturrilha: "panturrilha-cal", "panturrilha-unilateral": "panturrilha-cal",
      flexao: "flexao", barra: "barra-fixa", "barra-australiana": "barra-australiana", dips: "paralelas", "triceps-banco": "triceps-banco", crunch: "abdominal-supra" },
  };
  ANIM.c21 = ANIM._c21; delete ANIM._c21;
  ANIM.run = { ...ANIM.hiper, ...ANIM.c21, // no Corrida e Híbrido, a calistenia tem prioridade nos ids repetidos (o catálogo também)
    ...Object.fromEntries("regenerativo rodagem longao progressivo tempo fartlek tiro-100 tiro-200 tiro-400 tiro-800 tiro-1000 teste-5k strides".split(" ").map((x) => [`run-${x}`, "corr-corrida"])),
    "run-aquecimento": "corr-corrida-estacionaria", "run-caminhada-corrida": "corr-caminhada-rapida", "run-educativos": "corr-joelhos-altos", "run-wall-ball": "corr-wall-ball",
    "run-elevacao-pelvica-unilateral": "corr-ponte-unilateral", "run-stiff-unilateral": "corr-stiff-unilateral", "run-panturrilha-excentrica": "corr-panturrilha-uma-perna",
    "run-afundo-caminhando": "corr-afundo-caminhando", "run-bike": "bike", "run-esteira-inclinada": "esteira" };
  const animDe = (pk, id) => ANIM[pk]?.[id] || null;
  const fmtKg = (n) => String(Math.round(n * 10) / 10).replace(".", ",");
  const faixa = (r) => { const n = String(r).match(/\d+/g) || []; const a = +n[0] || 0; return [a, +(n[1] || a)]; };
  const ehMax = (r) => /m[aá]x/i.test(String(r));
  // Como a série é medida: "min" (cardio), "s" (tempo) ou "reps"
  function unDe(pk, ex) {
    const c = exDe(pk, ex.id);
    if (c?.equip === "cardio" || c?.equip === "corrida") return "min";
    if (c?.equip === "tiro") return "s";
    if (/\d\s*s\b|seg/i.test(ex.reps) || (ehMax(ex.reps) && c?.med === "s")) return "s";
    return "reps";
  }
  const fmtSet = (s, un) => (un === "min" ? `${s.r} min` : un === "s" ? `${s.kg ? `${fmtKg(s.kg)}kg · ` : ""}${s.r}s` : s.kg ? `${fmtKg(s.kg)}kg×${s.r}` : `${s.r} reps`);
  const fmtDesc = (s) => (s >= 60 ? `${Math.floor(s / 60)}${s % 60 ? `:${pad(s % 60)}` : ""} min` : `${s}s`);
  const maxKg = (sets) => Math.max(0, ...sets.map((s) => s.kg || 0));
  // Duração de um tiro: "400 m" (≈ 3,5 m/s), "1 km", "45 s" ou "2 min"
  const segTiro = (r) => { const t = String(r).toLowerCase(), [a] = faixa(t); return /km/.test(t) ? a * 290 : /min/.test(t) ? a * 60 : /\d\s*m\b/.test(t) ? Math.round(a / 3.5) : a || 30; };
  const minSess = (pk, t) => Math.round(soma(t.exercicios.map((e) => { const u = unDe(pk, e), [a] = faixa(e.reps);
    if (exDe(pk, e.id)?.equip === "tiro") return e.series * (segTiro(e.reps) + (e.descanso ?? 90));
    return u === "min" ? (a || 10) * 60 : e.series * ((u === "s" ? a || 30 : 40) + (e.descanso ?? 60)); })) / 60 + (t.rodadas ? ((t.rodadas - 1) * (t.descansoRodada || 60)) / 60 : 0));
  const gruposDe = (pk, t) => [...new Set(t.exercicios.map((e) => exDe(pk, e.id)?.grupo).filter((g) => g && g !== "Cardio"))];

  // Semana do programa (0 = primeira), contada das segundas a partir do início do plano
  const iaSemana = (pk) => (S[pk].inicio ? Math.floor(diffDays(mondayOf(parseKey(S[pk].inicio)), hoje) / 7) : 0);
  const iaAcabou = (pk) => IA[pk].semanas > 0 && iaSemana(pk) >= IA[pk].semanas;
  const iaSessao = (pk, d, w) => (S[pk].plano?.dias || []).find((x) => x.dia === d && (x.semana == null || x.semana === w)) || null;
  const iaSessoesSemana = (pk, w) => (S[pk].plano?.dias || []).filter((x) => x.semana == null || x.semana === w);
  const iaLogHoje = (pk) => S[pk].logs[hojeKey] || null;
  // O treino de hoje: o que já foi começado hoje ou o do calendário
  function iaHoje(pk) {
    const l = iaLogHoje(pk);
    if (l) return { d: l.d, w: l.w ?? 0 };
    const w = iaSemana(pk);
    if (iaAcabou(pk) || w < 0) return null;
    return iaSessao(pk, hojeDia, w) ? { d: hojeDia, w } : null;
  }
  const iaLink = (pk, d, w) => `#/${pk}/${d}/${w}`;
  const iaLinkHoje = (pk) => { const h = S[pk].plano && iaHoje(pk); return h ? iaLink(pk, h.d, h.w) : `#/${pk}`; };
  function iaFeito(k) { return IAK.some((pk) => !!S[pk]?.logs[k]?.done); }
  function iaParcial(k) { return IAK.some((pk) => { const l = S[pk]?.logs[k]; return !!l && Object.values(l.sets || {}).some((s) => s.length); }); }
  const iaDiasComLog = () => IAK.flatMap((pk) => Object.keys(S[pk].logs));
  // Minutos de um dia: tempo das séries + descanso; cardio conta os minutos anotados
  function iaMin(pk, l) {
    const t = iaSessao(pk, l.d, l.w ?? 0);
    let seg = 0;
    for (const [id, s] of Object.entries(l.sets || {})) {
      const ex = t?.exercicios.find((e) => e.id === id) || { id, reps: "", descanso: 60 }, u = unDe(pk, ex);
      if (u === "min") { seg += soma(s.map((x) => x.r || 0)) * 60; continue; }
      seg += soma(s.map((x) => (u === "s" ? x.r || 0 : 40) + (ex.descanso ?? 60)));
    }
    return Math.min(300, Math.round(seg / 60));
  }
  const iaMinTotal = () => soma(IAK.flatMap((pk) => Object.values(S[pk].logs).map((l) => iaMin(pk, l))));
  const iaHist = (pk, id) => Object.keys(S[pk].logs).sort().filter((k) => (S[pk].logs[k].sets?.[id] || []).length).map((k) => ({ k, sets: S[pk].logs[k].sets[id] }));
  const iaAnterior = (pk, id) => iaHist(pk, id).filter((h) => h.k < hojeKey).pop() || null;
  const iaRecorde = (pk, id) => Math.max(0, ...iaHist(pk, id).flatMap((h) => h.sets.map((s) => s.r || 0)));
  // Meta do dia a partir da última vez: carga (dupla progressão), repetições ou tempo
  function iaMeta(pk, ex) {
    const prev = iaAnterior(pk, ex.id), un = unDe(pk, ex);
    if (!prev || un === "min") return null;
    const [, mx] = faixa(ex.reps), kg = maxKg(prev.sets), rec = iaRecorde(pk, ex.id);
    if (un === "s") return { txt: mx && rec >= mx ? `Recorde: ${rec}s, acima do alvo de ${mx}s. Tente +5s hoje.` : `Seu recorde: ${rec}s${mx ? ` (alvo ${mx}s)` : ""}. Tente segurar mais.` };
    if (!kg) {
      if (ehMax(ex.reps)) return { txt: `Seu recorde no máximo: ${rec} reps. Bora bater!` };
      if (mx && prev.sets.length >= ex.series && prev.sets.every((s) => s.r >= mx)) return { txt: `Você bateu ${mx} reps em todas as séries. Some 2 reps ou peça ao Coach uma variação mais difícil.` };
      return { txt: `Última vez: ${prev.sets.map((s) => s.r).join(", ")} reps. Tente superar pelo menos uma série.` };
    }
    const topo = prev.sets.filter((s) => s.kg === kg);
    if (topo.length >= ex.series && topo.every((s) => s.r >= mx)) {
      const inc = exDe(pk, ex.id)?.equip === "halter" ? 2 : Math.max(2.5, Math.round((kg * 0.05) / 2.5) * 2.5);
      return { kg: kg + inc, txt: `Você bateu ${mx} reps em todas as séries: suba para ${fmtKg(kg + inc)} kg.` };
    }
    return { kg, txt: `Mantenha ${fmtKg(kg)} kg e busque ${mx} reps em todas as séries.` };
  }
  const iaSessFeita = (pk, t) => Object.entries(S[pk].logs).some(([k, l]) => l.done && l.d === t.dia && (t.semana != null ? (l.w ?? 0) === t.semana : k >= keyOf(mondayOf(hoje))));
  const IA_IMG = { // [academia, calistenia/corrida]
    corrida: [/corr|run\b|tiro|long[aã]o|rodagem|fartlek|\d\s?km|h[ií]brid|hyrox/i, ["cardio-1", "cardio-2"], ["cardio-2", "cardio-1"]],
    costas: [/costa|puxar|pull|barra|remada/i, ["academia-costas"], ["calistenia-barra"]], pernas: [/perna|inferior|gl[uú]te|lower|leg|agach/i, ["academia-pernas"], ["forca-1", "potencia-1"]],
    core: [/abd|core/i, ["core-1", "core-2"], ["core-2", "core-1"]], bracos: [/bra[çc]|b[ií]ceps|tr[ií]ceps/i, ["academia-bracos"], ["calistenia-paralelas"]],
    peito: [/peito|ombro|superior|push|upper|empurr|flex/i, ["academia-peito"], ["calistenia-paralelas"]], cardio: [/cardio|corpo|full|circuito|hiit/i, ["cross-1", "cardio-1"], ["potencia-2", "cardio-2"]] };
  const iaImg = (foco, pk = "hiper") => { const g = Object.values(IA_IMG).find(([re]) => re.test(foco)); const lista = g ? g[pk === "hiper" ? 1 : 2] : pk === "hiper" ? ["academia-peito", "academia-costas"] : ["calistenia-barra", "forca-1"]; return A(C(varia(lista, foco))); };

  function iaCard(pk, t, { link = true } = {}) {
    const tag = link ? "a" : "div", ok = iaSessFeita(pk, t), w = t.semana ?? 0, n = t.exercicios.length;
    const quando = t.semana != null ? `Dia ${w * 7 + t.dia + 1} · ${DIAS[t.dia]}` : DIAS[t.dia];
    return `<${tag} class="wcard" ${link ? `href="${iaLink(pk, t.dia, w)}"` : ""} aria-label="${quando}: ${esc(t.titulo)}">
      <img class="cover" src="${iaImg(t.foco + " " + t.titulo, pk)}" alt="" loading="lazy">
      <span class="pill glass">${icon("calendar-14.svg")}${quando} · ${esc(t.foco)}${ok ? " · ✓" : ""}</span>
      <div class="bottom"><div class="info"><h3>${esc(t.titulo)}</h3><div class="meta"><span>${icon("timer.svg")}~${minSess(pk, t)} min</span>
        <span>${icon("zap.svg")}${t.rodadas ? `${t.rodadas} voltas · ` : ""}${n} ${n === 1 ? "exercício" : "exercícios"}</span></div></div></div></${tag}>`;
  }
  const iaBanner = (pk, titulo, selo) => `<div class="banner" style="--grad: linear-gradient(238.09deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.8) 100%)">
      <div class="banner-bg"><img class="plano-img" src="${A(IA[pk].banner)}" alt=""></div>
      <span class="logo-txt">Fit.ai</span>
      <div class="plano-title"><span class="pill blue">${icon("goal.svg", 16)}${esc(selo)}</span><h1>${esc(titulo)}</h1></div></div>`;

  /* ---------- Entrevista no chat do Coach ---------- */
  let iaGerando = false, iaRevisando = false, iaChat = null, iaUltimo = null; // iaChat = programa da entrevista em andamento
  const iaResp = (p, v) => (p.multi ? (Array.isArray(v) && v.length ? v.map((d) => DIAS[d]).join(", ") : "Tanto faz") : p.fmt ? p.fmt(v) : p.num ? `${String(v).replace(".", ",")} ${p.un}` : String(v ?? ""));
  function telaIaComecar(pk) {
    const I = IA[pk], n = I.passos.length, et = Math.min(S[pk].etapa || 0, n);
    return `<section class="screen has-toolbar">
      ${iaBanner(pk, I.nome, "Coach AI")}
      ${progSwitch(pk)}
      <div class="section"><div class="note-box">
        <p><b>${esc(I.convite)}.</b> ${esc(I.resumoConvite.replace("{n}", n))}</p>
        <button class="btn btn-blue" data-ia-chat="${pk}" ${iaGerando ? "disabled" : ""}>${iaGerando ? "Montando seu treino…" : et ? `Continuar com o Coach (${et}/${n})` : "Montar meu treino com o Coach"}</button>
      </div></div></section>`;
  }
  const DIAS_ATALHO = { 2: ["Segunda e quinta", "Terça e sexta"], 3: ["Segunda, quarta e sexta", "Terça, quinta e sábado"], 4: ["Segunda, terça, quinta e sexta"], 5: ["Segunda a sexta"], 6: ["Segunda a sábado"] };
  const DIA_NOMES = ["seg", "ter", "qua", "qui", "sex", "sab", "dom"];
  // "seg, qua e sex", "segunda a sexta", "tanto faz" -> [0, 2, 4] | [] | null (não entendi)
  function diasDe(t) {
    if (/tanto faz|qualquer|sem prefer/.test(t)) return [];
    const idx = (w) => DIA_NOMES.findIndex((n) => w.startsWith(n));
    const fx = t.match(/(seg|ter|qua|qui|sex|sab|dom)\w*\s+(?:a|ate)\s+(seg|ter|qua|qui|sex|sab|dom)/);
    if (fx) { const a = idx(fx[1]), b = idx(fx[2]); if (a >= 0 && b >= a) return Array.from({ length: b - a + 1 }, (_, i) => a + i); }
    const ds = [...new Set((t.match(/[a-z]+/g) || []).map(idx).filter((i) => i >= 0))].sort();
    return ds.length ? ds : null;
  }
  // Grava a resposta da etapa atual. Devolve "" se aceitou ou o motivo de não aceitar.
  function iaResponder(pk, texto) {
    const St = S[pk], p = IA[pk].passos[St.etapa || 0], t = norm(texto);
    if (!p) return "";
    let v;
    if (p.multi) {
      v = diasDe(t);
      if (v === null) return "Não entendi os dias. Escreva, por exemplo, <b>seg, qua e sex</b>, ou toque numa opção.";
      const n = Number(St.perfil.dias) || 0;
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
    } else v = (p.op || []).find((o) => norm(o) === t) || String(texto).trim().slice(0, 400);
    St.perfil[p.k] = v;
    St.etapa = (St.etapa || 0) + 1;
    save();
    return "";
  }
  const iaOpcoes = (pk, p) => {
    if (p.multi) return [...(DIAS_ATALHO[Number(S[pk].perfil.dias)] || []), "Tanto faz"];
    if (p.num) return p.perfil && S.perfil[p.perfil] ? [`${String(S.perfil[p.perfil]).replace(".", ",")} ${p.un}`] : [];
    return (p.op || []).map((o) => (p.fmt ? p.fmt(o) : o));
  };
  async function iaPergunta(pk, ms = 500) {
    const I = IA[pk];
    while (I.passos[S[pk].etapa || 0] && S[pk].pre?.[I.passos[S[pk].etapa || 0].k]) S[pk].etapa = (S[pk].etapa || 0) + 1; // já respondido no quiz
    const et = S[pk].etapa || 0, p = I.passos[et];
    const stop = typing(msgsEl); await wait(ms); stop();
    if (!p) {
      addMsg(msgsEl, "Tudo pronto! Posso montar seu treino? 💪", false, chatLog);
      setChips(chipsEl, ["Montar meu treino", "Mudar a última resposta", "Cancelar"], true);
      return;
    }
    const q = p.multi ? `${p.q} Toque numa opção ou escreva os dias (ex.: <b>seg, qua e sex</b>).` : p.num ? `${p.q} É só digitar.` : p.q;
    addMsg(msgsEl, `<span class="hx-passo">${et + 1}/${I.passos.length}</span> ${q}`, false, chatLog);
    setChips(chipsEl, [...iaOpcoes(pk, p), ...(et ? ["Voltar"] : []), "Cancelar"]);
    const inp = $("#chat-input");
    inp.placeholder = p.num ? `Digite em ${p.un}` : "Digite sua resposta";
    inp.inputMode = p.num ? "decimal" : "text";
    if (p.num || p.livre) inp.focus();
  }
  async function iaIniciarChat(pk, refazer = false) {
    if (!IA[pk] || (!layer.hidden && iaChat === pk && chatPapel === "coach")) return;
    if (layer.hidden || chatPapel !== "coach") openChat();
    iaChat = pk;
    if (refazer) { S[pk].etapa = 0; S[pk].pre = {}; }
    const I = IA[pk], et = S[pk].etapa || 0, ja = I.passos.length - coachFaltam(pk);
    const stop = typing(msgsEl); await wait(500); stop();
    addMsg(msgsEl, et && et < I.passos.length ? `Vamos continuar a montar seu <b>${esc(I.nome)}</b> de onde paramos. 💪`
      : `${refazer ? `Vamos montar um <b>${esc(I.nome)}</b> novo!` : `${esc(I.intro)}, ${esc(primeiroNome())}! 💪`} ${ja ? `Já usei ${ja} respostas do seu quiz: faltam só ${I.passos.length - ja} perguntas` : `São ${I.passos.length} perguntas rápidas`} e depois eu monto ${esc(I.oQue)}.`, false, chatLog);
    iaPergunta(pk, 600);
  }
  function iaSairChat(msg) {
    const pk = iaChat;
    iaChat = null;
    const inp = $("#chat-input"); inp.placeholder = "Digite sua mensagem"; inp.inputMode = "text";
    if (msg) addMsg(msgsEl, msg.replace("{nome}", esc(IA[pk]?.nome || "")), false, chatLog);
    setChips(chipsEl, CHIPS_HOJE);
  }
  // Mensagem digitada ou chip tocado durante a entrevista
  async function iaChatResposta(texto) {
    const pk = iaChat, t = norm(texto), et = S[pk].etapa || 0;
    if (t === "cancelar") return iaSairChat("Tudo bem! Suas respostas ficam salvas. Quando quiser continuar, é só me chamar e escolher <b>{nome}</b>.");
    if (t === "voltar" || t === "mudar a ultima resposta") {
      const pre = S[pk].pre || {}, ps = IA[pk].passos; let e = Math.max(0, et - 1);
      while (e > 0 && pre[ps[e].k]) e--;
      if (pre[ps[e]?.k]) delete pre[ps[e].k]; // voltou até uma resposta do quiz: agora ela é perguntada
      S[pk].etapa = e; save(); return iaPergunta(pk);
    }
    if (!IA[pk].passos[et]) return /montar|sim|pode|bora|manda/.test(t) ? iaGerar(pk) : iaPergunta(pk);
    const erro = iaResponder(pk, texto);
    if (erro) { const stop = typing(msgsEl); await wait(400); stop(); addMsg(msgsEl, erro, false, chatLog); return; }
    iaPergunta(pk);
  }
  async function iaApi(corpo) {
    const token = await tokenSB();
    try {
      const r = await fetch("/api/hiper", { method: "POST", headers: { "content-type": "application/json", ...(token ? { authorization: `Bearer ${token}` } : {}) }, body: JSON.stringify(corpo) });
      const d = await r.json().catch(() => ({}));
      if (r.ok && d.plano) return d;
      toast(d.erro === "limite" ? "Você chegou ao limite do Coach por hoje. Tente amanhã. 💪" : d.erro === "ocupado" ? "O Coach está com muita gente agora. Tente de novo em 1 minuto." : "Não consegui falar com o Coach agora. Tente de novo.", 4500);
    } catch { toast("Sem conexão com o Coach. Confira a internet e tente de novo."); }
    return null;
  }
  // Etapa da trilha que o Coach usa para montar a ficha
  function etapaPerfil(pk) {
    if (pk === "hiper" && (trilha() === "academia" || trilha() === "hibrido")) return formaturas().adaptacao
      ? "Hipertrofia (já concluiu as 4 semanas de adaptação): volume e intensidade de hipertrofia, progressão de carga."
      : "Adaptação (primeiras 4 semanas da trilha Academia): técnica, cargas moderadas, longe da falha (2–3 reps de reserva), volume moderado.";
    if (pk === "c21" && formaturas().c21) return "Novo ciclo (já concluiu um ciclo de 21 dias): aumente a dificuldade em relação ao ciclo anterior.";
    if (pk === "c21") return "Primeiro ciclo da trilha Calistenia: o último treino do plano deve ser um teste máximo (máximo de repetições nos exercícios principais).";
    if (pk === "run" && formaturas()["base-corrida"]) return "Performance (já concluiu as 4 semanas de base): pode incluir tiros e tempo run com mais volume, e periodizar para a prova se houver.";
    if (pk === "run") return "Base de corrida (primeiras 4 semanas da trilha Corrida): volume leve e progressivo (no máximo +10% por semana), quase tudo em ritmo confortável, força do corredor 1 a 2x por semana. No fim da 4ª semana, um treino-teste (ex.: teste de 5 km ou o maior tempo contínuo).";
    return "";
  }
  const iaPerfil = (pk) => ({ ...S[pk].perfil, ...(etapaPerfil(pk) ? { etapa: etapaPerfil(pk) } : {}), idade: S[pk].perfil.idade || S.perfil.idade, peso: S.perfil.peso || S[pk].perfil.peso, altura: S[pk].perfil.altura || S.perfil.altura });
  function iaMsg(pk, txt, tipo) { S[pk].msgs = [...(S[pk].msgs || []), { k: hojeKey, txt: String(txt || "").slice(0, 1500), tipo }].slice(-12); }
  function iaNovoPlano(pk, plano) {
    if (S[pk].plano) S[pk].anterior = S[pk].plano;
    S[pk].plano = plano; S[pk].atualizado = Date.now();
    // O 21 dias começa numa segunda: esta semana (até quinta) ou a próxima
    S[pk].inicio = IA[pk].semanas ? inicioNovo() : hojeKey;
  }
  async function iaGerar(pk) {
    if (iaGerando) return;
    iaGerando = true; busy = true; setChips(chipsEl, []);
    addMsg(msgsEl, "Montando seu treino com base nas suas respostas… leva uns 30 a 60 segundos. ⏳", false, chatLog);
    const stop = typing(msgsEl);
    const r = await iaApi({ programa: pk, acao: "plano", perfil: iaPerfil(pk) });
    stop(); iaGerando = false; busy = false;
    if (!r) { addMsg(msgsEl, "Não consegui montar agora. Toque em <b>Montar meu treino</b> para tentar de novo.", false, chatLog); setChips(chipsEl, ["Montar meu treino", "Cancelar"], true); return; }
    iaNovoPlano(pk, r.plano); iaMsg(pk, r.mensagem, "plano"); save();
    iaSairChat(); iaUltimo = pk;
    const pl = r.plano, nDias = new Set(pl.dias.map((d) => d.dia)).size;
    const quando = IA[pk].semanas ? `${pl.dias.length} treinos em 3 semanas, começando na segunda ${ddmm(S[pk].inicio)}` : `${pl.dias.length} treinos por semana (${pl.dias.map((d) => DIAS[d.dia].slice(0, 3)).join(", ")})`;
    const m = { html: `${md(r.mensagem)}<p>Seu plano: <b>${esc(pl.nome)}</b>, ${quando}${IA[pk].semanas ? ` (${nDias} dias por semana)` : ""}.</p>`, me: false, txt: r.mensagem };
    chatLog.push(m); msgsEl.insertAdjacentHTML("beforeend", bubbleHTML(m)); msgsEl.scrollTo({ top: msgsEl.scrollHeight, behavior: "smooth" });
    setChips(chipsEl, ["Ver meu treino", "Por que esse treino?"], true);
  }

  /* ---------- Plano e acompanhamento ---------- */
  function iaHistoricoTexto(pk, dias = 35) {
    const desde = keyOf(addDays(hoje, -dias));
    return Object.keys(S[pk].logs).sort().filter((k) => k >= desde).map((k) => {
      const l = S[pk].logs[k], t = iaSessao(pk, l.d, l.w ?? 0);
      return `${k} (${t ? t.titulo : DIAS[l.d]})${l.done ? "" : " [incompleto]"}: ` + (Object.entries(l.sets || {}).filter(([, s]) => s.length)
        .map(([id, s]) => { const ex = t?.exercicios.find((e) => e.id === id) || { id, reps: "" }; return `${exDe(pk, id)?.nome || id} ${s.map((x) => fmtSet(x, unDe(pk, ex))).join(", ")}`; }).join("; ") || "sem séries");
    }).join("\n") || "sem registros";
  }
  const iaCheckinsTexto = (pk) => (S[pk].checkins || []).slice(-10).map((c) => `${c.k}: ${String(c.peso).replace(".", ",")} kg`).join("\n") || "nenhum";
  const iaUltRevisao = (pk) => [...(S[pk].msgs || [])].reverse().find((m) => m.tipo === "revisao" || m.tipo === "plano")?.k || S[pk].inicio || hojeKey;
  const iaTreinosDesde = (pk, k) => Object.entries(S[pk].logs).filter(([d, l]) => d > k && l.done).length;
  // Por semana: toneladas (carga × reps) na academia; repetições na calistenia
  function iaPorSemana(pk, n = 8) {
    const seg = mondayOf(hoje);
    return Array.from({ length: n }, (_, i) => {
      const ini = addDays(seg, -(n - 1 - i) * 7), a = keyOf(ini), b = keyOf(addDays(ini, 6));
      const logs = Object.entries(S[pk].logs).filter(([k]) => k >= a && k <= b).map(([, l]) => l);
      const v = IA[pk].carga ? Math.round(soma(logs.map((l) => soma(Object.values(l.sets || {}).flat().map((s) => (s.kg || 0) * (s.r || 0))))) / 100) / 10
        : soma(logs.map((l) => { const t = iaSessao(pk, l.d, l.w ?? 0); return soma(Object.entries(l.sets || {}).map(([id, s]) => (unDe(pk, t?.exercicios.find((e) => e.id === id) || { id, reps: "" }) === "reps" ? soma(s.map((x) => x.r || 0)) : 0))); }));
      return { k: a, v };
    });
  }
  const iaSemSel = {};
  function telaIaPlano(pk) {
    const I = IA[pk], St = S[pk], pl = St.plano, msg = (St.msgs || [])[St.msgs.length - 1];
    const wAtual = iaSemana(pk), acabou = iaAcabou(pk);
    const w = I.semanas ? Math.min(I.semanas - 1, Math.max(0, iaSemSel[pk] ?? wAtual)) : 0;
    const sess = iaSessoesSemana(pk, w), feitos = sess.filter((t) => iaSessFeita(pk, t)).length;
    const ult = iaUltRevisao(pk), novos = iaTreinosDesde(pk, ult);
    const revisar = acabou || (diffDays(parseKey(ult), hoje) >= 7 && novos >= 2);
    const ck = St.checkins || [], ckUlt = ck[ck.length - 1], ck0 = ck[0];
    const total = Object.values(St.logs).filter((l) => l.done).length;
    const pesoSerie = ck.slice(-8).map((c) => ({ k: c.k, v: Number(c.peso) }));
    const extras = [pl.progressao && `<p><b>Progressão:</b> ${esc(pl.progressao)}</p>`, pl.cardio && `<p><b>Cardio:</b> ${esc(pl.cardio)}</p>`, pl.alimentacao && `<p><b>Alimentação:</b> ${esc(pl.alimentacao)}</p>`].filter(Boolean);
    const status = I.semanas
      ? (acabou ? `<b>21 dias concluídos! 🏆</b> Toque em <b>Montar o próximo ciclo</b> para o Coach analisar sua evolução.` : wAtual < 0 ? `Seu programa começa na segunda, ${ddmm(St.inicio)}.` : `Dia ${Math.min(21, diffDays(parseKey(St.inicio), hoje) + 1)} de 21 · <b>${feitos} de ${sess.length}</b> treinos feitos na semana ${w + 1}.`)
      : `Semana ${Math.max(1, wAtual + 1)} do plano · <b>${feitos} de ${sess.length}</b> treinos feitos nesta semana.`;
    return `<section class="screen has-toolbar">
      ${iaBanner(pk, pl.nome, pl.divisao || I.rotulo)}
      ${progSwitch(pk)}
      ${msg ? `<div class="section"><div class="note-box hx-coach"><p><b>${icon("sparkles-blue.svg", 14)} Coach AI · ${msg.k === hojeKey ? "hoje" : ddmm(msg.k)}</b></p>${md(msg.txt)}
        ${msg.tipo === "revisao" && St.anterior ? `<button class="lnk-btn" data-ia-desfazer="${pk}">Voltar ao plano anterior</button>` : ""}</div></div>` : ""}
      ${I.semanas ? `<div class="week-tabs" role="tablist">${Array.from({ length: I.semanas }, (_, i) => `<button role="tab" aria-selected="${i === w}" class="wtab${i === w ? " on" : ""}" data-ia-sem="${i}" data-pk="${pk}">
        <strong>Semana ${i + 1}${i === wAtual ? " •" : ""}</strong><span>Dias ${i * 7 + 1}–${i * 7 + 7}</span></button>`).join("")}</div>` : ""}
      <p class="note week-note">${status}${pl.resumo ? ` ${esc(pl.resumo)}` : ""}</p>
      <div class="list" style="padding-top:8px">${sess.map((t) => iaCard(pk, t)).join("") || `<p class="note">Nenhum treino nesta semana.</p>`}</div>
      ${extras.length ? `<div class="section" style="padding-top:0"><div class="note-box">${extras.join("")}</div></div>` : ""}
      <div class="section">
        <div class="sec-head"><h2>Acompanhamento</h2></div>
        ${revisar && !acabou ? `<div class="note-box"><p><b>Hora da revisão!</b> Você fez ${novos} treinos desde a última análise. O Coach olha seus números e ajusta o plano.</p></div>` : ""}
        <div class="stats-row">
          ${stat("circle-check.svg", total, I.semanas ? "Treinos feitos" : "Treinos na academia")}
          ${stat("weight.svg", ckUlt ? `${fmtKg(Number(ckUlt.peso))}` : "—", ckUlt && ck0 && ck.length > 1 ? `kg (${Number(ckUlt.peso) - Number(ck0.peso) >= 0 ? "+" : ""}${fmtKg(Number(ckUlt.peso) - Number(ck0.peso))})` : "kg · peso")}
        </div>
        <p class="note hx-graf">${I.carga ? "Volume por semana (toneladas: carga × repetições)" : "Repetições por semana"}</p>
        ${barras(iaPorSemana(pk), { fmt: (v) => String(v).replace(".", ","), aria: I.carga ? "Volume de treino por semana" : "Repetições por semana" })}
        ${pesoSerie.length > 1 ? `<p class="note hx-graf">Peso corporal nos check-ins (kg)</p>${barras(pesoSerie, { fmt: (v) => fmtKg(v), aria: "Peso nos check-ins" })}` : ""}
        <div class="hx-acoes">
          <button class="btn btn-blue" data-ia-revisar="${pk}" ${iaRevisando ? "disabled" : ""}>${iaRevisando ? "Coach analisando seus treinos…" : acabou ? "Montar o próximo ciclo com o Coach" : "Revisar meu treino com o Coach"}</button>
          <button class="btn btn-outline" data-ia-checkin="${pk}">Check-in de peso</button>
          <button class="btn btn-outline" data-ia-perguntar="${pk}">Perguntar ao Coach</button>
          <button class="lnk-btn" data-ia-refazer="${pk}">Refazer a entrevista e montar outro treino</button>
        </div>
      </div></section>`;
  }
  async function iaRevisar(pk) {
    if (iaRevisando) return;
    const fb = prompt("Como foram os treinos? Quer mudar algo (exercício, dias, foco, alguma dor)? Pode deixar em branco.", "");
    if (fb === null) return;
    iaRevisando = true; render();
    const St = S[pk];
    const r = await iaApi({ programa: pk, acao: "revisao", perfil: iaPerfil(pk), plano: St.plano, historico: iaHistoricoTexto(pk, IA[pk].semanas ? 28 : 35), checkins: iaCheckinsTexto(pk), feedback: fb });
    iaRevisando = false;
    if (r) {
      if (IA[pk].semanas && iaAcabou(pk)) iaNovoPlano(pk, r.plano); // ciclo novo começa na próxima segunda
      else { St.anterior = St.plano; St.plano = r.plano; St.atualizado = Date.now(); }
      iaSemSel[pk] = null; iaMsg(pk, r.mensagem, "revisao"); save(); toast("Plano revisado ✓", 3000);
    }
    render(); if (r) scrollTo(0, 0);
  }
  function iaCheckin(pk) {
    const v = prompt("Seu peso hoje (kg):", S.perfil.peso || "");
    if (v === null) return;
    const n = Number(String(v).replace(",", "."));
    if (!(n >= 30 && n <= 300)) { toast("Digite um peso entre 30 e 300 kg."); return; }
    const ck = (S[pk].checkins || []).filter((c) => c.k < keyOf(mondayOf(hoje))); // um check-in por semana (o último vale)
    ck.push({ k: hojeKey, peso: Math.round(n * 10) / 10 });
    S[pk].checkins = ck.slice(-30); S.perfil.peso = String(Math.round(n * 10) / 10); S[pk].atualizado = Date.now();
    save(); render(); toast("Check-in salvo ✓");
  }

  /* ---------- Cronômetro do exercício e descanso ---------- */
  let iaTm = null, iaTmId = null; // { pk, id, tipo: "ex" | "desc", ini, alvo, avisou }
  const iaSeg = () => (iaTm ? Math.max(0, Math.round((Date.now() - iaTm.ini) / 1000)) : 0);
  const vibrar = () => { try { navigator.vibrate?.([180, 90, 180]); } catch {} };
  function iaTimerIniciar(pk, id, tipo, alvo) {
    const antes = iaTm;
    iaTm = { pk, id, tipo, ini: Date.now(), alvo: alvo || 0, avisou: false };
    if (antes && (antes.pk !== pk || antes.id !== id)) iaRefazerCard(antes.pk, antes.id); // tira o cronômetro do card anterior
    clearInterval(iaTmId); iaTmId = setInterval(iaTick, 250);
    iaRefazerCard(pk, id);
  }
  function iaTimerParar() { const t = iaTm; iaTm = null; clearInterval(iaTmId); if (t) iaRefazerCard(t.pk, t.id); }
  function iaTick() {
    if (!iaTm) return;
    const el = document.querySelector(`[data-ia-tm="${iaTm.pk}:${iaTm.id}"] b`), s = iaSeg();
    if (iaTm.tipo === "desc") {
      const resta = iaTm.alvo - s;
      if (resta <= 0) { vibrar(); toast("Descanso acabou. Bora! 💪"); iaTimerParar(); return; }
      if (el) el.textContent = mmss(resta);
    } else {
      if (el) el.textContent = `${s}s`;
      if (iaTm.alvo && s >= iaTm.alvo && !iaTm.avisou) { iaTm.avisou = true; vibrar(); el?.closest(".ia-tm")?.classList.add("alvo"); }
    }
  }
  function iaTimerHtml(pk, ex, un, editavel) {
    if (!editavel) return "";
    const ativo = iaTm && iaTm.pk === pk && iaTm.id === ex.id, [alvo] = faixa(ex.reps);
    if (ativo && iaTm.tipo === "ex") return `<div class="ia-tm${iaTm.avisou ? " alvo" : ""}" data-ia-tm="${pk}:${ex.id}"><span>⏱ <b>${iaSeg()}s</b>${alvo ? ` <small>/ alvo ${alvo}s</small>` : ""}</span>
      <button class="btn btn-blue" data-ia-parar>Parar e salvar</button><button class="lnk-btn" data-ia-cancelar>Cancelar</button></div>`;
    if (ativo && iaTm.tipo === "desc") return `<div class="ia-tm desc" data-ia-tm="${pk}:${ex.id}"><span>😮‍💨 Descanso <b>${mmss(Math.max(0, iaTm.alvo - iaSeg()))}</b></span><button class="lnk-btn" data-ia-cancelar>Pular</button></div>`;
    if (un === "s") return `<button class="btn btn-outline ia-iniciar" data-ia-cron="${ex.id}" data-alvo="${alvo}">⏱ Iniciar cronômetro${alvo ? ` (${alvo}s)` : ""}</button>`;
    return "";
  }

  /* ---------- Dia de treino ---------- */
  function iaExCard(pk, ex, editavel, sess) {
    const c = exDe(pk, ex.id) || { nome: ex.id, musculos: "", exec: "", erros: "" }, un = unDe(pk, ex), carga = un !== "min" && (IA[pk].cargaEx ? IA[pk].cargaEx(c) : IA[pk].carga);
    const sets = editavel ? (iaLogHoje(pk)?.sets?.[ex.id] || []) : [];
    const prev = iaAnterior(pk, ex.id), meta = iaMeta(pk, ex), ult = sets[sets.length - 1];
    const kgSug = ult ? ult.kg || "" : meta?.kg ?? (prev ? maxKg(prev.sets) || "" : "");
    const [a, b] = faixa(ex.reps);
    const rSug = ult ? ult.r : un === "min" ? a || 10 : b || (ehMax(ex.reps) ? iaRecorde(pk, ex.id) || "" : 10);
    const q = encodeURIComponent(`${c.nome} execução correta`), feitoTudo = sets.length >= ex.series;
    const nome = sess?.rodadas ? "Volta" : c.equip === "tiro" ? "Tiro" : "Série", plural = { Volta: "voltas", Tiro: "tiros", "Série": "séries" }[nome];
    return `<div class="ex hx${feitoTudo ? " done" : ""}" data-hx-ex="${ex.id}" data-pk="${pk}">
      <div class="ex-top"><span class="ex-name"><span class="ex-check">${check}</span>${esc(c.nome)}</span>
        <button class="ask" data-ia-ask="${ex.id}" data-pk="${pk}" aria-label="Perguntar ao Coach AI sobre ${esc(c.nome)}">${icon("circle-question.svg", 20)}</button></div>
      ${c.musculos ? `<p class="ia-musc">💪 ${esc(c.musculos)}</p>` : ""}
      <div class="ex-tags"><span class="pill gray">${ex.series} × ${esc(ex.reps)}</span>${ex.descanso ? `<span class="pill gray">${icon("timer.svg")}${fmtDesc(ex.descanso)}</span>` : ""}
        ${prev ? `<span class="pill gray">Última: ${esc(prev.sets.map((s) => fmtSet(s, un)).join(" · "))}</span>` : ""}</div>
      ${meta && editavel ? `<p class="hx-meta">🎯 ${esc(meta.txt)}</p>` : ""}
      ${ex.obs ? `<p class="ex-obs">${esc(ex.obs)}</p>` : ""}
      ${animDe(pk, ex.id) ? `<button class="hx-anim" data-ia-anim="${animDe(pk, ex.id)}" aria-label="Ver a animação de ${esc(c.nome)}">
        <img src="assets/anim/${animDe(pk, ex.id)}.jpg" alt="" loading="lazy"><span class="hx-anim-tag">${/^(cal-|corr-|mesa-flexora|cadeira-flexora|cadeira-adutora|panturrilha-sentado|esteira|bike|prancha|abdominal-infra)/.test(animDe(pk, ex.id)) ? "▶ Ver o movimento" : "▶ Certo × errado"}</span></button>` : ""}
      <div class="hx-video">${c.yt ? `<button class="btn btn-outline hx-play" data-ia-play="${ex.id}" data-pk="${pk}">▶ Ver como fazer</button>` : ""}
        <a class="lnk-btn" href="https://www.youtube.com/results?search_query=${q}" target="_blank" rel="noopener">${c.yt ? "Mais vídeos no YouTube" : "▶ Ver vídeos de execução no YouTube"}</a></div>
      ${c.exec ? `<details class="musc hx-como"><summary><span>📋 Como fazer</span></summary>
        <div class="hx-dica"><p><b>Execução:</b> ${esc(c.exec)}</p><p><b>Evite:</b> ${esc(c.erros)}</p></div></details>` : ""}
      ${editavel ? `
      <div class="ia-contador${feitoTudo ? " ok" : ""}">${feitoTudo ? `✓ ${ex.series} ${plural} feit${nome === "Tiro" ? "os" : "as"}` : `${nome} <b>${sets.length + 1}</b> de ${ex.series}`}</div>
      ${iaTimerHtml(pk, ex, un, editavel)}
      <div class="sets">
        ${sets.map((s, i) => `<button class="set" data-ia-del="${i}" title="Toque para remover" aria-label="${nome} ${i + 1}: ${esc(fmtSet(s, un))}. Toque para remover">${esc(fmtSet(s, un))}</button>`).join("")}
        <form class="add-set hx-add" data-ia-add="${ex.id}" data-pk="${pk}">
          ${carga ? `<input name="kg" type="number" inputmode="decimal" step="0.5" min="0" max="999" value="${kgSug}" placeholder="kg" aria-label="Carga em kg (deixe vazio se for sem peso)"><span class="hx-x">${un === "s" ? "kg ·" : "×"}</span>` : ""}
          <input name="r" type="number" inputmode="numeric" min="1" max="999" value="${rSug}" placeholder="${un === "s" ? "seg" : un === "min" ? "min" : "reps"}" aria-label="${un === "reps" ? "Repetições" : un === "s" ? "Segundos" : "Minutos"}">
          ${un === "s" ? `<span class="hx-x">s</span>` : ""}
          <button type="submit" class="btn btn-blue">${un === "min" ? "+ min" : `+ ${nome}`}</button></form></div>
      <div class="progress"><div class="bar"><i style="width:${Math.min(100, Math.round((sets.length / ex.series) * 100))}%"></i></div><span>${sets.length}/${ex.series} ${plural}</span></div>` : ""}
    </div>`;
  }
  function telaIaDia(pk, d, w) {
    const t = iaSessao(pk, d, w), l = iaLogHoje(pk);
    const ehHoje = l ? l.d === d && (l.w ?? 0) === w : !!iaHoje(pk) && iaHoje(pk).d === d && iaHoje(pk).w === w;
    const done = ehHoje && !!l?.done, grupos = gruposDe(pk, t);
    const dicaReg = IA[pk].carga ? "Anote <b>carga × repetições</b> de cada série" : "Anote as <b>repetições</b> (ou use o <b>cronômetro</b> nos exercícios de tempo) de cada volta";
    return `<section class="screen has-toolbar"><div class="list" style="gap:20px">
      <div class="page-head">
        <a class="icon-btn" href="#/${pk}" aria-label="Voltar">${icon("chevron-left.svg", 24)}</a>
        <h1>${ehHoje ? "Treino de Hoje" : t.semana != null ? `Dia ${w * 7 + d + 1}` : DIAS[d]}</h1><span class="spacer"></span></div>
      ${iaCard(pk, t, { link: false })}
      ${grupos.length ? `<p class="ia-grupos">💪 <b>Grupos musculares:</b> ${grupos.map(esc).join(" · ")}</p>` : ""}
      ${t.rodadas ? `<div class="note-box"><p><b>Circuito de ${t.rodadas} voltas:</b> faça os exercícios em sequência${t.exercicios.some((e) => e.descanso) ? " com a pausa indicada entre eles" : ""} e descanse <b>${fmtDesc(t.descansoRodada || 60)}</b> ao fim de cada volta. Marque cada exercício a cada volta.</p></div>` : ""}
      ${ehHoje ? `<div class="note-box"><p>${dicaReg}. O contador mostra em qual ${t.rodadas ? "volta" : "série"} você está e o descanso começa sozinho. Na próxima vez, o app compara com hoje.</p></div>`
        : `<button class="btn btn-outline" data-ia-hoje="${d}" data-w="${w}" data-pk="${pk}">Fazer este treino hoje</button>`}
      <div class="ex-list">${t.exercicios.map((ex) => iaExCard(pk, ex, ehHoje, t)).join("")}</div>
      ${ehHoje ? `<button class="btn btn-outline${done ? " done" : ""}" data-ia-concluir="${pk}">${done ? "Treino concluído ✓" : "Marcar como concluído"}</button>` : ""}
      </div></section>`;
  }
  function iaRefazerCard(pk, id) {
    const el = document.querySelector(`.ex.hx[data-pk="${pk}"][data-hx-ex="${CSS.escape(id)}"]`), l = iaLogHoje(pk), h = iaHoje(pk);
    const t = l ? iaSessao(pk, l.d, l.w ?? 0) : h ? iaSessao(pk, h.d, h.w) : null, ex = t?.exercicios.find((e) => e.id === id);
    if (el && ex) el.outerHTML = iaExCard(pk, ex, true, t);
  }
  function iaGarantirLog(pk) {
    if (!S[pk].logs[hojeKey]) { const h = iaHoje(pk) || { d: hojeDia, w: Math.max(0, iaSemana(pk)) }; S[pk].logs[hojeKey] = { d: h.d, w: h.w, sets: {}, done: false }; }
    return S[pk].logs[hojeKey];
  }
  function iaSalvarSerie(pk, id, set) {
    const l = iaGarantirLog(pk), t = iaSessao(pk, l.d, l.w ?? 0), ex = t?.exercicios.find((e) => e.id === id);
    (l.sets[id] = l.sets[id] || []).push(set);
    save();
    const tudo = t ? t.exercicios.every((e) => (l.sets[e.id] || []).length >= e.series) : false;
    // Descanso: entre séries (academia) ou até o próximo exercício / fim da volta (circuito)
    const ultimoDaVolta = t?.rodadas && t.exercicios[t.exercicios.length - 1].id === id;
    const desc = tudo ? 0 : ultimoDaVolta ? t.descansoRodada || 60 : (l.sets[id].length < (ex?.series || 0) || t?.rodadas) ? ex?.descanso || 0 : 0;
    if (desc > 0) iaTimerIniciar(pk, id, "desc", desc); else { if (iaTm?.pk === pk && iaTm.id === id) iaTimerParar(); iaRefazerCard(pk, id); }
    if (tudo && !l.done) toast("Todas as séries anotadas! Toque em Marcar como concluído. 💪", 3500);
  }

  /* ---------- Tela inicial e Coach ---------- */
  function iaHome(pk, principalAqui) {
    const I = IA[pk], St = S[pk], titulo = principalAqui ? "Treino de Hoje" : I.rotulo;
    if (!St.plano) return `<div class="sec-head"><h2>${esc(titulo)}</h2><a href="#/${pk}">${esc(I.nome)}</a></div><a class="emerg" href="#/${pk}" data-ia-chat="${pk}"><span>${icon("sparkles-blue.svg", 20)}</span><div><strong>${pk === "hiper" ? "Monte seu treino de academia" : `Monte sua ${esc(I.nome)}`}</strong><small>${St.etapa ? "Continue a conversa com o Coach AI" : "O Coach AI faz umas perguntas e monta seu plano"}</small></div></a>`;
    const head = `<div class="sec-head"><h2>${esc(titulo)}</h2><a href="#/${pk}">${esc(St.plano.nome)}</a></div>`;
    if (iaAcabou(pk)) return head + `<a class="emerg" href="#/${pk}"><span>${icon("flame.svg", 20)}</span><div><strong>21 dias concluídos! 🏆</strong><small>Toque para o Coach montar o próximo ciclo</small></div></a>`;
    const h = iaHoje(pk);
    if (h) return head + iaCard(pk, iaSessao(pk, h.d, h.w));
    if (iaSemana(pk) < 0) return head + `<a class="emerg" href="#/${pk}"><span>${icon("calendar-14.svg", 20)}</span><div><strong>Começa na segunda, ${ddmm(St.inicio)}</strong><small>Toque para ver a semana 1</small></div></a>`;
    const sem = iaSessoesSemana(pk, iaSemana(pk)), prox = sem.find((x) => x.dia > hojeDia) || iaSessoesSemana(pk, iaSemana(pk) + 1)[0] || sem[0];
    return head + `<a class="emerg" href="#/${pk}"><span>${icon("calendar-14.svg", 20)}</span><div><strong>Hoje é dia de descanso</strong><small>${prox ? `Próximo treino: ${DIAS[prox.dia]} · ${esc(prox.titulo)}` : "Veja o plano da semana"}</small></div></a>`;
  }
  function iaProgramaTexto(pk) {
    const I = IA[pk], St = S[pk], pl = St.plano;
    if (!pl) return `# Programa extra: ${I.nome}\n${I.convite}. A pessoa ainda não montou o plano: para começar, toque no botão do Coach e escolha ${pk === "hiper" ? "Hipertrofia" : pk === "run" ? "Corrida" : "Calistenia → Calistenia 21 dias"}.`;
    return [`# Programa extra: ${I.nome} — plano "${pl.nome}" (${pl.divisao}), montado pelo Coach AI${I.semanas ? `; começou em ${St.inicio}, 3 semanas` : ""}`, pl.resumo, `Progressão: ${pl.progressao}`, pl.cardio && `Cardio: ${pl.cardio}`, pl.alimentacao && `Alimentação: ${pl.alimentacao}`,
      ...pl.dias.map((t) => `## ${t.semana != null ? `Semana ${t.semana + 1} · ` : ""}${DIAS[t.dia]} · ${t.titulo}${t.rodadas ? ` (circuito, ${t.rodadas} voltas, ${t.descansoRodada}s entre voltas)` : ""}\n${t.exercicios.map((e) => `- ${exDe(pk, e.id)?.nome || e.id} [${e.id}] (${exDe(pk, e.id)?.musculos || ""}): ${e.series}×${e.reps}, descanso ${e.descanso}s${e.obs ? ` — ${e.obs}` : ""}`).join("\n")}`),
      `Entrevista: ${I.passos.map((p) => `${p.k}: ${iaResp(p, St.perfil[p.k])}`).join("; ")}`,
      `Para mudar o plano, oriente a pessoa a tocar em "Revisar meu treino com o Coach" na aba ${I.nome} e escrever o pedido.`].filter(Boolean).join("\n");
  }
  function iaContextoTexto(pk) {
    if (!S[pk].plano) return "";
    const h = iaHoje(pk), t = h ? iaSessao(pk, h.d, h.w) : null;
    return [`${IA[pk].nome}: semana ${iaSemana(pk) + 1}${IA[pk].semanas ? " de 3" : ""}. Hoje: ${t ? `${t.titulo}${S[pk].logs[hojeKey]?.done ? " (feito)" : S[pk].logs[hojeKey] ? " (em andamento)" : ""}` : "descanso"}.`,
      `Registros (${IA[pk].carga ? "carga × reps" : "reps ou segundos"}):\n${iaHistoricoTexto(pk, 28)}`, `Check-ins de peso:\n${iaCheckinsTexto(pk)}`].join("\n");
  }
  const iaDados = (pk) => { const St = S[pk]; return St.plano || St.etapa ? { perfil: St.perfil, etapa: St.etapa || 0, plano: St.plano, inicio: St.inicio, checkins: St.checkins || [], msgs: (St.msgs || []).slice(-6), atualizado: St.atualizado || 0 } : null; };

  IAK.forEach((pk) => {
    telas[pk] = (p1, p2) => {
      setToolbar("plano");
      if (!S[pk].plano) return telaIaComecar(pk);
      const d = Number(p1), w = Number(p2 ?? 0);
      if (p1 !== undefined && iaSessao(pk, d, w)) return telaIaDia(pk, d, w);
      return telaIaPlano(pk);
    };
  });


  /* ==========================================================
     CrossFit: o WOD do dia (foto do quadro lida pela IA, digitado ou montado pelo Coach), cronômetro do formato
     (For Time, AMRAP, EMOM, Tabata), resultado (tempo, voltas, cargas, RX/Scaled) e histórico com recordes por WOD.
     S.cf.logs[data] = { wod: { titulo, partes: [{ nome, tipo, minutos?, rodadas?, esquema?, movimentos: [{ nome, reps?, carga? }], descricao? }], pontuado, obs? },
                         res: { tempo?, cap?, voltas?, reps?, texto?, cargas?: { [i]: kg }, rx?, notas? }, done }
     ========================================================== */
  const CF_TIPOS = { for_time: "For Time", amrap: "AMRAP", emom: "EMOM", tabata: "Tabata", intervalos: "Intervalos", forca: "Força", livre: "Livre" };
  const CF_TEMPO = ["for_time", "amrap", "emom", "tabata", "intervalos"];
  let cfLendo = false, cfEdit = null, cfTm = null, cfTmId = null, cfWake = null;
  const cfLog = (k = hojeKey) => S.cf.logs[k] || null;
  const cfParteTxt = (p) => `${CF_TIPOS[p.tipo] || p.tipo}${p.minutos ? ` ${p.minutos}'` : ""}${p.rodadas && p.tipo !== "amrap" ? ` · ${p.rodadas} ${p.tipo === "forca" ? "séries" : "voltas"}` : ""}${p.esquema ? ` · ${p.esquema}` : ""}`;
  const cfMovTxt = (m) => [m.reps, m.nome].filter(Boolean).join(" ") + (m.carga ? ` (${m.carga})` : "");
  function cfMinutos(l) {
    if (!l?.wod) return 0;
    const ps = l.wod.partes, tempo = l.res?.tempo;
    const m = soma(ps.map((p, i) => (i === l.wod.pontuado && tempo ? tempo / 60 : p.minutos || (p.tipo === "forca" ? 12 : 8))));
    return Math.max(10, Math.min(180, Math.round(m)));
  }
  // O resultado do bloco pontuado, em texto ("5:32", "8 voltas + 12", "Cap: 4 voltas + 3")
  function cfResTxt(l) {
    const r = l?.res || {}, p = l?.wod?.partes[l.wod.pontuado];
    if (!p) return "";
    let s = "";
    if (p.tipo === "for_time" && r.tempo && !r.cap) s = mmss(r.tempo);
    else if ((p.tipo === "amrap" || (p.tipo === "for_time" && r.cap)) && (r.voltas || r.reps)) s = `${r.cap ? "Cap: " : ""}${r.voltas || 0} ${r.voltas === 1 ? "volta" : "voltas"}${r.reps ? ` + ${r.reps}` : ""}`;
    else if (r.texto) s = r.texto;
    const cargas = Object.entries(r.cargas || {}).filter(([, v]) => v > 0).map(([i, v]) => `${l.wod.partes[i]?.nome || "Força"} ${v} kg`);
    return [s && `${s}${r.rx === false ? " (Scaled)" : r.rx ? " (RX)" : ""}`, ...cargas].filter(Boolean).join(" · ");
  }
  // Para comparar o mesmo WOD (benchmark): menor tempo ou mais voltas é melhor
  const cfNome = (t) => norm(String(t || "")).replace(/[^a-z0-9]+/g, " ").trim();
  function cfValor(l) {
    const r = l.res || {}, p = l.wod.partes[l.wod.pontuado];
    if (p?.tipo === "for_time" && r.tempo && !r.cap) return { v: -r.tempo, txt: mmss(r.tempo) };
    if (r.voltas || r.reps) return { v: (r.voltas || 0) * 1000 + (r.reps || 0) - (p?.tipo === "for_time" ? 1e7 : 0), txt: `${r.voltas || 0}+${r.reps || 0}` };
    return null;
  }
  function cfAnteriores(titulo, ate = hojeKey) {
    const n = cfNome(titulo);
    return Object.entries(S.cf.logs).filter(([k, l]) => k < ate && l.done && l.wod && cfNome(l.wod.titulo) === n).map(([k, l]) => ({ k, l, val: cfValor(l) })).sort((a, b) => a.k.localeCompare(b.k));
  }

  /* ---------- API: ler a foto ou pedir um WOD ao Coach ---------- */
  async function cfApi(corpo) {
    const token = await tokenSB();
    try {
      const r = await fetch("/api/wod", { method: "POST", headers: { "content-type": "application/json", ...(token ? { authorization: `Bearer ${token}` } : {}) }, body: JSON.stringify(corpo) });
      const d = await r.json().catch(() => ({}));
      if (r.ok && d.wod) return d;
      toast(d.erro === "ilegivel" ? "Não consegui ler um treino nessa foto. Tente mais perto e com o quadro inteiro, ou escreva o WOD." : d.erro === "limite" ? "Você chegou ao limite do Coach por hoje. Escreva o WOD à mão. 💪" : d.erro === "imagem" ? "Foto grande demais. Tente de novo." : "Não consegui falar com o Coach agora. Tente de novo.", 5000);
    } catch { toast("Sem conexão. Confira a internet ou escreva o WOD à mão."); }
    return null;
  }
  // Foto reduzida para 1600 px (o quadro precisa de resolução para ler letra pequena) em JPEG
  function cfReduzir(arquivo, max = 1600, q = 0.82) {
    return new Promise((ok, falha) => {
      const img = new Image(), url = URL.createObjectURL(arquivo);
      img.onload = () => {
        const f = Math.min(1, max / Math.max(img.width, img.height)), c = document.createElement("canvas");
        c.width = Math.round(img.width * f); c.height = Math.round(img.height * f);
        c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
        URL.revokeObjectURL(url);
        ok(c.toDataURL("image/jpeg", q).split(",")[1]);
      };
      img.onerror = () => { URL.revokeObjectURL(url); falha(new Error("foto")); };
      img.src = url;
    });
  }
  async function cfLerFoto(arquivo) {
    if (cfLendo) return;
    let b64;
    try { b64 = await cfReduzir(arquivo); if (b64.length > 1_300_000) b64 = await cfReduzir(arquivo, 1280, 0.75); } catch { toast("Não consegui abrir essa imagem."); return; }
    cfLendo = "foto"; render();
    const d = await cfApi({ acao: "foto", imagem: b64 });
    cfLendo = false;
    if (d) { cfSalvarWod(d.wod); toast("WOD lido! ✅ Confira e ajuste em Editar se precisar.", 4000); }
    render();
  }
  async function cfGerar(pedido) {
    if (cfLendo) return;
    cfLendo = "gerar"; render();
    const perfil = { nivel: S.cf.perfil?.nivel || S.nivel || "", equipamento: S.cf.perfil?.equip || "", idade: S.perfil.idade, peso: S.perfil.peso, ultimos: Object.entries(S.cf.logs).sort().slice(-5).map(([k, l]) => `${k} ${l.wod?.titulo}`).join("; ") };
    const d = await cfApi({ acao: "gerar", pedido, perfil });
    cfLendo = false;
    if (d) { cfSalvarWod(d.wod); if (d.mensagem) S.cf.logs[hojeKey].msg = d.mensagem; save(); toast("WOD do Coach pronto! 🔥"); }
    render();
  }
  function cfSalvarWod(wod, k = hojeKey) {
    const l = S.cf.logs[k];
    const mesmo = !!l?.wod && cfNome(l.wod.titulo) === cfNome(wod.titulo); // editar o mesmo WOD mantém o resultado
    S.cf.logs[k] = { ...(l || {}), wod, res: mesmo ? l.res || {} : {}, done: mesmo ? !!l.done : false };
    cfEdit = null; save();
  }

  /* ---------- Cronômetro do WOD ---------- */
  // { k ("avulso" no Timer do menu), i, tipo, ini (início em ms, depois dos 5 s de preparação), total (s), voltas,
  //   trab/desc/n (Tabata e intervalos: segundos de trabalho, de descanso e número de rodadas) }
  const cfSeg = () => (cfTm ? (Date.now() - cfTm.ini) / 1000 : 0);
  async function cfTimerComecar(cfg) {
    cfTm = { voltas: 0, ultimoMin: -1, fase: "", ...cfg, ini: Date.now() + 5000 };
    clearInterval(cfTmId); cfTmId = setInterval(cfTick, 200);
    try { cfWake = await navigator.wakeLock?.request("screen"); } catch {}
    render();
  }
  function cfTimerIniciar(i) {
    const l = cfLog(), p = l?.wod?.partes[i];
    if (!p) return;
    if (p.tipo === "tabata") { const n = Math.round(((p.minutos || 4 * Math.max(1, p.movimentos.length)) * 60) / 30); return cfTimerComecar({ k: hojeKey, i, tipo: "tabata", trab: 20, desc: 10, n }); }
    cfTimerComecar({ k: hojeKey, i, tipo: p.tipo, total: (p.minutos || 0) * 60 });
  }
  function cfTimerParar(salvar) {
    if (!cfTm) return;
    const t = cfTm, s = Math.max(0, Math.round(cfSeg()));
    clearInterval(cfTmId); cfTm = null;
    try { cfWake?.release(); } catch {} cfWake = null;
    if (t.k === "avulso") {
      if (salvar && s > 0) toast(t.tipo === "amrap" ? `AMRAP: ${t.voltas} ${t.voltas === 1 ? "volta" : "voltas"} ✓` : `Tempo: ${mmss(s)}${t.voltas ? ` · ${t.voltas} voltas` : ""} ✓`, 4000);
    } else if (salvar) {
      const l = cfLog(t.k);
      if (l) {
        l.res = { ...(l.res || {}) };
        if (t.tipo === "for_time") { if (t.total && s >= t.total) { l.res.cap = true; l.res.voltas = t.voltas; } else { l.res.tempo = s; l.res.cap = false; } }
        else if (t.tipo === "amrap") { l.res.voltas = t.voltas; }
        save();
      }
    }
    render();
  }
  function cfTick() {
    if (!cfTm) return;
    const s = cfSeg(), el = $("#cf-relogio");
    let grande, sub = "";
    if (s < 0) { grande = `${Math.ceil(-s)}`; sub = "Prepara…"; if (Math.ceil(-s) !== cfTm.prep) { cfTm.prep = Math.ceil(-s); try { navigator.vibrate?.(60); } catch {} } }
    else if (cfTm.tipo === "amrap") {
      const resta = cfTm.total - s;
      if (resta <= 0) { vibrar(); toast("Tempo! ⏱ Anote as repetições da volta incompleta.", 4000); cfTimerParar(true); return; }
      grande = mmss(Math.ceil(resta)); sub = `AMRAP · ${cfTm.voltas} ${cfTm.voltas === 1 ? "volta" : "voltas"}`;
    } else if (cfTm.tipo === "emom") {
      const cada = cfTm.cada || 60, min = Math.floor(s / cada), n = Math.round(cfTm.total / cada) || 10;
      if (min >= n) { vibrar(); toast(`${cada === 60 ? "EMOM" : `E${cada / 60}MOM`} concluído! 💪`); cfTimerParar(false); return; }
      if (min !== cfTm.ultimoMin) { if (cfTm.ultimoMin >= 0) vibrar(); cfTm.ultimoMin = min; }
      grande = mmss(cada - Math.floor(s % cada)); sub = `${cada === 60 ? "Minuto" : "Rodada"} ${min + 1} de ${n}`;
    } else if (cfTm.trab) { // Tabata e intervalos
      const ciclo = cfTm.trab + cfTm.desc, r = Math.floor(s / ciclo), dentro = s % ciclo, trab = dentro < cfTm.trab;
      if (r >= cfTm.n) { vibrar(); toast(cfTm.tipo === "tabata" ? "Tabata concluído! 🔥" : "Intervalos concluídos! 🔥"); cfTimerParar(false); return; }
      const fase = trab ? "t" : "d"; if (fase !== cfTm.fase) { if (cfTm.fase) vibrar(); cfTm.fase = fase; }
      grande = mmss(Math.ceil((trab ? cfTm.trab : ciclo) - dentro)); sub = `${trab ? "Trabalho 🔥" : "Descanso 😮‍💨"} · ${r + 1} de ${cfTm.n}`;
    } else {
      if (cfTm.total && s >= cfTm.total) { vibrar(); toast("Time cap! ⏱ Anote até onde chegou.", 4000); cfTimerParar(true); return; }
      grande = mmss(Math.floor(s)); sub = cfTm.tipo === "for_time" ? `For Time${cfTm.total ? ` · cap ${cfTm.total / 60}'` : ""}${cfTm.voltas ? ` · ${cfTm.voltas} ${cfTm.voltas === 1 ? "volta" : "voltas"}` : ""}` : "Cronômetro";
    }
    if (el) { el.querySelector("b").textContent = grande; el.querySelector("small").textContent = sub; el.classList.toggle("prep", s < 0); el.classList.toggle("descanso", cfTm.fase === "d"); }
  }
  const cfRelogioHtml = (voltas) => `<div class="cf-relogio" id="cf-relogio" role="timer" aria-live="off"><b>—</b><small></small>
    <div class="cf-relogio-acoes">${voltas ? `<button class="btn cf-volta" data-cf-volta>+1 volta</button>` : ""}
    <button class="btn btn-blue" data-cf-parar="1">${cfTm.tipo === "for_time" ? "Terminei" : cfTm.tipo === "amrap" ? "Parar e anotar" : "Parar"}</button>
    <button class="lnk-btn" data-cf-parar="0">Cancelar</button></div></div>`;
  function cfTimerHtml(i, p) {
    if (cfTm && cfTm.i === i && cfTm.k === hojeKey) return cfRelogioHtml(cfTm.tipo === "amrap" || (cfTm.tipo === "for_time" && (p.rodadas > 1 || !!p.minutos)));
    if (!CF_TEMPO.includes(p.tipo) || cfTm) return "";
    if ((p.tipo === "amrap" || p.tipo === "emom") && !p.minutos) return "";
    return `<button class="btn btn-outline cf-iniciar" data-cf-timer="${i}">⏱ Iniciar ${p.tipo === "amrap" ? `AMRAP ${p.minutos}'` : p.tipo === "emom" ? `EMOM ${p.minutos}'` : p.tipo === "tabata" ? "Tabata" : p.minutos ? `(cap ${p.minutos}')` : "cronômetro"}</button>`;
  }

  /* ---------- Músculos do WOD ----------
     Cada movimento (nome livre: foto, digitado ou Coach) vira pesos por grupo muscular: 3 principal, 2 secundário, 1 apoio.
     A soma do WOD é normalizada pelo maior valor e pinta um mapa de frente e costas. O primeiro padrão que bate vence. */
  const CF_MG = { quadriceps: "Quadríceps", gluteos: "Glúteos", posteriores: "Posteriores da coxa", panturrilha: "Panturrilhas", ombros: "Ombros",
    peito: "Peitoral", triceps: "Tríceps", biceps: "Bíceps", dorsais: "Dorsais", trapezio: "Trapézio", lombar: "Lombar", abdomen: "Abdômen", obliquos: "Oblíquos", antebraco: "Antebraços e pegada" };
  const MPESO = (s) => Object.fromEntries(s.split(" ").map((x) => [x.slice(0, -1), +x.slice(-1)]));
  const CF_MOV = [
    [/clean (and|e|n) jerk|\bc j\b|arremesso/, "posteriores3 gluteos3 quadriceps3 ombros3 trapezio2 triceps2 lombar2 abdomen1 panturrilha1 antebraco1"],
    [/devil press/, "gluteos3 posteriores2 ombros3 peito2 triceps2 quadriceps2 abdomen2 trapezio1"],
    [/man ?maker/, "peito2 ombros3 triceps2 dorsais2 quadriceps2 gluteos2 abdomen2"],
    [/(db|dumbbell|halter|kb|kettlebell).*snatch|snatch.*(db|dumbbell|halter|kb)/, "gluteos3 posteriores3 ombros3 trapezio2 quadriceps2 abdomen2 obliquos1 antebraco1"],
    [/snatch|arranco/, "posteriores3 gluteos3 quadriceps3 ombros3 trapezio3 lombar2 abdomen2 triceps1 panturrilha1"],
    [/clean|cargada/, "posteriores3 gluteos3 quadriceps3 trapezio3 lombar2 antebraco2 abdomen1 biceps1 panturrilha1"],
    [/thruster|cluster/, "quadriceps3 gluteos3 ombros3 triceps2 abdomen2 posteriores1"],
    [/wall ?ball/, "quadriceps3 gluteos3 ombros3 triceps2 abdomen1 peito1"],
    [/ball slam|slam ball|\bslam/, "abdomen3 dorsais2 ombros2 gluteos1 triceps1"],
    [/jerk/, "ombros3 triceps3 quadriceps2 gluteos1 abdomen1 trapezio1"],
    [/push press/, "ombros3 triceps3 quadriceps1 gluteos1 abdomen1 trapezio1"],
    [/hspu|handstand push|flexao (de|em) parada|parada.*flexao/, "ombros3 triceps3 trapezio2 abdomen1"],
    [/handstand|wall walk|parada de mao|caminhada de mao/, "ombros3 triceps2 abdomen2 trapezio2 antebraco1"],
    [/strict press|shoulder press|military|overhead press|desenvolvimento|press militar/, "ombros3 triceps3 trapezio1 abdomen1"],
    [/sdhp|sumo deadlift high pull|high pull/, "posteriores3 gluteos3 trapezio3 ombros2 lombar2 quadriceps1 biceps1"],
    [/deadlift|levantamento terra|\bterra\b|\brdl\b|stiff/, "posteriores3 gluteos3 lombar3 trapezio2 antebraco2 quadriceps1 dorsais1"],
    [/overhead squat|\bohs\b|agachamento (overhead|acima)/, "quadriceps3 gluteos3 ombros2 abdomen2 trapezio2 lombar1"],
    [/front squat|agachamento frontal/, "quadriceps3 gluteos2 abdomen2 lombar1 posteriores1"],
    [/pistol/, "quadriceps3 gluteos3 abdomen1 panturrilha1"],
    [/squat|agachamento/, "quadriceps3 gluteos3 posteriores2 lombar1 abdomen1"],
    [/lunge|afundo|passada|avanco/, "quadriceps3 gluteos3 posteriores1 panturrilha1 abdomen1"],
    [/step ?up|box step|subida no (caixote|box)/, "quadriceps3 gluteos3 panturrilha1"],
    [/burpee/, "peito2 triceps2 ombros2 quadriceps2 gluteos2 abdomen2 panturrilha1"],
    [/box jump|jump over|broad jump|salto|pulo|tuck jump/, "quadriceps3 gluteos3 panturrilha3 posteriores1"],
    [/double ?under|single ?under|\bdus?\b|pular corda|corda (dupla|simples)|jump rope|\bsu\b/, "panturrilha3 quadriceps1 ombros1 antebraco1"],
    [/rope climb|legless|(subida|escalada) (na|de) corda/, "dorsais3 biceps3 antebraco3 abdomen2 ombros1"],
    [/muscle ?up|\bb?mu\b|\brmu\b/, "dorsais3 triceps3 biceps2 peito2 ombros2 abdomen2 antebraco2"],
    [/toes ?to ?bar|\bt ?2 ?b\b|\bttb\b|knees ?to ?elbow|\bk ?2 ?e\b|knee raise|elevacao de (pernas|joelhos)/, "abdomen3 dorsais2 antebraco2 obliquos1"],
    [/chest ?to ?bar|\bc ?2 ?b\b|\bctb\b|pull ?up|chin ?up|barra fixa|\bbarra\b/, "dorsais3 biceps3 antebraco2 ombros1 abdomen1 trapezio1"],
    [/dip|mergulho|paralela/, "triceps3 peito3 ombros2"],
    [/ring row|remada/, "dorsais3 trapezio2 biceps2 ombros1"],
    [/bench|supino/, "peito3 triceps3 ombros2"],
    [/push ?up|flexao|flexoes/, "peito3 triceps2 ombros2 abdomen1"],
    [/swing/, "gluteos3 posteriores3 lombar2 ombros1 abdomen1 antebraco1"],
    [/ghd sit/, "abdomen3 quadriceps1"],
    [/ghd|hip extension|back extension|extensao (lombar|de quadril)|superman|good ?morning/, "lombar3 gluteos2 posteriores2"],
    [/russian twist|side plank|prancha lateral|windmill|obliqu/, "obliquos3 abdomen2"],
    [/sit ?up|abdominal|crunch|v ?up|hollow|l ?sit|plank|prancha|abmat/, "abdomen3 obliquos1"],
    [/farmer|carry|carregamento|suitcase/, "antebraco3 trapezio3 abdomen2 obliquos2 gluteos1"],
    [/sled|treno|prowler/, "quadriceps3 gluteos3 panturrilha2"],
    [/turkish|get ?up|levantamento turco/, "ombros3 abdomen2 obliquos2 gluteos2 quadriceps1"],
    [/mountain climber|escalador/, "abdomen2 ombros2 quadriceps1"],
    [/bear crawl|urso/, "ombros2 abdomen2 quadriceps1"],
    [/jumping jack|polichinelo/, "panturrilha2 ombros1 quadriceps1"],
    [/\bski\b|skierg/, "dorsais3 triceps2 abdomen2 ombros1"],
    [/\brow\b|rower|\bremo\b|concept/, "quadriceps2 gluteos2 posteriores2 dorsais2 biceps1 lombar1"],
    [/bike|assault|echo|bicicleta|ciclismo/, "quadriceps3 gluteos2 panturrilha1 posteriores1 ombros1"],
    [/\brun\b|running|corrida|correr|shuttle|sprint|trote|^\d+ ?(m|km)$/, "panturrilha3 quadriceps2 posteriores2 gluteos2"],
  ].map(([re, s]) => [re, MPESO(s)]);
  const cfMovMusc = (nome) => CF_MOV.find(([re]) => re.test(cfNome(nome)))?.[1] || null;
  function cfMusculos(wod) {
    const tot = {}, movs = [], fora = [];
    for (const p of wod?.partes || []) for (const m of p.movimentos || []) {
      const w = cfMovMusc(m.nome);
      if (!w) { if (!fora.includes(m.nome)) fora.push(m.nome); continue; }
      for (const [g, v] of Object.entries(w)) tot[g] = (tot[g] || 0) + v;
      if (!movs.some((x) => cfNome(x.nome) === cfNome(m.nome))) movs.push({ nome: m.nome, w });
    }
    const max = Math.max(0, ...Object.values(tot));
    const nivel = Object.fromEntries(Object.entries(tot).map(([g, v]) => [g, v / max >= 0.67 ? 3 : v / max >= 0.34 ? 2 : 1]));
    return { nivel, tot, movs, fora };
  }
  // Mesmo desenho dos mapas do Insanity: a base cinza e uma camada azul por grupo (assets/musculos/cf/<grupo>.webp),
  // empilhadas com a opacidade do nível (foco, bastante, apoio).
  const CF_OPAC = { 3: 1, 2: 0.62, 1: 0.3 };
  const cfMapaHtml = (nivel, nome) => `<div class="cf-mapa" role="img" aria-label="Mapa muscular de ${esc(nome)}">
    <img src="${A("musculos/cf/base.webp")}" alt="" loading="lazy" width="900" height="672">
    ${Object.entries(nivel).map(([g, n]) => `<img src="${A(`musculos/cf/${g}.webp`)}" alt="" loading="lazy" width="900" height="672" style="opacity:${CF_OPAC[n]}">`).join("")}</div>`;
  function cfMuscHtml(wod, compacto = false) {
    const { nivel, movs, fora } = cfMusculos(wod);
    const gs = Object.keys(nivel).sort((a, b) => nivel[b] - nivel[a] || Object.keys(CF_MG).indexOf(a) - Object.keys(CF_MG).indexOf(b));
    if (!gs.length) return "";
    const rot = { 3: "Foco", 2: "Bastante", 1: "Apoio" };
    const linha = (n) => { const x = gs.filter((g) => nivel[g] === n); return x.length ? `<li><span class="cf-musc-n m${n}">${rot[n]}</span>${x.map((g) => CF_MG[g]).join(", ")}</li>` : ""; };
    return `<section class="cf-musc${compacto ? " compacto" : ""}" aria-label="Músculos trabalhados no WOD">
      ${compacto ? "" : `<div class="cf-musc-head"><strong>💪 Músculos do WOD</strong><span>${movs.length} ${movs.length === 1 ? "movimento" : "movimentos"}</span></div>`}
      ${cfMapaHtml(nivel, wod.titulo || "WOD")}
      <div class="cf-musc-leg"><span>Frente</span><span>Costas</span></div>
      <ul class="cf-musc-lista">${linha(3)}${linha(2)}${linha(1)}</ul>
      ${compacto ? "" : `<details class="cf-musc-movs"><summary>Por movimento</summary><ul>${movs.map((m) => `<li><strong>${esc(m.nome)}</strong><span>${Object.entries(m.w).sort((a, b) => b[1] - a[1]).filter(([, v]) => v >= 2).map(([g]) => CF_MG[g]).join(", ")}</span></li>`).join("")}</ul></details>`}
      ${fora.length ? `<p class="cf-musc-fora">Fora do mapa: ${fora.map(esc).join(", ")}</p>` : ""}
    </section>`;
  }

  /* ---------- Telas ---------- */
  function cfWodHtml(l, editavel) {
    const w = l.wod;
    return `<div class="cf-wod">
      <div class="cf-wod-head"><h2>${esc(w.titulo)}</h2>${editavel ? `<button class="lnk-btn" data-cf-editar>Editar</button>` : ""}</div>
      ${w.partes.map((p, i) => `<div class="cf-parte${i === w.pontuado ? " pont" : ""}">
        <div class="cf-parte-head"><strong>${esc(p.nome)}</strong><span class="cf-tag">${esc(cfParteTxt(p))}</span>${i === w.pontuado ? `<span class="cf-tag pont">Resultado</span>` : ""}</div>
        ${p.descricao ? `<p class="cf-desc">${esc(p.descricao)}</p>` : ""}
        ${p.movimentos.length ? `<ul class="cf-movs">${p.movimentos.map((m) => `<li>${m.reps ? `<b>${esc(m.reps)}</b> ` : ""}${esc(m.nome)}${m.carga ? ` <span>${esc(m.carga)}</span>` : ""}</li>`).join("")}</ul>` : ""}
        ${editavel && !l.done ? cfTimerHtml(i, p) : ""}
      </div>`).join("")}
      ${cfMuscHtml(w)}
      ${w.obs ? `<p class="note">${esc(w.obs)}</p>` : ""}
      ${l.msg ? `<div class="note-box"><p>✨ ${esc(l.msg)}</p></div>` : ""}
    </div>`;
  }
  function cfResultadoHtml(l, k) {
    const w = l.wod, p = w.partes[w.pontuado], r = l.res || {};
    const ant = cfAnteriores(w.titulo, k), melhor = ant.filter((x) => x.val).sort((a, b) => b.val.v - a.val.v)[0];
    const forcas = w.partes.map((x, i) => [x, i]).filter(([x]) => x.tipo === "forca");
    return `<form class="cf-res" id="cf-res" data-k="${k}">
      <div class="sec-head"><h2>Resultado</h2>${ant.length ? `<span>Já fez ${ant.length} ${ant.length === 1 ? "vez" : "vezes"}${melhor ? ` · melhor ${esc(melhor.val.txt)}` : ""}</span>` : ""}</div>
      ${p.tipo === "for_time" ? `<label class="cf-check"><input type="checkbox" name="cap" ${r.cap ? "checked" : ""}> Não terminei no time cap</label>
        <div class="cf-campos" data-cf-sem-cap ${r.cap ? "hidden" : ""}><label>Tempo<input name="tempo" inputmode="numeric" placeholder="mm:ss" value="${r.tempo ? mmss(r.tempo) : ""}"></label></div>
        <div class="cf-campos" data-cf-com-cap ${r.cap ? "" : "hidden"}><label>Voltas<input name="voltas" type="number" min="0" inputmode="numeric" value="${r.voltas ?? ""}"></label><label>+ reps<input name="reps" type="number" min="0" inputmode="numeric" value="${r.reps ?? ""}"></label></div>`
      : p.tipo === "amrap" ? `<div class="cf-campos"><label>Voltas<input name="voltas" type="number" min="0" inputmode="numeric" value="${r.voltas ?? ""}"></label><label>+ reps<input name="reps" type="number" min="0" inputmode="numeric" value="${r.reps ?? ""}"></label></div>`
      : `<label>Resultado<input name="texto" maxlength="80" placeholder="${p.tipo === "tabata" ? "Ex.: menor round 12" : p.tipo === "forca" ? "Ex.: 5×3 a 80 kg" : "Ex.: completei tudo RX"}" value="${esc(r.texto || "")}"></label>`}
      ${forcas.map(([x, i]) => `<label>${esc(x.nome)}: maior carga (kg)<input name="carga-${i}" type="number" min="0" step="0.5" inputmode="decimal" value="${r.cargas?.[i] ?? ""}"></label>`).join("")}
      <div class="seg seg2 cf-rx" role="radiogroup" aria-label="RX ou Scaled">
        <label class="${r.rx !== false ? "on" : ""}"><input type="radio" name="rx" value="1" ${r.rx !== false ? "checked" : ""}>RX</label>
        <label class="${r.rx === false ? "on" : ""}"><input type="radio" name="rx" value="0" ${r.rx === false ? "checked" : ""}>Scaled</label></div>
      <textarea name="notas" maxlength="300" rows="2" placeholder="Notas: escalas, como se sentiu…">${esc(r.notas || "")}</textarea>
      <button class="btn btn-blue" type="submit">${l.done ? "Atualizar resultado" : "Salvar resultado e concluir"}</button>
      ${l.done ? `<button class="lnk-btn" type="button" data-cf-reabrir="${k}">Reabrir treino</button>` : ""}
    </form>`;
  }
  function cfEditorHtml() {
    const w = cfEdit;
    return `<form class="cf-edit" id="cf-edit">
      <label>Nome do WOD<input name="titulo" maxlength="60" value="${esc(w.titulo || "")}" placeholder="Ex.: Fran, AMRAP 15…" required data-cf-auto="titulo" autocomplete="off"></label>
      ${w.partes.map((p, i) => `<fieldset class="cf-edit-parte" data-i="${i}">
        <div class="cf-edit-linha"><input name="nome" maxlength="30" value="${esc(p.nome)}" aria-label="Nome do bloco">
          <select name="tipo" aria-label="Formato">${Object.entries(CF_TIPOS).map(([k, n]) => `<option value="${k}"${p.tipo === k ? " selected" : ""}>${n}</option>`).join("")}</select></div>
        <div class="cf-edit-linha"><label>Minutos<input name="minutos" type="number" min="0" max="120" inputmode="numeric" value="${p.minutos ?? ""}"></label>
          <label>Voltas/séries<input name="rodadas" type="number" min="0" max="100" inputmode="numeric" value="${p.rodadas ?? ""}"></label>
          <label>Esquema<input name="esquema" maxlength="40" value="${esc(p.esquema || "")}" placeholder="21-15-9"></label></div>
        <label>Movimentos (um por linha: reps, nome e carga entre parênteses)<textarea name="movs" data-cf-auto="movs" autocomplete="off" autocapitalize="sentences" rows="${Math.max(3, p.movimentos.length + 1)}" placeholder="21 Thruster (43/29 kg)&#10;21 Pull-up">${esc(p.movimentos.map(cfMovTxt).join("\n"))}</textarea></label>
        <div class="cf-edit-linha"><label class="cf-check"><input type="radio" name="pontuado" value="${i}" ${w.pontuado === i ? "checked" : ""}> Vale como resultado</label>
          ${w.partes.length > 1 ? `<button type="button" class="lnk-btn" data-cf-tirar-parte="${i}">Remover bloco</button>` : ""}</div>
      </fieldset>`).join("")}
      <button type="button" class="btn btn-outline" data-cf-mais-parte>+ Bloco</button>
      <div class="row2"><button type="button" class="btn btn-outline" data-cf-cancelar-edit>Cancelar</button><button type="submit" class="btn btn-blue">Salvar WOD</button></div>
    </form>`;
  }
  const cfParteVazia = (nome = "WOD", tipo = "for_time") => ({ nome, tipo, movimentos: [] });
  // "21 Thruster (43/29 kg)" → { reps: "21", nome: "Thruster", carga: "43/29 kg" }
  function cfLerMov(linha) {
    let s = linha.trim(), carga = "";
    const c = s.match(/\(([^)]+)\)\s*$/) || s.match(/\s@\s*(.+)$/);
    if (c) { carga = c[1].trim(); s = s.slice(0, c.index).trim(); }
    const r = s.match(/^(\d+(?:[.,]\d+)?\s*(?:m|km|cal|s|seg|min|x)?|max|máx)\b\.?\s+(.+)$/i);
    const nome = (r ? r[2] : s).slice(0, 60), canon = CF_MOVS.find((x) => cfNome(x) === cfNome(nome)) || CF_SIGLAS[norm(nome.trim())]; // "pull-up" → "Pull-up", "DU" → "Double under"
    return { nome: canon || nome, ...(r ? { reps: r[1].replace(/\s+/g, " ").slice(0, 30) } : {}), ...(carga ? { carga: carga.slice(0, 30) } : {}) };
  }
  function cfLerEditor(f) {
    const partes = [...f.querySelectorAll(".cf-edit-parte")].map((fs) => {
      const v = (n) => fs.querySelector(`[name=${n}]`).value.trim(), int = (n) => { const x = parseInt(v(n), 10); return x > 0 ? x : undefined; };
      return { nome: v("nome") || "Bloco", tipo: v("tipo"), ...(int("minutos") ? { minutos: int("minutos") } : {}), ...(int("rodadas") ? { rodadas: int("rodadas") } : {}),
        ...(v("esquema") ? { esquema: v("esquema") } : {}), movimentos: v("movs").split("\n").filter((x) => x.trim()).slice(0, 15).map(cfLerMov),
        ...(cfEdit.partes[+fs.dataset.i]?.descricao ? { descricao: cfEdit.partes[+fs.dataset.i].descricao } : {}) };
    });
    const pont = Number(f.querySelector("[name=pontuado]:checked")?.value ?? partes.length - 1);
    return { titulo: f.elements.titulo.value.trim().slice(0, 60) || "WOD", partes, pontuado: Math.min(pont, partes.length - 1), ...(cfEdit.obs ? { obs: cfEdit.obs } : {}) };
  }
  // Mantém o que já foi digitado no editor quando um bloco é incluído ou removido
  const cfGuardarEditor = () => { const f = $("#cf-edit"); if (f) cfEdit = cfLerEditor(f); };

  function cfAcoesHtml() {
    if (cfLendo) return `<div class="cf-lendo" role="status"><span class="typing"><i></i><i></i><i></i></span><p>${cfLendo === "foto" ? "Lendo o quadro… isso leva uns segundos." : "O Coach está montando seu WOD…"}</p></div>`;
    return `<div class="cf-acoes">
      <label class="cf-acao principal">📷<span><strong>Fotografar o quadro</strong><small>A IA lê o WOD e já lança para você</small></span><input type="file" accept="image/*" capture="environment" data-cf-foto hidden></label>
      <label class="cf-acao">🖼️<span><strong>Foto da galeria</strong><small>Print ou foto que alguém mandou no grupo do box</small></span><input type="file" accept="image/*" data-cf-foto hidden></label>
      <button class="cf-acao" data-cf-escrever>✍️<span><strong>Escrever o WOD</strong><small>Digite os blocos e movimentos</small></span></button>
      <button class="cf-acao" data-cf-gerar>✨<span><strong>Coach monta um WOD</strong><small>Para treinar na garagem ou no dia sem box</small></span></button>
    </div>`;
  }
  /* ---------- Menu do CrossFit: Hoje · Timer · Histórico · PRs · Benchmarks ---------- */
  const CF_MENU = [["", "📋", "Hoje"], ["timer", "⏱️", "Timer"], ["historico", "🗓️", "Histórico"], ["prs", "🏋️", "PRs"], ["benchmarks", "🏆", "Benchmarks"]];
  const cfMenu = (on) => `<nav class="cf-menu" aria-label="Menu do CrossFit">${CF_MENU.map(([r, ic, n]) =>
    `<a href="#/cf${r ? `/${r}` : ""}" class="${on === r ? "on" : ""}"${on === r ? ' aria-current="page"' : ""}><span aria-hidden="true">${ic}</span>${n}</a>`).join("")}</nav>`;

  // WODs clássicos (Girls e Heroes), no mesmo formato dos WODs lançados
  const M_ = (nome, reps, carga) => ({ nome, ...(reps ? { reps } : {}), ...(carga ? { carga } : {}) });
  const B_ = (titulo, cat, tipo, movimentos, extra = {}) => ({ titulo, cat, wod: { titulo, pontuado: 0, partes: [{ nome: "WOD", tipo, movimentos, ...extra }] } });
  const CF_BENCH = [
    B_("Fran", "Girls", "for_time", [M_("Thruster", "", "43/29 kg"), M_("Pull-up")], { esquema: "21-15-9" }),
    B_("Grace", "Girls", "for_time", [M_("Clean and jerk", "30", "61/43 kg")]),
    B_("Isabel", "Girls", "for_time", [M_("Snatch", "30", "61/43 kg")]),
    B_("Diane", "Girls", "for_time", [M_("Deadlift", "", "102/70 kg"), M_("Handstand push-up")], { esquema: "21-15-9" }),
    B_("Elizabeth", "Girls", "for_time", [M_("Clean", "", "61/43 kg"), M_("Ring dip")], { esquema: "21-15-9" }),
    B_("Helen", "Girls", "for_time", [M_("Corrida", "400 m"), M_("Kettlebell swing", "21", "24/16 kg"), M_("Pull-up", "12")], { rodadas: 3 }),
    B_("Karen", "Girls", "for_time", [M_("Wall ball", "150", "9/6 kg")]),
    B_("Annie", "Girls", "for_time", [M_("Double under"), M_("Abdominal (sit-up)")], { esquema: "50-40-30-20-10" }),
    B_("Jackie", "Girls", "for_time", [M_("Remo", "1000 m"), M_("Thruster", "50", "20/15 kg"), M_("Pull-up", "30")]),
    B_("Nancy", "Girls", "for_time", [M_("Corrida", "400 m"), M_("Overhead squat", "15", "43/29 kg")], { rodadas: 5 }),
    B_("Kelly", "Girls", "for_time", [M_("Corrida", "400 m"), M_("Box jump", "30", "60/50 cm"), M_("Wall ball", "30", "9/6 kg")], { rodadas: 5 }),
    B_("Angie", "Girls", "for_time", [M_("Pull-up", "100"), M_("Flexão", "100"), M_("Abdominal (sit-up)", "100"), M_("Agachamento", "100")]),
    B_("Cindy", "Girls", "amrap", [M_("Pull-up", "5"), M_("Flexão", "10"), M_("Agachamento", "15")], { minutos: 20 }),
    B_("Mary", "Girls", "amrap", [M_("Handstand push-up", "5"), M_("Pistol alternado", "10"), M_("Pull-up", "15")], { minutos: 20 }),
    B_("Chelsea", "Girls", "emom", [M_("Pull-up", "5"), M_("Flexão", "10"), M_("Agachamento", "15")], { minutos: 30 }),
    B_("Murph", "Heroes", "for_time", [M_("Corrida", "1,6 km"), M_("Pull-up", "100"), M_("Flexão", "200"), M_("Agachamento", "300"), M_("Corrida", "1,6 km")], { descricao: "Com colete de 9/6 kg. Pode dividir pull-ups, flexões e agachamentos como quiser (ex.: 20 voltas de 5-10-15)." }),
    B_("DT", "Heroes", "for_time", [M_("Deadlift", "12", "70/47 kg"), M_("Hang power clean", "9", "70/47 kg"), M_("Push jerk", "6", "70/47 kg")], { rodadas: 5 }),
  ];


  /* ---------- Insígnias de benchmark: fez o benchmark, ganha a insígnia. Ouro = RX; nos de carga, a barra mostra a % da carga RX usada ---------- */
  const cargaKg = (c, g) => { const n = String(c || "").match(/\d+(?:[.,]\d+)?/g); if (!n || !/kg/i.test(c)) return 0; return Number((n.length > 1 && g === "f" ? n[1] : n[0]).replace(",", ".")); };
  function insigniasBench(rows, g = "m") {
    const cf = rows.filter((r) => r.programa === "cf" && r.concluido && r.detalhes?.wod);
    return CF_BENCH.map((b) => {
      const movsRx = b.wod.partes[0].movimentos.filter((m) => cargaKg(m.carga, g));
      const feitos = cf.filter((r) => cfNome(r.detalhes.wod.titulo) === cfNome(b.titulo)).sort((x, y) => x.data.localeCompare(y.data));
      const base = { b, carga: movsRx.length > 0, vezes: feitos.length };
      if (!feitos.length) return { ...base, feito: false };
      let pct = movsRx.length ? 0 : null, rx = false, melhor = null;
      for (const r of feitos) {
        const l = { wod: r.detalhes.wod, res: r.detalhes.res || {} }, eRx = l.res.rx !== false;
        if (eRx) rx = true;
        if (movsRx.length) {
          let p = eRx ? 100 : null;
          if (!eRx) { // Scaled: compara a carga anotada em cada movimento com a carga RX
            const ms = l.wod.partes.flatMap((x) => x.movimentos || []);
            const rs = movsRx.map((mr) => { const lm = ms.find((m) => cfNome(m.nome) === cfNome(mr.nome)); const u = lm && lm.carga !== mr.carga ? cargaKg(lm.carga, g) : 0; return u ? Math.min(100, Math.round((u / cargaKg(mr.carga, g)) * 100)) : null; }).filter((x) => x != null);
            p = rs.length ? Math.min(...rs) : null;
          }
          if (p != null && p > pct) pct = p;
        }
        const v = l.wod.partes?.length ? cfValor(l) : null;
        if (v && (!melhor || v.v > melhor.v)) melhor = { ...v, rx: eRx };
      }
      const tier = rx ? "ouro" : movsRx.length ? (pct >= 70 ? "prata" : "bronze") : "prata";
      return { ...base, feito: true, rx, pct, melhor, tier, em: feitos[0].data };
    });
  }
  function insigniasHtml(rows, g, eu) {
    const ins = insigniasBench(rows, g), n = ins.filter((x) => x.feito).length;
    if (!n && !eu) return "";
    const tile = (x) => `<div class="ins-it ${x.feito ? `ins-${x.tier}` : "ins-off"}" title="${esc(x.b.titulo)}${x.feito ? ` · ${x.rx ? "RX" : "Scaled"}` : " · ainda não feito"}">
      <span class="ins-med">${x.b.cat === "Heroes" ? "🎖️" : "🏆"}</span><b>${esc(x.b.titulo)}</b>
      <small>${x.feito ? `${x.melhor ? esc(x.melhor.txt) : "feito"}${x.rx ? " · RX" : " · Scaled"}` : "—"}</small>
      ${x.carga ? `<span class="ins-hp" aria-label="Carga: ${x.feito && x.pct != null ? x.pct : 0}% da RX"><i style="width:${x.feito && x.pct != null ? x.pct : 0}%"></i></span><small class="ins-pct">${x.feito ? (x.pct != null ? `${x.pct}% da carga RX` : "carga não anotada") : "com carga"}</small>` : ""}</div>`;
    return `<div class="ins-box"><div class="sec-head"><h2>Insígnias de benchmark</h2><span>${n}/${ins.length}</span></div>
      <div class="ins-grid">${[...ins].sort((a, c) => c.feito - a.feito).map(tile).join("")}</div>
      ${eu ? `<p class="note small">Fez o benchmark, ganhou a insígnia: <b>ouro</b> em RX; nos de carga, <b>prata</b> com 70% ou mais da carga RX e <b>bronze</b> abaixo disso (anote a carga que usou no Scaled). ${sexoArte() === "f" ? "Carga RX feminina." : "Carga RX masculina."}</p>` : ""}</div>`;
  }

  /* ---------- PRs (levantamentos) ---------- */
  const CF_LIFTS = ["Back squat", "Front squat", "Overhead squat", "Deadlift", "Clean", "Power clean", "Squat clean", "Clean and jerk", "Snatch", "Power snatch", "Push press", "Push jerk", "Split jerk", "Strict press", "Bench press", "Thruster"];
  const est1rm = (kg, reps) => (reps <= 1 ? kg : Math.round(kg * (1 + reps / 30) * 2) / 2); // Epley
  function cfPrsPorMov() {
    const g = {};
    for (const x of S.cf.prs || []) (g[cfNome(x.mov)] ||= { mov: x.mov, itens: [] }).itens.push(x);
    return Object.values(g).map((m) => {
      m.itens.sort((a, b) => b.k.localeCompare(a.k) || b.kg - a.kg);
      const melhorPorReps = {};
      for (const x of m.itens) if (!melhorPorReps[x.reps] || x.kg > melhorPorReps[x.reps].kg) melhorPorReps[x.reps] = x;
      m.porReps = Object.values(melhorPorReps).sort((a, b) => a.reps - b.reps);
      m.rm1 = melhorPorReps[1]?.kg || 0; m.est = Math.max(...m.itens.map((x) => est1rm(x.kg, x.reps)));
      m.ultimo = m.itens[0].k;
      return m;
    }).sort((a, b) => b.ultimo.localeCompare(a.ultimo));
  }
  function cfAddPr(mov, reps, kg, k, origem) {
    S.cf.prs = [...(S.cf.prs || []), { id: Date.now().toString(36) + Math.random().toString(36).slice(2, 5), mov: String(mov).trim().slice(0, 40), reps, kg, k, ...(origem ? { origem } : {}) }].slice(-300);
    S.cf.prsEm = Date.now();
  }
  // Repetições de um bloco de força pelo esquema ("5-5-5-5-5" → 5, "5x3" → 3, "1RM" → 1); null se não der para saber
  function cfRepsForca(p) {
    const e = String(p.esquema || "").toLowerCase().replace(/\s/g, "");
    if (/^(\d+)rm$/.test(e)) return Number(e.match(/^(\d+)/)[1]);
    if (/^\d+x\d+$/.test(e)) return Number(e.split("x")[1]);
    const ns = e.split(/[-,/]/).map(Number);
    return ns.length && ns.every((n) => n > 0) ? Math.min(...ns) : null;
  }
  function cfTelaPrs() {
    const ms = cfPrsPorMov(), aberto = S.cf.prAberto;
    return `<form class="cf-res cf-pr-form" id="cf-pr-form">
      <div class="sec-head"><h2>Novo PR</h2></div>
      <label>Movimento<input name="mov" data-cf-auto="mov" autocomplete="off" maxlength="40" required placeholder="Ex.: Back squat" value="${esc(S.cf.ultimoMov || "")}"></label>
      <div class="cf-campos cf-campos3"><label>Reps<select name="reps">${[1, 2, 3, 5, 10].map((n) => `<option value="${n}">${n}RM</option>`).join("")}</select></label>
        <label>Carga (kg)<input name="kg" type="number" min="1" max="500" step="0.5" inputmode="decimal" required></label>
        <label>Data<input name="k" type="date" max="${hojeKey}" value="${hojeKey}"></label></div>
      <button class="btn btn-blue" type="submit">Salvar PR</button></form>
    ${ms.length ? `<div class="sec-head"><h2>Seus PRs</h2><span>${ms.length} ${ms.length === 1 ? "movimento" : "movimentos"}</span></div>
      <div class="cf-prs">${ms.map((m) => `<details class="cf-pr"${aberto === cfNome(m.mov) ? " open" : ""} data-cf-pr-mov="${esc(cfNome(m.mov))}">
        <summary><span><strong>${esc(m.mov)}</strong><small>${m.porReps.map((x) => `${x.reps}RM ${kgTxt(x.kg)}`).join(" · ")}</small></span><b>${m.rm1 ? kgTxt(m.rm1) : `~${kgTxt(m.est)}`}</b></summary>
        <p class="note">${m.rm1 ? "1RM" : "1RM estimado (fórmula de Epley)"}: <b>${kgTxt(m.rm1 || m.est)}</b>. Porcentagens para os treinos:</p>
        <div class="cf-pct">${[50, 60, 65, 70, 75, 80, 85, 90, 95].map((p) => `<span><small>${p}%</small><b>${kgTxt(Math.round(((m.rm1 || m.est) * p) / 100 * 2) / 2)}</b></span>`).join("")}</div>
        <ul class="cf-pr-hist">${m.itens.slice(0, 12).map((x) => `<li><span>${ddmm(x.k)}</span><span>${x.reps}RM · <b>${kgTxt(x.kg)}</b>${x.origem === "wod" ? " <small>(WOD)</small>" : ""}</span><button class="lnk-btn" data-cf-pr-apagar="${x.id}" aria-label="Apagar">✕</button></li>`).join("")}</ul>
      </details>`).join("")}</div>` : `<p class="note">Anote seus PRs de levantamento (1RM, 3RM, 5RM…). O app calcula as porcentagens que o coach pede no quadro (ex.: 5×3 a 75%).</p>`}`;
  }
  const kgTxt = (n) => `${fmtKg(n)} kg`;


  /* ---------- Autocompletar nomes (movimentos, PRs e nome do WOD) ---------- */
  // Lista dos movimentos mais comuns nos quadros, mais as siglas (DU, T2B, HSPU…). Os que a pessoa já usou vêm primeiro.
  const CF_MOVS = [
    "Back squat", "Front squat", "Overhead squat", "Air squat", "Agachamento", "Goblet squat", "Pistol", "Deadlift", "Sumo deadlift", "Sumo deadlift high pull", "Romanian deadlift",
    "Clean", "Power clean", "Squat clean", "Hang power clean", "Hang squat clean", "Clean and jerk", "Squat clean and jerk",
    "Snatch", "Power snatch", "Squat snatch", "Hang power snatch", "Hang squat snatch", "Overhead lunge",
    "Push press", "Push jerk", "Split jerk", "Strict press", "Bench press", "Thruster", "Cluster", "Good morning", "Hip thrust",
    "Wall ball", "Kettlebell swing", "Russian kettlebell swing", "American kettlebell swing", "Kettlebell snatch", "Kettlebell clean", "Turkish get-up",
    "Dumbbell snatch", "Dumbbell clean", "Dumbbell clean and jerk", "Dumbbell thruster", "Dumbbell push press", "Dumbbell walking lunge", "Devil press", "Man maker",
    "Front rack lunge", "Walking lunge", "Jumping lunge", "Afundo", "Box step-up", "Farmer carry", "Sandbag carry", "Sandbag clean",
    "Pull-up", "Strict pull-up", "Kipping pull-up", "Butterfly pull-up", "Chest to bar", "Muscle up", "Bar muscle up", "Ring muscle up",
    "Toes to bar", "Knees to elbow", "Hanging knee raise", "Handstand push-up", "Strict handstand push-up", "Handstand walk", "Handstand hold", "Wall walk",
    "Ring dip", "Bar dip", "Push-up", "Flexão", "Hand release push-up", "Ring row", "Rope climb", "Legless rope climb",
    "Sit-up", "Abdominal (sit-up)", "GHD sit-up", "Hollow rock", "Hollow hold", "V-up", "L-sit", "Plank", "Prancha", "Back extension", "Hip extension", "Superman",
    "Burpee", "Bar-facing burpee", "Burpee over the bar", "Burpee box jump over", "Box jump", "Box jump over", "Broad jump", "Tuck jump", "Jumping jack", "Polichinelo", "Mountain climber", "Wall sit",
    "Double under", "Single under", "Triple under", "Corrida", "Shuttle run", "Remo", "Bike", "Assault bike", "Echo bike", "Ski erg", "Natação",
  ];
  const CF_SIGLAS = { du: "Double under", su: "Single under", t2b: "Toes to bar", ttb: "Toes to bar", k2e: "Knees to elbow", hspu: "Handstand push-up", shspu: "Strict handstand push-up",
    c2b: "Chest to bar", ctb: "Chest to bar", mu: "Muscle up", bmu: "Bar muscle up", rmu: "Ring muscle up", wb: "Wall ball", kb: "Kettlebell swing", kbs: "Kettlebell swing",
    ohs: "Overhead squat", dl: "Deadlift", pc: "Power clean", sc: "Squat clean", hpc: "Hang power clean", ps: "Power snatch", hps: "Hang power snatch", pp: "Push press", pj: "Push jerk",
    bs: "Back squat", fs: "Front squat", bj: "Box jump", bjo: "Box jump over", bbjo: "Burpee box jump over", bfb: "Bar-facing burpee", sdhp: "Sumo deadlift high pull",
    ghd: "GHD sit-up", rc: "Rope climb", hsw: "Handstand walk", cj: "Clean and jerk", "c&j": "Clean and jerk", tgu: "Turkish get-up", rdl: "Romanian deadlift",
    run: "Corrida", row: "Remo", flexao: "Flexão", abdominal: "Abdominal (sit-up)" };
  function cfUsados(tipo) {
    const n = {};
    if (tipo === "titulo") { for (const l of Object.values(S.cf.logs)) if (l.wod?.titulo) n[l.wod.titulo] = (n[l.wod.titulo] || 0) + 1; }
    else {
      for (const l of Object.values(S.cf.logs)) for (const p of l.wod?.partes || []) for (const m of p.movimentos) n[m.nome] = (n[m.nome] || 0) + 1;
      for (const x of S.cf.prs || []) n[x.mov] = (n[x.mov] || 0) + 2;
    }
    return Object.entries(n).sort((a, b) => b[1] - a[1]).map(([k]) => k);
  }
  function cfSugestoes(q, tipo) {
    const t = cfNome(q);
    if (!t || /^\d/.test(t)) return [];
    const base = tipo === "titulo" ? [...cfUsados("titulo"), ...CF_BENCH.map((b) => b.titulo)] : tipo === "mov" ? [...cfUsados("mov"), ...CF_LIFTS, ...CF_MOVS] : [...cfUsados("mov"), ...CF_MOVS];
    const vistos = new Set(), out = [];
    const add = (x) => { const k = cfNome(x); if (!k || vistos.has(k) || out.length >= 8) return; vistos.add(k); out.push(x); };
    const sigla = CF_SIGLAS[norm(String(q).trim())];
    if (sigla && tipo !== "titulo") add(sigla);
    if (tipo !== "titulo" && t.length >= 2) for (const [k, v] of Object.entries(CF_SIGLAS)) if (k.length >= 3 && k.startsWith(t)) add(v); // run → Corrida, row → Remo
    for (const x of base) if (cfNome(x).startsWith(t)) add(x);
    for (const x of base) if (cfNome(x).split(" ").some((w) => w.startsWith(t))) add(x);
    if (t.length >= 3) for (const x of base) if (cfNome(x).includes(t)) add(x);
    return out.filter((x) => cfNome(x) !== t);
  }
  // Linha do textarea onde está o cursor: { ini, fim, pre (reps), nome (o que está sendo digitado), resto (carga) }
  function cfLinhaAtual(ta) {
    const v = ta.value, pos = ta.selectionStart, ini = v.lastIndexOf("\n", pos - 1) + 1, f = v.indexOf("\n", pos), fim = f < 0 ? v.length : f;
    const m = v.slice(ini, fim).match(/^(\s*(?:\d+(?:[.,]\d+)?\s*(?:m|km|cal|s|seg|min|x)?|max|máx)\.?\s+)?([^(@]*)(.*)$/i);
    return { ini, fim, pre: m[1] || "", nome: m[2], resto: m[3] };
  }
  function cfSugMostrar(campo) {
    const tipo = campo.dataset.cfAuto, q = tipo === "movs" ? cfLinhaAtual(campo).nome : campo.value;
    const lista = cfSugestoes(q, tipo);
    let box = campo.parentElement.querySelector(":scope > .cf-sug");
    if (!lista.length) { box?.remove(); return; }
    if (!box) { box = document.createElement("div"); box.className = "cf-sug"; box.setAttribute("role", "listbox"); box.setAttribute("aria-label", "Sugestões"); campo.insertAdjacentElement("afterend", box); }
    box.innerHTML = lista.map((x) => `<button type="button" role="option" class="cf-sug-op" data-cf-sug="${esc(x)}">${esc(x)}${CF_BENCH.some((b) => b.titulo === x) && tipo === "titulo" ? " 🏆" : ""}</button>`).join("");
    box.scrollLeft = 0;
  }
  function cfSugEscolher(campo, x) {
    const tipo = campo.dataset.cfAuto;
    if (tipo === "movs") {
      const l = cfLinhaAtual(campo), novo = l.pre + x + (l.resto.trim() ? ` ${l.resto.trim()}` : "");
      campo.value = campo.value.slice(0, l.ini) + novo + campo.value.slice(l.fim);
      const c = l.ini + l.pre.length + x.length; campo.setSelectionRange(c, c);
    } else campo.value = x;
    campo.parentElement.querySelector(":scope > .cf-sug")?.remove();
    // Escolheu um benchmark no nome do WOD e ainda não escreveu nada: preenche o treino inteiro
    const b = tipo === "titulo" && CF_BENCH.find((y) => y.titulo === x);
    if (b && cfEdit && ![...document.querySelectorAll("#cf-edit [name=movs]")].some((t) => t.value.trim())) {
      cfEdit = { k: cfEdit.k, ...JSON.parse(JSON.stringify(b.wod)) }; render(); toast(`${b.titulo} preenchido ✓`); return;
    }
    campo.focus();
  }
  document.addEventListener("input", (e) => { if (e.target.matches?.("[data-cf-auto]")) cfSugMostrar(e.target); });
  document.addEventListener("keyup", (e) => { if (e.target.matches?.("textarea[data-cf-auto]") && /Arrow|Home|End/.test(e.key)) cfSugMostrar(e.target); });
  document.addEventListener("focusout", (e) => { if (e.target.matches?.("[data-cf-auto]")) setTimeout(() => { if (document.activeElement !== e.target) e.target.parentElement?.querySelector(":scope > .cf-sug")?.remove(); }, 200); });
  // pointerdown com preventDefault: tocar na sugestão não tira o foco do campo (o teclado continua aberto)
  document.addEventListener("pointerdown", (e) => { if (e.target.closest("[data-cf-sug]")) e.preventDefault(); });
  document.addEventListener("click", (e) => {
    const op = e.target.closest("[data-cf-sug]");
    if (!op) return;
    const campo = op.parentElement.parentElement.querySelector(":scope > [data-cf-auto]");
    if (campo) cfSugEscolher(campo, op.dataset.cfSug);
  });

  /* ---------- Timer avulso ---------- */
  const CF_TIMER_PADRAO = { tipo: "for_time", cap: 0, min: 12, emomMin: 10, cada: 1, rodadas: 8, trab: 20, desc: 10 };
  function cfTelaTimer() {
    if (cfTm?.k === "avulso") return `<div class="sec-head"><h2>${CF_TIPOS[cfTm.tipo] || "Timer"}</h2></div>${cfRelogioHtml(cfTm.tipo === "amrap" || cfTm.tipo === "for_time")}`;
    if (cfTm) return `<p class="note">Tem um cronômetro rodando no WOD de hoje. <a class="lnk" href="#/cf">Voltar para ele</a></p>`;
    const c = { ...CF_TIMER_PADRAO, ...(S.cf.timer || {}) }, t = c.tipo;
    const campo = (n, rot, v, extra = "") => `<label>${rot}<input name="${n}" type="number" min="0" inputmode="numeric" value="${v}" ${extra}></label>`;
    return `<form class="cf-res" id="cf-timer-form">
      <div class="cf-formatos" role="radiogroup" aria-label="Formato">${["for_time", "amrap", "emom", "tabata", "intervalos"].map((k) =>
        `<label class="${t === k ? "on" : ""}"><input type="radio" name="tipo" value="${k}" ${t === k ? "checked" : ""}>${CF_TIPOS[k]}</label>`).join("")}</div>
      <div class="cf-campos">${t === "for_time" ? campo("cap", "Time cap (min, opcional)", c.cap || "", 'max="180" placeholder="sem cap"')
        : t === "amrap" ? campo("min", "Duração (min)", c.min, 'min="1" max="120" required')
        : t === "emom" ? campo("emomMin", "Duração (min)", c.emomMin, 'min="1" max="120" required') + `<label>A cada<select name="cada">${[1, 2, 3, 4, 5].map((n) => `<option value="${n}"${c.cada === n ? " selected" : ""}>${n} min</option>`).join("")}</select></label>`
        : campo("rodadas", "Rodadas", c.rodadas, 'min="1" max="100" required') + campo("trab", "Trabalho (s)", c.trab, 'min="5" max="600" required') + campo("desc", "Descanso (s)", c.desc, 'min="0" max="600" required')}</div>
      <p class="note">${t === "for_time" ? "Conta para cima. Use +1 volta para marcar as voltas e Terminei para parar." : t === "amrap" ? "Contagem regressiva; marque cada volta com +1 volta." : t === "emom" ? "O celular vibra no começo de cada rodada." : t === "tabata" ? "Padrão: 8 rodadas de 20 s de trabalho e 10 s de descanso (4 min)." : "Trabalho e descanso alternados; o celular vibra a cada troca."}</p>
      <button class="btn btn-blue cf-iniciar" type="submit">⏱ Iniciar</button></form>`;
  }

  /* ---------- Histórico ---------- */
  function cfTelaHistorico() {
    const dias = Object.entries(S.cf.logs).filter(([, l]) => l.wod).sort((a, b) => b[0].localeCompare(a[0]));
    if (!dias.length) return `<p class="note">Os WODs que você lançar aparecem aqui, com o resultado de cada dia.</p>`;
    const feitos = dias.filter(([, l]) => l.done), rx = feitos.filter(([, l]) => l.res?.rx !== false).length;
    const mes = hojeKey.slice(0, 7), noMes = feitos.filter(([k]) => k.startsWith(mes)).length;
    const meses = {};
    for (const d of dias) (meses[d[0].slice(0, 7)] ||= []).push(d);
    const nomeMes = (m) => new Date(`${m}-15T12:00:00`).toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
    return `<div class="stats-row">${stat("circle-check.svg", feitos.length, "WODs feitos")}${stat("calendar-14.svg", noMes, "Neste mês")}</div>
      <div class="stats-row">${stat("flame.svg", feitos.length ? `${Math.round((rx / feitos.length) * 100)}%` : "—", "Em RX")}${stat("zap.svg", (S.cf.prs || []).length, "PRs anotados")}</div>
      ${Object.entries(meses).map(([m, ds]) => `<div class="sec-head"><h2 class="cf-mes">${esc(nomeMes(m))}</h2><span>${ds.filter(([, l]) => l.done).length} feitos</span></div>
        <ul class="cf-hist">${ds.map(([k, l]) => `<li><a href="#/cf/${k}"><span class="cf-hist-data">${ddmm(k)}</span><span><strong>${esc(l.wod.titulo)}</strong><small>${esc(cfResTxt(l) || (l.done ? "Feito" : "Sem resultado"))}</small></span>${l.done ? "✅" : ""}</a></li>`).join("")}</ul>`).join("")}`;
  }

  /* ---------- Benchmarks ---------- */
  function cfTelaBenchmarks() {
    const linha = (b) => {
      const ant = cfAnteriores(b.titulo, "9999-12-31"), m = ant.filter((x) => x.val).sort((a, c) => c.val.v - a.val.v)[0], p = b.wod.partes[0];
      return `<details class="cf-bench"><summary><span><strong>${esc(b.titulo)}</strong><small>${esc(cfParteTxt(p))}${(() => { const n = cfMusculos(b.wod).nivel, f = Object.keys(n).filter((g) => n[g] === 3).map((g) => CF_MG[g]); return f.length ? ` · 💪 ${esc(f.slice(0, 3).join(", "))}${f.length > 3 ? ` +${f.length - 3}` : ""}` : ""; })()}</small></span>${m ? `<b>🏆 ${esc(m.val.txt)}</b>` : ant.length ? "<b>✅</b>" : ""}</summary>
        <ul class="cf-movs">${p.movimentos.map((x) => `<li>${x.reps ? `<b>${esc(x.reps)}</b> ` : ""}${esc(x.nome)}${x.carga ? ` <span>${esc(x.carga)}</span>` : ""}</li>`).join("")}</ul>
        ${p.descricao ? `<p class="cf-desc">${esc(p.descricao)}</p>` : ""}
        ${cfMuscHtml(b.wod, true)}
        ${ant.length ? `<p class="note">Você já fez ${ant.length} ${ant.length === 1 ? "vez" : "vezes"}: ${ant.slice(-4).map((x) => `${ddmm(x.k)} ${x.val ? x.val.txt : "feito"}`).join(" · ")}</p>` : ""}
        <button class="btn btn-blue" data-cf-bench="${esc(b.titulo)}">Fazer hoje</button></details>`;
    };
    return `<p class="note">Os WODs de referência do CrossFit. Repita de tempos em tempos para medir a evolução: o app guarda o seu melhor resultado.</p>
      <div class="sec-head"><h2>Girls</h2></div><div class="cf-prs">${CF_BENCH.filter((b) => b.cat === "Girls").map(linha).join("")}</div>
      <div class="sec-head"><h2>Heroes</h2></div><div class="cf-prs">${CF_BENCH.filter((b) => b.cat === "Heroes").map(linha).join("")}</div>`;
  }

  telas.cf = (p1) => {
    setToolbar("cf");
    const sub = CF_MENU.some(([r]) => r && r === p1) ? p1 : null;
    const dia = !sub && /^\d{4}-\d{2}-\d{2}$/.test(p1 || "") && p1 <= hojeKey ? p1 : null;
    const k = dia || hojeKey, l = cfLog(k), ehHoje = k === hojeKey;
    if (dia && !ehHoje) {
      const corpo = cfEdit && cfEdit.k === k ? cfEditorHtml() : l?.wod ? cfWodHtml(l, true) + cfResultadoHtml(l, k) : `<p class="note">Nenhum WOD neste dia.</p>`;
      return `<section class="screen has-toolbar"><div class="list" style="gap:16px">
        <div class="page-head"><a class="icon-btn" href="#/cf/historico" aria-label="Voltar">${icon("chevron-left.svg", 24)}</a><h1>WOD de ${ddmm(k)}</h1><span class="spacer"></span></div>
        <div class="section cf">${corpo}</div></div></section>`;
    }
    let corpo;
    if (sub === "timer") corpo = cfTelaTimer();
    else if (sub === "historico") corpo = cfTelaHistorico();
    else if (sub === "prs") corpo = cfTelaPrs();
    else if (sub === "benchmarks") corpo = cfTelaBenchmarks();
    else if (cfEdit && cfEdit.k === k) corpo = cfEditorHtml();
    else if (l?.wod) corpo = cfWodHtml(l, true) + cfResultadoHtml(l, k) + (!l.done && !cfTm ? `<button class="lnk-btn cf-trocar" data-cf-trocar>Trocar o WOD de hoje</button>` : "");
    else corpo = `<div class="sec-head"><h2>WOD de hoje</h2><span>${DIAS[hojeDia]}, ${ddmm(hojeKey)}</span></div>${cfAcoesHtml()}`;
    return `<section class="screen has-toolbar"><div class="list" style="gap:16px">
      <div class="page-head"><h1>CrossFit</h1><span class="spacer"></span></div>${progSwitch("cf")}${cfMenu(sub || "")}
      <div class="section cf">${corpo}</div></div></section>`;
  };
  // Card na tela inicial
  function cfHome(principalAqui) {
    const l = cfLog(), titulo = principalAqui ? "Treino de Hoje" : "CrossFit";
    const head = `<div class="sec-head"><h2>${titulo}</h2><a href="#/cf">CrossFit</a></div>`;
    if (!l?.wod) return head + `<a class="emerg" href="#/cf"><span>📷</span><div><strong>Fotografe o WOD do quadro</strong><small>A IA lê e lança o treino; você só anota o resultado</small></div></a>`;
    const p = l.wod.partes[l.wod.pontuado];
    return head + `<a class="emerg" href="#/cf"><span>${l.done ? "✅" : "🔥"}</span><div><strong>${esc(l.wod.titulo)}</strong><small>${l.done ? esc(cfResTxt(l) || "Feito") : esc(`${p.nome} · ${cfParteTxt(p)}`)}</small></div></a>`;
  }
  function cfContextoTexto() {
    const ds = Object.entries(S.cf.logs).filter(([, l]) => l.wod).sort().slice(-12);
    const prs = cfPrsPorMov().map((m) => `${m.mov}: ${m.porReps.map((x) => `${x.reps}RM ${fmtKg(x.kg)} kg`).join(", ")}`).join("; ");
    if (!ds.length) return prs ? `PRs de levantamento (CrossFit): ${prs}` : "";
    return (prs ? `PRs de levantamento (CrossFit): ${prs}\n` : "") + "WODs de CrossFit registrados:\n" + ds.map(([k, l]) => `- ${k} ${l.wod.titulo}: ${l.wod.partes.map((p) => `${p.nome} (${cfParteTxt(p)}): ${p.movimentos.map(cfMovTxt).join(", ")}`).join(" | ")}. Resultado: ${cfResTxt(l) || (l.done ? "feito" : "não anotado")}${l.res?.notas ? `. Notas: ${l.res.notas}` : ""}`).join("\n");
  }

  /* ---------- Eventos ---------- */
  document.addEventListener("change", (e) => {
    const t = e.target;
    if (t.matches("[data-cf-foto]") && t.files?.[0]) { cfLerFoto(t.files[0]); t.value = ""; }
    else if (t.closest("#cf-res") && t.name === "cap") { const f = t.form; f.querySelector("[data-cf-sem-cap]").hidden = t.checked; f.querySelector("[data-cf-com-cap]").hidden = !t.checked; }
    else if (t.closest(".cf-rx") && t.name === "rx") t.closest(".cf-rx").querySelectorAll("label").forEach((x) => x.classList.toggle("on", x.contains(t)));
    else if (t.closest("#cf-timer-form") && t.name === "tipo") { S.cf.timer = { ...(S.cf.timer || {}), tipo: t.value }; save(); render(); }
  });
  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-cf-bench],[data-cf-pr-apagar],[data-cf-escrever],[data-cf-gerar],[data-cf-editar],[data-cf-trocar],[data-cf-timer],[data-cf-parar],[data-cf-volta],[data-cf-mais-parte],[data-cf-tirar-parte],[data-cf-cancelar-edit],[data-cf-reabrir]");
    if (!t) return;
    const ds = t.dataset, k = /^#\/cf\/(\d{4}-\d{2}-\d{2})/.exec(location.hash)?.[1] || hojeKey;
    if (ds.cfBench) {
      const b = CF_BENCH.find((x) => x.titulo === ds.cfBench), l = cfLog();
      if (!b) return;
      if (l?.wod && cfNome(l.wod.titulo) !== cfNome(b.titulo) && !confirm(`Trocar o WOD de hoje (${l.wod.titulo}) por ${b.titulo}?`)) return;
      cfSalvarWod(JSON.parse(JSON.stringify(b.wod))); toast(`${b.titulo} é o WOD de hoje. Bora! 🔥`); location.hash = "#/cf"; return;
    }
    if (ds.cfPrApagar) { if (!confirm("Apagar este registro?")) return; S.cf.prs = (S.cf.prs || []).filter((x) => x.id !== ds.cfPrApagar); S.cf.prsEm = Date.now(); save(); render(); return; }
    if (t.hasAttribute("data-cf-escrever")) { cfEdit = { k, titulo: "", partes: [cfParteVazia("Força", "forca"), cfParteVazia("WOD", "for_time")], pontuado: 1 }; render(); }
    else if (t.hasAttribute("data-cf-gerar")) {
      const pedido = prompt("O que você quer hoje? (tempo, equipamento, foco)\nEx.: 30 min, só halteres e barra fixa, foco em pernas", S.cf.ultimoPedido || "");
      if (pedido === null) return;
      S.cf.ultimoPedido = pedido.slice(0, 300); cfGerar(pedido);
    }
    else if (t.hasAttribute("data-cf-editar")) { const l = cfLog(k); cfEdit = { k, ...JSON.parse(JSON.stringify(l.wod)) }; render(); }
    else if (t.hasAttribute("data-cf-trocar")) { if (!confirm("Trocar o WOD de hoje? O resultado anotado será apagado.")) return; delete S.cf.logs[hojeKey]; save(); render(); }
    else if (ds.cfTimer) cfTimerIniciar(Number(ds.cfTimer));
    else if (ds.cfParar) cfTimerParar(ds.cfParar === "1");
    else if (t.hasAttribute("data-cf-volta")) { if (cfTm && cfSeg() >= 0) { cfTm.voltas++; try { navigator.vibrate?.(40); } catch {} cfTick(); } }
    else if (t.hasAttribute("data-cf-mais-parte")) { cfGuardarEditor(); cfEdit.partes.push(cfParteVazia("Bloco", "livre")); cfEdit.k = k; render(); }
    else if (ds.cfTirarParte) { cfGuardarEditor(); cfEdit.partes.splice(Number(ds.cfTirarParte), 1); cfEdit.pontuado = Math.min(cfEdit.pontuado, cfEdit.partes.length - 1); cfEdit.k = k; render(); }
    else if (t.hasAttribute("data-cf-cancelar-edit")) { cfEdit = null; render(); }
    else if (ds.cfReabrir) { const l = cfLog(ds.cfReabrir); if (l) { l.done = false; save(); render(); } }
  });
  document.addEventListener("toggle", (e) => { const d = e.target; if (d.matches?.(".cf-pr")) S.cf.prAberto = d.open ? d.dataset.cfPrMov : S.cf.prAberto === d.dataset.cfPrMov ? null : S.cf.prAberto; }, true);
  document.addEventListener("submit", (e) => {
    const f = e.target;
    if (f.id === "cf-timer-form") {
      e.preventDefault();
      const d = Object.fromEntries(new FormData(f)), n = (v, a, b, pad) => { const x = parseInt(v, 10); return Number.isFinite(x) ? Math.min(b, Math.max(a, x)) : pad; };
      const tipo = d.tipo || "for_time", c = { ...CF_TIMER_PADRAO, ...(S.cf.timer || {}), tipo };
      if (tipo === "for_time") c.cap = n(d.cap, 0, 180, 0);
      else if (tipo === "amrap") c.min = n(d.min, 1, 120, 12);
      else if (tipo === "emom") { c.emomMin = n(d.emomMin, 1, 120, 10); c.cada = n(d.cada, 1, 5, 1); }
      else Object.assign(c, { rodadas: n(d.rodadas, 1, 100, 8), trab: n(d.trab, 5, 600, 20), desc: n(d.desc, 0, 600, 10) });
      S.cf.timer = c; save();
      const base = { k: "avulso", i: -1, tipo };
      cfTimerComecar(tipo === "for_time" ? { ...base, total: c.cap * 60 } : tipo === "amrap" ? { ...base, total: c.min * 60 }
        : tipo === "emom" ? { ...base, total: c.emomMin * 60, cada: c.cada * 60 } : { ...base, trab: c.trab, desc: c.desc, n: c.rodadas });
      return;
    }
    if (f.id === "cf-pr-form") {
      e.preventDefault();
      const d = Object.fromEntries(new FormData(f)), kg = Number(String(d.kg).replace(",", "."));
      if (!d.mov?.trim() || !(kg > 0)) { toast("Preencha o movimento e a carga."); return; }
      const k = /^\d{4}-\d{2}-\d{2}$/.test(d.k) && d.k <= hojeKey ? d.k : hojeKey, reps = Number(d.reps) || 1;
      const antes = cfPrsPorMov().find((m) => m.mov && cfNome(m.mov) === cfNome(d.mov));
      const melhor = antes?.porReps.find((x) => x.reps === reps)?.kg || 0;
      cfAddPr(d.mov, reps, Math.min(500, kg), k); S.cf.ultimoMov = d.mov.trim(); S.cf.prAberto = cfNome(d.mov); save(); render();
      toast(melhor && kg > melhor ? `Novo PR! 🏆 ${d.mov.trim()} ${reps}RM: ${kgTxt(kg)} (+${fmtKg(kg - melhor)} kg)` : `PR salvo ✓ ${d.mov.trim()} ${reps}RM ${kgTxt(kg)}`, 4000);
      return;
    }
    if (f.id === "cf-edit") {
      e.preventDefault();
      const w = cfLerEditor(f), k = cfEdit.k;
      if (!w.partes.some((p) => p.movimentos.length)) { toast("Escreva pelo menos um movimento."); return; }
      cfSalvarWod(w, k); toast("WOD salvo ✓"); render();
    } else if (f.id === "cf-res") {
      e.preventDefault();
      const k = f.dataset.k, l = cfLog(k), d = Object.fromEntries(new FormData(f)), int = (v) => { const n = parseInt(v, 10); return n >= 0 ? n : undefined; };
      const p = l.wod.partes[l.wod.pontuado], res = { rx: d.rx !== "0", ...(d.notas?.trim() ? { notas: d.notas.trim().slice(0, 300) } : {}) };
      if (p.tipo === "for_time" && !d.cap) {
        const m = String(d.tempo || "").trim().match(/^(\d{1,3})(?::(\d{1,2}))?$/);
        if (!m) { toast("Escreva o tempo como mm:ss (ex.: 7:42)."); return; }
        res.tempo = m[2] != null ? Number(m[1]) * 60 + Number(m[2]) : Number(m[1]) * 60; res.cap = false;
      } else if (p.tipo === "for_time" || p.tipo === "amrap") { Object.assign(res, { voltas: int(d.voltas) ?? 0, reps: int(d.reps) ?? 0 }); if (p.tipo === "for_time") res.cap = true; }
      else if (d.texto?.trim()) res.texto = d.texto.trim().slice(0, 80);
      const cargas = Object.fromEntries(Object.entries(d).filter(([n, v]) => n.startsWith("carga-") && Number(v) > 0).map(([n, v]) => [n.slice(6), Math.min(500, Number(v))]));
      if (Object.keys(cargas).length) {
        res.cargas = cargas;
        // A carga do bloco de força vira um registro de PR do 1º movimento (quando o esquema diz as repetições)
        for (const [i, kg] of Object.entries(cargas)) {
          const pf = l.wod.partes[i], mov = pf?.movimentos[0]?.nome, reps = pf && cfRepsForca(pf);
          if (!mov || !reps || l.res?.cargas?.[i] === kg) continue;
          S.cf.prs = (S.cf.prs || []).filter((x) => !(x.origem === "wod" && x.k === k && cfNome(x.mov) === cfNome(mov)));
          cfAddPr(mov, reps, kg, k, "wod");
        }
      }
      const era = l.done;
      l.res = res; l.done = true; save(); render();
      const ant = cfAnteriores(l.wod.titulo, k).filter((x) => x.val), v = cfValor(l);
      const pr = v && ant.length && v.v > Math.max(...ant.map((x) => x.val.v));
      if (!era) { toast(pr ? `Novo recorde no ${l.wod.titulo}! 🏆 ${v.txt}` : `WOD concluído! 🔥 ${sequencia()} ${sequencia() === 1 ? "dia" : "dias"} seguidos`, 4000); if (k === hojeKey) convidarPost(); }
      else toast("Resultado atualizado ✓");
    }
  });

  document.addEventListener("click", (e) => {
    const an = e.target.closest("[data-ia-anim]");
    if (an) {
      const v = document.createElement("video");
      Object.assign(v, { src: `assets/anim/${an.dataset.iaAnim}.mp4`, poster: `assets/anim/${an.dataset.iaAnim}.jpg`, autoplay: true, loop: true, muted: true, playsInline: true, controls: true });
      v.className = "hx-anim-video"; v.setAttribute("playsinline", ""); v.setAttribute("muted", "");
      an.replaceWith(v); v.play?.().catch(() => {});
      return;
    }
    const t = e.target.closest("[data-ia-chat],[data-ia-play],[data-ia-del],[data-ia-hoje],[data-ia-concluir],[data-ia-ask],[data-ia-revisar],[data-ia-checkin],[data-ia-perguntar],[data-ia-refazer],[data-ia-desfazer],[data-ia-sem],[data-ia-cron],[data-ia-parar],[data-ia-cancelar]");
    if (!t) return;
    const ds = t.dataset, card = t.closest(".ex.hx"), pk = ds.pk || card?.dataset.pk;
    if (ds.iaChat) { e.preventDefault(); iaIniciarChat(ds.iaChat); }
    else if (ds.iaPlay) {
      const c = exDe(pk, ds.iaPlay);
      t.closest(".hx-video").innerHTML = `<div class="video-frame hx-frame"><iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(c.yt)}?rel=0&playsinline=1&autoplay=1" title="${esc(c.nome)}: execução"
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe></div>
        <a class="lnk-btn" href="https://www.youtube.com/watch?v=${encodeURIComponent(c.yt)}" target="_blank" rel="noopener">Não carregou? Abrir no YouTube</a>`;
    } else if (ds.iaDel !== undefined) {
      const id = card.dataset.hxEx, l = iaLogHoje(pk);
      if (!l?.sets[id]) return;
      l.sets[id].splice(Number(ds.iaDel), 1); save(); iaRefazerCard(pk, id);
    } else if (ds.iaCron) iaTimerIniciar(pk, ds.iaCron, "ex", Number(ds.alvo) || 0);
    else if (t.hasAttribute("data-ia-parar")) {
      if (!iaTm) return;
      const { pk: p, id } = iaTm, s = iaSeg();
      iaTm = null; clearInterval(iaTmId);
      if (s < 1) { iaRefazerCard(p, id); return; }
      iaSalvarSerie(p, id, { r: s });
    } else if (t.hasAttribute("data-ia-cancelar")) iaTimerParar();
    else if (ds.iaHoje !== undefined) {
      const d = Number(ds.iaHoje), w = Number(ds.w || 0);
      if (Object.values(iaLogHoje(pk)?.sets || {}).some((s) => s.length) && !confirm("Você já anotou séries hoje em outro treino. Trocar para este? (as séries de hoje serão apagadas)")) return;
      S[pk].logs[hojeKey] = { d, w, sets: {}, done: false }; save(); render(); toast("Treino de hoje trocado.");
    } else if (ds.iaConcluir) {
      const l = iaGarantirLog(ds.iaConcluir);
      l.done = !l.done; save(); render();
      if (l.done) { toast(`Treino concluído! 🔥 ${sequencia()} ${sequencia() === 1 ? "dia" : "dias"} seguidos`); convidarPost(); };
    } else if (ds.iaAsk) openChat(`Como executar corretamente o ${exDe(pk, ds.iaAsk)?.nome || ds.iaAsk}? Quais os erros comuns${IA[pk]?.carga ? " e que carga eu deveria usar hoje" : " e como deixar mais fácil ou mais difícil"}?`);
    else if (ds.iaRevisar) iaRevisar(ds.iaRevisar);
    else if (ds.iaCheckin) iaCheckin(ds.iaCheckin);
    else if (ds.iaPerguntar) openChat(`Como está minha evolução no ${IA[ds.iaPerguntar].nome}? O que devo focar nos próximos treinos?`);
    else if (ds.iaRefazer) {
      if (!confirm("Refazer a entrevista? Seu treino atual continua até você montar o novo.")) return;
      iaIniciarChat(ds.iaRefazer, true);
    } else if (ds.iaDesfazer) {
      const p = ds.iaDesfazer;
      if (!confirm("Voltar ao plano anterior à última revisão?")) return;
      S[p].plano = S[p].anterior; S[p].anterior = null; S[p].atualizado = Date.now();
      iaMsg(p, "Voltamos ao plano anterior. Quando quiser, peça outra revisão.", "plano"); save(); render();
    } else if (ds.iaSem !== undefined) { iaSemSel[pk] = Number(ds.iaSem); render(); }
  });
  document.addEventListener("submit", (ev) => {
    const f = ev.target;
    if (!f.matches("[data-ia-add]")) return;
    ev.preventDefault();
    const pk = f.dataset.pk, id = f.dataset.iaAdd, r = parseInt(f.elements.r.value, 10), kg = f.elements.kg ? Number(String(f.elements.kg.value).replace(",", ".")) || 0 : 0;
    if (!(r > 0 && r < 1000) || kg < 0 || kg > 999) { toast("Confira os números da série."); return; }
    if (iaTm?.pk === pk && iaTm.id === id && iaTm.tipo === "ex") { iaTm = null; clearInterval(iaTmId); }
    iaSalvarSerie(pk, id, { ...(kg ? { kg: Math.round(kg * 10) / 10 } : {}), r });
  });


  /* ==========================================================
     Nutrição: metas estimadas (calorias, macros, água), registro de água, lembrete por notificação push
     (/api/agua + sw.js) e a Nutri AI, que usa o mesmo chat do Coach com outro papel.
     S.nutri = { sexo, objetivo, atividade, refeicoes, treinoHora, restricoes, preferencias }
     S.agua = { "AAAA-MM-DD": [{ t: "HH:MM", ml }] }   S.aguaLembrete = { on, intervalo, ml, ini, fim, push }
     ========================================================== */
  const NUTRI_OBJ = ["Perder gordura", "Manter o peso", "Ganhar massa muscular"];
  const NUTRI_ATIV = [["auto", "Automático (pelos meus treinos)"], ["1.2", "Sedentário"], ["1.375", "Leve: 1 a 3 treinos por semana"], ["1.55", "Moderado: 3 a 5 treinos por semana"], ["1.725", "Ativo: 6 ou 7 treinos por semana"], ["1.9", "Muito ativo: trabalho físico ou 2 treinos por dia"]];
  const GUIA = window.FITAI_GUIA || null;
  const nutriSexo = () => S.nutri?.sexo || S.hiper?.perfil?.sexo || S.c21?.perfil?.sexo || "";
  const treinos14 = () => linhasLocais().filter((r) => r.concluido && r.data > keyOf(addDays(hoje, -14))).length;
  // Estimativas do Guia de Alimentação: TMB (Harris-Benedict) × fator de atividade; déficit de 15% ou superávit de 10%;
  // proteína 2,0 g/kg (emagrecer), 2,2 (hipertrofia) ou 1,8 (manter); gordura 0,9 g/kg (mín. 20% das calorias); carboidrato completa
  function nutriMetas() {
    const N = S.nutri || {}, peso = Number(String(S.perfil.peso).replace(",", ".")), alt = Number(S.perfil.altura), idade = Number(S.perfil.idade);
    const treinoHoje = feito(hojeKey) || parcial(hojeKey);
    const agua = Math.round(((peso > 0 ? peso * 35 : 2500) + (treinoHoje ? 500 : 0)) / 50) * 50;
    if (!(peso > 0 && alt > 0 && idade > 0)) return { falta: true, agua };
    const sx = norm(nutriSexo());
    const tmbH = 88.36 + 13.4 * peso + 4.8 * alt - 5.7 * idade, tmbM = 447.6 + 9.2 * peso + 3.1 * alt - 4.3 * idade;
    const tmb = Math.round(sx.startsWith("masc") ? tmbH : sx.startsWith("fem") ? tmbM : (tmbH + tmbM) / 2);
    const semana = treinos14() / 2, fator = N.atividade && N.atividade !== "auto" ? Number(N.atividade) : semana >= 6 ? 1.725 : semana >= 3 ? 1.55 : semana >= 1 ? 1.375 : 1.2;
    const gasto = Math.round(tmb * fator), obj = N.objetivo || "Manter o peso";
    const minimo = Math.round(Math.max(tmb * 1.1, sx.startsWith("fem") ? 1300 : 1500)); // nunca abaixo disso
    const kcal = Math.round(Math.max(minimo, obj === "Perder gordura" ? gasto * 0.85 : obj === "Ganhar massa muscular" ? gasto * 1.1 : gasto) / 10) * 10;
    const prot = Math.round(peso * (obj === "Perder gordura" ? 2 : obj === "Ganhar massa muscular" ? 2.2 : 1.8));
    const gord = Math.round(Math.max(peso * 0.9, (kcal * 0.2) / 9)), carb = Math.max(0, Math.round((kcal - prot * 4 - gord * 9) / 4));
    return { tmb, fator, gasto, kcal, minimo, prot, gord, carb, agua, obj };
  }
  const aguaHoje = () => soma((S.agua?.[hojeKey] || []).map((x) => x.ml || 0));
  // Minha água por dia, no mesmo formato da tabela "agua" do Supabase
  const aguaLinhas = () => Object.entries(S.agua || {}).map(([data, l]) => ({ data, ml: soma(l.map((x) => x.ml || 0)), meta: S.aguaMeta?.[data] || nutriMetas().agua })).filter((r) => r.ml > 0);
  const fmtL = (ml) => `${(ml / 1000).toFixed(ml % 1000 ? 1 : 0).replace(".", ",")} L`;
  function aguaAdd(ml) {
    S.agua = S.agua || {};
    const d = new Date();
    (S.agua[hojeKey] = S.agua[hojeKey] || []).push({ t: `${pad(d.getHours())}:${pad(d.getMinutes())}`, ml });
    S.aguaMeta = { ...(S.aguaMeta || {}), [hojeKey]: nutriMetas().agua };
    for (const k of Object.keys(S.agua)) if (k < keyOf(addDays(hoje, -120))) { delete S.agua[k]; delete S.aguaMeta?.[k]; } // guarda 120 dias
    save();
    aguaAvisarServidor("bebeu");
    const meta = nutriMetas().agua, tot = aguaHoje();
    toast(tot >= meta && tot - ml < meta ? `Meta de água batida! 💧 ${fmtL(tot)}` : `+${ml} ml 💧 ${fmtL(tot)} de ${fmtL(meta)}`);
    if (uid && G.grupos?.length) G.carregadoEm = 0; // o ranking de água do grupo atualiza na próxima visita
  }

  /* ---------- Lembrete de água (push) ---------- */
  const pushOk = () => "serviceWorker" in navigator && "PushManager" in window && "Notification" in window;
  const b64u8 = (b) => { const s = atob((b + "=".repeat((4 - (b.length % 4)) % 4)).replace(/-/g, "+").replace(/_/g, "/")); return Uint8Array.from(s, (c) => c.charCodeAt(0)); };
  async function aguaAssinatura(criar) {
    const reg = await navigator.serviceWorker.register("sw.js");
    await navigator.serviceWorker.ready;
    let sub = await reg.pushManager.getSubscription();
    if (!sub && criar) {
      const { chave } = await fetch("/api/agua").then((r) => r.json());
      try { sub = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: b64u8(chave) }); }
      catch { const velha = await reg.pushManager.getSubscription(); if (velha) await velha.unsubscribe(); sub = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: b64u8(chave) }); }
    }
    return sub;
  }
  async function aguaAvisarServidor(acao) {
    if (!S.aguaLembrete?.on || !S.aguaLembrete.push || !pushOk()) return;
    try { const sub = await aguaAssinatura(false); if (sub) await fetch("/api/agua", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ acao, endpoint: sub.endpoint }) }); } catch {}
  }
  async function aguaLigar(cfg, testar = true) {
    const L = { intervalo: 60, ml: 300, ini: "08:00", fim: "22:00", ...(S.aguaLembrete || {}), ...cfg, on: true };
    if (L.canal === "telegram") {
      try {
        const r = await tgApi("agua", { on: true, ml: L.ml, intervalo: L.intervalo, ini: L.ini, fim: L.fim, testar });
        if (!r) throw new Error("tg");
        if (S.aguaLembrete?.push) await aguaPushCancelar(); // não recebe os dois avisos
        L.push = false; S.aguaLembrete = L; save(); render(); tgSincronizar(true);
        toast(`Lembrete no Telegram: ${L.ml} ml a cada ${L.intervalo} min, das ${L.ini} às ${L.fim}. 💧`, 4500);
      } catch { toast("Não consegui ligar o lembrete no Telegram agora."); }
      return;
    }
    if (S.aguaLembrete?.canal === "telegram" && S.aguaLembrete.on) tgApi("agua", { on: false }).catch(() => {});
    if (!pushOk()) {
      L.push = false; S.aguaLembrete = L; save(); render();
      toast(/iphone|ipad/i.test(navigator.userAgent) ? "No iPhone, adicione o FIT.AI à tela de início (Compartilhar → Adicionar à Tela de Início) para receber notificações. Por enquanto aviso só com o app aberto." : "Este navegador não recebe notificações. Vou avisar enquanto o app estiver aberto.", 6000);
      return;
    }
    const perm = await Notification.requestPermission();
    if (perm !== "granted") { toast("Sem permissão de notificação. Libere nas configurações do navegador para este site.", 5000); return; }
    try {
      const sub = await aguaAssinatura(true);
      const r = await fetch("/api/agua", { method: "POST", headers: { "content-type": "application/json" },
        body: JSON.stringify({ acao: "assinar", assinatura: sub.toJSON(), intervalo: L.intervalo, ml: L.ml, ini: L.ini, fim: L.fim, tz: -new Date().getTimezoneOffset() }) });
      if (!r.ok) throw new Error(String(r.status));
      L.push = true; S.aguaLembrete = L; save(); render();
      if (testar) fetch("/api/agua", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ acao: "testar", endpoint: sub.endpoint }) });
      toast(`Lembrete ligado: ${L.ml} ml a cada ${L.intervalo} min, das ${L.ini} às ${L.fim}. 💧`, 4500);
    } catch (e) { toast("Não consegui ligar o lembrete agora. Tente de novo."); }
  }
  async function aguaPushCancelar() {
    try { if (pushOk()) { const sub = await aguaAssinatura(false); if (sub) { await fetch("/api/agua", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ acao: "cancelar", endpoint: sub.endpoint }) }); await sub.unsubscribe(); } } } catch {}
  }
  async function aguaDesligar() {
    if (S.aguaLembrete?.canal === "telegram") await tgApi("agua", { on: false }).catch(() => {});
    await aguaPushCancelar();
    S.aguaLembrete = { ...(S.aguaLembrete || {}), on: false }; save(); render(); toast("Lembrete de água desligado.");
  }
  // Sem push (iPhone fora da tela de início, navegador antigo): avisa enquanto o app está aberto
  let aguaUltimoAviso = "";
  setInterval(() => {
    const L = S.aguaLembrete;
    if (!L?.on || L.push || L.canal === "telegram") return;
    const d = new Date(), agora = `${pad(d.getHours())}:${pad(d.getMinutes())}`;
    if (agora < L.ini || agora >= L.fim) return;
    const ult = (S.agua?.[hojeKey] || []).slice(-1)[0]?.t || L.ini, [h, m] = ult.split(":").map(Number);
    if (d.getHours() * 60 + d.getMinutes() - (h * 60 + m) >= L.intervalo && aguaUltimoAviso !== agora.slice(0, 4)) {
      aguaUltimoAviso = agora.slice(0, 4); toast(`💧 Hora de beber água: ${L.ml} ml`, 6000);
      try { if (Notification.permission === "granted") new Notification("💧 Hora de beber água", { body: `Beba ${L.ml} ml agora.` }); } catch {}
    }
  }, 60000);
  // "Bebi" na notificação com o app aberto
  if ("serviceWorker" in navigator) navigator.serviceWorker.addEventListener("message", (e) => {
    if (e.data?.tipo !== "agua") return;
    if (e.data.bebi) aguaAdd(Number(e.data.ml) || 300); else location.hash = "#/nutricao";
    if (location.hash.startsWith("#/nutricao")) render();
  });

  /* ---------- Tela ---------- */
  const NUTRI_PERGUNTAS = ["O que comer antes do treino?", "O que comer depois do treino?", "Monte um cardápio para hoje", "Quanto de proteína eu preciso?", "Lanches práticos e baratos"];
  telas.nutricao = (p1, p2) => {
    setToolbar("nutricao");
    if (p1 === "bebi") { aguaAdd(Math.min(1000, Number(p2) || 300)); history.replaceState(null, "", "#/nutricao"); }
    const M = nutriMetas(), N = S.nutri || {}, L = { intervalo: 60, ml: 300, ini: "08:00", fim: "22:00", ...(S.aguaLembrete || {}) };
    const tot = aguaHoje(), pct = Math.min(100, Math.round((tot / M.agua) * 100)), copos = S.agua?.[hojeKey] || [];
    const sel = (nome, ops, v) => `<select name="${nome}">${ops.map(([val, txt]) => `<option value="${esc(val)}"${String(v ?? "") === String(val) ? " selected" : ""}>${esc(txt)}</option>`).join("")}</select>`;
    return `<section class="screen has-toolbar">
      <header class="header"><span class="logo-txt dark">Fit.ai</span></header>
      <div class="section nutri">
        <div class="sec-head"><h2>Água de hoje</h2><span>${copos.length} ${copos.length === 1 ? "copo" : "copos"}</span></div>
        <div class="agua-card">
          <div class="agua-num"><strong>${fmtL(tot)}</strong><span>de ${fmtL(M.agua)}${feito(hojeKey) || parcial(hojeKey) ? " (dia de treino +0,5 L)" : ""}</span></div>
          <div class="progress"><div class="bar"><i style="width:${pct}%"></i></div><span>${pct}%</span></div>
          <div class="agua-btns"><button class="btn btn-blue" data-agua="300">+ 300 ml</button><button class="btn btn-outline" data-agua="500">+ 500 ml</button>${copos.length ? `<button class="lnk-btn" data-agua-desfazer>Desfazer</button>` : ""}</div>
          ${copos.length ? `<p class="note agua-hist">${copos.slice(-8).map((c) => `${c.t} · ${c.ml} ml`).join("  ·  ")}</p>` : ""}
        </div>
      </div>
      <div class="section">
        <div class="sec-head"><h2>Lembrete de água</h2>${L.on ? `<span class="pill blue">Ligado</span>` : ""}</div>
        <form class="nutri-form" id="form-agua">
          <label>Beber<input name="ml" type="number" inputmode="numeric" min="50" max="1000" step="50" value="${L.ml}"> ml</label>
          <label>A cada ${sel("intervalo", [[30, "30 min"], [45, "45 min"], [60, "1 hora"], [90, "1h30"], [120, "2 horas"]], L.intervalo)}</label>
          <label>Das <input name="ini" type="time" value="${esc(L.ini)}"> às <input name="fim" type="time" value="${esc(L.fim)}"></label>
          ${S.tg?.ligado ? `<label>Avisar por ${sel("canal", [["push", "Notificação"], ["telegram", "Telegram"]], L.canal || "push")}</label>` : ""}
          <button class="btn btn-blue" type="submit">${L.on ? "Salvar lembrete" : L.canal === "telegram" && S.tg?.ligado ? "Ligar lembrete no Telegram" : "Ligar lembrete no celular"}</button>
          ${L.on ? `<button class="btn btn-outline" type="button" data-agua-desligar>Desligar lembrete</button>` : ""}
        </form>
        <p class="note">${L.on && L.canal === "telegram" ? "Os lembretes chegam no Telegram. Toque em <b>Bebi</b> na mensagem para anotar; a água entra aqui quando você abrir o app." : L.on && L.push ? "As notificações chegam mesmo com o app fechado. Toque em <b>Bebi</b> na notificação para anotar." : L.on ? "Este aparelho só recebe o aviso com o app aberto." : "O celular vai pedir permissão para mostrar notificações."}${/iphone|ipad/i.test(navigator.userAgent) ? " No iPhone, as notificações só funcionam com o FIT.AI adicionado à tela de início." : ""}</p>
      </div>
      <div class="section">
        <div class="sec-head"><h2>Suas metas de hoje</h2><span>estimativa</span></div>
        ${M.falta ? `<div class="note-box"><p>Preencha <b>peso, altura e idade</b> no Perfil (ou abaixo) para eu calcular calorias e macros.</p></div>` : `
        <div class="macro-grid">
          <div class="macro"><strong>${M.kcal}</strong><span>kcal</span></div>
          <div class="macro"><strong>${M.prot} g</strong><span>proteína</span></div>
          <div class="macro"><strong>${M.carb} g</strong><span>carboidrato</span></div>
          <div class="macro"><strong>${M.gord} g</strong><span>gordura</span></div>
        </div>
        <p class="note">Objetivo: <b>${esc(M.obj)}</b>. Gasto estimado ${M.gasto} kcal/dia (metabolismo ${M.tmb} kcal × atividade ${String(M.fator).replace(".", ",")}), pelas fórmulas do Guia de Alimentação. São estimativas para orientar; para um plano individual, procure um nutricionista.</p>`}
      </div>
      ${GUIA ? guiaCardapio(M) : ""}
      <div class="section">
        <div class="sec-head"><h2>Nutri AI</h2></div>
        <div class="note-box"><p><b>Sua nutricionista virtual.</b> Pergunte o que comer, quando e quanto. Ela usa suas metas, seus treinos e a água de hoje.</p>
          <button class="btn btn-blue" data-nutri-chat>Conversar com a Nutri AI</button></div>
        <div class="chips nutri-chips">${NUTRI_PERGUNTAS.map((q) => `<button type="button" class="chip" data-nutri-q="${esc(q)}">${esc(q)}</button>`).join("")}</div>
      </div>
      <div class="section">
        <div class="sec-head"><h2>Meu perfil alimentar</h2></div>
        <form class="nutri-form" id="form-nutri">
          <div class="row2">
            <label>Peso (kg)<input name="peso" inputmode="decimal" value="${esc(S.perfil.peso || "")}"></label>
            <label>Altura (cm)<input name="altura" inputmode="numeric" value="${esc(S.perfil.altura || "")}"></label>
            <label>Idade<input name="idade" inputmode="numeric" value="${esc(S.perfil.idade || "")}"></label>
            <label>Sexo${sel("sexo", [["", "—"], ["Masculino", "Masculino"], ["Feminino", "Feminino"], ["Prefiro não dizer", "Prefiro não dizer"]], nutriSexo())}</label>
          </div>
          <label>Objetivo${sel("objetivo", NUTRI_OBJ.map((o) => [o, o]), N.objetivo || "Manter o peso")}</label>
          <label>Atividade${sel("atividade", NUTRI_ATIV, N.atividade || "auto")}</label>
          <div class="row2">
            <label>Refeições por dia${sel("refeicoes", [["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"]], N.refeicoes || "4")}</label>
            <label>Horário do treino<input name="treinoHora" type="time" value="${esc(N.treinoHora || "")}"></label>
          </div>
          <label>Restrições e alergias<input name="restricoes" maxlength="200" placeholder="Ex.: lactose, vegetariano, nenhuma" value="${esc(N.restricoes || "")}"></label>
          <label>Preferências<input name="preferencias" maxlength="200" placeholder="Ex.: gosto de ovo, não gosto de peixe" value="${esc(N.preferencias || "")}"></label>
          <button class="btn btn-outline" type="submit">Salvar perfil alimentar</button>
        </form>
      </div></section>`;
  };

  /* ---------- Cardápio do Guia de Alimentação ---------- */
  let guiaModo = null; // "emagrecer" | "hipertrofia" (padrão: pelo objetivo)
  function guiaCardapio(M) {
    const modo = guiaModo || ((S.nutri?.objetivo || "") === "Ganhar massa muscular" ? "hipertrofia" : "emagrecer");
    return `<div class="section">
      <div class="sec-head"><h2>Cardápio do guia</h2></div>
      <nav class="seg seg-guia" aria-label="Cardápio"><button class="${modo === "emagrecer" ? "on" : ""}" data-guia="emagrecer">Emagrecimento</button><button class="${modo === "hipertrofia" ? "on" : ""}" data-guia="hipertrofia">Hipertrofia</button></nav>
      <div class="guia-refs">${GUIA.refeicoes.map((r, i) => `<details class="musc guia-ref"${i === 0 ? " open" : ""}><summary><span>🍽️ ${esc(r.nome)}</span></summary><ul>
        ${r[modo].map((o) => `<li><span>${esc(o.txt)}</span><small>${o.kcal} kcal · P ${o.p} g · C ${o.c} g · G ${o.g} g</small></li>`).join("")}</ul></details>`).join("")}</div>
      <details class="musc guia-ref"><summary><span>💡 Dicas e mitos do guia</span></summary><ul>${[...GUIA.dicas, ...GUIA.mitos].map((t) => `<li><span>${esc(t)}</span></li>`).join("")}</ul></details>
      ${M.falta ? "" : `<p class="note">Some as opções do dia até chegar perto de <b>${M.kcal} kcal</b> e <b>${M.prot} g de proteína</b>. Peça à Nutri AI para montar o seu dia com elas.</p>`}
    </div>`;
  }

  /* ---------- Contexto para a Nutri AI ---------- */
  function nutriBase() {
    const M = nutriMetas(), N = S.nutri || {};
    return [`# Perfil alimentar de ${primeiroNome()}`,
      `Peso ${S.perfil.peso || "?"} kg, altura ${S.perfil.altura || "?"} cm, idade ${S.perfil.idade || "?"}, sexo ${nutriSexo() || "não informado"}.`,
      `Objetivo: ${N.objetivo || "Manter o peso"}. Refeições por dia: ${N.refeicoes || "4"}. Horário do treino: ${N.treinoHora || "não informado"}.`,
      `Restrições/alergias: ${N.restricoes || "nenhuma informada"}. Preferências: ${N.preferencias || "nenhuma informada"}.`,
      M.falta ? "Metas: faltam peso, altura ou idade para calcular calorias; peça para preencher na aba Nutrição." :
        `Metas estimadas pelo app (fórmulas do Guia de Alimentação: Harris-Benedict × fator de atividade): metabolismo ${M.tmb} kcal, gasto ${M.gasto} kcal (atividade ${M.fator}), meta ${M.kcal} kcal/dia (mínimo seguro ${M.minimo} kcal), proteína ${M.prot} g, carboidrato ${M.carb} g, gordura ${M.gord} g.`,
      `Meta de água: ${M.agua} ml/dia. Lembrete de água: ${S.aguaLembrete?.on ? `ligado, ${S.aguaLembrete.ml} ml a cada ${S.aguaLembrete.intervalo} min` : "desligado"}.`,
      `Programa principal de treino: ${progDe(principal())?.nome || NOME_PROG}.${S.hiper?.perfil?.objetivo ? ` Objetivo na academia: ${S.hiper.perfil.objetivo}.` : ""}`].join("\n");
  }
  function nutriContexto() {
    const d7 = keyOf(addDays(hoje, -7)), rows = linhasLocais().filter((r) => r.data >= d7).sort((a, b) => a.data.localeCompare(b.data));
    const hojeRows = rows.filter((r) => r.data === hojeKey);
    return [`Hoje: ${DIAS[hojeDia]}, ${hojeKey}, ${pad(new Date().getHours())}:${pad(new Date().getMinutes())}.`,
      `Treino de hoje: ${hojeRows.length ? hojeRows.map((r) => `${r.titulo} (${r.concluido ? "feito" : "em andamento"}, ~${r.minutos} min)`).join("; ") : "nenhum registrado ainda"}.`,
      `Água hoje: ${aguaHoje()} ml (${(S.agua?.[hojeKey] || []).map((c) => c.t).join(", ") || "nada anotado"}).`,
      `Treinos dos últimos 7 dias:\n${rows.filter((r) => r.concluido).map((r) => `- ${r.data}: ${r.titulo}, ~${r.minutos} min`).join("\n") || "- nenhum"}`].join("\n");
  }

  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-agua],[data-agua-desfazer],[data-agua-desligar],[data-nutri-chat],[data-nutri-q],[data-guia]");
    if (!t) return;
    if (t.dataset.guia) { guiaModo = t.dataset.guia; render(); return; }
    if (t.dataset.agua) { aguaAdd(Number(t.dataset.agua)); render(); }
    else if (t.hasAttribute("data-agua-desfazer")) { (S.agua?.[hojeKey] || []).pop(); save(); render(); }
    else if (t.hasAttribute("data-agua-desligar")) aguaDesligar();
    else if (t.hasAttribute("data-nutri-chat")) openChat(null, "nutri");
    else if (t.dataset.nutriQ) openChat(t.dataset.nutriQ, "nutri");
  });
  document.addEventListener("submit", (ev) => {
    const f = ev.target;
    if (f.id === "form-agua") {
      ev.preventDefault();
      const d = Object.fromEntries(new FormData(f));
      if (!(d.ini && d.fim && d.ini !== d.fim)) { toast("Confira o horário do lembrete."); return; }
      aguaLigar({ ml: Math.min(1000, Math.max(50, Number(d.ml) || 300)), intervalo: Number(d.intervalo) || 60, ini: d.ini, fim: d.fim, canal: d.canal === "telegram" && S.tg?.ligado ? "telegram" : "push" }, !S.aguaLembrete?.on || S.aguaLembrete.canal !== d.canal);
    } else if (f.id === "form-nutri") {
      ev.preventDefault();
      const d = Object.fromEntries(new FormData(f)), num = (v) => String(v || "").trim().replace(",", ".").slice(0, 6);
      S.perfil = { ...S.perfil, peso: num(d.peso), altura: num(d.altura), idade: num(d.idade) };
      S.nutri = { ...(S.nutri || {}), sexo: d.sexo, objetivo: d.objetivo, atividade: d.atividade, refeicoes: d.refeicoes, treinoHora: d.treinoHora,
        restricoes: String(d.restricoes || "").slice(0, 200), preferencias: String(d.preferencias || "").slice(0, 200) };
      save(); render(); toast("Perfil alimentar salvo ✓");
    }
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
    const ativos = VPROGS.filter((P) => S[P.k].inicio && P.k !== excluir && liberado(P.k));
    if (!ativos.length) return excluir ? "" : VPROGS.filter((P) => liberado(P.k)).map((P) => `<a class="emerg" href="#/${P.k}"><span>${icon("flame.svg", 20)}</span><div><strong>${esc(P.nome)}</strong><small>${esc(P.resumo || "Programa em vídeo · toque para começar")}</small></div></a>`).join("");
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
      return `<rect x="${cx - bw / 2}" y="${base - bh}" width="${bw}" height="${bh}" rx="6" style="fill:${i === h.length - 1 ? "#2b54ff" : "var(--blue-soft)"}"/>
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
    const campos = { titulo, descricao: String(d.descricao || "").trim().slice(0, 500), link: link || null, medida: MEDIDAS[d.medida] ? d.medida : "feito" };
    if (formDesafio === "editar" && desafioEditando) { // edição: quem lançou ou o dono do grupo
      const e0 = desafioEditando, prazo = d.prazo === "manter" ? e0.prazo || null : prazoDe(d.prazo);
      const { titulo: tituloAntes, semana: semanaAntes } = e0;
      const mud = { ...campos, prazo: prazo && prazo >= e0.semana ? prazo : keyOf(addDays(parseKey(e0.semana), 6)) };
      const { error } = await sb.from("desafios").update(mud).eq("id", e0.id);
      if (!error && d.todos && e0.criado_por === uid) // o mesmo desafio lançado junto nos outros grupos (mesma semana e título)
        await sb.from("desafios").update(mud).eq("criado_por", uid).eq("semana", semanaAntes).eq("titulo", tituloAntes);
      btn.disabled = false;
      if (error) { toast("Não consegui salvar a edição."); return; }
      formDesafio = null; desafioEditando = null; await carregarGrupos(true);
      toast("Desafio atualizado ✓"); return;
    }
    const prazo = prazoDe(d.prazo || "dom"), alvos = d.todos ? (G.grupos || []).map((g) => g.id) : [G.sel];
    let ok = 0, ja = 0, falhou = 0;
    for (const gid of alvos) {
      const capa = formDesafio === "link" && desafioRascunho?.capa ? await subirCapa(desafioRascunho.capa, gid) : null;
      const { error } = await sb.from("desafios").insert({ grupo_id: gid, semana: semanaAtual(), ...campos, prazo, criado_por: uid, ...(capa ? { capa } : {}) });
      if (!error) ok++; else if (/duplicate|unique/i.test(error.message)) ja++; else falhou++;
    }
    btn.disabled = false;
    if (!ok) { toast(ja ? (alvos.length > 1 ? "Todos os grupos já têm desafio esta semana." : "Alguém já lançou o desafio desta semana.") : "Não consegui lançar o desafio."); formDesafio = null; carregarGrupos(true); return; }
    formDesafio = null; desafioRascunho = null; await carregarGrupos(true);
    toast(alvos.length > 1 ? `Desafio lançado em ${ok} ${ok === 1 ? "grupo" : "grupos"}${ja ? ` (${ja} já ${ja === 1 ? "tinha" : "tinham"} desafio nesta semana)` : ""}. ⚔️` : "Desafio lançado! Avise a galera. ⚔️", 4000);
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
  const veCorridas = () => !uid || (souDono && !S.verComoMembro); // as corridas do Strava são do dono; visitante vê como demonstração
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
      if (S.dono !== souDono) { S.dono = souDono; save(); }
      aplicarTrava();
      tgSincronizar(); // os links dos vídeos entram na agenda do Telegram
      if (VP[location.hash.split("/")[1]]) render();
      videoRetomar();
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
  // O player só fecha pelo ✕ (ou pelo voltar do celular, com confirmação): tocar na área escura em volta do vídeo
  // fechava o player no meio do treino. Enquanto ele está aberto, a tela não apaga (Wake Lock); se o navegador
  // recarregar a página (celular bloqueou, pouca memória), o vídeo reabre sozinho.
  let videoWake = null;
  async function videoManterTela() {
    if (videoWake || document.visibilityState !== "visible" || !document.getElementById("video-dlg")?.open) return;
    try { videoWake = await navigator.wakeLock?.request("screen"); videoWake?.addEventListener("release", () => { videoWake = null; }); } catch { videoWake = null; }
  }
  document.addEventListener("visibilitychange", videoManterTela); // o Wake Lock cai quando a tela sai do app; pede de novo na volta
  function videoRetomar() {
    const a = S.videoAberto;
    if (!a || document.getElementById("video-dlg")?.open) return;
    if (Date.now() - a.em > 90 * 60 * 1000 || !INS_VID[a.id]) { delete S.videoAberto; save(); return; }
    abrirVideo(a.id);
    toast("Reabri o vídeo que estava tocando. Avance até onde você parou. ▶️", 5000);
  }
  function abrirVideo(id) {
    const v = INSV[id], drive = INS_VID[id];
    if (!v || !drive) return;
    let dlg = document.getElementById("video-dlg");
    if (!dlg) {
      dlg = document.createElement("dialog");
      dlg.id = "video-dlg"; dlg.className = "video-dlg";
      dlg.addEventListener("close", () => { // para o vídeo ao fechar
        dlg.innerHTML = ""; delete S.videoAberto; save();
        videoWake?.release().catch(() => {}); videoWake = null;
      });
      dlg.addEventListener("click", (e) => { if (e.target.closest("[data-video-fechar]")) dlg.close(); });
      dlg.addEventListener("cancel", (e) => { e.preventDefault(); if (confirm("Fechar o vídeo?")) dlg.close(); }); // voltar do celular / Esc
      $(".device").appendChild(dlg);
    }
    dlg.setAttribute("aria-label", v.nome);
    dlg.innerHTML = `<div class="video-box">
        <div class="video-head"><strong>${esc(v.nome)}</strong><button class="video-x" data-video-fechar aria-label="Fechar vídeo">✕</button></div>
        <div class="video-frame"><iframe src="${driveUrl(id, "preview")}" title="${esc(v.nome)}" allow="autoplay; fullscreen"></iframe></div>
        <a class="video-alt" href="${driveUrl(id, "view")}" target="_blank" rel="noopener">Não carregou? Abrir no Google Drive</a>
      </div>`;
    if (!dlg.open) dlg.showModal();
    S.videoAberto = { id, em: Date.now() }; save();
    videoManterTela();
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
    for (const pk of IAK) for (const [k, l] of Object.entries(S[pk].logs)) {
      const t = iaSessao(pk, l.d, l.w ?? 0);
      out.push({ data: k, programa: pk, titulo: (t ? t.titulo : IA[pk].rotulo).slice(0, 120), concluido: !!l.done, minutos: Math.min(600, iaMin(pk, l)),
        detalhes: { d: l.d, ...(l.w != null ? { w: l.w } : {}), sets: l.sets || {}, done: !!l.done } });
    }
    for (const [k, l] of Object.entries(S.cf.logs)) {
      if (!l.wod) continue;
      out.push({ data: k, programa: "cf", titulo: String(l.wod.titulo || "WOD").slice(0, 120), concluido: !!l.done, minutos: Math.min(600, cfMinutos(l)),
        detalhes: { wod: l.wod, res: l.res || {}, done: !!l.done, ...(l.msg ? { msg: l.msg } : {}) } });
    }
    for (const [k, l] of Object.entries(S.corrida.logs)) {
      const it = (l.itens || []).slice(0, 10);
      if (!it.length) continue;
      out.push({ data: k, programa: "corrida", titulo: it.map(ativTitulo).join(" + ").slice(0, 120), concluido: true,
        minutos: Math.min(600, Math.round(soma(it.map((a) => a.tempo || 0)) / 60)), detalhes: { itens: it, done: true } });
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
    syncTimer = setTimeout(() => { verificarConquistas(); if (registrarMissoes()) { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch {} } conferirXp(); if (uid) sincronizar(); }, 1200);
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
      for (const pk of IAK) { // planos dos programas do Coach (tabela "hiper", uma linha por programa)
        const dd = iaDados(pk);
        if (!dd || enviados[`${uid}|ia|${pk}`] === JSON.stringify(dd)) continue;
        const { error } = await sb.from("hiper").upsert({ usuario_id: uid, programa: pk, dados: dd, atualizado_em: new Date().toISOString() });
        if (!error) { enviados[`${uid}|ia|${pk}`] = JSON.stringify(dd); guardarEnviados(); }
      }
      if ((S.cf.prs || []).length || S.cf.prsEm) { // PRs do CrossFit: uma linha "cf" na tabela hiper
        const dd = { prs: S.cf.prs || [], atualizado: S.cf.prsEm || 0 };
        if (enviados[`${uid}|ia|cf`] !== JSON.stringify(dd)) {
          const { error } = await sb.from("hiper").upsert({ usuario_id: uid, programa: "cf", dados: dd, atualizado_em: new Date().toISOString() });
          if (!error) { enviados[`${uid}|ia|cf`] = JSON.stringify(dd); guardarEnviados(); }
        }
      }
      const aguaPend = aguaLinhas().filter((r) => r.data >= keyOf(addDays(hoje, -30)) && enviados[`${uid}|agua|${r.data}`] !== `${r.ml}/${r.meta}`);
      if (aguaPend.length) {
        const { error } = await sb.from("agua").upsert(aguaPend.map((r) => ({ usuario_id: uid, data: r.data, ml: Math.min(20000, r.ml), meta: Math.min(10000, Math.max(500, r.meta)), atualizado_em: new Date().toISOString() })));
        if (!error) { aguaPend.forEach((r) => (enviados[`${uid}|agua|${r.data}`] = `${r.ml}/${r.meta}`)); guardarEnviados(); }
      }
      const cfg = { inicio: S.inicio, ...Object.fromEntries(VKEYS.map((p) => [p, S[p].inicio])), principal: S.principal || null, nivel: S.nivel || null, nutri: S.nutri || null, ...(() => { const n = meuNivel(); return { xp: n.xp, nivel_xp: n.nivel, classe: n.slug, estilo: estiloAtual().slug, trilha: trilha(), forca: S.forca || null, formaturas: formaturas() }; })(), quiz: S.quiz || null, ficha: S.ficha || null, missoes: S.missoes || null, missoesXpAnt: S.missoesXpAnt || 0, arte: S.arte || null };
      if (enviados[`${uid}|cfg`] !== JSON.stringify(cfg)) {
        const { error } = await sb.from("perfis").update({ config: cfg }).eq("id", uid);
        if (!error) { enviados[`${uid}|cfg`] = JSON.stringify(cfg); guardarEnviados(); }
      }
      tgSincronizar();
    } catch {} finally {
      sincronizando = false;
      if (deNovo) { deNovo = false; sincronizar(); }
    }
  }
  // Ao entrar: traz os treinos da conta que ainda não estão neste aparelho
  // Treinos feitos em outro aparelho (celular e tablet, por exemplo): busca de novo quando o app volta para a tela
  let puxadoEm = 0;
  async function atualizarDaConta() {
    if (!uid || !sb || document.visibilityState !== "visible" || Date.now() - puxadoEm < 60000) return;
    const antes = JSON.stringify([S.logs, S.cf.logs, S.corrida.logs, ...VKEYS.map((p) => S[p].logs), ...IAK.map((k) => S[k].logs)]);
    await puxarTreinos();
    await tgSincronizar(true);
    if (JSON.stringify([S.logs, S.cf.logs, S.corrida.logs, ...VKEYS.map((p) => S[p].logs), ...IAK.map((k) => S[k].logs)]) !== antes) { G.carregadoEm = 0; render(); }
  }
  document.addEventListener("visibilitychange", atualizarDaConta);
  window.addEventListener("focus", atualizarDaConta);
  setInterval(atualizarDaConta, 5 * 60 * 1000);
  async function puxarTreinos() {
    if (!uid || !sb) return;
    const { data, error } = await sb.from("treinos").select("data, programa, detalhes").eq("usuario_id", uid);
    if (error || !data) return;
    puxadoEm = Date.now();
    let mudou = false;
    const localMaior = new Set(); // dias em que este aparelho tem mais que a conta: continuam na fila de envio
    for (const r of data) {
      const d = r.detalhes || {};
      if (!/^\d{4}-\d{2}-\d{2}$/.test(r.data)) continue;
      // Concluído em outro aparelho: o registro da conta substitui o deste aparelho, que estava incompleto
      if (d.done) {
        if (r.programa === "calistenia" && S.logs[r.data] && !S.logs[r.data].done) delete S.logs[r.data];
        if (r.programa === "cf" && S.cf.logs[r.data] && !S.cf.logs[r.data].done) delete S.cf.logs[r.data];
        if (IA[r.programa] && S[r.programa].logs[r.data] && !S[r.programa].logs[r.data].done) delete S[r.programa].logs[r.data];
      }
      if (VP[r.programa] && S[r.programa].logs[r.data]) { // vídeos: junta o que foi marcado nos dois aparelhos
        const l = S[r.programa].logs[r.data], antes = vidsDe(l).length;
        const fe = (Array.isArray(d.feitos) ? d.feitos : []).filter((x) => INSV[x] && !l.feitos.includes(x));
        const av = (Array.isArray(d.avulso) ? d.avulso : []).filter((x) => INSV[x] && !(l.avulso || []).includes(x));
        if (fe.length || av.length) { l.feitos.push(...fe); if (av.length) l.avulso = [...(l.avulso || []), ...av]; mudou = true; }
        if (!l.dur && Number(d.dur) > 0) { l.dur = Number(d.dur); mudou = true; }
        if (antes > (d.feitos || []).length + (d.avulso || []).length) localMaior.add(`${r.data}|${r.programa}`);
      }
      if (r.programa === "calistenia" && !S.logs[r.data]) {
        S.logs[r.data] = { w: d.w === "E" ? "E" : Number(d.w) || 0, d: Number(d.d) || 0, sets: d.sets && typeof d.sets === "object" ? d.sets : {}, dur: Number(d.dur) || 0, done: !!d.done }; mudou = true;
      }
      if (r.programa === "cf" && !S.cf.logs[r.data] && d.wod && Array.isArray(d.wod.partes)) {
        S.cf.logs[r.data] = { wod: d.wod, res: d.res && typeof d.res === "object" ? d.res : {}, done: !!d.done, ...(d.msg ? { msg: String(d.msg) } : {}) }; mudou = true;
      }
      if (r.programa === "corrida" && !S.corrida.logs[r.data] && Array.isArray(d.itens)) {
        const itens = d.itens.map(ativLimpa).filter(Boolean);
        if (itens.length) { S.corrida.logs[r.data] = { itens }; mudou = true; }
      }
      if (IA[r.programa] && !S[r.programa].logs[r.data]) {
        const sets = {};
        for (const [id, v] of Object.entries(d.sets && typeof d.sets === "object" ? d.sets : {})) if (Array.isArray(v)) sets[id] = v.filter((x) => x && Number(x.r) > 0).map((x) => ({ ...(Number(x.kg) > 0 ? { kg: Number(x.kg) } : {}), r: Number(x.r) }));
        S[r.programa].logs[r.data] = { d: Number(d.d) || 0, ...(d.w != null ? { w: Number(d.w) || 0 } : {}), sets, done: !!d.done }; mudou = true;
      }
      if (VP[r.programa] && !S[r.programa].logs[r.data]) {
        S[r.programa].logs[r.data] = { w: Number(d.w) || 0, d: Number(d.d) || 0, feitos: Array.isArray(d.feitos) ? d.feitos.filter((x) => INSV[x]) : [], max: d.max && typeof d.max === "object" ? d.max : {},
          ...(Array.isArray(d.fit) ? { fit: d.fit.map((n) => (Number.isFinite(n) ? n : null)) } : {}),
          ...(Array.isArray(d.avulso) ? { avulso: d.avulso.filter((x) => INSV[x]) } : {}), ...(Number(d.dur) > 0 ? { dur: Number(d.dur) } : {}) }; mudou = true;
      }
    }
    try {
      const { data: ag } = await sb.from("agua").select("data, ml, meta").eq("usuario_id", uid).gte("data", keyOf(addDays(hoje, -120)));
      for (const r of ag || []) {
        if (!S.agua?.[r.data]?.length && r.ml > 0) { S.agua = { ...(S.agua || {}), [r.data]: [{ t: "--:--", ml: r.ml }] }; S.aguaMeta = { ...(S.aguaMeta || {}), [r.data]: r.meta }; mudou = true; }
        enviados[`${uid}|agua|${r.data}`] = `${r.ml}/${r.meta}`;
      }
    } catch {}
    // Planos dos programas do Coach: traz da conta se este aparelho não tem plano ou tem um mais antigo
    try {
      const { data: planos } = await sb.from("hiper").select("programa, dados").eq("usuario_id", uid);
      for (const row of planos || []) {
        const pk = row.programa, r = row.dados;
        if (pk === "cf" && r && Array.isArray(r.prs)) {
          if ((r.atualizado || 0) > (S.cf.prsEm || 0)) { S.cf.prs = r.prs.filter((x) => x && x.mov && x.kg > 0 && /^\d{4}-\d{2}-\d{2}$/.test(x.k)); S.cf.prsEm = r.atualizado; mudou = true; }
          enviados[`${uid}|ia|cf`] = JSON.stringify({ prs: S.cf.prs || [], atualizado: S.cf.prsEm || 0 });
          continue;
        }
        if (!IA[pk] || !r) continue;
        if ((r.plano || r.etapa) && (!S[pk].plano || (r.atualizado || 0) > (S[pk].atualizado || 0))) {
          Object.assign(S[pk], { perfil: r.perfil || {}, etapa: r.etapa || 0, plano: r.plano || null, inicio: r.inicio || null, checkins: r.checkins || [], msgs: r.msgs || [], atualizado: r.atualizado || 0 });
          mudou = true;
        }
        enviados[`${uid}|ia|${pk}`] = JSON.stringify(iaDados(pk));
      }
    } catch {}
    // Registro que este aparelho já tinha enviado e que não está mais na conta: foi apagado ou mudado de data
    // (em outro aparelho ou pelo suporte). Apaga aqui também, senão ele contaria em dobro neste aparelho.
    const naContaTodos = new Set(data.map((r) => `${r.data}|${r.programa}`));
    for (const ch of Object.keys(enviados)) {
      const m = ch.match(/^([^|]+)\|(\d{4}-\d{2}-\d{2})\|(.+)$/);
      if (!m || m[1] !== uid || naContaTodos.has(`${m[2]}|${m[3]}`)) continue;
      const [, , dia, prog] = m;
      const logs = prog === "calistenia" ? S.logs : prog === "cf" ? S.cf.logs : IA[prog] || VP[prog] ? S[prog].logs : null;
      if (logs && logs[dia] && JSON.stringify(linhasLocais().find((r) => r.data === dia && r.programa === prog)) === enviados[ch]) { delete logs[dia]; mudou = true; }
      delete enviados[ch];
    }
    if (mudou) { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch {} }
    const naConta = new Set(data.map((r) => `${r.data}|${r.programa}`).filter((x) => !localMaior.has(x)));
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
      return `<rect x="${cx - bw / 2}" y="${base - bh}" width="${bw}" height="${bh}" rx="6" style="fill:${i === serie.length - 1 ? "#2b54ff" : "var(--blue-soft)"}"/>
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
      fitEvo: (() => { const ft = fitTests(rows); return ft.length > 1 ? ft[ft.length - 1].total - ft[0].total : 0; })(), desafios: G.meusDesafios || 0, ...aguaMetricas(),
      max30s1: (() => { const P = VP.insanity; if (!P) return 0; const ds = new Set(f.filter((r) => r.programa === "insanity" && r.detalhes?.w === 0).map((r) => r.detalhes.d)); return P.semanas[0].dias.every((t, d) => !t.ids.length || ds.has(d)) ? 1 : 0; })(),
      grad: graduado() ? 1 : 0, ...corridaMetricas(rows),
      barras: rows.some((r) => r.programa === "calistenia" && Object.entries(r.detalhes?.sets || {}).some(([id, v]) => /^barra-(pronada|aberta|fechada|negativa|uma-mao)$/.test(id) && (v || []).some((n) => n > 0))) ? 1 : 0 };
  }
  // Corrida (prints e plano de Corrida e Híbrido): maior corrida, km no total, 5 km mais rápido, semana, bike e dia híbrido
  function corridaMetricas(rows) {
    const it = rows.filter((r) => r.programa === "corrida").flatMap((r) => (Array.isArray(r.detalhes?.itens) ? r.detalhes.itens : []).map((a) => ({ ...a, data: r.data })));
    const runs = it.filter((a) => a.tipo === "corrida" || a.tipo === "esteira"), sem = {};
    const planoRun = rows.filter((r) => r.programa === "run" && r.concluido);
    [...runs.map((a) => a.data), ...planoRun.map((r) => r.data)].forEach((d) => { const k = keyOf(mondayOf(parseKey(d))); (sem[k] = sem[k] || new Set()).add(d); });
    const cincoK = runs.filter((a) => a.km >= 5 && a.tempo > 0).map((a) => (a.tempo / a.km) * 5);
    const forca = new Set(rows.filter((r) => r.concluido && r.programa !== "corrida").map((r) => r.data));
    return { corridas: runs.length + planoRun.length, maiorCorrida: Math.floor(Math.max(0, ...runs.map((a) => a.km || 0)) * 10) / 10, kmCorrida: Math.floor(soma(runs.map((a) => a.km || 0))),
      melhor5k: cincoK.length ? Math.min(...cincoK) : 0, corridasSemana: Math.max(0, ...Object.values(sem).map((x) => x.size)),
      maiorBike: Math.floor(Math.max(0, ...it.filter((a) => a.tipo === "bike").map((a) => a.km || 0))), planoRun: planoRun.length,
      diaHibrido: runs.some((a) => forca.has(a.data)) || planoRun.some((r) => (r.detalhes?.sets && Object.keys(r.detalhes.sets).some((id) => !/^run-/.test(id)) && Object.keys(r.detalhes.sets).some((id) => /^run-/.test(id)))) ? 1 : 0 };
  }
  // Água: melhor semana (litros), total e maior sequência de dias batendo a meta
  function aguaMetricas() {
    const linhas = aguaLinhas(), sem = {};
    linhas.forEach((r) => { const k = keyOf(mondayOf(parseKey(r.data))); sem[k] = (sem[k] || 0) + r.ml; });
    const ok = new Set(linhas.filter((r) => r.ml >= r.meta).map((r) => r.data));
    let seq = 0, melhor = 0;
    for (const k of [...ok].sort()) { seq = ok.has(keyOf(addDays(parseKey(k), -1))) ? seq + 1 : 1; melhor = Math.max(melhor, seq); }
    return { aguaSemana: Math.floor(Math.max(0, ...Object.values(sem)) / 1000), aguaTotal: Math.floor(soma(linhas.map((r) => r.ml)) / 1000), aguaSeq: melhor, aguaMetas: ok.size };
  }
  /* ==========================================================
     Gamificação: XP, níveis e classes (calculados a partir do histórico, então valem para treinos antigos)
     ========================================================== */
  const CLASSES = [
    ["recruta", "Recruta", "bronze"], ["escudeiro", "Escudeiro", "bronze"], ["guerreiro", "Guerreiro", "bronze"],
    ["cavaleiro", "Cavaleiro", "prata"], ["paladino", "Paladino", "prata"], ["campeao", "Campeão", "prata"],
    ["mestre-de-armas", "Mestre de Armas", "ouro"], ["tita", "Titã", "ouro"], ["lenda", "Lenda", "diamante"], ["imortal", "Imortal", "diamante"],
  ];
  const NIVEL_MAX = 50;
  const xpPara = (n) => 40 * n * (n - 1); // XP total para chegar ao nível n
  // Uma sessão completa vale parecido em qualquer modalidade (~50 de base + volume), para o ranking ser justo entre trilhas.
  // Calibrado para o MAX:30 inteiro levar ao nível 10 e a formatura (+500) empurrar para Guerreiro (nível 11).
  const XP = { video: 50, pulse: 30, abs: 20, sessao: 50, volumeMax: 20, parcialSerie: 2, parcialMax: 40, metaEx: 5, metaExMax: 15, cf: 70,
    recorde: 25, recordeMax: 50, teste: 25, semana: 150, semanaSeguida: 10, semanaSeguidaMax: 50, agua: 5, desafio: 50, formatura: 500, ficha: 105, chefe: 100, missao: 25, missoesTodas: 50, veterano: 300 };
  /* ---------- Corrida, caminhada e bike pelo print (a IA lê a captura; a imagem não é guardada) ---------- */
  // XP: base + por km (até o máximo). Sem distância no print, estima os km pelo tempo.
  const ATIV = {
    corrida: { nome: "Corrida", ic: "🏃", base: 30, porKm: 8, max: 40, minKm: 6 },
    esteira: { nome: "Esteira", ic: "🏃", base: 30, porKm: 8, max: 40, minKm: 6 },
    caminhada: { nome: "Caminhada", ic: "🚶", base: 20, porKm: 4, max: 20, minKm: 12 },
    bike: { nome: "Bike", ic: "🚴", base: 30, porKm: 2, max: 40, minKm: 2.5 },
  };
  XP.ativMax = 120;
  function xpAtiv(a) {
    const t = ATIV[a?.tipo]; if (!t) return 0;
    const kms = Number(a.km) > 0 ? Number(a.km) : Number(a.tempo) > 0 ? a.tempo / 60 / t.minKm : 0;
    return t.base + Math.min(t.max, Math.round(t.porKm * kms));
  }
  function ativLimpa(a) {
    if (!a || !ATIV[a.tipo]) return null;
    const km = Number(a.km) > 0 && Number(a.km) <= 500 ? Math.round(Number(a.km) * 100) / 100 : 0, tempo = Number(a.tempo) > 0 && Number(a.tempo) <= 86400 ? Math.round(Number(a.tempo)) : 0;
    if (!km && !tempo) return null;
    const n = (v, a1, b) => (Number(v) >= a1 && Number(v) <= b ? Math.round(Number(v)) : 0);
    return { tipo: a.tipo, ...(km ? { km } : {}), ...(tempo ? { tempo } : {}), ...(n(a.elev, 1, 10000) ? { elev: n(a.elev, 1, 10000) } : {}), ...(n(a.fc, 40, 230) ? { fc: n(a.fc, 40, 230) } : {}),
      ...(n(a.kcal, 1, 10000) ? { kcal: n(a.kcal, 1, 10000) } : {}), ...(a.app ? { app: String(a.app).slice(0, 30) } : {}), ...(a.titulo ? { titulo: String(a.titulo).slice(0, 60) } : {}) };
  }
  function ativTitulo(a) { const t = ATIV[a.tipo] || ATIV.corrida; return `${t.nome}${a.km ? ` ${String(a.km).replace(".", ",")} km` : a.tempo ? ` ${fmtDur(a.tempo)}` : ""}`; }
  const hmsDe = (s) => { s = Math.round(s || 0); const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), x = s % 60; return h ? `${h}:${pad(m)}:${pad(x)}` : `${m}:${pad(x)}`; };
  const segAtiv = (t) => { const p = String(t || "").trim().split(":").map(Number); if (!p.length || p.some((x) => !Number.isFinite(x) || x < 0)) return 0; return p.length === 3 ? p[0] * 3600 + p[1] * 60 + p[2] : p.length === 2 ? p[0] * 60 + p[1] : p[0] * 60; };
  let ativLendo = false;
  function ativHome() {
    const hojeIt = S.corrida.logs[hojeKey]?.itens || [];
    return `<label class="emerg ativ-home${ativLendo ? " lendo" : ""}"><span>${ativLendo ? "⏳" : "🏃"}</span><div><strong>${ativLendo ? "Lendo o print…" : hojeIt.length ? `Hoje: ${esc(hojeIt.map(ativTitulo).join(" + "))} ✓` : "Correu, caminhou ou pedalou?"}</strong>
      <small>${ativLendo ? "O Coach está conferindo os números" : "Mande o print do Strava, do relógio ou da esteira e vira XP"}</small></div>
      <em class="btn btn-blue">${hojeIt.length ? "+ Outra" : "Enviar print"}</em><input type="file" accept="image/*" data-ativ-print hidden${ativLendo ? " disabled" : ""}></label>`;
  }
  function secaoAtividades() {
    const dias = Object.entries(S.corrida.logs).filter(([, l]) => l.itens?.length).sort((a, b) => b[0].localeCompare(a[0]));
    if (!dias.length) return "";
    const todas = dias.flatMap(([k, l]) => l.itens.map((a, i) => ({ k, i, a })));
    const kmTot = soma(todas.map((x) => x.a.km || 0)), runs = todas.filter((x) => x.a.tipo === "corrida" || x.a.tipo === "esteira");
    const kmR = soma(runs.map((x) => x.a.km || 0)), tR = soma(runs.filter((x) => x.a.km).map((x) => x.a.tempo || 0));
    return `<div class="section"><div class="sec-head"><h2>Corridas e pedaladas</h2><span class="strava-tag">pelo print</span></div>
      <div class="stats-row">${stat("circle-check.svg", todas.length, "Atividades")}${stat("zap.svg", km(kmTot * 1000), "Km no total")}${stat("timer.svg", kmR && tR ? ritmo(tR, kmR * 1000) : "—", "Ritmo médio")}</div>
      <div class="runs">${todas.slice(0, 8).map(({ k, i, a }) => `<div class="run ativ-run"><span class="ativ-ic">${(ATIV[a.tipo] || ATIV.corrida).ic}</span>
        <div class="ativ-txt"><strong>${esc(a.titulo || ativTitulo(a))}</strong><small>${diaCurto(k)}${a.km ? ` · ${km(a.km * 1000)} km` : ""}${a.tempo ? ` · ${hmsDe(a.tempo)}` : ""}${a.km && a.tempo && a.tipo !== "bike" ? ` · ${ritmo(a.tempo, a.km * 1000)}/km` : ""}${a.fc ? ` · ${a.fc} bpm` : ""} · +${xpAtiv(a)} XP</small></div>
        <button class="lnk-btn" data-ativ-del="${k}|${i}" aria-label="Apagar">✕</button></div>`).join("")}</div></div>`;
  }
  function diaCurto(k) { const d = parseKey(k); return k === hojeKey ? "Hoje" : `${pad(d.getDate())}/${pad(d.getMonth() + 1)}`; }
  async function ativLerPrint(arquivo) {
    if (ativLendo) return;
    let b64;
    try { b64 = await cfReduzir(arquivo); if (b64.length > 1_300_000) b64 = await cfReduzir(arquivo, 1280, 0.75); } catch { toast("Não consegui abrir essa imagem."); return; }
    ativLendo = true; render();
    let d = null;
    try {
      const token = await tokenSB();
      const r = await fetch("/api/corrida", { method: "POST", headers: { "content-type": "application/json", ...(token ? { authorization: `Bearer ${token}` } : {}) }, body: JSON.stringify({ imagem: b64, hoje: hojeKey }) });
      d = await r.json().catch(() => ({}));
      if (!d.atividade) toast(d.erro === "ilegivel" ? "Não achei distância ou tempo nesse print. Tente o print da tela da atividade aberta." : d.erro === "limite" ? "Você chegou ao limite do Coach por hoje. Preencha à mão." : d.erro === "imagem" ? "Imagem grande demais. Tente de novo." : "Não consegui ler agora. Preencha à mão.", 5000);
    } catch { toast("Sem conexão. Preencha à mão."); }
    ativLendo = false; render();
    ativConfirmar(d?.atividade || { tipo: "corrida" });
  }
  function ativConfirmar(a) {
    let dl = document.getElementById("ativ-dlg");
    if (!dl) {
      dl = document.createElement("dialog"); dl.id = "ativ-dlg"; dl.className = "ativ-dlg"; document.body.appendChild(dl);
      dl.addEventListener("click", (e) => { if (e.target === dl || e.target.closest("[data-ativ-cancelar]")) dl.close(); });
      dl.addEventListener("input", () => { const f = dl.querySelector("form"), kmv = Number(String(f.km.value).replace(",", ".")), t = segAtiv(f.tempo.value), p = dl.querySelector(".ativ-prev");
        if (p) p.textContent = kmv > 0 && t > 0 && f.tipo.value !== "bike" ? `Ritmo ${ritmo(t, kmv * 1000)}/km · +${xpAtiv({ tipo: f.tipo.value, km: kmv, tempo: t })} XP` : `+${xpAtiv({ tipo: f.tipo.value, km: kmv, tempo: t })} XP`; });
      dl.addEventListener("submit", (e) => {
        e.preventDefault();
        const f = e.target, dia = /^\d{4}-\d{2}-\d{2}$/.test(f.data.value) && f.data.value <= hojeKey ? f.data.value : hojeKey;
        const it = ativLimpa({ ...JSON.parse(f.dataset.extra || "{}"), tipo: f.tipo.value, km: Number(String(f.km.value).replace(",", ".")), tempo: segAtiv(f.tempo.value), elev: f.elev.value, fc: f.fc.value });
        if (!it) { toast("Preencha a distância ou o tempo."); return; }
        const l = S.corrida.logs[dia] || { itens: [] };
        l.itens = [...(l.itens || []), it].slice(0, 10); S.corrida.logs[dia] = l;
        save(); dl.close(); render(); toast(`${ATIV[it.tipo].ic} ${ativTitulo(it)} registrada · +${xpAtiv(it)} XP`, 3500);
      });
    }
    const extra = { ...(a.app ? { app: a.app } : {}), ...(a.titulo ? { titulo: a.titulo } : {}), ...(a.kcal ? { kcal: a.kcal } : {}) };
    const dia = a.data && a.data <= hojeKey && a.data >= keyOf(addDays(hoje, -30)) ? a.data : hojeKey;
    dl.innerHTML = `<form class="ativ-box" data-extra='${esc(JSON.stringify(extra))}'>
      <h2>${a.km || a.tempo ? "Confira os números" : "Registrar atividade"}</h2>
      ${a.app ? `<p class="note small">Lido do print${a.app ? ` (${esc(a.app)})` : ""}. Ajuste se algo saiu errado.</p>` : ""}
      <div class="seg ativ-tipos">${Object.entries(ATIV).map(([k, t]) => `<label><input type="radio" name="tipo" value="${k}"${(a.tipo || "corrida") === k ? " checked" : ""}><span>${t.ic} ${t.nome}</span></label>`).join("")}</div>
      <div class="ativ-grid">
        <label class="field"><span class="field-lbl">Distância (km)</span><input name="km" inputmode="decimal" value="${a.km ? String(a.km).replace(".", ",") : ""}" placeholder="5,0"></label>
        <label class="field"><span class="field-lbl">Tempo (h:mm:ss)</span><input name="tempo" inputmode="numeric" value="${a.tempo ? hmsDe(a.tempo) : ""}" placeholder="30:00"></label>
        <label class="field"><span class="field-lbl">Data</span><input name="data" type="date" value="${dia}" max="${hojeKey}"></label>
        <label class="field"><span class="field-lbl">Elevação (m)</span><input name="elev" inputmode="numeric" value="${a.elev || ""}" placeholder="opcional"></label>
        <label class="field"><span class="field-lbl">FC média</span><input name="fc" inputmode="numeric" value="${a.fc || ""}" placeholder="opcional"></label>
      </div>
      <p class="ativ-prev note"></p>
      <div class="ativ-acoes"><button type="button" class="btn btn-outline" data-ativ-cancelar>Cancelar</button><button class="btn btn-blue">Salvar</button></div></form>`;
    if (!dl.open) dl.showModal();
    dl.dispatchEvent(new Event("input"));
  }
  document.addEventListener("change", (e) => { const f = e.target.closest?.("[data-ativ-print]"); if (f && f.files?.[0]) { const arq = f.files[0]; f.value = ""; ativLerPrint(arq); } });
  document.addEventListener("click", (e) => {
    const b = e.target.closest?.("[data-ativ-del]"); if (!b) return;
    const [k, i] = b.dataset.ativDel.split("|"), l = S.corrida.logs[k];
    if (!l || !confirm("Apagar esta atividade?")) return;
    l.itens.splice(Number(i), 1); if (!l.itens.length) delete S.corrida.logs[k];
    save(); render();
  });
  const EX_META = Object.fromEntries(TODOS_EX.map((e) => [e.id, e]));
  const nSets = (sets) => soma(Object.values(sets || {}).map((s) => (Array.isArray(s) ? s.length : 0)));
  const xpSessao = (done, n) => (done ? XP.sessao + Math.min(XP.volumeMax, n) : Math.min(XP.parcialMax, n * XP.parcialSerie));
  // XP de cada linha de treino (sem recordes, meta da semana e bônus)
  function xpLinha(r) {
    const d = r.detalhes || {};
    let xp = 0;
    if (VP[r.programa]) {
      for (const id of [...(d.feitos || []), ...(d.avulso || [])]) { const v = INSV[id]; if (!v) continue; xp += id === "pulse" ? XP.pulse : v.tipo === "Abdômen" ? XP.abs : XP.video; }
      if (Array.isArray(d.fit) && d.fit.some((n) => n > 0)) xp += XP.teste;
      if (d.max?.["cardio-challenge"]) xp += XP.teste;
    } else if (r.programa === "calistenia") {
      xp += xpSessao(!!d.done, nSets(d.sets));
      let metas = 0;
      for (const [id, s] of Object.entries(d.sets || {})) { const e = EX_META[id]; if (e && Array.isArray(s) && s.length && (e.un === "tiro" ? s.length : soma(s)) >= e.meta) metas += XP.metaEx; }
      xp += Math.min(XP.metaExMax, metas);
    } else if (IA[r.programa]) xp += xpSessao(!!d.done, nSets(d.sets));
    else if (r.programa === "cf" && d.done) xp += XP.cf;
    else if (r.programa === "corrida") xp += Math.min(XP.ativMax, soma((Array.isArray(d.itens) ? d.itens : []).map(xpAtiv)));
    return xp;
  }
  // Recordes nas linhas (em ordem de data): Max Out, carga na academia/calistenia do Coach e repetições no Treino da Fera
  function xpRecordes(rows) {
    let xp = 0;
    const best = {};
    maxOuts(rows).sort((a, b) => a.k.localeCompare(b.k)).forEach((m) => { if (best[m.v] && m.s > best[m.v]) xp += XP.recorde; best[m.v] = Math.max(best[m.v] || 0, m.s); });
    const melhor = {};
    for (const r of [...rows].sort((a, b) => a.data.localeCompare(b.data))) {
      if (!IA[r.programa] && r.programa !== "calistenia") continue;
      let ganho = 0;
      for (const [id, s] of Object.entries(r.detalhes?.sets || {})) {
        if (!Array.isArray(s) || !s.length || (r.programa === "calistenia" && EX_META[id]?.un === "tiro")) continue;
        const v = Math.max(...s.map((x) => (typeof x === "number" ? x : x?.kg || 0))), ch = `${r.programa}|${id}`;
        if (v > 0 && melhor[ch] && v > melhor[ch]) ganho += XP.recorde;
        if (v > 0) melhor[ch] = Math.max(melhor[ch] || 0, v);
      }
      xp += Math.min(XP.recordeMax, ganho);
    }
    return xp;
  }
  // XP total de uma pessoa: rows = linhas de treino; agua = linhas de água; desafios = quantos fez; meta = treinos por semana da trilha
  function xpDe(rows, agua = [], desafios = 0, meta = 6) {
    const porDia = {};
    rows.forEach((r) => (porDia[r.data] = porDia[r.data] || []).push(xpLinha(r)));
    let xp = 0;
    for (const lista of Object.values(porDia)) lista.sort((a, b) => b - a).forEach((v, i) => (xp += i ? Math.round(v / 2) : v)); // 2º treino no mesmo dia vale metade
    xp += xpRecordes(rows);
    // Meta da semana batida (dias com treino concluído de segunda a domingo) e semanas seguidas batendo a meta
    const sem = {};
    feitas(rows).forEach((r) => (sem[keyOf(mondayOf(parseKey(r.data)))] = sem[keyOf(mondayOf(parseKey(r.data)))] || new Set()).add(r.data));
    let seguidas = 0, prev = null;
    for (const s of Object.keys(sem).sort()) {
      if (sem[s].size < meta) { seguidas = 0; prev = s; continue; }
      seguidas = prev && diffDays(parseKey(prev), parseKey(s)) === 7 && seguidas ? seguidas + 1 : 1;
      xp += XP.semana + Math.min(XP.semanaSeguidaMax, (seguidas - 1) * XP.semanaSeguida);
      prev = s;
    }
    xp += agua.filter((a) => a.ml >= a.meta).length * XP.agua;
    xp += desafios * XP.desafio;
    return xp;
  }
  function nivelDe(xp) {
    let n = 1; while (n < NIVEL_MAX && xp >= xpPara(n + 1)) n++;
    const ci = Math.min(CLASSES.length - 1, Math.floor((n - 1) / 5)), [slug, nome, metal] = CLASSES[ci];
    const ini = xpPara(n), fim = n < NIVEL_MAX ? xpPara(n + 1) : ini;
    return { xp, nivel: n, classe: nome, slug, metal, ci, rank: ((n - 1) % 5) + 1, ini, fim, pct: fim > ini ? Math.round(((xp - ini) / (fim - ini)) * 100) : 100 };
  }
  const meuXp = () => xpDe(linhasLocais(), aguaLinhas(), G.meusDesafios ?? S.desafiosN ?? 0, metaSemana())
    + Object.keys(formaturas()).length * XP.formatura + (S.cf?.prs || []).length * XP.recorde + (S.ficha ? XP.ficha : 0) + chefesXp() + missoesXp() + (veterano() ? XP.veterano : 0);
  const meuNivel = () => nivelDe(meuXp());
  const classeImg = (slug) => `assets/classes/${slug}.svg`;
  const molduraImg = (metal) => `assets/classes/moldura-${metal}.svg`;
  // Artes das classes (cartas desenhadas pelo Eduardo): versão masculina ou feminina pelo sexo informado, ou pela escolha no Perfil
  const sexoArte = () => (S.arte === "f" || S.arte === "m" ? S.arte : /^fem/.test(norm(S.quiz?.sexo === "f" ? "feminino" : S.quiz?.sexo === "m" ? "masculino" : nutriSexo())) ? "f" : "m");
  const avatarClasse = (slug) => `assets/classes/avatar/${slug}-${sexoArte()}.webp`;
  const cartaClasse = (slug, g = sexoArte()) => `assets/classes/cartas/${slug}-${g}.webp`;
  function galeriaCartas(n) {
    return `<div class="carta-gal">${CLASSES.map(([slug, nome], i) => `<div class="carta-it${i === n.ci ? " on" : i > n.ci ? " off" : ""}"><img src="${cartaClasse(slug)}" alt="${esc(nome)}${i > n.ci ? " (bloqueada)" : ""}" loading="lazy">${i > n.ci ? `<span class="carta-lock">🔒</span>` : ""}</div>`).join("")}</div>
      <p class="arte-lbl">Gênero do personagem</p><div class="seg arte-seg"><button class="${sexoArte() === "m" ? "on" : ""}" data-arte="m">♂ Masculino</button><button class="${sexoArte() === "f" ? "on" : ""}" data-arte="f">♀ Feminino</button></div>`;
  }

  /* ==========================================================
     Trilhas: cada pessoa escolhe como treina; cada trilha tem etapas com formatura (80% das sessões + um teste de saída).
     O XP é um só (troca de trilha mantém o XP e as formaturas). O Treino da Fera ("plano") fica sempre liberado como apoio.
     ========================================================== */
  const TRILHAS = {
    insanos: { nome: "Insanos", ic: "🔥", desc: "MAX:30 e depois o Insanity: treinos em vídeo, em casa" },
    academia: { nome: "Academia", ic: "🏋️", desc: "Hipertrofia: o Coach monta a ficha (adaptação e depois hipertrofia)" },
    calistenia: { nome: "Calistenia", ic: "🤸", desc: "Calistenia 21 dias no seu nível e depois o Treino da Fera" },
    cross: { nome: "Cross", ic: "⏱️", desc: "O WOD do seu box: tire uma foto do quadro e eu lanço o treino" },
    hibrido: { nome: "Híbridos", ic: "⚡", desc: "Vídeos do Insanos + academia ou calistenia (3 + 2 dias)" },
    ...(RUNC.length ? { corrida: { nome: "Corrida", ic: "🏃", desc: "Corrida ou treino híbrido: o Coach mistura corrida com força (academia ou peso do corpo)" } } : {}),
  };
  const trilha = () => (TRILHAS[S.trilha] ? S.trilha : "insanos");
  const forcaHibrido = () => (S.forca === "c21" && IA.c21 ? "c21" : "hiper");
  const formaturas = () => { const f = { ...(S.formaturas || {}) }; if (S.graduadoMax30 && !f.max30) f.max30 = S.graduadoMax30; return f; };
  // Programa de vídeo: 80% das sessões do calendário + a última sessão (MAX:30: Cardio Challenge final; Insanity: Fit Test final)
  function progVideo(p) {
    const P = VP[p]; if (!P) return { feitas: 0, precisa: 0, total: 0, final: true, ok: false };
    const sessoes = []; P.semanas.forEach((s, w) => s.dias.forEach((t, d) => t.ids.length && sessoes.push([w, d])));
    const feitosWD = new Set();
    for (const [k, l] of Object.entries(S[p].logs)) if (insFeito(p, k) && Number.isInteger(l.w) && insDia(p, l.w, l.d)?.ids.length) feitosWD.add(`${l.w}|${l.d}`);
    const ult = sessoes[sessoes.length - 1], final = !ult || feitosWD.has(ult.join("|"));
    const feitas = sessoes.filter(([w, d]) => feitosWD.has(`${w}|${d}`)).length, precisa = Math.ceil(sessoes.length * 0.8);
    const tf = ult ? insDia(p, ult[0], ult[1]) : null;
    return { feitas, precisa, total: sessoes.length, final, teste: tf ? `${tf.titulo} (última sessão do calendário)` : "", ok: feitas >= precisa && final };
  }
  const max30Progresso = () => progVideo("insanity");
  // Programa do Coach: 80% das sessões das primeiras semanas (Calistenia 21 dias: 3; academia: 4 de adaptação) + o teste de saída
  function progIA(pk, semanas) {
    const St = S[pk];
    const testeTxt = pk === "hiper" ? "um recorde de carga em qualquer exercício" : pk === "run" ? "o último treino da 4ª semana" : "o último treino do plano (teste máximo)";
    if (!St?.plano || !St.inicio) return { feitas: 0, precisa: 0, total: 0, final: false, teste: testeTxt, ok: false, semPlano: true };
    const ini = mondayOf(parseKey(St.inicio)), semDe = (k, l) => (Number.isInteger(l.w) && pk === "c21" ? l.w : Math.floor(diffDays(ini, parseKey(k)) / 7));
    const total = soma([...Array(semanas)].map((_, w) => iaSessoesSemana(pk, w).length)), precisa = Math.ceil(total * 0.8);
    const dentro = Object.entries(St.logs).filter(([k, l]) => l.done && semDe(k, l) >= 0 && semDe(k, l) < semanas);
    const feitas = Math.min(total, dentro.length);
    let final;
    if (pk === "hiper") { // teste de saída: bater um recorde de carga em algum exercício
      const melhor = {}; final = false;
      for (const [, l] of Object.entries(St.logs).sort(([a], [b]) => a.localeCompare(b))) for (const [id, s] of Object.entries(l.sets || {})) {
        const kg = Math.max(0, ...(s || []).map((x) => x?.kg || 0)); if (kg > 0 && melhor[id] && kg > melhor[id]) final = true; if (kg) melhor[id] = Math.max(melhor[id] || 0, kg);
      }
    } else { // Calistenia 21 dias: o último treino do plano (teste máximo)
      const ult = iaSessoesSemana(pk, semanas - 1).map((x) => x.dia).sort((a, b) => a - b).pop();
      final = dentro.some(([k, l]) => semDe(k, l) === semanas - 1 && l.d === ult);
    }
    return { feitas, precisa, total, final, teste: testeTxt, ok: total > 0 && feitas >= precisa && final };
  }
  // Etapas de cada trilha: { k (chave da formatura), prog (programa), nome, p (progresso; null = etapa contínua) }
  function etapasDe(t = trilha()) {
    const max30 = { k: "max30", prog: "insanity", nome: "MAX:30", p: () => progVideo("insanity") };
    const ins = VP.insanity60 ? [{ k: "insanity", prog: "insanity60", nome: "Insanity", p: () => progVideo("insanity60") }] : [];
    if (t === "academia") return [{ k: "adaptacao", prog: "hiper", nome: "Adaptação", p: () => progIA("hiper", 4) }, { k: "hipertrofia", prog: "hiper", nome: "Hipertrofia", p: null }];
    if (t === "calistenia" && IA.c21) return [{ k: "c21", prog: "c21", nome: "Calistenia 21 dias", p: () => progIA("c21", 3) }, { k: "fera", prog: "plano", nome: "Treino da Fera", p: null }];
    if (t === "calistenia") return [{ k: "fera", prog: "plano", nome: "Treino da Fera", p: null }];
    if (t === "cross") return [{ k: "box", prog: "cf", nome: "WOD do box", p: null }];
    if (t === "corrida" && IA.run) return [{ k: "base-corrida", prog: "run", nome: "Base de corrida", p: () => progIA("run", 4) }, { k: "performance", prog: "run", nome: "Performance", p: null }]; // o WOD vem do box: sem etapas, XP por sessão
    return [max30, ...ins, { k: "ciclos", prog: VP.insanity60 ? "insanity60" : "insanity", nome: "Novos ciclos", p: null }]; // insanos e híbridos
  }
  function etapaAtual(t = trilha()) {
    const es = etapasDe(t), f = formaturas();
    const i = es.findIndex((e) => e.p && !f[e.k]);
    return { ...(es[i >= 0 ? i : es.length - 1]), i: i >= 0 ? i : es.length - 1, n: es.length };
  }
  // Treinos por semana que valem a "meta da semana"
  function metaSemana() {
    const t = trilha(), dias = (pk) => Number(String(S[pk]?.perfil?.dias || "").match(/\d/)?.[0]) || 0;
    if (t === "academia") return dias("hiper") || 4;
    if (t === "calistenia") return dias("c21") || 5;
    if (t === "cross") return 3;
    if (t === "corrida") return dias("run") || 4;
    if (t === "hibrido") return 5;
    return 6;
  }
  const graduado = () => !!formaturas().max30; // formado no MAX:30 (emblema)
  // O dono pode ver o app como um usuário comum (Perfil → "Ver como usuário comum")
  function donoAtivo() { return !!S.dono && !S.verComoMembro; }
  function liberado(k) {
    if (k === "plano" || donoAtivo()) return true;
    const es = etapasDe(), at = etapaAtual();
    if (es.slice(0, at.i + 1).some((e) => e.prog === k)) return true;
    return trilha() === "hibrido" && k === forcaHibrido();
  }
  const travado = (k) => !liberado(k);
  const motivoTrava = (k) => (etapasDe().some((e) => e.prog === k) ? `libera na formatura de ${etapaAtual().nome}` : `fora da trilha ${TRILHAS[trilha()].nome}`);
  function aplicarTrava() {
    if (donoAtivo() || liberado(principal())) return;
    escolherPrograma(etapaAtual().prog);
  }
  // Depois de salvar: XP ganho, subida de nível/classe e formatura
  let xpAntes = null;
  function conferirXp(silencioso = false) {
    const at = etapaAtual();
    if (at.p && at.p().ok) {
      S.formaturas = { ...formaturas(), [at.k]: hojeKey };
      try { localStorage.setItem(KEY, JSON.stringify(S)); } catch {}
      const prox = etapaAtual();
      if (!silencioso) setTimeout(() => modalFormatura(at, prox), 600);
    }
    const n = meuNivel(), antes = xpAntes; xpAntes = n;
    if (silencioso || !antes) return;
    const ganho = n.xp - antes.xp;
    if (ganho > 0) xpToast(ganho, n);
    if (n.nivel > antes.nivel) setTimeout(() => modalNivel(n, n.ci > antes.ci), 1400);
  }
  function xpToast(ganho, n) {
    const t = document.createElement("div");
    t.className = "xp-toast"; t.setAttribute("role", "status");
    t.innerHTML = `<img class="xp-av" src="${avatarClasse(n.slug)}" alt="" width="34" height="34"><div><strong>+${ganho} XP</strong><small>Nível ${n.nivel} · ${esc(n.classe)}</small><span class="xp-bar"><i style="width:${n.pct}%"></i></span></div>`;
    document.body.appendChild(t);
    requestAnimationFrame(() => t.classList.add("on"));
    setTimeout(() => { t.classList.remove("on"); setTimeout(() => t.remove(), 400); }, 2600);
  }
  function dlgGami(html) {
    let d = document.getElementById("gami-dlg");
    if (!d) { d = document.createElement("dialog"); d.id = "gami-dlg"; document.body.appendChild(d); d.addEventListener("click", (e) => { if (e.target === d || e.target.closest("[data-gami-ok]")) d.close(); }); }
    d.innerHTML = `<div class="gami-box">${html}<button class="btn btn-blue" data-gami-ok>Bora!</button></div>`;
    if (!d.open) d.showModal();
  }
  function modalNivel(n, novaClasse) {
    dlgGami(`<div class="gami-carta"><img src="${cartaClasse(n.slug)}" alt="Carta da classe ${esc(n.classe)}"></div>
      <p class="gami-k">${novaClasse ? "Nova classe!" : "Subiu de nível!"}</p><h2>${novaClasse ? esc(n.classe) : `Nível ${n.nivel}`}</h2>
      <p class="note">${novaClasse ? `Você agora é <b>${esc(n.classe)}</b> (nível ${n.nivel}).` : `${esc(n.classe)} · faltam ${n.fim - n.xp} XP para o nível ${n.nivel + 1}.`}</p>`);
  }
  function modalFormatura(et, prox) {
    dlgGami(`<div class="gami-crest metal-ouro"><img class="gm-cls" src="assets/emblemas/graduado-max30.svg" alt=""></div>
      <p class="gami-k">Formatura · +${XP.formatura} XP</p><h2>${esc(et.nome)} concluído!</h2>
      <p class="note">${prox && prox.k !== et.k ? `Próxima etapa liberada: <b>${esc(prox.nome)}</b>. Ela já está na tela inicial.` : "Você fechou a trilha. Agora é bater os próprios recordes."}</p>`);
    if (prox && prox.prog !== principal() && liberado(prox.prog)) { escolherPrograma(prox.prog); render(); }
  }
  // Escolha da trilha (perfil)
  function trilhaHtml() {
    const t = trilha();
    return `<div class="field"><span class="field-lbl">Sua trilha · dá para trocar quando quiser, o XP continua</span>
      <div class="trilhas">${Object.entries(TRILHAS).map(([k, x]) => `<button class="trilha-opt${t === k ? " on" : ""}" data-trilha="${k}"><span class="tr-ic">${x.ic}</span><span class="tr-txt"><strong>${esc(x.nome)}</strong><small>${esc(x.desc)}</small></span>${t === k ? "<b>✓</b>" : ""}</button>`).join("")}</div>
      ${t === "hibrido" ? `<div class="seg" style="margin-top:8px"><button class="${forcaHibrido() === "hiper" ? "on" : ""}" data-forca="hiper">Força na academia</button>${IA.c21 ? `<button class="${forcaHibrido() === "c21" ? "on" : ""}" data-forca="c21">Força na calistenia</button>` : ""}</div>` : ""}</div>`;
  }
  // Card do nível no perfil
  function nivelCard() {
    const n = meuNivel(), at = etapaAtual(), g = at.p ? at.p() : null, prox = CLASSES[n.ci + 1], T = TRILHAS[trilha()];
    const etapas = etapasDe(), f = formaturas();
    return `<div class="nivel-card metal-${n.metal}">
      <div class="nc-crest nc-arte metal-${n.metal}"><img src="${avatarClasse(n.slug)}" alt="Classe ${esc(n.classe)}"></div>
      <div class="nc-txt"><span class="nc-k">Nível ${n.nivel}${n.nivel >= NIVEL_MAX ? " · máximo" : ""} · ${T.ic} ${esc(T.nome)}</span><strong>${esc(n.classe)}${estiloTxt() ? ` <span class="nc-estilo">${esc(estiloTxt())}</span>` : ""}</strong>
        <span class="xp-bar"><i style="width:${n.pct}%"></i></span>
        <small>${n.xp.toLocaleString("pt-BR")} XP${n.nivel < NIVEL_MAX ? ` · faltam ${(n.fim - n.xp).toLocaleString("pt-BR")} para o nível ${n.nivel + 1}` : ""}${prox ? ` · ${esc(prox[1])} no nível ${(n.ci + 1) * 5 + 1}` : ""}</small></div></div>
      ${galeriaCartas(n)}
      ${S.dono ? `<button class="btn btn-outline ver-membro" id="ver-membro">${S.verComoMembro ? "👁️ Vendo como usuário comum · voltar à visão de dono" : "👁️ Ver como usuário comum"}</button>` : ""}
      ${at.n === 1 && !g ? `<div class="grad-box"><div class="sec-head"><h2>${esc(at.nome)}</h2></div>
        <p class="note small">Cada WOD concluído vale ${XP.cf} XP, e cada PR (carga ou WOD repetido mais rápido) +${XP.recorde}. Bata a meta de ${metaSemana()} treinos na semana para ganhar +${XP.semana}.</p></div>` : `<div class="grad-box"><div class="sec-head"><h2>Etapa ${at.i + 1} de ${at.n} · ${esc(at.nome)}</h2>${g && !g.semPlano ? `<span>${g.feitas}/${g.precisa} sessões</span>` : ""}</div>
        <ol class="etapas">${etapas.map((e, i) => `<li class="${f[e.k] ? "ok" : i === at.i ? "on" : ""}">${f[e.k] ? "✓ " : ""}${esc(e.nome)}</li>`).join("")}</ol>
        ${g ? `<span class="xp-bar"><i style="width:${Math.min(100, Math.round((g.feitas / Math.max(1, g.precisa)) * 100))}%"></i></span>
        <p class="note small">${g.semPlano ? `Monte seu treino com o Coach (tela inicial) para começar a contar. ` : ""}Formatura: ${g.precisa ? `${g.precisa} de ${g.total} sessões` : "80% das sessões"} e <b>${esc(g.teste)}</b>${g.final ? " ✓" : ""}. Vale +${XP.formatura} XP${etapas[at.i + 1] ? ` e libera <b>${esc(etapas[at.i + 1].nome)}</b>` : ""}.</p>` : `<p class="note small">Etapa contínua: o Coach renova o plano em ciclos. Bata a meta da semana e os seus recordes para subir de nível.</p>`}
        <p class="note small">O Treino da Fera fica sempre liberado como apoio para as barras.</p></div>`}
      <details class="xp-regras"><summary>Como ganhar XP</summary><ul class="note small">
        <li>Vídeo principal: ${XP.video} · Pulse: ${XP.pulse} · Abdômen: ${XP.abs}</li>
        <li>Treino concluído (academia, calistenia): ${XP.sessao} + até ${XP.volumeMax} pelo volume · WOD do Cross: ${XP.cf}</li>
        <li>Recorde (Max Out, carga, repetições ou PR do Cross): +${XP.recorde} · Cardio Challenge ou Fit Test: +${XP.teste}</li>
        <li>Meta da semana (${metaSemana()} treinos de seg a dom): +${XP.semana}, e +${XP.semanaSeguida} por semana seguida (até +${XP.semanaSeguidaMax})</li>
        <li>Corrida ou esteira pelo print: ${ATIV.corrida.base} + ${ATIV.corrida.porKm} por km (até +${ATIV.corrida.max}) · Bike: ${ATIV.bike.base} + ${ATIV.bike.porKm} por km · Caminhada: ${ATIV.caminhada.base} + ${ATIV.caminhada.porKm} por km</li>
        <li>Meta de água: +${XP.agua} · Desafio do grupo: +${XP.desafio} · 2º treino no mesmo dia vale metade</li>
        <li>Formatura de cada etapa: +${XP.formatura}</li>
        <li>Classe nova a cada 5 níveis: ${CLASSES.map((c) => c[1]).join(" → ")}</li></ul></details>`;
  }
  // Selo pequeno de nível (ranking do grupo, perfil de membro)
  const nivelSelo = (cfg) => (cfg && cfg.nivel_xp ? `<span class="nv-selo metal-${esc(CLASSES[Math.min(9, Math.floor((cfg.nivel_xp - 1) / 5))][2])}" title="${esc(CLASSES[Math.min(9, Math.floor((cfg.nivel_xp - 1) / 5))][1])}${ESTILOS[cfg.estilo] ? ` · ${ESTILOS[cfg.estilo].nome}` : ""}"><img src="${classeImg(CLASSES[Math.min(9, Math.floor((cfg.nivel_xp - 1) / 5))][0])}" alt="" width="16" height="16">${Number(cfg.nivel_xp) || 1}${ESTILOS[cfg.estilo] ? `<span class="nv-es">${ESTILOS[cfg.estilo].ic}</span>` : ""}</span>` : "");

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
    ["agua1", "💧", "Bateu a meta de água", (m) => [m.aguaMetas, 1]],
    ["aguas10", "🥤", "10 L de água numa semana", (m) => [m.aguaSemana, 10]],
    ["aguas15", "🚰", "15 L de água numa semana", (m) => [m.aguaSemana, 15]],
    ["aguas20", "🌊", "20 L de água numa semana", (m) => [m.aguaSemana, 20]],
    ["aguaseq7", "🐳", "7 dias seguidos na meta de água", (m) => [m.aguaSeq, 7]],
    ["agua100", "🏝️", "100 L de água no total", (m) => [m.aguaTotal, 100]],
    ["max30s1", "🛡️", "1ª semana do MAX:30 completa", (m) => [m.max30s1, 1]],
    ["barra1", "🧗", "Primeira barra registrada", (m) => [m.barras, 1]],
    ["grad30", "🎓", "Formado no MAX:30", (m) => [m.grad, 1]],
    ["run1", "👟", "Primeira corrida", (m) => [m.corridas, 1]],
    ["run5k", "🥉", "5 km numa corrida", (m) => [m.maiorCorrida, 5]],
    ["run10k", "🥈", "10 km numa corrida", (m) => [m.maiorCorrida, 10]],
    ["run21k", "🥇", "Meia maratona (21 km)", (m) => [m.maiorCorrida, 21]],
    ["run42k", "🏅", "Maratona (42 km)", (m) => [m.maiorCorrida, 42]],
    ["sub30", "⚡", "5 km abaixo de 30 min", (m) => [m.melhor5k && m.melhor5k < 1800 ? 1 : 0, 1]],
    ["sub25", "💨", "5 km abaixo de 25 min", (m) => [m.melhor5k && m.melhor5k < 1500 ? 1 : 0, 1]],
    ["km50", "🛣️", "50 km correndo", (m) => [m.kmCorrida, 50]],
    ["km100", "🌎", "100 km correndo", (m) => [m.kmCorrida, 100]],
    ["km250", "🚀", "250 km correndo", (m) => [m.kmCorrida, 250]],
    ["runsem3", "📆", "3 corridas numa semana", (m) => [m.corridasSemana, 3]],
    ["bike50", "🚴", "50 km de bike numa saída", (m) => [m.maiorBike, 50]],
    ["hibrido1", "🦾", "Dia híbrido: corrida + força", (m) => [m.diaHibrido, 1]],
    ["planorun10", "🧭", "10 treinos do plano de corrida", (m) => [m.planoRun, 10]],
  ];
  // Emblemas desenhados (assets/emblemas); as outras conquistas usam o emoji
  const CONQ_IMG = { seq7: "sequencia-7", maxrec: "recorde-max-out", aguaseq7: "hidratado-7", max30s1: "max30-semana-1", barra1: "primeira-barra", grad30: "graduado-max30" };
  const conqIc = (id, ic) => (CONQ_IMG[id] ? `<img class="b-img" src="assets/emblemas/${CONQ_IMG[id]}.svg" alt="" width="44" height="44">` : ic);
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
      return `<div class="badge${ok ? " on" : ""}" title="${esc(nome)}"><span class="b-ic">${conqIc(id, ic)}</span><strong>${esc(nome)}</strong><small>${ok ? `Desde ${ddmm(S2[id])}` : `${Math.min(v, alvo)}/${alvo}`}</small></div>`;
    }).join("")}</div>`;
  }

  /* ---------- Avatar e foto de perfil ---------- */
  const iniciais = (n) => String(n || "?").trim().split(/\s+/).slice(0, 2).map((p) => p[0]).join("").toUpperCase() || "?";
  /* Avatar Group (ProfitizeBuild), portado do componente React para JS puro: fotos redondas sobrepostas; a do mouse,
     do foco ou do toque sobe 10 px, passa para a frente e mostra o nome num balão que salta (mola em CSS); o resto vira "+N".
     ids: ids de G.perfis. opts: { max, size, overlap, label, link (abre o perfil do membro), estatico (dentro de um link) } */
  function avatarGroup(ids, { max = 5, size = 40, overlap = 14, label = "Participantes", link = false, estatico = false } = {}) {
    const vis = ids.slice(0, max), extra = ids.length - vis.length;
    return `<ul class="ag-group" aria-label="${esc(label)}"${estatico ? " data-ag-estatico" : ""}>${vis.map((id, i) => {
      const p = G.perfis[id] || (id === uid ? { nome: nomeCompleto(), foto_url: S.user?.foto } : null), nome = (p?.nome || "Atleta").split(" ")[0] + (id === uid ? " (você)" : "");
      const foto = p?.foto_url ? `<img class="ag-photo" src="${esc(p.foto_url)}" alt="${esc(p.nome || "Atleta")}" width="${size}" height="${size}" draggable="false" referrerpolicy="no-referrer" loading="lazy">`
        : `<span class="ag-photo ag-ini" style="font-size:${Math.round(size * 0.34)}px" role="img" aria-label="${esc(p?.nome || "Atleta")}">${esc(iniciais(p?.nome))}</span>`;
      const tag = link && !estatico ? "a" : "span", attrs = link && !estatico ? `href="#/grupo/membro/${esc(id)}"` : estatico ? "" : 'tabindex="0"';
      return `<li class="ag-item" style="width:${size}px;height:${size}px;z-index:${vis.length - i};margin-left:${i ? -overlap : 0}px">
        <${tag} class="ag-avatar" ${attrs}>${foto}</${tag}><span class="ag-tip" style="top:${Math.round(-size * 0.7)}px" aria-hidden="true">${esc(nome)}</span></li>`;
    }).join("")}${extra > 0 ? `<li class="ag-item ag-extra" role="img" aria-label="Mais ${extra}" style="width:${size}px;height:${size}px;margin-left:-${overlap}px;z-index:0;font-size:${Math.round(size * 0.32)}px">+${extra}</li>` : ""}</ul>`;
  }
  {
    const ativar = (li) => { document.querySelectorAll(".ag-item[data-active]").forEach((x) => x !== li && x.removeAttribute("data-active")); li?.setAttribute("data-active", ""); };
    const item = (e) => { const li = e.target.closest?.(".ag-item:not(.ag-extra)"); return li && li.closest(".ag-group") ? li : null; };
    document.addEventListener("pointerover", (e) => { if (e.pointerType !== "touch") { const li = item(e); if (li) ativar(li); } });
    document.addEventListener("pointerout", (e) => { if (e.pointerType === "touch") return; const li = item(e); if (li && !li.contains(e.relatedTarget)) li.removeAttribute("data-active"); });
    document.addEventListener("pointerdown", (e) => {
      if (e.pointerType !== "touch") return;
      const li = item(e);
      if (li && !li.closest("[data-ag-estatico]")) ativar(li); else ativar(null); // toque fora esconde
    });
    document.addEventListener("focusin", (e) => { const li = item(e); if (li && e.target.matches(":focus-visible")) ativar(li); });
    document.addEventListener("focusout", (e) => { const li = item(e); if (li) li.removeAttribute("data-active"); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") { const li = item(e); if (li?.hasAttribute("data-active")) { e.preventDefault(); li.removeAttribute("data-active"); } } });
  }
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
  const G = { grupos: null, sel: null, membros: [], perfis: {}, linhas: [], agua: [], conq: [], desafios: [], feitos: [], meusDesafios: null, carregadoEm: 0, carregando: false, erro: false, periodo: "semana", rank: "treinos" };
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
      if (!meus.error) { G.meusDesafios = (meus.data || []).length; if (S.desafiosN !== G.meusDesafios) { S.desafiosN = G.meusDesafios; try { localStorage.setItem(KEY, JSON.stringify(S)); } catch {} } }
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
      sb.from("perfis").select("id, nome, foto_url, config").in("id", ids),
      sb.from("treinos").select("usuario_id, data, programa, titulo, concluido, minutos, detalhes, atualizado_em").in("usuario_id", ids).gte("data", keyOf(addDays(parseKey(desde), -35))),
      sb.from("conquistas").select("usuario_id, codigo, ganha_em").in("usuario_id", ids).order("ganha_em", { ascending: false }).limit(30),
    ]);
    const ag = await sb.from("agua").select("usuario_id, data, ml, meta, atualizado_em").in("usuario_id", ids).gte("data", desde);
    G.agua = ag.data || [];
    const ds = await sb.from("desafios").select("id, semana, titulo, descricao, link, medida, capa, prazo, criado_por, criado_em").eq("grupo_id", id).gte("semana", keyOf(addDays(mondayOf(hoje), -7 * 11))).order("semana", { ascending: false });
    const dids = (ds.data || []).map((d) => d.id);
    const fs = dids.length ? await sb.from("desafio_feitos").select("desafio_id, usuario_id, resultado, prova, feito_em").in("desafio_id", dids) : { data: [] };
    G.desafios = ds.data || []; G.feitos = fs.data || [];
    const capas = G.desafios.filter((d) => d.capa).slice(0, 6).map((d) => d.capa); // capa do vídeo (bucket "posts", só o grupo vê)
    G.capas = {};
    if (capas.length) { const { data } = await sb.storage.from("posts").createSignedUrls(capas, 6 * 3600); (data || []).forEach((x) => x.signedUrl && (G.capas[x.path] = x.signedUrl)); }
    G.membros = ids;
    G.perfis = Object.fromEntries((pf.data || []).map((p) => [p.id, p]));
    G.linhas = tr.data || [];
    G.conq = cq.data || [];
    try { await carregarMural(id); } catch (e) { console.error("mural", e); M.posts = []; }
  }
  const grupoSel = () => (G.grupos || []).find((g) => g.id === G.sel) || null;
  const linhasDe = (id) => (id === uid ? linhasLocais().map((r) => ({ ...r, usuario_id: uid })) : G.linhas.filter((r) => r.usuario_id === id));
  const linhasGrupo = () => G.membros.flatMap(linhasDe);
  // Água de cada pessoa do grupo (a minha vem do aparelho, que está sempre em dia)
  const aguaDe = (id) => (id === uid ? aguaLinhas().map((r) => ({ ...r, usuario_id: uid })) : G.agua.filter((r) => r.usuario_id === id));
  const aguaGrupo = () => G.membros.flatMap(aguaDe);
  const mlNoPeriodo = (lista, ini, fim = hojeKey) => soma(lista.filter((r) => r.data >= ini && r.data <= fim).map((r) => r.ml));
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
      ...(() => { const sem = {}, dias = {};
        aguaGrupo().filter((r) => r.data >= PERIODOS.tudo[1]()).forEach((r) => { const k = keyOf(mondayOf(parseKey(r.data))); sem[k] = (sem[k] || 0) + r.ml; if (r.ml >= r.meta) (dias[r.data] = dias[r.data] || new Set()).add(r.usuario_id); });
        const melhor = Math.max(0, ...Object.values(sem)), todos = G.membros.length > 1 ? Object.values(dias).filter((x) => x.size >= G.membros.length).length : 0;
        return [["💧", "100 L numa semana", melhor, 100000, `${fmtL(Math.min(melhor, 100000))}/100 L`], ["🌊", "Todo mundo hidratado", todos, 1, `${todos} ${todos === 1 ? "dia" : "dias"}`]]; })(),
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
    const ag = G.agua.filter((r) => r.data >= keyOf(addDays(hoje, -10)) && r.ml >= r.meta).map((r) => ({ t: r.atualizado_em || r.data, id: r.usuario_id, html: `<b>${nomeDe(r.usuario_id)}</b> bateu a meta de água: <b>${fmtL(r.ml)}</b> 💧`, k: r.data }));
    const itens = [...tr, ...cq, ...df, ...ag].sort((a, b) => String(b.t).localeCompare(String(a.t))).slice(0, 12);
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
    agua: ["💧 Água", (k) => k.agua, (v) => (v ? fmtL(v) : "—")],
    xp: ["🛡️ XP", (k) => k.xp, (v) => (v ? `${v.toLocaleString("pt-BR")} XP` : "—")],
  };
  // Nível de quem está no grupo: o meu é calculado aqui; o dos outros vem do que cada um sincronizou (perfis.config)
  const cfgNivel = (id) => (id === uid ? (() => { const n = meuNivel(); return { xp: n.xp, nivel_xp: n.nivel, estilo: estiloAtual().slug }; })() : G.perfis[id]?.config || null);
  function ranking() {
    const [, val, fmt] = RANKS[G.rank];
    const lista = G.membros.map((id) => { const rows = linhasDe(id); return { id, p: G.perfis[id], k: { ...kpis(noPeriodo(rows, G.periodo)), seq: sequencias(rows).atual, agua: mlNoPeriodo(aguaDe(id), PERIODOS[G.periodo][1]()), xp: Number(cfgNivel(id)?.xp) || 0 } }; })
      .sort((a, b) => val(b.k) - val(a.k) || b.k.treinos - a.k.treinos);
    const med = ["🥇", "🥈", "🥉"];
    return `<ol class="rank">${lista.map((x, i) => `<li class="${x.id === uid ? "eu" : ""}" data-membro="${x.id}" role="link" tabindex="0" aria-label="Ver perfil de ${esc(x.p?.nome || "Atleta")}">
      <span class="pos">${val(x.k) && i < 3 ? med[i] : i + 1}</span>${avatar(x.p, 36)}
      <span class="nome">${esc(x.p?.nome || "Atleta")}${x.id === uid ? " <small>(você)</small>" : ""} ${nivelSelo(cfgNivel(x.id))}</span>
      <strong>${fmt(val(x.k))}</strong></li>`).join("")}</ol>
      ${G.rank === "maxout" ? `<p class="note small">Média do Max Out nos vídeos do ${esc(NOMES_MAXOUT)} no período: quanto mais tarde a pessoa cansou, melhor.</p>` : ""}
      ${G.rank === "fit" ? `<p class="note small">Total de repetições no último Fit Test do Insanity feito no período.</p>` : ""}
      ${G.rank === "fitevo" ? `<p class="note small">Quantas repetições a pessoa ganhou do primeiro ao último Fit Test do período.</p>` : ""}
      ${G.rank === "minutos" ? `<p class="note small">Tempo dos vídeos concluídos e do cronômetro. Na calistenia sem cronômetro, conta 3 min por série.</p>` : ""}
      ${G.rank === "xp" ? `<p class="note small">XP total desde o começo (vídeos, séries, recordes, sequência e metas). O de cada pessoa atualiza quando ela abre o app.</p>` : ""}
      ${G.rank === "agua" ? `<p class="note small">Litros de água anotados no período (aba Nutrição ou “Bebi” na notificação).</p>` : ""}`;
  }
  // Hidratação do dia no grupo: quem está bebendo mais hoje e quem já bateu a meta
  function hidratacaoGrupo() {
    const lista = G.membros.map((id) => { const r = aguaDe(id).find((x) => x.data === hojeKey); return { id, ml: r?.ml || 0, meta: r?.meta || (id === uid ? nutriMetas().agua : 2500) }; })
      .sort((a, b) => b.ml - a.ml);
    const batidas = lista.filter((x) => x.ml >= x.meta).length, semana = mlNoPeriodo(aguaGrupo(), keyOf(mondayOf(hoje)));
    return `<div class="hidra">
      <div class="sec-head"><h2>💧 Hidratação de hoje</h2><span>${batidas}/${lista.length} bateram a meta</span></div>
      <ol class="hidra-lista">${lista.map((x, i) => { const pct = Math.min(100, Math.round((x.ml / x.meta) * 100));
        return `<li class="${x.id === uid ? "eu" : ""}"><span class="pos">${x.ml && i < 3 ? ["🥇", "🥈", "🥉"][i] : i + 1}</span>${avatar(G.perfis[x.id], 28)}
          <div class="hidra-bar"><span>${esc((G.perfis[x.id]?.nome || "Atleta").split(" ")[0])}${x.id === uid ? " (você)" : ""}</span><div class="bar"><i style="width:${pct}%"></i></div></div>
          <strong>${fmtL(x.ml)}${pct >= 100 ? " ✓" : ""}</strong></li>`; }).join("")}</ol>
      <div class="hidra-pe"><span>Grupo na semana: <b>${fmtL(semana)}</b></span><button class="btn btn-blue" data-agua="300">+300 ml</button></div>
    </div>`;
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
      <p class="note">Os grupos juntam amigos num ranking de treinos, tempo, sequência, Max Out e água. Para participar, entre com uma conta.</p>
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
      ${temporadaGrupoHtml()}
      <div class="section">
        <div class="g-head"><div><h2>${esc(g.nome)}</h2><small>${G.membros.length} ${G.membros.length === 1 ? "pessoa" : "pessoas"} · código <b>${esc(g.codigo)}</b></small></div>
          <button class="btn btn-blue" id="g-convidar">Convidar</button></div>
        ${avatarGroup(G.membros, { max: 6, size: 40, label: `Membros do grupo ${g.nome}`, link: true })}
        <div class="meta-g"><div class="sec-head"><h2>Meta da semana</h2><span>${semana}/${g.meta_semanal} treinos</span></div>
          <div class="progress"><div class="bar"><i style="width:${pct}%"></i></div><span>${pct}%</span></div>
          ${g.dono === uid ? `<button class="lnk-btn" id="g-meta">Mudar meta</button>` : ""}</div>
        ${hidratacaoGrupo()}
        ${cardDesafio(g)}
        <div class="sec-head"><h2>Conquistas da semana</h2><span>${G.desafios.filter((d) => G.feitos.some((f) => f.desafio_id === d.id)).length} de 12 semanas</span></div>
        ${historicoDesafios()}
      </div>
      ${muralHtml()}
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
      <div class="profile">${avatar(p, 56)}<div><strong>${esc(p.nome || "Atleta")}${id === uid ? " (você)" : ""} ${nivelSelo(cfgNivel(id))}</strong><span>${cfgNivel(id)?.nivel_xp ? `Nível ${cfgNivel(id).nivel_xp} · ${esc(CLASSES[Math.min(9, Math.floor((cfgNivel(id).nivel_xp - 1) / 5))][1])}${ESTILOS[cfgNivel(id).estilo] ? ` ${ESTILOS[cfgNivel(id).estilo].ic} ${esc(ESTILOS[cfgNivel(id).estilo].nome)}` : ""} · ` : ""}${esc(grupoSel()?.nome || "Grupo")}</span></div></div>
      <div class="stats-row">${stat("circle-check.svg", k.treinos, "Treinos")}${stat("hourglass.svg", fmtMin(k.minutos), "Tempo")}</div>
      <div class="stats-row">${stat("flame.svg", `${sq.atual}`, "Sequência atual")}${stat("zap.svg", `${sq.melhor}`, "Melhor sequência")}</div>
      <div class="stats-row">${stat("circle-check.svg", fmtL(mlNoPeriodo(aguaDe(id), keyOf(mondayOf(hoje)))), "Água na semana")}${stat("circle-percent.svg", fmtL(aguaDe(id).find((x) => x.data === hojeKey)?.ml || 0), "Água hoje")}</div>
      ${id === uid ? ligasPerfilHtml(linhasLocais(), true, meuOpts()) : ligasPerfilHtml(rows, false, { g: G.perfis[id]?.config?.arte === "f" || (G.perfis[id]?.config?.arte !== "m" && G.perfis[id]?.config?.quiz?.sexo === "f") ? "f" : "m", peso: 0, form: G.perfis[id]?.config?.formaturas || {}, prs: [] })}
      <div>${recordesHtml(rows, `${esc((p.nome || "Essa pessoa").split(" ")[0])} ainda não registrou Max Out nem Fit Test.`)}</div>
      </div></section>`;
  }
  // Desafio da semana em destaque no Início (com a capa do vídeo, quando tem)
  function desafioHome() {
    if (!uid || !G.grupos || !grupoSel()) return "";
    const d = desafioDaSemana();
    if (!d) return `<a class="emerg" href="#/grupo"><span>⚔️</span><div><strong>Desafio da semana</strong><small>Ninguém lançou ainda. Cole o link de um reel e o Coach monta.</small></div></a>`;
    const fs = feitosDe(d), eu = fs.some((f) => f.usuario_id === uid), capa = d.capa && G.capas?.[d.capa];
    return `<div class="sec-head"><h2>Desafio do grupo</h2><a href="#/grupo">${faltaDesafio(d, true)}</a></div>
      <a class="dsf-home${capa ? " com-capa" : ""}" href="#/grupo">
        ${capa ? `<img src="${esc(capa)}" alt="" loading="lazy">` : ""}
        <div class="dh-txt"><span class="dh-tag">⚔️ ${esc(MEDIDAS[d.medida].split(" (")[0])}${eu ? " · ✓ você cumpriu" : ""}</span>
          <strong>${esc(d.titulo)}</strong><small>${fs.length ? `🏅 ${fs.length} ${fs.length === 1 ? "pessoa cumpriu" : "pessoas cumpriram"}` : "Ninguém cumpriu ainda. Seja o primeiro!"}</small></div></a>`;
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
      ${(() => { const top = G.membros.map((id) => ({ id, ml: aguaDe(id).find((x) => x.data === hojeKey)?.ml || 0 })).sort((a, b) => b.ml - a.ml)[0];
        return `<p class="d-mini">💧 ${top?.ml ? `${top.id === uid ? "Você lidera" : `${esc((G.perfis[top.id]?.nome || "Alguém").split(" ")[0])} lidera`} a água de hoje com ${fmtL(top.ml)}` : "Ninguém anotou água hoje ainda"}</p>`; })()}
      ${avatarGroup(G.membros, { max: 6, size: 34, overlap: 12, label: "Membros do grupo", estatico: true })}</a>`;
  }

  /* ==========================================================
     Mural do grupo (rede social entre amigos): post com texto, foto e o treino do dia; reações e comentários.
     Supabase: posts, post_reacoes, post_comentarios; fotos no bucket privado "posts" (grupo/usuario/arquivo.jpg),
     mostradas por link assinado. Só quem está no grupo vê.
     ========================================================== */
  const REACOES = ["🔥", "💪", "👏", "😂", "❤️"];
  const M = { posts: [], reacoes: [], coments: [], urls: {}, abertos: new Set() };
  async function carregarMural(gid) {
    const ps = await sb.from("posts").select("id, grupo_id, usuario_id, texto, foto, treino, criado_em").eq("grupo_id", gid).order("criado_em", { ascending: false }).limit(30);
    M.posts = ps.data || [];
    const ids = M.posts.map((p) => p.id);
    const [rs, cs] = ids.length ? await Promise.all([
      sb.from("post_reacoes").select("post_id, usuario_id, emoji").in("post_id", ids),
      sb.from("post_comentarios").select("id, post_id, usuario_id, texto, criado_em").in("post_id", ids).order("criado_em"),
    ]) : [{ data: [] }, { data: [] }];
    M.reacoes = rs.data || []; M.coments = cs.data || [];
    const fotos = M.posts.map((p) => p.foto).filter((f) => f && !M.urls[f]);
    if (fotos.length) {
      const { data } = await sb.storage.from("posts").createSignedUrls(fotos, 6 * 3600);
      (data || []).forEach((x) => { if (x.signedUrl) M.urls[x.path] = x.signedUrl; });
    }
  }
  const quando = (iso) => {
    const s = Math.max(0, (Date.now() - new Date(iso)) / 1000);
    return s < 60 ? "agora" : s < 3600 ? `${Math.floor(s / 60)} min` : s < 86400 ? `${Math.floor(s / 3600)} h` : s < 7 * 86400 ? `${Math.floor(s / 86400)} d` : ddmm(String(iso).slice(0, 10));
  };
  const nomeCurto = (id) => esc((G.perfis[id]?.nome || "Alguém").split(" ")[0]);
  function postHtml(p) {
    const g = grupoSel(), meu = p.usuario_id === uid, podeApagar = meu || g?.dono === uid;
    const rs = M.reacoes.filter((r) => r.post_id === p.id), cs = M.coments.filter((c) => c.post_id === p.id);
    const aberto = M.abertos.has(p.id), mostra = aberto ? cs : cs.slice(-2);
    const t = p.treino;
    return `<article class="post" data-post="${p.id}">
      <header class="post-head">${avatar(G.perfis[p.usuario_id], 36)}<div><strong>${esc(G.perfis[p.usuario_id]?.nome || "Atleta")}</strong><small>${quando(p.criado_em)}</small></div>
        ${podeApagar ? `<button class="lnk-btn post-del" data-post-apagar="${p.id}" aria-label="Apagar post">Apagar</button>` : ""}</header>
      ${t?.titulo ? `<p class="post-treino">${t.concluido === false ? "⏳" : "✅"} ${esc(t.titulo)}${t.minutos ? ` · ${fmtMin(t.minutos)}` : ""}${t.programa ? ` · ${esc(progDe(t.programa)?.curto || IA[t.programa]?.nome || (t.programa === "calistenia" ? NOME_PROG : t.programa))}` : ""}</p>` : ""}
      ${p.texto ? `<p class="post-txt">${esc(p.texto)}</p>` : ""}
      ${p.foto ? (M.urls[p.foto] ? `<img class="post-foto" src="${esc(M.urls[p.foto])}" alt="Foto de ${nomeCurto(p.usuario_id)}" loading="lazy">` : `<div class="post-foto vazia">📷</div>`) : ""}
      <div class="post-reacoes">${REACOES.map((e) => { const n = rs.filter((r) => r.emoji === e).length, eu = rs.some((r) => r.emoji === e && r.usuario_id === uid);
        return `<button class="reacao${eu ? " on" : ""}" data-reagir="${e}" data-post-id="${p.id}" aria-pressed="${eu}" title="${rs.filter((r) => r.emoji === e).map((r) => (G.perfis[r.usuario_id]?.nome || "").split(" ")[0]).join(", ")}">${e}${n ? ` <b>${n}</b>` : ""}</button>`; }).join("")}</div>
      ${rs.length ? (() => { const quem = [...new Set(rs.map((r) => r.usuario_id))];
        return `<div class="post-quem">${avatarGroup(quem, { max: 5, size: 28, overlap: 9, label: "Quem reagiu" })}<small>${quem.length === 1 ? `${esc((G.perfis[quem[0]]?.nome || "Alguém").split(" ")[0])} reagiu` : `${quem.length} pessoas reagiram`}</small></div>`; })() : ""}
      ${cs.length > 2 && !aberto ? `<button class="lnk-btn" data-post-coments="${p.id}">Ver os ${cs.length} comentários</button>` : ""}
      ${mostra.length ? `<ul class="coments">${mostra.map((c) => `<li><b>${nomeCurto(c.usuario_id)}</b> ${esc(c.texto)} <small>${quando(c.criado_em)}</small>${c.usuario_id === uid || meu ? ` <button class="lnk-btn" data-coment-apagar="${c.id}" aria-label="Apagar comentário">✕</button>` : ""}</li>`).join("")}</ul>` : ""}
      <form class="coment-form" data-comentar="${p.id}" autocomplete="off"><input name="t" maxlength="300" placeholder="Comente…" aria-label="Escreva um comentário"><button type="submit" class="btn btn-blue">Enviar</button></form>
    </article>`;
  }
  function muralHtml() {
    return `<div class="section mural">
      <div class="sec-head"><h2>📣 Mural do grupo</h2><button class="lnk-btn" data-mural-atualizar>Atualizar</button></div>
      <button class="mural-novo" data-post-novo>${avatar(G.perfis[uid] || { nome: nomeCompleto(), foto_url: S.user?.foto }, 32)}<span>Como foi o treino? Poste uma foto ou um comentário…</span><b>📸</b></button>
      ${M.posts.length ? M.posts.map(postHtml).join("") : `<p class="note">Ninguém postou ainda. Depois do treino, mostre para a galera! 💪</p>`}
    </div>`;
  }
  const refazerPost = (id) => { const el = document.querySelector(`.post[data-post="${id}"]`), p = M.posts.find((x) => x.id === id); if (el && p) el.outerHTML = postHtml(p); };

  /* ---------- Novo post ---------- */
  let postFoto = null; // Blob já reduzido
  function treinosParaPost() {
    const ontem = keyOf(addDays(hoje, -1));
    return linhasLocais().filter((r) => r.data >= ontem && (r.concluido || r.minutos > 0)).sort((a, b) => b.data.localeCompare(a.data) || b.concluido - a.concluido);
  }
  function reduzirParaPost(arquivo, max = 1080) {
    return new Promise((ok, falha) => {
      const img = new Image(), url = URL.createObjectURL(arquivo);
      img.onload = () => {
        const esc_ = Math.min(1, max / Math.max(img.width, img.height)), c = document.createElement("canvas");
        c.width = Math.round(img.width * esc_); c.height = Math.round(img.height * esc_);
        c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
        URL.revokeObjectURL(url);
        c.toBlob((b) => (b ? ok(b) : falha(new Error("foto"))), "image/jpeg", 0.8);
      };
      img.onerror = () => { URL.revokeObjectURL(url); falha(new Error("foto")); };
      img.src = url;
    });
  }
  function abrirNovoPost(msg = "") {
    if (!uid || !sb) { toast("Entre com uma conta para postar no grupo."); return; }
    if (!(G.grupos || []).length) { toast("Entre num grupo para postar."); location.hash = "#/grupo"; return; }
    postFoto = null;
    const tr = treinosParaPost();
    let dlg = $("#post-dlg");
    if (!dlg) { dlg = document.createElement("dialog"); dlg.id = "post-dlg"; dlg.className = "post-dlg"; $(".device").appendChild(dlg); }
    dlg.innerHTML = `<form class="post-form" id="post-form">
      <div class="post-form-head"><strong>${G.grupos.length > 1 ? "Postar nos grupos" : "Postar no grupo"}</strong><button type="button" class="icon-btn" data-post-fechar aria-label="Fechar">${icon("x.svg", 22)}</button></div>
      ${msg ? `<p class="note">${msg}</p>` : ""}
      ${G.grupos.length > 1 ? `<label>Grupo<select name="grupo"><option value="*"${S.postTodos ? " selected" : ""}>Todos os meus grupos (${G.grupos.length})</option>${G.grupos.map((g) => `<option value="${g.id}"${!S.postTodos && g.id === G.sel ? " selected" : ""}>${esc(g.nome)}</option>`).join("")}</select></label>` : `<input type="hidden" name="grupo" value="${G.grupos[0].id}">`}
      <label>Treino<select name="treino"><option value="">Sem treino</option>${tr.map((r, i) => `<option value="${i}"${i === 0 ? " selected" : ""}>${r.data === hojeKey ? "Hoje" : "Ontem"} · ${esc(r.titulo)}${r.concluido ? "" : " (em andamento)"}</option>`).join("")}</select></label>
      <textarea name="texto" maxlength="500" rows="3" placeholder="Como foi? Bateu recorde? Sofreu? 😅"></textarea>
      <div class="post-foto-prev" id="post-prev"></div>
      <div class="post-form-acoes"><label class="btn btn-outline post-foto-btn">📷 Foto<input type="file" id="post-arquivo" accept="image/*" hidden></label>
        <button type="submit" class="btn btn-blue">Postar</button></div>
    </form>`;
    dlg._treinos = tr;
    dlg.showModal();
  }
  async function enviarPost(f) {
    const d = Object.fromEntries(new FormData(f)), texto = String(d.texto || "").trim().slice(0, 500);
    if (!texto && !postFoto) { toast("Escreva algo ou escolha uma foto."); return; }
    const btn = f.querySelector("button[type=submit]"); btn.disabled = true; btn.textContent = "Postando…";
    try {
      const todos = d.grupo === "*", alvos = todos ? G.grupos.map((g) => g.id) : [d.grupo];
      const r = d.treino !== "" ? $("#post-dlg")._treinos[Number(d.treino)] : null;
      const treino = r ? { data: r.data, programa: r.programa, titulo: r.titulo, minutos: r.minutos, concluido: r.concluido } : null;
      if ((G.grupos || []).length > 1 && !!S.postTodos !== todos) { S.postTodos = todos; save(); } // lembra a escolha para a próxima
      // Um post por grupo; a foto vai para a pasta de cada grupo (só os membros de um grupo veem as fotos dele)
      let ok = 0, primeiro = null;
      for (const gid of alvos) {
        try {
          let foto = null;
          if (postFoto) {
            foto = `${gid}/${uid}/${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}.jpg`;
            const up = await sb.storage.from("posts").upload(foto, postFoto, { contentType: "image/jpeg", cacheControl: "86400" });
            if (up.error) throw up.error;
          }
          const { error } = await sb.from("posts").insert({ grupo_id: gid, usuario_id: uid, texto, foto, treino });
          if (error) throw error;
          ok++; primeiro = primeiro || gid;
        } catch (e) { console.error("post", gid, e); }
      }
      if (!ok) throw new Error("nenhum grupo");
      $("#post-dlg").close(); postFoto = null;
      G.sel = alvos.includes(G.sel) ? G.sel : primeiro; G.carregadoEm = 0; await carregarGrupos(true);
      toast(!todos ? "Postado no grupo! 📣" : ok === alvos.length ? `Postado nos ${ok} grupos! 📣` : `Postado em ${ok} de ${alvos.length} grupos. Os outros falharam; tente de novo neles.`, 4000);
      if (!location.hash.startsWith("#/grupo")) location.hash = "#/grupo";
    } catch (e) { console.error("post", e); toast("Não consegui postar agora. Tente de novo."); btn.disabled = false; btn.textContent = "Postar"; }
  }
  // Depois de concluir um treino: convida a postar no grupo
  function convidarPost() {
    if (!uid || !(G.grupos || []).length) return;
    setTimeout(() => {
      if ($("#post-dlg")?.open) return;
      abrirNovoPost("Treino concluído! 🔥 Quer contar para o grupo? Pode mandar uma foto também.");
    }, 1400);
  }

  document.addEventListener("click", async (e) => {
    const t = e.target.closest("[data-post-novo],[data-post-fechar],[data-reagir],[data-post-coments],[data-post-apagar],[data-coment-apagar],[data-mural-atualizar]");
    if (!t) return;
    const ds = t.dataset;
    if (t.hasAttribute("data-post-novo")) abrirNovoPost();
    else if (t.hasAttribute("data-post-fechar")) $("#post-dlg")?.close();
    else if (t.hasAttribute("data-mural-atualizar")) { G.carregadoEm = 0; carregarGrupos(true); toast("Atualizando…"); }
    else if (ds.reagir) {
      const pid = ds.postId, e2 = ds.reagir, ja = M.reacoes.find((r) => r.post_id === pid && r.usuario_id === uid && r.emoji === e2);
      // otimista: muda na tela e depois grava
      if (ja) M.reacoes = M.reacoes.filter((r) => r !== ja); else M.reacoes.push({ post_id: pid, usuario_id: uid, emoji: e2 });
      refazerPost(pid);
      const { error } = ja ? await sb.from("post_reacoes").delete().eq("post_id", pid).eq("usuario_id", uid).eq("emoji", e2)
        : await sb.from("post_reacoes").insert({ post_id: pid, usuario_id: uid, emoji: e2 });
      if (error) { toast("Não consegui reagir agora."); G.carregadoEm = 0; carregarGrupos(true); }
    } else if (ds.postComents) { M.abertos.add(ds.postComents); refazerPost(ds.postComents); }
    else if (ds.postApagar) {
      if (!confirm("Apagar este post?")) return;
      const p = M.posts.find((x) => x.id === ds.postApagar);
      const { error } = await sb.from("posts").delete().eq("id", ds.postApagar);
      if (error) { toast("Não consegui apagar."); return; }
      if (p?.foto && p.usuario_id === uid) sb.storage.from("posts").remove([p.foto]);
      M.posts = M.posts.filter((x) => x.id !== ds.postApagar); render();
    } else if (ds.comentApagar) {
      const c = M.coments.find((x) => x.id === ds.comentApagar);
      const { error } = await sb.from("post_comentarios").delete().eq("id", ds.comentApagar);
      if (error) { toast("Não consegui apagar o comentário."); return; }
      M.coments = M.coments.filter((x) => x !== c); if (c) refazerPost(c.post_id);
    }
  });
  document.addEventListener("change", async (e) => {
    if (e.target.id !== "post-arquivo" || !e.target.files[0]) return;
    const a = e.target.files[0];
    if (!/^image\//.test(a.type)) { toast("Escolha uma imagem."); return; }
    try {
      postFoto = await reduzirParaPost(a);
      if (postFoto.size > 1500000) postFoto = await reduzirParaPost(a, 800);
      $("#post-prev").innerHTML = `<img src="${URL.createObjectURL(postFoto)}" alt="Prévia da foto"><button type="button" class="lnk-btn" data-post-tirar>Remover foto</button>`;
    } catch { toast("Não consegui abrir essa imagem."); }
  });
  document.addEventListener("click", (e) => { if (e.target.closest("[data-post-tirar]")) { postFoto = null; $("#post-prev").innerHTML = ""; } });
  document.addEventListener("submit", async (ev) => {
    const f = ev.target;
    if (f.id === "post-form") { ev.preventDefault(); enviarPost(f); return; }
    if (!f.matches("[data-comentar]")) return;
    ev.preventDefault();
    const pid = f.dataset.comentar, texto = String(f.elements.t.value || "").trim().slice(0, 300);
    if (!texto) return;
    f.elements.t.value = "";
    const { data, error } = await sb.from("post_comentarios").insert({ post_id: pid, usuario_id: uid, texto }).select("id, post_id, usuario_id, texto, criado_em").single();
    if (error) { toast("Não consegui comentar agora."); f.elements.t.value = texto; return; }
    M.coments.push(data); M.abertos.add(pid); refazerPost(pid);
  });

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
  // Prazo do desafio: o último dia para cumprir (sem prazo, o domingo da semana em que foi lançado)
  const fimDesafio = (d) => d.prazo || keyOf(addDays(parseKey(d.semana), 6));
  const desafioDaSemana = () => (G.desafios || []).filter((d) => d.semana <= hojeKey && fimDesafio(d) >= hojeKey).sort((a, b) => b.semana.localeCompare(a.semana))[0] || null;
  const faltaDesafio = (d, curto = false) => { const n = diffDays(hoje, parseKey(d ? fimDesafio(d) : keyOf(addDays(mondayOf(hoje), 6))));
    return n <= 0 ? "termina hoje" : curto ? `${n} ${n === 1 ? "dia" : "dias"}` : `${n} ${n === 1 ? "dia" : "dias"} para acabar`; };
  // Opções de prazo do formulário: até domingo ou N dias a partir de hoje (o último dia conta)
  const PRAZOS = [["dom", "Até domingo"], ["3", "3 dias"], ["5", "5 dias"], ["7", "7 dias"], ["10", "10 dias"], ["14", "14 dias"], ["21", "21 dias"]];
  const prazoDe = (v) => (v === "dom" ? keyOf(addDays(mondayOf(hoje), 6)) : keyOf(addDays(hoje, Math.max(1, Number(v) || 7) - 1)));
  let desafioEditando = null; // o desafio aberto no formulário de edição
  let formDesafio = null; // null | índice do modelo ("" = em branco) | "link" (montado pelo Coach a partir de um vídeo)
  let desafioRascunho = null; // { titulo, descricao, medida, link, nota, duvida }
  const LINK_VIDEO = /(?:https?:\/\/)?(?:www\.|m\.|vm\.)?(?:instagram\.com\/(?:reel|reels|p|tv)\/[\w-]+|tiktok\.com\/\S+|youtube\.com\/(?:shorts\/|watch\?v=)[\w-]+|youtu\.be\/[\w-]+)\S*/i;
  const linkCompleto = (l) => (/^https?:\/\//i.test(l) ? l.replace(/^http:/i, "https:") : `https://${l}`);
  // Capa do vídeo: vira JPEG (até 720 px de largura) e vai para o bucket "posts" na pasta do grupo
  async function subirCapa(dataUrl, gid) {
    try {
      const img = await new Promise((ok, erro) => { const i = new Image(); i.onload = () => ok(i); i.onerror = erro; i.src = dataUrl; });
      const k = Math.min(1, 720 / img.naturalWidth), c = document.createElement("canvas");
      c.width = Math.round(img.naturalWidth * k); c.height = Math.round(img.naturalHeight * k);
      c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
      const blob = await new Promise((ok) => c.toBlob(ok, "image/jpeg", 0.82));
      const caminho = `${gid}/${uid}/desafio-${Date.now().toString(36)}.jpg`;
      const { error } = await sb.storage.from("posts").upload(caminho, blob, { contentType: "image/jpeg", cacheControl: "86400" });
      return error ? null : caminho;
    } catch { return null; }
  }
  // O Coach lê a legenda e a capa do vídeo (o servidor busca) e devolve título, regra e medida
  async function desafioDoLink(link, nota = "") {
    const token = await tokenSB();
    if (!token) throw new Error("Entre na sua conta para montar desafios.");
    const r = await fetch("/api/desafio", { method: "POST", headers: { "content-type": "application/json", authorization: `Bearer ${token}` }, body: JSON.stringify({ link, nota }) });
    const j = await r.json().catch(() => ({}));
    if (r.ok && j.desafio) return j;
    throw new Error({ site: "Por enquanto leio links do Instagram, TikTok e YouTube.", link: "Esse link não parece válido.", sem_conteudo: "Não consegui ler esse vídeo (pode ser privado). Descreva o que acontece nele e toque de novo.",
      limite: "Você chegou ao limite de hoje do Coach. Tente amanhã.", ocupado: "O Coach está ocupado. Tente de novo em um minuto.", login: "Entre na sua conta para montar desafios." }[j.erro] || "Não consegui montar o desafio agora.");
  }
  function cardDesafio(g) {
    const d = desafioDaSemana();
    const prazo = faltaDesafio(d);
    if (formDesafio !== null) {
      const ed = formDesafio === "editar" && desafioEditando;
      const m = ed ? desafioEditando : formDesafio === "link" && desafioRascunho ? desafioRascunho : MODELOS[formDesafio] || { titulo: "", descricao: "", medida: "feito" };
      const outros = !ed && (G.grupos || []).length > 1;
      return `<form class="desafio form-desafio" id="form-desafio">
        <div class="sec-head"><h2>${ed ? "Editar desafio" : "Lançar desafio"}</h2></div>
        ${ed ? "" : `<div class="chips">${MODELOS.map((x, i) => `<button type="button" class="chip${String(i) === String(formDesafio) ? " primary" : ""}" data-modelo="${i}">${esc(x.titulo)}</button>`).join("")}<button type="button" class="chip${formDesafio === "" ? " primary" : ""}" data-modelo="">Em branco</button></div>`}
        ${!ed && m.capa ? `<div class="dsf-capa prev"><img src="${esc(m.capa)}" alt="Capa do vídeo"></div>` : ""}
        <div class="dsf-link"><label>Tem um reel? Cole o link e o Coach monta o desafio<input name="link" type="url" inputmode="url" maxlength="300" value="${esc(m.link || "")}" placeholder="https://www.instagram.com/reel/..."></label>
          <details${m.nota ? " open" : ""}><summary>A legenda não explica o exercício? Descreva o vídeo</summary><textarea name="nota" maxlength="600" rows="2" placeholder="Ex.: 10 burpees + 20 agachamentos, 5 rodadas, contra o relógio">${esc(m.nota || "")}</textarea></details>
          <button type="button" class="btn btn-outline" id="desafio-link">✨ Montar pelo link</button>
          ${m.duvida ? `<p class="note small dsf-duvida">⚠️ ${esc(m.duvida)}</p>` : ""}</div>
        <label>Título<input name="titulo" required maxlength="80" value="${esc(m.titulo)}" placeholder="Ex.: Desafio do reel"></label>
        <label>Como fazer<textarea name="descricao" maxlength="500" rows="3" placeholder="Explique a regra do desafio">${esc(m.descricao)}</textarea></label>
        <label>Como medir<select name="medida">${Object.entries(MEDIDAS).map(([k, n]) => `<option value="${k}"${k === m.medida ? " selected" : ""}>${n}</option>`).join("")}</select></label>
        <label>Tempo para cumprir<select name="prazo">${ed ? `<option value="manter" selected>Manter: até ${ddmm(fimDesafio(m))}</option>` : ""}${PRAZOS.map(([v, n]) => `<option value="${v}"${!ed && v === "dom" ? " selected" : ""}>${n} · até ${ddmm(prazoDe(v))}</option>`).join("")}</select></label>
        ${ed && G.feitos.some((f) => f.desafio_id === m.id) ? `<p class="note small">Já tem gente que cumpriu: trocar a forma de medir pode deixar os resultados antigos sem sentido.</p>` : ""}
        ${outros ? `<label class="dsf-todos"><input type="checkbox" name="todos" value="1"> Lançar em todos os meus grupos (${G.grupos.length})</label>` : ""}
        ${ed && m.criado_por === uid && (G.grupos || []).length > 1 ? `<label class="dsf-todos"><input type="checkbox" name="todos" value="1" checked> Aplicar também nos outros grupos onde lancei este desafio</label>` : ""}
        <div class="row2"><button type="button" class="btn btn-outline" id="desafio-cancelar">Cancelar</button><button type="submit" class="btn btn-blue">${ed ? "Salvar" : "Lançar"}</button></div>
      </form>`;
    }
    if (!d) return `<div class="desafio vazio"><div class="sec-head"><h2>⚔️ Desafio da semana</h2><span>${prazo}</span></div>
      <p class="note">Ninguém lançou o desafio desta semana. Basta <b>uma pessoa</b> cumprir para o grupo ganhar a conquista da semana.</p>
      <button class="btn btn-blue" id="desafio-novo">Lançar desafio</button></div>`;
    const fs = feitosDe(d), eu = fs.find((f) => f.usuario_id === uid), med = ["🥇", "🥈", "🥉"];
    const podeApagar = d.criado_por === uid || g.dono === uid;
    const capa = d.capa && G.capas?.[d.capa];
    return `<div class="desafio${fs.length ? " ok" : ""}${capa ? " com-capa" : ""}">
      ${capa ? `<a class="dsf-capa" ${d.link ? `href="${esc(d.link)}" target="_blank" rel="noopener"` : ""}><img src="${esc(capa)}" alt="Capa do vídeo do desafio" loading="lazy"><span>${d.link ? "▶ Ver o vídeo" : ""}</span></a>` : ""}
      <div class="sec-head"><h2>⚔️ ${esc(d.titulo)}</h2><span>${prazo}</span></div>
      ${d.descricao ? `<p class="d-desc">${esc(d.descricao)}</p>` : ""}
      <div class="ex-tags"><span class="pill gray">${esc(MEDIDAS[d.medida].split(" (")[0])}</span><span class="pill gray">até ${ddmm(fimDesafio(d))}</span><span class="pill gray">por ${esc((G.perfis[d.criado_por]?.nome || "alguém").split(" ")[0])}</span></div>
      ${d.link && !capa ? `<a class="btn btn-outline" href="${esc(d.link)}" target="_blank" rel="noopener">▶ Ver o desafio</a>` : ""}
      <p class="d-status">${fs.length ? `🏅 <b>Conquista da semana garantida!</b> ${fs.length} ${fs.length === 1 ? "pessoa cumpriu" : "pessoas cumpriram"}.` : "Ninguém cumpriu ainda. Bora ser o primeiro? 💪"}</p>
      ${fs.length ? `<ol class="rank">${fs.map((f, i) => `<li class="${f.usuario_id === uid ? "eu" : ""}"><span class="pos">${d.medida !== "feito" && i < 3 ? med[i] : "✓"}</span>${avatar(G.perfis[f.usuario_id], 32)}
        <span class="nome">${esc(G.perfis[f.usuario_id]?.nome || "Atleta")}</span>${f.prova ? `<a class="lnk-btn" href="${esc(f.prova)}" target="_blank" rel="noopener">prova</a>` : ""}<strong>${esc(fmtRes(d, f.resultado))}</strong></li>`).join("")}</ol>` : ""}
      ${eu ? `<button class="btn btn-outline done" id="desafio-desfazer" data-id="${d.id}">Você cumpriu ✓ (toque para desfazer)</button>` : `<button class="btn btn-blue" id="desafio-cumpri" data-id="${d.id}">✅ Cumpri o desafio</button>`}
      ${podeApagar ? `<div class="dsf-acoes"><button class="lnk-btn" id="desafio-editar" data-id="${d.id}">Editar desafio</button><button class="lnk-btn" id="desafio-apagar" data-id="${d.id}">Apagar desafio</button></div>` : ""}
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
    await carregarGrupos(true); verificarConquistas(); setTimeout(() => conferirXp(), 2700); // +XP depois do aviso do desafio
    toast(primeiro ? "🏅 Conquista da semana garantida para o grupo!" : "Desafio cumprido! 🔥");
  }

  /* ---------- Tema claro, escuro ou automático (segue o sistema). O <head> do app.html já aplica antes de pintar. ---------- */
  const temaEscolhido = () => { try { return localStorage.getItem("fitai-tema") || "escuro"; } catch { return "escuro"; } };
  const MQ_ESCURO = matchMedia("(prefers-color-scheme: dark)");
  function aplicarTema() {
    const t = temaEscolhido(), esc_ = t === "escuro" || (t === "auto" && MQ_ESCURO.matches);
    document.documentElement.dataset.tema = esc_ ? "escuro" : "claro";
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", esc_ ? "#0b0b0d" : "#000000");
  }
  MQ_ESCURO.addEventListener?.("change", () => temaEscolhido() === "auto" && aplicarTema());
  document.addEventListener("click", (e) => {
    const b = e.target.closest?.("button[data-tema]");
    if (!b) return;
    try { localStorage.setItem("fitai-tema", b.dataset.tema); } catch {}
    aplicarTema();
    document.querySelectorAll("button[data-tema]").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
  });
  aplicarTema();

  /* ---------- Painel de evolução ----------
     Cartão de indicador (no desenho do Progress Metric Card da ProfitizeBuild, portado para JS puro): o número grande
     à esquerda e, atrás dele, a curva com a área em degradê ou as barras, sobre um fundo de pontos; a variação no
     período, a troca curva/barras e os períodos; no rodapé, a variação do último ponto e o máximo, o mínimo e a média.
     O balão segue o dedo (pointer). Mais o calendário de consistência e dois radares (equilíbrio e movimentos). */
  const EVO = { per: {}, vista: {}, mes: 0, ex: null };
  const EVO_COR = { up: ["#10b981", "#059669"], down: ["#ef4444", "#dc2626"], flat: ["#64748b", "#475569"], azul: ["#2b54ff", "#2b54ff"] };
  // A curva monotone (curveMonotoneX do d3), a mesma do componente: passa por todos os pontos sem inventar picos
  function curvaMonotone(pts) {
    const n = pts.length, r = (v) => Math.round(v * 100) / 100;
    if (!n) return "";
    if (n < 3) return pts.map((p, i) => `${i ? "L" : "M"}${r(p.x)},${r(p.y)}`).join("");
    const sg = (v) => (v < 0 ? -1 : 1), t = new Array(n);
    for (let i = 1; i < n - 1; i++) {
      const h0 = pts[i].x - pts[i - 1].x, h1 = pts[i + 1].x - pts[i].x;
      const s0 = (pts[i].y - pts[i - 1].y) / (h0 || 1e-9), s1 = (pts[i + 1].y - pts[i].y) / (h1 || 1e-9), p = (s0 * h1 + s1 * h0) / (h0 + h1);
      t[i] = (sg(s0) + sg(s1)) * Math.min(Math.abs(s0), Math.abs(s1), 0.5 * Math.abs(p)) || 0;
    }
    const fim = (a, b, tt) => { const hx = b.x - a.x; return hx ? ((3 * (b.y - a.y)) / hx - tt) / 2 : tt; };
    t[0] = fim(pts[0], pts[1], t[1]); t[n - 1] = fim(pts[n - 2], pts[n - 1], t[n - 2]);
    let d = `M${r(pts[0].x)},${r(pts[0].y)}`;
    for (let i = 0; i < n - 1; i++) { const a = pts[i], b = pts[i + 1], dx = (b.x - a.x) / 3; d += `C${r(a.x + dx)},${r(a.y + dx * t[i])},${r(b.x - dx)},${r(b.y - dx * t[i + 1])},${r(b.x)},${r(b.y)}`; }
    return d;
  }
  const evoNum = (v) => (Math.round(v * 10) / 10).toLocaleString("pt-BR");
  /* o: { titulo, un, pts: [{ v, data (texto do balão) }], per: [[rótulo, nº de pontos ou 0 = todos]], perPadrao,
          total: "soma" | "ultimo" | "melhor", fmt, menorMelhor, meta, rodape: "esta semana" } */
  function metricCard(id, o) {
    const per = o.per || [["Tudo", 0]], pi = Math.min(EVO.per[id] ?? o.perPadrao ?? per.length - 1, per.length - 1), n = per[pi][1];
    const pts = n ? o.pts.slice(-n) : o.pts, vista = EVO.vista[id] || o.vista || "curva", fmt = o.fmt || evoNum;
    const head = `<div class="mc-head"><div class="mc-head-a"><h3>${esc(o.titulo)}</h3>
        <div class="mc-toggle" role="group" aria-label="Tipo de gráfico">${[["curva", "M3 3v16a2 2 0 0 0 2 2h16M19 9l-5 5-4-4-3 3"], ["barras", "M3 3v16a2 2 0 0 0 2 2h16M18 17V9M13 17V5M8 17v-3"]].map(([v, d]) =>
          `<button type="button" data-mc-vista="${id}|${v}" aria-pressed="${vista === v}" aria-label="${v === "curva" ? "Curva" : "Barras"}"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="${d}"/></svg></button>`).join("")}</div></div>
      ${per.length > 1 ? `<div class="mc-per" role="group" aria-label="Período">${per.map(([l], i) => `<button type="button" data-mc-per="${id}|${i}" aria-pressed="${i === pi}">${esc(l)}</button>`).join("")}</div>` : ""}</div>`;
    if (pts.length < 2 || !pts.some((p) => p.v)) return `<div class="mc" data-mc="${id}">${head}<div class="mc-vazio"><strong>Ainda sem dados</strong><span>${esc(o.vazio || "O gráfico aparece depois de alguns registros.")}</span></div></div>`;
    const vals = pts.map((p) => p.v), last = vals[vals.length - 1], prev = vals[vals.length - 2];
    // parcial: o último ponto é a semana em andamento; a tendência compara a média da 2ª metade com a da 1ª, sem ele
    const base = o.parcial ? vals.slice(0, -1) : vals, meio = Math.floor(base.length / 2) || 1;
    const first = o.parcial ? soma(base.slice(0, meio)) / meio : vals[0], fim = o.parcial ? soma(base.slice(meio)) / (base.length - meio || 1) : last;
    const net = o.menorMelhor ? first - fim : fim - first, pct = first ? (net / first) * 100 : fim ? 100 : 0;
    const tend = Math.abs(pct) < (o.parcial ? 3 : 0.5) ? "flat" : net > 0 ? "up" : "down", [cor, corTxt] = EVO_COR[tend];
    const tot = o.total === "ultimo" ? last : o.total === "melhor" ? (o.menorMelhor ? Math.min(...vals.filter(Boolean)) : Math.max(...vals)) : soma(vals);
    const passo = (o.menorMelhor ? prev - last : last - prev);
    // a escala: a curva usa do mínimo −14% ao máximo +2%; as barras partem do zero com 8% de folga em cima
    const W = 240, H = 150, topo = 46, meta = o.meta || 0;
    const hi = Math.max(...vals, meta), lo = Math.min(...vals, meta || Infinity);
    const [d0, d1] = vista === "barras" ? [0, hi + (hi || 1) * 0.08] : [lo - (hi - lo || hi || 1) * 0.14, hi + (hi - lo || hi || 1) * 0.06];
    const y = (v) => topo + ((d1 - v) / (d1 - d0 || 1)) * (H - topo);
    const band = W / pts.length, xs = vista === "barras" ? pts.map((_, i) => (i + 0.5) * band) : pts.map((_, i) => (pts.length > 1 ? 6 + (i * (W - 14)) / (pts.length - 1) : W / 2));
    const ys = vals.map(y);
    let grafico;
    if (vista === "barras") {
      const bw = Math.min(26, band * 0.62);
      grafico = pts.map((p, i) => { const top = ys[i], h = Math.max(p.v ? 3 : 1.5, H - top), rr = Math.min(6, bw / 2, h);
        const x = xs[i] - bw / 2, yy = H - h;
        return `<path class="mc-bar${i === pts.length - 1 ? " on" : ""}" style="--d:${i * 30}ms" d="M${x},${yy + rr}A${rr},${rr},0,0,1,${x + rr},${yy}L${x + bw - rr},${yy}A${rr},${rr},0,0,1,${x + bw},${yy + rr}L${x + bw},${H}L${x},${H}Z" fill="url(#mcb-${id})"/>`; }).join("");
    } else {
      const linha = curvaMonotone(xs.map((x, i) => ({ x, y: ys[i] })));
      grafico = `<path d="${linha}L${W},${H}L0,${H}Z" fill="url(#mcg-${id})" class="mc-area"/><path d="${linha}" pathLength="1" class="mc-linha" fill="none" stroke="${cor}" stroke-width="2.2" vector-effect="non-scaling-stroke"/>`;
    }
    const yMeta = meta ? y(meta) : 0;
    const unDe1 = (v) => (o.un ? " " + (v === 1 && o.un1 ? o.un1 : o.un) : "");
    const dados = { x: xs.map((x) => +(x / W * 100).toFixed(2)), y: ys.map((v) => +(v / H * 100).toFixed(2)), v: vals.map((v) => `${fmt(v)}${unDe1(v)}`), d: pts.map((p, i) => p.data + (o.parcial && i === pts.length - 1 ? " (em andamento)" : "")) };
    const pctTxt = `${Math.abs(pct).toFixed(1).replace(".", ",")}%`;
    const seta = tend === "flat" ? "M5 12h14M12 5l7 7-7 7" : tend === "down" ? "M12 5v14M19 12l-7 7-7-7" : "M5 12l7-7 7 7M12 19V5";
    const iUlt = pts.length - 1;
    return `<div class="mc" data-mc="${id}" style="--mc:${cor};--mc-t:${corTxt}">
      <div class="mc-area-graf">
        <div class="mc-brilho"></div><div class="mc-pontos"></div>
        <svg class="mc-svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" data-mc-dados='${esc(JSON.stringify(dados))}' role="img" aria-label="${esc(o.titulo)}: ${esc(dados.v.join(", "))}">
          <defs><linearGradient id="mcg-${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${cor}" stop-opacity=".3"/><stop offset="60%" stop-color="${cor}" stop-opacity=".07"/><stop offset="100%" stop-color="${cor}" stop-opacity="0"/></linearGradient>
            <linearGradient id="mcb-${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${cor}" stop-opacity=".9"/><stop offset="100%" stop-color="${cor}" stop-opacity=".3"/></linearGradient></defs>
          ${grafico}
          ${meta ? `<line x1="0" x2="${W}" y1="${yMeta}" y2="${yMeta}" class="mc-meta" vector-effect="non-scaling-stroke"/>` : ""}
        </svg>
        ${meta ? `<span class="mc-meta-rot" style="top:${(yMeta / H * 100).toFixed(1)}%">meta ${fmt(meta)}</span>` : ""}
        <span class="mc-ponto${vista === "barras" ? " barra" : ""}" style="left:${dados.x[iUlt]}%;top:${vista === "barras" ? 100 : dados.y[iUlt]}%"></span>
        <div class="mc-tip" style="left:${dados.x[iUlt]}%;top:${Math.max(38, Math.min(70, dados.y[iUlt]))}%"><b>${esc(dados.v[iUlt])}</b><small>${esc(dados.d[iUlt])}</small></div>
      </div>
      ${head}
      <div class="mc-total">${esc(o.fmtTotal ? o.fmtTotal(tot) : fmt(tot))}<small>${esc(o.totalRot || "")}</small></div>
      <div class="mc-trend"><span class="mc-pct"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="${seta}"/></svg>${pctTxt}</span><small>${esc(o.compRot || "no período")}</small></div>
      <div class="mc-foot"><span>${o.parcial ? `<b style="color:var(--fg)">${esc(fmt(last))}</b>` : `<b>${passo >= 0 ? "+" : "−"}${esc(fmt(Math.abs(passo)))}</b>`} ${esc(o.rodape || "no último")}</span>
        <span class="mc-stats"><b>${esc(fmt(Math.max(...vals)))}</b> máx · <b>${esc(fmt(Math.min(...vals)))}</b> mín · <b>${esc(fmt(Math.round(soma(vals) / vals.length * 10) / 10))}</b> média</span></div>
    </div>`;
  }
  // O balão e o ponto seguem o dedo ou o mouse; ao sair, voltam para o último ponto
  function mcMarcar(svg, i) {
    const c = svg.closest(".mc"), d = JSON.parse(svg.dataset.mcDados), n = d.x.length;
    i = Math.max(0, Math.min(n - 1, i ?? n - 1));
    const p = c.querySelector(".mc-ponto"), t = c.querySelector(".mc-tip");
    p.style.left = t.style.left = d.x[i] + "%";
    if (!p.classList.contains("barra")) p.style.top = d.y[i] + "%";
    t.style.top = Math.max(38, Math.min(70, d.y[i])) + "%";
    t.classList.toggle("dir", d.x[i] < 45);
    t.innerHTML = `<b>${esc(d.v[i])}</b><small>${esc(d.d[i])}</small>`;
    c.querySelectorAll(".mc-bar").forEach((b, j) => b.classList.toggle("on", j === i));
  }
  document.addEventListener("pointermove", (e) => {
    const svg = e.target.closest?.(".mc-area-graf")?.querySelector(".mc-svg");
    if (!svg) return;
    const r = svg.getBoundingClientRect(), d = JSON.parse(svg.dataset.mcDados), f = ((e.clientX - r.left) / r.width) * 100;
    let best = 0; d.x.forEach((x, i) => { if (Math.abs(x - f) < Math.abs(d.x[best] - f)) best = i; });
    mcMarcar(svg, best);
  });
  document.addEventListener("pointerout", (e) => { const a = e.target.closest?.(".mc-area-graf"); if (a && !a.contains(e.relatedTarget)) mcMarcar(a.querySelector(".mc-svg")); });
  document.addEventListener("click", (e) => {
    const b = e.target.closest?.("[data-mc-vista],[data-mc-per],[data-evo-ex],[data-cal-mes]");
    if (!b) return;
    if (b.dataset.mcVista) { const [id, v] = b.dataset.mcVista.split("|"); EVO.vista[id] = v; }
    else if (b.dataset.mcPer) { const [id, i] = b.dataset.mcPer.split("|"); EVO.per[id] = Number(i); }
    else if (b.dataset.evoEx) EVO.ex = b.dataset.evoEx;
    else EVO.mes = Math.min(0, EVO.mes + Number(b.dataset.calMes));
    const y = window.scrollY, box = b.closest("[data-evo-bloco]");
    if (box) box.outerHTML = EVO_BLOCOS[box.dataset.evoBloco](); else render();
    window.scrollTo(0, y);
  });

  /* Calendário de consistência: o mês com os dias da semana, cada dia treinado na cor do tipo de treino */
  const CAL_TIPO = (p) => (p === "corrida" || p === "run" ? "cardio" : VP[p] ? "video" : p === "cf" ? "cf" : "forca");
  const CAL_ROT = { forca: "Força", video: "Vídeo", cf: "CrossFit", cardio: "Corrida" };
  function calendarioEvo() {
    const rows = feitas(linhasLocais()), ini = new Date(hoje.getFullYear(), hoje.getMonth() + EVO.mes, 1);
    const fim = new Date(ini.getFullYear(), ini.getMonth() + 1, 0), off = (ini.getDay() + 6) % 7;
    const porDia = {}; rows.forEach((r) => (porDia[r.data] ||= new Set()).add(CAL_TIPO(r.programa)));
    const cel = [];
    for (let i = 0; i < off; i++) cel.push(`<span class="cal-d vazio"></span>`);
    let feitosMes = 0, passados = 0;
    for (let d = 1; d <= fim.getDate(); d++) {
      const dt = new Date(ini.getFullYear(), ini.getMonth(), d), k = keyOf(dt), tps = [...(porDia[k] || [])];
      if (dt <= hoje) passados++;
      if (tps.length) feitosMes++;
      cel.push(`<span class="cal-d${tps.length ? " on t-" + tps[0] : parcial(k) ? " meio" : ""}${k === hojeKey ? " hoje" : ""}${dt > hoje ? " fut" : ""}" title="${ddmm(k)}${tps.length ? " · " + tps.map((t) => CAL_ROT[t]).join(" + ") : ""}">${d}${tps.length > 1 ? "<i></i>" : ""}</span>`);
    }
    // semanas do mês que bateram a meta semanal
    const meta = metaSemana(), semanas = {};
    rows.forEach((r) => { const s = keyOf(mondayOf(parseKey(r.data))); (semanas[s] ||= new Set()).add(r.data); });
    const segs = []; for (let s = mondayOf(ini); s <= fim; s = addDays(s, 7)) if (s <= hoje) segs.push(keyOf(s));
    const naMeta = segs.filter((s) => (semanas[s]?.size || 0) >= meta).length, sq = sequencias(linhasLocais());
    const tipos = [...new Set(rows.map((r) => CAL_TIPO(r.programa)))];
    return `<div class="cal" data-evo-bloco="cal">
      <div class="cal-head"><button type="button" class="icon-btn" data-cal-mes="-1" aria-label="Mês anterior">${icon("chevron-left.svg", 20)}</button>
        <strong>${["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"][ini.getMonth()]} ${ini.getFullYear()}</strong>
        <button type="button" class="icon-btn" data-cal-mes="1" aria-label="Próximo mês" ${EVO.mes >= 0 ? "disabled" : ""}>${icon("chevron-left.svg", 20).replace("<img", '<img style="transform:scaleX(-1)"')}</button></div>
      <div class="cal-sem">${["S", "T", "Q", "Q", "S", "S", "D"].map((x) => `<span>${x}</span>`).join("")}</div>
      <div class="cal-grade">${cel.join("")}</div>
      ${tipos.length ? `<div class="cal-leg">${tipos.map((t) => `<span><i class="t-${t}"></i>${CAL_ROT[t]}</span>`).join("")}</div>` : ""}
      <div class="cal-resumo"><span><b>${feitosMes}</b> de ${passados} dias</span><span><b>${naMeta}</b> de ${segs.length} semanas na meta (${meta}/sem)</span><span><b>${sq.atual}</b> ${sq.atual === 1 ? "dia seguido" : "dias seguidos"}</span></div>
    </div>`;
  }

  /* Radar: eixos com 0 a 100, a forma de agora (azul) por cima da de antes (cinza tracejada) */
  function radarSvg(eixos, agora, antes, rot = ["Agora", "Antes"]) {
    const n = eixos.length, R = 96, cx = 160, cy = 128, ang = (i) => -Math.PI / 2 + (i * 2 * Math.PI) / n;
    const pt = (i, v) => [cx + Math.cos(ang(i)) * R * (v / 100), cy + Math.sin(ang(i)) * R * (v / 100)];
    const poli = (vs) => vs.map((v, i) => pt(i, Math.max(3, v)).map((c) => c.toFixed(1)).join(",")).join(" ");
    const aneis = [25, 50, 75, 100].map((v) => `<polygon points="${poli(eixos.map(() => v))}" class="rd-anel"/>`).join("");
    const raios = eixos.map((_, i) => { const [x, y] = pt(i, 100); return `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" class="rd-raio"/>`; }).join("");
    const rots = eixos.map((e, i) => { const [x, y] = pt(i, 122), a = Math.cos(ang(i)); const anc = Math.abs(a) < 0.2 ? "middle" : a > 0 ? "start" : "end";
      return `<text x="${x.toFixed(1)}" y="${(y + 4).toFixed(1)}" text-anchor="${anc}" class="rd-rot">${esc(e.nome)}</text><text x="${x.toFixed(1)}" y="${(y + 18).toFixed(1)}" text-anchor="${anc}" class="rd-val ${e.cls || ""}">${esc(e.txt || "")}</text>`; }).join("");
    return `<svg class="radar" viewBox="-24 0 368 262" role="img" aria-label="${esc(eixos.map((e) => `${e.nome} ${e.txt || ""}`).join(", "))}">
      ${aneis}${raios}
      ${antes ? `<polygon points="${poli(antes)}" class="rd-antes"/>` : ""}
      <polygon points="${poli(agora)}" class="rd-agora"/>
      ${agora.map((v, i) => { const [x, y] = pt(i, Math.max(3, v)); return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3.5" class="rd-pt"/>`; }).join("")}
      ${rots}</svg>
      <div class="rd-leg"><span><i class="agora"></i>${esc(rot[0])}</span>${antes ? `<span><i class="antes"></i>${esc(rot[1])}</span>` : ""}</div>`;
  }
  const deltaTxt = (a, b) => { if (!b && !a) return ["—", ""]; if (!b) return ["novo", "up"]; const p = Math.round(((a - b) / b) * 100); return [`${p > 0 ? "+" : p < 0 ? "−" : ""}${Math.abs(p)}%`, p > 4 ? "up" : p < -4 ? "down" : ""]; };

  /* Radar 1, equilíbrio: volume por padrão de movimento (séries de força, movimentos do WOD, minutos de cardio) */
  const PADROES = [["empurrar", "Empurrar"], ["puxar", "Puxar"], ["pernas", "Pernas"], ["core", "Core"], ["cardio", "Cardio"]];
  const GRUPO_PADRAO = { peito: "empurrar", ombros: "empurrar", triceps: "empurrar", dorsais: "puxar", biceps: "puxar", trapezio: "puxar", antebraco: "puxar",
    quadriceps: "pernas", gluteos: "pernas", posteriores: "pernas", panturrilha: "pernas", abdomen: "core", obliquos: "core", lombar: "core" };
  const CAT_PADRAO = { empurrar: "empurrar", ombros: "empurrar", superior: ["empurrar", "puxar"], puxar: "puxar", core: "core", estabilidade: "core", inferiores: "pernas", gluteos: "pernas", panturrilha: "pernas", pernas: "pernas", forca: "pernas", corpo: ["empurrar", "puxar", "pernas", "core"], luta: ["empurrar", "core"] };
  const GRUPO_CAT = (g) => ({ Peito: "empurrar", Ombros: "empurrar", "Tríceps": "empurrar", Costas: "puxar", "Bíceps": "puxar", Pernas: "pernas", "Glúteos": "pernas", Panturrilha: "pernas", "Força do corredor": "pernas", "Abdômen": "core", Core: "core" }[g] || "cardio");
  function volumePadroes(rows) {
    const v = { empurrar: 0, puxar: 0, pernas: 0, core: 0, cardio: 0 }, add = (c, x) => { (Array.isArray(c) ? c : [c]).forEach((k) => (v[k] += x / (Array.isArray(c) ? c.length : 1))); };
    for (const r of feitas(rows)) {
      const d = r.detalhes || {};
      if (r.programa === "calistenia") for (const [id, s] of Object.entries(d.sets || {})) {
        if (!s.length) continue;
        const e = EXI[id];
        if (e?.un === "min" || ["trote", "caminhada", "tiro-200"].includes(id)) add("cardio", e?.un === "min" ? soma(s) / 4 : s.length * 1.5);
        else add(CAT_PADRAO[MUSC_EX[id]?.[0]] || "core", s.length);
      }
      else if (VP[r.programa]) for (const id of d.feitos || []) { const vd = INSV[id], m = vd?.min || 30; add("cardio", m / 4); add(CAT_PADRAO[vd?.mapa] || ["empurrar", "puxar", "pernas", "core"], m / 10); }
      else if (IA[r.programa]) for (const [id, s] of Object.entries(d.sets || {})) {
        if (!s.length) continue;
        const e = IA[r.programa].ci[id], cat = GRUPO_CAT(e?.grupo);
        if (cat === "cardio") { const w = e && cfMovMusc(e.nome); if (w && e.grupo === "Híbrido") { const t = soma(Object.values(w)); for (const [g, x] of Object.entries(w)) add(GRUPO_PADRAO[g], (x / t) * s.length); } else add("cardio", unDe(r.programa, e || { id }) === "min" ? soma(s.map((x) => x.r || 0)) / 4 : s.length * 1.5); }
        else add(cat, s.length);
      }
      else if (r.programa === "cf") {
        for (const p of d.wod?.partes || []) for (const m of p.movimentos || []) {
          const w = cfMovMusc(m.nome); if (!w) continue;
          const t = soma(Object.values(w));
          for (const [g, x] of Object.entries(w)) add(GRUPO_PADRAO[g], (x / t) * 3);
          if (/corrida|run|row|remo|bike|ski|double|under|corda|burpee|sprint/.test(cfNome(m.nome))) add("cardio", 2);
        }
        add("cardio", (r.minutos || 0) / 6);
      }
      else if (r.programa === "corrida") add("cardio", (r.minutos || 0) / 4);
    }
    return v;
  }
  function radarEquilibrio() {
    const rows = linhasLocais(), a = keyOf(addDays(hoje, -27)), b = keyOf(addDays(hoje, -55));
    const agora = volumePadroes(rows.filter((r) => r.data >= a && r.data <= hojeKey)), antes = volumePadroes(rows.filter((r) => r.data >= b && r.data < a));
    const max = Math.max(...Object.values(agora), ...Object.values(antes));
    if (!max) return `<p class="note">Treine algumas vezes e aqui aparece o equilíbrio entre empurrar, puxar, pernas, core e cardio.</p>`;
    const temAntes = Object.values(antes).some(Boolean);
    const eixos = PADROES.map(([k, nome]) => { const [txt, cls] = temAntes ? deltaTxt(agora[k], antes[k]) : [`${Math.round((agora[k] / max) * 100)}`, ""]; return { nome, txt, cls }; });
    const fraco = PADROES.filter(([k]) => agora[k] < max * 0.25).map(([, n]) => n.toLowerCase());
    return `<div class="rd-card">${radarSvg(eixos, PADROES.map(([k]) => (agora[k] / max) * 100), temAntes ? PADROES.map(([k]) => (antes[k] / max) * 100) : null, ["Últimas 4 semanas", "4 semanas antes"])}
      <p class="note small">Volume de treino por padrão de movimento: séries de força, movimentos dos WODs e minutos de cardio.${fraco.length ? ` Pouco trabalhado: <b>${esc(fraco.join(", "))}</b>.` : ""}</p></div>`;
  }

  /* Radar 2, movimentos: a melhor marca de agora (últimos 3 registros) contra a do começo, por exercício.
     Também serve de lista para o cartão "Progresso por exercício". */
  function seriesExercicios() {
    const out = [];
    for (const e of TODOS_EX) { const h = historico(e.id); if (!h.length || e.un === "min") continue;
      const tiro = e.un === "tiro"; out.push({ id: "c|" + e.id, nome: e.nome, un: tiro ? "s" : UN[e.un] || "reps", menor: tiro, pts: h.map((x) => ({ v: tiro ? x.best : x.best, data: ddmm(x.k) })), total: h.map((x) => x.total) }); }
    for (const pk of IAK) for (const id of new Set(Object.values(S[pk].logs).flatMap((l) => Object.keys(l.sets || {})))) {
      const e = IA[pk].ci[id], h = iaHist(pk, id); if (!e || !h.length) continue;
      const u = unDe(pk, e); if (u === "min") continue;
      const kg = h.some((x) => x.sets.some((s) => s.kg > 0));
      out.push({ id: pk + "|" + id, nome: e.nome, un: kg ? "kg" : u === "s" ? "s" : "reps", pts: h.map((x) => ({ v: Math.max(0, ...x.sets.map((s) => (kg ? s.kg || 0 : s.r || 0))), data: ddmm(x.k) })) });
    }
    const prs = {}; for (const x of S.cf?.prs || []) (prs[cfNome(x.mov)] ||= { nome: x.mov, itens: [] }).itens.push(x);
    for (const [k, g] of Object.entries(prs)) { const it = g.itens.filter((x) => x.kg > 0).sort((a, b) => a.k.localeCompare(b.k)); if (it.length) out.push({ id: "pr|" + k, nome: g.nome, un: "kg", pts: it.map((x) => ({ v: x.kg, data: `${ddmm(x.k)} · ${x.reps}RM` })) }); }
    return out.filter((x) => x.pts.some((p) => p.v > 0)).sort((a, b) => b.pts.length - a.pts.length);
  }
  function radarMovimentos() {
    const cands = seriesExercicios().filter((x) => x.pts.length >= 2).slice(0, 6);
    const ft = fitTests(linhasLocais());
    if (cands.length < 3) {
      if (ft.length < 2) return `<p class="note">Com 3 exercícios registrados em pelo menos 2 treinos, este radar compara a sua melhor marca de agora com a do começo.</p>`;
      const P = VP[ft[0].p], a = ft[ft.length - 1].fit, b = ft[0].fit, mx = P.fitTest.map((_, i) => Math.max(Number(a[i]) || 0, Number(b[i]) || 0) || 1);
      return `<div class="rd-card">${radarSvg(P.fitTest.map((m, i) => { const [txt, cls] = deltaTxt(Number(a[i]) || 0, Number(b[i]) || 0); return { nome: m.length > 14 ? m.slice(0, 13) + "…" : m, txt, cls }; }),
        mx.map((m, i) => ((Number(a[i]) || 0) / m) * 100), mx.map((m, i) => ((Number(b[i]) || 0) / m) * 100), [`Fit Test ${ddmm(ft[ft.length - 1].k)}`, `1º teste ${ddmm(ft[0].k)}`])}
        <p class="note small">Repetições em cada movimento do Fit Test: o último contra o primeiro.</p></div>`;
    }
    const val = (x, fim) => { const vs = (fim ? x.pts.slice(-3) : x.pts.slice(0, 1)).map((p) => p.v).filter(Boolean); return vs.length ? (x.menor ? Math.min(...vs) : Math.max(...vs)) : 0; };
    const eixos = [], agora = [], antes = [];
    for (const x of cands) {
      const a = val(x, true), b = val(x, false), mx = Math.max(a, b) || 1;
      const [txt, cls] = x.menor ? deltaTxt(b, a) : deltaTxt(a, b);
      eixos.push({ nome: x.nome.length > 14 ? x.nome.slice(0, 13).trim() + "…" : x.nome, txt: `${evoNum(a)} ${x.un} · ${txt}`, cls });
      agora.push(x.menor ? (Math.min(a, b) / a) * 100 : (a / mx) * 100); antes.push(x.menor ? (Math.min(a, b) / b) * 100 : (b / mx) * 100);
    }
    return `<div class="rd-card">${radarSvg(eixos, agora, antes, ["Melhor marca agora", "No começo"])}
      <p class="note small">Os ${cands.length} exercícios com mais registros: a melhor marca dos 3 últimos treinos contra a do primeiro.</p></div>`;
  }

  /* Os cartões do painel */
  const PER_SEM = [["4 sem", 4], ["8 sem", 8], ["12 sem", 12]];
  const semRot = (k) => `semana de ${ddmm(k)}`;
  function cartaoTreinos() {
    const rows = linhasLocais(), sem = porSemana(rows, 12);
    return `<div data-evo-bloco="treinos">${metricCard("treinos", { titulo: "Treinos por semana", un: "treinos", pts: sem.map((x) => ({ v: x.v, data: semRot(x.k) })), per: PER_SEM, perPadrao: 1,
      meta: metaSemana(), un1: "treino", parcial: true, totalRot: " treinos", rodape: "nesta semana", compRot: "média recente × anterior", vista: "barras", vazio: "Conclua treinos e acompanhe a semana contra a sua meta." })}</div>`;
  }
  function cartaoMinutos() {
    const rows = linhasLocais(), sem = porSemana(rows, 12, "minutos");
    return `<div data-evo-bloco="minutos">${metricCard("minutos", { titulo: "Tempo treinando", un: "min", pts: sem.map((x) => ({ v: x.v, data: semRot(x.k) })), per: PER_SEM, perPadrao: 1,
      fmtTotal: (v) => fmtMin(Math.round(v)), fmt: (v) => String(Math.round(v)), parcial: true, rodape: "min nesta semana", compRot: "média recente × anterior" })}</div>`;
  }
  function cartaoExercicio() {
    const xs = seriesExercicios();
    if (!xs.length) return `<div data-evo-bloco="ex"><p class="note">Registre as repetições ou as cargas das séries. Aqui você vê a evolução treino a treino em cada exercício. 💪</p></div>`;
    if (!xs.some((x) => x.id === EVO.ex)) EVO.ex = xs[0].id;
    const x = xs.find((y) => y.id === EVO.ex);
    return `<div data-evo-bloco="ex"><div class="chips evo-chips">${xs.slice(0, 24).map((y) => `<button class="chip${y.id === EVO.ex ? " primary" : ""}" data-evo-ex="${esc(y.id)}">${esc(y.nome)}</button>`).join("")}</div>
      ${metricCard("ex-" + x.id.replace(/[^a-z0-9]/gi, ""), { titulo: x.nome, un: x.un, pts: x.pts, per: [["Últimos 5", 5], ["Últimos 10", 10], ["Tudo", 0]], perPadrao: 2, total: "melhor", menorMelhor: x.menor,
        totalRot: ` ${x.un} · melhor`, rodape: "no último treino", compRot: "1º × último registro", vazio: "Faça este exercício mais uma vez para ver a curva." })}</div>`;
  }
  function cartaoMaxOut() {
    const mx = maxOuts(linhasLocais());
    if (!mx.length) return `<div data-evo-bloco="max"><p class="note">Registre o Max Out nos vídeos do ${esc(NOMES_MAXOUT)} para ver aqui em que minuto você cansou em cada treino. 🥵</p></div>`;
    const vids = [...new Set(mx.map((m) => m.v))];
    if (!vids.includes(evoMax)) evoMax = vids[0];
    const h = mx.filter((m) => m.v === evoMax).sort((a, b) => a.k.localeCompare(b.k));
    return `<div data-evo-bloco="max"><div class="chips evo-chips">${vids.map((v) => `<button class="chip${v === evoMax ? " primary" : ""}" data-evo-max="${v}">${esc(INSV[v].nome)}</button>`).join("")}</div>
      ${metricCard("max-" + evoMax.replace(/[^a-z0-9]/gi, ""), { titulo: "Max Out", pts: h.map((m) => ({ v: m.s, data: ddmm(m.k) })), per: [["Tudo", 0]], total: "melhor", fmt: (v) => mmss(Math.round(v)),
        meta: (INSV[evoMax].min || 0) * 60 || 0, totalRot: " melhor", rodape: "no último", compRot: "1º × último registro", vazio: "Registre o Max Out deste vídeo de novo para ver a curva." })}</div>`;
  }
  const EVO_BLOCOS = { treinos: cartaoTreinos, minutos: cartaoMinutos, ex: cartaoExercicio, max: cartaoMaxOut, cal: calendarioEvo };
  function resumoEvo() {
    const rows = linhasLocais(), mes = kpis(noPeriodo(rows, "mes")), sq = sequencias(rows);
    return `<div class="evo-kpis">${[["circle-check.svg", mes.treinos, "treinos no mês"], ["hourglass.svg", fmtMin(mes.minutos), "no mês"], ["flame.svg", sq.melhor, "melhor sequência"], ["circle-percent.svg", taxaConclusao() + "%", "dias com treino"]]
      .map(([ic, v, l]) => `<div class="evo-kpi"><span class="stat-ico">${icon(ic, 16)}</span><strong>${esc(String(v))}</strong><small>${esc(l)}</small></div>`).join("")}</div>`;
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
    CACHE_CHEFES = null;
    let [, rota = "", p1, p2] = location.hash.split("/");
    if (rota === "grupo" && p1 === "entrar" && /^[A-Za-z0-9]{4,12}$/.test(p2 || "") && !uid) { S.convite = p2.toUpperCase(); save(); }
    if (rota === "grupo" && p1 === "novo" && p2) { // desafio montado no Telegram: abre o formulário preenchido
      try {
        const j = JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(p2.replace(/-/g, "+").replace(/_/g, "/")), (ch) => ch.charCodeAt(0))));
        desafioRascunho = { titulo: String(j.t || "").slice(0, 80), descricao: String(j.d || "").slice(0, 500), medida: MEDIDAS[j.m] ? j.m : "feito", link: /^https:\/\//.test(j.l || "") ? String(j.l).slice(0, 300) : "" };
        formDesafio = "link";
        const r0 = desafioRascunho;
        if (r0.link) tokenSB().then((tk) => tk && fetch("/api/desafio", { method: "POST", headers: { "content-type": "application/json", authorization: `Bearer ${tk}` }, body: JSON.stringify({ link: r0.link, soCapa: true }) }))
          .then((r) => r?.json()).then((j) => { if (j?.capa && desafioRascunho === r0 && formDesafio === "link") { r0.capa = j.capa; if (location.hash.startsWith("#/grupo")) render(); } }).catch(() => {});
      } catch {}
      p1 = p2 = undefined;
    }
    if (!S.logado) rota = "login";
    else if (!S.onboarded && rota !== "login") rota = "onboarding";
    else if (!telas[rota] || rota === "login" || rota === "onboarding") rota = "home";
    if ((VP[rota] || IA[rota] || rota === "cf") && travado(rota)) { rota = liberado(principal()) ? principal() : etapaAtual().prog; p1 = p2 = undefined; setTimeout(() => toast("🔒 Esse programa libera na formatura do MAX:30."), 50); }
    if (rota === "treino" && (p2 === undefined || !treino(p1 === "E" ? "E" : Number(p1), Number(p2)))) rota = "home";
    let alvo = `#/${rota}`;
    if (rota === "treino") alvo += `/${p1}/${p2}`;
    else if (VP[rota] && p1 !== undefined) alvo += `/${p1}` + (p2 !== undefined ? `/${p2}` : "");
    else if (rota === "grupo" && (p1 === "entrar" || p1 === "membro") && p2) alvo += `/${p1}/${p2}`;
    else if (rota === "plano" && p1 !== undefined) alvo += `/${p1}`;
    else if (IA[rota] && p1 !== undefined) alvo += `/${p1}` + (p2 !== undefined ? `/${p2}` : "");
    else if (rota === "cf" && p1 !== undefined) alvo += `/${p1}`;
    if (location.hash !== alvo) history.replaceState(null, "", alvo);
    closeChat(true);
    app.innerHTML = telas[rota](p1, p2);
    if (rota === "onboarding") startQuiz("onboarding");
    if (rota === "ficha" && $("#quiz")) startQuiz("ficha");
    if (rota === "home" || rota === "chefes") setTimeout(chefesNovos, 700);
    const tab = document.querySelector(".wtab.on");
    if (tab) tab.scrollIntoView({ inline: "center", block: "nearest" });
    const aba = document.querySelector(".seg.prog.rolar a.on");
    if (aba) aba.parentElement.scrollLeft = aba.offsetLeft - (aba.parentElement.clientWidth - aba.offsetWidth) / 2;
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
    if (S.contaId && S.contaId !== u.id) { S.logs = {}; VKEYS.forEach((p) => (S[p] = vazioVP())); S.conquistas = {}; S.onboarded = false; S.dono = false; S.graduadoMax30 = null; S.formaturas = {}; S.trilha = null; S.forca = null; S.desafiosN = 0; xpAntes = null; G.grupos = null; }
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
      if (perfil.config.nutri && !S.nutri) S.nutri = perfil.config.nutri;
      if (perfil.config.graduado && !S.graduadoMax30) S.graduadoMax30 = perfil.config.graduado;
      if (perfil.config.formaturas && typeof perfil.config.formaturas === "object") S.formaturas = { ...perfil.config.formaturas, ...(S.formaturas || {}) };
      if (perfil.config.trilha && !S.trilha) S.trilha = perfil.config.trilha;
      if (perfil.config.forca && !S.forca) S.forca = perfil.config.forca;
      if (perfil.config.quiz && !S.quiz) S.quiz = perfil.config.quiz;
      if (perfil.config.ficha && !S.ficha) S.ficha = perfil.config.ficha;
      if (perfil.config.arte && !S.arte) S.arte = perfil.config.arte;
      if (perfil.config.missoes) { S.missoes = S.missoes || {}; for (const [k, n] of Object.entries(perfil.config.missoes)) S.missoes[k] = Math.max(S.missoes[k] || 0, Number(n) || 0); }
      if (perfil.config.missoesXpAnt > (S.missoesXpAnt || 0)) S.missoesXpAnt = perfil.config.missoesXpAnt;
      if (perfil.config.principal) S.onboarded = true; // já escolheu o programa em outro aparelho
    }
    if (!S.logado || !S.user || S.user.id !== uid) entrar(user);
    else { S.user = user; save(); }
    if (novo) { await puxarTreinos(); conferirXp(true); tgCarregar().then(() => tgSincronizar(true)); setTimeout(conferirAvisos, 1500); sincronizar(); verificarConquistas(true); if (S.convite) entrarComCodigo(S.convite); carregarVideos(); }
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

  /* ---------- Bot do Telegram (@treinosfit_bot) ----------
     O app manda ao servidor a agenda dos próximos 8 dias do programa principal e os dias já feitos; o servidor manda o
     treino do dia, lembra à noite e recebe "✅ Feito". O Feito tocado no Telegram volta para cá e vira o treino registrado.
     Qualquer pessoa com conta pode conectar; o token do bot e o painel (/admin) são só do dono. */
  let tgInfo, tgUltimo = "", tgEspera = null, tgCoachEm = 0;
  async function tgApi(acao, extra = {}) {
    const token = await tokenSB();
    if (!token) return null;
    const r = await fetch("/api/telegram", { method: "POST", headers: { "content-type": "application/json", authorization: `Bearer ${token}` }, body: JSON.stringify({ acao, ...extra }) });
    const j = await r.json().catch(() => ({}));
    if (r.status === 403 || r.status === 401) { tgInfo = null; return null; }
    if (!r.ok) throw Object.assign(new Error(j.erro || r.status), { j });
    return j;
  }
  function tgDia(dt) {
    const k = keyOf(dt), d = (dt.getDay() + 6) % 7, pk = principal(), base = `${location.origin}/`;
    if (VP[pk]) {
      const w = insSemanaDe(pk, dt), t = w >= 0 && w < VP[pk].semanas.length ? insDia(pk, w, d) : null;
      if (!t) return null;
      if (!t.ids.length) return { data: k, prog: VP[pk].nome, titulo: "Descanso", descanso: true };
      return { data: k, prog: VP[pk].nome, titulo: t.titulo || INSV[t.ids[0]]?.nome || "", itens: t.ids.map((id) => `${INSV[id]?.nome || id}${INSV[id]?.min ? ` · ${INSV[id].min} min` : ""}`), link: `${base}#/${pk}/${w}/${d}`,
        ex: t.ids.map((id) => ({ id, nome: INSV[id]?.nome || id, un: "video", maxOut: !!VP[pk].maxOut })),
        videos: t.ids.filter((id) => INS_VID[id]).map((id) => ({ nome: INSV[id]?.nome || id, url: insLink(id) })) };
    }
    if (IA[pk]) {
      if (!S[pk].plano) return null;
      const w = S[pk].inicio ? Math.floor(diffDays(mondayOf(parseKey(S[pk].inicio)), dt) / 7) : 0;
      if (w < 0 || (IA[pk].semanas > 0 && w >= IA[pk].semanas)) return null;
      const t = iaSessao(pk, d, w);
      if (!t) return { data: k, prog: IA[pk].nome, titulo: "Descanso", descanso: true };
      return { data: k, prog: IA[pk].nome, titulo: t.titulo, itens: t.exercicios.map((e) => `${exDe(pk, e.id)?.nome || e.id}: ${e.series} × ${e.reps}`), link: `${base}${iaLink(pk, d, w)}`,
        ex: t.exercicios.map((e) => ({ id: e.id, nome: exDe(pk, e.id)?.nome || e.id, un: unDe(pk, e), carga: !!IA[pk].carga })) };
    }
    if (pk === "cf") return { data: k, prog: "CrossFit", titulo: "WOD do box", itens: ["Tire uma foto do quadro e o app lança o WOD."], link: `${base}#/cf` };
    if (semanasDesde(dt) < 0) return null;
    const w = semanaDe(dt), t = treino(w, d);
    if (!t) return null;
    return { data: k, prog: NOME_PROG, titulo: t.titulo, descanso: t.foco === "Opcional" && /descanso/i.test(t.titulo),
      itens: (t.ex || []).map((e) => `${e.nome}: ${e.s} × ${e.r}${UN[e.un]}${e.lado ? " cada lado" : ""}`), link: `${base}#/treino/${w}/${d}`, obs: t.obs || "",
      ex: (t.ex || []).map((e) => ({ id: e.id, nome: e.nome, un: e.un === "tiro" ? "s" : e.un })) };
  }
  // O "Feito" do Telegram vira o treino do programa principal naquele dia
  function tgMarcar(k) {
    if (feito(k)) return true;
    const dt = parseKey(k), d = (dt.getDay() + 6) % 7, pk = principal();
    if (VP[pk]) {
      const l = insLogDe(pk, k), t = insDia(pk, l.w, l.d);
      if (!t || !t.ids.length) { delete S[pk].logs[k]; return false; }
      t.ids.forEach((id) => marcarVideo(pk, l, id));
    } else if (IA[pk]) {
      if (!S[pk].plano) return false;
      const w = S[pk].inicio ? Math.max(0, Math.floor(diffDays(mondayOf(parseKey(S[pk].inicio)), dt) / 7)) : 0;
      S[pk].logs[k] = { d, w, sets: {}, ...(S[pk].logs[k] || {}), done: true };
    } else if (pk === "cf") S.cf.logs[k] = { res: {}, ...(S.cf.logs[k] || {}), done: true };
    else S.logs[k] = { w: Math.max(0, semanaDe(dt)), d, sets: {}, dur: 0, ...(S.logs[k] || {}), done: true };
    return true;
  }
  function tgRegistrar(x) {
    const k = x.data, dt = parseKey(k), d = (dt.getDay() + 6) % 7, pk = principal();
    const nums = (Array.isArray(x.valores) ? x.valores : []).map(Number).filter((n) => Number.isFinite(n) && n > 0 && n < 10000).slice(0, 20);
    if (x.tipo === "max" && VP[pk]) {
      const seg = Math.round(Number(x.seg));
      if (!(seg > 0 && seg <= 3600) || !INSV[x.ex]) return false;
      const l = insLogDe(pk, k);
      l.max = l.max || {}; l.max[x.ex] = seg;
      marcarVideo(pk, l, x.ex);
      return true;
    }
    if (x.tipo !== "series" || !nums.length) return false;
    if (IA[pk]) {
      if (!S[pk].plano || !exDe(pk, x.ex)) return false;
      const w = S[pk].inicio ? Math.max(0, Math.floor(diffDays(mondayOf(parseKey(S[pk].inicio)), dt) / 7)) : 0;
      const l = (S[pk].logs[k] = S[pk].logs[k] || { d, w, sets: {}, done: false });
      const kg = Array.isArray(x.kg) ? x.kg.map(Number) : [];
      (l.sets[x.ex] = l.sets[x.ex] || []).push(...nums.map((r, i) => (kg[i] > 0 && kg[i] < 1000 ? { kg: kg[i], r } : { r })));
      return true;
    }
    if (VP[pk] || pk === "cf" || !EXI[x.ex]) return false;
    const l = (S.logs[k] = S.logs[k] || { w: Math.max(0, semanaDe(dt)), d, sets: {}, dur: 0, done: false });
    (l.sets[x.ex] = l.sets[x.ex] || []).push(...nums);
    return true;
  }
  async function tgSincronizar(forcar = false) {
    if (!uid || !S.tg?.ligado) return;
    const agenda = [...Array(8)].map((_, i) => tgDia(addDays(new Date(), i))).filter(Boolean);
    const feitos = [...Array(14)].map((_, i) => keyOf(addDays(new Date(), -i))).filter(feito);
    const kHoje = keyOf(new Date());
    const corpo = { agenda, feitos, tz: -new Date().getTimezoneOffset(), nome: S.user?.primeiro || "", aguaHoje: soma((S.agua?.[kHoje] || []).map((x) => x.ml || 0)), aguaMeta: nutriMetas().agua, comoMembro: !!S.verComoMembro, gami: (() => { const n = meuNivel(), at = etapaAtual(), g = at.p ? at.p() : null; return { xp: n.xp, nivel: n.nivel, classe: n.classe, ini: n.ini, fim: n.fim, trilha: TRILHAS[trilha()].nome, etapa: at.nome, etapaN: `${at.i + 1}/${at.n}`, grad: !g, feitas: g?.feitas || 0, precisa: g?.precisa || 0, final: !!g?.final, teste: g?.teste || "" }; })() };
    const assinatura = JSON.stringify(corpo);
    const coachVelho = Date.now() - tgCoachEm > 10 * 60000;
    if (!forcar && assinatura === tgUltimo && !coachVelho) return;
    // Material do Coach AI no Telegram (programa e histórico), no máximo a cada 10 min
    if (forcar || coachVelho) {
      try { Object.assign(corpo, { coachProg: programaTexto(), coachCtx: contextoTexto(true), nutriProg: nutriBase(), nutriCtx: nutriContexto() }); } catch {}
    }
    try {
      const r = await tgApi("agenda", corpo);
      if (corpo.coachProg) tgCoachEm = Date.now();
      if (!r) return;
      tgUltimo = assinatura;
      if (r.ligado === false) { S.tg.ligado = false; save(); return; }
      tgInfo = { ...tgInfo, ...r };
      if (r.agua && !r.agua.on && S.aguaLembrete?.on && S.aguaLembrete.canal === "telegram") { S.aguaLembrete = { ...S.aguaLembrete, on: false }; save(); }
      // Água anotada pelo botão "Bebi" do Telegram
      const pend = (r.aguaPend || []).filter((x) => x && /^\d{4}-\d{2}-\d{2}$/.test(x.data) && x.ml > 0 && x.ml <= 1000);
      if (pend.length) {
        S.agua = S.agua || {};
        for (const x of pend) {
          (S.agua[x.data] = S.agua[x.data] || []).push({ t: /^\d{2}:\d{2}$/.test(x.t) ? x.t : "--:--", ml: x.ml });
          S.agua[x.data].sort((a, b) => String(a.t).localeCompare(String(b.t)));
          S.aguaMeta = { ...(S.aguaMeta || {}), [x.data]: S.aguaMeta?.[x.data] || nutriMetas().agua };
        }
        save();
        await tgApi("aguaok", { ids: pend.map((x) => x.id) });
        const tot = pend.reduce((a, x) => a + x.ml, 0);
        toast(`+${tot} ml de água anotados pelo Telegram 💧`);
        if (location.hash.startsWith("#/nutricao") || location.hash.startsWith("#/home") || !location.hash) render();
      }
      // Séries e Max Out anotados pelo Coach no Telegram
      const regs = (r.regPend || []).filter((x) => x && /^\d{4}-\d{2}-\d{2}$/.test(x.data) && x.data <= keyOf(new Date()));
      if (regs.length) {
        const feitosReg = regs.filter(tgRegistrar);
        save();
        await tgApi("regok", { ids: regs.map((x) => x.id) });
        if (feitosReg.length) { toast(`${feitosReg.length} ${feitosReg.length === 1 ? "registro anotado" : "registros anotados"} pelo Telegram ✓`); render(); }
      }
      const marcar = (r.marcar || []).filter((k) => /^\d{4}-\d{2}-\d{2}$/.test(k) && k <= keyOf(new Date()));
      if (marcar.length) {
        const ok = marcar.filter(tgMarcar);
        save();
        await tgApi("ok", { datas: marcar });
        if (ok.length) { toast(ok.length === 1 ? `Treino de ${ddmm(ok[0])} marcado pelo Telegram ✓` : `${ok.length} treinos marcados pelo Telegram ✓`); G.carregadoEm = 0; render(); }
      }
    } catch {}
  }
  async function tgCarregar() {
    if (!uid || tgInfo !== undefined) return;
    tgInfo = false; // carregando
    try { const r = await tgApi("estado"); tgInfo = r; if (r) { S.tg = { ...(S.tg || {}), ligado: !!r.ligado }; save(); } } catch { tgInfo = null; }
    if (location.hash.startsWith("#/perfil")) render();
  }
  function tgCard() {
    if (!uid) return "";
    if (tgInfo === undefined) { setTimeout(tgCarregar, 0); return ""; }
    if (!tgInfo) return "";
    const topo = `<span class="field-lbl">Treinos e Coach AI no Telegram</span>`;
    if (!tgInfo.token && !tgInfo.dono) return "";
    if (!tgInfo.token) return `<div class="field tg-card">${topo}<p class="tg-txt">Cole o token que o @BotFather mandou. Ele fica só no servidor.</p>
      <form id="tg-token" class="tg-linha"><input name="token" type="password" autocomplete="off" placeholder="123456:ABC…" required><button class="btn btn-blue">Salvar</button></form></div>`;
    if (!tgInfo.ligado) return `<div class="field tg-card">${topo}<p class="tg-txt">Receba o treino do dia, lembretes de água e converse com o Coach AI pelo Telegram.</p>
      <button class="btn btn-blue" id="tg-ligar">${tgEspera ? "Esperando você tocar em Iniciar no Telegram…" : "Conectar Telegram"}</button></div>`;
    return `<div class="field tg-card">${topo}<p class="tg-txt">Conectado ao <b>@${esc(tgInfo.bot || "treinosfit_bot")}</b> ✓</p>
      <div class="tg-horas"><label>Treino do dia<input type="time" id="tg-hora" value="${esc(tgInfo.hora || "07:00")}"></label>
      <label>Lembrete da noite<input type="time" id="tg-noite" value="${esc(tgInfo.noite || "")}"></label></div>
      <p class="tg-txt">O lembrete da noite só vai se o treino ainda não estiver feito. Apague o horário para desligar.</p>
      <p class="tg-txt">💧 Água: ${S.aguaLembrete?.on && S.aguaLembrete.canal === "telegram" ? `<b>${S.aguaLembrete.ml} ml a cada ${S.aguaLembrete.intervalo} min</b> no Telegram` : "escolha <b>Telegram</b> no lembrete de água, na aba Nutrição"}.</p>
      <div class="row2"><button class="btn btn-outline" id="tg-testar">Enviar teste</button><button class="btn btn-outline" id="tg-desligar">Desconectar</button></div></div>`;
  }
  async function tgLigar() {
    let janela = null;
    try {
      janela = window.open("", "_blank");
      const r = await tgApi("vincular");
      if (!r?.link) { janela?.close(); toast("Não consegui gerar o link agora."); return; }
      if (janela) janela.location.href = r.link; else location.href = r.link;
    } catch { janela?.close(); toast("Não consegui gerar o link agora."); return; }
    clearInterval(tgEspera);
    const ate = Date.now() + 3 * 60000;
    tgEspera = setInterval(async () => {
      const r = await tgApi("estado").catch(() => null);
      if (r?.ligado || Date.now() > ate) {
        clearInterval(tgEspera); tgEspera = null;
        if (r?.ligado) { tgInfo = r; S.tg = { ...(S.tg || {}), ligado: true }; save(); tgSincronizar(true); toast("Telegram conectado ✓"); }
        if (location.hash.startsWith("#/perfil")) render();
      }
    }, 3000);
    render();
  }
  document.addEventListener("submit", async (e) => {
    if (e.target.id !== "tg-token") return;
    e.preventDefault();
    const b = e.target.querySelector("button"); b.disabled = true;
    try { await tgApi("token", { token: e.target.elements.token.value.trim() }); tgInfo = undefined; toast("Bot configurado ✓"); render(); }
    catch (x) { b.disabled = false; toast(x.j?.erro === "token_recusado" ? "O Telegram recusou esse token." : x.j?.erro === "ja_configurado" ? "O bot já está configurado." : "Token inválido."); }
  });
  document.addEventListener("change", async (e) => {
    if (e.target.id !== "tg-hora" && e.target.id !== "tg-noite") return;
    try {
      const r = await tgApi("config", e.target.id === "tg-hora" ? { hora: e.target.value || "07:00" } : { noite: e.target.value || null });
      if (r) { tgInfo = { ...tgInfo, ...r }; toast(e.target.id === "tg-noite" && !e.target.value ? "Lembrete da noite desligado." : "Horário salvo ✓"); }
    } catch { toast("Não consegui salvar o horário."); }
  });
  document.addEventListener("click", async (e) => {
    const t = e.target.closest("#tg-ligar, #tg-testar, #tg-desligar");
    if (!t) return;
    if (t.id === "tg-ligar") tgLigar();
    else if (t.id === "tg-testar") { await tgSincronizar(true); tgApi("testar").then(() => toast("Mensagem enviada no Telegram ✓")).catch(() => toast("Não consegui enviar.")); }
    else if (t.id === "tg-desligar") {
      if (!confirm("Parar de receber os treinos no Telegram?")) return;
      try { await tgApi("desligar"); tgInfo = { ...tgInfo, ligado: false }; S.tg = { ...(S.tg || {}), ligado: false };
        if (S.aguaLembrete?.canal === "telegram") S.aguaLembrete = { ...S.aguaLembrete, on: false, canal: "push" }; save(); render(); } catch { toast("Não consegui desconectar."); }
    }
  });

  /* ---------- Avisos do dono (tabela "avisos"): aparecem uma vez, ao abrir o app ---------- */
  let avisoBuscadoEm = 0;
  async function conferirAvisos() {
    if (!uid || !sb || Date.now() - avisoBuscadoEm < 5 * 60000) return;
    avisoBuscadoEm = Date.now();
    let data, error;
    try { ({ data, error } = await sb.from("avisos").select("id, titulo, texto, criado_em").gte("criado_em", new Date(Date.now() - 14 * 864e5).toISOString()).order("id", { ascending: true }).limit(10)); } catch { return; }
    if (error || !data) return;
    if (S.avisoVisto == null) { S.avisoVisto = data.length ? data[data.length - 1].id - 1 : 0; save(); } // conta nova: só o último
    const novos = data.filter((a) => a.id > S.avisoVisto);
    if (!novos.length || document.querySelector("dialog[open]")) return;
    let dlg = $("#aviso-dlg");
    if (!dlg) { dlg = document.createElement("dialog"); dlg.id = "aviso-dlg"; dlg.className = "post-dlg aviso-dlg"; ($(".device") || document.body).appendChild(dlg); }
    dlg.innerHTML = `<div class="post-form">${novos.map((a) => `<div class="aviso-item"><strong>📣 ${esc(a.titulo)}</strong><p>${esc(a.texto).replace(/\n/g, "<br>")}</p><span class="aviso-data">${ddmm(keyOf(new Date(a.criado_em)))}</span></div>`).join("")}
      <button type="button" class="btn btn-blue" data-aviso-ok>Entendi</button></div>`;
    dlg._ultimo = novos[novos.length - 1].id;
    dlg.showModal();
  }
  document.addEventListener("click", (e) => {
    if (!e.target.closest("[data-aviso-ok]")) return;
    const dlg = $("#aviso-dlg");
    S.avisoVisto = Math.max(S.avisoVisto || 0, dlg?._ultimo || 0); save();
    dlg?.close();
  });
  document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible") conferirAvisos(); });

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
    else if (t.id === "desafio-cancelar") { formDesafio = null; desafioRascunho = null; desafioEditando = null; render(); }
    else if (t.id === "desafio-editar") { desafioEditando = G.desafios.find((x) => x.id === t.dataset.id) || null; if (desafioEditando) { formDesafio = "editar"; render(); document.getElementById("form-desafio")?.scrollIntoView({ block: "start" }); } }
    else if (t.id === "desafio-link") {
      const f = t.closest("form"), link = linkCompleto(f.elements.link.value.trim()), nota = f.elements.nota.value.trim();
      if (!LINK_VIDEO.test(link)) { toast("Cole o link de um reel do Instagram, TikTok ou YouTube."); return; }
      t.disabled = true; t.textContent = "Assistindo ao vídeo…";
      desafioDoLink(link, nota).then((j) => { desafioRascunho = { ...j.desafio, link, nota, duvida: j.duvida, capa: j.capa || "" }; formDesafio = "link"; render(); toast(j.entendeu ? "Desafio montado. Confira e lance! ⚔️" : "Montei com o que deu para entender. Confira a regra.", 3500); })
        .catch((e) => { t.disabled = false; t.textContent = "✨ Montar pelo link"; toast(e.message, 5000); });
    }
    else if (t.id === "desafio-cumpri") cumprirDesafio(t.dataset.id);
    else if (t.id === "desafio-desfazer") {
      if (!confirm("Desfazer seu cumprimento do desafio?")) return;
      sb.from("desafio_feitos").delete().eq("desafio_id", t.dataset.id).eq("usuario_id", uid).then(({ error }) => { if (error) toast("Não consegui desfazer."); else { G.meusDesafios = Math.max(0, (G.meusDesafios || 1) - 1); carregarGrupos(true); } });
    } else if (t.id === "desafio-apagar") {
      if (!confirm("Apagar o desafio desta semana? Os cumprimentos dele também somem.")) return;
      const capaDel = G.desafios.find((x) => x.id === t.dataset.id)?.capa;
      sb.from("desafios").delete().eq("id", t.dataset.id).then(({ error }) => { if (error) toast("Não consegui apagar."); else { if (capaDel) sb.storage.from("posts").remove([capaDel]); carregarGrupos(true); } });
    }
    else if (t.id === "g-codigo") entrarComCodigo(prompt("Código do grupo:") || "");
    else if (t.dataset.gSel) { G.sel = t.dataset.gSel; G.carregadoEm = 0; carregarGrupos(true); }
    else if (t.id === "g-convidar") convidar(grupoSel());
    else if (t.dataset.gPeriodo) { G.periodo = t.dataset.gPeriodo; render(); }
    else if (t.dataset.gRank) { G.rank = t.dataset.gRank; render(); }
    else if (t.dataset.membro) location.hash = `#/grupo/membro/${t.dataset.membro}`;
    else if (t.dataset.trilha) {
      const k = t.dataset.trilha, T = TRILHAS[k];
      if (!T || k === trilha()) return;
      if (!confirm(`Trocar para a trilha ${T.nome}? Seu XP, nível e formaturas continuam.`)) return;
      S.trilha = k; escolherPrograma(etapaAtual().prog); save(); render();
      toast(`${T.ic} Trilha ${T.nome}: ${etapaAtual().nome} é o seu programa agora.`, 4000);
    }
    else if (t.dataset.forca) { S.forca = t.dataset.forca; save(); render(); }
    else if (t.id === "ver-membro") {
      S.verComoMembro = !S.verComoMembro;
      if (S.verComoMembro) { S.principalDono = principal(); aplicarTrava(); }
      else if (S.principalDono) { escolherPrograma(S.principalDono); S.principalDono = null; }
      save(); render();
      toast(S.verComoMembro ? "Visão de usuário comum: só MAX:30 e Treino da Fera. 👁️" : "De volta à visão de dono: tudo liberado.", 3500);
    }
    else if (t.dataset.principal) {
      const x = progDe(t.dataset.principal);
      if (x && travado(x.k)) { toast(`🔒 ${x.nome}: ${motivoTrava(x.k)}.`, 4500); return; }
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
    } else if (t.dataset.evoMax) { evoMax = t.dataset.evoMax; $("#max-box").innerHTML = cartaoMaxOut(); }
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
      if (insFeito(p, k) !== era) { render(); if (insFeito(p, k)) { toast(`Treino concluído! 🔥 ${sequencia()} ${sequencia() === 1 ? "dia" : "dias"} seguidos`); convidarPost(); }; }
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
      if (l.done) { toast(`Treino concluído! 🔥 ${sequencia()} ${sequencia() === 1 ? "dia" : "dias"} seguidos`); convidarPost(); };
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
      const blob = new Blob([JSON.stringify({ app: "fitai", versao: 1, inicio: S.inicio, perfil: S.perfil, logs: S.logs, ...Object.fromEntries(VKEYS.map((p) => [p, S[p]])), ...Object.fromEntries(IAK.map((k) => [k, S[k]])), conquistas: S.conquistas || {} }, null, 2)], { type: "application/json" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob); a.download = `fitai-backup-${hojeKey}.json`; a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    } else if (t.id === "importar") {
      $("#arquivo").click();
    } else if (t.dataset.ask) {
      const ex = TODOS_EX.find((x) => x.id === t.dataset.ask);
      openChat(`Como executar corretamente o exercício ${ex.nome}? Quais são os erros comuns?`);
    } else if (t.hasAttribute("data-open-chat")) openChat();
    else if (t.hasAttribute("data-evo-foto")) openChat("Evolução por foto");
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
      for (const k of IAK) if (d[k] && typeof d[k].logs === "object") S[k] = { ...S[k], ...(S[k].plano ? {} : d[k]), logs: { ...S[k].logs, ...d[k].logs } };
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
  const CHIPS_PADRAO = ["Treino de hoje", "Minha evolução", "Evolução por foto", "Como funciona o programa?"];
  const CHIPS_HOJE = ["Insanity", "Calistenia", "Hipertrofia", ...(window.FITAI_CORRIDA ? ["Corrida"] : []), "CrossFit", "Nutrição", "Minha evolução", "Evolução por foto"];
  const CHIPS_NUTRI = ["O que comer antes do treino?", "O que comer depois do treino?", "Monte um cardápio para hoje", "Quanto de proteína eu preciso?"];
  let chatLog = [], chatPapel = "coach"; // "coach" ou "nutri" (Nutri AI): cada papel tem a sua conversa
  const chatLogs = { coach: chatLog, nutri: [] };
  function trocarPapel(papel) {
    chatLogs[chatPapel] = chatLog; chatPapel = papel; chatLog = chatLogs[papel];
    const nutri = papel === "nutri";
    $("#chat-nome").textContent = nutri ? "Nutri AI" : "Coach AI";
    $(".chat-sheet").setAttribute("aria-label", nutri ? "Nutri AI" : "Coach AI");
    $(".chat-head .coach-avatar img").src = A(nutri ? "nutri-active.svg" : "sparkles-blue.svg");
    chipsEl.innerHTML = "";
    if (!nutri && iaChat) setTimeout(() => iaPergunta(iaChat, 0), 0); // volta para a entrevista que estava aberta
  }
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
    box.classList.toggle("wrap", box === chipsEl && !!iaChat); // na entrevista as opções quebram linha (todas à vista)
  }
  function openChat(pergunta, papel = "coach") {
    if (papel !== chatPapel) trocarPapel(papel);
    layer.hidden = false;
    layer.classList.remove("closing");
    if (!chatLog.length) chatLog.push({ html: chatPapel === "nutri"
      ? `Oi, ${esc(primeiroNome())}! Sou a Nutri AI 🥗 Posso te ajudar com o que comer, quando e quanto, de acordo com os seus treinos e objetivos.`
      : `Olá, ${esc(primeiroNome())}! O que vamos fazer hoje? 💪`, me: false });
    const analisar = chatPapel === "coach" && !pergunta && !iaChat && chatLog.length === 1 && !chatLog[0].analise && ultimoTreinoInfo();
    if (analisar) chatLog[0] = { html: `Olá, ${esc(primeiroNome())}! Dei uma olhada no seu último treino (${esc(analisar.quando)} · ${esc(analisar.titulo)}). 👀`, me: false, analise: true };
    msgsEl.innerHTML = chatLog.filter((m) => !m.oculto).map(bubbleHTML).join("");
    msgsEl.scrollTop = msgsEl.scrollHeight;
    if (!chipsEl.children.length) setChips(chipsEl, chatPapel === "nutri" ? CHIPS_NUTRI : CHIPS_HOJE);
    if (analisar) analisarUltimo(analisar);
    else if (pergunta) send(pergunta);
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
    const coach = chatPapel === "coach";
    if (coach && iaChat) { addMsg(msgsEl, esc(texto), true, chatLog); iaChatResposta(texto); return; }
    if (coach && (LINK_VIDEO.test(texto) || (desafioRascunho && /^(lançar no grupo|lançar em todos os grupos|editar antes de lançar)$/i.test(texto)))) { desafioNoChat(texto); return; }
    if (coach && atalhoHoje(texto)) return;
    busy = true;
    addMsg(msgsEl, esc(texto), true, chatLog);
    chatLog[chatLog.length - 1].txt = texto;
    if (!iaOff) {
      const ok = await coachIA();
      if (ok) { setChips(chipsEl, coach ? CHIPS_PADRAO : CHIPS_NUTRI); busy = false; return; }
    }
    const r = coach ? responder(texto) : { html: "A Nutri AI está offline agora. Enquanto isso, veja suas metas de calorias, proteína e água na aba Nutrição. 🥗", chips: CHIPS_NUTRI };
    const stop = typing(msgsEl);
    await wait(650 + Math.min(1200, r.html.length * 3));
    stop();
    addMsg(msgsEl, r.html, false, chatLog);
    setChips(chipsEl, r.chips || CHIPS_PADRAO);
    busy = false;
  }
  /* O Coach começa sempre pela análise do último treino concluído (de qualquer programa). A análise fica guardada
     por treino: reabrir o chat mostra a mesma sem gastar o limite; um treino novo (ou editado) pede outra. */
  const NOME_PROGRAMA = (p) => ({ calistenia: NOME_PROG, cf: "CrossFit", corrida: "Atividade pelo print" }[p] || progDe(p)?.nome || VP[p]?.nome || IA[p]?.nome || p);
  function ultimoTreinoInfo() {
    const rows = feitas(linhasLocais());
    if (!rows.length) return null;
    const k = rows.map((r) => r.data).sort().pop(), doDia = rows.filter((r) => r.data === k);
    const dif = diffDays(parseKey(k), hoje);
    return { k, quando: dif === 0 ? "hoje" : dif === 1 ? "ontem" : `${DIAS[parseKey(k).getDay() === 0 ? 6 : parseKey(k).getDay() - 1]}, ${ddmm(k)}`,
      titulo: doDia.map((r) => r.titulo).join(" + ").slice(0, 70),
      assin: k + "|" + doDia.map((r) => `${r.programa}:${r.minutos}:${JSON.stringify(r.detalhes).length}`).join(","),
      texto: doDia.map((r) => `- ${NOME_PROGRAMA(r.programa)} · ${r.titulo} · ${r.minutos} min. Registro: ${JSON.stringify(r.detalhes).slice(0, 1800)}`).join("\n") };
  }
  async function analisarUltimo(u) {
    const salva = S.coachAnalise?.assin === u.assin ? S.coachAnalise.txt : "";
    const pedido = { html: "", me: true, oculto: true, txt: `Analise o meu último treino concluído (${u.k}, ${u.quando}):\n${u.texto}\n\nCompare com os treinos anteriores do mesmo tipo que estão no contexto (cargas, repetições, tempos, resultado do WOD, ritmo). Diga em poucas linhas: como foi, o que evoluiu ou caiu (com números), 1 ponto forte, 1 ponto a melhorar e o que fazer no próximo treino. Termine perguntando o que vamos fazer hoje.` };
    if (salva) { chatLog.push(pedido, { html: md(salva), txt: salva, me: false }); msgsEl.insertAdjacentHTML("beforeend", bubbleHTML(chatLog[chatLog.length - 1])); msgsEl.scrollTop = msgsEl.scrollHeight; return; }
    const desistir = () => { const i = chatLog.indexOf(pedido); if (i >= 0) chatLog.splice(i, 1); addMsg(msgsEl, "O que vamos fazer hoje? 💪", false, chatLog); };
    if (iaOff) { desistir(); return; }
    busy = true; chatLog.push(pedido);
    const ok = await coachIA();
    const resp = chatLog[chatLog.length - 1];
    if (ok && resp && !resp.me && resp.txt) { S.coachAnalise = { assin: u.assin, txt: resp.txt.slice(0, 4000) }; save(); }
    else desistir();
    setChips(chipsEl, CHIPS_HOJE); busy = false;
  }
  // Link de reel no chat do Coach: monta o desafio do grupo e oferece lançar ou editar
  async function desafioNoChat(texto) {
    busy = true;
    addMsg(msgsEl, esc(texto), true, chatLog);
    const fala = async (html, chips = CHIPS_PADRAO) => { const stop = typing(msgsEl); await wait(500); stop(); addMsg(msgsEl, html, false, chatLog); setChips(chipsEl, chips); busy = false; };
    if (!uid) return fala("Desafio é coisa de grupo: entre na sua conta e entre num grupo para lançar. 🤝");
    if (!G.grupos) await carregarGrupos(true);
    const g = grupoSel();
    if (!g) return fala("Você ainda não está em nenhum grupo. Crie um ou entre com um código na aba <b>Grupo</b> e me mande o link de novo. 🤝", ["Abrir o grupo"]);
    if (/^editar antes de lançar$/i.test(texto)) { formDesafio = "link"; busy = false; closeChat(); location.hash = "#/grupo"; render(); return; }
    if (/^lançar (no grupo|em todos os grupos)$/i.test(texto)) {
      const d = desafioRascunho, todos = /todos/i.test(texto), alvos = todos ? G.grupos : [g];
      let ok = 0, ja = 0;
      for (const gr of alvos) {
        const capa = d.capa ? await subirCapa(d.capa, gr.id) : null;
        const { error } = await sb.from("desafios").insert({ grupo_id: gr.id, semana: semanaAtual(), titulo: d.titulo, descricao: d.descricao, link: d.link, medida: d.medida, prazo: prazoDe("dom"), criado_por: uid, ...(capa ? { capa } : {}) });
        if (!error) ok++; else if (/duplicate|unique/i.test(error.message)) ja++;
      }
      if (!ok) return fala(ja ? `${todos ? "Todos os grupos já têm" : "O grupo já tem"} o desafio desta semana. Ele fica guardado: toque em <b>Editar antes de lançar</b> na semana que vem.` : "Não consegui lançar agora. Tente de novo.");
      desafioRascunho = null; formDesafio = null; carregarGrupos(true);
      return fala(todos ? `Desafio lançado em <b>${ok} ${ok === 1 ? "grupo" : "grupos"}</b>${ja ? ` (${ja} já ${ja === 1 ? "tinha" : "tinham"} o desta semana)` : ""}! ⚔️ Vale até domingo; para mudar o prazo, toque em <b>Editar desafio</b> no grupo.` : `Desafio lançado no grupo <b>${esc(g.nome)}</b>! ⚔️ Vale até domingo; para mudar o prazo, toque em <b>Editar desafio</b> no grupo.`, ["Abrir o grupo"]);
    }
    const bruto = texto.match(LINK_VIDEO)[0], link = linkCompleto(bruto), nota = texto.replace(bruto, "").trim();
    const stop = typing(msgsEl);
    try {
      const j = await desafioDoLink(link, nota);
      stop();
      desafioRascunho = { ...j.desafio, link, nota, duvida: j.duvida, capa: j.capa || "" };
      const ja = desafioDaSemana();
      addMsg(msgsEl, `${j.capa ? `<img class="dsf-capa-chat" src="${esc(j.capa)}" alt="Capa do vídeo">` : ""}Montei o desafio a partir do vídeo${j.fonte?.leu ? "" : " (não consegui ler a legenda, usei a capa e o que você escreveu)"}:<br><br><b>${esc(j.desafio.titulo)}</b><br>${esc(j.desafio.descricao)}<br><small>Como medir: ${esc(MEDIDAS[j.desafio.medida])}</small>${j.duvida ? `<br><br>⚠️ ${esc(j.duvida)}` : ""}${ja ? `<br><br>O grupo <b>${esc(g.nome)}</b> já tem o desafio desta semana (<b>${esc(ja.titulo)}</b>).` : ""}`, false, chatLog);
      setChips(chipsEl, ja ? ["Editar antes de lançar", ...(G.grupos.length > 1 ? ["Lançar em todos os grupos"] : [])] : ["Lançar no grupo", ...(G.grupos.length > 1 ? ["Lançar em todos os grupos"] : []), "Editar antes de lançar"], true);
    } catch (e) { stop(); addMsg(msgsEl, esc(e.message), false, chatLog); setChips(chipsEl, CHIPS_PADRAO); }
    busy = false;
  }
  // Chips "O que vamos fazer hoje?": abrem o treino do programa escolhido (ou a entrevista do Hipertrofia)
  function atalhoHoje(texto) {
    const t = norm(texto);
    const fera = norm(NOME_PROG);
    if (t === "nutricao") { openChat(null, "nutri"); return true; }
    if (t === "abrir o grupo") { closeChat(); location.hash = "#/grupo"; return true; }
    if (t === "evolucao por foto" || t === "ver ultima analise" || t === "apagar minhas fotos") { evoChip(t, texto); return true; }
    if (!["insanity", "calistenia", "hipertrofia", "academia", "crossfit", "ver meu treino", "calistenia 21 dias", "corrida", "corrida e hibrido", fera].includes(t)) return false;
    addMsg(msgsEl, esc(texto), true, chatLog);
    const ir = async (msg, hash) => {
      const stop = typing(msgsEl); await wait(450); stop();
      addMsg(msgsEl, msg, false, chatLog);
      await wait(900);
      setChips(chipsEl, CHIPS_HOJE); // na próxima vez que abrir, o Coach oferece de novo as opções do dia
      if (location.hash === hash) closeChat(); else location.hash = hash;
    };
    const irIA = (pk) => {
      if (!S[pk].plano) { iaIniciarChat(pk); return; }
      const h = iaHoje(pk), t = h && iaSessao(pk, h.d, h.w);
      ir(t ? `Bora de <b>${esc(IA[pk].nome)}</b>! Hoje é <b>${esc(t.titulo)}</b>. Abrindo… 💪` : iaAcabou(pk) ? `Você concluiu os 21 dias! 🏆 Abrindo para montar o próximo ciclo.` : `Hoje é dia de descanso no ${esc(IA[pk].nome)}. Abrindo o plano da semana.`, iaLinkHoje(pk));
    };
    if (t === "calistenia") {
      // Duas calistenias: pergunta qual (o 21 dias montado pelo Coach ou o programa fixo)
      (async () => {
        const stop = typing(msgsEl); await wait(450); stop();
        addMsg(msgsEl, IA.c21 && S.c21.plano ? "Qual calistenia hoje?" : `Qual calistenia? Posso seguir o <b>${esc(NOME_PROG)}</b> ou montar com você uma <b>Calistenia 21 dias</b> no seu nível (peso do corpo ou barra fixa).`, false, chatLog);
        setChips(chipsEl, [...(IA.c21 ? ["Calistenia 21 dias"] : []), NOME_PROG]);
      })();
    } else if (t === fera) {
      const { w, d } = ativoHoje(), tr = treino(w, d);
      ir(tr ? `Bora de <b>${esc(NOME_PROG)}</b>! Hoje é <b>${esc(tr.titulo)}</b>. Abrindo… 💪` : `Abrindo o <b>${esc(NOME_PROG)}</b>… 💪`, tr ? `#/treino/${w}/${d}` : "#/plano");
    } else if (t === "calistenia 21 dias") irIA("c21");
    else if (t === "insanity") {
      const P = VP[principal()] || VPROGS.find((x) => S[x.k].inicio) || VPROGS[0];
      if (!P) { ir("Nenhum programa do Insanity disponível.", "#/home"); return true; }
      const h = insHoje(P.k), tit = h ? insDia(P.k, h.w, h.d).titulo : "";
      ir(`Bora de <b>${esc(P.nome)}</b>!${tit ? ` Hoje é <b>${esc(tit)}</b>.` : ""} Abrindo… 🔥`, linkHojeVideo(P.k));
    } else if (t === "crossfit") {
      const l = cfLog();
      ir(l?.wod ? `Bora de <b>CrossFit</b>! Hoje é <b>${esc(l.wod.titulo)}</b>. Abrindo… 🔥` : `Bora de <b>CrossFit</b>! Tire uma foto do quadro do box e eu lanço o WOD para você. 📷`, "#/cf");
    } else if ((t === "corrida" || t === "corrida e hibrido") && IA.run) irIA("run");
    else if (t === "ver meu treino") irIA(iaUltimo || "hiper");
    else irIA("hiper");
    return true;
  }

  /* ---------- Evolução por foto (check-in de frente e de lado a cada 15 dias, só a pessoa vê) ---------- */
  // Fotos no bucket privado "evolucao" (<uid>/<data>-frente.jpg); a tabela "evolucao" guarda data, peso e a análise.
  // As regras do Supabase só deixam a própria pessoa ler, enviar e apagar. Nada disso aparece no grupo.
  const EVO_DIAS = 15;
  let evoRows = null, evoArq = {}, evoOcupado = false;
  const evoData = (k) => parseKey(k).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
  const evoDias = (a, b) => Math.round((parseKey(b) - parseKey(a)) / 864e5);
  async function evoCarregar() {
    const { data, error } = await sb.from("evolucao").select("data,frente,lado,peso,analise").order("data");
    if (error) throw error;
    return (evoRows = data || []);
  }
  async function evoUrls(rows) {
    const caminhos = rows.flatMap((r) => [r.frente, r.lado]).filter(Boolean);
    if (!caminhos.length) return {};
    const { data } = await sb.storage.from("evolucao").createSignedUrls(caminhos, 3600);
    return Object.fromEntries((data || []).filter((x) => x.signedUrl).map((x) => [x.path, x.signedUrl]));
  }
  const evoFotosHtml = (rows, urls) => `<div class="evo-cks">${rows.map((r) => `<figure class="evo-ck">
      <div class="evo-par">${["frente", "lado"].map((k) => r[k] && urls[r[k]] ? `<img src="${esc(urls[r[k]])}" alt="Foto de ${k} de ${evoData(r.data)}" loading="lazy">` : "").join("")}</div>
      <figcaption>${evoData(r.data)}${r.peso ? ` · ${String(r.peso).replace(".", ",")} kg` : ""}</figcaption></figure>`).join("")}</div>`;
  const evoFormHtml = () => `<form class="evo-form" data-evo-form>
      <div class="evo-slots">${["frente", "lado"].map((k) => `<label class="evo-slot"><input type="file" accept="image/*" name="${k}" hidden>
        <span class="evo-ph">${icon("camera.svg", 22)}<b>${k === "frente" ? "De frente" : "De lado"}</b></span></label>`).join("")}</div>
      <p class="evo-dica">Pode mandar só uma. Para comparar melhor: mesma luz, mesma distância, roupa de treino e corpo relaxado.</p>
      <button class="btn btn-blue" type="submit" disabled>Analisar evolução</button></form>`;
  async function evoBolha(html, chips) {
    const stop = typing(msgsEl); await wait(350); stop();
    addMsg(msgsEl, html, false, chatLog);
    if (chips) setChips(chipsEl, chips);
  }
  async function evoChip(t, texto) {
    addMsg(msgsEl, esc(texto), true, chatLog);
    if (!uid || !sb) { evoBolha(`<p>A análise de evolução por foto precisa de uma conta, para guardar suas fotos com segurança. 🔒</p><p>Entre no <b>Perfil</b> e volte aqui.</p>`, CHIPS_PADRAO); return; }
    if (Number(S.perfil.idade) > 0 && Number(S.perfil.idade) < 18) { evoBolha("A análise de evolução por foto é só para maiores de 18 anos. Sigo te ajudando com os treinos! 💪", CHIPS_PADRAO); return; }
    const stop = typing(msgsEl);
    let rows;
    try { rows = await evoCarregar(); } catch (e) { console.error("evolucao", e); stop(); addMsg(msgsEl, "Não consegui abrir suas fotos agora. Tente de novo em instantes.", false, chatLog); return; }
    stop();
    if (t === "apagar minhas fotos") return evoApagar(rows);
    if (t === "ver ultima analise") {
      const r = [...rows].reverse().find((x) => x.analise);
      if (!r) { evoBolha("Ainda não há análise salva.", ["Evolução por foto"]); return; }
      const urls = await evoUrls([r]).catch(() => ({}));
      addMsg(msgsEl, `<p><b>Check-in de ${evoData(r.data)}</b></p>${evoFotosHtml([r], urls)}${md(r.analise)}`, false, chatLog);
      setChips(chipsEl, ["Evolução por foto", "Apagar minhas fotos", "Treino de hoje"]);
      return;
    }
    const ult = rows[rows.length - 1];
    const falta = ult ? EVO_DIAS - evoDias(ult.data, hojeKey) : 0;
    const pode = !ult || falta <= 0 || (ult.data === hojeKey && !ult.analise);
    const urls = rows.length ? await evoUrls(rows.slice(-3)).catch(() => ({})) : {};
    const intro = !rows.length
      ? `<p>Vamos acompanhar sua evolução por foto! 📸 Mande uma foto <b>de frente</b> e uma <b>de lado</b>; a cada ${EVO_DIAS} dias você manda outras e eu comparo.</p><p>🔒 As fotos são <b>só suas</b>: ficam guardadas na sua conta e <b>não aparecem no grupo</b>. Você pode apagar quando quiser.</p>`
      : `<p>Seus check-ins (${rows.length}):</p>${evoFotosHtml(rows.slice(-3), urls)}`;
    const chips = rows.some((r) => r.analise) ? ["Ver última análise", "Apagar minhas fotos"] : rows.length ? ["Apagar minhas fotos"] : CHIPS_PADRAO;
    if (pode) {
      evoArq = {};
      msgsEl.querySelectorAll("[data-evo-form]").forEach((f) => f.closest(".msg")?.remove()); // um formulário por vez
      for (const m of chatLog) if (m.evoForm) { m.html = m.html.replace(/<form class="evo-form"[\s\S]*<\/form>/, ""); m.evoForm = false; }
      await evoBolha(`${intro}${evoFormHtml()}`, chips);
      chatLog[chatLog.length - 1].evoForm = true;
    } else {
      const prox = new Date(parseKey(ult.data).getTime() + EVO_DIAS * 864e5);
      evoBolha(`${intro}<p>Próximo check-in liberado em <b>${prox.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })}</b> (${falta === 1 ? "falta 1 dia" : `faltam ${falta} dias`}). Intervalo de ${EVO_DIAS} dias deixa a mudança aparecer na foto. 😉</p>`, chips);
    }
  }
  async function evoBlob(arquivo) {
    let b64 = await cfReduzir(arquivo, 1280, 0.8);
    if (b64.length > 1_300_000) b64 = await cfReduzir(arquivo, 960, 0.7);
    const bin = atob(b64), u = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i);
    return new Blob([u], { type: "image/jpeg" });
  }
  msgsEl.addEventListener("change", async (e) => {
    const inp = e.target.closest("[data-evo-form] input[type=file]");
    if (!inp || !inp.files[0]) return;
    if (!/^image\//.test(inp.files[0].type)) { toast("Escolha uma imagem."); return; }
    try { evoArq[inp.name] = await evoBlob(inp.files[0]); } catch { toast("Não consegui abrir essa imagem."); return; }
    const ph = inp.parentElement.querySelector(".evo-ph");
    ph.innerHTML = `<img src="${URL.createObjectURL(evoArq[inp.name])}" alt=""><b>${inp.name === "frente" ? "De frente" : "De lado"} ✓</b>`;
    inp.form.querySelector("button[type=submit]").disabled = false;
  });
  msgsEl.addEventListener("submit", (e) => { if (e.target.matches("[data-evo-form]")) { e.preventDefault(); evoEnviar(e.target); } });
  async function evoEnviar(form) {
    if (evoOcupado || busy || !(evoArq.frente || evoArq.lado)) return;
    evoOcupado = busy = true;
    const btn = form.querySelector("button[type=submit]");
    btn.disabled = true; btn.textContent = "Enviando fotos…";
    const data = hojeKey, rows = evoRows || [];
    const reg = { usuario_id: uid, data, frente: null, lado: null, peso: Number(S.perfil.peso) || null, analise: null };
    try {
      for (const k of ["frente", "lado"]) {
        const caminho = `${uid}/${data}-${k}.jpg`;
        if (evoArq[k]) {
          const up = await sb.storage.from("evolucao").upload(caminho, evoArq[k], { upsert: true, contentType: "image/jpeg", cacheControl: "60" });
          if (up.error) throw up.error;
          reg[k] = caminho;
        } else if (rows.some((r) => r.data === data && r[k])) await sb.storage.from("evolucao").remove([caminho]); // refez hoje sem esse ângulo
      }
      const { error } = await sb.from("evolucao").upsert(reg, { onConflict: "usuario_id,data" });
      if (error) throw error;
    } catch (e) {
      console.error("evolucao envio", e); toast("Não consegui enviar as fotos. Tente de novo.");
      btn.disabled = false; btn.textContent = "Analisar evolução"; evoOcupado = busy = false; return;
    }
    // O formulário vira as miniaturas do que foi enviado
    const m = chatLog.find((x) => x.evoForm);
    if (m) { m.evoForm = false; m.html = m.html.replace(/<form class="evo-form"[\s\S]*<\/form>/, `<p>Fotos de ${evoData(data)} enviadas ✓</p>`); }
    form.outerHTML = `<p>Fotos de ${evoData(data)} enviadas ✓</p>`;
    evoArq = {};
    const ant = rows.filter((r) => r.data < data);
    const anteriores = [ant[0], ant[ant.length - 1]].filter((x, i, a) => x && a.indexOf(x) === i).map(({ data, frente, lado, peso }) => ({ data, frente, lado, peso }));
    const token = await tokenSB(), stop = typing(msgsEl);
    let r;
    try {
      r = await fetch("/api/evolucao", { method: "POST", headers: { "content-type": "application/json", authorization: `Bearer ${token}` },
        body: JSON.stringify({ atual: reg, anteriores, idade: S.perfil.idade || null, contexto: contextoTexto(false).slice(0, 3000) }) });
    } catch { r = null; }
    if (!r || !r.ok || !r.body) {
      stop();
      const e = r ? await r.json().catch(() => ({})) : {};
      addMsg(msgsEl, e.erro === "limite" ? "Você chegou ao limite de análises de hoje. Suas fotos ficaram salvas: volte amanhã e toque em <b>Evolução por foto</b> para analisar." : "Suas fotos ficaram salvas, mas não consegui analisar agora. Toque em <b>Evolução por foto</b> para tentar de novo.", false, chatLog);
      setChips(chipsEl, ["Evolução por foto"]); evoOcupado = busy = false; return;
    }
    stop();
    const msg = { html: "", me: false, txt: "" };
    chatLog.push(msg);
    msgsEl.insertAdjacentHTML("beforeend", bubbleHTML(msg));
    const bolha = msgsEl.lastElementChild.querySelector(".bubble");
    const leitor = r.body.getReader(), dec = new TextDecoder();
    for (;;) {
      const { value, done } = await leitor.read();
      if (done) break;
      msg.txt += dec.decode(value, { stream: true });
      if (!msg.txt.trim()) continue;
      msg.html = md(msg.txt); bolha.innerHTML = msg.html;
      msgsEl.scrollTop = msgsEl.scrollHeight;
    }
    msg.txt = msg.txt.trim();
    const falhou = !msg.txt || /^\[Falha|\[Muitos pedidos/.test(msg.txt);
    if (!msg.txt) { msg.txt = "Não consegui analisar agora. Toque em Evolução por foto para tentar de novo."; msg.html = md(msg.txt); bolha.innerHTML = msg.html; }
    if (!falhou) {
      const { error } = await sb.from("evolucao").update({ analise: msg.txt.slice(0, 8000) }).eq("usuario_id", uid).eq("data", data);
      if (error) console.error("evolucao analise", error);
      else { const i = rows.findIndex((x) => x.data === data); const novo = { ...reg, analise: msg.txt }; if (i >= 0) rows[i] = novo; else rows.push(novo); }
    }
    setChips(chipsEl, ["Evolução por foto", "Treino de hoje", "Minha evolução"]);
    evoOcupado = busy = false;
  }
  async function evoApagar(rows) {
    if (!rows.length) { evoBolha("Você não tem fotos de evolução salvas.", CHIPS_PADRAO); return; }
    if (!confirm(`Apagar suas ${rows.length === 1 ? "fotos do check-in" : `fotos dos ${rows.length} check-ins`} e as análises? Não dá para desfazer.`)) { evoBolha("Tudo certo, nada foi apagado.", ["Evolução por foto"]); return; }
    try {
      const caminhos = rows.flatMap((r) => [r.frente, r.lado]).filter(Boolean);
      if (caminhos.length) { const { error } = await sb.storage.from("evolucao").remove(caminhos); if (error) throw error; }
      const { error } = await sb.from("evolucao").delete().eq("usuario_id", uid);
      if (error) throw error;
      evoRows = [];
      for (const m of chatLog) if (/class="evo-cks"/.test(m.html)) m.html = m.html.replace(/<div class="evo-cks">[\s\S]*?<\/figure><\/div>/, "<p><i>Fotos apagadas.</i></p>");
      msgsEl.querySelectorAll(".evo-cks").forEach((el) => { el.outerHTML = "<p><i>Fotos apagadas.</i></p>"; });
      evoBolha("Pronto: suas fotos e análises de evolução foram apagadas. 🗑️", CHIPS_PADRAO);
    } catch (e) { console.error("evolucao apagar", e); evoBolha("Não consegui apagar agora. Tente de novo.", ["Apagar minhas fotos"]); }
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
      `Vídeos: ${P.videos.map((v) => `${v.nome}${v.min ? ` (${v.min} min)` : ""} — ${v.desc}${v.musculos ? ` Músculos: ${v.musculos}.` : ""}`).join("; ")}`,
      estTexto(P)].filter(Boolean).join("\n")).join("\n\n");
    const caminho = [`# Programas do app e caminho recomendado (do mais acessível ao mais avançado)`,
      ...TRILHA.map((x, i) => `${i + 1}. ${x.nome} — nível ${x.nivel}. ${x.sobre}`),
      `Caminho natural: ${caminhoTxt()}. Quem está começando ou voltando começa pelo ${TRILHA[0].nome}.`,
      `Fora do caminho, montados pelo Coach AI depois de uma entrevista: ${HIPER.nome} (academia) — ${HIPER.sobre} | ${C21.nome} — ${C21.sobre}`,
      `Também fora do caminho: ${CF.nome} — ${CF.sobre} Fica na aba CrossFit (menu → Treinos → CrossFit).`,
      "Como recomendar: pergunte (ou use o contexto) o nível e a rotina da pessoa e indique UM programa para começar, explicando o porquê em uma frase. Iniciante → 1º programa; já treina com regularidade → 2º; treina pesado e faz barra → 3º. Na dúvida, o mais acessível.",
      "Quando avançar: ao terminar o programa atual com constância (poucas faltas) e evolução clara (Max Out mais tarde nos vídeos do MAX:30; mais repetições no Fit Test do Insanity), sugira o próximo do caminho. Se a pessoa falhou muitos treinos ou parou mais de 2 semanas, sugira repetir o programa atual em vez de avançar.",
      "Para trocar o programa principal no app: Perfil → Seu programa principal."].join("\n");
    return [caminho, `# Programa: ${NOME_PROG} (nível ${CALI.nivel})`, ...sem, `## Treino de emergência (15 min)\n${EMERGENCIA.ex.map((e) => "- " + linhaEx(e)).join("\n")}`,
      CICLO, ins, ...IAK.map(iaProgramaTexto)].filter(Boolean).join("\n\n");
  }
  function contextoTexto(comCorridas) {
    const { w, d } = ativoHoje(), t = treino(w, d);
    const P = S.perfil, out = [];
    out.push(`Hoje: ${DIAS[hojeDia]}, ${hojeKey}. ${nomeSemana(w)}, ciclo ${cicloDe(hoje)}. Treino de hoje: ${t ? t.titulo : "—"}.`);
    out.push(`Perfil: ${P.peso || "?"} kg, ${P.altura || "?"} cm, ${P.idade || "?"} anos. Sequência atual: ${sequencia()} dias. Treinos concluídos: ${treinosFeitos()}.`);
    out.push(`Nível informado: ${S.nivel || "não informado"}. Programa principal: ${progDe(principal())?.nome || NOME_PROG}.`);
    if (S.quiz) { const q = S.quiz; out.push(`Quiz de entrada: objetivo ${qzTxt("objetivo", q.objetivo)}; treina ${qzTxt("local", q.local).toLowerCase()}; ${q.dias || "?"} dias por semana; ${q.tempo || "?"} min por treino; o que atrapalha: ${(q.obst || []).map((o) => qzTxt("obst", o)).join(", ") || "—"}; o que motiva: ${qzTxt("estilo", q.estilo)}.`); }
    { const cs = chefes(), vivos = cs.filter((c) => c.tem && !c.derrotado).sort((a, b) => a.hp - b.hp).slice(0, 3);
      out.push(`Chefes (metas de recorde): ${cs.filter((c) => c.derrotado).length} de ${cs.length} derrotados.${vivos.length ? ` Mais perto: ${vivos.map((c) => `${c.nome} (${c.desc}; marco ${fmtMarca(c.met, c.melhor)}, HP ${c.hp}%)`).join("; ")}.` : ""} Missões de hoje: ${missoesDe(hojeKey).map((m) => `${m.t} ${m.ok ? "(feita)" : `(${m.fmt(m.valor, m.alvoV)})`}`).join("; ")}.`); }
    { const e = estiloAtual(); out.push(`Estilo de treino (últimos 28 dias): ${e.slug ? `${e.nome} (${e.desc})` : "ainda sem estilo"}; divisão: ${TIPOS_TREINO.map(([k, nome]) => `${nome} ${e.pct[k]}%`).join(", ")}.`); }
    if (S.ficha) { const f = fichaAtual(); out.push(`Ficha de atleta: rank ${f.rank} (meta ${S.ficha.meta} até ${ddmm(keyOf(addDays(parseKey(S.ficha.metaIni), 30)))}), ${ATRIB.map(([k, r]) => `${r} ${f.attrs[k]}`).join(", ")} (0 a 100). Use os atributos mais baixos para sugerir o que treinar.`); }
    { const n = meuNivel(), at = etapaAtual(), g = at.p ? at.p() : null, T = TRILHAS[trilha()];
      const libs = CATALOGO.filter((x) => liberado(x.k)).map((x) => x.nome).join(", ");
      out.push(`Gamificação: nível ${n.nivel} (${n.classe}), ${n.xp} XP, faltam ${Math.max(0, n.fim - n.xp)} XP para o próximo nível. Trilha: ${T.nome}${trilha() === "hibrido" ? ` (força: ${progDe(forcaHibrido())?.nome})` : ""}. Etapa ${at.i + 1} de ${at.n}: ${at.nome}${g ? ` (${g.feitas}/${g.precisa} sessões para a formatura; teste de saída: ${g.teste}${g.final ? ", feito" : ", ainda não feito"})` : " (etapa contínua)"}. Meta da semana: ${metaSemana()} treinos. ${donoAtivo() ? "Conta do dono: todos os programas liberados." : `Programas liberados: ${libs}. Não recomende programas travados; se a pessoa quiser outro estilo, diga que dá para trocar de trilha no Perfil sem perder o XP.`}`); }
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
    for (const pk of IAK) { const c = iaContextoTexto(pk); if (c) out.push(c); }
    { const c = cfContextoTexto(); if (c) out.push(c); }
    { const a = Object.entries(S.corrida.logs).sort().slice(-12).flatMap(([k, l]) => (l.itens || []).map((x) => `- ${k} ${ativTitulo(x)}${x.tempo ? `, ${fmtDur(x.tempo)}` : ""}${x.km && x.tempo && x.tipo !== "bike" ? `, ritmo ${ritmo(x.tempo, x.km * 1000)}/km` : ""}${x.fc ? `, FC ${x.fc}` : ""}`));
      if (a.length) out.push("Corridas, caminhadas e pedaladas registradas pelo print:\n" + a.join("\n")); }
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
        body: JSON.stringify(chatPapel === "nutri" ? { papel: "nutri", mensagens, programa: nutriBase(), contexto: nutriContexto() }
          : { mensagens, programa: programaTexto(), contexto: contextoTexto(!!token && souDono) }) });
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
      return { html: `O caminho natural no FIT.AI é <b>${esc(caminhoTxt())}</b>.<br>${TRILHA.map((x, i) => `${i + 1}. <b>${esc(x.nome)}</b> (${esc(x.nivel)}): ${esc(x.sobre)}`).join("<br>")}<br><br>${S.nivel ? `Pelo seu nível (${esc(S.nivel)}), comece pelo <b>${esc(r.nome)}</b>.` : `Começando ou voltando? Vá de <b>${esc(TRILHA[0].nome)}</b>.`} Prefere academia? O <b>${esc(HIPER.nome)}</b> monta um treino de musculação só para você. E a <b>${esc(C21.nome)}</b> monta circuitos de calistenia no seu nível. Para trocar: Perfil → Seu programa principal.` };
    }
    if (t.includes("programa") || t.includes("funciona") || t.includes("semana")) {
      return { html: `O <b>${esc(NOME_PROG)}</b> tem ${PROGRAMA.length} semanas: ${PROGRAMA.map((s, i) => `<b>${i + 1}. ${s.nome}</b>`).join(", ")}. Você está na <b>Semana ${Math.max(0, semanaDe(hoje)) + 1}</b>${cicloDe(hoje) > 1 ? ` do ciclo ${cicloDe(hoje)}` : ""}. ${esc(CICLO)} Só aumente a dificuldade quando ficar claramente fácil.` };
    }
    if (/^(oi|ola|e ai|eai|bom dia|boa tarde|boa noite|hey)\b/.test(t)) return { html: `Fala, ${esc(primeiroNome())}! 👋 Bora treinar? Posso te mostrar o treino de hoje ou sua evolução.` };
    if (t.includes("dor") || t.includes("lesao") || t.includes("machuc")) return { html: "Se sentir dor aguda, pare o exercício. Dor articular ou que não passa merece avaliação de um profissional de saúde. Em dias assim, prefira uma variação mais leve (ex.: flexão com joelhos apoiados ou barra australiana)." };
    return { html: "Posso te ajudar com a execução dos exercícios (toque no <b>?</b> ao lado de cada um), mostrar o treino de hoje ou sua evolução. 😉" };
  }

  /* ---------- Onboarding ---------- */
  /* ==========================================================
     Insígnias de calistenia: cada dia do Treino da Fera vira um benchmark. Conta sozinho quando os treinos de um mesmo dia
     (Calistenia do Coach, Treino da Fera ou programa de exemplo) somam o que o dia pede. Bronze = valendo versões mais fáceis,
     prata = versões completas, ouro = completas em até o número de séries do programa. A Fera (chefe) cai com as 16.
     ========================================================== */
  // Categorias de movimento pelo nome do exercício. facil = versão mais fácil (vale bronze); seg = medido em segundos; conta = cada série vale 1
  const FCAT = {
    flexao: { re: /flex/, nao: /nordic|parada de mao|handstand|isometric|hold/, facil: /joelho|inclinad|negativ/ },
    diamante: { re: /diamante/ }, pike: { re: /pike/ },
    hspu: { re: /handstand push|flexao na parada|parada de mao com flex|hspu|pike/, facil: /pike/ },
    arqueiro: { re: /flex.*arque|arque.*flex/ },
    unilateral: { re: /flex.*(uma mao|unilateral|one.?arm)|push.?up com uma mao|flex.*arque/, facil: /arque/ },
    pseudo: { re: /pseudo/ },
    barra: { re: /barra|chin.?up|pull.?up/, nao: /escapul|bicep|tricep|joelho|knee|elevac|topo|panturrilha/, facil: /australiana|negativ|isometric|elastico/ },
    remada: { re: /remada|australiana/ },
    agachamento: { re: /agachamento|squat/, nao: /pistol|isometri|cadeirinha/ },
    pistol: { re: /pistol/, facil: /apoio|suporte|assist/ },
    afundo: { re: /afundo|lunge|bulgaro/ },
    abdominal: { re: /abdomina|crunch|sit.?up|canivete|v.?up/, nao: /pendurad/ },
    canivete: { re: /canivete|v.?up|jackknife/ },
    abdPend: { re: /pendurad|hanging|elevacao de (pernas|joelhos) na barra|knee.?raise|leg raise/, facil: /joelho|knee/ },
    pulos: { re: /pulo|polichinelo|jumping|corda|salto/ },
    ponte: { re: /ponte|glute bridge|elevacao pelvica/ }, panturrilha: { re: /panturrilha|calf/ },
    lsit: { re: /l.?sit/, seg: true }, dragon: { re: /dragon/ }, hollow: { re: /hollow/, seg: true },
    prancha: { re: /^prancha$|rkc|^plank/, seg: true },
    tiro: { re: /tiro/, conta: true },
  };
  // r: [categoria, total, séries do programa (ouro), mínimo por série]
  const FERA = [
    { k: "f100", nv: 1, nome: "100 Flexões", dia: "100 Flexões", r: [["flexao", 100, 5]] },
    { k: "b50", nv: 1, nome: "50 Barras", dia: "50 Barras", r: [["barra", 50, 5]] },
    { k: "desafio", nv: 1, nome: "Desafio da Fera", dia: "Desafio da Fera", r: [["flexao", 100, 5], ["abdominal", 100, 5], ["agachamento", 100, 5]] },
    { k: "core", nv: 1, nome: "Core de Ferro", dia: "Treino de Core", r: [["abdPend", 100, 5]] },
    { k: "p100", nv: 1, nome: "100 Pulos", dia: "100 Pulos", r: [["pulos", 100, 2]] },
    { k: "empurrar", nv: 2, nome: "Empurrar em Volume", dia: "Treino de Empurrar", r: [["flexao", 180, 12], ["pike", 45, 3], ["diamante", 45, 3]] },
    { k: "pernas", nv: 2, nome: "Pernas em Volume", dia: "Treino de Pernas", r: [["agachamento", 50, 1], ["pistol", 40, 4], ["afundo", 64, 4]] },
    { k: "disciplina", nv: 2, nome: "Disciplina", dia: "Treino de Disciplina", r: [["flexao", 100, 4, 25]] },
    { k: "puxar", nv: 2, nome: "Puxar em Volume", dia: "Treino de Puxar", r: [["barra", 64, 8], ["remada", 54, 6]] },
    { k: "autodisc", nv: 2, nome: "Autodisciplina", dia: "Autodisciplina", r: [["agachamento", 100, 10, 10]] },
    { k: "forca", nv: 3, nome: "Empurrada de Força", dia: "Empurrada de Força", r: [["hspu", 15, 5], ["unilateral", 12, 4], ["pseudo", 15, 3]] },
    { k: "discforca", nv: 3, nome: "Disciplina da Força", dia: "Disciplina da Força", r: [["pistol", 50, 5], ["unilateral", 50, 5], ["canivete", 50, 5]] },
    { k: "tensao", nv: 3, nome: "Core e Tensão", dia: "Core e Tensão Corporal", r: [["lsit", 50, 5], ["dragon", 12, 4], ["abdPend", 20, 4], ["hollow", 60, 3], ["prancha", 40, 4]] },
    { k: "superior", nv: 4, nome: "Supersérie Superior", dia: "Superior · Supersérie", r: [["flexao", 99, 11], ["barra", 30, 6], ["remada", 36, 3]] },
    { k: "inferior", nv: 4, nome: "Triset Inferior", dia: "Inferior · Triset", r: [["agachamento", 120, 6], ["ponte", 60, 3], ["panturrilha", 75, 6], ["afundo", 36, 3]] },
    { k: "tiros", nv: 4, nome: "5 Tiros de 200 m", dia: "Tiro · 5 × 200 m", r: [["tiro", 5, 5]] },
  ];
  const FERA_NV = ["", "Ativação", "Volume", "Densidade", "Vascularização"];
  // Séries de calistenia por dia, a partir das linhas (minhas ou de um membro): { data: [{ nome, v, seg }] }
  function seriesCaliPorDia(rows) {
    const out = {};
    for (const r of rows) {
      const d = r.detalhes || {}, add = (nome, v, seg) => v > 0 && (out[r.data] ||= []).push({ nome: norm(nome || ""), v, seg });
      if (r.programa === "calistenia") for (const [id, s] of Object.entries(d.sets || {})) { const e = EXI[id]; for (const v of s || []) add(e?.nome || id, Number(v) || 0, e?.un === "s" || e?.un === "min" ? true : e?.un === "tiro" ? "tiro" : false); }
      else if (IA[r.programa] && r.programa !== "hiper") for (const [id, s] of Object.entries(d.sets || {})) {
        const e = IA[r.programa].ci[id]; if (!e) continue; const un = e.med === "s" ? "s" : unDe(r.programa, e);
        for (const x of s || []) if (x && !x.kg) add(e.nome, Number(x.r) || 0, un === "s" || un === "min");
      }
    }
    return out;
  }
  function feraAvalia(ins, series) {
    let tier = 3; // 3 ouro, 2 prata, 1 bronze, 0 nada
    for (const [c, total, nSer, minSer = 0] of ins.r) {
      const C = FCAT[c], da = series.filter((x) => C.re.test(x.nome) && !(C.nao && C.nao.test(x.nome)) && (C.conta ? x.seg === "tiro" : !!C.seg === (x.seg === true)) && (C.conta || x.v >= minSer));
      const val = (x) => (C.conta ? 1 : x.v), cheias = da.filter((x) => !(C.facil && C.facil.test(x.nome)));
      const tudo = soma(da.map(val)), cheio = soma(cheias.map(val));
      const t = cheio >= total ? (cheias.length <= nSer ? 3 : 2) : tudo >= total ? 1 : 0;
      tier = Math.min(tier, t);
      if (!tier) break;
    }
    return tier;
  }
  const TIERS = ["", "bronze", "prata", "ouro"];
  function feraInsignias(rows) {
    const dias = seriesCaliPorDia(rows), ks = Object.keys(dias).sort();
    return FERA.map((ins) => {
      let melhor = 0, em = null;
      for (const k of ks) { const t = feraAvalia(ins, dias[k]); if (t > melhor) { melhor = t; em = k; } if (melhor === 3) break; }
      return { ...ins, tier: melhor, feito: melhor > 0, em };
    });
  }
  // Dia do Treino da Fera para "Tentar insígnia" (só quando o programa instalado é o Treino da Fera)
  function feraDiaWD(titulo) {
    if (!/fera/i.test(NOME_PROG)) return null;
    for (let w = 0; w < PROGRAMA.length; w++) { const d = PROGRAMA[w].dias.findIndex((x) => x && x.titulo === titulo); if (d >= 0) return [w, d]; }
    return null;
  }
  function feraHtml(rows, eu) {
    const ins = feraInsignias(rows), n = ins.filter((x) => x.feito).length;
    if (!n && !eu) return "";
    const tile = (x) => { const wd = eu && !x.feito ? feraDiaWD(x.dia) : null;
      return `<div class="ins-it ${x.feito ? `ins-${TIERS[x.tier]}` : "ins-off"}" title="${esc(x.nome)}${x.feito ? ` · ${TIERS[x.tier]} em ${ddmm(x.em)}` : ""}">
        <span class="ins-med">🦁</span><b>${esc(x.nome)}</b><small>${x.feito ? `${TIERS[x.tier][0].toUpperCase() + TIERS[x.tier].slice(1)} · ${ddmm(x.em)}` : esc(x.r.map(([c, t]) => `${t}${FCAT[c].seg ? " s" : ""} ${({ flexao: "flexões", barra: "barras", agachamento: "agach.", abdominal: "abdominais", abdPend: "abd. pendurado", pulos: "pulos", pike: "pike", diamante: "diamante", pistol: "pistols", afundo: "afundos", remada: "remadas", hspu: "HSPU", unilateral: "flexões 1 mão", pseudo: "pseudo planche", canivete: "canivetes", lsit: "L-sit", dragon: "dragon flag", hollow: "hollow", prancha: "prancha", ponte: "pontes", panturrilha: "panturrilhas", tiro: "tiros" })[c]}`).join(" · "))}</small>
        ${wd ? `<a class="ins-try" href="#/treino/${wd[0]}/${wd[1]}">Tentar</a>` : ""}</div>`; };
    return `<div class="ins-box fera-box">
      <div class="fera-capa"><img src="assets/chefes/fera.webp" alt=""><div><span class="ch-bn-k">Insígnias de calistenia</span><b>Treino da Fera</b><small>${n} de ${FERA.length} conquistadas</small></div></div>
      ${[1, 2, 3, 4].map((nv) => `<div class="sec-head" style="margin-top:12px"><h2>Nível ${nv} · ${FERA_NV[nv]}</h2><span>${ins.filter((x) => x.nv === nv && x.feito).length}/${ins.filter((x) => x.nv === nv).length}</span></div>
        <div class="ins-grid">${ins.filter((x) => x.nv === nv).map(tile).join("")}</div>`).join("")}
      ${eu ? `<p class="note small">Cada dia do Treino da Fera vira uma insígnia. Ela vem sozinha quando os seus treinos de calistenia de um mesmo dia somam o que o dia pede: <b>bronze</b> valendo versões mais fáceis (flexão de joelhos, barra australiana ou negativa, pistol com apoio), <b>prata</b> com as versões completas e <b>ouro</b> completas em até o número de séries do programa.</p>` : ""}</div>`;
  }

  /* ==========================================================
     Ligas: cada modalidade tem insígnias (bronze, prata, ouro) e um chefe que cai quando todas são conquistadas.
     Cross = Lobo (benchmarks), Calistenia = Fera (dias do Treino da Fera + recordes), Corrida = Pantera,
     Híbrido = Jacaré, Hipertrofia = Gorila, Insanity = Canguru. Tudo sai das linhas de treino, então vale para o perfil dos membros.
     ========================================================== */
  const tierPor = (v, lim, menor = false) => (menor ? (v > 0 && v < lim[2] ? 3 : v > 0 && v < lim[1] ? 2 : v > 0 && v < lim[0] ? 1 : 0) : v >= lim[2] ? 3 : v >= lim[1] ? 2 : v >= lim[0] ? 1 : 0);
  const fmtKm = (v) => `${String(Math.round(v * 10) / 10).replace(".", ",")} km`;
  const semanaDe_ = (k) => keyOf(mondayOf(parseKey(k)));
  // Maior sequência de semanas seguidas dentro de um conjunto de segundas-feiras
  function semanasSeguidas(segundas) {
    const s = [...new Set(segundas)].sort(); let melhor = 0, atual = 0, prev = null;
    for (const k of s) { atual = prev && diffDays(parseKey(prev), parseKey(k)) === 7 ? atual + 1 : 1; melhor = Math.max(melhor, atual); prev = k; }
    return melhor;
  }
  const corridasLiga = (rows) => rows.filter((r) => r.programa === "corrida").flatMap((r) => (r.detalhes?.itens || []).filter((a) => /corrida|esteira/.test(a.tipo || "") && a.km > 0).map((a) => ({ data: r.data, km: Number(a.km) || 0, tempo: Number(a.tempo) || 0 })));

  // Calistenia: os recordes que antes eram chefes (meta numa série); bronze 60%, prata 80%, ouro 100% da meta
  const RECORDES_CALI = ["goblin", "troll", "gargula", "sentinela", "lich", "espectro"];
  function recordesCali(rows) {
    const dias = seriesCaliPorDia(rows), todas = Object.entries(dias).flatMap(([data, s]) => s.map((x) => ({ ...x, data })));
    return RECORDES.filter((c) => RECORDES_CALI.includes(c.k)).map((c) => {
      const meta = c.meta(), mine = todas.filter((x) => c.re.test(x.nome) && !(c.nao && c.nao.test(x.nome)) && (c.met === "s" ? x.seg === true : x.seg === false));
      let melhor = 0, em = null; for (const x of mine.sort((a, b) => a.data.localeCompare(b.data))) if (x.v > melhor) { melhor = x.v; em = x.data; }
      const tier = tierPor(melhor / meta, [0.6, 0.8, 1]);
      return { k: c.k, nome: c.nome, grupo: "Recordes", ic: c.ic, tier, em: tier ? em : null, pct: Math.min(100, Math.round((melhor / meta) * 100)), det: melhor ? `${fmtMarca(c.met, melhor)} de ${fmtMarca(c.met, meta)}` : c.desc };
    });
  }
  function caliIns(rows) {
    return [...feraInsignias(rows).map((x) => ({ k: x.k, nome: x.nome, grupo: `Nível ${x.nv} · ${FERA_NV[x.nv]}`, ic: "🦁", tier: x.tier, em: x.em, try: x.dia,
      det: x.feito ? "" : x.r.map(([c, t]) => `${t}${FCAT[c].seg ? " s" : ""} ${FERA_ROT[c]}`).join(" · ") })), ...recordesCali(rows)];
  }
  const FERA_ROT = { flexao: "flexões", barra: "barras", agachamento: "agach.", abdominal: "abdominais", abdPend: "abd. pendurado", pulos: "pulos", pike: "pike", diamante: "diamante", pistol: "pistols", afundo: "afundos", remada: "remadas", hspu: "HSPU", unilateral: "flexões 1 mão", pseudo: "pseudo planche", canivete: "canivetes", lsit: "L-sit", dragon: "dragon flag", hollow: "hollow", prancha: "prancha", ponte: "pontes", panturrilha: "panturrilhas", tiro: "tiros" };

  // Cross: os 17 benchmarks
  const crossIns = (rows, g) => insigniasBench(rows, g).map((x) => ({ k: cfNome(x.b.titulo), nome: x.b.titulo, grupo: x.b.cat, ic: x.b.cat === "Heroes" ? "🎖️" : "🏆", tier: x.feito ? { ouro: 3, prata: 2, bronze: 1 }[x.tier] : 0, em: x.em,
    pct: x.carga && x.feito && x.pct != null ? x.pct : undefined, det: x.feito ? `${x.melhor ? x.melhor.txt : "feito"} · ${x.rx ? "RX" : "Scaled"}${x.carga && x.pct != null ? ` · ${x.pct}% da carga RX` : ""}` : x.carga ? "com carga" : "" }));

  // Corrida (Pantera): distâncias, ritmo nos 5 e 10 km, volume do mês, constância e longão
  function corridaIns(rows) {
    const cs = corridasLiga(rows).sort((a, b) => a.data.localeCompare(b.data)), out = [];
    for (const [k, nome, d] of [["d5", "5 km", 5], ["d10", "10 km", 10], ["d15", "15 km", 15], ["d21", "Meia maratona", 21.1], ["d42", "Maratona", 42.2]]) {
      const x = cs.find((c) => c.km >= d * 0.98);
      out.push({ k, nome, grupo: "Distância", ic: "🏁", tier: x ? 3 : 0, em: x?.data || null, det: x ? "" : `correr ${d < 20 ? nome : nome.toLowerCase()} de uma vez` });
    }
    for (const [k, nome, d, lim] of [["r5", "5 km rápido", 5, [2100, 1800, 1500]], ["r10", "10 km rápido", 10, [4200, 3600, 3000]]]) {
      const ts = cs.filter((c) => c.km >= d * 0.98 && c.tempo).map((c) => ({ t: Math.round((c.tempo * d) / c.km), data: c.data })), best = ts.sort((a, b) => a.t - b.t)[0];
      const tier = best ? tierPor(best.t, lim, true) : 0;
      out.push({ k, nome, grupo: "Ritmo", ic: "⚡", tier, em: tier ? best.data : null, det: best ? `melhor: ${mmss(best.t)} · ouro abaixo de ${mmss(lim[2])}` : `bronze abaixo de ${mmss(lim[0])}, ouro abaixo de ${mmss(lim[2])}` });
    }
    const mes = {}; for (const c of cs) mes[c.data.slice(0, 7)] = (mes[c.data.slice(0, 7)] || 0) + c.km;
    const melhorMes = Math.max(0, ...Object.values(mes));
    out.push({ k: "vol", nome: "Volume do mês", grupo: "Constância", ic: "📅", tier: tierPor(melhorMes, [25, 50, 100]), det: melhorMes ? `melhor mês: ${fmtKm(melhorMes)} · ouro com 100 km` : "bronze 25 km, prata 50, ouro 100 num mês" });
    const sem = {}; for (const c of cs) (sem[semanaDe_(c.data)] ||= new Set()).add(c.data);
    const seguidas = semanasSeguidas(Object.entries(sem).filter(([, d]) => d.size >= 3).map(([k]) => k));
    out.push({ k: "const", nome: "3 corridas por semana", grupo: "Constância", ic: "🔁", tier: tierPor(seguidas, [2, 3, 4]), det: `${seguidas} ${seguidas === 1 ? "semana seguida" : "semanas seguidas"} · ouro com 4` });
    const longao = Math.max(0, ...cs.map((c) => c.tempo));
    out.push({ k: "longao", nome: "Longão", grupo: "Constância", ic: "⏳", tier: tierPor(longao, [1800, 2700, 3600]), det: longao ? `maior corrida: ${mmss(longao)} · ouro com 1 hora` : "bronze 30 min, prata 45, ouro 1 hora sem parar" });
    return out;
  }

  // Híbrido (Jacaré): corrida e força juntas
  const FORCA_PROG = ["hiper", "c21", "calistenia", "cf"];
  function hibridoIns(rows) {
    const feitos = rows.filter((r) => r.concluido), forca = new Set(feitos.filter((r) => FORCA_PROG.includes(r.programa)).map((r) => r.data));
    const corre = new Set([...corridasLiga(rows).map((c) => c.data), ...feitos.filter((r) => r.programa === "run").map((r) => r.data)]);
    const duplo = [...corre].filter((k) => forca.has(k)).sort()[0];
    const sem = {}; for (const k of corre) (sem[semanaDe_(k)] ||= { c: new Set(), f: new Set() }).c.add(k); for (const k of forca) (sem[semanaDe_(k)] ||= { c: new Set(), f: new Set() }).f.add(k);
    const seguidas = semanasSeguidas(Object.entries(sem).filter(([, x]) => x.c.size >= 3 && x.f.size >= 2).map(([k]) => k));
    const sessao = feitos.filter((r) => r.programa === "run" && IA.run).find((r) => { const ids = Object.entries(r.detalhes?.sets || {}).filter(([, s]) => (s || []).some(Boolean)).map(([id]) => IA.run.ci[id]).filter(Boolean);
      return ids.some((e) => unDe("run", e) === "min") && ids.some((e) => unDe("run", e) !== "min"); });
    const murph = feitos.filter((r) => r.programa === "cf" && cfNome(r.detalhes?.wod?.titulo) === "murph").sort((a, b) => a.data.localeCompare(b.data));
    const murphRx = murph.find((r) => r.detalhes?.res?.rx !== false);
    const km = soma(corridasLiga(rows).map((c) => c.km)), nf = feitos.filter((r) => FORCA_PROG.includes(r.programa)).length;
    return [
      { k: "duplo", nome: "Dia duplo", grupo: "Híbrido", ic: "🐊", tier: duplo ? 3 : 0, em: duplo || null, det: duplo ? "" : "corrida e força no mesmo dia" },
      { k: "semana", nome: "Semana híbrida", grupo: "Híbrido", ic: "📆", tier: tierPor(seguidas, [1, 2, 4]), det: `3 corridas + 2 forças na semana · ${seguidas} ${seguidas === 1 ? "seguida" : "seguidas"}, ouro com 4` },
      { k: "sessao", nome: "Sessão híbrida", grupo: "Híbrido", ic: "⚙️", tier: sessao ? 3 : 0, em: sessao?.data || null, det: sessao ? "" : "um treino da Corrida e Híbrido com corrida e força" },
      { k: "murph", nome: "Murph", grupo: "Híbrido", ic: "🎖️", tier: murphRx ? 3 : murph.length ? 2 : 0, em: (murphRx || murph[0])?.data || null, det: murph.length ? (murphRx ? "RX" : "Scaled") : "o benchmark Murph, do Cross" },
      { k: "marca", nome: "Marca híbrida", grupo: "Híbrido", ic: "🏅", tier: Math.min(tierPor(km, [25, 50, 100]), tierPor(nf, [25, 50, 100])), det: `${fmtKm(km)} corridos e ${nf} treinos de força · ouro com 100 + 100` },
    ];
  }

  // Hipertrofia (Gorila): força relativa, clube dos 450, tonelagem, progressão e formatura da Adaptação
  const LIFTS = [["supino", "Supino com o seu peso", /supino reto com barra|bench press/, null, 1], ["agachamento", "Agachamento com 1,5x", /agachamento livre|back squat|front squat/, null, 1.5], ["terra", "Terra com 2x", /levantamento terra|deadlift/, /stiff|romeno|romanian/, 2]];
  function hipertrofiaIns(rows, peso, form, prs = []) {
    const hip = rows.filter((r) => r.programa === "hiper" && IA.hiper);
    const series = hip.flatMap((r) => Object.entries(r.detalhes?.sets || {}).flatMap(([id, s]) => (s || []).filter((x) => x && x.kg > 0).map((x) => ({ data: r.data, id, nome: norm(IA.hiper.ci[id]?.nome || id), kg: x.kg, r: x.r || 0 }))));
    const pc = peso || 75, out = [], bests = [];
    for (const [k, nome, re, nao, mult] of LIFTS) {
      const kgs = [...series.filter((x) => re.test(x.nome) && !(nao && nao.test(x.nome))), ...prs.filter((p) => re.test(norm(p.mov || "")) && !(nao && nao.test(norm(p.mov || ""))))].map((x) => Number(x.kg) || 0);
      const best = Math.max(0, ...kgs), meta = Math.round(pc * mult); bests.push(best);
      out.push({ k, nome, grupo: "Força relativa", ic: "🦍", tier: tierPor(best / meta, [0.6, 0.8, 1]), pct: Math.min(100, Math.round((best / meta) * 100)), det: best ? `${fmtKg(best)} kg de ${meta} kg${peso ? "" : " (peso padrão 75 kg)"}` : `meta: ${meta} kg` });
    }
    const total = soma(bests);
    out.push({ k: "clube", nome: "Clube dos 450", grupo: "Força relativa", ic: "🏋️", tier: tierPor(total, [300, 375, 450]), pct: Math.min(100, Math.round((total / 450) * 100)), det: `supino + agachamento + terra: ${fmtKg(total)} kg` });
    const porTreino = {}, porMes = {};
    for (const x of series) { porTreino[x.data] = (porTreino[x.data] || 0) + x.kg * x.r; porMes[x.data.slice(0, 7)] = (porMes[x.data.slice(0, 7)] || 0) + x.kg * x.r; }
    const tt = Math.max(0, ...Object.values(porTreino)), tm = Math.max(0, ...Object.values(porMes)), ton = (v) => `${String(Math.round(v / 100) / 10).replace(".", ",")} t`;
    out.push({ k: "tonTreino", nome: "Tonelagem num treino", grupo: "Volume", ic: "⚖️", tier: tierPor(tt, [5000, 7500, 10000]), det: tt ? `melhor treino: ${ton(tt)} · ouro com 10 t` : "bronze 5 t, prata 7,5 t, ouro 10 t" });
    out.push({ k: "tonMes", nome: "Tonelagem no mês", grupo: "Volume", ic: "🗓️", tier: tierPor(tm, [50000, 75000, 100000]), det: tm ? `melhor mês: ${ton(tm)} · ouro com 100 t` : "bronze 50 t, prata 75 t, ouro 100 t" });
    // Progressão: semanas seguidas em que algum exercício passou da maior carga que já tinha
    const maxEx = {}, subiu = new Set();
    for (const x of [...series].sort((a, b) => a.data.localeCompare(b.data))) { if (maxEx[x.id] && x.kg > maxEx[x.id]) subiu.add(semanaDe_(x.data)); maxEx[x.id] = Math.max(maxEx[x.id] || 0, x.kg); }
    const sp = semanasSeguidas([...subiu]);
    out.push({ k: "prog", nome: "Sobrecarga progressiva", grupo: "Volume", ic: "📈", tier: tierPor(sp, [2, 3, 4]), det: `${sp} ${sp === 1 ? "semana" : "semanas"} seguidas subindo carga · ouro com 4` });
    out.push({ k: "adapt", nome: "Formatura da Adaptação", grupo: "Volume", ic: "🎓", tier: form?.adaptacao ? 3 : 0, em: form?.adaptacao || null, det: form?.adaptacao ? "" : "as 4 semanas de adaptação da Hipertrofia" });
    return out;
  }

  const LIGAS = [
    { k: "cross", nome: "Cross", chefe: "loba", rot: "Loba", art: "a", banner: "loba", tag: "Chefe do Cross", cor: "#5fb4ff", ins: (rows, o) => crossIns(rows, o.g),
      vis: () => trilha() === "cross" || Object.values(S.cf?.logs || {}).some((l) => l.done) },
    { k: "calistenia", nome: "Calistenia", chefe: "fera", rot: "Fera", art: "a", banner: "fera", tag: "Chefe da calistenia", cor: "#ff6b2c", ins: (rows) => caliIns(rows),
      vis: () => ["calistenia", "hibrido"].includes(trilha()) || Object.keys(S.logs || {}).length > 0 || Object.keys(S.c21?.logs || {}).length > 0 },
    { k: "corrida", nome: "Corrida", chefe: "pantera", rot: "Pantera", art: "a", banner: "pantera", tag: "Chefe da corrida", cor: "#a66bff", ins: (rows) => corridaIns(rows),
      vis: () => ["corrida", "hibrido"].includes(trilha()) || Object.keys(S.corrida?.logs || {}).length > 0 },
    { k: "hibrido", nome: "Híbrido", chefe: "jacare", rot: "Jacaré", art: "o", banner: "jacare", tag: "Chefe do híbrido", cor: "#4ee39b", ins: (rows) => hibridoIns(rows),
      vis: () => ["hibrido", "corrida"].includes(trilha()) || (Object.keys(S.corrida?.logs || {}).length > 0 && Object.keys(S.hiper?.logs || {}).length + Object.keys(S.logs || {}).length > 0) },
    { k: "hipertrofia", nome: "Hipertrofia", chefe: "gorila", rot: "Gorila", art: "o", banner: "gorila", tag: "Chefe da hipertrofia", cor: "#ff8a5b", ins: (rows, o) => hipertrofiaIns(rows, o.peso, o.form, o.prs),
      vis: () => trilha() === "academia" || (trilha() === "hibrido" && forcaHibrido() === "hiper") || Object.keys(S.hiper?.logs || {}).length > 0 },
  ];
  const meuOpts = () => ({ g: sexoArte(), peso: pesoCorpo(), form: formaturas(), prs: S.cf?.prs || [] });
  const TIER_TXT = ["", "Bronze", "Prata", "Ouro"];
  function insTile(x, eu) {
    const wd = eu && !x.tier && x.try ? feraDiaWD(x.try) : null;
    return `<div class="ins-it ${x.tier ? `ins-${TIERS[x.tier]}` : "ins-off"}" title="${esc(x.nome)}">
      <span class="ins-med">${x.ic}</span><b>${esc(x.nome)}</b>
      <small>${x.tier ? `${TIER_TXT[x.tier]}${x.em ? ` · ${ddmm(x.em)}` : ""}` : ""}${x.tier && x.det ? "<br>" : ""}${esc(x.det || (x.tier ? "" : "—"))}</small>
      ${x.pct != null ? `<span class="ins-hp"><i style="width:${x.pct}%"></i></span>` : ""}
      ${wd ? `<a class="ins-try" href="#/treino/${wd[0]}/${wd[1]}">Tentar</a>` : ""}</div>`;
  }
  function ligaHtml(L, rows, eu, o) {
    const ins = L.ins(rows, o), n = ins.filter((x) => x.tier).length;
    if (!n && !eu) return "";
    const grupos = [...new Set(ins.map((x) => x.grupo))];
    return `<div class="ins-box liga-box" style="--liga:${L.cor}">
      <div class="fera-capa liga-capa"><img src="assets/chefes/${L.banner}.webp" alt=""><div><span class="ch-bn-k">Liga ${esc(L.nome)}</span><b>${esc(L.rot)}: ${n} de ${ins.length} insígnias</b><small>${n === ins.length ? "Chefe derrotado! 🏆" : `Conquiste todas para derrotar ${L.art} ${esc(L.rot)}`}</small></div></div>
      ${grupos.map((g) => { const gi = ins.filter((x) => x.grupo === g); return `<div class="sec-head" style="margin-top:12px"><h2>${esc(g)}</h2><span>${gi.filter((x) => x.tier).length}/${gi.length}</span></div>
        <div class="ins-grid">${gi.map((x) => insTile(x, eu)).join("")}</div>`; }).join("")}
    </div>`;
  }
  // Seções das ligas no Perfil (as que fazem sentido para a pessoa) e no perfil de membro (as que têm alguma insígnia)
  function ligasPerfilHtml(rows, eu, o) {
    return LIGAS.filter((L) => (eu ? L.vis() : true)).map((L) => ligaHtml(L, rows, eu, o)).join("") +
      (eu ? `<p class="note small">Cada liga tem insígnias de bronze, prata e ouro, e um chefe que cai quando todas são conquistadas, em qualquer faixa. Tudo sai dos seus treinos registrados.</p>` : "");
  }

  /* ==========================================================
     Temporadas: 8 semanas, uma liga por pessoa (quem treina duas ou mais modalidades de verdade entra no Híbrido).
     Pontos dentro da temporada: +10 por treino concluído da liga (Insanity: por vídeo), +10/20/30 por insígnia nova
     ou faixa que subiu, +50 por chefe derrotado, +10 por Max Out melhorado. Tudo calculado das linhas de treino.
     ========================================================== */
  const TEMPORADAS = [{ n: 1, nome: "Temporada 1", sub: "Aquecimento", ini: "2026-11-23", fim: "2027-01-17", herda: true, beta: true }];
  function temporada() {
    const t = TEMPORADAS.find((x) => hojeKey >= x.ini && hojeKey <= x.fim) || TEMPORADAS.find((x) => hojeKey < x.ini) || TEMPORADAS[TEMPORADAS.length - 1];
    const fase = hojeKey < t.ini ? "antes" : hojeKey > t.fim ? "fim" : "agora";
    const semana = fase === "agora" ? Math.floor(diffDays(parseKey(t.ini), hoje) / 7) + 1 : fase === "fim" ? 8 : 0;
    return { ...t, fase, semana, faltam: fase === "antes" ? diffDays(hoje, parseKey(t.ini)) : diffDays(hoje, parseKey(t.fim)) };
  }
  const MOD_DE = (pr) => (pr === "cf" ? "cross" : VP[pr] ? "insanity" : pr === "hiper" ? "hipertrofia" : pr === "corrida" || pr === "run" ? "corrida" : pr === "calistenia" || pr === "c21" ? "calistenia" : null);
  const LIGA_T = {
    insanity: { nome: "Insanity", rot: "Canguru", img: "assets/chefes/canguru-rosto.webp" },
    cross: { nome: "Cross", rot: "Loba", img: "assets/chefes/loba-rosto.webp" },
    calistenia: { nome: "Calistenia", rot: "Fera", img: "assets/chefes/fera-rosto.webp" },
    corrida: { nome: "Corrida", rot: "Pantera", img: "assets/chefes/pantera-rosto.webp" },
    hipertrofia: { nome: "Hipertrofia", rot: "Gorila", img: "assets/chefes/gorila-rosto.webp" },
    hibrido: { nome: "Híbrido", rot: "Jacaré", img: "assets/chefes/jacare-rosto.webp" },
  };
  const noIntervalo = (rows, a, b) => rows.filter((r) => r.data >= a && r.data <= b);
  // Liga da pessoa na temporada: modalidade com 2+ treinos e 25%+ do total conta; duas ou mais = Híbrido
  function ligaTemporada(rows, t = temporada()) {
    const fe = feitas(noIntervalo(rows, t.herda ? "0000" : t.ini, t.fim)), n = {}; // Temporada 1: o que já foi feito antes também conta
    for (const r of fe) { const m = MOD_DE(r.programa); if (m) n[m] = (n[m] || 0) + 1; }
    const total = soma(Object.values(n)); if (!total) return null;
    const contam = Object.entries(n).filter(([, v]) => v >= 2 && v / total >= 0.25);
    return contam.length >= 2 ? "hibrido" : Object.entries(n).sort((a, b) => b[1] - a[1])[0][0];
  }
  const PTS_TIER = [0, 10, 20, 30];
  function pontosTemporada(rows, liga, o, t = temporada()) {
    const ate = t.fase === "fim" ? t.fim : hojeKey, desde = t.herda ? "0000" : t.ini; // herda: quem já treinava parte de onde parou
    const dentro = feitas(noIntervalo(rows, desde, ate)), antes = rows.filter((r) => r.data < desde), todas = rows.filter((r) => r.data <= ate);
    const mods = liga === "hibrido" ? null : [liga], conta = (r) => !mods || mods.includes(MOD_DE(r.programa));
    let treinos = 0;
    for (const r of dentro.filter(conta)) treinos += MOD_DE(r.programa) === "insanity" ? Math.max(1, (r.detalhes?.feitos || []).length) : MOD_DE(r.programa) ? 1 : 0;
    let ins = 0, chefes = 0, max = 0;
    for (const L of LIGAS.filter((L) => liga === "hibrido" || L.k === liga)) {
      const a = L.ins(antes, o), d = L.ins(todas, o), ta = Object.fromEntries(a.map((x) => [x.k, x.tier]));
      for (const x of d) if (x.tier > (ta[x.k] || 0)) ins += PTS_TIER[x.tier] - PTS_TIER[ta[x.k] || 0];
      if (d.every((x) => x.tier) && !a.every((x) => x.tier)) chefes++;
    }
    if (liga === "insanity" || liga === "hibrido") { // Max Out que passou do melhor anterior naquele vídeo
      const best = {};
      for (const m of maxOuts(todas).sort((a, b) => a.k.localeCompare(b.k))) { if (m.k >= desde && best[m.v] && m.s > best[m.v]) max++; best[m.v] = Math.max(best[m.v] || 0, m.s); }
    }
    return { treinos, ins, chefes, max, total: treinos * 10 + ins + chefes * 50 + max * 10 };
  }
  function tabelaTemporada(t = temporada()) {
    const opts = (id) => (id === uid ? meuOpts() : { g: G.perfis[id]?.config?.arte === "f" ? "f" : "m", peso: 0, form: G.perfis[id]?.config?.formaturas || {}, prs: [] });
    return G.membros.map((id) => { const rows = linhasDe(id), liga = ligaTemporada(rows, t); return liga ? { id, liga, ...pontosTemporada(rows, liga, opts(id), t) } : null; }).filter(Boolean);
  }
  // Insígnias da temporada (Perfil): Pioneiro (treinou na temporada) e Finalista (Cardio Challenge final do MAX:30 dentro do prazo)
  function finalistaMax30(t = temporada()) {
    const P = VP.insanity; if (!P) return null;
    let ult = null; P.semanas.forEach((s, w) => s.dias.forEach((x, d) => x.ids.length && (ult = [w, d])));
    return Object.keys(S.insanity?.logs || {}).filter((k) => k >= t.ini && k <= t.fim && insFeito("insanity", k) && S.insanity.logs[k].w === ult[0] && S.insanity.logs[k].d === ult[1]).sort()[0] || null;
  }
  function temporadaPerfilHtml() {
    const t = temporada(), rows = linhasLocais(), liga = ligaTemporada(rows, t), treinou = feitas(noIntervalo(rows, t.ini, t.fim)).length > 0, fin = finalistaMax30(t);
    if (t.fase === "antes") return "";
    return `<div class="ins-box"><div class="sec-head"><h2>${esc(t.nome)} · ${esc(t.sub)}</h2><span>${liga ? `Liga ${esc(LIGA_T[liga].nome)}` : ""}</span></div>
      <div class="ins-grid">
        <div class="ins-it ${treinou && t.fase === "fim" ? "ins-ouro" : treinou ? "ins-prata" : "ins-off"}"><span class="ins-med">🚩</span><b>Pioneiro</b><small>${treinou ? (t.fase === "fim" ? `conquistada · ${esc(t.nome)}` : "garantida no fim da temporada") : "treine na temporada"}</small></div>
        ${VP.insanity ? `<div class="ins-it ${fin ? "ins-ouro" : "ins-off"}"><span class="ins-med">🏁</span><b>Finalista</b><small>${fin ? `MAX:30 completo · ${ddmm(fin)}` : `Cardio Challenge final do MAX:30 até ${ddmm(t.fim)}`}</small></div>` : ""}
      </div></div>`;
  }
  // Grupo: ranking da liga escolhida
  function temporadaGrupoHtml() {
    const t = temporada(), tab = tabelaTemporada(t), minha = tab.find((x) => x.id === uid)?.liga;
    const ligas = Object.keys(LIGA_T).filter((k) => tab.some((x) => x.liga === k));
    if (!G.ligaSel || !LIGA_T[G.ligaSel]) G.ligaSel = minha || ligas[0] || "hibrido";
    const sel = G.ligaSel, lista = tab.filter((x) => x.liga === sel).sort((a, b) => b.total - a.total), L = LIGA_T[sel];
    const quando = t.fase === "antes" ? `começa ${t.faltam === 1 ? "amanhã" : `em ${t.faltam} dias`} (${ddmm(t.ini)})` : t.fase === "fim" ? `encerrada em ${ddmm(t.fim)}` : `semana ${t.semana} de 8 · faltam ${t.faltam} ${t.faltam === 1 ? "dia" : "dias"}`;
    return `<div class="section tp-box">
      <div class="tp-head"><img src="${L.img}" alt=""><div><span class="tp-k">${esc(t.nome)} · ${esc(t.sub)}</span><b>Liga ${esc(L.nome)}</b><small>${quando}</small></div></div>
      ${(() => { const q = chefes().find((c) => c.k === "sr-q"); return q && t.fase !== "antes" ? `<a class="tp-srq" href="#/chefes"><img src="${q.img}" alt=""><span><b>Sr. Q · desafios do grupo</b><span class="ch-hp"><i style="width:${q.hp}%"></i></span></span><em>${q.melhor}/8</em></a>` : ""; })()}
      <div class="chips tp-ligas">${(ligas.length ? ligas : Object.keys(LIGA_T)).map((k) => `<button class="chip${k === sel ? " primary" : ""}" data-tp-liga="${k}">${esc(LIGA_T[k].nome)}${k === minha ? " · você" : ""}</button>`).join("")}</div>
      ${t.fase === "antes" ? `<p class="note small">A temporada começa na segunda, ${ddmm(t.ini)}, e vai até ${ddmm(t.fim)}. Cada pessoa entra numa liga pelo que treinar: quem fizer duas ou mais modalidades entra no Híbrido.</p>`
        : lista.length ? `<ol class="tp-rank">${lista.map((x, i) => `<li class="${x.id === uid ? "eu" : ""}"><span class="tp-pos">${i + 1}º</span>${avatar(G.perfis[x.id], 32)}<span class="tp-nome"><b>${esc((G.perfis[x.id]?.nome || "Atleta").split(" ")[0])}${x.id === uid ? " (você)" : ""}</b><small>${x.treinos} ${sel === "insanity" ? (x.treinos === 1 ? "vídeo" : "vídeos") : x.treinos === 1 ? "treino" : "treinos"}${x.ins ? ` · +${x.ins} insígnias` : ""}${x.max ? ` · ${x.max} Max Out` : ""}${x.chefes ? ` · ${x.chefes} chefe` : ""}</small></span><strong>${x.total}</strong></li>`).join("")}</ol>`
        : `<p class="note small">Ninguém nesta liga ainda.</p>`}
      <details class="xp-regras"><summary>Como funciona</summary><ul class="note small">
        <li>${esc(t.nome)} vai de ${ddmm(t.ini)} a ${ddmm(t.fim)}${t.sub === "Aquecimento" ? ": é o aquecimento, sem prêmio por posição" : ""}.</li>
        <li>Sua liga é a modalidade que você treina. Duas ou mais modalidades (cada uma com 2+ treinos e 25%+ do total) = Híbrido.</li>
        <li>Pontos: +10 por treino (no Insanity, por vídeo), +10/20/30 por insígnia nova ou faixa que subiu, +50 por chefe derrotado, +10 por Max Out melhorado.</li>
        ${t.herda ? `<li>Quem já treinava parte de onde parou: treinos e insígnias de antes de ${ddmm(t.ini)} também contam, e quem começou antes ganhou +${XP.veterano} XP de veterano.</li>` : ""}
        ${t.beta ? `<li>${esc(t.nome)} é o beta: todo mundo que entrar tem todos os recursos liberados.</li>` : ""}
        <li>Sr. Q é o chefe da temporada: cada desafio semanal do grupo que você cumprir é um golpe. São 8 semanas, então ele cai com os 8 desafios.</li>
        <li>Quem treinar na temporada ganha a insígnia Pioneiro; quem fizer o Cardio Challenge final do MAX:30 até ${ddmm(t.fim)}, a Finalista.</li></ul></details>
    </div>`;
  }
  function temporadaHome() {
    const t = temporada(), rows = linhasLocais(), liga = ligaTemporada(rows, t);
    if (t.fase === "fim" && hojeKey > keyOf(addDays(parseKey(t.fim), 14))) return "";
    let pos = "";
    if (liga && uid && G.grupos?.length && G.membros?.length) { const l = tabelaTemporada(t).filter((x) => x.liga === liga).sort((a, b) => b.total - a.total), i = l.findIndex((x) => x.id === uid); if (i >= 0) pos = ` · ${i + 1}º de ${l.length}`; }
    const txt = t.fase === "antes" ? `Começa ${t.faltam === 1 ? "amanhã" : `em ${t.faltam} dias`} · ${ddmm(t.ini)} a ${ddmm(t.fim)}` : t.fase === "fim" ? "Temporada encerrada" : `Semana ${t.semana} de 8${liga ? ` · Liga ${LIGA_T[liga].nome}${pos}` : " · treine para entrar numa liga"}`;
    const p = liga && t.fase !== "antes" ? pontosTemporada(rows, liga, meuOpts(), t).total : null;
    return `<a class="tp-home" href="#/grupo"><img src="${LIGA_T[liga || "hibrido"].img}" alt=""><span><b>${esc(t.nome)} · ${esc(t.sub)}</b><small>${esc(txt)}</small></span>${p != null ? `<strong>${p}<small>pts</small></strong>` : ""}</a>`;
  }
  document.addEventListener("click", (e) => { const b = e.target.closest("[data-tp-liga]"); if (b) { G.ligaSel = b.dataset.tpLiga; render(); } });

  /* ==========================================================
     Estilo de treino: soma-se à classe de nível ("Escudeiro · Monge"). Vem dos treinos dos últimos 28 dias:
     cada sessão conta pelos minutos (mínimo 20) no tipo dela. Um tipo com 50% ou mais dá o estilo; sem isso, Ronin (híbrido).
     ========================================================== */
  const ESTILOS = {
    monge: { nome: "Monge", ic: "🥋", tipo: "corpo", desc: "treina com o peso do corpo" },
    gladiador: { nome: "Gladiador", ic: "🛡️", tipo: "carga", desc: "treina com carga" },
    batedor: { nome: "Batedor", ic: "🏹", tipo: "cardio", desc: "corre e faz cardio" },
    berserker: { nome: "Berserker", ic: "🪓", tipo: "metcon", desc: "vive de WODs e treinos intensos" },
    ronin: { nome: "Ronin", ic: "⚔️", tipo: null, desc: "equilibra força e cardio" },
  };
  const TIPOS_TREINO = [["corpo", "Peso do corpo", "#4fd2ff"], ["carga", "Carga", "#ffb45e"], ["cardio", "Cardio", "#4ee39b"], ["metcon", "WOD e vídeos", "#ff6b8b"]];
  function estiloAtual() {
    const a = keyOf(addDays(hoje, -27)), rows = feitas(linhasLocais()).filter((r) => r.data >= a && r.data <= hojeKey);
    const t = { corpo: 0, carga: 0, cardio: 0, metcon: 0 }, add = (k, m) => (t[k] += m);
    for (const r of rows) {
      const m = Math.max(20, r.minutos || 0), pr = r.programa;
      if (pr === "calistenia" || pr === "c21") add("corpo", m);
      else if (pr === "hiper") add("carga", m);
      else if (pr === "run") { add("cardio", m * 0.6); add("carga", m * 0.4); }
      else if (pr === "cf" || VP[pr]) add("metcon", m);
      else if (pr === "corrida") add("cardio", m);
    }
    const total = soma(Object.values(t)), pct = Object.fromEntries(Object.entries(t).map(([k, v]) => [k, total ? Math.round((v / total) * 100) : 0]));
    if (rows.length < 3) return { slug: null, pct, treinos: rows.length };
    const [top] = Object.entries(pct).sort((x, y) => y[1] - x[1]);
    const slug = top[1] >= 50 ? Object.keys(ESTILOS).find((k) => ESTILOS[k].tipo === top[0]) : "ronin";
    return { slug, ...ESTILOS[slug], pct, treinos: rows.length, top: top[0] };
  }
  // Barra empilhada com a divisão do treino e o que falta para mudar de estilo
  function estiloHtml() {
    const e = estiloAtual();
    const barra = `<span class="es-bar">${TIPOS_TREINO.map(([k, , cor]) => (e.pct[k] ? `<i style="width:${e.pct[k]}%;background:${cor}"></i>` : "")).join("")}</span>
      <span class="es-leg">${TIPOS_TREINO.filter(([k]) => e.pct[k]).map(([k, nome, cor]) => `<span><i style="background:${cor}"></i>${esc(nome)} ${e.pct[k]}%</span>`).join("")}</span>`;
    if (!e.slug) return `<div class="es-box"><div class="es-top"><span class="es-ic">❔</span><div><b>Estilo: a descobrir</b><small>Faça ${3 - e.treinos} ${3 - e.treinos === 1 ? "treino" : "treinos"} a mais e ele aparece, pelo que você realmente treina.</small></div></div>${e.treinos ? barra : ""}</div>`;
    const nota = e.slug === "ronin" ? "Nenhum tipo passa de 50%: você é híbrido." : `Mais de 50% do seu treino é ${esc(TIPOS_TREINO.find(([k]) => k === e.top)[1].toLowerCase())}. Se outro tipo passar de 50%, o estilo muda; se nenhum passar, vira Ronin.`;
    return `<div class="es-box"><div class="es-top"><span class="es-ic">${e.ic}</span><div><b>Estilo: ${esc(e.nome)}</b><small>Você ${esc(e.desc)} · últimos 28 dias</small></div></div>${barra}<p class="es-nota">${nota}</p></div>`;
  }
  const estiloTxt = () => { const e = estiloAtual(); return e.slug ? `${e.ic} ${e.nome}` : ""; };

  /* ==========================================================
     Chefes (recordes viram monstros: a vida cai conforme o seu melhor se aproxima da meta) e Missões do dia.
     Os chefes são calculados do histórico (valem para recordes antigos). As missões do dia ficam registradas
     em S.missoes (data -> quantas cumpridas) assim que são cumpridas, para o XP não mudar depois.
     ========================================================== */
  const pesoCorpo = () => { const p = Number(String(S.perfil.peso || "").replace(",", ".")); return p > 0 ? p : 0; };
  // Todos os registros de exercício: { data, nome, reps, kg, s, km }
  function registrosEx() {
    const out = [];
    for (const [k, l] of Object.entries(S.logs)) for (const [id, s] of Object.entries(l.sets || {})) {
      const e = EXI[id]; if (!e || !s.length) continue;
      for (const v of s) out.push({ data: k, nome: e.nome, ...(e.un === "s" ? { s: v } : e.un === "reps" || !e.un ? { reps: v } : {}) });
    }
    for (const pk of IAK) for (const [k, l] of Object.entries(S[pk].logs)) for (const [id, s] of Object.entries(l.sets || {})) {
      const e = IA[pk].ci[id]; if (!e) continue;
      const un = e.med === "s" ? "s" : unDe(pk, e);
      for (const x of s || []) { if (!x) continue; out.push({ data: k, nome: e.nome, kg: x.kg || 0, ...(un === "s" ? { s: x.r || 0 } : un === "reps" ? { reps: x.r || 0 } : {}) }); }
    }
    for (const pr of S.cf?.prs || []) out.push({ data: pr.k || hojeKey, nome: pr.mov || "", kg: pr.kg || 0, reps: pr.reps || 0 });
    for (const [k, l] of Object.entries(S.corrida?.logs || {})) for (const a of l.itens || []) if (/corrida|esteira/.test(a.tipo || "") && a.km) out.push({ data: k, nome: "corrida", km: a.km });
    return out;
  }
  // Recordes que antes eram chefes: hoje são insígnias das ligas (o XP de quem já bateu continua)
  const RECORDES = [
    { k: "goblin", nome: "Goblin das Flexões", ic: "👺", desc: "30 flexões numa série", re: /flex/, nao: /joelho|inclinad|negativ|isom|hold|pike|handstand|pseudo|parada|half/, met: "reps", meta: () => 30 },
    { k: "troll", nome: "Troll da Barra", ic: "🧌", desc: "12 barras fixas numa série", re: /barra (fixa|supinada|ombro)|^barra fixa|pull.?up|chin.?up/, nao: /australiana|negativ|isom|escapul|bicep|tricep|joelho|knee/, met: "reps", meta: () => 12 },
    { k: "gargula", nome: "Gárgula das Paralelas", ic: "🗿", desc: "20 dips numa série", re: /dips|paralela|mergulho/, met: "reps", meta: () => 20 },
    { k: "sentinela", nome: "Sentinela da Prancha", ic: "🛡️", desc: "2 minutos de prancha", re: /^prancha$/, met: "s", meta: () => 120 },
    { k: "lich", nome: "Lich da Pistol", ic: "💀", desc: "5 pistol squats sem apoio", re: /pistol/, nao: /apoio|suporte|assist/, met: "reps", meta: () => 5 },
    { k: "espectro", nome: "Espectro do Muscle-up", ic: "👻", desc: "1 muscle-up", re: /muscle.?up/, met: "reps", meta: () => 1 },
    { k: "golem", nome: "Golem do Supino", ic: "🪨", desc: "Supino com o seu peso", re: /supino reto com barra|bench press/, met: "kg", meta: () => pesoCorpo() || 75, corpo: 1 },
    { k: "hidra", nome: "Hidra do Agachamento", ic: "🐍", desc: "Agachamento com 1,5x o seu peso", re: /agachamento livre|back squat|front squat/, met: "kg", meta: () => Math.round((pesoCorpo() || 75) * 1.5), corpo: 1.5 },
    { k: "dragao", nome: "Dragão da Terra", ic: "🐉", desc: "Levantamento terra com 2x o seu peso", re: /levantamento terra|deadlift/, nao: /stiff|romeno|romanian/, met: "kg", meta: () => Math.round((pesoCorpo() || 75) * 2), corpo: 2 },
    { k: "lobo", nome: "Lobo da Estrada", ic: "🐺", desc: "Correr 5 km de uma vez", re: /^corrida$/, met: "km", meta: () => 5 },
    { k: "rei", nome: "Rei Demônio dos 10 km", ic: "👹", desc: "Correr 10 km de uma vez", re: /^corrida$/, met: "km", meta: () => 10 },
  ];
  const CHEFES = [
    // Chefe do Insanity: só aparece para quem faz o programa (trilha Insanos ou Híbridos, ou já tem registro nele)
    { k: "shaunt-cc", nome: "Canguru · Cardio Challenge", tag: "Chefe do Insanity", vis: () => VP.insanity && (["insanos", "hibrido"].includes(trilha()) || Object.keys(S.insanity?.logs || {}).length > 0), img: "assets/chefes/canguru-rosto.webp", banner: "assets/chefes/canguru.webp", prog: "insanity", met: "s",
      desc: "Chegar ao fim do Cardio Challenge sem Max Out", meta: () => (INSV["cardio-challenge"]?.min || 30) * 60,
      calc: () => { const h = maxOuts(linhasLocais()).filter((m) => m.v === "cardio-challenge").sort((a, b) => a.k.localeCompare(b.k)), meta = (INSV["cardio-challenge"]?.min || 30) * 60;
        return { tem: h.length > 0, melhor: Math.max(0, ...h.map((m) => m.s)), em: h.find((m) => m.s >= meta)?.k || null }; } },
    { k: "shaunt-ft", nome: "Canguru · Fit Test", tag: "Chefe do Insanity", vis: () => VP.insanity60 && (["insanos", "hibrido"].includes(trilha()) || Object.keys(S.insanity60?.logs || {}).length > 0), img: "assets/chefes/canguru-rosto.webp", banner: "assets/chefes/canguru.webp", prog: "insanity60", met: "pct",
      desc: "Melhorar 25% no total do Fit Test", meta: () => 25,
      calc: () => { const ft = fitTests(linhasLocais()).filter((x) => x.p === "insanity60"); if (!ft.length) return { tem: false, melhor: 0, em: null };
        const base = ft[0].total || 1; let melhor = 0, em = null;
        for (const x of ft.slice(1)) { const v = Math.round(((x.total - base) / base) * 100); if (v > melhor) melhor = v; if (!em && v >= 25) em = x.k; }
        return { tem: true, melhor, em }; } },
    // Sr. Q: chefe da temporada, inspirado nos desafios do grupo. Cada desafio semanal cumprido dentro da temporada é um golpe (8 semanas = 8 golpes)
    { k: "sr-q", nome: "Sr. Q", tag: "Chefe da temporada", img: "assets/chefes/sr-q-rosto.webp", banner: "assets/chefes/sr-q.webp", met: "ins",
      desc: "Cumprir os desafios do grupo da temporada, um por semana", vis: () => !!(uid && G.grupos?.length),
      meta: () => 8, calc: () => { const t = temporada(), ds = (G.desafios || []).filter((d) => d.semana >= t.ini && d.semana <= t.fim);
        const meus = ds.filter((d) => (G.feitos || []).some((f) => f.desafio_id === d.id && f.usuario_id === uid)).map((d) => d.semana).sort();
        const n = new Set(meus).size; return { tem: n > 0, melhor: n, meta: 8, em: n >= 8 ? meus[meus.length - 1] : null }; } },
    // Chefes das ligas: caem quando todas as insígnias da liga são conquistadas (em qualquer faixa)
    ...LIGAS.map((L) => ({ k: L.chefe, nome: { loba: "A Loba", fera: "A Fera", pantera: "A Pantera", jacare: "O Jacaré", gorila: "O Gorila" }[L.chefe], tag: L.tag, liga: L.k,
      img: `assets/chefes/${L.banner}-rosto.webp`, banner: `assets/chefes/${L.banner}.webp`, met: "ins", desc: `Conquistar todas as insígnias da liga ${L.nome}`, vis: L.vis, meta: () => 1,
      calc: () => { const ins = L.ins(linhasLocais(), meuOpts()), f = ins.filter((x) => x.tier);
        return { tem: f.length > 0, melhor: f.length, meta: ins.length, em: f.length === ins.length ? (f.map((x) => x.em).filter(Boolean).sort().pop() || hojeKey) : null }; } })),
  ];
  function chefes() {
    if (CACHE_CHEFES) return CACHE_CHEFES;
    CACHE_CHEFES = CHEFES.filter((c) => !c.k.startsWith("shaunt") || (c.k === "shaunt-cc" ? VP.insanity : VP.insanity60)).map((c) => {
      const r = c.calc(), meta = r.meta ?? c.meta();
      return { ...c, metaV: meta, ...r, rel: !!c.vis(), hp: r.tem ? Math.max(0, Math.round((1 - Math.min(1, r.melhor / meta)) * 100)) : 100, derrotado: !!r.em };
    });
    return CACHE_CHEFES;
  }
  let CACHE_RECORDES = null;
  function recordes() { // os antigos chefes de recorde, calculados como antes (valem XP)
    if (CACHE_RECORDES && CACHE_RECORDES.v === CACHE_CHEFES) return CACHE_RECORDES.l;
    const regs = registrosEx().sort((a, b) => a.data.localeCompare(b.data));
    const l = RECORDES.map((c) => {
      const meta = c.meta(), mine = regs.filter((r) => c.re.test(norm(r.nome)) && !(c.nao && c.nao.test(norm(r.nome))) && (r[c.met] || 0) > 0);
      let melhor = 0, em = null;
      for (const r of mine) { const v = r[c.met]; if (v > melhor) melhor = v; if (!em && v >= meta) em = r.data; }
      return { ...c, metaV: meta, melhor, tem: mine.length > 0, derrotado: !!em, em };
    });
    CACHE_RECORDES = { v: chefes(), l };
    return l;
  }
  const marcaChefe = (c) => (c.k === "sr-q" ? `${c.melhor}/${c.metaV} desafios` : c.met === "ins" ? `${c.melhor}/${c.metaV} insígnias` : c.met === "s" && c.k.startsWith("shaunt") ? `${mmss(c.melhor)} de ${mmss(c.metaV)}` : fmtMarca(c.met, c.melhor));
  const fmtMarca = (met, v) => (met === "ins" ? `${v} insígnias` : met === "pct" ? `${v > 0 ? "+" : ""}${v}%` : met === "kg" ? `${fmtKg(v)} kg` : met === "s" ? (v >= 60 ? `${Math.floor(v / 60)}:${pad(Math.round(v % 60))} min` : `${Math.round(v)} s`) : met === "km" ? `${String(Math.round(v * 10) / 10).replace(".", ",")} km` : `${v} ${v === 1 ? "rep" : "reps"}`);
  // Bônus de veterano: treinou antes do começo da Temporada 1
  const veterano = () => feitas(linhasLocais()).some((r) => r.data < TEMPORADAS[0].ini);
  const chefesXp = () => (chefes().filter((c) => c.derrotado).length + recordes().filter((c) => c.derrotado).length) * XP.chefe;
  function chefeCard(c) {
    const cls = c.derrotado ? "ch-ok" : c.tem ? "" : "ch-novo";
    return `<div class="ch-card ${cls}">
      <span class="ch-ic">${c.img ? `<img src="${c.img}" alt="">` : c.ic}</span>
      <div class="ch-txt"><div class="ch-l1"><b>${esc(c.nome)}</b>${c.derrotado ? `<span class="ch-tag">Derrotado · ${ddmm(c.em)}</span>` : ""}</div>
        <small>${c.tag ? `<span class="ch-liga">${esc(c.tag)}</span> · ` : ""}${esc(c.desc)}</small>
        <span class="ch-hp"><i style="width:${c.hp}%"></i></span>
        <div class="ch-l3"><span>HP ${c.hp}%</span><span>${c.tem ? `Seu marco: ${marcaChefe(c)}` : "Ainda sem registro"}</span></div></div></div>`;
  }
  telas.chefes = () => {
    setToolbar(null);
    const cs = chefes(), mortos = cs.filter((c) => c.derrotado).length;
    const ordem = [...cs].sort((a, b) => (b.rel - a.rel) || (a.derrotado - b.derrotado) || (b.tem - a.tem) || (a.hp - b.hp));
    const destaque = ordem.find((c) => c.rel && !c.derrotado) || null;
    return `<section class="screen quiz ch-tela">
      <header class="fc-head"><a href="#/home" class="qz-voltar">← voltar</a></header>
      <p class="qz-kicker">Batalhas de chefe</p>
      <h1 class="fc-h1">Um chefe por liga</h1>
      <p class="ch-resumo"><b>${mortos}</b> de ${cs.length} derrotados · cada chefe vale <b>+${XP.chefe} XP</b></p>
      ${chefeBanner(destaque)}
      <div class="ch-lista">${ordem.filter((c) => c !== destaque).map(chefeCard).join("")}</div>
      <p class="ch-nota">Cada liga tem um chefe: ele perde vida a cada insígnia que você conquista e cai quando você tem todas, em qualquer faixa. As insígnias ficam no seu Perfil. O Canguru cai pelo Max Out no Cardio Challenge e pela melhora no Fit Test.</p>
    </section>`;
  };
  // Faixa grande do chefe do Insanity (tela de chefes e dias de Fit Test ou Cardio Challenge)
  function chefeBanner(c, hojeTxt = "") {
    if (!c) return "";
    return `<div class="ch-banner"><img src="${c.banner}" alt="">
      <div class="ch-bn-txt">${hojeTxt ? `<span class="ch-bn-k">${esc(hojeTxt)}</span>` : `<span class="ch-bn-k">${esc(c.tag || "Chefe")}</span>`}<b>${esc(c.nome)}</b><small>${esc(c.desc)}</small>
        <span class="ch-hp"><i style="width:${c.hp}%"></i></span><span class="ch-l3"><span>HP ${c.hp}%</span><span>${c.tem ? `Seu marco: ${marcaChefe(c)}` : "Primeiro combate"}</span></span></div></div>`;
  }
  function chefesNovos() {
    const mortos = chefes().filter((c) => c.derrotado).map((c) => c.k);
    if (!S.chefesVistos) { S.chefesVistos = mortos; save(); return; } // primeira vez: só registra, sem festa
    const novos = mortos.filter((k) => !S.chefesVistos.includes(k));
    if (!novos.length) return;
    S.chefesVistos = mortos; save();
    const c = chefes().find((x) => x.k === novos[0]);
    dlgGami(`<div class="gami-crest ch-crest">${c.img ? `<img src="${c.img}" alt="">` : c.ic}</div><p class="gami-k">Chefe derrotado · +${XP.chefe} XP</p><h2>${esc(c.nome)}</h2>
      <p class="note">${esc(c.desc)}: o seu marco é <b>${marcaChefe(c)}</b>.${novos.length > 1 ? ` E mais ${novos.length - 1} chefe${novos.length > 2 ? "s" : ""} caiu junto!` : ""}</p>`);
  }

  /* ---------- Missões do dia ---------- */
  const minutosDia = (k) => soma(linhasLocais().filter((r) => r.data === k).map((r) => r.minutos || 0));
  const seriesDia = (k) => soma(Object.values(S.logs[k]?.sets || {}).map((s) => s.length)) + soma(IAK.map((pk) => soma(Object.values(S[pk].logs[k]?.sets || {}).map((s) => (s || []).filter(Boolean).length))));
  // Vídeos marcados no calendário de hoje (programa principal ou o de vídeo do híbrido); dia de descanso conta 1 (vale um avulso)
  function videosHoje() {
    const p = VP[principal()] ? principal() : VP.insanity ? "insanity" : null;
    if (!p || !S[p]?.inicio) return 1;
    const n = diffDays(parseKey(S[p].inicio), hoje), t = n >= 0 ? insDia(p, Math.floor(n / 7), n % 7) : null;
    return Math.max(1, (t?.ids || []).length);
  }
  const videosDia = (k) => soma(VKEYS.map((p) => (S[p].logs[k]?.feitos || []).length));
  const MISSOES = {
    treino: { ic: "⚔️", t: "Conclua um treino", v: (k) => (feito(k) ? 1 : 0), alvo: () => 1, fmt: (v, a) => `${v}/${a}` },
    minutos: { ic: "⏱️", t: "Treine 30 minutos", v: minutosDia, alvo: () => 30, fmt: (v, a) => `${Math.min(v, a)}/${a} min` },
    series: { ic: "🔁", t: "Registre 15 séries", v: seriesDia, alvo: () => 15, fmt: (v, a) => `${Math.min(v, a)}/${a}` },
    videos: { ic: "🎬", t: "Faça os vídeos de hoje", v: videosDia, alvo: videosHoje, fmt: (v, a) => `${Math.min(v, a)}/${a}` },
    agua: { ic: "💧", t: "Bata a meta de água", v: (k) => soma((S.agua?.[k] || []).map((x) => x.ml || 0)), alvo: () => nutriMetas().agua, fmt: (v, a) => `${fmtL(Math.min(v, a))} de ${fmtL(a)}` },
    corrida: { ic: "🏃", t: "Registre uma corrida ou caminhada", v: (k) => ((S.corrida?.logs[k]?.itens || []).length ? 1 : 0), alvo: () => 1, fmt: (v, a) => `${v}/${a}` },
  };
  function missoesDe(k) {
    const p = principal(), t = trilha();
    const pool = ["minutos", "agua"];
    if (p === "plano" || IA[p] || IA[forcaHibrido()] && t === "hibrido") pool.push("series");
    if (VP[p] || t === "hibrido" || t === "insanos") pool.push("videos");
    if (t === "corrida" || t === "hibrido" || Object.keys(S.corrida?.logs || {}).length) pool.push("corrida");
    let h = 0; for (const ch of k + (S.user?.id || "")) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
    const a = pool[h % pool.length], resto = pool.filter((x) => x !== a), b = resto[(h >>> 8) % resto.length];
    return ["treino", a, b].map((id) => { const m = MISSOES[id], alvo = m.alvo(), v = m.v(k); return { id, ...m, alvoV: alvo, valor: v, ok: v >= alvo, pct: Math.min(100, Math.round((v / alvo) * 100)) }; });
  }
  // Guarda quantas missões foram cumpridas hoje (só aumenta) e o XP das que saíram da janela de 30 dias
  function registrarMissoes() {
    const n = missoesDe(hojeKey).filter((m) => m.ok).length;
    S.missoes = S.missoes || {};
    if (n > (S.missoes[hojeKey] || 0)) S.missoes[hojeKey] = n; else return false;
    const lim = keyOf(addDays(hoje, -30));
    for (const k of Object.keys(S.missoes)) if (k < lim) { S.missoesXpAnt = (S.missoesXpAnt || 0) + xpMissoesN(S.missoes[k]); delete S.missoes[k]; }
    return true;
  }
  const xpMissoesN = (n) => n * XP.missao + (n >= 3 ? XP.missoesTodas : 0);
  const missoesXp = () => soma(Object.values(S.missoes || {}).map(xpMissoesN)) + (S.missoesXpAnt || 0);
  function renovaEm() { const m = Math.max(0, Math.round((addDays(hoje, 1) - Date.now()) / 60000)); return `${Math.floor(m / 60)}h${pad(m % 60)}`; }
  function missoesHome() {
    const ms = missoesDe(hojeKey), feitas = ms.filter((m) => m.ok).length, cs = chefes(), mortos = cs.filter((c) => c.derrotado).length;
    const prox = cs.filter((c) => c.tem && !c.derrotado).sort((a, b) => a.hp - b.hp)[0];
    return `<div class="ms-card">
      <div class="ms-head"><span class="ms-k">Missões do dia</span><span class="ms-t" data-renova>renovam em ${renovaEm()}</span></div>
      ${ms.map((m) => `<div class="ms-row${m.ok ? " ok" : ""}"><span class="ms-ic">${m.ok ? "✓" : m.ic}</span><div class="ms-txt"><b>${esc(m.t)}</b><span class="ms-bar"><i style="width:${m.pct}%"></i></span></div><span class="ms-v">${m.ok ? `+${XP.missao} XP` : esc(m.fmt(m.valor, m.alvoV))}</span></div>`).join("")}
      <p class="ms-bonus">${feitas >= 3 ? `🏆 Todas cumpridas: +${XP.missoesTodas} XP de bônus!` : `Cumpra as 3 e ganhe <b>+${XP.missoesTodas} XP</b> de bônus (${feitas}/3)`}</p>
      <a class="ms-chefes" href="#/chefes"><span>⚔️ Chefes <b>${mortos}/${cs.length}</b></span><span>${prox ? `${prox.img ? `<img class="ms-ch-img" src="${prox.img}" alt="">` : prox.ic || ""} ${esc(prox.nome)} · HP ${prox.hp}%` : "Ver batalhas"} ›</span></a>
    </div>`;
  }
  setInterval(() => { const el = document.querySelector("[data-renova]"); if (el) el.textContent = `renovam em ${renovaEm()}`; }, 30000);

  /* ==========================================================
     Quiz de entrada (uma pergunta por tela, XP por resposta) e Ficha de atleta.
     A ficha começa estimada pelas respostas e passa a usar os treinos reais dos últimos 28 dias:
     FOR (séries de força), AGI (core e treinos metabólicos: WODs e vídeos), RES (cardio), DIS (constância).
     As respostas também preenchem a entrevista do Coach (Hipertrofia, Calistenia 21 dias, Corrida).
     ========================================================== */
  const QZ_XP = 15;
  const QUIZ = [
    { k: "sexo", kicker: "Seu personagem", q: "Pra começar, você é:", sub: "Define a arte do seu personagem. Ele evolui de Recruta a Imortal conforme você treina.", semXp: true, grade: true, op: [["m", `<img src="assets/classes/avatar/recruta-m.webp" alt="">`, "Homem"], ["f", `<img src="assets/classes/avatar/recruta-f.webp" alt="">`, "Mulher"]] },
    { k: "objetivo", kicker: "Objetivo", q: "O que você quer conquistar?", op: [["massa", "💪", "Ganhar massa muscular"], ["gordura", "🔥", "Perder gordura"], ["forca", "🏋️", "Ganhar força"], ["saude", "❤️", "Condicionamento e saúde"], ["correr", "🏃", "Correr mais e melhor"]] },
    { k: "nivel", kicker: "Condicionamento", q: "Como está o seu condicionamento hoje?", op: NIVEIS.map(([v, t], i) => [v, ["🌱", "⚡", "🦾"][i], v, t]) },
    { k: "local", kicker: "Campo de treino", q: "Onde você vai treinar?", op: [["casa", "🏠", "Em casa, sem equipamento"], ["barra", "🤸", "Em casa, com barra fixa"], ["halteres", "🏋️", "Em casa, com halteres"], ["academia", "🏢", "Na academia"], ["box", "⏱️", "Num box de CrossFit"], ["rua", "🌳", "Ao ar livre, correndo"]] },
    { k: "dias", kicker: "Frequência", q: "Quantos dias por semana dá para treinar?", op: ["2", "3", "4", "5", "6"].map((n) => [n, "📅", `${n} dias por semana`]) },
    { k: "tempo", kicker: "Tempo", q: "Quanto tempo você tem por treino?", op: [["20", "⏱️", "Até 20 min"], ["30", "⏱️", "30 min"], ["45", "⏱️", "45 min"], ["60", "⏱️", "1 hora ou mais"]] },
    { k: "obst", kicker: "Seus inimigos", q: "O que mais atrapalha o seu treino?", sub: "Pode marcar mais de um.", multi: true, op: [["tempo", "⏳", "Falta de tempo"], ["ritmo", "📉", "Começo e paro"], ["saber", "🤔", "Não sei o que fazer"], ["chato", "😴", "Enjoo do treino"], ["dor", "🩹", "Dor ou lesão"], ["nada", "✅", "Nada, só quero evoluir"]] },
    { k: "estilo", kicker: "Estilo", q: "O que te faz voltar a treinar?", op: [["videos", "🎬", "Seguir vídeos guiados"], ["cargas", "📈", "Anotar séries e ver a evolução"], ["desafios", "🏆", "Bater tempo e vencer desafios"], ["amigos", "👥", "Treinar junto com os amigos"]] },
  ];
  const qzTxt = (k, v) => QUIZ.find((p) => p.k === k)?.op.find((o) => o[0] === v)?.[2] || v || "—";
  function trilhaSugerida(r) {
    const tem = (k) => !!TRILHAS[k];
    if (r.local === "box") return "cross";
    if ((r.objetivo === "correr" || r.local === "rua") && tem("corrida")) return "corrida";
    if (r.local === "academia" || r.local === "halteres") return r.estilo === "videos" ? "hibrido" : "academia";
    if (r.local === "barra") return r.estilo === "videos" ? "hibrido" : "calistenia";
    return r.estilo === "cargas" ? "calistenia" : "insanos";
  }
  function quizPassos(modo, r) {
    const ps = [...QUIZ];
    if (modo !== "onboarding") return ps;
    const sug = trilhaSugerida(r);
    ps.push({ k: "trilha", kicker: "Sua trilha", q: "Por onde você quer começar?", sub: `Pelas suas respostas, ${TRILHAS[sug].nome} combina com você. Dá para trocar depois no Perfil, sem perder o XP.`, semXp: true,
      op: Object.entries(TRILHAS).sort(([a], [b]) => (b === sug) - (a === sug)).map(([k, x]) => [k, x.ic, x.nome, x.desc, k === sug]) });
    if (r.trilha === "hibrido" && IA.c21) ps.push({ k: "forca", kicker: "Dias de força", q: "Nos dias de força, você prefere…", semXp: true,
      op: [["hiper", "🏋️", "Academia"], ["c21", "🤸", "Calistenia"]] });
    if (r.trilha && TRILHAS[r.trilha] && etapaAtual(r.trilha).prog === "plano") ps.push({ k: "semana", kicker: "Treino da Fera", q: "Em qual semana do programa você está?", semXp: true,
      op: PROGRAMA.map((s, i) => [String(i + 1), "📆", `Semana ${i + 1}`, s.nome]) });
    return ps;
  }
  const qzRespondida = (v) => (Array.isArray(v) ? v.length > 0 : v !== undefined && v !== "");

  let QZ = null;
  function quizRender() {
    const box = $("#quiz"); if (!box || !QZ) return;
    const ps = quizPassos(QZ.modo, QZ.r), p = ps[QZ.i], sel = QZ.r[p.k];
    const xp = QUIZ.filter((x) => !x.semXp && qzRespondida(QZ.r[x.k])).length * QZ_XP;
    const on = (v) => (p.multi ? (sel || []).includes(v) : sel === v);
    box.innerHTML = `<div class="qz-top">
        <button type="button" class="qz-voltar" data-qz-voltar ${QZ.i === 0 && QZ.modo === "onboarding" ? "hidden" : ""}>← voltar</button>
        <div class="qz-bar" role="progressbar" aria-valuenow="${QZ.i}" aria-valuemax="${ps.length}"><i style="width:${Math.round((QZ.i / ps.length) * 100)}%"></i></div>
        <span class="qz-xp" id="qz-xp">⚡ <b>${xp}</b> XP</span>
      </div>
      <div class="qz-body">
        <p class="qz-kicker">${esc(p.kicker)}</p>
        <h1 class="qz-q">${esc(p.q)}</h1>
        <p class="qz-meta">Pergunta ${QZ.i + 1} de ${ps.length}${p.semXp ? "" : ` · vale <b>+${QZ_XP} XP</b>`}</p>
        ${p.sub ? `<p class="qz-sub">${esc(p.sub)}</p>` : ""}
        <div class="qz-ops${p.grade ? " grade" : ""}">${p.op.map(([v, ic, t, sub, rec]) => `<button type="button" class="qz-op${on(v) ? " on" : ""}${rec ? " rec" : ""}" data-qz="${esc(v)}">
          <span class="qz-ic">${ic}</span><span class="qz-t"><b>${esc(t)}</b>${sub ? `<small>${esc(sub)}</small>` : ""}</span>${rec ? `<span class="qz-rec">Recomendada</span>` : ""}</button>`).join("")}</div>
        ${p.multi ? `<button type="button" class="btn btn-blue qz-ok" data-qz-ok ${(sel || []).length ? "" : "disabled"}>Continuar</button>` : ""}
      </div>`;
    box.scrollTop = 0;
  }
  function startQuiz(modo) {
    const box = $("#quiz"); if (!box) return;
    QZ = { modo, i: 0, r: modo === "onboarding" ? {} : Object.fromEntries(QUIZ.map((p) => [p.k, S.quiz?.[p.k]]).filter(([, v]) => v !== undefined)), ocupado: false };
    quizRender();
    box.onclick = (e) => {
      if (!QZ || QZ.ocupado) return;
      const ps = quizPassos(QZ.modo, QZ.r), p = ps[QZ.i];
      if (e.target.closest("[data-qz-voltar]")) {
        if (QZ.i > 0) { QZ.i--; quizRender(); } else location.hash = S.ficha ? "#/ficha" : "#/evolucao";
        return;
      }
      if (e.target.closest("[data-qz-ok]")) return quizAvancar(p);
      const b = e.target.closest("[data-qz]"); if (!b) return;
      const v = b.dataset.qz;
      if (p.multi) {
        let a = [...(QZ.r[p.k] || [])];
        a = a.includes(v) ? a.filter((x) => x !== v) : v === "nada" ? ["nada"] : [...a.filter((x) => x !== "nada"), v];
        QZ.r[p.k] = a; quizRender(); return;
      }
      QZ.r[p.k] = v;
      box.querySelectorAll(".qz-op").forEach((x) => x.classList.toggle("on", x === b));
      quizAvancar(p, b);
    };
  }
  function quizAvancar(p, alvo) {
    const box = $("#quiz"), ganhou = !p.semXp && !QZ.contado?.[p.k];
    QZ.contado = { ...(QZ.contado || {}), [p.k]: true };
    if (ganhou) {
      const xp = $("#qz-xp"); if (xp) { xp.querySelector("b").textContent = QUIZ.filter((x) => !x.semXp && qzRespondida(QZ.r[x.k])).length * QZ_XP; xp.classList.remove("pop"); void xp.offsetWidth; xp.classList.add("pop"); }
      if (alvo) { const f = document.createElement("span"); f.className = "qz-float"; f.textContent = `+${QZ_XP} XP`; alvo.appendChild(f); }
    }
    QZ.ocupado = true;
    setTimeout(() => {
      QZ.ocupado = false;
      if (!$("#quiz")) return;
      QZ.i++;
      if (QZ.i >= quizPassos(QZ.modo, QZ.r).length) quizFim(); else quizRender();
    }, alvo ? 420 : 120);
    void box;
  }
  function quizFim() {
    const r = QZ.r, modo = QZ.modo;
    S.quiz = { ...Object.fromEntries(QUIZ.map((p) => [p.k, r[p.k]])), em: hojeKey };
    if (modo === "onboarding") {
      S.nivel = r.nivel; S.trilha = r.trilha;
      if (r.forca) S.forca = r.forca;
      const at = etapaAtual();
      escolherPrograma(at.prog);
      if (at.prog === "plano") S.inicio = keyOf(addDays(mondayOf(hoje), -((Number(r.semana) || 1) - 1) * 7));
    }
    preencherCoach(S.quiz);
    novaFicha();
    save();
    QZ = null;
    const box = $("#quiz");
    box.onclick = null;
    box.classList.add("fc-tela");
    box.innerHTML = fichaHtml(modo === "onboarding" ? "onboarding" : "nova");
    box.scrollTop = 0;
  }

  /* Respostas do quiz que valem para a entrevista do Coach: só as que batem com uma opção dele (as outras ele pergunta) */
  const QZ_COACH = {
    hiper: { sexo: (q) => ({ m: "Masculino", f: "Feminino" }[q.sexo]), objetivo: (q) => ({ massa: "Ganhar massa muscular", gordura: "Perder gordura", forca: "Ganhar força", saude: "Saúde e condicionamento" }[q.objetivo]),
      dias: (q) => q.dias, tempo: (q) => ({ 45: "45 min", 60: "1 hora" }[q.tempo]), local: (q) => ({ academia: "Academia completa", halteres: "Em casa com halteres" }[q.local]) },
    c21: { sexo: (q) => ({ m: "Masculino", f: "Feminino" }[q.sexo]), objetivo: (q) => ({ gordura: "Perder gordura", forca: "Ganhar força (primeira barra, mais flexões)", saude: "Condicionamento e saúde" }[q.objetivo]),
      equipamento: (q) => ({ casa: "Só peso do corpo", barra: "Tenho barra fixa" }[q.local]), dias: (q) => (Number(q.dias) >= 3 ? q.dias : undefined),
      tempo: (q) => ({ 20: "20 min", 30: "30 min", 45: "45 min", 60: "45 min" }[q.tempo]) },
    run: { sexo: (q) => ({ m: "Masculino", f: "Feminino" }[q.sexo]), objetivo: (q) => ({ gordura: "Perder gordura" }[q.objetivo]), forca: (q) => ({ academia: "Academia", halteres: "Em casa com halteres", casa: "Só peso do corpo", barra: "Barra fixa e peso do corpo" }[q.local]),
      dias: (q) => (Number(q.dias) >= 3 ? q.dias : undefined), tempo: (q) => ({ 30: "30 min", 45: "45 min", 60: "1 hora" }[q.tempo]) },
  };
  function preencherCoach(q) {
    for (const [pk, m] of Object.entries(QZ_COACH)) {
      const St = S[pk]; if (!IA[pk] || !St || St.plano || (St.etapa || 0) > 0) continue;
      St.pre = {};
      for (const [k, f] of Object.entries(m)) { const v = f(q); if (v) { St.perfil[k] = String(v); St.pre[k] = true; } }
    }
  }
  const coachFaltam = (pk) => IA[pk].passos.filter((p) => !S[pk].pre?.[p.k]).length;

  /* ---------- Ficha ---------- */
  const LETRAS = ["E", "D", "C", "B", "A", "S"], RANK_MIN = [0, 20, 35, 50, 65, 80];
  const rankDe = (m) => LETRAS[RANK_MIN.filter((x) => m >= x).length - 1];
  const ATRIB = [["for", "FOR", "Força: séries de empurrar, puxar e pernas"], ["agi", "AGI", "Agilidade: core, treinos metabólicos (WODs e vídeos) e um pouco do cardio"], ["res", "RES", "Resistência: corrida e cardio"], ["dis", "DIS", "Disciplina: treinos na meta da semana e sequência"]];
  const clampA = (v) => Math.max(5, Math.min(99, Math.round(v)));
  function fichaBase(q) {
    const b0 = { Iniciante: 18, "Intermediário": 34, "Avançado": 50 }[q.nivel] ?? 22;
    const x = { for: b0, agi: b0, res: b0, dis: b0 - 6 };
    if (q.objetivo === "massa" || q.objetivo === "forca") x.for += 6;
    if (q.objetivo === "gordura" || q.objetivo === "saude") { x.res += 4; x.agi += 3; }
    if (q.objetivo === "correr") x.res += 7;
    if (q.local === "box") x.agi += 6;
    if (q.local === "rua") x.res += 4;
    if (q.local === "academia") x.for += 4;
    if ((q.obst || []).includes("ritmo")) x.dis -= 8;
    if (Number(q.dias) >= 5) x.dis += 4;
    return Object.fromEntries(Object.entries(x).map(([k, v]) => [k, clampA(v)]));
  }
  function fichaReal() {
    const a = keyOf(addDays(hoje, -27)), r28 = linhasLocais().filter((r) => r.data >= a && r.data <= hojeKey), fe = feitas(r28);
    const dias = new Set(fe.map((r) => r.data)).size, v = volumePadroes(r28);
    const metcon = fe.filter((r) => r.programa === "cf" || VP[r.programa]).length;
    const nota = (x, alvo) => 100 * Math.sqrt(Math.min(1, x / alvo));
    return { dias, for: nota(v.empurrar + v.puxar + v.pernas, 360), agi: nota(v.core + metcon * 6 + v.cardio * 0.3, 150), res: nota(v.cardio, 150),
      dis: 85 * Math.min(1, dias / (metaSemana() * 4)) + Math.min(15, sequencia() * 2) };
  }
  function fichaAtual() {
    const base = S.ficha?.base || fichaBase(S.quiz || {}), real = fichaReal(), w = Math.min(1, real.dias / 8);
    const attrs = Object.fromEntries(ATRIB.map(([k]) => [k, clampA(base[k] * (1 - w) + real[k] * w)]));
    const media = Math.round(soma(Object.values(attrs)) / ATRIB.length);
    return { attrs, media, rank: rankDe(media), w, real };
  }
  function novaFicha() {
    S.ficha = { base: fichaBase(S.quiz), criada: hojeKey, metaIni: hojeKey };
    novaMeta();
  }
  function novaMeta() {
    const f = fichaAtual();
    Object.assign(S.ficha, { metaIni: hojeKey, rankIni: f.rank, ini: f.attrs, meta: LETRAS[Math.min(LETRAS.length - 1, LETRAS.indexOf(f.rank) + 1)] });
  }
  const OBST = {
    tempo: (q) => ["Falta de tempo", `Treinos de ${q.tempo === "60" ? "1 hora" : `${q.tempo || 30} min`}, ${q.dias || 3}x por semana. Num dia corrido, o Treino de emergência leva 15 min.`],
    ritmo: () => ["Começo e paro", "Sequência, meta da semana e XP mostram o seu ritmo. O Coach analisa o seu último treino sempre que você abre a conversa."],
    saber: () => ["Não sei o que fazer", "O treino do dia já vem pronto, com vídeo de execução e as séries para anotar."],
    chato: () => ["Enjoo do treino", "Desafios com os amigos, conquistas e uma classe nova a cada 5 níveis. Dá para trocar de trilha sem perder o XP."],
    dor: () => ["Dor ou lesão", "Conte ao Coach o que dói: ele adapta os exercícios. Se a dor for forte ou não passar, procure um profissional."],
  };
  function proximoPasso() {
    const k = principal(), x = progDe(k);
    if (k === "plano") { const n = semanaDe(hoje), t = treino(Math.max(0, n), hojeDia); return `Hoje é <b>${DIAS[hojeDia]} da Semana ${Math.max(0, n) + 1}</b>${t ? `: <b>${esc(t.titulo)}</b>` : ""}. Em cada exercício, anote as repetições de cada série.`; }
    if (k === "cf") return "No box, tire uma foto do quadro: eu leio o WOD e lanço o treino. Depois você anota o tempo ou as voltas.";
    if (IA[k]) { const m = coachFaltam(k); return `Agora o Coach monta o seu <b>${esc(x.nome)}</b>. ${m < IA[k].passos.length ? `Já usei as suas respostas: faltam só <b>${m} perguntas</b>.` : `São ${m} perguntas rápidas.`}`; }
    if (VP[k]) { const w = insSemanaDe(k, hoje); return w < 0 ? `A semana 1 do <b>${esc(x.nome)}</b> começa na segunda, ${ddmm(S[k].inicio)}. Até lá, dá para conhecer os vídeos.` : `Você está na <b>semana 1</b> do ${esc(x.nome)}. Abra o treino de hoje, toque em Assistir e marque cada vídeo como feito.`; }
    return "";
  }
  function fichaHtml(modo) {
    const q = S.quiz || {}, F = S.ficha, f = fichaAtual(), n = meuNivel(), nova = modo !== "pagina";
    const dias = Math.max(0, Math.min(30, diffDays(parseKey(F.metaIni), hoje))), fim = keyOf(addDays(parseKey(F.metaIni), 30));
    const iMeta = LETRAS.indexOf(F.meta), batida = LETRAS.indexOf(f.rank) >= iMeta, falta = Math.max(0, RANK_MIN[iMeta] - f.media);
    const obst = (q.obst || []).filter((o) => OBST[o]).map((o) => OBST[o](q));
    const bar = ([k, rot, tip]) => { const v = f.attrs[k], d = v - (F.ini?.[k] ?? v);
      return `<div class="fc-attr" title="${esc(tip)}"><b>${rot}</b><span class="fc-bar"><i style="width:${v}%"></i></span><strong>${v}</strong>${!nova && d ? `<em class="${d > 0 ? "up" : "dn"}">${d > 0 ? "+" : ""}${d}</em>` : "<em></em>"}</div>`; };
    const metaTxt = batida ? "Meta batida! 🎉" : dias >= 30 ? "Prazo da meta acabou" : `faltam ${falta} pts`;
    return `${modo === "pagina" ? `<header class="fc-head"><a href="#/evolucao" class="qz-voltar">← voltar</a></header>` : ""}
      <div class="fc-wrap">
        <p class="qz-kicker gold">${nova ? "[ Coach ] · análise concluída" : "Ficha de atleta"}</p>
        ${nova ? `<h1 class="fc-h1">${esc(primeiroNome())}, sua ficha de atleta está pronta</h1>` : ""}
        ${nova ? `<p class="fc-ganho">⚡ +${XP.ficha} XP pela ficha</p>` : ""}
        <div class="fc-card">
          <div class="fc-top">
            <span class="fc-av metal-${n.metal}"><img src="${avatarClasse(n.slug)}" alt=""></span>
            <div class="fc-id"><strong>${esc(primeiroNome())}</strong><span class="fc-cl">${esc(n.classe)}${estiloAtual().slug ? ` · ${esc(estiloAtual().nome)}` : ""} · nível ${n.nivel}</span>
              <div class="fc-rank"><span>Rank<br>${nova ? "inicial" : "atual"}</span><b class="rk rk-${f.rank}">${f.rank}</b><span>→ meta até<br>${ddmm(fim)}</span><b class="rk rk-${F.meta}">${F.meta}</b></div></div>
          </div>
          ${ATRIB.map(bar).join("")}
          <div class="fc-attr meta"><b>META</b><span class="fc-bar"><i style="width:${Math.round((dias / 30) * 100)}%"></i></span><strong>${dias}/30d</strong><em></em></div>
          <p class="fc-nota">${batida && !nova ? "Meta batida! 🎉 " : !nova ? `${esc(metaTxt)} para o rank ${F.meta}. ` : ""}${f.real.dias ? `Calculada com ${f.real.dias} ${f.real.dias === 1 ? "treino" : "treinos"} dos últimos 28 dias${f.w < 1 ? " e as suas respostas" : ""}.` : "Estimada pelas suas respostas: a cada treino ela passa a usar os seus dados reais."}</p>
          ${!nova && (batida || dias >= 30) ? `<button type="button" class="btn btn-blue fc-btn" data-ficha-meta>Nova meta de 30 dias</button>` : ""}
        </div>
        ${estiloHtml()}
        <div class="fc-grid">
          <div><small>Trilha</small><strong>${TRILHAS[trilha()].ic} ${esc(TRILHAS[trilha()].nome)}</strong></div>
          <div><small>Programa</small><strong>${esc(progDe(principal())?.nome || "—")}</strong></div>
          <div><small>Frequência</small><strong>${q.dias ? `${q.dias}x por semana` : "—"}</strong></div>
          <div><small>Por treino</small><strong>${q.tempo ? (q.tempo === "60" ? "1 hora+" : `${q.tempo} min`) : "—"}</strong></div>
        </div>
        ${obst.length ? `<p class="qz-kicker">Seus inimigos, derrotados</p><div class="fc-obst">${obst.map(([t, s]) => `<div><span>✓</span><p><b>${esc(t)}:</b> ${esc(s)}</p></div>`).join("")}</div>` : ""}
        <details class="fc-leg"><summary>Como os atributos são calculados</summary><ul>${ATRIB.map(([, r, t]) => `<li><b>${r}</b> ${esc(t)}</li>`).join("")}<li>Rank pela média: ${LETRAS.map((x, i) => `${x} ${RANK_MIN[i]}+`).join(" · ")}</li></ul></details>
        ${modo === "onboarding" ? `<p class="qz-kicker">Próximo passo</p><p class="fc-prox">${proximoPasso()}</p><button type="button" class="btn btn-blue fc-btn grande" data-ficha-comecar>Começar 💪</button>`
          : modo === "nova" ? `<button type="button" class="btn btn-blue fc-btn grande" data-ficha-ok>Ver minha ficha</button>`
          : `<button type="button" class="fc-refazer" data-ficha-refazer>Refazer o quiz</button>`}
      </div>`;
  }
  telas.ficha = (p1) => {
    setToolbar(null);
    if (!S.ficha || p1 === "quiz") return `<section class="screen quiz" id="quiz"></section>`;
    return `<section class="screen quiz fc-tela" id="ficha">${fichaHtml("pagina")}</section>`;
  };
  function fichaMini() {
    if (!S.ficha) return `<a class="evo-card fc-mini" href="#/ficha"><span class="rk rk-q">?</span><span><strong>Monte a sua ficha de atleta</strong><span class="t">${QUIZ.length} perguntas rápidas, +${XP.ficha} XP: rank, atributos e uma meta de 30 dias.</span></span></a>`;
    const f = fichaAtual();
    return `<a class="evo-card fc-mini" href="#/ficha"><span class="rk rk-${f.rank}">${f.rank}</span><span><strong>Ficha de atleta · meta ${S.ficha.meta}</strong><span class="t">${ATRIB.map(([k, r]) => `${r} ${f.attrs[k]}`).join(" · ")}</span></span></a>`;
  }
  document.addEventListener("click", (e) => {
    if (e.target.closest("[data-ficha-comecar]")) {
      S.onboarded = true; save(); location.hash = principal() === "plano" ? "#/home" : `#/${principal()}`;
      if (IA[principal()] && !S[principal()].plano) setTimeout(() => iaIniciarChat(principal()), 500);
    } else if (e.target.closest("[data-ficha-ok]")) { if (location.hash === "#/ficha") render(); else location.hash = "#/ficha"; }
    else if (e.target.closest("[data-ficha-refazer]")) location.hash = "#/ficha/quiz";
    else if (e.target.closest("[data-ficha-meta]")) { novaMeta(); save(); render(); }
    else if (e.target.closest("[data-arte]")) { S.arte = e.target.closest("[data-arte]").dataset.arte; save(); render(); }
  });

  if (S.logado && !S.user) aplicarTrava(); // visitante: só o MAX:30 (e a Fera de apoio)
  conferirXp(true);
  render();
  carregarVideos();
  vtTick(); // cronômetro de vídeo que ficou rodando antes de recarregar a página
})();
