import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (English grammar conditionals for exams):
 * - Zero: If + present, present (general truths)
 * - First: If + present, will/can/may + base (real future)
 * - Second: If + past simple, would/could/might + base (unreal present/future)
 * - Third: If + past perfect, would have + past participle (unreal past)
 * - Mixed and unless/as long as appear as traps; keep one-paper methods clear
 * No en/em dashes in student-facing text
 */
export const CONDITIONALS_ENGLISH_GRAMMAR_KIT: NoteKitData = {
  id: 'conditionals-english-grammar',
  title: 'Conditionals (English Grammar)',
  subtitle:
    'Zero, first, second, and third conditionals with exam traps for CSS precis/composition and one-paper English.',
  syllabusTags: [
    'English grammar',
    'Conditionals',
    'If clauses',
    'Sentence correction',
    'Precis and composition',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'One-paper',
      directive: 'MCQ',
      angle: 'Choose correct conditional form',
      frequency: 'high',
    },
    {
      year: 'CSS Precis / Composition',
      directive: 'Correct',
      angle: 'If-clause tense errors',
      frequency: 'high',
    },
    {
      year: 'PPSC / NTS',
      directive: 'MCQ',
      angle: 'Second vs third conditional',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Rewrite',
      angle: 'Real vs unreal conditions',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Conditional sentences link a condition (usually if-clause) with a result clause. Exam skill: match time meaning to the correct tense pattern.',
    'Zero conditional: If + present simple, present simple. Use for general truths and scientific facts. Example pattern: If you heat ice, it melts.',
    'First conditional: If + present simple, will/can/may + base verb. Use for real or likely future results. Example pattern: If she studies, she will pass.',
    'Second conditional: If + past simple, would/could/might + base verb. Use for unreal or unlikely present/future. Example pattern: If I were rich, I would travel. (were is common in formal teaching for all persons.)',
    'Third conditional: If + past perfect, would have/could have/might have + past participle. Use for unreal past (regret or missed possibility). Example pattern: If he had left earlier, he would have caught the train.',
    'unless = if not. as long as / provided that = only if (conditions). Do not mix third-conditional result forms with first-conditional if-clauses.',
    'Common trap: using will inside the if-clause for ordinary first conditionals (usually wrong in exam keys). Keep will in the result clause.',
    'Method: decide real vs unreal and present/future vs past, then pick zero/first/second/third.',
  ],
  answerSteps: [
    'Read the meaning: truth, real future, unreal now, or unreal past.',
    'Choose zero, first, second, or third pattern.',
    'Check if-clause tense and result-clause modal form separately.',
    'Watch traps: will in if-clause; would have with wrong if-tense.',
    'Rewrite and read aloud for meaning consistency.',
  ],
  questionVariants: [
    'If he _____ harder, he would have succeeded. (work / worked / had worked)',
    'Correct the sentence: If it will rain, we will cancel the match.',
    'Make a second conditional from: I am not the president, so I do not change the law.',
    'Explain the difference between second and third conditionals with one example each.',
  ],
  citations: [
    {
      label: 'Zero conditional',
      text: 'If + present simple, present simple for general truths.',
    },
    {
      label: 'First conditional',
      text: 'If + present simple, will/can/may + base for real future results.',
    },
    {
      label: 'Second conditional',
      text: 'If + past simple, would/could/might + base for unreal present/future.',
    },
    {
      label: 'Third conditional',
      text: 'If + past perfect, would have + past participle for unreal past.',
    },
    {
      label: 'Exam trap',
      text: 'Ordinary first conditionals usually keep will in the result clause, not inside the if-clause.',
    },
  ],
  flashcards: [
    {
      prompt: 'Zero conditional pattern?',
      answer: 'If + present, present (general truths)',
    },
    {
      prompt: 'First conditional pattern?',
      answer: 'If + present, will/can/may + base (real future)',
    },
    {
      prompt: 'Second conditional pattern?',
      answer: 'If + past simple, would/could/might + base (unreal now/future)',
    },
    {
      prompt: 'Third conditional pattern?',
      answer: 'If + past perfect, would have + past participle (unreal past)',
    },
    {
      prompt: 'Unless means?',
      answer: 'If not',
    },
    {
      prompt: 'Which conditional expresses regret about the past?',
      answer: 'Third conditional',
    },
    {
      prompt: 'Is "If it will rain, we will cancel" usually correct in exam keys?',
      answer: 'No; use present in the if-clause: If it rains, we will cancel',
    },
    {
      prompt: 'Why use "If I were" in second conditional teaching?',
      answer: 'Formal unreal present; were often taught for all persons',
    },
    {
      prompt: 'Quick method to choose the type?',
      answer: 'Decide real vs unreal and present/future vs past',
    },
  ],
  mistakes: [
    {
      trap: 'Putting will in the if-clause of a normal first conditional.',
      correct: 'Use present in the if-clause; keep will in the result clause.',
    },
    {
      trap: 'Using second-conditional form for a completed past regret.',
      correct: 'Past regrets need third conditional (had + would have).',
    },
    {
      trap: 'Mixing if + past perfect with will + base.',
      correct: 'Past perfect if-clause pairs with would have + past participle.',
    },
    {
      trap: 'Treating unless as if.',
      correct: 'unless means if not.',
    },
    {
      trap: 'Memorising labels without meaning.',
      correct: 'Always map to real/unreal and time before choosing the pattern.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Zero and first patterns with 5 examples.' },
    { day: 'Day 2', task: 'Second conditional + were usage.' },
    { day: 'Day 3', task: 'Third conditional regret sentences.' },
    { day: 'Day 4', task: 'Flashcards.' },
    { day: 'Day 5', task: 'Error-correction drill (will in if-clause traps).' },
    { day: 'Day 6', task: 'Mixed MCQ set of 20.' },
    { day: 'Day 7', task: 'Recite one-pager patterns only.' },
  ],
  sourcesLine:
    'Sources: standard CSS/PMS English grammar notes on conditional clauses (zero to third), plus one-paper sentence-correction practice. Focus on tense pairing, not rare stylistic exceptions.',
}
