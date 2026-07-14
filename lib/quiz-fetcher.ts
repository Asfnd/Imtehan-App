import type { SupabaseClient } from '@supabase/supabase-js'
import { plainText, plainTextMcqFields } from '@/lib/plain-text'
import {
  dedupeMcqsForQuiz,
  normalizeQuestionStem,
  type QuizMcqRow,
} from '@/lib/set-integrity'
import { applyBankExamScope } from '@/lib/mcq-bank-scope'

const DEDUPE_SCAN_BATCH = 400
const DEDUPE_SCAN_MAX = 24_000

/**
 * Explicit columns only — never select('*') (egress).
 * Must be the INTERSECTION of columns across CSS/job banks and MDCAT tables.
 * Selecting optional cols (question_text, mcq, topic, tags, type, year, …)
 * breaks PostgREST when any one table is missing that column — mocks/sets
 * then return [] and crash the client.
 */
export const MCQ_SELECT_COLS =
  'id, question, option_a, option_b, option_c, option_d, correct_answer, explanation'

type QueryFactory = () => any

function extractAnswerLetter(raw: unknown): string {
  const v = String(raw ?? '').trim().toUpperCase()
  const m = v.match(/\b([A-D])\b/) ?? (v.length <= 4 ? v.match(/([A-D])/) : null)
  if (m) return m[1]
  const n = parseInt(v, 10)
  if (n >= 1 && n <= 4) return ['A', 'B', 'C', 'D'][n - 1]
  return ''
}

function normRow(r: Record<string, unknown>): QuizMcqRow | null {
  const s = (v: unknown) => (v == null ? '' : String(v).trim())
  const row = plainTextMcqFields(r)

  const id = typeof row.id === 'number' ? row.id : Number(row.id)
  if (!Number.isFinite(id)) return null

  const question = s(
    (row as Record<string, unknown>).question ??
      (row as Record<string, unknown>).question_text ??
      (row as Record<string, unknown>).mcq
  )
  if (!question || question.length < 8) return null

  const option_a = s(row.option_a)
  const option_b = s(row.option_b)
  const option_c = s(row.option_c)
  const option_d = s(row.option_d)
  if (!option_a || !option_b || !option_c || !option_d) return null
  // Drop duplicate-option garbage
  const opts = [option_a, option_b, option_c, option_d].map((o) => o.toLowerCase())
  if (new Set(opts).size < 4) return null

  const correct_answer = extractAnswerLetter(row.correct_answer)
  if (!correct_answer) return null

  const rawExpl =
    row.explanation ?? row.explanation_detailed ?? row.explanation_a ?? null

  return {
    id,
    question: plainText(question),
    option_a: plainText(option_a),
    option_b: plainText(option_b),
    option_c: plainText(option_c),
    option_d: plainText(option_d),
    correct_answer,
    explanation: rawExpl == null ? undefined : plainText(s(rawExpl)),
  }
}

async function loadMcqBatch(
  buildQuery: QueryFactory,
  offset: number,
  limit: number
): Promise<QuizMcqRow[]> {
  const { data, error } = await buildQuery()
    .order('id', { ascending: true })
    .range(offset, offset + limit - 1)
  if (error) throw new Error(`Failed to load MCQs: ${error.message}`)
  return ((data as Record<string, unknown>[]) || [])
    .map(normRow)
    .filter((m): m is QuizMcqRow => m !== null)
}

async function fetchDedupedSetPage(
  buildQuery: QueryFactory,
  setNumber: number,
  setSize: number
): Promise<QuizMcqRow[]> {
  const targetEnd = setNumber * setSize
  const targetStart = (setNumber - 1) * setSize
  const unique: QuizMcqRow[] = []
  const seenStems = new Set<string>()
  let offset = 0

  while (unique.length < targetEnd && offset < DEDUPE_SCAN_MAX) {
    const batch = await loadMcqBatch(buildQuery, offset, DEDUPE_SCAN_BATCH)
    if (batch.length === 0) break
    for (const m of batch) {
      const stem = normalizeQuestionStem(m.question)
      if (seenStems.has(stem)) continue
      seenStems.add(stem)
      unique.push(m)
    }
    offset += DEDUPE_SCAN_BATCH
    if (batch.length < DEDUPE_SCAN_BATCH) break
  }

  return dedupeMcqsForQuiz(unique.slice(targetStart, targetEnd))
}

export async function countUniqueMcqs(
  supabase: SupabaseClient,
  buildQuery: QueryFactory
): Promise<number> {
  const seenStems = new Set<string>()
  let offset = 0
  while (offset < DEDUPE_SCAN_MAX) {
    const batch = await loadMcqBatch(buildQuery, offset, DEDUPE_SCAN_BATCH)
    if (batch.length === 0) break
    for (const m of batch) {
      seenStems.add(normalizeQuestionStem(m.question))
    }
    offset += DEDUPE_SCAN_BATCH
    if (batch.length < DEDUPE_SCAN_BATCH) break
  }
  return seenStems.size
}

