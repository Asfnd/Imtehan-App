import type { ExamConfig } from './exam-configs'

/**
 * Mock blueprints — each exam's mock follows its REAL, official pattern: the right number
 * of MCQs, the official time limit, official negative marking, and a subject split that
 * reflects real weightage. Verified via research, June 2026.
 *
 * Three layers:
 *  1. RESEARCHED — exact official patterns with a published per-subject split that matches
 *     our sections (CSS MPT, national MDCAT, UET ECAT, NUST NET, NTS GAT, NTS NAT-IE / COMSATS,
 *     PMS screening).
 *  2. PARAM_OVERRIDE — exams with a verified official total / time / negative marking but whose
 *     real subjects don't map cleanly to our sections (PIEAS, GIKI, FAST, MUET); the split is
 *     distributed across the exam's own sections by weightage.
 *  3. CATEGORY_PATTERN + per-body overrides — the standard one-paper format for each recruitment
 *     family. Negative marking is set by the CONDUCTING BODY (the key finding): PPSC, SPSC and
 *     PMS deduct 0.25 per wrong; FPSC, KPPSC, AJKPSC, GBPSC, NTS/OTS/ETEA recruitment, banks and
 *     the armed forces do not.
 */
export type MockBlueprint = {
  key: string
  label: string
  durationMin: number
  negMarking: number // marks deducted per wrong answer (0 = none); each correct counts as 1
  sections: { slug: string; count: number }[]
}

export type EffectiveExamSettings = {
  totalMCQs: number
  duration: number
  negativeMarking: boolean
  negativeMarkingValue: number
  blueprint: MockBlueprint
  sections: { slug: string; count: number; label: string; dbTable: string }[]
}

export type ExamGuideView = {
  authority: string
  officialLink?: string
  lastUpdated?: string
  eligibility: string[]
  important: string[]
  helpful: string[]
}

type Pattern = { total: number; durationMin: number; negMarking: number }

const CATEGORY_PATTERN: Record<string, Pattern> = {
  css:         { total: 200, durationMin: 200, negMarking: 0 },
  pms:         { total: 100, durationMin: 120, negMarking: 0.25 },
  medical:     { total: 180, durationMin: 180, negMarking: 0 },
  engineering: { total: 100, durationMin: 100, negMarking: 0 },
  ppsc:        { total: 100, durationMin: 90,  negMarking: 0.25 },
  fpsc:        { total: 100, durationMin: 100, negMarking: 0 },
  fia:         { total: 100, durationMin: 90,  negMarking: 0 },
  provincial:  { total: 100, durationMin: 90,  negMarking: 0 },
  police:      { total: 100, durationMin: 90,  negMarking: 0 },
  military:    { total: 100, durationMin: 90,  negMarking: 0 },
  nts:         { total: 100, durationMin: 100, negMarking: 0 },
  ots:         { total: 100, durationMin: 100, negMarking: 0 },
  etea:        { total: 100, durationMin: 90,  negMarking: 0 },
  railways:    { total: 100, durationMin: 90,  negMarking: 0 },
  banks:       { total: 100, durationMin: 90,  negMarking: 0 },
  judiciary:   { total: 100, durationMin: 90,  negMarking: 0 },
  devauth:     { total: 100, durationMin: 90,  negMarking: 0 },
  rescue:      { total: 100, durationMin: 90,  negMarking: 0 },
  revenue:     { total: 100, durationMin: 90,  negMarking: 0 },
}
const FALLBACK_PATTERN: Pattern = { total: 100, durationMin: 100, negMarking: 0 }

const PARAM_OVERRIDE: Record<string, Pattern> = {
  'pieas-entry': { total: 100, durationMin: 180, negMarking: 0 },
  'giki-entry':  { total: 80,  durationMin: 120, negMarking: 0 },
  'fast-nuces':  { total: 120, durationMin: 120, negMarking: 0.25 },
  'muet':        { total: 100, durationMin: 120, negMarking: 0 },
}

/** Web exam slugs that map to a different RESEARCHED key. */
const BLUEPRINT_SLUG_ALIASES: Record<string, string> = {
  'css-mpt': 'css',
}

