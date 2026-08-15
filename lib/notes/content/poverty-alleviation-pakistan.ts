import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (Pakistan social protection teaching):
 * - BISP: Benazir Income Support Programme; flagship cash transfer / social safety net theme
 * - Ehsaas: broader poverty alleviation / social protection umbrella framing in later policy discourse
 * - Concepts: targeting, cash transfers, graduation, women as recipients, poverty scorecard themes
 * Avoid inventing exact beneficiary totals or budget figures unless verified
 */
export const POVERTY_ALLEVIATION_PAKISTAN_KIT: NoteKitData = {
  id: 'poverty-alleviation-pakistan',
  title: 'Poverty Alleviation in Pakistan (BISP and Ehsaas)',
  subtitle:
    'Social protection concepts, BISP cash transfers, and Ehsaas umbrella themes for CSS and current affairs.',
  syllabusTags: [
    'Poverty alleviation',
    'BISP',
    'Ehsaas',
    'Social protection',
    'Current affairs',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS / PMS',
      directive: 'Discuss',
      angle: 'Poverty alleviation strategies in Pakistan',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Evaluate',
      angle: 'BISP or Ehsaas as social safety nets',
      frequency: 'high',
    },
    {
      year: 'One-paper / MPT',
      directive: 'MCQ fact',
      angle: 'Expand BISP; social protection vocabulary',
      frequency: 'high',
    },
    {
      year: 'CSS Current Affairs',
      directive: 'Critically examine',
      angle: 'Cash transfers versus jobs and growth',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Poverty alleviation combines growth, jobs, human capital (education/health), and social protection. Exams expect both structural causes and programme tools.',
    'BISP (Benazir Income Support Programme): flagship federal cash-transfer / social safety net theme. Common teaching: support to poor households, often with women as registered recipients, using targeting tools such as poverty scorecard / NSER-type databases in later notes.',
    'Cash transfers: regular money support to eligible households. Strengths: quick relief, women empowerment themes, consumption smoothing. Limits: not a full substitute for jobs, inflation can erode value, targeting errors possible.',
    'Ehsaas: taught as a broader poverty alleviation and social protection umbrella / brand of programmes (cash, food, skills, and related initiatives in policy discourse). Use as framework language; do not invent a fake single-law text.',
    'Graduation idea: move households from temporary relief toward skills, assets, or livelihoods so they exit chronic dependence. Pair with education and health for lasting exit from poverty.',
    'Multi-dimensional poverty: income poverty is not enough; education, health, housing, and services matter (bridge to HDI and SDG 1).',
    'Implementation challenges: accurate targeting, fiscal space, political continuity, coordination across provinces, leakage and inclusion/exclusion errors, shock response (floods, inflation).',
    'Answer close: protect the poorest with transfers; invest in human capital and jobs; improve data and targeting; evaluate programmes with evidence, not slogans.',
  ],
  answerSteps: [
    'Define poverty and social protection briefly.',
    'Explain BISP as cash-transfer safety net with targeting themes.',
    'Place Ehsaas as broader umbrella framing.',
    'Add strengths and limits of cash transfers.',
    'Link to education, health, jobs, and multi-dimensional poverty.',
    'Conclude with reform: targeting, fiscal sustainability, and graduation.',
  ],
  questionVariants: [
    'Discuss poverty alleviation strategies in Pakistan with reference to BISP.',
    'Evaluate Ehsaas as a social protection approach.',
    'Critically examine cash transfers as a tool against poverty.',
    'How do education and health reinforce poverty graduation?',
  ],
  citations: [
    {
      label: 'BISP',
      text: 'Benazir Income Support Programme; flagship cash-transfer social safety net theme.',
    },
    {
      label: 'Ehsaas',
      text: 'Broader poverty alleviation / social protection umbrella framing in policy discourse.',
    },
    {
      label: 'Targeting',
      text: 'Poverty scorecard / database targeting themes; women as common recipient design point.',
    },
    {
      label: 'Limits',
      text: 'Transfers help consumption; lasting exit needs jobs and human capital.',
    },
  ],
  flashcards: [
    {
      prompt: 'Expand BISP.',
      answer: 'Benazir Income Support Programme',
    },
    {
      prompt: 'What type of programme is BISP in exam language?',
      answer: 'Cash-transfer / social safety net',
    },
    {
      prompt: 'What is Ehsaas in teaching?',
      answer: 'Broader social protection / poverty alleviation umbrella framing',
    },
    {
      prompt: 'Name one design theme of BISP.',
      answer: 'Women as registered recipients and/or poverty-score targeting',
    },
    {
      prompt: 'Strength of cash transfers?',
      answer: 'Quick relief and consumption smoothing',
    },
    {
      prompt: 'Limit of cash transfers?',
      answer: 'Not a full substitute for jobs; inflation and targeting errors',
    },
    {
      prompt: 'What is graduation in this context?',
      answer: 'Moving from relief toward livelihoods/skills/assets',
    },
    {
      prompt: 'Name a multi-dimensional poverty link.',
      answer: 'Education, health, and services beyond income alone',
    },
    {
      prompt: 'Name two implementation challenges.',
      answer: 'Targeting errors and fiscal space (or coordination, shocks)',
    },
    {
      prompt: 'Should beneficiary totals be invented?',
      answer: 'No; use concepts unless a figure is verified',
    },
  ],
  mistakes: [
    {
      trap: 'Treating cash transfers as the entire poverty solution.',
      correct: 'Pair transfers with jobs, education, and health.',
    },
    {
      trap: 'Confusing BISP expansion.',
      correct: 'Benazir Income Support Programme.',
    },
    {
      trap: 'Inventing exact budget or beneficiary numbers.',
      correct: 'Stay conceptual unless verified for a named year.',
    },
    {
      trap: 'Ignoring targeting and leakage issues.',
      correct: 'Inclusion/exclusion errors are standard critique points.',
    },
    {
      trap: 'Writing only slogans without programme tools.',
      correct: 'Name BISP/Ehsaas concepts and evaluation criteria.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'BISP expansion + cash-transfer definition.' },
    { day: 'Day 2', task: 'Ehsaas umbrella framing.' },
    { day: 'Day 3', task: 'Strengths, limits, graduation.' },
    { day: 'Day 4', task: 'Flashcards.' },
    { day: 'Day 5', task: 'Multi-dimensional poverty + HDI/SDG bridge.' },
    { day: 'Day 6', task: '10-minute evaluate outline.' },
    { day: 'Day 7', task: 'Recite one-pager.' },
  ],
  sourcesLine:
    'Sources: standard Pakistan current affairs notes on BISP and Ehsaas social protection concepts. Avoid unverified beneficiary and budget figures.',
}
