-- Clãs: juntam gente do mesmo esporte vinda de guildas diferentes.
-- Cada pessoa fica em um clã só (troca a cada 30 dias). Quem divide clã vê o perfil completo (como na guilda),
-- tem um mural próprio e um chefe semanal que o clã inteiro ataca.
create table if not exists public.cla_membros (
  usuario_id uuid primary key references public.perfis(id) on delete cascade,
  cla text not null check (cla in ('insanity', 'calistenia', 'hipertrofia', 'corrida', 'cross')),
  desde timestamptz not null default now()
);
alter table public.cla_membros enable row level security;

create or replace function privado.meu_cla() returns text language sql stable security definer set search_path = '' as $$
  select cla from public.cla_membros where usuario_id = auth.uid()
$$;

-- Troca de clã: no mínimo 30 dias depois de entrar
create or replace function privado.cla_troca() returns trigger language plpgsql security definer set search_path = '' as $$
begin
  if new.cla is distinct from old.cla then
    if old.desde > now() - interval '30 days' then raise exception 'troca de clã só depois de 30 dias'; end if;
    new.desde := now();
  else new.desde := old.desde; end if;
  new.usuario_id := old.usuario_id;
  return new;
end $$;
drop trigger if exists cla_troca on public.cla_membros;
create trigger cla_troca before update on public.cla_membros for each row execute function privado.cla_troca();

create policy "cla: vejo o meu clã" on public.cla_membros for select to authenticated
  using (usuario_id = (select auth.uid()) or cla = (select privado.meu_cla()));
create policy "cla: entro" on public.cla_membros for insert to authenticated with check (usuario_id = (select auth.uid()));
create policy "cla: troco" on public.cla_membros for update to authenticated using (usuario_id = (select auth.uid())) with check (usuario_id = (select auth.uid()));
create policy "cla: saio" on public.cla_membros for delete to authenticated using (usuario_id = (select auth.uid()));

-- Quantas pessoas em cada clã (para a escolha; não mostra quem)
create or replace function public.cla_contagem() returns table (cla text, n bigint) language sql stable security definer set search_path = '' as $$
  select cla, count(*) from public.cla_membros group by cla
$$;
revoke all on function public.cla_contagem() from public, anon;
grant execute on function public.cla_contagem() to authenticated;

-- Perfil, treinos, água e conquistas: quem divide guilda OU clã
create or replace function privado.compartilha_grupo(outro uuid) returns boolean language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.membros a join public.membros b on a.grupo_id = b.grupo_id
    where a.usuario_id = auth.uid() and b.usuario_id = outro
  ) or exists (
    select 1 from public.cla_membros a join public.cla_membros b on a.cla = b.cla
    where a.usuario_id = auth.uid() and b.usuario_id = outro
  )
$$;

-- Mural do clã: post com cla no lugar da guilda (sem foto por enquanto)
alter table public.posts alter column grupo_id drop not null;
alter table public.posts add column if not exists cla text check (cla in ('insanity', 'calistenia', 'hipertrofia', 'corrida', 'cross'));
alter table public.posts add constraint posts_destino_check check ((grupo_id is null) <> (cla is null) and (cla is null or foto is null));
create index if not exists posts_cla_idx on public.posts (cla, criado_em desc) where cla is not null;

create or replace function privado.post_no_meu_grupo(p uuid) returns boolean language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.posts x where x.id = p and (x.grupo_id in (select privado.meus_grupos()) or (x.cla is not null and x.cla = privado.meu_cla())));
$$;

drop policy if exists "posts: do meu grupo" on public.posts;
create policy "posts: do meu grupo ou clã" on public.posts for select to authenticated
  using (grupo_id in (select privado.meus_grupos()) or (cla is not null and cla = (select privado.meu_cla())));
drop policy if exists "posts: posto no meu grupo" on public.posts;
create policy "posts: posto no meu grupo ou clã" on public.posts for insert to authenticated
  with check (usuario_id = (select auth.uid()) and (grupo_id in (select privado.meus_grupos()) or (grupo_id is null and cla = (select privado.meu_cla()))));

-- Chefe do clã: incursão semanal do clã inteiro (uma por clã por semana)
alter table public.incursoes alter column grupo_id drop not null;
alter table public.incursoes add column if not exists cla text check (cla in ('insanity', 'calistenia', 'hipertrofia', 'corrida', 'cross'));
alter table public.incursoes drop constraint if exists incursoes_modo_check;
alter table public.incursoes add constraint incursoes_modo_check check (modo in ('grupo', 'dupla', 'cla'));
alter table public.incursoes add constraint incursoes_destino_check check ((grupo_id is null) <> (cla is null) and ((modo = 'cla') = (cla is not null)));
create unique index if not exists incursoes_cla_semana on public.incursoes (cla, inicio) where cla is not null;

create or replace function privado.incursao_minha(i uuid, lancar boolean) returns boolean language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.incursoes x where x.id = i and (
    (x.grupo_id in (select privado.meus_grupos()) and (not lancar or (current_date <= x.fim + 1 and (x.modo = 'grupo' or auth.uid() in (x.criado_por, x.dupla)))))
    or (x.cla is not null and x.cla = privado.meu_cla() and (not lancar or current_date <= x.fim + 1))
  ));
$$;

drop policy if exists "incursoes: vejo as dos meus grupos" on public.incursoes;
create policy "incursoes: vejo as dos meus grupos e do meu clã" on public.incursoes for select to authenticated
  using (grupo_id in (select privado.meus_grupos()) or (cla is not null and cla = (select privado.meu_cla())));
create policy "incursoes: chefe do meu clã" on public.incursoes for insert to authenticated
  with check (criado_por = (select auth.uid()) and grupo_id is null and modo = 'cla' and cla = (select privado.meu_cla()) and dupla is null);

drop policy if exists "golpes: vejo os dos meus grupos" on public.incursao_golpes;
create policy "golpes: vejo os das minhas incursões" on public.incursao_golpes for select to authenticated using (privado.incursao_minha(incursao_id, false));
drop policy if exists "golpes: lanço o meu" on public.incursao_golpes;
create policy "golpes: lanço o meu" on public.incursao_golpes for insert to authenticated
  with check (usuario_id = (select auth.uid()) and privado.incursao_minha(incursao_id, true));
drop policy if exists "golpes: atualizo o meu" on public.incursao_golpes;
create policy "golpes: atualizo o meu" on public.incursao_golpes for update to authenticated
  using (usuario_id = (select auth.uid())) with check (usuario_id = (select auth.uid()) and privado.incursao_minha(incursao_id, true));
