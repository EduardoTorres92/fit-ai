// /api/dupla — avisos da dupla do desafio de 7 dias (convite, aceite, dia fechado, reta final, vitória).
// POST { para, tipo, n? } com o token de login. Só avisa quem divide grupo com quem manda (o próprio Supabase
// confere: o perfil da outra pessoa só aparece para quem está no mesmo grupo). Os textos são fixos, montados aqui.
// Vai pelo Telegram (se a pessoa conectou) e por notificação push (aparelhos com o lembrete de água ligado).
import { usuarioDoToken } from "../lib/dono.mjs";
import { cabeNoLimite } from "../lib/limite.mjs";
import * as tg from "../lib/telegram.mjs";
import { avisarUid } from "../lib/agua.mjs";

const SB_URL = process.env.SUPABASE_URL || "https://thckpqzvvjujuseqeusz.supabase.co";
const SB_KEY = process.env.SUPABASE_PUBLISHABLE_KEY || "sb_publishable_t8SLyWZNLgSHj_4B158EyA_tpHm_DmV";
const json = (status, body) => new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" } });
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const TEXTOS = {
  convite: (q) => ["⚔️ Desafio em dupla", `${q} te chamou para o Desafio do Recruta: 7 dias sem academia. Quem completar primeiro vence!`],
  aceitou: (q) => ["🤝 Dupla formada", `${q} aceitou! O Desafio do Recruta de vocês começa hoje.`],
  recusou: (q) => ["Convite recusado", `${q} não vai fazer o Desafio do Recruta agora. Dá para chamar outra pessoa.`],
  dia: (q, n) => ["🎯 Sua dupla avançou", `${q} fechou o dia ${n} de 7 do Desafio do Recruta. Bora fechar o seu?`],
  reta: (q) => ["🔥 Reta final", `${q} está a um dia de completar o Desafio do Recruta!`],
  venceu: (q) => ["🏆 Desafio concluído", `${q} completou os 7 dias do Desafio do Recruta primeiro!`],
};

async function rest(caminho, token) {
  const r = await fetch(`${SB_URL}/rest/v1/${caminho}`, { headers: { apikey: SB_KEY, authorization: `Bearer ${token}` } });
  return r.ok ? r.json() : [];
}

export default async (req) => {
  if (req.method !== "POST") return json(405, { erro: "metodo" });
  try {
    const token = (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
    const eu = await usuarioDoToken(token).catch(() => null);
    if (!eu?.id) return json(401, { erro: "login" });
    const c = await req.json().catch(() => ({}));
    const para = String(c.para || ""), tipo = String(c.tipo || ""), n = Math.min(7, Math.max(1, Math.round(Number(c.n) || 1)));
    if (!UUID.test(para) || para === eu.id || !TEXTOS[tipo]) return json(400, { erro: "pedido" });
    const [outro] = await rest(`perfis?select=id&id=eq.${para}`, token); // RLS: só aparece se dividimos grupo
    if (!outro) return json(403, { erro: "grupo" });
    if (!(await cabeNoLimite(`dupla:${eu.id}`, 20).catch(() => false))) return json(429, { erro: "limite" });
    const [meu] = await rest(`perfis?select=nome&id=eq.${eu.id}`, token);
    const nome = String(meu?.nome || "Seu amigo").split(" ")[0].slice(0, 40);
    const [titulo, corpo] = TEXTOS[tipo](nome, n);
    const [porTg, porPush] = await Promise.all([tg.avisarUid(para, `${titulo}\n${corpo}`, "#/recruta").catch(() => false), avisarUid(para, titulo, corpo, "#/recruta").catch(() => 0)]);
    return json(200, { ok: true, telegram: !!porTg, push: porPush });
  } catch (e) {
    console.error("dupla erro", e?.message);
    return json(500, { erro: "interno" });
  }
};

export const config = { path: "/api/dupla" };
