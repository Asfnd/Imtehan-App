import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked:
 * - SBP is Pakistan's central bank (monetary policy, currency, banking regulation)
 * - Fiscal policy is government budget / FBR / Ministry of Finance domain
 * - IMF: balance of payments support and structural programmes; HQ Washington DC
 * - Remittances and current account are durable exam concepts; avoid inventing 2026 figures
 * - Teach named institutions and definitions, not fake latest numbers
 */
export const PAKISTAN_ECONOMY_IMF_SBP_KIT: NoteKitData = {
  id: 'pakistan-economy-imf-sbp',
  title: 'Pakistan Economy, IMF and SBP Basics',
  subtitle:
    'SBP role, monetary vs fiscal policy, IMF programmes, remittances, current account, and inflation for one-paper and CSS MPT.',
  syllabusTags: [
    'Pakistan economy',
    'Current affairs',
    'IMF and SBP',
    'Macroeconomic basics',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'SBP functions vs Ministry of Finance',
      frequency: 'high',
    },
    {
      year: 'CSS MPT / PPSC',
      directive: 'MCQ fact',
      angle: 'IMF purpose and HQ',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Discuss',
      angle: 'Current account pressure and remittances',
      frequency: 'medium',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'Inflation definition and policy tools',
      frequency: 'high',
    },
  ],
  onePager: [
    'SBP = Pakistan’s central bank: monetary policy, currency issue, FX management, banking supervision.',
    'Monetary policy (SBP): money, interest rates, liquidity. Fiscal policy (Finance Ministry / FBR): taxes, spending, deficit.',
    'IMF: BOP support and programme-linked reforms. HQ: Washington, D.C. Not a commercial bank.',
    'IMF programmes: financing plus conditions (fiscal discipline, exchange rate policy, reforms). Do not invent latest tranche figures.',
    'Current account: goods, services, income, transfers. Deficit = net current payments abroad exceed net receipts.',
    'Workers remittances: overseas transfers. Support current account and FX inflows. Not merchandise exports.',
    'Inflation: sustained rise in general price level. Common consumer measure: CPI.',
    'Named anchors: SBP, FBR, Ministry of Finance, IMF, World Bank (development lending), SECP (securities/corporate).',
  ],
  answerSteps: [
    'Define the problem in one line (inflation, reserves, deficit, or growth).',
    'Separate monetary (SBP) from fiscal (budget/taxes/spending) tools.',
    'If IMF is in the question, state purpose: BOP support and reform programme, not a commercial bank.',
    'Add remittances and current account only where they fit the angle.',
    'Close with one clear exam-safe link: stability needs both credible fiscal and monetary policy.',
  ],
  questionVariants: [
    'Distinguish between monetary and fiscal policy in Pakistan with institutional examples.',
    'What is the role of the State Bank of Pakistan in macroeconomic management?',
    'Explain why remittances matter for Pakistan external accounts.',
    'Outline the purpose of an IMF programme for a country facing balance of payments stress.',
  ],
  citations: [
    {
      label: 'SBP',
      text: 'State Bank of Pakistan is the central bank responsible for monetary policy, currency, and banking regulation.',
    },
    {
      label: 'Fiscal vs monetary',
      text: 'Fiscal policy is government revenue and expenditure. Monetary policy is central bank control of money and credit conditions.',
    },
    {
      label: 'IMF',
      text: 'IMF provides financial assistance and policy programmes for balance of payments problems. Headquarters: Washington, D.C.',
    },
    {
      label: 'Current account',
      text: 'Current account covers trade in goods and services, primary income, and secondary income (including remittances).',
    },
    {
      label: 'Remittances',
      text: 'Workers remittances are private transfers that support foreign exchange inflows and the current account.',
    },
  ],
  flashcards: [
    { prompt: 'Pakistan’s central bank?', answer: 'State Bank of Pakistan (SBP)' },
    { prompt: 'Who runs monetary policy?', answer: 'State Bank of Pakistan' },
    { prompt: 'Who runs fiscal policy?', answer: 'Federal government (Finance Ministry / budget and FBR)' },
    { prompt: 'Classic monetary tool area?', answer: 'Policy rate / interest rates and liquidity management' },
    { prompt: 'Classic fiscal tool?', answer: 'Taxes or government spending' },
    { prompt: 'IMF main help?', answer: 'Balance of payments problems and related macro programmes' },
    { prompt: 'IMF HQ?', answer: 'Washington, D.C.' },
    {
      prompt: 'IMF vs World Bank?',
      answer: 'IMF: BOP/macro programmes. World Bank: development lending/projects.',
    },
    { prompt: 'Workers remittances?', answer: 'Money sent home by overseas workers / diaspora' },
    {
      prompt: 'Current account deficit means?',
      answer: 'Net current receipts from abroad less than net current payments abroad',
    },
    { prompt: 'Inflation definition?', answer: 'Sustained rise in the general price level' },
    { prompt: 'Common consumer inflation measure?', answer: 'CPI (Consumer Price Index)' },
    { prompt: 'Major federal tax body?', answer: 'Federal Board of Revenue (FBR)' },
    { prompt: 'SECP regulates?', answer: 'Securities markets / corporate sector (not monetary policy)' },
    { prompt: 'Does Finance Ministry set the policy rate?', answer: 'No. That is SBP.' },
  ],
  mistakes: [
    {
      trap: 'Saying Finance Ministry prints money or sets the policy rate.',
      correct: 'Currency issue and monetary policy are SBP. Finance handles budget and taxes.',
    },
    {
      trap: 'Treating IMF as a profit-seeking commercial bank.',
      correct: 'IMF is a multilateral institution for BOP support and macro programmes.',
    },
    {
      trap: 'Mixing IMF with World Bank roles.',
      correct: 'IMF: BOP and macro programmes. World Bank: development projects and long-term development finance.',
    },
    {
      trap: 'Inventing exact latest inflation or remittance numbers.',
      correct: 'Use concepts and institutions unless the exam gives data or asks a dated official figure.',
    },
    {
      trap: 'Calling remittances merchandise export earnings.',
      correct: 'Remittances are transfers, not goods export receipts.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Memorise SBP vs fiscal institutions in one table.' },
    { day: 'Day 2', task: 'Drill IMF purpose, HQ, and difference from World Bank.' },
    { day: 'Day 3', task: 'Learn current account and remittances definitions.' },
    { day: 'Day 4', task: 'Inflation and CPI basics. Flashcards.' },
    { day: 'Day 5', task: 'Write a 8-minute note: monetary vs fiscal.' },
    { day: 'Day 6', task: 'MCQ drill on institutions and definitions.' },
    { day: 'Day 7', task: 'One-pager only. Recite IMF and SBP roles from memory.' },
  ],
  sourcesLine:
    'Sources: SBP institutional mandate; IMF and World Bank role definitions; standard Pakistan economy syllabus items for CSS/PPSC/NTS. Prefer durable concepts over unsourced WhatsApp figures.',
}
