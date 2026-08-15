import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (governance teaching):
 * - Wafaqi Mohtasib (Federal Ombudsman): maladministration complaints against federal agencies
 * - Provincial Mohtasibs and specialised ombudsmen (e.g. tax, banking themes in notes) expand the redress map
 * - Ombudsman model: inexpensive, accessible administrative justice; recommendations and persuasion plus statutory powers vary by law
 * - Distinct from courts (judicial remedies) and from anti-corruption criminal investigation bodies
 * Avoid inventing fake criminal conviction powers for every Mohtasib office or permanent case-count statistics
 */
export const OMBUDSMAN_MOHTASIB_PAKISTAN_KIT: NoteKitData = {
  id: 'ombudsman-mohtasib-pakistan',
  title: 'Ombudsman (Mohtasib) System in Pakistan',
  subtitle:
    'Wafaqi Mohtasib, provincial and specialised ombudsmen, and administrative justice for CSS governance answers.',
  syllabusTags: [
    'Good governance',
    'Ombudsman',
    'Mohtasib',
    'Administrative justice',
    'Pakistan Affairs',
    'Ethics and civics',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS / PMS',
      directive: 'Discuss',
      angle: 'Role of the Ombudsman (Mohtasib) in good governance',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Evaluate',
      angle: 'Administrative justice through the Mohtasib system',
      frequency: 'medium',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'Wafaqi Mohtasib; maladministration complaints',
      frequency: 'medium',
    },
    {
      year: 'Ethics / governance',
      directive: 'Critically examine',
      angle: 'Limits of ombudsman redress versus courts and anti-corruption bodies',
      frequency: 'medium',
    },
  ],
  onePager: [
    'The Mohtasib (Ombudsman) system gives citizens a relatively accessible channel to complain about maladministration by public agencies: delay, injustice, negligence, and related administrative wrongs in teaching definitions.',
    'Wafaqi Mohtasib (Federal Ombudsman) is the federal flagship office for complaints against federal government agencies (within statutory scope).',
    'Provincial Mohtasibs cover provincial administration. Specialised ombudsmen (tax, banking, and other sector themes in notes) show the system has diversified beyond one office.',
    'Method: complaint intake, inquiry, recommendations or directions under the relevant law, and follow-up. The model emphasises speed and low cost compared with full litigation.',
    'Governance value: improves service delivery, signals accountability, and reduces petty injustice without always needing criminal process.',
    'Limits: not a substitute for courts on all legal disputes; not identical to NAB/FIA criminal investigation; effectiveness depends on agency compliance and institutional independence.',
    'Exam contrast: judiciary = adjudication; Mohtasib = administrative redress; anti-corruption bodies = criminal/investigative tracks (where statutes apply).',
    'Answer close: Mohtasib strengthens citizen redress; reform focus is compliance, awareness, and clear jurisdiction boundaries.',
  ],
  answerSteps: [
    'Define Mohtasib as administrative redress against maladministration.',
    'Name Wafaqi Mohtasib and provincial or specialised offices.',
    'Explain complaint-inquiry-recommendation method and accessibility.',
    'State governance benefits for service delivery.',
    'Add limits versus courts and anti-corruption bodies.',
    'Close with compliance and jurisdiction clarity as success conditions.',
  ],
  questionVariants: [
    'Discuss the role of the Ombudsman (Mohtasib) in Pakistan.',
    'Evaluate the Mohtasib system as a tool of good governance.',
    'Distinguish Mohtasib redress from courts and anti-corruption agencies.',
    'What is maladministration in the ombudsman context? Explain briefly.',
  ],
  citations: [
    {
      label: 'Core idea',
      text: 'Mohtasib offices provide accessible redress against maladministration by public agencies within statutory scope.',
    },
    {
      label: 'Federal office',
      text: 'Wafaqi Mohtasib is the federal Ombudsman flagship for federal-agency complaints in standard teaching.',
    },
    {
      label: 'Map',
      text: 'Provincial Mohtasibs and specialised ombudsmen expand the redress architecture beyond one federal office.',
    },
    {
      label: 'Method',
      text: 'Complaint, inquiry, and recommendation or statutory direction with emphasis on speed and low cost versus litigation.',
    },
    {
      label: 'Limit',
      text: 'Ombudsman redress is not a full substitute for courts or for criminal anti-corruption investigation mandates.',
    },
  ],
  flashcards: [
    {
      prompt: 'What is the Urdu/official title often used for Ombudsman in Pakistan?',
      answer: 'Mohtasib',
    },
    {
      prompt: 'What is Wafaqi Mohtasib?',
      answer: 'Federal Ombudsman dealing with federal-agency maladministration complaints (within law)',
    },
    {
      prompt: 'What wrongs does the ombudsman model target in teaching?',
      answer: 'Maladministration: delay, injustice, negligence, and related administrative wrongs',
    },
    {
      prompt: 'Why is Mohtasib called accessible justice?',
      answer: 'Relatively low-cost and faster than full court litigation for many service complaints',
    },
    {
      prompt: 'Do provincial Mohtasibs exist in the exam map?',
      answer: 'Yes; provincial offices cover provincial administration themes',
    },
    {
      prompt: 'Name one specialised ombudsman theme often cited.',
      answer: 'Tax or banking ombudsman themes (sector-specific redress)',
    },
    {
      prompt: 'How does Mohtasib differ from NAB/FIA in exam framing?',
      answer: 'Mohtasib is administrative redress; NAB/FIA are investigative/criminal tracks under their laws',
    },
    {
      prompt: 'What limits effectiveness?',
      answer: 'Agency non-compliance and weak awareness or unclear jurisdiction',
    },
    {
      prompt: 'What closing reform line scores?',
      answer: 'Strengthen compliance, public awareness, and clear jurisdiction boundaries',
    },
    {
      prompt: 'Is Mohtasib a criminal court?',
      answer: 'No; it is an administrative justice and redress institution',
    },
  ],
  mistakes: [
    {
      trap: 'Saying Mohtasib convicts people like a criminal court.',
      correct: 'It addresses maladministration through inquiry and statutory redress tools, not ordinary criminal trials.',
    },
    {
      trap: 'Merging Mohtasib with NAB as one body.',
      correct: 'Different mandates: administrative redress vs anti-corruption investigation frameworks.',
    },
    {
      trap: 'Writing only the federal office and ignoring provinces or specialised offices.',
      correct: 'Mention the wider map for completeness.',
    },
    {
      trap: 'Claiming Mohtasib replaces the judiciary.',
      correct: 'It complements courts for many service complaints; it does not replace adjudication.',
    },
    {
      trap: 'Inventing permanent case-disposal statistics as syllabus facts.',
      correct: 'Use institutional purpose and method, not fake numbers.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Define maladministration and Mohtasib purpose.' },
    { day: 'Day 2', task: 'Federal, provincial, specialised map.' },
    { day: 'Day 3', task: 'Method: complaint to recommendation.' },
    { day: 'Day 4', task: 'Contrast courts and anti-corruption bodies.' },
    { day: 'Day 5', task: 'Flashcards.' },
    { day: 'Day 6', task: '10-minute evaluate outline.' },
    { day: 'Day 7', task: 'Recite one-pager.' },
  ],
  sourcesLine:
    'Sources: standard good-governance and Pakistan Affairs notes on Wafaqi Mohtasib and provincial or specialised ombudsmen. Avoid invented conviction powers and fake case totals.',
}
