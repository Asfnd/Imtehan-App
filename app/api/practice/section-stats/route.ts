import { NextRequest, NextResponse } from 'next/server'
import { cachedSectionStats } from '@/lib/cached-quiz-fetch'
import { topicDbValue, TOPIC_COL_TABLES } from '@/lib/topic-tags'
import { API_JSON_NO_STORE_HEADERS } from '@/lib/seo/cdn-cache'
import { noteSupabaseFailure, softMode, SOFT_API_CACHE_HEADERS } from '@/lib/supabase-soft'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const SOFT_SECTION_STATS = {
  pastCount: 0,
  importantCount: 0,
  repeatedCount: 0,
  easyCount: 0,
  mediumCount: 0,
  hardCount: 0,
  topics: {} as Record<string, number>,
  soft: true as const,
}

function isEmptySectionStats(stats: {
  pastCount: number
  importantCount: number
  repeatedCount: number
  easyCount: number
  mediumCount: number
  hardCount: number
  topics: Record<string, number>
}): boolean {
  return (
    stats.pastCount === 0 &&
    stats.importantCount === 0 &&
    stats.repeatedCount === 0 &&
    stats.easyCount === 0 &&
    stats.mediumCount === 0 &&
    stats.hardCount === 0 &&
    Object.keys(stats.topics).every((k) => (stats.topics[k] ?? 0) === 0)
  )
}

/** Batched subject-hub counts (modes + difficulty + topics), 24h cache. */
export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams
  const dbTable = sp.get('dbTable')?.trim()
  if (!dbTable) {
    return NextResponse.json({ error: 'dbTable required' }, { status: 400 })
  }

  const tags = (sp.get('tags') || '')
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean)
  const useTopicCol = TOPIC_COL_TABLES.has(dbTable)
  const resolvedTags = tags.map((tag) =>
    useTopicCol ? topicDbValue(tag, dbTable) : tag
  )

  try {
    const stats = await cachedSectionStats({
      dbTable,
      noTypeFilter: sp.get('noTypeFilter') === '1',
      subjectField: sp.get('subjectField') || undefined,
      subjectFields: sp.get('subjects')
        ? sp
            .get('subjects')!
            .split('|')
            .map((n) => n.trim())
            .filter(Boolean)
        : undefined,
      subtopicField: sp.get('subtopicField') || undefined,
      topicFields: sp.get('topics')
        ? sp
            .get('topics')!
            .split('|')
            .map((n) => n.trim())
            .filter(Boolean)
        : undefined,
      titleCaseDifficulty: sp.get('titleCase') === '1',
      tags: resolvedTags,
      useTagsArray: !useTopicCol && sp.get('useTagsArray') !== '0',
      examSlug: sp.get('examSlug') || undefined,
      questionNeedles: sp.get('needles')
        ? sp
            .get('needles')!
            .split('|')
            .map((n) => n.trim())
            .filter(Boolean)
        : undefined,
    })

    // Remap topic counts back to original tag keys for the UI.
    const topics: Record<string, number> = {}
    tags.forEach((tag, i) => {
      topics[tag] = stats.topics[resolvedTags[i]] ?? 0
    })

    const payload = { ...stats, topics }

    // Soft + cold miss → empty fallback; soft headers. Warm cache still serves real numbers.
    if (softMode() && isEmptySectionStats(payload)) {
      return NextResponse.json(SOFT_SECTION_STATS, { headers: SOFT_API_CACHE_HEADERS })
    }

    return NextResponse.json(payload, { headers: API_JSON_NO_STORE_HEADERS })
  } catch (error) {
    noteSupabaseFailure(error)
    console.error('section-stats:', error)
    return NextResponse.json(SOFT_SECTION_STATS, { headers: SOFT_API_CACHE_HEADERS })
  }
}
