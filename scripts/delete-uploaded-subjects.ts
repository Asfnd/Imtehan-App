/**
 * Delete subjects that were uploaded from extracted_mcqs_ultra_clean
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
  'gender-studies',
  'history-of-usa',
  'international-law',
  'international-relations',
  'political-science',
  'public-administration',
  'sociology'
]

async function deleteSubjects() {
  console.log('🗑️  Deleting Uploaded Subjects')
  console.log('================================\n')

  for (const subject of SUBJECTS_TO_DELETE) {
    console.log(`Deleting: ${subject}`)

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
    }
  }

  console.log('================================')
  console.log('✅ Deletion Complete!')
}

deleteSubjects().catch(console.error)
