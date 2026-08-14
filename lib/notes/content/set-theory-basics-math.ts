import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked:
 * - Set theory basics for one-paper math: union, intersection, complement, Venn
 * - Standard notation: ∪ intersection ∩, complement A', universal set U
 * - De Morgan name-level optional; keep formulas exam-safe
 * - No invented advanced topology; stay CSS/PPSC one-paper level
 */
export const SET_THEORY_BASICS_MATH_KIT: NoteKitData = {
  id: 'set-theory-basics-math',
  title: 'Set Theory Basics (One-Paper Math)',
  subtitle:
    'Union, intersection, complement, and Venn diagrams for CSS/PPSC general math.',
  syllabusTags: [
    'General math',
    'Set theory',
    'One-paper',
    'Venn diagrams',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS / PPSC',
      directive: 'MCQ fact',
      angle: 'Union and intersection of two sets',
      frequency: 'high',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'Complement and Venn region counting',
      frequency: 'high',
    },
    {
      year: 'NTS / FPSC',
      directive: 'MCQ fact',
      angle: 'n(A ∪ B) formula applications',
      frequency: 'high',
    },
    {
      year: 'One-paper',
      directive: 'Practice',
      angle: 'Two-set and three-set word problems',
      frequency: 'medium',
    },
  ],
  onePager: [
    'A set is a well-defined collection of objects. Elements are members of the set.',
    'Union A ∪ B: elements in A or B or both.',
    'Intersection A ∩ B: elements common to both A and B.',
    'Complement A\' (relative to universal set U): elements in U that are not in A.',
    'Disjoint sets: A ∩ B = empty set (no common elements).',
    'Key counting formula (finite sets): n(A ∪ B) = n(A) + n(B) - n(A ∩ B).',
    'Venn diagrams: circles inside U. Overlap = intersection. Outside A but in U = complement region. Use diagrams to avoid double-counting in word problems.',
  ],
  answerSteps: [
    'Identify the universal set and name the given sets.',
    'Translate words: "both" → intersection; "either/at least one" → union; "not" → complement.',
    'Write the needed formula before arithmetic.',
    'For two sets, use n(A ∪ B) = n(A) + n(B) - n(A ∩ B).',
    'Sketch a Venn diagram and fill known regions from the inside out.',
    'Check that region totals do not exceed n(U).',
  ],
  questionVariants: [
    'If n(A) = 20, n(B) = 15, n(A ∩ B) = 5, find n(A ∪ B).',
    'In a class of 40, 22 passed English, 18 passed Math, 10 passed both. How many passed at least one?',
    'Shade A\' ∩ B on a Venn diagram and state its meaning.',
    'When are two sets called disjoint?',
  ],
  citations: [
    {
      label: 'Union',
      text: 'A ∪ B contains every element that belongs to A, to B, or to both.',
    },
    {
      label: 'Intersection',
      text: 'A ∩ B contains only elements belonging to both A and B.',
    },
    {
      label: 'Complement',
      text: 'A\' contains elements of U that are not members of A.',
    },
    {
      label: 'Counting formula',
      text: 'For finite sets, n(A ∪ B) = n(A) + n(B) - n(A ∩ B).',
    },
  ],
  flashcards: [
    { prompt: 'Symbol for union', answer: '∪' },
    { prompt: 'Symbol for intersection', answer: '∩' },
    { prompt: 'What is A ∪ B?', answer: 'Elements in A or B or both' },
    { prompt: 'What is A ∩ B?', answer: 'Elements common to A and B' },
    { prompt: 'What is A\' (w.r.t. U)?', answer: 'Elements in U but not in A' },
    {
      prompt: 'Formula for n(A ∪ B)',
      answer: 'n(A) + n(B) - n(A ∩ B)',
    },
    {
      prompt: 'When are A and B disjoint?',
      answer: 'When A ∩ B is empty',
    },
    {
      prompt: 'What does the overlap of two Venn circles show?',
      answer: 'A ∩ B',
    },
    {
      prompt: 'At least one of A or B maps to which set op?',
      answer: 'Union A ∪ B',
    },
    {
      prompt: 'Both A and B maps to which set op?',
      answer: 'Intersection A ∩ B',
    },
  ],
  mistakes: [
    {
      trap: 'Adding n(A) + n(B) for union without subtracting intersection.',
      correct: 'Subtract n(A ∩ B) or you double-count the overlap.',
    },
    {
      trap: 'Confusing union with intersection.',
      correct: 'Union = or/both. Intersection = common only.',
    },
    {
      trap: 'Treating complement as opposite numbers only.',
      correct: 'Complement is relative to a stated universal set U.',
    },
    {
      trap: 'Leaving Venn regions inconsistent with n(U).',
      correct: 'Sum of all regions inside U must equal n(U).',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Memorise union, intersection, complement definitions.' },
    { day: 'Day 2', task: 'Drill n(A ∪ B) formula on five numbers.' },
    { day: 'Day 3', task: 'Translate word problems into set symbols.' },
    { day: 'Day 4', task: 'Sketch two-set Venn for three MCQs.' },
    { day: 'Day 5', task: 'Add a simple three-set picture (regions only).' },
    { day: 'Day 6', task: 'Timed set of 15 one-paper MCQs.' },
    { day: 'Day 7', task: 'Flashcards + formula from memory.' },
  ],
  sourcesLine:
    'Sources: standard intermediate set-theory syllabus for one-paper exams (union, intersection, complement, Venn, n(A ∪ B) formula). Keep to CSS/PPSC general math level.',
}
