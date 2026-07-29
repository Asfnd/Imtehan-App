import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { unstable_cache } from 'next/cache'
import { getExamConfig } from '@/lib/exam-configs'
import { createPublicSupabaseClient } from '@/lib/supabase/public'
import MockTestInterface from '@/components/MockTestInterface'
import { EXAM_MOCK_SPECS } from '@/lib/exam-mock-specs'
import { getEffectiveExamSettings } from '@/lib/exam-mock-blueprints'
import { mcqSelectCols } from '@/lib/quiz-fetcher'
import {
  applyBankExamScope,
  isPipelineMcqTable,
  type BankScopeMode,
} from '@/lib/mcq-bank-scope'

/**
 * noindex mocks — bank fetch is unstable_cache'd; page itself must not be
 * force-static with a week-long CDN TTL or a one-off empty build poisons
 * Cloudflare with a soft-404 for 7 days (seen on Law-GAT mock/1).
 */
export const dynamic = 'force-dynamic'
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
  const q = String(row.question ?? row.question_text ?? '').trim()
  if (q.length < 8) return false
  // Drop generator padding that is not real Law-GAT syllabus content
  if (/^law-gat review\s+\d+/i.test(q)) return false
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
  subjectFields?: string[]
  subtopicField?: string
  topicFields?: string[]
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
    subjectFields,
    subtopicField,
    topicFields,
    questionNeedles,
    pastPapersExam,
  } = opts
  const supabase = createPublicSupabaseClient()
  const need = Math.max(limit * 4, 40)
  const pipeline = isPipelineMcqTable(dbTable)
  const hasSpecialistFilter =
    !!questionNeedles?.length || !!topicFields?.length || !!subjectFields?.length

  const run = async (useNeedles: boolean, scopeMode: BankScopeMode | null) => {
    let query = supabase.from(dbTable).select(mcqSelectCols(dbTable))
    if (
      !noTypeFilter &&
      !subjectField &&
      !subjectFields?.length &&
      !subtopicField &&
      !topicFields?.length
    ) {
      query = query.in('type', qTypes)
    }
    if (scopeMode && pipeline) {
      query = applyBankExamScope(query, {
        dbTable,
        examSlug,
        subjectField,
        subjectFields,
        subtopicField,
        topicFields,
        targetExam: pastPapersExam,
        questionNeedles: useNeedles ? questionNeedles : undefined,
        scopeMode,
      })
    } else if (
      subjectField ||
      subjectFields?.length ||
      subtopicField ||
      topicFields?.length ||
      pastPapersExam ||
      (useNeedles && questionNeedles)
    ) {
      query = applyBankExamScope(query, {
        dbTable,
        examSlug: pipeline ? examSlug : undefined,
        subjectField,
        subjectFields,
        subtopicField,
        topicFields,
        targetExam: pastPapersExam,
        questionNeedles: useNeedles ? questionNeedles : undefined,
        scopeMode: pipeline ? 'family' : undefined,
      })
    }
    const { data, error } = await query.limit(need)
    if (error) {
      console.error(`[mock] select failed ${dbTable}:`, error.message)
      return [] as Record<string, unknown>[]
    }
    // Dynamic `mcqSelectCols()` makes PostgREST infer GenericStringError[]; narrow via unknown.
    return ((data as unknown as Record<string, unknown>[]) ?? []).filter(isQualityRow)
  }

  // Specialist modules (FIA Act / Law-GAT topics): never pad with random bank rows.
  if (hasSpecialistFilter) {
    let pool = await run(true, 'exact')
    if (pool.length < limit) pool = await run(true, 'family')
    return pool
  }

  // Normal sections: exact slug first, then family hub — never unscoped pipeline.
  let pool = await run(false, pipeline ? 'exact' : null)
  if (pool.length < limit && pipeline) {
    pool = await run(false, 'family')
  }
  // Non-pipeline (e.g. engineering_intelligence / MDCAT / css_mcqs_enhanced)
  if (pool.length < limit && !pipeline) {
    pool = await run(false, null)
  }

  return pool
}

type SectionPick = {
  label: string
  limit: number
  rows: Record<string, unknown>[]
  needles?: boolean
}

async function buildMockMcqs(examSlug: string, mockNumber: number) {
  const config = getExamConfig(examSlug)
  if (!config) return null
  const spec = EXAM_MOCK_SPECS[mockNumber]
  if (!spec) return null
  const { multiplier, qTypes } = spec
  const official = getEffectiveExamSettings(examSlug, config)

  const picks: SectionPick[] = []
  for (const section of official.sections) {
    const limit = Math.max(1, Math.round(section.count * multiplier))
    const pool = await fetchSectionPool({
      examSlug,
      dbTable: section.dbTable,
      qTypes,
      limit,
      noTypeFilter: section.noTypeFilter,
      subjectField: section.subjectField,
      subjectFields: section.subjectFields,
      subtopicField: section.subtopicField,
      topicFields: section.topicFields,
      questionNeedles: section.questionNeedles,
      pastPapersExam: config.pastPapersExam,
    })
    picks.push({
      label: section.label,
      limit,
      rows: pool,
      needles:
        !!section.questionNeedles?.length ||
        !!section.topicFields?.length ||
        !!section.subjectFields?.length,
    })
  }

  // Keep official total MCQ count without mislabeling specialist shortfalls
  // (e.g. FIA Act). Extra slots go into non-needle pipeline sections that still
  // have unused scoped rows (usually GK / English).
  let deficit = 0
  for (const p of picks) {
    if (p.rows.length < p.limit) deficit += p.limit - p.rows.length
  }
  if (deficit > 0) {
    for (const p of picks) {
      if (deficit <= 0) break
      if (p.needles) continue
      const spare = Math.max(0, p.rows.length - p.limit)
      if (spare <= 0) continue
      const take = Math.min(spare, deficit)
      p.limit += take
      deficit -= take
    }
  }

  const allMCQs: Record<string, unknown>[] = []
  for (const p of picks) {
    if (p.rows.length === 0) continue
    const seeded = p.rows
      .map((mcq) => ({ mcq, hash: hashId(String(mcq.id), mockNumber * 7919) }))
      .sort((a, b) => a.hash - b.hash)
      .slice(0, p.limit)
      .map(({ mcq }) => ({ ...mcq, subject: p.label }))
    allMCQs.push(...seeded)
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

async function cachedBuildMockMcqs(examSlug: string, mockNumber: number) {
  // v8: recover from v7 empty-cache poison; never cache a null miss long-term
  const cached = await unstable_cache(
    () => buildMockMcqs(examSlug, mockNumber),
    [`exam-mock-v8-${examSlug}-${mockNumber}`],
    { revalidate: 86400, tags: [`exam-mock-${examSlug}`, 'exam-mocks-v8'] }
  )()
  if (cached && cached.shuffledMCQs.length > 0) return cached
  // Bypass poisoned/empty cache entry with a fresh bank read
  return buildMockMcqs(examSlug, mockNumber)
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
  // Prefer error over notFound so CDNs don't cache a soft-404 for a week
  if (!built || built.shuffledMCQs.length === 0) {
    throw new Error(`Mock ${mockNumber} for ${examSlug} returned no MCQs`)
  }

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
