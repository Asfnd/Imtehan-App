-- ============================================================
-- 033: Analytics System
-- Adds user_stats, subject_performance, daily_activity tables
-- Extends quiz_attempts for analytics columns
-- Creates all RPC functions for dashboard data
-- ============================================================

-- 1. Extend existing quiz_attempts table
--    Make legacy columns nullable so new analytics inserts work
ALTER TABLE quiz_attempts
  ALTER COLUMN exam_slug    DROP NOT NULL,
  ALTER COLUMN subject_slug DROP NOT NULL,
  ALTER COLUMN mode         DROP NOT NULL,
  ALTER COLUMN set_number   DROP NOT NULL;

-- Add analytics-specific columns
ALTER TABLE quiz_attempts
  ADD COLUMN IF NOT EXISTS quiz_type        TEXT CHECK (quiz_type IN ('subject','past-paper','mpt','mock','practice')),
  ADD COLUMN IF NOT EXISTS subject          TEXT,
  ADD COLUMN IF NOT EXISTS correct_answers  SMALLINT DEFAULT 0 CHECK (correct_answers >= 0),
  ADD COLUMN IF NOT EXISTS wrong_answers    SMALLINT DEFAULT 0 CHECK (wrong_answers >= 0),
  ADD COLUMN IF NOT EXISTS skipped_answers  SMALLINT DEFAULT 0 CHECK (skipped_answers >= 0),
  ADD COLUMN IF NOT EXISTS score_percentage DECIMAL(5,2) CHECK (score_percentage >= 0 AND score_percentage <= 100),
  ADD COLUMN IF NOT EXISTS time_taken_seconds INTEGER CHECK (time_taken_seconds >= 0),
  ADD COLUMN IF NOT EXISTS completed_at     TIMESTAMPTZ DEFAULT NOW();

CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user_type     ON quiz_attempts(user_id, quiz_type);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user_subject  ON quiz_attempts(user_id, subject);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_completed_at  ON quiz_attempts(completed_at DESC);

-- 2. User stats table
CREATE TABLE IF NOT EXISTS user_stats (
  user_id                 UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  total_questions_solved  INTEGER DEFAULT 0 CHECK (total_questions_solved >= 0),
  total_tests_completed   INTEGER DEFAULT 0 CHECK (total_tests_completed >= 0),
  total_correct_answers   INTEGER DEFAULT 0 CHECK (total_correct_answers >= 0),
  total_wrong_answers     INTEGER DEFAULT 0 CHECK (total_wrong_answers >= 0),
  average_score           DECIMAL(5,2) DEFAULT 0.00 CHECK (average_score >= 0 AND average_score <= 100),
  current_streak          INTEGER DEFAULT 0 CHECK (current_streak >= 0),
  longest_streak          INTEGER DEFAULT 0 CHECK (longest_streak >= 0),
  last_practice_date      DATE,
  total_study_time_minutes INTEGER DEFAULT 0 CHECK (total_study_time_minutes >= 0),
  created_at              TIMESTAMPTZ DEFAULT NOW(),
  updated_at              TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE user_stats ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users_view_own_stats"   ON user_stats FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "users_insert_own_stats" ON user_stats FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "users_update_own_stats" ON user_stats FOR UPDATE USING (auth.uid() = user_id);

-- 3. Subject performance table
CREATE TABLE IF NOT EXISTS subject_performance (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id              UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  subject              TEXT NOT NULL,
  questions_attempted  INTEGER DEFAULT 0 CHECK (questions_attempted >= 0),
  questions_correct    INTEGER DEFAULT 0 CHECK (questions_correct >= 0),
  questions_wrong      INTEGER DEFAULT 0 CHECK (questions_wrong >= 0),
  average_score        DECIMAL(5,2) DEFAULT 0.00 CHECK (average_score >= 0 AND average_score <= 100),
  last_practiced_at    TIMESTAMPTZ,
  practice_count       INTEGER DEFAULT 0 CHECK (practice_count >= 0),
  created_at           TIMESTAMPTZ DEFAULT NOW(),
  updated_at           TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, subject)
);

