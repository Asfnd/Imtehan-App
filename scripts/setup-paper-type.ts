/**
 * Setup paper_type column in css_mcqs_enhanced table
 *
 * Run this before uploading new MCQs
 */

import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'

// Load environment variables from .env.local
dotenv.config({ path: path.join(__dirname, '../.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function setup() {
  console.log('🔧 Setting up paper_type column')
  console.log('================================\n')

  // Check if paper_type column exists by trying to select it
  console.log('1️⃣  Checking if paper_type column exists...')

  const { error } = await supabase
    .from('css_mcqs_enhanced')
    .select('id, paper_type')
    .limit(1)

  if (error) {
    if (error.message.includes('column') && error.message.includes('does not exist')) {
      console.log('❌ paper_type column does not exist')
      console.log('\n⚠️  MANUAL STEP REQUIRED:')
      console.log('   Please run the following SQL in Supabase SQL Editor:')
      console.log('   https://supabase.com/dashboard/project/qsrkkvrrxorbgvbgekew/sql/new\n')
      console.log('=' .repeat(60))
      console.log(`
-- Add paper_type column
ALTER TABLE css_mcqs_enhanced
ADD COLUMN IF NOT EXISTS paper_type TEXT DEFAULT NULL;

-- Add comment
COMMENT ON COLUMN css_mcqs_enhanced.paper_type IS 'Paper type (e.g., "Paper 1", "Paper 2")';

-- Create index
CREATE INDEX IF NOT EXISTS idx_css_mcqs_enhanced_subject_year_paper
ON css_mcqs_enhanced(subject, year, paper_type);
`)
      console.log('=' .repeat(60))
      console.log('\n   After running the SQL, run this script again.\n')
      process.exit(1)
    } else {
      console.error('❌ Unexpected error:', error.message)
      process.exit(1)
    }
  }

  console.log('✅ paper_type column exists!\n')

  // Check a few sample rows
  console.log('2️⃣  Checking sample data...')
  const { data: samples } = await supabase
    .from('css_mcqs_enhanced')
    .select('subject, year, paper_type')
    .limit(5)

  if (samples && samples.length > 0) {
    console.log('\n   Sample rows:')
    samples.forEach(s => {
      console.log(`   - ${s.subject} | ${s.year} | ${s.paper_type || 'NULL'}`)
    })
  } else {
    console.log('   No data in table yet')
  }

  console.log('\n✅ Setup complete! Ready to upload MCQs.\n')
}

setup().catch(console.error)
