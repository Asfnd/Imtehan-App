import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (syllabus-level mega-city governance):
 * - Karachi: Pakistan largest city / major economic hub; port city on Arabian Sea
 * - Governance challenges taught in exams: fragmented institutions, local government instability, service delivery
 * - Urban themes: water, transport, housing/katchi abadis, solid waste, crime and policing coordination
 * - Economic weight: industry, finance, remittances gateway, customs/port revenues theme
 * Do not invent fake exact population totals as frozen forever; keep structure and challenge framing
 */
export const KARACHI_URBAN_GOVERNANCE_KIT: NoteKitData = {
  id: 'karachi-urban-governance',
  title: 'Karachi Urban Governance',
  subtitle:
    'Mega-city institutions, service delivery, and political-administrative challenges at syllabus level for CSS and PMS.',
  syllabusTags: [
    'Pakistan Affairs',
    'Urbanization',
    'Local government',
    'Governance',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS / PMS Pakistan Affairs',
      directive: 'Discuss',
      angle: 'Problems of Karachi and urban governance',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Critically examine',
      angle: 'Institutional fragmentation in mega-city management',
      frequency: 'high',
    },
    {
      year: 'CSS / PMS',
      directive: 'Evaluate',
      angle: 'Local government and service delivery in Karachi',
      frequency: 'medium',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'Karachi as economic/port hub themes',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Karachi is Pakistan largest city and principal commercial-port hub. Exams treat it as a mega-city governance case study, not only a crime headline.',
    'Economic role: industry, trade, finance, and port logistics give Karachi outsized national importance; urban failure has national costs.',
    'Core governance problem taught: overlapping and fragmented agencies (municipal, provincial, federal, utility, and land authorities) create unclear accountability.',
    'Local government instability and weak continuity of elected municipal capacity are recurring written-answer themes.',
    'Service delivery cluster: water and sewerage, solid waste, public transport, and housing/informal settlements (katchi abadis) strain capacity.',
    'Land and housing: informal growth, encroachment disputes, and affordable housing shortages complicate planning.',
    'Security and order: policing coordination, street crime themes, and political violence history appear in essays; keep analytical and avoid sensational detail.',
    'Reform frame: clarify mandates, empower stable local government, integrate planning, digitize land records, invest in mass transit and water systems, and build provincial-city partnership.',
  ],
  answerSteps: [
    'State Karachi economic and demographic importance in one opening line.',
    'Explain institutional fragmentation as the structural core problem.',
    'Cover service delivery: water, waste, transport, housing.',
    'Add politics/local government continuity carefully.',
    'Mention security as governance coordination, not sensationalism.',
    'Close with institutional reforms and investment priorities.',
  ],
  questionVariants: [
    'Discuss the urban governance challenges of Karachi.',
    'Critically examine institutional fragmentation in the management of Karachi.',
    'Evaluate the role of local government in improving Karachi service delivery.',
    'Suggest reforms for mega-city governance with reference to Karachi.',
  ],
  citations: [
    {
      label: 'City role',
      text: 'Karachi is the principal commercial and port hub of Pakistan and a classic mega-city case in exams.',
    },
    {
      label: 'Fragmentation',
      text: 'Overlapping municipal, provincial, federal, and utility mandates create accountability gaps.',
    },
    {
      label: 'Services',
      text: 'Water, waste, transport, and informal housing are core service-delivery themes.',
    },
    {
      label: 'Reform',
      text: 'Stable local government, clear mandates, and integrated planning are standard way-forward points.',
    },
  ],
  flashcards: [
    {
      prompt: 'Why is Karachi a national governance topic?',
      answer: 'Largest city and main commercial-port hub; failures have national costs',
    },
    {
      prompt: 'What is the structural core problem in exam framing?',
      answer: 'Institutional fragmentation and unclear accountability',
    },
    {
      prompt: 'Name four service delivery pressure points.',
      answer: 'Water, solid waste, transport, housing/informal settlements',
    },
    {
      prompt: 'What local government issue recurs in essays?',
      answer: 'Instability and weak continuity of municipal capacity',
    },
    {
      prompt: 'How should security be framed?',
      answer: 'As coordination and order challenges, without sensational detail',
    },
    {
      prompt: 'What land theme is high-yield?',
      answer: 'Informal growth, encroachment disputes, affordable housing gaps',
    },
    {
      prompt: 'Name one reform pillar.',
      answer: 'Clarify agency mandates and empower stable local government',
    },
    {
      prompt: 'Name a second reform pillar.',
      answer: 'Integrated planning plus water and mass-transit investment',
    },
    {
      prompt: 'Should you invent exact population totals as permanent facts?',
      answer: 'No; describe scale and challenges, avoid frozen fake precision',
    },
    {
      prompt: 'What mistake turns a Karachi essay into a rant?',
      answer: 'Crime headlines without institutional analysis',
    },
  ],
  mistakes: [
    {
      trap: 'Writing only about crime and ignoring institutions.',
      correct: 'Lead with fragmentation, services, and local government.',
    },
    {
      trap: 'Treating Karachi as only a Sindh local issue.',
      correct: 'National economic weight makes it a federal-provincial concern too.',
    },
    {
      trap: 'Proposing a single new agency as a magic fix.',
      correct: 'Clarify mandates, continuity, and financing together.',
    },
    {
      trap: 'Ignoring informal settlements.',
      correct: 'Housing and katchi abadis are core urban syllabus points.',
    },
    {
      trap: 'Using sensational street-level detail.',
      correct: 'Keep syllabus-level analytical tone.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Memorise economic role + fragmentation thesis.' },
    { day: 'Day 2', task: 'List four service clusters with one line each.' },
    { day: 'Day 3', task: 'Local government continuity paragraph.' },
    { day: 'Day 4', task: 'Flashcards drill.' },
    { day: 'Day 5', task: '10-minute reform answer outline.' },
    { day: 'Day 6', task: 'Compare Karachi briefly with general urbanization kit themes.' },
    { day: 'Day 7', task: 'Recite one-pager.' },
  ],
  sourcesLine:
    'Sources: standard Pakistan Affairs urbanization and local government notes; mega-city governance teaching on Karachi institutions and services. Avoid sensational crime narratives and invented population precision.',
}
