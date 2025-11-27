-- ============================================
-- RLS POLICIES FOR QUIZ APP
-- Migration: 003_add_rls_policies
-- Description: Add Row Level Security policies for all tables
-- ============================================

-- 1. USERS TABLE POLICIES
-- ============================================

-- Allow users to read their own profile
CREATE POLICY "Users can read own profile"
ON users FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- Allow users to insert their own profile
CREATE POLICY "Users can insert own profile"
ON users FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "Users can update own profile"
ON users FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- 2. QUIZ_HISTORY TABLE POLICIES
-- ============================================

-- Allow users to read their own quiz history
CREATE POLICY "Users can read own quiz history"
ON quiz_history FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Allow users to insert their own quiz history
CREATE POLICY "Users can insert own quiz history"
ON quiz_history FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- 3. QUIZZES TABLE POLICIES (Read-only for all)
-- ============================================

-- Allow all authenticated users to read quizzes
CREATE POLICY "Authenticated users can read quizzes"
ON quizzes FOR SELECT
TO authenticated
USING (true);

-- 4. USER_TOPIC_PERFORMANCE TABLE POLICIES
-- ============================================

-- Allow users to read their own performance
CREATE POLICY "Users can read own performance"
ON user_topic_performance FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Allow users to insert their own performance
CREATE POLICY "Users can insert own performance"
ON user_topic_performance FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own performance
CREATE POLICY "Users can update own performance"
ON user_topic_performance FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- 5. INSIGHTS_CACHE TABLE POLICIES
-- ============================================

-- Allow users to read their own insights
CREATE POLICY "Users can read own insights"
ON insights_cache FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Allow users to insert their own insights
CREATE POLICY "Users can insert own insights"
ON insights_cache FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- 6. EMAIL_VERIFICATIONS TABLE POLICIES
-- ============================================

-- Allow users to read their own verifications
CREATE POLICY "Users can read own verifications"
ON email_verifications FOR SELECT
TO authenticated
USING (auth.uid()::text = user_id);

-- Allow anyone to insert verifications (for signup)
CREATE POLICY "Anyone can insert verifications"
ON email_verifications FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Allow users to update their own verifications
CREATE POLICY "Users can update own verifications"
ON email_verifications FOR UPDATE
TO authenticated
USING (auth.uid()::text = user_id)
WITH CHECK (auth.uid()::text = user_id);

-- ============================================
-- VERIFICATION
-- ============================================

-- Verify RLS is enabled on all tables
DO $$
BEGIN
  RAISE NOTICE 'RLS Policies added successfully!';
  RAISE NOTICE 'Tables with RLS enabled:';
  RAISE NOTICE '- users';
  RAISE NOTICE '- quiz_history';
  RAISE NOTICE '- quizzes';
  RAISE NOTICE '- user_topic_performance';
  RAISE NOTICE '- insights_cache';
  RAISE NOTICE '- email_verifications';
END $$;
