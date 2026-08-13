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
    'Key design: federal structure, parliamentary executive, bicameral Majlis-e-Shoora, and Fundamental Rights (Arts 8-28).',
    '1956: first constitution, parliamentary, short life, ended with 1958 martial law.',
    '1962: presidential system under Ayub Khan, ended in 1969.',
    '1973 survived better because provinces and parties could own a negotiated parliamentary document, and because courts and politics later treated revival as restoration rather than a brand-new constitution.',
    'It was held in abeyance after July 1977 martial law, then revived in stages in 1985 (not replaced by a fourth constitution).',
    'Exam use: constitutional development, democracy, federalism, rights, and later amendments (especially 8th and 18th).',
  ],
  answerSteps: [
    'Open with the problem after 1971: Pakistan needed a constitution that parties and provinces could accept.',
    'State the basics: passed 10 April 1973, enforced 14 August 1973, parliamentary federal design.',
    'Compare briefly with 1956 (short parliamentary life) and 1962 (presidential, Ayub).',
    'Explain durability factors: negotiated consensus, parliamentary ownership, rights chapter, and later revival instead of permanent replacement.',
    'Add one precise point: abeyance after 1977 and revival in 1985, or Arts 8-28 as a mark earner.',
    'Close with present relevance: every major debate (federalism, rights, amendments) still starts from the 1973 text.',
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
      label: 'Continuity',
      text: 'After 1977 martial law put the Constitution in abeyance, the 1973 text was revived in 1985 rather than replaced by a new constitution.',
    },
  ],
  flashcards: [
    { prompt: 'When did the National Assembly pass the 1973 Constitution?', answer: '10 April 1973' },
    { prompt: 'When was it authenticated?', answer: '12 April 1973' },
    { prompt: 'When did it come into force?', answer: '14 August 1973' },
    { prompt: 'What political system did it restore?', answer: 'Parliamentary federal system' },
    { prompt: 'Which articles cover Fundamental Rights?', answer: 'Articles 8 to 28' },
    { prompt: 'What system did the 1962 Constitution create?', answer: 'Presidential system under Ayub Khan' },
    { prompt: 'When did the 1956 Constitution end in practice?', answer: 'With the 1958 martial law' },
    {
      prompt: 'What happened to the 1973 Constitution after July 1977?',
      answer: 'It was held in abeyance (not permanently replaced)',
    },
    { prompt: 'When was the 1973 Constitution revived in stages?', answer: '1985' },
    {
      prompt: 'Name two durability reasons for exam answers.',
      answer: 'Negotiated parliamentary ownership and later revival instead of a new constitution',
    },
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
      trap: 'Listing only dates with no argument.',
      correct: 'Use dates to support a claim about durability, federalism, or rights.',
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
