// Limite diário de chamadas à IA (Coach e Hipertrofia), contado por pessoa (conta ou IP) e no total do app.
// Os contadores não são atômicos; numa corrida de requisições pode passar 1 ou 2 do limite, o que é aceitável aqui.
import { getStore } from "./blobs.mjs";
import { createHash } from "node:crypto";

export const LIMITE_VISITANTE_DIA = Number(process.env.LIMITE_VISITANTE_DIA) || 10;
export const LIMITE_MEMBRO_DIA = Number(process.env.LIMITE_MEMBRO_DIA) || 30;
const LIMITE_GERAL_DIA = Number(process.env.LIMITE_GERAL_DIA) || 300;
const hojeBR = () => new Date(Date.now() - 3 * 3600 * 1000).toISOString().slice(0, 10);

// Conta uma chamada de "quem". Devolve false se a pessoa ou o app já passaram do limite de hoje.
export async function cabeNoLimite(quem, limite = LIMITE_VISITANTE_DIA, peso = 1) {
  const loja = getStore({ name: "coach-limites", consistency: "strong" });
  const dia = hojeBR();
  const id = createHash("sha256").update(`${dia}|${quem}|fitai`).digest("hex").slice(0, 24); // IP/e-mail não são guardados
  const [geral, dele] = await Promise.all([loja.get(`geral/${dia}`, { type: "json" }), loja.get(`v/${dia}/${id}`, { type: "json" })]);
  if ((geral?.n || 0) >= LIMITE_GERAL_DIA || (dele?.n || 0) + peso > limite) return false;
  await Promise.all([loja.setJSON(`geral/${dia}`, { n: (geral?.n || 0) + peso }), loja.setJSON(`v/${dia}/${id}`, { n: (dele?.n || 0) + peso })]);
  return true;
}
