/** Precomputed exam counts per nav category — avoids importing full EXAM_CONFIGS in NavigationBar. */
export const EXAMS_BY_CATEGORY: Record<string, number> = {
  medical: 1,
  engineering: 15,
  hec: 15,
  css: 1,
  pms: 1,
  ppsc: 40,
  fpsc: 18,
  provincial: 35,
  etea: 7,
  nts: 19,
  ots: 13,
  fia: 13,
  military: 10,
  banks: 12,
  police: 15,
  judiciary: 7,
  railways: 6,
  devauth: 6,
  rescue: 3,
  revenue: 4,
}

export const NAV_CATEGORY_ORDER = [
  'engineering',
  'hec',
  'css',
  'pms',
  'ppsc',
  'fpsc',
  'fia',
  'provincial',
  'police',
  'military',
  'nts',
  'ots',
  'etea',
  'railways',
  'banks',
  'judiciary',
  'devauth',
  'rescue',
  'revenue',
] as const

export const AVAILABLE_NAV_CATEGORIES = NAV_CATEGORY_ORDER.filter(
  (cat) => (EXAMS_BY_CATEGORY[cat] ?? 0) > 0,
)
