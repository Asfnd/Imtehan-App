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
    'Precis writing: a short, clear restatement of a passage`s essential meaning in your own words, without changing the author`s stance.',
    'Classic teaching target: about one-third of the original length, unless the paper gives another instruction. Count words if required. Quality of compression matters more than gaming the number.',
    'Method: read twice, underline key points, ignore examples and repetition, draft in logical order, then tighten. Write in continuous prose, usually one paragraph unless told otherwise.',
    'Title: short, precise, and central to the theme. Not a slogan and not a full sentence essay title unless it truly fits.',
    'Own words rule: do not copy long phrases. Do not add your opinions, examples, or criticism. Do not use first person.',
    'Comprehension: answer only from the passage. Quotation questions need accuracy. Inference questions still need textual support. Do not import outside knowledge as if it were in the text.',
    'Grammar and usage: expect error correction, sentence restructuring, pair of words, prepositions, articles, and tense consistency. Learn patterns, not only word lists.',
    'Idioms and phrases: know meaning and use in a natural sentence. Translation or Urdu-to-English style tasks (when set) need sense, grammar, and register, not word-for-word calques.',
    'Exam timing: attempt precis with a clean draft plan first; leave time for comprehension and objective language items. Neatness and readability help the examiner.',
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
    { prompt: 'What is a precis?', answer: 'A short restatement of a passage`s essential meaning in your own words' },
    { prompt: 'Classic length teaching for precis?', answer: 'About one-third of the original (follow paper instructions)' },
    { prompt: 'Should a precis include your opinion?', answer: 'No' },
    { prompt: 'Should you copy long chunks from the passage?', answer: 'No, use your own words' },
    { prompt: 'What kind of title should you give?', answer: 'Short, precise, and central to the theme' },
    { prompt: 'What should you remove while condensing?', answer: 'Repetition, excess examples, and non-essential colour' },
    { prompt: 'Main comprehension rule?', answer: 'Answer from the passage only' },
    { prompt: 'What is a pair-of-words question testing?', answer: 'Correct word choice and usage in context' },
    { prompt: 'What must an idiom answer usually show?', answer: 'Correct meaning and a natural sentence use when asked' },
    { prompt: 'Name a common grammar focus area.', answer: 'Tense consistency, articles, prepositions, or subject-verb agreement' },
    { prompt: 'Is first person normally used in precis?', answer: 'No' },
    { prompt: 'First step before writing the precis draft?', answer: 'Read for gist, then mark essential points' },
    { prompt: 'What is a calque error in translation-style tasks?', answer: 'Word-for-word rendering that breaks English sense or grammar' },
    { prompt: 'Why count words when required?', answer: 'To meet the paper`s length instruction after condensation' },
    { prompt: 'What should you check at the end of language items?', answer: 'Full-sentence correctness, not only the target word' },
  ],
  mistakes: [
    {
      trap: 'Writing a summary that is still half the passage plus personal comments.',
      correct: 'Cut to essentials, own words, no opinion, near one-third if that is the target.',
    },
    {
      trap: 'Using a vague or flashy title unrelated to the core theme.',
      correct: 'Title must name the central idea precisely.',
    },
    {
      trap: 'Answering comprehension from general knowledge not in the text.',
      correct: 'Stay inside the passage.',
    },
    {
      trap: 'Memorising idiom meanings but failing to use them in a correct sentence.',
      correct: 'Learn meaning plus natural sentence patterns.',
    },
    {
      trap: 'Treating a coach`s fake mark sheet as official FPSC law.',
      correct: 'Follow the year`s paper instructions; practise skills, not mythical grids.',
    },
    {
      trap: 'Changing the author`s stance while shortening (e.g. turning neutral analysis into praise or attack).',
      correct: 'Preserve the original sense and emphasis.',
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
