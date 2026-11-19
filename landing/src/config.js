// Conteúdo da landing do FIT.AI: a semana de exemplo do Coach.
export const CONFIG = {
  // WhatsApp que recebe o pedido de aula experimental: só números, com 55 e o DDD ("5511999990000").
  // Vazio (a demo), o formulário só mostra a mensagem de pedido anotado.
  whatsapp: '',

  // A grade de aulas de cada dia: hora, aula, professor e sala, duração.
  grade: {
    seg: [
      ['01', 'Trote leve + mobilidade', 'Aquecimento · Corrida', '10 min'],
      ['02', 'Agachamento goblet 3 × 10-12', 'Força · Academia', '20 min'],
      ['03', 'Panturrilha excêntrica 3 × 12', 'Força do corredor', '8 min'],
      ['04', 'Prancha 3 × 40 s', 'Core · Calistenia', '5 min'],
    ],
    ter: [
      ['01', 'Trote + educativos', 'Aquecimento · Corrida', '15 min'],
      ['02', '6 × 400 m, 90 s de pausa', 'Tiros · Corrida', '25 min'],
      ['03', 'Corrida regenerativa', 'Solto · Corrida', '10 min'],
    ],
    qua: [
      ['01', 'Remada curvada 4 × 8-10', 'Força · Academia', '15 min'],
      ['02', 'Supino reto 4 × 8-10', 'Força · Academia', '15 min'],
      ['03', 'Elevação pélvica unilateral 3 × 12', 'Força do corredor', '10 min'],
    ],
    qui: [
      ['01', 'Corrida contínua a 6:30/km', 'Rodagem · Corrida', '35 min'],
      ['02', 'Acelerações 4 × 80 m', 'Técnica · Corrida', '8 min'],
    ],
    sex: [
      ['01', 'Circuito: 400 m de corrida + farmer walk + wall ball', 'Híbrido · Híbrido', '30 min'],
      ['02', 'Canoa 3 × 30 s', 'Core · Calistenia', '5 min'],
    ],
    sab: [
      ['01', 'Corrida leve e constante', 'Longão · Corrida', '60 min'],
      ['02', 'Mande o print da corrida', 'XP · FIT.AI', '1 min'],
    ],
  },
};
