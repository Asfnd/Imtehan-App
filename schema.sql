-- SIMPLE DATABASE SCHEMA
-- Matches actual CSV structure exactly

-- 1. Pakistan Studies (6,854 practice + 3,427 important + 1,705 repeated)
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
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_pak_studies_type ON pakistan_studies(type);

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
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_general_knowledge_type ON general_knowledge(type);

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
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_everyday_science_type ON everyday_science(type);

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
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_current_affairs_type ON current_affairs(type);

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
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_basic_computer_type ON basic_computer(type);

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
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_general_math_type ON general_math(type);

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
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_english_type ON english(type);

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
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_urdu_type ON urdu(type);

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
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_islamiat_type ON islamiat(type);

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
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_geography_type ON geography(type);

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
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_ethics_civics_type ON ethics_civics(type);
