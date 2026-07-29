import { NextRequest, NextResponse } from 'next/server'
import { cachedSectionStats } from '@/lib/cached-quiz-fetch'
import { topicDbValue, TOPIC_COL_TABLES } from '@/lib/topic-tags'
import { API_JSON_NO_STORE_HEADERS } from '@/lib/seo/cdn-cache'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

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

    return NextResponse.json({ ...stats, topics }, { headers: API_JSON_NO_STORE_HEADERS })
  } catch (error) {
    console.error('section-stats:', error)
    return NextResponse.json({ error: 'Failed to load section stats' }, { status: 500 })
  }
}
