import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  { auth: { autoRefreshToken: false, persistSession: false } }
)

async function getAllSubjects() {
  const { data, count } = await supabase
    .from('css_mcqs_enhanced')
    .select('subject', { count: 'exact' })

  console.log(`Total MCQs in database: ${count}\n`)

  const counts: Record<string, number> = {}
  data?.forEach((row) => {
    counts[row.subject] = (counts[row.subject] || 0) + 1
  })

  const sorted = Object.entries(counts).sort((a, b) => (b[1] as number) - (a[1] as number))

  console.log('All subjects:\n')
  sorted.forEach(([s, c]) => {
    console.log(`${s} → ${c} MCQs`)
  })

  console.log(`\nTotal unique subjects: ${sorted.length}`)
}

getAllSubjects()
