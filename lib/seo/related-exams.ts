import { EXAM_CONFIGS } from '@/lib/exam-configs'

/** Same-category + shared MCQ bank affinity for internal link mesh. */
export function getRelatedExamSlugs(
  examSlug: string,
  category: string,
  limit = 6,
): { slug: string; name: string }[] {
  const current = EXAM_CONFIGS[examSlug]
  if (!current) return []

  const tables = new Set(current.sections.map((s) => s.dbTable).filter(Boolean))

  return Object.entries(EXAM_CONFIGS)
    .filter(([slug, config]) => {
      if (slug === examSlug) return false
      if (config.category === category) return true
      return config.sections.some((s) => s.dbTable && tables.has(s.dbTable))
    })
    .slice(0, limit)
    .map(([slug, config]) => ({ slug, name: config.name }))
}

export const FEATURED_EXAM_SLUGS = [
  'css-mpt',
  'pms-competitive',
  'ppsc-assistant',
  'ppsc-tehsildar',
  'ppsc-patwari',
  'fpsc-ldc',
  'fpsc-assistant',
  'fia-constable',
  'fia-assistant',
  'fia-staff-car-driver',
  'fia-steno-typist',
  'fia-udc',
  'kppsc-general',
  'net-engineering',
  'nts-general',
  'military-pak-army',
  'issb-academic',
  'police-punjab-constable',
  'mdcat',
  'pharm-d-entry',
  'dpt-entry',
  'bds-entry',
  'shifa-entry',
  'cmh-lahore-entry',
  'punjab-educators',
  'ajk-educators',
  'hec-lat',
  'ned-entry',
  'uet-taxila',
  'sts-sindh-jest',
] as const

export function getFeaturedExams(): { slug: string; name: string; category: string }[] {
  return FEATURED_EXAM_SLUGS.filter((slug) => EXAM_CONFIGS[slug]).map((slug) => ({
    slug,
    name: EXAM_CONFIGS[slug].name,
    category: EXAM_CONFIGS[slug].category,
  }))
}
