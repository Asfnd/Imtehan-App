import { notFound } from 'next/navigation'
import { MDCAT_SUBJECT_TABLES } from '@/lib/seo/topic-indexing'
import { MdcatTopicSeoShell } from '@/components/seo/MdcatTopicSeoShell'
import { MDCATTopicClient } from './MDCATTopicClient'
import {
  cachedFetchMCQsByDifficultySet,
  cachedFetchMCQsByTopicSet,
} from '@/lib/cached-quiz-fetch'

/** force-static + ISR — hub HTML CDN-cached; set list is client. */
export const dynamic = 'force-static'
export const revalidate = 86400
export const dynamicParams = true

const DIFFICULTY_DB: Record<string, string> = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
}

export default async function MDCATTopicPage({
  params,
}: {
  params: Promise<{ subject: string; topic: string }>
}) {
  const { subject, topic: rawTopic } = await params
  const table = MDCAT_SUBJECT_TABLES[subject]
  if (!table) notFound()

  const topic = decodeURIComponent(rawTopic)
  const difficulty = DIFFICULTY_DB[topic]
  const isDifficulty = !!difficulty

  const sampleMcqs = (
    isDifficulty
      ? await cachedFetchMCQsByDifficultySet({
          dbTable: table,
          difficulty: topic,
          setNumber: 1,
        }).catch(() => [])
      : await cachedFetchMCQsByTopicSet({
          dbTable: table,
          tag: topic,
          useTagsArray: false,
          setNumber: 1,
        }).catch(() => [])
  ).slice(0, 5)

  const displayLabel = isDifficulty ? difficulty! : topic

  return (
    <MdcatTopicSeoShell
      subject={subject}
      topicLabel={displayLabel}
      isDifficulty={isDifficulty}
      dbTable={table}
      sampleMcqs={sampleMcqs}
    >
      <MDCATTopicClient />
    </MdcatTopicSeoShell>
  )
}
