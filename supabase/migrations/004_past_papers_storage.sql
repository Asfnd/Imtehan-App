-- Migration: Set up metadata table and storage policies for CSS past papers

-- Create a metadata table to track papers
CREATE TABLE IF NOT EXISTS past_papers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject TEXT NOT NULL,
  year TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size BIGINT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(subject, year)
);

-- Enable RLS on past_papers table
ALTER TABLE past_papers ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone authenticated can read paper metadata
CREATE POLICY "Authenticated users can view paper metadata"
ON past_papers FOR SELECT
TO authenticated
USING (true);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_past_papers_subject ON past_papers(subject);
CREATE INDEX IF NOT EXISTS idx_past_papers_year ON past_papers(year);

-- Storage bucket policies for css-past-papers
-- Allow authenticated users to SELECT (read/download) files
CREATE POLICY "Authenticated users can view past papers"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'css-past-papers');

-- Allow authenticated users to INSERT (upload) files
-- This is needed for the upload script and future admin functionality
CREATE POLICY "Authenticated users can upload past papers"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'css-past-papers');
