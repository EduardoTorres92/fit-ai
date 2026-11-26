-- Confiança e métricas
-- 1) eventos: o app anota marcos de uso (abriu o app, quiz, Coach, missões, Recruta) para medir ativação e retenção.
--    Cada um grava só os próprios eventos e ninguém lê pela API: só as funções do painel do dono.
-- 2) excluir_minha_conta(): a pessoa apaga a própria conta e tudo que é dela. Grupo que ela criou passa para o membro
--    mais antigo; se ela estava sozinha, o grupo some.
-- 3) perfil_privado: peso, altura, idade, medidas e nutrição saem do config do perfil (que os amigos do grupo leem)
--    e vão para uma tabela que só a própria pessoa lê. Copia o que já existe; a limpeza do config vem depois do deploy.
-- 4) admin_metricas(chave): o painel do dono no Telegram (ativação, 2º treino, retenção, uso do Coach e das missões).

create table if not exists public.eventos (
  id bigint generated always as identity primary key,
  usuario_id uuid not null default auth.uid() references public.perfis(id) on delete cascade,
  nome text not null check (nome in ('abriu', 'quiz_inicio', 'quiz_fim', 'coach', 'missao', 'recruta_dia', 'desafio_grupo')),
  dia date not null default ((now() at time zone 'America/Sao_Paulo')::date),
  dados jsonb check (dados is null or pg_column_size(dados) < 500),
  criado_em timestamptz not null default now(),
  -- eventos guardados enquanto a pessoa estava sem login (o quiz vem antes da conta) chegam depois, com o dia original
  check (dia between ((criado_em at time zone 'America/Sao_Paulo')::date - 30) and ((criado_em at time zone 'America/Sao_Paulo')::date + 1))
);
create index if not exists eventos_usuario_dia on public.eventos (usuario_id, dia);
-- Marcos que só contam uma vez por dia: repetir não duplica
create unique index if not exists eventos_unico_dia on public.eventos (usuario_id, nome, dia) where nome in ('abriu', 'quiz_inicio', 'quiz_fim', 'recruta_dia');

alter table public.eventos enable row level security;
drop policy if exists "eventos: gravo os meus" on public.eventos;
create policy "eventos: gravo os meus" on public.eventos for insert to authenticated
  with check (usuario_id = (select auth.uid()));
revoke all on public.eventos from anon, authenticated;
grant insert on public.eventos to authenticated;

create table if not exists public.perfil_privado (
  id uuid primary key default auth.uid() references public.perfis(id) on delete cascade,
  dados jsonb not null default '{}'::jsonb check (pg_column_size(dados) < 16000),
  atualizado_em timestamptz not null default now()
);
alter table public.perfil_privado enable row level security;
drop policy if exists "privado: só eu leio" on public.perfil_privado;
drop policy if exists "privado: só eu gravo" on public.perfil_privado;
drop policy if exists "privado: só eu edito" on public.perfil_privado;
create policy "privado: só eu leio" on public.perfil_privado for select to authenticated using (id = (select auth.uid()));
create policy "privado: só eu gravo" on public.perfil_privado for insert to authenticated with check (id = (select auth.uid()));
create policy "privado: só eu edito" on public.perfil_privado for update to authenticated using (id = (select auth.uid())) with check (id = (select auth.uid()));
revoke all on public.perfil_privado from anon, authenticated;
grant select, insert, update on public.perfil_privado to authenticated;
insert into public.perfil_privado (id, dados)
  select id, jsonb_strip_nulls(jsonb_build_object('perfil', config->'perfil', 'medidas', config->'medidas', 'nutri', config->'nutri'))
  from public.perfis where config ?| array['perfil', 'medidas', 'nutri']
on conflict (id) do nothing;

-- Desafio do grupo lançado por quem saiu continua valendo para o grupo (antes sumia junto, levando o "feito" de todos)
alter table public.desafios alter column criado_por drop not null;
alter table public.desafios drop constraint if exists desafios_criado_por_fkey;
alter table public.desafios add constraint desafios_criado_por_fkey foreign key (criado_por) references public.perfis(id) on delete set null;

-- Excluir a própria conta
create or replace function public.excluir_minha_conta() returns boolean
language plpgsql security definer set search_path = '' as $$
declare
  eu uuid := auth.uid();
  g record;
  novo uuid;