CREATE INDEX IF NOT EXISTS idx_subject_perf_user       ON subject_performance(user_id);
CREATE INDEX IF NOT EXISTS idx_subject_perf_score      ON subject_performance(user_id, average_score ASC);
CREATE INDEX IF NOT EXISTS idx_subject_perf_practiced  ON subject_performance(user_id, last_practiced_at DESC);

ALTER TABLE subject_performance ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users_view_own_perf"   ON subject_performance FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "users_insert_own_perf" ON subject_performance FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "users_update_own_perf" ON subject_performance FOR UPDATE USING (auth.uid() = user_id);

-- 4. Daily activity table (streak tracking)
CREATE TABLE IF NOT EXISTS daily_activity (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id              UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  activity_date        DATE NOT NULL,
  questions_solved     INTEGER DEFAULT 0 CHECK (questions_solved >= 0),
  tests_completed      INTEGER DEFAULT 0 CHECK (tests_completed >= 0),
  study_time_minutes   INTEGER DEFAULT 0 CHECK (study_time_minutes >= 0),
  created_at           TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, activity_date)
);

CREATE INDEX IF NOT EXISTS idx_daily_activity_user_date ON daily_activity(user_id, activity_date DESC);

ALTER TABLE daily_activity ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users_view_own_activity"   ON daily_activity FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "users_insert_own_activity" ON daily_activity FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "users_update_own_activity" ON daily_activity FOR UPDATE USING (auth.uid() = user_id);

-- 5. RPC: Calculate streak
CREATE OR REPLACE FUNCTION calculate_streak(p_user_id UUID)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_streak     INTEGER := 0;
  v_check_date DATE    := CURRENT_DATE;
  v_exists     BOOLEAN;
BEGIN
  LOOP
    SELECT EXISTS (
      SELECT 1 FROM daily_activity
      WHERE user_id = p_user_id AND activity_date = v_check_date
    ) INTO v_exists;
    EXIT WHEN NOT v_exists;
    v_streak     := v_streak + 1;
    v_check_date := v_check_date - INTERVAL '1 day';
    EXIT WHEN v_streak >= 365;
  END LOOP;

  UPDATE user_stats
  SET current_streak = v_streak,
      longest_streak = GREATEST(longest_streak, v_streak),
      updated_at     = NOW()
  WHERE user_id = p_user_id;

  RETURN v_streak;
END;
$$;

