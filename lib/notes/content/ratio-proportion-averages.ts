import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked:
 * - Ratio a:b = a/b; simplify by common factor; parts sum method for division problems
 * - Proportion a:b = c:d means a/b = c/d so ad = bc (product of extremes = product of means)
 * - Average (arithmetic mean) = sum of observations / number of observations
 * - Weighted average = sum(value*weight) / sum(weights)
 * - Combined average when groups merge: total sum / total count (not average of averages unless equal size)
 * - Distinct from percentages-ratios-profit-loss kit: focus methods for ratio, proportion, averages
 */
export const RATIO_PROPORTION_AVERAGES_KIT: NoteKitData = {
  id: 'ratio-proportion-averages',
  title: 'Ratio, Proportion and Averages',
  subtitle:
    'Method-first math kit for PPSC and CSS MPT: ratio parts, proportion cross-products, mean and weighted average traps.',
  syllabusTags: [
    'General math',
    'Ratio and proportion',
    'Averages',
    'One-paper math',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'Simplify ratios and divide quantities in a given ratio',
      frequency: 'high',
    },
    {
      year: 'PPSC / NTS',
      directive: 'MCQ fact',
      angle: 'Proportion / missing term using ad = bc',
      frequency: 'high',
    },
    {
      year: 'CSS MPT',
      directive: 'MCQ fact',
      angle: 'Average and weighted average',
      frequency: 'high',
    },
    {
      year: 'PPSC',
      directive: 'MCQ fact',
      angle: 'Combined average of two groups',
      frequency: 'high',
    },
  ],
  onePager: [
    'Ratio: comparison of two quantities of the same kind. a:b means a/b. Always simplify by the greatest common factor when possible.',
    'Dividing a quantity Q in ratio a:b: first part = Q * a/(a+b); second = Q * b/(a+b). For a:b:c use sum a+b+c.',
    'Proportion: equality of two ratios. If a:b = c:d then a/b = c/d and ad = bc. Extremes a,d; means b,c.',
    'Direct proportion: as x rises, y rises (y = kx). Inverse proportion: as x rises, y falls (xy = k). Read the word problem carefully.',
    'Arithmetic mean (average) = (sum of values) / (number of values).',
    'Weighted average = sum(value_i * weight_i) / sum(weights). Use when groups have different sizes or importance.',
    'Merging groups: new average = (n1*avg1 + n2*avg2) / (n1+n2). Never average the two averages unless n1 = n2.',
    'Speed trick link (optional): average speed for equal distances is harmonic-related; for equal times use arithmetic mean. Only if the stem asks.',
  ],
  answerSteps: [
    'Identify whether the stem is ratio division, proportion missing term, or average.',
    'For ratio division, write parts over sum of parts.',
    'For proportion, set ad = bc and solve the unknown.',
    'For averages, compute total sum first; for weighted/combined, multiply by counts.',
    'Check units and whether the question wants a ratio, a quantity, or an average.',
    'Eliminate options that averaged averages of unequal groups.',
  ],
  questionVariants: [
    'Divide 840 in the ratio 3:4. Find each part.',
    'If 5:x = 20:36, find x.',
    'The average of 5 numbers is 12. If one number 18 is replaced by 8, what is the new average?',
    'Two groups of 20 and 30 students have averages 60 and 70. Find the combined average.',
  ],
  citations: [
    {
      label: 'Ratio division',
      text: 'Quantity Q in ratio a:b gives parts Q*a/(a+b) and Q*b/(a+b).',
    },
    {
      label: 'Proportion',
      text: 'If a:b = c:d then ad = bc.',
    },
    {
      label: 'Mean',
      text: 'Arithmetic mean = sum of observations divided by their count.',
    },
    {
      label: 'Combined average',
      text: 'Combined average = (n1*avg1 + n2*avg2) / (n1+n2).',
    },
  ],
  flashcards: [
    { prompt: 'What does a:b mean as a fraction?', answer: 'a/b' },
    { prompt: 'Formula to split Q in a:b?', answer: 'Qa/(a+b) and Qb/(a+b)' },
    { prompt: 'If a:b = c:d, which products are equal?', answer: 'ad = bc' },
    { prompt: 'Arithmetic mean formula?', answer: 'Sum of values / number of values' },
    { prompt: 'Weighted average idea?', answer: 'Sum of (value*weight) / sum of weights' },
    { prompt: 'Combined average of two groups?', answer: '(n1*avg1 + n2*avg2)/(n1+n2)' },
    { prompt: 'When can you average two averages directly?', answer: 'Only when group sizes are equal (or weights equal)' },
    { prompt: 'Direct vs inverse proportion in one line?', answer: 'Direct: y rises with x; inverse: y falls as x rises' },
  ],
  mistakes: [
    {
      trap: 'Averaging two class averages without using class sizes.',
      correct: 'Use weighted/combined formula with headcounts.',
    },
    {
      trap: 'Writing a:b = c:d as a+d = b+c.',
      correct: 'Cross-product rule is ad = bc, not sum of extremes.',
    },
    {
      trap: 'Forgetting to simplify the ratio before dividing.',
      correct: 'Simplify when helpful, but always divide using parts over sum of parts.',
    },
    {
      trap: 'Treating ratio of 2:3 as 2/5 and 3/5 of the wrong total.',
      correct: 'Parts are of (2+3)=5 only when the whole is the quantity being split.',
    },
    {
      trap: 'Using arithmetic mean for average speed over equal distances.',
      correct: 'Equal distances need harmonic mean logic; equal times use arithmetic mean.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Simplify ratios and split quantities in a:b:c.' },
    { day: 'Day 2', task: 'Proportion missing-term drills (ad = bc).' },
    { day: 'Day 3', task: 'Direct vs inverse proportion word problems.' },
    { day: 'Day 4', task: 'Mean, replacement of one value, running totals.' },
    { day: 'Day 5', task: 'Weighted and combined averages.' },
    { day: 'Day 6', task: 'Mixed MCQ set under timed conditions.' },
    { day: 'Day 7', task: 'One-pager formulas only from memory.' },
  ],
  sourcesLine:
    'Sources: standard one-paper quantitative aptitude chapters on ratio, proportion, and averages. Companion to percentages-ratios-profit-loss for full arithmetic coverage.',
}
