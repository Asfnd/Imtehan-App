import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (English vocab method for CSS/one-paper):
 * - Method kit: how to learn and solve synonyms/antonyms; not a fake 500-word dump
 * - Context > isolated memorisation; eliminate extremes; watch secondary meanings
 * - Root/prefix/suffix clues; confuse pairs and emotion intensity traps
 */
export const SYNONYMS_ANTONYMS_METHOD_KIT: NoteKitData = {
  id: 'synonyms-antonyms-method',
  title: 'Synonyms and Antonyms Method',
  subtitle:
    'How to prepare and solve synonym/antonym MCQs for CSS and one-paper English without random word dumps.',
  syllabusTags: [
    'English vocabulary',
    'Synonyms',
    'Antonyms',
    'CSS / one-paper method',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS English Precis',
      directive: 'MCQ / pair',
      angle: 'Closest synonym or opposite in meaning',
      frequency: 'high',
    },
    {
      year: 'One-paper / MPT',
      directive: 'MCQ fact',
      angle: 'Synonym or antonym of a given word',
      frequency: 'high',
    },
    {
      year: 'PPSC / NTS / FPSC',
      directive: 'MCQ fact',
      angle: 'Confusable vocabulary pairs',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Usage',
      angle: 'Choose the word closest in meaning in context',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Method first: synonyms mean nearest meaning in the tested sense; antonyms mean opposite in the tested sense. Many words have secondary meanings. Identify the sense before picking.',
    'Solve order: (1) define the stem word in plain English, (2) eliminate options that are unrelated or opposite of what is asked, (3) choose the closest remaining match, not a dramatic cousin.',
    'Intensity trap: furious is stronger than annoyed; gigantic is stronger than large. Synonym keys often want nearest degree, not a louder word.',
    'Word-building: use prefixes (un-, in-, dis-, mis-, anti-) and roots (bene, mal, chron, path, scrib/script) as clues, but verify; prefixes are not always clean opposites (inflammable trap in broader vocab study).',
    'Study system: learn words in mini-families (synonym set + one antonym + one example sentence). Revise with active recall. Do not only read lists. Keep an error log of words you miss twice.',
    'Exam close: if two options seem close, test both in the same sentence frame. For antonyms, watch negating prefixes already on the stem (unbiased vs biased questions). Never invent meanings.',
  ],
  answerSteps: [
    'Read the stem and decide: synonym or antonym.',
    'Paraphrase the stem word in one simple phrase.',
    'Eliminate clearly wrong options.',
    'Compare remaining options for nearest sense and intensity.',
    'Confirm by substituting into a short mental sentence.',
  ],
  questionVariants: [
    'Choose the word nearest in meaning to X.',
    'Choose the opposite of X.',
    'Which option is closest in meaning in the given context?',
    'Identify the antonym of a commonly confused academic word.',
  ],
  citations: [
    {
      label: 'Nearest meaning',
      text: 'Synonym questions ask for the closest meaning in the relevant sense, not a loose associate.',
    },
    {
      label: 'Opposite sense',
      text: 'Antonym questions ask for the opposite in the tested sense, watching secondary meanings.',
    },
    {
      label: 'Intensity',
      text: 'Degree matters: stronger or weaker near-synonyms can be wrong if not nearest.',
    },
    {
      label: 'Study unit',
      text: 'Learn family sets with a sentence, not isolated one-word flash-only cramming.',
    },
    {
      label: 'Substitution check',
      text: 'Test final options by substituting into the same sentence frame.',
    },
  ],
  flashcards: [
    { prompt: 'First step when you see a synonym stem?', answer: 'Paraphrase the stem’s meaning in plain English' },
    { prompt: 'What do synonym keys usually want?', answer: 'Nearest meaning in the tested sense' },
    { prompt: 'What is an intensity trap?', answer: 'Picking a stronger/weaker cousin instead of the nearest word' },
    { prompt: 'Name one useful solve tactic for close options.', answer: 'Substitute both into the same sentence' },
    { prompt: 'What belongs in a vocab study family?', answer: 'Synonym set + antonym + example sentence' },
    { prompt: 'What should you keep for repeated misses?', answer: 'An error log' },
    { prompt: 'Why can secondary meanings trick you?', answer: 'The tested sense may not be the first meaning you recall' },
    { prompt: 'Are prefix clues always safe?', answer: 'Helpful but not always clean; verify the actual word' },
    { prompt: 'What is worse than a short list with sentences?', answer: 'Only passively reading huge word dumps' },
    { prompt: 'For antonyms, what extra check helps?', answer: 'Watch whether the stem already has a negating prefix' },
  ],
  mistakes: [
    {
      trap: 'Picking any related word instead of the nearest synonym.',
      correct: 'Eliminate, then choose closest sense and degree.',
    },
    {
      trap: 'Memorising 1,000 words once with no revision or sentences.',
      correct: 'Use family sets, active recall, and an error log.',
    },
    {
      trap: 'Ignoring that a word has more than one meaning.',
      correct: 'Identify the tested sense first.',
    },
    {
      trap: 'Assuming every un-/in- word is a clean opposite pair in the options.',
      correct: 'Verify meaning; prefix patterns can mislead.',
    },
    {
      trap: 'Inventing a meaning under time pressure.',
      correct: 'Mark only what you can justify; use elimination honestly.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Learn the solve order and intensity trap.' },
    { day: 'Day 2', task: 'Make 10 vocab families with sentences.' },
    { day: 'Day 3', task: 'Do 20 synonym MCQs with elimination notes.' },
    { day: 'Day 4', task: 'Do 20 antonym MCQs; start error log.' },
    { day: 'Day 5', task: 'Revise only error-log words with new sentences.' },
    { day: 'Day 6', task: 'Timed mixed set of 30.' },
    { day: 'Day 7', task: 'One-pager method only. Recite solve order from memory.' },
  ],
  sourcesLine:
    'Sources: CSS English Precis vocabulary patterns; standard one-paper synonym/antonym teaching. Method kit; not a fabricated mega wordlist.',
}
