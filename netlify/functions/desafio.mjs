// Desafio do grupo a partir de um link de vídeo (o trabalho fica em ../lib/desafio-link.mjs).
// POST /api/desafio { link, nota? } → { desafio: { titulo, descricao, medida }, entendeu, duvida, fonte } | { erro }
import { cabeNoLimite, LIMITE_MEMBRO_DIA } from "../lib/limite.mjs";
import { emailDoToken } from "../lib/dono.mjs";
import { donoNaReq } from "../lib/sessao.mjs";
import { montarDesafio, linkAceito, capaDoLink } from "../lib/desafio-link.mjs";

const json = (status, obj) => new Response(JSON.stringify(obj), { status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" } });

export default async (req) => {
  if (req.method !== "POST") return json(405, { erro: "metodo" });
  if (!process.env.ANTHROPIC_API_KEY) return json(500, { erro: "sem_chave" });
  const token = (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  const email = await emailDoToken(token).catch(() => null);
  if (!email) return json(401, { erro: "login" }); // desafio é coisa de grupo: precisa de conta
  let c; try { c = await req.json(); } catch { return json(400, { erro: "json" }); }
  try { new URL(String(c.link || "").trim()); } catch { return json(400, { erro: "link" }); }
  if (!linkAceito(c.link)) return json(400, { erro: "site" });
  if (c.soCapa) return json(200, { capa: await capaDoLink(c.link) }); // sem IA: não conta no limite
  if (!donoNaReq(email, req)) {
    try { if (!(await cabeNoLimite(`conta:${email}`, LIMITE_MEMBRO_DIA, 2))) return json(429, { erro: "limite" }); }
    catch (e) { console.error("limite indisponível", e?.message); return json(503, { erro: "limite_indisponivel" }); }
  }
  const r = await montarDesafio(c.link, c.nota);
  if (r.erro) return json(r.erro === "sem_conteudo" ? 422 : 502, r);
  return json(200, r);
};

export const config = { path: "/api/desafio" };
