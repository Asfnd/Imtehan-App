-- Remove internal MCQ pipeline/audit tables only (not live subject MCQ tables).
-- Saves ~132 MB on free tier. Used only by admin pipeline UI.

DROP TABLE IF EXISTS public.mcq_archive;
DROP TABLE IF EXISTS public.mcq_verification;
DROP TABLE IF EXISTS public.mcq_dedupe_map;
DROP TABLE IF EXISTS public._quarantine_offdomain_20260601;
