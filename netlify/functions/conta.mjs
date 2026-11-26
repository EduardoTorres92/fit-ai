// Conta da pessoa no servidor do FIT.AI.
// POST /api/conta { acao: "excluir" } → apaga o que este servidor guarda dela: conexão com o bot do Telegram (e a conversa
// com o Coach por lá) e os lembretes de água. Os dados do Supabase o próprio app apaga depois, com excluir_minha_conta().
import { usuarioDoToken } from "../lib/dono.mjs";
import { desligar } from "../lib/telegram.mjs";
import { apagarUid } from "../lib/agua.mjs";

const json = (status, obj) => new Response(JSON.stringify(obj), { status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" } });

export default async (req) => {
  if (req.method !== "POST") return json(405, { erro: "metodo" });
  const token = (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  const u = await usuarioDoToken(token).catch(() => null);
  if (!u?.email || !u.id) return json(401, { erro: "login" });
  let c; try { c = await req.json(); } catch { return json(400, { erro: "json" }); }
  if (c?.acao !== "excluir") return json(400, { erro: "acao" });
  try {
    await desligar(u.email, true);
    const lembretes = await apagarUid(u.id);
    return json(200, { ok: true, lembretes });
  } catch (e) {
    console.error("conta: falha ao limpar", e?.message);
    return json(500, { erro: "servidor" });
  }
};

export const config = { path: "/api/conta" };
