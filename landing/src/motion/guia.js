// O freio da roda: a página sempre rola presa ao gesto e nunca para sozinha, mas o alvo nunca fica mais que FOLGA
// telas à frente de onde ela está. Com o lerp do Lenis, isso dá um teto de ~2 telas por segundo: um gesto forte não
// atravessa a cena das modalidades sem a peça trocar de forma. No toque, nada muda (o Lenis chama o filtro também nos
// eventos de toque: cancelar o touchend mataria o clique de todo botão no celular).
const FOLGA = 0.34;

export function criarGuia({ lenis }) {
  if (!lenis) return;
  lenis.options.virtualScroll = (data) => {
    if (data.event.type.includes('touch')) return true;
    const { deltaY, event } = data;
    if (event.ctrlKey || !deltaY) return true;
    const alvo = lenis.targetScroll;
    const dir = Math.sign(deltaY);
    const lim = lenis.animatedScroll + dir * FOLGA * innerHeight;
    const novo = dir > 0 ? Math.max(alvo, Math.min(alvo + deltaY, lim)) : Math.min(alvo, Math.max(alvo + deltaY, lim));
    data.deltaY = novo - alvo;
    if (Math.abs(data.deltaY) < 0.5) { if (event.cancelable) event.preventDefault(); return false; }
    return true;
  };
}
