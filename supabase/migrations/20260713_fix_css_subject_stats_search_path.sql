-- Fix subject stats RPC broken by empty search_path (migration 031).
CREATE OR REPLACE FUNCTION public.get_enhanced_css_subject_stats()
RETURNS TABLE (
  subject text,
  question_count bigint,
  years integer[]
)
LANGUAGE plpgsql
STABLE
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT
    m.subject,
    COUNT(*) AS question_count,
    ARRAY_AGG(DISTINCT m.year ORDER BY m.year DESC) FILTER (WHERE m.year IS NOT NULL) AS years
  FROM public.css_mcqs_enhanced m
  GROUP BY m.subject
  ORDER BY m.subject;
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_enhanced_css_subject_stats() TO public;
GRANT EXECUTE ON FUNCTION public.get_enhanced_css_subject_stats() TO anon;
GRANT EXECUTE ON FUNCTION public.get_enhanced_css_subject_stats() TO authenticated;
