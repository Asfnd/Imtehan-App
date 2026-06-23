/**
 * Every exam on Imtehan has server-rendered SEO content (ExamSeoSection,
 * SubjectSeoSection, ModeSeoSection). All exam URLs are indexable.
 */

const PRACTICE_MODES = ['most-repeated', 'most-important', 'past-papers', 'practice'] as const
export type PracticeMode = (typeof PRACTICE_MODES)[number]

export { PRACTICE_MODES }

/** All exams with SSR SEO blocks are indexable. */
export function isSeoIndexableExam(_examSlug?: string, _category?: string): boolean {
  return true
}

export function examIndexingMeta(
  _examSlug: string,
  _category: string | undefined,
  selfCanonical: string,
) {
  return {
    robots: { index: true, follow: true } as const,
    canonical: selfCanonical,
  }
}
