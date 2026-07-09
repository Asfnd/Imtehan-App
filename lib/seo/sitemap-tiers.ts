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

export function isSetIndexable(
  examSlug: string,
  category: string | undefined,
  mode: string,
  setNumber: number,
): boolean {
  if (setNumber < 1 || !Number.isInteger(setNumber)) return false
  if (!isModeIndexable(examSlug, category, mode)) return false
  if (setNumber === 1) return true
  // Featured exams: index sets 1–3 (FIA/CSS/PPSC winners in GSC)
  if (setNumber <= 3 && featuredSet.has(examSlug)) return true
  return false
}

export function maxIndexableSetNumber(examSlug: string): number {
  return featuredSet.has(examSlug) ? 3 : 1
}

export function examIndexingMeta(
  examSlug: string,
  category: string | undefined,
  selfCanonical: string,
  options?: { mode?: string; setNumber?: number },
) {
  const mode = options?.mode
  const setNumber = options?.setNumber
  let index = !mode || isModeIndexable(examSlug, category, mode)
  if (index && setNumber != null) {
    index = isSetIndexable(examSlug, category, mode ?? '', setNumber)
  }

  return {
    robots: { index, follow: true } as const,
    canonical: selfCanonical,
  }
}
