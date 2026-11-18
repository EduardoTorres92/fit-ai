// Bot do Telegram (@treinosfit_bot): manda o treino do dia, lembra à noite se ainda não treinou e
// recebe "✅ Feito" pelo botão da mensagem.
// - O token vem de TELEGRAM_TOKEN ou é colado uma vez pelo dono no app (fica em DADOS_DIR/telegram/config.json).
// - O app manda a agenda dos próximos dias (o servidor não conhece a lógica dos programas) e os dias já feitos.
// - Um "Feito" tocado no Telegram fica em "marcar" até o app abrir e registrar o treino de verdade.
// - Mensagem livre (texto ou foto) vai para o Coach AI (ou a Nutri AI, com /nutri), com o programa e o histórico que o app
//   mandou e ferramentas para marcar o treino como feito e anotar água.
// - iniciarTelegram() liga o webhook e roda o agendador a cada minuto (no server.mjs).
import { mkdir, readFile, writeFile, rename } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";
import { createHash, randomBytes, timingSafeEqual } from "node:crypto";
import Anthropic from "@anthropic-ai/sdk";
import { paramsCoach } from "../functions/coach.mjs";
import { cabeNoLimite, LIMITE_MEMBRO_DIA } from "./limite.mjs";
import { ehEmailDono } from "./sessao.mjs";
import { rpc } from "./admin.mjs";
import { avisoTodos } from "./agua.mjs";

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
    { command: "semana", description: "Próximos 7 dias" }, { command: "nutri", description: "Falar com a Nutri AI" },
    { command: "coach", description: "Falar com o Coach AI" }, { command: "novo", description: "Começar conversa nova" }, { command: "parar", description: "Desligar os avisos" },
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

const driveOk = (u) => { try { const x = new URL(String(u)); return x.protocol === "https:" && x.hostname === "drive.google.com" ? x.href.slice(0, 400) : null; } catch { return null; } };
const ID_EX = /^[\w-]{1,60}$/;
function limparAgenda(lista) {
  return (Array.isArray(lista) ? lista : []).slice(0, 10).filter((a) => a && DATA.test(a.data)).map((a) => ({
    data: a.data, prog: txt(a.prog, 60), titulo: txt(a.titulo, 100), descanso: !!a.descanso, obs: txt(a.obs, 200),
    itens: (Array.isArray(a.itens) ? a.itens : []).slice(0, 15).map((i) => txt(i, 120)).filter(Boolean), link: linkOk(a.link),
    ex: (Array.isArray(a.ex) ? a.ex : []).slice(0, 20).filter((e) => e && ID_EX.test(String(e.id))).map((e) => ({ id: String(e.id), nome: txt(e.nome, 80), un: txt(e.un, 10), ...(e.maxOut ? { maxOut: true } : {}), ...(e.carga ? { carga: true } : {}) })),
    videos: (Array.isArray(a.videos) ? a.videos : []).slice(0, 4).map((v) => ({ nome: txt(v?.nome, 40), url: driveOk(v?.url) })).filter((v) => v.url),
  }));
}

