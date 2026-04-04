-- PMS-specific MCQ tables (separate from CSS `english`, `general_knowledge`, …).
-- Import via scripts/import-mcqs-to-supabase.ts using folders:
--   PMS_Most_Repeated_MCQs, PMS_MOST_IMPORTANT_MCQS, PMS_Extracted_MCQs

CREATE TABLE IF NOT EXISTS public.pms_english (
  id BIGSERIAL PRIMARY KEY,
  question_number INT,
  question TEXT NOT NULL,
  option_a TEXT,
  option_b TEXT,
  option_c TEXT,
  option_d TEXT,
  correct_answer TEXT NOT NULL,
  type TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_pms_english_type ON public.pms_english(type);

CREATE TABLE IF NOT EXISTS public.pms_general_knowledge (
  id BIGSERIAL PRIMARY KEY,
  question_number INT,
  question TEXT NOT NULL,
  option_a TEXT,
  option_b TEXT,
  option_c TEXT,
  option_d TEXT,
  correct_answer TEXT NOT NULL,
  type TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_pms_general_knowledge_type ON public.pms_general_knowledge(type);

CREATE TABLE IF NOT EXISTS public.pms_pakistan_studies (
  id BIGSERIAL PRIMARY KEY,
  question_number INT,
  question TEXT NOT NULL,
  option_a TEXT,
  option_b TEXT,
  option_c TEXT,
  option_d TEXT,
  correct_answer TEXT NOT NULL,
  type TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_pms_pakistan_studies_type ON public.pms_pakistan_studies(type);

CREATE TABLE IF NOT EXISTS public.pms_islamiat (
  id BIGSERIAL PRIMARY KEY,
  question_number INT,
  question TEXT NOT NULL,
  option_a TEXT,
  option_b TEXT,
  option_c TEXT,
  option_d TEXT,
  correct_answer TEXT NOT NULL,
  type TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_pms_islamiat_type ON public.pms_islamiat(type);

CREATE TABLE IF NOT EXISTS public.pms_current_affairs (
  id BIGSERIAL PRIMARY KEY,
  question_number INT,
  question TEXT NOT NULL,
  option_a TEXT,
  option_b TEXT,
  option_c TEXT,
  option_d TEXT,
  correct_answer TEXT NOT NULL,
  type TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_pms_current_affairs_type ON public.pms_current_affairs(type);

CREATE TABLE IF NOT EXISTS public.pms_everyday_science (
  id BIGSERIAL PRIMARY KEY,
  question_number INT,
  question TEXT NOT NULL,
  option_a TEXT,
  option_b TEXT,
  option_c TEXT,
  option_d TEXT,
  correct_answer TEXT NOT NULL,
  type TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_pms_everyday_science_type ON public.pms_everyday_science(type);

CREATE TABLE IF NOT EXISTS public.pms_general_math (
  id BIGSERIAL PRIMARY KEY,
  question_number INT,
  question TEXT NOT NULL,
  option_a TEXT,
  option_b TEXT,
  option_c TEXT,
  option_d TEXT,
  correct_answer TEXT NOT NULL,
  type TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_pms_general_math_type ON public.pms_general_math(type);

CREATE TABLE IF NOT EXISTS public.pms_geography (
  id BIGSERIAL PRIMARY KEY,
  question_number INT,
  question TEXT NOT NULL,
  option_a TEXT,
  option_b TEXT,
  option_c TEXT,
  option_d TEXT,
  correct_answer TEXT NOT NULL,
  type TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_pms_geography_type ON public.pms_geography(type);

DO $$
DECLARE
  t TEXT;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'pms_english',
    'pms_general_knowledge',
    'pms_pakistan_studies',
    'pms_islamiat',
    'pms_current_affairs',
    'pms_everyday_science',
    'pms_general_math',
    'pms_geography'
  ]
  LOOP
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);
    EXECUTE format('DROP POLICY IF EXISTS "Public read access" ON public.%I', t);
    EXECUTE format(
      'CREATE POLICY "Public read access" ON public.%I FOR SELECT TO public USING (true)',
      t
    );
  END LOOP;
END $$;
