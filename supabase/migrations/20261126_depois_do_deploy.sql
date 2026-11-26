-- Rodar DEPOIS que o app novo estiver no ar (o app antigo ainda grava esses dados no config do perfil).
-- 1) Copia o que alguém gravou no config entre a migration anterior e o deploy (o que já está em perfil_privado vale mais)
insert into public.perfil_privado (id, dados)
  select id, jsonb_strip_nulls(jsonb_build_object('perfil', config->'perfil', 'medidas', config->'medidas', 'nutri', config->'nutri'))
  from public.perfis where config ?| array['perfil', 'medidas', 'nutri']
on conflict (id) do update set dados = excluded.dados || public.perfil_privado.dados;
-- 2) Tira peso, altura, idade, medidas e nutrição do config, que os amigos do grupo leem
update public.perfis set config = config - 'perfil' - 'medidas' - 'nutri'
  where config ?| array['perfil', 'medidas', 'nutri'];
-- 3) Depois disto, aplicar a trava dos treinos: 20261126_integridade_treinos.sql