-- 6. RPC: Save quiz and update all analytics (single transaction)
CREATE OR REPLACE FUNCTION save_quiz_and_update_analytics(
  p_user_id        UUID,
  p_quiz_type      TEXT,
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
BEGIN
  v_score        := ROUND((p_correct::DECIMAL / GREATEST(p_total_questions, 1)::DECIMAL) * 100, 2);
  v_time_minutes := GREATEST(1, CEIL(p_time_seconds / 60.0));

  -- Save to quiz_attempts (analytics columns only)
  INSERT INTO quiz_attempts (
    user_id, quiz_type, subject, total_questions,
    correct_answers, wrong_answers, skipped_answers,
    score_percentage, time_taken_seconds, completed_at
  ) VALUES (
    p_user_id, p_quiz_type, p_subject, p_total_questions,
    p_correct, p_wrong, p_skipped, v_score, p_time_seconds, NOW()
  );

  -- Upsert user_stats
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

  -- Upsert daily_activity (for streak)
  INSERT INTO daily_activity (user_id, activity_date, questions_solved, tests_completed, study_time_minutes)
  VALUES (p_user_id, CURRENT_DATE, p_total_questions, 1, v_time_minutes)
  ON CONFLICT (user_id, activity_date) DO UPDATE SET
    questions_solved   = daily_activity.questions_solved + p_total_questions,
    tests_completed    = daily_activity.tests_completed + 1,
    study_time_minutes = daily_activity.study_time_minutes + v_time_minutes;

  -- Upsert subject_performance
  IF p_subject IS NOT NULL THEN
    INSERT INTO subject_performance (
      user_id, subject, questions_attempted, questions_correct,
      questions_wrong, average_score, last_practiced_at, practice_count, updated_at
    ) VALUES (
      p_user_id, p_subject, p_total_questions, p_correct, p_wrong,
      v_score, NOW(), 1, NOW()
    )
    ON CONFLICT (user_id, subject) DO UPDATE SET
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

-- 7. RPC: Get weak subjects
CREATE OR REPLACE FUNCTION get_weak_subjects(p_user_id UUID, p_limit INTEGER DEFAULT 3)
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
  WHERE sp.user_id = p_user_id AND sp.questions_attempted >= 5
  ORDER BY sp.average_score ASC
  LIMIT p_limit;
END;
$$;

-- 8. RPC: Get today's recommendation
CREATE OR REPLACE FUNCTION get_todays_recommendation(p_user_id UUID)
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
        WHEN COALESCE(EXTRACT(DAY FROM NOW() - sp.last_practiced_at)::INTEGER, 999) >= 7 THEN 'Not practiced in ' || COALESCE(EXTRACT(DAY FROM NOW() - sp.last_practiced_at)::INTEGER, 0) || ' days ⏰'
        WHEN COALESCE(EXTRACT(DAY FROM NOW() - sp.last_practiced_at)::INTEGER, 999) >= 3 THEN 'Due for a refresh 🔄'
        ELSE 'Keep your ' || ROUND(sp.average_score) || '% up ⭐'
      END AS rec_reason
    FROM subject_performance sp
    WHERE sp.user_id = p_user_id AND sp.questions_attempted >= 3
  )
  SELECT a.subject, a.rec_reason, a.priority_rank, a.average_score, a.days_ago
  FROM analysis a
  ORDER BY a.priority_rank ASC, a.average_score ASC, a.days_ago DESC
  LIMIT 1;
END;
$$;

-- 9. RPC: Get full user analytics (single call for dashboard)
CREATE OR REPLACE FUNCTION get_user_analytics(p_user_id UUID)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_stats         JSON;
  v_weak_subjects JSON;
  v_recommendation JSON;
  v_recent_scores  JSON;
BEGIN
  SELECT json_build_object(
    'total_questions_solved',   COALESCE(total_questions_solved, 0),
    'total_tests_completed',    COALESCE(total_tests_completed, 0),
    'average_score',            COALESCE(ROUND(average_score, 1), 0),
    'current_streak',           COALESCE(current_streak, 0),
    'longest_streak',           COALESCE(longest_streak, 0),
    'total_study_time_minutes', COALESCE(total_study_time_minutes, 0)
  ) INTO v_stats FROM user_stats WHERE user_id = p_user_id;

  SELECT json_agg(row_to_json(ws.*)) INTO v_weak_subjects
  FROM get_weak_subjects(p_user_id, 3) ws;

  SELECT row_to_json(rec.*) INTO v_recommendation
  FROM get_todays_recommendation(p_user_id) rec;

  SELECT json_agg(json_build_object(
    'date',    DATE(completed_at),
    'score',   score_percentage,
    'subject', subject
  )) INTO v_recent_scores
  FROM (
    SELECT completed_at, score_percentage, subject
    FROM quiz_attempts
    WHERE user_id = p_user_id AND score_percentage IS NOT NULL
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

-- 10. Permissions
GRANT EXECUTE ON FUNCTION save_quiz_and_update_analytics TO authenticated;
GRANT EXECUTE ON FUNCTION calculate_streak               TO authenticated;
GRANT EXECUTE ON FUNCTION get_weak_subjects              TO authenticated;
GRANT EXECUTE ON FUNCTION get_todays_recommendation      TO authenticated;
GRANT EXECUTE ON FUNCTION get_user_analytics             TO authenticated;