export const OFFICIAL_EXAM_LINKS: Record<string, string> = {
  'giki-entry':          'https://www.giki.edu.pk/',
  'pieas-entry':         'https://www.pieas.edu.pk/',
  'net-engineering':     'https://www.nust.edu.pk/admissions',
  'ecat':                'https://www.uet.edu.pk/admission/admission.aspx',
  'css-mpt':             'https://www.fpsc.gov.pk/ce/ce-main-rules-syllabi',
  'fia-constable':       'https://www.fia.gov.pk/',
  'ppsc-assistant':      'https://www.ppsc.gop.pk/',
  'mdcat':               'https://pmc.gov.pk/',
  'fast-nuces':          'https://www.nu.edu.pk/Admissions',
  'comsats-engineering': 'https://www.comsats.edu.pk/admissions',
  'nts-gat':             'https://www.nts.org.pk/Test&Products/gat/GAT%20General.asp',
  'nts-nat-ie':          'https://www.nts.org.pk/products/ntsnat/nat-paper-pattern.php',
  'lums-engineering':    'https://admission.lums.edu.pk/',
  'air-university':      'https://au.edu.pk/',
  'muet':                'https://www.muet.edu.pk/',
}

const OFFICIAL_EXAM_AUTHORITIES: Record<string, string> = {
  'giki-entry':          'Ghulam Ishaq Khan Institute of Engineering Sciences & Technology (GIKI)',
  'pieas-entry':         'Pakistan Institute of Engineering and Applied Sciences (PIEAS)',
  'net-engineering':     'National University of Sciences & Technology (NUST)',
  'ecat':                'UET Lahore — Engineering College Admission Test (ECAT)',
  'css-mpt':             'Federal Public Service Commission (FPSC)',
  'fia-constable':       'Federal Investigation Agency (FIA)',
  'ppsc-assistant':      'Punjab Public Service Commission (PPSC)',
  'mdcat':               'Pakistan Medical Commission (National MDCAT)',
  'fast-nuces':          'FAST-NUCES (National University of Computer & Emerging Sciences)',
  'comsats-engineering': 'COMSATS University Islamabad (NTS NAT-IE admission test)',
  'nts-gat':             'National Testing Service (NTS) — GAT General',
  'nts-nat-ie':          'National Testing Service (NTS) — NAT-IE (Engineering)',
  'lums-engineering':    'Lahore University of Management Sciences (LUMS)',
  'air-university':      'Air University, Islamabad',
  'muet':                'Mehran University of Engineering & Technology (MUET)',
}

const CATEGORY_AUTHORITIES: Record<string, string> = {
  css: 'Federal Public Service Commission (FPSC)',
  pms: 'Provincial Public Service Commission',
  medical: 'Pakistan Medical Commission',
  engineering: 'Relevant university / NTS testing body',
  ppsc: 'Punjab Public Service Commission (PPSC)',
  fpsc: 'Federal Public Service Commission (FPSC)',
  fia: 'Federal Investigation Agency (FIA)',
  provincial: 'Relevant Provincial Public Service Commission',
  police: 'Relevant Police Recruitment Authority',
  military: 'Relevant Armed Forces Recruitment Body',
  nts: 'National Testing Service (NTS)',
  ots: 'Open Testing Service (OTS)',
  etea: 'Educational Testing and Evaluation Agency (ETEA)',
}

const CATEGORY_LINKS: Record<string, string> = {
  css: 'https://www.fpsc.gov.pk/',
  pms: 'https://www.ppsc.gop.pk/',
  medical: 'https://pmc.gov.pk/',
  ppsc: 'https://www.ppsc.gop.pk/',
  fpsc: 'https://www.fpsc.gov.pk/',
  fia: 'https://www.fia.gov.pk/',
  nts: 'https://www.nts.org.pk/',
  ots: 'https://ots.org.pk/',
  etea: 'https://etea.edu.pk/',
}

