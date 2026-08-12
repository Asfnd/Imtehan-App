import { createPublicSupabaseClient } from '@/lib/supabase/public'
import { unstable_cache } from 'next/cache'
import { applyBankExamScope } from '@/lib/mcq-bank-scope'
import { mcqSelectCols } from '@/lib/quiz-fetcher'
import { loadStaticBankPrefix } from '@/lib/static-mcq-fetch'
import { poolExamSlug, type BankPoolKey } from '@/lib/banks-pool'
import { softMode, SoftSkipError, withSoftCache } from '@/lib/supabase-soft'

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

export type SampleMcqScope = {
  examSlug?: string
  subjectField?: string
  subtopicField?: string
  topicFields?: string[]
  questionNeedles?: string[]
}

async function fetchSampleMcqsUncached(
  dbTable: string,
  mode: string | undefined,
  limit: number,
  scope: SampleMcqScope = {},
): Promise<SampleMcq[]> {
  try {
    const skipType =
      !!scope.subjectField || !!scope.subtopicField || !!scope.topicFields?.length
    const dbType = mode ? MODE_DB_TYPE[mode] : 'most_repeated'
    const mixed = skipType || !dbType
    const poolKey: BankPoolKey = {
      kind: 'mode',
      dbTable,
      mode: mixed ? 'practice' : dbType,
      noTypeFilter: mixed,
      subjectField: scope.subjectField,
      topicFields: scope.topicFields,
      questionNeedles: scope.questionNeedles,
      subtopicField: scope.subtopicField,
      examSlug: poolExamSlug(dbTable, scope.examSlug),
    }
    const fromStatic = await loadStaticBankPrefix(poolKey, limit)
    if (fromStatic?.length) {
      return fromStatic.slice(0, limit).map((row) => ({
        question: row.question,
        option_a: row.option_a,
        option_b: row.option_b,
        option_c: row.option_c,
        option_d: row.option_d,
        correct_answer: row.correct_answer,
      }))
    }
    if (softMode()) throw new SoftSkipError()

    const supabase = createPublicSupabaseClient()
    let query = supabase.from(dbTable).select(mcqSelectCols(dbTable)).limit(limit)
    if (dbType && !skipType) query = query.eq('type', dbType)
    query = applyBankExamScope(query, {
      dbTable,
      examSlug: scope.examSlug,
      subjectField: scope.subjectField,
      subtopicField: scope.subtopicField,
      topicFields: scope.topicFields,
      questionNeedles: scope.questionNeedles,
      scopeMode: 'family',
    })

    const { data } = await query
    return ((data as unknown as Record<string, unknown>[]) ?? [])
      .map((row) => {
        const question = String(row.question ?? row.question_text ?? '').trim()
        if (!question) return null
        return {
          question,
          option_a: String(row.option_a ?? ''),
          option_b: String(row.option_b ?? ''),
          option_c: String(row.option_c ?? ''),
          option_d: String(row.option_d ?? ''),
          correct_answer: String(row.correct_answer ?? ''),
        } satisfies SampleMcq
      })
      .filter((m): m is SampleMcq => m !== null)
  } catch (e) {
    if (e instanceof SoftSkipError) throw e
    return []
  }
}

export async function fetchSampleMcqs(
  dbTable: string,
  mode?: string,
  limit = 5,
  examSlugOrScope?: string | SampleMcqScope,
  questionNeedles?: string[],
): Promise<SampleMcq[]> {
  const scope: SampleMcqScope =
    typeof examSlugOrScope === 'string' || examSlugOrScope == null
      ? { examSlug: examSlugOrScope, questionNeedles }
      : examSlugOrScope

  return withSoftCache([], () =>
    unstable_cache(
      () => fetchSampleMcqsUncached(dbTable, mode, limit, scope),
      [
        'sample-mcqs-v6-static',
        dbTable,
        mode ?? 'default',
        String(limit),
        scope.examSlug ?? '',
        scope.subjectField ?? '',
        scope.subtopicField ?? '',
        (scope.topicFields ?? []).join('|'),
        (scope.questionNeedles ?? []).join('|'),
      ],
      { revalidate: 604800, tags: [`sample-mcqs-${dbTable}`] },
    )(),
  )
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
