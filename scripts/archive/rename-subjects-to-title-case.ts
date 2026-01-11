/**
 * Rename kebab-case subjects to Title Case format
 */

import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(__dirname, '../.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

const SUBJECT_RENAMES = [
  { from: 'gender-studies', to: 'Gender Studies' },
  { from: 'history-of-usa', to: 'History of USA' },
  { from: 'international-law', to: 'International Law' },
  { from: 'international-relations', to: 'International Relations' },
  { from: 'political science', to: 'Political Science' },
  { from: 'public-administration', to: 'Public Administration' },
  { from: 'sociology', to: 'Sociology' }
]

async function renameSubjects() {
  console.log('📝 Renaming Subjects to Title Case')
  console.log('===================================\n')

  let totalUpdated = 0

  for (const rename of SUBJECT_RENAMES) {
    console.log(`Renaming: "${rename.from}" → "${rename.to}"`)

    // Count first
    const { count, error: countError } = await supabase
      .from('css_mcqs_enhanced')
      .select('*', { count: 'exact', head: true })
      .eq('subject', rename.from)

    if (countError) {
      console.error(`  ❌ Error counting ${rename.from}:`, countError.message)
      continue
    }

    console.log(`  Found ${count} MCQs to update`)

    if (count === 0) {
      console.log(`  ⏭️  No data to update\n`)
      continue
    }

    // Update
    const { error: updateError } = await supabase
      .from('css_mcqs_enhanced')
      .update({ subject: rename.to })
      .eq('subject', rename.from)

    if (updateError) {
      console.error(`  ❌ Error updating ${rename.from}:`, updateError.message)
    } else {
      console.log(`  ✅ Updated ${count} MCQs\n`)
      totalUpdated += count || 0
    }
  }

  console.log('===================================')
  console.log(`✅ Rename Complete! Total updated: ${totalUpdated} MCQs`)
}

renameSubjects().catch(console.error)
