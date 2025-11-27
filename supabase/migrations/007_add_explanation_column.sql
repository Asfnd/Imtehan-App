-- Migration: Add explanation column to css_mcqs
-- Adds Khan Academy-style explanations for each MCQ

-- Add explanation column
ALTER TABLE css_mcqs 
ADD COLUMN IF NOT EXISTS explanation TEXT;

-- Add index for searching explanations (optional, for future features)
CREATE INDEX IF NOT EXISTS idx_css_mcqs_explanation 
ON css_mcqs USING gin(to_tsvector('english', explanation))
WHERE explanation IS NOT NULL;

-- Comment for documentation
COMMENT ON COLUMN css_mcqs.explanation IS 'Khan Academy-style explanation of the correct answer and why other options are wrong';
