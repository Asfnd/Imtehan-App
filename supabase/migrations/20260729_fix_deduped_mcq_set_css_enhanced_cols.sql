-- Align get_deduped_mcq_set with css_mcqs_enhanced column names
-- (question_text / explanation_detailed) and drop Law-GAT review padding.

DROP FUNCTION IF EXISTS public.get_deduped_mcq_set(
  text, integer, integer, text, boolean, text, text, text, text, text[], text, text[], text, text, boolean, text[]
);
DROP FUNCTION IF EXISTS public.get_deduped_mcq_set(
  text, integer, integer, text, boolean, text, text, text, text, text[], text, text[], text, text[], text, boolean, text[]
);

CREATE OR REPLACE FUNCTION public.get_deduped_mcq_set(
  p_table text,
  p_set_number integer,
  p_set_size integer DEFAULT 20,
  p_type text DEFAULT NULL,
  p_skip_type_filter boolean DEFAULT false,
  p_subject text DEFAULT NULL,
  p_subtopic text DEFAULT NULL,
  p_target_exam text DEFAULT NULL,
  p_exam_slug text DEFAULT NULL,
  p_exam_slugs text[] DEFAULT NULL,
  p_scope_mode text DEFAULT NULL,
  p_difficulties text[] DEFAULT NULL,
  p_topic text DEFAULT NULL,
  p_topics text[] DEFAULT NULL,
  p_tag text DEFAULT NULL,
  p_use_tags_array boolean DEFAULT false,
  p_question_needles text[] DEFAULT NULL
)
RETURNS TABLE (
  id bigint,
  question text,
  option_a text,
  option_b text,
  option_c text,
  option_d text,
  correct_answer text,
  explanation text
)
LANGUAGE plpgsql
STABLE
SET search_path = public
AS $$
DECLARE
  v_sql text;
  v_where text := 'TRUE';
  v_offset integer;
  v_limit integer;
  v_needle text;
  v_q_expr text;
  v_expl_expr text;
  v_q_filter_col text;
