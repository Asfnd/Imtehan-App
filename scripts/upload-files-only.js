/**
 * Upload Guess Papers to Supabase Storage Only
 * (Table will be created manually)
 */

const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

const BUCKET_NAME = 'css-guess-papers-2026'
const SOURCE_FOLDER = '/Users/asfandiyarsafi/Desktop/Mocks'

const guessPapers = [
  { subject: 'Current Affairs', filename: 'Current Affairs.pdf' },
  { subject: 'Essay', filename: 'Essay.pdf' },
  { subject: 'General Science & Ability', filename: 'General Science & Ability.pdf' },
  { subject: 'Pakistan Affairs', filename: 'Pakistan Affairs.pdf' },
  { subject: 'Precis', filename: 'Precis.pdf' }
]

async function uploadFile(filePath, storagePath) {
  try {
    const fileBuffer = fs.readFileSync(filePath)
    const fileSize = fs.statSync(filePath).size

    console.log(`📤 Uploading ${path.basename(filePath)} (${(fileSize / 1024).toFixed(2)} KB)...`)

    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(storagePath, fileBuffer, {
        contentType: 'application/pdf',
        upsert: true
      })

    if (error) {
      console.error(`❌ Failed to upload ${storagePath}:`, error.message)
      return { success: false, fileSize: 0 }
    }

    console.log(`✅ Uploaded ${storagePath}`)
    return { success: true, fileSize }
  } catch (error) {
    console.error(`❌ Error uploading file:`, error.message)
    return { success: false, fileSize: 0 }
  }
}

async function main() {
  console.log('🚀 Uploading Guess Papers to Supabase Storage...\n')

  let successCount = 0
  const uploadedPapers = []

  for (const paper of guessPapers) {
    const filePath = path.join(SOURCE_FOLDER, paper.filename)

    if (!fs.existsSync(filePath)) {
      console.error(`❌ File not found: ${filePath}`)
      continue
    }

    const storagePath = paper.filename
    const result = await uploadFile(filePath, storagePath)

    if (result.success) {
      successCount++
      uploadedPapers.push({
        subject: paper.subject,
        filename: paper.filename,
        storage_path: storagePath,
        file_size: result.fileSize
      })
    }
    console.log('')
  }

  console.log(`\n✅ Upload complete! Successfully uploaded ${successCount}/${guessPapers.length} papers\n`)

  // Generate SQL for database insertion
  console.log('📋 Run this SQL in Supabase SQL Editor to complete setup:\n')
  console.log('-- Create table')
  console.log(`CREATE TABLE IF NOT EXISTS guess_papers_2026 (
  id BIGSERIAL PRIMARY KEY,
  subject TEXT NOT NULL UNIQUE,
  filename TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  file_size BIGINT,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_guess_papers_subject ON guess_papers_2026(subject);

ALTER TABLE guess_papers_2026 ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "Allow public read access" ON guess_papers_2026
  FOR SELECT USING (is_available = true);

-- Insert data
`)

  uploadedPapers.forEach(paper => {
    console.log(`INSERT INTO guess_papers_2026 (subject, filename, storage_path, file_size) VALUES ('${paper.subject}', '${paper.filename}', '${paper.storage_path}', ${paper.file_size}) ON CONFLICT (subject) DO NOTHING;`)
  })

  console.log('\n✅ Files uploaded to storage successfully!')
  console.log('👉 Copy and run the SQL above in Supabase to complete the setup.')
}

main().catch(console.error)
