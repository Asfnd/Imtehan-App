import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (one-paper general math):
 * - Simple Interest: SI = (P x R x T) / 100; Amount A = P + SI
 * - Compound Interest: A = P (1 + R/100)^T for annual compounding in basic papers; CI = A - P
 * - Difference CI - SI for 2 years often tested; rate sometimes per annum
 * - Avoid inventing exotic continuous compounding beyond syllabus unless asked
 */
export const SIMPLE_INTEREST_COMPOUND_INTEREST_KIT: NoteKitData = {
  id: 'simple-interest-compound-interest',
  title: 'Simple Interest and Compound Interest',
  subtitle:
    'SI and CI formulas, two-year difference tricks, and classic one-paper traps for general math.',
  syllabusTags: [
    'General Math',
    'Simple interest',
    'Compound interest',
    'One-paper arithmetic',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'One-paper / MPT',
      directive: 'Solve',
      angle: 'Find SI or amount given P, R, T',
      frequency: 'high',
    },
    {
      year: 'PPSC / NTS / FPSC',
      directive: 'Solve',
      angle: 'Compound interest and CI minus SI for 2 years',
      frequency: 'high',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'Choose correct formula or final amount',
      frequency: 'high',
    },
    {
      year: 'General math pattern',
      directive: 'Solve',
      angle: 'Rate or time when SI or CI is given',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Simple Interest (SI) is interest on the original principal only. Formula: SI = (P x R x T) / 100, where P = principal, R = rate percent per annum, T = time in years (convert months to years when needed).',
    'Amount under SI: A = P + SI. If SI for a period is given, you can back-solve P, R, or T by rearranging.',
    'Compound Interest (CI) adds interest to the principal so later interest is charged on a growing base. Basic annual compounding: A = P (1 + R/100)^T, then CI = A - P.',
    'For T = 2 years at rate R (annual compounding), expand: A = P (1 + R/100)^2. Useful identity: CI - SI for 2 years equals P (R/100)^2 (high-yield shortcut when R is percent).',
    'Units discipline: keep R as percent in the formula (divide by 100). Convert 6 months to 0.5 year unless the question states half-yearly compounding explicitly.',
    'Half-yearly compounding (when stated): use rate R/2 per period and double the periods (2T periods in T years). Do not apply this unless the question says so.',
    'Comparison: SI grows linearly with time; CI grows faster for the same P, R, T when T > 1 under standard compounding.',
    'Check: for one year with annual compounding, CI equals SI. Difference appears from the second year onward.',
  ],
  answerSteps: [
    'Identify SI vs CI and the compounding frequency if stated.',
    'Write knowns: P, R, T (convert time units).',
    'Apply SI = PRT/100 or A = P(1+R/100)^T as appropriate.',
    'For 2-year CI-SI difference, consider the P(R/100)^2 shortcut.',
    'Find the asked quantity (SI, CI, A, R, or T).',
    'Sense-check: CI >= SI for standard cases with T >= 1 year annual compounding.',
  ],
  questionVariants: [
    'Find simple interest on Rs 5000 at 8% per annum for 3 years.',
    'Find compound interest on Rs 8000 at 10% per annum for 2 years (annual compounding).',
    'If CI and SI differ by Rs 40 in 2 years at 10% p.a., find the principal.',
    'In what time will Rs 2000 amount to Rs 2600 at 10% p.a. simple interest?',
  ],
  citations: [
    {
      label: 'SI formula',
      text: 'SI = (P x R x T) / 100; Amount A = P + SI.',
    },
    {
      label: 'CI formula',
      text: 'For annual compounding, A = P (1 + R/100)^T and CI = A - P.',
    },
    {
      label: 'Two-year difference',
      text: 'For 2 years annual compounding, CI - SI = P (R/100)^2 is a standard shortcut.',
    },
    {
      label: 'One-year equality',
      text: 'For one year with annual compounding, CI equals SI on the same P and R.',
    },
    {
      label: 'Time units',
      text: 'Convert months to years for T unless the question specifies period-based compounding.',
    },
  ],
  flashcards: [
    {
      prompt: 'Write the simple interest formula.',
      answer: 'SI = (P x R x T) / 100',
    },
    {
      prompt: 'Write the annual compound amount formula.',
      answer: 'A = P (1 + R/100)^T',
    },
    {
      prompt: 'How do you get CI from amount?',
      answer: 'CI = A - P',
    },
    {
      prompt: 'CI - SI for 2 years (annual) equals?',
      answer: 'P (R/100)^2',
    },
    {
      prompt: 'When are CI and SI equal (standard annual case)?',
      answer: 'For one year',
    },
    {
      prompt: 'Amount under SI equals?',
      answer: 'P + SI',
    },
    {
      prompt: '6 months as T in years?',
      answer: '0.5 year',
    },
    {
      prompt: 'Half-yearly compounding adjustment (when stated)?',
      answer: 'Use R/2 per period and 2T periods in T years',
    },
    {
      prompt: 'Does CI grow linearly with time like SI?',
      answer: 'No; CI grows on an increasing base after the first compounding',
    },
    {
      prompt: 'SI on 5000 at 8% for 3 years?',
      answer: 'SI = 1200',
    },
  ],
  mistakes: [
    {
      trap: 'Using SI formula for a CI question (or the reverse).',
      correct: 'Read the question: simple vs compound changes the formula.',
    },
    {
      trap: 'Forgetting to divide R by 100 inside (1 + R/100).',
      correct: 'Rate percent must be converted to a decimal factor.',
    },
    {
      trap: 'Treating 6 months as T = 6 in the yearly formula.',
      correct: 'Use T = 0.5 year unless period compounding is specified.',
    },
    {
      trap: 'Applying half-yearly compounding when the question never says so.',
      correct: 'Default one-paper assumption is annual unless stated otherwise.',
    },
    {
      trap: 'Using CI - SI = P(R/100)^2 for three years blindly.',
      correct: 'That compact shortcut is the standard two-year annual case; longer periods need full expansion or stepwise compounding.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'SI formula and three rearrangements.' },
    { day: 'Day 2', task: 'CI annual formula and CI = A - P.' },
    { day: 'Day 3', task: 'Two-year CI-SI difference shortcut.' },
    { day: 'Day 4', task: 'Time-unit and half-yearly caution drills.' },
    { day: 'Day 5', task: 'Flashcards.' },
    { day: 'Day 6', task: 'Mixed SI/CI timed set.' },
    { day: 'Day 7', task: 'Recite formulas from memory.' },
  ],
  sourcesLine:
    'Sources: standard one-paper general mathematics teaching on simple and compound interest. Prefer annual compounding defaults unless the question states otherwise.',
}
