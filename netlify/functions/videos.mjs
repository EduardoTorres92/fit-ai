// Links dos vídeos do Insanity MAX:30 (Google Drive), para quem tem conta no app (o grupo de amigos).
// Ficam na variável de ambiente FITAI_INSANITY_VIDEOS, em JSON: { "cardio-challenge": "<id do arquivo no Drive>", ... }
// Assim os links não vão para o GitHub nem ficam abertos para visitantes sem conta.
// A resposta diz também se quem pediu é o dono (as corridas do Strava são só dele).
import { emailDoToken } from "../lib/dono.mjs";
import { ehEmailDono } from "../lib/sessao.mjs";

const json = (status, body) => new Response(JSON.stringify(body), {
  status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "private, no-store" },
});

// Lê o JSON da variável tolerando o que painéis de hospedagem costumam fazer com o valor:
// espaços nas pontas, o texto inteiro entre aspas, aspas escapadas (\") ou aspas "curvas".
function lerJson(bruto) {
  let t = String(bruto || "").trim();
  if (!t) return null;
  for (let i = 0; i < 3; i++) {
    try {
      const v = JSON.parse(t);
      if (v && typeof v === "object" && !Array.isArray(v)) return v;
      if (typeof v === "string") { t = v.trim(); continue; } // estava entre aspas: tenta o conteúdo
      return null;
    } catch {
      const t2 = t.replace(/^'(.*)'$/s, "$1").replace(/\\"/g, '"').replace(/[\u201C\u201D\u201E\u2033]/g, '"');
      if (t2 === t) return null;
      t = t2;
    }
  }
  return null;
}

export default async (req) => {
  if (req.method !== "GET") return json(405, { erro: "metodo" });
  const token = (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  const email = await emailDoToken(token).catch(() => null);
  if (!email) return json(401, { erro: "login" });
  // FITAI_INSANITY_VIDEOS (MAX:30) + qualquer FITAI_VIDEOS_<PROGRAMA> (ex.: FITAI_VIDEOS_INSANITY), todas em JSON.
  // Valor: "<id no Drive>" ou "<id no Drive>|<resourcekey>" (arquivos antigos do Drive exigem a resourcekey).
  let videos = {};
  const vars = Object.keys(process.env).filter((n) => n === "FITAI_INSANITY_VIDEOS" || n.startsWith("FITAI_VIDEOS_"));
  const ruins = [];
  for (const n of vars) {
    const v = lerJson(process.env[n]);
    if (v) Object.assign(videos, v); else ruins.push(n); // uma variável com problema não derruba as outras
  }
  if (ruins.length) console.error("Variáveis de vídeo com JSON inválido:", ruins.join(", "));
  if (!Object.keys(videos).length && ruins.length) return json(500, { erro: "config", variaveis: ruins });
  const limpo = Object.fromEntries(Object.entries(videos).filter(([k, v]) => /^[\w-]{1,40}$/.test(k) && /^[\w-]{10,100}(\|[\w-]{1,100})?$/.test(String(v))));
  return json(200, { videos: limpo, dono: !!ehEmailDono(email), ...(ruins.length ? { variaveis_com_erro: ruins } : {}) });
};
