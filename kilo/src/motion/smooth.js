// Rolagem suave (Lenis) só na roda e no trackpad. No toque, a rolagem é a nativa do aparelho: o script nunca briga
// com o dedo nem com a inércia do iOS. Com movimento reduzido, não há Lenis. Quem chama lenis.raf é o laço do main.js.
import Lenis from 'lenis';

export const REDUZIDO = matchMedia('(prefers-reduced-motion: reduce)').matches;
export const TOQUE = matchMedia('(hover: none)').matches;

export function criarScroll() {
  if (REDUZIDO) return null;
  return new Lenis({ lerp: 0.11, wheelMultiplier: 1, smoothWheel: true, syncTouch: false, autoRaf: false });
}
