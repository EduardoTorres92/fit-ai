// Guia de Alimentação do treinador em texto, para a Nutri AI (o mesmo dado que a aba Nutrição mostra).
import "../../public/guia-alimentacao.js";

const G = globalThis.FITAI_GUIA;
const opcao = (o) => `${o.txt} (P ${o.p} g · C ${o.c} g · G ${o.g} g · ${o.kcal} kcal)`;

export const GUIA_TEXTO = [
  "GUIA PRÁTICO DE ALIMENTAÇÃO — redução de peso e hipertrofia (para quem treina calistenia)",
  "Fundamentos:", ...G.fundamentos.map((t) => `- ${t}`),
  "Mitos:", ...G.mitos.map((t) => `- ${t}`),
  "Dicas:", ...G.dicas.map((t) => `- ${t}`),
  "Opções de refeição do guia:",
  ...G.refeicoes.flatMap((r) => [`${r.nome} — emagrecimento:`, ...r.emagrecer.map((o) => `  - ${opcao(o)}`), `${r.nome} — hipertrofia:`, ...r.hipertrofia.map((o) => `  - ${opcao(o)}`)]),
].join("\n");
