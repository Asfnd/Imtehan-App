import { unstable_cache } from 'next/cache'
import { NextResponse } from 'next/server'
import { createPublicSupabaseClient } from '@/lib/supabase/public'

export const runtime = 'nodejs'
export const dynamic = 'force-static'
export const revalidate = 86400

type SubjectStatRow = {
  subject: string
  question_count: number
  years: number[] | null
}

async function loadSubjectStats(): Promise<SubjectStatRow[]> {
  const supabase = createPublicSupabaseClient()
  const { data, error } = await supabase.rpc('get_enhanced_css_subject_stats')
  if (error) throw new Error(error.message)
  return ((data as SubjectStatRow[]) || []).map((row) => ({
    subject: String(row.subject),
    question_count: Number(row.question_count) || 0,
    years: Array.isArray(row.years) ? row.years.map(Number).filter(Number.isFinite) : [],
  }))
}

const cachedSubjectStats = unstable_cache(loadSubjectStats, ['css-subject-stats-v1'], {
  revalidate: 86400,
  tags: ['css-subject-stats'],
})

/** Aggregate subject list + years — KB payload, 24h cache (egress fix). */
export async function GET() {
  try {
    const stats = await cachedSubjectStats()
    return NextResponse.json(
      { subjects: stats },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=86400',
        },
      }
    )
  } catch (error) {
    console.error('css subject-stats:', error)
    return NextResponse.json({ error: 'Failed to load subject stats' }, { status: 500 })
  }
}
