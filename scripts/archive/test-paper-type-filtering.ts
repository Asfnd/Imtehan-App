/**
 * Test that paper_type filtering works correctly
 */

import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  { auth: { autoRefreshToken: false, persistSession: false } }
)

async function testPaperTypeFiltering() {
  console.log('🧪 Testing Paper Type Filtering\n')
  console.log('='.repeat(70))

  const testCases = [
    {
      subject: 'Political Science',
      year: 2025,
      paper_type: 'Paper 1',
      expectedCount: 20
    },
    {
      subject: 'Political Science',
      year: 2025,
      paper_type: 'Paper 2',
      expectedCount: 20
    },
    {
      subject: 'Political Science',
      year: 2025,
      paper_type: null,
      expectedCount: 40 // Both papers combined
    },
    {
      subject: 'International Relations',
      year: 2025,
      paper_type: 'Paper 1',
      expectedCount: 20
    },
    {
      subject: 'International Relations',
      year: 2025,
      paper_type: 'Paper 2',
      expectedCount: 20
    }
  ]

  for (const test of testCases) {
    console.log(`\n📋 Test: ${test.subject} - ${test.year}${test.paper_type ? ` - ${test.paper_type}` : ' (no paper type filter)'}`)
    console.log('-'.repeat(70))

    // Build query
    let query = supabase
      .from('css_mcqs_enhanced')
      .select('*', { count: 'exact', head: true })
      .eq('subject', test.subject)
      .eq('year', test.year)

    if (test.paper_type) {
      query = query.eq('paper_type', test.paper_type)
    }

    const { count, error } = await query

    if (error) {
      console.log(`   ❌ Error: ${error.message}`)
      continue
    }

    const passed = count === test.expectedCount
    const status = passed ? '✅ PASS' : '❌ FAIL'

    console.log(`   Expected: ${test.expectedCount} MCQs`)
    console.log(`   Actual:   ${count} MCQs`)
    console.log(`   ${status}`)

    if (!passed) {
      console.log(`   ⚠️  Count mismatch!`)
    }
  }

  console.log('\n' + '='.repeat(70))
  console.log('✅ Test complete\n')
}

testPaperTypeFiltering()
