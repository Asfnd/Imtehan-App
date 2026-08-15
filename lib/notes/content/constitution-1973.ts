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
  updated: '15 Aug 2026',
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
    'Passed 10 April 1973. Authenticated 12 April 1973. Came into force 14 August 1973 (Art 265). Classic teaching date for enforcement is 14 August.',
    'Parliamentary federal republic after 1971, framed under Zulfikar Ali Bhutto’s National Assembly leadership.',
    'Design: federal structure, parliamentary executive, bicameral Majlis-e-Shoora (NA + Senate), Fundamental Rights Arts 8-28.',
    'Article 6: abrogation or subversion of the Constitution is high treason. Raises legal cost; not a magic shield alone.',
    '1956: first constitution, parliamentary; ended with 1958 martial law.',
    '1962: presidential system under Ayub Khan; ended 1969.',
    'Why 1973 lasted better: negotiated parliamentary ownership by parties and provinces; same text revived in 1985, not a fourth constitution.',
    'Exam hooks: constitutional development, democracy, federalism, rights, Art 6, 8th and 18th Amendments. Article 2A is 1985, not original 1973.',
  ],
  answerSteps: [
    'Open with the problem after 1971: Pakistan needed a constitution parties and provinces could accept.',
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
    { prompt: 'NA pass date of 1973 Constitution?', answer: '10 April 1973' },
    { prompt: 'Authentication date?', answer: '12 April 1973' },
    { prompt: 'Commencement / force date?', answer: '14 August 1973' },
    { prompt: 'Which article governs commencement?', answer: 'Article 265' },
    { prompt: 'Political system restored?', answer: 'Parliamentary federal system' },
    { prompt: 'Two houses of Parliament?', answer: 'National Assembly and Senate' },
    { prompt: 'Fundamental Rights articles?', answer: 'Articles 8 to 28' },
    { prompt: 'Article 6 covers?', answer: 'High treason for attacking the Constitution' },
    { prompt: '1962 system type?', answer: 'Presidential (Ayub Khan)' },
    { prompt: 'When did 1956 end in practice?', answer: '1958 martial law' },
    { prompt: '1973 after July 1977?', answer: 'Held in abeyance (not permanently replaced)' },
    { prompt: 'Revival year of 1973 text?', answer: '1985' },
    { prompt: 'Leading framing-era political figure?', answer: 'Zulfikar Ali Bhutto' },
    { prompt: 'Was Article 2A in the original 1973 text?', answer: 'No. Inserted in 1985.' },
  ],
  mistakes: [
    {
      trap: 'Saying it was enforced on 10 April 1973.',
      correct: 'Passed 10 April. Authenticated 12 April. Enforced 14 August 1973 (Art 265).',
    },
    {
      trap: 'Treating 1956, 1962, and 1973 as the same design.',
      correct: '1956 and 1973 are parliamentary. 1962 was presidential.',
    },
    {
      trap: 'Claiming 1973 was never interrupted.',
      correct: 'Held in abeyance after 1977; revived in 1985.',
    },
    {
      trap: 'Treating Article 6 as if it alone blocked every coup.',
      correct: 'Article 6 raises legal cost. Political and institutional factors also explain survival.',
    },
    {
      trap: 'Confusing Article 2A (1985) with the original 1973 text.',
      correct: 'Article 2A was inserted later, in 1985.',
    },
    {
      trap: 'Calling 1973 a presidential constitution.',
      correct: '1973 restored a parliamentary federal republic (PM-led cabinet accountable to Parliament).',
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
