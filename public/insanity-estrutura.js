/* FIT.AI — estrutura dos vídeos do Insanity MAX:30 (exercícios, rodadas e tempos aproximados).
   Tirada das transcrições dos vídeos (Google Drive). Os tempos com "~" são estimados; "max out" = o fim do treino.
   Usada na tela do vídeo ("Ver exercícios") e no contexto do Coach AI (app e Telegram). */
window.FITAI_MAX30_ESTRUTURA = {
 "cardio-challenge": {
  "duracao": "vídeo ~33 min, treino 30 min",
  "formato": "blocos de 30 s por movimento; cada circuito tem 3 movimentos x 3 rodadas; 30 s de pausa entre circuitos. É o \"fit test\": anote o minuto do primeiro Max Out.",
  "blocos": [
   [
    "0:00",
    "Aquecimento (2 rodadas): Chest opener jack, Jack uppercut, 1-2-3 touch the knee, Cross jack, High knee cross jab · pausa ~5:00"
   ],
   [
    "~5:30",
    "Circuito 1 (3 rodadas): Squat kick (dir / esq / alternating straight leg kick na 3ª), Pike up + spider lunge (dir / esq / alternado), 10 and 2 · pausa ~10:00"
   ],
   [
    "~10:30",
    "Circuito 2 (3 rodadas): Medicine ball twist, Plank jack in & out abs, 4 jabs + 4 high knees · pausa ~15:00 (metade)"
   ],
   [
    "~15:30",
    "Circuito 3 (3 rodadas): Plyo power knee (dir/esq), Scissor stance jack, Wide in & out abs + shoulder tap · pausa ~20:00"
   ],
   [
    "~20:30",
    "Circuito 4 (3 rodadas): Flat back jack, Suicide sprint burpee, Speed tap em prancha (dir / esq / alternado) · pausa ~25:00"
   ],
   [
    "~25:30",
    "Circuito 5 (3 rodadas): Chair squat, Football run (vira dir/centro/esq + sprint), 2 jabs + 2 tuck jumps · fim ~30:00"
   ],
   [
    "",
    "Desaquecimento ~3 min"
   ]
  ]
 },
 "tabata-power": {
  "duracao": "treino 30 min",
  "formato": "Tabata — 20 s forte / 10 s de pausa; cada movimento 2 vezes (às vezes um lado de cada vez); pausa curta para água entre os blocos. Tempos estimados (sem marcação no vídeo).",
  "blocos": [
   [
    "0:00",
    "Aquecimento (2 rodadas): Straight arm jack, Scissor chest opener, Side-to-side lateral lunge, Downward dog + spider lunge"
   ],
   [
    "~5:00",
    "Bloco 1 · pernas: Burpee lunge (2x), Lunge jumps (perna dir atrás / esq atrás), Split lunge punch (dir / esq), Lunge kick (dir / esq) · pausa"
   ],
   [
    "~10:00",
    "Bloco 2 · peito e braços: Plyo push-up lateral (2x), Hop push-up — mãos saem do chão (2x), Push-up + row (2x; versão com joelhos no chão), Push-up com joelhos (2x) · pausa (posição da criança entre séries)"
   ],
   [
    "~14:30",
    "Bloco 3 · potência de pernas: Fast power jumps (2x), Slow power jumps no comando (2x), High jumps (2x), Squat + knee up controlado (2x) · pausa"
   ],
   [
    "~19:00",
    "Bloco 4 · core no chão: Floor switch kick + punch (2x), só perna da frente / só perna de trás, Scissor com mãos atrás da cabeça (2x), L hold (perna da frente / de trás)"
   ],
   [
    "~23:30",
    "Bloco 5 · tríceps: Tricep dip + reach alternado (2x), Tricep dip com uma perna elevada (frente / trás), Speed tricep dips (2x), Dips 4 desce / 4 sobe com isometria (2x)"
   ],
   [
    "~27:00",
    "Final sem pausa: Split lunge punch, Push-up row / tricep push-up row, Switch kick punch, Speed dips, 1 min de speed power jumps (\"max out\") · desaquecimento ~3 min"
   ]
  ]
 },
 "sweat-intervals": {
  "duracao": "treino 30 min",
  "formato": "30 s por movimento; circuitos de 3 movimentos x 3 rodadas; 30 s de pausa para água entre circuitos.",
  "blocos": [
   [
    "0:00",
    "Aquecimento (2 rodadas): Chest opener jack, Jack uppercut, 1-2-3 touch the knee, Cross jack, High knee jab · pausa ~5:00 (só respirar e alongar)"
   ],
   [
    "~5:30",
    "Circuito 1 (3 rodadas): High jump cross (dir / esq / lado a lado), Squat + lunge (dir / esq / alternado), Push-up + punch · pausa ~10:00"
   ],
   [
    "~10:30",
    "Circuito 2 (3 rodadas): Squat jabs (punch punch squat), 5 in & outs + 5 pike ups, Hurdle drill (no comando \"go\"; na 3ª, fast hurdles no seu ritmo) · pausa ~15:00"
   ],
   [
    "~15:30",
    "Circuito 3 (3 rodadas): Hop hop runner (dir / esq), Power push (power jump + squat + push-up), Switch kick punch · pausa ~20:00 (19 min = mais da metade)"
   ],
   [
    "~20:30",
    "Circuito 4 (3 rodadas): Free runner adductor (dir / esq / dir+esq), Ski abs + power knee, Squat oblique knee · pausa ~25:00"
   ],
   [
    "~25:30",
    "Circuito 5 (3 rodadas): Burpee lunge (dir / esq / alternado), Speed hit the floor, Cross jack jab (\"max out\" nos últimos 30 s) · fim ~30:00 · desaquecimento ~3 min"
   ]
  ]
 },
 "tabata-strength": {
  "duracao": "treino 30 min",
  "formato": "Tabata — 20 s forte / 10 s de pausa (trote ou posição da criança); cada movimento 2 vezes; um movimento de recuperação entre os blocos. Tempos estimados (marca no vídeo: ~10 min nos diamond push-ups).",
  "blocos": [
   [
    "0:00",
    "Aquecimento (2 rodadas): Overhead jack, Scissor chest opener, Side-to-side lunge (touch the floor), Downward dog + spider lunge · pausa"
   ],
   [
    "~4:30",
    "Bloco 1 · pernas/pliometria: Diamond jump + single-leg burpee (dir / esq), Diamond jump + burpee (2x), Straight diamond jumps (2x), Plié squat out & in (2x) · recuperação: High knee abs"
   ],
   [
    "~8:30",
    "Bloco 2 · peito e tríceps: Alternating wide push-up (2x), Diamond push-up (2x), Low diamond hold (2x), Child's pose to low diamond (2x) · recuperação: Jack jab"
   ],
   [
    "~13:30",
    "Bloco 3 · pernas: Alternating plyo lunges (2x), Plyo power knee (dir / esq), Power knee lunge (dir / esq), Power knee um lado com barriga na coxa (2x) · recuperação: Straight arm jack"
   ],
   [
    "~18:30",
    "Bloco 4 · ombros: V push-up 4 desce / 4 sobe (2x), Single V push-up (2x), V hold baixo (2x), Wide pike ups (2x) · recuperação: Mummy kicks"
   ],
   [
    "~23:00",
    "Bloco 5 · peito e core: Scissor push-up (dir / esq), Knee tap push-up (2x), Toe tap push-up (2x), Alternating toe taps rápidos (2x) · recuperação: 2 and 2 power strike"
   ],
   [
    "~27:00",
    "Desafio final (30 s cada, sem pausa): Diamond jump burpee, Alternating wide push-up, Hit the floor + high knee, Push-ups, Static chair squat com pulso (\"max out\") · desaquecimento ~3 min"
   ]
  ]
 },
 "friday-fight-1": {
  "duracao": "treino 30 min",
  "formato": "movimentos de ~1 min seguidos, sem circuito repetido (lados trocam na metade); só 2 pausas para água (~15 min e ~26 min). \"Mente contra corpo\".",
  "blocos": [
   [
    "0:00",
    "Aquecimento (2 rodadas): Chest opener jack, Jack uppercut, 1-2-3 touch the knee, Jump rope, High knee jab"
   ],
   [
    "~5:00",
    "Bloco 1: Hop hop runner, Plyo power knee (dir / esq), Switch kick punch, Wide in & out abs + knee tap, Medicine ball twist (~10 min), High jump cross jab, Speed in & out abs, Stair jack, 4 jabs + 4 high knees, Tricep dip reach · pausa ~15:00"
   ],
   [
    "~15:30",
    "Bloco 2: Speed hit the floor, 2 jabs + 2 tuck jumps, Burpee + alternating lunge, Ab attack — squat + knee (dir / esq), Wide pike up, 10 and 2, Squat kick straight leg (dir / esq), X jump + X plank, Alternating toe taps, Diamond push-up com joelhos · pausa ~26:00"
   ],
   [
    "~26:30",
    "Últimos 4 min: Split lunge punch, Plank punches, Lateral squat jab, Punching abs (\"max out\" ~30:00) · desaquecimento ~3 min"
   ]
  ]
 },
 "pulse": {
  "duracao": "treino ~20 min, recuperação",
  "formato": "baixo impacto, sem saltos; ~45-60 s por movimento, sempre um exercício de \"pulso\" (isometria com pequenas repetições) seguido de um alongamento. Foco em forma, não em intensidade. Sem Max Out.",
  "blocos": [
   [
    "0:00",
    "Aquecimento: Chest opener + knee lift, Chest opener + lunge back/forward, Side-to-side lunge (mão no joelho), Downward dog + spider up"
   ],
   [
    "~4:00",
    "Pernas: Squat + pencil (chute alternado), alongamento de posterior · Lunge pulse com joelho perto do chão (dir / esq), quad stretch alternado · Runner stance pulse em uma perna (dir / esq), hip opener · Plié squat pulse com braços abertos, flat back toe touch"
   ],
   [
    "~11:00",
    "Core e superior: Plank reach + palm over butt, child's pose → cobra → downward dog · Plank walk + shoulder tap, chest opener ajoelhado · Squat walk-out (inchworm) + elbows together/chest fly · Plank reciprocating knee, downward dog → plank"
   ],
   [
    "~16:00",
    "Chão: Switch kick punch lento, Seated round down + extension, Backstroke (remada de costas), alongamento de braços, Tabletop (braço e perna opostos/mesmo lado) · child's pose final"
   ]
  ]
 },
 "max-out-cardio": {
  "duracao": "treino 30 min, mês 2",
  "formato": "circuitos de 2 movimentos de 30 s x 3 rodadas + 1 \"power move\" de 1 min no fim; 30 s de pausa para água entre circuitos. Teste de resistência.",
  "blocos": [
   [
    "0:00",
    "Aquecimento (3 rodadas): Medicine ball twist, 1-2-3 soccer juggle, Hop hop runner · power move: Plank jack + front raise (1 min) · pausa ~5:00"
   ],
   [
    "~5:30",
    "Circuito 1 (3 rodadas): Balance kick back (dir / esq / 15 s cada), Speed in & out abs, Low plank side punches · power move: Genie tuck jumps no comando (1 min) · pausa ~11:00"
   ],
   [
    "~11:30",
    "Circuito 2 (3 rodadas): Low/high switch kick, Plank to squat, Flat back jack · power move: 8 jabs + 2 diamond jumps (1 min) · pausa ~17:00"
   ],
   [
    "~17:30",
    "Circuito 3 (3 rodadas): 10 and 2 punch, Side-to-side floor hops, Lunge punch kick (dir / esq) · power move: Basketball — dribble + jump (1 min) · pausa ~23:00"
   ],
   [
    "~23:30",
    "Circuito 4 (3 rodadas): High knee oblique abs, Sprint + fast jack, Pike up + oblique knee push-up (dir / esq / alternado) · power move: High jump clap under knee, depois \"attack\" em roda até o fim (~30:00) · desaquecimento ~3 min"
   ]
  ]
 },
 "max-out-power": {
  "duracao": "treino 30 min, mês 2",
  "formato": "45 s de exercício / 15 s de pausa (trote ou posição da criança); blocos de 5 exercícios separados por pausa para água. Marca no vídeo: ~14 min nos step-out push-ups.",
  "blocos": [
   [
    "0:00",
    "Aquecimento: Alternating knee lift, Jog, Medicine ball twist, Mummy kick, Lunge + kick (dir / esq), Slap back jack, Side-to-side high knee · pausa ~5:00"
   ],
   [
    "~5:30",
    "Bloco 1 · pernas (squat/slap back jack): Forward-back slap back jack, Side-to-side slap back jack, Forward-back no comando \"go\", Pulse squat + jump (frente/trás), Low squat pulse, Squat hold arrastando os pés · pausa ~11:00"
   ],
   [
    "~11:30",
    "Bloco 2 · push-ups: Plyo push-up (pés e mãos abrem/fecham), Push-up jack só com braços, Pop push-up, Step-out push-up, Plyo push-up com joelhos, Push-up 4 desce / 4 sobe · pausa ~18:00"
   ],
   [
    "~18:30",
    "Bloco 3 · ombros e core: Pike up, Push-up + reach forward, Low plank pike up (mãos entrelaçadas), Abs ski, X jump abs, Backstroke · pausa ~24:30"
   ],
   [
    "~25:00",
    "Bloco 4 · pernas: Burpee lunge, Squat + lunge, Frog jump frente/trás + burpee, Lunge pulse (dir / esq), Wide burpee jump suicide, Iron legs — lunge, lunge, squat, crisscross (\"max out\" ~30:00) · desaquecimento ~3 min"
   ]
  ]
 },
 "max-out-sweat": {
  "duracao": "treino 30 min, mês 2",
  "formato": "circuitos de 3 movimentos de 30 s x 3 rodadas + \"power move\" de 1 min; 30 s de pausa para água entre circuitos. O próprio Shaun T diz que é o mais difícil.",
  "blocos": [
   [
    "0:00",
    "Aquecimento (3 rodadas): Low switch kick punch, Hop hop knee, 1-2-3 clap under the knee · power move: Speed in & out abs (1 min) · pausa ~5:30"
   ],
   [
    "~6:00",
    "Circuito 1 (3 rodadas): Plyo hook lunge (dir / esq / ...), Wide in & out abs + knee tap, Switch kick punch · power move: Hit the floor + tuck jump (1 min) · pausa ~12:00 (marca: 9:30 no meio)"
   ],
   [
    "~12:30",
    "Circuito 2 (3 rodadas): Ab attack — squat + elbow-knee pull (dir / esq), Single-arm punch burpee, Knee + kick (esq / dir) · power move: High knee + switch kick no comando, 4 punches + knee (1 min) · pausa ~18:30"
   ],
   [
    "~19:00",
    "Circuito 3 (3 rodadas): Alternating wide plank / wide in & out abs, Free runner (dir / esq), Moving push-ups (passo lateral) · extra: 360 squat (1 min) · pausa ~24:00 (\"6 minutos para o fim\")"
   ],
   [
    "~24:30",
    "Circuito 4 (3 rodadas): Slalom (squat lateral tocando o chão), Plank jack + shoulder tap, Scissor run + X jump · power move: Power jump + dive push-up, depois sprint no lugar (\"max out\" ~30:00) · desaquecimento ~3 min"
   ]
  ]
 },
 "max-out-strength": {
  "duracao": "treino 30 min, mês 2",
  "formato": "45 s de exercício / 15 s de pausa (trote ou posição da criança); 4 blocos de 5 exercícios com pausa para água entre eles; força com o peso do corpo.",
  "blocos": [
   [
    "0:00",
    "Aquecimento: High knee pull, Jog, Medicine ball twist, Mummy kick, Lunge + kick (dir / esq), Slap back jack, Heisman, High knee abs"
   ],
   [
    "~5:00",
    "Bloco 1 · pernas: Split plié lunge com braços em cima, Plié squat (pés abrem e fecham), 2 hop squats + 2 lunges, Hop turn lunge (giro), Hop + hip thrust, Squat cruzando os braços (sobe e desce) · pausa ~11:00"
   ],
   [
    "~11:30",
    "Bloco 2 · peito: Push-up jack + shoulder tap, Straight push-up jack, Plank jack + wide push-up, Plank walk + wide push-up, Wide push-up com joelhos, Push-up 8 desce / 8 sobe (joelhos) · pausa ~17:30"
   ],
   [
    "~18:00",
    "Bloco 3 · core: Switch kick em ponte (crab), Crab toe touch alternado, Crab knee tap alternado, Extension + tuck (sentado, calcanhares fora do chão), Tuck jumps, Speed knee deitado · pausa ~24:00"
   ],
   [
    "~24:30",
    "Bloco 4 · tríceps e costas: Tricep push-up jack, Dive push-up, Alternating lat pull-down (em prancha), Low push-up pulse com joelhos, Tricep push-up 8 desce / 8 sobe, Hover plank com joelhos subindo/descendo (\"max out\" ~30:00) · desaquecimento ~3 min"
   ]
  ]
 },
 "friday-fight-2": {
  "duracao": "treino 30 min, mês 2",
  "formato": "movimentos de ~1 min seguidos (lados trocam na metade), sem circuito repetido; só 2 pausas para água. \"Ir além do seu max out\". O próprio Shaun T diz que é o treino mais difícil que já criou.",
  "blocos": [
   [
    "0:00",
    "Aquecimento (2 rodadas): Medicine ball twist, Hop hop knee, Mountain climbing em pé, Speed hit the floor, Plank walk"
   ],
   [
    "~5:00",
    "Bloco 1: Iron legs (lunge, lunge, out, crisscross), Side-to-side floor hops, Scissor X jump + punches, Plank jack + front raise, Alternating hook lunge, Hit the floor + tuck jump, Free runner + squat (dir / esq), Power jump dive (2 walks back), Ski abs, Side-to-side push-ups · pausa ~17:30"
   ],
   [
    "~18:00",
    "Bloco 2: Low/high switch kick, Slap back jump, Plank jack + shoulder tap, Jab + speed bag + back lunge, Plank to squat, Lunge kick + punch (dir / esq), Fast genie tuck jumps, Deep down back up suicide, Arms-straight out & down (abs no chão), Tricep push-up jack · pausa ~27:00"
   ],
   [
    "~27:30",
    "Final: 10 and 2 punch, Plié 8 jabs + diamond jumps, Down punch burpee, High knees em roda (\"max out\" ~30:00) · desaquecimento ~4 min"
   ]
  ]
 },
 "sweat-fest": {
  "duracao": "~35 min (substitui o Sweat Intervals no mês 1)",
  "formato": "30 s por movimento; circuitos de 4 movimentos x 2 rodadas, com 30 s de pausa entre as rodadas.",
  "obs": "este vídeo é no estilo do Insanity original (60 dias), não do MAX:30. Não tem cronômetro de Max Out e tem um alongamento longo depois do aquecimento.",
  "blocos": [
   [
    "0:00",
    "Aquecimento (2 rodadas): Scissor run, 1-2-3 knee up, High knees, Mummy kicks, Heisman · pausa"
   ],
   [
    "~4:30",
    "Alongamento (~4 min): flat back, hip flexor com braço para cima (dir / esq), straight leg stretch, round & release, quad stretch"
   ],
   [
    "~9:00",
    "Circuito 1 (2 rodadas): Switch kicks, Stance jacks, Cross jacks, Level 1 drills (4 push-ups + floor sprint) · pausa"
   ],
   [
    "~14:00",
    "Circuito 2 (2 rodadas): High knee twist, Suicide sprints, Power knee (dir / esq), Suicide jumps · pausa"
   ],
   [
    "~19:30",
    "Circuito 3 (2 rodadas): Power jacks, Floor switch kicks, Push-up jacks, Ski abs · final: Plank punches"
   ]
  ]
 },
 "max-out-15": {
  "duracao": "treino 15 min",
  "formato": "1 min por movimento (lados trocam na metade), sem pausas; o tempo é anunciado (2, 5, 6, 11 min, \"menos de 3 min\").",
  "blocos": [
   [
    "0:00",
    "Power knee (dir / esq) — aquecimento"
   ],
   [
    "~1:00",
    "Low switch kick punch"
   ],
   [
    "~2:00",
    "Speed knee (dir / esq)"
   ],
   [
    "~3:00",
    "Jab + lunge + squat"
   ],
   [
    "~4:00",
    "Speed tap em prancha (dir / esq)"
   ],
   [
    "~5:00",
    "Hop hop runner stance"
   ],
   [
    "~6:00",
    "Hit the floor + tuck jump"
   ],
   [
    "~7:00",
    "Hop uppercut (agachado)"
   ],
   [
    "~8:00",
    "1-2-3 kick"
   ],
   [
    "~9:00",
    "Push-up + spider"
   ],
   [
    "~10:00",
    "High knee jab"
   ],
   [
    "~11:00",
    "Hurdles no comando \"go\""
   ],
   [
    "~12:00",
    "Ab attack + straight leg kick (dir / esq)"
   ],
   [
    "~13:00",
    "X jump + X plank wide"
   ],
   [
    "~14:00",
    "Plank jack até o fim (\"max out\" ~15:00) · desaquecimento ~3 min"
   ]
  ]
 },
 "ab-attack-10": {
  "duracao": "10 min, Ab Maximizer",
  "formato": "~1 min por movimento, sem pausas; o tempo é anunciado (~3 min, \"2 minutos para o fim\").",
  "blocos": [
   [
    "0:00",
    "Seated tuck jumps (sentado, joelhos ao peito)"
   ],
   [
    "~1:00",
    "Low plank side punches"
   ],
   [
    "~2:00",
    "Knee push extension (sentado, calcanhares fora do chão)"
   ],
   [
    "~3:00",
    "Reciprocating knee em low plank (toca os joelhos no chão)"
   ],
   [
    "~4:00",
    "Switch kick ab punches (deitado)"
   ],
   [
    "~5:00",
    "Plank toe taps"
   ],
   [
    "~6:00",
    "Ab sprint (deitado, joelhos alternados rápido)"
   ],
   [
    "~7:00",
    "Tricep push-up extension"
   ],
   [
    "~8:00",
    "Ab attack no chão (joelhos e calcanhares para cima)"
   ],
   [
    "~9:00",
    "Drum beat com os calcanhares para cima, até o fim (\"max out\" ~10:00)"
   ]
  ]
 },
 "max-out-abs": {
  "duracao": "15 min, Ab Maximizer",
  "formato": "~1 min por movimento, sem pausas; cada exercício \"em pé\" é seguido da versão \"no chão\" (\"o que fazemos em cima, fazemos embaixo\").",
  "blocos": [
   [
    "0:00",
    "Mountain climber em pé (lento → rápido) → Rope climb sentado"
   ],
   [
    "~2:00",
    "Sprint em pé (joelhos altos) → Sprinting abs sentado"
   ],
   [
    "~4:00",
    "Fast genie tuck jumps → Genie abs no chão"
   ],
   [
    "~6:00",
    "Slalom (oblíquos) → Ski down abs (prancha, pés saltam de lado)"
   ],
   [
    "~8:00",
    "Speed knee em pé → Speed knee no chão"
   ],
   [
    "~10:00",
    "Ab bank — squat + oblique crunch (dir / esq) → Oblique knee taps em prancha lateral (dir / esq)"
   ],
   [
    "~12:00",
    "Switch kick punch em pé → Switch kick punch no chão"
   ],
   [
    "~14:00",
    "X abs no chão até o fim (\"max out\" ~15:00)"
   ]
  ]
 },
 "360-abs": {
  "duracao": "~15 min, Ab Maximizer",
  "formato": "~1 min por movimento, sem pausas, todo no chão; alterna frente, lados e costas (\"360\"). Marca: 10 min nos stabbing abs.",
  "blocos": [
   [
    "0:00",
    "Speed knee abs (deitado)"
   ],
   [
    "~1:00",
    "Ski down abs sentado (V-sit, pés de um lado ao outro)"
   ],
   [
    "~2:00",
    "Reciprocating pull-downs (de bruços, costas)"
   ],
   [
    "~3:00",
    "Scissor claps (palmas por baixo da perna)"
   ],
   [
    "~4:00",
    "Oblique taps sentado (mão atrás do corpo)"
   ],
   [
    "~5:00",
    "Reverse butterfly (de bruços, costas)"
   ],
   [
    "~6:00",
    "Rope climb com pernas estendidas"
   ],
   [
    "~7:00",
    "Antebraço ao joelho em diagonal (dir / esq)"
   ],
   [
    "~8:00",
    "Diamond elbow raises (de bruços, costas)"
   ],
   [
    "~9:00",
    "Genie abs (joelho / perna estendida)"
   ],
   [
    "~10:00",
    "Stabbing abs (oblíquos, sentado)"
   ],
   [
    "~11:00",
    "Clapping abs em low plank (dir / esq)"
   ],
   [
    "~12:00",
    "L raises — 4 sobe / 4 desce (perna da frente / de trás)"
   ],
   [
    "~13:00",
    "Oblique knee taps em prancha lateral (dir / esq)"
   ],
   [
    "~14:00",
    "Punching abs até o fim (\"max out\" ~15:00)"
   ]
  ]
 }
};
