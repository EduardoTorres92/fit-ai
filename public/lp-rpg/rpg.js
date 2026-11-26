/* FIT.AI · página de entrada RPG: herói animado que troca de mestre, cartas dos mestres, evolução de classe e entradas suaves */
(function () {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduzido = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const SPR = (e, g, c) => `./assets/estilos/sprites/${e}-${g}-${c}.webp`;
  const ESTILOS = [
    { k: "ninja", nome: "Ninja", ic: "🥷", m: "Kenji", f: "Yuna", trilha: "Insanos", lema: "Rápidos e explosivos, vivem dos vídeos." },
    { k: "monge", nome: "Monge", ic: "🥋", m: "Tenzin", f: "Mei", trilha: "Calistenia", lema: "Calma, controle, cada repetição perfeita." },
    { k: "gladiador", nome: "Gladiador", ic: "🛡️", m: "Tito", f: "Lívia", trilha: "Academia", lema: "Arena, carga e glória." },
    { k: "batedor", nome: "Batedor", ic: "🏹", m: "Zion", f: "Kaya", trilha: "Corrida", lema: "Os primeiros a chegar, os últimos a cansar." },
    { k: "berserker", nome: "Berserker", ic: "🪓", m: "Bjorn", f: "Freya", trilha: "Cross", lema: "Fúria nórdica em cada WOD." },
    { k: "ronin", nome: "Ronin", ic: "⚔️", m: "Takeshi", f: "Ayame", trilha: "Híbridos", lema: "Sem mestre, sem caminho único." },
  ];
  const CLASSES = [["recruta", "Recruta"], ["escudeiro", "Escudeiro"], ["guerreiro", "Guerreiro"], ["cavaleiro", "Cavaleiro"], ["paladino", "Paladino"],
    ["campeao", "Campeão"], ["mestre-de-armas", "Mestre de Armas"], ["tita", "Titã"], ["lenda", "Lenda"], ["imortal", "Imortal"]];
  // Combinações que ainda não têm personagem animado: mostra o anterior que existe
  const FALTA = new Set(["batedor-f-campeao", "berserker-f-mestre-de-armas", "berserker-m-tita", "gladiador-f-guerreiro", "gladiador-m-cavaleiro"]);
  const sprite = (e, g, i) => { let j = i; while (j > 0 && FALTA.has(`${e}-${g}-${CLASSES[j][0]}`)) j--; return SPR(e, g, CLASSES[j][0]); };
  const trocar = (img, src, alt) => {
    if (img.getAttribute("src") === src) return;
    const pre = new Image(); pre.onload = () => { img.classList.add("troca"); setTimeout(() => { img.src = src; if (alt) img.alt = alt; img.classList.remove("troca"); }, reduzido ? 0 : 300); }; pre.src = src;
  };

  // topo fica sólido ao rolar
  const topo = $("[data-topo]");
  const rolar = () => topo.classList.toggle("solido", scrollY > 30);
  addEventListener("scroll", rolar, { passive: true }); rolar();

  // herói do topo: passa pelos mestres (mestre e mestra alternados) em classes altas
  const hImg = $("[data-hero-sprite]"), hNome = $("[data-hero-nome]"), hEst = $("[data-hero-estilo]");
  const ROTA = [["ninja", "m", 0], ["gladiador", "f", 4], ["monge", "m", 6], ["batedor", "f", 8], ["berserker", "m", 9], ["ronin", "f", 9]];
  let hi = 0;
  if (!reduzido) setInterval(() => {
    if (document.hidden) return;
    hi = (hi + 1) % ROTA.length;
    const [e, g, c] = ROTA[hi], E = ESTILOS.find((x) => x.k === e);
    trocar(hImg, sprite(e, g, c), `${E[g]}, ${g === "f" ? "a mestra" : "o mestre"} ${E.nome}, em pixel art animado`);
    setTimeout(() => { hNome.textContent = E[g]; hEst.textContent = `${E.nome} · ${CLASSES[c][1]}`; }, 300);
  }, 4200);

  // cartas dos mestres
  const lista = $("[data-mestres]");
  let sexo = "m";
  const desenharMestres = () => {
    lista.innerHTML = ESTILOS.map((E) => `<li class="mestre surge on">
      <div class="mestre__carta"><img src="./assets/estilos/${E.k}-${sexo}.webp" alt="Carta do estilo ${E.nome}, com ${E[sexo]}" width="600" height="900" loading="lazy"></div>
      <h3>${E[sexo]}</h3><small>${E.ic} ${E.nome} · ${E.trilha}</small><p>${E.lema}</p></li>`).join("");
  };
  desenharMestres();
  $$("[data-sexo]").forEach((b) => b.addEventListener("click", () => {
    sexo = b.dataset.sexo; $$("[data-sexo]").forEach((x) => x.setAttribute("aria-pressed", x === b)); desenharMestres(); evo.g = sexo; evoDesenhar();
  }));

  // evolução: estilo + classe
  const evo = { e: "ninja", g: "m", i: 0 };
  const eImg = $("[data-evo-sprite]"), eCarta = $("[data-evo-carta]"), eNome = $("[data-evo-nome]"), eNivel = $("[data-evo-nivel]"), eRange = $("[data-evo-range]");
  const eChips = $("[data-evo-estilos]");
  eChips.innerHTML = ESTILOS.map((E) => `<button type="button" data-evo-e="${E.k}" aria-pressed="${E.k === evo.e}">${E.ic} ${E.nome}</button>`).join("");
  function evoDesenhar() {
    const E = ESTILOS.find((x) => x.k === evo.e), [slug, nome] = CLASSES[evo.i];
    trocar(eImg, sprite(evo.e, evo.g, evo.i), `${E[evo.g]} como ${nome}`);
    eCarta.src = `./assets/estilos/niveis/${evo.e}-${evo.g}-${slug}.webp`; eCarta.alt = `Carta ${E.nome} ${nome}`;
    eNome.textContent = nome; eNivel.textContent = `Níveis ${evo.i * 5 + 1} a ${evo.i * 5 + 5} · ${E[evo.g]}`;
    $$("[data-evo-e]").forEach((b) => b.setAttribute("aria-pressed", b.dataset.evoE === evo.e));
  }
  eChips.addEventListener("click", (ev) => { const b = ev.target.closest("[data-evo-e]"); if (b) { evo.e = b.dataset.evoE; evoDesenhar(); } });
  eRange.addEventListener("input", () => { evo.i = Number(eRange.value); evoDesenhar(); });
  // o personagem do palco só carrega quando a seção chega perto da tela
  new IntersectionObserver(([en], o) => { if (en.isIntersecting) { evoDesenhar(); o.disconnect(); } }, { rootMargin: "400px" }).observe($("[data-evo]"));

  // entradas suaves
  if (!reduzido && "IntersectionObserver" in window) {
    const alvos = $$(".secao__cab, .fase, .quest, .trilha, .coach__txt, .coach__tela, .faq details, .final__txt");
    alvos.forEach((el) => el.classList.add("surge"));
    const io = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("on"); io.unobserve(en.target); } }), { rootMargin: "0px 0px -8% 0px" });
    alvos.forEach((el) => io.observe(el));
  }
})();
