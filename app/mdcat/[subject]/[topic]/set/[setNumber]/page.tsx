import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { mdcatTopicIndexingMeta } from '@/lib/seo/topic-indexing'
import { MdcatSetSeoShell } from '@/components/seo/MdcatTopicSeoShell'
import MDCATSetQuiz from '@/components/MDCATSetQuiz'
import {
  cachedMdcatRangeSet,
  cachedMdcatTopicCount,
  seoMcqsForSet,
} from '@/lib/cached-quiz-fetch'

/** force-static + ISR — CDN after first crawl; interactive via practice API. */
export const dynamic = 'force-static'
export const revalidate = 86400
export const dynamicParams = true

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

  const rangeParams = {
    dbTable: subjectCfg.table,
    setNumber,
    ...(difficulty ? { difficulty } : { topic }),
  }

  const [mapped, count] = await Promise.all([
    cachedMdcatRangeSet(rangeParams).catch(() => null),
    cachedMdcatTopicCount({
      dbTable: subjectCfg.table,
      ...(difficulty ? { difficulty } : { topic }),
    }).catch(() => 0),
  ])

  if (!mapped || mapped.length === 0) notFound()

  const totalSets = count ? Math.ceil(count / MCQS_PER_SET) : undefined
  const seoMcqs = seoMcqsForSet(setNumber, mapped)

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
          ...(difficulty ? { difficulty } : { tag: topic }),
        }}
      />
    </MdcatSetSeoShell>
  )
}
