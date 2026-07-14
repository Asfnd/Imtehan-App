-- Aggregate topic counts without shipping row payloads (free-tier egress).
CREATE OR REPLACE FUNCTION public.get_bank_topic_counts(p_table text)
RETURNS TABLE (topic text, question_count bigint)
LANGUAGE plpgsql
STABLE
SET search_path = public
AS $$
BEGIN
  IF p_table NOT IN (
    'mdcat_biology',
    'mdcat_chemistry',
    'mdcat_physics',
    'mdcat_english',
    'mdcat_logical_reasoning'
  ) THEN
    RAISE EXCEPTION 'invalid table for topic counts: %', p_table;
  END IF;

  RETURN QUERY EXECUTE format(
    'SELECT topic::text, COUNT(*)::bigint
     FROM %I
     WHERE topic IS NOT NULL AND btrim(topic::text) <> ''''
     GROUP BY topic
     ORDER BY COUNT(*) DESC',
    p_table
  );
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_bank_topic_counts(text) TO public;
GRANT EXECUTE ON FUNCTION public.get_bank_topic_counts(text) TO anon;
GRANT EXECUTE ON FUNCTION public.get_bank_topic_counts(text) TO authenticated;
