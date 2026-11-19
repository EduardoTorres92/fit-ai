// Kilo. O CSS não entra por aqui: vem em <link> no index.html (importado pelo JS, a página apareceria crua).
window.__kiloViva = true; // avisa a trava do index.html que o JS subiu
import { criarScroll, REDUZIDO } from './motion/smooth.js';
import { criarGuia } from './motion/guia.js';
import './motion/rolando.js';
import { scrollbar } from './motion/scrollbar.js';
import { barra } from './motion/barra.js';
import { ancoras } from './motion/ancoras.js';
import { marcos } from './motion/marcos.js';
import { manifesto } from './motion/manifesto.js';
import { modalidades } from './motion/modalidades.js';
import { horarios } from './motion/horarios.js';
import { duvidas } from './motion/duvidas.js';
import { contato } from './motion/contato.js';
import { criarPercurso } from './motion/percurso.js';

const html = document.documentElement;
const canvas = document.querySelector('.peca');
const lenis = criarScroll();
criarGuia({ lenis });
scrollbar({ lenis });
barra();
ancoras({ lenis });
const entradas = marcos();
const frase = manifesto();
const cena = modalidades({ lenis });
horarios();
duvidas();
contato();

// a peça 3D: o contexto é criado já, antes de esperar as fontes. Sem WebGL2, a página fica inteira, com um anel
// desenhado no lugar da peça (classe .sem-peca).
let percurso = null;
try {
  percurso = criarPercurso({ canvas, reduzido: REDUZIDO });
} catch (erro) {
  console.warn('Kilo: sem a peça 3D.', erro);
  html.classList.add('sem-peca');
}

function medir() {
  frase.medir();
  cena.medir();
  percurso?.medir();
}

// um laço só: a rolagem suave anda, e tudo o que depende dela lê a mesma posição
function quadro(agora) {
  lenis?.raf(agora);
  const s = scrollY;
  frase.rolar(s);
  cena.rolar(s);
  percurso?.quadro(agora, s);
  requestAnimationFrame(quadro);
}

const fontes = Promise.race([
  Promise.all([
    document.fonts.load('900 80px "Big Shoulders Stencil Variable"'),
    document.fonts.load('900 80px "Big Shoulders L"', 'L'),
    document.fonts.ready,
  ]),
  new Promise((ok) => setTimeout(ok, 1800)),
]);
fontes.then(() => {
  medir();
  entradas.ligar();
  percurso?.entrar();
  requestAnimationFrame(quadro);
  requestAnimationFrame(() => canvas.classList.add('is-pronta'));
  window.__kilo = { percurso, lenis };
});

// a página mudou de tamanho (janela, fonte que chegou, pergunta aberta): mede de novo no quadro seguinte
let pedido = 0;
const remedir = () => { cancelAnimationFrame(pedido); pedido = requestAnimationFrame(medir); };
addEventListener('resize', remedir);
new ResizeObserver(remedir).observe(document.body);
