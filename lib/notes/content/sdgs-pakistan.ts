import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (UN 2030 Agenda teaching):
 * - 17 Sustainable Development Goals; 169 targets; adopted 2015; horizon 2030
 * - Agenda 2030 successor framing after MDGs
 * - High-yield: SDG 1 poverty, 4 education, 5 gender, 13 climate
 * - Pakistan: SDGs adopted into national planning discourse; avoid fake ranking claims
 */
export const SDGS_PAKISTAN_KIT: NoteKitData = {
  id: 'sdgs-pakistan',
  title: 'Sustainable Development Goals (SDGs)',
  subtitle:
    '17 goals, 2030 Agenda, and the number/name facts Pakistan exams ask most often.',
  syllabusTags: [
    'Sustainable Development Goals',
    'Current affairs',
    'Governance and development',
    'UN Agenda 2030',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'One-paper / MPT',
      directive: 'MCQ fact',
      angle: 'SDG number and name matches (poverty, education, climate, gender)',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Discuss',
      angle: '2030 Agenda and Pakistan’s development challenges',
      frequency: 'high',
    },
    {
      year: 'CSS / PMS',
      directive: 'Evaluate',
      angle: 'Progress on education, poverty, or climate-related SDGs',
      frequency: 'medium',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: '17 goals, 169 targets, adoption year 2015',
      frequency: 'high',
    },
  ],
  onePager: [
    'SDGs are the 17 Sustainable Development Goals under the UN 2030 Agenda for Sustainable Development, adopted in 2015 by UN member states.',
    'They replace the earlier Millennium Development Goals (MDGs) with a broader universal agenda to 2030. Teaching figure: 169 targets sit under the 17 goals.',
    'High-yield numbers for Pakistan exams: SDG 1 No Poverty; SDG 2 Zero Hunger; SDG 3 Good Health and Well-being; SDG 4 Quality Education; SDG 5 Gender Equality.',
    'Also frequently tested: SDG 6 Clean Water and Sanitation; SDG 7 Affordable and Clean Energy; SDG 8 Decent Work and Economic Growth; SDG 13 Climate Action.',
    'Other names to recognise: SDG 10 Reduced Inequalities; SDG 11 Sustainable Cities and Communities; SDG 16 Peace, Justice and Strong Institutions; SDG 17 Partnerships for the Goals.',
    'Remaining goals (memorise for matching MCQs): 9 Industry Innovation and Infrastructure; 12 Responsible Consumption and Production; 14 Life Below Water; 15 Life on Land.',
    'Pakistan exams often ask which goal number matches poverty, education, gender, or climate. They also ask 17 goals / 2030 / 2015 adoption.',
    'In written answers, link goals to Pakistan challenges (poverty, education access, gender gaps, floods and climate risk) without inventing fake UN rankings.',
  ],
  answerSteps: [
    'Define SDGs and the 2030 Agenda with year 2015 and 17 goals.',
    'State why they matter: universal development framework after MDGs.',
    'Pick two or three goals relevant to the question (often 1, 4, 5, 13).',
    'Link each to a Pakistan challenge with one concrete point (access, quality, climate vulnerability).',
    'Close with implementation need: data, financing, institutions, and partnerships (SDG 17).',
  ],
  questionVariants: [
    'Discuss the Sustainable Development Goals and their relevance for Pakistan.',
    'Evaluate Pakistan’s challenges in achieving education and poverty-related SDGs.',
    'How does SDG 13 (Climate Action) relate to Pakistan’s flood and climate risks? Discuss.',
    'Critically examine gender equality (SDG 5) as a development priority.',
  ],
  citations: [
    {
      label: 'Adoption',
      text: 'UN 2030 Agenda for Sustainable Development adopted in 2015; 17 SDGs with horizon 2030.',
    },
    {
      label: 'Structure',
      text: '17 goals and 169 targets (standard UN teaching figures).',
    },
    {
      label: 'High-yield matches',
      text: 'SDG 1 No Poverty; SDG 4 Quality Education; SDG 5 Gender Equality; SDG 13 Climate Action.',
    },
    {
      label: 'Predecessor',
      text: 'MDGs were the earlier (2000-2015) global goals framework; SDGs are broader and universal.',
    },
  ],
  flashcards: [
    {
      prompt: 'How many Sustainable Development Goals are there?',
      answer: '17',
    },
    {
      prompt: 'What is the target year of the Agenda?',
      answer: '2030',
    },
    {
      prompt: 'In which year were the SDGs adopted?',
      answer: '2015',
    },
    {
      prompt: 'How many targets sit under the 17 goals (standard figure)?',
      answer: '169',
    },
    {
      prompt: 'What is SDG 1?',
      answer: 'No Poverty',
    },
    {
      prompt: 'What is SDG 2?',
      answer: 'Zero Hunger',
    },
    {
      prompt: 'What is SDG 3?',
      answer: 'Good Health and Well-being',
    },
    {
      prompt: 'What is SDG 4?',
      answer: 'Quality Education',
    },
    {
      prompt: 'What is SDG 5?',
      answer: 'Gender Equality',
    },
    {
      prompt: 'What is SDG 6?',
      answer: 'Clean Water and Sanitation',
    },
    {
      prompt: 'What is SDG 7?',
      answer: 'Affordable and Clean Energy',
    },
    {
      prompt: 'What is SDG 8?',
      answer: 'Decent Work and Economic Growth',
    },
    {
      prompt: 'What is SDG 13?',
      answer: 'Climate Action',
    },
    {
      prompt: 'What is SDG 16?',
      answer: 'Peace, Justice and Strong Institutions',
    },
    {
      prompt: 'What is SDG 17?',
      answer: 'Partnerships for the Goals',
    },
    {
      prompt: 'What came before the SDGs in global goal teaching?',
      answer: 'Millennium Development Goals (MDGs)',
    },
    {
      prompt: 'Which SDG number is most linked to climate exams?',
      answer: 'SDG 13',
    },
    {
      prompt: 'Which SDG number is Quality Education?',
      answer: 'SDG 4',
    },
  ],
  mistakes: [
    {
      trap: 'Writing that there are 8 SDGs.',
      correct: '8 is the MDG count often remembered. SDGs are 17.',
    },
    {
      trap: 'Matching SDG 4 with climate or SDG 13 with education.',
      correct: 'SDG 4 = Quality Education. SDG 13 = Climate Action.',
    },
    {
      trap: 'Saying SDGs began in 2000.',
      correct: 'MDGs are associated with 2000. SDGs were adopted in 2015 for 2030.',
    },
    {
      trap: 'Inventing Pakistan’s exact global SDG rank in an answer.',
      correct: 'Discuss challenges and priorities. Do not invent rankings without a cited source.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Memorise 17 goals count, 2015 adoption, 2030 horizon, 169 targets.' },
    { day: 'Day 2', task: 'Drill SDGs 1 to 5 names and numbers.' },
    { day: 'Day 3', task: 'Drill SDGs 6, 7, 8, 13, 16, 17.' },
    { day: 'Day 4', task: 'Flashcards for remaining goals 9, 10, 11, 12, 14, 15.' },
    { day: 'Day 5', task: 'Write a short outline linking SDGs 1, 4, 5, 13 to Pakistan.' },
    { day: 'Day 6', task: 'Practice 20 matching-style MCQs from memory.' },
    { day: 'Day 7', task: 'One-pager only. Recite high-yield number matches.' },
  ],
  sourcesLine:
    'Sources: UN 2030 Agenda for Sustainable Development (2015); official SDG titles and numbering; standard CSS/PMS current affairs teaching. Avoid unsourced country rankings.',
}
