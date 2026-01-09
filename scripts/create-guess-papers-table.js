/**
 * Create guess_papers_2026 table in Supabase
 */

const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function createTable() {
  console.log('📊 Creating guess_papers_2026 table...\n')

  // Create table
  const { error: createError } = await supabase.rpc('exec_sql', {
    sql: `
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
    `
  })

  if (createError) {
    console.error('❌ Failed to create table:', createError)

    // Try alternative method using raw SQL
    console.log('\n⚠️  Trying alternative method...')
    console.log('\nPlease run this SQL manually in Supabase SQL Editor:\n')
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

CREATE INDEX IF NOT EXISTS idx_guess_papers_subject ON guess_papers_2026(subject);

ALTER TABLE guess_papers_2026 ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON guess_papers_2026
  FOR SELECT USING (is_available = true);
    `)

    return false
  }

  console.log('✅ Table created successfully')

  // Create index
  const { error: indexError } = await supabase.rpc('exec_sql', {
    sql: 'CREATE INDEX IF NOT EXISTS idx_guess_papers_subject ON guess_papers_2026(subject);'
  })

  if (indexError) {
    console.log('⚠️  Could not create index (may need to be done manually)')
  } else {
    console.log('✅ Index created successfully')
  }

  // Enable RLS
  const { error: rlsError } = await supabase.rpc('exec_sql', {
    sql: 'ALTER TABLE guess_papers_2026 ENABLE ROW LEVEL SECURITY;'
  })

  if (rlsError) {
    console.log('⚠️  Could not enable RLS (may need to be done manually)')
  } else {
    console.log('✅ RLS enabled successfully')
  }

  // Create policy
  const { error: policyError } = await supabase.rpc('exec_sql', {
    sql: `
      CREATE POLICY IF NOT EXISTS "Allow public read access" ON guess_papers_2026
        FOR SELECT USING (is_available = true);
    `
  })

  if (policyError) {
    console.log('⚠️  Could not create policy (may need to be done manually)')
  } else {
    console.log('✅ Policy created successfully')
  }

  return true
}

async function main() {
  const success = await createTable()

  if (success) {
    console.log('\n✅ Database setup complete!')
    console.log('👉 Now run: node scripts/upload-guess-papers.js')
  } else {
    console.log('\n👉 Please create the table manually in Supabase, then run:')
    console.log('   node scripts/upload-guess-papers.js')
  }
}

main().catch(console.error)
