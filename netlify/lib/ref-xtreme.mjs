// Treinos de referência do programa "xTreme Workout" (21 fichas do treinador + agenda de treinamento).
// O Coach AI usa como modelo de estilo, volume e estrutura (ciclos × voltas) ao montar o plano de cada pessoa.
// Os ids entre colchetes são os do catálogo public/xtreme.js.
export const COMO_TREINAR = `Como o treinador manda treinar: faça o primeiro exercício do primeiro ciclo, as repetições propostas, e passe para o
seguinte do mesmo ciclo. Ao fim do ciclo, descanse (em geral 1 min) e repita o MESMO ciclo: são 4 voltas (4x) antes de passar
para o próximo ciclo. O treino completo é a soma dos ciclos. Halteres leves, de até 3 kg cada: o peso não é o foco, o ritmo é.
Agenda original: 3 treinos por semana (segunda, quarta e sexta), com descanso ou alongamento (cool down) nos dias entre eles e
yoga opcional no domingo; os treinos 1 a 21 seguem em ordem, 3 por semana (7 semanas). Aquecer antes, abdômen firme para
estabilizar a coluna, dormir e comer bem. Formatos: (a) ciclos por repetições (10 a 50 reps); (b) ciclos de "máximo de
repetições" (ou máximo de tempo nas isometrias); (c) HIIT: "faz 20 s e descansa 10 s", às vezes 2x seguidas no mesmo exercício,
de 3 a 5 voltas, com 90 s a 2 min de descanso entre as voltas; (d) escada 10, 9, 8 … 1.`;

