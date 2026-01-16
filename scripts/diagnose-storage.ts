/**
 * Diagnostic script to check Supabase storage buckets and files
 * Run: tsx scripts/diagnose-storage.ts
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

async function diagnoseStorage() {
  console.log('🔍 SUPABASE STORAGE DIAGNOSTIC\n')
  console.log('=' .repeat(60))

  // 1. List all buckets
  console.log('\n📦 CHECKING BUCKETS...\n')
  const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets()

  if (bucketsError) {
    console.error('❌ Error listing buckets:', bucketsError.message)
    return
  }

  console.log(`Found ${buckets?.length || 0} buckets:\n`)
  buckets?.forEach(bucket => {
    console.log(`  ✅ ${bucket.name}`)
    console.log(`     - ID: ${bucket.id}`)
    console.log(`     - Public: ${bucket.public}`)
    console.log(`     - Created: ${bucket.created_at}\n`)
  })

  // 2. Check specific buckets we need
  const requiredBuckets = [
    'css-past-papers',
    'css-solved-papers',
    'css-guess-papers-2026'
  ]

  console.log('=' .repeat(60))
  console.log('\n📋 CHECKING REQUIRED BUCKETS...\n')

  for (const bucketName of requiredBuckets) {
    const exists = buckets?.find(b => b.name === bucketName)
    if (exists) {
      console.log(`✅ ${bucketName} - EXISTS (${exists.public ? 'PUBLIC' : 'PRIVATE'})`)

      // List files in this bucket
      const { data: files, error: filesError } = await supabase.storage
        .from(bucketName)
        .list('', { limit: 10 })

      if (filesError) {
        console.log(`   ❌ Error listing files: ${filesError.message}`)
      } else {
        console.log(`   📄 Files: ${files?.length || 0} found`)
        files?.slice(0, 5).forEach(file => {
          console.log(`      - ${file.name} (${(file.metadata?.size || 0 / 1024 / 1024).toFixed(2)} MB)`)
        })
        if ((files?.length || 0) > 5) {
          console.log(`      ... and ${(files?.length || 0) - 5} more`)
        }
      }
    } else {
      console.log(`❌ ${bucketName} - MISSING!`)
    }
    console.log('')
  }

  // 3. Check database tables
  console.log('=' .repeat(60))
  console.log('\n📊 CHECKING DATABASE TABLES...\n')

  // Check past_papers table
  const { count: pastPapersCount, error: ppError } = await supabase
    .from('past_papers')
    .select('*', { count: 'exact', head: true })

  if (ppError) {
    console.log(`❌ past_papers table: ${ppError.message}`)
  } else {
    console.log(`✅ past_papers table: ${pastPapersCount || 0} records`)
  }

  // Check guess_papers_2026 table
  const { count: guessCount, error: gpError } = await supabase
    .from('guess_papers_2026')
    .select('*', { count: 'exact', head: true })

  if (gpError) {
    console.log(`❌ guess_papers_2026 table: ${gpError.message}`)
  } else {
    console.log(`✅ guess_papers_2026 table: ${guessCount || 0} records`)
  }

  // 4. Test PDF URLs
  console.log('\n' + '='.repeat(60))
  console.log('\n🔗 TESTING PDF URL GENERATION...\n')

  // Test past paper URL
  const { data: samplePastPaper } = await supabase
    .from('past_papers')
    .select('*')
    .limit(1)
    .single()

  if (samplePastPaper) {
    console.log('📄 Sample Past Paper:')
    console.log(`   Subject: ${samplePastPaper.subject}`)
    console.log(`   Year: ${samplePastPaper.year}`)
    console.log(`   Storage Path: ${samplePastPaper.storage_path}`)

    const { data: urlData } = supabase.storage
      .from('css-past-papers')
      .getPublicUrl(samplePastPaper.storage_path)

    console.log(`   Public URL: ${urlData.publicUrl}`)
    console.log('')
  }

  // Test guess paper URL
  const { data: sampleGuessPaper } = await supabase
    .from('guess_papers_2026')
    .select('*')
    .limit(1)
    .single()

  if (sampleGuessPaper) {
    console.log('📄 Sample Guess Paper:')
    console.log(`   Subject: ${sampleGuessPaper.subject}`)
    console.log(`   Storage Path: ${sampleGuessPaper.storage_path}`)

    const { data: urlData } = supabase.storage
      .from('css-guess-papers-2026')
      .getPublicUrl(sampleGuessPaper.storage_path)

    console.log(`   Public URL: ${urlData.publicUrl}`)
    console.log('')
  }

  // Check solved papers bucket files
  console.log('📄 Checking Solved Papers Bucket:\n')
  const { data: solvedFiles, error: solvedError } = await supabase.storage
    .from('css-solved-papers')
    .list('', { limit: 100 })

  if (solvedError) {
    console.log(`❌ Error: ${solvedError.message}`)
  } else {
    console.log(`   Found ${solvedFiles?.length || 0} files:`)
    solvedFiles?.forEach(file => {
      console.log(`      - ${file.name}`)

      // Generate public URL for each
      const { data: urlData } = supabase.storage
        .from('css-solved-papers')
        .getPublicUrl(file.name)
      console.log(`        URL: ${urlData.publicUrl}`)
    })
  }

  console.log('\n' + '='.repeat(60))
  console.log('\n✅ DIAGNOSTIC COMPLETE\n')
}

diagnoseStorage().catch(console.error)
