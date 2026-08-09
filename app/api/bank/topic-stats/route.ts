import { NextRequest, NextResponse } from 'next/server'
import { cachedBankTopicStats, cachedDifficultyCount } from '@/lib/cached-quiz-fetch'
import { API_JSON_NO_STORE_HEADERS } from '@/lib/seo/cdn-cache'
import { noteSupabaseFailure, softMode, SOFT_API_CACHE_HEADERS } from '@/lib/supabase-soft'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const ALLOWED = new Set([
  'mdcat_biology',
  'mdcat_chemistry',
  'mdcat_physics',
  'mdcat_english',
  'mdcat_logical_reasoning',
])

const SOFT_TOPIC_STATS = {
  topics: [] as { topic: string; count: number }[],
  difficulties: { Easy: 0, Medium: 0, Hard: 0 },
  total: 0,
  soft: true as const,
}

/** Topic + difficulty aggregates for MDCAT/FSc — no full-table client scans. */
export async function GET(request: NextRequest) {
  const dbTable = request.nextUrl.searchParams.get('dbTable')?.trim()
  if (!dbTable || !ALLOWED.has(dbTable)) {
    return NextResponse.json({ error: 'invalid dbTable' }, { status: 400 })
  }

  if (softMode()) {
    return NextResponse.json(SOFT_TOPIC_STATS, { headers: SOFT_API_CACHE_HEADERS })
  }

  try {
    const [topics, easy, medium, hard] = await Promise.all([
      cachedBankTopicStats(dbTable),
      cachedDifficultyCount({ dbTable, difficulty: 'Easy' }),
      cachedDifficultyCount({ dbTable, difficulty: 'Medium' }),
      cachedDifficultyCount({ dbTable, difficulty: 'Hard' }),
    ])

    return NextResponse.json(
      {
        topics,
        difficulties: { Easy: easy, Medium: medium, Hard: hard },
        total: easy + medium + hard,
      },
      { headers: API_JSON_NO_STORE_HEADERS }
    )
  } catch (error) {
    noteSupabaseFailure(error)
    console.error('bank topic-stats:', error)
    return NextResponse.json(SOFT_TOPIC_STATS, { headers: SOFT_API_CACHE_HEADERS })
  }
}
