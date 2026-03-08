import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import MDCATSetQuiz from '@/components/MDCATSetQuiz'

export const metadata: Metadata = {
  robots: { index: false, follow: true },
}

const SUBJECT_CONFIG: Record<string, { name: string; table: string }> = {
  'biology':           { name: 'Biology',          table: 'mdcat_biology'           },
  'chemistry':         { name: 'Chemistry',        table: 'mdcat_chemistry'         },
  'physics':           { name: 'Physics',          table: 'mdcat_physics'           },
  'english':           { name: 'English',          table: 'mdcat_english'           },
  'logical-reasoning': { name: 'Logical Reasoning',table: 'mdcat_logical_reasoning' },
}

// Maps URL slugs to DB difficulty values
const DIFFICULTY_DB: Record<string, string> = {
  easy: 'Easy', medium: 'Medium', hard: 'Hard',
}

const MCQS_PER_SET = 20
const COLS = 'id, question, option_a, option_b, option_c, option_d, correct_answer, explanation, topic, subtopic'

export default async function MDCATSetPage({
  params,
}: {
  params: Promise<{ subject: string; topic: string; setNumber: string }>
}) {
  const { subject, topic: rawTopic, setNumber: setNumStr } = await params

  const subjectCfg = SUBJECT_CONFIG[subject]
  if (!subjectCfg) notFound()

  const setNumber = parseInt(setNumStr)
  if (isNaN(setNumber) || setNumber < 1) notFound()

  // Always decode — safe even if Next.js already decoded it
  const topic      = decodeURIComponent(rawTopic)
  const difficulty = DIFFICULTY_DB[topic]  // defined only for easy/medium/hard
  const offset     = (setNumber - 1) * MCQS_PER_SET

  const supabase = await createServerSupabaseClient()

  const baseQuery = difficulty
    ? supabase.from(subjectCfg.table).select(COLS).eq('difficulty', difficulty)
    : supabase.from(subjectCfg.table).select(COLS).eq('topic', topic)

  const countQuery = difficulty
    ? supabase.from(subjectCfg.table).select('*', { count: 'exact', head: true }).eq('difficulty', difficulty)
    : supabase.from(subjectCfg.table).select('*', { count: 'exact', head: true }).eq('topic', topic)

  const [{ data, error }, { count }] = await Promise.all([
    baseQuery.order('id').range(offset, offset + MCQS_PER_SET - 1),
    countQuery,
  ])

  if (error || !data || data.length === 0) notFound()

  const totalSets = count ? Math.ceil(count / MCQS_PER_SET) : undefined

  return (
    <MDCATSetQuiz
      mcqs={data}
      examSlug="mdcat"
      subject={subject}
      subjectName={subjectCfg.name}
      subjectGradient="from-blue-600 to-blue-700"
      difficulty={topic}
      setNumber={setNumber}
      totalSets={totalSets}
    />
  )
}
