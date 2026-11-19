// As formas da peça, escritas como campos de distância em GLSL: cada função devolve a distância do ponto p até a
// superfície (negativa por dentro). Toda forma cabe numa esfera de raio ~1 e nasce de frente para a câmera (eixo z).
// Para trocar uma forma, é aqui: mudar as medidas, ou escrever outra função e ligá-la em `forma()` e na lista FORMAS.
// `relevo()` é a recartilha (os losangos em relevo): só mexe no brilho, não na silhueta.
export const FORMAS = ['anilha', 'halter', 'kettlebell', 'saco', 'bola', 'cadeado', 'cronometro'];

export const GLSL_FORMAS = /* glsl */ `
const float PI = 3.14159265;
const float TAU = 6.2831853;

float smin(float a, float b, float k) { float h = max(k - abs(a - b), 0.0) / k; return min(a, b) - h * h * k * 0.25; }
float smax(float a, float b, float k) { return -smin(-a, -b, k); }
mat2 gira(float a) { float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float caixa2(vec2 p, vec2 b, float r) { vec2 q = abs(p) - b + r; return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r; }
float caixa3(vec3 p, vec3 b, float r) { vec3 q = abs(p) - b + r; return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0) - r; }
// cilindro de bordas redondas: d2 = distância até o eixo, h = posição ao longo do eixo
float cil(float d2, float h, float raio, float meia, float r) {
  vec2 d = vec2(d2 - raio + r, abs(h) - meia + r);
  return min(max(d.x, d.y), 0.0) + length(max(d, 0.0)) - r;
}
float capsula(vec3 p, vec3 a, vec3 b, float r) {
  vec3 pa = p - a, ba = b - a;
  float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
  return length(pa - ba * h) - r;
}
// arco em volta do eixo x: raio ra, meia abertura (seno, cosseno) sc, meia espessura rb
float arco(vec2 p, vec2 sc, float ra, float rb) {
  p.y = abs(p.y);
  return ((sc.y * p.y > sc.x * p.x) ? length(p - vec2(sc.y, sc.x) * ra) : abs(length(p) - ra)) - rb;
}

// ---- anilha: disco emborrachado com aro, cubo e três pegas vazadas -------------------------------------------
float anilha(vec3 p) {
  float r = length(p.xy);
  vec2 q = vec2(r, p.z);
  float disco = caixa2(q - vec2(0.56, 0.0), vec2(0.42, 0.072), 0.03);
  float aro = caixa2(q - vec2(0.895, 0.0), vec2(0.105, 0.165), 0.08);
  float cubo = caixa2(q - vec2(0.255, 0.0), vec2(0.105, 0.135), 0.05);
  float d = smin(smin(disco, aro, 0.07), cubo, 0.07);
  // as três pegas: o ângulo dobrado em três e um rasgo em arco em cada terço
  float a = atan(p.y, p.x);
  float terco = TAU / 3.0;
  float af = mod(a + terco * 0.5, terco) - terco * 0.5;
  vec2 pl = vec2(cos(af), sin(af)) * r;
  float pega = arco(pl, vec2(sin(0.46), cos(0.46)), 0.585, 0.078);
  return smax(d, -pega, 0.05);
}
float relevoAnilha(vec3 p) {
  float r = length(p.xy);
  float a = atan(p.y, p.x);
  // a face rebaixada, entre o cubo e o aro: losangos em espiral (ângulo × logaritmo do raio, células quadradas)
  float face = smoothstep(0.385, 0.42, r) * smoothstep(0.775, 0.74, r) * smoothstep(0.045, 0.062, abs(p.z));
  float h = face * losango(vec2(a, log(max(r, 0.05))) * (66.0 / TAU));
  // a banda de rodagem do aro
  float banda = smoothstep(0.972, 0.992, r) * smoothstep(0.10, 0.07, abs(p.z));
  h += banda * losango(vec2(a * (96.0 / TAU), p.z / 0.0655));
  return h;
}

// ---- halter sextavado ----------------------------------------------------------------------------------------
float halter(vec3 p) {
  vec3 q = vec3(abs(p.x) - 0.655, p.y, p.z);
  vec2 s = abs(q.yz);
  float hex = max(s.x * 0.8660254 + s.y * 0.5, s.y) - 0.43;
  vec2 w = vec2(hex + 0.06, abs(q.x) - 0.27 + 0.06);
  float cabeca = min(max(w.x, w.y), 0.0) + length(max(w, 0.0)) - 0.06;
  float eixo = length(p.yz);
  float pega = max(eixo - (0.098 + 0.022 * cos(p.x * PI / 0.42)), abs(p.x) - 0.6);
  float colar = cil(eixo, abs(p.x) - 0.355, 0.165, 0.04, 0.02);
  return smin(smin(cabeca, pega, 0.03), colar, 0.025);
}
float relevoHalter(vec3 p) {
  float zona = smoothstep(0.30, 0.27, abs(p.x)) * smoothstep(0.17, 0.14, length(p.yz));
  return zona * losango(vec2(atan(p.z, p.y) * (22.0 / TAU), p.x / 0.031));
}

// ---- kettlebell ----------------------------------------------------------------------------------------------
float kettle(vec3 p) {
  float corpo = length(p - vec3(0.0, -0.27, 0.0)) - 0.61;
  corpo = smax(corpo, -(p.y + 0.80), 0.07);
  corpo = smax(corpo, abs(p.z) - 0.55, 0.10);
  vec3 a = p - vec3(0.0, 0.34, 0.0);
  a.y -= clamp(a.y, -0.2, 0.1);
  float alca = length(vec2(length(a.xy) - 0.33, a.z)) - 0.086;
  return smin(corpo, alca, 0.13);
}

// ---- saco de pancada -----------------------------------------------------------------------------------------
float saco(vec3 p) {
  vec3 b = p - vec3(0.0, -0.25, 0.0);
  float corpo = cil(length(b.xz), b.y, 0.37, 0.62, 0.13);
  float costura = min(abs(b.y - 0.33), abs(b.y + 0.33));
  corpo += 0.014 * smoothstep(0.035, 0.0, costura);
  vec3 q = vec3(abs(p.x), p.y, abs(p.z));
  float tira = capsula(q, vec3(0.215, 0.31, 0.215), vec3(0.02, 0.80, 0.02), 0.026);
  vec3 e = p - vec3(0.0, 0.90, 0.0);
  float elo = length(vec2(length(e.xy) - 0.082, e.z)) - 0.03;
  return min(smin(corpo, tira, 0.04), elo);
}

// ---- bola de arremesso ---------------------------------------------------------------------------------------
float bola(vec3 p) {
  float d = length(p) - 0.80;
  float gomo = min(min(abs(p.x), abs(p.y)), abs(p.z));
  return d + 0.022 * smoothstep(0.045, 0.0, gomo);
}
float relevoBola(vec3 p) {
  vec3 s = vec3(p.x < 0.0 ? -1.0 : 1.0, p.y < 0.0 ? -1.0 : 1.0, p.z < 0.0 ? -1.0 : 1.0);
  vec3 c = s * 0.57735;
  vec3 t1 = normalize(vec3(s.x, 0.0, -s.z));
  vec3 t2 = cross(c, t1);
  float gomo = min(min(abs(p.x), abs(p.y)), abs(p.z));
  return smoothstep(0.06, 0.11, gomo) * losango(vec2(dot(p, t1), dot(p, t2)) / 0.075);
}

// ---- cadeado aberto ------------------------------------------------------------------------------------------
float cadeado(vec3 p) {
  float corpo = caixa3(p - vec3(0.0, -0.40, 0.0), vec3(0.54, 0.42, 0.21), 0.11);
  // o buraco da chave, só na frente
  vec2 k = p.xy - vec2(0.0, -0.36);
  float chave = min(length(k) - 0.075, caixa2(k - vec2(0.0, -0.12), vec2(0.032, 0.10), 0.02));
  corpo = smax(corpo, -max(chave, 0.15 - p.z), 0.02);
  // a haste em U, levantada e girada em torno da perna direita
  vec3 h = p - vec3(0.29, 0.0, 0.0);
  h.xz = gira(0.72) * h.xz;
  h.x += 0.29;
  h.y -= 0.45;
  float u = length(vec2(length(vec2(h.x, max(h.y, 0.0))) - 0.29, h.z)) - 0.078;
  float corte = h.x > 0.0 ? -(h.y + 0.62) : -(h.y + 0.17);
  u = smax(u, corte, 0.05);
  return min(corpo, u);
}

// ---- cronômetro ----------------------------------------------------------------------------------------------
float crono(vec3 p) {
  vec3 c = p - vec3(0.0, -0.14, 0.0);
  float r = length(c.xy);
  float corpo = cil(r, c.z, 0.73, 0.165, 0.07);
  // o mostrador rebaixado na frente
  corpo = smax(corpo, -cil(r, c.z - 0.21, 0.60, 0.075, 0.02), 0.03);
  // doze marcas das horas
  float a = atan(c.y, c.x);
  float doze = TAU / 12.0;
  float af = mod(a + doze * 0.5, doze) - doze * 0.5;
  vec3 m = vec3(cos(af) * r - 0.50, sin(af) * r, c.z - 0.135);
  float marca = caixa3(m, vec3(0.055, 0.016, 0.02), 0.012);
  // ponteiro e pino
  vec3 f = c - vec3(0.0, 0.0, 0.14);
  float ponteiro = capsula(f, vec3(-0.06, -0.08, 0.0), vec3(0.24, 0.34, 0.0), 0.026);
  float pino = length(f * vec3(1.0, 1.0, 1.6)) - 0.07;
  float d = min(corpo, min(marca, min(ponteiro, pino)));
  // coroa em cima e os dois botões nos ombros
  float coroa = cil(length(p.xz), p.y - 0.755, 0.125, 0.085, 0.03);
  float pescoco = cil(length(p.xz), p.y - 0.63, 0.07, 0.07, 0.01);
  vec3 o = vec3(abs(c.x), c.y, c.z);
  o.xy = gira(0.66) * o.xy;
  float botao = cil(length(o.xz), o.y - 0.80, 0.075, 0.075, 0.025);
  return min(d, min(smin(coroa, pescoco, 0.02), botao));
}
float relevoCrono(vec3 p) {
  float zona = smoothstep(0.68, 0.70, p.y) * smoothstep(0.84, 0.82, p.y) * smoothstep(0.10, 0.118, length(p.xz));
  float u = atan(p.z, p.x) * (18.0 / TAU);
  return zona * (1.0 - 2.0 * abs(fract(u) - 0.5));
}

float forma(int id, vec3 p) {
  if (id == 0) return anilha(p);
  if (id == 1) return halter(p);
  if (id == 2) return kettle(p);
  if (id == 3) return saco(p);
  if (id == 4) return bola(p);
  if (id == 5) return cadeado(p);
  return crono(p);
}
float relevoDe(int id, vec3 p) {
  if (id == 0) return relevoAnilha(p);
  if (id == 1) return relevoHalter(p);
  if (id == 4) return relevoBola(p);
  if (id == 6) return relevoCrono(p);
  return 0.0;
}
`;

// a pirâmide da recartilha entra antes das formas (o relevo de cada uma usa)
export const GLSL_RECARTILHA = /* glsl */ `
float piramide(vec2 uv) { vec2 g = abs(fract(uv) - 0.5); return 1.0 - 2.0 * max(g.x, g.y); }
float losango(vec2 uv) { return piramide(vec2(uv.x + uv.y, uv.x - uv.y)); }
`;
