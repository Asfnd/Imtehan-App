-- ISSB dedicated MCQ banks + backfill null exam_slug on quiz_attempts
-- Every ISSB MCQ requires a non-empty explanation (student-first quality bar).

-- ── 1. Backfill missing exam slugs ───────────────────────────────────────────
UPDATE quiz_attempts
SET exam_slug = 'css'
WHERE exam_slug IS NULL
  AND subject IN (
    'General Science and Ability', 'Political Science', 'Islamic Studies',
    'Pakistan Affairs', 'History of USA', 'Gender Studies',
    'English Precis and Composition', 'Current Affairs', 'Sociology',
    'International Relations', 'International Law', 'Public Administration',
    'MPT Past Papers', 'English (Idioms)', 'Accountancy and Auditing',
    'Agriculture and Forestry'
  );

UPDATE quiz_attempts SET exam_slug = 'global' WHERE exam_slug IS NULL;

-- ── 2. ISSB table template (5 subjects) ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS issb_english (
  id BIGSERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT NOT NULL,
  option_d TEXT NOT NULL,
  correct_answer CHAR(1) NOT NULL CHECK (correct_answer IN ('A','B','C','D')),
  explanation TEXT NOT NULL,
  topic TEXT NOT NULL,
  difficulty TEXT NOT NULL DEFAULT 'medium' CHECK (difficulty IN ('easy', 'medium', 'hard')),
  type TEXT NOT NULL DEFAULT 'practice' CHECK (type IN ('practice', 'most_important', 'most_repeated')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS issb_mathematics (
  id BIGSERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT NOT NULL,
  option_d TEXT NOT NULL,
  correct_answer CHAR(1) NOT NULL CHECK (correct_answer IN ('A','B','C','D')),
  explanation TEXT NOT NULL,
  topic TEXT NOT NULL,
  difficulty TEXT NOT NULL DEFAULT 'medium' CHECK (difficulty IN ('easy', 'medium', 'hard')),
  type TEXT NOT NULL DEFAULT 'practice' CHECK (type IN ('practice', 'most_important', 'most_repeated')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS issb_general_knowledge (
  id BIGSERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT NOT NULL,
  option_d TEXT NOT NULL,
  correct_answer CHAR(1) NOT NULL CHECK (correct_answer IN ('A','B','C','D')),
  explanation TEXT NOT NULL,
  topic TEXT NOT NULL,
  difficulty TEXT NOT NULL DEFAULT 'medium' CHECK (difficulty IN ('easy', 'medium', 'hard')),
  type TEXT NOT NULL DEFAULT 'practice' CHECK (type IN ('practice', 'most_important', 'most_repeated')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS issb_pakistan_affairs (
  id BIGSERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT NOT NULL,
  option_d TEXT NOT NULL,
  correct_answer CHAR(1) NOT NULL CHECK (correct_answer IN ('A','B','C','D')),
  explanation TEXT NOT NULL,
  topic TEXT NOT NULL,
  difficulty TEXT NOT NULL DEFAULT 'medium' CHECK (difficulty IN ('easy', 'medium', 'hard')),
  type TEXT NOT NULL DEFAULT 'practice' CHECK (type IN ('practice', 'most_important', 'most_repeated')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS issb_intelligence (
  id BIGSERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT NOT NULL,
  option_d TEXT NOT NULL,
  correct_answer CHAR(1) NOT NULL CHECK (correct_answer IN ('A','B','C','D')),
  explanation TEXT NOT NULL,
  topic TEXT NOT NULL,
  difficulty TEXT NOT NULL DEFAULT 'medium' CHECK (difficulty IN ('easy', 'medium', 'hard')),
  type TEXT NOT NULL DEFAULT 'practice' CHECK (type IN ('practice', 'most_important', 'most_repeated')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_issb_english_topic ON issb_english(topic);
CREATE INDEX IF NOT EXISTS idx_issb_english_type ON issb_english(type);
CREATE INDEX IF NOT EXISTS idx_issb_mathematics_topic ON issb_mathematics(topic);
CREATE INDEX IF NOT EXISTS idx_issb_mathematics_type ON issb_mathematics(type);
CREATE INDEX IF NOT EXISTS idx_issb_gk_topic ON issb_general_knowledge(topic);
CREATE INDEX IF NOT EXISTS idx_issb_gk_type ON issb_general_knowledge(type);
CREATE INDEX IF NOT EXISTS idx_issb_pa_topic ON issb_pakistan_affairs(topic);
CREATE INDEX IF NOT EXISTS idx_issb_pa_type ON issb_pakistan_affairs(type);
CREATE INDEX IF NOT EXISTS idx_issb_intel_topic ON issb_intelligence(topic);
CREATE INDEX IF NOT EXISTS idx_issb_intel_type ON issb_intelligence(type);

ALTER TABLE issb_english ENABLE ROW LEVEL SECURITY;
ALTER TABLE issb_mathematics ENABLE ROW LEVEL SECURITY;
ALTER TABLE issb_general_knowledge ENABLE ROW LEVEL SECURITY;
ALTER TABLE issb_pakistan_affairs ENABLE ROW LEVEL SECURITY;
ALTER TABLE issb_intelligence ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read issb_english" ON issb_english;
CREATE POLICY "Public read issb_english" ON issb_english FOR SELECT TO public USING (true);
DROP POLICY IF EXISTS "Public read issb_mathematics" ON issb_mathematics;
CREATE POLICY "Public read issb_mathematics" ON issb_mathematics FOR SELECT TO public USING (true);
DROP POLICY IF EXISTS "Public read issb_general_knowledge" ON issb_general_knowledge;
CREATE POLICY "Public read issb_general_knowledge" ON issb_general_knowledge FOR SELECT TO public USING (true);
DROP POLICY IF EXISTS "Public read issb_pakistan_affairs" ON issb_pakistan_affairs;
CREATE POLICY "Public read issb_pakistan_affairs" ON issb_pakistan_affairs FOR SELECT TO public USING (true);
DROP POLICY IF EXISTS "Public read issb_intelligence" ON issb_intelligence;
CREATE POLICY "Public read issb_intelligence" ON issb_intelligence FOR SELECT TO public USING (true);

COMMENT ON TABLE issb_english IS 'ISSB academic screening — English MCQs with mandatory explanations';
COMMENT ON TABLE issb_mathematics IS 'ISSB academic screening — Mathematics & IQ MCQs with mandatory explanations';
COMMENT ON TABLE issb_general_knowledge IS 'ISSB academic screening — General Knowledge MCQs with mandatory explanations';
COMMENT ON TABLE issb_pakistan_affairs IS 'ISSB academic screening — Pakistan Affairs MCQs with mandatory explanations';
COMMENT ON TABLE issb_intelligence IS 'ISSB academic screening — Intelligence & reasoning MCQs with mandatory explanations';
