-- ============================================================
-- 034: Per-Exam Analytics Isolation
-- Adds exam_slug to subject_performance and quiz_attempts inserts
-- Updates all RPC functions to accept p_exam_slug parameter
-- ============================================================

-- 1. Add exam_slug to subject_performance
ALTER TABLE subject_performance
  ADD COLUMN IF NOT EXISTS exam_slug TEXT NOT NULL DEFAULT 'global';

-- Drop the old unique constraint and recreate with exam_slug
ALTER TABLE subject_performance
  DROP CONSTRAINT IF EXISTS subject_performance_user_id_subject_key;

ALTER TABLE subject_performance
  ADD CONSTRAINT subject_performance_user_exam_subject_key UNIQUE (user_id, exam_slug, subject);

CREATE INDEX IF NOT EXISTS idx_subject_perf_exam ON subject_performance(user_id, exam_slug);

-- quiz_attempts already has exam_slug (from original migration, now nullable)
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_exam_slug ON quiz_attempts(user_id, exam_slug);

-- ============================================================
-- 2. Updated save_quiz_and_update_analytics — adds p_exam_slug
-- ============================================================
CREATE OR REPLACE FUNCTION save_quiz_and_update_analytics(
  p_user_id        UUID,
  p_quiz_type      TEXT,
  p_exam_slug      TEXT,
  p_subject        TEXT,
  p_total_questions INTEGER,
  p_correct        INTEGER,
  p_wrong          INTEGER,
  p_skipped        INTEGER,
  p_time_seconds   INTEGER
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_score        DECIMAL(5,2);
  v_time_minutes INTEGER;
  v_streak       INTEGER;
  v_exam         TEXT;
BEGIN
  v_score        := ROUND((p_correct::DECIMAL / GREATEST(p_total_questions, 1)::DECIMAL) * 100, 2);
  v_time_minutes := GREATEST(1, CEIL(p_time_seconds / 60.0));
  v_exam         := COALESCE(p_exam_slug, 'global');

  -- Save to quiz_attempts (analytics columns + exam_slug)
  INSERT INTO quiz_attempts (
    user_id, quiz_type, exam_slug, subject, total_questions,
    correct_answers, wrong_answers, skipped_answers,
    score_percentage, time_taken_seconds, completed_at
  ) VALUES (
    p_user_id, p_quiz_type, v_exam, p_subject, p_total_questions,
    p_correct, p_wrong, p_skipped, v_score, p_time_seconds, NOW()
  );

  -- Upsert user_stats (global across all exams)
  INSERT INTO user_stats (
    user_id, total_questions_solved, total_tests_completed,
    total_correct_answers, total_wrong_answers, average_score,
    last_practice_date, total_study_time_minutes, updated_at
  ) VALUES (
    p_user_id, p_total_questions, 1, p_correct, p_wrong,
    v_score, CURRENT_DATE, v_time_minutes, NOW()
  )
  ON CONFLICT (user_id) DO UPDATE SET
    total_questions_solved   = user_stats.total_questions_solved + p_total_questions,
    total_tests_completed    = user_stats.total_tests_completed + 1,
    total_correct_answers    = user_stats.total_correct_answers + p_correct,
    total_wrong_answers      = user_stats.total_wrong_answers + p_wrong,
    average_score            = ROUND(
      ((user_stats.average_score * user_stats.total_tests_completed) + v_score)
      / (user_stats.total_tests_completed + 1), 2
    ),
    last_practice_date       = CURRENT_DATE,
    total_study_time_minutes = user_stats.total_study_time_minutes + v_time_minutes,
    updated_at               = NOW();

  -- Upsert daily_activity (for streak, global)
  INSERT INTO daily_activity (user_id, activity_date, questions_solved, tests_completed, study_time_minutes)
  VALUES (p_user_id, CURRENT_DATE, p_total_questions, 1, v_time_minutes)
  ON CONFLICT (user_id, activity_date) DO UPDATE SET
    questions_solved   = daily_activity.questions_solved + p_total_questions,
    tests_completed    = daily_activity.tests_completed + 1,
    study_time_minutes = daily_activity.study_time_minutes + v_time_minutes;

  -- Upsert subject_performance (scoped to exam_slug)
  IF p_subject IS NOT NULL THEN
    INSERT INTO subject_performance (
      user_id, exam_slug, subject, questions_attempted, questions_correct,
      questions_wrong, average_score, last_practiced_at, practice_count, updated_at
    ) VALUES (
      p_user_id, v_exam, p_subject, p_total_questions, p_correct, p_wrong,
      v_score, NOW(), 1, NOW()
    )
    ON CONFLICT (user_id, exam_slug, subject) DO UPDATE SET
      questions_attempted = subject_performance.questions_attempted + p_total_questions,
      questions_correct   = subject_performance.questions_correct + p_correct,
      questions_wrong     = subject_performance.questions_wrong + p_wrong,
      average_score       = ROUND(
        ((subject_performance.average_score * subject_performance.practice_count) + v_score)
        / (subject_performance.practice_count + 1), 2
      ),
      last_practiced_at   = NOW(),
      practice_count      = subject_performance.practice_count + 1,
      updated_at          = NOW();
  END IF;

  v_streak := calculate_streak(p_user_id);

  RETURN json_build_object(
    'success',          true,
    'score',            v_score,
    'streak',           v_streak,
    'total_questions',  (SELECT total_questions_solved FROM user_stats WHERE user_id = p_user_id),
    'total_tests',      (SELECT total_tests_completed  FROM user_stats WHERE user_id = p_user_id)
  );
END;
$$;

-- ============================================================
-- 3. Updated get_weak_subjects — filters by exam_slug
-- ============================================================
CREATE OR REPLACE FUNCTION get_weak_subjects(
  p_user_id  UUID,
  p_limit    INTEGER DEFAULT 3,
  p_exam_slug TEXT DEFAULT NULL
)
RETURNS TABLE (
  subject              TEXT,
  average_score        DECIMAL,
  questions_attempted  INTEGER,
  last_practiced_at    TIMESTAMPTZ,
  days_since_practice  INTEGER
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT
    sp.subject,
    sp.average_score,
    sp.questions_attempted,
    sp.last_practiced_at,
    EXTRACT(DAY FROM NOW() - sp.last_practiced_at)::INTEGER
  FROM subject_performance sp
  WHERE sp.user_id = p_user_id
    AND sp.questions_attempted >= 5
    AND (p_exam_slug IS NULL OR sp.exam_slug = p_exam_slug)
  ORDER BY sp.average_score ASC
  LIMIT p_limit;
END;
$$;

-- ============================================================
-- 4. Updated get_todays_recommendation — filters by exam_slug
-- ============================================================
CREATE OR REPLACE FUNCTION get_todays_recommendation(
  p_user_id   UUID,
  p_exam_slug TEXT DEFAULT NULL
)
RETURNS TABLE (
  subject              TEXT,
  reason               TEXT,
  priority             INTEGER,
  average_score        DECIMAL,
  days_since_practice  INTEGER
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  WITH analysis AS (
    SELECT
      sp.subject,
      sp.average_score,
      COALESCE(EXTRACT(DAY FROM NOW() - sp.last_practiced_at)::INTEGER, 999) AS days_ago,
      sp.practice_count,
      CASE
        WHEN sp.average_score < 60 THEN 1
        WHEN COALESCE(EXTRACT(DAY FROM NOW() - sp.last_practiced_at)::INTEGER, 999) >= 7 THEN 2
        WHEN COALESCE(EXTRACT(DAY FROM NOW() - sp.last_practiced_at)::INTEGER, 999) >= 3 THEN 3
        WHEN sp.practice_count < 5 THEN 4
        ELSE 5
      END AS priority_rank,
      CASE
        WHEN sp.average_score < 50 THEN 'Needs urgent attention — score ' || ROUND(sp.average_score) || '% 🎯'
        WHEN sp.average_score < 60 THEN 'Below 60% — focus here 📚'
        WHEN COALESCE(EXTRACT(DAY FROM NOW() - sp.last_practiced_at)::INTEGER, 999) >= 7
          THEN 'Not practiced in ' || COALESCE(EXTRACT(DAY FROM NOW() - sp.last_practiced_at)::INTEGER, 0) || ' days ⏰'
        WHEN COALESCE(EXTRACT(DAY FROM NOW() - sp.last_practiced_at)::INTEGER, 999) >= 3 THEN 'Due for a refresh 🔄'
        ELSE 'Keep your ' || ROUND(sp.average_score) || '% up ⭐'
      END AS rec_reason
    FROM subject_performance sp
    WHERE sp.user_id = p_user_id
      AND sp.questions_attempted >= 3
      AND (p_exam_slug IS NULL OR sp.exam_slug = p_exam_slug)
  )
  SELECT a.subject, a.rec_reason, a.priority_rank, a.average_score, a.days_ago
  FROM analysis a
  ORDER BY a.priority_rank ASC, a.average_score ASC, a.days_ago DESC
  LIMIT 1;
END;
$$;

-- ============================================================
-- 5. Updated get_user_analytics — accepts p_exam_slug
-- ============================================================
CREATE OR REPLACE FUNCTION get_user_analytics(
  p_user_id   UUID,
  p_exam_slug TEXT DEFAULT NULL
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_stats          JSON;
  v_weak_subjects  JSON;
  v_recommendation JSON;
  v_recent_scores  JSON;
BEGIN
  -- user_stats are global (not exam-scoped)
  SELECT json_build_object(
    'total_questions_solved',   COALESCE(total_questions_solved, 0),
    'total_tests_completed',    COALESCE(total_tests_completed, 0),
    'average_score',            COALESCE(ROUND(average_score, 1), 0),
    'current_streak',           COALESCE(current_streak, 0),
    'longest_streak',           COALESCE(longest_streak, 0),
    'total_study_time_minutes', COALESCE(total_study_time_minutes, 0)
  ) INTO v_stats FROM user_stats WHERE user_id = p_user_id;

  -- Weak subjects scoped to exam
  SELECT json_agg(row_to_json(ws.*)) INTO v_weak_subjects
  FROM get_weak_subjects(p_user_id, 3, p_exam_slug) ws;

  -- Today's recommendation scoped to exam
  SELECT row_to_json(rec.*) INTO v_recommendation
  FROM get_todays_recommendation(p_user_id, p_exam_slug) rec;

  -- Recent scores scoped to exam
  SELECT json_agg(json_build_object(
    'date',    DATE(completed_at),
    'score',   score_percentage,
    'subject', subject
  )) INTO v_recent_scores
  FROM (
    SELECT completed_at, score_percentage, subject
    FROM quiz_attempts
    WHERE user_id = p_user_id
      AND score_percentage IS NOT NULL
      AND (p_exam_slug IS NULL OR exam_slug = p_exam_slug)
    ORDER BY completed_at DESC
    LIMIT 10
  ) recent;

  RETURN json_build_object(
    'stats',          COALESCE(v_stats, '{}'),
    'weak_subjects',  COALESCE(v_weak_subjects, '[]'),
    'recommendation', v_recommendation,
    'recent_scores',  COALESCE(v_recent_scores, '[]')
  );
END;
$$;

-- ============================================================
-- 6. Permissions
-- ============================================================
GRANT EXECUTE ON FUNCTION save_quiz_and_update_analytics TO authenticated;
GRANT EXECUTE ON FUNCTION get_weak_subjects              TO authenticated;
GRANT EXECUTE ON FUNCTION get_todays_recommendation      TO authenticated;
GRANT EXECUTE ON FUNCTION get_user_analytics             TO authenticated;
