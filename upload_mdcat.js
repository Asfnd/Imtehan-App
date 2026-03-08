#!/usr/bin/env node

/**
 * MDCAT MCQ Bulk Upload Script
 * Uploads all 18,962 MCQs from MDCAT_Master_Bank to Supabase
 */

require('dotenv').config({ path: '.env.local' })

const fs = require('fs')
const path = require('path')
const { createClient } = require('@supabase/supabase-js')

// ── Configuration ─────────────────────────────────────────────────────────────
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const BASE_DIR = path.join(__dirname, 'MDCAT_Master_Bank')

// Subject → table mapping
const SUBJECT_TABLE_MAP = {
  'Biology': 'mdcat_biology',
  'Chemistry': 'mdcat_chemistry',
  'Physics': 'mdcat_physics',
  'English': 'mdcat_english',
  'Logical_Reasoning': 'mdcat_logical_reasoning',
}

// ── Supabase Client ──────────────────────────────────────────────────────────
if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('❌ Missing Supabase credentials. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// ── CSV Parser ────────────────────────────────────────────────────────────────
function parseCSV(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8')
  const lines = content.split('\n').filter(line => line.trim())

  if (lines.length < 2) return []

  const header = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''))
  const rows = []

  for (let i = 1; i < lines.length; i++) {
    // Handle CSV with quoted fields
    const values = []
    let current = ''
    let inQuotes = false

    for (let char of lines[i]) {
      if (char === '"') {
        inQuotes = !inQuotes
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim().replace(/^"|"$/g, ''))
        current = ''
      } else {
        current += char
      }
    }
    values.push(current.trim().replace(/^"|"$/g, ''))

    const row = {}
    header.forEach((key, idx) => {
      row[key] = values[idx] || ''
    })
    rows.push(row)
  }

  return rows
}

// ── Transform CSV row to DB row ──────────────────────────────────────────────
function transformRow(csvRow) {
  return {
    question: csvRow.Question || '',
    option_a: csvRow.Option_a || '',
    option_b: csvRow.Option_b || '',
    option_c: csvRow.Option_c || '',
    option_d: csvRow.Option_d || '',
    correct_answer: csvRow.Correct_answer || '',
    explanation: csvRow.Explanation || '',
    topic: csvRow.Topic ? csvRow.Topic.replace(/_/g, ' ') : '',
    subtopic: csvRow.Subtopic || '',
    difficulty: csvRow.Difficulty || 'Medium',
  }
}

// ── Upload batch ──────────────────────────────────────────────────────────────
async function uploadBatch(tableName, rows, batchSize = 500) {
  const batches = []
  for (let i = 0; i < rows.length; i += batchSize) {
    batches.push(rows.slice(i, i + batchSize))
  }

  let uploaded = 0
  for (let i = 0; i < batches.length; i++) {
    const { data, error } = await supabase
      .from(tableName)
      .insert(batches[i])

    if (error) {
      console.error(`  ❌ Batch ${i + 1}/${batches.length} failed:`, error.message)
      throw error
    }

    uploaded += batches[i].length
    process.stdout.write(`\r  ⏳ Uploaded ${uploaded}/${rows.length} rows...`)
  }
  console.log(`\r  ✅ Uploaded ${uploaded}/${rows.length} rows`)
}

// ── Main Upload Function ──────────────────────────────────────────────────────
async function uploadAllMCQs() {
  console.log('═══════════════════════════════════════════════════════════════')
  console.log('  MDCAT MCQ UPLOAD')
  console.log('═══════════════════════════════════════════════════════════════\n')

  const stats = {
    totalFiles: 0,
    totalMCQs: 0,
    bySubject: {},
  }

  // Iterate through subjects
  for (const [subject, tableName] of Object.entries(SUBJECT_TABLE_MAP)) {
    const subjectDir = path.join(BASE_DIR, subject)

    if (!fs.existsSync(subjectDir)) {
      console.log(`⚠️  ${subject} directory not found, skipping...\n`)
      continue
    }

    console.log(`📚 ${subject}`)

    const topics = fs.readdirSync(subjectDir).filter(t => {
      const topicPath = path.join(subjectDir, t)
      return fs.statSync(topicPath).isDirectory()
    })

    // Fetch topics already in Supabase for this subject
    const { data: existingRows } = await supabase.from(tableName).select('topic')
    const existingTopics = new Set((existingRows || []).map(r => r.topic))
    if (existingTopics.size > 0) {
      console.log(`  ℹ️  Already in DB: ${[...existingTopics].join(', ')}\n`)
    }

    let subjectMCQs = []
    let skipped = 0

    for (const topic of topics) {
      const csvPath = path.join(subjectDir, topic, 'mcqs.csv')

      if (!fs.existsSync(csvPath)) {
        console.log(`  ⚠️  ${topic}/mcqs.csv not found`)
        continue
      }

      const rows = parseCSV(csvPath)
      const transformed = rows.map(transformRow)

      // Use the topic name as it will appear in DB (underscores → spaces)
      const topicName = transformed[0]?.topic || topic.replace(/_/g, ' ')

      if (existingTopics.has(topicName)) {
        console.log(`  ⏭️  ${topic}: already uploaded (${rows.length} MCQs) — skipping`)
        skipped++
        continue
      }

      subjectMCQs = subjectMCQs.concat(transformed)

      console.log(`  ✓ ${topic}: ${rows.length} MCQs — queued for upload`)
      stats.totalFiles++
    }

    // Upload only new MCQs for this subject
    if (subjectMCQs.length > 0) {
      console.log(`\n  Uploading ${subjectMCQs.length} new MCQs to ${tableName}...`)
      await uploadBatch(tableName, subjectMCQs)

      stats.bySubject[subject] = subjectMCQs.length
      stats.totalMCQs += subjectMCQs.length
    } else if (skipped > 0) {
      console.log(`  ✅ All ${skipped} topics already in DB — nothing to upload`)
    }

    console.log()
  }

  // Summary
  console.log('═══════════════════════════════════════════════════════════════')
  console.log('  UPLOAD COMPLETE')
  console.log('═══════════════════════════════════════════════════════════════')
  console.log(`Total files:   ${stats.totalFiles}`)
  console.log(`Total MCQs:    ${stats.totalMCQs}\n`)

  for (const [subject, count] of Object.entries(stats.bySubject)) {
    console.log(`  ${subject.padEnd(20)} ${count.toString().padStart(5)} MCQs`)
  }
  console.log('\n✅ All MCQs uploaded successfully!')
}

// ── Run ───────────────────────────────────────────────────────────────────────
uploadAllMCQs().catch(err => {
  console.error('\n❌ Upload failed:', err)
  process.exit(1)
})
