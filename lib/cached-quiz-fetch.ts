/**
 * Cached MCQ set loaders — 24h ISR-friendly cache to stay within free CPU limits.
 * Used by SEO pages and /api/practice/set so we don't re-scan banks on every hit.
 */

import { unstable_cache } from 'next/cache'
import { createAdminSupabaseClient } from '@/lib/supabase/admin'
import { createPublicSupabaseClient } from '@/lib/supabase/public'
import {
  fetchMCQsBySet,
  fetchMCQsByDifficultySet,
  fetchMCQsByTopicSet,
  type FetchSetParams,
} from '@/lib/quiz-fetcher'
import type { QuizMcqRow } from '@/lib/set-integrity'

const REVALIDATE = 86400

function adminOrPublic(preferAdmin: boolean) {
  try {
    if (preferAdmin) return createAdminSupabaseClient()
  } catch {
    /* fall through */
  }
  return createPublicSupabaseClient()
}

export function cachedFetchMCQsBySet(
  params: FetchSetParams,
  opts?: { admin?: boolean }
): Promise<QuizMcqRow[]> {
  const key = [
    'set',
    params.dbTable,
    String(params.setNumber),
    params.mode ?? 'practice',
    params.subjectField ?? '',
    params.targetExam ?? '',
    String(!!params.noTypeFilter),
  ]
  return unstable_cache(
    async () => {
      const supabase = adminOrPublic(!!opts?.admin)
      return fetchMCQsBySet(supabase, params)
    },
    key,
    { revalidate: REVALIDATE, tags: [`mcq-set-${params.dbTable}`] }
  )()
}

export function cachedFetchMCQsByDifficultySet(params: {
  dbTable: string
  difficulty: string
  setNumber: number
  subjectField?: string
  admin?: boolean
}): Promise<QuizMcqRow[]> {
  const key = [
    'diff',
    params.dbTable,
    params.difficulty,
    String(params.setNumber),
    params.subjectField ?? '',
  ]
  return unstable_cache(
    async () => {
      const supabase = adminOrPublic(!!params.admin)
      return fetchMCQsByDifficultySet(supabase, params)
    },
    key,
    { revalidate: REVALIDATE, tags: [`mcq-set-${params.dbTable}`] }
  )()
}

export function cachedFetchMCQsByTopicSet(params: {
  dbTable: string
  tag: string
  useTagsArray: boolean
  setNumber: number
  admin?: boolean
}): Promise<QuizMcqRow[]> {
  const key = [
    'topic',
    params.dbTable,
    params.tag,
    String(params.useTagsArray),
    String(params.setNumber),
  ]
  return unstable_cache(
    async () => {
      const supabase = adminOrPublic(!!params.admin)
      return fetchMCQsByTopicSet(supabase, params)
    },
    key,
    { revalidate: REVALIDATE, tags: [`mcq-set-${params.dbTable}`] }
  )()
}

export function cachedMdcatRangeSet(params: {
  dbTable: string
  setNumber: number
  difficulty?: string
  topic?: string
  admin?: boolean
}): Promise<QuizMcqRow[]> {
  const key = [
    'mdcat-range',
    params.dbTable,
    String(params.setNumber),
    params.difficulty ?? '',
    params.topic ?? '',
  ]
  return unstable_cache(
    async () => {
      const supabase = adminOrPublic(!!params.admin)
      const offset = (params.setNumber - 1) * 20
      const cols =
        'id, question, option_a, option_b, option_c, option_d, correct_answer, explanation, topic, subtopic'
      let query = supabase.from(params.dbTable).select(cols)
      if (params.difficulty) query = query.eq('difficulty', params.difficulty)
      else if (params.topic) query = query.eq('topic', params.topic)
      const { data, error } = await query.order('id').range(offset, offset + 19)
      if (error) throw new Error(error.message)
      return (data ?? []).map((row: Record<string, unknown>) => ({
        id: Number(row.id),
        question: String(row.question),
        option_a: String(row.option_a),
        option_b: String(row.option_b),
        option_c: String(row.option_c),
        option_d: String(row.option_d),
        correct_answer: String(row.correct_answer).charAt(0).toUpperCase(),
        explanation: row.explanation ? String(row.explanation) : undefined,
      }))
    },
    key,
    { revalidate: REVALIDATE, tags: [`mcq-set-${params.dbTable}`] }
  )()
}

/** Sets 1–3 are often indexable — keep full solved HTML for Google. */
export function seoMcqsForSet(setNumber: number, mcqs: QuizMcqRow[]): QuizMcqRow[] {
  if (setNumber >= 1 && setNumber <= 3) return mcqs
  // Higher sets: thin teaser (usually noindex) — no answer keys in HTML
  return mcqs.slice(0, 1).map((m) => ({
    ...m,
    correct_answer: '',
    explanation: undefined,
  }))
}
