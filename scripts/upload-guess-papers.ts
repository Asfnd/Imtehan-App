/**
 * Upload Guess Papers to Supabase
 *
 * This script uploads CSS 2026 Guess Papers to Supabase storage and database
 */

import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as path from 'path'

// Load environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials in environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

const BUCKET_NAME = 'css-guess-papers-2026'
const SOURCE_FOLDER = '/Users/asfandiyarsafi/Desktop/Mocks'

const guessPapers = [
  { subject: 'Current Affairs', filename: 'Current Affairs.pdf' },
  { subject: 'Essay', filename: 'Essay.pdf' },
  { subject: 'General Science & Ability', filename: 'General Science & Ability.pdf' },
  { subject: 'Pakistan Affairs', filename: 'Pakistan Affairs.pdf' },
  { subject: 'Precis', filename: 'Precis.pdf' }
]

async function createBucket() {
  console.log('📦 Creating storage bucket...')

  const { data, error } = await supabase.storage.createBucket(BUCKET_NAME, {
    public: true,
    fileSizeLimit: 10485760, // 10MB
    allowedMimeTypes: ['application/pdf']
  })

  if (error) {
    if (error.message.includes('already exists')) {
      console.log('✅ Bucket already exists')
      return true
    }
    console.error('❌ Failed to create bucket:', error)
    return false
  }

  console.log('✅ Bucket created successfully')
  return true
}

async function createTable() {
  console.log('📊 Checking database table...')

  // Check if table exists by trying to select from it
  const { error } = await supabase
    .from('guess_papers_2026')
    .select('id')
    .limit(1)

  if (error) {
    console.log('⚠️  Table might not exist. Please create it manually in Supabase with this SQL:')
    console.log(`
CREATE TABLE IF NOT EXISTS guess_papers_2026 (
  id BIGSERIAL PRIMARY KEY,
  subject TEXT NOT NULL UNIQUE,
  filename TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  file_size BIGINT,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_guess_papers_subject ON guess_papers_2026(subject);

-- Enable Row Level Security
ALTER TABLE guess_papers_2026 ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access" ON guess_papers_2026
  FOR SELECT USING (is_available = true);
`)
    return false
  }

  console.log('✅ Table exists')
  return true
}

async function uploadFile(filePath: string, storagePath: string): Promise<boolean> {
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
      console.error(`❌ Failed to upload ${storagePath}:`, error)
      return false
    }

    console.log(`✅ Uploaded ${storagePath}`)
    return true
  } catch (error) {
    console.error(`❌ Error uploading file:`, error)
    return false
  }
}

async function insertDatabaseRecord(paper: { subject: string; filename: string; storagePath: string; fileSize: number }) {
  const { error } = await supabase
    .from('guess_papers_2026')
    .upsert({
      subject: paper.subject,
      filename: paper.filename,
      storage_path: paper.storagePath,
      file_size: paper.fileSize,
      is_available: true,
      updated_at: new Date().toISOString()
    }, {
      onConflict: 'subject'
    })

  if (error) {
    console.error(`❌ Failed to insert database record for ${paper.subject}:`, error)
    return false
  }

  console.log(`✅ Database record created for ${paper.subject}`)
  return true
}

async function main() {
  console.log('🚀 Starting Guess Papers upload...\n')

  // Step 1: Create bucket
  const bucketCreated = await createBucket()
  if (!bucketCreated) {
    console.error('❌ Failed to create bucket. Exiting.')
    process.exit(1)
  }

  // Step 2: Check/create table
  const tableExists = await createTable()
  if (!tableExists) {
    console.error('❌ Please create the table first using the SQL above. Exiting.')
    process.exit(1)
  }

  console.log('\n📁 Uploading files...\n')

  // Step 3: Upload files and create database records
  let successCount = 0
  for (const paper of guessPapers) {
    const filePath = path.join(SOURCE_FOLDER, paper.filename)

    if (!fs.existsSync(filePath)) {
      console.error(`❌ File not found: ${filePath}`)
      continue
    }

    const storagePath = `${paper.filename}`
    const fileSize = fs.statSync(filePath).size

    // Upload file
    const uploaded = await uploadFile(filePath, storagePath)
    if (!uploaded) continue

    // Insert database record
    const inserted = await insertDatabaseRecord({
      subject: paper.subject,
      filename: paper.filename,
      storagePath,
      fileSize
    })

    if (inserted) successCount++
    console.log('')
  }

  console.log(`\n✅ Upload complete! Successfully uploaded ${successCount}/${guessPapers.length} papers\n`)

  // Verify uploads
  console.log('🔍 Verifying uploads...\n')
  const { data, error } = await supabase
    .from('guess_papers_2026')
    .select('*')
    .eq('is_available', true)

  if (error) {
    console.error('❌ Failed to verify uploads:', error)
  } else {
    console.log(`✅ Found ${data.length} guess papers in database:`)
    data.forEach(paper => {
      console.log(`   - ${paper.subject} (${(paper.file_size / 1024).toFixed(2)} KB)`)
    })
  }
}

main().catch(console.error)
