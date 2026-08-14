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
    'State Bank of Pakistan (SBP) is the central bank. Core roles: monetary policy, currency issue, foreign exchange management, and banking supervision.',
    'Monetary policy = money supply, interest rates, liquidity (mainly SBP). Fiscal policy = taxes, spending, deficit (government, Finance Ministry, FBR).',
    'IMF (International Monetary Fund) helps countries with balance of payments problems and programme-linked reforms. HQ: Washington, D.C.',
    'IMF programmes typically bring financing plus conditions (fiscal discipline, exchange rate policy, reforms). Do not invent the latest tranche figure in exams unless the paper asks a dated fact.',
    'Current account: trade in goods and services plus income and transfers. A deficit means the country spends more abroad than it earns (in this net sense).',
    'Workers remittances are transfers from overseas Pakistanis. They often support the current account and foreign exchange reserves.',
    'Inflation: sustained rise in the general price level. CPI is the common consumer measure. High inflation erodes purchasing power.',
    'Named anchors for exams: SBP, FBR, Ministry of Finance, IMF, World Bank (development lending, separate from IMF), SECP (securities markets).',
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
    { prompt: 'What is Pakistan central bank called?', answer: 'State Bank of Pakistan (SBP)' },
    {
      prompt: 'Who mainly runs monetary policy in Pakistan?',
      answer: 'State Bank of Pakistan',
    },
    {
      prompt: 'Who mainly runs fiscal policy?',
      answer: 'Federal government (Finance Ministry / budget and tax system, including FBR)',
    },
    {
      prompt: 'Name one classic monetary tool area.',
      answer: 'Interest rates / policy rate and liquidity management',
    },
    {
      prompt: 'Name one classic fiscal tool.',
      answer: 'Taxes or government spending',
    },
    {
      prompt: 'What does IMF mainly help with?',
      answer: 'Balance of payments problems and related economic programmes',
    },
    { prompt: 'Where is IMF headquarters?', answer: 'Washington, D.C.' },
    {
      prompt: 'Is the World Bank the same as the IMF?',
      answer: 'No. World Bank focuses on development lending and projects; IMF on BOP and macro programmes',
    },
    {
      prompt: 'What are workers remittances?',
      answer: 'Money sent home by overseas workers / diaspora',
    },
    {
      prompt: 'What does a current account deficit broadly mean?',
      answer: 'Net current receipts from abroad are less than net current payments abroad',
    },
    {
      prompt: 'What is inflation?',
      answer: 'Sustained rise in the general price level',
    },
    {
      prompt: 'Common consumer inflation measure?',
      answer: 'CPI (Consumer Price Index)',
    },
    {
      prompt: 'Which body collects major federal taxes in Pakistan?',
      answer: 'Federal Board of Revenue (FBR)',
    },
    {
      prompt: 'SECP mainly regulates what?',
      answer: 'Securities markets / corporate sector regulation (not monetary policy)',
    },
  ],
  mistakes: [
    {
      trap: 'Saying the Finance Ministry prints money or sets the policy rate.',
      correct: 'Currency issue and monetary policy are SBP functions. Finance handles budget and taxes.',
    },
    {
      trap: 'Treating IMF as a commercial bank that invests for profit like a private lender.',
      correct: 'IMF is a multilateral institution focused on BOP support and macro programmes.',
    },
    {
      trap: 'Mixing IMF with World Bank roles.',
      correct: 'IMF: BOP and macro programmes. World Bank: development projects and long-term development finance.',
    },
    {
      trap: 'Inventing exact latest inflation or remittance numbers without a sourced figure.',
      correct: 'Use concepts and institutions unless the exam gives data or asks a dated official figure.',
    },
    {
      trap: 'Calling remittances export earnings from goods.',
      correct: 'Remittances are transfers, not merchandise export receipts.',
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
