import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (UN SDG + Pakistan education teaching):
 * - SDG 4: Quality Education; part of 17 SDGs / 2030 Agenda adopted 2015
 * - Themes: inclusive and equitable quality education; lifelong learning
 * - Pakistan links: Article 25-A (free compulsory education ages 5-16), access/quality gaps, learning outcomes, girls' education
 * Avoid inventing fake literacy percentages or UN rankings for a specific year
 */
export const SDG4_EDUCATION_PAKISTAN_KIT: NoteKitData = {
  id: 'sdg4-education-pakistan',
  title: 'SDG 4 Quality Education and Pakistan',
  subtitle:
    'SDG 4 meaning, 2030 education targets language, and Pakistan access-quality links for CSS and ethics/civics.',
  syllabusTags: [
    'SDG 4',
    'Quality education',
    'Sustainable Development Goals',
    'Education Pakistan',
    'Current affairs',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS / PMS',
      directive: 'Discuss',
      angle: 'SDG 4 and challenges of quality education in Pakistan',
      frequency: 'high',
    },
    {
      year: 'One-paper / MPT',
      directive: 'MCQ fact',
      angle: 'SDG 4 name match: Quality Education',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Evaluate',
      angle: 'Access versus learning outcomes',
      frequency: 'high',
    },
    {
      year: 'Ethics / Current Affairs',
      directive: 'Critically examine',
      angle: 'Article 25-A and SDG 4 alignment',
      frequency: 'medium',
    },
  ],
  onePager: [
    'SDG 4 is Quality Education under the UN 2030 Agenda for Sustainable Development (adopted 2015). It seeks inclusive and equitable quality education and lifelong learning opportunities.',
    'Exam habit: match goal number to name. SDG 4 = Quality Education. Do not confuse with SDG 1 (No Poverty) or SDG 5 (Gender Equality).',
    'Core themes in teaching: universal access, equity (including girls and disadvantaged groups), relevant learning outcomes, teachers and skills, and lifelong learning beyond primary schooling.',
    'Pakistan constitutional bridge: Article 25-A provides free and compulsory education for children aged five to sixteen (18th Amendment insertion). SDG 4 is broader than primary schooling alone but 25-A is a high-yield domestic hook.',
    'Access challenge: out-of-school children, regional and rural-urban gaps, and affordability barriers. Quality challenge: learning poverty themes, weak foundational literacy/numeracy, and uneven school standards.',
    'System mix in notes: public schools, private schools, and madaris. Fragmentation can create unequal pathways; reform answers stress standards, assessment, and inclusion.',
    'Policy levers: financing and prioritisation, teacher professional development, curriculum and assessment reform, girls education safety and access measures, and data for monitoring SDG indicators.',
    'Close: define SDG 4; link to 25-A; separate access from quality; propose sequenced reforms without fake literacy percentages.',
  ],
  answerSteps: [
    'State SDG 4 name and 2030 Agenda context.',
    'Explain inclusive quality education and lifelong learning themes.',
    'Link Article 25-A as Pakistan constitutional hook.',
    'Separate access gaps from learning-quality gaps.',
    'Add teachers, financing, and equity (especially girls).',
    'Conclude with monitoring and realistic reform sequencing.',
  ],
  questionVariants: [
    'Discuss SDG 4 and its relevance for Pakistan.',
    'Evaluate access versus quality challenges in Pakistan education.',
    'How does Article 25-A relate to SDG 4?',
    'Critically examine barriers to quality education for girls.',
  ],
  citations: [
    {
      label: 'SDG 4',
      text: 'Quality Education; inclusive and equitable quality education and lifelong learning (2030 Agenda).',
    },
    {
      label: 'Adoption context',
      text: 'SDGs adopted 2015 under UN 2030 Agenda; 17 goals total.',
    },
    {
      label: 'Article 25-A',
      text: 'Free and compulsory education for ages five to sixteen; 18th Amendment link.',
    },
    {
      label: 'Dual challenge',
      text: 'Access (out-of-school / equity) and quality (learning outcomes / teachers).',
    },
  ],
  flashcards: [
    {
      prompt: 'What is SDG 4?',
      answer: 'Quality Education',
    },
    {
      prompt: 'What Agenda and year frame the SDGs?',
      answer: 'UN 2030 Agenda; adopted 2015',
    },
    {
      prompt: 'State Article 25-A age range.',
      answer: 'Five to sixteen years',
    },
    {
      prompt: 'Name two SDG 4 themes.',
      answer: 'Inclusive access and quality learning outcomes (or lifelong learning)',
    },
    {
      prompt: 'Access vs quality in one line?',
      answer: 'Access is getting children in school; quality is whether they learn',
    },
    {
      prompt: 'Name one equity focus.',
      answer: 'Girls education or disadvantaged regions/groups',
    },
    {
      prompt: 'Should literacy percentages be invented?',
      answer: 'No; discuss gaps conceptually unless verified',
    },
    {
      prompt: 'Name a policy lever for SDG 4.',
      answer: 'Teachers, financing, curriculum/assessment, or data monitoring',
    },
    {
      prompt: 'Do not confuse SDG 4 with which nearby goals?',
      answer: 'SDG 1 poverty or SDG 5 gender equality',
    },
  ],
  mistakes: [
    {
      trap: 'Matching SDG 4 to gender or poverty.',
      correct: 'SDG 4 is Quality Education.',
    },
    {
      trap: 'Writing only enrolment without learning outcomes.',
      correct: 'SDG 4 stresses quality and lifelong learning too.',
    },
    {
      trap: 'Ignoring Article 25-A in Pakistan answers.',
      correct: 'Use 25-A as the constitutional education hook.',
    },
    {
      trap: 'Inventing literacy or ranking figures.',
      correct: 'Stay conceptual unless a verified source year is cited.',
    },
    {
      trap: 'Treating private schools as the full SDG solution.',
      correct: 'Public quality, equity, and standards remain central.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'SDG 4 name + 2030/2015.' },
    { day: 'Day 2', task: 'Article 25-A bridge.' },
    { day: 'Day 3', task: 'Access vs quality.' },
    { day: 'Day 4', task: 'Flashcards.' },
    { day: 'Day 5', task: 'Girls equity + teachers.' },
    { day: 'Day 6', task: '10-minute discuss outline.' },
    { day: 'Day 7', task: 'Recite one-pager.' },
  ],
  sourcesLine:
    'Sources: UN SDG 4 teaching language and standard Pakistan education notes including Article 25-A. Avoid unverified literacy percentages.',
}
