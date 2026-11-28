/* FIT.AI — Inventário (Arsenal) e Mercado.
   ITENS: o que a pessoa pode ter. eq = muda o treino (o Sensei só usa exercícios cujo equipamento a pessoa tem).
   link = link de afiliado do Mercado Livre (meli.la, conta edu_t2014; vazio = "em breve").
   ART: ícones provisórios em pixel art (uma letra = uma cor de PAL). Para usar uma arte nova, ponha a imagem em
   assets/itens/<id>.webp e preencha img: "assets/itens/<id>.webp" no item.
   Usado pelo app (public/app.js) e pelo servidor (api/functions/hiper.mjs). */
(function () {
  const ITENS = [
    { id: "barra", img: "assets/itens/barra.webp", nome: "Barra fixa de porta", curto: "Barra fixa", cat: "armas", eq: true, txt: "Libera barra, australiana na barra e os treinos de costas da calistenia.", link: "https://meli.la/2zJaiTp" },
    { id: "paralelas", img: "assets/itens/paralelas.webp", nome: "Paralelas (parallettes)", curto: "Paralelas", cat: "armas", eq: true, txt: "Libera mergulho, L-sit e os dias de habilidade.", link: "https://meli.la/1wqMHu5" },
    { id: "halteres", img: "assets/itens/halteres.webp", nome: "Halteres", curto: "Halteres", cat: "armas", eq: true, txt: "Treino de academia em casa: supino, remada, búlgaro e rosca.", link: "https://meli.la/1t31bKv" },
    { id: "kettlebell", img: "assets/itens/kettlebell.webp", nome: "Kettlebell", curto: "Kettlebell", cat: "armas", eq: true, txt: "Vale nos exercícios com carga da corrida e do híbrido (farmer walk, wall ball, afundo). Exercícios próprios chegando.", link: "https://meli.la/1roAN5f" },
    { id: "elasticos", img: "assets/itens/elasticos.webp", nome: "Kit de elásticos", curto: "Elásticos", cat: "armas", eq: true, txt: "Ajuda a completar a barra e substitui puxadas. Exercícios próprios chegando.", link: "https://meli.la/2StzHJq" },
    { id: "corda", img: "assets/itens/corda.webp", nome: "Corda de pular", curto: "Corda", cat: "armas", eq: true, txt: "Cardio de bolso e desafios de corda do grupo.", link: "https://meli.la/1weSxbN" },
    { id: "banco", img: "assets/itens/banco.webp", nome: "Banco de treino", curto: "Banco", cat: "armas", eq: true, txt: "Apoio para supino, búlgaro e remada serrote.", link: "https://meli.la/1PzwhPc" },
    { id: "passe", nome: "Passe da Academia", curto: "Academia", cat: "artefatos", eq: true, txt: "Você treina numa academia: libera barra olímpica, máquinas, polias, halteres, barra fixa e paralelas.", semLoja: true },
    { id: "relogio", img: "assets/itens/relogio.webp", nome: "Relógio esportivo", curto: "Relógio", cat: "artefatos", eq: false, txt: "Mede o pace e gera o print da corrida que vale XP.", link: "https://meli.la/2yYqPpU" },
    { id: "roupa", img: "assets/itens/roupa.webp", nome: "Roupa de treino", curto: "Roupa", cat: "armaduras", eq: false, txt: "Vestimenta. Não muda o treino.", link: "https://meli.la/275itm8" },
    { id: "tenis", img: "assets/itens/tenis.webp", nome: "Tênis de corrida", curto: "Tênis", cat: "armaduras", eq: false, txt: "Para a trilha de corrida. Não muda o treino.", link: "https://meli.la/32EdWN2" },
    { id: "garrafa", img: "assets/itens/garrafa.webp", nome: "Garrafa de água", curto: "Garrafa", cat: "pocoes", eq: false, txt: "Combina com a missão diária de água.", link: "https://meli.la/2EfsvWS" },
    { id: "whey", img: "assets/itens/whey.webp", nome: "Whey protein", curto: "Whey", cat: "pocoes", eq: false, txt: "Suplemento. Converse com um nutricionista antes de usar.", link: "https://meli.la/1sRzHji" },
    { id: "creatina", img: "assets/itens/creatina.webp", nome: "Creatina", curto: "Creatina", cat: "pocoes", eq: false, txt: "Suplemento. Converse com um nutricionista antes de usar.", link: "https://meli.la/1f2PQD7" },
    { id: "tapete", img: "assets/itens/tapete.webp", nome: "Tapete de treino", curto: "Tapete", cat: "armas", eq: false, txt: "Para os treinos em vídeo no chão (Insanity, MAX:30, abdômen). Não muda o treino.", link: "https://meli.la/1t2LssT" },
    { id: "roda", img: "assets/itens/roda.webp", nome: "Roda abdominal", curto: "Roda abs", cat: "armas", eq: true, txt: "Abdômen mais forte: combina com a missão do vídeo de abdômen.", link: "https://meli.la/2DH1qj8" },
    { id: "argolas", img: "assets/itens/argolas.webp", nome: "Argolas de ginástica", curto: "Argolas", cat: "armas", eq: true, txt: "Calistenia avançada: remada, mergulho e muscle-up nas argolas.", link: "https://meli.la/226kqZs" },
    { id: "miniband", img: "assets/itens/miniband.webp", nome: "Mini band", curto: "Mini band", cat: "armas", eq: true, txt: "Faixa curta para glúteos e aquecimento.", link: "https://meli.la/2k5mezm" },
    { id: "caixa", img: "assets/itens/caixa.webp", nome: "Caixa de salto", curto: "Caixa", cat: "armas", eq: true, txt: "Box jump e step-up do CrossFit, e os exercícios na caixa do xTreme Workout.", link: "https://meli.la/2ww1qZj" },
    { id: "slamball", img: "assets/itens/slamball.webp", nome: "Slam ball", curto: "Slam ball", cat: "armas", eq: true, txt: "Slam e wall ball do CrossFit.", link: "https://meli.la/2U4T2zk" },
    { id: "colete", img: "assets/itens/colete.webp", nome: "Colete de peso", curto: "Colete", cat: "armaduras", eq: true, txt: "Carga extra na calistenia e na corrida.", link: "https://meli.la/2fGnivQ" },
    { id: "luva", img: "assets/itens/luva.webp", nome: "Luva de treino", curto: "Luva", cat: "armaduras", eq: false, txt: "Pegada firme na barra e no kettlebell. Não muda o treino.", link: "https://meli.la/1iaJsoR" },
    { id: "coqueteleira", img: "assets/itens/coqueteleira.webp", nome: "Coqueteleira", curto: "Coqueteleira", cat: "pocoes", eq: false, txt: "Para o whey e a água do treino.", link: "https://meli.la/277gXaZ" },
    { id: "balanca", img: "assets/itens/balanca.webp", nome: "Balança de bioimpedância", curto: "Balança", cat: "artefatos", eq: false, txt: "Peso e gordura corporal para a pesagem da semana e a Evolução.", link: "https://meli.la/32eFKtq" },
    { id: "fita", img: "assets/itens/fita.webp", nome: "Fita métrica corporal", curto: "Fita métrica", cat: "artefatos", eq: false, txt: "Medidas de cintura, braço e coxa para acompanhar a Evolução.", link: "https://meli.la/2C3KMRB" },
    { id: "cinta", img: "assets/itens/cinta.webp", nome: "Cinta cardíaca", curto: "Cinta", cat: "artefatos", eq: false, txt: "Frequência cardíaca precisa na corrida e no Insanity.", link: "https://meli.la/1oCkeeJ" },
    { id: "rolo", img: "assets/itens/rolo.webp", nome: "Rolo de liberação", curto: "Rolo", cat: "artefatos", eq: false, txt: "Recuperação muscular depois do treino.", link: "https://meli.la/2meaLHK" },
    { id: "fone", img: "assets/itens/fone.webp", nome: "Fone esportivo", curto: "Fone", cat: "artefatos", eq: false, txt: "Música na corrida e nos treinos em vídeo.", link: "https://meli.la/1MZgCsJ" },
  ];
  const CATS = [
    { id: "armas", nome: "Armas", ic: "halteres", img: "assets/categorias/armas.webp" }, { id: "armaduras", nome: "Armaduras", ic: "roupa", img: "assets/categorias/armaduras.webp" },
    { id: "pocoes", nome: "Poções", ic: "whey", img: "assets/categorias/pocoes.webp" }, { id: "artefatos", nome: "Artefatos", ic: "relogio", img: "assets/categorias/artefatos.webp" },
  ];

  // Que item a pessoa precisa ter para fazer o exercício (qualquer um da lista serve). null = só o corpo.
  // origem: "ac" (academia.js), "cal" (calistenia21.js), "run" (corrida.js) ou "xt" (xtreme.js). Na academia, equip
  // "barra" é a barra olímpica; na calistenia e no xTreme, é a barra fixa.
  function exige(e, origem) {
    if (!e) return null;
    const q = e.equip, id = String(e.id || "");
    if (origem === "ac") {
      if (q === "barra" || q === "maquina" || q === "polia") return ["passe"];
      if (q === "halter") return ["halteres", "passe"];
      if (q === "cardio") return ["passe"]; // esteira e bike da academia
      if (/barra-fixa|graviton/.test(id)) return ["barra", "passe"];
      if (/paralela|mergulho/.test(id)) return ["paralelas", "passe"];
      return null;
    }
    if (q === "barra") return ["barra", "passe"];
    if (q === "paralela") return ["paralelas", "passe"];
    if (q === "halter") return ["halteres", "kettlebell", "passe"];
    if (q === "caixa") return ["caixa", "passe"]; // xTreme Workout (xtreme.js)
    return null;
  }
  const pode = (e, origem, inv) => { const r = exige(e, origem); return !r || r.some((x) => inv.includes(x)); };

  // Exercícios de cada catálogo que o item libera (para mostrar "+N exercícios")
  function liberados(itemId) {
    const g = globalThis, fontes = [["ac", g.FITAI_ACADEMIA], ["cal", g.FITAI_CAL21], ["run", g.FITAI_CORRIDA], ["xt", g.FITAI_XTREME]];
    const ids = new Set();
    for (const [o, cat] of fontes) for (const e of cat || []) { const r = exige(e, o); if (r && r.includes(itemId)) ids.add(e.id); }
    return ids.size;
  }

  const PAL = { k: "#2b1d14", g: "#8d96a1", G: "#d8dee6", r: "#c8442f", y: "#e8b04a", b: "#3d6fd8", w: "#f4efe6", n: "#7a4b2a", l: "#5fbf5a", p: "#9b59c9", s: "#e9b48a", h: "#3a2a22" };
  const ART = {
    barra: ["nnnnnnnnnnn", "n.........n", "nGGGGGGGGGn", "nkkkkkkkkkn", "n.........n", "n...sss...n", "n..rrrrr..n", "n..rrrrr..n", "n...bbb...n", "n...b.b...n", "nn..k.k..nn"],
    paralelas: ["...........", "...........", "kGGGGGGGGGk", "kkkkkkkkkkk", ".k.......k.", "kkk.....kkk", "...........", "kGGGGGGGGGk", "kkkkkkkkkkk", ".k.......k.", "kkk.....kkk"],
    halteres: ["...........", "...........", ".kk.....kk.", "kggk...kggk", "kGgkkkkkgGk", "kGgGGGGGgGk", "kggkkkkkggk", "kggk...kggk", ".kk.....kk.", "...........", "..........."],
    kettlebell: ["...kkkkk...", "..kk...kk..", "..k.....k..", ".kkk...kkk.", "kgggkkkgggk", "kgGgggggggk", "kgGgggggggk", "kggggggggGk", "kgggggggggk", ".kgggggggk.", "..kkkkkkk.."],
    elasticos: ["...........", "..rrrrrrr..", ".rr.....rr.", "rr.......rr", "r..yyyyy..r", "r.yy...yy.r", "rryy...yyrr", ".yy.....yy.", "yy.......yy", ".yyyyyyyyy.", "..........."],
    corda: ["..kkkkkkk..", ".k.......k.", "k.........k", "k.........k", "k.........k", "k.........k", "y.........y", "yy.......yy", "yy.......yy", "yy.......yy", "kk.......kk"],
    banco: ["...........", "...........", "...........", "rrrrrrrrrrr", "rrrrrrrrrrr", "kkkkkkkkkkk", ".kk.....kk.", ".kk.....kk.", ".kk.....kk.", "kkkk...kkkk", "..........."],
    passe: ["...........", "kkkkkkkkkkk", "kbbbbbbbbbk", "kbwwbbbbbbk", "kbwwbyyyybk", "kbbbbbbbbbk", "kbwwwwwwwbk", "kbbbbbbbbbk", "kkkkkkkkkkk", "...........", "..........."],
    roupa: ["..kk...kk..", ".krrkkkrrk.", "krrrrwrrrrk", "krrrrwrrrrk", "kkrrrrrrrkk", "..krrrrrk..", "..krrrrrk..", "..krrrrrk..", "..krrrrrk..", "..kkkkkkk..", "..........."],
    tenis: ["...........", "...........", "..kkkk.....", "..kbbk.....", "..kbwbk....", "..kbbwbkk..", ".kbbbbbbbkk", "kbbbbbbbbbk", "kwwwwwwwwwk", "kkkkkkkkkkk", "..........."],
    garrafa: ["....kkk....", "....kGk....", "...kkkkk...", "..kbbbbbk..", "..kbwbbbk..", "..kbwbbbk..", "..kbbbbbk..", "..kbbbbbk..", "..kbbbbbk..", "..kbbbbbk..", "..kkkkkkk.."],
    relogio: ["...knnnk...", "...knnnk...", "..kkkkkkk..", "..kGGGGGk..", "..kGkGGGk..", "..kGkkkGk..", "..kGGGGGk..", "..kkkkkkk..", "...knnnk...", "...knnnk...", "..........."],
    whey: ["..kkkkkkk..", "..kpppppk..", ".kkkkkkkkk.", ".kpppppppk.", ".kpwwwwwpk.", ".kpwpppwpk.", ".kpwwwwwpk.", ".kpppppppk.", ".kpppppppk.", ".kkkkkkkkk.", "..........."],
    creatina: ["...........", "...kkkkk...", "...klllk...", "..kkkkkkk..", "..kwwwwwk..", "..kwlllwk..", "..kwwwwwk..", "..kwwwwwk..", "..kwwwwwk..", "..kkkkkkk..", "..........."],
    tapete: ["...........", "...........", "..bbbbbbbbb", ".bwbbbbbbbb", "bwkwbbbbbbb", "bkbwbbbbbbb", ".bwbbbbbbbb", "..bbbbbbbbb", "...........", "...........", "..........."],
    roda: ["...........", "....kkk....", "...krrrk...", "..krrrrrk..", "GGkrrgrrkGG", "kkkrgkgrkkk", "GGkrrgrrkGG", "..krrrrrk..", "...krrrk...", "....kkk....", "..........."],
    argolas: ["..y.....y..", "..y.....y..", "..y.....y..", "..y.....y..", ".nnn...nnn.", "n...n.n...n", "n...n.n...n", "n...n.n...n", ".nnn...nnn.", "...........", "..........."],
    miniband: ["...........", "...........", ".rrrrrrrrr.", "r.........r", ".rrrrrrrrr.", ".yyyyyyyyy.", "y.........y", ".yyyyyyyyy.", ".lllllllll.", "l.........l", ".lllllllll."],
    caixa: ["...........", "...........", "nnnnnnnnnnn", "nyyyyyyyyyn", "nyyyyyyyyyn", "nyyykkkyyyn", "nyykkkkkyyn", "nyyyyyyyyyn", "nyyyyyyyyyn", "nyyyyyyyyyn", "nnnnnnnnnnn"],
    slamball: ["...........", "...kkkkk...", "..kgggggk..", ".kgGggggGk.", "kgggggggggk", "kkkkkkkkkkk", "kgggggggggk", ".kgggggggk.", "..kgggggk..", "...kkkkk...", "..........."],
    colete: ["...........", "..kk...kk..", ".kgk...kgk.", ".kggkkkggk.", "kgggggggggk", "kgkkgggkkgk", "kgkkgggkkgk", "kgggggggggk", "kgkkgggkkgk", "kgggggggggk", "kkkkkkkkkkk"],
    luva: ["...........", "..k.k.k....", ".kskskskk..", ".kskskskk..", ".kkkkkkkks.", ".kkkkkkkkk.", ".kkkkkkkkk.", "..kkkkkkk..", "..rrrrrrr..", "..rrrrrrr..", "..........."],
    coqueteleira: ["....kkk....", "...kkkkk...", "..kkkkkkk..", "..kwwwwwk..", "..kwwwwwk..", "..knnnnnk..", "..knnnnnk..", "..knnnnnk..", "..knnnnnk..", "..kwwwwwk..", "..kkkkkkk.."],
    balanca: ["...........", "kkkkkkkkkkk", "kGGGGGGGGGk", "kGGkkkkkGGk", "kGGklllkGGk", "kGGkkkkkGGk", "kGGGGGGGGGk", "kGGGGGGGGGk", "kGGGGGGGGGk", "kkkkkkkkkkk", "..........."],
    fita: ["...........", "..kkkkkk...", ".kyyyyyyk..", "kyyykkyyyk.", "kyykwwkyyk.", "kyykwwkyyky", "kyyykkyyykw", ".kyyyyyyk.y", "..kkkkkk..w", "..........y", "..........."],
    cinta: ["...........", "...........", "...........", "kkkkkkkkkkk", "kkkkrrrkkkk", "kkkrrrrrkkk", "kkkkrrrkkkk", "kkkkkrkkkkk", "...........", "...........", "..........."],
    rolo: ["...........", "...........", "..bbbbbbbk.", ".bbbbbbbbbk", "kbwbwbwbwbk", "kbbbbbbbbbk", "kbwbwbwbwbk", ".bbbbbbbbbk", "..kkkkkkkk.", "...........", "..........."],
    fone: ["...........", "...kkkkk...", "..k.....k..", ".k.......k.", ".k.......k.", "kkk.....kkk", "krk.....krk", "krk.....krk", "kkk.....kkk", "...........", "..........."],
    merc: ["...nnnnn...", "..nnnnnnn..", "nnnnnnnnnnn", "..skssks...", "..ssssss...", "..shhhhs...", "..llllll...", ".lllyylll..", ".slllllls..", "..llllll...", "..kk..kk..."],
  };
  function icone(id, cls = "inv-svg", soArte = false) {
    const it = ITENS.find((x) => x.id === id);
    if (it?.img && !soArte) return `<img class="${cls}${it.px ? " px" : ""}" src="${it.img}" alt="" loading="lazy">`;
    const a = ART[id]; if (!a) return "";
    let r = "";
    a.forEach((row, y) => [...row].forEach((c, x) => { if (c !== ".") r += `<rect x="${x}" y="${y}" width="1.02" height="1.02" fill="${PAL[c]}"/>`; }));
    return `<svg class="${cls}" viewBox="0 0 ${a[0].length} ${a.length}" shape-rendering="crispEdges" aria-hidden="true">${r}</svg>`;
  }

  globalThis.FITAI_INVENTARIO = { ITENS, CATS, exige, pode, liberados, icone };
})();
