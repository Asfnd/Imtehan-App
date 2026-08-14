import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked:
 * - Air pollution: urban smog (especially Punjab winter smog narrative), vehicle and industrial emissions, crop residue burning debates
 * - Water pollution: untreated industrial and municipal effluent, contamination of freshwater sources
 * - Solid waste: weak collection and disposal, open dumping, plastic waste urban stress
 * - Policy responses: environmental laws and EPA framework at name level, climate and clean-air measures, local government role
 * Link to climate-floods-smog kits without inventing fake AQI exacts for 2026
 */
export const ENVIRONMENTAL_POLLUTION_PAKISTAN_KIT: NoteKitData = {
  id: 'environmental-pollution-pakistan',
  title: 'Environmental Pollution in Pakistan',
  subtitle:
    'Air, water, and solid waste pollution, urban stress, and policy responses for CSS and PMS.',
  syllabusTags: [
    'Environment',
    'Urban problems',
    'Pakistan Affairs',
    'Current Affairs',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS pattern',
      directive: 'Discuss',
      angle: 'Environmental pollution and its impacts in Pakistan',
      frequency: 'high',
    },
    {
      year: 'CSS / PMS',
      directive: 'Critically examine',
      angle: 'Urban air and water pollution control',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Evaluate',
      angle: 'Policy and institutional responses to pollution',
      frequency: 'medium',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'Smog, EPA name-level, pollution types',
      frequency: 'high',
    },
  ],
  onePager: [
    'Environmental pollution in Pakistan is a multi-media problem: air, water, and solid waste, concentrated in fast-growing cities and industrial zones.',
    'Air: particulate pollution and winter smog narratives (especially in Punjab urban belts) link vehicles, industry, construction dust, and seasonal biomass burning debates.',
    'Water: untreated sewage and industrial effluent degrade rivers and groundwater. Contaminated water raises public health costs.',
    'Solid waste: incomplete collection, open dumping, and plastic waste create urban sanitation and drainage failures (flood amplify risk in cities).',
    'Impacts: health (respiratory and water-borne disease themes), productivity loss, ecosystem harm, and climate co-stress.',
    'Policy responses at syllabus level: environmental protection laws, federal/provincial EPA-type regulators, vehicle and industrial standards debates, waste management schemes, and climate/clean-air action plans. Implementation gaps are the critical point.',
    'Essay structure that scores: sources by medium, impacts, institutions, then enforcement and local government capacity, not only slogans.',
  ],
  answerSteps: [
    'Define pollution types: air, water, solid waste (add noise only if asked).',
    'Locate the problem in urbanisation and weak enforcement.',
    'Explain smog and water contamination with cause chains.',
    'State health, economic, and ecological impacts briefly.',
    'Name policy and EPA-type institutional responses, then critique implementation.',
    'Close with feasible priorities: monitoring, enforcement, waste systems, and cleaner transport/energy.',
  ],
  questionVariants: [
    'Discuss the major forms of environmental pollution in Pakistan.',
    'Critically examine the problem of urban air pollution and smog.',
    'Evaluate policy responses to water and solid waste pollution in Pakistan.',
    'How can Pakistan control environmental pollution effectively? Discuss.',
  ],
  citations: [
    {
      label: 'Air',
      text: 'Urban particulate pollution and seasonal smog are major public health and visibility problems in key cities.',
    },
    {
      label: 'Water',
      text: 'Untreated municipal and industrial effluent contaminates surface and groundwater sources.',
    },
    {
      label: 'Solid waste',
      text: 'Weak collection and open dumping, including plastics, stress urban sanitation systems.',
    },
    {
      label: 'Institutions',
      text: 'Environmental laws and EPA-type regulators exist; enforcement and capacity gaps are the usual critique.',
    },
    {
      label: 'Co-benefits',
      text: 'Cleaner transport, waste systems, and industry controls also support climate and health goals.',
    },
  ],
  flashcards: [
    {
      prompt: 'Name three pollution media for Pakistan essays.',
      answer: 'Air, water, solid waste',
    },
    {
      prompt: 'What seasonal urban air problem is heavily tested?',
      answer: 'Smog (especially winter urban smog narratives)',
    },
    {
      prompt: 'Name two air pollution sources.',
      answer: 'Vehicles and industry (or dust / biomass burning)',
    },
    {
      prompt: 'What commonly pollutes urban water?',
      answer: 'Untreated sewage and industrial effluent',
    },
    {
      prompt: 'Name one solid waste failure mode.',
      answer: 'Open dumping or weak collection/disposal',
    },
    {
      prompt: 'What does EPA stand for in environment answers?',
      answer: 'Environmental Protection Agency (federal/provincial regulators at name level)',
    },
    {
      prompt: 'What is the usual critical angle on policy?',
      answer: 'Laws exist; implementation and capacity are weak',
    },
    {
      prompt: 'Link solid waste to urban floods briefly.',
      answer: 'Blocked drains and dumping worsen urban flooding',
    },
    {
      prompt: 'Trap: inventing an exact AQI number for today.',
      answer: 'Describe smog qualitatively or cite a named monitoring source/date',
    },
    {
      prompt: 'Name one reform priority.',
      answer: 'Enforcement, monitoring, waste systems, or cleaner transport',
    },
  ],
  mistakes: [
    {
      trap: 'Writing only climate change when the question asks pollution.',
      correct: 'Cover air, water, and waste first. Climate can be a linked layer.',
    },
    {
      trap: 'Listing slogans without institutions or enforcement critique.',
      correct: 'Name EPA-type bodies and implementation gaps.',
    },
    {
      trap: 'Inventing precise nationwide pollution rankings without sources.',
      correct: 'Use careful language and named reports when quoting ranks.',
    },
    {
      trap: 'Ignoring local government and municipal services.',
      correct: 'Waste and drainage are local delivery problems as much as federal law problems.',
    },
    {
      trap: 'Treating smog as only fog weather.',
      correct: 'Smog is pollution-driven air quality crisis language in exam answers.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Read air, water, solid waste cause chains.' },
    { day: 'Day 2', task: 'Memorise impacts and EPA name-level response.' },
    { day: 'Day 3', task: 'Write a 10-minute outline on urban smog.' },
    { day: 'Day 4', task: 'Drill flashcards.' },
    { day: 'Day 5', task: 'Attempt policy critically examine outline.' },
    { day: 'Day 6', task: 'One-pager + citations. Practice MCQs.' },
    { day: 'Day 7', task: 'One-pager only. Recite three media and reforms.' },
  ],
  sourcesLine:
    'Sources: Pakistan environmental policy and EPA framework at name level; urban smog and waste discussions in standard current affairs materials; FPSC environment syllabus items. Avoid unsourced AQI WhatsApp forwards.',
}
