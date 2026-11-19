// O percurso da peça 3D pela página. Em cada seção há uma vaga (<span class="vaga" data-vaga data-forma="...">):
// o lugar onde a peça pousa e a forma que ela toma ali. Entre duas vagas, a peça fica grudada na primeira, voa e
// pousa na segunda; a posição é uma conta sobre a rolagem (rolar depressa só passa o mesmo voo mais rápido).
// A troca de forma, o giro e a inclinação pelo mouse correm por tempo, com mola: nunca ficam pela metade.
//
// Para a peça aparecer numa seção nova, basta pôr uma vaga nela (tamanho e posição pelo CSS). data-pose="x y z"
// muda o ângulo de descanso; --foco (no CSS) diz em que altura da tela a vaga está quando a seção é lida; data-voo="0.6 1" muda o trecho em que ela voa até a vaga seguinte (para não passar
// por cima de um formulário); data-formas="a b c" + data-preso servem a uma cena presa com um passo por forma.
import { criarPeca, quat } from '../gl/peca.js';
import { FORMAS } from '../gl/formas.js';
import { POSES } from '../gl/poses.js';

// Quanto dura a troca de uma forma para a outra, em segundos. Em voo ela é mais longa (a peça também está andando e
// crescendo, e uma troca curta ali parece um tranco); na cena presa, um pouco mais curta, para cada forma aparecer
// inteira antes do passo seguinte. Para a troca inteira ficar mais lenta ou mais rápida, é só mexer nestes dois.
const TROCA_VOO = 1.5;
const TROCA_PRESA = 1.2;
const RITMO = 0.95;         // a duração para a qual a volta, a pose e o balanço da borracha foram afinados
const VOO = [0.16, 0.84];   // trecho, entre duas vagas, em que a peça voa (antes e depois, fica grudada na vaga)
const lim = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const suave = (t) => { t = lim(t); return t * t * t * (t * (t * 6 - 15) + 10); };

// posição no documento sem contar transform (as letras do título sobem por uma máscara enquanto a vaga é medida)
function desloc(el, ate = null) {
  let x = 0, y = 0;
  for (let n = el; n && n !== ate; n = n.offsetParent) { x += n.offsetLeft; y += n.offsetTop; }
  return [x, y];
}
function corLinear(texto, padrao) {
  const m = /^#?([0-9a-f]{6})$/i.exec(texto.trim());
  if (!m) return padrao;
  return [0, 2, 4].map((i) => (parseInt(m[1].slice(i, i + 2), 16) / 255) ** 2.2);
}

