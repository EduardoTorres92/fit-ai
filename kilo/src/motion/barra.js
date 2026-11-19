// A barra: ganha o fundo quando a página sai do hero, e o link da seção em que a leitura está fica sublinhado.
export function barra() {
  const el = document.querySelector('.barra');
  const links = [...document.querySelectorAll('.barra__links a[data-secao]')];
  const secoes = links.map((a) => document.getElementById(a.dataset.secao));
  const hero = document.querySelector('.hero');
  let atual = null;
  function olhar() {
    el.classList.toggle('is-solta', scrollY > hero.offsetHeight - 90);
    const linha = scrollY + innerHeight * 0.42;
    let novo = null;
    secoes.forEach((s, i) => { if (s && s.getBoundingClientRect().top + scrollY <= linha) novo = links[i]; });
    if (novo === atual) return;
    atual?.classList.remove('is-atual');
    atual?.removeAttribute('aria-current');
    novo?.classList.add('is-atual');
    novo?.setAttribute('aria-current', 'true');
    atual = novo;
  }
  addEventListener('scroll', olhar, { passive: true });
  addEventListener('resize', olhar);
  olhar();
}
