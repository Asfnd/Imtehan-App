import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getExamConfig } from '@/lib/exam-configs'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import MockTestInterface from '@/components/MockTestInterface'
import { EXAM_MOCK_SPECS } from '@/lib/exam-mock-specs'

export const metadata: Metadata = {
  robots: { index: false, follow: true },
}

// Deterministic hash for stable shuffle per (id, mockNumber) pair
function hashId(id: string, seed: number): number {
  let h = seed
  for (let i = 0; i < id.length; i++) {
    h = Math.imul(31, h) + id.charCodeAt(i) | 0
  }
  return Math.abs(h)
}

export default async function MockTestPage({
  params,
}: {
  params: Promise<{ examSlug: string; mockId: string }>
}) {
  const { examSlug, mockId } = await params
  const config = getExamConfig(examSlug)

  if (!config) notFound()

  const mockNumber = parseInt(mockId)
  if (isNaN(mockNumber) || mockNumber < 1 || mockNumber > 20) notFound()

  const spec = EXAM_MOCK_SPECS[mockNumber]
  if (!spec) notFound()
  const { multiplier, qTypes } = spec

  const supabase = await createServerSupabaseClient()
  const allMCQs: any[] = []

  for (const section of config.sections) {
    // Exact per-section question count as defined in the exam config
    const limit = Math.max(1, Math.round(section.count * multiplier))

    // 1. Try to fetch from the mock's intended question types
    const { data: typed } = await supabase
      .from(section.dbTable)
      .select('*')
      .in('type', qTypes)
      .limit(limit * 4)  // fetch extra so the seeded shuffle has variety

    let pool = typed ?? []

    // 2. If the typed pool is too small, top-up with any question type
    if (pool.length < limit) {
      const { data: fallback } = await supabase
        .from(section.dbTable)
        .select('*')
        .not('type', 'in', `(${qTypes.map(t => `'${t}'`).join(',')})`)
        .limit((limit - pool.length) * 4)

      pool = [...pool, ...(fallback ?? [])]
    }

    if (pool.length > 0) {
      // Stable deterministic shuffle, take exactly `limit`
      const seeded = pool
        .map((mcq) => ({ mcq, hash: hashId(String(mcq.id), mockNumber * 7919) }))
        .sort((a, b) => a.hash - b.hash)
        .slice(0, limit)
        .map(({ mcq }) => ({ ...mcq, subject: section.label }))

      allMCQs.push(...seeded)
    }
  }

  // Final interleave shuffle across sections
  const shuffledMCQs = allMCQs
    .map((mcq) => ({ mcq, hash: hashId(String(mcq.id), mockNumber * 3571) }))
    .sort((a, b) => a.hash - b.hash)
    .map(({ mcq }) => mcq)

  const mockDuration = Math.round(config.duration * multiplier)

  return (
    <>
      <MockTestInterface
        mcqs={shuffledMCQs}
        examName={config.name}
        duration={mockDuration}
        passingPercentage={config.passingPercentage}
        negativeMarking={config.negativeMarking}
        examSlug={examSlug}
        mockNumber={mockNumber}
        mockTitle={spec.title}
      />
    </>
  )
}
