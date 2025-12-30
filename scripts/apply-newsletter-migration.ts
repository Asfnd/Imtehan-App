/**
 * Script to apply newsletter_subscribers table migration to production database
 *
 * Run with: npx tsx scripts/apply-newsletter-migration.ts
 */

import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { resolve } from 'path'

// Load environment variables
config({ path: resolve(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing required environment variables:')
  console.error('   - NEXT_PUBLIC_SUPABASE_URL')
  console.error('   - SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function applyMigration() {
  console.log('🚀 Applying newsletter_subscribers migration...\n')

  try {
    // Check if table already exists
    const { data: existingTable, error: checkError } = await supabase
      .from('newsletter_subscribers')
      .select('id')
      .limit(1)

    if (!checkError) {
      console.log('✅ Table newsletter_subscribers already exists!')
      console.log('   No migration needed.\n')
      return
    }

    console.log('📝 Creating newsletter_subscribers table...')

    // Read the migration file
    const fs = require('fs')
    const path = require('path')
    const migrationPath = path.join(process.cwd(), 'supabase/migrations/019_newsletter_subscribers.sql')
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8')

    // Apply migration using Supabase SQL editor or RPC
    console.log('\n⚠️  Please apply this migration manually in Supabase Dashboard:\n')
    console.log('1. Go to https://supabase.com/dashboard')
    console.log('2. Select your project')
    console.log('3. Go to SQL Editor')
    console.log('4. Create a new query')
    console.log('5. Paste the following SQL:\n')
    console.log('─'.repeat(80))
    console.log(migrationSQL)
    console.log('─'.repeat(80))
    console.log('\n6. Click "Run" to execute the migration\n')

    console.log('✅ Migration instructions displayed above!')
  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }
}

applyMigration()
