// O pedido de aula experimental: confere nome e WhatsApp, monta a mensagem e abre a conversa no WhatsApp da academia
// (src/config.js). Sem número configurado (a demo), só mostra o estado de pedido anotado.
import { CONFIG } from '../config.js';

const soNumeros = (v) => v.replace(/\D/g, '').slice(0, 11);
function mascara(v) {
  const n = soNumeros(v);
  if (n.length < 3) return n.length ? `(${n}` : '';
  if (n.length < 7) return `(${n.slice(0, 2)}) ${n.slice(2)}`;
  if (n.length < 11) return `(${n.slice(0, 2)}) ${n.slice(2, 6)}-${n.slice(6)}`;
  return `(${n.slice(0, 2)}) ${n.slice(2, 7)}-${n.slice(7)}`;
}

export function contato() {
  const form = document.querySelector('.pedido');
  if (!form) return;
  const nome = form.elements.nome, zap = form.elements.whatsapp;
  const feito = form.querySelector('.pedido__feito');
  const campos = form.querySelector('.pedido__campos');
  let plano = '';

  // o botão de um plano leva para cá e o plano entra na mensagem
  document.addEventListener('click', (e) => { const b = e.target.closest('[data-plano]'); if (b) plano = b.dataset.plano; });

  const erro = (campo, texto) => {
    const caixa = campo.closest('.campo');
    caixa.classList.toggle('is-erro', !!texto);
    if (texto) caixa.querySelector('.campo__erro').textContent = texto;
    campo.setAttribute('aria-invalid', texto ? 'true' : 'false');
    return !texto;
  };
  const confereNome = () => erro(nome, nome.value.trim().length < 2 ? 'Escreva o seu nome.' : '');
  const confereZap = () => erro(zap, soNumeros(zap.value).length < 10 ? 'Coloque o número com o DDD.' : '');

  zap.addEventListener('input', () => { zap.value = mascara(zap.value); if (zap.closest('.is-erro')) confereZap(); });
  nome.addEventListener('input', () => { if (nome.closest('.is-erro')) confereNome(); });
  nome.addEventListener('blur', () => { if (nome.value) confereNome(); });
  zap.addEventListener('blur', () => { if (zap.value) confereZap(); });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const okNome = confereNome(), okZap = confereZap();
    if (!okNome) { nome.focus(); return; }
    if (!okZap) { zap.focus(); return; }
    const d = new FormData(form);
    const texto = `Oi! Quero agendar uma aula experimental de ${d.get('modalidade')}, de preferência no período da ${String(d.get('periodo')).toLowerCase()}.`
      + `${plano ? ` Tenho interesse no plano ${plano}.` : ''} Meu nome é ${nome.value.trim()} e o meu WhatsApp é ${zap.value}.`;
    if (CONFIG.whatsapp) window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(texto)}`, '_blank', 'noopener');
    form.classList.add('is-feito');
    campos.inert = true;
    feito.setAttribute('aria-hidden', 'false');
  });
  form.querySelector('.pedido__de-novo').addEventListener('click', () => {
    form.classList.remove('is-feito');
    campos.inert = false;
    feito.setAttribute('aria-hidden', 'true');
    nome.focus({ preventScroll: true });
  });
}
