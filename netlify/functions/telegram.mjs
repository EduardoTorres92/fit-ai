// /api/telegram — bot do Telegram (@treinosfit_bot). Só funciona no servidor Node (server.mjs).
// - Webhook do Telegram: POST com o cabeçalho X-Telegram-Bot-Api-Secret-Token.
// - App (com o token de login): POST { acao: "estado" | "vincular" | "config" | "agenda" | "ok" | "testar" | "desligar" | "token" }.
// Por enquanto (fase de teste) só a conta do dono (ALLOWED_EMAIL) pode usar.
import { emailDoToken } from "../lib/dono.mjs";
import { ehEmailDono } from "../lib/sessao.mjs";
import * as tg from "../lib/telegram.mjs";

const json = (status, body) => new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" } });
const permitido = (email) => ehEmailDono(email);

export default async (req) => {
  if (req.method !== "POST") return json(405, { erro: "metodo" });
  try {
    if (req.headers.get("x-telegram-bot-api-secret-token") !== null) {
      const t = await tg.token();
      if (!t || !tg.webhookValido(req, t)) return json(401, { erro: "segredo" });
      const u = await req.json().catch(() => null);
      if (u) await tg.processar(u, permitido).catch((e) => console.error("telegram: update", e?.message));
      return json(200, { ok: true }); // sempre 200 para o Telegram não repetir a mesma atualização
    }

    const token = (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
    const email = await emailDoToken(token).catch(() => null);
    if (!email) return json(401, { erro: "login" });
    if (!permitido(email)) return json(403, { erro: "teste_fechado" });
    const c = await req.json().catch(() => ({}));
    const temToken = !!(await tg.token());
    if (c.acao === "token") { const r = await tg.configurarToken(c.token); return json(r.erro ? 400 : 200, r); }
    if (!temToken) return json(200, { token: false, ligado: false });
    let r;
    if (c.acao === "estado") r = await tg.estado(email);
    else if (c.acao === "vincular") r = await tg.codigoVincular(email);
    else if (c.acao === "config") r = await tg.configurar(email, c);
    else if (c.acao === "agenda") r = await tg.receberAgenda(email, c);
    else if (c.acao === "ok") r = await tg.confirmarMarcados(email, c.datas);
    else if (c.acao === "agua") r = await tg.configurarAgua(email, c);
    else if (c.acao === "regok") r = await tg.confirmarRegistros(email, c.ids);
    else if (c.acao === "aguaok") r = await tg.confirmarAgua(email, c.ids);
    else if (c.acao === "testar") r = await tg.testar(email);
    else if (c.acao === "desligar") r = await tg.desligar(email);
    else return json(400, { erro: "acao" });
    return json(r.erro ? 400 : 200, { token: true, ...r });
  } catch (e) {
    console.error("telegram erro", e?.message);
    return json(500, { erro: "interno" });
  }
};
