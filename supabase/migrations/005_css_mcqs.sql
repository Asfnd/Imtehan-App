-- Migration: CSS MCQs Table
-- Creates table for CSS Multiple Choice Questions with easy filtering

-- Create mcqs table
CREATE TABLE IF NOT EXISTS css_mcqs (
    id BIGSERIAL PRIMARY KEY,
    
    -- Core MCQ Data
    question TEXT NOT NULL,
    option_a TEXT NOT NULL,
    option_b TEXT NOT NULL,
    option_c TEXT NOT NULL,
    option_d TEXT NOT NULL,
    correct_answer CHAR(1) NOT NULL CHECK (correct_answer IN ('A', 'B', 'C', 'D')),
    
    -- Classification (for easy filtering)
    subject VARCHAR(100) NOT NULL,
    year INTEGER,
    paper VARCHAR(10),  -- 'I', 'II', or NULL
    
    -- MCQ Type
    mcq_type VARCHAR(50) DEFAULT 'regular',  -- 'regular', 'mock_test', 'diagnostic'
    test_number INTEGER,  -- For MPT Mock Tests (1, 2, 3)
    
    -- Metadata
    question_number VARCHAR(20),
    source_file VARCHAR(255),
    difficulty VARCHAR(20),  -- Can add later: 'easy', 'medium', 'hard'
    topic VARCHAR(100),  -- Can add later for topic-wise practice
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for fast queries
CREATE INDEX IF NOT EXISTS idx_css_mcqs_subject ON css_mcqs(subject);
CREATE INDEX IF NOT EXISTS idx_css_mcqs_year ON css_mcqs(year);
CREATE INDEX IF NOT EXISTS idx_css_mcqs_paper ON css_mcqs(paper);
CREATE INDEX IF NOT EXISTS idx_css_mcqs_type ON css_mcqs(mcq_type);

-- Composite indexes for common filter combinations
CREATE INDEX IF NOT EXISTS idx_css_mcqs_subject_year ON css_mcqs(subject, year);
CREATE INDEX IF NOT EXISTS idx_css_mcqs_subject_year_paper ON css_mcqs(subject, year, paper);
CREATE INDEX IF NOT EXISTS idx_css_mcqs_year_paper ON css_mcqs(year, paper);

-- For mock tests
CREATE INDEX IF NOT EXISTS idx_css_mcqs_test_number ON css_mcqs(test_number) WHERE test_number IS NOT NULL;

-- Enable Row Level Security
ALTER TABLE css_mcqs ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read MCQs (public access)
CREATE POLICY "MCQs are publicly readable"
    ON css_mcqs FOR SELECT
    USING (true);

-- Policy: Only authenticated users can insert (for admin)
CREATE POLICY "Authenticated users can insert MCQs"
    ON css_mcqs FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- Policy: Only authenticated users can update (for admin)
CREATE POLICY "Authenticated users can update MCQs"
    ON css_mcqs FOR UPDATE
    TO authenticated
    USING (true);

-- Create user_mcq_progress table for tracking
CREATE TABLE IF NOT EXISTS user_mcq_progress (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    mcq_id BIGINT REFERENCES css_mcqs(id) ON DELETE CASCADE,
    selected_answer CHAR(1),
    is_correct BOOLEAN,
    time_taken INTEGER,  -- seconds
    attempted_at TIMESTAMP DEFAULT NOW(),
    
    -- Prevent duplicate attempts (optional - remove if you want to allow retries)
    UNIQUE(user_id, mcq_id, attempted_at)
);

-- Indexes for user progress
CREATE INDEX IF NOT EXISTS idx_user_mcq_progress_user ON user_mcq_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_mcq_progress_mcq ON user_mcq_progress(mcq_id);
CREATE INDEX IF NOT EXISTS idx_user_mcq_progress_user_mcq ON user_mcq_progress(user_id, mcq_id);

-- Enable RLS for user progress
ALTER TABLE user_mcq_progress ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own progress
CREATE POLICY "Users can view own progress"
    ON user_mcq_progress FOR SELECT
    USING (auth.uid() = user_id);

-- Policy: Users can insert their own progress
CREATE POLICY "Users can insert own progress"
    ON user_mcq_progress FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Create helpful views

-- View: MCQ Statistics by Subject
CREATE OR REPLACE VIEW mcq_stats_by_subject AS
SELECT 
    subject,
    COUNT(*) as total_mcqs,
    MIN(year) as earliest_year,
    MAX(year) as latest_year,
    COUNT(DISTINCT year) as years_covered,
    COUNT(DISTINCT paper) as papers_count
FROM css_mcqs
WHERE mcq_type = 'regular'
GROUP BY subject
ORDER BY total_mcqs DESC;

-- View: MCQ Statistics by Year
CREATE OR REPLACE VIEW mcq_stats_by_year AS
SELECT 
    year,
    COUNT(*) as total_mcqs,
    COUNT(DISTINCT subject) as subjects_count,
    COUNT(DISTINCT paper) as papers_count
FROM css_mcqs
WHERE year IS NOT NULL AND mcq_type = 'regular'
GROUP BY year
ORDER BY year DESC;

-- View: User Performance Summary
CREATE OR REPLACE VIEW user_performance_summary AS
SELECT 
    user_id,
    COUNT(*) as total_attempted,
    SUM(CASE WHEN is_correct THEN 1 ELSE 0 END) as correct_answers,
    ROUND(100.0 * SUM(CASE WHEN is_correct THEN 1 ELSE 0 END) / COUNT(*), 2) as accuracy_percentage,
    AVG(time_taken) as avg_time_per_question
FROM user_mcq_progress
GROUP BY user_id;

-- Comments for documentation
COMMENT ON TABLE css_mcqs IS 'CSS Multiple Choice Questions for practice and testing';
COMMENT ON COLUMN css_mcqs.mcq_type IS 'Type: regular, mock_test, diagnostic';
COMMENT ON COLUMN css_mcqs.paper IS 'Paper number: I, II, or NULL for single paper years';
COMMENT ON TABLE user_mcq_progress IS 'Tracks user attempts and performance on MCQs';
