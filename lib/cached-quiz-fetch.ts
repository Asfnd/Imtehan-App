/**
 * Cached MCQ set loaders — 24h cache to stay within free CPU limits.
 * Uses cookie-free public Supabase only (safe for ISR SEO pages).
 * Practice API and SEO pages share these loaders.
 */

import { unstable_cache } from 'next/cache'
import { createPublicSupabaseClient } from '@/lib/supabase/public'
import {
  fetchMCQsBySet,
  fetchMCQsByDifficultySet,
  fetchMCQsByTopicSet,
  type FetchSetParams,
} from '@/lib/quiz-fetcher'
import type { QuizMcqRow } from '@/lib/set-integrity'

const REVALIDATE = 86400

export function cachedFetchMCQsBySet(params: FetchSetParams): Promise<QuizMcqRow[]> {
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
    async () => fetchMCQsBySet(createPublicSupabaseClient(), params),
    key,
    { revalidate: REVALIDATE, tags: [`mcq-set-${params.dbTable}`] }
  )()
}

export function cachedFetchMCQsByDifficultySet(params: {
  dbTable: string
  difficulty: string
  setNumber: number
  subjectField?: string
}): Promise<QuizMcqRow[]> {
  const key = [
    'diff',
    params.dbTable,
    params.difficulty,
    String(params.setNumber),
    params.subjectField ?? '',
  ]
  return unstable_cache(
    async () => fetchMCQsByDifficultySet(createPublicSupabaseClient(), params),
    key,
    { revalidate: REVALIDATE, tags: [`mcq-set-${params.dbTable}`] }
  )()
}

export function cachedFetchMCQsByTopicSet(params: {
  dbTable: string
  tag: string
  useTagsArray: boolean
  setNumber: number
}): Promise<QuizMcqRow[]> {
  const key = [
    'topic',
    params.dbTable,
    params.tag,
    String(params.useTagsArray),
    String(params.setNumber),
  ]
  return unstable_cache(
    async () => fetchMCQsByTopicSet(createPublicSupabaseClient(), params),
    key,
    { revalidate: REVALIDATE, tags: [`mcq-set-${params.dbTable}`] }
  )()
}

export function cachedMdcatRangeSet(params: {
  dbTable: string
  setNumber: number
  difficulty?: string
  topic?: string
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
      const supabase = createPublicSupabaseClient()
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

/** Cached row count for MDCAT/FSc set pagination (totalSets). */
export function cachedMdcatTopicCount(params: {
  dbTable: string
  difficulty?: string
  topic?: string
}): Promise<number> {
  const key = [
    'mdcat-count',
    params.dbTable,
    params.difficulty ?? '',
    params.topic ?? '',
  ]
  return unstable_cache(
    async () => {
      const supabase = createPublicSupabaseClient()
      let query = supabase.from(params.dbTable).select('*', { count: 'exact', head: true })
      if (params.difficulty) query = query.eq('difficulty', params.difficulty)
      else if (params.topic) query = query.eq('topic', params.topic)
      const { count, error } = await query
      if (error) throw new Error(error.message)
      return count ?? 0
    },
    key,
    { revalidate: REVALIDATE, tags: [`mcq-set-${params.dbTable}`] }
  )()
}

/** Cached head counts for exam mode/batch hubs (no full row scan). */
export function cachedExamTableCount(params: {
  dbTable: string
  type?: string | null
  targetExam?: string
  subjectField?: string
}): Promise<number> {
  const key = [
    'exam-count',
    params.dbTable,
    params.type ?? 'all',
    params.targetExam ?? '',
    params.subjectField ?? '',
  ]
  return unstable_cache(
    async () => {
      const supabase = createPublicSupabaseClient()
      let query = supabase.from(params.dbTable).select('id', { count: 'exact', head: true })
      if (params.subjectField) query = query.eq('subject', params.subjectField)
      if (params.targetExam) query = query.eq('target_exam', params.targetExam)
      else if (params.type) query = query.eq('type', params.type)
      const { count, error } = await query
      if (error) throw new Error(error.message)
      return count ?? 0
    },
    key,
    { revalidate: REVALIDATE, tags: [`mcq-set-${params.dbTable}`] }
  )()
}

/** Cached topic/tag head counts for set pickers (egress fix). */
export function cachedTopicTagCount(params: {
  dbTable: string
  tag: string
  useTagsArray: boolean
}): Promise<number> {
  const key = ['topic-count', params.dbTable, params.tag, String(params.useTagsArray)]
  return unstable_cache(
    async () => {
      const supabase = createPublicSupabaseClient()
      const base = supabase.from(params.dbTable).select('id', { count: 'exact', head: true })
      const query = params.useTagsArray
        ? base.contains('tags', [params.tag])
        : base.eq('topic', params.tag)
      const { count, error } = await query
      if (error) throw new Error(error.message)
      return count ?? 0
    },
    key,
    { revalidate: REVALIDATE, tags: [`mcq-set-${params.dbTable}`] }
  )()
}

/**
 * Sets 1–3 are indexable — keep full solved HTML for Google.
 * Cap crawl payload to avoid oversized RSC/JSON-LD responses (CPU + reliability).
 */
const SEO_FULL_SET_CAP = 20

export function seoMcqsForSet(setNumber: number, mcqs: QuizMcqRow[]): QuizMcqRow[] {
  if (setNumber >= 1 && setNumber <= 3) {
    return mcqs.slice(0, SEO_FULL_SET_CAP)
  }
  // Higher sets: thin teaser (usually noindex) — no answer keys in HTML
  return mcqs.slice(0, 1).map((m) => ({
    ...m,
    correct_answer: '',
    explanation: undefined,
  }))
}
