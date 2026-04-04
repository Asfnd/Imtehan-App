/**
 * Row counts for the shared bank used by CSS MPT and PMS Competitive (same tables).
 * Run: npm run verify-pms-setup
 */

import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const TABLES = [
  'english',
  'general_knowledge',
  'pakistan_studies',
  'islamiat',
  'current_affairs',
  'everyday_science',
  'general_math',
  'geography',
] as const

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) {
    console.error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY')
    process.exit(1)
  }

  const supabase = createClient(url, key)
  console.log('Shared CSS / PMS general-paper table row counts (public read):\n')

  let total = 0
  for (const table of TABLES) {
    const { count, error } = await supabase.from(table).select('*', { count: 'exact', head: true })
    if (error) {
      console.log(`  ${table}: ERROR — ${error.message}`)
      continue
    }
    const n = count ?? 0
    total += n
    console.log(`  ${table}: ${n.toLocaleString()}`)
  }
  console.log(`\n  Total (all modules): ${total.toLocaleString()}`)
  if (total === 0) {
    console.log('\n  Add CSVs under PPSC_* folders and run: npm run import-mcqs')
    console.log('  (needs SUPABASE_SERVICE_ROLE_KEY in .env.local for inserts)\n')
  }
}

main().catch(console.error)
