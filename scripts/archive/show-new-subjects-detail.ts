/**
 * Show detailed info about the newly uploaded subjects
 */

import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  { auth: { autoRefreshToken: false, persistSession: false } }
)

const NEW_SUBJECTS = [
  'Gender Studies',
  'History of USA',
  'International Law',
  'International Relations',
  'Political Science',
  'Public Administration',
  'Sociology'
]

async function showNewSubjectsDetail() {
  console.log('📋 New Subjects Detail Report\n')
  console.log('='.repeat(70))

  for (const subject of NEW_SUBJECTS) {
    console.log(`\n📚 Subject: "${subject}"`)
    console.log('-'.repeat(70))

    // Get total count
    const { count } = await supabase
      .from('css_mcqs_enhanced')
      .select('*', { count: 'exact', head: true })
      .eq('subject', subject)

    console.log(`   Total MCQs: ${count}`)

    // Get years with paper types
    const { data: yearsData } = await supabase
      .from('css_mcqs_enhanced')
      .select('year, paper_type')
      .eq('subject', subject)

    if (yearsData) {
      // Group by year and paper type
      const yearGroups: Record<string, number> = {}
      yearsData.forEach((row: any) => {
        const key = row.paper_type ? `${row.year} - ${row.paper_type}` : `${row.year}`
        yearGroups[key] = (yearGroups[key] || 0) + 1
      })

      // Get unique years
      const uniqueYears = [...new Set(yearsData.map((d: any) => d.year))].sort((a, b) => (b || 0) - (a || 0))
      const yearRange = uniqueYears.length > 0
        ? `${Math.min(...uniqueYears)} - ${Math.max(...uniqueYears)}`
        : 'N/A'

      console.log(`   Year Range: ${yearRange}`)
      console.log(`   Total Years: ${uniqueYears.length}`)

      // Show paper type breakdown
      const hasPaperTypes = yearsData.some((d: any) => d.paper_type)
      if (hasPaperTypes) {
        console.log(`   Has Paper Types: Yes`)
        console.log(`   Breakdown:`)
        Object.entries(yearGroups)
          .sort()
          .slice(0, 5)
          .forEach(([key, count]) => {
            console.log(`      ${key}: ${count} MCQs`)
          })
        if (Object.keys(yearGroups).length > 5) {
          console.log(`      ... and ${Object.keys(yearGroups).length - 5} more`)
        }
      } else {
        console.log(`   Has Paper Types: No`)
      }
    }

    // Check if subject name is properly formatted
    const hasLowercase = subject.toLowerCase() !== subject && /[a-z]/.test(subject)
    const format = hasLowercase ? '✅ Title Case' : '❌ All lowercase or ALL CAPS'
    console.log(`   Format: ${format}`)
  }

  console.log('\n' + '='.repeat(70))
  console.log('✅ Report complete\n')
}

showNewSubjectsDetail()
