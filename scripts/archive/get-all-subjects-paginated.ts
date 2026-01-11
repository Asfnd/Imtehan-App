import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  { auth: { autoRefreshToken: false, persistSession: false } }
)

async function getAllSubjectsPaginated() {
  let allData: any[] = []
  let from = 0
  const pageSize = 1000

  console.log('Fetching all subjects...\n')

  while (true) {
    const { data, error } = await supabase
      .from('css_mcqs_enhanced')
      .select('subject')
      .range(from, from + pageSize - 1)

    if (error) {
      console.error('Error:', error)
      break
    }

    if (!data || data.length === 0) break

    allData = allData.concat(data)
    console.log(`Fetched ${allData.length} MCQs so far...`)

    if (data.length < pageSize) break
    from += pageSize
  }

  console.log(`\nTotal MCQs fetched: ${allData.length}\n`)

  const counts: Record<string, number> = {}
  allData.forEach((row) => {
    counts[row.subject] = (counts[row.subject] || 0) + 1
  })

  const sorted = Object.entries(counts).sort((a, b) => (b[1] as number) - (a[1] as number))

  console.log('All subjects:\n')
  sorted.forEach(([s, c]) => {
    console.log(`${s} → ${c} MCQs`)
  })

  console.log(`\nTotal unique subjects: ${sorted.length}`)
}

getAllSubjectsPaginated()
