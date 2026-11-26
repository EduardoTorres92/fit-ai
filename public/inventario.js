/* FIT.AI — Inventário (Arsenal) e Mercado.
   ITENS: o que a pessoa pode ter. eq = muda o treino (o Sensei só usa exercícios cujo equipamento a pessoa tem).
   link = link de afiliado do Mercado (vazio = "em breve"); troque aqui quando tiver os links.
   ART: ícones provisórios em pixel art (uma letra = uma cor de PAL). Para usar uma arte nova, ponha a imagem em
   assets/itens/<id>.webp e preencha img: "assets/itens/<id>.webp" no item.
   Usado pelo app (public/app.js) e pelo servidor (netlify/functions/hiper.mjs). */
(function () {
  const ITENS = [
    { id: "barra", nome: "Barra fixa de porta", curto: "Barra fixa", cat: "armas", eq: true, txt: "Libera barra, australiana na barra e os treinos de costas da calistenia.", link: "" },
    { id: "paralelas", nome: "Paralelas (parallettes)", curto: "Paralelas", cat: "armas", eq: true, txt: "Libera mergulho, L-sit e os dias de habilidade.", link: "" },
    { id: "halteres", nome: "Halteres", curto: "Halteres", cat: "armas", eq: true, txt: "Treino de academia em casa: supino, remada, búlgaro e rosca.", link: "" },
    { id: "kettlebell", nome: "Kettlebell", curto: "Kettlebell", cat: "armas", eq: true, txt: "Vale nos exercícios com carga da corrida e do híbrido (farmer walk, wall ball, afundo). Exercícios próprios chegando.", link: "" },
    { id: "elasticos", nome: "Kit de elásticos", curto: "Elásticos", cat: "armas", eq: true, txt: "Ajuda a completar a barra e substitui puxadas. Exercícios próprios chegando.", link: "" },
    { id: "corda", nome: "Corda de pular", curto: "Corda", cat: "armas", eq: true, txt: "Cardio de bolso e desafios de corda do grupo.", link: "" },
    { id: "banco", nome: "Banco de treino", curto: "Banco", cat: "armas", eq: true, txt: "Apoio para supino, búlgaro e remada serrote.", link: "" },
    { id: "passe", nome: "Passe da Academia", curto: "Academia", cat: "artefatos", eq: true, txt: "Você treina numa academia: libera barra olímpica, máquinas, polias, halteres, barra fixa e paralelas.", semLoja: true },
    { id: "relogio", nome: "Relógio esportivo", curto: "Relógio", cat: "artefatos", eq: false, txt: "Mede o pace e gera o print da corrida que vale XP.", link: "" },
    { id: "roupa", nome: "Roupa de treino", curto: "Roupa", cat: "armaduras", eq: false, txt: "Vestimenta. Não muda o treino.", link: "" },
    { id: "tenis", nome: "Tênis de corrida", curto: "Tênis", cat: "armaduras", eq: false, txt: "Para a trilha de corrida. Não muda o treino.", link: "" },
    { id: "garrafa", nome: "Garrafa de água", curto: "Garrafa", cat: "pocoes", eq: false, txt: "Combina com a missão diária de água.", link: "" },
    { id: "whey", nome: "Whey protein", curto: "Whey", cat: "pocoes", eq: false, txt: "Suplemento. Converse com um nutricionista antes de usar.", link: "" },
    { id: "creatina", nome: "Creatina", curto: "Creatina", cat: "pocoes", eq: false, txt: "Suplemento. Converse com um nutricionista antes de usar.", link: "" },
  ];
  const CATS = [
    { id: "armas", nome: "Armas", ic: "halteres" }, { id: "armaduras", nome: "Armaduras", ic: "roupa" },
    { id: "pocoes", nome: "Poções", ic: "whey" }, { id: "artefatos", nome: "Artefatos", ic: "relogio" },
  ];

  // Que item a pessoa precisa ter para fazer o exercício (qualquer um da lista serve). null = só o corpo.
  // origem: "ac" (academia.js), "cal" (calistenia21.js) ou "run" (corrida.js). Na academia, equip "barra" é a
  // barra olímpica; na calistenia, é a barra fixa.
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
    return null;
  }
  const pode = (e, origem, inv) => { const r = exige(e, origem); return !r || r.some((x) => inv.includes(x)); };

  // Exercícios de cada catálogo que o item libera (para mostrar "+N exercícios")
  function liberados(itemId) {
    const g = globalThis, fontes = [["ac", g.FITAI_ACADEMIA], ["cal", g.FITAI_CAL21], ["run", g.FITAI_CORRIDA]];
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
    merc: ["...nnnnn...", "..nnnnnnn..", "nnnnnnnnnnn", "..skssks...", "..ssssss...", "..shhhhs...", "..llllll...", ".lllyylll..", ".slllllls..", "..llllll...", "..kk..kk..."],
  };
  function icone(id, cls = "inv-svg") {
    const it = ITENS.find((x) => x.id === id);
    if (it?.img) return `<img class="${cls}" src="${it.img}" alt="" loading="lazy">`;
    const a = ART[id]; if (!a) return "";
    let r = "";
    a.forEach((row, y) => [...row].forEach((c, x) => { if (c !== ".") r += `<rect x="${x}" y="${y}" width="1.02" height="1.02" fill="${PAL[c]}"/>`; }));
    return `<svg class="${cls}" viewBox="0 0 ${a[0].length} ${a.length}" shape-rendering="crispEdges" aria-hidden="true">${r}</svg>`;
  }

  globalThis.FITAI_INVENTARIO = { ITENS, CATS, exige, pode, liberados, icone };
})();
