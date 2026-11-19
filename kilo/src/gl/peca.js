// A peça: um objeto de borracha preta e brilhante, desenhado ao vivo por traçado de raios num campo de distância
// (WebGL2, sem malha e sem modelo). Como a forma é uma função, ela pode virar outra: a distância de duas formas
// misturada pelo peso de cada uma dá a peça derretendo de uma para a outra, mesmo quando uma tem furo e a outra não.
//
// O canvas cobre a tela inteira, mas só o quadrado em volta da peça é desenhado (recorte), então o custo acompanha
// o tamanho dela na tela.
import { GLSL_FORMAS, GLSL_RECARTILHA } from './formas.js';

const VERT = `#version 300 es
in vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }`;

const FRAG = /* glsl */ `#version 300 es
precision highp float;
precision highp int;

uniform vec2 uCentro;   // centro da peça em px do canvas (origem embaixo)
uniform float uRaio;    // px por unidade do mundo (a peça tem raio ~1)
uniform mat3 uRot;      // rotação da peça
uniform ivec3 uForma;   // até três formas misturadas
uniform vec3 uPeso;     // o peso de cada uma (somam 1)
uniform float uTempo;
uniform float uAgito;   // 0 parado, 1 no meio de uma troca: a borracha balança
uniform vec3 uBase;     // cor do corpo
uniform vec3 uLuz;      // cor das caixas de luz
uniform vec3 uContra;   // cor da contraluz
uniform vec4 uHalo;     // luz no fundo, atrás da peça (cor e força)
uniform float uAlfa;
uniform float uPassos;
out vec4 saida;

${GLSL_RECARTILHA}
${GLSL_FORMAS}

const float DIST = 7.0;   // câmera
const float BORDA = 1.3;  // esfera que envolve qualquer forma

float mapa(vec3 p) {
  float d = uPeso.x * forma(uForma.x, p);
  if (uPeso.y > 0.001) d += uPeso.y * forma(uForma.y, p);
  if (uPeso.z > 0.001) d += uPeso.z * forma(uForma.z, p);
  if (uAgito > 0.001) {
    // no meio da troca a peça passa por uma bolha: a mistura com uma esfera arredonda as quinas das duas formas
    d = mix(d, length(p) - 0.60, 0.52 * uAgito);
    d += uAgito * 0.028 * sin(p.x * 4.1 + uTempo * 5.3) * sin(p.y * 3.7 - uTempo * 4.1) * sin(p.z * 4.6 + uTempo * 3.2);
  }
  return d;
}
float relevo(vec3 p) {
  float h = uPeso.x * relevoDe(uForma.x, p);
  if (uPeso.y > 0.001) h += uPeso.y * relevoDe(uForma.y, p);
  if (uPeso.z > 0.001) h += uPeso.z * relevoDe(uForma.z, p);
  return h;
}
vec3 normalDe(vec3 p) {
  const vec2 e = vec2(1.0, -1.0) * 0.0014;
  return normalize(e.xyy * mapa(p + e.xyy) + e.yyx * mapa(p + e.yyx) + e.yxy * mapa(p + e.yxy) + e.xxx * mapa(p + e.xxx));
}
float oclusao(vec3 p, vec3 n) {
  float o = 0.0, s = 1.0;
  for (int i = 1; i <= 4; i++) {
    float h = 0.035 * float(i);
    o += (h - mapa(p + n * h)) * s;
    s *= 0.6;
  }
  return clamp(1.0 - 3.2 * o, 0.0, 1.0);
}

// O estúdio: caixas de luz em volta da peça, vistas só no reflexo. b = quanto a borda da caixa esfuma.
float caixaLuz(vec2 p, vec2 c, vec2 m, float b) {
  vec2 d = m - abs(p - c);
  return smoothstep(-b, b, d.x) * smoothstep(-b, b, d.y);
}
vec3 estudio(vec3 r, float b) {
  vec3 c = vec3(mix(0.003, 0.045, smoothstep(-0.5, 1.0, r.y)));
  if (r.y > 0.03) {   // o teto: uma caixa grande e macia, um pouco à esquerda e à frente
    vec2 q = r.xz / r.y;
    c += uLuz * 6.4 * caixaLuz(q, vec2(-0.3, 0.3), vec2(1.1, 0.6), 0.16 + b);
  }
  if (r.z > 0.03) {   // na frente: uma janela alta à esquerda (nítida) e um rebatedor bem fraco
    vec2 q = r.xy / r.z;
    c += uLuz * 3.4 * caixaLuz(q, vec2(-0.6, 0.64), vec2(0.30, 0.27), b);
    c += uLuz * 0.10 * caixaLuz(q, vec2(0.45, -0.05), vec2(0.7, 0.9), 0.5);
  }
  if (r.x < -0.03) {  // tira em pé à esquerda
    vec2 q = r.zy / -r.x;
    c += uLuz * 2.6 * caixaLuz(q, vec2(0.25, 0.15), vec2(0.12, 1.5), b);
  }
  if (r.x > 0.03) {   // tira fina à direita
    vec2 q = r.zy / r.x;
    c += uLuz * 1.7 * caixaLuz(q, vec2(-0.2, 0.0), vec2(0.06, 1.7), b);
  }
  if (r.z < -0.03) {  // contraluz: uma tira forte atrás à direita e uma fraca à esquerda, que desenham a borda
    vec2 q = r.xy / -r.z;
    c += uContra * 2.6 * caixaLuz(q, vec2(0.66, 0.15), vec2(0.30, 1.5), 0.10 + b);
    c += uContra * 0.7 * caixaLuz(q, vec2(-0.7, 0.1), vec2(0.26, 1.3), 0.10 + b);
  }
  if (r.y < -0.03) {  // chão: um rebatedor fraco
    vec2 q = r.xz / -r.y;
    c += uLuz * 0.22 * caixaLuz(q, vec2(0.0, 0.2), vec2(1.4, 0.7), 0.5);
  }
  return c;
}

float ruido(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }

void main() {
  vec2 q = (gl_FragCoord.xy - uCentro) / uRaio;
  // a luz no fundo, atrás da peça
  float dq = dot(q, q);
  vec3 halo = uHalo.rgb * uHalo.a * exp(-dq / 1.5);

  vec3 ro = vec3(0.0, 0.0, DIST);
  vec3 rd = normalize(vec3(q, -DIST));
  // a esfera que envolve a peça
  float bq = dot(ro, rd);
  float cq = dot(ro, ro) - BORDA * BORDA;
  float disc = bq * bq - cq;
  float cobre = 0.0;
  vec3 cor = vec3(0.0);
  if (disc > 0.0) {
    float raiz = sqrt(disc);
    float t = -bq - raiz, fim = -bq + raiz;
    mat3 inv = transpose(uRot);
    vec3 o = inv * ro, d = inv * rd;
    float px = 1.0 / (uRaio * DIST);   // o tamanho de um pixel, por unidade de distância
    float menor = 1e9, tMenor = t;
    bool bateu = false;
    float passo = uAgito > 0.001 ? 0.8 : 0.95;
    int limite = int(uPassos);
    for (int i = 0; i < 96; i++) {
      if (i >= limite) break;
      float dist = mapa(o + d * t);
      float rel = dist / t;
      if (rel < menor) { menor = rel; tMenor = t; }
      if (dist < 0.0006 * t) { bateu = true; break; }
      t += dist * passo;
      if (t > fim) break;
    }
    // borda lisa: o raio que passa raspando cobre uma parte do pixel
    cobre = bateu ? 1.0 : 1.0 - smoothstep(0.0, 1.4, menor / px);
    if (cobre > 0.002) {
      vec3 p = o + d * (bateu ? t : tMenor);
      vec3 n = normalDe(p);
      // a recartilha inclina a normal (some quando a célula fica menor que uns pixels)
      // (e também de raspão, onde viraria chuvisco)
      float fino = smoothstep(55.0, 150.0, uRaio) * smoothstep(0.1, 0.42, dot(uRot * n, -rd));
      if (fino > 0.0) {
        const float e = 0.004;
        float h0 = relevo(p);
        if (h0 > 0.0005 || relevo(p + n.yzx * 0.01) > 0.0005) {
          vec3 g = vec3(relevo(p + vec3(e, 0.0, 0.0)), relevo(p + vec3(0.0, e, 0.0)), relevo(p + vec3(0.0, 0.0, e))) - h0;
          g /= e;
          g -= n * dot(g, n);
          n = normalize(n - g * 0.016 * fino);
        }
      }
      float ao = oclusao(p, n);
      vec3 N = normalize(uRot * n);
      vec3 V = -rd;
      vec3 R = reflect(rd, N);
      float nv = clamp(dot(N, V), 0.0, 1.0);
      float fres = 0.04 + 0.96 * pow(1.0 - nv, 5.0);
      vec3 L = normalize(vec3(-0.45, 0.8, 0.55));
      float dif = max(dot(N, L), 0.0);
      cor = uBase * (0.45 + 2.3 * dif) * ao;
      // reflexo nítido (o verniz) e um reflexo largo por baixo (a borracha)
      cor += estudio(R, 0.03) * fres * mix(0.3, 1.0, ao) * 1.35;
      cor += estudio(R, 0.6) * 0.0045 * ao;
      cor = cor / (1.0 + 0.55 * cor);
      cor = pow(cor, vec3(1.0 / 2.2));
    }
  }
  halo += (ruido(gl_FragCoord.xy) - 0.5) / 255.0 * step(0.0005, uHalo.a);
  // a luz do fundo sai como branco com alfa (cor nunca maior que o alfa): somada com alfa zero, o Safari
  // estourava as cores quando ela passava sobre um cartão claro
  halo = max(halo, 0.0);
  vec4 fundo = vec4(halo, max(halo.r, max(halo.g, halo.b)));
  saida = mix(fundo, vec4(cor, 1.0), cobre) * uAlfa;
}`;

