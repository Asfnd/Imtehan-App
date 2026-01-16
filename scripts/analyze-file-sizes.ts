/**
 * Analyze file size distribution to find real placeholder/demo PDFs
 * Demo/placeholder PDFs are typically in BYTES, not KB or MB
 * Run: npx tsx scripts/analyze-file-sizes.ts
 */

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function analyzeFileSizes() {
  console.log('📊 ANALYZING FILE SIZE DISTRIBUTION\n')
  console.log('=' .repeat(60))

  // Get all available papers
  const { data: allPapers } = await supabase
    .from('past_papers')
    .select('id, subject, year, storage_path')
    .eq('is_available', true)

  console.log(`\nAnalyzing ${allPapers?.length || 0} papers...\n`)

  const fileSizes: Array<{ paper: any; sizeBytes: number }> = []
  let checked = 0

  for (const paper of allPapers || []) {
    checked++

    if (checked % 100 === 0) {
      console.log(`   Checked ${checked}/${allPapers.length}...`)
    }

    const pathParts = paper.storage_path.split('/')
    const folder = pathParts.slice(0, -1).join('/')
    const filename = pathParts[pathParts.length - 1]

    const { data: files } = await supabase.storage
      .from('css-past-papers')
      .list(folder, { limit: 100 })

    const file = files?.find(f => f.name === filename)

    if (file) {
      const sizeBytes = file.metadata?.size || 0
      fileSizes.push({ paper, sizeBytes })
    }
  }

  console.log('\n✅ Analysis complete!\n')

  // Sort by size
  fileSizes.sort((a, b) => a.sizeBytes - b.sizeBytes)

  // Categorize by size
  const inBytes = fileSizes.filter(f => f.sizeBytes < 1024) // < 1 KB
  const inKB = fileSizes.filter(f => f.sizeBytes >= 1024 && f.sizeBytes < 1024 * 100) // 1-100 KB
  const small = fileSizes.filter(f => f.sizeBytes >= 1024 * 100 && f.sizeBytes < 1024 * 1024) // 100 KB - 1 MB
  const normal = fileSizes.filter(f => f.sizeBytes >= 1024 * 1024 && f.sizeBytes < 10 * 1024 * 1024) // 1-10 MB
  const large = fileSizes.filter(f => f.sizeBytes >= 10 * 1024 * 1024) // > 10 MB

  // Report distribution
  console.log('=' .repeat(60))
  console.log('\n📊 FILE SIZE DISTRIBUTION\n')
  console.log(`Total papers: ${fileSizes.length}\n`)
  console.log(`❌ In BYTES (< 1 KB):        ${inBytes.length} papers (LIKELY PLACEHOLDERS)`)
  console.log(`⚠️  In KB (1-100 KB):         ${inKB.length} papers (some might be real, some placeholder)`)
  console.log(`✅ Small (100 KB - 1 MB):    ${small.length} papers (likely real)`)
  console.log(`✅ Normal (1-10 MB):         ${normal.length} papers (definitely real)`)
  console.log(`✅ Large (> 10 MB):          ${large.length} papers (definitely real)\n`)

  // Show files in BYTES (definite placeholders)
  if (inBytes.length > 0) {
    console.log('=' .repeat(60))
    console.log('\n❌ FILES IN BYTES (< 1 KB) - DEFINITE PLACEHOLDERS:\n')

    // Group by subject
    const bySubject: Record<string, any[]> = {}
    for (const item of inBytes) {
      if (!bySubject[item.paper.subject]) bySubject[item.paper.subject] = []
      bySubject[item.paper.subject].push(item)
    }

    const sorted = Object.entries(bySubject).sort(([a], [b]) => a.localeCompare(b))

    for (const [subject, items] of sorted) {
      console.log(`📚 ${subject}: ${items.length} files`)
      items.slice(0, 5).forEach(item => {
        console.log(`   - ${item.paper.year}: ${item.sizeBytes} bytes`)
      })
      if (items.length > 5) {
        console.log(`   ... and ${items.length - 5} more`)
      }
      console.log('')
    }
  }

  // Show files 1-10 KB (suspicious)
  const verySmallKB = fileSizes.filter(f => f.sizeBytes >= 1024 && f.sizeBytes < 10 * 1024)

  if (verySmallKB.length > 0) {
    console.log('=' .repeat(60))
    console.log('\n⚠️  FILES 1-10 KB (SUSPICIOUS):\n')

    const bySubject: Record<string, any[]> = {}
    for (const item of verySmallKB) {
      if (!bySubject[item.paper.subject]) bySubject[item.paper.subject] = []
      bySubject[item.paper.subject].push(item)
    }

    const sorted = Object.entries(bySubject).sort(([a], [b]) => a.localeCompare(b))

    for (const [subject, items] of sorted.slice(0, 10)) {
      console.log(`📚 ${subject}: ${items.length} files`)
      items.slice(0, 3).forEach(item => {
        console.log(`   - ${item.paper.year}: ${(item.sizeBytes / 1024).toFixed(2)} KB`)
      })
      console.log('')
    }

    if (sorted.length > 10) {
      console.log(`... and ${sorted.length - 10} more subjects\n`)
    }
  }

  // Show smallest 20 files overall
  console.log('=' .repeat(60))
  console.log('\n📋 20 SMALLEST FILES:\n')

  fileSizes.slice(0, 20).forEach((item, index) => {
    const sizeStr = item.sizeBytes < 1024
      ? `${item.sizeBytes} bytes`
      : item.sizeBytes < 1024 * 1024
      ? `${(item.sizeBytes / 1024).toFixed(2)} KB`
      : `${(item.sizeBytes / 1024 / 1024).toFixed(2)} MB`

    console.log(`${index + 1}. ${item.paper.subject} (${item.paper.year}): ${sizeStr}`)
  })

  // Statistics
  console.log('\n' + '='.repeat(60))
  console.log('\n📈 STATISTICS\n')

  const avgSize = fileSizes.reduce((sum, f) => sum + f.sizeBytes, 0) / fileSizes.length
  const medianSize = fileSizes[Math.floor(fileSizes.length / 2)]?.sizeBytes || 0

  console.log(`Average size: ${(avgSize / 1024 / 1024).toFixed(2)} MB`)
  console.log(`Median size: ${(medianSize / 1024 / 1024).toFixed(2)} MB`)
  console.log(`Smallest: ${fileSizes[0]?.sizeBytes || 0} bytes`)
  console.log(`Largest: ${(fileSizes[fileSizes.length - 1]?.sizeBytes / 1024 / 1024).toFixed(2)} MB`)

  // Recommendation
  console.log('\n' + '='.repeat(60))
  console.log('\n💡 RECOMMENDATION\n')
  console.log('Files to investigate/disable:')
  console.log(`  ❌ < 1 KB (${inBytes.length} files): DEFINITE placeholders - should be removed`)
  console.log(`  ⚠️  1-10 KB (${verySmallKB.length} files): LIKELY placeholders - should be checked`)
  console.log(`  ✅ > 100 KB (${small.length + normal.length + large.length} files): Probably real PDFs\n`)

  const totalBad = inBytes.length + verySmallKB.length
  const percentBad = ((totalBad / fileSizes.length) * 100).toFixed(1)

  console.log(`Total problematic: ${totalBad} files (${percentBad}%)`)
  console.log(`Total good: ${fileSizes.length - totalBad} files (${(100 - parseFloat(percentBad)).toFixed(1)}%)\n`)

  console.log('=' .repeat(60))
  console.log('')
}

analyzeFileSizes().catch(console.error)
