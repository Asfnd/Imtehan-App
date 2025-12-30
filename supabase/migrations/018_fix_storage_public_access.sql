-- Fix storage bucket policies to allow public access for PDFs
-- This allows unauthenticated users to view past papers and solved papers

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Authenticated users can view past papers" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload past papers" ON storage.objects;

-- Create public read access for css-past-papers bucket
CREATE POLICY "Public users can view past papers"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'css-past-papers');

-- Create public read access for css-solved-papers bucket
CREATE POLICY "Public users can view solved papers"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'css-solved-papers');

-- Allow authenticated users to upload to css-past-papers (for admin)
CREATE POLICY "Authenticated users can upload past papers"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'css-past-papers');

-- Allow authenticated users to upload to css-solved-papers (for admin)
CREATE POLICY "Authenticated users can upload solved papers"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'css-solved-papers');

-- Allow authenticated users to delete from css-past-papers (for admin)
CREATE POLICY "Authenticated users can delete past papers"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'css-past-papers');

-- Allow authenticated users to delete from css-solved-papers (for admin)
CREATE POLICY "Authenticated users can delete solved papers"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'css-solved-papers');

-- Update past_papers table to allow public read access
DROP POLICY IF EXISTS "Authenticated users can view paper metadata" ON past_papers;

CREATE POLICY "Public users can view paper metadata"
ON past_papers FOR SELECT
TO public
USING (true);
