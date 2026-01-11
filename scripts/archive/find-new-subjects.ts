import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(__dirname, '../.env.local') })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  { auth: { autoRefreshToken: false, persistSession: false } }
)

const NEW_SUBJECTS = [
  'gender-studies',
  'history-of-usa',
  'international-law',
  'international-relations',
  'political-science',
  'public-administration',
  'sociology'
]

async function findNewSubjects() {
  console.log('Searching for newly uploaded subjects:\n')

  for (const subject of NEW_SUBJECTS) {
    const { count, error } = await supabase
      .from('css_mcqs_enhanced')
      .select('*', { count: 'exact', head: true })
      .eq('subject', subject)

    if (error) {
      console.log(`${subject}: ERROR - ${error.message}`)
    } else {
      console.log(`${subject}: ${count} MCQs`)
    }
  }

  // Also check for variations
  console.log('\nChecking for similar subjects (case variations):\n')

  const { data: allSubjects } = await supabase
    .from('css_mcqs_enhanced')
    .select('subject')

  const uniqueSubjects = [...new Set(allSubjects?.map(s => s.subject) || [])]

  const relevant = uniqueSubjects.filter(s =>
    s.toLowerCase().includes('gender') ||
    s.toLowerCase().includes('history') ||
    s.toLowerCase().includes('international') ||
    s.toLowerCase().includes('political') ||
    s.toLowerCase().includes('public') ||
    s.toLowerCase().includes('sociology')
  )

  relevant.forEach(s => console.log(`  - ${s}`))
}

findNewSubjects()
