/**
 * Import MCQs from CSV folders into Supabase.
 * Run: npm run import-mcqs
 *
 * Shared bank (CSS MPT + PMS Competitive + PPSC exams): PPSC_Extracted_MCQs,
 * PPSC_MOST_IMPORTANT_MCQs, PPSC_Most_Repeated_MCQs → tables `english`, `general_knowledge`, …
 *
 * PMS Competitive reads the same tables as CSS MPT; no separate PMS CSV import is required.
 *
 * Requires SUPABASE_SERVICE_ROLE_KEY in .env.local for inserts (RLS allows SELECT only on public tables).
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { readFileSync, readdirSync, existsSync } from 'fs'
import { join } from 'path'
import { parse } from 'csv-parse/sync'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

function createImportClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !anonKey) {
    console.error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local')
    process.exit(1)
  }

  const key = serviceKey || anonKey
  if (!serviceKey) {
    console.warn(
      '\n⚠️  SUPABASE_SERVICE_ROLE_KEY not set — using anon key. Inserts will fail on tables with RLS that only allow SELECT.\n   Add the service role key from Supabase → Settings → API → service_role (secret).\n'
    )
  } else {
    console.log('Using SUPABASE_SERVICE_ROLE_KEY for bulk import (bypasses RLS).\n')
  }

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}

const supabase = createImportClient()

const CSS_FOLDERS: Record<string, 'practice' | 'most_important' | 'most_repeated'> = {
  PPSC_Extracted_MCQs: 'practice',
  PPSC_MOST_IMPORTANT_MCQS: 'most_important',
  PPSC_Most_Repeated_MCQs: 'most_repeated',
}

const CSV_TO_CSS_TABLE: Record<string, string> = {
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
  'Ethics_Civics.csv': 'ethics_civics',
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

async function importCSV(
  folder: string,
  filename: string,
  type: string,
  csvToTable: Record<string, string>
): Promise<number> {
  const tableName = csvToTable[filename]
  if (!tableName) {
    console.log(`  ⚠️  Skipping unknown file: ${filename}`)
    return 0
  }

  const filepath = join(process.cwd(), folder, filename)

  console.log(`\n📄 ${folder}/${filename} → ${tableName}`)

  try {
    const fileContent = readFileSync(filepath, 'utf-8')
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    }) as MCQRow[]

    console.log(`  Read ${records.length} rows`)

    const mcqs = records
      .filter((row) => row.Question && row.Correct_Answer)
      .map((row) => ({
        question_number: row.Question_Number || null,
        question: row.Question,
        option_a: row.Option_A,
        option_b: row.Option_B,
        option_c: row.Option_C,
        option_d: row.Option_D,
        correct_answer: row.Correct_Answer.toUpperCase().trim(),
        type,
      }))
      .filter((mcq) => ['A', 'B', 'C', 'D'].includes(mcq.correct_answer))

    console.log(`  Cleaned to ${mcqs.length} valid rows`)

    if (mcqs.length === 0) {
      console.log(`  ⚠️  No valid MCQs to import`)
      return 0
    }

    const batchSize = 1000
    let uploaded = 0

    for (let i = 0; i < mcqs.length; i += batchSize) {
      const batch = mcqs.slice(i, i + batchSize)

      const { error } = await supabase.from(tableName).insert(batch)

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

async function importBank(
  label: string,
  folders: Record<string, 'practice' | 'most_important' | 'most_repeated'>,
  csvToTable: Record<string, string>
): Promise<number> {
  let total = 0
  for (const [folder, type] of Object.entries(folders)) {
    const dir = join(process.cwd(), folder)
    if (!existsSync(dir)) {
      console.log(`\n⏭  Skip ${label} folder (missing): ${folder}`)
      continue
    }
    console.log(`\n${'='.repeat(60)}`)
    console.log(`${label} — ${folder} (type=${type})`)
    console.log(`${'='.repeat(60)}`)
    try {
      const files = readdirSync(dir).filter((f) => f.endsWith('.csv'))
      if (files.length === 0) {
        console.log(`  (no .csv files in ${folder})`)
      }
      for (const filename of files) {
        total += await importCSV(folder, filename, type, csvToTable)
      }
    } catch (error) {
      console.error(`⚠️  Error reading folder ${folder}:`, error)
    }
  }
  return total
}

async function main() {
  console.log('='.repeat(60))
  console.log('IMPORTING MCQs TO SUPABASE (shared CSS / PPSC / PMS bank)')
  console.log('='.repeat(60))

  const cssTotal = await importBank('PPSC folders → shared tables', CSS_FOLDERS, CSV_TO_CSS_TABLE)

  console.log(`\n${'='.repeat(60)}`)
  console.log(`✅ IMPORT COMPLETE`)
  console.log(`${'='.repeat(60)}`)
  console.log(`Rows imported (this run): ${cssTotal}`)
  console.log(`\nVerify: npm run verify-pms-setup`)
}

main().catch(console.error)
