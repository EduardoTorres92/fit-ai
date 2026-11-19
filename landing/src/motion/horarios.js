// A grade: os dias são abas (clique, toque e setas do teclado); as aulas do dia entram em fila, por tempo.
// Abre no dia de hoje (domingo abre na segunda). As aulas vêm de src/config.js.
import { CONFIG } from '../config.js';

const DIAS = ['seg', 'ter', 'qua', 'qui', 'sex', 'sab'];
const NOMES = { seg: 'segunda', ter: 'terça', qua: 'quarta', qui: 'quinta', sex: 'sexta', sab: 'sábado' };

export function horarios() {
  const raiz = document.querySelector('.grade');
  if (!raiz) return;
  const abas = [...raiz.querySelectorAll('.grade__dia')];
  const lista = raiz.querySelector('.grade__aulas');
  let atual = null, vez = 0;

  function abrir(dia, focar) {
    if (dia === atual) return;
    atual = dia;
    abas.forEach((a) => {
      const sim = a.dataset.dia === dia;
      a.setAttribute('aria-selected', sim);
      a.tabIndex = sim ? 0 : -1;
      if (sim && focar) a.focus();
    });
    lista.setAttribute('aria-label', `Aulas de ${NOMES[dia]}`);
    const minha = ++vez;
    // as linhas de antes somem depressa; as novas entram em fila
    [...lista.children].forEach((li) => li.classList.remove('is-vista'));
    setTimeout(() => {
      if (minha !== vez) return;
      lista.innerHTML = (CONFIG.grade[dia] || []).map(([hora, aula, prof, dur], i) => `
        <li class="aula" style="--i:${i}">
          <span class="aula__hora">${hora}</span>
          <span><span class="aula__nome">${aula}</span><br><span class="aula__prof">${prof}</span></span>
          <span class="aula__dur">${dur}</span>
        </li>`).join('');
      requestAnimationFrame(() => requestAnimationFrame(() => {
        if (minha === vez) [...lista.children].forEach((li) => li.classList.add('is-vista'));
      }));
    }, lista.children.length ? 160 : 0);
  }

  raiz.addEventListener('click', (e) => { const a = e.target.closest('.grade__dia'); if (a) abrir(a.dataset.dia); });
  raiz.addEventListener('keydown', (e) => {
    if (!e.target.closest('.grade__dia')) return;
    const i = DIAS.indexOf(atual);
    const n = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : e.key === 'Home' ? 0 : e.key === 'End' ? DIAS.length - 1 : -1;
    if (n < 0 || n >= DIAS.length || n === i) return;
    e.preventDefault();
    abrir(DIAS[n], true);
  });
  abrir(DIAS[new Date().getDay() - 1] || 'seg');
}
