import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getExamConfig } from '@/lib/exam-configs'
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

  const offset = (setNumber - 1) * 20

  const supabase = await createServerSupabaseClient()
  const dbVal    = topicDbValue(tagSlug, section.dbTable)
  const base     = supabase.from(section.dbTable).select('*')
  const { data, error } = await (
    isTagArrayTable(section.dbTable)
      ? base.contains('tags', [dbVal])
      : base.eq('topic', dbVal)
  ).order('id', { ascending: true }).range(offset, offset + 19)

  if (error || !data || data.length === 0) notFound()

  return (
    <QuizInterface
      mcqs={data}
      examSlug={examSlug}
      subjectSlug={subjectSlug}
      mode={`topic/${tagSlug}`}
      setNumber={setNumber}
    />
  )
}
