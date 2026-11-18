// Bot do Telegram (@treinosfit_bot): manda o treino do dia, lembra à noite se ainda não treinou e
// recebe "✅ Feito" pelo botão da mensagem.
// - O token vem de TELEGRAM_TOKEN ou é colado uma vez pelo dono no app (fica em DADOS_DIR/telegram/config.json).
// - O app manda a agenda dos próximos dias (o servidor não conhece a lógica dos programas) e os dias já feitos.
// - Um "Feito" tocado no Telegram fica em "marcar" até o app abrir e registrar o treino de verdade.
// - iniciarTelegram() liga o webhook e roda o agendador a cada minuto (no server.mjs).
import { mkdir, readFile, writeFile, rename } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";
import { createHash, randomBytes, timingSafeEqual } from "node:crypto";

const PASTA = join(process.env.DADOS_DIR || join(homedir(), "fitai-dados"), "telegram");
const ARQ = join(PASTA, "dados.json"), CFG = join(PASTA, "config.json");
const SITE = (process.env.FITAI_URL || "https://fitai.eduardotorres-dev.com.br").replace(/\/+$/, "");
const DIAS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
let dados = null, cfg = null, gravando = Promise.resolve(), botNome = process.env.TELEGRAM_BOT || "treinosfit_bot";

async function lerJson(caminho, padrao) { try { return JSON.parse(await readFile(caminho, "utf8")); } catch { return padrao; } }
async function gravarJson(caminho, obj) {
  await mkdir(PASTA, { recursive: true, mode: 0o700 });
  const tmp = `${caminho}.${process.pid}.${randomBytes(4).toString("hex")}.tmp`;
  await writeFile(tmp, JSON.stringify(obj), { mode: 0o600 });
  await rename(tmp, caminho);
}
async function todos() { if (!dados) dados = { contas: {}, codigos: {}, ...(await lerJson(ARQ, {})) }; return dados; }
const salvar = () => (gravando = gravando.then(() => gravarJson(ARQ, dados)).catch((e) => console.error("telegram: falha ao gravar", e?.message)));

export async function token() {
  if (process.env.TELEGRAM_TOKEN) return process.env.TELEGRAM_TOKEN.trim();
  if (!cfg) cfg = await lerJson(CFG, {});
  return cfg.token || null;
}
export const nomeBot = () => botNome;
const segredo = (t) => createHash("sha256").update(`fitai-tg:${t}`).digest("hex").slice(0, 48);

async function api(metodo, corpo) {
  const t = await token();
  if (!t) throw new Error("sem_token");
  const r = await fetch(`https://api.telegram.org/bot${t}/${metodo}`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(corpo || {}) });
  const j = await r.json().catch(() => ({}));
  if (!j.ok) throw Object.assign(new Error(j.description || `telegram ${r.status}`), { codigo: j.error_code });
  return j.result;
}

// Liga o webhook do bot neste servidor. Chamado ao iniciar e quando o dono cola o token.
export async function ligarWebhook() {
  const t = await token();
  if (!t) return false;
  const eu = await api("getMe");
  if (eu?.username) botNome = eu.username;
  await api("setWebhook", { url: `${SITE}/api/telegram`, secret_token: segredo(t), allowed_updates: ["message", "callback_query"], drop_pending_updates: false });
  await api("setMyCommands", { commands: [
    { command: "hoje", description: "Treino de hoje" }, { command: "amanha", description: "Treino de amanhã" },
    { command: "semana", description: "Próximos 7 dias" }, { command: "parar", description: "Desligar os avisos" },
  ] }).catch(() => {});
  return true;
}

// O dono cola o token no app (só quando não há TELEGRAM_TOKEN nem token salvo)
export async function configurarToken(novo) {
  if (await token()) return { erro: "ja_configurado" };
  const t = String(novo || "").trim();
  if (!/^\d{5,15}:[\w-]{30,60}$/.test(t)) return { erro: "token_invalido" };
  const r = await fetch(`https://api.telegram.org/bot${t}/getMe`).then((x) => x.json()).catch(() => null);
  if (!r?.ok) return { erro: "token_recusado" };
  cfg = { token: t };
  await gravarJson(CFG, cfg);
  await ligarWebhook();
  return { ok: true, bot: botNome };
}

export function webhookValido(req, t) {
  const h = Buffer.from(String(req.headers.get("x-telegram-bot-api-secret-token") || ""));
  const s = Buffer.from(segredo(t));
  return h.length === s.length && timingSafeEqual(h, s);
}

