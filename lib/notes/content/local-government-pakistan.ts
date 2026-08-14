import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked:
 * - Ayub Basic Democracies (BD) system: late 1950s / early 1960s local tier experiment
 * - Musharraf Devolution of Power Plan / Local Government Ordinance 2001
 * - 18th Amendment (2010): local government falls in provincial domain
 * - Post-18th: provinces enact and run their own LG laws; continuity and capacity vary
 * - Do not invent fake nationwide election turnout figures or fake ordinance article lists
 */
export const LOCAL_GOVERNMENT_PAKISTAN_KIT: NoteKitData = {
  id: 'local-government-pakistan',
  title: 'Local Government in Pakistan',
  subtitle:
    'BD system, 2001 devolution, post-18th Amendment provincial domain, and why LG keeps returning in CSS answers.',
  syllabusTags: [
    'Governance',
    'Local government',
    'Federalism',
    'Pakistan Affairs',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS pattern',
      directive: 'Discuss',
      angle: 'Local government and democratic participation in Pakistan',
      frequency: 'high',
    },
    {
      year: 'CSS / PMS',
      directive: 'Critically examine',
      angle: 'Devolution of Power Plan 2001',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Evaluate',
      angle: 'Local government after the 18th Amendment',
      frequency: 'medium',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'Basic Democracies; 2001 devolution; provincial subject after 18th Amendment',
      frequency: 'high',
    },
  ],
  onePager: [
    'Local government (LG): elected or designated tiers below province for services, participation, and local accountability.',
    'Ayub era: Basic Democracies (BD) system. Local tier used for development and political control under a military-backed presidential order.',
    '2001 devolution (Musharraf Devolution of Power Plan / Local Government Ordinance 2001): major attempt to empower district and lower tiers and weaken the old commissioner-led model.',
    '18th Amendment (2010): local government becomes a provincial constitutional domain. Centre does not run a single national LG template.',
    'Post-18th Amendment reality: each province frames its own LG laws, elections, and fiscal arrangements. Continuity and empowerment vary by province and politics.',
    'Recurring exam themes: participation, service delivery, elite capture, fiscal dependence, and tension with provincial bureaucracy.',
    'Exam rule: timeline (BD → 2001 → 18th Amendment provincial domain), then one critique on capacity or political will. No fake national uniform LG claim.',
  ],
  answerSteps: [
    'Define local government as the third tier for services and participation.',
    'Place Ayub BD system as an early landmark with dual development and control logic.',
    'Explain 2001 devolution as the major modern restructuring attempt.',
    'State the 18th Amendment fact: LG is a provincial subject.',
    'Add post-18th reality: provincial laws differ; empowerment is uneven.',
    'Close with judgment: legal design needs elections, funds, and protection from elite capture.',
  ],
  questionVariants: [
    'Discuss the evolution of local government in Pakistan.',
    'Critically examine the Devolution of Power Plan 2001.',
    'Evaluate local government as a provincial subject after the 18th Amendment.',
    'Local democracy without fiscal autonomy remains weak. Discuss.',
  ],
  citations: [
    {
      label: 'BD system',
      text: 'Ayub Khan\'s Basic Democracies system created a local tier used for development administration and political mobilisation.',
    },
    {
      label: '2001 devolution',
      text: 'The Devolution of Power Plan / Local Government Ordinance 2001 restructured district and lower tiers under Musharraf.',
    },
    {
      label: '18th Amendment',
      text: 'After the Eighteenth Amendment (2010), local government falls within the provincial domain.',
    },
    {
      label: 'Provincial variation',
      text: 'Provinces enact their own LG statutes and election frameworks; national uniformity should not be assumed.',
    },
  ],
  flashcards: [
    {
      prompt: 'What was Ayub\'s local system called?',
      answer: 'Basic Democracies (BD) system',
    },
    {
      prompt: 'Which year marks Musharraf\'s major LG ordinance/devolution push?',
      answer: '2001',
    },
    {
      prompt: 'After the 18th Amendment, who owns LG as a subject?',
      answer: 'The provinces',
    },
    {
      prompt: 'Name one stated aim of 2001 devolution.',
      answer: 'Empower district/local tiers and improve service delivery / participation',
    },
    {
      prompt: 'Name one recurring weakness of LG in Pakistan.',
      answer: 'Fiscal dependence, delayed elections, or elite capture',
    },
    {
      prompt: 'Should answers claim one national LG law today?',
      answer: 'No. Post-18th Amendment frameworks are provincial',
    },
  ],
  mistakes: [
    {
      trap: 'Saying local government is still a federal subject after 2010.',
      correct: '18th Amendment places LG in the provincial domain.',
    },
    {
      trap: 'Treating BD system as fully democratic local autonomy.',
      correct: 'It mixed development roles with political control under Ayub\'s system.',
    },
    {
      trap: 'Assuming 2001 structures still run unchanged nationwide.',
      correct: 'Later provincial laws and politics altered continuity.',
    },
    {
      trap: 'Writing only praise without capacity or capture critique.',
      correct: 'Balanced answers need funds, elections, and accountability limits.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Build timeline: BD, 2001, 18th Amendment.' },
    { day: 'Day 2', task: 'Memorise who owns LG after 2010.' },
    { day: 'Day 3', task: 'Outline strengths and weaknesses of 2001 devolution.' },
    { day: 'Day 4', task: 'Write a 10-minute provincial-domain answer.' },
    { day: 'Day 5', task: 'Drill flashcards.' },
    { day: 'Day 6', task: 'Add fiscal autonomy and elite-capture critique.' },
    { day: 'Day 7', task: 'One-pager only from memory.' },
  ],
  sourcesLine:
    'Sources: standard Pakistan governance histories (BD system; 2001 devolution); Eighteenth Amendment provincial-domain framing; FPSC governance syllabus items. Avoid unsourced election-turnout myths.',
}
