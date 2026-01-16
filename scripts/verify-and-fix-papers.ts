/**
 * Verify database records match actual storage files
 * Fixes mismatches by removing invalid database records
 * Run: npx tsx scripts/verify-and-fix-papers.ts
 */

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function verifyAndFixPapers() {
  console.log('🔍 VERIFYING DATABASE vs STORAGE\n')
  console.log('=' .repeat(60))

  // 1. Get all database records
  console.log('\n📊 Fetching all past papers from database...\n')

  const { data: allPapers, error: dbError } = await supabase
    .from('past_papers')
    .select('id, subject, year, storage_path, is_available')
    .order('subject', { ascending: true })
    .order('year', { ascending: true })

  if (dbError) {
    console.error(`❌ Error fetching database: ${dbError.message}`)
    process.exit(1)
  }

  console.log(`✅ Found ${allPapers?.length || 0} records in database\n`)

  // 2. Check each file exists in storage
  const brokenRecords: any[] = []
  const workingRecords: any[] = []
  let checked = 0

  console.log('🔍 Checking each file in storage...\n')

  for (const paper of allPapers || []) {
    checked++

    // Show progress every 50 records
    if (checked % 50 === 0) {
      console.log(`   Checked ${checked}/${allPapers?.length}...`)
    }

    try {
      // Try to get the file
      const { data: fileData, error: fileError } = await supabase.storage
        .from('css-past-papers')
        .list(paper.storage_path.split('/').slice(0, -1).join('/'), {
          limit: 1000,
          search: paper.storage_path.split('/').pop()
        })

      // Check if file exists
      const fileExists = fileData && fileData.length > 0

      if (fileExists) {
        workingRecords.push(paper)
      } else {
        brokenRecords.push(paper)
      }
    } catch (error) {
      brokenRecords.push(paper)
    }
  }

  console.log(`\n✅ Verification complete!\n`)

  // 3. Report results
  console.log('=' .repeat(60))
  console.log('\n📊 RESULTS\n')
  console.log(`✅ Working records: ${workingRecords.length}`)
  console.log(`❌ Broken records: ${brokenRecords.length}\n`)

  if (brokenRecords.length > 0) {
    console.log('=' .repeat(60))
    console.log('\n❌ BROKEN RECORDS (Database has record but file missing):\n')

    // Group by subject
    const bySubject = brokenRecords.reduce((acc: any, paper) => {
      if (!acc[paper.subject]) acc[paper.subject] = []
      acc[paper.subject].push(paper)
      return acc
    }, {})

    for (const [subject, papers] of Object.entries(bySubject) as [string, any[]][]) {
      console.log(`📚 ${subject}:`)
      papers.forEach(p => {
        console.log(`   - Year ${p.year} (ID: ${p.id})`)
        console.log(`     Path: ${p.storage_path}`)
      })
      console.log('')
    }

    // 4. Offer to fix
    console.log('=' .repeat(60))
    console.log('\n🔧 FIXING BROKEN RECORDS\n')
    console.log(`Marking ${brokenRecords.length} records as unavailable...\n`)

    // Mark broken records as unavailable instead of deleting
    const idsToDisable = brokenRecords.map(p => p.id)

    const { error: updateError } = await supabase
      .from('past_papers')
      .update({ is_available: false })
      .in('id', idsToDisable)

    if (updateError) {
      console.error(`❌ Error updating records: ${updateError.message}`)
    } else {
      console.log(`✅ Marked ${brokenRecords.length} records as unavailable`)
      console.log(`   These papers will no longer show in the UI\n`)
    }

    // Show summary by subject
    console.log('=' .repeat(60))
    console.log('\n📊 AVAILABLE PAPERS BY SUBJECT (After Fix):\n')

    const { data: availablePapers, error: countError } = await supabase
      .from('past_papers')
      .select('subject')
      .eq('is_available', true)

    if (!countError && availablePapers) {
      const subjectCounts = availablePapers.reduce((acc: any, p) => {
        acc[p.subject] = (acc[p.subject] || 0) + 1
        return acc
      }, {})

      const sortedSubjects = Object.entries(subjectCounts)
        .sort(([a], [b]) => a.localeCompare(b))

      sortedSubjects.forEach(([subject, count]) => {
        console.log(`  ${subject}: ${count} papers`)
      })

      console.log(`\n  TOTAL: ${availablePapers.length} available papers`)
    }

  } else {
    console.log('🎉 All database records have valid files in storage!')
    console.log('   No fixes needed.\n')
  }

  console.log('\n' + '='.repeat(60))
  console.log('\n✅ VERIFICATION AND FIX COMPLETE\n')
}

verifyAndFixPapers().catch(console.error)
