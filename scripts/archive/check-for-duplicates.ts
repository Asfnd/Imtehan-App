import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(__dirname, '../.env.local') })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  { auth: { autoRefreshToken: false, persistSession: false } }
)

async function checkForDuplicates() {
  const { data: allSubjects } = await supabase
    .from('css_mcqs_enhanced')
    .select('subject')

  const counts: Record<string, number> = {}
  allSubjects?.forEach((row) => {
    counts[row.subject] = (counts[row.subject] || 0) + 1
  })

  // Check for potential duplicates (case-insensitive, different formatting)
  const subjects = Object.keys(counts)

  console.log('Checking for potential duplicates:\n')

  const potentialDuplicates = [
    { kebab: 'gender-studies', variations: ['Gender Studies', 'gender studies', 'GenderStudies'] },
    { kebab: 'history-of-usa', variations: ['History of USA', 'history of usa', 'History Of USA'] },
    { kebab: 'international-law', variations: ['International Law', 'international law'] },
    { kebab: 'international-relations', variations: ['International Relations', 'international relations'] },
    { kebab: 'political-science', variations: ['Political Science', 'political science'] },
    { kebab: 'public-administration', variations: ['Public Administration', 'public administration'] },
    { kebab: 'sociology', variations: ['Sociology', 'sociology'] }
  ]

  for (const check of potentialDuplicates) {
    const found = subjects.filter(s =>
      s === check.kebab || check.variations.some(v => s.toLowerCase() === v.toLowerCase())
    )

    if (found.length > 0) {
      console.log(`\n${check.kebab}:`)
      found.forEach(s => {
        console.log(`  ${s} → ${counts[s]} MCQs`)
      })
    }
  }

  console.log('\n\nAll subjects for reference:')
  Object.entries(counts)
    .sort((a, b) => (b[1] as number) - (a[1] as number))
    .forEach(([subject, count]) => {
      console.log(`${subject} → ${count} MCQs`)
    })
}

checkForDuplicates()
