// O manifesto acende palavra por palavra conforme a seção atravessa a tela (cada palavra troca por tempo, 0,5 s).
export function manifesto() {
  const el = document.querySelector('[data-acende]');
  if (!el) return { medir() {}, rolar() {} };
  const textos = [];
  const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  while (w.nextNode()) textos.push(w.currentNode);
  for (const t of textos) {
    if (!t.textContent.trim()) continue;
    const frag = document.createDocumentFragment();
    for (const parte of t.textContent.split(/(\s+)/)) {
      if (!parte) continue;
      if (/^\s+$/.test(parte)) { frag.append(' '); continue; }
      const s = document.createElement('span');
      s.className = 'palavra';
      s.textContent = parte;
      frag.append(s);
    }
    t.replaceWith(frag);
  }
  const palavras = [...el.querySelectorAll('.palavra')];
  let topo = 0, altura = 1, acesas = -1;
  return {
    medir() { const r = el.getBoundingClientRect(); topo = r.top + scrollY; altura = r.height; },
    rolar(s) {
      // começa quando o topo do texto passa de 82% da tela e termina com o pé dele a 55%
      const p = (s + innerHeight * 0.82 - topo) / (altura + innerHeight * 0.27);
      const n = Math.round(Math.min(1, Math.max(0, p)) * palavras.length);
      if (n === acesas) return;
      const [de, ate] = n > acesas ? [Math.max(0, acesas), n] : [n, acesas];
      for (let i = de; i < ate; i++) palavras[i].classList.toggle('is-acesa', i < n);
      acesas = n;
    },
  };
}
