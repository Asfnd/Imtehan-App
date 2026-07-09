/**
 * Topic-level indexing: exam topic hubs, MDCAT/FSC topics, and topic set pages.
 */

import { FEATURED_EXAM_SLUGS } from '@/lib/seo/related-exams'
import { TABLE_POPULAR_TAGS } from '@/lib/topic-tags'

const featuredSet = new Set<string>(FEATURED_EXAM_SLUGS)

const TOPIC_INDEXABLE_CATEGORIES = new Set([
  'fia', 'css', 'pms', 'ppsc', 'fpsc', 'police', 'medical', 'engineering', 'hec',
])

export const MDCAT_SUBJECT_TABLES: Record<string, string> = {
  biology: 'mdcat_biology',
  chemistry: 'mdcat_chemistry',
  physics: 'mdcat_physics',
  english: 'mdcat_english',
  'logical-reasoning': 'mdcat_logical_reasoning',
}

export const MDCAT_DIFFICULTIES = ['easy', 'medium', 'hard'] as const

/** Banks eligible for individual /mcq/[bank]/[id] indexing. */
export const MCQ_INDEXABLE_BANKS = new Set([
  'english',
  'general_knowledge',
  'pakistan_studies',
  'islamiat',
  'current_affairs',
  'everyday_science',
  'general_math',
  'urdu',
  'geography',
  'basic_computer',
  'mdcat_biology',
  'mdcat_chemistry',
  'mdcat_physics',
  'mdcat_english',
  'mdcat_logical_reasoning',
  'engineering_physics',
  'engineering_chemistry',
  'engineering_mathematics',
])

export function isExamTopicIndexable(
  examSlug: string,
  category: string | undefined,
  dbTable: string,
  tagSlug: string,
): boolean {
  const tags = TABLE_POPULAR_TAGS[dbTable]
  if (!tags?.includes(tagSlug)) return false
  if (featuredSet.has(examSlug)) return true
  if (category && TOPIC_INDEXABLE_CATEGORIES.has(category)) return true
  return false
}

export function isTopicSetIndexable(
  examSlug: string,
  category: string | undefined,
  tagSlug: string,
  dbTable: string,
  setNumber: number,
): boolean {
  if (!isExamTopicIndexable(examSlug, category, dbTable, tagSlug)) return false
  if (setNumber < 1 || !Number.isInteger(setNumber)) return false
  if (setNumber === 1) return true
  if (setNumber <= 3 && featuredSet.has(examSlug)) return true
  return false
}

export function maxIndexableTopicSetNumber(examSlug: string): number {
  return featuredSet.has(examSlug) ? 3 : 1
}

export function isMdcatTopicIndexable(): boolean {
  return true
}

export function isMdcatSetIndexable(setNumber: number): boolean {
  if (setNumber < 1) return false
  if (setNumber === 1) return true
  if (setNumber <= 3) return true
  return false
}

export function isMcqPageIndexable(bank: string, id: number): boolean {
  if (!Number.isFinite(id) || id < 1) return false
  return MCQ_INDEXABLE_BANKS.has(bank)
}

export function topicIndexingMeta(
  examSlug: string,
  category: string | undefined,
  dbTable: string,
  tagSlug: string,
  selfCanonical: string,
  options?: { setNumber?: number },
) {
  const setNumber = options?.setNumber
  let index = isExamTopicIndexable(examSlug, category, dbTable, tagSlug)
  if (index && setNumber != null) {
    index = isTopicSetIndexable(examSlug, category, tagSlug, dbTable, setNumber)
  }
  return {
    robots: { index, follow: true } as const,
    canonical: selfCanonical,
  }
}

export function mdcatTopicIndexingMeta(selfCanonical: string, setNumber?: number) {
  const index =
    setNumber == null ? isMdcatTopicIndexable() : isMdcatSetIndexable(setNumber)
  return {
    robots: { index, follow: true } as const,
    canonical: selfCanonical,
  }
}

export function mcqPageIndexingMeta(bank: string, id: number, selfCanonical: string) {
  const index = isMcqPageIndexable(bank, id)
  return {
    robots: { index, follow: true } as const,
    canonical: selfCanonical,
  }
}
