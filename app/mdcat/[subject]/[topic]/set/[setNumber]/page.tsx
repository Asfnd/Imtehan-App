import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createPublicSupabaseClient } from '@/lib/supabase/public'
import { mdcatTopicIndexingMeta } from '@/lib/seo/topic-indexing'
import { MdcatSetSeoShell } from '@/components/seo/MdcatTopicSeoShell'
import MDCATSetQuiz from '@/components/MDCATSetQuiz'

/** Public SEO page — ISR 24h to cut crawl CPU. */
export const revalidate = 86400

const SUBJECT_CONFIG: Record<string, { name: string; table: string }> = {
  biology: { name: 'Biology', table: 'mdcat_biology' },
  chemistry: { name: 'Chemistry', table: 'mdcat_chemistry' },
  physics: { name: 'Physics', table: 'mdcat_physics' },
  english: { name: 'English', table: 'mdcat_english' },
  'logical-reasoning': { name: 'Logical Reasoning', table: 'mdcat_logical_reasoning' },
}

const DIFFICULTY_DB: Record<string, string> = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
}

const MCQS_PER_SET = 20
const COLS = 'id, question, option_a, option_b, option_c, option_d, correct_answer, explanation, topic, subtopic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subject: string; topic: string; setNumber: string }>
}): Promise<Metadata> {
  const { subject, topic: rawTopic, setNumber: setStr } = await params
  const subjectCfg = SUBJECT_CONFIG[subject]
  if (!subjectCfg) return { title: 'MDCAT Practice' }

  const topic = decodeURIComponent(rawTopic)
  const setNumber = parseInt(setStr, 10)
  const difficulty = DIFFICULTY_DB[topic]
  const displayLabel = difficulty ?? topic
  const encoded = encodeURIComponent(rawTopic)

  const selfCanonical = `https://imtehan.com/mdcat/${subject}/${encoded}/set/${setNumber}`
  const indexing = mdcatTopicIndexingMeta(selfCanonical, setNumber)

  const title = `MDCAT ${subjectCfg.name} ${displayLabel} Set ${setNumber} — 20 MCQs Solved`
  const description = `MDCAT ${subjectCfg.name} ${displayLabel} practice set ${setNumber}: 20 MCQs with detailed explanations for PMC, ETEA & NUMS.`

  return {
    title,
    description,
    robots: indexing.robots,
    alternates: { canonical: indexing.canonical },
    openGraph: { title, description, url: selfCanonical, type: 'website' },
  }
}

export default async function MDCATSetPage({
  params,
}: {
  params: Promise<{ subject: string; topic: string; setNumber: string }>
}) {
  const { subject, topic: rawTopic, setNumber: setNumStr } = await params

  const subjectCfg = SUBJECT_CONFIG[subject]
  if (!subjectCfg) notFound()

  const setNumber = parseInt(setNumStr, 10)
  if (isNaN(setNumber) || setNumber < 1) notFound()

  const topic = decodeURIComponent(rawTopic)
  const difficulty = DIFFICULTY_DB[topic]
  const offset = (setNumber - 1) * MCQS_PER_SET

  const supabase = createPublicSupabaseClient()

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
  const displayLabel = difficulty ?? topic

  const seoMcqs =
    setNumber === 1
      ? data.slice(0, 3).map((row) => ({
          id: Number(row.id),
          question: String(row.question),
          option_a: String(row.option_a),
          option_b: String(row.option_b),
          option_c: String(row.option_c),
          option_d: String(row.option_d),
          correct_answer: String(row.correct_answer).charAt(0).toUpperCase(),
          explanation: row.explanation ? String(row.explanation) : undefined,
        }))
      : []

  return (
    <MdcatSetSeoShell
      subject={subject}
      topicLabel={topic}
      isDifficulty={!!difficulty}
      setNumber={setNumber}
      dbTable={subjectCfg.table}
      mcqs={seoMcqs}
    >
      <MDCATSetQuiz
        mcqs={[]}
        examSlug="mdcat"
        subject={subject}
        subjectName={subjectCfg.name}
        subjectGradient="from-blue-600 to-blue-700"
        difficulty={topic}
        setNumber={setNumber}
        totalSets={totalSets}
        practiceRequest={{
          source: 'mdcat',
          dbTable: subjectCfg.table,
          difficulty: difficulty || undefined,
          tag: difficulty ? undefined : topic,
        }}
      />
    </MdcatSetSeoShell>
  )
}
