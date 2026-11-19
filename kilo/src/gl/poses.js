// A pose de descanso de cada forma (graus em x, y, z): o ângulo em que ela fica mais bonita parada.
// A ordem é a de FORMAS em formas.js.
import { quat } from './peca.js';

export const POSES = [
  quat.deEuler(-14, 24, 0),    // anilha: quase de frente, um pouco virada
  quat.deEuler(18, -32, 24),   // halter: em diagonal
  quat.deEuler(-8, 28, -6),    // kettlebell
  quat.deEuler(-6, 24, 5),     // saco de pancada
  quat.deEuler(24, 32, 12),    // bola
  quat.deEuler(-6, -26, 6),    // cadeado
  quat.deEuler(-10, 22, -8),   // cronômetro
];
