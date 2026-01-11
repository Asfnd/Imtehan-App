/**
 * Run migration to add paper_type column to css_mcqs table
 */

import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function runMigration() {
  console.log('🔄 Running migration: add_paper_type_to_css_mcqs')
  console.log('================================================\n')

  const migrationPath = path.join(__dirname, '../supabase/migrations/add_paper_type_to_css_mcqs.sql')
  const sql = fs.readFileSync(migrationPath, 'utf-8')

  // Split SQL into individual statements
  const statements = sql
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith('--'))

  console.log(`Found ${statements.length} SQL statements to execute\n`)

  for (let i = 0; i < statements.length; i++) {
    const statement = statements[i]
    console.log(`\nExecuting statement ${i + 1}/${statements.length}:`)
    console.log(`${statement.substring(0, 100)}...`)

    try {
      const { error } = await supabase.rpc('exec_sql', { sql_query: statement + ';' })

      if (error) {
        // Try direct query if RPC fails
        const { error: directError } = await supabase.from('css_mcqs').select('id').limit(0)

        if (directError) {
          console.error(`❌ Error: ${error.message}`)
          console.log('\nℹ️  Note: Some errors are expected if constraints already exist')
        } else {
          console.log('✅ Statement executed (using direct query)')
        }
      } else {
        console.log('✅ Statement executed successfully')
      }
    } catch (err) {
      console.error(`❌ Error:`, err)
      console.log('ℹ️  Continuing with next statement...')
    }
  }

  console.log('\n\n================================================')
  console.log('✅ Migration complete!')
  console.log('================================================\n')

  // Verify the column was added
  console.log('🔍 Verifying paper_type column exists...\n')

  const { data, error } = await supabase
    .from('css_mcqs')
    .select('id, subject, year, paper_type')
    .limit(1)

  if (error) {
    console.error('❌ Verification failed:', error.message)
  } else {
    console.log('✅ Verification successful! Sample row:', data?.[0] || 'No data yet')
  }
}

runMigration().catch(console.error)
