import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { unstable_cache } from 'next/cache'
import { getExamConfig } from '@/lib/exam-configs'
import { createPublicSupabaseClient } from '@/lib/supabase/public'
import MockTestInterface from '@/components/MockTestInterface'
import { EXAM_MOCK_SPECS } from '@/lib/exam-mock-specs'
import { getEffectiveExamSettings } from '@/lib/exam-mock-blueprints'
import { MCQ_SELECT_COLS } from '@/lib/quiz-fetcher'

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

async function buildMockMcqs(examSlug: string, mockNumber: number) {
  const config = getExamConfig(examSlug)
  if (!config) return null
  const spec = EXAM_MOCK_SPECS[mockNumber]
  if (!spec) return null
  const { multiplier, qTypes } = spec
  const official = getEffectiveExamSettings(examSlug, config)
  const supabase = createPublicSupabaseClient()
  const allMCQs: Record<string, unknown>[] = []

  for (const section of official.sections) {
    const limit = Math.max(1, Math.round(section.count * multiplier))
    const { data: typed } = await supabase
      .from(section.dbTable)
      .select(MCQ_SELECT_COLS)
      .in('type', qTypes)
      .limit(limit * 4)

    let pool = typed ?? []

    if (pool.length < limit) {
      const { data: fallback } = await supabase
        .from(section.dbTable)
        .select(MCQ_SELECT_COLS)
        .not('type', 'in', `(${qTypes.map((t) => `'${t}'`).join(',')})`)
        .limit((limit - pool.length) * 4)

      pool = [...pool, ...(fallback ?? [])]
    }

    if (pool.length > 0) {
      const seeded = pool
        .map((mcq) => ({ mcq, hash: hashId(String(mcq.id), mockNumber * 7919) }))
        .sort((a, b) => a.hash - b.hash)
        .slice(0, limit)
        .map(({ mcq }) => ({ ...mcq, subject: section.label }))

      allMCQs.push(...seeded)
    }
  }

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
  return unstable_cache(
    () => buildMockMcqs(examSlug, mockNumber),
    [`exam-mock-${examSlug}-${mockNumber}`],
    { revalidate: 86400, tags: [`exam-mock-${examSlug}`] }
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
  if (!built) notFound()

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
