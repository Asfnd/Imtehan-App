import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (carefully balanced institutional map):
 * - Federal investigative themes: NAB (National Accountability Bureau) and FIA (Federal Investigation Agency) appear in standard governance teaching
 * - Provincial anti-corruption establishments (ACE) cover provincial public-sector corruption themes in notes
 * - Broader framework: prevention, detection, investigation, prosecution, and asset-recovery language; also transparency tools (procurement, audit, RTI themes)
 * - Exam discipline: describe mandates as themes; avoid partisan case commentary and invented conviction rates
 * Do not glorify or demonise any single agency; stress rule of law, due process, and institutional clarity
 */
export const ANTI_CORRUPTION_FRAMEWORK_PAKISTAN_KIT: NoteKitData = {
  id: 'anti-corruption-framework-pakistan',
  title: 'Anti-Corruption Framework in Pakistan',
  subtitle:
    'NAB, FIA, and provincial ACE in a balanced map, plus prevention and transparency tools for CSS ethics and PA.',
  syllabusTags: [
    'Anti-corruption',
    'NAB',
    'FIA',
    'Good governance',
    'Rule of law',
    'Ethics and civics',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS / PMS',
      directive: 'Discuss',
      angle: 'Anti-corruption framework in Pakistan',
      frequency: 'high',
    },
    {
      year: 'Ethics / governance',
      directive: 'Critically examine',
      angle: 'Effectiveness and due-process concerns in anti-corruption institutions',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Evaluate',
      angle: 'Prevention versus punishment in controlling corruption',
      frequency: 'high',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'NAB; FIA; provincial ACE themes',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Corruption harms service delivery, investment confidence, and equal citizenship. Exam answers need an institutional map plus prevention, not slogans alone.',
    'NAB (National Accountability Bureau): federal accountability institution prominent in teaching on corruption investigation and accountability cases under its legal framework. Write mandate themes; avoid partisan case narratives.',
    'FIA (Federal Investigation Agency): federal investigative agency with a wider crime mandate in teaching (including specialised white-collar and cyber-related themes among others). Do not collapse FIA into NAB.',
    'Provincial ACE (Anti-Corruption Establishments): provincial machinery for public-sector corruption themes within provincial jurisdiction. Completes the federal-provincial map.',
    'Framework pillars: prevention (rules, e-procurement, asset disclosure themes), detection, investigation, prosecution, and recovery or restitution language where laws provide.',
    'Transparency complements: audit institutions, procurement discipline, Right to Information culture, and ethical public-service values reduce opportunity for graft.',
    'Critical balance: anti-corruption bodies need independence, capacity, and due process. Overreach fears and selective enforcement claims appear in critically examine answers; respond with rule-of-law standards, not party talk.',
    'Answer close: durable control of corruption needs prevention + fair enforcement + transparent governance, across federal and provincial institutions.',
  ],
  answerSteps: [
    'Define the problem cost of corruption briefly.',
    'Map NAB, FIA, and provincial ACE without merging them.',
    'Add prevention and transparency pillars.',
    'State due process and independence as effectiveness conditions.',
    'Avoid partisan cases; keep institutional analysis.',
    'Close with prevention plus fair enforcement.',
  ],
  questionVariants: [
    'Discuss the anti-corruption framework in Pakistan.',
    'Critically examine the role of NAB and related institutions.',
    'Evaluate prevention versus punishment strategies against corruption.',
    'How do federal and provincial anti-corruption bodies differ in exam mapping?',
  ],
  citations: [
    {
      label: 'NAB',
      text: 'National Accountability Bureau is the prominent federal accountability institution in standard anti-corruption teaching.',
    },
    {
      label: 'FIA',
      text: 'Federal Investigation Agency is a federal investigative body with a broader crime mandate than NAB-only framing.',
    },
    {
      label: 'Provincial ACE',
      text: 'Provincial Anti-Corruption Establishments address provincial public-sector corruption themes within provincial jurisdiction.',
    },
    {
      label: 'Prevention',
      text: 'A complete framework includes prevention and transparency tools, not investigation alone.',
    },
    {
      label: 'Due process',
      text: 'Critically examine answers should stress independence, capacity, and due process alongside enforcement.',
    },
  ],
  flashcards: [
    {
      prompt: 'What does NAB stand for?',
      answer: 'National Accountability Bureau',
    },
    {
      prompt: 'What does FIA stand for?',
      answer: 'Federal Investigation Agency',
    },
    {
      prompt: 'What does ACE commonly mean in provincial notes?',
      answer: 'Anti-Corruption Establishment',
    },
    {
      prompt: 'Why must NAB and FIA not be merged in answers?',
      answer: 'Different institutional mandates; FIA has a wider investigative crime map in teaching',
    },
    {
      prompt: 'Name three framework pillars beyond slogans.',
      answer: 'Prevention, investigation, and prosecution (plus recovery themes where law provides)',
    },
    {
      prompt: 'Name two transparency complements.',
      answer: 'Audit discipline and Right to Information culture (also e-procurement themes)',
    },
    {
      prompt: 'What due-process caution belongs in critically examine answers?',
      answer: 'Enforcement must stay fair, independent, and non-selective in principle',
    },
    {
      prompt: 'Should answers narrate partisan cases as syllabus facts?',
      answer: 'No; keep institutional and legal-framework analysis',
    },
    {
      prompt: 'What closing formula scores?',
      answer: 'Prevention + fair enforcement + transparency across federation and provinces',
    },
    {
      prompt: 'Why mention provincial ACE?',
      answer: 'Completes the federal-provincial institutional map',
    },
  ],
  mistakes: [
    {
      trap: 'Treating NAB as the only anti-corruption body in Pakistan.',
      correct: 'Include FIA themes and provincial ACE, plus prevention tools.',
    },
    {
      trap: 'Collapsing FIA into NAB.',
      correct: 'FIA is a distinct federal investigative agency with a broader crime mandate in teaching.',
    },
    {
      trap: 'Writing only punishment and ignoring prevention.',
      correct: 'Strong answers balance prevention, transparency, and enforcement.',
    },
    {
      trap: 'Using partisan case commentary as the whole answer.',
      correct: 'Stay institutional: mandates, due process, capacity, and reform.',
    },
    {
      trap: 'Inventing conviction-rate statistics as permanent facts.',
      correct: 'Avoid fake precision; argue framework design and principles.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Map NAB, FIA, provincial ACE in one table of themes.' },
    { day: 'Day 2', task: 'Prevention and transparency pillars.' },
    { day: 'Day 3', task: 'Due process and independence paragraph.' },
    { day: 'Day 4', task: 'Flashcards.' },
    { day: 'Day 5', task: 'Critically examine outline (no partisan cases).' },
    { day: 'Day 6', task: '10-minute evaluate answer.' },
    { day: 'Day 7', task: 'Recite one-pager.' },
  ],
  sourcesLine:
    'Sources: standard ethics, civics, and Pakistan Affairs teaching on NAB, FIA, and provincial ACE; good-governance primers on prevention and transparency. Avoid partisan case narratives and invented rates.',
}
