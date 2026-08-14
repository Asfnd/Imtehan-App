import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked:
 * - 2022 Pakistan floods: major national disaster reference for exams (monsoon + Indus basin)
 * - Monsoon and Indus basin geography drive flood vulnerability
 * - Urban smog: winter pollution episodes in Punjab cities including Lahore (exam name-level)
 * - Paris Agreement (2015) under UNFCCC; COP = Conference of the Parties
 * - Avoid inventing fake casualty totals; teach mechanisms and named frameworks
 */
export const CLIMATE_FLOODS_SMOG_PAKISTAN_KIT: NoteKitData = {
  id: 'climate-floods-smog-pakistan',
  title: 'Climate Change, Floods and Smog in Pakistan',
  subtitle:
    '2022 floods as a reference event, monsoon and Indus vulnerability, urban smog, and Paris/COP name-level facts.',
  syllabusTags: [
    'Environment and climate',
    'Current affairs',
    'Pakistan geography',
    'Disaster management',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: '2022 floods and monsoon / Indus basin',
      frequency: 'high',
    },
    {
      year: 'CSS / PMS',
      directive: 'Discuss',
      angle: 'Climate vulnerability of Pakistan',
      frequency: 'high',
    },
    {
      year: 'PPSC / NTS',
      directive: 'MCQ fact',
      angle: 'Paris Agreement / COP basics',
      frequency: 'high',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'Urban smog causes in Punjab cities',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Pakistan is highly exposed to climate risks: heatwaves, glacial melt and GLOF risk in the north, monsoon extremes, floods, drought, and coastal threats.',
    '2022 floods are the major recent national reference event: extreme monsoon rainfall, widespread inundation especially linked to the Indus basin system, huge human and economic loss.',
    'Indus basin vulnerability: dense population on floodplains, monsoon dependence, glacier-fed rivers, and limited room for error when peaks coincide with heavy rain.',
    'Monsoon (roughly summer season rains) is central to agriculture and to flood risk when rainfall is extreme or poorly timed.',
    'Urban smog: winter haze and dangerous air quality in cities such as Lahore and other Punjab centres. Drivers include vehicle emissions, industry, crop residue burning, dust, and weather that traps pollutants.',
    'UNFCCC is the main UN climate treaty framework. Paris Agreement (2015) aims to limit global warming, with nationally determined contributions (NDCs).',
    'COP means Conference of the Parties (annual climate negotiation meetings under the UNFCCC track). Exams usually want name-level awareness, not every host city.',
    'Exam angle: adaptation (early warning, drainage, zoning, resilient crops) plus mitigation (cleaner energy, less pollution), and disaster management institutions as context.',
  ],
  answerSteps: [
    'Open with Pakistan climate vulnerability in one sentence.',
    'Use 2022 floods as the concrete case (monsoon + Indus basin exposure).',
    'Add one urban air pollution / smog point if the question allows environment broadly.',
    'Name Paris Agreement (2015) and COP/UNFCCC only as framework anchors.',
    'Close with adaptation and resilience, not slogans alone.',
  ],
  questionVariants: [
    'Discuss Pakistan vulnerability to climate-induced floods with reference to 2022.',
    'Explain the link between monsoon variability and Indus basin flood risk.',
    'What causes winter smog in major Punjab cities?',
    'Write a short note on the Paris Agreement for competitive exams.',
  ],
  citations: [
    {
      label: '2022 floods',
      text: '2022 Pakistan floods followed extreme monsoon rains and caused nationwide inundation with major human and economic impact, especially across Indus basin landscapes.',
    },
    {
      label: 'Monsoon',
      text: 'Summer monsoon rains are a main rainfall system for Pakistan and a key flood driver when extreme.',
    },
    {
      label: 'Smog',
      text: 'Winter smog in cities such as Lahore is linked to emissions, crop burning, industry, dust, and stagnant weather conditions.',
    },
    {
      label: 'Paris Agreement',
      text: 'Paris Agreement (2015) under the UNFCCC framework; countries submit NDCs on climate action.',
    },
    {
      label: 'COP',
      text: 'COP is the Conference of the Parties meeting for climate negotiations under the UNFCCC process.',
    },
  ],
  flashcards: [
    {
      prompt: 'Which year is the major recent Pakistan flood disaster often cited in exams?',
      answer: '2022',
    },
    {
      prompt: 'Which rainfall system is central to Pakistan summer floods?',
      answer: 'Monsoon',
    },
    {
      prompt: 'Which river basin is most linked to Pakistan flood vulnerability?',
      answer: 'Indus basin',
    },
    {
      prompt: 'Name one northern climate hazard linked to glaciers.',
      answer: 'GLOF (glacial lake outburst flood) risk',
    },
    {
      prompt: 'Which major city is frequently named in Pakistan smog MCQs?',
      answer: 'Lahore (also other Punjab cities)',
    },
    {
      prompt: 'Name two common smog drivers.',
      answer: 'Vehicle/industrial emissions and crop residue burning (plus dust / weather trapping)',
    },
    {
      prompt: 'In which season is urban smog worst in Punjab?',
      answer: 'Winter',
    },
    {
      prompt: 'What does UNFCCC stand for at name level?',
      answer: 'United Nations Framework Convention on Climate Change',
    },
    {
      prompt: 'When was the Paris Agreement adopted?',
      answer: '2015',
    },
    {
      prompt: 'What does COP mean in climate talks?',
      answer: 'Conference of the Parties',
    },
    {
      prompt: 'What are NDCs in the Paris framework?',
      answer: 'Nationally Determined Contributions (country climate pledges)',
    },
    {
      prompt: 'Adaptation vs mitigation in one line?',
      answer: 'Adaptation = cope with impacts; mitigation = reduce emissions / drivers of warming',
    },
  ],
  mistakes: [
    {
      trap: 'Inventing exact death or loss figures for 2022 without a sourced number.',
      correct: 'State scale and causes. Use official figures only when you have them.',
    },
    {
      trap: 'Blaming smog only on cars and ignoring crop burning and weather.',
      correct: 'Smog is multi-source plus meteorology that traps pollutants.',
    },
    {
      trap: 'Calling the Paris Agreement a 2022 floods treaty.',
      correct: 'Paris Agreement is the 2015 global climate pact under UNFCCC. Floods are a national disaster case.',
    },
    {
      trap: 'Mixing COP with OPEC.',
      correct: 'COP = climate Conference of the Parties. OPEC = oil producers group.',
    },
    {
      trap: 'Saying Pakistan has no monsoon link to floods.',
      correct: 'Extreme monsoon rainfall is a core flood driver in the Indus basin story.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Read 2022 floods + Indus basin vulnerability.' },
    { day: 'Day 2', task: 'Memorise monsoon and GLOF name-level facts.' },
    { day: 'Day 3', task: 'Smog causes and Lahore/Punjab winter pattern.' },
    { day: 'Day 4', task: 'Paris Agreement 2015, UNFCCC, COP, NDC.' },
    { day: 'Day 5', task: 'Write a 10-minute floods answer outline.' },
    { day: 'Day 6', task: 'Flashcards and trap dates/names.' },
    { day: 'Day 7', task: 'One-pager only. Recite adaptation vs mitigation.' },
  ],
  sourcesLine:
    'Sources: standard Pakistan environment and geography syllabus; UNFCCC/Paris Agreement name-level facts; widely reported 2022 flood event as national reference. Avoid unsourced casualty WhatsApp totals.',
}
