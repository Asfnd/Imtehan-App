/**
 * FAST verification - Lists all storage files first, then compares
 * Run: npx tsx scripts/fast-verify-papers.ts
 */

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

// Recursively list all files in a bucket
async function listAllStorageFiles(bucketName: string, path = ''): Promise<Set<string>> {
  const allPaths = new Set<string>()

  async function listRecursive(currentPath: string) {
    const { data: files, error } = await supabase.storage
      .from(bucketName)
      .list(currentPath, { limit: 1000 })

    if (error) {
      console.error(`Error listing ${currentPath}:`, error.message)
      return
    }

    for (const file of files || []) {
      const fullPath = currentPath ? `${currentPath}/${file.name}` : file.name

      if (file.id === null) {
        // It's a folder, recurse
        await listRecursive(fullPath)
      } else {
        // It's a file
        allPaths.add(fullPath)
      }
    }
  }

  await listRecursive(path)
  return allPaths
}

async function fastVerify() {
  console.log('🚀 FAST VERIFICATION\n')
  console.log('=' .repeat(60))

  // 1. List ALL files in storage (fast - one pass)
  console.log('\n📦 Listing all files in css-past-papers storage...')
  const storageFiles = await listAllStorageFiles('css-past-papers')
  console.log(`✅ Found ${storageFiles.size} files in storage\n`)

  // 2. Get ALL database records (fast - one query)
  console.log('📊 Fetching all database records...')
  const { data: dbRecords, error: dbError } = await supabase
    .from('past_papers')
    .select('id, subject, year, storage_path, is_available')
    .order('subject')

  if (dbError) {
    console.error(`❌ Error: ${dbError.message}`)
    process.exit(1)
  }

  console.log(`✅ Found ${dbRecords?.length || 0} records in database\n`)

  // 3. Compare in memory (instant)
  console.log('🔍 Comparing database vs storage...\n')

  const broken: any[] = []
  const working: any[] = []

  for (const record of dbRecords || []) {
    if (storageFiles.has(record.storage_path)) {
      working.push(record)
    } else {
      broken.push(record)
    }
  }

  // 4. Report results
  console.log('=' .repeat(60))
  console.log('\n📊 RESULTS\n')
  console.log(`✅ Working: ${working.length}`)
  console.log(`❌ Broken: ${broken.length}\n`)

  if (broken.length > 0) {
    console.log('=' .repeat(60))
    console.log('\n❌ BROKEN RECORDS:\n')

    // Group by subject
    const bySubject: Record<string, any[]> = {}
    for (const paper of broken) {
      if (!bySubject[paper.subject]) bySubject[paper.subject] = []
      bySubject[paper.subject].push(paper)
    }

    for (const [subject, papers] of Object.entries(bySubject)) {
      console.log(`📚 ${subject}: ${papers.length} broken records`)
      papers.slice(0, 3).forEach(p => {
        console.log(`   - Year ${p.year} (${p.storage_path})`)
      })
      if (papers.length > 3) {
        console.log(`   ... and ${papers.length - 3} more`)
      }
      console.log('')
    }

    // 5. Fix by marking as unavailable
    console.log('=' .repeat(60))
    console.log('\n🔧 FIXING: Marking broken records as unavailable...\n')

    const idsToDisable = broken.map(p => p.id)

    const { error: updateError } = await supabase
      .from('past_papers')
      .update({ is_available: false })
      .in('id', idsToDisable)

    if (updateError) {
      console.error(`❌ Error: ${updateError.message}`)
    } else {
      console.log(`✅ Marked ${broken.length} records as unavailable`)
      console.log(`   These won't show in the UI anymore\n`)
    }
  } else {
    console.log('🎉 All records have valid files!\n')
  }

  // 6. Show final summary
  console.log('=' .repeat(60))
  console.log('\n📊 AVAILABLE PAPERS BY SUBJECT:\n')

  const { data: available } = await supabase
    .from('past_papers')
    .select('subject')
    .eq('is_available', true)

  if (available) {
    const counts: Record<string, number> = {}
    for (const p of available) {
      counts[p.subject] = (counts[p.subject] || 0) + 1
    }

    const sorted = Object.entries(counts).sort(([a], [b]) => a.localeCompare(b))

    sorted.forEach(([subject, count]) => {
      console.log(`  ${subject}: ${count} papers`)
    })

    console.log(`\n  TOTAL: ${available.length} available papers\n`)
  }

  console.log('=' .repeat(60))
  console.log('\n✅ DONE\n')
}

fastVerify().catch(console.error)
