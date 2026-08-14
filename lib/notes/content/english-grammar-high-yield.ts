import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (standard school / one-paper English grammar teaching):
 * - Subject-verb agreement, articles (a/an/the), prepositions, tense traps
 * - Active vs passive; direct vs indirect (reported) speech
 * - MCQ-oriented rules with common exam traps
 * Keep explanations simple; no invented idiosyncratic rules
 */
export const ENGLISH_GRAMMAR_HIGH_YIELD_KIT: NoteKitData = {
  id: 'english-grammar-high-yield',
  title: 'English Grammar High-Yield for One-Paper Exams',
  subtitle:
    'Agreement, articles, prepositions, tense traps, voice, and reported speech for MCQ scoring.',
  syllabusTags: [
    'English',
    'Grammar',
    'One-paper exams',
    'CSS MPT / PPSC / NTS',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'One-paper / MPT',
      directive: 'MCQ fact',
      angle: 'Subject-verb agreement and article choice',
      frequency: 'high',
    },
    {
      year: 'PPSC / NTS / FPSC',
      directive: 'MCQ fact',
      angle: 'Prepositions and tense correction',
      frequency: 'high',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'Active/passive and direct/indirect speech',
      frequency: 'high',
    },
    {
      year: 'CSS English Precis pattern',
      directive: 'Correction',
      angle: 'Sentence correction under grammar rules',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Subject-verb agreement: singular subject takes singular verb; plural subject takes plural verb. Watch collective nouns, neither/nor, either/or, each, everyone, and distance subjects (The quality of the apples is...).',
    'Neither of the boys is ready. Either A or B: verb agrees with the nearer subject. Each and every take singular verbs in standard exam keys.',
    'Articles: a before consonant sounds; an before vowel sounds (an hour, a university). The for specific/known nouns, unique things, and many proper geographic names by fixed usage.',
    'No article often with general plural/uncountable sense (Books are useful; Honesty is best). Exam traps mix sound vs spelling (an MBA; a European).',
    'Prepositions: depend on, interested in, good at, accuse of, prefer to, different from, arrive at/in, angry with a person / angry at a thing (common key patterns). Memorise fixed pairs.',
    'Tense traps: since + point of time with present perfect; for + period. If clauses: If he comes (not will come) in first conditional. Sequence of tenses in reported speech.',
    'Active to passive: object becomes subject; be + past participle; agent with by if needed. Keep tense: writes -> is written; wrote -> was written; will write -> will be written.',
    'Direct to indirect: remove quotes; adjust pronouns; shift tense back when reporting verb is past (said); change time/place words (now/then, today/that day, here/there) by standard tables.',
  ],
  answerSteps: [
    'For MCQs, identify the tested rule first (agreement, article, preposition, tense, voice, speech).',
    'Eliminate options that break the fixed pattern (wrong preposition pair or wrong singular/plural).',
    'For voice/speech, rewrite mechanically: find object/tense or reporting verb and apply the shift table.',
    'In sentence correction, change only what the rule requires. Do not rewrite style.',
    'Close practice sets by listing your personal trap list (since/for, neither/nor, a/an sound).',
  ],
  questionVariants: [
    'Choose the correct verb form for neither/nor and either/or sentences.',
    'Fill in the blank with a, an, or the.',
    'Convert the sentence from active to passive voice.',
    'Change the sentence from direct speech to indirect speech.',
  ],
  citations: [
    {
      label: 'Agreement',
      text: 'Verb agrees with the subject in number. Nearer-subject rule for either/or and neither/nor is standard in exam keys.',
    },
    {
      label: 'Articles',
      text: 'a/an follow sound, not only spelling. the marks specific or unique reference in many fixed cases.',
    },
    {
      label: 'Voice',
      text: 'Passive uses be + past participle; tense of be matches the active tense pattern.',
    },
    {
      label: 'Reported speech',
      text: 'With a past reporting verb, tenses usually shift one step back; pronouns and time words adjust.',
    },
  ],
  flashcards: [
    {
      prompt: 'Neither of the students ___ present. (is/are)',
      answer: 'is',
    },
    {
      prompt: 'The quality of these mangoes ___ good. (is/are)',
      answer: 'is',
    },
    {
      prompt: 'Either the teacher or the students ___ late. (is/are)',
      answer: 'are (agree with nearer subject)',
    },
    {
      prompt: 'Each of the players ___ ready. (is/are)',
      answer: 'is',
    },
    {
      prompt: 'Use a or an before "hour"?',
      answer: 'an hour (vowel sound)',
    },
    {
      prompt: 'Use a or an before "university"?',
      answer: 'a university (consonant "yoo" sound)',
    },
    {
      prompt: 'Interested ___ music.',
      answer: 'in',
    },
    {
      prompt: 'Depend ___ your parents. / Depend ___ help.',
      answer: 'on',
    },
    {
      prompt: 'Good ___ mathematics.',
      answer: 'at',
    },
    {
      prompt: 'Prefer tea ___ coffee.',
      answer: 'to',
    },
    {
      prompt: 'Accused ___ theft.',
      answer: 'of',
    },
    {
      prompt: 'I have lived here ___ 2010. (since/for)',
      answer: 'since',
    },
    {
      prompt: 'I have lived here ___ ten years. (since/for)',
      answer: 'for',
    },
    {
      prompt: 'If he ___ , I will go. (comes/will come)',
      answer: 'comes',
    },
    {
      prompt: 'Active: She writes a letter. Passive?',
      answer: 'A letter is written by her',
    },
    {
      prompt: 'Active: They built the bridge. Passive?',
      answer: 'The bridge was built by them',
    },
    {
      prompt: 'Direct: He said, "I am busy." Indirect?',
      answer: 'He said that he was busy',
    },
    {
      prompt: 'In indirect speech after said, "now" often becomes?',
      answer: 'then',
    },
    {
      prompt: 'In indirect speech after said, "today" often becomes?',
      answer: 'that day',
    },
    {
      prompt: 'Different ___ what I expected. (from/than common exam key)',
      answer: 'from',
    },
  ],
  mistakes: [
    {
      trap: 'Choosing are after neither of + plural noun.',
      correct: 'Standard exam key: Neither of the boys is...',
    },
    {
      trap: 'Writing an university because university starts with u.',
      correct: 'Use sound: a university. Use an hour, an MBA.',
    },
    {
      trap: 'Using since with a period of time (since ten years).',
      correct: 'since + point (2010). for + period (ten years).',
    },
    {
      trap: 'Keeping present tense after a past reporting verb in indirect speech.',
      correct: 'He said, "I am busy" -> He said that he was busy.',
    },
    {
      trap: 'Making passive without a past participle.',
      correct: 'Passive needs be + past participle (written, built, taken).',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Drill subject-verb agreement traps (each, neither, quality of).' },
    { day: 'Day 2', task: 'Practice a/an/the with sound-based examples.' },
    { day: 'Day 3', task: 'Memorise 15 fixed preposition pairs.' },
    { day: 'Day 4', task: 'Tense traps: since/for and first conditional.' },
    { day: 'Day 5', task: 'Active/passive conversion drills.' },
    { day: 'Day 6', task: 'Direct/indirect speech shift table practice.' },
    { day: 'Day 7', task: 'Mixed MCQ set + flashcards. List personal weak traps.' },
  ],
  sourcesLine:
    'Sources: standard school and one-paper English grammar rules (agreement, articles, prepositions, tense, voice, reported speech) as used in FPSC/PPSC/NTS keys. Prefer fixed exam patterns over disputed edge cases.',
}
