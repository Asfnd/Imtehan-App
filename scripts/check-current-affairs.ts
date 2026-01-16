/**
 * Quick check for current-affairs papers
 */

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

async function check() {
  console.log('🔍 Checking current-affairs papers...\n')

  // Check database
  const { data: dbRecords } = await supabase
    .from('past_papers')
    .select('*')
    .eq('subject', 'current-affairs')
    .order('year')

  console.log(`Found ${dbRecords?.length || 0} current-affairs records in database:\n`)

  for (const record of dbRecords || []) {
    console.log(`Year ${record.year}:`)
    console.log(`  Storage path: ${record.storage_path}`)
    console.log(`  Available: ${record.is_available}`)

    // Check if file exists
    const { data: urlData } = supabase.storage
      .from('css-past-papers')
      .getPublicUrl(record.storage_path)

    console.log(`  URL: ${urlData.publicUrl}`)

    try {
      const response = await fetch(urlData.publicUrl, { method: 'HEAD' })
      console.log(`  Status: ${response.ok ? '✅ EXISTS' : '❌ NOT FOUND'} (${response.status})`)
    } catch (error) {
      console.log(`  Status: ❌ ERROR`)
    }
    console.log('')
  }

  // Check what's actually in storage
  console.log('\nChecking what files exist in current-affairs folder...\n')

  const { data: files } = await supabase.storage
    .from('css-past-papers')
    .list('current-affairs', { limit: 1000 })

  if (files && files.length > 0) {
    console.log(`Found ${files.length} items in current-affairs folder:`)
    for (const file of files) {
      console.log(`  - ${file.name}`)
    }
  } else {
    console.log('⚠️  No current-affairs folder found in storage!')
  }
}

check().catch(console.error)
