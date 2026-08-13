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
    '23 March 1940: All-India Muslim League adopts the Lahore Resolution at Lahore.',
    'Moved by A. K. Fazlul Huq.',
    'It asked for independent states in contiguous Muslim-majority areas in the north-western and eastern zones of India.',
    'It is remembered as a turning point: Muslim politics shifted from bargaining inside a united India toward a territorial solution.',
    'Do not overclaim: the text spoke of states (plural) and contiguous units. Later politics clarified Pakistan as one state.',
    'Context: after failed trust in Congress-led arrangements and the failure of earlier constitutional bargains.',
    'Exam use: ideology, freedom movement timelines, Jinnah’s leadership after 1940, and the road to 1947.',
  ],
  answerSteps: [
    'Open with the political problem before 1940: how Muslims would secure power and identity in a future India.',
    'State the basics: 23 March 1940, Lahore, Muslim League, moved by Fazlul Huq.',
    'Explain the core demand in plain words: independent states in Muslim-majority contiguous regions.',
    'Show why it mattered: it gave the League a clear territorial direction for mass politics.',
    'Add one careful point: original wording used states (plural). Later history shaped a single Pakistan.',
    'Close by linking 1940 to 1947 without skipping intermediate politics (Cripps, Cabinet Mission, elections).',
  ],
  questionVariants: [
    'Discuss the significance of the Lahore Resolution of 1940 in the Pakistan Movement.',
    'Critically examine whether the Lahore Resolution was a clear demand for a single Pakistan.',
    'Evaluate the role of the All-India Muslim League after the Lahore Resolution.',
    'How does the Lahore Resolution fit into the ideology of Pakistan? Discuss.',
  ],
  citations: [
    {
      label: 'Date and place',
      text: 'Lahore Resolution adopted on 23 March 1940 at the Lahore session of the All-India Muslim League.',
    },
    {
      label: 'Mover',
      text: 'The Resolution was moved by A. K. Fazlul Huq.',
    },
    {
      label: 'Core demand',
      text: 'Independent states for contiguous Muslim-majority areas in the north-western and eastern zones of British India.',
    },
    {
      label: 'Political meaning',
      text: 'It marked a shift toward a territorial solution for Muslim politics rather than only minority safeguards inside one centre.',
    },
    {
      label: 'Careful reading',
      text: 'The original resolution used the plural states. Later League politics and partition events shaped the final form of Pakistan.',
    },
  ],
  flashcards: [
    { prompt: 'When was the Lahore Resolution adopted?', answer: '23 March 1940' },
    { prompt: 'Where was it adopted?', answer: 'Lahore' },
    { prompt: 'Which party adopted it?', answer: 'All-India Muslim League' },
    { prompt: 'Who moved the Resolution?', answer: 'A. K. Fazlul Huq' },
    {
      prompt: 'What regions did it focus on?',
      answer: 'Muslim-majority contiguous areas in north-western and eastern zones',
    },
    {
      prompt: 'Why is it also called the Pakistan Resolution?',
      answer: 'It became the landmark demand associated with the Pakistan Movement',
    },
    {
      prompt: 'What careful wording point earns marks?',
      answer: 'Original text said states (plural), not a fully mapped modern Pakistan',
    },
    {
      prompt: 'Name one reason the Resolution mattered.',
      answer: 'It gave Muslim politics a territorial goal',
    },
    {
      prompt: 'Which larger subject does this serve?',
      answer: 'Ideology of Pakistan and freedom movement',
    },
    {
      prompt: 'What should you not invent in answers?',
      answer: 'Fake vote totals or claims that 1940 already fixed today’s provincial map',
    },
  ],
  mistakes: [
    {
      trap: 'Saying Quaid-e-Azam personally moved the Resolution in the House.',
      correct: 'Fazlul Huq moved it. Jinnah led the League and the wider politics.',
    },
    {
      trap: 'Claiming the 1940 text already drew today’s Pakistan map.',
      correct: 'It set a territorial principle for Muslim-majority regions. Details came later.',
    },
    {
      trap: 'Ignoring the plural states wording.',
      correct: 'Mentioning states (plural) shows careful reading and earns examiner trust.',
    },
    {
      trap: 'Jumping from 1940 straight to 1947 with no politics in between.',
      correct: 'Use 1940 as a turning point, then note later negotiations and elections.',
    },
    {
      trap: 'Only writing slogans about ideology.',
      correct: 'Give date, mover, demand, and political consequence.',
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
