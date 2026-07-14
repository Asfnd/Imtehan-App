import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { unstable_cache } from 'next/cache'
import { getExamConfig } from '@/lib/exam-configs'
import { createPublicSupabaseClient } from '@/lib/supabase/public'
import MockTestInterface from '@/components/MockTestInterface'
import { EXAM_MOCK_SPECS } from '@/lib/exam-mock-specs'
import { getEffectiveExamSettings } from '@/lib/exam-mock-blueprints'
import { MCQ_SELECT_COLS } from '@/lib/quiz-fetcher'
import { applyBankExamScope, isPipelineMcqTable } from '@/lib/mcq-bank-scope'

/** noindex mocks — cached build so repeat opens don't re-scan banks. */
export const dynamic = 'force-static'
export const revalidate = 86400
export const dynamicParams = true

export const metadata: Metadata = {
  robots: { index: false, follow: true },
}

function hashId(id: string, seed: number): number {
  let h = seed
  for (let i = 0; i < id.length; i++) {
    h = (Math.imul(31, h) + id.charCodeAt(i)) | 0
  }
  return Math.abs(h)
}

function isQualityRow(row: Record<string, unknown>): boolean {
  const q = String(row.question ?? '').trim()
  if (q.length < 8) return false
  const opts = ['option_a', 'option_b', 'option_c', 'option_d'].map((k) =>
    String(row[k] ?? '').trim().toLowerCase()
  )
  if (opts.some((o) => !o)) return false
  if (new Set(opts).size < 4) return false
  const ans = String(row.correct_answer ?? '')
    .trim()
    .toUpperCase()
  return /[A-D]/.test(ans)
}

async function fetchSectionPool(opts: {
  examSlug: string
  dbTable: string
  qTypes: string[]
  limit: number
  noTypeFilter?: boolean
  subjectField?: string
  questionNeedles?: string[]
  pastPapersExam?: string
}): Promise<Record<string, unknown>[]> {
  const {
    examSlug,
    dbTable,
    qTypes,
    limit,
    noTypeFilter,
    subjectField,
    questionNeedles,
    pastPapersExam,
  } = opts
  const supabase = createPublicSupabaseClient()
  const need = limit * 4

  const run = async (useNeedles: boolean, scoped: boolean) => {
    let query = supabase.from(dbTable).select(MCQ_SELECT_COLS)
    if (!noTypeFilter && !subjectField) {
      query = query.in('type', qTypes)
    }
    if (scoped) {
      query = applyBankExamScope(query, {
        dbTable,
        examSlug,
        subjectField,
        targetExam: pastPapersExam,
        questionNeedles: useNeedles ? questionNeedles : undefined,
      })
    } else if (subjectField) {
      query = query.eq('subject', subjectField)
    }
    const { data, error } = await query.limit(need)
    if (error) {
      console.error(`[mock] select failed ${dbTable}:`, error.message)
      return [] as Record<string, unknown>[]
    }
    return ((data as Record<string, unknown>[]) ?? []).filter(isQualityRow)
  }

  // 1) Exact exam scope (+ specialist needles when set)
  let pool = await run(!!questionNeedles?.length, true)

  // 2) Drop needles, keep exam scope
  if (pool.length < limit && questionNeedles?.length) {
    pool = await run(false, true)
  }

  // 3) Soft fallback: typed pool without exam scope (pipeline only — avoid polluting MDCAT)
  if (pool.length < limit && isPipelineMcqTable(dbTable)) {
    console.warn(
      `[mock] scoped pool short for ${examSlug}/${dbTable} (${pool.length}/${limit}); soft fallback`
    )
    const fb = await run(false, false)
    const seen = new Set(pool.map((m) => String(m.id)))
    for (const row of fb) {
      if (!seen.has(String(row.id))) pool.push(row)
    }
  }

  // 4) Last resort: any quality rows from table
  if (pool.length < limit) {
    const { data } = await supabase.from(dbTable).select(MCQ_SELECT_COLS).limit(need)
    const seen = new Set(pool.map((m) => String(m.id)))
    for (const row of ((data as Record<string, unknown>[]) ?? []).filter(isQualityRow)) {
      if (!seen.has(String(row.id))) pool.push(row)
    }
  }

  return pool
}

async function buildMockMcqs(examSlug: string, mockNumber: number) {
  const config = getExamConfig(examSlug)
  if (!config) return null
  const spec = EXAM_MOCK_SPECS[mockNumber]
  if (!spec) return null
  const { multiplier, qTypes } = spec
  const official = getEffectiveExamSettings(examSlug, config)
  const allMCQs: Record<string, unknown>[] = []

  for (const section of official.sections) {
    const limit = Math.max(1, Math.round(section.count * multiplier))
    const pool = await fetchSectionPool({
      examSlug,
      dbTable: section.dbTable,
      qTypes,
      limit,
      noTypeFilter: section.noTypeFilter,
      subjectField: section.subjectField,
      questionNeedles: section.questionNeedles,
      pastPapersExam: config.pastPapersExam,
    })

    if (pool.length > 0) {
      const seeded = pool
        .map((mcq) => ({ mcq, hash: hashId(String(mcq.id), mockNumber * 7919) }))
        .sort((a, b) => a.hash - b.hash)
        .slice(0, limit)
        .map(({ mcq }) => ({ ...mcq, subject: section.label }))

      allMCQs.push(...seeded)
    }
  }

  if (allMCQs.length === 0) return null

  const shuffledMCQs = allMCQs
    .map((mcq) => ({ mcq, hash: hashId(String(mcq.id), mockNumber * 3571) }))
    .sort((a, b) => a.hash - b.hash)
    .map(({ mcq }) => mcq)

  return {
    shuffledMCQs,
    mockDuration: Math.round(official.duration * multiplier),
    examName: config.name,
    passingPercentage: config.passingPercentage,
    negativeMarking: official.negativeMarking,
    negativeMarkingValue: official.negativeMarkingValue,
    mockTitle: spec.title,
  }
}

function cachedBuildMockMcqs(examSlug: string, mockNumber: number) {
  // v3: exam-scoped pools via target_exams
  return unstable_cache(
    () => buildMockMcqs(examSlug, mockNumber),
    [`exam-mock-v3-${examSlug}-${mockNumber}`],
    { revalidate: 86400, tags: [`exam-mock-${examSlug}`, 'exam-mocks-v3'] }
  )()
}

export default async function MockTestPage({
  params,
}: {
  params: Promise<{ examSlug: string; mockId: string }>
}) {
  const { examSlug, mockId } = await params
  if (!getExamConfig(examSlug)) notFound()

  const mockNumber = parseInt(mockId, 10)
  if (isNaN(mockNumber) || mockNumber < 1 || mockNumber > 20) notFound()
  if (!EXAM_MOCK_SPECS[mockNumber]) notFound()

  const built = await cachedBuildMockMcqs(examSlug, mockNumber)
  if (!built || built.shuffledMCQs.length === 0) notFound()

  return (
    <MockTestInterface
      mcqs={built.shuffledMCQs as any}
      examName={built.examName}
      duration={built.mockDuration}
      passingPercentage={built.passingPercentage}
      negativeMarking={built.negativeMarking}
      negativeMarkingValue={built.negativeMarkingValue}
      examSlug={examSlug}
      mockNumber={mockNumber}
      mockTitle={built.mockTitle}
    />
  )
}
