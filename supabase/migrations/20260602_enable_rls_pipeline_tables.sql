-- Lock down internal pipeline/archive tables that were publicly readable/writable
-- via the anon key (flagged ERROR by the Supabase security linter). No policies =
-- no anon/authenticated access; the service_role key (admin pipeline page + pipeline
-- scripts) bypasses RLS, so those continue to work.
alter table public.mcq_archive                    enable row level security;
alter table public.mcq_verification               enable row level security;
alter table public.mcq_dedupe_map                 enable row level security;
alter table public.mcq_generation_runs            enable row level security;
alter table public._quarantine_offdomain_20260601 enable row level security;
