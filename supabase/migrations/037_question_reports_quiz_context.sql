-- Context when a user flags a question so admins can locate it in the paper
ALTER TABLE public.question_reports
  ADD COLUMN IF NOT EXISTS report_sequence INTEGER,
  ADD COLUMN IF NOT EXISTS quiz_length INTEGER,
  ADD COLUMN IF NOT EXISTS mock_number INTEGER;

COMMENT ON COLUMN public.question_reports.report_sequence IS 'Question number as shown in the quiz (1-based index in mock, or official question_number for MPT)';
COMMENT ON COLUMN public.question_reports.quiz_length IS 'Total questions in that quiz session when the report was filed';
COMMENT ON COLUMN public.question_reports.mock_number IS 'Mock paper number for exam mocks; for MPT stores test_number';

CREATE INDEX IF NOT EXISTS idx_question_reports_sequence
  ON public.question_reports (question_type, report_sequence)
  WHERE report_sequence IS NOT NULL;
