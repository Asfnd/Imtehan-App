import { unstable_cache } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import { createPublicSupabaseClient } from '@/lib/supabase/public'
import { API_JSON_NO_STORE_HEADERS } from '@/lib/seo/cdn-cache'
import { noteSupabaseFailure, softMode } from '@/lib/supabase-soft'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type YearStatRow = {
  year: number
  paper_type: string | null
  question_count: number
}

async function loadYearStats(subject: string): Promise<YearStatRow[]> {
  const supabase = createPublicSupabaseClient()
  const { data, error } = await supabase.rpc('get_enhanced_css_year_stats', {
    p_subject: subject,
  })
  if (error) throw new Error(error.message)
  return ((data as YearStatRow[]) || []).map((row) => ({
    year: Number(row.year),
    paper_type: row.paper_type ?? null,
    question_count: Number(row.question_count) || 0,
  }))
}

/** Per-subject year/paper counts via RPC — no row downloads (egress fix). */
export async function GET(request: NextRequest) {
  const subject = request.nextUrl.searchParams.get('subject')?.trim()
  if (!subject) {
    return NextResponse.json({ error: 'subject required' }, { status: 400 })
  }

  if (softMode()) {
    return NextResponse.json({ years: [], soft: true }, { headers: API_JSON_NO_STORE_HEADERS })
  }

  try {
    const years = await unstable_cache(
      () => loadYearStats(subject),
      ['css-year-stats-v1', subject],
      { revalidate: 604800, tags: ['css-year-stats', `css-year-${subject}`] }
    )()

    return NextResponse.json({ years }, { headers: API_JSON_NO_STORE_HEADERS })
  } catch (error) {
    noteSupabaseFailure(error)
    console.error('css year-stats:', error)
    return NextResponse.json({ years: [], soft: true }, { headers: API_JSON_NO_STORE_HEADERS })
  }
}
