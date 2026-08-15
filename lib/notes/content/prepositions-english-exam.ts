import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked high-yield exam prepositions:
 * Standard fixed combinations frequently tested in CSS Precis, PMS, and one-paper English:
 * interested in, depend on, accuse of, charged with, good at, afraid of, different from,
 * prefer X to Y, responsible for, congratulated on, prevent from, look forward to, etc.
 * Method: learn verb/adjective + preposition chunks; do not invent rare variants as the only correct form
 */
export const PREPOSITIONS_ENGLISH_EXAM_KIT: NoteKitData = {
  id: 'prepositions-english-exam',
  title: 'Prepositions for English Exams',
  subtitle:
    'High-yield fixed preposition combinations and trap patterns for CSS Precis, PMS, and one-paper English.',
  syllabusTags: [
    'English grammar',
    'Prepositions',
    'Precis and composition',
    'One-paper English',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS Precis',
      directive: 'MCQ / fill',
      angle: 'Fixed preposition after verbs and adjectives',
      frequency: 'high',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'interested in; depend on; accuse of; prefer to',
      frequency: 'high',
    },
    {
      year: 'PMS English',
      directive: 'Correct the sentence',
      angle: 'Wrong preposition errors',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Practice',
      angle: 'Prepositional phrases in sentence correction',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Exam prepositions are mostly fixed chunks: adjective/verb + preposition. Memorise pairs, then test in full sentences.',
    'Interest and skill: interested in; keen on; good at; weak in/at (both appear; prefer the option taught by your key).',
    'Blame and charge: accuse of; charge with; blame for; convict of; guilty of.',
    'Dependence and difference: depend on; rely on; different from; similar to; compare with/to (know both patterns; follow the stem).',
    'Preference and prevention: prefer A to B; prevent from; prohibit from; refrain from.',
    'Time and place traps: arrive in (city/country), arrive at (station/airport); discuss (no preposition before the topic); marry (no with in standard exam keys).',
    'Common verbs: congratulate on; apologise for; belong to; consist of; look forward to (+ gerund); object to; succeed in.',
    'Method: eliminate options that break the fixed chunk; watch for of/from/with/on swaps.',
    'Answer close: fifty high-yield pairs beat long theory. Drill daily with wrong-preposition sentences.',
  ],
  answerSteps: [
    'Treat prepositions as fixed collocations, not free translation.',
    'Group by meaning: blame, preference, dependence, skill.',
    'Drill arrive in/at and discuss/marry traps.',
    'Practise look forward to + gerund.',
    'Do timed MCQ sets with of/from/on swaps.',
    'Review a personal error list weekly.',
  ],
  questionVariants: [
    'Correct the prepositions in the following sentences.',
    'Fill in the blanks with suitable prepositions.',
    'Choose the correct preposition after interested / accuse / prefer.',
    'Explain why discuss and marry often take no preposition in exam English.',
  ],
  citations: [
    {
      label: 'Fixed chunks',
      text: 'Exam English rewards memorised verb/adjective + preposition combinations.',
    },
    {
      label: 'Blame set',
      text: 'accuse of; charge with; blame for; guilty of are classic one-paper traps.',
    },
    {
      label: 'Preference',
      text: 'prefer A to B is the standard exam pattern.',
    },
    {
      label: 'Arrive trap',
      text: 'arrive in a city/country; arrive at a station, airport, or specific place.',
    },
    {
      label: 'No-preposition verbs',
      text: 'discuss a topic and marry someone are frequent wrong-with traps in keys.',
    },
  ],
  flashcards: [
    { prompt: 'interested ___', answer: 'in' },
    { prompt: 'depend / rely ___', answer: 'on' },
    { prompt: 'accuse ___ / charge ___', answer: 'of / with' },
    { prompt: 'prefer A ___ B', answer: 'to' },
    { prompt: 'good ___ maths', answer: 'at' },
    { prompt: 'different ___ / similar ___', answer: 'from / to' },
    { prompt: 'congratulate ___ / apologise ___', answer: 'on / for' },
    { prompt: 'prevent ___ / look forward ___', answer: 'from / to' },
    { prompt: 'arrive ___ Lahore / arrive ___ the airport', answer: 'in / at' },
    { prompt: 'discuss ___ the plan (exam key)', answer: 'no preposition (discuss the plan)' },
    { prompt: 'consist ___ / belong ___', answer: 'of / to' },
    { prompt: 'responsible ___ / guilty ___', answer: 'for / of' },
  ],
  mistakes: [
    {
      trap: 'interested on / interested for',
      correct: 'interested in',
    },
    {
      trap: 'accuse with / charge of (swapped)',
      correct: 'accuse of; charge with',
    },
    {
      trap: 'prefer A than B',
      correct: 'prefer A to B (than belongs with rather/comparative patterns)',
    },
    {
      trap: 'discuss about / marry with in exam keys',
      correct: 'discuss the issue; marry someone',
    },
    {
      trap: 'arrive at Pakistan / arrive in the airport',
      correct: 'arrive in Pakistan; arrive at the airport',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Blame and charge pair set.' },
    { day: 'Day 2', task: 'Interest, skill, dependence pairs.' },
    { day: 'Day 3', task: 'Arrive/discuss/marry traps.' },
    { day: 'Day 4', task: 'Flashcards.' },
    { day: 'Day 5', task: '30 wrong-preposition sentences.' },
    { day: 'Day 6', task: 'Timed MCQ set.' },
    { day: 'Day 7', task: 'Personal error list only.' },
  ],
  sourcesLine:
    'Sources: standard CSS Precis and one-paper English preposition lists and sentence-correction keys. Memorise chunks; ignore rare contested variants unless your key specifies them.',
}
