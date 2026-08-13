import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked:
 * - Adopted 23 March 1940 at Lahore session of All-India Muslim League
 * - Moved by A. K. Fazlul Huq
 * - Called for independent states in Muslim-majority regions of north-western and eastern zones
 * - Later remembered as Pakistan Resolution / Lahore Resolution
 * - Do not invent fake vote counts or claim it used the exact modern map of Pakistan
 */
export const LAHORE_RESOLUTION_KIT: NoteKitData = {
  id: 'lahore-resolution-1940',
  title: 'Lahore Resolution (Pakistan Resolution) 1940',
  subtitle:
    'What the 23 March 1940 Resolution said, why it mattered, and how to write it without myth.',
  syllabusTags: [
    'Ideology of Pakistan',
    'Freedom movement',
    'Pakistan Resolution 1940',
  ],
  updated: '14 Aug 2026',
  pastPapers: [
    {
      year: 'CSS pattern',
      directive: 'Discuss',
      angle: 'Significance of the Lahore Resolution in the Pakistan Movement',
      frequency: 'high',
    },
    {
      year: 'CSS / PMS',
      directive: 'Critically examine',
      angle: 'From Muslim political demand to territorial claim',
      frequency: 'medium',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'Date, place, mover, Muslim League',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Evaluate',
      angle: 'Link between 1940 Resolution and later demand for Pakistan',
      frequency: 'high',
    },
  ],
  onePager: [
    '23 March 1940: All-India Muslim League adopts the Lahore Resolution at Lahore (Minto Park, later Iqbal Park).',
    'Moved by A. K. Fazlul Huq. Session under Quaid-e-Azam Muhammad Ali Jinnah as League president.',
    'Core demand: independent states in contiguous Muslim-majority units in the north-western and eastern zones, with minority safeguards.',
    'The Resolution text does not use the word Pakistan. Pakistan Resolution is the later popular name.',
    'Iqbal (Allahabad, 29 December 1930) gave an earlier homeland idea. He died in 1938. Do not credit him with drafting 1940.',
    'Choudhry Rahmat Ali coined the name Pakistan (1933). He did not move the Lahore Resolution.',
    'Exam use: ideology, League strategy, Two-Nation politics, path to 1947, and date traps vs 14 August 1947 and 12 March 1949.',
  ],
  answerSteps: [
    'Open with the political problem before 1940: how Muslims would secure power and identity in a future India.',
    'Place 1940 in sequence: Iqbal 1930 idea, League under Jinnah, then Lahore session.',
    'State the facts: 23 March 1940, Lahore, AIML, mover Fazlul Huq, independent states demand.',
    'Explain significance: League shifted toward a clear territorial political goal.',
    'Add one precise critical point: plural states in the text, and that the word Pakistan is absent.',
    'Close by linking 1940 to 1947 without skipping later bargaining.',
  ],
  questionVariants: [
    'Discuss the significance of the Lahore Resolution of 1940 in the Pakistan Movement.',
    'Critically examine the wording of the Lahore Resolution. Why does independent states matter?',
    'Evaluate the roles of Iqbal and Jinnah in the background to the 1940 Resolution without myths.',
    'The Lahore Resolution was a turning point for the All-India Muslim League. Discuss.',
  ],
  citations: [
    {
      label: 'Date and body',
      text: 'Lahore Resolution adopted on 23 March 1940 by the All-India Muslim League at its Lahore session.',
    },
    {
      label: 'Mover',
      text: 'Moved by A. K. Fazlul Huq.',
    },
    {
      label: 'Core demand',
      text: 'Independent states for contiguous Muslim-majority units, with safeguards for minorities.',
    },
    {
      label: 'Name caution',
      text: 'Official label: Lahore Resolution. Pakistan Resolution is the later popular name. The text does not contain the word Pakistan.',
    },
    {
      label: 'Background markers',
      text: 'Iqbal, Allahabad Address, 29 December 1930. Choudhry Rahmat Ali coined Pakistan in 1933. Jinnah led the League at Lahore as president.',
    },
  ],
  flashcards: [
    { prompt: 'When was the Lahore Resolution adopted?', answer: '23 March 1940' },
    { prompt: 'Where was it adopted?', answer: 'Lahore (Minto Park, later Iqbal Park)' },
    { prompt: 'Which party adopted it?', answer: 'All-India Muslim League' },
    { prompt: 'Who moved the Resolution?', answer: 'A. K. Fazlul Huq' },
    {
      prompt: 'Does the Resolution text use the word Pakistan?',
      answer: 'No',
    },
    {
      prompt: 'What did the text demand for Muslim-majority zones?',
      answer: 'Independent states (plural) in contiguous Muslim-majority units',
    },
    {
      prompt: 'What was Iqbal’s key pre-1940 address?',
      answer: 'Allahabad Address, 29 December 1930',
    },
    {
      prompt: 'When did Iqbal die relative to 1940?',
      answer: '1938, before the Lahore Resolution',
    },
    {
      prompt: 'Who coined the name Pakistan?',
      answer: 'Choudhry Rahmat Ali (1933)',
    },
    {
      prompt: 'Who was League president at the Lahore session?',
      answer: 'Muhammad Ali Jinnah',
    },
    {
      prompt: 'Name one trap date often mixed with 23 March 1940.',
      answer: '14 August 1947 or 12 March 1949',
    },
  ],
  mistakes: [
    {
      trap: 'Saying Jinnah moved the Lahore Resolution.',
      correct: 'Fazlul Huq moved it. Jinnah was League president and session leader.',
    },
    {
      trap: 'Writing that the Resolution text created Pakistan by name.',
      correct: 'The text does not say Pakistan. That name became popular later for the same Resolution.',
    },
    {
      trap: 'Treating independent states as a single state from day one.',
      correct: 'Original wording is plural. Later League politics moved toward one Pakistan.',
    },
    {
      trap: 'Crediting Iqbal with drafting or moving the 1940 Resolution.',
      correct: 'Iqbal’s Allahabad Address (1930) is background. He died in 1938.',
    },
    {
      trap: 'Confusing 23 March 1940 with 14 August 1947 or 12 March 1949.',
      correct: '1940 = Lahore Resolution. 1947 = Independence. 1949 = Objectives Resolution.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Read overview and timeline context around 1940.' },
    { day: 'Day 2', task: 'Memorise date, place, mover, and core demand.' },
    { day: 'Day 3', task: 'Write a 10-minute outline on significance.' },
    { day: 'Day 4', task: 'Drill flashcards.' },
    { day: 'Day 5', task: 'Attempt the critically examine variant (states plural).' },
    { day: 'Day 6', task: 'One-pager + citations. Practice MCQs.' },
    { day: 'Day 7', task: 'One-pager only. Recite mover and demand from memory.' },
  ],
  sourcesLine:
    'Sources: All-India Muslim League Lahore session record (23 March 1940); standard Pakistan Movement histories; FPSC ideology and freedom-movement syllabus items. Avoid unsourced WhatsApp date myths.',
}
