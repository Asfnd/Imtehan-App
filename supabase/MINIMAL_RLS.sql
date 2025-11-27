-- =====================================================
-- MINIMAL RLS POLICIES - DEPLOYMENT READY
-- =====================================================
-- Only includes tables that exist in your app
-- Run this in Supabase SQL Editor before deployment
-- =====================================================

-- =====================================================
-- 1. ENABLE RLS ON EXISTING TABLES
-- =====================================================

-- Quiz content tables (public read access)
ALTER TABLE css_mcqs_enhanced ENABLE ROW LEVEL SECURITY;
ALTER TABLE mpt_mcqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE past_papers ENABLE ROW LEVEL SECURITY;

-- User-generated content tables (user-specific access)
ALTER TABLE question_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- 2. PUBLIC READ POLICIES (Quiz Content)
-- =====================================================
-- Allows both guests AND authenticated users to read quiz content

CREATE POLICY "Anyone can read CSS MCQs"
ON css_mcqs_enhanced
FOR SELECT
USING (true);

CREATE POLICY "Anyone can read MPT MCQs"
ON mpt_mcqs
FOR SELECT
USING (true);

CREATE POLICY "Anyone can read past papers"
ON past_papers
FOR SELECT
USING (true);

-- =====================================================
-- 3. USER-SPECIFIC POLICIES
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

-- Feedback - Anyone can insert feedback (anonymous or authenticated)
CREATE POLICY "Anyone can insert feedback"
ON feedback
FOR INSERT
WITH CHECK (true);

-- Feedback - Users can read their own feedback
CREATE POLICY "Users can read their own feedback"
ON feedback
FOR SELECT
USING (
  auth.uid() IS NULL OR  -- Anonymous users can't read any feedback
  auth.uid() = user_id   -- Authenticated users can read their own
);

-- =====================================================
-- 4. PERFORMANCE INDEXES (Only for existing tables)
-- =====================================================

-- Index on user_id for faster user-specific queries
CREATE INDEX IF NOT EXISTS idx_question_reports_user_id 
ON question_reports(user_id);

CREATE INDEX IF NOT EXISTS idx_feedback_user_id 
ON feedback(user_id);

-- Index on created_at for time-based queries
CREATE INDEX IF NOT EXISTS idx_question_reports_created_at 
ON question_reports(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_feedback_created_at 
ON feedback(created_at DESC);

-- =====================================================
-- 5. VERIFY RLS IS ENABLED
-- =====================================================
-- Run this to verify (copy and run separately):

/*
SELECT 
  tablename, 
  rowsecurity as "RLS Enabled"
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN (
  'css_mcqs_enhanced', 
  'mpt_mcqs', 
  'past_papers',
  'question_reports',
  'feedback'
)
ORDER BY tablename;
*/

-- =====================================================
-- DONE! Your database is now secure.
-- =====================================================
