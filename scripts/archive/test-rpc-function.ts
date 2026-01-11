/**
 * Test the RPC function that returns subject stats
 */

import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  { auth: { autoRefreshToken: false, persistSession: false } }
)

async function testRPCFunction() {
  console.log('🧪 Testing RPC Function: get_enhanced_css_subject_stats\n')
  console.log('='.repeat(70))

  const { data, error } = await supabase.rpc('get_enhanced_css_subject_stats')

  if (error) {
    console.error('❌ Error calling RPC function:', error)
    return
  }

  console.log(`\n✅ RPC function returned ${data?.length || 0} subjects\n`)

  // Filter for the newly uploaded subjects
  const newSubjects = [
    'Gender Studies',
    'History of USA',
    'International Law',
    'International Relations',
    'Political Science',
    'Public Administration',
    'Sociology'
  ]

  console.log('📋 New Subjects from RPC:\n')
  data
    ?.filter((s: any) => newSubjects.includes(s.subject))
    .forEach((s: any) => {
      console.log(`   "${s.subject}"`)
      console.log(`      MCQs: ${s.question_count}`)
      console.log(`      Years: ${s.years?.length || 0} years`)
      console.log()
    })

  console.log('='.repeat(70))

  // Show all subjects to check formatting
  console.log('\n📚 All Subjects (checking format):\n')
  data
    ?.sort((a: any, b: any) => a.subject.localeCompare(b.subject))
    .forEach((s: any) => {
      const hasLowercase = /[a-z]/.test(s.subject)
      const hasUppercase = /[A-Z]/.test(s.subject)
      const format = hasUppercase && hasLowercase ? '✅' : '❌'
      console.log(`${format} "${s.subject}" → ${s.question_count} MCQs`)
    })

  console.log('\n' + '='.repeat(70))
  console.log('✅ Test complete\n')
}

testRPCFunction()
