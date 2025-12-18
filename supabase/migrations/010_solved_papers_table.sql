-- Create solved_papers table for storing solved paper metadata
CREATE TABLE solved_papers (
    id SERIAL PRIMARY KEY,
    subject VARCHAR(255) NOT NULL,
    year INTEGER NOT NULL,
    filename VARCHAR(255) NOT NULL,
    storage_path VARCHAR(500) NOT NULL UNIQUE,
    file_size BIGINT,
    is_available BOOLEAN DEFAULT true,
    solution_type VARCHAR(50) DEFAULT 'Complete',
    difficulty_level VARCHAR(50) DEFAULT 'Intermediate',
    topics_covered TEXT[], -- Array of topics
    description TEXT,
    download_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_solved_papers_subject ON solved_papers(subject);
CREATE INDEX idx_solved_papers_year ON solved_papers(year);
CREATE INDEX idx_solved_papers_subject_year ON solved_papers(subject, year);

-- Enable Row Level Security
ALTER TABLE solved_papers ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access to solved papers"
ON solved_papers FOR SELECT
TO public
USING (true);

-- Create policy to allow authenticated users to update download count
CREATE POLICY "Allow authenticated users to update download count"
ON solved_papers FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Add comment
COMMENT ON TABLE solved_papers IS 'Metadata for CSS solved papers available in storage';