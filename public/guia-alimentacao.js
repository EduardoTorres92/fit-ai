/* FIT.AI — "Guia Prático de Alimentação: redução de peso e hipertrofia" (material do treinador).
   Fundamentos e opções de refeição com macros. Usado na aba Nutrição e pela Nutri AI (no servidor).
   Funciona no navegador (window.FITAI_GUIA) e no servidor (globalThis.FITAI_GUIA). */
(function (g) {
  const O = (txt, p, c, gord, kcal) => ({ txt, p, c, g: gord, kcal });
  g.FITAI_GUIA = {
    fundamentos: [
      "Déficit calórico (emagrecimento): comer 10% a 20% abaixo do gasto diário (TDEE × 0,8 a 0,9) seca gordura preservando a massa muscular.",
      "Superávit calórico (hipertrofia): comer 5% a 15% acima do gasto diário (TDEE × 1,05 a 1,15) dá combustível para o músculo sem excesso de gordura.",
      "Proteína: 1,8 a 2,2 g/kg no emagrecimento e 2,0 a 2,5 g/kg na hipertrofia. Fontes: carnes magras, ovos, laticínios, leguminosas, whey.",
      "Carboidrato: 2 a 3 g/kg no emagrecimento e 4 a 6 g/kg na hipertrofia. Fontes: arroz, batata-doce, tapioca, frutas, aveia, pão integral.",
      "Gordura: 0,8 a 1 g/kg, no mínimo 20% das calorias. Fontes: azeite, abacate, castanhas, sementes.",
      "Água: 35 a 40 ml por kg de peso (70 kg → 2,5 a 3 L). Dica: garrafa de 1 L, encher 3 vezes ao dia.",
      "TMB (Harris-Benedict): homens 88,36 + 13,4×peso + 4,8×altura − 5,7×idade; mulheres 447,6 + 9,2×peso + 3,1×altura − 4,3×idade. Gasto diário = TMB × fator (sedentário 1,2; leve 1,375; moderado 1,55; ativo 1,725; muito ativo 1,9).",
    ],
    mitos: [
      "“Comer de 3 em 3 horas acelera o metabolismo”: mito. O que importa é o total de calorias do dia.",
      "“Carboidrato à noite engorda”: mito. Vale o total do dia.",
      "“Pular refeições ajuda a emagrecer”: mito. Costuma gerar compulsão e perda de massa magra.",
    ],
    dicas: [
      "Se treina cedo, prefira um café leve (iogurte com chia e banana ou shake com banana): estômago cheio atrapalha barra, flexão e parada de mão.",
      "Prato principal: proteína + carboidrato complexo + vegetal. Lanche: proteína + fruta ou castanhas.",
      "Prepare marmitas num dia da semana e deixe sempre uma opção pronta para dias corridos.",
      "Evite ultraprocessados, comer por tédio e restrição exagerada. Muitas vezes a fome é sede.",
      "Durma 7 a 9 horas e evite treino intenso nas 3 horas antes de dormir.",
    ],
    refeicoes: [
      { nome: "Café da manhã", emagrecer: [
          O("1 ovo cozido + 1 fatia de pão integral + 1 fatia de queijo branco + café preto", 13, 20, 10, 250),
          O("1 iogurte natural desnatado + 1 colher de chia + 1 banana média", 9, 28, 6, 260),
          O("Vitamina: 1 banana + 150 ml de leite desnatado + 10 g de aveia + 1 colher de pasta de amendoim", 10, 25, 9, 280)],
        hipertrofia: [
          O("2 ovos mexidos + 2 fatias de pão integral + 1 banana", 20, 45, 18, 480),
          O("Mingau: 200 ml de leite integral + 30 g de aveia + 1 scoop de whey + 1 colher de pasta de amendoim", 25, 40, 15, 450),
          O("Panqueca de banana com aveia + 1 copo de leite + 1 fruta", 22, 50, 12, 500)] },
      { nome: "Almoço", emagrecer: [
          O("100 g de frango grelhado + 2 colheres de arroz integral + salada com tomate e 1 colher de azeite + brócolis e cenoura", 28, 30, 15, 400),
          O("100 g de patinho moído + 100 g de abóbora + folhas verdes + 1 colher de feijão", 26, 25, 12, 370),
          O("Omelete de 2 ovos com espinafre e tomate + 100 g de batata-doce + salada com limão e linhaça", 22, 28, 16, 390)],
        hipertrofia: [
          O("150 g de frango grelhado + 4 colheres de arroz branco + salada com azeite + 1 colher de feijão + 1 ovo cozido", 38, 55, 20, 650),
          O("150 g de patinho moído + 100 g de purê de batata + legumes + salada com azeite", 35, 45, 22, 670),
          O("150 g de peixe grelhado + 3 colheres de arroz integral + 100 g de lentilha + salada verde com azeite", 36, 50, 18, 630)] },
      { nome: "Lanche da tarde", emagrecer: [
          O("1 iogurte zero (120 g) + 1 maçã pequena", 9, 22, 1, 160),
          O("1 fatia de pão integral + 1 colher de cottage", 8, 15, 3, 180),
          O("Shake: 1 scoop de whey com água + 5 castanhas", 22, 5, 6, 210)],
        hipertrofia: [
          O("2 fatias de pão integral + 2 ovos mexidos + 1 colher de requeijão light", 24, 30, 15, 410),
          O("Vitamina: 1 banana + 200 ml de leite integral + 20 g de aveia + 1 scoop de whey", 35, 35, 10, 450),
          O("Tapioca média (30 g) com frango desfiado e queijo", 28, 25, 12, 420)] },
      { nome: "Jantar", emagrecer: [
          O("Omelete de 2 ovos com tomate, espinafre e cebola", 15, 5, 20, 330),
          O("Sopa de legumes (cenoura, abobrinha, chuchu) + 100 g de frango desfiado", 20, 20, 7, 350),
          O("Salada grande com folhas, 100 g de frango grelhado, azeite e grão-de-bico", 22, 15, 12, 360)],
        hipertrofia: [
          O("150 g de frango grelhado + 3 colheres de arroz branco + salada com azeite", 35, 40, 15, 550),
          O("Omelete de 3 ovos + 100 g de batata-doce + queijo branco", 28, 35, 22, 580),
          O("Wrap de pão sírio integral + 120 g de carne moída + vegetais grelhados + requeijão light", 32, 45, 14, 590)] },
      { nome: "Ceia (opcional)", emagrecer: [O("1 iogurte zero", 9, 8, 2, 100), O("1 ovo cozido", 6, 0, 5, 80)],
        hipertrofia: [O("1 copo de leite integral + 1 banana", 12, 28, 10, 280), O("2 ovos cozidos", 13, 0, 10, 160)] },
    ],
  };
})(typeof window !== "undefined" ? window : globalThis);
