-- ============================================================
-- Security fixes for overly-permissive RLS policies
-- Migration: 028_security_fixes
-- ============================================================

-- FIX 1: blog_claps — DELETE policy used USING (true), meaning any
-- anonymous or authenticated user could delete ANY clap, not just their own.
-- Clap cleanup is handled by service role only.
DROP POLICY IF EXISTS "Anyone can delete their clap" ON public.blog_claps;

-- FIX 2: newsletter_subscribers — SELECT policy allowed every authenticated
-- user to read all subscriber email addresses. This exposes a full email list
-- to any logged-in user. Subscriber data should only be accessible via
-- service role (admin dashboard / scripts).
DROP POLICY IF EXISTS "Only authenticated users can view subscribers" ON public.newsletter_subscribers;

-- FIX 3: newsletter_subscribers — UPDATE policy allowed every authenticated
-- user to update any subscriber record (e.g., mark others as unsubscribed).
-- Updates are now handled via service role only through server-side API.
DROP POLICY IF EXISTS "Authenticated users can update subscribers" ON public.newsletter_subscribers;

-- FIX 4: css_mcqs — INSERT policy allowed any authenticated user to insert
-- MCQ rows. MCQ data is managed exclusively via the Supabase dashboard and
-- service-role import scripts. Authenticated INSERT is removed.
DROP POLICY IF EXISTS "Authenticated users can insert CSS MCQs" ON public.css_mcqs;

-- Verify remaining policies are correct
-- blog_claps: SELECT (public), INSERT (public with unique constraint)
-- newsletter_subscribers: INSERT only (public, server-validated)
-- css_mcqs: SELECT only (public)