export const REFERENCIA = `Treino 01 · Peito e Tríceps
Ciclo 1 (4x, 1 min no fim): Apoio na caixa 10 [xt-apoio-caixa] · Tríceps na caixa com a perna estendida 20 [xt-triceps-caixa-perna-estendida] · Agachamento 30 [xt-agachamento]
Ciclo 2 (4x, 1 min): Apoio regular 10 [xt-apoio-regular] · Tríceps testa 20 [xt-triceps-testa] · Passada com halteres 30 [xt-passada-halteres]
Ciclo 3 (4x, 1 min): Abs crunch 50 [xt-abs-crunch] · Flexão plantar 50 [xt-flexao-plantar]

Treino 02 · Costas e Bíceps
Ciclo 1 (4x, 1 min): Bíceps em passada 10 por perna [xt-biceps-passada] · Remada em prancha 20 [xt-remada-prancha] · Voador invertido em passada 15 por perna [xt-voador-invertido-passada]
Ciclo 2 (4x, 1 min): Barra com pulo 10 [xt-barra-pulo] · Bíceps + abre/fecha 20 [xt-biceps-abre-fecha] · Voador invertido em passada 15 por perna
Ciclo 3 (4x, 1 min): Abs oblíquos 50 [xt-abs-obliquos] · Joelho no cotovelo em prancha 50 [xt-joelho-cotovelo-prancha]

Treino 03 · Ombro
Ciclo 1 (4x, 1 min): Lateral de ombro em uma perna 15 por perna [xt-lateral-ombro-uma-perna] · Levantamento turco 20 [xt-levantamento-turco] · Polichinelo 30 [xt-polichinelo] · Agachamento + pressão de ombro 20 [xt-agachamento-pressao-ombro] · Abs rema rema 30 [xt-abs-rema-rema]
Ciclo 2 (4x, 1 min): Frontal de ombro sentado 30 [xt-frontal-ombro-sentado] · Agachamento com halteres 20 [xt-agachamento-halteres] · Polichinelo com elevação de braços 30 [xt-polichinelo-elevacao] · Agachamento sumô + remada alta 20 [xt-sumo-remada-alta] · Abs power 30 [xt-abs-power]

Treino 04 · Bíceps e Panturrilha
Ciclo 1 (4x, 1 min): Apoio nos halteres 20 [xt-apoio-halteres] · Bíceps + abre/fecha 20 · Flexão plantar com halteres 30 [xt-flexao-plantar-halteres] · Abs oblíquos 50
Ciclo 2 (4x, 1 min): Apoio declinado 20 [xt-apoio-declinado] · Bíceps martelo em passada 20 [xt-biceps-martelo-passada] · Flexão plantar em uma perna com halteres 15 por perna [xt-flexao-plantar-uma-perna] · Prancha crunch 50 [xt-prancha-crunch] · Abs crunch 50

Treino 05 · Costas, Tríceps, Perna e Abdominal
Ciclo 1 (4x, 1 min): Barra 10 [xt-barra] · Tríceps coice 20 [xt-triceps-coice] · Passada plyo alternada 30 [xt-passada-plyo] · Abs tapa no pé 40 [xt-abs-tapa-pe]
Ciclo 2 (4x, 1 min): Remada com halteres 10 por lado [xt-remada-halteres] · Tríceps na paralela 20 [xt-triceps-paralela] · Agachamento com salto 30 [xt-agachamento-salto] · Abs curto 40 [xt-abs-curto]

Treino 06 · HIIT Abdominal
Ciclo único (5x, 90 s no fim), 30 s cada: Joelho alto [xt-joelho-alto] · Prancha estática [xt-prancha-estatica] · Corrida no lugar [xt-corrida-lugar] · Prancha lateral direita [xt-prancha-lateral] · Polichinelo com elevação de braços · Prancha lateral esquerda · 1-2-3 joelho [xt-123-joelho]

Treino 07 · Costas (tudo em máximo de repetições; 1 min no fim de cada volta e 2 min entre os ciclos)
Ciclo 1 (4x): Barra máx · Tríceps na barra máx [xt-triceps-barra]
Ciclo 2 (4x): Remada + passada plyo alternada máx [xt-remada-passada-plyo] · Tapa no peito horizontal máx [xt-tapa-peito-horizontal]
Ciclo 3 (4x): Corrida em passada com halteres máx [xt-corrida-passada-halteres] · Pull over máx [xt-pull-over]
Ciclo 4 (4x): Remada com halteres máx · Abs pé na barra máx [xt-abs-pe-barra]

Treino 08 · Ombro e Costas (máximo de repetições; 1 min no fim da volta, 2 min entre ciclos)
Ciclo 1 (4x): Apoio com bananeira máx [xt-apoio-bananeira] · Pull over na barra máx [xt-pull-over-barra]
Ciclo 2 (4x): Apoio quadril alto máx [xt-apoio-quadril-alto] · 100 em passada máx [xt-100-em-passada]
Ciclo 3 (4x): Remada alta + lateral máx [xt-remada-alta-lateral] · Voador invertido em passada máx
Ciclo 4 (4x): Abs curto máx

Treino 09 · Perna e Abdominal (1 min entre os ciclos)
Ciclo 1 (4x): Agachamento com salto com peso 10 [xt-agachamento-salto-peso] · Agachamento baixo com halter 30 [xt-agachamento-baixo-halter] · Abs crunch 30
Ciclo 2 (4x): Passada capoeira com halteres 10 por perna [xt-passada-capoeira-halteres] · Corrida em passada com halteres 30 · Abs oblíquos 30
Ciclo 3 (4x): Agachamento com salto adutor 10 [xt-agachamento-salto-adutor] · Agachamento sumô com halteres 30 [xt-agachamento-sumo-halteres] · Abs curto 30

Treino 10 · Peito e Bíceps (máximo de repetições; 1 min no fim da volta)
Ciclo 1 (4x): Apoio diamante máx [xt-apoio-diamante] · Bíceps com halteres xtreme máx [xt-biceps-xtreme]
Ciclo 2 (4x): Apoio com mão invertida máx [xt-apoio-mao-invertida] · Bíceps + abre/fecha máx
Ciclo 3 (4x): Apoio regular máx · Bíceps isométrico máx de tempo [xt-biceps-isometrico]

Treino 11 · HIIT
Ciclo único (4x, 2 min no fim), cada um "faz 20 s e descansa 10 s": Corrida em passada com halteres (lado direito, depois esquerdo) · Supino em prancha invertida (direito, esquerdo) [xt-supino-prancha-invertida] · 1-2-3 joelho (2x) · Soco em passada (direito, esquerdo) [use xt-corrida-passada-halteres ou xt-passada-halteres] · Crucifixo em prancha invertida (direito, esquerdo) [xt-crucifixo-prancha-invertida]

Treino 12 · Perna e Abdominal (1 min no fim da volta)
Ciclo 1 (4x): Swing com halteres 30 [xt-swing-halteres] · Chute por dentro em prancha 30 [xt-chute-dentro-prancha]
Ciclo 2 (4x): Discuss (arremesso) 15 por lado [xt-discuss] · Joelho por fora em prancha 30 [xt-joelho-fora-prancha]
Ciclo 3 (4x): Salto power (tapa no joelho) 30 [xt-salto-power] · Tapa no pé em prancha 30 [xt-tapa-pe-prancha]

Treino 13 · HIIT Peito
Ciclo único (3x, 2 min no fim), cada um "20 s / 10 s, 2x": Apoio superman [xt-apoio-superman] · Corrida no lugar · Apoio plyo [xt-apoio-plyo] · Corrida no lugar · Apoio regular · Corrida no lugar · Apoio curto [xt-apoio-curto]

Treino 14 · Costas e Abdominal
Ciclo único (5x, 2 min no fim): Barra 15 · Abs rema rema 50 · Remada com halteres 15 · Abs tapa no pé 50 · Voador invertido em passada 15 · Abs borboleta 50 [xt-abs-borboleta]

Treino 15 · Ombro e Panturrilha
Ciclo único (4x, 2 min no fim): Apoio com bananeira 5 · Flexão plantar 50 · Andar na parede em bananeira 5 [xt-andar-parede-bananeira] · Flexão plantar com halteres 25 · Bananeira máx de tempo [xt-bananeira] · Salto na ponta dos pés 50 [xt-salto-ponta-pes] · Apoio quadril alto 20 · Salto com um pé 20 por pé [xt-salto-um-pe]

Treino 16 · HIIT Perna e Abdominal
Ciclo único (4x, 2 min no fim), cada um "20 s / 10 s, 2x": Burpee [xt-burpee] · Prancha abre/fecha [xt-prancha-abre-fecha] · Agachamento com salto · Prancha goofy/regular [xt-prancha-goofy] · Salto horizontal [xt-salto-horizontal] · Corrida em prancha [xt-corrida-prancha] · Agachamento

Treino 17 · Costas, Peito e Tríceps (30 s de descanso no fim de cada volta)
Ciclo 1 (4x): Barra isométrica máx de tempo [xt-barra-isometrica] · Paralela estática máx de tempo [xt-paralela-estatica]
Ciclo 2 (4x): Barra isométrica máx de tempo · Tríceps paralela 20
Ciclo 3 (4x): Barra 20 · Paralela estática máx de tempo
Ciclo 4 (1x, escada): Barra 10, 9, 8 … 1 · Tríceps paralela 10, 9, 8 … 1 (alternando)

Treino 18 · Bíceps e Tríceps (1 min no fim da volta)
Ciclo 1 (4x): Barra estática em L 20 s [xt-barra-estatica-l] · Apoio tríceps 20 [xt-apoio-triceps]
Ciclo 2 (4x): Barra mão virada e junta 10 excêntricas [xt-barra-supinada-fechada] · Tríceps na barra 10 excêntricas
Ciclo 3 (4x): Abs pé na barra 20 · Tríceps coice 20

Treino 19 · Peito e Bíceps (1 min no fim da volta)
Ciclo 1 (4x): Bíceps + abre/fecha 10 · Supino com halteres 10 [xt-supino-halteres] · Swing com halteres 20 · Abs com halteres 20 [xt-abs-halteres]
Ciclo 2 (4x): Apoio regular 20 · Apoio curto máx · Passada alternada com giro de tronco 30 [xt-passada-giro-tronco] · Bíceps com halteres xtreme 20 por braço · Bíceps isométrico máx de tempo

Treino 20 · HIIT
Ciclo único (4x, 2 min no fim), cada um "20 s / 10 s, 2x": Remada em prancha · Agachamento + ombro [xt-agachamento-pressao-ombro] · Abs giro russo [xt-abs-giro-russo] · Polichinelo com elevação de braços · Prancha muay thai [xt-prancha-muay-thai] · Snatch [xt-snatch] · Abs soco alternado [xt-abs-soco-alternado]

Treino 21 · Perna (1 min no fim da volta)
Ciclo 1 (4x): Passada + joelho alto 12 por perna [xt-passada-joelho-alto] · Stiff 50 [xt-stiff]
Ciclo 2 (4x): Passada plyo no banco 12 por perna [xt-passada-plyo-banco] · Flexão plantar 50
Ciclo 3 (4x): Passada capoeira com halteres 12 por perna · Elevação de quadril 50 [xt-elevacao-quadril]
Ciclo 4 (4x): Salto na caixa 20 [xt-salto-caixa] · Agachamento 50`;
