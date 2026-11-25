// Confere se o pedido vem do dono do app (ALLOWED_EMAIL).
// Aceita o token de sessão do Supabase (login do app) e, por compatibilidade, o token antigo do /api/auth.
import { lerToken, ehTokenProprio, ehEmailDono } from "./sessao.mjs";

// URL e chave publicável do Supabase (são públicas: o app usa as mesmas no navegador)
const SB_URL = process.env.SUPABASE_URL || "https://thckpqzvvjujuseqeusz.supabase.co";
const SB_KEY = process.env.SUPABASE_PUBLISHABLE_KEY || "sb_publishable_t8SLyWZNLgSHj_4B158EyA_tpHm_DmV";

export async function emailDoToken(token) { return (await usuarioDoToken(token))?.email || null; }
// E-mail e id do Supabase (o id falta no token antigo do /api/auth)
export async function usuarioDoToken(token) {
  if (!token) return null;
  if (ehTokenProprio(token)) { const email = await lerToken(token); return email ? { email, id: null } : null; }
  const r = await fetch(`${SB_URL}/auth/v1/user`, { headers: { apikey: SB_KEY, authorization: `Bearer ${token}` } });
  if (!r.ok) return null;
  const u = await r.json();
  // só vale e-mail confirmado (no Google ele já vem confirmado)
  return u && u.email && (u.email_confirmed_at || u.confirmed_at) ? { email: String(u.email).toLowerCase(), id: u.id || null } : null;
}

export async function ehDono(req) {
  const token = (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  return ehEmailDono(await emailDoToken(token).catch(() => null));
}
