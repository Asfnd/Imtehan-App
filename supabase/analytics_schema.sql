-- ==========================================
-- ANALYTICS DATABASE SCHEMA
-- Optimized for Supabase Free Tier
-- Features: Real-time stats, Streaks, Weak subjects, Recommendations
-- ==========================================

-- ==========================================
-- 1. USER STATS TABLE (Core Analytics)
-- ==========================================
CREATE TABLE IF NOT EXISTS user_stats (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Core Performance Metrics
  total_questions_solved INTEGER DEFAULT 0 CHECK (total_questions_solved >= 0),
  total_tests_completed INTEGER DEFAULT 0 CHECK (total_tests_completed >= 0),
  total_correct_answers INTEGER DEFAULT 0 CHECK (total_correct_answers >= 0),
  total_wrong_answers INTEGER DEFAULT 0 CHECK (total_wrong_answers >= 0),
  average_score DECIMAL(5,2) DEFAULT 0.00 CHECK (average_score >= 0 AND average_score <= 100),

  -- Streak Tracking (for addiction!)
  current_streak INTEGER DEFAULT 0 CHECK (current_streak >= 0),
  longest_streak INTEGER DEFAULT 0 CHECK (longest_streak >= 0),
  last_practice_date DATE,

  -- Engagement Metrics
  total_study_time_minutes INTEGER DEFAULT 0 CHECK (total_study_time_minutes >= 0),

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for fast lookups
CREATE INDEX IF NOT EXISTS idx_user_stats_user_id ON user_stats(user_id);
CREATE INDEX IF NOT EXISTS idx_user_stats_updated_at ON user_stats(updated_at DESC);

-- Row Level Security
ALTER TABLE user_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own stats"
  ON user_stats FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own stats"
  ON user_stats FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own stats"
  ON user_stats FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ==========================================
-- 2. QUIZ ATTEMPTS TABLE (Detailed History)
-- ==========================================
CREATE TABLE IF NOT EXISTS quiz_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,

  -- Quiz Metadata
  quiz_type TEXT NOT NULL CHECK (quiz_type IN ('subject', 'past-paper', 'mpt', 'mock', 'practice')),
  subject TEXT,

  -- Performance Data
  total_questions SMALLINT NOT NULL CHECK (total_questions > 0),
  correct_answers SMALLINT DEFAULT 0 CHECK (correct_answers >= 0),
  wrong_answers SMALLINT DEFAULT 0 CHECK (wrong_answers >= 0),
  skipped_answers SMALLINT DEFAULT 0 CHECK (skipped_answers >= 0),
  score_percentage DECIMAL(5,2) CHECK (score_percentage >= 0 AND score_percentage <= 100),

  -- Timing
  time_taken_seconds INTEGER CHECK (time_taken_seconds >= 0),

  -- Timestamp
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Validation
  CONSTRAINT valid_answer_count CHECK (
    correct_answers + wrong_answers + skipped_answers = total_questions
  )
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user_id ON quiz_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_completed_at ON quiz_attempts(completed_at DESC);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user_subject ON quiz_attempts(user_id, subject);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user_type ON quiz_attempts(user_id, quiz_type);

-- Row Level Security
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own quiz attempts"
  ON quiz_attempts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own quiz attempts"
  ON quiz_attempts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ==========================================
-- 3. SUBJECT PERFORMANCE TABLE (Weak Areas Detection)
-- ==========================================
CREATE TABLE IF NOT EXISTS subject_performance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  subject TEXT NOT NULL,

  -- Performance Metrics
  questions_attempted INTEGER DEFAULT 0 CHECK (questions_attempted >= 0),
  questions_correct INTEGER DEFAULT 0 CHECK (questions_correct >= 0),
  questions_wrong INTEGER DEFAULT 0 CHECK (questions_wrong >= 0),
  average_score DECIMAL(5,2) DEFAULT 0.00 CHECK (average_score >= 0 AND average_score <= 100),

  -- Progress Tracking
  last_practiced_at TIMESTAMP WITH TIME ZONE,
  practice_count INTEGER DEFAULT 0 CHECK (practice_count >= 0),

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Unique constraint: one record per user per subject
  UNIQUE(user_id, subject)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_subject_performance_user_id ON subject_performance(user_id);
CREATE INDEX IF NOT EXISTS idx_subject_performance_avg_score ON subject_performance(user_id, average_score ASC);
CREATE INDEX IF NOT EXISTS idx_subject_performance_last_practiced ON subject_performance(user_id, last_practiced_at DESC);

-- Row Level Security
ALTER TABLE subject_performance ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own subject performance"
  ON subject_performance FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own subject performance"
  ON subject_performance FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own subject performance"
  ON subject_performance FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ==========================================
-- 4. DAILY ACTIVITY TABLE (Streak Calculation)
-- ==========================================
CREATE TABLE IF NOT EXISTS daily_activity (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  activity_date DATE NOT NULL,

  -- Daily Metrics
  questions_solved INTEGER DEFAULT 0 CHECK (questions_solved >= 0),
  tests_completed INTEGER DEFAULT 0 CHECK (tests_completed >= 0),
  study_time_minutes INTEGER DEFAULT 0 CHECK (study_time_minutes >= 0),

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Unique: one record per user per day
  UNIQUE(user_id, activity_date)
);

-- Indexes for streak calculation
CREATE INDEX IF NOT EXISTS idx_daily_activity_user_date ON daily_activity(user_id, activity_date DESC);

-- Row Level Security
ALTER TABLE daily_activity ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own daily activity"
  ON daily_activity FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own daily activity"
  ON daily_activity FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own daily activity"
  ON daily_activity FOR UPDATE
  USING (auth.uid() = user_id);

-- ==========================================
-- FUNCTION: Save Quiz & Update All Analytics
-- Single efficient call updates everything!
-- ==========================================
CREATE OR REPLACE FUNCTION save_quiz_and_update_analytics(
  p_user_id UUID,
  p_quiz_type TEXT,
  p_subject TEXT,
  p_total_questions INTEGER,
  p_correct INTEGER,
  p_wrong INTEGER,
  p_skipped INTEGER,
  p_time_seconds INTEGER
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_score DECIMAL(5,2);
  v_time_minutes INTEGER;
  v_streak INTEGER;
  v_is_new_day BOOLEAN;
BEGIN
  -- Calculate score
  v_score := ROUND((p_correct::DECIMAL / p_total_questions::DECIMAL) * 100, 2);
  v_time_minutes := GREATEST(1, CEIL(p_time_seconds / 60.0));

  -- 1. Save quiz attempt
  INSERT INTO quiz_attempts (
    user_id, quiz_type, subject, total_questions,
    correct_answers, wrong_answers, skipped_answers,
    score_percentage, time_taken_seconds
  ) VALUES (
    p_user_id, p_quiz_type, p_subject, p_total_questions,
    p_correct, p_wrong, p_skipped, v_score, p_time_seconds
  );

  -- 2. Update user stats
  INSERT INTO user_stats (
    user_id, total_questions_solved, total_tests_completed,
    total_correct_answers, total_wrong_answers, average_score,
    last_practice_date, total_study_time_minutes, updated_at
  ) VALUES (
    p_user_id, p_total_questions, 1, p_correct, p_wrong,
    v_score, CURRENT_DATE, v_time_minutes, NOW()
  )
  ON CONFLICT (user_id) DO UPDATE SET
    total_questions_solved = user_stats.total_questions_solved + p_total_questions,
    total_tests_completed = user_stats.total_tests_completed + 1,
    total_correct_answers = user_stats.total_correct_answers + p_correct,
    total_wrong_answers = user_stats.total_wrong_answers + p_wrong,
    average_score = ROUND(
      ((user_stats.average_score * user_stats.total_tests_completed) + v_score)
      / (user_stats.total_tests_completed + 1), 2
    ),
    last_practice_date = CURRENT_DATE,
    total_study_time_minutes = user_stats.total_study_time_minutes + v_time_minutes,
    updated_at = NOW();

  -- 3. Update daily activity (for streak)
  INSERT INTO daily_activity (
    user_id, activity_date, questions_solved, tests_completed, study_time_minutes
  ) VALUES (
    p_user_id, CURRENT_DATE, p_total_questions, 1, v_time_minutes
  )
  ON CONFLICT (user_id, activity_date) DO UPDATE SET
    questions_solved = daily_activity.questions_solved + p_total_questions,
    tests_completed = daily_activity.tests_completed + 1,
    study_time_minutes = daily_activity.study_time_minutes + v_time_minutes;

  -- 4. Update subject performance (if subject quiz)
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
      questions_correct = subject_performance.questions_correct + p_correct,
      questions_wrong = subject_performance.questions_wrong + p_wrong,
      average_score = ROUND(
        ((subject_performance.average_score * subject_performance.practice_count) + v_score)
        / (subject_performance.practice_count + 1), 2
      ),
      last_practiced_at = NOW(),
      practice_count = subject_performance.practice_count + 1,
      updated_at = NOW();
  END IF;

  -- 5. Calculate streak
  v_streak := calculate_streak(p_user_id);

  -- Return success with updated stats
  RETURN json_build_object(
    'success', true,
    'score', v_score,
    'streak', v_streak,
    'total_questions', (SELECT total_questions_solved FROM user_stats WHERE user_id = p_user_id),
    'total_tests', (SELECT total_tests_completed FROM user_stats WHERE user_id = p_user_id)
  );
END;
$$;

-- ==========================================
-- FUNCTION: Calculate Current Streak
-- ==========================================
CREATE OR REPLACE FUNCTION calculate_streak(p_user_id UUID)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_streak INTEGER := 0;
  v_check_date DATE := CURRENT_DATE;
  v_exists BOOLEAN;
BEGIN
  -- Count consecutive days backwards from today
  LOOP
    SELECT EXISTS (
      SELECT 1 FROM daily_activity
      WHERE user_id = p_user_id AND activity_date = v_check_date
    ) INTO v_exists;

    EXIT WHEN NOT v_exists;

    v_streak := v_streak + 1;
    v_check_date := v_check_date - INTERVAL '1 day';

    -- Safety: don't check more than 365 days
    EXIT WHEN v_streak >= 365;
  END LOOP;

  -- Update user stats with new streak
  UPDATE user_stats
  SET
    current_streak = v_streak,
    longest_streak = GREATEST(longest_streak, v_streak),
    updated_at = NOW()
  WHERE user_id = p_user_id;

  RETURN v_streak;
END;
$$;

-- ==========================================
-- FUNCTION: Get Weak Subjects (Bottom 3)
-- ==========================================
CREATE OR REPLACE FUNCTION get_weak_subjects(p_user_id UUID, p_limit INTEGER DEFAULT 3)
RETURNS TABLE (
  subject TEXT,
  average_score DECIMAL,
  questions_attempted INTEGER,
  last_practiced_at TIMESTAMP WITH TIME ZONE,
  days_since_practice INTEGER
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT
    sp.subject,
    sp.average_score,
    sp.questions_attempted,
    sp.last_practiced_at,
    EXTRACT(DAY FROM NOW() - sp.last_practiced_at)::INTEGER as days_since_practice
  FROM subject_performance sp
  WHERE sp.user_id = p_user_id
    AND sp.questions_attempted >= 5  -- Only subjects with enough data
  ORDER BY sp.average_score ASC  -- Lowest scores first
  LIMIT p_limit;
END;
$$;

-- ==========================================
-- FUNCTION: Get Today's Recommendation
-- ==========================================
CREATE OR REPLACE FUNCTION get_todays_recommendation(p_user_id UUID)
RETURNS TABLE (
  subject TEXT,
  reason TEXT,
  priority INTEGER,
  average_score DECIMAL,
  days_since_practice INTEGER
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  WITH subject_analysis AS (
    SELECT
      sp.subject,
      sp.average_score,
      COALESCE(EXTRACT(DAY FROM NOW() - sp.last_practiced_at)::INTEGER, 999) as days_ago,
      sp.questions_attempted,
      sp.practice_count,
      CASE
        -- Weak subjects (score < 60) get highest priority
        WHEN sp.average_score < 60 THEN 1
        -- Not practiced in 7+ days
        WHEN COALESCE(EXTRACT(DAY FROM NOW() - sp.last_practiced_at)::INTEGER, 999) >= 7 THEN 2
        -- Not practiced in 3+ days
        WHEN COALESCE(EXTRACT(DAY FROM NOW() - sp.last_practiced_at)::INTEGER, 999) >= 3 THEN 3
        -- Low practice count
        WHEN sp.practice_count < 5 THEN 4
        ELSE 5
      END as priority_score,
      CASE
        WHEN sp.average_score < 50 THEN 'You''re struggling here (score: ' || ROUND(sp.average_score) || '%). Focus needed! 🎯'
        WHEN sp.average_score < 60 THEN 'Below average performance (' || ROUND(sp.average_score) || '%). Time to improve! 📚'
        WHEN COALESCE(EXTRACT(DAY FROM NOW() - sp.last_practiced_at)::INTEGER, 999) >= 7 THEN 'Not practiced in ' || COALESCE(EXTRACT(DAY FROM NOW() - sp.last_practiced_at)::INTEGER, 0) || ' days. Don''t forget! ⏰'
        WHEN COALESCE(EXTRACT(DAY FROM NOW() - sp.last_practiced_at)::INTEGER, 999) >= 3 THEN 'It''s been ' || COALESCE(EXTRACT(DAY FROM NOW() - sp.last_practiced_at)::INTEGER, 0) || ' days. Time for a refresh! 🔄'
        WHEN sp.practice_count < 5 THEN 'You''ve only practiced this ' || sp.practice_count || ' times. Build more experience! 💪'
        ELSE 'Keep practicing to maintain your ' || ROUND(sp.average_score) || '% score! ⭐'
      END as recommendation_reason
    FROM subject_performance sp
    WHERE sp.user_id = p_user_id
      AND sp.questions_attempted >= 3  -- Has some practice
  )
  SELECT
    sa.subject,
    sa.recommendation_reason as reason,
    sa.priority_score as priority,
    sa.average_score,
    sa.days_ago as days_since_practice
  FROM subject_analysis sa
  ORDER BY sa.priority_score ASC, sa.average_score ASC, sa.days_ago DESC
  LIMIT 1;
END;
$$;

-- ==========================================
-- FUNCTION: Get User Analytics Dashboard
-- Single call to get all analytics data!
-- ==========================================
CREATE OR REPLACE FUNCTION get_user_analytics(p_user_id UUID)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_stats JSON;
  v_weak_subjects JSON;
  v_recommendation JSON;
  v_recent_scores JSON;
BEGIN
  -- Get main stats
  SELECT json_build_object(
    'total_questions_solved', COALESCE(total_questions_solved, 0),
    'total_tests_completed', COALESCE(total_tests_completed, 0),
    'average_score', COALESCE(ROUND(average_score, 1), 0),
    'current_streak', COALESCE(current_streak, 0),
    'longest_streak', COALESCE(longest_streak, 0),
    'total_study_time_minutes', COALESCE(total_study_time_minutes, 0)
  ) INTO v_stats
  FROM user_stats
  WHERE user_id = p_user_id;

  -- Get weak subjects (bottom 3)
  SELECT json_agg(row_to_json(ws.*)) INTO v_weak_subjects
  FROM get_weak_subjects(p_user_id, 3) ws;

  -- Get today's recommendation
  SELECT row_to_json(rec.*) INTO v_recommendation
  FROM get_todays_recommendation(p_user_id) rec;

  -- Get recent 10 quiz scores for trend
  SELECT json_agg(json_build_object(
    'date', DATE(completed_at),
    'score', score_percentage,
    'subject', subject
  )) INTO v_recent_scores
  FROM (
    SELECT completed_at, score_percentage, subject
    FROM quiz_attempts
    WHERE user_id = p_user_id
    ORDER BY completed_at DESC
    LIMIT 10
  ) recent;

  -- Combine everything
  RETURN json_build_object(
    'stats', COALESCE(v_stats, '{}'),
    'weak_subjects', COALESCE(v_weak_subjects, '[]'),
    'recommendation', v_recommendation,
    'recent_scores', COALESCE(v_recent_scores, '[]')
  );
END;
$$;

-- ==========================================
-- GRANT PERMISSIONS
-- ==========================================
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated;

-- ==========================================
-- SUCCESS MESSAGE
-- ==========================================
DO $$
BEGIN
  RAISE NOTICE '✅ Analytics schema created successfully!';
  RAISE NOTICE '📊 Tables: user_stats, quiz_attempts, subject_performance, daily_activity';
  RAISE NOTICE '⚡ Functions: save_quiz_and_update_analytics, get_user_analytics, get_weak_subjects, get_todays_recommendation';
  RAISE NOTICE '🔒 Row Level Security enabled on all tables';
END $$;
