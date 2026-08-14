import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked:
 * - Percentage = (part/whole)*100; successive discounts multiply remaining factors
 * - Ratio a:b means a/b; proportion products of extremes = products of means
 * - Profit/Loss on cost price unless question says otherwise; SP = CP*(100+p)/100
 * - Common traps: successive discount vs single discount; profit% on SP by mistake
 */
export const PERCENTAGES_RATIOS_PROFIT_LOSS_KIT: NoteKitData = {
  id: 'percentages-ratios-profit-loss',
  title: 'Percentages, Ratios and Profit Loss',
  subtitle:
    'Formula-first one-pager for one-paper math: percentages, ratios, successive discounts, and CP/SP traps.',
  syllabusTags: [
    'General math',
    'Percentages',
    'Ratios and proportion',
    'Profit and loss',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'Percentage increase/decrease formulas',
      frequency: 'high',
    },
    {
      year: 'PPSC / NTS',
      directive: 'MCQ fact',
      angle: 'Successive discounts',
      frequency: 'high',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'Profit and loss on CP',
      frequency: 'high',
    },
    {
      year: 'FPSC',
      directive: 'MCQ fact',
      angle: 'Ratio and proportion basics',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Percentage: part as a share of whole. Value = (percentage/100) * whole. Percentage = (part/whole) * 100.',
    'Increase: new = old * (100 + r)/100. Decrease: new = old * (100 - r)/100.',
    'Successive changes multiply. Example: +10% then -10% is not zero change. Factors (1.10)*(0.90) = 0.99, so net 1% loss on the original.',
    'Successive discounts of a% and b% mean pay factor (100-a)/100 * (100-b)/100 of marked price. Never add a and b as one discount unless the question says a single combined rate.',
    'Ratio a:b means a/b. If a:b = c:d then a*d = b*c (proportion). Divide a quantity in ratio a:b into shares a/(a+b) and b/(a+b).',
    'Cost Price (CP): purchase price. Selling Price (SP): sale price. Profit = SP - CP. Loss = CP - SP.',
    'Profit% = (Profit/CP)*100. Loss% = (Loss/CP)*100. Default base is CP unless the question clearly uses SP or marked price.',
    'SP from profit p%: SP = CP * (100 + p)/100. SP from loss l%: SP = CP * (100 - l)/100. CP from SP: invert the factor.',
  ],
  answerSteps: [
    'Underline what is the base (CP, SP, marked price, or original value).',
    'Convert every percentage to a multiply factor before calculating.',
    'For two changes, multiply factors. Do not add percentages blindly.',
    'For profit/loss, compute profit or loss amount, then divide by CP for percentage.',
    'Do a quick sense check: discount should lower price; profit means SP above CP.',
  ],
  questionVariants: [
    'A number is increased by 20% and then decreased by 20%. Find net change.',
    'Find the single discount equivalent to successive discounts of 10% and 20%.',
    'If profit is 25% and SP is given, find CP.',
    'Divide 840 in the ratio 3:4.',
  ],
  citations: [
    {
      label: 'Percentage core',
      text: 'Percentage = (part/whole)*100. New value after r% rise = old*(100+r)/100.',
    },
    {
      label: 'Successive change',
      text: 'Apply percentage factors one after another by multiplication, not by adding rates.',
    },
    {
      label: 'Ratio',
      text: 'a:b means a/b. In a:b = c:d, product of extremes equals product of means.',
    },
    {
      label: 'Profit and loss',
      text: 'Profit% and Loss% are ordinarily calculated on CP. SP = CP*(100+/-rate)/100.',
    },
    {
      label: 'Discount trap',
      text: 'Successive discounts are multiplicative on the marked price remaining after each cut.',
    },
  ],
  flashcards: [
    {
      prompt: 'Formula for x% of N?',
      answer: '(x/100)*N',
    },
    {
      prompt: 'Formula for percentage of part P out of whole W?',
      answer: '(P/W)*100',
    },
    {
      prompt: 'Multiplier for a 15% increase?',
      answer: '1.15 or 115/100',
    },
    {
      prompt: 'Multiplier for a 15% decrease?',
      answer: '0.85 or 85/100',
    },
    {
      prompt: 'Net factor for +10% then -10%?',
      answer: '0.99 (net 1% decrease)',
    },
    {
      prompt: 'Are successive discounts of 10% and 20% equal to 30% off?',
      answer: 'No. Remaining factor is 0.9*0.8 = 0.72, so 28% off',
    },
    {
      prompt: 'If a:b = 2:3, what is a/b?',
      answer: '2/3',
    },
    {
      prompt: 'Divide N in ratio a:b. First share?',
      answer: 'N * a/(a+b)',
    },
    {
      prompt: 'Profit formula?',
      answer: 'SP - CP (when SP > CP)',
    },
    {
      prompt: 'Loss formula?',
      answer: 'CP - SP (when CP > SP)',
    },
    {
      prompt: 'Profit% is usually on which base?',
      answer: 'Cost Price (CP)',
    },
    {
      prompt: 'SP when profit is p%?',
      answer: 'CP * (100 + p)/100',
    },
    {
      prompt: 'SP when loss is l%?',
      answer: 'CP * (100 - l)/100',
    },
    {
      prompt: 'If SP and profit% are given, how to get CP?',
      answer: 'CP = SP * 100/(100 + profit%)',
    },
    {
      prompt: 'Marked price minus discount gives?',
      answer: 'Selling price (after discount), assuming no other changes',
    },
  ],
  mistakes: [
    {
      trap: 'Adding successive percentage changes as if they were one rate.',
      correct: 'Multiply the factors. +10% then -10% is not zero.',
    },
    {
      trap: 'Treating successive discounts of 10% and 20% as 30%.',
      correct: 'Equivalent single discount is 28% (pay 72% of marked price).',
    },
    {
      trap: 'Calculating profit% on SP by default.',
      correct: 'Unless stated otherwise, profit% and loss% use CP as base.',
    },
    {
      trap: 'Using SP = CP * p/100 for a p% profit.',
      correct: 'SP = CP * (100 + p)/100, not CP * p/100.',
    },
    {
      trap: 'Confusing ratio parts with percentages without converting.',
      correct: 'Convert ratio shares using a/(a+b). Convert percentages using /100 factors.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Percentage of, increase, decrease formulas.' },
    { day: 'Day 2', task: 'Successive percentage change drill.' },
    { day: 'Day 3', task: 'Ratio division and proportion.' },
    { day: 'Day 4', task: 'CP, SP, profit%, loss% formulas.' },
    { day: 'Day 5', task: 'Successive discount word problems.' },
    { day: 'Day 6', task: 'Trap MCQs only.' },
    { day: 'Day 7', task: 'One-pager only. Recite all core formulas.' },
  ],
  sourcesLine:
    'Sources: standard one-paper quantitative aptitude formulas for percentages, ratios, and profit-loss. Focus on method and traps, not memorising arbitrary numerical keys.',
}
