// Base de calistenia do treinador (PDFs "Roteiro de Fortalecimento" e "Calendário Calistênico").
// Usada pelo Coach AI (chat) e pela montagem da Calistenia 21 dias. Formato: treino → exercício séries×reps.

export const ROTEIRO_FORTALECIMENTO = `ROTEIRO DE FORTALECIMENTO (4 semanas) — para quem ainda NÃO faz 4–6 barras fixas ou 15–20 flexões com técnica correta.
Ao atingir 4–6 barras e 15–20 flexões bem executadas, a pessoa pode avançar para o Calendário Calistênico.
Semana 1: Seg barra (1) · Ter flexões (1) · Qua cardio 3–4 km · Qui barra (1) · Sex flexões (1)
Semana 2: Seg flexões (2) · Ter barra (2) · Qua cardio 4–5 km · Qui barra (1) · Sex flexões (1)
Semana 3: Seg barra (3) · Ter flexões (3) · Qua cardio 5–6 km · Qui flexões (2) · Sex barra (2)
Semana 4: Seg flexões (4) · Ter barra (4) · Qua cardio 6–7 km · Qui flexões (4) · Sex barra (4)
Descanso em todos: 3:00–3:30 entre séries, 4:00–4:30 entre exercícios.
Barra (1): barra australiana pronada 4×14–16 (escápulas retraídas, cotovelos perto do corpo) · isometria no topo da barra 3×10–15s (sobe com banco, queixo acima) · negativa de barra pronada 4×3–5 · ativação escapular na barra 3×8–10 · prancha 3×30–40s
Barra (2): australiana supinada com pausa de 2s no topo 4×10–12 · negativa com isometria de 3s no meio 4×3–5 · ativação escapular 3×6–8 · prancha com toque no ombro 4×16–20 · hollow body 3×20–30s
Barra (3): barra fixa assistida (com salto) 4×4–6 · negativa com pausa em 2 fases (2s topo, 2s meio) 4×3–5 · australiana supinada 4×10–12 · hollow body 3×30–40s · prancha lateral 2×30–40s
Barra (4): barra assistida supinada 4×6–8 · isometria no topo (pronada) 4×10–15s · barra excêntrica prolongada (descida de 6–8s) 4×3–5 · ativação escapular dinâmica 3×8–10 · prancha com avanço 3×15–20s
Flexões (1): flexão isométrica na posição baixa 3×15–20s · flexão negativa (descida em 4s, sobe com joelhos) 4×6–8 · ativação escapular no solo 3×8–10 · flexão inclinada com mãos no banco 4×12–14 · prancha 3×40–60s
Flexões (2): flexão com joelhos 4×10–12 · flexão negativa com pausa de 3s no meio 4×5–7 · ativação escapular 3×10–12 · hollow body 4×20–30s · prancha com toque nos ombros 3×20–30s
Flexões (3): flexão tradicional com subida apoiada 4×8–10 · flexão excêntrica com 2 pausas 3×4–6 · flexão explosiva com joelhos 4×6–8 · prancha lateral 3×30–40s · transição prancha → flexão 4×10–12
Flexões (4): flexão tradicional completa 4×12–16 · isometria de 5s no fundo + subida explosiva 3×5–7 · flexão arqueira só a descida 4×6–8 · ativação escapular 3×10–12 · prancha com elevação de pernas 4×20–24
Dicas: técnica antes de volume; descanse e durma bem; coma bem e hidrate-se.`;

