/**
 * Test querying specific subjects to see if MCQs load
 */

import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  { auth: { autoRefreshToken: false, persistSession: false } }
)

const SUBJECTS_TO_TEST = [
  'Gender Studies',
  'History of USA',
  'International Law',
  'International Relations',
  'Political Science',
  'Public Administration',
  'Sociology'
]

async function testSubjectQueries() {
  console.log('🧪 Testing Subject Queries\n')
  console.log('='.repeat(60))

  for (const subject of SUBJECTS_TO_TEST) {
    console.log(`\nTesting: "${subject}"`)
    console.log('-'.repeat(60))

    // Query MCQs for this subject
    const { data, error, count } = await supabase
      .from('css_mcqs_enhanced')
      .select('year, paper_type, question_text', { count: 'exact' })
      .eq('subject', subject)
      .limit(5)

    if (error) {
      console.log(`❌ Error: ${error.message}`)
      continue
    }

    console.log(`✅ Found ${count} total MCQs`)

    if (data && data.length > 0) {
      // Get unique years
      const years = [...new Set(data.map(d => d.year))].sort((a, b) => (b || 0) - (a || 0))
      console.log(`   Years available: ${years.join(', ')}`)

      // Show sample question
      console.log(`   Sample question: "${data[0].question_text?.substring(0, 60)}..."`)

      // Check for paper types
      const paperTypes = [...new Set(data.map(d => d.paper_type).filter(Boolean))]
      if (paperTypes.length > 0) {
        console.log(`   Paper types: ${paperTypes.join(', ')}`)
      }
    } else {
      console.log(`⚠️  No MCQs returned (count shows ${count} but no data)`)
    }
  }

  console.log('\n' + '='.repeat(60))
  console.log('✅ Test complete\n')
}

testSubjectQueries()