export async function estado(email) {
  const c = (await todos()).contas[email];
  return { ligado: !!c?.chat, hora: c ? minStr(c.hora) : "07:00", noite: c?.noite == null ? (c ? null : "20:00") : minStr(c.noite), marcar: c?.marcar || [],
    agua: c?.agua?.on ? { on: true, ml: c.agua.ml, intervalo: c.agua.intervalo, ini: minStr(c.agua.ini), fim: minStr(c.agua.fim) } : { on: false }, aguaPend: c?.aguaPend || [], regPend: c?.regPend || [], bot: botNome };
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
  if (typeof c.coachProg === "string") {
    const t = (v, n) => String(v ?? "").slice(0, n);
    conta.coach = { prog: t(c.coachProg, 60000), ctx: t(c.coachCtx, 40000), nutriProg: t(c.nutriProg, 60000), nutriCtx: t(c.nutriCtx, 20000), em: Date.now() };
  }
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
export async function confirmarRegistros(email, ids) {
  const conta = (await todos()).contas[email];
  if (conta) { conta.regPend = (conta.regPend || []).filter((x) => !(ids || []).includes(x.id)); salvar(); }
  return { ok: true };
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
  const linhas = [topo, `<b>${esc([a.prog, a.titulo].filter(Boolean).join(" · "))}</b>`, ...a.itens.map((i) => `• ${esc(i)}`), ...(a.obs ? [`<i>${esc(a.obs)}</i>`] : [])];
  if (!feito && (a.ex || []).some((e) => e.un !== "video" || e.maxOut)) linhas.push("", (a.ex || []).some((e) => e.maxOut) ? "Depois me conta o seu Max Out (ex.: “Max Out 12:30”)." : "Me conta as séries que eu anoto (ex.: “flexão 12, 10, 9”).");
  if (feito) linhas.push("", "✅ Já está feito. Mandou bem!");
  const kb = [];
  if (botoes && !feito) kb.push([{ text: "✅ Feito", callback_data: `feito:${k}` }]);
  for (const v of a.videos || []) kb.push([{ text: `🎬 ${v.nome}`, url: v.url }]);
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
const vistos = new Set(); // update_id já tratados: o Telegram reenvia se a resposta demora
export async function processar(u, permitido) {
  const ehDono = (email) => !!email && ehEmailDono(email);
  if (u.update_id != null) {
    if (vistos.has(u.update_id)) return;
    vistos.add(u.update_id);
    if (vistos.size > 500) vistos.delete(vistos.values().next().value);
  }
  const d = await todos();
  const contaDoChat = (chat) => Object.entries(d.contas).find(([, c]) => c.chat === chat) || [];
  if (u.callback_query) {
    const q = u.callback_query, chat = q.message?.chat?.id, [email, c] = contaDoChat(chat);
    if (String(q.data || "").startsWith("adm:")) {
      await api("answerCallbackQuery", { callback_query_id: q.id }).catch(() => {});
      if (c && ehDono(email)) await adminBotao(c, chat, q.data, q.message?.message_id);
      return;
    }
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
    // Link já usado (o mesmo /start de novo) e este chat já está conectado: só confirma
    if (c && (!v || v.email === email)) { salvar(); await enviar(chat, { text: "Você já está conectado ✓ Use /hoje para ver o treino de hoje." }); return; }
    if (!v || v.exp < Date.now() || !permitido(v.email)) { salvar(); await enviar(chat, { text: "Esse link expirou. Abra o perfil no FIT.AI e toque em <b>Conectar Telegram</b> de novo." }); return; }
    for (const [e, x] of Object.entries(d.contas)) if (x.chat === chat && e !== v.email) delete d.contas[e];
    const antiga = d.contas[v.email] || {};
    d.contas[v.email] = { hora: 7 * 60, noite: 20 * 60, tz: -180, agenda: [], feitos: [], marcar: [], ...antiga, chat, desde: antiga.desde || Date.now() };
    salvar();
    const conta = d.contas[v.email];
    if (ehDono(v.email)) await api("setMyCommands", { scope: { type: "chat", chat_id: chat }, commands: [
      { command: "admin", description: "Painel do dono" }, { command: "hoje", description: "Treino de hoje" }, { command: "semana", description: "Próximos 7 dias" },
      { command: "nutri", description: "Falar com a Nutri AI" }, { command: "coach", description: "Falar com o Coach AI" }, { command: "novo", description: "Conversa nova" }, { command: "parar", description: "Desligar os avisos" },
    ] }).catch(() => {});
    await enviar(chat, { text: `Pronto${conta.nome ? `, ${esc(conta.nome)}` : ""}! 💪 Conectei sua conta do FIT.AI.\n\nTodo dia às <b>${minStr(conta.hora)}</b> eu mando o seu treino${conta.noite != null ? ` e, se até as <b>${minStr(conta.noite)}</b> ele não estiver feito, dou um toque` : ""}. Os horários mudam no perfil do app.\n\nMe escreva ou mande foto quando quiser: quem responde é o Coach AI, com o seu programa e o seu histórico.\n\nComandos: /hoje /amanha /semana /nutri /novo /parar${ehDono(v.email) ? "\n\n🛠️ Você é o dono: /admin abre o painel." : ""}` });
    return;
  }
  if (!c) { await enviar(chat, { text: "Oi! Eu sou o bot do <b>FIT.AI</b>. Para receber seus treinos aqui, abra o perfil no app e toque em <b>Conectar Telegram</b>." }); return; }
  const cmd = (texto.match(/^\/(\w+)/) || [])[1]?.toLowerCase();
  const hojeK = diaLocal(c.tz ?? -180);
  if (ehDono(email)) {
    if (cmd === "admin") { c.esperando = null; salvar(); await adminMenu(chat); return; }
    if (cmd === "cancelar" && c.esperando) { c.esperando = null; c.rascunho = null; salvar(); await enviar(chat, { text: "Cancelado." }); return; }
    if (c.esperando === "aviso" && !cmd && texto) { await adminRascunho(c, chat, texto); return; }
  }
  if (cmd === "novo") { c.conversa = []; salvar(); await enviar(chat, { text: "Conversa nova 🧹 Pode mandar." }); return; }
  if (cmd === "nutri" || cmd === "coach") {
    c.papel = cmd; c.conversa = []; salvar();
    await enviar(chat, { text: cmd === "nutri" ? "🥗 Agora quem responde é a <b>Nutri AI</b>. Mande sua dúvida ou a foto do prato. /coach volta para o treino." : "💪 Agora quem responde é o <b>Coach AI</b>. /nutri para falar de alimentação." });
    return;
  }
  if (!cmd && (texto || msg.photo || msg.voice || msg.audio || msg.video_note) && !/^(hoje|treino)$/i.test(texto)) {
    if (msg.voice || msg.audio || msg.video_note) { await enviar(chat, { text: "Ainda não entendo áudio 🙉 Manda por texto que eu respondo." }); return; }
    naFila(chat, () => responderCoach(c, chat, msg, email, ehDono(email)));
    return;
  }
  if (cmd === "hoje" || cmd === "start" || /^(treino|hoje)$/i.test(texto)) await enviar(chat, mensagemDia(c, hojeK, { cabeca: `Treino de hoje · ${dataBR(hojeK)}` }));
  else if (cmd === "amanha" || /^amanh/i.test(texto)) await enviar(chat, mensagemDia(c, somarDia(hojeK, 1), { cabeca: `Treino de amanhã · ${dataBR(somarDia(hojeK, 1))}`, botoes: false }));
  else if (cmd === "semana") {
    const linhas = [...Array(7)].map((_, i) => { const k = somarDia(hojeK, i), a = (c.agenda || []).find((x) => x.data === k);
      const ok = (c.feitos || []).includes(k) || (c.marcar || []).includes(k);
      return `${ok ? "✅" : a?.descanso ? "😴" : "•"} <b>${dataBR(k)}</b> ${a ? esc(a.descanso ? "Descanso" : a.titulo) : "—"}`; });
    await enviar(chat, { text: `<b>Próximos 7 dias</b>\n${linhas.join("\n")}` });
  } else if (cmd === "parar") await desligar(email);
  else await enviar(chat, { text: "Pode me escrever ou mandar foto que o <b>Coach AI</b> responde (/nutri para a Nutri AI).\nComandos: /hoje /amanha /semana /novo /parar\nOs horários dos avisos mudam no perfil do FIT.AI." });
}


/* ---------- Coach AI no Telegram ---------- */
const filas = new Map(); // uma resposta por vez em cada chat
function naFila(chat, fn) {
  const p = (filas.get(chat) || Promise.resolve()).then(fn).catch((e) => console.error("telegram: coach", e?.status, e?.message));
  filas.set(chat, p);
  p.finally(() => { if (filas.get(chat) === p) filas.delete(chat); });
}
// Markdown simples do Coach (**negrito** e listas "- ") para o HTML do Telegram, em partes de até 4000 caracteres
function paraTelegram(t) {
  const h = esc(String(t || "").trim()).replace(/\*\*([^*\n]+)\*\*/g, "<b>$1</b>").replace(/^(\s*)[-*] /gm, "$1• ").replace(/^#{1,4}\s*(.+)$/gm, "<b>$1</b>");
  const partes = [];
  let resto = h;
  while (resto.length > 4000) { let i = resto.lastIndexOf("\n", 4000); if (i < 1000) i = 4000; partes.push(resto.slice(0, i)); resto = resto.slice(i).replace(/^\n+/, ""); }
  if (resto) partes.push(resto);
  return partes;
}
async function baixarFoto(fotos) {
  const f = [...fotos].sort((a, b) => (b.file_size || 0) - (a.file_size || 0)).find((x) => !x.file_size || x.file_size <= 4_500_000);
  if (!f) return null;
  const info = await api("getFile", { file_id: f.file_id });
  const r = await fetch(`https://api.telegram.org/file/bot${await token()}/${info.file_path}`);
  if (!r.ok) return null;
  const b = Buffer.from(await r.arrayBuffer());
  return b.length <= 4_500_000 ? { type: "image", source: { type: "base64", media_type: /\.png$/i.test(info.file_path) ? "image/png" : "image/jpeg", data: b.toString("base64") } } : null;
}
const FERRAMENTAS = [
  { name: "marcar_treino_feito", description: "Marca como concluído o treino do programa principal numa data, quando a pessoa disser que já fez o treino (hoje, se ela não disser o dia). O registro entra no histórico e na constância quando ela abrir o app. Não use para treino que ela só pretende fazer.",
    input_schema: { type: "object", properties: { data: { type: "string", description: "Data no formato AAAA-MM-DD. Padrão: hoje." } } } },
  { name: "anotar_agua", description: "Anota água que a pessoa disse que bebeu agora (em ml; um copo comum tem cerca de 250 ml, uma garrafinha 500 ml).",
    input_schema: { type: "object", properties: { ml: { type: "integer", description: "Quantidade em ml, de 50 a 2000." } }, required: ["ml"] } },
  { name: "anotar_series", description: "Anota as séries que a pessoa fez de um exercício do treino (repetições, ou segundos/minutos quando a unidade do exercício for s/min). Use o id do exercício que aparece na agenda daquele dia. Os valores são somados às séries já anotadas no dia.",
    input_schema: { type: "object", properties: {
      exercicio_id: { type: "string", description: "id do exercício, como aparece na agenda (ex.: flexao-comum)" },
      valores: { type: "array", items: { type: "number" }, description: "Um valor por série, na ordem (ex.: [12, 10, 9])" },
      cargas_kg: { type: "array", items: { type: "number" }, description: "Carga de cada série em kg, só em exercícios com carga (opcional)" },
      data: { type: "string", description: "AAAA-MM-DD. Padrão: hoje." } }, required: ["exercicio_id", "valores"] } },
  { name: "anotar_max_out", description: "Anota o Max Out de um vídeo do MAX:30: o tempo do vídeo em que a pessoa precisou parar pela primeira vez. Converta mm:ss para segundos (12:30 → 750). Também marca o vídeo como feito.",
    input_schema: { type: "object", properties: {
      video_id: { type: "string", description: "id do vídeo, como aparece na agenda (ex.: cardio-challenge)" },
      segundos: { type: "integer", description: "Tempo do Max Out em segundos" },
      data: { type: "string", description: "AAAA-MM-DD. Padrão: hoje." } }, required: ["video_id", "segundos"] } },
  { name: "ver_agenda", description: "Mostra os treinos dos próximos 7 dias do programa principal e quais dias já estão feitos.", input_schema: { type: "object", properties: {} } },
];
function usarFerramenta(c, nome, entrada) {
  const tz = c.tz ?? -180, hojeK = diaLocal(tz);
  if (nome === "marcar_treino_feito") {
    const k = DATA.test(String(entrada?.data || "")) ? entrada.data : hojeK;
    if (k > hojeK || k < somarDia(hojeK, -7)) return "Só dá para marcar treinos de hoje ou dos últimos 7 dias.";
    const a = (c.agenda || []).find((x) => x.data === k);
    if ((c.feitos || []).includes(k) || (c.marcar || []).includes(k)) return `O treino de ${dataBR(k)} já estava marcado como feito.`;
    if (a?.descanso) return `${dataBR(k)} é dia de descanso no programa; não há treino para marcar.`;
    (c.marcar = c.marcar || []).push(k); salvar();
    return `Marcado: treino de ${dataBR(k)}${a ? ` (${a.titulo})` : ""} como feito. Entra na constância quando a pessoa abrir o app.`;
  }
  if (nome === "anotar_agua") {
    const ml = Math.round(Number(entrada?.ml));
    if (!(ml >= 50 && ml <= 2000)) return "Quantidade inválida (use de 50 a 2000 ml).";
    (c.aguaPend = c.aguaPend || []).push({ id: randomBytes(6).toString("hex"), data: hojeK, ml, t: minStr(minLocal(tz)) });
    if (c.agua) c.agua.ultimo = Date.now();
    salvar();
    return `Anotado: ${ml} ml. ${aguaProgresso(c)}`;
  }
  if (nome === "anotar_series" || nome === "anotar_max_out") {
    const k = DATA.test(String(entrada?.data || "")) ? entrada.data : hojeK;
    if (k > hojeK || k < somarDia(hojeK, -7)) return "Só dá para anotar treinos de hoje ou dos últimos 7 dias.";
    const a = (c.agenda || []).find((x) => x.data === k), lista = a?.ex || [];
    const id = String(entrada?.[nome === "anotar_series" ? "exercicio_id" : "video_id"] || "");
    const e = lista.find((x) => x.id === id);
    if (!e) return `Não achei esse id no treino de ${dataBR(k)}. Ids válidos: ${lista.map((x) => `${x.id} (${x.nome})`).join(", ") || "nenhum (abra o app para atualizar a agenda)"}.`;
    if (nome === "anotar_max_out") {
      const seg = Math.round(Number(entrada?.segundos));
      if (!e.maxOut) return `${e.nome} não tem Max Out.`;
      if (!(seg > 0 && seg <= 3600)) return "Tempo inválido.";
      (c.regPend = c.regPend || []).push({ id: randomBytes(6).toString("hex"), tipo: "max", data: k, ex: id, seg }); salvar();
      return `Anotado: Max Out de ${e.nome} em ${Math.floor(seg / 60)}:${String(seg % 60).padStart(2, "0")} (${dataBR(k)}). Entra no app e nos recordes quando a pessoa abrir o FIT.AI.`;
    }
    if (e.un === "video") return `${e.nome} é um vídeo: para ele só existe Max Out ou marcar o treino como feito.`;
    const valores = (Array.isArray(entrada?.valores) ? entrada.valores : []).map(Number).filter((n) => Number.isFinite(n) && n > 0 && n < 10000).slice(0, 20);
    if (!valores.length) return "Nenhum valor válido.";
    const kg = e.carga && Array.isArray(entrada?.cargas_kg) ? entrada.cargas_kg.map(Number).slice(0, 20) : [];
    (c.regPend = c.regPend || []).push({ id: randomBytes(6).toString("hex"), tipo: "series", data: k, ex: id, valores, ...(kg.length ? { kg } : {}) }); salvar();
    return `Anotado: ${e.nome} — ${valores.map((v, i) => (kg[i] > 0 ? `${kg[i]}kg×${v}` : v)).join(", ")}${e.un && e.un !== "reps" ? ` (${e.un})` : ""} em ${dataBR(k)}. Entra no app quando a pessoa abrir o FIT.AI.`;
  }
  if (nome === "ver_agenda") return agendaTexto(c);
  return "Ferramenta desconhecida.";
}
function agendaTexto(c) {
  const hojeK = diaLocal(c.tz ?? -180);
  return [...Array(7)].map((_, i) => { const k = somarDia(hojeK, i), a = (c.agenda || []).find((x) => x.data === k);
    const ok = (c.feitos || []).includes(k) || (c.marcar || []).includes(k);
    const ids = (a?.ex || []).length ? ` | ids: ${a.ex.map((e) => `${e.id}=${e.nome}${e.maxOut ? " [Max Out]" : e.un && e.un !== "video" ? ` [${e.un}${e.carga ? ", kg" : ""}]` : ""}`).join("; ")}` : "";
    return `${k} (${dataBR(k)}): ${a ? (a.descanso ? "descanso" : `${a.prog} · ${a.titulo} — ${a.itens.join("; ")}${ids}`) : "sem dados"}${ok ? " [FEITO]" : ""}`; }).join("\n");
}
async function responderCoach(c, chat, msg, email, dono) {
  if (!process.env.ANTHROPIC_API_KEY) { await enviar(chat, { text: "O Coach está sem a chave da IA no servidor agora." }); return; }
  if (!dono) {
    // Quem não é o dono divide o limite diário de perguntas com o Coach do app (foto pesa 2)
    const cabe = await cabeNoLimite(`conta:${email}`, LIMITE_MEMBRO_DIA, msg.photo ? 2 : 1).catch(() => false);
    if (!cabe) { await enviar(chat, { text: "Você chegou no limite de perguntas ao Coach por hoje. Amanhã tem mais! 💪" }); return; }
  }
  const digitando = () => api("sendChatAction", { chat_id: chat, action: "typing" }).catch(() => {});
  digitando();
  const tm = setInterval(digitando, 4500);
  try {
    const texto = String(msg.text || msg.caption || "").slice(0, 4000);
    const conteudo = [];
    if (msg.photo) { const img = await baixarFoto(msg.photo).catch(() => null); if (img) conteudo.push(img); else { await enviar(chat, { text: "Não consegui abrir essa foto. Tenta mandar de novo?" }); return; } }
    conteudo.push({ type: "text", text: texto || "(foto sem legenda)" });
    const nutri = c.papel === "nutri", K = c.coach || {};
    const tz = c.tz ?? -180, agora = new Date(Date.now() + tz * 60000);
    const atualizado = K.em ? new Date(K.em + tz * 60000).toISOString().slice(0, 16).replace("T", " ") : null;
    const extra = `\n\nCanal: você está respondendo pelo Telegram (bot do FIT.AI). Agora: ${dataBR(diaLocal(tz))} ${agora.toISOString().slice(11, 16)}.
${atualizado ? `O contexto acima veio do app em ${atualizado}; o que a pessoa fez depois disso pode não aparecer.` : "A pessoa ainda não abriu o app depois de ligar o Coach no Telegram, então não há histórico detalhado: diga que, abrindo o app uma vez, você passa a ver o programa e o histórico."}
Agenda dos próximos dias:\n${agendaTexto(c)}
Água de hoje: ${aguaProgresso(c) || "nada anotado"}.
Ferramentas: quando a pessoa disser que já treinou, use marcar_treino_feito; quando contar as séries de um exercício, use anotar_series (uma chamada por exercício); quando disser o Max Out de um vídeo, use anotar_max_out; quando disser que bebeu água, use anotar_agua. Confirme em uma frase o que anotou e, se fizer sentido, compare com o histórico.
Escreva para o Telegram: frases curtas, **negrito** e listas com "- ". Sem tabelas e sem títulos.`;
    const historico = [...(c.conversa || []).slice(-16), { role: "user", content: conteudo }];
    while (historico.length && historico[0].role !== "user") historico.shift();
    const params = paramsCoach(dono ? "dono" : "membro", { papel: nutri ? "nutri" : "coach", programa: nutri ? K.nutriProg : K.prog, contexto: `${(nutri ? K.nutriCtx : K.ctx) || ""}${extra}` }, historico);
    params.tools = dono ? [...FERRAMENTAS, ...FERRAMENTAS_ADMIN] : FERRAMENTAS;
    if (dono) params.system[1].text += "\nVocê também é o assistente do painel do dono do app: com admin_resumo, admin_usuarios e admin_usuario você vê as estatísticas do app e de cada usuário. Para mandar avisos ou apagar posts, indique o /admin.";
    const cliente = new Anthropic();
    let resposta = "", msgs = historico;
    for (let volta = 0; volta < 4; volta++) {
      const r = dono ? await cliente.beta.messages.create({ ...params, messages: msgs, betas: ["server-side-fallback-2026-07-01"], fallbacks: "default" })
        : await cliente.messages.create({ ...params, messages: msgs });
      const txt = r.content.filter((b) => b.type === "text").map((b) => b.text).join("\n").trim();
      if (txt) resposta = resposta ? `${resposta}\n\n${txt}` : txt;
      const usos = r.content.filter((b) => b.type === "tool_use");
      if (r.stop_reason === "refusal") { resposta = "Não consigo responder isso. Tenta perguntar de outro jeito."; break; }
      if (r.stop_reason !== "tool_use" || !usos.length) break;
      const resultados = [];
      for (const u of usos) resultados.push({ type: "tool_result", tool_use_id: u.id, content: u.name.startsWith("admin_") ? (dono ? await ferramentaAdmin(u.name, u.input) : "Sem permissão.") : usarFerramenta(c, u.name, u.input) });
      msgs = [...msgs, { role: "assistant", content: r.content }, { role: "user", content: resultados }];
    }
    if (!resposta) resposta = "Feito ✅";
    c.conversa = [...(c.conversa || []), { role: "user", content: `${msg.photo ? "[foto] " : ""}${texto}`.trim() || "[foto]" }, { role: "assistant", content: resposta.slice(0, 4000) }].slice(-16);
    salvar();
    for (const parte of paraTelegram(resposta)) await enviar(chat, { text: parte });
  } catch (e) {
    console.error("telegram: coach falhou", e?.status, e?.message);
    await enviar(chat, { text: e?.status === 429 ? "Muitas mensagens seguidas. Espera um minutinho 🙏" : "Falhei ao falar com o Coach agora. Tenta de novo?" }).catch(() => {});
  } finally { clearInterval(tm); }
}


/* ---------- Painel do dono (/admin) ---------- */
const FERRAMENTAS_ADMIN = [
  { name: "admin_resumo", description: "Estatísticas gerais do app: usuários, novos, ativos (hoje/7/30 dias), treinos, minutos, programas, grupos, posts e água.", input_schema: { type: "object", properties: {} } },
  { name: "admin_usuarios", description: "Lista todos os usuários com id, nome, e-mail, programa principal, data do último treino, total de treinos e treinos nos últimos 7 dias.", input_schema: { type: "object", properties: {} } },
  { name: "admin_usuario", description: "Detalhe de um usuário pelo id (da lista de admin_usuarios): últimos treinos, água, grupos, posts e conquistas.", input_schema: { type: "object", properties: { id: { type: "string" } }, required: ["id"] } },
];
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
async function ferramentaAdmin(nome, entrada) {
  try {
    if (nome === "admin_usuario") { if (!UUID.test(String(entrada?.id))) return "id inválido"; return JSON.stringify(await rpc("admin_usuario", { p_id: entrada.id })); }
    if (nome === "admin_resumo" || nome === "admin_usuarios") return JSON.stringify(await rpc(nome));
    return "Ferramenta desconhecida.";
  } catch (e) { return e.codigo === "sem_chave" ? "O painel ainda não está liberado: o dono precisa abrir o app uma vez." : `Erro ao consultar: ${e.message}`; }
}
const NOME_PROG = { insanity: "MAX:30", insanity60: "Insanity", calistenia: "Calistenia", plano: "Calistenia", hiper: "Hipertrofia", c21: "Calistenia 21", cf: "CrossFit" };
const quando = (iso) => (iso ? `${String(iso).slice(8, 10)}/${String(iso).slice(5, 7)}` : "—");
async function editarOuEnviar(chat, id, m) {
  if (id) { try { await api("editMessageText", { chat_id: chat, message_id: id, parse_mode: "HTML", disable_web_page_preview: true, ...m }); return; } catch {} }
  await enviar(chat, m);
}
const MENU = { inline_keyboard: [[{ text: "📊 Resumo", callback_data: "adm:resumo" }, { text: "👥 Usuários", callback_data: "adm:us:0" }],
  [{ text: "🛡️ Moderação", callback_data: "adm:mod" }, { text: "📣 Enviar aviso", callback_data: "adm:aviso" }]] };
const voltar = [{ text: "⬅️ Menu", callback_data: "adm:menu" }];
async function adminMenu(chat, id) {
  const contas = Object.keys((await todos()).contas).length;
  await editarOuEnviar(chat, id, { text: `<b>Painel do FIT.AI</b>\n${contas} ${contas === 1 ? "pessoa conectada" : "pessoas conectadas"} ao bot.\nVocê também pode perguntar em texto, tipo “quem não treina há 5 dias?”.`, reply_markup: MENU });
}
async function adminBotao(c, chat, dado, msgId) {
  try {
    if (dado === "adm:menu") return adminMenu(chat, msgId);
    if (dado === "adm:resumo") {
      const r = await rpc("admin_resumo");
      const progs = Object.entries(r.programas_30d || {}).sort((a, b) => b[1] - a[1]).map(([k, n]) => `${NOME_PROG[k] || k} ${n}`).join(" · ") || "—";
      return editarOuEnviar(chat, msgId, { text: [`<b>📊 Resumo</b>`, `👥 ${r.usuarios} usuários (+${r.novos_7d} na semana) · ${r.grupos} ${r.grupos === 1 ? "grupo" : "grupos"}`,
        `🔥 Treinaram hoje: <b>${r.ativos_hoje}</b> · 7 dias: <b>${r.ativos_7d}</b> · 30 dias: <b>${r.ativos_30d}</b>`,
        `💪 Treinos: hoje ${r.treinos_hoje} · 7 dias ${r.treinos_7d} · 30 dias ${r.treinos_30d}`, `⏱️ ${Math.round((r.minutos_7d || 0) / 60)} h de treino na semana`,
        `📚 Programas (30 dias): ${esc(progs)}`, `💧 Água média (7 dias): ${fmtL(r.agua_media_7d || 0)} por dia`, `💬 Mural (7 dias): ${r.posts_7d} posts · ${r.comentarios_7d} comentários`].join("\n"),
        reply_markup: { inline_keyboard: [[{ text: "🔄 Atualizar", callback_data: "adm:resumo" }], voltar] } });
    }
    const pg = dado.match(/^adm:us:(\d+)$/);
    if (pg) {
      const lista = await rpc("admin_usuarios"), ini = Number(pg[1]) * 8, pag = lista.slice(ini, ini + 8);
      const linhas = pag.map((u, i) => `${ini + i + 1}. <b>${esc(u.nome || "Sem nome")}</b> — ${u.semana} na semana · último ${quando(u.ultimo)} · ${esc(NOME_PROG[u.principal] || u.principal || "—")}`);
      const nav = [...(ini > 0 ? [{ text: "◀️", callback_data: `adm:us:${Number(pg[1]) - 1}` }] : []), ...(ini + 8 < lista.length ? [{ text: "▶️", callback_data: `adm:us:${Number(pg[1]) + 1}` }] : [])];
      const botoes = [];
      for (let i = 0; i < pag.length; i += 2) botoes.push(pag.slice(i, i + 2).map((u, j) => ({ text: `${ini + i + j + 1}. ${String(u.nome || "Sem nome").split(" ")[0]}`, callback_data: `adm:u:${u.id}` })));
      return editarOuEnviar(chat, msgId, { text: `<b>👥 Usuários (${lista.length})</b>\n${linhas.join("\n") || "Ninguém ainda."}`, reply_markup: { inline_keyboard: [...botoes, ...(nav.length ? [nav] : []), voltar] } });
    }
    const um = dado.match(/^adm:u:([0-9a-f-]{36})$/);
    if (um) {
      const u = await rpc("admin_usuario", { p_id: um[1] });
      if (!u) return enviar(chat, { text: "Usuário não encontrado." });
      const tr = (u.treinos || []).slice(0, 10).map((t) => `${t.concluido ? "✅" : "▫️"} ${quando(t.data)} ${esc(NOME_PROG[t.programa] || t.programa)}${t.titulo ? ` · ${esc(t.titulo)}` : ""}${t.minutos ? ` · ${t.minutos} min` : ""}`);
      const ag = (u.agua || []).slice(0, 5).map((a) => `${quando(a.data)} ${fmtL(a.ml)}`).join(" · ");
      return editarOuEnviar(chat, msgId, { text: [`<b>${esc(u.nome || "Sem nome")}</b>`, esc(u.email || ""), `Desde ${quando(u.criado_em)} · último login ${quando(u.ultimo_login)}`,
        `Programa: ${esc(NOME_PROG[u.principal] || u.principal || "—")}${u.nivel ? ` · ${esc(u.nivel)}` : ""}`, `💪 ${u.total} treinos · 🏅 ${u.conquistas} conquistas · 💬 ${u.posts} posts`,
        `Grupos: ${esc((u.grupos || []).join(", ") || "nenhum")}`, "", "<b>Últimos treinos</b>", ...(tr.length ? tr : ["nenhum"]), ...(ag ? ["", `💧 ${ag}`] : [])].join("\n"),
        reply_markup: { inline_keyboard: [[{ text: "⬅️ Usuários", callback_data: "adm:us:0" }], voltar] } });
    }
    if (dado === "adm:mod") {
      const itens = (await rpc("admin_conteudos", { p_limite: 8 })).slice(0, 10);
      c.mod = itens.map((x) => ({ t: x.tipo === "post" ? "p" : "c", id: x.id })); salvar();
      const linhas = itens.map((x, i) => `${i + 1}. ${x.tipo === "post" ? "📝" : "💬"} <b>${esc(x.autor || "?")}</b> em ${esc(x.grupo || "?")} · ${quando(x.criado_em)}\n${esc(String(x.texto || "").slice(0, 160)) || "<i>(sem texto)</i>"}${x.tem_foto ? " 📷" : ""}`);
      const botoes = [];
      for (let i = 0; i < itens.length; i += 5) botoes.push(itens.slice(i, i + 5).map((_, j) => ({ text: `🗑 ${i + j + 1}`, callback_data: `adm:del:${i + j}` })));
      return editarOuEnviar(chat, msgId, { text: `<b>🛡️ Últimos posts e comentários</b>\n\n${linhas.join("\n\n") || "Nada no mural ainda."}`, reply_markup: { inline_keyboard: [...botoes, [{ text: "🔄 Atualizar", callback_data: "adm:mod" }], voltar] } });
    }
    const del = dado.match(/^adm:del(ok)?:(\d+)$/);
    if (del) {
      const x = (c.mod || [])[Number(del[2])];
      if (!x) return enviar(chat, { text: "A lista mudou. Abra a moderação de novo." });
      if (!del[1]) return enviar(chat, { text: `Apagar o ${x.t === "p" ? "post" : "comentário"} nº ${Number(del[2]) + 1}${x.t === "p" ? " (com os comentários e reações dele)" : ""}? Não dá para desfazer.`,
        reply_markup: { inline_keyboard: [[{ text: "🗑 Apagar", callback_data: `adm:delok:${del[2]}` }, { text: "Cancelar", callback_data: "adm:mod" }]] } });
      const ok = await rpc("admin_apagar", { p_tipo: x.t === "p" ? "post" : "comentario", p_id: x.id });
      await editarOuEnviar(chat, msgId, { text: ok ? "Apagado ✓" : "Já tinha sido apagado." });
      return adminBotao(c, chat, "adm:mod");
    }
    if (dado === "adm:aviso") {
      c.esperando = "aviso"; salvar();
      return enviar(chat, { text: "📣 Escreva o aviso. A <b>primeira linha</b> vira o título e o resto, o texto.\n/cancelar para desistir." });
    }
    const av = dado.match(/^adm:av:(todos|app|tg|x)$/);
    if (av) {
      const r = c.rascunho;
      c.esperando = null; c.rascunho = null; salvar();
      if (av[1] === "x" || !r) return editarOuEnviar(chat, msgId, { text: "Aviso cancelado." });
      const feitos = [];
      if (av[1] !== "tg") { await rpc("admin_aviso", { p_titulo: r.titulo, p_texto: r.texto }); feitos.push("📱 no app (aparece ao abrir)"); }
      if (av[1] === "todos") { const p = await avisoTodos(r.titulo, r.texto).catch(() => ({ ok: 0, total: 0 })); feitos.push(`🔔 notificação em ${p.ok} de ${p.total} aparelhos`); }
      if (av[1] !== "app") {
        let n = 0;
        for (const x of Object.values((await todos()).contas)) {
          if (!x.chat || x.chat === chat) continue;
          try { await enviar(x.chat, { text: `📣 <b>${esc(r.titulo)}</b>\n${esc(r.texto)}` }); n++; } catch {}
        }
        feitos.push(`✈️ Telegram para ${n} ${n === 1 ? "pessoa" : "pessoas"}`);
      }
      return editarOuEnviar(chat, msgId, { text: `Aviso enviado ✓\n${feitos.join("\n")}` });
    }
  } catch (e) {
    console.error("admin:", e?.codigo, e?.message);
    await enviar(chat, { text: e?.codigo === "sem_chave" ? "O painel ainda não está liberado. Abra o FIT.AI uma vez com a sua conta e tente de novo." : "Não consegui consultar agora. Tenta de novo?" });
  }
}
async function adminRascunho(c, chat, texto) {
  const [titulo, ...resto] = texto.trim().split("\n");
  const corpo = resto.join("\n").trim() || titulo;
  c.rascunho = { titulo: titulo.slice(0, 120), texto: corpo.slice(0, 2000) }; c.esperando = null; salvar();
  await enviar(chat, { text: `<b>Prévia do aviso</b>\n\n📣 <b>${esc(c.rascunho.titulo)}</b>\n${esc(c.rascunho.texto)}\n\nPara onde?`,
    reply_markup: { inline_keyboard: [[{ text: "📣 Todos os canais", callback_data: "adm:av:todos" }], [{ text: "📱 Só no app", callback_data: "adm:av:app" }, { text: "✈️ Só no Telegram", callback_data: "adm:av:tg" }], [{ text: "❌ Cancelar", callback_data: "adm:av:x" }]] } });
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
