-- Migration: Add explanation and hint columns to css_mcqs table
-- Adds support for detailed explanations and hints

-- Add explanation columns for each option
ALTER TABLE css_mcqs 
ADD COLUMN IF NOT EXISTS explanation_a TEXT,
ADD COLUMN IF NOT EXISTS explanation_b TEXT,
ADD COLUMN IF NOT EXISTS explanation_c TEXT,
ADD COLUMN IF NOT EXISTS explanation_d TEXT;

-- Add detailed explanation column
ALTER TABLE css_mcqs 
ADD COLUMN IF NOT EXISTS explanation_detailed TEXT;

-- Add hint columns
ALTER TABLE css_mcqs 
ADD COLUMN IF NOT EXISTS hint_1 VARCHAR(255),
ADD COLUMN IF NOT EXISTS hint_2 VARCHAR(255),
ADD COLUMN IF NOT EXISTS hint_3 VARCHAR(255);

-- Add tags column for better categorization
ALTER TABLE css_mcqs 
ADD COLUMN IF NOT EXISTS tags TEXT;

-- Update comments
COMMENT ON COLUMN css_mcqs.explanation_a IS 'Explanation for why option A is correct or incorrect';
COMMENT ON COLUMN css_mcqs.explanation_b IS 'Explanation for why option B is correct or incorrect';
COMMENT ON COLUMN css_mcqs.explanation_c IS 'Explanation for why option C is correct or incorrect';
COMMENT ON COLUMN css_mcqs.explanation_d IS 'Explanation for why option D is correct or incorrect';
COMMENT ON COLUMN css_mcqs.explanation_detailed IS 'Comprehensive explanation of the concept';
COMMENT ON COLUMN css_mcqs.hint_1 IS 'First hint (conceptual)';
COMMENT ON COLUMN css_mcqs.hint_2 IS 'Second hint (specific)';
COMMENT ON COLUMN css_mcqs.hint_3 IS 'Third hint (elimination strategy)';
COMMENT ON COLUMN css_mcqs.tags IS 'Comma-separated tags for categorization';
