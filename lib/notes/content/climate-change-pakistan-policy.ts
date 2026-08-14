import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked:
 * - Distinct from floods/smog event kit: focus policy response, NDCs, adaptation vs mitigation
 * - Paris Agreement 2015 under UNFCCC; NDCs = Nationally Determined Contributions
 * - Pakistan vulnerability: glaciers/GLOF, monsoon extremes, floods, heat, coastal exposure
 * - Avoid inventing 2026 emission percentages or fake NDC numeric targets; teach frameworks
 */
export const CLIMATE_CHANGE_PAKISTAN_POLICY_KIT: NoteKitData = {
  id: 'climate-change-pakistan-policy',
  title: 'Climate Change and Pakistan Policy Response',
  subtitle:
    'Vulnerability, Paris/NDC name-level facts, adaptation vs mitigation, and floods/glaciers/GLOF concepts for policy answers.',
  syllabusTags: [
    'Climate change policy',
    'Environment',
    'Current affairs',
    'Disaster risk reduction',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS / PMS',
      directive: 'Discuss',
      angle: 'Pakistan climate vulnerability and policy response',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Critically examine',
      angle: 'Adaptation versus mitigation priorities for Pakistan',
      frequency: 'high',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'Paris Agreement, NDC, GLOF meanings',
      frequency: 'high',
    },
    {
      year: 'PPSC / NTS',
      directive: 'MCQ fact',
      angle: 'UNFCCC / COP name-level',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Policy kit focus: how Pakistan should respond, not only disaster description. Pair with the floods/smog kit for event detail.',
    'Vulnerability: high exposure to monsoon extremes, Indus basin floods, heatwaves, drought risk, northern glacial melt, and coastal threats.',
    'Glaciers and GLOF: northern mountain ice feeds rivers; Glacier Lake Outburst Flood (GLOF) is a sudden release from a glacial lake that can devastate downstream valleys.',
    'Adaptation: adjust to impacts already arriving (early warning, floodplain management, resilient crops, drainage, heat plans, livelihood support).',
    'Mitigation: reduce greenhouse gas emissions (cleaner energy mix, efficiency, transport and industry pollution cuts). Pakistan exams often stress adaptation as urgent because of low historical emissions share but high impact.',
    'UNFCCC: main UN climate treaty framework. COP: Conference of the Parties (negotiation meetings).',
    'Paris Agreement (2015): global pact to limit warming; countries submit NDCs (Nationally Determined Contributions) stating climate plans.',
    'Pakistan policy answer pillars: climate governance and laws at name level, disaster risk reduction, water and agriculture resilience, energy transition direction, and international climate finance diplomacy.',
    'Do not invent exact 2026 emission shares or fake NDC percentages. Use framework language and verified concepts.',
    'Exam close: vulnerability + adaptation priority + mitigation where feasible + institutions and finance, without slogans alone.',
  ],
  answerSteps: [
    'Open with vulnerability in one sentence (monsoon, Indus, glaciers/GLOF, heat).',
    'Define adaptation and mitigation clearly, then argue Pakistan priority mix.',
    'Name Paris Agreement (2015) and NDCs as the international policy frame.',
    'Add GLOF and flood risk as policy drivers for early warning and land-use rules.',
    'Close with governance, DRR, and climate finance as enabling conditions.',
  ],
  questionVariants: [
    'Discuss Pakistan vulnerability to climate change and the required policy response.',
    'Differentiate adaptation and mitigation with reference to Pakistan.',
    'Write a short note on the Paris Agreement and NDCs.',
    'Explain GLOF risk and its relevance to northern Pakistan.',
  ],
  citations: [
    {
      label: 'Vulnerability',
      text: 'Pakistan faces monsoon extremes, Indus flood exposure, heat and drought stress, glacial melt and GLOF risk in the north, and coastal threats.',
    },
    {
      label: 'GLOF',
      text: 'Glacier Lake Outburst Flood: sudden release from a glacial lake, a major mountain hazard concept in exams.',
    },
    {
      label: 'Paris / NDC',
      text: 'Paris Agreement (2015) under the UNFCCC track; NDCs are nationally determined climate contribution plans.',
    },
    {
      label: 'Policy split',
      text: 'Adaptation reduces harm from impacts; mitigation reduces emissions. Pakistan answers usually emphasise adaptation urgency plus feasible mitigation.',
    },
  ],
  flashcards: [
    {
      prompt: 'What does NDC stand for?',
      answer: 'Nationally Determined Contribution',
    },
    {
      prompt: 'Paris Agreement year?',
      answer: '2015',
    },
    {
      prompt: 'What is UNFCCC in one line?',
      answer: 'Main UN climate change treaty framework',
    },
    {
      prompt: 'What does COP mean?',
      answer: 'Conference of the Parties',
    },
    {
      prompt: 'Adaptation vs mitigation?',
      answer: 'Adaptation = adjust to impacts; mitigation = cut emissions',
    },
    {
      prompt: 'What is GLOF?',
      answer: 'Glacier Lake Outburst Flood',
    },
    {
      prompt: 'Why is GLOF relevant to Pakistan?',
      answer: 'Northern glacial regions face glacial lake burst risk to valleys downstream',
    },
    {
      prompt: 'Name three Pakistan climate exposure themes.',
      answer: 'Monsoon/floods; glacial melt/GLOF; heat/drought (also coastal)',
    },
    {
      prompt: 'Why do exams stress adaptation for Pakistan?',
      answer: 'High impact exposure makes resilience urgent even while mitigation remains relevant',
    },
    {
      prompt: 'Name two policy response pillars.',
      answer: 'Early warning/DRR and resilient water-agriculture systems (also cleaner energy / climate finance)',
    },
  ],
  mistakes: [
    {
      trap: 'Only narrating 2022 floods without policy tools.',
      correct: 'Use floods as evidence of vulnerability, then pivot to adaptation, NDC/Paris, and governance.',
    },
    {
      trap: 'Inventing exact emission percentages or 2026 NDC numbers.',
      correct: 'Teach Paris/NDC frameworks and concepts. Skip fake statistics.',
    },
    {
      trap: 'Treating adaptation and mitigation as synonyms.',
      correct: 'Adaptation manages impacts; mitigation cuts emissions.',
    },
    {
      trap: 'Calling GLOF a type of urban smog.',
      correct: 'GLOF is a glacial lake outburst flood hazard in mountain regions.',
    },
    {
      trap: 'Confusing this kit with the floods/smog event kit.',
      correct: 'This kit is policy response. The other kit is hazard and event detail.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Learn vulnerability map: floods, glaciers/GLOF, heat, coast.' },
    { day: 'Day 2', task: 'Memorise Paris 2015, UNFCCC, COP, NDC definitions.' },
    { day: 'Day 3', task: 'Write adaptation vs mitigation with Pakistan examples.' },
    { day: 'Day 4', task: 'Drill flashcards.' },
    { day: 'Day 5', task: 'Outline a full policy response answer.' },
    { day: 'Day 6', task: 'Cross-revise with floods/smog kit for event facts only.' },
    { day: 'Day 7', task: 'One-pager recall without notes.' },
  ],
  sourcesLine:
    'Sources: UNFCCC/Paris Agreement public framework; standard Pakistan climate vulnerability teaching (monsoon, Indus, glaciers/GLOF); disaster risk reduction concepts. Avoid unsourced numeric NDC claims.',
}
