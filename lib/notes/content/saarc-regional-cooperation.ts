import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked:
 * - SAARC founded 1985; headquarters Kathmandu, Nepal
 * - Members (8): Afghanistan, Bangladesh, Bhutan, India, Maldives, Nepal, Pakistan, Sri Lanka
 * - SAPTA: SAARC Preferential Trading Arrangement (name-level)
 * - SAFTA: South Asian Free Trade Area (name-level)
 * - Challenges: India-Pakistan tensions, weak implementation, limited intra-regional trade, summit interruptions
 * - Distinct from the broader OIC/SAARC/SCO overview kit: go deeper on SAARC only
 */
export const SAARC_REGIONAL_COOPERATION_KIT: NoteKitData = {
  id: 'saarc-regional-cooperation',
  title: 'SAARC and Regional Cooperation in South Asia',
  subtitle:
    'Founding, members, SAPTA/SAFTA, and why SAARC underperforms for CSS/PMS and GK.',
  syllabusTags: [
    'SAARC',
    'Regional cooperation',
    'International organizations',
    'Current affairs',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS / PMS',
      directive: 'Discuss',
      angle: 'SAARC as a vehicle of regional cooperation',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Critically examine',
      angle: 'Why SAARC has achieved limited success',
      frequency: 'high',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'Founding year, HQ, members, SAPTA/SAFTA',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Evaluate',
      angle: 'SAPTA to SAFTA and intra-regional trade',
      frequency: 'medium',
    },
  ],
  onePager: [
    'SAARC: South Asian Association for Regional Cooperation. Founded 1985. Secretariat/HQ: Kathmandu, Nepal.',
    'Eight members: Afghanistan, Bangladesh, Bhutan, India, Maldives, Nepal, Pakistan, Sri Lanka. Afghanistan joined later (2007 in standard teaching).',
    'Objectives in exam language: promote welfare, economic growth, social progress, and collective self-reliance through regional cooperation; cooperate in agreed areas while respecting sovereignty.',
    'SAPTA: SAARC Preferential Trading Arrangement. Early preferential trade step (name-level MCQ).',
    'SAFTA: South Asian Free Trade Area. Deeper free-trade ambition for the region (name-level MCQ). Implementation and utilisation remain weak relative to potential.',
    'Functional areas often listed: agriculture, rural development, health, education, environment, connectivity, poverty alleviation, and people-to-people contact.',
    'Why limited success: India-Pakistan political conflict; summit cancellations and trust deficits; asymmetric economies; non-tariff barriers; weak connectivity; preference for bilateralism or extra-regional forums (e.g. other groupings).',
    'Pakistan angle: support genuine regional economic cooperation, but political normalisation and trade facilitation are prerequisites. Diversify with other forums while not abandoning South Asian economic logic.',
    'Answer structure: origin → members/HQ → aims → SAPTA/SAFTA → achievements (modest) → challenges → way forward.',
  ],
  answerSteps: [
    'State founding year, full form, and Kathmandu HQ.',
    'List eight members and note Afghanistan’s later entry.',
    'Explain SAPTA and SAFTA as trade-liberalisation steps.',
    'Critically examine political and economic obstacles.',
    'Close with practical reforms: connectivity, NTBs, and political will.',
  ],
  questionVariants: [
    'Discuss the role of SAARC in promoting regional cooperation in South Asia.',
    'Critically examine the failures and limited achievements of SAARC.',
    'Evaluate SAPTA and SAFTA as instruments of South Asian economic integration.',
    'Can SAARC revive? Suggest a realistic roadmap.',
  ],
  citations: [
    {
      label: 'Founding and HQ',
      text: 'SAARC founded 1985; headquarters in Kathmandu, Nepal.',
    },
    {
      label: 'Members',
      text: 'Eight: Afghanistan, Bangladesh, Bhutan, India, Maldives, Nepal, Pakistan, Sri Lanka.',
    },
    {
      label: 'SAPTA',
      text: 'SAARC Preferential Trading Arrangement (preferential trade step).',
    },
    {
      label: 'SAFTA',
      text: 'South Asian Free Trade Area (free-trade framework for the region).',
    },
  ],
  flashcards: [
    { prompt: 'Expand SAARC.', answer: 'South Asian Association for Regional Cooperation' },
    { prompt: 'When was SAARC founded?', answer: '1985' },
    { prompt: 'Where is the SAARC secretariat/HQ?', answer: 'Kathmandu, Nepal' },
    { prompt: 'How many SAARC members?', answer: 'Eight' },
    {
      prompt: 'Expand SAPTA.',
      answer: 'SAARC Preferential Trading Arrangement',
    },
    {
      prompt: 'Expand SAFTA.',
      answer: 'South Asian Free Trade Area',
    },
    {
      prompt: 'Which country joined SAARC later in standard teaching?',
      answer: 'Afghanistan (2007)',
    },
    {
      prompt: 'Name the biggest political obstacle to SAARC.',
      answer: 'India-Pakistan tensions and trust deficits',
    },
    {
      prompt: 'Why is intra-regional trade low?',
      answer: 'Politics, non-tariff barriers, weak connectivity, and limited implementation',
    },
    {
      prompt: 'SAPTA vs SAFTA in one contrast?',
      answer: 'SAPTA = preferential trade step; SAFTA = free-trade area ambition',
    },
  ],
  mistakes: [
    {
      trap: 'Confusing SAARC HQ with New Delhi or Islamabad.',
      correct: 'Headquarters is Kathmandu, Nepal.',
    },
    {
      trap: 'Mixing SAPTA and SAFTA expansions.',
      correct: 'SAPTA = Preferential Trading Arrangement; SAFTA = Free Trade Area.',
    },
    {
      trap: 'Saying SAARC has seven members and forgetting Afghanistan.',
      correct: 'Current standard count is eight members.',
    },
    {
      trap: 'Claiming SAFTA has fully integrated South Asian trade.',
      correct: 'Ambition exists; utilisation and political obstacles remain large.',
    },
    {
      trap: 'Treating SAARC as a military alliance.',
      correct: 'It is a regional cooperation organisation, not a defence pact.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Memorise founding year, HQ, full form, eight members.' },
    { day: 'Day 2', task: 'Learn SAPTA and SAFTA expansions and contrast.' },
    { day: 'Day 3', task: 'List five reasons for limited success.' },
    { day: 'Day 4', task: 'Drill flashcards and MCQs.' },
    { day: 'Day 5', task: 'Write critically examine outline on SAARC failures.' },
    { day: 'Day 6', task: 'One-pager + way-forward reforms.' },
    { day: 'Day 7', task: 'Recite facts from memory without notes.' },
  ],
  sourcesLine:
    'Sources: SAARC institutional facts (1985, Kathmandu); standard SAPTA/SAFTA naming in international organisations chapters; South Asian regionalism critiques in CSS current affairs. Prefer verified member lists over viral charts.',
}
