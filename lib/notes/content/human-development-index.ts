import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (UNDP HDI teaching):
 * - HDI composite of health, education, and standard of living
 * - Typical indicators taught: life expectancy; education (mean/expected years of schooling); GNI per capita
 * - Published in UNDP Human Development Report tradition
 * Avoid inventing Pakistan rank numbers unless verified for a specific report year
 */
export const HUMAN_DEVELOPMENT_INDEX_KIT: NoteKitData = {
  id: 'human-development-index',
  title: 'Human Development Index (HDI)',
  subtitle:
    'UNDP HDI dimensions, indicators, and exam use for current affairs, ethics, and development answers.',
  syllabusTags: [
    'Human Development Index',
    'UNDP',
    'Current affairs',
    'Ethics and governance',
    'Development',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'One-paper / MPT',
      directive: 'MCQ fact',
      angle: 'HDI dimensions and UNDP link',
      frequency: 'high',
    },
    {
      year: 'CSS / PMS',
      directive: 'Discuss',
      angle: 'Human development versus GDP-only growth',
      frequency: 'high',
    },
    {
      year: 'CSS Ethics / CA',
      directive: 'Evaluate',
      angle: 'Education and health as development priorities',
      frequency: 'medium',
    },
    {
      year: 'One-paper',
      directive: 'MCQ',
      angle: 'Life expectancy, schooling, GNI components',
      frequency: 'high',
    },
  ],
  onePager: [
    'HDI (Human Development Index) is a UNDP composite measure of average achievement in key dimensions of human development. It shifts focus from income alone to people-centred outcomes.',
    'Three dimensions (must memorise): (1) a long and healthy life, (2) knowledge / education, (3) a decent standard of living.',
    'Common indicators in teaching: life expectancy at birth (health); mean years of schooling and expected years of schooling (education); GNI per capita (standard of living), often with purchasing-power framing in methodology notes.',
    'Why exams love HDI: it criticises GDP fetishism. A country can grow GDP while lagging in health, schooling, or equity. Use HDI language in poverty, education, and SDG answers.',
    'Related UNDP family (name-level): Human Development Report; sometimes inequality-adjusted or gender-related indices appear in advanced notes. Learn core HDI first.',
    'Pakistan use: discuss challenges in education quality, health access, and incomes without inventing a rank for the wrong year. If you cite a rank, attach the report year.',
    'Essay bridge: HDI connects to SDG themes (health, education, poverty), good governance (service delivery), and ethics of public policy (human dignity).',
    'Method: define HDI, list three dimensions, give indicators, contrast with GDP, apply to Pakistan priorities, close with people-centred policy.',
  ],
  answerSteps: [
    'Define HDI and name UNDP.',
    'List the three dimensions clearly.',
    'Attach the standard indicators to each dimension.',
    'Contrast HDI with GDP-only measurement.',
    'Apply to Pakistan development priorities without fake ranks.',
    'Close with people-centred policy and SDG link.',
  ],
  questionVariants: [
    'What is the Human Development Index? Discuss its dimensions.',
    'Why is HDI preferred over GDP as a development measure?',
    'Evaluate education and health as pillars of human development in Pakistan.',
    'How does HDI connect to SDGs and public policy ethics?',
  ],
  citations: [
    {
      label: 'Publisher frame',
      text: 'HDI associated with UNDP Human Development Report tradition.',
    },
    {
      label: 'Dimensions',
      text: 'Health, education/knowledge, and standard of living.',
    },
    {
      label: 'Indicators',
      text: 'Life expectancy; schooling years measures; GNI per capita teaching set.',
    },
    {
      label: 'Exam contrast',
      text: 'HDI versus income-only or GDP-only development stories.',
    },
  ],
  flashcards: [
    {
      prompt: 'Who is HDI associated with?',
      answer: 'UNDP (Human Development Report tradition)',
    },
    {
      prompt: 'Name the three HDI dimensions.',
      answer: 'Health, education/knowledge, standard of living',
    },
    {
      prompt: 'Health indicator commonly taught?',
      answer: 'Life expectancy at birth',
    },
    {
      prompt: 'Education indicators commonly taught?',
      answer: 'Mean years and expected years of schooling',
    },
    {
      prompt: 'Living-standard indicator commonly taught?',
      answer: 'GNI per capita',
    },
    {
      prompt: 'Why not GDP alone?',
      answer: 'Income can rise while health and education lag',
    },
    {
      prompt: 'Expand HDI.',
      answer: 'Human Development Index',
    },
    {
      prompt: 'Should you invent Pakistan HDI rank?',
      answer: 'No; only cite with a verified report year',
    },
    {
      prompt: 'Name one essay bridge from HDI.',
      answer: 'SDGs, governance service delivery, or human dignity ethics',
    },
    {
      prompt: 'What is the first sentence of a scoring definition?',
      answer: 'UNDP composite of health, education, and living standard',
    },
  ],
  mistakes: [
    {
      trap: 'Listing wrong dimensions (e.g. only income and happiness).',
      correct: 'Health, education, standard of living.',
    },
    {
      trap: 'Confusing HDI with GDP.',
      correct: 'HDI is broader and people-centred; GDP is output/income measure.',
    },
    {
      trap: 'Citing a rank without year.',
      correct: 'Ranks change; attach report year or skip the number.',
    },
    {
      trap: 'Forgetting UNDP.',
      correct: 'Always name UNDP in the definition.',
    },
    {
      trap: 'Writing methodology formulas you cannot recall.',
      correct: 'Dimensions and indicators beat fake math.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Memorise three dimensions + UNDP.' },
    { day: 'Day 2', task: 'Map indicators to dimensions.' },
    { day: 'Day 3', task: 'HDI vs GDP contrast paragraph.' },
    { day: 'Day 4', task: 'Flashcards.' },
    { day: 'Day 5', task: 'Pakistan application without fake ranks.' },
    { day: 'Day 6', task: '10-minute discuss outline.' },
    { day: 'Day 7', task: 'Recite one-pager.' },
  ],
  sourcesLine:
    'Sources: UNDP Human Development Report teaching summaries and CSS current affairs / ethics notes on human development. Avoid unverified country ranks.',
}
