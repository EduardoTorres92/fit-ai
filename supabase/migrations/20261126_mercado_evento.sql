-- Mercado do Vilarejo: o clique em "Ver oferta" vira um evento (para ver quais itens interessam).
-- O inventário (Arsenal) não precisa de tabela: fica no config do perfil, como a ficha e o álbum.
alter table public.eventos drop constraint if exists eventos_nome_check;
alter table public.eventos add constraint eventos_nome_check
  check (nome in ('abriu', 'quiz_inicio', 'quiz_fim', 'coach', 'missao', 'recruta_dia', 'desafio_grupo', 'mercado'));

-- O card do equipamento no treino anota 'mercado_treino' (sem isso, o evento falha e fica na fila do aparelho para sempre)
alter table public.eventos drop constraint if exists eventos_nome_check;
alter table public.eventos add constraint eventos_nome_check
  check (nome in ('abriu', 'quiz_inicio', 'quiz_fim', 'coach', 'missao', 'recruta_dia', 'desafio_grupo', 'mercado', 'mercado_treino'));
