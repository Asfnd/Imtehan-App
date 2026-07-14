/**
 * Exam-scoped MCQ filtering for shared pipeline banks.
 *
 * Pipeline tables store `target_exams text[]` with live exam slugs
 * (e.g. fia-assistant, css-mpt). MDCAT / css_mcqs_enhanced / engineering
 * / pms_* use different schemas — never apply target_exams there.
 *
 * Scope tiers:
 *   exact  — row must include this exam slug (contains)
 *   family — exact OR family hub / CSS aliases (overlaps)
 *
 * Never fall back to an unscoped pipeline bank — that is how
 * English/GK from another exam bleed into FIA (etc.).
 */

/** Tables that have `target_exams text[]` and shared type/tags schema. */
export const PIPELINE_MCQ_TABLES = new Set([
  'english',
  'general_knowledge',
  'pakistan_studies',
  'islamiat',
  'current_affairs',
  'everyday_science',
  'general_math',
  'geography',
  'basic_computer',
  'urdu',
  'ethics',
])

/** Engineering banks use scalar `target_exam` (NET/ECAT/…), not target_exams. */
export const ENGINEERING_MCQ_TABLES = new Set([
  'engineering_english',
  'engineering_math',
  'engineering_physics',
  'engineering_chemistry',
  'engineering_computer',
  'engineering_intelligence',
])

/**
 * Shared “hub” slugs for exam families whose thin posts inherit the same
 * written syllabus as the flagship post (keeps mocks filled without junk).
 */
const FAMILY_HUB: Record<string, string> = {
  fia: 'fia-assistant',
  ppsc: 'ppsc-assistant',
  fpsc: 'fpsc-general',
  kppsc: 'kppsc-general',
  spsc: 'spsc-general',
  bpsc: 'bpsc-general',
  ajkpsc: 'ajkpsc-general',
  gbpsc: 'gbpsc-general',
  nts: 'nts-general',
  ots: 'ots-general',
  etea: 'etea-general',
  police: 'police-asi',
  banking: 'banking-general',
  rescue: 'rescue-1122-computer-operator',
  military: 'military-rangers',
}

function familyPrefix(examSlug: string): string | null {
  const i = examSlug.indexOf('-')
  if (i <= 0) return null
  return examSlug.slice(0, i)
}

/**
 * Slugs to match against `target_exams` (OR / overlaps).
 * Always includes the exact exam; may include a family hub for thin posts.
 */
export function examScopeSlugs(examSlug: string): string[] {
  const slugs = new Set<string>([examSlug])
  const prefix = familyPrefix(examSlug)
  if (prefix && FAMILY_HUB[prefix]) {
    slugs.add(FAMILY_HUB[prefix])
  }
  // CSS MPT share with classic css-pms tagged content
  if (examSlug === 'css-mpt' || examSlug === 'css' || examSlug === 'css-pms') {
    slugs.add('css-mpt')
    slugs.add('css-pms')
  }
  return [...slugs]
}

export function isPipelineMcqTable(dbTable: string): boolean {
  return PIPELINE_MCQ_TABLES.has(dbTable)
}

export function isEngineeringMcqTable(dbTable: string): boolean {
  return ENGINEERING_MCQ_TABLES.has(dbTable)
}

export type BankScopeMode = 'exact' | 'family'

export type BankScopeOpts = {
  dbTable: string
  examSlug?: string
  /** Engineering past-paper scalar (NET / ECAT / …) */
  targetExam?: string
  subjectField?: string
  /**
   * When set, require question text to match (e.g. FIA Act section).
   * Applied as OR of ILIKE patterns — never pair with unscoped bank fallback.
   */
  questionNeedles?: string[]
  /**
   * exact = contains([examSlug]); family = overlaps(examScopeSlugs).
   * Default family for counts / steady-state fetch so thin posts stay full.
   */
  scopeMode?: BankScopeMode
}

/**
 * Apply relevance filters to a Supabase query builder.
 * Safe to call on any bank — no-ops when the column doesn't exist for that family.
 */
export function applyBankExamScope<T extends { eq: Function; overlaps: Function; contains: Function; or: Function }>(
  query: T,
  opts: BankScopeOpts
): T {
  let q = query

  if (opts.subjectField) {
    q = q.eq('subject', opts.subjectField) as T
  }

  if (opts.targetExam && isEngineeringMcqTable(opts.dbTable)) {
    q = q.eq('target_exam', opts.targetExam) as T
  } else if (opts.examSlug && isPipelineMcqTable(opts.dbTable)) {
    const mode = opts.scopeMode ?? 'family'
    if (mode === 'exact') {
      q = q.contains('target_exams', [opts.examSlug]) as T
    } else {
      q = q.overlaps('target_exams', examScopeSlugs(opts.examSlug)) as T
    }
  }

  if (opts.questionNeedles?.length) {
    const orExpr = opts.questionNeedles
      .map((n) => `question.ilike.%${n.replace(/%/g, '')}%`)
      .join(',')
    q = q.or(orExpr) as T
  }

  return q
}
