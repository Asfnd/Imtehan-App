import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (one-paper permutation and combination basics):
 * - Permutation: arrangement where order matters; nPr = n! / (n-r)!
 * - Combination: selection where order does not matter; nCr = n! / (r!(n-r)!)
 * - Relation: nPr = nCr * r!
 * - Factorial: n! = n(n-1)...1; 0! = 1 by definition in exam teaching
 * Keep handwritten MCQ methods; avoid advanced generating functions
 */
export const PERMUTATION_COMBINATION_BASICS_KIT: NoteKitData = {
  id: 'permutation-combination-basics',
  title: 'Permutation and Combination Basics',
  subtitle:
    'Order vs selection, nPr and nCr formulas, and one-paper MCQ method for CSS/PPSC aptitude.',
  syllabusTags: [
    'General math',
    'Permutation',
    'Combination',
    'One-paper math',
    'Aptitude',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'One-paper',
      directive: 'MCQ',
      angle: 'nPr / nCr direct formula',
      frequency: 'high',
    },
    {
      year: 'One-paper',
      directive: 'MCQ',
      angle: 'Order matters vs does not matter word problems',
      frequency: 'high',
    },
    {
      year: 'CSS / PMS aptitude pattern',
      directive: 'Solve',
      angle: 'Committees, passwords, arrangements',
      frequency: 'high',
    },
    {
      year: 'PPSC / NTS',
      directive: 'MCQ',
      angle: '0! and basic factorial facts',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Permutation: counting arrangements where order matters (ranks, passwords, finishing positions).',
    'Combination: counting selections where order does not matter (committees, teams, choosing questions).',
    'Formulas (exam standard): nPr = n! / (n-r)! and nCr = n! / (r!(n-r)!).',
    'Link: nPr = nCr x r!. If you forget which is larger for same n,r: permutations are usually more because order creates extra arrangements.',
    'Factorial: n! = n x (n-1) x ... x 1. By definition in exam teaching, 0! = 1.',
    'Word-problem test: if rearranging the same people changes the outcome, use permutation; if only the group membership matters, use combination.',
    'Typical traps: treating a committee as a permutation; forgetting to divide by r! for combinations; mis-reading "arranged in a line" vs "selected".',
    'Method: identify n and r, decide order yes/no, write formula, cancel factorial factors before multiplying large numbers.',
  ],
  answerSteps: [
    'Read whether order matters (arrangement) or not (selection).',
    'Identify n (total) and r (taken).',
    'Choose nPr or nCr.',
    'Expand or cancel factorials carefully.',
    'Check with the nPr = nCr x r! relation if time allows.',
  ],
  questionVariants: [
    'In how many ways can 5 students be arranged in 3 seats?',
    'In how many ways can a committee of 3 be chosen from 7 people?',
    'If nC2 = 10, find n.',
    'Explain with one example when to use permutation instead of combination.',
  ],
  citations: [
    {
      label: 'Permutation meaning',
      text: 'Permutation counts arrangements where order matters.',
    },
    {
      label: 'Combination meaning',
      text: 'Combination counts selections where order does not matter.',
    },
    {
      label: 'nPr formula',
      text: 'nPr = n! / (n-r)!',
    },
    {
      label: 'nCr formula',
      text: 'nCr = n! / (r!(n-r)!)',
    },
    {
      label: 'Relation and 0!',
      text: 'nPr = nCr x r!; and 0! = 1 in standard exam definition.',
    },
  ],
  flashcards: [
    {
      prompt: 'When do you use permutation?',
      answer: 'When order matters (arrangements)',
    },
    {
      prompt: 'When do you use combination?',
      answer: 'When order does not matter (selections)',
    },
    {
      prompt: 'Formula for nPr?',
      answer: 'n! / (n-r)!',
    },
    {
      prompt: 'Formula for nCr?',
      answer: 'n! / (r!(n-r)!)',
    },
    {
      prompt: 'Relation between nPr and nCr?',
      answer: 'nPr = nCr x r!',
    },
    {
      prompt: 'Value of 0! in exams?',
      answer: '1',
    },
    {
      prompt: 'Committee of k from n: P or C?',
      answer: 'Combination (order usually irrelevant)',
    },
    {
      prompt: 'Password / ranking problems: P or C?',
      answer: 'Permutation (order matters)',
    },
    {
      prompt: 'Quick size check for same n,r?',
      answer: 'nPr is typically larger than nCr because order multiplies arrangements',
    },
  ],
  mistakes: [
    {
      trap: 'Using permutation for unordered committees.',
      correct: 'Committees are usually combinations unless seats/roles are distinct.',
    },
    {
      trap: 'Forgetting the r! in the nCr denominator.',
      correct: 'nCr = n! / (r!(n-r)!).',
    },
    {
      trap: 'Thinking 0! = 0.',
      correct: '0! = 1 by standard exam definition.',
    },
    {
      trap: 'Multiplying huge factorials without cancelling.',
      correct: 'Cancel (n-r)! factors first to reduce arithmetic errors.',
    },
    {
      trap: 'Ignoring distinct roles when seats are labelled.',
      correct: 'If positions are different, order matters: use permutation.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Order vs selection meaning drill.' },
    { day: 'Day 2', task: 'nPr formula with 10 calculations.' },
    { day: 'Day 3', task: 'nCr formula with 10 calculations.' },
    { day: 'Day 4', task: 'Flashcards.' },
    { day: 'Day 5', task: 'Word-problem sort: P vs C.' },
    { day: 'Day 6', task: 'Mixed MCQ set of 20.' },
    { day: 'Day 7', task: 'Recite formulas and relation.' },
  ],
  sourcesLine:
    'Sources: standard one-paper general math notes on permutations and combinations (nPr, nCr, factorial basics). Prefer cancelling factorials by hand over calculator dependence.',
}
