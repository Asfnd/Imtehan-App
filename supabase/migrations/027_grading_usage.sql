-- Persistent daily grading usage tracking for Writing Coach
-- Accessed exclusively via service role key (bypasses RLS)

CREATE TABLE IF NOT EXISTS public.grading_usage (
  key         TEXT        PRIMARY KEY,              -- 'anon:{ip}' | 'user:{uuid}'
  count       INTEGER     NOT NULL DEFAULT 0,       -- gradings used today
  reset_date  DATE        NOT NULL DEFAULT CURRENT_DATE,
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Deny all access via anon/authenticated keys — only service role can touch this
ALTER TABLE public.grading_usage ENABLE ROW LEVEL SECURITY;

-- No permissive policies → effective deny-by-default for all non-service-role access

COMMENT ON TABLE public.grading_usage IS
  'Daily grading usage counters for Writing Coach rate limiting. '
  'Reset per reset_date. Accessed only via service role key.';
