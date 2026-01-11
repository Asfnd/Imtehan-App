/**
 * Delete old subject versions with fewer MCQs
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

const SUBJECTS_TO_DELETE = [
  'Political Science',        // 220 MCQs (keeping political science with 1003)
  'International Relations',  // 60 MCQs (keeping international-relations with 690)
  'International Law',        // 40 MCQs (keeping international-law with 497)
  'History of USA',           // 40 MCQs (keeping history-of-usa with 496)
  'Public Administration',    // 40 MCQs (keeping public-administration with 437)
  'Sociology',                // 20 MCQs (keeping sociology with 420)
  'Gender Studies'            // 40 MCQs (keeping gender-studies with 120)
]

async function deleteOldDuplicates() {
  console.log('🗑️  Deleting Old Duplicate Subjects')
  console.log('====================================\n')

  let totalDeleted = 0

  for (const subject of SUBJECTS_TO_DELETE) {
    console.log(`Deleting: "${subject}"`)

    // Count first
    const { count, error: countError } = await supabase
      .from('css_mcqs_enhanced')
      .select('*', { count: 'exact', head: true })
      .eq('subject', subject)

    if (countError) {
      console.error(`  ❌ Error counting ${subject}:`, countError.message)
      continue
    }

    console.log(`  Found ${count} MCQs`)

    if (count === 0) {
      console.log(`  ⏭️  No data to delete\n`)
      continue
    }

    // Delete
    const { error: deleteError } = await supabase
      .from('css_mcqs_enhanced')
      .delete()
      .eq('subject', subject)

    if (deleteError) {
      console.error(`  ❌ Error deleting ${subject}:`, deleteError.message)
    } else {
      console.log(`  ✅ Deleted ${count} MCQs\n`)
      totalDeleted += count || 0
    }
  }

  console.log('====================================')
  console.log(`✅ Deletion Complete! Total deleted: ${totalDeleted} MCQs`)
}

deleteOldDuplicates().catch(console.error)
