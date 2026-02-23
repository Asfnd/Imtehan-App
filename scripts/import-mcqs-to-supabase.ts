/**
 * Import all MCQs from CSV files to Supabase
 * Run: npm run import-mcqs
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'
import { parse } from 'csv-parse/sync'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Folder → type mapping
const FOLDERS = {
  'PPSC_Extracted_MCQs': 'practice',
  'PPSC_MOST_IMPORTANT_MCQS': 'most_important',
  'PPSC_Most_Repeated_MCQs': 'most_repeated'
}

// CSV filename → table name (handles variations)
const CSV_TO_TABLE: Record<string, string> = {
  'Pakistan_Studies.csv': 'pakistan_studies',
  'General_Knowledge.csv': 'general_knowledge',
  'Everyday_Science.csv': 'everyday_science',
  'Current_Affairs.csv': 'current_affairs',
  'Basic_Computer.csv': 'basic_computer',
  'General_Math.csv': 'general_math',
  'General_Maths.csv': 'general_math',
  'English.csv': 'english',
  'Urdu.csv': 'urdu',
  'Islamiat.csv': 'islamiat',
  'Islamiyat.csv': 'islamiat',
  'General_Geography.csv': 'geography',
  'Geography.csv': 'geography',
  'Ethics_Civics.csv': 'ethics_civics'
}

interface MCQRow {
  Question_Number?: number
  Question: string
  Option_A: string
  Option_B: string
  Option_C: string
  Option_D: string
  Correct_Answer: string
}

async function importCSV(folder: string, filename: string, type: string): Promise<number> {
  const tableName = CSV_TO_TABLE[filename]
  if (!tableName) {
    console.log(`  ⚠️  Skipping unknown file: ${filename}`)
    return 0
  }

  const filepath = join(process.cwd(), folder, filename)

  console.log(`\n📄 ${folder}/${filename} → ${tableName}`)

  try {
    // Read and parse CSV
    const fileContent = readFileSync(filepath, 'utf-8')
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true
    }) as MCQRow[]

    console.log(`  Read ${records.length} rows`)

    // Transform and clean data
    const mcqs = records
      .filter(row => row.Question && row.Correct_Answer)
      .map(row => ({
        question_number: row.Question_Number || null,
        question: row.Question,
        option_a: row.Option_A,
        option_b: row.Option_B,
        option_c: row.Option_C,
        option_d: row.Option_D,
        correct_answer: row.Correct_Answer.toUpperCase().trim(),
        type
      }))
      .filter(mcq => ['A', 'B', 'C', 'D'].includes(mcq.correct_answer))

    console.log(`  Cleaned to ${mcqs.length} valid rows`)

    if (mcqs.length === 0) {
      console.log(`  ⚠️  No valid MCQs to import`)
      return 0
    }

    // Upload in batches
    const batchSize = 1000
    let uploaded = 0

    for (let i = 0; i < mcqs.length; i += batchSize) {
      const batch = mcqs.slice(i, i + batchSize)

      const { error } = await supabase
        .from(tableName)
        .insert(batch)

      if (error) {
        console.error(`  ❌ Error uploading batch ${i}-${i + batchSize}:`, error.message)
        continue
      }

      uploaded += batch.length
      console.log(`  ✓ Uploaded ${Math.min(i + batchSize, mcqs.length)}/${mcqs.length}`)
    }

    return uploaded

  } catch (error) {
    console.error(`  ❌ Error processing ${filename}:`, error)
    return 0
  }
}

async function main() {
  console.log('='.repeat(60))
  console.log('IMPORTING MCQs TO SUPABASE')
  console.log('='.repeat(60))

  let totalImported = 0

  for (const [folder, type] of Object.entries(FOLDERS)) {
    console.log(`\n${'='.repeat(60)}`)
    console.log(`Folder: ${folder} (type=${type})`)
    console.log(`${'='.repeat(60)}`)

    try {
      const files = readdirSync(folder).filter(f => f.endsWith('.csv'))

      for (const filename of files) {
        const count = await importCSV(folder, filename, type)
        totalImported += count
      }
    } catch (error) {
      console.error(`⚠️  Error reading folder ${folder}:`, error)
      continue
    }
  }

  console.log(`\n${'='.repeat(60)}`)
  console.log(`✅ IMPORT COMPLETE`)
  console.log(`${'='.repeat(60)}`)
  console.log(`Total MCQs imported: ${totalImported}`)
  console.log(`\nVerify in Supabase by running:`)
  console.log(`SELECT COUNT(*) FROM pakistan_studies;`)
}

main().catch(console.error)
