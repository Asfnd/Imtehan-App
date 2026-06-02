-- Remove redundant duplicate RLS policies (each had an identical twin for the same
-- role+command+expression → "multiple permissive policies" overhead). The kept
-- policy grants identical access.
drop policy if exists "Anyone can read CSS MCQs"   on public.css_mcqs_enhanced;
drop policy if exists "Anyone can read MPT MCQs"    on public.mpt_mcqs;
drop policy if exists "Anyone can read past papers" on public.past_papers;

drop policy if exists "users_insert_own_activity"   on public.daily_activity;
drop policy if exists "users_view_own_activity"     on public.daily_activity;
drop policy if exists "users_update_own_activity"   on public.daily_activity;

drop policy if exists "users_insert_own_perf"       on public.subject_performance;
drop policy if exists "users_view_own_perf"         on public.subject_performance;
drop policy if exists "users_update_own_perf"       on public.subject_performance;

drop policy if exists "users_insert_own_stats"      on public.user_stats;
drop policy if exists "users_view_own_stats"        on public.user_stats;
drop policy if exists "users_update_own_stats"      on public.user_stats;
