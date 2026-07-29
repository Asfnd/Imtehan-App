import type { SupabaseClient } from '@supabase/supabase-js'
import {
  examScopeSlugs,
  isPipelineMcqTable,
  type BankScopeMode,
} from '@/lib/mcq-bank-scope'

export type McqSetRpcParams = {
  dbTable: string
  setNumber: number
  setSize?: number
  type?: string | null
  skipTypeFilter?: boolean
  subjectField?: string
  subjectFields?: string[]
  subtopicField?: string
  topicFields?: string[]
  targetExam?: string
  examSlug?: string
  scopeMode?: BankScopeMode
  difficulties?: string[]
  topic?: string
  tag?: string
  useTagsArray?: boolean
  questionNeedles?: string[]
}

function examRpcScope(
  dbTable: string,
  examSlug: string | undefined,
  scopeMode: BankScopeMode | undefined
): Pick<McqSetRpcParams, 'examSlug' | 'scopeMode'> & {
  examSlugs?: string[]
} {
  if (!examSlug || !isPipelineMcqTable(dbTable)) {
    return {}
  }
  if (scopeMode === 'exact') {
    return { examSlug, scopeMode: 'exact' }
  }
  return { examSlugs: examScopeSlugs(examSlug), scopeMode: 'family' }
}

export function buildMcqSetRpcParams(opts: McqSetRpcParams) {
  const scope = examRpcScope(opts.dbTable, opts.examSlug, opts.scopeMode)
  return {
    p_table: opts.dbTable,
    p_set_number: opts.setNumber,
    p_set_size: opts.setSize ?? 20,
    p_type: opts.type ?? null,
    p_skip_type_filter: !!opts.skipTypeFilter,
    p_subject: opts.subjectField ?? null,
    p_subtopic: opts.subtopicField ?? null,
    p_target_exam: opts.targetExam ?? null,
    p_exam_slug: scope.examSlug ?? null,
    p_exam_slugs: scope.examSlugs ?? null,
    p_scope_mode: scope.scopeMode ?? null,
    p_difficulties: opts.difficulties?.length ? opts.difficulties : null,
    p_topic: opts.topic ?? null,
    p_topics: opts.topicFields?.length ? opts.topicFields : null,
    p_tag: opts.tag ?? null,
    p_use_tags_array: !!opts.useTagsArray,
    p_question_needles: opts.questionNeedles?.length ? opts.questionNeedles : null,
  }
}

export async function fetchDedupedMcqSetRpc(
  supabase: SupabaseClient,
  opts: McqSetRpcParams
): Promise<Record<string, unknown>[] | null> {
  // Multi-subject slices need client-side `.in('subject', …)` — RPC is single-subject today.
  if (opts.subjectFields && opts.subjectFields.length > 1) return null
  const { data, error } = await supabase.rpc('get_deduped_mcq_set', buildMcqSetRpcParams(opts))
  if (error) return null
  return (data as Record<string, unknown>[]) ?? []
}
