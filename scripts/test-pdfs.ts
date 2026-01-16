/**
 * Test all PDF loading functions locally
 * Run: npx tsx scripts/test-pdfs.ts
 */

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase credentials in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testPDFs() {
  console.log('🧪 TESTING PDF LOADING FUNCTIONS\n')
  console.log('=' .repeat(60))

  let passedTests = 0
  let failedTests = 0

  // Test 1: Past Papers
  console.log('\n📚 TEST 1: Past Papers Loading\n')

  const { data: samplePapers, error: papersError } = await supabase
    .from('past_papers')
    .select('subject, year, storage_path')
    .limit(5)

  if (papersError) {
    console.error(`❌ FAILED: Cannot fetch past papers from database`)
    console.error(`   Error: ${papersError.message}`)
    failedTests++
  } else {
    console.log(`✅ Found ${samplePapers?.length} past papers in database\n`)

    for (const paper of samplePapers || []) {
      const { data: urlData } = supabase.storage
        .from('css-past-papers')
        .getPublicUrl(paper.storage_path)

      console.log(`📄 ${paper.subject} (${paper.year})`)
      console.log(`   Storage: ${paper.storage_path}`)
      console.log(`   URL: ${urlData.publicUrl}`)

      // Test if URL is accessible
      try {
        const response = await fetch(urlData.publicUrl, { method: 'HEAD' })
        if (response.ok) {
          console.log(`   Status: ✅ ACCESSIBLE (${response.status})`)
          passedTests++
        } else {
          console.log(`   Status: ❌ NOT ACCESSIBLE (${response.status})`)
          failedTests++
        }
      } catch (error) {
        console.log(`   Status: ❌ ERROR - ${error instanceof Error ? error.message : 'Unknown'}`)
        failedTests++
      }
      console.log('')
    }
  }

  // Test 2: Solved Papers
  console.log('=' .repeat(60))
  console.log('\n📖 TEST 2: Solved Papers Loading\n')

  const solvedPaperPath = 'solved-papers/jwt_css_solved_paper_2024.pdf'
  const { data: solvedUrlData } = supabase.storage
    .from('css-solved-papers')
    .getPublicUrl(solvedPaperPath)

  console.log(`📄 Solved Paper Test`)
  console.log(`   Storage: ${solvedPaperPath}`)
  console.log(`   URL: ${solvedUrlData.publicUrl}`)

  try {
    const response = await fetch(solvedUrlData.publicUrl, { method: 'HEAD' })
    if (response.ok) {
      console.log(`   Status: ✅ ACCESSIBLE (${response.status})`)
      console.log(`   Size: ${response.headers.get('content-length')} bytes`)
      console.log(`   Type: ${response.headers.get('content-type')}`)
      passedTests++
    } else {
      console.log(`   Status: ❌ NOT ACCESSIBLE (${response.status})`)
      failedTests++
    }
  } catch (error) {
    console.log(`   Status: ❌ ERROR - ${error instanceof Error ? error.message : 'Unknown'}`)
    failedTests++
  }

  // Test 3: Guess Papers
  console.log('\n' + '='.repeat(60))
  console.log('\n🎯 TEST 3: Guess Papers Loading\n')

  const { data: guessPapers, error: guessError } = await supabase
    .from('guess_papers_2026')
    .select('subject, storage_path')
    .limit(5)

  if (guessError) {
    console.error(`❌ FAILED: Cannot fetch guess papers from database`)
    console.error(`   Error: ${guessError.message}`)
    failedTests++
  } else {
    console.log(`✅ Found ${guessPapers?.length} guess papers in database\n`)

    for (const paper of guessPapers || []) {
      const { data: urlData } = supabase.storage
        .from('css-guess-papers-2026')
        .getPublicUrl(paper.storage_path)

      console.log(`📄 ${paper.subject}`)
      console.log(`   Storage: ${paper.storage_path}`)
      console.log(`   URL: ${urlData.publicUrl}`)

      try {
        const response = await fetch(urlData.publicUrl, { method: 'HEAD' })
        if (response.ok) {
          console.log(`   Status: ✅ ACCESSIBLE (${response.status})`)
          passedTests++
        } else {
          console.log(`   Status: ❌ NOT ACCESSIBLE (${response.status})`)
          failedTests++
        }
      } catch (error) {
        console.log(`   Status: ❌ ERROR - ${error instanceof Error ? error.message : 'Unknown'}`)
        failedTests++
      }
      console.log('')
    }
  }

  // Test 4: Check for common issues
  console.log('=' .repeat(60))
  console.log('\n🔍 TEST 4: Checking for Common Issues\n')

  // Check if custom storage domain is configured
  const customStorageUrl = process.env.NEXT_PUBLIC_STORAGE_URL
  if (customStorageUrl) {
    console.log(`⚠️  Custom storage domain configured: ${customStorageUrl}`)
    console.log(`   Testing if it's working...`)

    try {
      const testUrl = solvedUrlData.publicUrl.replace(supabaseUrl, customStorageUrl)
      const response = await fetch(testUrl, { method: 'HEAD', signal: AbortSignal.timeout(5000) })
      if (response.ok) {
        console.log(`   ✅ Custom domain is working`)
      } else {
        console.log(`   ❌ Custom domain returned ${response.status}`)
        console.log(`   💡 Consider disabling NEXT_PUBLIC_STORAGE_URL in .env.local`)
      }
    } catch (error) {
      console.log(`   ❌ Custom domain is NOT working: ${error instanceof Error ? error.message : 'timeout'}`)
      console.log(`   💡 Disable NEXT_PUBLIC_STORAGE_URL to use direct Supabase storage`)
      failedTests++
    }
  } else {
    console.log(`✅ Using direct Supabase storage (recommended)`)
  }

  // Summary
  console.log('\n' + '='.repeat(60))
  console.log('\n📊 TEST SUMMARY\n')
  console.log(`✅ Passed: ${passedTests}`)
  console.log(`❌ Failed: ${failedTests}`)
  console.log(`📈 Success Rate: ${((passedTests / (passedTests + failedTests)) * 100).toFixed(1)}%\n`)

  if (failedTests === 0) {
    console.log('🎉 ALL TESTS PASSED! Ready to push to production.\n')
  } else {
    console.log('⚠️  SOME TESTS FAILED. Fix issues before deploying.\n')
  }
}

testPDFs().catch(console.error)
