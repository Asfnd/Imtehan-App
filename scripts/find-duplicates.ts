/**
 * Find duplicate subject+year combinations in database
 */

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function findDuplicates() {
  console.log('🔍 Finding duplicate records...\n')

  const { data: allRecords } = await supabase
    .from('past_papers')
    .select('id, subject, year, storage_path, is_available')
    .eq('is_available', true)
    .order('subject')
    .order('year')

  // Group by subject+year
  const groups: Record<string, any[]> = {}

  for (const record of allRecords || []) {
    const key = `${record.subject}-${record.year}`
    if (!groups[key]) groups[key] = []
    groups[key].push(record)
  }

  // Find duplicates
  const duplicates = Object.entries(groups).filter(([_, records]) => records.length > 1)

  if (duplicates.length === 0) {
    console.log('✅ No duplicates found!\n')
    return
  }

  console.log(`❌ Found ${duplicates.length} duplicate subject+year combinations:\n`)

  for (const [key, records] of duplicates) {
    console.log(`${key}:`)
    records.forEach((r, i) => {
      console.log(`  ${i + 1}. ID ${r.id}: ${r.storage_path}`)
    })
    console.log('')
  }

  // Fix: Keep the one with working file, disable others
  console.log('🔧 Fixing duplicates...\n')

  let fixed = 0

  for (const [key, records] of duplicates) {
    console.log(`Fixing ${key}...`)

    // Check which one has a working file
    let workingRecord = null

    for (const record of records) {
      const { data: urlData } = supabase.storage
        .from('css-past-papers')
        .getPublicUrl(record.storage_path)

      try {
        const response = await fetch(urlData.publicUrl, { method: 'HEAD' })
        if (response.ok) {
          workingRecord = record
          console.log(`  ✅ ID ${record.id} has working file`)
          break
        }
      } catch (e) {
        // Skip
      }
    }

    if (workingRecord) {
      // Disable all others
      const idsToDisable = records
        .filter(r => r.id !== workingRecord.id)
        .map(r => r.id)

      if (idsToDisable.length > 0) {
        const { error } = await supabase
          .from('past_papers')
          .update({ is_available: false })
          .in('id', idsToDisable)

        if (!error) {
          console.log(`  ✅ Disabled ${idsToDisable.length} duplicate(s)`)
          fixed += idsToDisable.length
        }
      }
    } else {
      console.log(`  ⚠️  No working file found - disabling all`)
      const idsToDisable = records.map(r => r.id)

      await supabase
        .from('past_papers')
        .update({ is_available: false })
        .in('id', idsToDisable)

      fixed += idsToDisable.length
    }
    console.log('')
  }

  console.log(`✅ Fixed ${fixed} duplicate records\n`)
}

findDuplicates().catch(console.error)
