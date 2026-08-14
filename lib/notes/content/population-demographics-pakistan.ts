import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked:
 * - Pakistan has a large and young population structure (youth bulge concept)
 * - Urbanization: rising share of people in cities; mega-city pressure themes (Karachi, Lahore etc.) at name level
 * - Census: periodic population count for planning and representation; latest completed national census cycles are syllabus-sensitive (use careful language)
 * - Demographic dividend vs burden: working-age share can help growth if jobs/skills exist; otherwise unemployment and service stress
 * - Avoid fake exact population totals for 2026
 */
export const POPULATION_DEMOGRAPHICS_PAKISTAN_KIT: NoteKitData = {
  id: 'population-demographics-pakistan',
  title: 'Population and Demographics of Pakistan',
  subtitle:
    'Youth bulge, urbanization, census idea, and demographic dividend versus burden without fake headcount figures.',
  syllabusTags: [
    'Population',
    'Demographics',
    'Current affairs',
    'Social issues',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS / PMS',
      directive: 'Discuss',
      angle: 'Population growth as asset or liability for Pakistan',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Critically examine',
      angle: 'Demographic dividend and youth employment',
      frequency: 'high',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'Youth bulge and urbanization concepts',
      frequency: 'medium',
    },
    {
      year: 'CSS pattern',
      directive: 'Evaluate',
      angle: 'Role of census in planning',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Pakistan is among the world most populous countries. Use around language for totals. Do not invent a precise 2026 headcount in answers unless citing a named official release you know.',
    'Age structure: a large share of the population is young (youth bulge). This shapes education, jobs, health, and politics.',
    'Youth bulge concept: unusually large cohorts of adolescents and young adults relative to older groups, raising both opportunity and pressure.',
    'Demographic dividend: when the working-age share is high and dependents are relatively fewer, growth can accelerate if education, skills, health, and jobs exist.',
    'Demographic burden: same youth mass becomes pressure if schools, jobs, housing, and governance fail, producing unemployment, informality, and service overload.',
    'Urbanization: rising movement and growth of cities. Benefits include markets and services; costs include housing deficits, transport stress, and environmental load in large cities.',
    'Settlement pattern reminder: Indus plains are denser than deserts and high mountains (links to geography kits).',
    'Census idea: a complete count of population and selected characteristics used for planning, fiscal shares, and representation debates. Quality and regularity matter more than memorising every disputed figure.',
    'Policy answer pillars: female education and reproductive health access, skills and jobs, urban planning, data systems, and social protection for dependents.',
    'Exam close: population is not automatically a curse or blessing; institutions convert structure into dividend or burden.',
  ],
  answerSteps: [
    'State size carefully (among most populous; avoid fake exact totals).',
    'Explain youth bulge and why age structure matters.',
    'Define demographic dividend vs burden with the jobs/skills condition.',
    'Add urbanization pressures and opportunities.',
    'Close with census/data and policy levers (education, employment, cities).',
  ],
  questionVariants: [
    'Is Pakistan population a demographic dividend or a burden? Discuss.',
    'Explain the concept of youth bulge with reference to Pakistan.',
    'Discuss challenges of rapid urbanization in Pakistan.',
    'Why is a reliable census important for governance?',
  ],
  citations: [
    {
      label: 'Size language',
      text: 'Pakistan ranks among the world most populous states. Prefer careful around language over invented precise totals.',
    },
    {
      label: 'Youth bulge',
      text: 'A large young age cohort shapes demand for education, jobs, and services.',
    },
    {
      label: 'Dividend condition',
      text: 'Demographic dividend requires human capital and productive employment; otherwise youth mass becomes a burden.',
    },
    {
      label: 'Census',
      text: 'Census is the foundational population count for planning and representation; accuracy and regularity are the exam points.',
    },
  ],
  flashcards: [
    {
      prompt: 'What is a youth bulge?',
      answer: 'A large share of adolescents/young adults in the age structure',
    },
    {
      prompt: 'What is demographic dividend?',
      answer: 'Growth opportunity from a high working-age share if skills and jobs exist',
    },
    {
      prompt: 'When does youth become a demographic burden?',
      answer: 'When education, employment, and services fail to absorb young cohorts',
    },
    {
      prompt: 'What is urbanization?',
      answer: 'Rising share or concentration of population in cities',
    },
    {
      prompt: 'Safe population size phrasing?',
      answer: 'Among the world most populous countries (avoid fake exact 2026 figures)',
    },
    {
      prompt: 'Why does census matter?',
      answer: 'Planning, resource shares, and representation need reliable counts',
    },
    {
      prompt: 'Name two urbanization challenges.',
      answer: 'Housing shortages and transport/environmental stress (also informal settlements)',
    },
    {
      prompt: 'Name two dividend enablers.',
      answer: 'Quality education/skills and productive job creation',
    },
    {
      prompt: 'Where is settlement densest in Pakistan?',
      answer: 'Indus plains relative to deserts and high mountains',
    },
    {
      prompt: 'One female-education link to demographics?',
      answer: 'Girls schooling and health access influence fertility and human capital paths',
    },
  ],
  mistakes: [
    {
      trap: 'Inventing an exact current population figure.',
      correct: 'Use careful ranking language or a named official census figure you can actually defend.',
    },
    {
      trap: 'Calling youth bulge automatically a dividend.',
      correct: 'Dividend is conditional on skills, health, and jobs.',
    },
    {
      trap: 'Treating urbanization as only negative.',
      correct: 'Cities offer markets and services as well as congestion and housing stress.',
    },
    {
      trap: 'Confusing census with sample surveys only.',
      correct: 'Census aims at a complete count; surveys sample. Both matter for data systems.',
    },
    {
      trap: 'Writing only moral panic about population without policy levers.',
      correct: 'Tie structure to education, employment, urban planning, and data.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Learn youth bulge and dividend vs burden definitions.' },
    { day: 'Day 2', task: 'Outline urbanization costs and benefits.' },
    { day: 'Day 3', task: 'Write the dividend condition paragraph.' },
    { day: 'Day 4', task: 'Drill flashcards (no fake numbers).' },
    { day: 'Day 5', task: 'Full discuss answer on asset vs liability.' },
    { day: 'Day 6', task: 'Add census and policy levers section.' },
    { day: 'Day 7', task: 'One-pager from memory.' },
  ],
  sourcesLine:
    'Sources: standard demographic concepts (youth bulge, dividend, urbanization, census); Pakistan studies and CSS current affairs teaching. Avoid WhatsApp population totals.',
}
