// Cadastro e login com e-mail e senha.
// POST /api/auth  { acao: "cadastro" | "entrar", nome?, email, senha }  ->  { token, nome, email }
import { loja, normEmail, hashSenha, confereSenha, criaToken } from "../lib/sessao.mjs";

const json = (status, body) => new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" } });
const EMAIL_OK = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_ERROS = 5, JANELA_MIN = 15;

export default async (req) => {
  if (req.method !== "POST") return json(405, { erro: "metodo" });
  let b;
  try { b = await req.json(); } catch { return json(400, { erro: "json" }); }
  const email = normEmail(b.email), senha = String(b.senha || "");
  if (!EMAIL_OK.test(email) || email.length > 120) return json(400, { erro: "email_invalido" });
  const l = loja();

  if (b.acao === "cadastro") {
    const nome = String(b.nome || "").trim().slice(0, 60);
    if (nome.length < 2) return json(400, { erro: "nome_invalido" });
    if (senha.length < 8 || senha.length > 200) return json(400, { erro: "senha_curta" });
    const conta = { nome, email, senha: await hashSenha(senha), criada: new Date().toISOString() };
    // onlyIfNew: se o e-mail já existe (inclusive o do dono), não sobrescreve.
    const r = await l.setJSON(`conta/${email}`, conta, { onlyIfNew: true });
    if (r && r.modified === false) return json(409, { erro: "ja_cadastrado" });
    return json(200, { token: await criaToken(email), nome, email });
  }

  if (b.acao === "entrar") {
    const chaveErros = `erros/${email}`;
    const erros = (await l.get(chaveErros, { type: "json" })) || { n: 0, desde: Date.now() };
    if (Date.now() - erros.desde > JANELA_MIN * 60000) { erros.n = 0; erros.desde = Date.now(); }
    if (erros.n >= MAX_ERROS) return json(429, { erro: "muitas_tentativas" });
    const conta = await l.get(`conta/${email}`, { type: "json" });
    if (!conta || !(await confereSenha(senha, conta.senha))) {
      erros.n++; await l.setJSON(chaveErros, erros);
      return json(401, { erro: "senha_errada" });
    }
    if (erros.n) await l.delete(chaveErros);
    return json(200, { token: await criaToken(email), nome: conta.nome, email });
  }
  return json(400, { erro: "acao" });
};

export const config = { path: "/api/auth" };
