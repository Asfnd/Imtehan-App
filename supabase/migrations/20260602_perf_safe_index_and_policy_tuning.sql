-- Safe storage/performance wins from the Supabase performance advisor.

-- 1. Covering indexes for unindexed foreign keys (speeds joins + cascade deletes).
create index if not exists idx_community_reactions_user_id on public.community_reactions (user_id);
create index if not exists idx_question_reports_user_id     on public.question_reports (user_id);
create index if not exists idx_quiz_history_quiz_id          on public.quiz_history (quiz_id);

-- 2. Drop duplicate indexes on subject_performance (identical defs — storage + write win).
drop index if exists public.idx_subject_perf_user;   -- dup of idx_subject_performance_user_id (user_id)
drop index if exists public.idx_subject_perf_score;  -- dup of idx_subject_performance_avg_score (user_id, average_score)

-- 3. Evaluate auth.uid() once per query (not per row) in the quiz_completions policies.
drop policy if exists "quiz_completions_select_own" on public.quiz_completions;
drop policy if exists "quiz_completions_insert_own" on public.quiz_completions;
drop policy if exists "quiz_completions_update_own" on public.quiz_completions;
drop policy if exists "quiz_completions_delete_own" on public.quiz_completions;

create policy "quiz_completions_select_own" on public.quiz_completions
  for select using ((select auth.uid()) = user_id);
create policy "quiz_completions_insert_own" on public.quiz_completions
  for insert with check ((select auth.uid()) = user_id);
create policy "quiz_completions_update_own" on public.quiz_completions
  for update using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "quiz_completions_delete_own" on public.quiz_completions
  for delete using ((select auth.uid()) = user_id);
