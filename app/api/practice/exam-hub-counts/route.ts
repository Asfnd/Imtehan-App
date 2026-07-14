import { NextRequest, NextResponse } from 'next/server'
import { getExamConfig } from '@/lib/exam-configs'
import { cachedExamTableCount } from '@/lib/cached-quiz-fetch'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/** All exam-hub section counts in one 24h-cached response. */
export async function GET(request: NextRequest) {
  const examSlug = request.nextUrl.searchParams.get('examSlug')?.trim()
  if (!examSlug) {
    return NextResponse.json({ error: 'examSlug required' }, { status: 400 })
  }

  const config = getExamConfig(examSlug)
  if (!config) {
    return NextResponse.json({ error: 'exam not found' }, { status: 404 })
  }

  try {
    const sections = await Promise.all(
      config.sections.map(async (section) => {
        if (section.noTypeFilter || section.subjectField) {
          const total = await cachedExamTableCount({
            dbTable: section.dbTable,
            type: null,
            subjectField: section.subjectField,
          })
          return {
            slug: section.slug,
            pastCount: total,
            importantCount: total,
            repeatedCount: total,
            totalMCQs: total,
          }
        }

        const [pastCount, importantCount, repeatedCount] = await Promise.all([
          cachedExamTableCount({ dbTable: section.dbTable, type: 'practice' }),
          cachedExamTableCount({ dbTable: section.dbTable, type: 'most_important' }),
          cachedExamTableCount({ dbTable: section.dbTable, type: 'most_repeated' }),
        ])

        return {
          slug: section.slug,
          pastCount,
          importantCount,
          repeatedCount,
          totalMCQs: pastCount + importantCount + repeatedCount,
        }
      })
    )

    return NextResponse.json(
      { sections },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=86400',
        },
      }
    )
  } catch (error) {
    console.error('exam-hub-counts:', error)
    return NextResponse.json({ error: 'Failed to load exam counts' }, { status: 500 })
  }
}
