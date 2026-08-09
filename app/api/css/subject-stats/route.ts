import { unstable_cache } from 'next/cache'
import { NextResponse } from 'next/server'
import { createPublicSupabaseClient } from '@/lib/supabase/public'
import { API_JSON_NO_STORE_HEADERS } from '@/lib/seo/cdn-cache'
import { noteSupabaseFailure, softMode } from '@/lib/supabase-soft'

export const runtime = 'nodejs'
/** Never bake this at build time — Free Nano timeouts kill `next build`. */
export const dynamic = 'force-dynamic'

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
  revalidate: 604800,
  tags: ['css-subject-stats'],
})

/** Aggregate subject list + years — KB payload (egress fix). */
export async function GET() {
  if (softMode()) {
    return NextResponse.json({ subjects: [], soft: true }, { headers: API_JSON_NO_STORE_HEADERS })
  }
  try {
    const stats = await cachedSubjectStats()
    return NextResponse.json({ subjects: stats }, { headers: API_JSON_NO_STORE_HEADERS })
  } catch (error) {
    noteSupabaseFailure(error)
    console.error('css subject-stats:', error)
    return NextResponse.json({ subjects: [], soft: true }, { headers: API_JSON_NO_STORE_HEADERS })
  }
}
