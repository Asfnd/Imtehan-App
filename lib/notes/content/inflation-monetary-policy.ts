import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked:
 * - Inflation: sustained rise in general price level; CPI is the common consumer measure in teaching
 * - Types: demand-pull, cost-push, built-in/expectations; also headline vs core in advanced answers
 * - SBP monetary tools (classic): policy rate / interest rate, open market operations, reserve requirements, moral suasion
 * - Fiscal expansion can fuel demand-pull inflation; supply shocks (fuel, food) feed cost-push
 * - Do not invent latest CPI percentages; teach definitions and tools
 */
export const INFLATION_MONETARY_POLICY_KIT: NoteKitData = {
  id: 'inflation-monetary-policy',
  title: 'Inflation and Monetary Policy Basics',
  subtitle:
    'Inflation types, CPI idea, and SBP policy tools in brief for one-paper, PPSC, and CSS MPT economy MCQs.',
  syllabusTags: [
    'Pakistan economy',
    'Inflation',
    'Monetary policy',
    'SBP',
    'Current affairs',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'Definition of inflation and CPI',
      frequency: 'high',
    },
    {
      year: 'PPSC / NTS',
      directive: 'MCQ fact',
      angle: 'Demand-pull vs cost-push inflation',
      frequency: 'high',
    },
    {
      year: 'CSS MPT',
      directive: 'MCQ fact',
      angle: 'SBP monetary policy tools',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Discuss',
      angle: 'Causes of inflation and policy response in Pakistan',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Inflation: a sustained rise in the general price level, not a one-day spike in one item.',
    'CPI (Consumer Price Index): common teaching measure of consumer inflation. Headline inflation includes food and energy; core inflation strips volatile items in advanced framing.',
    'Demand-pull: too much demand relative to supply (excess spending, loose money). Cost-push: rising input costs (fuel, imported intermediates, wages) push prices up.',
    'Other labels you may see: imported inflation (exchange rate / import prices), structural inflation (supply bottlenecks), hyperinflation (extreme cases elsewhere; not Pakistan’s normal label).',
    'Monetary policy: SBP manages money, credit, and interest rates to support price stability and related objectives under its legal mandate.',
    'Classic SBP tools (brief): policy interest rate, open market operations (buying/selling securities to affect liquidity), cash reserve / liquidity requirements on banks, and communication/guidance.',
    'Transmission idea: higher policy rate tends to cool credit and demand; lower rate eases. Real-world lags and fiscal shocks complicate the story.',
    'Exam split: inflation diagnosis (demand vs cost) first; then assign tools to SBP (monetary) vs Finance/FBR (fiscal). Do not quote unsourced monthly CPI figures.',
  ],
  answerSteps: [
    'Define inflation and name CPI as the usual consumer measure.',
    'Classify causes: demand-pull, cost-push, and imported/structural where relevant.',
    'State SBP’s monetary role and list 3 tools briefly.',
    'Explain one transmission channel (interest rate to credit/demand).',
    'Add fiscal caution: large deficits or subsidy shocks can undermine monetary tightening.',
    'Close with a balanced line: stable prices need monetary discipline plus supply-side and fiscal coherence.',
  ],
  questionVariants: [
    'What is inflation? Differentiate demand-pull and cost-push inflation.',
    'Discuss the main instruments of monetary policy used by the State Bank of Pakistan.',
    'Critically examine why inflation control is difficult when supply shocks dominate.',
    'Differentiate monetary policy from fiscal policy in controlling inflation.',
  ],
  citations: [
    {
      label: 'Inflation',
      text: 'Sustained increase in the general price level of goods and services.',
    },
    {
      label: 'Types',
      text: 'Demand-pull (excess demand) and cost-push (rising costs) are the core one-paper pair.',
    },
    {
      label: 'SBP tools',
      text: 'Policy rate, open market operations, and reserve/liquidity requirements are classic teaching instruments.',
    },
    {
      label: 'Institution',
      text: 'State Bank of Pakistan conducts monetary policy; fiscal policy remains with the government budget.',
    },
  ],
  flashcards: [
    { prompt: 'Define inflation.', answer: 'Sustained rise in the general price level' },
    { prompt: 'What does CPI measure?', answer: 'Consumer price inflation (prices faced by consumers)' },
    { prompt: 'What is demand-pull inflation?', answer: 'Prices rise because demand outstrips supply' },
    { prompt: 'What is cost-push inflation?', answer: 'Prices rise because production/input costs rise' },
    { prompt: 'Who conducts monetary policy in Pakistan?', answer: 'State Bank of Pakistan' },
    { prompt: 'Name three SBP tools.', answer: 'Policy rate, open market operations, reserve requirements' },
    { prompt: 'Does raising the policy rate usually cool or heat demand?', answer: 'Cool demand/credit (with lags)' },
    { prompt: 'Is a one-week vegetable spike alone full inflation?', answer: 'No. Inflation is a sustained general rise' },
  ],
  mistakes: [
    {
      trap: 'Calling any price rise in one market inflation.',
      correct: 'Inflation is a sustained general price-level rise, usually tracked by an index like CPI.',
    },
    {
      trap: 'Saying FBR sets the policy interest rate.',
      correct: 'Policy rate is an SBP monetary tool. FBR is tax administration.',
    },
    {
      trap: 'Inventing this month’s CPI without a source.',
      correct: 'Teach types and tools. Quote official figures only when sourced.',
    },
    {
      trap: 'Treating cost-push inflation as cured only by rate hikes.',
      correct: 'Rate hikes mainly cool demand. Supply shocks also need supply and fiscal responses.',
    },
    {
      trap: 'Mixing deflation with disinflation.',
      correct: 'Disinflation = inflation rate falling. Deflation = price level falling.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Define inflation, CPI, headline vs core (name-level).' },
    { day: 'Day 2', task: 'Master demand-pull vs cost-push with examples.' },
    { day: 'Day 3', task: 'List SBP tools and one transmission channel.' },
    { day: 'Day 4', task: 'Contrast monetary vs fiscal anti-inflation tools.' },
    { day: 'Day 5', task: 'Write a 10-minute causes-and-cures outline.' },
    { day: 'Day 6', task: 'Drill flashcards.' },
    { day: 'Day 7', task: 'One-pager only.' },
  ],
  sourcesLine:
    'Sources: standard macroeconomics definitions; SBP monetary policy teaching concepts; Pakistan economy one-paper syllabi. Prefer SBP/PBS releases when quoting inflation numbers.',
}
