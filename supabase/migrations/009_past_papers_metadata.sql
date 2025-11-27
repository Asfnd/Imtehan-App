-- Drop existing table if it exists (to ensure clean slate)
DROP TABLE IF EXISTS past_papers CASCADE;

-- Create past_papers table
CREATE TABLE past_papers (
    id SERIAL PRIMARY KEY,
    subject VARCHAR(255) NOT NULL,
    year INTEGER,
    filename VARCHAR(255) NOT NULL,
    storage_path VARCHAR(500) NOT NULL UNIQUE,
    file_size BIGINT,
    is_available BOOLEAN DEFAULT true,
    download_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_past_papers_subject ON past_papers(subject);
CREATE INDEX idx_past_papers_year ON past_papers(year);
CREATE INDEX idx_past_papers_subject_year ON past_papers(subject, year);

-- Enable Row Level Security
ALTER TABLE past_papers ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access to past papers"
ON past_papers FOR SELECT
TO public
USING (true);

-- Add comment
COMMENT ON TABLE past_papers IS 'Metadata for CSS past papers available in storage';
