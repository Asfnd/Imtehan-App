-- Allow any exam slug / identifier (e.g. css, pms, mdcat-biology) in question_reports.question_type
ALTER TABLE public.question_reports
  DROP CONSTRAINT IF EXISTS question_reports_question_type_check;
