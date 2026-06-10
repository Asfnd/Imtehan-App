import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getExamConfig } from '@/lib/exam-configs'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import QuizInterface from '@/components/QuizInterface'

export const metadata: Metadata = {
  robots: { index: false, follow: true },
}

const MODE_CONFIG = {
  'most-repeated': { label: 'Most Repeated', icon: '🔥', type: 'most_repeated' },
  'most-important': { label: 'Most Important', icon: '⭐', type: 'most_important' },
  'past-papers': { label: 'Past MCQs', icon: '📄', type: 'practice' },
  practice: { label: 'Practice Mode', icon: '📚', type: 'mixed' }
}

export default async function QuizSetPage({
  params
}: {
  params: Promise<{
    examSlug: string
    subjectSlug: string
    mode: string
    setNumber: string
  }>
}) {
  const { examSlug, subjectSlug, mode, setNumber: setNumberStr } = await params
  const config = getExamConfig(examSlug)

  if (!config) {
    notFound()
  }

  const section = config.sections.find((s) => s.slug === subjectSlug)

  if (!section) {
    notFound()
  }

  const modeConfig = MODE_CONFIG[mode as keyof typeof MODE_CONFIG]

  if (!modeConfig) {
    notFound()
  }

  const setNumber = parseInt(setNumberStr)
  if (isNaN(setNumber) || setNumber < 1) {
    notFound()
  }

  // Calculate offset for this set (sets are 1-indexed, but offset is 0-indexed)
  const offset = (setNumber - 1) * 20
  const limit = 20

  // Fetch MCQs for this set
  const supabase = await createServerSupabaseClient()

  let mcqs

  // Deterministic id ordering on every branch so .range() pagination is
  // stable across requests; without it Postgres can return overlapping rows
  // between sets, which was the root cause of the "same MCQs in every batch"
  // user complaints. See S1.1 in the cleanup pipeline.
  if (modeConfig.type === 'mixed') {
    const { data, error } = await supabase
      .from(section.dbTable)
      .select('*')
      .order('id', { ascending: true })
      .range(offset, offset + limit - 1)

    if (error || !data || data.length === 0) {
      notFound()
    }

    mcqs = data
  } else if (mode === 'past-papers' && config.pastPapersExam) {
    const { data, error } = await supabase
      .from(section.dbTable)
      .select('*')
      .eq('target_exam', config.pastPapersExam)
      .order('id', { ascending: true })
      .range(offset, offset + limit - 1)

    if (error || !data || data.length === 0) {
      notFound()
    }

    mcqs = data
  } else {
    const { data, error } = await supabase
      .from(section.dbTable)
      .select('*')
      .eq('type', modeConfig.type)
      .order('id', { ascending: true })
      .range(offset, offset + limit - 1)

    if (error || !data || data.length === 0) {
      notFound()
    }

    mcqs = data
  }

  return (
    <QuizInterface
      mcqs={mcqs}
      examSlug={examSlug}
      subjectSlug={subjectSlug}
      mode={mode}
      setNumber={setNumber}
    />
  )
}
