import { createPublicSupabaseClient } from '@/lib/supabase/public'
import { unstable_cache } from 'next/cache'

export interface SampleMcq {
  question: string
  option_a: string
  option_b: string
  option_c: string
  option_d: string
  correct_answer: string
}

const MODE_DB_TYPE: Record<string, string | null> = {
  'most-repeated': 'most_repeated',
  'most-important': 'most_important',
  'past-papers': 'practice',
  practice: null,
}

async function fetchSampleMcqsUncached(
  dbTable: string,
  mode: string | undefined,
  limit: number,
): Promise<SampleMcq[]> {
  try {
    const supabase = createPublicSupabaseClient()
    let query = supabase
      .from(dbTable)
      .select('question, option_a, option_b, option_c, option_d, correct_answer')
      .limit(limit)

    const dbType = mode ? MODE_DB_TYPE[mode] : 'most_repeated'
    if (dbType) query = query.eq('type', dbType)

    const { data } = await query
    return (data as SampleMcq[]) ?? []
  } catch {
    return []
  }
}

export async function fetchSampleMcqs(
  dbTable: string,
  mode?: string,
  limit = 5,
): Promise<SampleMcq[]> {
  return unstable_cache(
    () => fetchSampleMcqsUncached(dbTable, mode, limit),
    [`sample-mcqs-${dbTable}-${mode ?? 'default'}-${limit}`],
    { revalidate: 86400, tags: [`sample-mcqs-${dbTable}`] },
  )()
}

export function correctOptionText(mcq: SampleMcq): string {
  const key = mcq.correct_answer?.toLowerCase()
  const map: Record<string, keyof SampleMcq> = {
    a: 'option_a',
    b: 'option_b',
    c: 'option_c',
    d: 'option_d',
  }
  const col = map[key]
  if (col) return String(mcq[col] ?? mcq.correct_answer)
  return mcq.correct_answer
}
