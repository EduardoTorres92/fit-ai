// Marcos: textos e títulos entram por tempo (transição de CSS), quando chegam à tela. Nada aqui é preso à rolagem:
// quem rola depressa vê a mesma entrada, só que mais cedo. O que já ficou para cima entra direto, para a volta não
// mostrar nada escondido.
export function marcos() {
  const alvos = [...document.querySelectorAll('.marco, :is(h1, h2):has(.sobe)')];
  const io = new IntersectionObserver((entradas) => {
    for (const e of entradas) {
      if (!e.isIntersecting && e.boundingClientRect.top >= 0) continue;
      e.target.classList.add('is-visto');
      io.unobserve(e.target);
    }
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });
  return {
    /** começa a observar (depois das fontes, para o hero entrar já com a letra certa) */
    ligar() {
      for (const a of alvos) {
        // o que já está na primeira tela entra na hora (o pé do hero fica abaixo da margem do observador)
        if (a.getBoundingClientRect().top < innerHeight) a.classList.add('is-visto');
        else io.observe(a);
      }
    },
  };
}