/* ---------- Dados de cada conta (chave: e-mail) ---------- */
const DATA = /^\d{4}-\d{2}-\d{2}$/;
const txt = (v, n) => String(v ?? "").replace(/\s+/g, " ").trim().slice(0, n);
const hhmm = (v) => { const m = String(v ?? "").match(/^(\d{1,2}):(\d{2})$/); return m && +m[1] < 24 && +m[2] < 60 ? +m[1] * 60 + +m[2] : null; };
const minStr = (m) => `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
const diaLocal = (tz, agora = Date.now()) => new Date(agora + tz * 60000).toISOString().slice(0, 10);
const minLocal = (tz, agora = Date.now()) => (((Math.floor(agora / 60000) + tz) % 1440) + 1440) % 1440;
const linkOk = (u) => { try { const x = new URL(String(u)); return x.origin === SITE ? x.href.slice(0, 300) : null; } catch { return null; } };

function limparAgenda(lista) {
  return (Array.isArray(lista) ? lista : []).slice(0, 10).filter((a) => a && DATA.test(a.data)).map((a) => ({
    data: a.data, prog: txt(a.prog, 60), titulo: txt(a.titulo, 100), descanso: !!a.descanso,
    itens: (Array.isArray(a.itens) ? a.itens : []).slice(0, 15).map((i) => txt(i, 120)).filter(Boolean), link: linkOk(a.link),
  }));
}

export async function estado(email) {
  const c = (await todos()).contas[email];
  return { ligado: !!c?.chat, hora: c ? minStr(c.hora) : "07:00", noite: c?.noite == null ? (c ? null : "20:00") : minStr(c.noite), marcar: c?.marcar || [],
    agua: c?.agua?.on ? { on: true, ml: c.agua.ml, intervalo: c.agua.intervalo, ini: minStr(c.agua.ini), fim: minStr(c.agua.fim) } : { on: false }, aguaPend: c?.aguaPend || [], bot: botNome };
}
export async function codigoVincular(email) {
  const d = await todos();
  for (const [k, v] of Object.entries(d.codigos)) if (v.exp < Date.now() || v.email === email) delete d.codigos[k];
  const codigo = randomBytes(12).toString("base64url");
  d.codigos[codigo] = { email, exp: Date.now() + 15 * 60000 };
  salvar();
  return { link: `https://t.me/${botNome}?start=${codigo}`, bot: botNome };
}
export async function configurar(email, c) {
  const conta = (await todos()).contas[email];
  if (!conta) return { erro: "nao_ligado" };
  const h = hhmm(c.hora);
  if (h != null) conta.hora = h;
  if (c.noite === null || c.noite === "") conta.noite = null; else { const n = hhmm(c.noite); if (n != null) conta.noite = n; }
  salvar();
  return { ok: true, ...(await estado(email)) };
}
export async function receberAgenda(email, c) {
  const conta = (await todos()).contas[email];
  if (!conta) return { ligado: false };
  conta.agenda = limparAgenda(c.agenda);
  conta.feitos = (Array.isArray(c.feitos) ? c.feitos : []).filter((k) => DATA.test(k)).slice(-14);
  conta.tz = Math.min(840, Math.max(-720, Math.round(Number(c.tz) || -180)));
  conta.nome = txt(c.nome, 40) || conta.nome;
  conta.marcar = (conta.marcar || []).filter((k) => !conta.feitos.includes(k));
  const ml = Math.min(20000, Math.max(0, Math.round(Number(c.aguaHoje) || 0))), meta = Math.min(10000, Math.max(0, Math.round(Number(c.aguaMeta) || 0)));
  const hojeK = diaLocal(conta.tz);
  const antes = conta.aguaDia?.data === hojeK ? conta.aguaDia.ml : 0;
  if (ml > antes && conta.agua) conta.agua.ultimo = Date.now(); // bebeu pelo app: o próximo aviso conta a partir de agora
  conta.aguaDia = { data: hojeK, ml, meta: meta || conta.aguaDia?.meta || 0 };
  salvar();
  return { ok: true, ...(await estado(email)) };
}
// Lembrete de água pelo Telegram (no lugar da notificação do celular)
export async function configurarAgua(email, c) {
  const conta = (await todos()).contas[email];
  if (!conta) return { erro: "nao_ligado" };
  if (!c.on) delete conta.agua;
  else conta.agua = { on: true, ml: Math.min(1000, Math.max(50, Math.round(Number(c.ml) || 300))), intervalo: Math.min(240, Math.max(15, Math.round(Number(c.intervalo) || 60))),
    ini: hhmm(c.ini) ?? 8 * 60, fim: hhmm(c.fim) ?? 22 * 60, ultimo: Date.now() };
  salvar();
  if (conta.agua && c.testar) await enviar(conta.chat, { text: `💧 Lembrete de água ligado! Vou te lembrar de beber <b>${conta.agua.ml} ml</b> a cada ${conta.agua.intervalo} min, das ${minStr(conta.agua.ini)} às ${minStr(conta.agua.fim)}.` }).catch(() => {});
  return { ok: true, ...(await estado(email)) };
}
export async function confirmarAgua(email, ids) {
  const conta = (await todos()).contas[email];
  if (conta) { conta.aguaPend = (conta.aguaPend || []).filter((x) => !(ids || []).includes(x.id)); salvar(); }
  return { ok: true };
}
export async function confirmarMarcados(email, datas) {
  const conta = (await todos()).contas[email];
  if (conta) { conta.marcar = (conta.marcar || []).filter((k) => !(datas || []).includes(k)); salvar(); }
  return { ok: true };
}
export async function desligar(email) {
  const d = await todos(), c = d.contas[email];
  if (c?.chat) await api("sendMessage", { chat_id: c.chat, text: "Avisos desligados. Para ligar de novo, use o botão no perfil do FIT.AI." }).catch(() => {});
  delete d.contas[email];
  salvar();
  return { ok: true };
}

