-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================
-- This file contains all RLS policies for the quiz app
-- Apply these in your Supabase SQL Editor
-- =====================================================

-- =====================================================
-- 1. ENABLE RLS ON ALL TABLES
-- =====================================================

-- Enable RLS on quiz tables (read-only for all users)
ALTER TABLE css_mcqs_enhanced ENABLE ROW LEVEL SECURITY;
ALTER TABLE mpt_mcqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE past_papers ENABLE ROW LEVEL SECURITY;

-- Enable RLS on user-specific tables
ALTER TABLE question_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_quiz_attempts ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- 2. PUBLIC READ POLICIES (Quiz Content)
-- =====================================================
-- Allow everyone to read quiz questions (both authenticated and anonymous)

-- CSS MCQs - Public Read
CREATE POLICY "Anyone can read CSS MCQs"
ON css_mcqs_enhanced
FOR SELECT
USING (true);

-- MPT MCQs - Public Read
CREATE POLICY "Anyone can read MPT MCQs"
ON mpt_mcqs
FOR SELECT
USING (true);

-- Past Papers - Public Read
CREATE POLICY "Anyone can read past papers"
ON past_papers
FOR SELECT
USING (true);

-- =====================================================
-- 3. USER-SPECIFIC POLICIES (Reports & Progress)
-- =====================================================

-- Question Reports - Users can only insert their own reports
CREATE POLICY "Users can insert their own question reports"
ON question_reports
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Question Reports - Users can read their own reports
CREATE POLICY "Users can read their own question reports"
ON question_reports
FOR SELECT
USING (auth.uid() = user_id);

-- User Progress - Users can read their own progress
CREATE POLICY "Users can read their own progress"
ON user_progress
FOR SELECT
USING (auth.uid() = user_id);

-- User Progress - Users can insert their own progress
CREATE POLICY "Users can insert their own progress"
ON user_progress
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- User Progress - Users can update their own progress
CREATE POLICY "Users can update their own progress"
ON user_progress
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Quiz Attempts - Users can read their own attempts
CREATE POLICY "Users can read their own quiz attempts"
ON user_quiz_attempts
FOR SELECT
USING (auth.uid() = user_id);

-- Quiz Attempts - Users can insert their own attempts
CREATE POLICY "Users can insert their own quiz attempts"
ON user_quiz_attempts
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- =====================================================
-- 4. ADMIN POLICIES (Optional - for future admin panel)
-- =====================================================
-- Uncomment these if you want to add admin functionality

-- CREATE POLICY "Admins can do everything on question_reports"
-- ON question_reports
-- FOR ALL
-- USING (
--   auth.jwt() ->> 'role' = 'admin'
-- );

-- CREATE POLICY "Admins can do everything on user_progress"
-- ON user_progress
-- FOR ALL
-- USING (
--   auth.jwt() ->> 'role' = 'admin'
-- );

-- =====================================================
-- 5. PERFORMANCE INDEXES (Recommended)
-- =====================================================
-- These indexes improve RLS policy performance

-- Index on user_id for faster user-specific queries
CREATE INDEX IF NOT EXISTS idx_question_reports_user_id 
ON question_reports(user_id);

CREATE INDEX IF NOT EXISTS idx_user_progress_user_id 
ON user_progress(user_id);

CREATE INDEX IF NOT EXISTS idx_user_quiz_attempts_user_id 
ON user_quiz_attempts(user_id);

-- Index on created_at for time-based queries
CREATE INDEX IF NOT EXISTS idx_question_reports_created_at 
ON question_reports(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_user_quiz_attempts_created_at 
ON user_quiz_attempts(created_at DESC);

-- =====================================================
-- 6. VERIFY RLS IS ENABLED
-- =====================================================
-- Run this query to verify RLS is enabled on all tables:

-- SELECT 
--   schemaname, 
--   tablename, 
--   rowsecurity 
-- FROM pg_tables 
-- WHERE schemaname = 'public' 
-- AND tablename IN (
--   'css_mcqs_enhanced', 
--   'mpt_mcqs', 
--   'past_papers',
--   'question_reports',
--   'user_progress',
--   'user_quiz_attempts'
-- );

-- =====================================================
-- 7. TEST RLS POLICIES
-- =====================================================
-- Test as anonymous user (should work for reading quiz content):
-- SELECT * FROM css_mcqs_enhanced LIMIT 1;
-- SELECT * FROM mpt_mcqs LIMIT 1;
-- SELECT * FROM past_papers LIMIT 1;

-- Test as authenticated user (should only see own data):
-- SELECT * FROM question_reports;
-- SELECT * FROM user_progress;
-- SELECT * FROM user_quiz_attempts;

-- =====================================================
-- NOTES:
-- =====================================================
-- 1. RLS is enforced at the database level - no code changes needed
-- 2. Performance impact is minimal with proper indexes
-- 3. Anonymous users can still read quiz content
-- 4. Authenticated users can only access their own data
-- 5. All INSERT/UPDATE operations are automatically secured
-- =====================================================
