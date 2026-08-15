import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked:
 * - Urbanisation: rising share of population in cities; megacity pressures in Karachi, Lahore, and other large centres
 * - Housing shortage and informal settlements (katchi abadis) are standard exam concepts
 * - Do not invent precise 2026 housing deficit numbers; use structural causes and policy tools
 * - Policy themes: land, planning, transport, services, tenure security, climate risk in cities
 */
export const URBANIZATION_HOUSING_PAKISTAN_KIT: NoteKitData = {
  id: 'urbanization-housing-pakistan',
  title: 'Urbanisation and Housing in Pakistan',
  subtitle:
    'City growth, housing shortage, informal settlements, and governance tools for CSS/PMS.',
  syllabusTags: [
    'Urbanisation',
    'Housing policy',
    'Social problems',
    'Pakistan Affairs',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS / PMS',
      directive: 'Discuss',
      angle: 'Problems of urbanisation in Pakistan',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Evaluate',
      angle: 'Housing shortage and informal settlements',
      frequency: 'high',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'Katchi abadi / informal settlement concept',
      frequency: 'medium',
    },
    {
      year: 'CSS pattern',
      directive: 'Critically examine',
      angle: 'Urban planning and local government capacity',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Urbanisation: increasing concentration of people in towns and cities through rural-urban migration, natural increase, and expansion of urban boundaries.',
    'Drivers: jobs and services pull; rural push (land fragmentation, climate shocks, limited non-farm work); education and aspiration.',
    'Major city pressures (exam examples): Karachi, Lahore, and other large centres face congestion, housing stress, transport overload, waste, water, and governance fragmentation.',
    'Housing shortage: demand for affordable units exceeds formal supply. Causes include costly land, weak rental markets, limited social housing, speculative plots, and low-income informality.',
    'Informal settlements (often called katchi abadis in Pakistan discourse): settlements with insecure tenure, weak services, and self-built housing outside or at the edge of formal planning.',
    'Service and risk issues: sanitation, solid waste, flooding in low-lying areas, fire and building safety, and exclusion from formal credit.',
    'Policy toolkit: densification and affordable housing finance; tenure regularisation where appropriate; upgrade services in situ; public transport; land-use planning; climate-resilient drainage; stronger local governments and development authorities coordination.',
    'Do not invent a precise national housing deficit figure for 2026. Argue with causes, city examples, and policy instruments.',
  ],
  answerSteps: [
    'Define urbanisation and state main drivers in Pakistan.',
    'Describe city-level problems: housing, transport, services, environment.',
    'Explain housing shortage and informal settlements (katchi abadis).',
    'Offer reforms: tenure, finance, planning, transport, local capacity.',
    'Close with equity and climate resilience in cities.',
  ],
  questionVariants: [
    'Discuss the challenges of urbanisation in Pakistan.',
    'Evaluate the housing crisis and the growth of informal settlements.',
    'Critically examine urban planning and governance in major Pakistani cities.',
    'Suggest measures for affordable housing and sustainable cities in Pakistan.',
  ],
  citations: [
    {
      label: 'Urbanisation',
      text: 'Rising urban population share through migration, natural increase, and urban expansion.',
    },
    {
      label: 'Informal settlements',
      text: 'Katchi abadis / informal settlements: insecure tenure, limited services, self-built housing outside formal planning.',
    },
    {
      label: 'Housing shortage logic',
      text: 'Affordable formal supply lags demand due to land cost, weak rental options, and limited social housing.',
    },
    {
      label: 'Exam caution',
      text: 'Prefer structural analysis over invented deficit statistics.',
    },
  ],
  flashcards: [
    {
      prompt: 'What is urbanisation in one line?',
      answer: 'Growing share of people living in towns and cities',
    },
    {
      prompt: 'Name two pull factors for rural-urban migration.',
      answer: 'Jobs and better services/education opportunities',
    },
    {
      prompt: 'What are katchi abadis in exam language?',
      answer: 'Informal settlements with insecure tenure and weak services',
    },
    {
      prompt: 'Name two megacity pressures.',
      answer: 'Housing shortage, congestion, waste, water stress, or weak governance',
    },
    {
      prompt: 'Why does formal housing lag?',
      answer: 'Costly land, limited affordable supply, weak rental/social housing options',
    },
    {
      prompt: 'What does in situ upgrading mean?',
      answer: 'Improving services and tenure in existing informal settlements rather than only relocation',
    },
    {
      prompt: 'Name one climate risk for Pakistani cities.',
      answer: 'Urban flooding, heat, or drainage failure',
    },
    {
      prompt: 'Which governance actors matter for cities?',
      answer: 'Local governments, development authorities, utilities, and provincial departments',
    },
    {
      prompt: 'Give one affordable housing reform tool.',
      answer: 'Housing finance, densification, rental reforms, or serviced land for low-income groups',
    },
    {
      prompt: 'Should you quote a fake 2026 housing deficit number?',
      answer: 'No',
    },
  ],
  mistakes: [
    {
      trap: 'Treating urbanisation as only a Karachi story.',
      correct: 'Use major cities as examples, but discuss the national urbanisation process.',
    },
    {
      trap: 'Equating all informal settlements with crime.',
      correct: 'Exam framing focuses on tenure, services, poverty, and planning failure.',
    },
    {
      trap: 'Saying the only solution is demolition and relocation.',
      correct: 'In situ upgrading and tenure security are also standard policy options.',
    },
    {
      trap: 'Ignoring transport and land markets in housing answers.',
      correct: 'Housing is tied to land price, location, and commuting.',
    },
    {
      trap: 'Inventing precise deficit figures without a source.',
      correct: 'Use causes and policy tools; cite if you use a number.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Define urbanisation, drivers, and city examples.' },
    { day: 'Day 2', task: 'Map housing shortage causes and katchi abadi features.' },
    { day: 'Day 3', task: 'Write reforms: tenure, finance, transport, planning.' },
    { day: 'Day 4', task: 'Drill flashcards.' },
    { day: 'Day 5', task: 'Attempt critically examine on urban governance.' },
    { day: 'Day 6', task: 'One-pager + climate-in-cities note.' },
    { day: 'Day 7', task: 'Recite definitions and reform toolkit from memory.' },
  ],
  sourcesLine:
    'Sources: Pakistan Affairs urbanisation and housing chapters; standard katchi abadi / informal settlement teaching; sustainable cities themes linked to planning and local government. Avoid unsourced housing-deficit WhatsApp figures.',
}
