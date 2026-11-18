// Painel do dono (pelo Telegram): fala com as funções admin_* do Supabase usando uma chave guardada só aqui.
// - A chave é gerada neste servidor e o hash dela é registrado no banco pelo próprio dono (admin_registrar, com o
//   login dele), na primeira vez que o app do dono fala com /api/telegram. Se a chave sumir, é registrada de novo.
// - Cada função admin_* confere a chave; sem ela, o banco recusa.
import { mkdir, readFile, writeFile, rename } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";
import { createHash, randomBytes } from "node:crypto";

const SB_URL = process.env.SUPABASE_URL || "https://thckpqzvvjujuseqeusz.supabase.co";
const SB_KEY = process.env.SUPABASE_PUBLISHABLE_KEY || "sb_publishable_t8SLyWZNLgSHj_4B158EyA_tpHm_DmV";
const PASTA = join(process.env.DADOS_DIR || join(homedir(), "fitai-dados"), "telegram");
const ARQ = join(PASTA, "admin.json");
let estado = null;

async function ler() {
  if (!estado) { try { estado = JSON.parse(await readFile(ARQ, "utf8")); } catch { estado = {}; } }
  return estado;
}
async function gravar() {
  await mkdir(PASTA, { recursive: true, mode: 0o700 });
  const tmp = `${ARQ}.${process.pid}.tmp`;
  await writeFile(tmp, JSON.stringify(estado), { mode: 0o600 });
  await rename(tmp, ARQ);
}

export async function adminPronto() { return !!(await ler()).registrada; }

// Chamado com o token de login do dono: registra a chave no banco se ainda não estiver registrada
export async function registrarChave(tokenDono, forcar = false) {
  const e = await ler();
  if (e.registrada && !forcar) return true;
  if (!e.chave) e.chave = randomBytes(32).toString("base64url");
  const hash = createHash("sha256").update(e.chave).digest("hex");
  const r = await fetch(`${SB_URL}/rest/v1/rpc/admin_registrar`, {
    method: "POST", headers: { apikey: SB_KEY, authorization: `Bearer ${tokenDono}`, "content-type": "application/json" }, body: JSON.stringify({ p_hash: hash }),
  });
  e.registrada = r.ok;
  await gravar();
  if (!r.ok) console.error("admin: registro da chave recusado", r.status);
  return r.ok;
}

export async function rpc(nome, args = {}) {
  const e = await ler();
  if (!e.chave || !e.registrada) throw Object.assign(new Error("sem_chave"), { codigo: "sem_chave" });
  const r = await fetch(`${SB_URL}/rest/v1/rpc/${nome}`, {
    method: "POST", headers: { apikey: SB_KEY, "content-type": "application/json" }, body: JSON.stringify({ p_chave: e.chave, ...args }),
  });
  const j = await r.json().catch(() => null);
  if (!r.ok) {
    if (j?.code === "42501") { e.registrada = false; await gravar(); } // chave não bate mais: o app do dono registra de novo
    throw Object.assign(new Error(j?.message || `rpc ${r.status}`), { codigo: j?.code || r.status });
  }
  return j;
}
