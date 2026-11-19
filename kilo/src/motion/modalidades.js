// Modalidades: a cena presa troca de passo por marcos da rolagem (o texto entra por tempo; nada é arrastado pela
// rolagem). Os botões Anterior e Próxima levam a rolagem até o meio do passo vizinho. A peça 3D troca de forma
// sozinha: o percurso lê as formas da vaga (data-formas) e os mesmos marcos.
import { irPara } from './ancoras.js';

export function modalidades({ lenis }) {
  const secao = document.querySelector('.mod');
  if (!secao) return { medir() {}, rolar() {} };
  const palco = secao.querySelector('.mod__palco');
  const quadro = secao.querySelector('.mod__quadro');
  const grupos = ['.mod__nums .mod__giga', '.mod__nomes .mod__giga', '.mod__passo', '.mod__lista'].map((s) => [...secao.querySelectorAll(s)]);
  const total = grupos[0].length;
  const [antes, depois] = secao.querySelectorAll('.mod__ir');
  let topo = 0, passo = 1, atual = 0;

  function mostrar(n) {
    if (n === atual) return;
    for (const g of grupos) {
      g.forEach((el, i) => {
        // só o que sai e o que entra se mexem; os outros trocam de lado sem aparecer
        el.style.transition = i === n || i === atual ? '' : 'none';
        el.classList.toggle('is-ativo', i === n);
        el.classList.toggle('is-depois', i < n);
      });
    }
    grupos[2].forEach((el, i) => { el.inert = i !== n; });
    atual = n;
    quadro.dataset.passoAtual = n;
    antes.disabled = n === 0;
    depois.disabled = n === total - 1;
  }
  grupos[2].forEach((el, i) => { el.inert = i !== 0; });

  secao.addEventListener('click', (e) => {
    const b = e.target.closest('.mod__ir');
    if (!b || b.disabled) return;
    const n = Math.min(total - 1, Math.max(0, atual + Number(b.dataset.ir)));
    irPara(lenis, topo + (n + 0.5) * passo, 1.1);
  });

  return {
    medir() {
      topo = secao.getBoundingClientRect().top + scrollY;
      passo = (secao.offsetHeight - palco.offsetHeight) / total;
    },
    rolar(s) { mostrar(Math.min(total - 1, Math.max(0, Math.floor((s - topo) / passo)))); },
  };
}