begin
  if eu is null then raise exception 'login' using errcode = '42501'; end if;
  for g in select id from public.grupos where dono = eu loop
    select usuario_id into novo from public.membros where grupo_id = g.id and usuario_id <> eu order by entrou_em limit 1;
    if novo is null then delete from public.grupos where id = g.id;
    else update public.grupos set dono = novo where id = g.id;
    end if;
  end loop;
  delete from auth.users where id = eu; -- perfis, treinos, água, evolução, posts, conquistas, eventos… vão em cascata
  return true;
end $$;
revoke all on function public.excluir_minha_conta() from public, anon;
grant execute on function public.excluir_minha_conta() to authenticated;

-- Métricas para o painel do dono
create or replace function public.admin_metricas(p_chave text) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare r jsonb; hoje date := (now() at time zone 'America/Sao_Paulo')::date;
begin
  perform private.admin_ok(p_chave);
  with
  cad as (select id, (criado_em at time zone 'America/Sao_Paulo')::date as d0 from public.perfis),
  dias_treino as (select distinct usuario_id, data as d from public.treinos where concluido),
  atividade as (select usuario_id, d from dias_treino union select usuario_id, dia from public.eventos where nome = 'abriu'),
  por_pessoa as (
    select c.id, c.d0,
      (select min(d) from dias_treino t where t.usuario_id = c.id) as t1,
      (select min(d) from dias_treino t where t.usuario_id = c.id and t.d > (select min(d) from dias_treino x where x.usuario_id = c.id)) as t2,
      (select max(d) from atividade a where a.usuario_id = c.id) as ultima
    from cad c)
  select jsonb_build_object(
    'cadastros', (select count(*) from por_pessoa),
    'cadastros_30d', (select count(*) from por_pessoa where d0 > hoje - 30),
    'quiz_inicio', (select count(distinct usuario_id) from public.eventos where nome = 'quiz_inicio'),
    'quiz_fim', (select count(distinct usuario_id) from public.eventos where nome = 'quiz_fim'),
    'ativados', (select count(*) from por_pessoa where t1 is not null),
    'ativados_d1', (select count(*) from por_pessoa where t1 is not null and t1 - d0 <= 1),
    'segundo_treino', (select count(*) from por_pessoa where t2 is not null),
    'dias_ate_2o', (select percentile_cont(0.5) within group (order by t2 - t1) from por_pessoa where t2 is not null),
    'base_d7', (select count(*) from por_pessoa where d0 <= hoje - 7),
    'ret_d7', (select count(*) from por_pessoa p where d0 <= hoje - 7 and exists (select 1 from atividade a where a.usuario_id = p.id and a.d >= p.d0 + 7)),
    'base_d30', (select count(*) from por_pessoa where d0 <= hoje - 30),
    'ret_d30', (select count(*) from por_pessoa p where d0 <= hoje - 30 and exists (select 1 from atividade a where a.usuario_id = p.id and a.d >= p.d0 + 30)),
    'ativos_28d', (select count(distinct usuario_id) from dias_treino where d > hoje - 28),
    'dias_treino_28d', (select count(*) from dias_treino where d > hoje - 28),
    'abriram_7d', (select count(distinct usuario_id) from public.eventos where nome = 'abriu' and dia > hoje - 7),
    'coach_msgs_7d', (select count(*) from public.eventos where nome = 'coach' and dia > hoje - 7),
    'coach_pessoas_7d', (select count(distinct usuario_id) from public.eventos where nome = 'coach' and dia > hoje - 7),
    'missoes_7d', (select count(*) from public.eventos where nome = 'missao' and dia > hoje - 7),
    'recruta_dias_7d', (select count(*) from public.eventos where nome = 'recruta_dia' and dia > hoje - 7),
    'desafios_grupo_7d', (select count(*) from public.desafio_feitos where feito_em > now() - interval '7 days'),
    'sumidos_7d', (select count(*) from por_pessoa where t1 is not null and ultima <= hoje - 7)
  ) into r;
  return r;
end $$;
revoke all on function public.admin_metricas(text) from public;
grant execute on function public.admin_metricas(text) to anon, authenticated;
