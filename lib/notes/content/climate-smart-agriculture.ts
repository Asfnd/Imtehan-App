import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (FAO CSA teaching at syllabus level):
 * - Climate-Smart Agriculture: sustainably increase productivity; adapt/build resilience; reduce/remove GHG where possible
 * - Pakistan relevance: heat, water stress, floods, changing monsoon, Indus irrigation efficiency
 * Keep practices at concept level; avoid fake project completion claims
 */
export const CLIMATE_SMART_AGRICULTURE_KIT: NoteKitData = {
  id: 'climate-smart-agriculture',
  title: 'Climate-Smart Agriculture',
  subtitle:
    'Productivity, adaptation, and mitigation pillars applied to Pakistan water, heat, and flood risks for CSS.',
  syllabusTags: [
    'Climate-smart agriculture',
    'Agriculture',
    'Climate change',
    'Food security',
    'Current affairs',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS / PMS',
      directive: 'Discuss',
      angle: 'Climate-smart agriculture for Pakistan',
      frequency: 'medium',
    },
    {
      year: 'CSS pattern',
      directive: 'Evaluate',
      angle: 'Adaptation of farming to climate change',
      frequency: 'high',
    },
    {
      year: 'CSS Current Affairs',
      directive: 'Critically examine',
      angle: 'Water-efficient agriculture and food security',
      frequency: 'high',
    },
    {
      year: 'One-paper',
      directive: 'MCQ / short',
      angle: 'Three CSA pillars',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Climate-Smart Agriculture (CSA) is an approach to transform and reorient agricultural systems to support food security under climate change. FAO teaching often lists three pillars.',
    'Three pillars: (1) sustainably increase agricultural productivity and incomes; (2) adapt and build resilience to climate change; (3) reduce and/or remove greenhouse gas emissions where possible.',
    'Pakistan why-it-matters: heat stress, water scarcity and inefficient irrigation, flood and drought swings, and soil degradation threaten yields and rural livelihoods.',
    'Adaptation practices (concept level): drought- or heat-tolerant varieties; adjusted sowing dates; diversification; better weather information for farmers; flood-resilient planning in vulnerable plains.',
    'Water-smart practices: laser land levelling themes, efficient irrigation scheduling, reduce conveyance losses, and shift where suitable toward less water-intensive choices. Link to Indus water stress.',
    'Soil and input efficiency: balanced fertilizer use, organic matter, conservation tillage themes, and reduce post-harvest loss. Efficiency can serve both productivity and emission intensity goals.',
    'Mitigation caution: agriculture emissions exist, but exam answers should not pretend smallholders can carry the whole climate burden. Prioritise food security and adaptation while improving efficiency.',
    'Enablers: extension services, credit and insurance themes, research, market access, and gender-inclusive farmer support. CSA fails if knowledge and finance never reach the field.',
  ],
  answerSteps: [
    'Define CSA and list the three pillars.',
    'Explain Pakistan climate risks to farming.',
    'Give adaptation and water-efficiency examples at concept level.',
    'Add soil/input efficiency and resilience to floods/drought.',
    'Note mitigation as efficiency, not farmer-blaming.',
    'Close with extension, finance, and food-security link.',
  ],
  questionVariants: [
    'What is climate-smart agriculture? Discuss its pillars for Pakistan.',
    'Evaluate water-efficient farming as climate adaptation.',
    'How can CSA support food security under heat and flood risk?',
    'Critically examine barriers to adopting climate-smart practices.',
  ],
  citations: [
    {
      label: 'Definition',
      text: 'CSA supports food security under climate change via productivity, adaptation, and mitigation where possible.',
    },
    {
      label: 'Pillars',
      text: 'Productivity/incomes; adaptation/resilience; reduce/remove GHG where possible (FAO teaching).',
    },
    {
      label: 'Pakistan',
      text: 'Heat, water stress, floods/drought, and irrigation efficiency needs.',
    },
    {
      label: 'Enablers',
      text: 'Extension, finance/insurance themes, research, and inclusive support.',
    },
  ],
  flashcards: [
    {
      prompt: 'Expand CSA.',
      answer: 'Climate-Smart Agriculture',
    },
    {
      prompt: 'Name the three CSA pillars.',
      answer: 'Productivity, adaptation/resilience, mitigation where possible',
    },
    {
      prompt: 'Why does Pakistan need CSA?',
      answer: 'Heat, water stress, and flood/drought swings hit yields',
    },
    {
      prompt: 'Name two adaptation practices.',
      answer: 'Tolerant varieties and adjusted sowing / diversification',
    },
    {
      prompt: 'Name a water-smart theme.',
      answer: 'Efficient irrigation scheduling or reduce conveyance losses',
    },
    {
      prompt: 'How does CSA link to food security?',
      answer: 'Protects productivity and resilience so supply and incomes hold under climate stress',
    },
    {
      prompt: 'Should mitigation blame smallholders?',
      answer: 'No; prioritise adaptation and efficiency fairly',
    },
    {
      prompt: 'Name one enabler beyond on-farm technique.',
      answer: 'Extension services or credit/insurance access',
    },
    {
      prompt: 'Soil/input efficiency example?',
      answer: 'Balanced fertilizer use and reduce post-harvest loss',
    },
    {
      prompt: 'Exam trap on projects?',
      answer: 'Do not invent completed mega-project claims',
    },
  ],
  mistakes: [
    {
      trap: 'Defining CSA as only organic farming slogans.',
      correct: 'Use the three pillars: productivity, adaptation, mitigation.',
    },
    {
      trap: 'Ignoring water efficiency in Pakistan answers.',
      correct: 'Indus water stress makes water-smart practices central.',
    },
    {
      trap: 'Listing practices without enablers.',
      correct: 'Extension, finance, and information make adoption possible.',
    },
    {
      trap: 'Inventing emission reduction percentages.',
      correct: 'Keep mitigation qualitative unless verified.',
    },
    {
      trap: 'Separating CSA from food security.',
      correct: 'CSA exists to support food security under climate change.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Memorise three CSA pillars.' },
    { day: 'Day 2', task: 'Pakistan climate-agriculture risks.' },
    { day: 'Day 3', task: 'Water and adaptation practice list.' },
    { day: 'Day 4', task: 'Flashcards.' },
    { day: 'Day 5', task: 'Enablers and food-security bridge.' },
    { day: 'Day 6', task: '10-minute evaluate outline.' },
    { day: 'Day 7', task: 'Recite one-pager.' },
  ],
  sourcesLine:
    'Sources: FAO climate-smart agriculture pillar teaching and Pakistan climate/agriculture current affairs notes. Avoid unverified project completion claims.',
}
