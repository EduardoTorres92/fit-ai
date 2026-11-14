// getStore() que funciona na Netlify e fora dela.
// - Na Netlify (padrão): usa o Netlify Blobs de verdade.
// - Com FITAI_ARMAZENAMENTO=arquivo (o server.mjs liga isso, ex.: Hostinger): guarda cada chave como um arquivo
//   JSON numa pasta do servidor, em DADOS_DIR (padrão: ~/fitai-dados, fora da pasta do app, para não sumir a
//   cada novo deploy).
// Implementa só o que o app usa: get, set, setJSON (com onlyIfNew) e delete.
import { mkdir, readFile, writeFile, rm, rename } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";
import { randomBytes } from "node:crypto";

const emArquivo = process.env.FITAI_ARMAZENAMENTO === "arquivo";
const netlify = emArquivo ? null : await import("@netlify/blobs");

const PASTA = process.env.DADOS_DIR || join(homedir(), "fitai-dados");

function lojaEmArquivo(nome) {
  const dir = join(PASTA, nome.replace(/[^\w.-]/g, "_"));
  const caminho = (chave) => join(dir, `${encodeURIComponent(chave)}.json`);
  const pronto = mkdir(dir, { recursive: true, mode: 0o700 });

  async function grava(chave, texto, { onlyIfNew } = {}) {
    await pronto;
    if (onlyIfNew) {
      try { await writeFile(caminho(chave), texto, { flag: "wx", mode: 0o600 }); return { modified: true }; }
      catch (e) { if (e.code === "EEXIST") return { modified: false }; throw e; }
    }
    // escreve num arquivo temporário e renomeia: quem lê nunca vê o arquivo pela metade
    const tmp = `${caminho(chave)}.${randomBytes(6).toString("hex")}.tmp`;
    await writeFile(tmp, texto, { mode: 0o600 });
    await rename(tmp, caminho(chave));
    return { modified: true };
  }

  return {
    async get(chave, opcoes = {}) {
      await pronto;
      let texto;
      try { texto = await readFile(caminho(chave), "utf8"); }
      catch (e) { if (e.code === "ENOENT") return null; throw e; }
      return opcoes.type === "json" ? JSON.parse(texto) : texto;
    },
    set: (chave, valor, opcoes) => grava(chave, String(valor), opcoes),
    setJSON: (chave, valor, opcoes) => grava(chave, JSON.stringify(valor), opcoes),
    async delete(chave) { await pronto; await rm(caminho(chave), { force: true }); },
  };
}

export function getStore(opcoes) {
  if (netlify) return netlify.getStore(opcoes);
  return lojaEmArquivo(typeof opcoes === "string" ? opcoes : opcoes.name);
}
