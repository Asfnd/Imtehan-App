import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (standard school / one-paper / CSS sentence correction teaching):
 * - Agreement, modifiers, parallelism, tense consistency, articles
 * - Exam method first: diagnose error type, then repair minimally
 * - Common traps: dangling modifiers, mixed lists, since/for, a/an sound
 * Keep rules mainstream; no idiosyncratic grammar inventions
 */
export const SENTENCE_CORRECTION_METHOD_KIT: NoteKitData = {
  id: 'sentence-correction-method',
  title: 'Sentence Correction Method',
  subtitle:
    'Agreement, modifiers, parallelism, tense consistency, and article errors: diagnose first, then fix for exams.',
  syllabusTags: [
    'English',
    'Sentence correction',
    'Grammar method',
    'CSS / one-paper',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'One-paper / MPT',
      directive: 'Correction',
      angle: 'Subject-verb agreement errors',
      frequency: 'high',
    },
    {
      year: 'PPSC / NTS / FPSC',
      directive: 'Correction',
      angle: 'Articles, modifiers, and tense consistency',
      frequency: 'high',
    },
    {
      year: 'CSS English Precis pattern',
      directive: 'Correction',
      angle: 'Parallelism and misplaced modifiers',
      frequency: 'high',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'Choose the grammatically correct sentence',
      frequency: 'high',
    },
  ],
  onePager: [
    'Method first: find the tested error type before rewriting. Change only what the rule requires.',
    'Agreement: verb matches subject number. Watch distance subjects (The quality of the apples is...). Neither/nor and either/or: verb often agrees with the nearer subject in exam keys. Each/everyone: singular.',
    'Modifiers: a modifier must sit next to what it describes. Dangling: Walking to school, the rain started (wrong). Walking to school, I got wet (clear).',
    'Misplaced modifiers change meaning: She almost failed all tests vs She failed almost all tests.',
    'Parallelism: items in a list must match form. He likes reading, writing, and to swim (wrong) -> reading, writing, and swimming.',
    'Tense consistency: keep one time frame unless meaning needs a shift. Reported speech and since/for are frequent traps. Since + point; for + period. Present perfect with since/for for continuing situations.',
    'Articles: a before consonant sounds; an before vowel sounds (an hour, a university). The for specific/known reference. No article with many general plurals/uncountables.',
    'Exam close: reread the full corrected sentence aloud in your head. If it still sounds split or mixed, check parallelism and modifiers again.',
  ],
  answerSteps: [
    'Label the likely error: agreement, modifier, parallelism, tense, or article.',
    'Underline the subject and verb for agreement questions.',
    'For modifiers, ask what word the phrase is meant to describe.',
    'For lists and paired ideas, force matching grammatical form.',
    'For tense, lock the time signal words (yesterday, since, already).',
    'Apply the smallest correct change, then re-read.',
  ],
  questionVariants: [
    'Choose the grammatically correct sentence.',
    'Correct the error of subject-verb agreement.',
    'Rewrite the sentence to fix the dangling modifier.',
    'Improve parallelism in the following sentence.',
  ],
  citations: [
    {
      label: 'Agreement',
      text: 'Verb agrees with subject number; nearer-subject pattern is common for either/or and neither/nor in exam keys.',
    },
    {
      label: 'Modifiers',
      text: 'Place modifying phrases next to the word they modify to avoid dangling or misplaced meaning.',
    },
    {
      label: 'Parallelism',
      text: 'Coordinate items should share the same grammatical form.',
    },
    {
      label: 'Tense',
      text: 'Keep tense consistent with time markers; since/for and reported speech are high-yield traps.',
    },
    {
      label: 'Articles',
      text: 'a/an follow sound; the marks specific reference in many fixed cases.',
    },
  ],
  flashcards: [
    { prompt: 'First move in sentence correction?', answer: 'Diagnose the error type' },
    { prompt: 'The quality of the apples ___ good. (is/are)', answer: 'is' },
    { prompt: 'Neither of the boys ___ ready. (is/are)', answer: 'is' },
    { prompt: 'Either the teachers or the principal ___ present. (is/are)', answer: 'is (nearer subject)' },
    { prompt: 'What is a dangling modifier?', answer: 'A modifier with no clear word to describe' },
    { prompt: 'Fix idea for dangling modifiers?', answer: 'Make the doer the subject next to the phrase' },
    { prompt: 'She almost failed all tests vs She failed almost all tests: what differs?', answer: 'Placement changes meaning' },
    { prompt: 'reading, writing, and to swim: what is wrong?', answer: 'Broken parallelism' },
    { prompt: 'Correct parallel form of that list?', answer: 'reading, writing, and swimming' },
    { prompt: 'since is used with?', answer: 'A point of time' },
    { prompt: 'for is used with?', answer: 'A period of time' },
    { prompt: 'an hour or a hour?', answer: 'an hour (vowel sound)' },
    { prompt: 'a university or an university?', answer: 'a university (consonant sound)' },
    { prompt: 'Smallest-change rule means?', answer: 'Fix only the grammar error; do not restyle freely' },
    { prompt: 'Final check after correction?', answer: 'Re-read the whole sentence for sense and form match' },
  ],
  mistakes: [
    {
      trap: 'Rewriting style instead of fixing the rule.',
      correct: 'Diagnose the tested rule and make the minimal correct edit.',
    },
    {
      trap: 'Matching the verb to the nearest noun instead of the real subject.',
      correct: 'Find the head subject (quality, not apples) unless a nearer-subject rule applies.',
    },
    {
      trap: 'Leaving dangling opening phrases.',
      correct: 'Put the real doer immediately after the modifying phrase.',
    },
    {
      trap: 'Mixing gerunds and infinitives in one list.',
      correct: 'Keep parallel forms across the list.',
    },
    {
      trap: 'Choosing a/an by spelling only.',
      correct: 'Choose by sound: an hour, a university, an MBA.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Learn the diagnose-then-fix method.' },
    { day: 'Day 2', task: 'Agreement drills (distance subjects, either/or).' },
    { day: 'Day 3', task: 'Modifier placement and dangling fixes.' },
    { day: 'Day 4', task: 'Parallelism lists and paired structures.' },
    { day: 'Day 5', task: 'Tense consistency + since/for.' },
    { day: 'Day 6', task: 'Article sound rules + mixed MCQs.' },
    { day: 'Day 7', task: 'One-pager method checklist from memory.' },
  ],
  sourcesLine:
    'Sources: standard school grammar and one-paper sentence correction patterns used in FPSC/PPSC/NTS and CSS English practice. Prefer mainstream rules; avoid idiosyncratic internet shortcuts.',
}
