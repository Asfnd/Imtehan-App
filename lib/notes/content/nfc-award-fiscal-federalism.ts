import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked:
 * - NFC = National Finance Commission (Constitution Art. 160 frame)
 * - Vertical share: federation vs provinces; horizontal share: among provinces
 * - 7th NFC Award (2009): landmark name-level fiscal reset; do not invent fake full schedules
 * - Resource sharing debates: divisible pool, criteria, capacity, ownership of natural resources
 * - Avoid fake year-by-year percentage tables beyond established 7th NFC framing
 */
export const NFC_AWARD_FISCAL_FEDERALISM_KIT: NoteKitData = {
  id: 'nfc-award-fiscal-federalism',
  title: 'NFC Award and Fiscal Federalism',
  subtitle:
    'What NFC is, how fiscal federalism works, 7th NFC at name level, and resource-sharing debates for CSS PA.',
  syllabusTags: [
    'Federalism',
    'Public finance',
    'Governance',
    'Pakistan Affairs',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS pattern',
      directive: 'Discuss',
      angle: 'NFC Award and centre-province fiscal relations',
      frequency: 'high',
    },
    {
      year: 'CSS / PMS',
      directive: 'Critically examine',
      angle: 'Fiscal federalism after the 7th NFC Award',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Evaluate',
      angle: 'Resource sharing and provincial autonomy',
      frequency: 'medium',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'NFC meaning; vertical vs horizontal distribution',
      frequency: 'high',
    },
  ],
  onePager: [
    'Fiscal federalism: how tax revenues and spending roles are shared between federation and provinces under a written constitution.',
    'NFC (National Finance Commission): constitutional body that recommends how the divisible pool of taxes is shared (Art. 160 frame in exam answers).',
    'Two layers: vertical distribution (federation vs provinces) and horizontal distribution (among provinces).',
    '7th NFC Award (2009): landmark award that raised the provinces\' share of the divisible pool and widened horizontal criteria beyond population alone.',
    'Horizontal criteria (7th NFC framing): population plus poverty/backwardness, revenue generation/collection effort, and inverse population density. Memorise names, not invented decimals.',
    'Resource sharing debate: who owns and benefits from natural resources, how grants work, and whether money matches devolved functions after the 18th Amendment.',
    'Exam rule: define NFC, separate vertical/horizontal, name 7th NFC carefully, add one capacity or coordination critique. Do not invent fake percentage tables.',
  ],
  answerSteps: [
    'Define fiscal federalism: shared revenues and responsibilities in a federation.',
    'Explain NFC as the constitutional recommendation mechanism for the divisible pool.',
    'Separate vertical share (centre-provinces) from horizontal share (province-to-province).',
    'Name the 7th NFC Award (2009) as the landmark reset and list horizontal criteria at name level.',
    'Link to autonomy: after devolution, money and capacity must follow functions.',
    'Close with a balanced judgment: awards matter, but implementation, trust, and service delivery decide outcomes.',
  ],
  questionVariants: [
    'Discuss the role of the NFC Award in Pakistan\'s fiscal federalism.',
    'Critically examine the 7th NFC Award as a turning point in centre-province relations.',
    'Evaluate resource sharing between federation and provinces in Pakistan.',
    'Fiscal autonomy without fiscal capacity is incomplete. Discuss with reference to NFC.',
  ],
  citations: [
    {
      label: 'NFC concept',
      text: 'The National Finance Commission recommends distribution of specified tax revenues between the federation and the provinces.',
    },
    {
      label: 'Vertical vs horizontal',
      text: 'Vertical share splits the pool between federation and provinces. Horizontal share allocates the provincial portion among provinces.',
    },
    {
      label: '7th NFC',
      text: 'The 7th NFC Award (2009) is the landmark modern award that increased the provincial share of the divisible pool and used multiple horizontal criteria.',
    },
    {
      label: 'Horizontal criteria (name-level)',
      text: '7th NFC horizontal framing includes population, poverty/backwardness, revenue generation/collection effort, and inverse population density.',
    },
    {
      label: '18th Amendment link',
      text: 'Devolution of subjects after the 18th Amendment raised the stakes of fiscal transfers matching provincial functions.',
    },
  ],
  flashcards: [
    { prompt: 'What does NFC stand for?', answer: 'National Finance Commission' },
    {
      prompt: 'What is vertical distribution?',
      answer: 'Share between federation and provinces',
    },
    {
      prompt: 'What is horizontal distribution?',
      answer: 'Share of the provincial pool among provinces',
    },
    {
      prompt: 'When was the 7th NFC Award?',
      answer: '2009',
    },
    {
      prompt: 'Name two horizontal criteria used in 7th NFC framing.',
      answer: 'Population and poverty/backwardness (also revenue effort; inverse population density)',
    },
    {
      prompt: 'Why link NFC to the 18th Amendment in answers?',
      answer: 'Devolved functions need matching fiscal resources and capacity',
    },
    {
      prompt: 'What is the divisible pool in exam language?',
      answer: 'Specified federal tax revenues shared under the NFC Award',
    },
    {
      prompt: 'What trap should you avoid in NFC essays?',
      answer: 'Inventing fake percentage tables as if they were current law',
    },
  ],
  mistakes: [
    {
      trap: 'Treating NFC as a permanent fixed percentage forever.',
      correct: 'Awards are periodic recommendations. Cite the 7th NFC as landmark, not as eternal arithmetic.',
    },
    {
      trap: 'Confusing vertical and horizontal shares.',
      correct: 'Vertical = federation vs provinces. Horizontal = among provinces.',
    },
    {
      trap: 'Saying NFC only cares about population.',
      correct: '7th NFC used multiple criteria, not population alone.',
    },
    {
      trap: 'Inventing exact current schedules from memory.',
      correct: 'Name criteria and the 2009 landmark carefully. Avoid fake tables.',
    },
    {
      trap: 'Ignoring post-18th Amendment functional load.',
      correct: 'Fiscal federalism answers should note that money must follow devolved roles.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Define fiscal federalism and NFC in one paragraph.' },
    { day: 'Day 2', task: 'Memorise vertical vs horizontal and 7th NFC year.' },
    { day: 'Day 3', task: 'List horizontal criteria at name level only.' },
    { day: 'Day 4', task: 'Write a 10-minute outline on resource sharing debates.' },
    { day: 'Day 5', task: 'Drill flashcards; fix percentage-table traps.' },
    { day: 'Day 6', task: 'Link NFC to 18th Amendment capacity critique.' },
    { day: 'Day 7', task: 'One-pager only. Recite definitions from memory.' },
  ],
  sourcesLine:
    'Sources: Constitution Art. 160 NFC frame; 7th NFC Award (2009) standard public-finance summaries; FPSC Pakistan Affairs federalism items. Avoid unsourced WhatsApp percentage sheets.',
}
