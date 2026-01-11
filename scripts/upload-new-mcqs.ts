/**
 * Upload New MCQs from extracted_mcqs_ultra_clean folder
 *
 * Features:
 * - Handles paper types (Paper 1, Paper 2)
 * - Checks for duplicates
 * - Converts subject names to kebab-case
 * - Preserves year and paper type information
 */

import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import { parse } from 'csv-parse/sync'

// Load environment variables from .env.local
dotenv.config({ path: path.join(__dirname, '../.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Folder containing the MCQs
const MCQS_FOLDER = '/Users/asfandiyarsafi/Downloads/CSS/extracted_mcqs_ultra_clean'

// Convert folder name to kebab-case subject name
function toKebabCase(folderName: string): string {
  return folderName
    .replace(/_Paper$/, '') // Remove trailing _Paper
    .replace(/_/g, '-')
    .toLowerCase()
}

// Parse filename to extract year and paper type
function parseFilename(filename: string): { year: number; paperType: string | null } {
  const nameWithoutExt = filename.replace('.csv', '')

  // Check if filename has Paper(1) or Paper(2)
  const paperMatch = nameWithoutExt.match(/(\d{4})_Paper\((\d)\)/)
  if (paperMatch) {
    return {
      year: parseInt(paperMatch[1]),
      paperType: `Paper ${paperMatch[2]}`
    }
  }

  // Just year
  const yearMatch = nameWithoutExt.match(/^(\d{4})$/)
  if (yearMatch) {
    return {
      year: parseInt(yearMatch[1]),
      paperType: null
    }
  }

  throw new Error(`Invalid filename format: ${filename}`)
}

interface MCQ {
  question: string
  option_a: string
  option_b: string
  option_c: string
  option_d: string
  correct_answer: string
}

interface DatabaseMCQ {
  subject: string
  year: number
  paper_type: string | null
  question_text: string
  option_a: string
  option_b: string
  option_c: string
  option_d: string
  correct_answer: string
}

async function uploadSubjectMCQs(subjectFolder: string) {
  const subject = toKebabCase(subjectFolder)
  console.log(`\n📚 Processing subject: ${subject} (${subjectFolder})`)

  const subjectPath = path.join(MCQS_FOLDER, subjectFolder)
  const files = fs.readdirSync(subjectPath).filter(f => f.endsWith('.csv'))

  console.log(`   Found ${files.length} CSV files`)

  let totalUploaded = 0
  let totalSkipped = 0

  for (const file of files) {
    try {
      const { year, paperType } = parseFilename(file)
      const filePath = path.join(subjectPath, file)

      console.log(`\n   📄 Processing: ${file} (${year}${paperType ? ` - ${paperType}` : ''})`)

      // Read and parse CSV
      const csvContent = fs.readFileSync(filePath, 'utf-8')
      const records = parse(csvContent, {
        columns: true,
        skip_empty_lines: true,
        trim: true
      }) as MCQ[]

      console.log(`      Found ${records.length} MCQs`)

      // Check for existing MCQs
      const { data: existing, error: fetchError } = await supabase
        .from('css_mcqs_enhanced')
        .select('question_text')
        .eq('subject', subject)
        .eq('year', year)
        .eq('paper_type', paperType)

      if (fetchError) {
        console.error(`      ❌ Error fetching existing MCQs: ${fetchError.message}`)
        continue
      }

      const existingQuestions = new Set(existing?.map(e => e.question_text.trim().toLowerCase()) || [])

      // Filter out duplicates
      const newMCQs: DatabaseMCQ[] = []
      let skipped = 0

      for (const mcq of records) {
        const questionKey = mcq.question.trim().toLowerCase()

        if (existingQuestions.has(questionKey)) {
          skipped++
          continue
        }

        newMCQs.push({
          subject,
          year,
          paper_type: paperType,
          question_text: mcq.question.trim(),
          option_a: mcq.option_a.trim(),
          option_b: mcq.option_b.trim(),
          option_c: mcq.option_c.trim(),
          option_d: mcq.option_d.trim(),
          correct_answer: mcq.correct_answer.trim().toUpperCase()
        })
      }

      if (newMCQs.length > 0) {
        // Upload in batches of 100
        const batchSize = 100
        for (let i = 0; i < newMCQs.length; i += batchSize) {
          const batch = newMCQs.slice(i, i + batchSize)

          const { error: insertError } = await supabase
            .from('css_mcqs_enhanced')
            .insert(batch)

          if (insertError) {
            console.error(`      ❌ Error uploading batch: ${insertError.message}`)
          } else {
            console.log(`      ✅ Uploaded batch: ${batch.length} MCQs`)
          }
        }

        totalUploaded += newMCQs.length
      }

      if (skipped > 0) {
        console.log(`      ⏭️  Skipped ${skipped} duplicate MCQs`)
        totalSkipped += skipped
      }

      console.log(`      ✅ Completed: ${year}${paperType ? ` - ${paperType}` : ''}`)

    } catch (error) {
      console.error(`   ❌ Error processing ${file}:`, error)
    }
  }

  console.log(`\n   📊 Subject Summary for ${subject}:`)
  console.log(`      ✅ Total uploaded: ${totalUploaded}`)
  console.log(`      ⏭️  Total skipped: ${totalSkipped}`)
}

async function main() {
  console.log('🚀 Starting MCQ Upload Process')
  console.log('================================\n')

  // Get all subject folders
  const subjects = fs.readdirSync(MCQS_FOLDER)
    .filter(item => {
      const itemPath = path.join(MCQS_FOLDER, item)
      return fs.statSync(itemPath).isDirectory() && !item.startsWith('.')
    })

  console.log(`Found ${subjects.length} subjects:`)
  subjects.forEach(s => console.log(`  - ${s}`))

  let totalAllUploaded = 0
  let totalAllSkipped = 0

  // Process each subject
  for (const subject of subjects) {
    await uploadSubjectMCQs(subject)
  }

  console.log('\n\n================================')
  console.log('🎉 Upload Complete!')
  console.log('================================')
}

main().catch(console.error)
