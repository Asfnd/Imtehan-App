import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked:
 * - Circular debt: unpaid dues cascading through generation, distribution, and government subsidies/receivables
 * - Generation mix concepts: thermal, hydro, nuclear, renewables (qualitative)
 * - CPEC energy projects: name-level corridor projects; do not invent fake MW totals
 * - Conservation and demand-side management as exam measures
 */
export const ENERGY_CRISIS_PAKISTAN_KIT: NoteKitData = {
  id: 'energy-crisis-pakistan',
  title: 'Energy Crisis in Pakistan',
  subtitle:
    'Circular debt concept, generation mix ideas, CPEC energy projects at name level, and conservation for CSS answers.',
  syllabusTags: [
    'Economy',
    'Energy',
    'Current affairs',
    'Pakistan Affairs',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS pattern',
      directive: 'Discuss',
      angle: 'Causes and remedies of Pakistan\'s energy crisis',
      frequency: 'high',
    },
    {
      year: 'CSS / PMS',
      directive: 'Critically examine',
      angle: 'Circular debt in the power sector',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Evaluate',
      angle: 'CPEC energy projects and energy security',
      frequency: 'medium',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'Circular debt meaning; generation mix categories',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Energy crisis in exam language: shortage or unreliable supply of electricity/fuel that hurts industry, households, and fiscal stability.',
    'Circular debt: unpaid bills and subsidy gaps create a chain of receivables among generators, distributors, fuel suppliers, and the government. Cash does not clear through the system.',
    'Drivers (concept level): fuel mix and import dependence, under-recoveries and theft/losses, delayed subsidies or tariff gaps, weak governance, and seasonal hydro variation.',
    'Generation mix ideas: thermal (often fuel-cost heavy), hydropower, nuclear, and renewables (solar/wind). Diversify for security; do not invent MW totals.',
    'CPEC energy projects (name-level): China-Pakistan Economic Corridor included multiple power projects aimed at adding generation capacity. Cite as capacity-building corridor projects, not as a completed end to all shortages.',
    'Remedies: reduce losses and theft, timely cost-reflective policy with consumer protection, improve collections, diversify generation, finish transmission bottlenecks, and push conservation.',
    'Exam rule: explain circular debt clearly, list mix categories, name CPEC carefully, add conservation. No fake megawatt tables.',
  ],
  answerSteps: [
    'Define the energy crisis as supply reliability plus fiscal stress, not only load-shedding stories.',
    'Explain circular debt as a receivables chain that starves the power system of cash.',
    'Map causes: fuel costs, losses, governance, and generation/transmission gaps.',
    'Describe generation mix diversification without inventing MW figures.',
    'Mention CPEC energy projects at name level as capacity additions under the corridor.',
    'Close with reforms and conservation: debt stock needs governance reform, not slogans.',
  ],
  questionVariants: [
    'Discuss the causes and solutions of Pakistan\'s energy crisis.',
    'Critically examine circular debt in the power sector.',
    'Evaluate the contribution of CPEC energy projects to energy security.',
    'Demand-side conservation is as important as new generation. Discuss.',
  ],
  citations: [
    {
      label: 'Circular debt',
      text: 'Circular debt refers to accumulated unpaid dues in the power-sector payment chain among generators, distributors, and government-related receivables/subsidies.',
    },
    {
      label: 'Generation mix',
      text: 'Pakistan\'s power system draws on thermal, hydro, nuclear, and renewable sources in varying shares over time.',
    },
    {
      label: 'CPEC energy',
      text: 'CPEC included energy-sector projects intended to expand generation capacity; cite at name level without invented MW totals.',
    },
    {
      label: 'Conservation',
      text: 'Demand-side management and efficiency reduce pressure on generation and on the fiscal cost of supply.',
    },
  ],
  flashcards: [
    {
      prompt: 'What is circular debt in one line?',
      answer: 'A chain of unpaid power-sector dues that blocks cash flow',
    },
    {
      prompt: 'Name four generation mix categories.',
      answer: 'Thermal, hydro, nuclear, renewables',
    },
    {
      prompt: 'How should CPEC energy be cited?',
      answer: 'Name-level corridor power projects that added capacity; no fake MW totals',
    },
    {
      prompt: 'Name one non-generation remedy.',
      answer: 'Reduce losses/theft, improve collections, or conservation',
    },
    {
      prompt: 'Why do thermal shares raise fiscal risk?',
      answer: 'Fuel import and cost shocks can raise generation costs',
    },
    {
      prompt: 'What trap must energy essays avoid?',
      answer: 'Inventing precise MW project totals from memory',
    },
  ],
  mistakes: [
    {
      trap: 'Reducing the crisis only to "not enough dams".',
      correct: 'Include circular debt, losses, tariffs/governance, and mix risk.',
    },
    {
      trap: 'Inventing exact MW figures for CPEC plants.',
      correct: 'Stay name-level unless you have a sourced number.',
    },
    {
      trap: 'Treating new plants alone as a full solution.',
      correct: 'Transmission, collections, and circular debt reform still matter.',
    },
    {
      trap: 'Ignoring conservation and efficiency.',
      correct: 'Demand-side measures belong in a complete answer.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Define circular debt in two sentences.' },
    { day: 'Day 2', task: 'Memorise generation mix categories.' },
    { day: 'Day 3', task: 'List causes and remedies in two columns.' },
    { day: 'Day 4', task: 'Write a 10-minute CPEC name-level paragraph.' },
    { day: 'Day 5', task: 'Drill flashcards; kill fake MW habits.' },
    { day: 'Day 6', task: 'Practice conservation-focused variant.' },
    { day: 'Day 7', task: 'One-pager only from memory.' },
  ],
  sourcesLine:
    'Sources: standard Pakistan power-sector public finance explanations of circular debt; CPEC energy project category at name level; FPSC economy/energy themes. Avoid unsourced megawatt WhatsApp lists.',
}
