import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getExamConfig } from '@/lib/exam-configs'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import MockTestInterface from '@/components/MockTestInterface'

export const metadata: Metadata = {
  robots: { index: false, follow: true },
}

/**
 * qTypes controls which DB question types are fetched for each mock.
 * This ensures every mock's content genuinely reflects its description
 * and uses the exam's own subject distribution (section.count).
 *
 * DB type values:
 *  'most_repeated'  — questions that appear most frequently in real exams
 *  'most_important' — high-yield concept questions
 *  'practice'       — past paper / archived questions
 */
const MOCK_SPECS: Record<number, {
  title: string
  multiplier: number
  qTypes: string[]
}> = {
  // ── Standard (1–7) ────────────────────────────────────────────────
  1:  { title: 'Full Exam Simulation',      multiplier: 1.00, qTypes: ['most_repeated'] },
  2:  { title: 'Past Paper Pattern',         multiplier: 1.00, qTypes: ['practice'] },
  3:  { title: 'Subject-wise Balanced',      multiplier: 1.00, qTypes: ['most_repeated', 'most_important', 'practice'] },
  4:  { title: 'Core Concepts Focus',        multiplier: 1.00, qTypes: ['most_important'] },
  5:  { title: '75% Warm-up Test',           multiplier: 0.75, qTypes: ['most_repeated'] },
  6:  { title: 'Mixed Topics Sampler',       multiplier: 0.75, qTypes: ['most_repeated', 'most_important', 'practice'] },
  7:  { title: 'Quick 50% Revision',         multiplier: 0.50, qTypes: ['most_important'] },
  // ── Advanced (8–14) ───────────────────────────────────────────────
  8:  { title: 'Advanced Full Simulation',   multiplier: 1.00, qTypes: ['most_repeated'] },
  9:  { title: 'High-Yield MCQ Focus',       multiplier: 1.00, qTypes: ['most_repeated', 'most_important'] },
  10: { title: 'Comprehensive Deep-Dive',    multiplier: 1.00, qTypes: ['most_repeated', 'most_important', 'practice'] },
  11: { title: '75% Analytical Test',        multiplier: 0.75, qTypes: ['most_important'] },
  12: { title: 'Speed & Pressure Test',      multiplier: 0.50, qTypes: ['most_repeated'] },
  13: { title: 'Intensive Practice Set',     multiplier: 1.00, qTypes: ['practice'] },
  14: { title: 'Rapid Fire Blitz',           multiplier: 0.25, qTypes: ['most_repeated'] },
  // ── Expert (15–20) ────────────────────────────────────────────────
  15: { title: 'Expert Level Full Test',     multiplier: 1.00, qTypes: ['most_repeated', 'most_important', 'practice'] },
  16: { title: 'Ultimate Challenge',         multiplier: 1.00, qTypes: ['most_repeated', 'most_important', 'practice'] },
  17: { title: '75% Champions Drill',        multiplier: 0.75, qTypes: ['most_repeated', 'most_important'] },
  18: { title: 'Final Comprehensive Review', multiplier: 1.00, qTypes: ['most_repeated', 'most_important', 'practice'] },
  19: { title: 'Grand Master Simulation',    multiplier: 1.00, qTypes: ['most_repeated', 'most_important', 'practice'] },
  20: { title: 'The Final Assessment',       multiplier: 1.00, qTypes: ['most_repeated', 'most_important', 'practice'] },
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
  params
}: {
  params: Promise<{ examSlug: string; mockId: string }>
}) {
  const { examSlug, mockId } = await params
  const config = getExamConfig(examSlug)

  if (!config) notFound()

  const mockNumber = parseInt(mockId)
  if (isNaN(mockNumber) || mockNumber < 1 || mockNumber > 20) notFound()

  const spec = MOCK_SPECS[mockNumber]
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
        sections={config.sections.map(s => ({ label: s.label, count: Math.max(1, Math.round(s.count * multiplier)), slug: s.slug }))}
      />
    </>
  )
}
