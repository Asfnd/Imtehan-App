import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (UN SDG + gender equality teaching):
 * - SDG 5: Gender Equality; 2030 Agenda / adopted 2015
 * - Themes: end discrimination and violence; equal participation; rights and empowerment
 * - Pakistan links: constitutional equality themes (Art. 25), CEDAW name-level, education/labour barriers
 * Avoid inventing fake labour-force or ranking percentages
 */
export const SDG5_GENDER_EQUALITY_KIT: NoteKitData = {
  id: 'sdg5-gender-equality',
  title: 'SDG 5 Gender Equality',
  subtitle:
    'SDG 5 meaning, empowerment themes, and Pakistan constitutional and social links for exams.',
  syllabusTags: [
    'SDG 5',
    'Gender equality',
    'Women empowerment',
    'Sustainable Development Goals',
    'Ethics and civics',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS / PMS',
      directive: 'Discuss',
      angle: 'Gender equality as a development and human rights goal',
      frequency: 'high',
    },
    {
      year: 'One-paper / MPT',
      directive: 'MCQ fact',
      angle: 'SDG 5 name match: Gender Equality',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Evaluate',
      angle: 'Barriers to women participation in education and economy',
      frequency: 'high',
    },
    {
      year: 'Ethics / Current Affairs',
      directive: 'Critically examine',
      angle: 'Legal equality versus social practice',
      frequency: 'medium',
    },
  ],
  onePager: [
    'SDG 5 is Gender Equality under the UN 2030 Agenda (adopted 2015). It aims to achieve gender equality and empower all women and girls.',
    'High-yield MCQ: SDG 5 = Gender Equality. Do not swap with SDG 4 (Quality Education) or SDG 10 (Reduced Inequalities).',
    'Theme clusters in teaching: end discrimination; end violence and harmful practices; recognise unpaid care work themes; ensure participation in political and economic life; equal rights to resources and technology access themes.',
    'Pakistan constitutional hook: equality before law and non-discrimination themes (Article 25 framing) plus related policy and women-related provisions in broader notes.',
    'International hook at name level: CEDAW (Convention on the Elimination of All Forms of Discrimination Against Women). Pakistan is commonly taught as a state party; avoid inventing reservation texts unless verified.',
    'Practice gaps often tested: education continuity for girls, labour force participation barriers, mobility and safety, political representation, and social norms.',
    'Answer structure: define SDG 5; list legal and policy frameworks; diagnose social barriers; propose education, legal enforcement, economic opportunity, and norm-change measures.',
    'Discipline: no fake empowerment index scores; emphasise rights, agency, and evidence-based programmes.',
  ],
  answerSteps: [
    'State SDG 5 name and 2030 Agenda context.',
    'Summarise key gender equality themes (discrimination, violence, participation).',
    'Add Pakistan constitutional and CEDAW name-level hooks.',
    'Diagnose social and economic barriers carefully.',
    'Propose multi-track reforms: law, education, economy, safety.',
    'Conclude with equality in law and lived practice.',
  ],
  questionVariants: [
    'Discuss SDG 5 and its relevance for Pakistan.',
    'Critically examine barriers to gender equality in education and work.',
    'Evaluate legal equality versus social practice for women in Pakistan.',
    'How does CEDAW relate to SDG 5 in exam answers?',
  ],
  citations: [
    {
      label: 'SDG 5',
      text: 'Gender Equality; empower all women and girls (2030 Agenda).',
    },
    {
      label: 'Adoption context',
      text: 'SDGs adopted 2015; 17 goals with horizon 2030.',
    },
    {
      label: 'Pakistan hooks',
      text: 'Constitutional equality themes (Art. 25 framing) and CEDAW name-level.',
    },
    {
      label: 'Barrier themes',
      text: 'Education continuity, labour participation, safety/mobility, and social norms.',
    },
  ],
  flashcards: [
    {
      prompt: 'What is SDG 5?',
      answer: 'Gender Equality',
    },
    {
      prompt: 'What is the SDG target year?',
      answer: '2030',
    },
    {
      prompt: 'Expand CEDAW.',
      answer: 'Convention on the Elimination of All Forms of Discrimination Against Women',
    },
    {
      prompt: 'Name a constitutional equality hook.',
      answer: 'Article 25 equality before law / non-discrimination themes',
    },
    {
      prompt: 'Name two SDG 5 theme clusters.',
      answer: 'End discrimination/violence and ensure equal participation',
    },
    {
      prompt: 'Name a common practice gap.',
      answer: 'Girls education continuity or labour force barriers',
    },
    {
      prompt: 'Should labour-force percentages be invented?',
      answer: 'No; discuss directionally unless verified',
    },
    {
      prompt: 'Legal equality vs social practice means?',
      answer: 'Laws may exist while norms and enforcement lag',
    },
    {
      prompt: 'Do not confuse SDG 5 with?',
      answer: 'SDG 4 Quality Education (related but distinct)',
    },
  ],
  mistakes: [
    {
      trap: 'Matching SDG 5 to Quality Education.',
      correct: 'SDG 5 is Gender Equality; SDG 4 is Quality Education.',
    },
    {
      trap: 'Writing slogans without legal or social analysis.',
      correct: 'Use SDG themes, constitution/CEDAW hooks, and barriers.',
    },
    {
      trap: 'Inventing ranking or labour percentages.',
      correct: 'Stay conceptual unless a verified source year is cited.',
    },
    {
      trap: 'Treating law alone as sufficient.',
      correct: 'Practice gaps need enforcement, education, and norms.',
    },
    {
      trap: 'Ignoring violence and safety themes when relevant.',
      correct: 'Safety and mobility are standard SDG 5-related barriers.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'SDG 5 name + 2030/2015.' },
    { day: 'Day 2', task: 'Theme clusters.' },
    { day: 'Day 3', task: 'Art. 25 + CEDAW hooks.' },
    { day: 'Day 4', task: 'Flashcards.' },
    { day: 'Day 5', task: 'Barriers and reforms.' },
    { day: 'Day 6', task: '10-minute critically examine outline.' },
    { day: 'Day 7', task: 'Recite one-pager.' },
  ],
  sourcesLine:
    'Sources: UN SDG 5 teaching language and standard Pakistan gender equality / women empowerment exam notes. Avoid unverified ranking figures.',
}
