// Links dos vídeos do Insanity MAX:30 (Google Drive), para quem tem conta no app (o grupo de amigos).
// Ficam na variável de ambiente FITAI_INSANITY_VIDEOS, em JSON: { "cardio-challenge": "<id do arquivo no Drive>", ... }
// Assim os links não vão para o GitHub nem ficam abertos para visitantes sem conta.
// A resposta diz também se quem pediu é o dono (as corridas do Strava são só dele).
import { emailDoToken } from "../lib/dono.mjs";
import { ehEmailDono } from "../lib/sessao.mjs";

const json = (status, body) => new Response(JSON.stringify(body), {
  status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "private, no-store" },
});

export default async (req) => {
  if (req.method !== "GET") return json(405, { erro: "metodo" });
  const token = (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  const email = await emailDoToken(token).catch(() => null);
  if (!email) return json(401, { erro: "login" });
  let videos = {};
  try { videos = JSON.parse(process.env.FITAI_INSANITY_VIDEOS || "{}"); } catch { return json(500, { erro: "config" }); }
  const limpo = Object.fromEntries(Object.entries(videos).filter(([k, v]) => /^[\w-]{1,40}$/.test(k) && /^[\w-]{10,100}$/.test(String(v))));
  return json(200, { videos: limpo, dono: !!ehEmailDono(email) });
};
