import { NextRequest, NextResponse } from 'next/server'
import { cachedBankTopicStats, cachedDifficultyCount } from '@/lib/cached-quiz-fetch'
import { API_JSON_NO_STORE_HEADERS } from '@/lib/seo/cdn-cache'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const ALLOWED = new Set([
  'mdcat_biology',
  'mdcat_chemistry',
  'mdcat_physics',
  'mdcat_english',
  'mdcat_logical_reasoning',
])

/** Topic + difficulty aggregates for MDCAT/FSc — no full-table client scans. */
export async function GET(request: NextRequest) {
  const dbTable = request.nextUrl.searchParams.get('dbTable')?.trim()
  if (!dbTable || !ALLOWED.has(dbTable)) {
    return NextResponse.json({ error: 'invalid dbTable' }, { status: 400 })
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
    console.error('bank topic-stats:', error)
    return NextResponse.json({ error: 'Failed to load topic stats' }, { status: 500 })
  }
}
