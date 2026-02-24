-- ============================================================
-- Security fixes for overly-permissive RLS policies
-- Migration: 028_security_fixes
-- Uses DO blocks so each fix is independent — no failure cascades
-- ============================================================

-- FIX 1: blog_claps — DELETE policy used USING (true), meaning any
-- anonymous or authenticated user could delete ANY clap, not just their own.
DO $$ BEGIN
  DROP POLICY IF EXISTS "Anyone can delete their clap" ON public.blog_claps;
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

-- FIX 2: newsletter_subscribers — SELECT policy exposed all subscriber emails
-- to any logged-in user. Service role only for admin access.
DO $$ BEGIN
  DROP POLICY IF EXISTS "Only authenticated users can view subscribers" ON public.newsletter_subscribers;
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

-- FIX 3: newsletter_subscribers — UPDATE policy allowed any authenticated user
-- to modify any subscriber record. Service role only.
DO $$ BEGIN
  DROP POLICY IF EXISTS "Authenticated users can update subscribers" ON public.newsletter_subscribers;
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

-- FIX 4: css_mcqs — INSERT policy allowed any authenticated user to insert rows.
-- Only drop if table exists (may not exist in all environments).
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'css_mcqs') THEN
    DROP POLICY IF EXISTS "Authenticated users can insert CSS MCQs" ON public.css_mcqs;
  END IF;
END $$;

-- FIX 5: css_mcqs_enhanced — same INSERT policy issue if table exists
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'css_mcqs_enhanced') THEN
    DROP POLICY IF EXISTS "Authenticated users can insert CSS MCQs" ON public.css_mcqs_enhanced;
  END IF;
END $$;
