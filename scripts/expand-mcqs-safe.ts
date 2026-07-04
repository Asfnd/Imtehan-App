/**
 * Safe MCQ expansion — NEVER updates existing rows.
 *
 * CSS css_mcqs_enhanced:
 *   - Practice expansion uses year=NULL → invisible in year-wise picker
 *   - Past-paper rows MUST have integer year + consistent paper_type
 *
 * ISSB tables: separate banks, no year column.
 *
 * Loads all data/expansion/issb-batch-*.json, css-practice-batch-*.json,
 * and mdcat-english-batch-*.json.
 * Skips files listed in data/expansion/.applied-manifest.json (idempotent).
 *
 * Run: npx tsx scripts/expand-mcqs-safe.ts
 */
import { createClient } from '@supabase/supabase-js'
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'fs'
import { join } from 'path'

type IssbRow = {
  table: string
  question: string
  option_a: string
  option_b: string
  option_c: string
  option_d: string
  correct_answer: string
  explanation: string
  topic: string
  difficulty: string
  type: string
}

type CssPracticeRow = {
  subject: string
  question_text: string
  option_a: string
  option_b: string
  option_c: string
  option_d: string
  correct_answer: string
  explanation_detailed: string
  topic: string
  difficulty: string
  year: null
}

type MdcatEnglishRow = {
  question: string
  option_a: string
  option_b: string
  option_c: string
  option_d: string
  correct_answer: string
  explanation: string
  topic: string
  difficulty: string
}

const ISSB_TABLES = new Set([
  'issb_english',
  'issb_mathematics',
  'issb_general_knowledge',
  'issb_pakistan_affairs',
  'issb_intelligence',
])

/** Strip en/em dashes; keep explanations plain for students. */
function cleanExplanation(text: string): string {
  return text
    .replace(/\u2014/g, ', ')
    .replace(/\u2013/g, ', ')
    .replace(/\s*—\s*/g, '. ')
    .replace(/\s*–\s*/g, ', ')
    .replace(/\.\s*\./g, '.')
    .trim()
}

const MANIFEST_PATH = join(process.cwd(), 'data/expansion/.applied-manifest.json')

function loadManifest(): { applied: string[] } {
  if (!existsSync(MANIFEST_PATH)) return { applied: [] }
  return JSON.parse(readFileSync(MANIFEST_PATH, 'utf8')) as { applied: string[] }
}

