/* Circular Navigation (ProfitizeBuild), portado do componente React para JavaScript puro, sem mudar o visual nem o
   comportamento: um círculo de vidro cresce do centro com os itens em volta e o X no meio, o fundo escurece e desfoca a
   página. Fecha pelo X, Esc, clique fora do círculo e escolha de um item. Diálogo modal com o foco preso dentro e
   devolvido a quem abriu. Ícones do Lucide (licença ISC). */
(function () {
  "use strict";

  // Lucide (lucide.dev), licença ISC: os mesmos desenhos, em 24 × 24
  const ICONS = {
    house: '<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
    "calendar-days": '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/>',
    apple: '<path d="M12 6.528V3a1 1 0 0 1 1-1h0"/><path d="M18.237 21A15 15 0 0 0 22 11a6 6 0 0 0-10-4.472A6 6 0 0 0 2 11a15.1 15.1 0 0 0 3.763 10 3 3 0 0 0 3.648.648 5.5 5.5 0 0 1 5.178 0A3 3 0 0 0 18.237 21"/>',
    sparkles: '<path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"/><path d="M20 2v4"/><path d="M22 4h-4"/><circle cx="4" cy="20" r="2"/>',
    "chart-column": '<path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>',
    shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    dumbbell: '<path d="M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829z"/><path d="m2.5 21.5 1.4-1.4"/><path d="m20.1 3.9 1.4-1.4"/><path d="M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829z"/><path d="m9.6 14.4 4.8-4.8"/>',
    landmark: '<path d="M10 18v-7"/><path d="M11.12 2.198a2 2 0 0 1 1.76.006l7.866 3.847c.476.233.31.949-.22.949H3.474c-.53 0-.695-.716-.22-.949z"/><path d="M14 18v-7"/><path d="M18 18v-7"/><path d="M3 22h18"/><path d="M6 18v-7"/>',
    map: '<path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z"/><path d="M15 5.764v15"/><path d="M9 3.236v15"/>',
    menu: '<path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/>',
    x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  };
  const svg = (name, cls = "cnav-icon") =>
    `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${ICONS[name] || ""}</svg>`;

  const CNAV_CSS = `
.cnav-overlay {
  position: fixed;
  inset: 0;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  margin: 0;
  padding: 16px;
  background: rgba(0, 0, 0, .8);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  outline: none;
  font-family: ui-sans-serif, system-ui, -apple-system, "SF Pro Text", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-style: normal;
  font-variant: normal;
  font-feature-settings: normal;
  font-variation-settings: normal;
  letter-spacing: normal;
  word-spacing: normal;
  text-align: center;
  text-transform: none;
  text-indent: 0;
  text-shadow: none;
  color: #fff;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: transparent;
}
.cnav-overlay *, .cnav-overlay *::before, .cnav-overlay *::after { box-sizing: border-box; }
.cnav-circle {
  position: relative;
  flex: none;
  width: min(var(--cnav-size, 420px), 100%, calc(100dvh - 32px));
  aspect-ratio: 1;
  margin: 0;
  border: 1px solid rgba(255, 255, 255, .1);
  border-radius: 50%;
  background: rgba(255, 255, 255, .05);
  box-shadow: inset 2px 2px 2px rgba(255, 255, 255, .5), inset -1px -1px 1px rgba(255, 255, 255, .3);
}
.cnav-icon { display: block; flex: none; width: 24px; height: 24px; }
.cnav-close {
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: #fff;
  color: #000;
  font: inherit;
  cursor: pointer;
  translate: -50% -50%;
  -webkit-appearance: none;
  appearance: none;
  transition: scale .2s cubic-bezier(.4, 0, .2, 1);
}
.cnav-close:active { scale: .94; }
.cnav-close:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }
.cnav-list { position: absolute; inset: 0; margin: 0; padding: 0; list-style: none; }
.cnav-item { position: absolute; margin: 0; padding: 0; translate: -50% -50%; }
.cnav-item::marker { content: none; }
.cnav-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  margin: 0;
  padding: 0;
  border-radius: 50%;
  background: transparent;
  color: #fff;
  text-decoration: none;
  outline: none;
  transition: background-color .2s cubic-bezier(.4, 0, .2, 1), color .2s cubic-bezier(.4, 0, .2, 1);
}
.cnav-link .cnav-icon { margin-bottom: 4px; }
.cnav-label {
  display: block;
  max-width: 72px;
  overflow: hidden;
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-decoration: none;
}
.cnav-link[aria-current="page"] { background: rgba(255, 255, 255, .12); }
@media (hover: hover) {
  .cnav-link:hover { background: #fff; color: #000; }
}
.cnav-link:focus-visible { background: #fff; color: #000; box-shadow: 0 0 0 2px rgba(0, 0, 0, .8), 0 0 0 4px #fff; }
@keyframes cnav-grow { from { opacity: 0; scale: 0; } to { opacity: 1; scale: 1; } }
@keyframes cnav-shrink { from { opacity: 1; scale: 1; } to { opacity: 0; scale: 0; } }
@keyframes cnav-fade-in { from { opacity: 0; } to { opacity: 1; } }
@keyframes cnav-fade-out { from { opacity: 1; } to { opacity: 0; } }
.cnav-overlay.is-opening { animation: cnav-fade-in .4s cubic-bezier(.42, 0, .58, 1) both; }
.cnav-overlay.is-closing { animation: cnav-fade-out .4s cubic-bezier(.42, 0, .58, 1) both; pointer-events: none; }
.cnav-overlay.is-opening .cnav-circle { animation: cnav-grow .4s cubic-bezier(.42, 0, .58, 1) both; }
.cnav-overlay.is-closing .cnav-circle { animation: cnav-shrink .4s cubic-bezier(.42, 0, .58, 1) both; }
@media (prefers-reduced-motion: reduce) {
  .cnav-overlay, .cnav-overlay * { animation-duration: .01ms !important; transition-duration: .01ms !important; }
}
`;

  // o lugar de cada item: raio de 150 px num círculo de 420, a partir da direita, em sentido horário
  function itemPosition(i, n) {
    const a = (2 * Math.PI * i) / n, r = (150 / 420) * 100;
    return `left:${(50 + r * Math.cos(a)).toFixed(3)}%;top:${(50 + r * Math.sin(a)).toFixed(3)}%`;
  }
  const esc = (t) => String(t).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const FOCUSABLE = "a[href], button:not([disabled])";

  /**
   * criar({ itens: [{ name, icon, href }], label, closeLabel, onNavigate(item, event) }) → { abrir(activeHref), fechar(), aberto }
   * onNavigate pode chamar event.preventDefault() para o link não navegar (ex.: abrir o chat).
   */
  function criar(opts) {
    if (!document.getElementById("cnav-css")) {
      const st = document.createElement("style"); st.id = "cnav-css"; st.textContent = CNAV_CSS; document.head.appendChild(st);
    }
    let el = null, fase = "closed", volta = null, garantia = 0;
    const api = { get aberto() { return fase === "opening" || fase === "open"; } };

    function terminar() {
      clearTimeout(garantia);
      if (fase === "opening") { fase = "open"; el && el.classList.remove("is-opening"); }
      else if (fase === "closing") { fase = "closed"; el && el.remove(); el = null; }
    }
    api.abrir = function (activeHref) {
      if (api.aberto) return;
      if (el) el.remove();
      const ativo = document.activeElement;
      volta = ativo && ativo !== document.body ? ativo : null;
      el = document.createElement("div");
      el.className = "cnav-overlay is-opening" + (opts.className ? " " + opts.className : "");
      el.setAttribute("role", "dialog"); el.setAttribute("aria-modal", "true");
      el.setAttribute("aria-label", opts.label || "Navegação"); el.tabIndex = -1;
      const n = opts.itens.length;
      el.innerHTML = `<div class="cnav-circle">
        <button type="button" class="cnav-close" aria-label="${esc(opts.closeLabel || "Fechar navegação")}">${svg("x")}</button>
        <ul class="cnav-list">${opts.itens.map((it, i) => `<li class="cnav-item" style="${itemPosition(i, n)}">
          <a href="${esc(it.href)}" class="cnav-link" data-i="${i}"${it.href === activeHref ? ' aria-current="page"' : ""}>${svg(it.icon)}<span class="cnav-label">${esc(it.name)}</span></a></li>`).join("")}</ul></div>`;
      el.addEventListener("click", (e) => {
        if (e.target === el) return api.fechar();
        if (e.target.closest(".cnav-close")) return api.fechar();
        const a = e.target.closest(".cnav-link");
        if (a) { opts.onNavigate && opts.onNavigate(opts.itens[+a.dataset.i], e); api.fechar(); }
      });
      el.addEventListener("keydown", (e) => {
        if (e.key === "Escape") { e.preventDefault(); api.fechar(); return; }
        if (e.key !== "Tab") return;
        const f = [...el.querySelectorAll(FOCUSABLE)].filter((x) => x.tabIndex >= 0);
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1], at = document.activeElement;
        if (e.shiftKey && (at === first || at === el)) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && at === last) { e.preventDefault(); first.focus(); }
      });
      el.querySelector(".cnav-circle").addEventListener("animationend", (e) => { if (e.target === e.currentTarget) terminar(); });
      document.body.appendChild(el);
      fase = "opening";
      el.querySelector(".cnav-close").focus({ preventScroll: true });
      garantia = setTimeout(terminar, 1000); // se um CSS de fora desligar as animações
    };
    api.fechar = function () {
      if (!el || !api.aberto) return;
      clearTimeout(garantia);
      fase = "closing";
      el.classList.remove("is-opening"); el.classList.add("is-closing");
      const at = document.activeElement;
      if ((el.contains(at) || at === document.body) && volta && document.contains(volta)) volta.focus({ preventScroll: true });
      volta = null;
      garantia = setTimeout(terminar, 1000);
    };
    return api;
  }

  window.CircularNav = { criar, icone: svg };
})();
