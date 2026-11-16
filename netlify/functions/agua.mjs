// /api/agua — lembrete de água por notificação push.
// GET  → { chave } (chave pública VAPID para o navegador assinar)
// POST { acao: "assinar", assinatura, intervalo, ml, ini, fim, tz } | { acao: "cancelar" | "bebeu" | "testar", endpoint }
// Só funciona no servidor Node (server.mjs), que também roda o agendador a cada minuto.
import { chavesVapid, assinar, cancelar, bebeu, testar } from "../lib/agua.mjs";

const json = (status, body) => new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" } });

export default async (req) => {
  try {
    if (req.method === "GET") return json(200, { chave: (await chavesVapid()).publicKey });
    if (req.method !== "POST") return json(405, { erro: "metodo" });
    const c = await req.json().catch(() => ({}));
    const endpoint = String(c.endpoint || c.assinatura?.endpoint || "");
    const r = c.acao === "assinar" ? await assinar(c) : c.acao === "cancelar" ? await cancelar(endpoint) : c.acao === "bebeu" ? await bebeu(endpoint) : c.acao === "testar" ? await testar(endpoint) : { erro: "acao" };
    return json(r.erro ? 400 : 200, r);
  } catch (e) {
    console.error("agua erro", e?.message);
    return json(500, { erro: "interno" });
  }
};
