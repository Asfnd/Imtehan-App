/**
 * Check for subjects with lowercase or kebab-case names
 */

import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  { auth: { autoRefreshToken: false, persistSession: false } }
)

async function checkLowercaseSubjects() {
  console.log('🔍 Checking for subjects with incorrect casing...\n')

  let allData: any[] = []
  let from = 0
  const pageSize = 1000

  while (true) {
    const { data } = await supabase
      .from('css_mcqs_enhanced')
      .select('subject')
      .range(from, from + pageSize - 1)

    if (!data || data.length === 0) break
    allData = allData.concat(data)
    if (data.length < pageSize) break
    from += pageSize
  }

  const counts: Record<string, number> = {}
  allData.forEach((row) => {
    counts[row.subject] = (counts[row.subject] || 0) + 1
  })

  const subjects = Object.keys(counts)

  // Find subjects with lowercase letters or kebab-case
  const lowercaseSubjects = subjects.filter(s => {
    // Check if it has lowercase letters at the start or kebab-case
    return s.includes('-') || /^[a-z]/.test(s) || s !== s.split(' ').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
  })

  console.log('Subjects with incorrect casing:\n')
  lowercaseSubjects.forEach(s => {
    console.log(`"${s}" → ${counts[s]} MCQs`)
  })

  console.log('\n\nAll subjects (for reference):\n')
  Object.entries(counts)
    .sort((a, b) => (b[1] as number) - (a[1] as number))
    .forEach(([s, c]) => {
      const hasIssue = s.includes('-') || /^[a-z]/.test(s)
      const marker = hasIssue ? '❌' : '✅'
      console.log(`${marker} "${s}" → ${c} MCQs`)
    })

  console.log(`\nTotal subjects: ${subjects.length}`)
  console.log(`Subjects with incorrect casing: ${lowercaseSubjects.length}`)
}

checkLowercaseSubjects()
