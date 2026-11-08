// Contas de e-mail e senha do FIT.AI (guardadas no Netlify Blobs).
// - Senhas: nunca guardadas; só o hash scrypt com sal aleatório.
// - Sessão: token assinado com HMAC (segredo aleatório criado uma vez e guardado no próprio Blobs).
import { getStore } from "@netlify/blobs";
import { randomBytes, scrypt as _scrypt, timingSafeEqual, createHmac } from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(_scrypt);
const PREFIXO = "fa1.";
const DIAS_SESSAO = 60;

export const loja = () => getStore({ name: "fitai-contas", consistency: "strong" });
export const normEmail = (e) => String(e || "").trim().toLowerCase();
export const ehEmailDono = (email) => {
  const dono = normEmail(process.env.ALLOWED_EMAIL);
  return !!dono && normEmail(email) === dono;
};

async function segredo() {
  const l = loja();
  let s = await l.get("config/segredo-sessao");
  if (!s) {
    s = randomBytes(32).toString("hex");
    await l.set("config/segredo-sessao", s, { onlyIfNew: true }).catch(() => {});
    s = (await l.get("config/segredo-sessao")) || s;
  }
  return s;
}

export async function hashSenha(senha) {
  const sal = randomBytes(16);
  const h = await scrypt(String(senha), sal, 64);
  return `${sal.toString("hex")}:${h.toString("hex")}`;
}
export async function confereSenha(senha, guardado) {
  const [salHex, hHex] = String(guardado || "").split(":");
  if (!salHex || !hHex) return false;
  const h = await scrypt(String(senha), Buffer.from(salHex, "hex"), 64);
  const g = Buffer.from(hHex, "hex");
  return g.length === h.length && timingSafeEqual(g, h);
}

const b64 = (s) => Buffer.from(s).toString("base64url");
export async function criaToken(email) {
  const corpo = b64(JSON.stringify({ e: normEmail(email), x: Date.now() + DIAS_SESSAO * 864e5 }));
  const ass = createHmac("sha256", await segredo()).update(corpo).digest("base64url");
  return `${PREFIXO}${corpo}.${ass}`;
}
// Devolve o e-mail da sessão se o token for válido, senão null.
export async function lerToken(token) {
  if (!String(token || "").startsWith(PREFIXO)) return null;
  const [corpo, ass] = token.slice(PREFIXO.length).split(".");
  if (!corpo || !ass) return null;
  const certo = createHmac("sha256", await segredo()).update(corpo).digest("base64url");
  const a = Buffer.from(ass), b = Buffer.from(certo);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const { e, x } = JSON.parse(Buffer.from(corpo, "base64url").toString());
    if (!e || !(x > Date.now())) return null;
    const conta = await loja().get(`conta/${e}`, { type: "json" });
    return conta ? e : null; // conta apagada = sessão inválida
  } catch { return null; }
}
export const ehTokenProprio = (t) => String(t || "").startsWith(PREFIXO);
