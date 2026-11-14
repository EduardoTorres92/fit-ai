// Confere se o pedido vem do dono do app (ALLOWED_EMAIL), por login próprio (e-mail e senha) ou Google.
import { lerToken, ehTokenProprio, ehEmailDono } from "./sessao.mjs";

const GOOGLE_CLIENT_ID = "900778689263-mgkn7nbs66bk3h7cqi19gmo1t7o7ivne.apps.googleusercontent.com";

export async function ehDono(req) {
  const token = (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  if (!token) return false;
  // Login com e-mail e senha do próprio app
  if (ehTokenProprio(token)) return ehEmailDono(await lerToken(token));
  // Login com Google
  const r = await fetch(`https://oauth2.googleapis.com/tokeninfo?access_token=${encodeURIComponent(token)}`);
  if (!r.ok) return false;
  const info = await r.json();
  const permitido = (process.env.ALLOWED_EMAIL || "").trim().toLowerCase();
  return info.aud === GOOGLE_CLIENT_ID && String(info.email_verified) === "true" && !!permitido && String(info.email).toLowerCase() === permitido;
}
