import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (UNDP good governance teaching commonly used in exams):
 * - Participation, rule of law, transparency, responsiveness, consensus orientation,
 *   equity and inclusiveness, effectiveness and efficiency, accountability
 * - Pakistan institutional examples at syllabus level only
 * - NAB: National Accountability Bureau as a statutory accountability body; no partisan claims
 */
export const GOOD_GOVERNANCE_UNDP_KIT: NoteKitData = {
  id: 'good-governance-undp',
  title: 'Good Governance Principles',
  subtitle:
    'UNDP-style principles of good governance and how Pakistan exams link them to institutions.',
  syllabusTags: [
    'Good governance',
    'Public administration',
    'Accountability',
    'CSS Governance',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS pattern',
      directive: 'Discuss',
      angle: 'Characteristics of good governance',
      frequency: 'high',
    },
    {
      year: 'CSS / PMS',
      directive: 'Critically examine',
      angle: 'Accountability and transparency in Pakistan’s governance',
      frequency: 'high',
    },
    {
      year: 'One-paper / MPT',
      directive: 'MCQ fact',
      angle: 'UNDP principles list; names of accountability institutions',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Evaluate',
      angle: 'Rule of law and participation as governance pillars',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Good governance means public authority is used in ways that are lawful, fair, open, and effective for citizens.',
    'UNDP-style characteristics commonly listed in exams: participation; rule of law; transparency; responsiveness; consensus orientation; equity and inclusiveness; effectiveness and efficiency; accountability.',
    'Participation: people and groups can take part in decisions that affect them (elections, consultation, local government voice).',
    'Rule of law: laws apply equally; independent courts and due process matter more than personal power.',
    'Transparency: information on decisions, budgets, and procedures is accessible so abuse is harder to hide.',
    'Responsiveness: institutions serve citizens in a timely way. Consensus orientation: mediate interests toward broad agreement where possible.',
    'Equity and inclusiveness: all groups, including the weak, have a stake. Effectiveness and efficiency: results with good use of resources.',
    'Accountability: officials answer for decisions. In Pakistan syllabus answers, cite institutions carefully: Parliament, judiciary, Auditor General, Election Commission, and National Accountability Bureau (NAB) as an accountability body under law. Do not turn this into a party attack.',
  ],
  answerSteps: [
    'Define good governance in one clear sentence.',
    'List the UNDP-style principles and explain four to six with short examples.',
    'Link two principles to Pakistan institutions without partisan claims (for example Parliament and Auditor General for accountability; courts for rule of law).',
    'Add one realistic constraint: capacity, politicisation, or weak implementation.',
    'Close with a reform-oriented judgment: principles need working institutions, not slogans.',
  ],
  questionVariants: [
    'Discuss the main characteristics of good governance.',
    'Critically examine accountability and transparency as pillars of good governance in Pakistan.',
    'Evaluate the role of rule of law and participation in improving public administration.',
    'How do UNDP good governance principles help assess state performance? Discuss.',
  ],
  citations: [
    {
      label: 'Core list',
      text: 'UNDP-style good governance characteristics: participation, rule of law, transparency, responsiveness, consensus orientation, equity and inclusiveness, effectiveness and efficiency, accountability.',
    },
    {
      label: 'Accountability idea',
      text: 'Decision-makers are answerable for their actions to the public and to institutional oversight.',
    },
    {
      label: 'Pakistan institutions (exam level)',
      text: 'Parliament, judiciary, Auditor General of Pakistan, Election Commission of Pakistan, and NAB as a statutory accountability body. Describe functions, not party politics.',
    },
    {
      label: 'Transparency',
      text: 'Open access to decisions and information reduces corruption risk and builds trust.',
    },
  ],
  flashcards: [
    {
      prompt: 'Name eight UNDP-style good governance characteristics.',
      answer:
        'Participation, rule of law, transparency, responsiveness, consensus orientation, equity and inclusiveness, effectiveness and efficiency, accountability',
    },
    {
      prompt: 'What does participation mean in governance?',
      answer: 'People can take part in decisions that affect them',
    },
    {
      prompt: 'What does rule of law require?',
      answer: 'Equal application of law and fair legal processes',
    },
    {
      prompt: 'What is transparency?',
      answer: 'Open information on decisions, budgets, and procedures',
    },
    {
      prompt: 'What is responsiveness?',
      answer: 'Institutions serve citizens in a timely way',
    },
    {
      prompt: 'What is consensus orientation?',
      answer: 'Mediating interests toward broad agreement where possible',
    },
    {
      prompt: 'What do equity and inclusiveness stress?',
      answer: 'All groups, including the weak, have a stake',
    },
    {
      prompt: 'What is effectiveness and efficiency?',
      answer: 'Delivering results while using resources well',
    },
    {
      prompt: 'What is accountability?',
      answer: 'Officials answer for their decisions and conduct',
    },
    {
      prompt: 'What does NAB stand for?',
      answer: 'National Accountability Bureau',
    },
    {
      prompt: 'How should NAB be described in exam answers?',
      answer: 'As a statutory accountability body, without partisan claims',
    },
    {
      prompt: 'Name two other Pakistan oversight institutions often cited.',
      answer: 'Auditor General of Pakistan and Election Commission of Pakistan',
    },
    {
      prompt: 'Which branch checks government through debate and law?',
      answer: 'Parliament / legislature',
    },
    {
      prompt: 'Which institution anchors rule of law through adjudication?',
      answer: 'The judiciary',
    },
  ],
  mistakes: [
    {
      trap: 'Listing random buzzwords instead of the standard UNDP-style set.',
      correct: 'Memorise the eight characteristics used in syllabus teaching.',
    },
    {
      trap: 'Treating good governance as only anti-corruption raids.',
      correct: 'It includes participation, equity, effectiveness, and rule of law as well.',
    },
    {
      trap: 'Using NAB examples to attack or defend a political party.',
      correct: 'State the institutional role. Avoid partisan verdicts in ethics/governance answers.',
    },
    {
      trap: 'Saying transparency alone creates good governance.',
      correct: 'Transparency helps, but accountability, capacity, and rule of law must work together.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Memorise the eight UNDP-style principles.' },
    { day: 'Day 2', task: 'Write one example sentence for each principle.' },
    { day: 'Day 3', task: 'Map four principles to Pakistan institutions.' },
    { day: 'Day 4', task: 'Drill flashcards.' },
    { day: 'Day 5', task: 'Write a 10-minute outline on accountability and transparency.' },
    { day: 'Day 6', task: 'Practice one critically examine answer with one constraint paragraph.' },
    { day: 'Day 7', task: 'One-pager only. Recite the eight principles from memory.' },
  ],
  sourcesLine:
    'Sources: UNDP good governance characteristics as used in public administration teaching; Pakistan institutional names at syllabus level (Parliament, judiciary, Auditor General, ECP, NAB). Avoid partisan case narratives.',
}
