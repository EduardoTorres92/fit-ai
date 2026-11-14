// Links dos vídeos do Insanity MAX:30 (Google Drive), só para o dono do app.
// Ficam na variável de ambiente FITAI_INSANITY_VIDEOS, em JSON: { "cardio-challenge": "<id do arquivo no Drive>", ... }
// Assim os links não vão para o GitHub nem ficam abertos para os visitantes do site.
import { ehDono } from "../lib/dono.mjs";

const json = (status, body) => new Response(JSON.stringify(body), {
  status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "private, no-store" },
});

export default async (req) => {
  if (req.method !== "GET") return json(405, { erro: "metodo" });
  if (!(await ehDono(req).catch(() => false))) return json(403, { erro: "so_dono" });
  let videos = {};
  try { videos = JSON.parse(process.env.FITAI_INSANITY_VIDEOS || "{}"); } catch { return json(500, { erro: "config" }); }
  const limpo = Object.fromEntries(Object.entries(videos).filter(([k, v]) => /^[\w-]{1,40}$/.test(k) && /^[\w-]{10,100}$/.test(String(v))));
  return json(200, { videos: limpo });
};
