-- ============================================================
-- Fix security_definer_view and rls_disabled_in_public errors
-- Migration: 030_fix_rls_and_view_security
-- ============================================================

-- ============================================================
-- FIX 1: user_performance_summary view — SECURITY DEFINER
--
-- Views in Postgres run with the view owner's privileges by
-- default (security definer semantics), bypassing the caller's
-- RLS. Adding security_invoker = true makes the view respect
-- the querying user's permissions and RLS policies, so each
-- user only sees their own rows from user_mcq_progress.
-- ============================================================
DO $$ BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.views
    WHERE table_schema = 'public'
    AND table_name = 'user_performance_summary'
  ) THEN
    DROP VIEW public.user_performance_summary;
  END IF;
END $$;

CREATE OR REPLACE VIEW public.user_performance_summary
WITH (security_invoker = true)
AS
SELECT
    user_id,
    COUNT(*) AS total_attempted,
    SUM(CASE WHEN is_correct THEN 1 ELSE 0 END) AS correct_answers,
    ROUND(100.0 * SUM(CASE WHEN is_correct THEN 1 ELSE 0 END) / COUNT(*), 2) AS accuracy_percentage,
    AVG(time_taken) AS avg_time_per_question
FROM public.user_mcq_progress
GROUP BY user_id;

-- ============================================================
-- FIX 2: Enable RLS on public MCQ tables
--
-- These tables contain read-only educational content (quiz
-- questions). Enable RLS and grant public SELECT access.
-- No write policies — all inserts are done via service role.
-- ============================================================

-- everyday_science
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'everyday_science') THEN
    ALTER TABLE public.everyday_science ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Public read access" ON public.everyday_science;
    CREATE POLICY "Public read access" ON public.everyday_science FOR SELECT TO public USING (true);
  END IF;
END $$;

-- pakistan_studies
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'pakistan_studies') THEN
    ALTER TABLE public.pakistan_studies ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Public read access" ON public.pakistan_studies;
    CREATE POLICY "Public read access" ON public.pakistan_studies FOR SELECT TO public USING (true);
  END IF;
END $$;

-- general_knowledge
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'general_knowledge') THEN
    ALTER TABLE public.general_knowledge ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Public read access" ON public.general_knowledge;
    CREATE POLICY "Public read access" ON public.general_knowledge FOR SELECT TO public USING (true);
  END IF;
END $$;

-- current_affairs
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'current_affairs') THEN
    ALTER TABLE public.current_affairs ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Public read access" ON public.current_affairs;
    CREATE POLICY "Public read access" ON public.current_affairs FOR SELECT TO public USING (true);
  END IF;
END $$;

-- basic_computer
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'basic_computer') THEN
    ALTER TABLE public.basic_computer ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Public read access" ON public.basic_computer;
    CREATE POLICY "Public read access" ON public.basic_computer FOR SELECT TO public USING (true);
  END IF;
END $$;

-- general_math
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'general_math') THEN
    ALTER TABLE public.general_math ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Public read access" ON public.general_math;
    CREATE POLICY "Public read access" ON public.general_math FOR SELECT TO public USING (true);
  END IF;
END $$;

-- english
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'english') THEN
    ALTER TABLE public.english ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Public read access" ON public.english;
    CREATE POLICY "Public read access" ON public.english FOR SELECT TO public USING (true);
  END IF;
END $$;

-- urdu
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'urdu') THEN
    ALTER TABLE public.urdu ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Public read access" ON public.urdu;
    CREATE POLICY "Public read access" ON public.urdu FOR SELECT TO public USING (true);
  END IF;
END $$;

-- islamiat
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'islamiat') THEN
    ALTER TABLE public.islamiat ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Public read access" ON public.islamiat;
    CREATE POLICY "Public read access" ON public.islamiat FOR SELECT TO public USING (true);
  END IF;
END $$;

-- geography
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'geography') THEN
    ALTER TABLE public.geography ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Public read access" ON public.geography;
    CREATE POLICY "Public read access" ON public.geography FOR SELECT TO public USING (true);
  END IF;
END $$;

-- ethics_civics
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'ethics_civics') THEN
    ALTER TABLE public.ethics_civics ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Public read access" ON public.ethics_civics;
    CREATE POLICY "Public read access" ON public.ethics_civics FOR SELECT TO public USING (true);
  END IF;
END $$;
