/**
 * Indexing tiers: exam hubs + subjects always indexable; mode pages only when
 * they match high-intent patterns (past-papers, FIA/CSS/PMS, featured exams).
 */

import { FEATURED_EXAM_SLUGS } from '@/lib/seo/related-exams'

const PRACTICE_MODES = ['most-repeated', 'most-important', 'past-papers', 'practice'] as const
export type PracticeMode = (typeof PRACTICE_MODES)[number]

export { PRACTICE_MODES }

/** Categories where all practice modes earn search traffic (GSC-proven). */
const FULL_MODE_CATEGORIES = new Set(['fia', 'css', 'pms', 'ppsc', 'fpsc', 'police'])

/** Modes indexed for most exams — past-papers + practice cover GSC winners. */
const DEFAULT_INDEXABLE_MODES: PracticeMode[] = ['past-papers', 'practice']

/** All modes for priority exams / gov-job categories. */
const FULL_INDEXABLE_MODES: PracticeMode[] = [...PRACTICE_MODES]

const featuredSet = new Set<string>(FEATURED_EXAM_SLUGS)

export function isSeoIndexableExam(examSlug?: string, category?: string): boolean {
  if (!examSlug) return false
  return true
}

export function isModeIndexable(
  examSlug: string,
  category: string | undefined,
  mode: string,
): boolean {
  if (!PRACTICE_MODES.includes(mode as PracticeMode)) return false
  if (featuredSet.has(examSlug)) return true
  if (category && FULL_MODE_CATEGORIES.has(category)) return true
  return DEFAULT_INDEXABLE_MODES.includes(mode as PracticeMode)
}

export function examIndexingMeta(
  examSlug: string,
  category: string | undefined,
  selfCanonical: string,
  options?: { mode?: string },
) {
  const mode = options?.mode
  const index =
    !mode || isModeIndexable(examSlug, category, mode)

  return {
    robots: { index, follow: true } as const,
    canonical: selfCanonical,
  }
}
