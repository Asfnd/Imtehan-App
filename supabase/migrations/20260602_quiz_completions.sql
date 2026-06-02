-- Per-card quiz completion for the green "completed" badge.
-- Keyed by (user_id, scope, item) to mirror the localStorage completion store,
-- so signed-in progress syncs across devices. Stores the best score% seen.
create table if not exists public.quiz_completions (
  user_id    uuid        not null references auth.users(id) on delete cascade,
  scope      text        not null,
  item       text        not null,
  score_pct  smallint    not null default 0,
  updated_at timestamptz not null default now(),
  primary key (user_id, scope, item)
);

alter table public.quiz_completions enable row level security;

create policy "quiz_completions_select_own" on public.quiz_completions
  for select using (auth.uid() = user_id);
create policy "quiz_completions_insert_own" on public.quiz_completions
  for insert with check (auth.uid() = user_id);
create policy "quiz_completions_update_own" on public.quiz_completions
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "quiz_completions_delete_own" on public.quiz_completions
  for delete using (auth.uid() = user_id);

-- Upsert keeping the best score. Uses auth.uid() so the client never passes user_id.
create or replace function public.mark_completion(p_scope text, p_item text, p_score int)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null then
    return;
  end if;
  insert into public.quiz_completions (user_id, scope, item, score_pct, updated_at)
  values (auth.uid(), p_scope, p_item, greatest(0, least(100, p_score)), now())
  on conflict (user_id, scope, item)
  do update set score_pct  = greatest(public.quiz_completions.score_pct, excluded.score_pct),
                updated_at = now();
end;
$$;

-- Only signed-in users may record completions.
revoke execute on function public.mark_completion(text, text, int) from public;
revoke execute on function public.mark_completion(text, text, int) from anon;
grant  execute on function public.mark_completion(text, text, int) to authenticated;