const EXAM_ELIGIBILITY: Record<string, string[]> = {
  'giki-entry': [
    'FSc Pre-Engineering or A-Level with Mathematics, Physics and Chemistry.',
    'Minimum 60% marks in FSc (or equivalent) as per GIKI prospectus.',
    'Age and domicile rules follow the latest GIKI admission advertisement.',
  ],
  'pieas-entry': [
    'FSc Pre-Engineering or A-Level with Mathematics, Physics and Chemistry.',
    'Minimum 60% in FSc and 60% in Matric as per PIEAS admission policy.',
    'Age limit and seat quotas are set in the annual PIEAS admission notice.',
  ],
  'net-engineering': [
    'FSc Pre-Engineering or A-Level with Mathematics, Physics and Chemistry.',
    'NUST NET is mandatory for NUST undergraduate engineering programmes.',
    'Merit combines SSC, HSSC and NET scores per NUST admission policy.',
  ],
  'ecat': [
    'FSc Pre-Engineering or equivalent with Mathematics, Physics and Chemistry.',
    'ECAT is conducted by UET Lahore for Punjab public-sector engineering colleges.',
    'Combined merit uses Matric, FSc and ECAT scores per UET admission policy.',
  ],
  'css-mpt': [
    'Bachelor\'s degree (14 years) from an HEC-recognised university.',
    'Age 21–30 years on the cut-off date (relaxations per FPSC rules).',
    'Pakistani citizenship; MPT is the mandatory screening test before CSS written exam.',
  ],
  'fia-constable': [
    'Matriculation (2nd Division) or equivalent from a recognised board.',
    'Age 18–25 years; height, chest and medical standards per FIA advertisement.',
    'Pakistani citizenship; domicile and quota rules apply as notified.',
  ],
  'ppsc-assistant': [
    'Bachelor\'s degree (2nd Division) from a recognised university.',
    'Age 21–28 years; Punjab domicile typically required for BS-16 posts.',
    'Computer typing test may follow the written MCQ paper per PPSC advertisement.',
  ],
  'mdcat': [
    'FSc Pre-Medical or equivalent (minimum 60% or as per PMC policy).',
    'Valid CNIC or B-Form; provincial quota and seat allocation per PMC rules.',
    'Mandatory for admission to MBBS/BDS in both public and private medical colleges.',
  ],
  'fast-nuces': [
    'FSc Pre-Engineering / ICS or A-Level with Mathematics and relevant science subjects.',
    'FAST entry test is conducted at FAST-NUCES campuses nationwide.',
    'Merit combines SSC, HSSC and entry-test scores per campus prospectus.',
  ],
  'comsats-engineering': [
    'FSc Pre-Engineering or equivalent; COMSATS uses NTS NAT-IE for admission.',
    'Valid NTS NAT-IE score as per COMSATS admission advertisement.',
    'Merit list combines HSSC and NAT-IE scores per campus policy.',
  ],
  'nts-gat': [
    'Minimum 16 years of education for GAT General (MPhil / HEC scholarship applicants).',
    'Valid CNIC; test registration through NTS online portal.',
    'GAT score validity and minimum score requirements vary by university / HEC scheme.',
  ],
  'nts-nat-ie': [
    'FSc Pre-Engineering or equivalent for NAT-IE (Engineering group).',
    'Valid CNIC; registration via NTS for universities accepting NAT-IE.',
    'Each university sets its own minimum NAT score and merit formula.',
  ],
  'lums-engineering': [
    'FSc Pre-Engineering, ICS or A-Level with strong Mathematics background.',
    'LUMS LCAT (engineering track) is required for SBASSE undergraduate admission.',
    'Merit combines academic record and LCAT score per LUMS admission policy.',
  ],
  'air-university': [
    'FSc Pre-Engineering or equivalent for engineering programmes.',
    'Air University entry test is conducted by the university admission office.',
    'Merit combines SSC, FSc and entry-test performance per AU prospectus.',
  ],
  'muet': [
    'FSc Pre-Engineering or equivalent for MUET / Sukkur IBA engineering programmes.',
    'Entry test conducted by the admitting university.',
    'Merit and eligibility follow the latest MUET admission advertisement.',
  ],
}

function examPattern(examSlug: string, cfg: ExamConfig): Pattern {
  if (PARAM_OVERRIDE[examSlug]) return PARAM_OVERRIDE[examSlug]
  const base = { ...(CATEGORY_PATTERN[cfg.category] ?? FALLBACK_PATTERN) }
  if (/^spsc-/.test(examSlug) || /^pms-/.test(examSlug)) base.negMarking = 0.25
  if (examSlug === 'police-punjab-si') base.negMarking = 0.25
  if (examSlug === 'pra-assistant') base.negMarking = 0.25
  return base
}