/* ---------- Mensagens ---------- */
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const dataBR = (k) => { const d = new Date(`${k}T12:00:00Z`); return `${DIAS[d.getUTCDay()]} ${k.slice(8, 10)}/${k.slice(5, 7)}`; };
const somarDia = (k, n) => new Date(Date.parse(`${k}T12:00:00Z`) + n * 864e5).toISOString().slice(0, 10);

function mensagemDia(conta, k, { cabeca, botoes = true } = {}) {
  const a = (conta.agenda || []).find((x) => x.data === k);
  const feito = (conta.feitos || []).includes(k) || (conta.marcar || []).includes(k);
  const topo = `<b>${esc(cabeca || `Treino de ${dataBR(k)}`)}</b>`;
  if (!a) return { text: `${topo}\nNão tenho o treino desse dia. Abra o FIT.AI para eu atualizar a agenda.`, reply_markup: { inline_keyboard: [[{ text: "▶️ Abrir o FIT.AI", url: `${SITE}/` }]] } };
  if (a.descanso) return { text: `${topo}\n😴 Descanso${a.prog ? ` no ${esc(a.prog)}` : ""}. Recupere bem!` };
  const linhas = [topo, `<b>${esc([a.prog, a.titulo].filter(Boolean).join(" · "))}</b>`, ...a.itens.map((i) => `• ${esc(i)}`)];
  if (feito) linhas.push("", "✅ Já está feito. Mandou bem!");
  const kb = [];
  if (botoes && !feito) kb.push([{ text: "✅ Feito", callback_data: `feito:${k}` }]);
  if (a.link) kb.push([{ text: "▶️ Abrir treino", url: a.link }]);
  return { text: linhas.join("\n"), ...(kb.length ? { reply_markup: { inline_keyboard: kb } } : {}) };
}
const fmtL = (ml) => `${(ml / 1000).toFixed(ml % 1000 ? 1 : 0).replace(".", ",")} L`;
function aguaTotal(c, k = diaLocal(c.tz ?? -180)) {
  return (c.aguaDia?.data === k ? c.aguaDia.ml : 0) + (c.aguaPend || []).filter((x) => x.data === k).reduce((a, x) => a + x.ml, 0);
}
const aguaProgresso = (c) => { const t = aguaTotal(c), m = c.aguaDia?.meta; return m ? `Hoje: ${fmtL(t)} de ${fmtL(m)}` : t ? `Hoje: ${fmtL(t)}` : ""; };
function mensagemAgua(c) {
  const ml = c.agua.ml, outro = ml >= 500 ? 300 : 500, p = aguaProgresso(c);
  return { text: `💧 <b>Hora de beber água: ${ml} ml</b>${p ? `\n${p}` : ""}`,
    reply_markup: { inline_keyboard: [[{ text: `✅ Bebi ${ml} ml`, callback_data: `agua:${ml}` }, { text: `${outro} ml`, callback_data: `agua:${outro}` }]] } };
}
const enviar = (chat, m) => api("sendMessage", { chat_id: chat, parse_mode: "HTML", disable_web_page_preview: true, ...m });

