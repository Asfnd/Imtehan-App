import { notFound } from 'next/navigation'
import { createPublicSupabaseClient } from '@/lib/supabase/public'
import { fetchMCQsByTopicSet, fetchMCQsByDifficultySet } from '@/lib/quiz-fetcher'
import { MDCAT_SUBJECT_TABLES } from '@/lib/seo/topic-indexing'
import { MdcatTopicSeoShell } from '@/components/seo/MdcatTopicSeoShell'
import { MDCATTopicClient } from './MDCATTopicClient'

/** Public SEO page — ISR 24h to cut crawl CPU. */
export const revalidate = 86400

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

  const supabase = createPublicSupabaseClient()
  const sampleMcqs = isDifficulty
    ? await fetchMCQsByDifficultySet(supabase, {
        dbTable: table,
        difficulty: topic,
        setNumber: 1,
        setSize: 20,
      }).catch(() => [])
    : await fetchMCQsByTopicSet(supabase, {
        dbTable: table,
        tag: topic,
        useTagsArray: false,
        setNumber: 1,
        setSize: 20,
      }).catch(() => [])

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
