/**
 * Check actual PDF content to see if it's a demo/placeholder
 * Run: npx tsx scripts/check-pdf-content.ts
 */

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function checkPDFContent() {
  console.log('🔍 CHECKING PDF FILE SIZES & CONTENT\n')
  console.log('=' .repeat(60))

  // Check several past papers to compare sizes
  const testPapers = [
    { subject: 'current-affairs', year: 2025 },
    { subject: 'current-affairs', year: 2024 },
    { subject: 'english-essay', year: 2025 },
    { subject: 'economics', year: 2023 },
  ]

  console.log('\n📊 Comparing file sizes:\n')

  for (const paper of testPapers) {
    // Get from database
    const { data: dbRecord } = await supabase
      .from('past_papers')
      .select('storage_path, file_size')
      .eq('subject', paper.subject)
      .eq('year', paper.year)
      .eq('is_available', true)
      .single()

    if (!dbRecord) {
      console.log(`❌ ${paper.subject} ${paper.year}: Not found in database`)
      continue
    }

    // Get file info from storage
    const pathParts = dbRecord.storage_path.split('/')
    const folder = pathParts.slice(0, -1).join('/')
    const filename = pathParts[pathParts.length - 1]

    const { data: files } = await supabase.storage
      .from('css-past-papers')
      .list(folder, { limit: 100 })

    const file = files?.find(f => f.name === filename)

    if (!file) {
      console.log(`❌ ${paper.subject} ${paper.year}: File not found in storage`)
      continue
    }

    const sizeMB = (file.metadata?.size || 0) / 1024 / 1024

    console.log(`📄 ${paper.subject} ${paper.year}:`)
    console.log(`   Storage path: ${dbRecord.storage_path}`)
    console.log(`   Size: ${sizeMB.toFixed(2)} MB`)

    if (sizeMB < 0.5) {
      console.log(`   ⚠️  WARNING: File is very small! Might be a placeholder/demo`)
    } else if (sizeMB > 10) {
      console.log(`   ⚠️  WARNING: File is very large!`)
    } else {
      console.log(`   ✅ Size looks normal`)
    }

    // Try to fetch first few bytes to check PDF header
    const { data: publicUrl } = supabase.storage
      .from('css-past-papers')
      .getPublicUrl(dbRecord.storage_path)

    try {
      const response = await fetch(publicUrl.publicUrl, {
        method: 'GET',
        headers: { Range: 'bytes=0-100' }
      })

      const arrayBuffer = await response.arrayBuffer()
      const bytes = new Uint8Array(arrayBuffer)
      const header = String.fromCharCode(...bytes.slice(0, 4))

      if (header === '%PDF') {
        console.log(`   ✅ Valid PDF header`)
      } else {
        console.log(`   ❌ Invalid PDF header: ${header}`)
      }
    } catch (e) {
      console.log(`   ⚠️  Could not fetch file`)
    }

    console.log('')
  }

  // Check for suspiciously small files across all papers
  console.log('=' .repeat(60))
  console.log('\n🔍 Finding all suspiciously small PDFs...\n')

  const { data: allPapers } = await supabase
    .from('past_papers')
    .select('subject, year, storage_path')
    .eq('is_available', true)
    .limit(1000)

  let smallFiles = 0

  for (const paper of allPapers || []) {
    const pathParts = paper.storage_path.split('/')
    const folder = pathParts.slice(0, -1).join('/')
    const filename = pathParts[pathParts.length - 1]

    const { data: files } = await supabase.storage
      .from('css-past-papers')
      .list(folder, { limit: 100 })

    const file = files?.find(f => f.name === filename)

    if (file) {
      const sizeMB = (file.metadata?.size || 0) / 1024 / 1024

      if (sizeMB < 0.5 && sizeMB > 0) {
        console.log(`⚠️  ${paper.subject} ${paper.year}: ${sizeMB.toFixed(2)} MB (suspiciously small)`)
        smallFiles++
      }
    }

    // Don't overwhelm the API
    if (smallFiles > 10) {
      console.log('\n   ... stopping after 10 small files found')
      break
    }
  }

  if (smallFiles === 0) {
    console.log('✅ No suspiciously small files found')
  }

  console.log('\n' + '='.repeat(60))
  console.log('\n📋 DIAGNOSIS\n')
  console.log('If files are < 0.5 MB:')
  console.log('  - Likely placeholder/demo PDFs')
  console.log('  - Need to be replaced with actual past papers')
  console.log('  - User will see demo content instead of real papers\n')
  console.log('If cache issues persist:')
  console.log('  - Implement cache-busting with ?v=timestamp')
  console.log('  - Hard refresh browser (Ctrl+Shift+R)')
  console.log('  - Clear Supabase CDN cache if possible\n')
}

checkPDFContent().catch(console.error)
