// /api/agua — lembrete de água por notificação push.
// GET  → { chave } (chave pública VAPID para o navegador assinar)
// POST { acao: "assinar", assinatura, intervalo, ml, ini, fim, tz } | { acao: "avisos", assinatura, tz } (só avisos, com login) | { acao: "cancelar" | "bebeu" | "testar", endpoint }
// Só funciona no servidor Node (server.mjs), que também roda o agendador a cada minuto.
import { chavesVapid, assinar, assinarAvisos, cancelar, bebeu, testar, marcarUid } from "../lib/agua.mjs";
import { usuarioDoToken } from "../lib/dono.mjs";

const json = (status, body) => new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" } });

export default async (req) => {
  try {
    if (req.method === "GET") return json(200, { chave: (await chavesVapid()).publicKey });
    if (req.method !== "POST") return json(405, { erro: "metodo" });
    const c = await req.json().catch(() => ({}));
    const endpoint = String(c.endpoint || c.assinatura?.endpoint || "");
    const token = (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
    const uid = token ? (await usuarioDoToken(token).catch(() => null))?.id || null : null;
    if (c.acao === "conta") return json(200, uid ? await marcarUid(endpoint, uid) : { ok: false });
    if (c.acao === "avisos") { if (!uid) return json(401, { erro: "login" }); const r = await assinarAvisos(c.assinatura, uid, c.tz); return json(r.erro ? 400 : 200, r); }
    const r = c.acao === "assinar" ? await assinar(c, uid) : c.acao === "cancelar" ? await cancelar(endpoint) : c.acao === "bebeu" ? await bebeu(endpoint) : c.acao === "testar" ? await testar(endpoint) : { erro: "acao" };
    return json(r.erro ? 400 : 200, r);
  } catch (e) {
    console.error("agua erro", e?.message);
    return json(500, { erro: "interno" });
  }
};
