-- Incursões: chefes da Arena enfrentados em grupo (aberta: quem quiser do grupo contribui) ou em dupla, por 3 a 7 dias.
-- A vida do chefe é a meta coletiva; cada participante tem uma linha com o que somou (auto = vindo dos treinos, manual = lançado).
create table if not exists public.incursoes (
  id uuid primary key default gen_random_uuid(),
  grupo_id uuid not null references public.grupos(id) on delete cascade,
  chefe text not null check (chefe ~ '^[a-z-]{2,30}$'),
  modo text not null check (modo in ('grupo', 'dupla')),
  dupla uuid references public.perfis(id) on delete set null,
  hp numeric not null check (hp > 0 and hp <= 100000),
  inicio date not null,
  fim date not null check (fim >= inicio and fim <= inicio + 7),
  criado_por uuid not null default auth.uid() references public.perfis(id) on delete cascade,
  criado_em timestamptz not null default now()
);
create index if not exists incursoes_grupo on public.incursoes (grupo_id, fim desc);

create table if not exists public.incursao_golpes (
  incursao_id uuid not null references public.incursoes(id) on delete cascade,
  usuario_id uuid not null default auth.uid() references public.perfis(id) on delete cascade,
  auto numeric not null default 0 check (auto >= 0 and auto <= 100000),
  manual numeric not null default 0 check (manual >= 0 and manual <= 100000),
  atualizado_em timestamptz not null default now(),
  primary key (incursao_id, usuario_id)
);

alter table public.incursoes enable row level security;
alter table public.incursao_golpes enable row level security;

drop policy if exists "incursoes: vejo as dos meus grupos" on public.incursoes;
create policy "incursoes: vejo as dos meus grupos" on public.incursoes for select to authenticated
  using (grupo_id in (select privado.meus_grupos()));
drop policy if exists "incursoes: membro lança" on public.incursoes;
create policy "incursoes: membro lança" on public.incursoes for insert to authenticated
  with check (criado_por = (select auth.uid()) and grupo_id in (select privado.meus_grupos())
    and (dupla is null or dupla in (select m.usuario_id from public.membros m where m.grupo_id = incursoes.grupo_id)));
drop policy if exists "incursoes: quem lançou apaga" on public.incursoes;
create policy "incursoes: quem lançou apaga" on public.incursoes for delete to authenticated
  using (criado_por = (select auth.uid()) or grupo_id in (select g.id from public.grupos g where g.dono = (select auth.uid())));

drop policy if exists "golpes: vejo os dos meus grupos" on public.incursao_golpes;
create policy "golpes: vejo os dos meus grupos" on public.incursao_golpes for select to authenticated
  using (incursao_id in (select i.id from public.incursoes i where i.grupo_id in (select privado.meus_grupos())));
-- Só golpeia quem pode (grupo: qualquer membro; dupla: os dois) e só enquanto a incursão está aberta (com 1 dia de folga para sincronizar)
drop policy if exists "golpes: lanço o meu" on public.incursao_golpes;
create policy "golpes: lanço o meu" on public.incursao_golpes for insert to authenticated
  with check (usuario_id = (select auth.uid()) and incursao_id in (select i.id from public.incursoes i
    where i.grupo_id in (select privado.meus_grupos()) and current_date <= i.fim + 1
      and (i.modo = 'grupo' or (select auth.uid()) in (i.criado_por, i.dupla))));
drop policy if exists "golpes: atualizo o meu" on public.incursao_golpes;
create policy "golpes: atualizo o meu" on public.incursao_golpes for update to authenticated
  using (usuario_id = (select auth.uid()))
  with check (usuario_id = (select auth.uid()) and incursao_id in (select i.id from public.incursoes i
    where i.grupo_id in (select privado.meus_grupos()) and current_date <= i.fim + 1
      and (i.modo = 'grupo' or (select auth.uid()) in (i.criado_por, i.dupla))));
