import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked:
 * - Fiscal policy = government taxing and spending (budget); monetary policy = SBP domain
 * - Federal budget presented by Finance Minister; National Assembly money-bill role is classic teaching
 * - FBR: Federal Board of Revenue; collects federal taxes (income tax, sales tax, customs, federal excise as applicable)
 * - Deficit: expenditure > revenue; financed via borrowing, money financing debates, external finance (teach concepts, not fake FY figures)
 * - Avoid inventing current-year deficit percentages or tax-to-GDP claims without a stated source year
 */
export const BUDGET_FISCAL_POLICY_PAKISTAN_KIT: NoteKitData = {
  id: 'budget-fiscal-policy-pakistan',
  title: 'Budget and Fiscal Policy in Pakistan',
  subtitle:
    'Budget process concepts, FBR role, deficit financing ideas, and fiscal vs monetary clarity for current affairs and one-paper.',
  syllabusTags: [
    'Pakistan economy',
    'Fiscal policy',
    'Budget',
    'FBR',
    'Current affairs',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS pattern',
      directive: 'Discuss',
      angle: 'Fiscal policy challenges and budget priorities in Pakistan',
      frequency: 'high',
    },
    {
      year: 'One-paper / MPT',
      directive: 'MCQ fact',
      angle: 'Fiscal vs monetary policy; FBR function',
      frequency: 'high',
    },
    {
      year: 'PPSC / NTS',
      directive: 'MCQ fact',
      angle: 'Budget deficit and financing concepts',
      frequency: 'high',
    },
    {
      year: 'CSS / PMS',
      directive: 'Critically examine',
      angle: 'Tax effort, subsidies, and deficit financing trade-offs',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Fiscal policy: government uses taxation and public spending to influence the economy and deliver public goods. Tool of the budget.',
    'Monetary policy: money, credit, and interest-rate management. In Pakistan this is primarily SBP territory. Do not mix the two.',
    'Federal budget: annual statement of estimated receipts and expenditures. Presented by the Finance Minister. Parliament (especially National Assembly on money matters) authorises spending and taxation under the constitutional money-bill framework.',
    'Receipts side: tax revenue and non-tax revenue. Expenditure side: current (running) and development (investment/PSDPstyle) spending in classic teaching.',
    'FBR (Federal Board of Revenue): federal tax administration body. Income tax, sales tax, customs duties, and federal excise (as applicable) are the classic FBR tax families.',
    'Budget deficit: total expenditure exceeds total revenue. Primary deficit concepts appear in advanced answers; for one-paper, know deficit = gap needing finance.',
    'Deficit financing (concept level): borrowing from banks/public, external borrowing, and historically controversial reliance on printing/central-bank financing. Each has inflation and debt-sustainability trade-offs.',
    'Exam hooks: tax-to-GDP weakness as a theme, subsidy burden, circular debt in energy essays, IMF programme conditionality on fiscal adjustment. Use themes, not invented numbers.',
  ],
  answerSteps: [
    'Define fiscal policy and separate it from SBP monetary policy in one crisp sentence.',
    'Explain the budget as the annual receipts-expenditure plan and name FBR as federal tax collector.',
    'Break the problem: narrow tax base, current spending pressure, development needs, and deficit.',
    'Discuss deficit financing options and their risks (debt, inflation, crowding out) without fake figures.',
    'Link to federalism if asked: NFC Award / provincial shares affect the fiscal map (name-level cross-ref).',
    'Close with a judgment: sustainable fiscal policy needs tax effort + spending quality, not only new loans.',
  ],
  questionVariants: [
    'Discuss the main features of fiscal policy and the budget process in Pakistan.',
    'Critically examine deficit financing as a tool of fiscal management.',
    'Differentiate fiscal policy from monetary policy with Pakistani institutional examples.',
    'Evaluate the role of FBR in strengthening Pakistan’s revenue effort.',
  ],
  citations: [
    {
      label: 'Fiscal policy',
      text: 'Government taxing and spending policy, expressed mainly through the annual budget.',
    },
    {
      label: 'FBR',
      text: 'Federal Board of Revenue administers major federal taxes (income tax, sales tax, customs, federal excise as applicable).',
    },
    {
      label: 'Deficit',
      text: 'A budget deficit arises when expenditure exceeds revenue and must be financed.',
    },
    {
      label: 'Institutional split',
      text: 'Fiscal policy: Ministry of Finance / budget / FBR. Monetary policy: State Bank of Pakistan.',
    },
  ],
  flashcards: [
    { prompt: 'What is fiscal policy?', answer: 'Government use of taxes and spending (the budget)' },
    { prompt: 'Who mainly runs monetary policy in Pakistan?', answer: 'State Bank of Pakistan (SBP)' },
    { prompt: 'What does FBR stand for?', answer: 'Federal Board of Revenue' },
    { prompt: 'Name classic FBR tax families.', answer: 'Income tax, sales tax, customs, federal excise' },
    { prompt: 'What is a budget deficit?', answer: 'Expenditure greater than revenue' },
    { prompt: 'Name one deficit financing route.', answer: 'Domestic or external borrowing (or historically money financing debates)' },
    { prompt: 'Who typically presents the federal budget?', answer: 'Finance Minister' },
    { prompt: 'Current vs development spending (teaching split)?', answer: 'Current = running costs; development = investment/development outlays' },
  ],
  mistakes: [
    {
      trap: 'Saying SBP sets the federal tax rates as fiscal policy.',
      correct: 'Tax policy and budget are fiscal (government/FBR/Finance). SBP handles monetary tools.',
    },
    {
      trap: 'Inventing exact current deficit % without a cited year/source.',
      correct: 'Teach the concept and trends. Only quote numbers you can source.',
    },
    {
      trap: 'Treating deficit financing as costless.',
      correct: 'Borrowing raises debt service; money financing risks inflation; both have trade-offs.',
    },
    {
      trap: 'Confusing FBR with SBP.',
      correct: 'FBR collects federal taxes. SBP is the central bank.',
    },
    {
      trap: 'Calling every provincial tax an FBR tax.',
      correct: 'FBR is federal. Provinces have their own tax authorities for provincial taxes.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Define fiscal vs monetary with institutions (Finance/FBR vs SBP).' },
    { day: 'Day 2', task: 'Map budget receipts and expenditure categories.' },
    { day: 'Day 3', task: 'Memorise FBR role and tax families.' },
    { day: 'Day 4', task: 'Study deficit and financing trade-offs.' },
    { day: 'Day 5', task: 'Write a 10-minute fiscal challenges outline.' },
    { day: 'Day 6', task: 'Drill MCQ-style flashcards.' },
    { day: 'Day 7', task: 'One-pager only; no invented statistics.' },
  ],
  sourcesLine:
    'Sources: standard public finance teaching; Pakistan federal budget process concepts; FBR institutional role; SBP vs fiscal policy distinction. Prefer Economic Survey / official budget documents when quoting numbers.',
}
