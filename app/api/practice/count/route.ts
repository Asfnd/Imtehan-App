import { NextRequest, NextResponse } from 'next/server'
import {
  cachedExamTableCount,
  cachedTopicTagCount,
  cachedDifficultyCount,
} from '@/lib/cached-quiz-fetch'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Head-count only (no row download), 24h server cache.
 * Replaces client-side unique-stem scans on set pickers (egress fix).
 * Pass examSlug so pipeline banks count only that exam's target_exams pool.
 */
export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams
  const dbTable = sp.get('dbTable')?.trim()
  if (!dbTable) {
    return NextResponse.json({ error: 'dbTable required' }, { status: 400 })
  }

  const type = sp.get('type')
  const targetExam = sp.get('targetExam') || undefined
  const subjectField = sp.get('subjectField') || undefined
  const tag = sp.get('tag') || undefined
  const useTagsArray = sp.get('useTagsArray') === '1'
  const all = sp.get('all') === '1'
  const examSlug = sp.get('examSlug') || undefined
  const difficulty = sp.get('difficulty') || undefined
  const needlesRaw = sp.get('needles') || undefined
  const questionNeedles = needlesRaw
    ? needlesRaw.split('|').map((n) => n.trim()).filter(Boolean)
    : undefined

  try {
    let count = 0
    if (tag) {
      count = await cachedTopicTagCount({
        dbTable,
        tag,
        useTagsArray,
        examSlug,
      })
    } else if (difficulty) {
      count = await cachedDifficultyCount({
        dbTable,
        difficulty,
        subjectField,
        examSlug,
      })
    } else {
      count = await cachedExamTableCount({
        dbTable,
        type: all ? null : type,
        targetExam,
        subjectField,
        examSlug,
        questionNeedles,
      })
    }

    return NextResponse.json(
      { count },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=86400',
        },
      }
    )
  } catch (error) {
    console.error('practice count:', error)
    return NextResponse.json({ error: 'Failed to count' }, { status: 500 })
  }
}
