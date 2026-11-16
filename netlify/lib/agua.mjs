// Lembrete de água por notificação push (Web Push), mesmo com o app fechado.
// - As chaves VAPID vêm de VAPID_PUBLIC/VAPID_PRIVATE ou são geradas uma vez e guardadas em DADOS_DIR/agua/vapid.json.
// - Cada aparelho que liga o lembrete vira uma "assinatura" com intervalo, janela de horário e fuso.
// - iniciarAgendador() roda a cada minuto (no server.mjs) e manda "beba 300 ml" para quem está na hora.
// As assinaturas ficam num arquivo JSON fora da pasta do app (não somem a cada deploy).
import webpush from "web-push";
import { mkdir, readFile, writeFile, rename } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";
import { createHash } from "node:crypto";

const PASTA = join(process.env.DADOS_DIR || join(homedir(), "fitai-dados"), "agua");
const ARQ = join(PASTA, "assinaturas.json");
const MAX_ASSINATURAS = 2000;
let subs = null, chaves = null, gravando = Promise.resolve();

async function lerJson(caminho, padrao) { try { return JSON.parse(await readFile(caminho, "utf8")); } catch { return padrao; } }
async function gravarJson(caminho, dados) {
  await mkdir(PASTA, { recursive: true, mode: 0o700 });
  const tmp = `${caminho}.${process.pid}.tmp`;
  await writeFile(tmp, JSON.stringify(dados), { mode: 0o600 });
  await rename(tmp, caminho);
}

export async function chavesVapid() {
  if (chaves) return chaves;
  if (process.env.VAPID_PUBLIC && process.env.VAPID_PRIVATE) chaves = { publicKey: process.env.VAPID_PUBLIC, privateKey: process.env.VAPID_PRIVATE };
  else {
    const arq = join(PASTA, "vapid.json");
    chaves = await lerJson(arq, null);
    if (!chaves?.publicKey) { chaves = webpush.generateVAPIDKeys(); await gravarJson(arq, chaves); }
  }
  webpush.setVapidDetails(`mailto:${process.env.VAPID_EMAIL || "fitai@eduardotorres-dev.com.br"}`, chaves.publicKey, chaves.privateKey);
  return chaves;
}

async function todas() { if (!subs) subs = await lerJson(ARQ, {}); return subs; }
const salvar = () => (gravando = gravando.then(() => gravarJson(ARQ, subs)).catch((e) => console.error("agua: falha ao gravar", e?.message)));
const idDe = (endpoint) => createHash("sha256").update(String(endpoint)).digest("hex").slice(0, 32);
const hora = (t, pad) => { const m = String(t || "").match(/^(\d{1,2}):(\d{2})$/); return m && +m[1] < 24 && +m[2] < 60 ? +m[1] * 60 + +m[2] : pad; };

export async function assinar(a) {
  const s = a?.assinatura;
  if (!s || typeof s.endpoint !== "string" || !/^https:\/\//.test(s.endpoint) || s.endpoint.length > 1000 || !s.keys?.p256dh || !s.keys?.auth) return { erro: "assinatura" };
  const lista = await todas(), id = idDe(s.endpoint);
  if (!lista[id] && Object.keys(lista).length >= MAX_ASSINATURAS) return { erro: "cheio" };
  lista[id] = {
    sub: { endpoint: s.endpoint, keys: { p256dh: String(s.keys.p256dh).slice(0, 200), auth: String(s.keys.auth).slice(0, 100) } },
    intervalo: Math.min(240, Math.max(15, Math.round(Number(a.intervalo) || 60))), ml: Math.min(1000, Math.max(50, Math.round(Number(a.ml) || 300))),
    ini: hora(a.ini, 8 * 60), fim: hora(a.fim, 22 * 60), tz: Math.min(840, Math.max(-720, Math.round(Number(a.tz) || -180))),
    ultimo: Date.now(), criado: lista[id]?.criado || Date.now(),
  };
  salvar();
  return { ok: true };
}
export async function cancelar(endpoint) { const lista = await todas(), id = idDe(endpoint); if (lista[id]) { delete lista[id]; salvar(); } return { ok: true }; }
export async function bebeu(endpoint) { const lista = await todas(), r = lista[idDe(endpoint)]; if (r) { r.ultimo = Date.now(); salvar(); } return { ok: !!r }; }

async function enviar(id, r, teste = false) {
  await chavesVapid();
  const corpo = JSON.stringify({ titulo: teste ? "💧 Lembrete de água ligado!" : "💧 Hora de beber água", corpo: teste ? `Vou te lembrar de beber ${r.ml} ml a cada ${r.intervalo} min.` : `Beba ${r.ml} ml agora. Toque em “Bebi” para anotar.`, ml: r.ml });
  try { await webpush.sendNotification(r.sub, corpo, { TTL: 600, urgency: "normal" }); return true; }
  catch (e) {
    if (e?.statusCode === 404 || e?.statusCode === 410) { delete subs[id]; salvar(); } // o aparelho cancelou a permissão
    else console.error("agua: push falhou", e?.statusCode, e?.body || e?.message);
    return false;
  }
}
export async function testar(endpoint) { const lista = await todas(), id = idDe(endpoint); return lista[id] ? { ok: await enviar(id, lista[id], true) } : { erro: "nao_assinado" }; }

// Uma passada do agendador: manda para quem está dentro da janela e com o intervalo vencido
export async function rodada(agora = Date.now()) {
  const lista = await todas();
  let enviados = 0;
  for (const [id, r] of Object.entries(lista)) {
    const minLocal = (((Math.floor(agora / 60000) + r.tz) % 1440) + 1440) % 1440;
    const dentro = r.ini <= r.fim ? minLocal >= r.ini && minLocal < r.fim : minLocal >= r.ini || minLocal < r.fim;
    if (!dentro || agora - r.ultimo < r.intervalo * 60000 - 20000) continue;
    r.ultimo = agora;
    if (await enviar(id, r)) enviados++;
  }
  if (enviados) salvar();
  return enviados;
}
export function iniciarAgendador() {
  chavesVapid().catch((e) => console.error("agua: chaves", e?.message));
  setInterval(() => rodada().catch((e) => console.error("agua: rodada", e?.message)), 60000).unref?.();
}