function buildModeQueryFactory(
  supabase: SupabaseClient,
  dbTable: string,
  opts: {
    mode?: string
    noTypeFilter?: boolean
    subjectField?: string
    targetExam?: string
    examSlug?: string
    questionNeedles?: string[]
  }
): QueryFactory {
  return () => {
    let query = supabase.from(dbTable).select(MCQ_SELECT_COLS)

    // Type filter when the bank supports it (skipped for mixed / MDCAT / subject slices)
    if (!opts.noTypeFilter && opts.mode && !opts.subjectField) {
      query = query.eq('type', opts.mode)
    }

    query = applyBankExamScope(query, {
      dbTable,
      examSlug: opts.examSlug,
      targetExam: opts.targetExam,
      subjectField: opts.subjectField,
      questionNeedles: opts.questionNeedles,
    })

    return query
  }
}

export type FetchSetParams = {
  dbTable: string
  setNumber: number
  setSize?: number
  mode?: string
  noTypeFilter?: boolean
  subjectField?: string
  targetExam?: string
  /** Live exam slug — scopes pipeline banks via target_exams */
  examSlug?: string
  questionNeedles?: string[]
}

export async function fetchMCQsBySet(
  supabase: SupabaseClient,
  params: FetchSetParams
): Promise<QuizMcqRow[]> {
  const {
    dbTable,
    setNumber,
    setSize = 20,
    mode = 'practice',
    noTypeFilter = false,
    subjectField,
    targetExam,
    examSlug,
    questionNeedles,
  } = params

  if (setNumber < 1) throw new Error(`Invalid setNumber: ${setNumber}`)

  const mixed = !!subjectField || noTypeFilter || mode === 'mixed'
  const buildScoped = buildModeQueryFactory(supabase, dbTable, {
    mode: mixed ? 'practice' : mode,
    noTypeFilter: mixed,
    subjectField,
    targetExam,
    examSlug,
    questionNeedles,
  })

  let page = await fetchDedupedSetPage(buildScoped, setNumber, setSize)

  // Specialist needle slices (FIA Act): if too few, drop needles but keep exam scope
  if (page.length < setSize && questionNeedles?.length && examSlug) {
    const loose = buildModeQueryFactory(supabase, dbTable, {
      mode: mixed ? 'practice' : mode,
      noTypeFilter: mixed,
      subjectField,
      targetExam,
      examSlug,
    })
    page = await fetchDedupedSetPage(loose, setNumber, setSize)
  }

  return page
}

export async function countUniqueForMode(
  supabase: SupabaseClient,
  params: Omit<FetchSetParams, 'setNumber' | 'setSize'>
): Promise<number> {
  const {
    dbTable,
    mode = 'practice',
    noTypeFilter = false,
    subjectField,
    targetExam,
    examSlug,
    questionNeedles,
  } = params
  const mixed = !!subjectField || noTypeFilter || mode === 'mixed'
  const buildQuery = buildModeQueryFactory(supabase, dbTable, {
    mode: mixed ? 'practice' : mode,
    noTypeFilter: mixed,
    subjectField,
    targetExam,
    examSlug,
    questionNeedles,
  })
  return countUniqueMcqs(supabase, buildQuery)
}

function difficultyVariants(d: string): string[] {
  return [d, d.charAt(0).toUpperCase() + d.slice(1)]
}

export async function fetchMCQsByDifficultySet(
  supabase: SupabaseClient,
  params: {
    dbTable: string
    difficulty: string
    setNumber: number
    setSize?: number
    subjectField?: string
    examSlug?: string
  }
): Promise<QuizMcqRow[]> {
  const { dbTable, difficulty, setNumber, setSize = 20, subjectField, examSlug } = params
  if (setNumber < 1) throw new Error(`Invalid setNumber: ${setNumber}`)

  const buildQuery: QueryFactory = () => {
    let query = supabase
      .from(dbTable)
      .select(MCQ_SELECT_COLS)
      .in('difficulty', difficultyVariants(difficulty))
    query = applyBankExamScope(query, { dbTable, examSlug, subjectField })
    return query
  }

  return fetchDedupedSetPage(buildQuery, setNumber, setSize)
}

export async function fetchMCQsByTopicSet(
  supabase: SupabaseClient,
  params: {
    dbTable: string
    tag: string
    useTagsArray: boolean
    setNumber: number
    setSize?: number
    examSlug?: string
  }
): Promise<QuizMcqRow[]> {
  const { dbTable, tag, useTagsArray, setNumber, setSize = 20, examSlug } = params
  if (setNumber < 1) throw new Error(`Invalid setNumber: ${setNumber}`)

  const buildQuery: QueryFactory = () => {
    let base = supabase.from(dbTable).select(MCQ_SELECT_COLS)
    base = useTagsArray ? base.contains('tags', [tag]) : base.eq('topic', tag)
    return applyBankExamScope(base, { dbTable, examSlug })
  }

  return fetchDedupedSetPage(buildQuery, setNumber, setSize)
}
