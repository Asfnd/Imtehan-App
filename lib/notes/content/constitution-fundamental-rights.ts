import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked:
 * - Part II, Chapter 1: Fundamental Rights, Articles 8-28 of the 1973 Constitution
 * - Art 8: laws inconsistent with FR void (subject to stated exceptions)
 * - Art 9 security of person; Art 10 arrest/detention; Art 10A fair trial
 * - Art 14 dignity; Art 19 speech; Art 19A information; Art 20 religion; Art 25 equality; Art 25A education
 * - Do not invent fake amendment years for every article; teach name-level article map for CSS PA
 */
export const CONSTITUTION_FUNDAMENTAL_RIGHTS_KIT: NoteKitData = {
  id: 'constitution-fundamental-rights',
  title: 'Fundamental Rights (Articles 8-28)',
  subtitle:
    'Crisp Arts 8-28 map for CSS Pakistan Affairs: what each cluster protects and how to use FR in answers.',
  syllabusTags: [
    '1973 Constitution',
    'Fundamental Rights',
    'Pakistan Affairs',
    'Human rights in Pakistan',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS pattern',
      directive: 'Discuss',
      angle: 'Scope and significance of Fundamental Rights in the 1973 Constitution',
      frequency: 'high',
    },
    {
      year: 'CSS / PMS',
      directive: 'Critically examine',
      angle: 'Equality, speech, religion, and property rights clusters',
      frequency: 'high',
    },
    {
      year: 'One-paper / MPT',
      directive: 'MCQ fact',
      angle: 'Article numbers for fair trial, education, information, equality',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Evaluate',
      angle: 'Fundamental Rights vs Principles of Policy (justiciability)',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Fundamental Rights sit in Part II, Chapter 1 of the 1973 Constitution: Articles 8 to 28.',
    'Art 8: any law inconsistent with FR is void to the extent of inconsistency (subject to constitutional exceptions). Anchor for judicial review of rights.',
    'Life and liberty cluster: Art 9 security of person; Art 10 safeguards as to arrest and detention; Art 10A right to fair trial and due process.',
    'Dignity and criminal process: Art 11 slavery/forced labour forbidden; Art 12 protection against retrospective punishment; Art 13 double punishment and self-incrimination; Art 14 inviolability of dignity of man.',
    'Freedoms cluster: Art 15 movement; Art 16 assembly; Art 17 association; Art 18 trade/business/profession; Art 19 freedom of speech (subject to reasonable restrictions); Art 19A right to information.',
    'Religion and culture: Art 20 freedom to profess religion and manage religious institutions; Arts 21-22 religion-related safeguards in tax and education; Art 28 language, script and culture.',
    'Property and equality: Arts 23-24 property; Art 25 equality of citizens; Art 25A free and compulsory education; Arts 26-27 non-discrimination in public places and services.',
    'Exam contrast: FR are justiciable (courts enforce). Principles of Policy (Arts 29-40) guide the state but are not enforced like FR.',
  ],
  answerSteps: [
    'Open with Part II Chapter 1 and the justiciability point (FR vs Principles of Policy).',
    'State Art 8 as the voiding clause for inconsistent laws.',
    'Group rights: life/liberty (9, 10, 10A), dignity/criminal process (11-14), freedoms (15-19A), religion (20-22), property (23-24), equality/education/non-discrimination (25-27), culture (28).',
    'Name 4-5 high-yield articles with one-line content each (9, 10A, 19, 19A, 25, 25A).',
    'Add one critical line: rights are subject to law and stated reasonable restrictions; they are not absolute.',
    'Close by linking FR to democracy, rule of law, and CSS PA constitutional-development answers.',
  ],
  questionVariants: [
    'Discuss the significance of Fundamental Rights (Articles 8 to 28) in the 1973 Constitution.',
    'Critically examine the life, liberty, and fair-trial provisions of the Constitution of Pakistan.',
    'Evaluate freedom of speech and the right to information under Articles 19 and 19A.',
    'Distinguish Fundamental Rights from Principles of Policy with examples.',
  ],
  citations: [
    {
      label: 'Location',
      text: 'Part II, Chapter 1, Articles 8 to 28, Constitution of Pakistan 1973.',
    },
    {
      label: 'Art 8',
      text: 'Laws inconsistent with Fundamental Rights are void to the extent of inconsistency, subject to constitutional exceptions.',
    },
    {
      label: 'High-yield articles',
      text: 'Art 9 security of person; Art 10A fair trial; Art 14 dignity; Art 19 speech; Art 19A information; Art 20 religion; Art 25 equality; Art 25A education.',
    },
    {
      label: 'Justiciability',
      text: 'Fundamental Rights are enforceable through courts. Principles of Policy are not enforced in the same way as FR.',
    },
  ],
  flashcards: [
    { prompt: 'Which articles cover Fundamental Rights?', answer: 'Articles 8 to 28' },
    { prompt: 'What does Article 8 mainly do?', answer: 'Voids laws inconsistent with Fundamental Rights (to the extent of inconsistency)' },
    { prompt: 'Article for security of person?', answer: 'Article 9' },
    { prompt: 'Article for right to fair trial?', answer: 'Article 10A' },
    { prompt: 'Article for freedom of speech?', answer: 'Article 19' },
    { prompt: 'Article for right to information?', answer: 'Article 19A' },
    { prompt: 'Article for freedom of religion?', answer: 'Article 20' },
    { prompt: 'Article for equality of citizens?', answer: 'Article 25' },
    { prompt: 'Article for free and compulsory education?', answer: 'Article 25A' },
    { prompt: 'Are Principles of Policy enforced like FR?', answer: 'No. FR are justiciable; Principles of Policy guide the state' },
    { prompt: 'Article for inviolability of dignity of man?', answer: 'Article 14' },
  ],
  mistakes: [
    {
      trap: 'Treating Principles of Policy as the same as Fundamental Rights.',
      correct: 'FR (8-28) are justiciable. Principles of Policy (29-40) are policy directives, not FR-style court remedies.',
    },
    {
      trap: 'Saying Art 19A is freedom of speech.',
      correct: 'Art 19 is speech. Art 19A is right to information.',
    },
    {
      trap: 'Confusing Art 25 with Art 25A.',
      correct: 'Art 25 equality. Art 25A free and compulsory education.',
    },
    {
      trap: 'Claiming Fundamental Rights have no restrictions.',
      correct: 'Many freedoms are subject to law and reasonable restrictions stated in the article.',
    },
    {
      trap: 'Mixing Art 10 with Art 10A.',
      correct: 'Art 10 covers arrest and detention safeguards. Art 10A is fair trial and due process.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Map Arts 8-28 into six clusters on one page.' },
    { day: 'Day 2', task: 'Memorise Arts 8, 9, 10, 10A, 14.' },
    { day: 'Day 3', task: 'Memorise Arts 19, 19A, 20, 25, 25A.' },
    { day: 'Day 4', task: 'Drill flashcards on article numbers.' },
    { day: 'Day 5', task: 'Write a 10-minute FR vs Principles of Policy outline.' },
    { day: 'Day 6', task: 'One-pager + two past-paper variant outlines.' },
    { day: 'Day 7', task: 'Recite high-yield articles from memory only.' },
  ],
  sourcesLine:
    'Sources: Constitution of Pakistan 1973, Part II Chapter 1 (Arts 8-28); standard CSS PA constitutional commentaries. Prefer text of articles over WhatsApp lists.',
}
