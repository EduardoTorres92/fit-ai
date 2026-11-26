-- Integridade dos treinos (base do XP e do ranking)
-- 1) Só dá para lançar ou mudar treino de até 7 dias atrás até amanhã (folga de fuso).
--    Atualizar uma linha antiga sem mudar data nem detalhes continua valendo (sincronização).
-- 2) Números das séries dentro do possível: valor solto ≤ 900 (reps ou segundos), r ≤ 300 reps, kg ≤ 400.
create or replace function privado.treino_integro() returns trigger
language plpgsql set search_path = '' as $$
declare
  hoje date := (now() at time zone 'America/Sao_Paulo')::date;
begin
  if tg_op = 'INSERT' or new.data is distinct from old.data or new.detalhes is distinct from old.detalhes then
    if new.data < hoje - 7 or new.data > hoje + 1 then
      raise exception 'treino fora da janela de 7 dias (%)', new.data using errcode = 'check_violation';
    end if;
  end if;
  if new.detalhes ? 'sets' and (
       jsonb_path_exists(new.detalhes, '$.sets.*[*] ? (@.type() == "number" && (@ > 900 || @ < 0))')
    or jsonb_path_exists(new.detalhes, '$.sets.*[*].r ? (@.type() == "number" && (@ > 300 || @ < 0))')
    or jsonb_path_exists(new.detalhes, '$.sets.*[*].kg ? (@.type() == "number" && (@ > 400 || @ < 0))')
  ) then
    raise exception 'série com número fora do possível' using errcode = 'check_violation';
  end if;
  return new;
end $$;

drop trigger if exists treino_integro on public.treinos;
create trigger treino_integro before insert or update on public.treinos
  for each row execute function privado.treino_integro();