export function criarPercurso({ canvas, reduzido = false }) {
  const celular = matchMedia('(max-width: 760px)').matches;
  const peca = criarPeca(canvas, { dprMax: 2 });
  peca.material.passos = celular ? 64 : 80;
  const N = FORMAS.length;

  let paradas = [], vw = 1, vh = 1;
  let alvo = 0;                              // a parada que manda na forma e na pose
  const cru = new Float32Array(N), peso = new Float32Array(N);
  let pose = POSES[0].slice();
  let giro = 0;                              // graus que faltam da volta dada a cada troca de forma
  let dura = TROCA_VOO;                      // a duração da troca em curso
  let borracha = 0;                          // relógio do balanço da borracha (anda mais devagar numa troca longa)
  let mx = -1, my = -1, temMouse = false;
  let ix = 0, iy = 0, vx = 0, vy = 0;         // inclinação pelo mouse (mola)
  let tomba = 0, sAntes = 0;                 // inclinação pela velocidade da rolagem
  let antes = 0, entrada = 1, pronto = false;
  let lento = 0, folga = 90;
  const item = { x: 0, y: 0, raio: 0, rot: new Float32Array(9), formas: [0, 0, 0], pesos: [1, 0, 0], agito: 0, alfa: 1 };
  const ordem = Array.from({ length: N }, (_, i) => i);

  function lerMaterial() {
    const cs = getComputedStyle(document.documentElement);
    peca.material.base = corLinear(cs.getPropertyValue('--peca'), peca.material.base);
    peca.material.luz = corLinear(cs.getPropertyValue('--peca-luz'), [1, 1, 1]);
    peca.material.contra = corLinear(cs.getPropertyValue('--peca-contra'), [1, 1, 1]);
    peca.material.halo = [1, 1, 1, parseFloat(cs.getPropertyValue('--peca-halo')) || 0];
  }

  function medir() {
    // a altura da tela só é lida de novo quando a largura muda: no celular, a barra do navegador some e volta no
    // meio da rolagem, e a peça daria um salto a cada vez
    if (innerWidth !== vw) vh = innerHeight;
    vw = innerWidth;
    peca.medir(canvas.clientWidth, canvas.clientHeight);
    const max = Math.max(0, document.documentElement.scrollHeight - innerHeight);
    const lista = [];
    for (const el of document.querySelectorAll('[data-vaga]')) {
      const w = el.offsetWidth, h = el.offsetHeight;
      if (Math.min(w, h) < 8) continue;   // vaga escondida (largura zero): a peça passa direto para a seguinte
      const formas = (el.dataset.formas || el.dataset.forma || FORMAS[0]).split(/\s+/).map((n) => Math.max(0, FORMAS.indexOf(n)));
      const propria = el.dataset.pose ? quat.deEuler(...el.dataset.pose.split(/\s+/).map(Number)) : null;
      const raio = Math.min(w, h) / 2;
      const voo = el.dataset.voo ? el.dataset.voo.split(/\s+/).map(Number) : VOO;
      const palco = el.hasAttribute('data-preso') && el.closest('[data-palco]');
      if (palco) {
        // cena presa: a vaga fica parada na tela enquanto a seção rola por trás; um passo por forma
        const secao = palco.parentElement;
        const [dx, dy] = desloc(el, palco);
        const topo = desloc(secao)[1];
        const fim = topo + secao.offsetHeight - palco.offsetHeight;
        const yEm = (s) => (s < topo ? topo - s : s > fim ? fim - s : 0) + dy + h / 2;
        const passo = (fim - topo) / formas.length;
        formas.forEach((f, k) => lista.push({ x: dx + w / 2, yEm, raio, voo, forma: f, pose: propria || POSES[f], S: topo + (k + 0.5) * passo }));
      } else {
        const [x, y] = desloc(el);
        const cy = y + h / 2;
        // --foco (no CSS da vaga): a altura da tela, de 0 a 1, em que a vaga está quando a seção dela é a que se lê.
        // Vaga ao lado do título pede um valor baixo: a peça fica nela enquanto o título está no alto da tela.
        const foco = parseFloat(getComputedStyle(el).getPropertyValue('--foco')) || 0.5;
        lista.push({ x: x + w / 2, yEm: (s) => cy - s, raio, voo, forma: formas[0], pose: propria || POSES[formas[0]], S: lim(cy - vh * foco, 0, max) });
      }
    }
    for (let i = 1; i < lista.length; i++) if (lista[i].S < lista[i - 1].S + 60) lista[i].S = lista[i - 1].S + 60;
    paradas = lista;
    if (!pronto && paradas.length) {
      // primeira medida: a peça já nasce na forma e na pose da parada em que a página abriu
      alvo = acharTrecho(scrollY).perto;
      cru.fill(0); cru[paradas[alvo].forma] = 1;
      pose = paradas[alvo].pose.slice();
      pronto = true;
    }
    alvo = Math.min(alvo, Math.max(0, paradas.length - 1));
  }

  function acharTrecho(s) {
    let i = 0;
    while (i < paradas.length - 2 && s >= paradas[i + 1].S) i++;
    const a = paradas[i], b = paradas[Math.min(i + 1, paradas.length - 1)];
    const t = b === a ? 0 : lim((s - a.S) / (b.S - a.S));
    return { i, a, b, t, perto: t < 0.5 || b === a ? i : i + 1 };
  }

  addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') return;
    mx = e.clientX; my = e.clientY; temMouse = true;
  }, { passive: true });
  document.documentElement.addEventListener('pointerleave', () => { temMouse = false; });

  function quadro(agora, s) {
    if (!paradas.length) return;
    const dt = Math.min(0.05, antes ? (agora - antes) / 1000 : 0.016);
    antes = agora;
    const tt = agora / 1000;

    // onde a peça está: grudada numa vaga ou voando entre duas
    const { i, a, b, t } = acharTrecho(s);
    const e = suave((t - a.voo[0]) / (a.voo[1] - a.voo[0]));
    const ya = a.yEm(s), yb = b.yEm(s);
    let x = a.x + (b.x - a.x) * e;
    const y = ya + (yb - ya) * e;
    const raio = a.raio + (b.raio - a.raio) * e;

    // qual parada manda na forma (com uma folga, para não ficar trocando em cima da divisa)
    let novo;
    if (alvo === i) novo = t > 0.51 ? i + 1 : i;
    else if (alvo === i + 1) novo = t < 0.49 ? i : i + 1;
    else novo = t < 0.5 ? i : i + 1;
    novo = Math.min(novo, paradas.length - 1);
    if (novo !== alvo) {
      if (paradas[novo].forma !== paradas[alvo].forma) {
        if (!reduzido) giro += novo > alvo ? 360 : -360;
        // a mesma vaga nas duas pontas = cena presa
        dura = a.x === b.x && a.yEm === b.yEm ? TROCA_PRESA : TROCA_VOO;
      }
      alvo = novo;
    }

    // os pesos das formas: a do alvo sobe, as outras descem, em linha reta; a curva suave vem depois
    const fAlvo = paradas[alvo].forma;
    const andar = reduzido ? 1 : dt / dura;
    let soma = 0;
    for (let f = 0; f < N; f++) {
      const d = (f === fAlvo ? 1 : 0) - cru[f];
      cru[f] += Math.sign(d) * Math.min(Math.abs(d), andar);
      peso[f] = suave(cru[f]);
      soma += peso[f];
    }
    ordem.sort((p, q) => peso[q] - peso[p]);
    const tres = peso[ordem[0]] + peso[ordem[1]] + peso[ordem[2]] || 1;
    for (let k = 0; k < 3; k++) { item.formas[k] = ordem[k]; item.pesos[k] = peso[ordem[k]] / tres; }
    item.agito = reduzido ? 0 : suave(2 * (1 - item.pesos[0]));

    // a pose persegue a da parada; a cada troca de forma a peça dá uma volta, que vai morrendo
    const estica = dura / RITMO;   // a volta, a pose e o balanço esticam junto com a troca
    pose = quat.mistura(pose, paradas[alvo].pose, 1 - Math.exp(-dt / (0.3 * estica)));
    giro *= Math.exp(-dt / (0.5 * estica));
    borracha += dt / estica;
    if (Math.abs(giro) < 0.02) giro = 0;

    // o mouse inclina a peça na direção dele, com mola (passa um pouco do ponto e volta)
    const ax = temMouse ? lim((mx - x) / vw, -1, 1) : 0;
    const ay = temMouse ? lim((my - y) / vh, -1, 1) : 0;
    vx += ((ax * 20 - ix) * 70 - vx * 9) * dt; ix += vx * dt;
    vy += ((ay * 14 - iy) * 70 - vy * 9) * dt; iy += vy * dt;
    // e a rolagem a tomba um pouco para a frente, conforme a velocidade
    const vel = (s - sAntes) / Math.max(dt, 0.001); sAntes = s;
    tomba += (lim(-vel / vh * 9, -15, 15) - tomba) * (1 - Math.exp(-dt / 0.16));

    // a abertura: a anilha entra rolando da direita e para no lugar do "O"
    let rolo = 0, alfa = 1;
    if (entrada < 1) {
      entrada = Math.min(1, entrada + dt / 1.5);
      const k = 1 - (1 - entrada) ** 4;
      const fora = (1 - k) * vw * 0.5;
      x += fora;
      rolo = (-fora / Math.max(raio, 1)) * 57.2958;
      alfa = lim(entrada * 5);
    }

    const balanco = reduzido ? [0, 0] : [Math.sin(tt * 0.41 + 1) * 3.5, Math.sin(tt * 0.55) * 7];
    let q = quat.mul(pose, quat.deEuler(0, 0, rolo));
    q = quat.mul(quat.deEuler(iy + balanco[0] + tomba, ix + balanco[1] + giro, 0), q);
    quat.matriz(q, item.rot);
    item.x = x; item.y = y; item.raio = raio; item.alfa = alfa;

    const fora = y < -raio * 3 || y > vh + raio * 3;
    peca.desenhar(fora ? [] : [item], borracha);

    // aparelho lento: desenha em menos pixels (uma vez a cada tantos quadros, para não ficar trocando)
    if (--folga < 0) {
      lento = lento * 0.9 + dt * 0.1;
      if (lento > 0.024 && peca.qualidade > 0.56) { peca.definirQualidade(peca.qualidade * 0.8); folga = 120; lento = 0.016; }
    } else lento = 0.016;
  }

  lerMaterial();
  return {
    medir, quadro,
    /** a peça entra rolando (só quando a página abre no topo) */
    entrar() { if (!reduzido && scrollY < 20) entrada = 0; },
    get paradas() { return paradas; },
    peca,
  };
}
