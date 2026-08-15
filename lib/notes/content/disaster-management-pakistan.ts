import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked:
 * - NDMA: National Disaster Management Authority (federal apex body name-level)
 * - PDMA: Provincial Disaster Management Authority (provincial level name-level)
 * - Pakistan faces floods, earthquakes, drought, GLOF/landslide risks in mountain areas, heatwaves, and urban flooding
 * - Do not invent fake founding years unless certain; focus on roles, preparedness cycle, and major hazard types
 */
export const DISASTER_MANAGEMENT_PAKISTAN_KIT: NoteKitData = {
  id: 'disaster-management-pakistan',
  title: 'Disaster Management in Pakistan',
  subtitle:
    'NDMA/PDMA roles, floods and earthquake preparedness, and the disaster management cycle for exams.',
  syllabusTags: [
    'Disaster management',
    'NDMA',
    'Climate and hazards',
    'Current affairs',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS / PMS',
      directive: 'Discuss',
      angle: 'Disaster management system of Pakistan',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Evaluate',
      angle: 'Flood preparedness and response',
      frequency: 'high',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'NDMA and PDMA expansion',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Critically examine',
      angle: 'From relief-centric response to preparedness and risk reduction',
      frequency: 'medium',
    },
  ],
  onePager: [
    'NDMA: National Disaster Management Authority. Federal apex body for coordination of disaster management policy, planning, and national-level response support.',
    'PDMA: Provincial Disaster Management Authority. Provincial coordination of preparedness, response, and recovery within the province.',
    'District / local tiers and line departments matter for last-mile warning, rescue, relief camps, and restoration of services.',
    'Hazard profile (exam set): monsoon floods and riverine flooding; earthquakes (especially northern and western zones); drought; glacial lake outburst floods (GLOFs) and landslides in mountain areas; heatwaves; urban flooding and industrial/technological accidents.',
    'Disaster management cycle: mitigation and prevention → preparedness → response → recovery and reconstruction (Build Back Better theme).',
    'Preparedness tools: early warning, evacuation plans, stockpiles, trained responders, community drills, land-use controls in floodplains, and resilient infrastructure.',
    'Flood focus: forecast and warning, embankments and drainage, protected critical facilities, cash/relief logistics, disease control in camps, and livelihood recovery.',
    'Earthquake focus: building codes and enforcement, retrofitting of schools/hospitals, public awareness (drop-cover-hold), and search-and-rescue capacity.',
    'Critical close: Pakistan often performs emergency relief under pressure; lasting gains need risk reduction, funding, and provincial-local capacity, not only post-disaster packages.',
  ],
  answerSteps: [
    'Define NDMA and PDMA roles clearly.',
    'List main hazards facing Pakistan.',
    'Explain the disaster management cycle with preparedness emphasis.',
    'Give flood and earthquake preparedness measures separately.',
    'Close with risk reduction and governance capacity.',
  ],
  questionVariants: [
    'Discuss the disaster management framework of Pakistan with reference to NDMA and PDMA.',
    'Evaluate Pakistan’s preparedness for floods and earthquakes.',
    'Critically examine why disaster risk reduction must go beyond emergency relief.',
    'Suggest measures to strengthen community-level disaster preparedness.',
  ],
  citations: [
    {
      label: 'NDMA',
      text: 'National Disaster Management Authority: federal apex coordination body for disaster management.',
    },
    {
      label: 'PDMA',
      text: 'Provincial Disaster Management Authority: provincial-level disaster management coordination.',
    },
    {
      label: 'Cycle',
      text: 'Mitigation → preparedness → response → recovery/reconstruction.',
    },
    {
      label: 'Hazards',
      text: 'Floods, earthquakes, drought, GLOFs/landslides, heatwaves, urban flooding.',
    },
  ],
  flashcards: [
    { prompt: 'Expand NDMA.', answer: 'National Disaster Management Authority' },
    { prompt: 'Expand PDMA.', answer: 'Provincial Disaster Management Authority' },
    {
      prompt: 'What is NDMA’s level?',
      answer: 'Federal apex coordination body',
    },
    {
      prompt: 'Name four major hazard types for Pakistan.',
      answer: 'Floods, earthquakes, drought, GLOFs/landslides (also heatwaves/urban floods)',
    },
    {
      prompt: 'List the disaster management cycle stages.',
      answer: 'Mitigation, preparedness, response, recovery',
    },
    {
      prompt: 'Name one flood preparedness tool.',
      answer: 'Early warning, evacuation plans, embankments, or drainage maintenance',
    },
    {
      prompt: 'Name one earthquake preparedness tool.',
      answer: 'Building codes, retrofitting, public drills, or search-and-rescue capacity',
    },
    {
      prompt: 'What does GLOF stand for in mountain risk teaching?',
      answer: 'Glacial Lake Outburst Flood',
    },
    {
      prompt: 'Why is Build Back Better used in recovery answers?',
      answer: 'Reconstruct to reduce future risk, not only restore the old vulnerability',
    },
    {
      prompt: 'Relief alone is incomplete because…?',
      answer: 'Without mitigation and preparedness, losses repeat',
    },
  ],
  mistakes: [
    {
      trap: 'Confusing NDMA with PDMA.',
      correct: 'NDMA is national/federal apex; PDMA is provincial.',
    },
    {
      trap: 'Writing only relief camps as the whole of disaster management.',
      correct: 'Include mitigation, preparedness, response, and recovery.',
    },
    {
      trap: 'Ignoring earthquakes because floods dominate headlines.',
      correct: 'Pakistan’s hazard set includes both floods and seismic risk.',
    },
    {
      trap: 'Treating early warning as useless without evacuation capacity.',
      correct: 'Warning must be linked to last-mile communication and evacuation plans.',
    },
    {
      trap: 'Inventing fake exact NDMA founding trivia if unsure.',
      correct: 'Prioritise correct expansions, roles, hazards, and cycle.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Memorise NDMA/PDMA expansions and roles.' },
    { day: 'Day 2', task: 'List hazards and the management cycle.' },
    { day: 'Day 3', task: 'Write flood preparedness measures.' },
    { day: 'Day 4', task: 'Write earthquake preparedness measures.' },
    { day: 'Day 5', task: 'Drill flashcards and MCQs.' },
    { day: 'Day 6', task: 'One-pager + critically examine relief vs DRR.' },
    { day: 'Day 7', task: 'Recite institutions and cycle from memory.' },
  ],
  sourcesLine:
    'Sources: NDMA/PDMA institutional naming in Pakistan disaster governance teaching; standard flood/earthquake preparedness frameworks; climate and GLOF risk themes in current affairs. Prefer role clarity over unsourced founding-date trivia.',
}
