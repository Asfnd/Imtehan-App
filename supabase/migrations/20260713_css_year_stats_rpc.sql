-- Aggregate year/paper counts for a CSS subject without shipping row payloads (egress fix).
CREATE OR REPLACE FUNCTION public.get_enhanced_css_year_stats(p_subject text)
RETURNS TABLE (
  year integer,
  paper_type text,
  question_count bigint
)
LANGUAGE plpgsql
STABLE
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT
    m.year,
    m.paper_type,
    COUNT(*)::bigint AS question_count
  FROM public.css_mcqs_enhanced m
  WHERE m.subject = p_subject
    AND m.year IS NOT NULL
  GROUP BY m.year, m.paper_type
  ORDER BY m.year DESC, m.paper_type NULLS FIRST;
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_enhanced_css_year_stats(text) TO public;
GRANT EXECUTE ON FUNCTION public.get_enhanced_css_year_stats(text) TO anon;
GRANT EXECUTE ON FUNCTION public.get_enhanced_css_year_stats(text) TO authenticated;
