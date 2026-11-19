// As dúvidas: <details> de verdade (abre sem JS), com a altura animada ao abrir e fechar.
import { REDUZIDO } from './smooth.js';

export function duvidas() {
  document.querySelectorAll('.duvida').forEach((d) => {
    const resumo = d.querySelector('summary');
    const corpo = d.querySelector('.duvida__corpo');
    let anima = null;
    resumo.addEventListener('click', (e) => {
      if (REDUZIDO) return;
      e.preventDefault();
      anima?.cancel();
      const fechar = d.open && !d.classList.contains('is-fechando');
      if (fechar) {
        d.classList.add('is-fechando');
        anima = corpo.animate({ height: [`${corpo.offsetHeight}px`, '0px'] }, { duration: 460, easing: 'cubic-bezier(0.65, 0, 0.35, 1)' });
        anima.onfinish = () => { d.open = false; d.classList.remove('is-fechando'); anima = null; };
      } else {
        const de = d.open ? corpo.offsetHeight : 0;
        d.classList.remove('is-fechando');
        d.open = true;
        anima = corpo.animate({ height: [`${de}px`, `${corpo.scrollHeight}px`] }, { duration: 620, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' });
        anima.onfinish = () => { anima = null; };
      }
    });
  });
}
