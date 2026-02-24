-- ============================================================
-- Fix SECURITY DEFINER functions missing SET search_path
-- Migration: 029_fix_security_definer_search_path
--
-- Without a fixed search_path, SECURITY DEFINER functions are
-- vulnerable to search_path hijacking attacks. Supabase flags
-- all such functions as security warnings.
-- The fix: SET search_path = '' forces fully-qualified names.
-- ============================================================

-- create_user_profile (trigger function — migrations 014 & 017)
DO $$ BEGIN
  ALTER FUNCTION public.create_user_profile() SET search_path = '';
EXCEPTION WHEN undefined_function THEN NULL;
END $$;

-- update_user_usage_updated_at (trigger function — migration 020)
DO $$ BEGIN
  ALTER FUNCTION public.update_user_usage_updated_at() SET search_path = '';
EXCEPTION WHEN undefined_function THEN NULL;
END $$;

-- get_or_create_user_usage (migration 020)
DO $$ BEGIN
  ALTER FUNCTION public.get_or_create_user_usage(UUID) SET search_path = '';
EXCEPTION WHEN undefined_function THEN NULL;
END $$;

-- cleanup_old_login_attempts (migration 015)
DO $$ BEGIN
  ALTER FUNCTION public.cleanup_old_login_attempts() SET search_path = '';
EXCEPTION WHEN undefined_function THEN NULL;
END $$;

-- get_failed_login_count (migration 015)
DO $$ BEGIN
  ALTER FUNCTION public.get_failed_login_count(TEXT, TEXT, INTERVAL) SET search_path = '';
EXCEPTION WHEN undefined_function THEN NULL;
END $$;

-- cleanup_old_security_logs (migration 016)
DO $$ BEGIN
  ALTER FUNCTION public.cleanup_old_security_logs() SET search_path = '';
EXCEPTION WHEN undefined_function THEN NULL;
END $$;

-- log_security_event (migration 016)
DO $$ BEGIN
  ALTER FUNCTION public.log_security_event(TEXT, TEXT, UUID, INET, TEXT, JSONB) SET search_path = '';
EXCEPTION WHEN undefined_function THEN NULL;
END $$;
