/**
 * Cached MCQ set loaders — 7d cache to stay within free egress limits.
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
import { applyBankExamScope } from '@/lib/mcq-bank-scope'
import { noteSupabaseFailure, softMode } from '@/lib/supabase-soft'

const REVALIDATE = 604800

export function cachedFetchMCQsBySet(params: FetchSetParams): Promise<QuizMcqRow[]> {
  const key = [
    'set-v6',
    params.dbTable,
    String(params.setNumber),
    params.mode ?? 'practice',
    params.subjectField ?? '',
    (params.subjectFields ?? []).join('|'),
    params.targetExam ?? '',
    params.examSlug ?? '',
    (params.questionNeedles ?? []).join('|'),
    (params.topicFields ?? []).join('|'),
    params.subtopicField ?? '',
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
  examSlug?: string
}): Promise<QuizMcqRow[]> {
  const key = [
    'diff-v4',
    params.dbTable,
    params.difficulty,
    String(params.setNumber),
    params.subjectField ?? '',
    params.examSlug ?? '',
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
  examSlug?: string
}): Promise<QuizMcqRow[]> {
  const key = [
    'topic-v4',
    params.dbTable,
    params.tag,
    String(params.useTagsArray),
    String(params.setNumber),
    params.examSlug ?? '',
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
  subjectFields?: string[]
  subtopicField?: string
  topicFields?: string[]
  examSlug?: string
  questionNeedles?: string[]
}): Promise<number> {
  if (softMode()) return Promise.resolve(0)
  const key = [
    'exam-count-v6',
    params.dbTable,
    params.type ?? 'all',
    params.targetExam ?? '',
    params.subjectField ?? '',
    (params.subjectFields ?? []).join('|'),
    params.subtopicField ?? '',
    (params.topicFields ?? []).join('|'),
    params.examSlug ?? '',
    (params.questionNeedles ?? []).join('|'),
  ]
  return unstable_cache(
    async () => {
      try {
        const supabase = createPublicSupabaseClient()
        let query = supabase.from(params.dbTable).select('id', { count: 'exact', head: true })
        if (params.targetExam) query = query.eq('target_exam', params.targetExam)
        else if (params.type) query = query.eq('type', params.type)
        query = applyBankExamScope(query, {
          dbTable: params.dbTable,
          examSlug: params.examSlug,
          subjectField: params.subjectField,
          subjectFields: params.subjectFields,
          subtopicField: params.subtopicField,
          topicFields: params.topicFields,
          targetExam: params.targetExam,
          questionNeedles: params.questionNeedles,
          scopeMode: 'family',
        })
        const { count, error } = await query
        if (error) {
          noteSupabaseFailure(error)
          throw new Error(error.message)
        }
        return count ?? 0
      } catch (e) {
        noteSupabaseFailure(e)
        throw e
      }
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
  examSlug?: string
}): Promise<number> {
  if (softMode()) return Promise.resolve(0)
  const key = [
    'topic-count-v4',
    params.dbTable,
    params.tag,
    String(params.useTagsArray),
    params.examSlug ?? '',
  ]
  return unstable_cache(
    async () => {
      try {
        const supabase = createPublicSupabaseClient()
        let query = supabase.from(params.dbTable).select('id', { count: 'exact', head: true })
        query = params.useTagsArray
          ? query.contains('tags', [params.tag])
          : query.eq('topic', params.tag)
        query = applyBankExamScope(query, {
          dbTable: params.dbTable,
          examSlug: params.examSlug,
          scopeMode: 'family',
        })
        const { count, error } = await query
        if (error) {
          noteSupabaseFailure(error)
          throw new Error(error.message)
        }
        return count ?? 0
      } catch (e) {
        noteSupabaseFailure(e)
        throw e
      }
    },
    key,
    { revalidate: REVALIDATE, tags: [`mcq-set-${params.dbTable}`] }
  )()
}

/** Cached difficulty head count (MDCAT/exam hubs). */
export function cachedDifficultyCount(params: {
  dbTable: string
  difficulty: string
  subjectField?: string
  topicFields?: string[]
  questionNeedles?: string[]
  examSlug?: string
}): Promise<number> {
  if (softMode()) return Promise.resolve(0)
  const key = [
    'diff-count-v5',
    params.dbTable,
    params.difficulty,
    params.subjectField ?? '',
    (params.topicFields ?? []).join('|'),
    (params.questionNeedles ?? []).join('|'),
    params.examSlug ?? '',
  ]
  return unstable_cache(
    async () => {
      try {
        const supabase = createPublicSupabaseClient()
        const level = params.difficulty.trim()
        const variants = Array.from(
          new Set([level, level.charAt(0).toUpperCase() + level.slice(1).toLowerCase(), level.toLowerCase()])
        )
        let query = supabase
          .from(params.dbTable)
          .select('id', { count: 'exact', head: true })
          .in('difficulty', variants)
        if (params.subjectField) query = query.eq('subject', params.subjectField)
        query = applyBankExamScope(query, {
          dbTable: params.dbTable,
          examSlug: params.examSlug,
          subjectField: params.subjectField,
          topicFields: params.topicFields,
          questionNeedles: params.questionNeedles,
          scopeMode: 'family',
        })
        const { count, error } = await query
        if (error) {
          noteSupabaseFailure(error)
          throw new Error(error.message)
        }
        return count ?? 0
      } catch (e) {
        noteSupabaseFailure(e)
        throw e
      }
    },
    key,
    { revalidate: REVALIDATE, tags: [`mcq-set-${params.dbTable}`] }
  )()
}