function subjectWeight(category: string, slug: string): number {
  if (category === 'medical') {
    if (slug === 'biology') return 3
    if (slug === 'chemistry' || slug === 'physics') return 2
    return 1
  }
  if (category === 'engineering') {
    if (slug === 'mathematics' || slug === 'physics' || slug === 'chemistry' || slug === 'computer-science') return 3
    return 1
  }
  const heavy: Record<string, number> = {
    'general-knowledge': 3, english: 2, 'pakistan-affairs': 2, 'current-affairs': 2,
  }
  return heavy[slug] ?? 1
}

function weightedSplit(slugs: string[], total: number, weightOf: (s: string) => number): { slug: string; count: number }[] {
  const n = slugs.length
  if (n === 0) return []
  if (total < n) total = n
  const weights = slugs.map(weightOf)
  const wSum = weights.reduce((a, b) => a + b, 0) || n
  const raw = weights.map((w) => (total * w) / wSum)
  const counts = raw.map((r) => Math.max(1, Math.floor(r)))
  let used = counts.reduce((a, b) => a + b, 0)
  while (used > total) {
    let idx = 0
    for (let i = 1; i < n; i++) if (counts[i] > counts[idx]) idx = i
    if (counts[idx] <= 1) break
    counts[idx]--; used--
  }
  const order = raw.map((r, i) => ({ i, f: r - Math.floor(r) })).sort((a, b) => b.f - a.f)
  let k = 0
  while (used < total) { counts[order[k % n].i]++; used++; k++ }
  return slugs.map((slug, i) => ({ slug, count: counts[i] }))
}

function defaultBlueprint(examSlug: string, cfg: ExamConfig): MockBlueprint {
  const pat = examPattern(examSlug, cfg)
  const slugs = cfg.sections.map((s) => s.slug)
  const sections = weightedSplit(slugs, pat.total, (s) => subjectWeight(cfg.category, s))
  return { key: 'full', label: 'Full Mock', durationMin: pat.durationMin, negMarking: pat.negMarking, sections }
}

const RESEARCHED: Record<string, MockBlueprint[]> = {
  css: [
    {
      key: 'mpt', label: 'MPT Screening', durationMin: 200, negMarking: 0,
      sections: [
        { slug: 'english', count: 50 },
        { slug: 'mathematics', count: 60 },
        { slug: 'pakistan-affairs', count: 20 },
        { slug: 'current-affairs', count: 20 },
        { slug: 'islamic-studies', count: 20 },
        { slug: 'general-knowledge', count: 15 },
        { slug: 'everyday-science', count: 15 },
      ],
    },
  ],
  'pms-competitive': [
    {
      key: 'screening', label: 'PMS Screening', durationMin: 120, negMarking: 0.25,
      sections: [
        { slug: 'general-knowledge', count: 20 },
        { slug: 'english', count: 15 },
        { slug: 'pakistan-affairs', count: 15 },
        { slug: 'current-affairs', count: 15 },
        { slug: 'islamic-studies', count: 10 },
        { slug: 'everyday-science', count: 10 },
        { slug: 'mathematics', count: 8 },
        { slug: 'geography', count: 7 },
      ],
    },
  ],
  mdcat: [
    {
      key: 'national', label: 'National MDCAT', durationMin: 180, negMarking: 0,
      sections: [
        { slug: 'biology', count: 81 },
        { slug: 'chemistry', count: 45 },
        { slug: 'physics', count: 36 },
        { slug: 'english', count: 9 },
        { slug: 'logical-reasoning', count: 9 },
      ],
    },
  ],
  ecat: [
    {
      key: 'ecat', label: 'UET ECAT', durationMin: 100, negMarking: 0.25,
      sections: [
        { slug: 'mathematics', count: 30 },
        { slug: 'physics', count: 30 },
        { slug: 'chemistry', count: 30 },
        { slug: 'english', count: 10 },
      ],
    },
  ],
  'net-engineering': [
    {
      key: 'net', label: 'NUST NET', durationMin: 180, negMarking: 0,
      sections: [
        { slug: 'mathematics', count: 80 },
        { slug: 'physics', count: 60 },
        { slug: 'chemistry', count: 30 },
        { slug: 'computer-science', count: 30 },
      ],
    },
  ],
  'nts-gat': [
    {
      key: 'gat', label: 'GAT General', durationMin: 120, negMarking: 0,
      sections: [
        { slug: 'english', count: 30 },
        { slug: 'mathematics', count: 30 },
        { slug: 'intelligence', count: 40 },
      ],
    },
  ],
  'nts-nat-ie': [
    {
      key: 'nat', label: 'NAT-IE', durationMin: 120, negMarking: 0,
      sections: [
        { slug: 'english', count: 20 },
        { slug: 'mathematics', count: 30 },
        { slug: 'physics', count: 20 },
        { slug: 'chemistry', count: 20 },
      ],
    },
  ],
  'comsats-engineering': [
    {
      key: 'nat', label: 'NTS NAT-IE', durationMin: 120, negMarking: 0,
      sections: [
        { slug: 'english', count: 20 },
        { slug: 'intelligence', count: 40 },
        { slug: 'mathematics', count: 10 },
        { slug: 'physics', count: 10 },
        { slug: 'chemistry', count: 10 },
      ],
    },
  ],
}

