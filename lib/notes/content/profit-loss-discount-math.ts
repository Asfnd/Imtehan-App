import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (one-paper general math):
 * - Profit = SP - CP when SP > CP; Loss = CP - SP when CP > SP
 * - Profit% and Loss% calculated on CP unless the question says otherwise
 * - SP = CP * (100 + profit%) / 100; SP = CP * (100 - loss%) / 100
 * - Discount on marked price (MP); successive discounts multiply remaining factors
 * - Avoid confusing discount% with profit%; avoid using SP as base for profit% by mistake
 */
export const PROFIT_LOSS_DISCOUNT_MATH_KIT: NoteKitData = {
  id: 'profit-loss-discount-math',
  title: 'Profit, Loss and Discount (Math)',
  subtitle:
    'CP/SP formulas, profit and loss percent, marked price discounts, and successive discount traps for one-paper exams.',
  syllabusTags: [
    'General Math',
    'Profit and loss',
    'Discount',
    'Percentages',
    'One-paper arithmetic',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'One-paper / MPT',
      directive: 'Solve',
      angle: 'Find profit or loss percent from CP and SP',
      frequency: 'high',
    },
    {
      year: 'PPSC / NTS / FPSC',
      directive: 'Solve',
      angle: 'Marked price, discount, and selling price',
      frequency: 'high',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'Successive discounts versus single equivalent discount',
      frequency: 'high',
    },
    {
      year: 'General math pattern',
      directive: 'Solve',
      angle: 'Find CP or SP when profit% or loss% is given',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Cost Price (CP) is the purchase price. Selling Price (SP) is the price at which the article is sold. Profit occurs when SP > CP; loss when SP < CP.',
    'Profit = SP - CP. Loss = CP - SP. By default in one-paper math, Profit% = (Profit / CP) * 100 and Loss% = (Loss / CP) * 100 unless the question explicitly uses another base.',
    'Forward formulas: SP = CP * (100 + p) / 100 for profit p%. SP = CP * (100 - L) / 100 for loss L%. Rearrange to find CP when SP and percent are known.',
    'Marked Price (MP) or list price is the tagged price before discount. Discount is usually on MP: SP = MP * (100 - d) / 100 for discount d%.',
    'Profit after discount: compare final SP with CP. A shop may mark up above CP then offer discount; do not assume discount percent equals profit percent.',
    'Successive discounts d1% and d2%: remaining factor = (1 - d1/100) * (1 - d2/100). Equivalent single discount is not d1 + d2. Example pattern: 10% then 20% leaves 0.9 * 0.8 = 0.72, so 28% equivalent off, not 30%.',
    'False discount trap: "discount on SP" wording is rare; read carefully. Another trap: calculating profit% on SP instead of CP.',
    'Check: if two discounts are successive, always multiply remaining percentages. If asked for profit on selling price, only then change the base.',
  ],
  answerSteps: [
    'Identify knowns: CP, SP, MP, profit%, loss%, discount%.',
    'Decide the correct base (usually CP for profit/loss; MP for discount).',
    'Apply SP = CP*(100+/-p)/100 or SP = MP*(100-d)/100.',
    'For successive discounts, multiply remaining factors.',
    'Compute the asked quantity and percent.',
    'Sense-check: successive combined discount < sum of separate discounts.',
  ],
  questionVariants: [
    'An article bought for Rs 800 is sold for Rs 920. Find profit percent.',
    'Marked price is Rs 1500. Discount 20%. Find selling price.',
    'Successive discounts of 10% and 15% are offered. Find equivalent single discount.',
    'A trader marks 25% above CP and gives 10% discount. Find overall profit percent.',
  ],
  citations: [
    {
      label: 'Profit/Loss',
      text: 'Profit = SP - CP; Loss = CP - SP; percents default on CP.',
    },
    {
      label: 'SP formulas',
      text: 'SP = CP*(100+p)/100 or CP*(100-L)/100.',
    },
    {
      label: 'Discount',
      text: 'Discount usually on MP; SP = MP*(100-d)/100.',
    },
    {
      label: 'Successive discounts',
      text: 'Multiply remaining factors; equivalent discount is not the simple sum.',
    },
  ],
  flashcards: [
    {
      prompt: 'Default base for profit percent?',
      answer: 'Cost price (CP)',
    },
    {
      prompt: 'Formula for SP with profit p%.',
      answer: 'SP = CP * (100 + p) / 100',
    },
    {
      prompt: 'Formula for SP with loss L%.',
      answer: 'SP = CP * (100 - L) / 100',
    },
    {
      prompt: 'On what price is discount usually calculated?',
      answer: 'Marked price (MP)',
    },
    {
      prompt: 'SP after discount d% on MP?',
      answer: 'SP = MP * (100 - d) / 100',
    },
    {
      prompt: 'How to combine successive discounts?',
      answer: 'Multiply remaining factors (1 - d/100)',
    },
    {
      prompt: 'Are 10% and 20% successive equal to 30% off?',
      answer: 'No; equivalent is 28% off (0.9 * 0.8 = 0.72)',
    },
    {
      prompt: 'Common percent base trap?',
      answer: 'Using SP instead of CP for profit%',
    },
    {
      prompt: 'Markup then discount means?',
      answer: 'Compare final SP with CP to find true profit%',
    },
  ],
  mistakes: [
    {
      trap: 'Adding successive discounts as a simple sum.',
      correct: 'Multiply remaining factors for the equivalent discount.',
    },
    {
      trap: 'Calculating profit percent on SP by default.',
      correct: 'Use CP unless the question says otherwise.',
    },
    {
      trap: 'Treating discount percent as profit percent.',
      correct: 'Discount is on MP; profit compares SP to CP.',
    },
    {
      trap: 'Forgetting to convert markup-then-discount into net SP.',
      correct: 'Apply markup to get MP, then discount to get SP, then compare with CP.',
    },
    {
      trap: 'Mixing loss formula with profit formula signs.',
      correct: 'Profit uses (100+p); loss uses (100-L).',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'CP, SP, profit, loss definitions.' },
    { day: 'Day 2', task: 'Percent formulas on CP.' },
    { day: 'Day 3', task: 'MP and single discount.' },
    { day: 'Day 4', task: 'Successive discount drills.' },
    { day: 'Day 5', task: 'Flashcards.' },
    { day: 'Day 6', task: 'Markup-then-discount word problems.' },
    { day: 'Day 7', task: 'Recite formulas and traps.' },
  ],
  sourcesLine:
    'Sources: standard one-paper general math teaching on profit, loss, marked price, and successive discounts.',
}
