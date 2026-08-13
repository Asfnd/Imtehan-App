import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked:
 * - National Assembly passed Constitution Bill 10 April 1973
 * - Authenticated / published 12 April 1973
 * - Commenced 14 August 1973 (Art 265)
 * - Framed under Zulfikar Ali Bhutto era National Assembly
 * - Parliamentary federal republic; Fundamental Rights Arts 8-28
 * - 1956 and 1962 did not survive; 1973 was held in abeyance then revived (1985)
 */
export const CONSTITUTION_1973_KIT: NoteKitData = {
  id: 'constitution-1973',
  title: '1973 Constitution of Pakistan',
  subtitle:
    'Why this Constitution lasted, what it built, and how to use it in Pakistan Affairs answers.',
  syllabusTags: [
    'Constitutional development',
    'Political evolution since 1971',
    'FPSC PA XXVII',
  ],
  updated: '14 Aug 2026',
  pastPapers: [
    {
      year: 'CSS pattern',
      directive: 'Discuss',
      angle: 'Why the 1973 Constitution has greater durability than 1956 and 1962',
      frequency: 'high',
    },
    {
      year: 'CSS / PMS',
      directive: 'Critically examine',
      angle: 'Parliamentary federal design and Fundamental Rights',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Evaluate',
      angle: 'Suspension, revival, and amendment politics after 1973',
      frequency: 'medium',
    },
    {
      year: 'One-paper / MPT',
      directive: 'MCQ fact',
      angle: 'Pass date, enforce date, system type, Arts 8-28',
      frequency: 'high',
    },
  ],
  onePager: [
    'Passed by the National Assembly on 10 April 1973. Authenticated 12 April 1973. Came into force on 14 August 1973.',
    'Built as a parliamentary federal republic after the 1971 crisis, under Zulfikar Ali Bhutto’s political leadership.',
    'Key design: federal structure, parliamentary executive, bicameral Majlis-e-Shoora (National Assembly and Senate), and Fundamental Rights (Arts 8-28).',
    'Article 6 makes abrogation or subversion of the Constitution high treason. It raises the legal cost of attacking the text. It is not a magic shield by itself.',
    '1956: first constitution, parliamentary, short life, ended with 1958 martial law.',
    '1962: presidential system under Ayub Khan, ended in 1969.',
    '1973 survived better because provinces and parties could own a negotiated parliamentary document, and because later politics revived the same text (1985) instead of writing a fourth constitution.',
    'Exam use: constitutional development, democracy, federalism, rights, Art 6, and later amendments (especially 8th and 18th).',
  ],
  answerSteps: [
    'Open with the problem after 1971: Pakistan needed a constitution that parties and provinces could accept.',
    'Give the hard facts: passed 10 April 1973, enforced 14 August 1973, framed under Bhutto with National Assembly consensus.',
    'Contrast briefly: 1956 (parliamentary, gone 1958) and 1962 (presidential, gone with Ayub).',
    'Explain the 1973 design: federal parliament, strong PM, bicameral house, Senate as provincial voice.',
    'Add rights and durability tools: Arts 8 to 28, plus Art 6 on high treason. Note later amendments kept the same document alive.',
    'Close with a clear judgment: 1973 was amended and revived, while earlier texts were discarded.',
  ],
  questionVariants: [
    'Why has the 1973 Constitution shown greater durability than the Constitutions of 1956 and 1962? Discuss.',
    'Critically examine the parliamentary federal design of the 1973 Constitution.',
    'Evaluate the place of Fundamental Rights (Articles 8 to 28) in Pakistan’s constitutional development.',
    'The 1973 Constitution was suspended but not permanently replaced. Discuss what that means for Pakistan’s constitutional history.',
  ],
  citations: [
    {
      label: 'Passage',
      text: 'National Assembly passed the Constitution on 10 April 1973. Authenticated on 12 April 1973.',
    },
    {
      label: 'Commencement',
      text: 'Subject to Article 265, the Constitution commenced on 14 August 1973.',
    },
    {
      label: 'System',
      text: 'Islamic Republic with a parliamentary federal structure and Majlis-e-Shoora (Parliament).',
    },
    {
      label: 'Rights',
      text: 'Fundamental Rights are set out in Articles 8 to 28 of the Constitution.',
    },
    {
      label: 'Article 6',
      text: 'Abrogating or subverting the Constitution by unconstitutional means is high treason. Later amendments tightened this further.',
    },
    {
      label: 'Continuity',
      text: 'After 1977 martial law put the Constitution in abeyance, the 1973 text was revived in 1985 rather than replaced by a new constitution.',
    },
  ],
  flashcards: [
    { prompt: 'When did the National Assembly pass the 1973 Constitution?', answer: '10 April 1973' },
    { prompt: 'When was it authenticated?', answer: '12 April 1973' },
    { prompt: 'When did it come into force?', answer: '14 August 1973' },
    { prompt: 'What political system did it restore?', answer: 'Parliamentary federal system' },
    { prompt: 'Name the two houses of Parliament.', answer: 'National Assembly and Senate' },
    { prompt: 'Which articles cover Fundamental Rights?', answer: 'Articles 8 to 28' },
    { prompt: 'What does Article 6 deal with?', answer: 'High treason for attacking the Constitution' },
    { prompt: 'What system did the 1962 Constitution create?', answer: 'Presidential system under Ayub Khan' },
    { prompt: 'When did the 1956 Constitution end in practice?', answer: 'With the 1958 martial law' },
    {
      prompt: 'What happened to the 1973 Constitution after July 1977?',
      answer: 'It was held in abeyance (not permanently replaced)',
    },
    { prompt: 'When was the 1973 Constitution revived in stages?', answer: '1985' },
    {
      prompt: 'Who was the leading political figure of the framing period?',
      answer: 'Zulfikar Ali Bhutto',
    },
  ],
  mistakes: [
    {
      trap: 'Saying it was enforced on 10 April 1973.',
      correct: 'Passed on 10 April. Enforced on 14 August 1973.',
    },
    {
      trap: 'Treating 1956, 1962, and 1973 as the same design.',
      correct: '1956 and 1973 are parliamentary. 1962 was presidential.',
    },
    {
      trap: 'Claiming 1973 was never interrupted.',
      correct: 'It was held in abeyance after 1977 and revived in 1985.',
    },
    {
      trap: 'Treating Article 6 as if it alone prevented every coup.',
      correct: 'Article 6 raises the legal cost. Political and institutional factors also explain survival.',
    },
    {
      trap: 'Confusing Article 2A (1985) with the original 1973 text.',
      correct: 'Article 2A was inserted later, in 1985.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Read overview and the 1956 / 1962 / 1973 comparison table.' },
    { day: 'Day 2', task: 'Memorise pass date, enforce date, and Arts 8-28.' },
    { day: 'Day 3', task: 'Write a 10-minute outline on durability.' },
    { day: 'Day 4', task: 'Drill flashcards. Mark weak facts.' },
    { day: 'Day 5', task: 'Attempt one question variant in 30 to 40 minutes.' },
    { day: 'Day 6', task: 'Revise one-pager and citations only. Practice MCQs.' },
    { day: 'Day 7', task: 'One-pager only. Rewrite the outline from memory.' },
  ],
  sourcesLine:
    'Sources: Constitution of Pakistan (National Assembly text); Article 265 commencement; Dawn archive on 10 April 1973 adoption; FPSC Pakistan Affairs syllabus; Hamid Khan for deeper reading.',
}
