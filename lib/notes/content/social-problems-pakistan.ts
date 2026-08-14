import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked framing for exam answers:
 * - Structure: causes, effects, state responses (name-level BISP / Ehsaas)
 * - Education and health as human development pillars; use concepts not invented latest percentages
 * - Do not invent fake survey years, fake GDP shares, or fake enrolment rates
 * - BISP (Benazir Income Support Programme) and Ehsaas are known social protection labels in Pakistan discourse
 */
export const SOCIAL_PROBLEMS_PAKISTAN_KIT: NoteKitData = {
  id: 'social-problems-pakistan',
  title: 'Social Problems of Pakistan (Poverty, Education, Health)',
  subtitle:
    'Exam structure for poverty, education, and health: causes, effects, and state responses without fake stats.',
  syllabusTags: [
    'Contemporary issues',
    'Social problems',
    'Human development',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS pattern',
      directive: 'Discuss',
      angle: 'Poverty as a social problem and state responses in Pakistan',
      frequency: 'high',
    },
    {
      year: 'CSS / PMS',
      directive: 'Critically examine',
      angle: 'Education and health deficits as development constraints',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Suggest measures',
      angle: 'Integrated response across poverty, schooling, and primary health',
      frequency: 'medium',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'BISP / Ehsaas as social protection name markers',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Exam triangle: poverty, education, health. Treat them as linked, not three separate essays.',
    'Poverty causes (structure): low and insecure livelihoods, weak human capital, unequal opportunity, shocks (inflation, floods, illness).',
    'Poverty effects: poor nutrition, school dropout pressure, limited political voice, intergenerational trap.',
    'Education problems (concepts): access gaps, quality gaps, gender and regional gaps, weak skills link to jobs. Do not invent a fake literacy percentage.',
    'Health problems (concepts): weak primary care reach, preventable disease burden, maternal and child health gaps, out-of-pocket cost pressure.',
    'State responses (name-level): BISP (Benazir Income Support Programme); Ehsaas as a wider social protection branding/umbrella in policy discourse. Cash support is relief, not a full development substitute.',
    'Answer close: combine protection (cash/safety nets) with capability (schools, teachers, basic health, water/sanitation). No fake latest survey numbers.',
  ],
  answerSteps: [
    'Define the problem set as linked human development deficits, not only income poverty.',
    'Explain causes under economy, institutions, and shocks.',
    'Show effects on family welfare, schooling, and health.',
    'Name state responses carefully: BISP and Ehsaas at name level; add education and health system reforms as capability tools.',
    'Add one critical line: cash transfers reduce distress but do not replace jobs, schools, and clinics.',
    'Close with a realistic reform package: protection plus capability, without invented statistics.',
  ],
  questionVariants: [
    'Discuss the major social problems of Pakistan with special reference to poverty, education, and health.',
    'Critically examine state responses to poverty in Pakistan.',
    'Evaluate education and health as constraints on Pakistan’s development.',
    'Suggest an integrated policy approach to poverty, schooling, and primary health.',
  ],
  citations: [
    {
      label: 'Problem set',
      text: 'CSS/PMS answers typically group poverty, education, and health as core social development problems.',
    },
    {
      label: 'Poverty logic',
      text: 'Poverty is driven by weak livelihoods, weak human capital, inequality of opportunity, and economic or climate shocks.',
    },
    {
      label: 'Education and health concepts',
      text: 'Education gaps include access, quality, and equity. Health gaps include primary care reach, preventable disease, and cost barriers.',
    },
    {
      label: 'BISP',
      text: 'Benazir Income Support Programme (BISP) is a major cash-transfer social protection programme of Pakistan.',
    },
    {
      label: 'Ehsaas',
      text: 'Ehsaas is used in Pakistan policy discourse as a wider social protection branding/umbrella. Treat it as name-level response, not a fake inventory of every component.',
    },
  ],
  flashcards: [
    {
      prompt: 'Three linked social problems for this kit?',
      answer: 'Poverty, education, health',
    },
    {
      prompt: 'Name three structural poverty causes.',
      answer: 'Weak livelihoods, weak human capital, shocks (plus unequal opportunity)',
    },
    {
      prompt: 'Two effects of poverty useful in essays?',
      answer: 'School dropout pressure and poor nutrition / intergenerational trap',
    },
    {
      prompt: 'Education gaps to name without fake stats?',
      answer: 'Access, quality, gender/regional equity, skills-jobs link',
    },
    {
      prompt: 'Health gaps to name without fake stats?',
      answer: 'Primary care reach, preventable disease, maternal-child health, out-of-pocket costs',
    },
    {
      prompt: 'What does BISP stand for?',
      answer: 'Benazir Income Support Programme',
    },
    {
      prompt: 'What is Ehsaas in exam answers?',
      answer: 'Wider social protection branding/umbrella in Pakistan policy discourse',
    },
    {
      prompt: 'Critical line on cash transfers?',
      answer: 'They relieve distress but do not replace jobs, schools, and clinics',
    },
    {
      prompt: 'Trap: inventing latest literacy or poverty %?',
      answer: 'Use concepts and verified programme names; avoid unsourced numbers',
    },
    {
      prompt: 'Closing reform formula?',
      answer: 'Protection (safety nets) plus capability (education and health)',
    },
  ],
  mistakes: [
    {
      trap: 'Filling the answer with invented percentages for poverty, literacy, or hospital beds.',
      correct: 'Use cause-effect-response structure. Quote numbers only if you have a verified source.',
    },
    {
      trap: 'Treating BISP or Ehsaas as a complete solution to poverty.',
      correct: 'They are social protection tools. Development still needs jobs, schools, and health systems.',
    },
    {
      trap: 'Writing three disconnected mini-essays with no link.',
      correct: 'Show how poverty, education, and health reinforce each other.',
    },
    {
      trap: 'Blaming only one factor (for example only corruption) for every social deficit.',
      correct: 'Use a multi-cause frame: livelihoods, human capital, institutions, shocks.',
    },
    {
      trap: 'Listing every government slogan as if each were a verified outcome.',
      correct: 'Name major programmes carefully and judge outcomes with caution.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Learn the linked poverty-education-health frame.' },
    { day: 'Day 2', task: 'Memorise causes and effects without fake numbers.' },
    { day: 'Day 3', task: 'Write a 10-minute outline with BISP/Ehsaas name-level.' },
    { day: 'Day 4', task: 'Drill flashcards.' },
    { day: 'Day 5', task: 'Attempt the critically examine state-response variant.' },
    { day: 'Day 6', task: 'One-pager + citations.' },
    { day: 'Day 7', task: 'Recite structure and closing reform formula from memory.' },
  ],
  sourcesLine:
    'Sources: standard Pakistan Affairs contemporary-issues framing; BISP and Ehsaas as known social protection labels. Do not invent survey figures or programme outcome percentages.',
}
