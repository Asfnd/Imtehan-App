import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getExamConfig } from '@/lib/exam-configs'
import { fetchMCQsByTopicSet } from '@/lib/quiz-fetcher'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { isTagArrayTable, topicDbValue } from '@/lib/topic-tags'
import QuizInterface from '@/components/QuizInterface'

export const metadata: Metadata = {
  robots: { index: false, follow: true },
}

export default async function TopicQuizSetPage({
  params,
}: {
  params: Promise<{
    examSlug: string
    subjectSlug: string
    tagSlug: string
    setNumber: string
  }>
}) {
  const { examSlug, subjectSlug, tagSlug, setNumber: setNumberStr } = await params

  const config = getExamConfig(examSlug)
  if (!config) notFound()

  const section = config.sections.find((s) => s.slug === subjectSlug)
  if (!section) notFound()

  const setNumber = parseInt(setNumberStr)
  if (isNaN(setNumber) || setNumber < 1) notFound()

  const dbVal = topicDbValue(tagSlug, section.dbTable)
  const supabase = await createServerSupabaseClient()
  const mcqs = await fetchMCQsByTopicSet(supabase, {
    dbTable: section.dbTable,
    tag: dbVal,
    useTagsArray: isTagArrayTable(section.dbTable),
    setNumber,
  }).catch(() => null)

  if (!mcqs || mcqs.length === 0) notFound()

  return (
    <QuizInterface
      mcqs={mcqs}
      examSlug={examSlug}
      subjectSlug={subjectSlug}
      mode={`topic/${tagSlug}`}
      setNumber={setNumber}
    />
  )
}
