import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked:
 * - Distinct from percentages-ratios-profit-loss kit: focus on successive percentages, population growth, reverse percentage, and multi-step applications
 * - Successive changes multiply factors: +x% then +y% is not +(x+y)% overall
 * - Population growth: A(1+r/100)^n for constant rate compounding in exam models
 * - Avoid inventing calculator-only tricks; keep handwritten CSS/one-paper methods
 */
export const PERCENTAGES_APPLICATIONS_EXAM_KIT: NoteKitData = {
  id: 'percentages-applications-exam',
  title: 'Percentages: Advanced Applications for Exams',
  subtitle:
    'Successive percentages, population growth, reverse percentage, and multi-step MCQ methods.',
  syllabusTags: [
    'General math',
    'Percentages',
    'Population growth',
    'One-paper math',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'One-paper',
      directive: 'MCQ',
      angle: 'Successive percentage increase/decrease',
      frequency: 'high',
    },
    {
      year: 'One-paper',
      directive: 'MCQ',
      angle: 'Population growth compounding',
      frequency: 'high',
    },
    {
      year: 'CSS / PMS aptitude pattern',
      directive: 'Solve',
      angle: 'Reverse percentage and net change',
      frequency: 'medium',
    },
    {
      year: 'One-paper',
      directive: 'MCQ',
      angle: 'Percentage of percentage and base shift traps',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Core idea: a percentage is always of a base. Changing the base changes the meaning of the same percent number.',
    'Single change: new value = original × (1 ± r/100). Increase uses +, decrease uses −.',
    'Successive percentages: apply factors in sequence. After +a% then +b%: multiply by (1+a/100)(1+b/100). Net percent is not simply a+b.',
    'Example pattern: +10% then +10% ⇒ ×1.1×1.1 = 1.21 ⇒ net +21%, not +20%.',
    'Successive increase then decrease: +x% then −x% does not return to the original (net loss). Factor: (1+x/100)(1−x/100) = 1 − (x/100)^2.',
    'Population (or compound growth) model used in exams: P_n = P_0 (1 + r/100)^n for constant rate r over n periods (years).',
    'Depreciation / decline: P_n = P_0 (1 − r/100)^n when a constant percentage fall is assumed.',
    'Reverse percentage: if a value is after +r%, original = final / (1+r/100). If after −r%, original = final / (1−r/100).',
    'Percentage of percentage: x% of y% of N = (x/100)(y/100)N. Do not add x and y.',
    'Exam method: write factors first, multiply, then convert net factor to percent change. Avoid mental shortcuts that add rates.',
  ],
  answerSteps: [
    'Identify the original base and each successive rate.',
    'Convert each rate to a multiplier (1 ± r/100).',
    'Multiply multipliers in order; for population use (1+r/100)^n.',
    'Convert the final factor to a value or net percent as asked.',
    'For reverse questions, divide by the multiplier instead of multiplying.',
  ],
  questionVariants: [
    'A quantity rises by 10% and then by 20%. Find the net percentage increase.',
    'Population grows at 5% per year. Find population after 2 years if initial population is P.',
    'After a 20% discount, a price is 400. Find the original price.',
    'A value increases by x% and then decreases by x%. Show the net percentage change.',
  ],
  citations: [
    {
      label: 'Successive change',
      text: 'Multiply successive factors (1±r/100); do not add the percents for net change.',
    },
    {
      label: 'Population growth',
      text: 'P_n = P_0 (1 + r/100)^n for constant rate r over n periods.',
    },
    {
      label: 'Reverse percentage',
      text: 'Original = final / (1±r/100) depending on increase or decrease.',
    },
    {
      label: 'Equal up then down',
      text: '(1+x/100)(1−x/100) = 1 − (x/100)^2 (net decrease).',
    },
  ],
  flashcards: [
    {
      prompt: 'Net factor for +10% then +10%?',
      answer: '1.21 (net +21%)',
    },
    {
      prompt: 'Formula for population after n years at rate r%',
      answer: 'P_0 (1 + r/100)^n',
    },
    {
      prompt: 'Why is +x% then −x% not zero net?',
      answer: 'Second percent applies to a new base; net factor is 1−(x/100)^2',
    },
    {
      prompt: 'Price after 20% increase is 600. Original?',
      answer: '600 / 1.2 = 500',
    },
    {
      prompt: 'Price after 20% decrease is 400. Original?',
      answer: '400 / 0.8 = 500',
    },
    {
      prompt: 'What is 20% of 30% of 500?',
      answer: '0.2 × 0.3 × 500 = 30',
    },
    {
      prompt: 'Depreciation formula at r% per year for n years?',
      answer: 'P_0 (1 − r/100)^n',
    },
    {
      prompt: 'First step in successive % MCQs?',
      answer: 'Write each change as a multiplier, then multiply',
    },
    {
      prompt: 'Does +5% then +5% equal +10% net?',
      answer: 'No; net is 10.25%',
    },
    {
      prompt: 'How does this kit differ from basic profit-loss %?',
      answer: 'Focus on successive rates, population compounding, and reverse percentage',
    },
  ],
  mistakes: [
    {
      trap: 'Adding successive percentage rates for net change.',
      correct: 'Multiply the factors, then convert to net percent.',
    },
    {
      trap: 'Using simple interest style P×r×n/100 for population growth MCQs that mean compounding.',
      correct: 'Use P(1+r/100)^n when the paper implies yearly compound growth.',
    },
    {
      trap: 'Subtracting a discount from the final price to find original.',
      correct: 'Divide final by (1 − discount/100).',
    },
    {
      trap: 'Assuming +x% then −x% restores the original.',
      correct: 'There is a net loss of (x/100)^2 × 100 percent.',
    },
    {
      trap: 'Changing the base silently mid-solution.',
      correct: 'State which quantity each percentage is of at every step.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Drill single-change multipliers.' },
    { day: 'Day 2', task: 'Successive +/+ and +/− net change sets.' },
    { day: 'Day 3', task: 'Population growth and depreciation problems.' },
    { day: 'Day 4', task: 'Reverse percentage worksheet.' },
    { day: 'Day 5', task: 'Mixed MCQs under time.' },
    { day: 'Day 6', task: 'One-pager formulas only from memory.' },
    { day: 'Day 7', task: 'Error-log review of base-shift mistakes.' },
  ],
  sourcesLine:
    'Sources: standard one-paper quantitative aptitude chapters on successive percentages and population growth; CSS/PMS math MCQ patterns. Keep methods handwritten-factor based, not calculator folklore.',
}
