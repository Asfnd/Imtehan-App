import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (one-paper / general math algebra teaching):
 * - Linear equations in one variable; balancing method; word problems (age, numbers, consecutive integers)
 * - ax + b = c form; clearing fractions; cross-check by substitution
 * - Avoid inventing exotic contest algebra beyond syllabus
 */
export const ALGEBRA_LINEAR_EQUATIONS_KIT: NoteKitData = {
  id: 'algebra-linear-equations',
  title: 'Algebra: Linear Equations',
  subtitle:
    'One-variable linear equations, balancing steps, and classic word-problem patterns for one-paper math.',
  syllabusTags: [
    'General Math',
    'Algebra',
    'Linear equations',
    'One-paper arithmetic',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'One-paper / MPT',
      directive: 'Solve',
      angle: 'Find x in a linear equation',
      frequency: 'high',
    },
    {
      year: 'PPSC / NTS / FPSC',
      directive: 'Word problem',
      angle: 'Age, consecutive numbers, sum/difference problems',
      frequency: 'high',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'Choose correct value after simplifying ax + b = c',
      frequency: 'high',
    },
    {
      year: 'General math pattern',
      directive: 'Solve',
      angle: 'Equations with fractions or brackets',
      frequency: 'medium',
    },
  ],
  onePager: [
    'A linear equation in one variable can be written as ax + b = c (or equivalent after simplifying), with a not zero. Goal: isolate x using inverse operations.',
    'Balancing rule: whatever you do to one side, do to the other. Add/subtract first to move constants; multiply/divide to clear the coefficient of x. Keep signs careful.',
    'Brackets: expand using distributive law, then collect like terms. Fractions: multiply through by the LCD (least common denominator) to clear denominators before isolating x.',
    'Word-problem method: define x as the unknown in one sentence; translate English to algebra; solve; check in the original story (not only in the simplified equation).',
    'Classic patterns: consecutive integers (x, x+1, x+2); even consecutives (x, x+2); age (present ages, “n years ago/hence”); sum and difference; one number is k times another.',
    'Error check: substitute your answer back. If options are given, plug options when algebra gets messy. Watch sign errors when moving terms across the equals sign.',
  ],
  answerSteps: [
    'Simplify: expand brackets and clear fractions if needed.',
    'Collect like terms on each side.',
    'Move variable terms to one side and constants to the other.',
    'Divide by the coefficient of x.',
    'Substitute back to verify.',
  ],
  questionVariants: [
    'Solve for x: 3x - 7 = 11.',
    'The sum of three consecutive integers is 48. Find them.',
    'A father is 3 times as old as his son. In 12 years he will be twice as old. Find present ages.',
    'Solve: (x/2) + (x/3) = 10.',
  ],
  citations: [
    {
      label: 'Form',
      text: 'Linear one-variable equations reduce to ax + b = c with a not zero.',
    },
    {
      label: 'Balance',
      text: 'Apply the same operation to both sides to isolate x.',
    },
    {
      label: 'Fractions',
      text: 'Clear denominators by multiplying through by the LCD.',
    },
    {
      label: 'Word problems',
      text: 'Define x clearly, translate, solve, then check in the story context.',
    },
    {
      label: 'Verification',
      text: 'Substitute the solution into the original equation or options.',
    },
  ],
  flashcards: [
    { prompt: 'What is the goal when solving ax + b = c?', answer: 'Isolate x using inverse operations on both sides' },
    { prompt: 'What is the balancing rule?', answer: 'Do the same operation to both sides' },
    { prompt: 'How do you clear fractions?', answer: 'Multiply every term by the LCD' },
    { prompt: 'Three consecutive integers starting at x?', answer: 'x, x+1, x+2' },
    { prompt: 'Two consecutive even integers starting at x?', answer: 'x, x+2' },
    { prompt: 'First step with brackets?', answer: 'Expand (distributive law), then collect like terms' },
    { prompt: 'Best final check?', answer: 'Substitute x back into the original equation' },
    { prompt: 'Solve 3x - 7 = 11. What is x?', answer: 'x = 6' },
    { prompt: 'What often causes wrong MCQ picks?', answer: 'Sign errors when moving terms' },
    { prompt: 'If algebra is messy and options exist, what shortcut helps?', answer: 'Plug options into the original equation' },
  ],
  mistakes: [
    {
      trap: 'Adding to one side and forgetting the other.',
      correct: 'Always balance both sides.',
    },
    {
      trap: 'Writing consecutive integers as x, x+2, x+4 when odds/evens were not asked.',
      correct: 'Ordinary consecutives are x, x+1, x+2.',
    },
    {
      trap: 'Checking only a simplified equation after an early expand error.',
      correct: 'Check in the original equation or the word-problem story.',
    },
    {
      trap: 'Dividing only one term by the coefficient of x.',
      correct: 'Divide the entire side (every term) correctly when isolating x.',
    },
    {
      trap: 'Translating “n years ago” with the wrong sign.',
      correct: 'Ages n years ago are current minus n; hence are current plus n.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Drill 15 plain ax + b = c equations.' },
    { day: 'Day 2', task: 'Practice brackets and collecting like terms.' },
    { day: 'Day 3', task: 'Practice fraction-clearing equations.' },
    { day: 'Day 4', task: 'Consecutive number word problems.' },
    { day: 'Day 5', task: 'Age word problems with check.' },
    { day: 'Day 6', task: 'Mixed timed set of 20.' },
    { day: 'Day 7', task: 'One-pager only. Recite solve steps from memory.' },
  ],
  sourcesLine:
    'Sources: standard one-paper general math algebra chapters on linear equations and word problems. Keep to syllabus patterns; avoid contest-only tricks.',
}