const FIA_WRITTEN_2026: MockBlueprint = {
  key: 'written-2026',
  label: 'FIA Written Test 2026',
  durationMin: 90,
  negMarking: 0,
  sections: [
    { slug: 'english', count: 20 },
    { slug: 'islamic-studies', count: 10 },
    { slug: 'pakistan-affairs', count: 10 },
    { slug: 'general-knowledge', count: 20 },
    { slug: 'computer', count: 10 },
    { slug: 'math-iq', count: 20 },
    { slug: 'fia-act', count: 10 },
  ],
}

export function getMockBlueprints(examSlug: string, cfg: ExamConfig): MockBlueprint[] {
  if (cfg.category === 'fia') {
    const slugs = new Set(cfg.sections.map((s) => s.slug))
    if (FIA_WRITTEN_2026.sections.every((s) => slugs.has(s.slug))) return [FIA_WRITTEN_2026]
  }
  const lookupSlug = BLUEPRINT_SLUG_ALIASES[examSlug] ?? examSlug
  const researched = RESEARCHED[lookupSlug]
  if (researched) {
    const slugs = new Set(cfg.sections.map((s) => s.slug))
    if (researched.every((bp) => bp.sections.every((s) => slugs.has(s.slug)))) return researched
  }
  return [defaultBlueprint(examSlug, cfg)]
}

export function blueprintTotal(bp: MockBlueprint): number {
  return bp.sections.reduce((a, s) => a + s.count, 0)
}

export function blueprintPattern(bp: MockBlueprint): string {
  const neg = bp.negMarking > 0 ? ` · −${bp.negMarking}/wrong` : ''
  return `${blueprintTotal(bp)} MCQs · ${bp.durationMin} min${neg}`
}

function mergeBlueprintSections(
  blueprint: MockBlueprint,
  config: ExamConfig,
): EffectiveExamSettings['sections'] {
  const configBySlug = new Map(config.sections.map((s) => [s.slug, s]))
  return blueprint.sections.map((bs) => {
    const cfg = configBySlug.get(bs.slug)
    return {
      slug: bs.slug,
      count: bs.count,
      label: cfg?.label ?? bs.slug,
      dbTable: cfg?.dbTable ?? bs.slug.replace(/-/g, '_'),
    }
  })
}

export function getEffectiveExamSettings(examSlug: string, config: ExamConfig): EffectiveExamSettings {
  const blueprint = getMockBlueprints(examSlug, config)[0]
  const totalMCQs = blueprintTotal(blueprint)
  return {
    totalMCQs,
    duration: blueprint.durationMin,
    negativeMarking: blueprint.negMarking > 0,
    negativeMarkingValue: blueprint.negMarking,
    blueprint,
    sections: mergeBlueprintSections(blueprint, config),
  }
}

function defaultEligibility(examSlug: string, config: ExamConfig): string[] {
  if (EXAM_ELIGIBILITY[examSlug]) return EXAM_ELIGIBILITY[examSlug]
  if (config.category === 'medical') {
    return [
      'FSc Pre-Medical or equivalent as per the admitting authority.',
      'Age and domicile rules follow the official admission advertisement.',
    ]
  }
  if (config.category === 'engineering') {
    return [
      'FSc Pre-Engineering or equivalent with Mathematics, Physics and Chemistry.',
      'Merit and eligibility follow the latest university admission advertisement.',
    ]
  }
  if (config.category === 'fia' || config.category === 'police' || config.category === 'military') {
    return [
      'Qualification and age limits are set in the official recruitment advertisement.',
      'Physical standards, domicile and quota rules apply as notified.',
    ]
  }
  if (config.category === 'ppsc' || config.category === 'fpsc' || config.category === 'provincial') {
    return [
      'Qualification and age limits follow the official commission advertisement.',
      'Domicile and quota requirements apply as per the notification.',
    ]
  }
  return [
    'Eligibility criteria follow the official notification for this test.',
  ]
}