function compila(gl, tipo, fonte) {
  const s = gl.createShader(tipo);
  gl.shaderSource(s, fonte);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(`shader: ${gl.getShaderInfoLog(s)}`);
  return s;
}

export function criarPeca(canvas, { dprMax = 2 } = {}) {
  const gl = canvas.getContext('webgl2', { alpha: true, antialias: false, premultipliedAlpha: true, powerPreference: 'high-performance' });
  if (!gl) throw new Error('sem WebGL2');
  const prog = gl.createProgram();
  gl.attachShader(prog, compila(gl, gl.VERTEX_SHADER, VERT));
  gl.attachShader(prog, compila(gl, gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(`programa: ${gl.getProgramInfoLog(prog)}`);
  gl.useProgram(prog);
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const aPos = gl.getAttribLocation(prog, 'aPos');
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
  const u = {};
  for (const nome of ['uCentro', 'uRaio', 'uRot', 'uForma', 'uPeso', 'uTempo', 'uAgito', 'uBase', 'uLuz', 'uContra', 'uHalo', 'uAlfa', 'uPassos']) {
    u[nome] = gl.getUniformLocation(prog, nome);
  }
  gl.disable(gl.DEPTH_TEST);
  gl.clearColor(0, 0, 0, 0);

  let largura = 0, altura = 0, escala = 1, qualidade = 1;
  const material = { base: [0.0045, 0.0045, 0.005], luz: [1, 1, 1], contra: [1, 1, 1], halo: [1, 1, 1, 0], passos: 80 };

  function medir(w, h) {
    largura = w; altura = h;
    escala = Math.min(devicePixelRatio || 1, dprMax) * qualidade;
    const cw = Math.round(w * escala), ch = Math.round(h * escala);
    if (canvas.width !== cw || canvas.height !== ch) { canvas.width = cw; canvas.height = ch; }
    gl.viewport(0, 0, cw, ch);
  }

  /** itens: [{ x, y, raio (px de CSS por unidade), rot (mat3, 9 números por coluna), formas [a,b,c], pesos [a,b,c], agito, alfa }] */
  function desenhar(itens, tempo) {
    gl.disable(gl.SCISSOR_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.SCISSOR_TEST);
    gl.uniform1f(u.uTempo, tempo);
    gl.uniform3fv(u.uBase, material.base);
    gl.uniform3fv(u.uLuz, material.luz);
    gl.uniform3fv(u.uContra, material.contra);
    gl.uniform4fv(u.uHalo, material.halo);
    gl.uniform1f(u.uPassos, material.passos);
    for (const it of itens) {
      if (!(it.alfa > 0.003) || !(it.raio > 1)) continue;
      const cx = it.x * escala, cy = (altura - it.y) * escala, r = it.raio * escala;
      const meia = r * (material.halo[3] > 0.0005 ? 2.9 : 1.34) + 2;
      const x0 = Math.max(0, Math.floor(cx - meia)), y0 = Math.max(0, Math.floor(cy - meia));
      const x1 = Math.min(canvas.width, Math.ceil(cx + meia)), y1 = Math.min(canvas.height, Math.ceil(cy + meia));
      if (x1 <= x0 || y1 <= y0) continue;
      gl.scissor(x0, y0, x1 - x0, y1 - y0);
      gl.uniform2f(u.uCentro, cx, cy);
      gl.uniform1f(u.uRaio, r);
      gl.uniformMatrix3fv(u.uRot, false, it.rot);
      gl.uniform3i(u.uForma, it.formas[0], it.formas[1], it.formas[2]);
      gl.uniform3f(u.uPeso, it.pesos[0], it.pesos[1], it.pesos[2]);
      gl.uniform1f(u.uAgito, it.agito || 0);
      gl.uniform1f(u.uAlfa, it.alfa);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }
  }

  return {
    gl, medir, desenhar, material,
    /** qualidade < 1 desenha em menos pixels (aparelho lento) */
    definirQualidade(q) { qualidade = q; medir(largura, altura); },
    get qualidade() { return qualidade; },
  };
}

// ---- rotação: quatérnios [x, y, z, w] -------------------------------------------------------------------------
export const quat = {
  deEuler(x, y, z) {   // gira em z, depois x, depois y (graus)
    const k = Math.PI / 360;
    const [sx, cx, sy, cy, sz, cz] = [Math.sin(x * k), Math.cos(x * k), Math.sin(y * k), Math.cos(y * k), Math.sin(z * k), Math.cos(z * k)];
    const qz = [0, 0, sz, cz], qx = [sx, 0, 0, cx], qy = [0, sy, 0, cy];
    return quat.mul(qy, quat.mul(qx, qz));
  },
  mul(a, b) {
    return [
      a[3] * b[0] + a[0] * b[3] + a[1] * b[2] - a[2] * b[1],
      a[3] * b[1] - a[0] * b[2] + a[1] * b[3] + a[2] * b[0],
      a[3] * b[2] + a[0] * b[1] - a[1] * b[0] + a[2] * b[3],
      a[3] * b[3] - a[0] * b[0] - a[1] * b[1] - a[2] * b[2],
    ];
  },
  /** mistura normalizada pelo caminho curto */
  mistura(a, b, t) {
    const s = a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3] < 0 ? -1 : 1;
    const q = [a[0] + (b[0] * s - a[0]) * t, a[1] + (b[1] * s - a[1]) * t, a[2] + (b[2] * s - a[2]) * t, a[3] + (b[3] * s - a[3]) * t];
    const n = Math.hypot(q[0], q[1], q[2], q[3]) || 1;
    return [q[0] / n, q[1] / n, q[2] / n, q[3] / n];
  },
  /** matriz 3×3 por coluna, do jeito que o WebGL recebe */
  matriz(q, out = new Float32Array(9)) {
    const [x, y, z, w] = q;
    out[0] = 1 - 2 * (y * y + z * z); out[1] = 2 * (x * y + z * w); out[2] = 2 * (x * z - y * w);
    out[3] = 2 * (x * y - z * w); out[4] = 1 - 2 * (x * x + z * z); out[5] = 2 * (y * z + x * w);
    out[6] = 2 * (x * z + y * w); out[7] = 2 * (y * z - x * w); out[8] = 1 - 2 * (x * x + y * y);
    return out;
  },
};
