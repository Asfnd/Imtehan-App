import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked core facts:
 * - Objectives Resolution: 12 March 1949, moved by Liaquat Ali Khan
 * - Preamble role in 1956, 1962, 1973 Constitutions
 * - Article 2A inserted 1985 (RCO / covered by 8th Amendment); Annex text
 * - Word "freely" missing in 1985 Annex; restored by 18th Amendment (2010)
 * - Hakim Khan v. Government of Pakistan, PLD 1992 SC 595: Art 2A is part of the Constitution, not above it
 * - Article 2: Islam is the State religion
 */
export const OBJECTIVES_RESOLUTION_KIT: NoteKitData = {
  id: 'objectives-resolution-article-2a',
  title: 'Objectives Resolution and Article 2A',
  subtitle:
    'Full notes for understanding, plus a one-page sheet, past-paper angles, and fact cards for revision.',
  syllabusTags: [
    'Ideology of Pakistan',
    'Constitutional development',
    'FPSC PA XXVII (legal debates)',
  ],
  updated: '13 Aug 2026',
  pastPapers: [
    {
      year: 'CSS pattern',
      directive: 'Discuss',
      angle: 'Role of the Objectives Resolution in state ideology',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Critically examine',
      angle: 'Change in status after Article 2A (1985)',
      frequency: 'high',
    },
    {
      year: 'CSS / PMS',
      directive: 'Evaluate',
      angle: 'Islamic provisions and minority rights (freely issue)',
      frequency: 'medium',
    },
    {
      year: 'One-paper / MPT',
      directive: 'MCQ fact',
      angle: 'Date, mover, Article 2A year, Hakim Khan',
      frequency: 'high',
    },
  ],
  onePager: [
    '12 March 1949: Constituent Assembly passes the Objectives Resolution. Moved by Liaquat Ali Khan.',
    'Early role: guiding statement for constitution making. Later used as the preamble of the 1956, 1962, and 1973 Constitutions.',
    '1985: Article 2A makes the Resolution (in the Annex) a substantive part of the Constitution.',
    'Article 2: Islam is the State religion. Often paired with Article 2A in answers.',
    'Freely: present in 1949 text for minorities; missing in the 1985 Annex; restored by the 18th Amendment (2010).',
    'Hakim Khan (PLD 1992 SC 595): Article 2A is part of the Constitution, not above every other article.',
    'Exam use: ideology, constitutional development, Islamic provisions, minority rights, and recent legal debates.',
  ],
  answerSteps: [
    'Open with the founding problem: how to build a state that is Islamic in orientation and democratic in political life.',
    'State what the 1949 Resolution set out (sovereignty of Allah, authority as trust, democracy, rights, minority protection, federation and judiciary).',
    'Show the preamble stage: 1956, 1962, and 1973. Spirit of the Constitution, not yet Article 2A force.',
    'Explain Article 2A (1985) as the turning point: substantive constitutional text via the Annex.',
    'Add one precise point: freely restored in 2010, or Hakim Khan in 1992 (balance, not exaggeration).',
    'Close with present relevance: Pakistan still debates how faith, democracy, and rights sit together under one constitution.',
  ],
  questionVariants: [
    'The Objectives Resolution became far more important after 1985 than in 1949. Discuss.',
    'Critically examine the constitutional status of the Objectives Resolution before and after Article 2A.',
    'How do Articles 2 and 2A shape the Islamic character of the 1973 Constitution? Discuss with reference to minority rights.',
    'Evaluate the Supreme Court view in Hakim Khan on Article 2A. Why does balance matter in your answer?',
  ],
  citations: [
    {
      label: 'Date and mover',
      text: 'Objectives Resolution passed on 12 March 1949 by the Constituent Assembly. Moved by Liaquat Ali Khan.',
    },
    {
      label: 'Article 2',
      text: 'Islam shall be the State religion of Pakistan.',
    },
    {
      label: 'Article 2A',
      text: 'The principles and provisions set out in the Objectives Resolution are a substantive part of the Constitution and shall have effect accordingly.',
    },
    {
      label: 'Freely (rights language)',
      text: 'Original Resolution: minorities to freely profess and practise their religions. Annex (1985): freely missing. 18th Amendment (2010): freely restored.',
    },
    {
      label: 'Case',
      text: 'Hakim Khan v. Government of Pakistan, PLD 1992 SC 595. Article 2A is part of the Constitution, not superior to the whole document.',
    },
  ],
  flashcards: [
    { prompt: 'When was the Objectives Resolution passed?', answer: '12 March 1949' },
    { prompt: 'Who moved the Objectives Resolution?', answer: 'Liaquat Ali Khan' },
    { prompt: 'Which body passed it?', answer: 'Constituent Assembly of Pakistan' },
    {
      prompt: 'What was its early role before Article 2A?',
      answer: 'Guiding statement / preamble of the Constitutions',
    },
    { prompt: 'In which years was it used as a preamble?', answer: '1956, 1962, and 1973' },
    { prompt: 'When was Article 2A inserted?', answer: '1985' },
    { prompt: 'What does Article 2 say?', answer: 'Islam is the State religion of Pakistan' },
    {
      prompt: 'What happened to the word freely in 1985?',
      answer: 'It was missing from the Annex version',
    },
    { prompt: 'When was freely restored?', answer: '18th Amendment, 2010' },
    {
      prompt: 'What did Hakim Khan (1992) decide about Article 2A?',
      answer: 'It is part of the Constitution, not above it',
    },
    {
      prompt: 'Give the case citation for Hakim Khan.',
      answer: 'PLD 1992 SC 595',
    },
    {
      prompt: 'Name three themes of the Resolution.',
      answer: 'Islamic orientation, authority as trust, democracy and rights (also minority protection)',
    },
  ],
  mistakes: [
    {
      trap: 'Only memorising 1949 and stopping there.',
      correct: 'Always connect 1949 to Article 2A (1985) and, if useful, freely (2010) or Hakim Khan (1992).',
    },
    {
      trap: 'Saying Article 2A was in the original 1973 text.',
      correct: 'Article 2A was inserted in 1985.',
    },
    {
      trap: 'Ignoring the freely issue.',
      correct: 'Note: freely missing in 1985 Annex, restored in 2010. Good for minority rights angles.',
    },
    {
      trap: 'Claiming Article 2A cancels every other article.',
      correct: 'Hakim Khan: Article 2A is part of the Constitution, not above it.',
    },
    {
      trap: 'Writing only a date list with no argument.',
      correct: 'Use dates to support a clear claim about ideology and constitutional force.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Read the overview and themes. Do not memorise yet.' },
    { day: 'Day 2', task: 'Study before/after Article 2A and the freely table.' },
    { day: 'Day 3', task: 'Write a 10-minute outline from the answer steps. Close the notes.' },
    { day: 'Day 4', task: 'Drill the flashcards. Mark weak facts.' },
    { day: 'Day 5', task: 'Attempt one question variant in 30 to 40 minutes.' },
    { day: 'Day 6', task: 'Revise only the one-pager and citation bank. Practice MCQs.' },
    { day: 'Day 7', task: 'One-pager only. Rewrite the outline once from memory.' },
  ],
  sourcesLine:
    'Sources: Constitution of Pakistan (Arts. 2, 2A, Annex); 18th Amendment; Hakim Khan (PLD 1992 SC 595); FPSC Pakistan Affairs syllabus; Hamid Khan for deeper reading.',
}
