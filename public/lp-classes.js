/* Classes do FIT.AI na página de entrada: coverflow 3D (Glassy Coverflow Carousel do ProfitizeBuild, adaptado para
   JS puro). O cartão do meio fica de frente; os vizinhos giram para trás. Arrastar, as setas do dock, ← → / Home / End
   e o clique num vizinho trocam o cartão; o clique no do meio abre a carta com a regra de como virar aquela classe.
   O seletor Herói/Heroína troca as artes. */
(function () {
  const raiz = document.querySelector("[data-classes]");
  if (!raiz) return;
  const ITENS = [
    { id: "ninja", title: "Ninja", subtitle: "Liga Insanity", desc: "Vive dos vídeos do Insanity e do MAX:30. Pulo, sprint e prancha até o cronômetro zerar.", regra: "Faça a maior parte dos seus treinos com os vídeos do Insanity." },
    { id: "monge", title: "Monge", subtitle: "Liga Calistenia", desc: "Treina com o peso do corpo: barra, paralela, flexão e o controle de cada repetição.", regra: "Faça a maior parte dos seus treinos de calistenia." },
    { id: "gladiador", title: "Gladiador", subtitle: "Liga Hipertrofia", desc: "Vive na academia. Carga, série e descanso, semana após semana, com o Coach comparando cada treino.", regra: "Faça a maior parte dos seus treinos de academia." },
    { id: "batedor", title: "Batedor", subtitle: "Liga Corrida", desc: "Corre. Pace, distância e o próximo recorde, com o print do relógio virando treino.", regra: "Faça a maior parte dos seus treinos correndo." },
    { id: "berserker", title: "Berserker", subtitle: "Liga Cross", desc: "Vive de WODs. Foto do quadro do box vira treino, e os benchmarks viram insígnias.", regra: "Faça a maior parte dos seus treinos de cross." },
    { id: "ronin", title: "Ronin", subtitle: "Liga Híbrido", desc: "Não escolhe um caminho só: mistura duas ou mais modalidades e é forte em todas.", regra: "Tenha duas modalidades com 25% ou mais dos seus treinos (e pelo menos 2 treinos em cada)." },
  ];
  const N = ITENS.length;
  const wrap = (v) => ((v % N) + N) % N;
  const stage = raiz.querySelector(".gc-stage"), titulo = raiz.querySelector(".gc-active-info h2"), sub = raiz.querySelector(".gc-active-info p");
  const pos = raiz.querySelector(".gc-position span"), dialogo = raiz.querySelector(".gc-dialog"), aviso = raiz.querySelector(".gc-sr-only");
  const btPlay = raiz.querySelector(".gc-play-toggle");
  const reduzido = matchMedia("(prefers-reduced-motion: reduce)");
  let index = 0, drag = 0, sexo = "m", tocando = false, sobre = false, foco = false, arrastando = false, timer = 0, gesto = null, semClique = 0;
  const cartas = new Map();
  const arte = (it) => `./assets/estilos/${it.id}-${sexo}.webp`;
  const largura = () => Math.min(270, stage.clientWidth * 0.58, Math.max(100, (stage.clientHeight - 28) / 1.5));

  function carta(slot) {
    let el = cartas.get(slot);
    if (el) return el;
    el = document.createElement("button");
    el.type = "button"; el.className = "gc-card";
    el.innerHTML = `<span class="gc-poster"><img alt="" draggable="false"><span class="gc-poster-shade" aria-hidden="true"></span><span class="gc-watch" aria-hidden="true">Ver a carta</span></span>`;
    el.style.transition = "none"; // entra já na posição, sem atravessar o baralho
    el.addEventListener("click", () => {
      if (performance.now() < semClique) return;
      const d = Number(el.dataset.slot) - index;
      d === 0 ? abrir(ITENS[wrap(index)]) : ir(index + d);
    });
    stage.appendChild(el); cartas.set(slot, el);
    requestAnimationFrame(() => requestAnimationFrame(() => (el.style.transition = "")));
    return el;
  }
  function desenhar() {
    const w = largura(), passo = w * 0.78;
    raiz.style.setProperty("--gc-card-width", `${w}px`);
    const slots = new Set();
    for (let p = -3; p <= 3; p++) slots.add(index + p);
    for (const [s, el] of cartas) if (!slots.has(s)) { el.remove(); cartas.delete(s); }
    for (const s of slots) {
      const el = carta(s), it = ITENS[wrap(s)], d = s - index, off = d + drag, abs = Math.abs(off), fora = d < -2 || d > 2, meio = d === 0;
      el.dataset.slot = s;
      const img = el.querySelector("img");
      if (img.getAttribute("src") !== arte(it)) { img.src = arte(it); img.alt = `Carta da classe ${it.title}`; }
      img.loading = Math.abs(d) < 2 ? "eager" : "lazy";
      el.toggleAttribute("data-active", meio);
      el.tabIndex = meio ? 0 : -1;
      el.setAttribute("aria-label", meio ? `Ver a carta do ${it.title}` : `Selecionar ${it.title}`);
      if (fora) el.setAttribute("aria-hidden", "true"); else el.removeAttribute("aria-hidden");
      el.style.transform = `translate3d(${off * passo}px,0,${-Math.min(abs, 3) * 130}px) rotateY(${-Math.max(-42, Math.min(42, off * 30))}deg) scale(${1 - Math.min(abs, 3) * 0.08})`;
      el.style.opacity = fora ? 0 : 1;
      el.style.zIndex = 100 - Math.round(abs * 10);
      el.style.pointerEvents = fora ? "none" : "";
      el.style.setProperty("--gc-shade", Math.min(abs, 2) * 0.19);
    }
    const at = ITENS[wrap(index)];
    titulo.textContent = at.title; sub.textContent = `${at.subtitle} · ${at.desc}`;
    pos.textContent = String(wrap(index) + 1).padStart(2, "0");
    if (!tocando) aviso.textContent = `${at.title}. ${wrap(index) + 1} de ${N}.`;
    agendar();
  }
  function ir(n, focar) { index = n; drag = 0; desenhar(); if (focar) stage.querySelector(".gc-card[data-active]")?.focus({ preventScroll: true }); }
  function agendar() {
    clearTimeout(timer);
    if (tocando && !reduzido.matches && !dialogo.open && !arrastando && !document.hidden && !sobre && !foco) timer = setTimeout(() => ir(index + 1), 6000);
  }
  function abrir(it) {
    dialogo.querySelector("img").src = arte(it); dialogo.querySelector("img").alt = `Carta da classe ${it.title}`;
    dialogo.querySelector("h2").textContent = it.title;
    dialogo.querySelector("[data-liga]").textContent = it.subtitle;
    dialogo.querySelector("[data-desc]").textContent = it.desc;
    dialogo.querySelector("[data-regra]").textContent = it.regra;
    dialogo.showModal(); agendar();
  }
  dialogo.addEventListener("close", agendar);
  dialogo.addEventListener("click", (e) => { if (e.target === dialogo || e.target.closest("[data-fechar]")) dialogo.close(); });

  raiz.querySelector("[data-ant]").addEventListener("click", () => ir(index - 1));
  raiz.querySelector("[data-prox]").addEventListener("click", () => ir(index + 1));
  btPlay.addEventListener("click", () => { tocando = !tocando; btPlay.setAttribute("aria-pressed", tocando); btPlay.setAttribute("aria-label", tocando ? "Pausar o carrossel" : "Tocar o carrossel"); btPlay.classList.toggle("is-tocando", tocando); agendar(); });
  if (reduzido.matches) btPlay.disabled = true;
  raiz.querySelectorAll("[data-sexo]").forEach((b) => b.addEventListener("click", () => {
    sexo = b.dataset.sexo;
    raiz.querySelectorAll("[data-sexo]").forEach((x) => x.setAttribute("aria-pressed", x === b));
    desenhar();
  }));
  raiz.addEventListener("keydown", (e) => {
    if (dialogo.open || e.altKey || e.ctrlKey || e.metaKey) return;
    const f = !!e.target.closest(".gc-card");
    if (e.key === "ArrowRight") { e.preventDefault(); ir(index + 1, f); }
    if (e.key === "ArrowLeft") { e.preventDefault(); ir(index - 1, f); }
    if (e.key === "Home") { e.preventDefault(); ir(Math.floor(index / N) * N, f); }
    if (e.key === "End") { e.preventDefault(); ir(Math.floor(index / N) * N + N - 1, f); }
  });
  stage.addEventListener("mouseenter", () => { sobre = true; agendar(); });
  stage.addEventListener("mouseleave", () => { sobre = false; agendar(); });
  stage.addEventListener("focusin", () => { foco = true; agendar(); });
  stage.addEventListener("focusout", (e) => { if (!stage.contains(e.relatedTarget)) { foco = false; agendar(); } });
  document.addEventListener("visibilitychange", agendar);

  // arraste: o baralho anda junto com o dedo; ao soltar, passa um cartão se o gesto foi longo ou rápido
  stage.addEventListener("pointerdown", (e) => {
    if (!e.isPrimary || (e.pointerType === "mouse" && e.button !== 0)) return;
    gesto = { x: e.clientX, y: e.clientY, t: performance.now(), h: false };
  });
  stage.addEventListener("pointermove", (e) => {
    if (!gesto) return;
    const dx = e.clientX - gesto.x, dy = e.clientY - gesto.y;
    if (!gesto.h && Math.abs(dy) > 12 && Math.abs(dy) > Math.abs(dx)) { gesto = null; return; }
    if (!gesto.h && Math.abs(dx) > 8) { gesto.h = true; stage.setPointerCapture(e.pointerId); arrastando = true; stage.setAttribute("data-dragging", ""); agendar(); }
    if (gesto.h) { drag = Math.max(-1.2, Math.min(1.2, dx / (largura() * 0.78))); desenhar(); }
  });
  const soltar = (e, cancelar) => {
    const g = gesto; gesto = null;
    if (g?.h) {
      const dx = e.clientX - g.x, vel = Math.abs(dx) / Math.max(1, performance.now() - g.t);
      if (!cancelar && (Math.abs(dx) > Math.min(55, largura() * 0.18) || (Math.abs(dx) > 14 && vel > 0.35))) index += dx < 0 ? 1 : -1;
      semClique = performance.now() + 300;
    }
    drag = 0; arrastando = false; stage.removeAttribute("data-dragging");
    if (stage.hasPointerCapture(e.pointerId)) stage.releasePointerCapture(e.pointerId);
    desenhar();
  };
  stage.addEventListener("pointerup", (e) => soltar(e));
  stage.addEventListener("pointercancel", (e) => soltar(e, true));
  new ResizeObserver(desenhar).observe(stage);
  desenhar();
})();