function saveManifest(applied: string[]) {
  writeFileSync(
    MANIFEST_PATH,
    JSON.stringify({ applied, appliedAt: new Date().toISOString() }, null, 2) + '\n'
  )
}

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY
  if (!url || !key) {
    console.error('Missing Supabase credentials')
    process.exit(1)
  }

  // Pre-insert quality gate on pending JSON batches
  try {
    const { execSync } = await import('child_process')
    execSync('python3 scripts/validate-expansion-batch.py', { cwd: process.cwd(), stdio: 'inherit' })
  } catch {
    console.error('Validation failed — fix expansion JSON before insert')
    process.exit(1)
  }

  const supabase = createClient(url, key)
  const manifest = loadManifest()
  const newlyApplied: string[] = []

  const { count: yearRowsBefore } = await supabase
    .from('css_mcqs_enhanced')
    .select('*', { count: 'exact', head: true })
    .not('year', 'is', null)

  console.log(`\n📊 Before expansion:`)
  console.log(`   css_mcqs_enhanced WITH year (past papers): ${yearRowsBefore ?? '?'}`)

  for (const t of ISSB_TABLES) {
    const { count } = await supabase.from(t).select('*', { count: 'exact', head: true })
    console.log(`   ${t}: ${count ?? 0}`)
  }

  const expansionDir = join(process.cwd(), 'data/expansion')
  const issbFiles = readdirSync(expansionDir)
    .filter((f) => f.startsWith('issb-batch-') && f.endsWith('.json'))
    .sort()
  const cssFiles = readdirSync(expansionDir)
    .filter((f) => f.startsWith('css-practice-batch-') && f.endsWith('.json'))
    .sort()
  const mdcatFiles = readdirSync(expansionDir)
    .filter((f) => f.startsWith('mdcat-english-batch-') && f.endsWith('.json'))
    .sort()

  const { count: mdcatEngBefore } = await supabase
    .from('mdcat_english')
    .select('*', { count: 'exact', head: true })
  console.log(`   mdcat_english: ${mdcatEngBefore ?? 0}`)

  for (const file of issbFiles) {
    if (manifest.applied.includes(file)) {
      console.log(`⏭️  Skip (already applied): ${file}`)
      continue
    }
    const batch = JSON.parse(readFileSync(join(expansionDir, file), 'utf8')) as IssbRow[]
    const byTable = new Map<string, Omit<IssbRow, 'table'>[]>()
    for (const row of batch) {
      if (!ISSB_TABLES.has(row.table)) {
        console.warn(`Skip unknown table: ${row.table}`)
        continue
      }
      const { table, ...rest } = row
      if (!rest.explanation?.trim()) {
        console.warn(`Skip ISSB row without explanation: ${rest.question.slice(0, 40)}`)
        continue
      }
      if (!byTable.has(table)) byTable.set(table, [])
      byTable.get(table)!.push({
        ...rest,
        explanation: cleanExplanation(rest.explanation),
      })
    }
    for (const [table, rows] of byTable) {
      const { error } = await supabase.from(table).insert(rows)
      if (error) {
        console.error(`ISSB insert failed (${table}):`, error.message)
        process.exit(1)
      }
      console.log(`✅ ISSB +${rows.length} → ${table} (from ${file})`)
    }
    newlyApplied.push(file)
  }

  for (const file of cssFiles) {
    if (manifest.applied.includes(file)) {
      console.log(`⏭️  Skip (already applied): ${file}`)
      continue
    }
    const cssBatch = JSON.parse(readFileSync(join(expansionDir, file), 'utf8')) as CssPracticeRow[]
    const safeRows = cssBatch
      .filter((r) => r.year === null || r.year === undefined)
      .map((r) => ({
        subject: r.subject,
        year: null as null,
        question_text: r.question_text,
        option_a: r.option_a,
        option_b: r.option_b,
        option_c: r.option_c,
        option_d: r.option_d,
        correct_answer: r.correct_answer.toUpperCase().slice(0, 1),
        explanation_detailed: cleanExplanation(r.explanation_detailed),
        topic: r.topic,
        difficulty: r.difficulty,
        paper_type: null as null,
      }))

    if (safeRows.some((r) => r.year !== null)) {
      console.error('ABORT: CSS batch contained non-null year — would affect year picker')
      process.exit(1)
    }

    const { error } = await supabase.from('css_mcqs_enhanced').insert(safeRows)
    if (error) {
      console.error('CSS practice insert failed:', error.message)
      process.exit(1)
    }
    console.log(`✅ CSS practice +${safeRows.length} (year=NULL) from ${file}`)
    newlyApplied.push(file)
  }

  for (const file of mdcatFiles) {
    if (manifest.applied.includes(file)) {
      console.log(`⏭️  Skip (already applied): ${file}`)
      continue
    }
    const batch = JSON.parse(readFileSync(join(expansionDir, file), 'utf8')) as MdcatEnglishRow[]
    const rows = batch.map((r) => ({
      question: r.question,
      option_a: r.option_a,
      option_b: r.option_b,
      option_c: r.option_c,
      option_d: r.option_d,
      correct_answer: r.correct_answer.toUpperCase().slice(0, 1),
      explanation: cleanExplanation(r.explanation),
      topic: r.topic,
      difficulty: r.difficulty,
    }))
    for (const r of rows) {
      if (!r.explanation?.trim()) {
        console.error(`ABORT: MDCAT English row missing explanation: ${r.question.slice(0, 40)}`)
        process.exit(1)
      }
      if (!['Easy', 'Medium', 'Hard'].includes(r.difficulty)) {
        console.error(`ABORT: MDCAT difficulty must be Easy|Medium|Hard, got ${r.difficulty}`)
        process.exit(1)
      }
    }
    const { error } = await supabase.from('mdcat_english').insert(rows)
    if (error) {
      console.error('MDCAT English insert failed:', error.message)
      process.exit(1)
    }
    console.log(`✅ MDCAT English +${rows.length} from ${file}`)
    newlyApplied.push(file)
  }

  if (newlyApplied.length > 0) {
    saveManifest([...manifest.applied, ...newlyApplied])
    console.log(`\n📝 Manifest updated: ${newlyApplied.join(', ')}`)
  } else {
    console.log('\nℹ️  No new batches to apply.')
  }

  const { count: yearRowsAfter } = await supabase
    .from('css_mcqs_enhanced')
    .select('*', { count: 'exact', head: true })
    .not('year', 'is', null)

  console.log(`\n📊 After expansion:`)
  console.log(`   css_mcqs_enhanced WITH year: ${yearRowsAfter ?? '?'} (must match ${yearRowsBefore})`)

  if (yearRowsBefore !== yearRowsAfter) {
    console.error('⚠️  Year-row count changed — investigate immediately!')
    process.exit(1)
  }
  console.log('✅ Year-wise past paper rows intact (insert-only, no updates)\n')
}

main()