BEGIN
  IF p_table IS NULL OR btrim(p_table) = '' THEN
    RAISE EXCEPTION 'p_table required';
  END IF;

  IF p_table NOT IN (
    'basic_computer',
    'css_mcqs_enhanced',
    'current_affairs',
    'engineering_chemistry',
    'engineering_computer_science',
    'engineering_english',
    'engineering_intelligence',
    'engineering_mathematics',
    'engineering_physics',
    'english',
    'everyday_science',
    'general_knowledge',
    'general_math',
    'geography',
    'islamiat',
    'issb_english',
    'issb_general_knowledge',
    'issb_intelligence',
    'issb_mathematics',
    'issb_pakistan_affairs',
    'mdcat_biology',
    'mdcat_chemistry',
    'mdcat_english',
    'mdcat_logical_reasoning',
    'mdcat_physics',
    'pakistan_studies',
    'pms_current_affairs',
    'pms_english',
    'pms_everyday_science',
    'pms_general_knowledge',
    'pms_general_math',
    'pms_geography',
    'pms_islamiat',
    'pms_pakistan_studies',
    'urdu'
  ) THEN
    RAISE EXCEPTION 'invalid mcq table: %', p_table;
  END IF;

  IF p_set_number IS NULL OR p_set_number < 1 THEN
    RAISE EXCEPTION 'invalid set number: %', p_set_number;
  END IF;

  IF p_set_size IS NULL OR p_set_size < 1 THEN
    p_set_size := 20;
  END IF;

  v_offset := (p_set_number - 1) * p_set_size;
  v_limit := p_set_size;

  IF public._mcq_table_has_col(p_table, 'question') AND public._mcq_table_has_col(p_table, 'question_text') THEN
    v_q_expr := 'COALESCE(t.question::text, t.question_text::text)';
    v_q_filter_col := 'COALESCE(question::text, question_text::text)';
  ELSIF public._mcq_table_has_col(p_table, 'question_text') THEN
    v_q_expr := 't.question_text::text';
    v_q_filter_col := 'question_text::text';
  ELSE
    v_q_expr := 't.question::text';
    v_q_filter_col := 'question::text';
  END IF;

  IF public._mcq_table_has_col(p_table, 'explanation') AND public._mcq_table_has_col(p_table, 'explanation_detailed') THEN
    v_expl_expr := 'COALESCE(t.explanation::text, t.explanation_detailed::text, t.explanation_a::text)';
  ELSIF public._mcq_table_has_col(p_table, 'explanation_detailed') THEN
    v_expl_expr := 'COALESCE(t.explanation_detailed::text, t.explanation_a::text)';
  ELSIF public._mcq_table_has_col(p_table, 'explanation') THEN
    v_expl_expr := 't.explanation::text';
  ELSE
    v_expl_expr := 'NULL::text';
  END IF;

  IF p_subject IS NOT NULL AND public._mcq_table_has_col(p_table, 'subject') THEN
    v_where := v_where || format(' AND subject = %L', p_subject);
  END IF;

  IF p_subtopic IS NOT NULL AND public._mcq_table_has_col(p_table, 'subtopic') THEN
    v_where := v_where || format(' AND subtopic = %L', p_subtopic);
  END IF;

  IF p_type IS NOT NULL
     AND NOT COALESCE(p_skip_type_filter, false)
     AND public._mcq_table_has_col(p_table, 'type') THEN
    v_where := v_where || format(' AND type = %L', p_type);
  END IF;

  IF p_target_exam IS NOT NULL AND public._mcq_table_has_col(p_table, 'target_exam') THEN
    v_where := v_where || format(' AND target_exam = %L', p_target_exam);
  END IF;

  IF public._mcq_table_has_col(p_table, 'target_exams') THEN
    IF p_scope_mode = 'exact' AND p_exam_slug IS NOT NULL THEN
      v_where := v_where || format(' AND target_exams @> ARRAY[%L]::text[]', p_exam_slug);
    ELSIF p_scope_mode = 'family' AND p_exam_slugs IS NOT NULL AND cardinality(p_exam_slugs) > 0 THEN
      v_where := v_where || format(' AND target_exams && %L::text[]', p_exam_slugs);
    END IF;
  END IF;

  IF p_difficulties IS NOT NULL
     AND cardinality(p_difficulties) > 0
     AND public._mcq_table_has_col(p_table, 'difficulty') THEN
    v_where := v_where || format(
      ' AND difficulty = ANY(%L::text[])',
      p_difficulties
    );
  END IF;

  IF p_use_tags_array AND p_tag IS NOT NULL AND public._mcq_table_has_col(p_table, 'tags') THEN
    v_where := v_where || format(' AND tags @> ARRAY[%L]::text[]', p_tag);
  ELSIF p_topics IS NOT NULL
     AND cardinality(p_topics) > 0
     AND public._mcq_table_has_col(p_table, 'topic') THEN
    v_where := v_where || format(' AND topic = ANY(%L::text[])', p_topics);
  ELSIF NOT COALESCE(p_use_tags_array, false) AND p_topic IS NOT NULL AND public._mcq_table_has_col(p_table, 'topic') THEN
    v_where := v_where || format(' AND topic = %L', p_topic);
  ELSIF NOT COALESCE(p_use_tags_array, false) AND p_tag IS NOT NULL AND public._mcq_table_has_col(p_table, 'topic') THEN
    v_where := v_where || format(' AND topic = %L', p_tag);
  END IF;

  v_where := v_where || format(' AND (%s) NOT ILIKE %L', v_q_filter_col, 'Law-GAT review%');

  IF p_question_needles IS NOT NULL AND cardinality(p_question_needles) > 0 THEN
    v_where := v_where || ' AND (';
    FOREACH v_needle IN ARRAY p_question_needles LOOP
      IF v_needle IS NOT NULL AND btrim(v_needle) <> '' THEN
        v_where := v_where || format('(%s) ILIKE %L OR ', v_q_filter_col, '%' || replace(v_needle, '%', '') || '%');
      END IF;
    END LOOP;
    v_where := rtrim(v_where, ' OR ') || ')';
  END IF;

  v_sql := format(
    $q$
    WITH capped AS (
      SELECT
        t.id,
        %s AS question,
        t.option_a::text AS option_a,
        t.option_b::text AS option_b,
        t.option_c::text AS option_c,
        t.option_d::text AS option_d,
        t.correct_answer::text AS correct_answer,
        %s AS explanation
      FROM %I t
      WHERE %s
      ORDER BY t.id
      LIMIT 24000
    ),
    valid AS (
      SELECT *
      FROM capped c
      WHERE length(btrim(coalesce(c.question, ''))) >= 8
        AND btrim(coalesce(c.option_a, '')) <> ''
        AND btrim(coalesce(c.option_b, '')) <> ''
        AND btrim(coalesce(c.option_c, '')) <> ''
        AND btrim(coalesce(c.option_d, '')) <> ''
        AND (
          SELECT count(DISTINCT lower(btrim(v)))
          FROM unnest(ARRAY[c.option_a, c.option_b, c.option_c, c.option_d]) AS u(v)
          WHERE btrim(coalesce(v, '')) <> ''
        ) = 4
        AND btrim(coalesce(c.correct_answer, '')) <> ''
    ),
    deduped AS (
      SELECT
        v.*,
        row_number() OVER (
          PARTITION BY public.normalize_mcq_stem(v.question)
          ORDER BY v.id
        ) AS stem_rn
      FROM valid v
      WHERE public.normalize_mcq_stem(v.question) <> ''
    ),
    unique_rows AS (
      SELECT
        d.id,
        d.question,
        d.option_a,
        d.option_b,
        d.option_c,
        d.option_d,
        d.correct_answer,
        d.explanation,
        row_number() OVER (ORDER BY d.id) AS set_rn
      FROM deduped d
      WHERE d.stem_rn = 1
    )
    SELECT
      u.id,
      u.question,
      u.option_a,
      u.option_b,
      u.option_c,
      u.option_d,
      u.correct_answer,
      u.explanation
    FROM unique_rows u
    WHERE u.set_rn > %s
      AND u.set_rn <= %s
    ORDER BY u.id
    $q$,
    v_q_expr,
    v_expl_expr,
    p_table,
    v_where,
    v_offset,
    v_offset + v_limit
  );

  RETURN QUERY EXECUTE v_sql;
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_deduped_mcq_set(
  text, integer, integer, text, boolean, text, text, text, text, text[], text, text[], text, text[], text, boolean, text[]
) TO public;
GRANT EXECUTE ON FUNCTION public.get_deduped_mcq_set(
  text, integer, integer, text, boolean, text, text, text, text, text[], text, text[], text, text[], text, boolean, text[]
) TO anon;
GRANT EXECUTE ON FUNCTION public.get_deduped_mcq_set(
  text, integer, integer, text, boolean, text, text, text, text, text[], text, text[], text, text[], text, boolean, text[]
) TO authenticated;