export const CALENDARIO_CALISTENICO = `CALENDÁRIO CALISTÊNICO (48 semanas, 5 treinos por semana, de segunda a sexta) — para quem já faz 4–6 barras e 15–20 flexões.
Níveis: iniciante (meses 1–4, semanas 1–16), intermediário (meses 5–8, semanas 17–32), avançado (meses 9–12, semanas 33–48). Cardio: caminhar ou correr 5–10 km por semana. Quando ficar fácil, aumente repetições ou dificuldade. Qualidade antes de tempo: 3s perfeitos valem mais que 10s falhos.
Exemplo do nível iniciante — Semana 1: Seg força e resistência · Ter isometria e controle · Qua circuito dorsal & bíceps · Qui handstand · Sex força e resistência. Semana 4: Seg isometria e controle · Ter front lever iniciante · Qua explosão e controle · Qui planche iniciante · Sex dorsal & bíceps. A partir da semana 7 entram muscle up; semana 12 back lever; semana 16 hefesto iniciante.
Intermediário: rotação de front lever intermediário, planche intermediário, back lever, hefesto, muscle up e handstand, com quartas de descanso a partir da semana 25. Avançado: front lever e planche avançados, hefesto avançado, back lever.
Treinos (séries×reps; descanso 3–4 min entre séries e 4–4:30 entre exercícios, salvo indicado):
- Força e resistência: barra fixa 3×7–9 · dip na paralela 2×12–16 · flexão arqueira 2×8–12 cada lado · pseudo flexão 2×10–14 · barra australiana 4×20–24 · prancha 3×1–1:30 min
- Isometria e controle: isometria na barra 4×8–12s · handstand na parede 3×15–20s · planche lean (hold) 4×12–16s · superman hold 3×10–15s · hold na australiana 3×15–20s · prancha lateral 3×30–40s cada lado
- Explosão e controle: barra explosiva 3×4–6 · dip explosiva 4×10–14 · flexão pike 4×6–8 · isometria na barra 3×14–18s · L-sit 3×8–12s
- Circuito dorsal & bíceps (4–5 voltas, 4–5:30 min entre voltas): negativa de barra supinada 5–7 · hold na barra até a falha · barra australiana 16–20 · planche lean invertida 6–8
- Handstand: handstand na parede 4×15–20s · flexão pike 4×8–10 · isometria pike 3×10–14s · flexão tradicional 4×16–20 · prancha 4×1–2 min (também wall walks e kick-ups)
- Muscle up: barra explosiva 4×3–6 · barra fixa 4×8–10 · negativa de muscle up 5×2–3 · dip 3×12–14
- Back lever: toque na barra (tuck) 4×6–8 · negativa de back lever 5×1–2 · pelican curl 4×8–10 · hanging knee + L-sit 3×8–10 · L-sit 2×10–14s
- L-sit: L-sit encolhido 4×10–12 · levantamento unilateral para L-sit 4×10–12 · L-sit apoiado no chão 3×8–12s · tríceps banco 2×8–12 · toque nos pés 3×30–40s
- Front lever iniciante: barra fixa 4×10–12 · tuck front lever 4×6–8s · barra australiana 4×15–20 · L-sit (subida) 4×10–12 · prancha 2×1:30–2 min. Intermediário: advanced tuck front lever 4×5–7s · negativa de front lever 4×2–3 · australiana 4×20–25 · L-sit tocando a barra 3×6–8 · dragon flag 4×2–4. Avançado: wide front lever 4×6–8s · negativa 4×2–3 · front lever (subida) 4×4–6 · barra → front lever 3×4–6 · dragon flag 4×3–5
- Planche iniciante: avanço de planche lean 4×6–8 · tentativa de tuck planche 4×4–6 · flexão arqueira 3×4–6 cada lado · dips 3×10–15 · ativação de escápula 4×14–16. Intermediário: tuck planche 4×8–10s · flexão na handstand 3×4–6 · avanço para planche 5×10–15s · negativa de pseudo flexão 4×6–8 · canoinha 1×2–4 min · prancha 1×2–4 min. Avançado (descanso 4:30–5 min): tentativa de straddle planche 4×1 · advanced tuck planche 3×4–6 · flexões tuck planche 4×6–8 · flexões lean planche 4×8–10 · pseudo lean planche 3×6–10
- Elbow lever: flexão tradicional 4×16–20 · pseudo flexão 3×6–8 · avanço de planche 3×4–6 · dip na paralela 4×10–12 · tentativas de elbow lever 3×3–5 cada pé
- Hefesto iniciante: isometria na dip coreana 4×6–10s · isometria germânica 4×6–8s · pelican curl (etapa baixa) 3×6–8 · pelican curl (etapa alta) 3×6–8. Intermediário: 50% hefesto 3×2–4 · dip coreana 4×4–6 · hefesto com apoio 4×4–6 · pelican curl 5×10–12. Avançado: negativa de hefesto 5×1–2 · transição pelican → hefesto 3×4–6 · hefesto com apoio de 1 perna 4×6–8 · pelican curl em 3 etapas 3×5-5-5
Progressão: aumente o tempo sob tensão antes de variações mais difíceis; core e glúteos sempre ativos; no planche lean, incline mais à frente conforme a força aumenta; forma antes de duração.`;
