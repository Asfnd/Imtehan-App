/**
 * Find and disable all placeholder/demo PDFs (< 0.5 MB)
 * Run: npx tsx scripts/cleanup-placeholder-pdfs.ts
 */

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import * as fs from 'fs'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const MIN_FILE_SIZE_MB = 0.5 // Files smaller than this are likely placeholders

async function cleanupPlaceholders() {
  console.log('🧹 CLEANING UP PLACEHOLDER PDFs\n')
  console.log('=' .repeat(60))
  console.log(`\nLooking for PDFs < ${MIN_FILE_SIZE_MB} MB (likely placeholders)...\n`)

  // Get all available papers
  const { data: allPapers, error: dbError } = await supabase
    .from('past_papers')
    .select('id, subject, year, storage_path, is_available')
    .eq('is_available', true)

  if (dbError || !allPapers) {
    console.error('❌ Error fetching papers:', dbError?.message)
    return
  }

  console.log(`📊 Checking ${allPapers.length} papers...\n`)

  const placeholders: any[] = []
  const real: any[] = []
  let checked = 0

  // Check each paper's file size
  for (const paper of allPapers) {
    checked++

    if (checked % 100 === 0) {
      console.log(`   Checked ${checked}/${allPapers.length}...`)
    }

    const pathParts = paper.storage_path.split('/')
    const folder = pathParts.slice(0, -1).join('/')
    const filename = pathParts[pathParts.length - 1]

    // Get file info
    const { data: files } = await supabase.storage
      .from('css-past-papers')
      .list(folder, { limit: 100 })

    const file = files?.find(f => f.name === filename)

    if (!file) {
      placeholders.push({ ...paper, reason: 'File not found in storage', sizeMB: 0 })
      continue
    }

    const sizeMB = (file.metadata?.size || 0) / 1024 / 1024

    if (sizeMB < MIN_FILE_SIZE_MB) {
      placeholders.push({ ...paper, reason: 'File too small (placeholder)', sizeMB })
    } else {
      real.push({ ...paper, sizeMB })
    }
  }

  // Report results
  console.log('\n' + '='.repeat(60))
  console.log('\n📊 RESULTS\n')
  console.log(`✅ Real papers (>= ${MIN_FILE_SIZE_MB} MB): ${real.length}`)
  console.log(`❌ Placeholders (< ${MIN_FILE_SIZE_MB} MB): ${placeholders.length}\n`)

  if (placeholders.length === 0) {
    console.log('🎉 No placeholders found! All PDFs are real.\n')
    return
  }

  // Group by subject
  console.log('=' .repeat(60))
  console.log('\n❌ PLACEHOLDER PDFs BY SUBJECT:\n')

  const bySubject: Record<string, any[]> = {}
  for (const p of placeholders) {
    if (!bySubject[p.subject]) bySubject[p.subject] = []
    bySubject[p.subject].push(p)
  }

  const sortedSubjects = Object.entries(bySubject).sort(([a], [b]) => a.localeCompare(b))

  for (const [subject, papers] of sortedSubjects) {
    console.log(`📚 ${subject}: ${papers.length} placeholder(s)`)
    const years = papers.map(p => p.year).sort((a, b) => a - b)
    console.log(`   Years: ${years.join(', ')}`)

    // Show sizes for first few
    papers.slice(0, 3).forEach(p => {
      console.log(`   - ${p.year}: ${p.sizeMB.toFixed(3)} MB`)
    })
    if (papers.length > 3) {
      console.log(`   ... and ${papers.length - 3} more`)
    }
    console.log('')
  }

  // Disable placeholders
  console.log('=' .repeat(60))
  console.log('\n🔧 DISABLING PLACEHOLDER PDFs...\n')

  const idsToDisable = placeholders.map(p => p.id)

  const { error: updateError } = await supabase
    .from('past_papers')
    .update({ is_available: false })
    .in('id', idsToDisable)

  if (updateError) {
    console.error(`❌ Error updating database: ${updateError.message}`)
    return
  }

  console.log(`✅ Disabled ${placeholders.length} placeholder PDFs`)
  console.log(`   These will no longer show in the UI\n`)

  // Generate report file
  const report = {
    timestamp: new Date().toISOString(),
    total_checked: allPapers.length,
    real_papers: real.length,
    placeholders: placeholders.length,
    by_subject: sortedSubjects.map(([subject, papers]) => ({
      subject,
      count: papers.length,
      years: papers.map(p => p.year).sort((a, b) => a - b),
      files: papers.map(p => ({
        year: p.year,
        size_mb: p.sizeMB,
        storage_path: p.storage_path
      }))
    }))
  }

  fs.writeFileSync(
    'PLACEHOLDER_PDFS_REPORT.json',
    JSON.stringify(report, null, 2)
  )

  console.log('=' .repeat(60))
  console.log('\n📄 REPORT SAVED: PLACEHOLDER_PDFS_REPORT.json\n')

  // Final summary
  console.log('=' .repeat(60))
  console.log('\n📊 FINAL STATUS\n')

  const { data: finalCount } = await supabase
    .from('past_papers')
    .select('subject', { count: 'exact' })
    .eq('is_available', true)

  console.log(`✅ Available papers now: ${finalCount?.length || 0}`)
  console.log(`❌ Disabled placeholders: ${placeholders.length}`)
  console.log(`📈 Data quality: ${((real.length / allPapers.length) * 100).toFixed(1)}% real PDFs\n`)

  console.log('🔍 Subjects needing re-upload:\n')
  sortedSubjects.slice(0, 10).forEach(([subject, papers]) => {
    console.log(`   ${subject}: ${papers.length} papers`)
  })
  if (sortedSubjects.length > 10) {
    console.log(`   ... and ${sortedSubjects.length - 10} more subjects`)
  }

  console.log('\n' + '='.repeat(60))
  console.log('\n✅ CLEANUP COMPLETE\n')
  console.log('Next steps:')
  console.log('1. Review PLACEHOLDER_PDFS_REPORT.json')
  console.log('2. Upload real past paper PDFs (2-10 MB each)')
  console.log('3. Update database to mark them as available')
  console.log('4. Verify file sizes are > 1 MB\n')
}

cleanupPlaceholders().catch(console.error)
