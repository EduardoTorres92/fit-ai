// Links da página: rolam até a seção (com o Lenis; no toque, com a rolagem nativa) e levam o foco junto.
import { TOQUE, REDUZIDO } from './smooth.js';

export function irPara(lenis, topo, duracao = 1.3) {
  if (lenis && !TOQUE) lenis.scrollTo(topo, { duration: duracao, easing: (t) => 1 - Math.pow(1 - t, 4) });
  else scrollTo({ top: topo, behavior: REDUZIDO ? 'auto' : 'smooth' });
}

export function ancoras({ lenis }) {
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href');
    const alvo = id === '#topo' ? document.body : document.querySelector(id);
    if (!alvo) return;
    e.preventDefault();
    // a cena presa (modalidades) encosta no topo; as outras seções param com o título logo abaixo da barra
    const folga = alvo.hasAttribute('data-cena') ? 0 : parseFloat(getComputedStyle(alvo).paddingTop) - 104;
    const topo = id === '#topo' ? 0 : Math.max(0, alvo.getBoundingClientRect().top + scrollY + Math.max(0, folga));
    irPara(lenis, topo);
    if (id !== '#topo') {
      alvo.setAttribute('tabindex', '-1');
      alvo.focus({ preventScroll: true });
    }
  });
}
