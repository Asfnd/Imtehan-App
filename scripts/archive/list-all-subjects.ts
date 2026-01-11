import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(__dirname, '../.env.local') })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  { auth: { autoRefreshToken: false, persistSession: false } }
)

async function listAllSubjects() {
  const { data } = await supabase.from('css_mcqs_enhanced').select('subject')
  const counts: Record<string, number> = {}

  data?.forEach((row) => {
    counts[row.subject] = (counts[row.subject] || 0) + 1
  })

  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1] as number)

  console.log('All subjects in database:\n')
  sorted.forEach(([subject, count]) => {
    console.log(`${subject} → ${count} MCQs`)
  })

  console.log(`\nTotal: ${sorted.length} subjects`)
}

listAllSubjects()
