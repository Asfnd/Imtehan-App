import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getExamConfig } from '@/lib/exam-configs'
import { fetchMCQsByDifficultySet } from '@/lib/quiz-fetcher'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { difficultyDbValue } from '@/lib/topic-tags'
import QuizInterface from '@/components/QuizInterface'

export const metadata: Metadata = {
  robots: { index: false, follow: true },
}

const VALID_LEVELS = ['easy', 'medium', 'hard']

export default async function DifficultyQuizSetPage({
  params,
}: {
  params: Promise<{
    examSlug: string
    subjectSlug: string
    level: string
    setNumber: string
  }>
}) {
  const { examSlug, subjectSlug, level, setNumber: setNumberStr } = await params

  if (!VALID_LEVELS.includes(level)) notFound()

  const config = getExamConfig(examSlug)
  if (!config) notFound()

  const section = config.sections.find((s) => s.slug === subjectSlug)
  if (!section) notFound()

  const setNumber = parseInt(setNumberStr)
  if (isNaN(setNumber) || setNumber < 1) notFound()

  const supabase = await createServerSupabaseClient()
  const mcqs = await fetchMCQsByDifficultySet(supabase, {
    dbTable: section.dbTable,
    difficulty: difficultyDbValue(level, section.dbTable),
    setNumber,
    subjectField: section.subjectField,
  }).catch(() => null)

  if (!mcqs || mcqs.length === 0) notFound()

  return (
    <QuizInterface
      mcqs={mcqs}
      examSlug={examSlug}
      subjectSlug={subjectSlug}
      mode={`difficulty/${level}`}
      setNumber={setNumber}
    />
  )
}