/** MDCAT/FSc topic aggregates via RPC — KB payload, no full-table download. */
export function cachedBankTopicStats(dbTable: string): Promise<{ topic: string; count: number }[]> {
  if (softMode()) return Promise.resolve([])
  return unstable_cache(
    async () => {
      try {
        const supabase = createPublicSupabaseClient()
        const { data, error } = await supabase.rpc('get_bank_topic_counts', { p_table: dbTable })
        if (error) {
          noteSupabaseFailure(error)
          throw new Error(error.message)
        }
        return ((data as { topic: string; question_count: number }[]) || [])
          .map((row) => ({
            topic: String(row.topic),
            count: Number(row.question_count) || 0,
          }))
          .filter((row) => row.topic && row.count > 0)
      } catch (e) {
        noteSupabaseFailure(e)
        throw e
      }
    },
    ['bank-topic-stats-v1', dbTable],
    { revalidate: REVALIDATE, tags: [`mcq-set-${dbTable}`] }
  )()
}

export type SectionStatsPayload = {
  pastCount: number
  importantCount: number
  repeatedCount: number
  easyCount: number
  mediumCount: number
  hardCount: number
  topics: Record<string, number>
}

const EMPTY_SECTION_STATS: SectionStatsPayload = {
  pastCount: 0,
  importantCount: 0,
  repeatedCount: 0,
  easyCount: 0,
  mediumCount: 0,
  hardCount: 0,
  topics: {},
}

/** One cached payload for subject-mode hubs (replaces N client head counts). */
export function cachedSectionStats(params: {
  dbTable: string
  noTypeFilter?: boolean
  subjectField?: string
  subjectFields?: string[]
  subtopicField?: string
  topicFields?: string[]
  titleCaseDifficulty?: boolean
  tags?: string[]
  useTagsArray?: boolean
  examSlug?: string
  questionNeedles?: string[]
}): Promise<SectionStatsPayload> {
  if (softMode()) return Promise.resolve(EMPTY_SECTION_STATS)
  const tags = params.tags ?? []
  const key = [
    'section-stats-v7',
    params.dbTable,
    String(!!params.noTypeFilter),
    params.subjectField ?? '',
    (params.subjectFields ?? []).join('|'),
    params.subtopicField ?? '',
    (params.topicFields ?? []).join('|'),
    String(!!params.titleCaseDifficulty),
    String(!!params.useTagsArray),
    tags.join(','),
    params.examSlug ?? '',
    (params.questionNeedles ?? []).join('|'),
  ]
  return unstable_cache(
    async () => {
      try {
        const easy = params.titleCaseDifficulty ? 'Easy' : 'easy'
        const medium = params.titleCaseDifficulty ? 'Medium' : 'medium'
        const hard = params.titleCaseDifficulty ? 'Hard' : 'hard'
        const sharedTotal = !!(
          params.noTypeFilter ||
          params.subjectField ||
          params.subjectFields?.length ||
          params.subtopicField ||
          params.topicFields?.length
        )

        const [allOrPast, importantCount, repeatedCount, easyCount, mediumCount, hardCount, ...topicCounts] =
          await Promise.all([
            cachedExamTableCount({
              dbTable: params.dbTable,
              type: sharedTotal ? null : 'practice',
              subjectField: params.subjectField,
              subjectFields: params.subjectFields,
              subtopicField: params.subtopicField,
              topicFields: params.topicFields,
              examSlug: params.examSlug,
              questionNeedles: params.questionNeedles,
            }),
            sharedTotal
              ? Promise.resolve(0)
              : cachedExamTableCount({
                  dbTable: params.dbTable,
                  type: 'most_important',
                  examSlug: params.examSlug,
                  questionNeedles: params.questionNeedles,
                }),
            sharedTotal
              ? Promise.resolve(0)
              : cachedExamTableCount({
                  dbTable: params.dbTable,
                  type: 'most_repeated',
                  examSlug: params.examSlug,
                  questionNeedles: params.questionNeedles,
                }),
            cachedDifficultyCount({
              dbTable: params.dbTable,
              difficulty: easy,
              subjectField: params.subjectField,
              topicFields: params.topicFields,
              questionNeedles: params.questionNeedles,
              examSlug: params.examSlug,
            }),
            cachedDifficultyCount({
              dbTable: params.dbTable,
              difficulty: medium,
              subjectField: params.subjectField,
              topicFields: params.topicFields,
              questionNeedles: params.questionNeedles,
              examSlug: params.examSlug,
            }),
            cachedDifficultyCount({
              dbTable: params.dbTable,
              difficulty: hard,
              subjectField: params.subjectField,
              topicFields: params.topicFields,
              questionNeedles: params.questionNeedles,
              examSlug: params.examSlug,
            }),
            ...tags.map((tag) =>
              cachedTopicTagCount({
                dbTable: params.dbTable,
                tag,
                useTagsArray: !!params.useTagsArray,
                examSlug: params.examSlug,
              })
            ),
          ])

        const topics: Record<string, number> = {}
        tags.forEach((tag, i) => {
          topics[tag] = topicCounts[i] || 0
        })

        return {
          pastCount: allOrPast,
          importantCount: sharedTotal ? allOrPast : importantCount,
          repeatedCount: sharedTotal ? allOrPast : repeatedCount,
          easyCount,
          mediumCount,
          hardCount,
          topics,
        }
      } catch (e) {
        noteSupabaseFailure(e)
        throw e
      }
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