export async function testar(email) {
  const c = (await todos()).contas[email];
  if (!c?.chat) return { erro: "nao_ligado" };
  await enviar(c.chat, mensagemDia(c, diaLocal(c.tz ?? -180), { cabeca: `Teste · treino de ${dataBR(diaLocal(c.tz ?? -180))}` }));
  return { ok: true };
}

// Atualização vinda do Telegram (webhook)
export async function processar(u, permitido) {
  const d = await todos();
  const contaDoChat = (chat) => Object.entries(d.contas).find(([, c]) => c.chat === chat) || [];
  if (u.callback_query) {
    const q = u.callback_query, chat = q.message?.chat?.id, [email, c] = contaDoChat(chat);
    const ag = String(q.data || "").match(/^agua:(\d{2,4})$/);
    if (c && ag) {
      const ml = Math.min(1000, Math.max(50, Number(ag[1]))), tz = c.tz ?? -180, k = diaLocal(tz), mm = minLocal(tz);
      const metaAntes = c.aguaDia?.meta && aguaTotal(c) < c.aguaDia.meta;
      (c.aguaPend = c.aguaPend || []).push({ id: randomBytes(6).toString("hex"), data: k, ml, t: minStr(mm) });
      if (c.agua) c.agua.ultimo = Date.now();
      salvar();
      const bateu = metaAntes && aguaTotal(c) >= c.aguaDia.meta;
      await api("answerCallbackQuery", { callback_query_id: q.id, text: `+${ml} ml 💧` }).catch(() => {});
      await api("editMessageText", { chat_id: chat, message_id: q.message.message_id, parse_mode: "HTML",
        text: `✅ Bebi <b>${ml} ml</b> às ${minStr(mm)}\n${aguaProgresso(c)}${bateu ? "\n🎉 Meta de água batida!" : ""}` }).catch(() => {});
      return;
    }
    const m = String(q.data || "").match(/^feito:(\d{4}-\d{2}-\d{2})$/);
    if (!c || !m) { await api("answerCallbackQuery", { callback_query_id: q.id, text: "Conecte o bot pelo perfil do FIT.AI." }).catch(() => {}); return; }
    const k = m[1];
    if (!(c.feitos || []).includes(k) && !(c.marcar || []).includes(k)) { (c.marcar = c.marcar || []).push(k); salvar(); }
    await api("answerCallbackQuery", { callback_query_id: q.id, text: "Treino anotado! 🔥" }).catch(() => {});
    const nova = mensagemDia(c, k, { cabeca: q.message?.text?.split("\n")[0] || undefined });
    await api("editMessageText", { chat_id: chat, message_id: q.message.message_id, parse_mode: "HTML", disable_web_page_preview: true, ...nova }).catch(() => {});
    await enviar(chat, { text: "Anotado ✅ Quando você abrir o FIT.AI, o treino entra no histórico e na sua constância." });
    void email;
    return;
  }
  const msg = u.message;
  if (!msg?.chat?.id || msg.chat.type !== "private") return;
  const chat = msg.chat.id, texto = String(msg.text || "").trim();
  const [email, c] = contaDoChat(chat);
  const ini = texto.match(/^\/start(?:@\w+)?\s+([\w-]{8,40})$/);
  if (ini) {
    const v = d.codigos[ini[1]];
    delete d.codigos[ini[1]];
    if (!v || v.exp < Date.now() || !permitido(v.email)) { salvar(); await enviar(chat, { text: "Esse link expirou. Abra o perfil no FIT.AI e toque em <b>Conectar Telegram</b> de novo." }); return; }
    for (const [e, x] of Object.entries(d.contas)) if (x.chat === chat && e !== v.email) delete d.contas[e];
    const antiga = d.contas[v.email] || {};
    d.contas[v.email] = { hora: 7 * 60, noite: 20 * 60, tz: -180, agenda: [], feitos: [], marcar: [], ...antiga, chat, desde: antiga.desde || Date.now() };
    salvar();
    const conta = d.contas[v.email];
    await enviar(chat, { text: `Pronto${conta.nome ? `, ${esc(conta.nome)}` : ""}! 💪 Conectei sua conta do FIT.AI.\n\nTodo dia às <b>${minStr(conta.hora)}</b> eu mando o seu treino${conta.noite != null ? ` e, se até as <b>${minStr(conta.noite)}</b> ele não estiver feito, dou um toque` : ""}. Os horários mudam no perfil do app.\n\nComandos: /hoje /amanha /semana /parar` });
    return;
  }
  if (!c) { await enviar(chat, { text: "Oi! Eu sou o bot do <b>FIT.AI</b>. Para receber seus treinos aqui, abra o perfil no app e toque em <b>Conectar Telegram</b>." }); return; }
  const cmd = (texto.match(/^\/(\w+)/) || [])[1]?.toLowerCase();
  const hojeK = diaLocal(c.tz ?? -180);
  if (cmd === "hoje" || cmd === "start" || /^(treino|hoje)\b/i.test(texto)) await enviar(chat, mensagemDia(c, hojeK, { cabeca: `Treino de hoje · ${dataBR(hojeK)}` }));
  else if (cmd === "amanha" || /^amanh/i.test(texto)) await enviar(chat, mensagemDia(c, somarDia(hojeK, 1), { cabeca: `Treino de amanhã · ${dataBR(somarDia(hojeK, 1))}`, botoes: false }));
  else if (cmd === "semana") {
    const linhas = [...Array(7)].map((_, i) => { const k = somarDia(hojeK, i), a = (c.agenda || []).find((x) => x.data === k);
      const ok = (c.feitos || []).includes(k) || (c.marcar || []).includes(k);
      return `${ok ? "✅" : a?.descanso ? "😴" : "•"} <b>${dataBR(k)}</b> ${a ? esc(a.descanso ? "Descanso" : a.titulo) : "—"}`; });
    await enviar(chat, { text: `<b>Próximos 7 dias</b>\n${linhas.join("\n")}` });
  } else if (cmd === "parar") await desligar(email);
  else await enviar(chat, { text: "Comandos: /hoje /amanha /semana /parar\nOs horários dos avisos mudam no perfil do FIT.AI." });
}

