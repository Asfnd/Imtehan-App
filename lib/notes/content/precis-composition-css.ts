import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked CSS Precis and Composition method:
 * - Precis: condense in own words; classic teaching often aims near one-third of original length (follow paper instructions)
 * - Needs a suitable title; preserve core meaning; no personal opinion dump
 * - Paper also typically trains comprehension, grammar, vocabulary/idioms, and related composition tasks
 * - Avoid inventing fake official mark splits as absolute law; teach practical method
 */
export const PRECIS_COMPOSITION_CSS_KIT: NoteKitData = {
  id: 'precis-composition-css',
  title: 'Precis and Composition (CSS Method)',
  subtitle:
    'Precis rules, title, comprehension, grammar, and idiom patterns: a practical method for the CSS English paper.',
  syllabusTags: [
    'CSS Precis and Composition',
    'English grammar',
    'Comprehension',
    'FPSC English',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS Precis and Composition',
      directive: 'Make a precis',
      angle: 'Condense a passage with title in own words',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Reading comprehension',
      angle: 'Answer questions strictly from the passage',
      frequency: 'high',
    },
    {
      year: 'CSS / PMS English',
      directive: 'Grammar / usage',
      angle: 'Correction, pairs of words, idioms, sentence use',
      frequency: 'high',
    },
    {
      year: 'Coach pattern',
      directive: 'Method',
      angle: 'One-third length habit, relevance, and no padding',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Precis: short restatement of essential meaning in your own words. Keep the author's stance.',
    'Length teaching: about one-third of the original unless the paper says otherwise. Compression quality beats gaming the number.',
    'Method: read twice, mark essentials, drop examples and repeats, draft in order, then tighten. Usually one continuous paragraph.',
    'Title: short, precise, theme-central. Not a slogan.',
    'Own words: no long copied phrases, no opinions, no first person.',
    'Comprehension: answer from the passage only. Inference still needs textual support. No outside knowledge dump.',
    'Language items: correction, restructuring, pairs of words, prepositions, articles, tense. Learn patterns, not only lists.',
    'Idioms: meaning plus natural sentence use. Translation tasks need sense and grammar, not word-for-word calques.',
    'Timing: plan precis first; protect time for comprehension and objective items. Readability helps the examiner.',
  ],
  answerSteps: [
    'For precis: read the full passage for gist, then again for structure.',
    'List essential points in order; drop stories, repeats, and side colour.',
    'Write a draft in your own words; aim near one-third if that is the taught target and paper allows.',
    'Add a fitting short title; count words if required; revise for clarity.',
    'For comprehension: locate answers in the text before writing.',
    'For grammar/idioms: apply the rule or meaning, then check the full sentence.',
    'Final scan: tense, articles, agreement, and whether any opinion crept into the precis.',
  ],
  questionVariants: [
    'State the rules of precis writing for CSS and explain the one-third teaching.',
    'How should a candidate attempt comprehension without adding outside matter?',
    'What are common grammar traps in the Precis and Composition paper?',
    'Explain how to handle idioms and sentence-use questions under time pressure.',
  ],
  citations: [
    {
      label: 'Precis definition',
      text: 'A condensed restatement of essential meaning in the writer`s own words, faithful to the original sense.',
    },
    {
      label: 'Length teaching',
      text: 'Classic classroom target is about one-third of the original, subject to paper instructions.',
    },
    {
      label: 'Title',
      text: 'A precis normally carries a short, relevant title.',
    },
    {
      label: 'Comprehension rule',
      text: 'Answers must be grounded in the given passage.',
    },
    {
      label: 'Language items',
      text: 'Grammar, usage, idioms, and related composition tasks test accuracy and sense, not decoration.',
    },
  ],
  flashcards: [
    { prompt: 'What is a precis?', answer: 'Short restatement of essential meaning in your own words' },
    { prompt: 'Classic length target?', answer: 'About one-third of the original (follow paper instructions)' },
    { prompt: 'May precis include your opinion?', answer: 'No' },
    { prompt: 'Copy long passage chunks?', answer: 'No. Use your own words.' },
    { prompt: 'What kind of title?', answer: 'Short, precise, central to the theme' },
    { prompt: 'What to cut while condensing?', answer: 'Repetition, excess examples, non-essential colour' },
    { prompt: 'Main comprehension rule?', answer: 'Answer from the passage only' },
    { prompt: 'Pair-of-words tests?', answer: 'Correct word choice and usage in context' },
    { prompt: 'Idiom answer usually needs?', answer: 'Correct meaning and a natural sentence when asked' },
    { prompt: 'Common grammar foci?', answer: 'Tense, articles, prepositions, subject-verb agreement' },
    { prompt: 'First person in precis?', answer: 'No' },
    { prompt: 'First step before drafting?', answer: 'Read for gist, then mark essential points' },
    { prompt: 'What is a calque error?', answer: 'Word-for-word rendering that breaks English sense or grammar' },
    { prompt: 'Why count words when required?', answer: 'To meet the paper's length instruction after condensation' },
    { prompt: 'End check for language items?', answer: 'Full-sentence correctness, not only the target word' },
  ],
  mistakes: [
    {
      trap: 'Half-length summary plus personal comments.',
      correct: 'Essentials only, own words, no opinion, near one-third if that is the target.',
    },
    {
      trap: 'Flashy or vague title unrelated to the theme.',
      correct: 'Title must name the central idea precisely.',
    },
    {
      trap: 'Comprehension answers from general knowledge not in the text.',
      correct: 'Stay inside the passage.',
    },
    {
      trap: 'Knowing idiom meanings but failing sentence use.',
      correct: 'Learn meaning plus natural sentence patterns.',
    },
    {
      trap: 'Treating a coach's fake mark sheet as official FPSC law.',
      correct: 'Follow that year's paper instructions; practise skills, not mythical grids.',
    },
    {
      trap: 'Changing the author's stance while shortening.',
      correct: 'Preserve original sense and emphasis.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Learn precis rules and one-third teaching.' },
    { day: 'Day 2', task: 'Practise two short precis with titles and word counts.' },
    { day: 'Day 3', task: 'Comprehension drill: locate-then-answer habit.' },
    { day: 'Day 4', task: 'Grammar patterns: articles, agreement, prepositions.' },
    { day: 'Day 5', task: 'Idioms and pair-of-words sentence practice.' },
    { day: 'Day 6', task: 'Full timed precis + comprehension set.' },
    { day: 'Day 7', task: 'One-pager method only. Recite precis steps from memory.' },
  ],
  sourcesLine:
    'Sources: Standard CSS Precis and Composition coaching on condensation, titles, comprehension discipline, and grammar/idiom practice; follow each year`s FPSC paper wording. Avoid unsourced official-mark myths.',
}
