-- ============================================================
-- MDCAT DATABASE SCHEMA
-- 18,962 MCQs across 5 subjects, 63 topics
-- ============================================================

-- 1. Biology (5,944 MCQs, 16 topics)
CREATE TABLE mdcat_biology (
  id BIGSERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT NOT NULL,
  option_d TEXT NOT NULL,
  correct_answer CHAR(1) NOT NULL CHECK (correct_answer IN ('A','B','C','D')),
  explanation TEXT NOT NULL,
  topic TEXT NOT NULL,
  subtopic TEXT,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_mdcat_bio_topic ON mdcat_biology(topic);
CREATE INDEX idx_mdcat_bio_difficulty ON mdcat_biology(difficulty);

-- 2. Chemistry (6,218 MCQs, 19 topics)
CREATE TABLE mdcat_chemistry (
  id BIGSERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT NOT NULL,
  option_d TEXT NOT NULL,
  correct_answer CHAR(1) NOT NULL CHECK (correct_answer IN ('A','B','C','D')),
  explanation TEXT NOT NULL,
  topic TEXT NOT NULL,
  subtopic TEXT,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_mdcat_chem_topic ON mdcat_chemistry(topic);
CREATE INDEX idx_mdcat_chem_difficulty ON mdcat_chemistry(difficulty);

-- 3. Physics (4,695 MCQs, 16 topics)
CREATE TABLE mdcat_physics (
  id BIGSERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT NOT NULL,
  option_d TEXT NOT NULL,
  correct_answer CHAR(1) NOT NULL CHECK (correct_answer IN ('A','B','C','D')),
  explanation TEXT NOT NULL,
  topic TEXT NOT NULL,
  subtopic TEXT,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_mdcat_phys_topic ON mdcat_physics(topic);
CREATE INDEX idx_mdcat_phys_difficulty ON mdcat_physics(difficulty);

-- 4. English (925 MCQs, 6 topics)
CREATE TABLE mdcat_english (
  id BIGSERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT NOT NULL,
  option_d TEXT NOT NULL,
  correct_answer CHAR(1) NOT NULL CHECK (correct_answer IN ('A','B','C','D')),
  explanation TEXT NOT NULL,
  topic TEXT NOT NULL,
  subtopic TEXT,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_mdcat_eng_topic ON mdcat_english(topic);
CREATE INDEX idx_mdcat_eng_difficulty ON mdcat_english(difficulty);

-- 5. Logical Reasoning (1,180 MCQs, 6 topics)
CREATE TABLE mdcat_logical_reasoning (
  id BIGSERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT NOT NULL,
  option_d TEXT NOT NULL,
  correct_answer CHAR(1) NOT NULL CHECK (correct_answer IN ('A','B','C','D')),
  explanation TEXT NOT NULL,
  topic TEXT NOT NULL,
  subtopic TEXT,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_mdcat_lr_topic ON mdcat_logical_reasoning(topic);
CREATE INDEX idx_mdcat_lr_difficulty ON mdcat_logical_reasoning(difficulty);

-- Enable Row Level Security (optional - add policies as needed)
ALTER TABLE mdcat_biology ENABLE ROW LEVEL SECURITY;
ALTER TABLE mdcat_chemistry ENABLE ROW LEVEL SECURITY;
ALTER TABLE mdcat_physics ENABLE ROW LEVEL SECURITY;
ALTER TABLE mdcat_english ENABLE ROW LEVEL SECURITY;
ALTER TABLE mdcat_logical_reasoning ENABLE ROW LEVEL SECURITY;

-- Public read access (adjust based on your auth requirements)
CREATE POLICY "Allow public read access" ON mdcat_biology FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON mdcat_chemistry FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON mdcat_physics FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON mdcat_english FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON mdcat_logical_reasoning FOR SELECT USING (true);
