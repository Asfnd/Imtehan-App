-- Complete Database Schema for All 11 Subjects
-- Run this in Supabase SQL Editor

-- 1. Pakistan Studies
CREATE TABLE pakistan_studies (
  id BIGSERIAL PRIMARY KEY,
  question_number INT,
  question TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT NOT NULL,
  option_d TEXT NOT NULL,
  correct_answer CHAR(1) NOT NULL CHECK (correct_answer IN ('A','B','C','D')),
  type TEXT NOT NULL CHECK (type IN ('practice', 'most_important', 'most_repeated')),
  topic TEXT,
  difficulty TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_pak_type ON pakistan_studies(type);
CREATE INDEX idx_pak_topic ON pakistan_studies(topic) WHERE topic IS NOT NULL;

-- 2. General Knowledge
CREATE TABLE general_knowledge (
  id BIGSERIAL PRIMARY KEY,
  question_number INT,
  question TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT NOT NULL,
  option_d TEXT NOT NULL,
  correct_answer CHAR(1) NOT NULL CHECK (correct_answer IN ('A','B','C','D')),
  type TEXT NOT NULL CHECK (type IN ('practice', 'most_important', 'most_repeated')),
  topic TEXT,
  difficulty TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_gk_type ON general_knowledge(type);
CREATE INDEX idx_gk_topic ON general_knowledge(topic) WHERE topic IS NOT NULL;

-- 3. Everyday Science
CREATE TABLE everyday_science (
  id BIGSERIAL PRIMARY KEY,
  question_number INT,
  question TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT NOT NULL,
  option_d TEXT NOT NULL,
  correct_answer CHAR(1) NOT NULL CHECK (correct_answer IN ('A','B','C','D')),
  type TEXT NOT NULL CHECK (type IN ('practice', 'most_important', 'most_repeated')),
  topic TEXT,
  difficulty TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_es_type ON everyday_science(type);
CREATE INDEX idx_es_topic ON everyday_science(topic) WHERE topic IS NOT NULL;

-- 4. Current Affairs
CREATE TABLE current_affairs (
  id BIGSERIAL PRIMARY KEY,
  question_number INT,
  question TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT NOT NULL,
  option_d TEXT NOT NULL,
  correct_answer CHAR(1) NOT NULL CHECK (correct_answer IN ('A','B','C','D')),
  type TEXT NOT NULL CHECK (type IN ('practice', 'most_important', 'most_repeated')),
  topic TEXT,
  difficulty TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_ca_type ON current_affairs(type);
CREATE INDEX idx_ca_topic ON current_affairs(topic) WHERE topic IS NOT NULL;

-- 5. Basic Computer
CREATE TABLE basic_computer (
  id BIGSERIAL PRIMARY KEY,
  question_number INT,
  question TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT NOT NULL,
  option_d TEXT NOT NULL,
  correct_answer CHAR(1) NOT NULL CHECK (correct_answer IN ('A','B','C','D')),
  type TEXT NOT NULL CHECK (type IN ('practice', 'most_important', 'most_repeated')),
  topic TEXT,
  difficulty TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_bc_type ON basic_computer(type);
CREATE INDEX idx_bc_topic ON basic_computer(topic) WHERE topic IS NOT NULL;

-- 6. General Math
CREATE TABLE general_math (
  id BIGSERIAL PRIMARY KEY,
  question_number INT,
  question TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT NOT NULL,
  option_d TEXT NOT NULL,
  correct_answer CHAR(1) NOT NULL CHECK (correct_answer IN ('A','B','C','D')),
  type TEXT NOT NULL CHECK (type IN ('practice', 'most_important', 'most_repeated')),
  topic TEXT,
  difficulty TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_gm_type ON general_math(type);
CREATE INDEX idx_gm_topic ON general_math(topic) WHERE topic IS NOT NULL;

-- 7. English
CREATE TABLE english (
  id BIGSERIAL PRIMARY KEY,
  question_number INT,
  question TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT NOT NULL,
  option_d TEXT NOT NULL,
  correct_answer CHAR(1) NOT NULL CHECK (correct_answer IN ('A','B','C','D')),
  type TEXT NOT NULL CHECK (type IN ('practice', 'most_important', 'most_repeated')),
  topic TEXT,
  difficulty TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_eng_type ON english(type);
CREATE INDEX idx_eng_topic ON english(topic) WHERE topic IS NOT NULL;

-- 8. Urdu
CREATE TABLE urdu (
  id BIGSERIAL PRIMARY KEY,
  question_number INT,
  question TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT NOT NULL,
  option_d TEXT NOT NULL,
  correct_answer CHAR(1) NOT NULL CHECK (correct_answer IN ('A','B','C','D')),
  type TEXT NOT NULL CHECK (type IN ('practice', 'most_important', 'most_repeated')),
  topic TEXT,
  difficulty TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_urdu_type ON urdu(type);
CREATE INDEX idx_urdu_topic ON urdu(topic) WHERE topic IS NOT NULL;

-- 9. Islamiat
CREATE TABLE islamiat (
  id BIGSERIAL PRIMARY KEY,
  question_number INT,
  question TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT NOT NULL,
  option_d TEXT NOT NULL,
  correct_answer CHAR(1) NOT NULL CHECK (correct_answer IN ('A','B','C','D')),
  type TEXT NOT NULL CHECK (type IN ('practice', 'most_important', 'most_repeated')),
  topic TEXT,
  difficulty TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_isl_type ON islamiat(type);
CREATE INDEX idx_isl_topic ON islamiat(topic) WHERE topic IS NOT NULL;

-- 10. Geography
CREATE TABLE geography (
  id BIGSERIAL PRIMARY KEY,
  question_number INT,
  question TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT NOT NULL,
  option_d TEXT NOT NULL,
  correct_answer CHAR(1) NOT NULL CHECK (correct_answer IN ('A','B','C','D')),
  type TEXT NOT NULL CHECK (type IN ('practice', 'most_important', 'most_repeated')),
  topic TEXT,
  difficulty TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_geo_type ON geography(type);
CREATE INDEX idx_geo_topic ON geography(topic) WHERE topic IS NOT NULL;

-- 11. Ethics & Civics
CREATE TABLE ethics_civics (
  id BIGSERIAL PRIMARY KEY,
  question_number INT,
  question TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT NOT NULL,
  option_d TEXT NOT NULL,
  correct_answer CHAR(1) NOT NULL CHECK (correct_answer IN ('A','B','C','D')),
  type TEXT NOT NULL CHECK (type IN ('practice', 'most_important', 'most_repeated')),
  topic TEXT,
  difficulty TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_ec_type ON ethics_civics(type);
CREATE INDEX idx_ec_topic ON ethics_civics(topic) WHERE topic IS NOT NULL;

-- Summary View
CREATE OR REPLACE VIEW subject_summary AS
SELECT
  'pakistan_studies' as subject,
  COUNT(*) as total_mcqs,
  COUNT(*) FILTER (WHERE type = 'practice') as practice_count,
  COUNT(*) FILTER (WHERE type = 'most_important') as most_important_count,
  COUNT(*) FILTER (WHERE type = 'most_repeated') as most_repeated_count
FROM pakistan_studies
UNION ALL
SELECT 'general_knowledge', COUNT(*),
  COUNT(*) FILTER (WHERE type = 'practice'),
  COUNT(*) FILTER (WHERE type = 'most_important'),
  COUNT(*) FILTER (WHERE type = 'most_repeated')
FROM general_knowledge
UNION ALL
SELECT 'everyday_science', COUNT(*),
  COUNT(*) FILTER (WHERE type = 'practice'),
  COUNT(*) FILTER (WHERE type = 'most_important'),
  COUNT(*) FILTER (WHERE type = 'most_repeated')
FROM everyday_science
UNION ALL
SELECT 'current_affairs', COUNT(*),
  COUNT(*) FILTER (WHERE type = 'practice'),
  COUNT(*) FILTER (WHERE type = 'most_important'),
  COUNT(*) FILTER (WHERE type = 'most_repeated')
FROM current_affairs
UNION ALL
SELECT 'basic_computer', COUNT(*),
  COUNT(*) FILTER (WHERE type = 'practice'),
  COUNT(*) FILTER (WHERE type = 'most_important'),
  COUNT(*) FILTER (WHERE type = 'most_repeated')
FROM basic_computer
UNION ALL
SELECT 'general_math', COUNT(*),
  COUNT(*) FILTER (WHERE type = 'practice'),
  COUNT(*) FILTER (WHERE type = 'most_important'),
  COUNT(*) FILTER (WHERE type = 'most_repeated')
FROM general_math
UNION ALL
SELECT 'english', COUNT(*),
  COUNT(*) FILTER (WHERE type = 'practice'),
  COUNT(*) FILTER (WHERE type = 'most_important'),
  COUNT(*) FILTER (WHERE type = 'most_repeated')
FROM english
UNION ALL
SELECT 'urdu', COUNT(*),
  COUNT(*) FILTER (WHERE type = 'practice'),
  COUNT(*) FILTER (WHERE type = 'most_important'),
  COUNT(*) FILTER (WHERE type = 'most_repeated')
FROM urdu
UNION ALL
SELECT 'islamiat', COUNT(*),
  COUNT(*) FILTER (WHERE type = 'practice'),
  COUNT(*) FILTER (WHERE type = 'most_important'),
  COUNT(*) FILTER (WHERE type = 'most_repeated')
FROM islamiat
UNION ALL
SELECT 'geography', COUNT(*),
  COUNT(*) FILTER (WHERE type = 'practice'),
  COUNT(*) FILTER (WHERE type = 'most_important'),
  COUNT(*) FILTER (WHERE type = 'most_repeated')
FROM geography
UNION ALL
SELECT 'ethics_civics', COUNT(*),
  COUNT(*) FILTER (WHERE type = 'practice'),
  COUNT(*) FILTER (WHERE type = 'most_important'),
  COUNT(*) FILTER (WHERE type = 'most_repeated')
FROM ethics_civics;
