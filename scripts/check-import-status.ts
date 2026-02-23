/**
 * Check if import is complete
 */

import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const tables = [
  'pakistan_studies',
  'general_knowledge',
  'everyday_science',
  'current_affairs',
  'basic_computer',
  'general_math',
  'english',
  'urdu',
  'islamiat',
  'geography',
  'ethics_civics'
]

async function checkStatus() {
  console.log('Checking import status...\n')

  let totalMCQs = 0
  let emptyTables = []
  let errorTables = []

  for (const table of tables) {
    try {
      const { count, error } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true })

      if (error) {
        console.log(`❌ ${table}: Error - ${error.message}`)
        errorTables.push(table)
      } else {
        const c = count || 0
        totalMCQs += c

        if (c === 0) {
          console.log(`⚠️  ${table}: 0 MCQs (empty)`)
          emptyTables.push(table)
        } else {
          console.log(`✅ ${table}: ${c.toLocaleString()} MCQs`)
        }
      }
    } catch (err) {
      console.log(`❌ ${table}: ${err}`)
      errorTables.push(table)
    }
  }

  console.log(`\n${'='.repeat(50)}`)
  console.log(`Total MCQs: ${totalMCQs.toLocaleString()}`)

  if (errorTables.length > 0) {
    console.log(`\n⚠️  Tables with errors (probably don't exist yet):`)
    console.log(errorTables.join(', '))
    console.log(`\nYou need to run schema.sql in Supabase first!`)
  } else if (emptyTables.length > 0) {
    console.log(`\n⚠️  Empty tables: ${emptyTables.join(', ')}`)
    console.log(`\nRun: npm run import-mcqs`)
  } else {
    console.log(`\n✅ Import complete! All tables have data.`)
    console.log(`\nNext step: Build the app pages`)
  }
}

checkStatus().catch(console.error)
