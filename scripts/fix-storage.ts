/**
 * Fix Supabase storage issues
 * Run: npx tsx scripts/fix-storage.ts
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

async function fixStorage() {
  console.log('🔧 FIXING SUPABASE STORAGE ISSUES\n')
  console.log('=' .repeat(60))

  // 1. Make css-solved-papers bucket public
  console.log('\n📦 Making css-solved-papers bucket PUBLIC...\n')

  const { data: updateData, error: updateError } = await supabase.storage
    .updateBucket('css-solved-papers', {
      public: true,
      fileSizeLimit: 52428800, // 50MB
      allowedMimeTypes: ['application/pdf']
    })

  if (updateError) {
    console.error(`❌ Error updating bucket: ${updateError.message}`)
  } else {
    console.log('✅ css-solved-papers bucket is now PUBLIC')
  }

  // 2. List all files in solved papers bucket recursively
  console.log('\n📄 Listing all files in css-solved-papers bucket...\n')

  async function listAllFiles(bucketName: string, path = '', allFiles: any[] = []): Promise<any[]> {
    const { data: files, error } = await supabase.storage
      .from(bucketName)
      .list(path, { limit: 1000 })

    if (error) {
      console.error(`Error listing ${path}:`, error.message)
      return allFiles
    }

    for (const file of files || []) {
      const fullPath = path ? `${path}/${file.name}` : file.name

      if (file.id === null) {
        // It's a folder, recurse into it
        await listAllFiles(bucketName, fullPath, allFiles)
      } else {
        // It's a file
        allFiles.push({
          name: file.name,
          path: fullPath,
          size: file.metadata?.size || 0,
          type: file.metadata?.mimetype || 'unknown'
        })
      }
    }

    return allFiles
  }

  const solvedFiles = await listAllFiles('css-solved-papers')

  console.log(`Found ${solvedFiles.length} files:\n`)
  solvedFiles.forEach(file => {
    console.log(`  📄 ${file.path}`)
    console.log(`     Size: ${(file.size / 1024 / 1024).toFixed(2)} MB`)
    console.log(`     Type: ${file.type}`)

    // Generate public URL
    const { data: urlData } = supabase.storage
      .from('css-solved-papers')
      .getPublicUrl(file.path)
    console.log(`     URL: ${urlData.publicUrl}\n`)
  })

  // 3. Check past papers structure
  console.log('=' .repeat(60))
  console.log('\n📚 Checking past papers structure...\n')

  const pastFiles = await listAllFiles('css-past-papers')
  console.log(`Found ${pastFiles.length} PDF files in past papers bucket\n`)

  // Sample some files
  pastFiles.slice(0, 5).forEach(file => {
    console.log(`  📄 ${file.path}`)
  })

  if (pastFiles.length > 5) {
    console.log(`  ... and ${pastFiles.length - 5} more\n`)
  }

  // 4. Verify database records match storage files
  console.log('=' .repeat(60))
  console.log('\n🔍 Verifying database records...\n')

  const { data: dbPapers, error: dbError } = await supabase
    .from('past_papers')
    .select('subject, year, storage_path')
    .limit(5)

  if (dbError) {
    console.error(`❌ Error reading database: ${dbError.message}`)
  } else {
    console.log('Sample database records:\n')
    dbPapers?.forEach(paper => {
      console.log(`  ${paper.subject} (${paper.year})`)
      console.log(`    Storage path: ${paper.storage_path}`)

      // Check if file exists
      const fileExists = pastFiles.some(f => f.path === paper.storage_path)
      console.log(`    File exists: ${fileExists ? '✅' : '❌'}\n`)
    })
  }

  console.log('=' .repeat(60))
  console.log('\n✅ STORAGE FIX COMPLETE\n')
  console.log('Next steps:')
  console.log('1. Update code to use correct file paths')
  console.log('2. Test PDF loading on localhost')
  console.log('3. Deploy to production\n')
}

fixStorage().catch(console.error)
