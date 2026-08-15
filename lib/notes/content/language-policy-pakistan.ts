import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked:
 * - Article 251: Urdu as national language; arrangements for official use within fifteen years from commencement; English may continue until arrangements made
 * - Provincial languages: provinces may prescribe measures for teaching, promotion and use of a provincial language in addition to the national language
 * - Do not invent fake repeal of Article 251 or claim English is the national language
 * - Language politics: 1948-1952 East Pakistan debates are historical context; treat carefully without communal slogans
 */
export const LANGUAGE_POLICY_PAKISTAN_KIT: NoteKitData = {
  id: 'language-policy-pakistan',
  title: 'Language Policy of Pakistan (Article 251 and Debates)',
  subtitle:
    'Urdu as national language, Article 251 wording, English official use, and provincial language space for CSS/PMS.',
  syllabusTags: [
    'Constitution of Pakistan',
    'Language policy',
    'National identity',
    'Pakistan Affairs',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS / PMS',
      directive: 'Discuss',
      angle: 'Urdu as national language and challenges of implementation',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Critically examine',
      angle: 'Article 251 and continued use of English',
      frequency: 'high',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'National language under Article 251',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Evaluate',
      angle: 'National language versus provincial languages in a federation',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Article 251(1): The national language of Pakistan is Urdu. Arrangements shall be made for its being used for official and other purposes within fifteen years from the commencing day.',
    'Article 251(2): English language may be used for official purposes until arrangements for Urdu are made under clause (1).',
    'Article 251(3): Without prejudice to the status of the national language, a Provincial Assembly may by law prescribe measures for the teaching, promotion and use of a provincial language in addition to the national language.',
    'Exam takeaway: Urdu is the national language. English is not the national language. English may continue as an official working language until Urdu arrangements are complete.',
    'Policy reality taught in exams: English remains strong in higher courts, higher education, federal bureaucracy, and international communication. Full Urduisation of all official domains has not been completed as a simple switch.',
    'Identity and unity argument: Urdu as a shared link language across provinces. Counter-argument: mother-tongue education and provincial languages matter for access, dignity, and learning outcomes.',
    'Historical caution: language controversies in early decades (especially East Pakistan) show that language policy is political, not only administrative. Do not reduce the 1971 crisis to language alone.',
    'Answer frame: constitutional text → implementation gap → English vs Urdu domains → provincial languages → education and soft power → balanced reform (Urdu capacity plus mother-tongue and English skills).',
  ],
  answerSteps: [
    'Open with Article 251(1): Urdu is the national language.',
    'Add 251(2) on English continuance and 251(3) on provincial languages.',
    'Explain why English persists in practice (courts, universities, administration, global links).',
    'Discuss identity, access, and federal unity without one-sided slogans.',
    'Close with a reform line: strengthen Urdu for public use, protect provincial languages, keep English as a skills language.',
  ],
  questionVariants: [
    'Discuss the language policy of Pakistan with special reference to Article 251.',
    'Critically examine why English continues as a major official language despite Urdu being the national language.',
    'Evaluate the place of provincial languages alongside Urdu in Pakistan’s federation.',
    'Language policy can unite or divide. Discuss with Pakistan’s constitutional framework.',
  ],
  citations: [
    {
      label: 'Article 251(1)',
      text: 'National language of Pakistan is Urdu; arrangements for official and other use within fifteen years from commencement.',
    },
    {
      label: 'Article 251(2)',
      text: 'English may be used for official purposes until arrangements under clause (1) are made.',
    },
    {
      label: 'Article 251(3)',
      text: 'Provincial Assembly may prescribe measures for teaching, promotion and use of a provincial language in addition to the national language.',
    },
    {
      label: 'Exam caution',
      text: 'Do not call English the national language. Do not invent a constitutional repeal of Urdu’s national status.',
    },
  ],
  flashcards: [
    { prompt: 'What is Pakistan’s national language under Article 251?', answer: 'Urdu' },
    {
      prompt: 'What does Article 251 say about English?',
      answer: 'It may be used for official purposes until Urdu arrangements are made',
    },
    {
      prompt: 'Who may promote a provincial language under 251(3)?',
      answer: 'A Provincial Assembly, by law, in addition to the national language',
    },
    {
      prompt: 'Is English the national language of Pakistan?',
      answer: 'No',
    },
    {
      prompt: 'Name one domain where English often remains dominant in practice.',
      answer: 'Higher courts, higher education, or federal bureaucracy',
    },
    {
      prompt: 'What time frame does 251(1) mention for Urdu arrangements?',
      answer: 'Within fifteen years from the commencing day',
    },
    {
      prompt: 'What is the main federal tension in language policy answers?',
      answer: 'National link language versus provincial mother tongues and English skills',
    },
    {
      prompt: 'Name one exam-safe reform pillar for language policy.',
      answer: 'Strengthen Urdu public use while supporting mother-tongue education and English skills',
    },
    {
      prompt: 'Why is early East Pakistan language politics relevant but risky?',
      answer: 'It shows language is political; do not reduce 1971 to language alone',
    },
    {
      prompt: 'Article 251 protects Urdu’s status while allowing what at provincial level?',
      answer: 'Teaching, promotion and use of a provincial language in addition to Urdu',
    },
  ],
  mistakes: [
    {
      trap: 'Calling English the national language of Pakistan.',
      correct: 'Urdu is the national language. English may continue for official use under Article 251(2).',
    },
    {
      trap: 'Claiming Article 251 bans English completely.',
      correct: 'Clause (2) expressly allows English until Urdu arrangements are made.',
    },
    {
      trap: 'Saying provinces cannot promote regional languages.',
      correct: 'Article 251(3) allows provincial measures in addition to the national language.',
    },
    {
      trap: 'Treating Urduisation as already fully complete in all official domains.',
      correct: 'Exams expect the implementation gap: English remains strong in many elite and technical domains.',
    },
    {
      trap: 'Reducing the 1971 crisis only to the Urdu language issue.',
      correct: 'Language was part of a wider political, economic, and representation conflict.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Memorise Article 251 clauses (1), (2), and (3).' },
    { day: 'Day 2', task: 'Map domains: courts, education, media, bureaucracy.' },
    { day: 'Day 3', task: 'Write a 10-minute outline on Urdu vs English practice.' },
    { day: 'Day 4', task: 'Drill flashcards and MCQ traps.' },
    { day: 'Day 5', task: 'Attempt the critically examine variant on English continuance.' },
    { day: 'Day 6', task: 'One-pager + provincial language paragraph.' },
    { day: 'Day 7', task: 'Recite 251 wording from memory and revise mistakes.' },
  ],
  sourcesLine:
    'Sources: Constitution of Pakistan, Article 251; standard Pakistan Affairs language-policy chapters; FPSC/PMS constitutional and national-identity syllabus items. Prefer constitutional text over social-media slogans.',
}
