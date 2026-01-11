/**
 * Check all subjects in the database and their MCQ counts
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

async function checkSubjects() {
  console.log('📊 Checking All Subjects in Database')
  console.log('====================================\n')

  // Get all unique subjects with their counts
  const { data, error } = await supabase
    .from('css_mcqs_enhanced')
    .select('subject')

  if (error) {
    console.error('❌ Error fetching subjects:', error.message)
    return
  }

  // Count MCQs per subject
  const subjectCounts = data.reduce((acc: any, row: any) => {
    const subject = row.subject
    if (!acc[subject]) {
      acc[subject] = 0
    }
    acc[subject]++
    return acc
  }, {})

  // Sort by count descending
  const sortedSubjects = Object.entries(subjectCounts)
    .map(([subject, count]) => ({ subject, count }))
    .sort((a: any, b: any) => b.count - a.count)

  console.log('Subject Name → MCQ Count\n')
  sortedSubjects.forEach((item: any) => {
    console.log(`${item.subject} → ${item.count} MCQs`)
  })

  console.log('\n====================================')
  console.log(`Total subjects: ${sortedSubjects.length}`)
}

checkSubjects().catch(console.error)
