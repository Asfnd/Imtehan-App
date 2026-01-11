-- Add paper_type column to css_mcqs_enhanced table
-- This allows us to distinguish between Paper 1 and Paper 2 for the same year

ALTER TABLE css_mcqs_enhanced
ADD COLUMN IF NOT EXISTS paper_type TEXT DEFAULT NULL;

-- Add comment
COMMENT ON COLUMN css_mcqs_enhanced.paper_type IS 'Paper type for the year (e.g., "Paper 1", "Paper 2"). NULL for years with single paper.';

-- Create index for faster queries with paper_type
CREATE INDEX IF NOT EXISTS idx_css_mcqs_enhanced_subject_year_paper
ON css_mcqs_enhanced(subject, year, paper_type);
