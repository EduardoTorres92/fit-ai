// O que muda de academia para academia, num lugar só.
export const CONFIG = {
  // WhatsApp que recebe o pedido de aula experimental: só números, com 55 e o DDD ("5511999990000").
  // Vazio (a demo), o formulário só mostra a mensagem de pedido anotado.
  whatsapp: '',

  // A grade de aulas de cada dia: hora, aula, professor e sala, duração.
  grade: {
    seg: [
      ['06:30', 'Cross', 'Bruno · Galpão', '50 min'],
      ['07:30', 'Funcional', 'Lívia · Galpão', '50 min'],
      ['12:15', 'Muay thai', 'Caio · Tatame', '60 min'],
      ['18:30', 'Cross', 'Bruno · Galpão', '50 min'],
      ['19:30', 'Boxe', 'Dandara · Tatame', '60 min'],
    ],
    ter: [
      ['06:30', 'Funcional', 'Lívia · Galpão', '50 min'],
      ['07:30', 'Mobilidade', 'Aline · Sala 2', '40 min'],
      ['12:15', 'Cross', 'Bruno · Galpão', '50 min'],
      ['18:30', 'Jiu-jítsu', 'Mestre Otávio · Tatame', '75 min'],
      ['20:00', 'Cross', 'Renan · Galpão', '50 min'],
    ],
    qua: [
      ['06:30', 'Cross', 'Bruno · Galpão', '50 min'],
      ['07:30', 'Funcional', 'Lívia · Galpão', '50 min'],
      ['12:15', 'Boxe', 'Dandara · Tatame', '60 min'],
      ['18:30', 'Cross', 'Renan · Galpão', '50 min'],
      ['19:30', 'Muay thai', 'Caio · Tatame', '60 min'],
    ],
    qui: [
      ['06:30', 'Funcional', 'Lívia · Galpão', '50 min'],
      ['07:30', 'Mobilidade', 'Aline · Sala 2', '40 min'],
      ['12:15', 'Cross', 'Bruno · Galpão', '50 min'],
      ['18:30', 'Jiu-jítsu', 'Mestre Otávio · Tatame', '75 min'],
      ['20:00', 'Boxe só de mulheres', 'Dandara · Tatame', '60 min'],
    ],
    sex: [
      ['06:30', 'Cross', 'Bruno · Galpão', '50 min'],
      ['07:30', 'Funcional', 'Lívia · Galpão', '50 min'],
      ['12:15', 'Muay thai', 'Caio · Tatame', '60 min'],
      ['18:00', 'Levantamento olímpico', 'Renan · Galpão', '75 min'],
      ['19:30', 'Sparring', 'Caio · Ringue', '60 min'],
    ],
    sab: [
      ['08:30', 'Aula de técnica', 'Bruno · Galpão', '60 min'],
      ['09:30', 'Cross em duplas', 'Renan · Galpão', '60 min'],
      ['10:00', 'Jiu-jítsu', 'Mestre Otávio · Tatame', '75 min'],
      ['11:00', 'Mobilidade', 'Aline · Sala 2', '40 min'],
      ['16:00', 'Boxe', 'Dandara · Tatame', '60 min'],
    ],
  },
};
