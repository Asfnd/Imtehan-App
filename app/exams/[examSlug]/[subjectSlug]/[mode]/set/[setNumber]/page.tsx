import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getExamConfig } from '@/lib/exam-configs'
import { fetchMCQsBySet } from '@/lib/quiz-fetcher'
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

  const supabase = await createServerSupabaseClient()

  const mcqs = await fetchMCQsBySet(supabase, {
    dbTable: section.dbTable,
    setNumber,
    mode: modeConfig.type === 'mixed' ? 'mixed' : modeConfig.type,
    noTypeFilter: section.noTypeFilter,
    subjectField: section.subjectField,
    targetExam:
      mode === 'past-papers' && config.pastPapersExam
        ? config.pastPapersExam
        : undefined,
  }).catch(() => null)

  if (!mcqs || mcqs.length === 0) {
    notFound()
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