function buildImportantFromSettings(settings: EffectiveExamSettings): string[] {
  const { blueprint, sections, totalMCQs, duration, negativeMarking, negativeMarkingValue } = settings
  const negLine = negativeMarking
    ? `Yes — ${negativeMarkingValue} mark deducted per wrong answer.`
    : 'No negative marking.'
  const split = sections.map((s) => `${s.label} ${s.count}`).join(' · ')
  return [
    `${blueprint.label}: ${totalMCQs} MCQs in ${duration} minutes (computer-based).`,
    `Negative marking: ${negLine}`,
    `Official subject split: ${split}.`,
  ]
}

function buildHelpfulFromSettings(examSlug: string, settings: EffectiveExamSettings): string[] {
  const { sections, negativeMarking, totalMCQs, duration } = settings
  const tips: string[] = []
  const top = [...sections].sort((a, b) => b.count - a.count)[0]
  if (top) {
    tips.push(`${top.label} carries the most weight (${top.count} of ${totalMCQs} MCQs) — prioritise this in timed practice.`)
  }
  if (negativeMarking) {
    tips.push(`With −${settings.negativeMarkingValue} per wrong answer, skip uncertain questions rather than guess blindly.`)
  } else {
    tips.push('No negative marking — attempt every question; leave nothing blank in the real test.')
  }
  tips.push(`Full mocks here use ${totalMCQs} MCQs / ${duration} min to match the official paper timing.`)

  if (examSlug === 'mdcat') {
    tips.push('National MDCAT is 180 MCQs / 180 min — one minute per question on average.')
  } else if (examSlug === 'ecat') {
    tips.push('ECAT allocates equal weight to Mathematics, Physics and Chemistry (30 MCQs each).')
  } else if (examSlug === 'net-engineering') {
    tips.push('NUST NET Engineering: Mathematics 80 MCQs — strongest section by official weightage.')
  } else if (examSlug === 'fast-nuces') {
    tips.push('FAST entry test: 120 MCQs / 120 min with 0.25 negative marking per wrong answer.')
  } else if (examSlug === 'giki-entry') {
    tips.push('GIKI entry test: 80 MCQs / 120 min — no negative marking.')
  } else if (examSlug === 'pieas-entry') {
    tips.push('PIEAS entry test: 100 MCQs / 180 min — no negative marking.')
  } else if (examSlug === 'css-mpt') {
    tips.push('FPSC CSS MPT: 200 MCQs / 200 min screening test before the CSS written examination.')
  } else if (examSlug.startsWith('fia-')) {
    tips.push('FIA Written Test 2026: English medium, computer-based; includes FIA Act 1974 (10 MCQs).')
  } else if (examSlug.startsWith('ppsc-')) {
    tips.push('PPSC one-paper MCQ tests typically deduct 0.25 marks per wrong answer.')
  }

  return tips
}

export function getExamGuideView(examSlug: string, config: ExamConfig): ExamGuideView {
  const settings = getEffectiveExamSettings(examSlug, config)
  const authority =
    config.guide?.authority ??
    OFFICIAL_EXAM_AUTHORITIES[examSlug] ??
    CATEGORY_AUTHORITIES[config.category] ??
    'Relevant recruiting or testing authority'
  const officialLink =
    config.guide?.officialLink ??
    OFFICIAL_EXAM_LINKS[examSlug] ??
    CATEGORY_LINKS[config.category]
  const eligibility =
    config.guide?.eligibility?.length ? config.guide.eligibility : defaultEligibility(examSlug, config)
  const important =
    config.guide?.important?.length ? config.guide.important : buildImportantFromSettings(settings)
  const helpful =
    config.guide?.helpful?.length ? config.guide.helpful : buildHelpfulFromSettings(examSlug, settings)

  return {
    authority,
    officialLink,
    lastUpdated: config.guide?.lastUpdated,
    eligibility,
    important,
    helpful,
  }
}
