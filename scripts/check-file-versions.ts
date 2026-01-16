/**
 * Check for file version issues and cache problems
 * Run: npx tsx scripts/check-file-versions.ts
 */

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function checkFileVersions() {
  console.log('🔍 CHECKING FOR FILE VERSION & CACHE ISSUES\n')
  console.log('=' .repeat(60))

  // Check a specific problematic file
  console.log('\n📄 Checking current-affairs 2025 file...\n')

  const storagePath = 'current-affairs/2025/current-affairs_2025.pdf'

  // Get file metadata
  const { data: files, error } = await supabase.storage
    .from('css-past-papers')
    .list('current-affairs/2025', { limit: 100 })

  if (error) {
    console.error('❌ Error listing files:', error.message)
    return
  }

  console.log('Files in current-affairs/2025 folder:\n')
  for (const file of files || []) {
    console.log(`📄 ${file.name}`)
    console.log(`   Size: ${(file.metadata?.size / 1024 / 1024).toFixed(2)} MB`)
    console.log(`   Updated: ${file.updated_at}`)
    console.log(`   Created: ${file.created_at}`)

    // Generate URLs
    const { data: publicUrl } = supabase.storage
      .from('css-past-papers')
      .getPublicUrl(`current-affairs/2025/${file.name}`)

    console.log(`   Public URL: ${publicUrl.publicUrl}`)

    // Try fetching with cache-busting
    const cacheBustUrl = `${publicUrl.publicUrl}?v=${Date.now()}`
    console.log(`   Cache-bust URL: ${cacheBustUrl}`)
    console.log('')
  }

  // Check for common issues
  console.log('=' .repeat(60))
  console.log('\n🔍 CHECKING FOR COMMON ISSUES\n')

  // Issue 1: Files with similar names
  console.log('1. Checking for files with similar names...\n')

  const allFiles = await listAllFiles('css-past-papers', 'current-affairs/2025')

  if (allFiles.length > 1) {
    console.log(`⚠️  Found ${allFiles.length} files in current-affairs/2025:`)
    allFiles.forEach(f => console.log(`   - ${f}`))
    console.log('\n   This could cause confusion!')
  } else {
    console.log('✅ Only one file found (good)\n')
  }

  // Issue 2: Check file headers
  console.log('2. Checking file headers (cache-control)...\n')

  for (const file of files || []) {
    const { data: publicUrl } = supabase.storage
      .from('css-past-papers')
      .getPublicUrl(`current-affairs/2025/${file.name}`)

    try {
      const response = await fetch(publicUrl.publicUrl, { method: 'HEAD' })

      console.log(`${file.name}:`)
      console.log(`   Status: ${response.status}`)
      console.log(`   Cache-Control: ${response.headers.get('cache-control')}`)
      console.log(`   ETag: ${response.headers.get('etag')}`)
      console.log(`   Last-Modified: ${response.headers.get('last-modified')}`)
      console.log(`   Content-Type: ${response.headers.get('content-type')}`)
      console.log('')
    } catch (error) {
      console.log(`   ❌ Error fetching: ${error}`)
    }
  }

  // Issue 3: Check for old test/demo files
  console.log('=' .repeat(60))
  console.log('\n3. Checking for demo/test file patterns...\n')

  const demoPatterns = ['demo', 'test', 'sample', 'CSS ', 'DEMO', 'TEST']

  for (const file of files || []) {
    const hasDemo = demoPatterns.some(pattern => file.name.includes(pattern))
    if (hasDemo) {
      console.log(`⚠️  Possible demo/test file: ${file.name}`)
      console.log(`   Consider removing or renaming this file\n`)
    }
  }

  // Recommendation
  console.log('=' .repeat(60))
  console.log('\n📋 RECOMMENDATIONS\n')
  console.log('1. Clear browser cache: Hard refresh (Ctrl+Shift+R / Cmd+Shift+R)')
  console.log('2. Add cache-busting query params to PDF URLs')
  console.log('3. Remove any old demo/test PDFs')
  console.log('4. Set proper Cache-Control headers in Supabase')
  console.log('5. Consider versioning PDF URLs\n')
}

async function listAllFiles(bucket: string, path: string): Promise<string[]> {
  const { data: files, error } = await supabase.storage
    .from(bucket)
    .list(path, { limit: 1000 })

  if (error) return []

  return files
    ?.filter(f => f.id !== null)
    .map(f => f.name) || []
}

checkFileVersions().catch(console.error)
