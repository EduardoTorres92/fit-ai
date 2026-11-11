// Servidor Node.js para hospedar o FIT.AI fora da Netlify (ex.: Hostinger).
// - Entrega os arquivos da pasta public/.
// - /api/auth e /api/coach: as mesmas funções da pasta netlify/functions, chamadas daqui.
// - Contas, segredo de sessão e limites do Coach ficam em arquivos (ver netlify/lib/blobs.mjs).
// Variáveis: ANTHROPIC_API_KEY (obrigatória para o Coach), ALLOWED_EMAIL, LIMITE_VISITANTE_DIA,
// LIMITE_GERAL_DIA, DADOS_DIR, PORT. Iniciar: npm start.
import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { extname, join, normalize, sep } from "node:path";
import { Readable } from "node:stream";
import { fileURLToPath } from "node:url";

process.env.FITAI_ARMAZENAMENTO = "arquivo";
const { default: auth } = await import("./netlify/functions/auth.mjs");
const { default: coach } = await import("./netlify/functions/coach.mjs");

const RAIZ = fileURLToPath(new URL("./public/", import.meta.url));
const PORTA = Number(process.env.PORT) || 3000;
const ROTAS = { "/api/auth": auth, "/api/coach": coach };
const MAX_CORPO = 512 * 1024; // o Coach manda programa + contexto; 512 KB sobra

const TIPOS = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8", ".json": "application/json; charset=utf-8", ".svg": "image/svg+xml",
  ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".gif": "image/gif",
  ".ico": "image/x-icon", ".webmanifest": "application/manifest+json", ".woff": "font/woff", ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
};
const SEGURANCA = { "X-Content-Type-Options": "nosniff", "Referrer-Policy": "strict-origin-when-cross-origin" };

// IP do visitante (atrás do proxy da hospedagem vem no X-Forwarded-For)
const ipDe = (req) => String(req.headers["x-forwarded-for"] || "").split(",")[0].trim() || req.socket.remoteAddress || "sem-ip";

async function lerCorpo(req) {
  const partes = [];
  let total = 0;
  for await (const p of req) {
    total += p.length;
    if (total > MAX_CORPO) throw Object.assign(new Error("grande"), { status: 413 });
    partes.push(p);
  }
  return Buffer.concat(partes);
}

// Chama uma função no formato da Netlify (Request -> Response) e devolve a resposta pelo Node.
async function chamaFuncao(funcao, req, res) {
  const corpo = req.method === "GET" || req.method === "HEAD" ? undefined : await lerCorpo(req);
  const pedido = new Request(new URL(req.url, `http://${req.headers.host || "localhost"}`), {
    method: req.method,
    headers: Object.entries(req.headers).flatMap(([k, v]) => (Array.isArray(v) ? v.map((x) => [k, x]) : [[k, v]])),
    body: corpo,
  });
  const resposta = await funcao(pedido, { ip: ipDe(req) });
  res.writeHead(resposta.status, { ...SEGURANCA, ...Object.fromEntries(resposta.headers) });
  if (resposta.body) Readable.fromWeb(resposta.body).pipe(res);
  else res.end();
}

async function arquivo(caminho) {
  let rel = decodeURIComponent(caminho);
  if (rel.endsWith("/")) rel += "index.html";
  const alvo = normalize(join(RAIZ, rel));
  if (!alvo.startsWith(RAIZ.endsWith(sep) ? RAIZ : RAIZ + sep)) return null;
  for (const tentativa of [alvo, `${alvo}.html`, join(alvo, "index.html")]) {
    const info = await stat(tentativa).catch(() => null);
    if (info?.isFile()) return { caminho: tentativa, info };
  }
  return null;
}

createServer(async (req, res) => {
  try {
    const url = new URL(req.url, "http://localhost");
    const funcao = ROTAS[url.pathname];
    if (funcao) { await chamaFuncao(funcao, req, res); return; }
    if (req.method !== "GET" && req.method !== "HEAD") { res.writeHead(405, SEGURANCA).end(); return; }
    const achado = await arquivo(url.pathname);
    if (!achado) { res.writeHead(404, { ...SEGURANCA, "content-type": "text/plain; charset=utf-8" }).end("Página não encontrada."); return; }
    res.writeHead(200, {
      ...SEGURANCA,
      "content-type": TIPOS[extname(achado.caminho).toLowerCase()] || "application/octet-stream",
      "content-length": achado.info.size,
      "cache-control": url.pathname.startsWith("/assets/") ? "public, max-age=604800" : "no-cache",
    });
    if (req.method === "HEAD") { res.end(); return; }
    createReadStream(achado.caminho).pipe(res);
  } catch (e) {
    if (e.status !== 413) console.error(e);
    if (!res.headersSent) res.writeHead(e.status || 500, SEGURANCA);
    res.end();
  }
}).listen(PORTA, () => console.log(`FIT.AI no ar na porta ${PORTA}`));
