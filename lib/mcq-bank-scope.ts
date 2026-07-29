/**
 * Exam-scoped MCQ filtering for shared pipeline banks.
 *
 * Pipeline tables store `target_exams text[]` with live exam slugs
 * (e.g. fia-assistant, css-mpt). MDCAT / css_mcqs_enhanced / engineering
 * / pms_* use different schemas — never apply target_exams there.
 *
 * Scope tiers:
 *   exact  — row must include this exam slug (contains)
 *   family — exact OR family hub / explicit exam hubs / CSS aliases (overlaps)
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
  // Prefix hubs for educator / entry exams (slug ≠ commission-*)
  hec: 'nts-general',
  punjab: 'ppsc-assistant',
  kpk: 'etea-general',
  sindh: 'spsc-general',
  sts: 'spsc-general',
  ajk: 'ajkpsc-general',
  gb: 'gbpsc-general',
  balochistan: 'bpsc-general',
  tevta: 'ots-general',
  qau: 'nts-general',
  iba: 'nts-general',
  icap: 'banking-general',
  bsn: 'nts-general',
}

/**
 * Exact-exam hubs — best matching tagged banks for thin / untagged exams.
 * Shared multi-exam rows are OK; quality comes from large curated hubs
 * (CSS MPT, NTS, PPSC, ETEA, …), not random unscoped dumps.
 */
const EXAM_SCOPE_HUBS: Record<string, string[]> = {
  'punjab-educators': ['ppsc-assistant', 'ppsc-pst'],
  'kpk-educators-etea': ['etea-general', 'etea-pst'],
  'sindh-educators': ['spsc-general', 'nts-general'],
  'sts-sindh-jest': ['spsc-general', 'nts-general'],
  'ajk-educators': ['ajkpsc-general'],
  'gb-educators': ['gbpsc-general', 'nts-general'],
  'balochistan-educators': ['bpsc-general'],
  'qau-entry': ['nts-general'],
  'tevta-skills-test': ['ots-general', 'nts-general'],
  'icap-ca-foundation': ['banking-general', 'nts-general'],
  'iba-karachi': ['nts-general', 'banking-general'],
  'bsn-nursing-entry': ['nts-general'],
  // HEC — LAT / SEE / humanities HAT share CSS MPT compulsory quality
  'hec-lat': ['css-mpt', 'css-pms', 'nts-general'],
  'hec-see-law': ['css-mpt', 'css-pms', 'nts-general'],
  'hec-hat-2': ['nts-general', 'css-mpt'],
  'hec-hat-3': ['css-mpt', 'nts-general'],
  'hec-hat-4': ['nts-general', 'css-mpt'],
  'hec-hat-general': ['css-mpt', 'nts-general'],
  // USAT pipeline extras (GS/A/COM english/GK/eds); quant uses generated USAT bank
  'hec-usat-gs': ['nts-general', 'css-mpt'],
  'hec-usat-a': ['nts-general', 'css-mpt'],
  'hec-usat-com': ['nts-general', 'css-mpt'],
  'hec-usat-e': ['nts-general'],
  'hec-usat-m': ['nts-general'],
  'hec-usat-cs': ['nts-general'],
}

function familyPrefix(examSlug: string): string | null {
  const i = examSlug.indexOf('-')
  if (i <= 0) return null
  return examSlug.slice(0, i)
}

/**
 * Slugs to match against `target_exams` (OR / overlaps).
 * Always includes the exact exam; may include hubs for thin posts.
 */
export function examScopeSlugs(examSlug: string): string[] {
  const slugs = new Set<string>([examSlug])
  for (const h of EXAM_SCOPE_HUBS[examSlug] ?? []) slugs.add(h)
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
  /** MDCAT-style `subtopic` equality (e.g. USAT Quantitative) */
  subtopicField?: string
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

  if (opts.subtopicField) {
    q = q.eq('subtopic', opts.subtopicField) as T
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
    const qCol = opts.dbTable === 'css_mcqs_enhanced' ? 'question_text' : 'question'
    const orExpr = opts.questionNeedles
      .map((n) => `${qCol}.ilike.%${n.replace(/%/g, '')}%`)
      .join(',')
    q = q.or(orExpr) as T
  }

  return q
}
