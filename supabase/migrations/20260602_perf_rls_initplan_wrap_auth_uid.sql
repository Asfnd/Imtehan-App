-- Wrap bare auth.uid()/auth.role()/auth.jwt()/auth.email() in (select ...) so the
-- planner evaluates them once per query instead of once per row (Supabase
-- auth_rls_initplan). Semantics are identical. Skips already-wrapped expressions.
do $$
declare r record;
declare q text;
declare c text;
declare stmt text;
begin
  for r in
    select schemaname, tablename, policyname, qual, with_check
    from pg_policies
    where schemaname = 'public'
      and (
        (qual is not null       and qual like '%auth.%()%'       and lower(qual)       not like '%select auth%')
        or (with_check is not null and with_check like '%auth.%()%' and lower(with_check) not like '%select auth%')
      )
  loop
    stmt := format('alter policy %I on %I.%I', r.policyname, r.schemaname, r.tablename);

    if r.qual is not null then
      if lower(r.qual) not like '%select auth%' then
        q := r.qual;
        q := replace(q, 'auth.uid()',   '(select auth.uid())');
        q := replace(q, 'auth.role()',  '(select auth.role())');
        q := replace(q, 'auth.jwt()',   '(select auth.jwt())');
        q := replace(q, 'auth.email()', '(select auth.email())');
      else
        q := r.qual;
      end if;
      stmt := stmt || format(' using (%s)', q);
    end if;

    if r.with_check is not null then
      if lower(r.with_check) not like '%select auth%' then
        c := r.with_check;
        c := replace(c, 'auth.uid()',   '(select auth.uid())');
        c := replace(c, 'auth.role()',  '(select auth.role())');
        c := replace(c, 'auth.jwt()',   '(select auth.jwt())');
        c := replace(c, 'auth.email()', '(select auth.email())');
      else
        c := r.with_check;
      end if;
      stmt := stmt || format(' with check (%s)', c);
    end if;

    execute stmt;
  end loop;
end $$;
