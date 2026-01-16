/**
 * Final comprehensive verification before deployment
 * Run: npx tsx scripts/final-verification.ts
 */

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function finalVerification() {
  console.log('🔍 FINAL VERIFICATION\n')
  console.log('=' .repeat(60))

  let passedTests = 0
  let failedTests = 0

  // TEST 1: Check for duplicates
  console.log('\n📊 TEST 1: Checking for duplicate records...\n')

  const { data: allRecords } = await supabase
    .from('past_papers')
    .select('subject, year')
    .eq('is_available', true)

  const seen = new Set<string>()
  const duplicates: string[] = []

  for (const record of allRecords || []) {
    const key = `${record.subject}-${record.year}`
    if (seen.has(key)) {
      duplicates.push(key)
    }
    seen.add(key)
  }

  if (duplicates.length === 0) {
    console.log('✅ PASS: No duplicate records found')
    passedTests++
  } else {
    console.log(`❌ FAIL: Found ${duplicates.length} duplicates:`)
    duplicates.forEach(d => console.log(`  - ${d}`))
    failedTests++
  }

  // TEST 2: Test specific problem cases
  console.log('\n' + '='.repeat(60))
  console.log('\n📄 TEST 2: Testing specific problem papers...\n')

  const testCases = [
    { subject: 'current-affairs', year: 2025 },
    { subject: 'english-essay', year: 2025 },
    { subject: 'pakistan-affairs', year: 2025 },
    { subject: 'economics', year: 2023 },
  ]

  for (const testCase of testCases) {
    const { data, error } = await supabase
      .from('past_papers')
      .select('storage_path')
      .eq('subject', testCase.subject)
      .eq('year', testCase.year)
      .eq('is_available', true)
      .single()

    if (error || !data) {
      console.log(`❌ ${testCase.subject} (${testCase.year}): NOT FOUND in database`)
      failedTests++
      continue
    }

    // Check if file exists
    const { data: urlData } = supabase.storage
      .from('css-past-papers')
      .getPublicUrl(data.storage_path)

    try {
      const response = await fetch(urlData.publicUrl, { method: 'HEAD' })
      if (response.ok) {
        console.log(`✅ ${testCase.subject} (${testCase.year}): OK`)
        passedTests++
      } else {
        console.log(`❌ ${testCase.subject} (${testCase.year}): File not accessible (${response.status})`)
        failedTests++
      }
    } catch (e) {
      console.log(`❌ ${testCase.subject} (${testCase.year}): Network error`)
      failedTests++
    }
  }

  // TEST 3: Check all subjects have papers
  console.log('\n' + '='.repeat(60))
  console.log('\n📚 TEST 3: Checking available papers by subject...\n')

  const { data: availableRecords } = await supabase
    .from('past_papers')
    .select('subject')
    .eq('is_available', true)

  if (availableRecords) {
    const counts: Record<string, number> = {}
    for (const r of availableRecords) {
      counts[r.subject] = (counts[r.subject] || 0) + 1
    }

    const subjects = Object.entries(counts).sort(([a], [b]) => a.localeCompare(b))

    console.log(`Found papers for ${subjects.length} subjects:\n`)

    const sample = subjects.slice(0, 10)
    sample.forEach(([subject, count]) => {
      console.log(`  ${subject}: ${count} papers`)
    })

    if (subjects.length > 10) {
      console.log(`  ... and ${subjects.length - 10} more subjects`)
    }

    console.log(`\n✅ Total: ${availableRecords.length} available papers`)
    passedTests++
  } else {
    console.log('❌ Failed to fetch available papers')
    failedTests++
  }

  // TEST 4: Solved papers
  console.log('\n' + '='.repeat(60))
  console.log('\n📖 TEST 4: Testing solved papers...\n')

  const { data: solvedUrl } = supabase.storage
    .from('css-solved-papers')
    .getPublicUrl('solved-papers/jwt_css_solved_paper_2024.pdf')

  try {
    const response = await fetch(solvedUrl.publicUrl, { method: 'HEAD' })
    if (response.ok) {
      console.log('✅ Solved papers: OK')
      passedTests++
    } else {
      console.log(`❌ Solved papers: Not accessible (${response.status})`)
      failedTests++
    }
  } catch (e) {
    console.log('❌ Solved papers: Network error')
    failedTests++
  }

  // TEST 5: Guess papers
  console.log('\n' + '='.repeat(60))
  console.log('\n🎯 TEST 5: Testing guess papers...\n')

  const { data: guessPapers } = await supabase
    .from('guess_papers_2026')
    .select('subject, storage_path')
    .eq('is_available', true)
    .limit(3)

  if (guessPapers && guessPapers.length > 0) {
    let guessOk = 0
    for (const paper of guessPapers) {
      const { data: urlData } = supabase.storage
        .from('css-guess-papers-2026')
        .getPublicUrl(paper.storage_path)

      try {
        const response = await fetch(urlData.publicUrl, { method: 'HEAD' })
        if (response.ok) {
          console.log(`✅ ${paper.subject}: OK`)
          guessOk++
        }
      } catch (e) {
        console.log(`❌ ${paper.subject}: Error`)
      }
    }
    if (guessOk === guessPapers.length) {
      passedTests++
    } else {
      failedTests++
    }
  } else {
    console.log('⚠️  No guess papers found')
    failedTests++
  }

  // SUMMARY
  console.log('\n' + '='.repeat(60))
  console.log('\n📊 FINAL RESULTS\n')
  console.log(`✅ Passed: ${passedTests}`)
  console.log(`❌ Failed: ${failedTests}`)
  console.log(`📈 Success Rate: ${((passedTests / (passedTests + failedTests)) * 100).toFixed(1)}%\n`)

  if (failedTests === 0) {
    console.log('🎉 ALL TESTS PASSED! Ready to deploy to production.\n')
  } else {
    console.log('⚠️  SOME TESTS FAILED. Fix issues before deploying.\n')
  }

  console.log('=' .repeat(60))
  console.log('')
}

finalVerification().catch(console.error)
