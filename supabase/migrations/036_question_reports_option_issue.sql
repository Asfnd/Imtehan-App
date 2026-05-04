-- Per-option question reports: which option and what kind of issue (clean / symbol / type)
ALTER TABLE public.question_reports
  ADD COLUMN IF NOT EXISTS reported_option_letter TEXT,
  ADD COLUMN IF NOT EXISTS issue_type TEXT;

ALTER TABLE public.question_reports
  DROP CONSTRAINT IF EXISTS question_reports_issue_type_check;

ALTER TABLE public.question_reports
  ADD CONSTRAINT question_reports_issue_type_check
  CHECK (
    issue_type IS NULL
    OR issue_type IN ('clean', 'symbol', 'type')
  );

COMMENT ON COLUMN public.question_reports.reported_option_letter IS 'MCQ option letter (e.g. A–D) when the report targets a specific option; NULL for legacy whole-question reports';
COMMENT ON COLUMN public.question_reports.issue_type IS 'User-selected issue: clean (formatting/display), symbol (character/special char), type (typo/wording)';

CREATE INDEX IF NOT EXISTS idx_question_reports_option_issue
  ON public.question_reports (question_id, question_type, reported_option_letter, issue_type)
  WHERE issue_type IS NOT NULL;
