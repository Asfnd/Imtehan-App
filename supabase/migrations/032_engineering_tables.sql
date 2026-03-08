-- ============================================================
-- Engineering exam MCQ tables
-- Follows MDCAT pattern with additional type + target_exam cols
-- ============================================================

CREATE TABLE engineering_physics (
  id             BIGSERIAL PRIMARY KEY,
  question       TEXT NOT NULL,
  option_a       TEXT NOT NULL,
  option_b       TEXT NOT NULL,
  option_c       TEXT NOT NULL,
  option_d       TEXT NOT NULL,
  correct_answer CHAR(1) NOT NULL CHECK (correct_answer IN ('A','B','C','D')),
  explanation    TEXT NOT NULL,
  topic          TEXT NOT NULL,
  difficulty     TEXT NOT NULL DEFAULT 'Medium',
  type           TEXT NOT NULL CHECK (type IN ('most_important','most_repeated','practice')),
  target_exam    TEXT NOT NULL CHECK (target_exam IN ('NET','ECAT','GIKI_PIEAS','LUMS_SAT')),
  created_at     TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_eng_phys_topic       ON engineering_physics(topic);
CREATE INDEX idx_eng_phys_type        ON engineering_physics(type);
CREATE INDEX idx_eng_phys_target_exam ON engineering_physics(target_exam);
CREATE INDEX idx_eng_phys_type_exam   ON engineering_physics(type, target_exam);

CREATE TABLE engineering_mathematics (
  id             BIGSERIAL PRIMARY KEY,
  question       TEXT NOT NULL,
  option_a       TEXT NOT NULL,
  option_b       TEXT NOT NULL,
  option_c       TEXT NOT NULL,
  option_d       TEXT NOT NULL,
  correct_answer CHAR(1) NOT NULL CHECK (correct_answer IN ('A','B','C','D')),
  explanation    TEXT NOT NULL,
  topic          TEXT NOT NULL,
  difficulty     TEXT NOT NULL DEFAULT 'Medium',
  type           TEXT NOT NULL CHECK (type IN ('most_important','most_repeated','practice')),
  target_exam    TEXT NOT NULL CHECK (target_exam IN ('NET','ECAT','GIKI_PIEAS','LUMS_SAT')),
  created_at     TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_eng_math_topic       ON engineering_mathematics(topic);
CREATE INDEX idx_eng_math_type        ON engineering_mathematics(type);
CREATE INDEX idx_eng_math_target_exam ON engineering_mathematics(target_exam);
CREATE INDEX idx_eng_math_type_exam   ON engineering_mathematics(type, target_exam);

CREATE TABLE engineering_chemistry (
  id             BIGSERIAL PRIMARY KEY,
  question       TEXT NOT NULL,
  option_a       TEXT NOT NULL,
  option_b       TEXT NOT NULL,
  option_c       TEXT NOT NULL,
  option_d       TEXT NOT NULL,
  correct_answer CHAR(1) NOT NULL CHECK (correct_answer IN ('A','B','C','D')),
  explanation    TEXT NOT NULL,
  topic          TEXT NOT NULL,
  difficulty     TEXT NOT NULL DEFAULT 'Medium',
  type           TEXT NOT NULL CHECK (type IN ('most_important','most_repeated','practice')),
  target_exam    TEXT NOT NULL CHECK (target_exam IN ('NET','ECAT','GIKI_PIEAS','LUMS_SAT')),
  created_at     TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_eng_chem_topic       ON engineering_chemistry(topic);
CREATE INDEX idx_eng_chem_type        ON engineering_chemistry(type);
CREATE INDEX idx_eng_chem_target_exam ON engineering_chemistry(target_exam);
CREATE INDEX idx_eng_chem_type_exam   ON engineering_chemistry(type, target_exam);

CREATE TABLE engineering_computer_science (
  id             BIGSERIAL PRIMARY KEY,
  question       TEXT NOT NULL,
  option_a       TEXT NOT NULL,
  option_b       TEXT NOT NULL,
  option_c       TEXT NOT NULL,
  option_d       TEXT NOT NULL,
  correct_answer CHAR(1) NOT NULL CHECK (correct_answer IN ('A','B','C','D')),
  explanation    TEXT NOT NULL,
  topic          TEXT NOT NULL,
  difficulty     TEXT NOT NULL DEFAULT 'Medium',
  type           TEXT NOT NULL CHECK (type IN ('most_important','most_repeated','practice')),
  target_exam    TEXT NOT NULL CHECK (target_exam IN ('NET','ECAT','GIKI_PIEAS','LUMS_SAT')),
  created_at     TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_eng_cs_topic       ON engineering_computer_science(topic);
CREATE INDEX idx_eng_cs_type        ON engineering_computer_science(type);
CREATE INDEX idx_eng_cs_target_exam ON engineering_computer_science(target_exam);
CREATE INDEX idx_eng_cs_type_exam   ON engineering_computer_science(type, target_exam);

CREATE TABLE engineering_english (
  id             BIGSERIAL PRIMARY KEY,
  question       TEXT NOT NULL,
  option_a       TEXT NOT NULL,
  option_b       TEXT NOT NULL,
  option_c       TEXT NOT NULL,
  option_d       TEXT NOT NULL,
  correct_answer CHAR(1) NOT NULL CHECK (correct_answer IN ('A','B','C','D')),
  explanation    TEXT NOT NULL,
  topic          TEXT NOT NULL,
  difficulty     TEXT NOT NULL DEFAULT 'Medium',
  type           TEXT NOT NULL CHECK (type IN ('most_important','most_repeated','practice')),
  target_exam    TEXT NOT NULL CHECK (target_exam IN ('NET','ECAT','GIKI_PIEAS','LUMS_SAT')),
  created_at     TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_eng_eng_topic       ON engineering_english(topic);
CREATE INDEX idx_eng_eng_type        ON engineering_english(type);
CREATE INDEX idx_eng_eng_target_exam ON engineering_english(target_exam);
CREATE INDEX idx_eng_eng_type_exam   ON engineering_english(type, target_exam);

CREATE TABLE engineering_intelligence (
  id             BIGSERIAL PRIMARY KEY,
  question       TEXT NOT NULL,
  option_a       TEXT NOT NULL,
  option_b       TEXT NOT NULL,
  option_c       TEXT NOT NULL,
  option_d       TEXT NOT NULL,
  correct_answer CHAR(1) NOT NULL CHECK (correct_answer IN ('A','B','C','D')),
  explanation    TEXT NOT NULL,
  topic          TEXT NOT NULL,
  difficulty     TEXT NOT NULL DEFAULT 'Medium',
  type           TEXT NOT NULL CHECK (type IN ('most_important','most_repeated','practice')),
  target_exam    TEXT NOT NULL CHECK (target_exam IN ('NET','ECAT','GIKI_PIEAS','LUMS_SAT')),
  created_at     TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_eng_intel_topic       ON engineering_intelligence(topic);
CREATE INDEX idx_eng_intel_type        ON engineering_intelligence(type);
CREATE INDEX idx_eng_intel_target_exam ON engineering_intelligence(target_exam);
CREATE INDEX idx_eng_intel_type_exam   ON engineering_intelligence(type, target_exam);

-- RLS: public read access (same as other exam tables)
ALTER TABLE engineering_physics          ENABLE ROW LEVEL SECURITY;
ALTER TABLE engineering_mathematics      ENABLE ROW LEVEL SECURITY;
ALTER TABLE engineering_chemistry        ENABLE ROW LEVEL SECURITY;
ALTER TABLE engineering_computer_science ENABLE ROW LEVEL SECURITY;
ALTER TABLE engineering_english          ENABLE ROW LEVEL SECURITY;
ALTER TABLE engineering_intelligence     ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read" ON engineering_physics          FOR SELECT USING (true);
CREATE POLICY "Public read" ON engineering_mathematics      FOR SELECT USING (true);
CREATE POLICY "Public read" ON engineering_chemistry        FOR SELECT USING (true);
CREATE POLICY "Public read" ON engineering_computer_science FOR SELECT USING (true);
CREATE POLICY "Public read" ON engineering_english          FOR SELECT USING (true);
CREATE POLICY "Public read" ON engineering_intelligence     FOR SELECT USING (true);