/* ---------- Agendador: treino do dia e lembrete da noite ---------- */
export async function rodada(agora = Date.now()) {
  if (!(await token())) return 0;
  const d = await todos();
  let n = 0;
  for (const c of Object.values(d.contas)) {
    if (!c.chat) continue;
    const tz = c.tz ?? -180, k = diaLocal(tz, agora), m = minLocal(tz, agora);
    c.env = c.env || {};
    const a = (c.agenda || []).find((x) => x.data === k);
    const feito = (c.feitos || []).includes(k) || (c.marcar || []).includes(k);
    // Depois de um reinício, ainda manda se passou da hora há menos de 3 h
    if (c.env.dia !== k && m >= c.hora && m < c.hora + 180) {
      c.env.dia = k; salvar();
      if (a && !feito) { try { await enviar(c.chat, mensagemDia(c, k, { cabeca: `Bom dia! Treino de hoje · ${dataBR(k)}` })); n++; } catch (e) { erroEnvio(d, c, e); } }
    }
    if (c.noite != null && c.env.noite !== k && m >= c.noite && m < c.noite + 120) {
      c.env.noite = k; salvar();
      if (a && !a.descanso && !feito) { try { await enviar(c.chat, { ...mensagemDia(c, k, { cabeca: "Ainda dá tempo! ⏰ Seu treino de hoje" }) }); n++; } catch (e) { erroEnvio(d, c, e); } }
    }
    if (c.agua?.on) {
      const A = c.agua, dentro = A.ini <= A.fim ? m >= A.ini && m < A.fim : m >= A.ini || m < A.fim;
      const meta = c.aguaDia?.data === k && c.aguaDia.meta, bateu = meta && aguaTotal(c, k) >= meta;
      if (dentro && !bateu && agora - (A.ultimo || 0) >= A.intervalo * 60000 - 20000) {
        A.ultimo = agora; salvar();
        try { await enviar(c.chat, mensagemAgua(c)); n++; } catch (e) { erroEnvio(d, c, e); }
      }
    }
  }
  return n;
}
function erroEnvio(d, c, e) {
  console.error("telegram: envio falhou", e?.codigo, e?.message);
  if (e?.codigo === 403) { for (const [k, v] of Object.entries(d.contas)) if (v === c) delete d.contas[k]; salvar(); } // a pessoa bloqueou o bot
}

export function iniciarTelegram() {
  ligarWebhook().then((ok) => ok && console.log(`Telegram: webhook ligado (@${botNome})`)).catch((e) => console.error("telegram: webhook", e?.message));
  setInterval(() => rodada().catch((e) => console.error("telegram: rodada", e?.message)), 60000).unref?.();
}
