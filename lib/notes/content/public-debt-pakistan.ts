import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (Pakistan public finance teaching):
 * - Public debt: government liabilities from borrowing; domestic vs external; short vs long term themes
 * - Related: fiscal deficit drives borrowing; debt servicing; debt-to-GDP as sustainability lens; rollover risk
 * - Institutions: Ministry of Finance / Debt Policy themes; SBP role is monetary, not the debt stock owner in exam language
 * Avoid inventing fake current debt totals, exact ratios, or IMF tranche figures unless a verified year/source is cited
 */
export const PUBLIC_DEBT_PAKISTAN_KIT: NoteKitData = {
  id: 'public-debt-pakistan',
  title: 'Public Debt in Pakistan (Concepts)',
  subtitle:
    'Domestic vs external debt, deficit-debt link, servicing and sustainability concepts without invented totals.',
  syllabusTags: [
    'Public debt',
    'Fiscal policy',
    'Pakistan economy',
    'Current affairs',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS / PMS',
      directive: 'Discuss',
      angle: 'Public debt challenges and sustainability in Pakistan',
      frequency: 'high',
    },
    {
      year: 'CSS Current Affairs',
      directive: 'Critically examine',
      angle: 'Domestic versus external debt risks',
      frequency: 'high',
    },
    {
      year: 'One-paper / MPT',
      directive: 'MCQ fact',
      angle: 'Debt vocabulary: deficit, servicing, debt-to-GDP',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Evaluate',
      angle: 'Debt servicing pressure on development spending',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Public debt is the stock of government borrowing liabilities. A fiscal deficit (expenditure above revenue) typically adds to that stock unless financed by asset sales or other one-off means.',
    'Domestic debt: owed mainly to residents and local institutions (for example banks, investors in government securities). External debt: owed to foreign creditors, multilateral lenders, and bilateral partners.',
    'Why the split matters: domestic debt raises interest and crowding-out themes; external debt adds exchange-rate and refinancing/rollover risk when foreign currency earnings are weak.',
    'Debt servicing: interest and principal repayments. High servicing can squeeze development and social spending in budget debates. Phrase as a trade-off, not as a fake rupee total.',
    'Sustainability lens: debt-to-GDP, primary balance, growth rate versus interest rate, and ability to roll over maturities. Rising ratios with low growth signal stress; exact numbers change yearly so cite a named source if you quote them.',
    'Causes taught in exams: persistent deficits, weak tax effort, circular debt and energy subsidies themes, exchange-rate valuation effects on external debt, and sometimes disaster or shock borrowing.',
    'Policy responses in notes: fiscal consolidation, tax reforms, export growth for external buffers, longer maturities and cheaper concessional finance where available, and transparent debt management.',
    'Answer discipline: define terms; contrast domestic/external; explain servicing and sustainability; propose reforms; do not invent headline debt totals.',
  ],
  answerSteps: [
    'Define public debt and link it to fiscal deficit.',
    'Distinguish domestic and external debt risks.',
    'Explain debt servicing pressure on the budget.',
    'Use sustainability concepts (debt-to-GDP, growth vs interest) without fake figures.',
    'List causes and reform options.',
    'Conclude with credible fiscal path and export/tax capacity.',
  ],
  questionVariants: [
    'Discuss the problem of public debt in Pakistan.',
    'Critically examine domestic versus external debt risks.',
    'Evaluate debt servicing as a constraint on development spending.',
    'How can Pakistan improve public debt sustainability?',
  ],
  citations: [
    {
      label: 'Definition',
      text: 'Public debt is the stock of government borrowing liabilities; deficits usually add to the stock.',
    },
    {
      label: 'Domestic vs external',
      text: 'Domestic: local creditors. External: foreign/multilateral/bilateral creditors with FX risk themes.',
    },
    {
      label: 'Servicing',
      text: 'Interest and principal payments that can crowd development spending.',
    },
    {
      label: 'Sustainability',
      text: 'Debt-to-GDP and related lenses; quote totals only with a verified year/source.',
    },
  ],
  flashcards: [
    {
      prompt: 'What is public debt?',
      answer: 'The stock of government borrowing liabilities',
    },
    {
      prompt: 'How does fiscal deficit relate to debt?',
      answer: 'Persistent deficits usually increase the debt stock',
    },
    {
      prompt: 'What is domestic debt?',
      answer: 'Debt owed mainly to resident creditors and local markets',
    },
    {
      prompt: 'What is external debt?',
      answer: 'Debt owed to foreign, bilateral, or multilateral creditors',
    },
    {
      prompt: 'What is debt servicing?',
      answer: 'Interest and principal repayments',
    },
    {
      prompt: 'Name one external debt risk.',
      answer: 'Exchange-rate or rollover/refinancing risk',
    },
    {
      prompt: 'Name a common sustainability indicator.',
      answer: 'Debt-to-GDP ratio',
    },
    {
      prompt: 'Should answers invent current debt totals?',
      answer: 'No; use concepts or cite a verified year/source',
    },
    {
      prompt: 'Name one reform theme.',
      answer: 'Tax effort and fiscal consolidation (or export buffers)',
    },
  ],
  mistakes: [
    {
      trap: 'Inventing exact debt stock or debt-to-GDP figures.',
      correct: 'Stay conceptual unless a verified source year is given.',
    },
    {
      trap: 'Confusing deficit (flow) with debt (stock).',
      correct: 'Deficit is yearly gap; debt is accumulated liability.',
    },
    {
      trap: 'Treating all debt as external FX debt.',
      correct: 'Separate domestic and external risk profiles.',
    },
    {
      trap: 'Ignoring debt servicing crowding-out.',
      correct: 'Servicing can squeeze development allocations.',
    },
    {
      trap: 'Blaming debt without reform options.',
      correct: 'Add fiscal, tax, and export/debt-management responses.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Deficit vs debt stock.' },
    { day: 'Day 2', task: 'Domestic vs external risks.' },
    { day: 'Day 3', task: 'Servicing and sustainability lenses.' },
    { day: 'Day 4', task: 'Flashcards.' },
    { day: 'Day 5', task: 'Causes and reforms.' },
    { day: 'Day 6', task: '10-minute evaluate outline.' },
    { day: 'Day 7', task: 'Recite one-pager without fake totals.' },
  ],
  sourcesLine:
    'Sources: standard Pakistan economy and fiscal policy teaching on public debt concepts. Avoid unverified debt stock and ratio headlines.',
}
