import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked:
 * - Part II, Chapter 2: Principles of Policy, Articles 29-40
 * - Art 29 Principles of Policy; Art 30 responsibility of organs of state
 * - Name-level map: Islamic way of life (31), local government (32), women (34), family (35), minorities (36), social justice (37), socio-economic well-being (38), Armed Forces participation (39), Muslim world / international peace (40)
 * - Not justiciable like Fundamental Rights; do not invent fake enforcement case lists
 */
export const CONSTITUTION_PRINCIPLES_POLICY_KIT: NoteKitData = {
  id: 'constitution-principles-policy',
  title: 'Principles of Policy (Articles 29-40)',
  subtitle:
    'Name-level Arts 29-40 map for CSS PA: what each principle directs, and why they differ from Fundamental Rights.',
  syllabusTags: [
    '1973 Constitution',
    'Principles of Policy',
    'Pakistan Affairs',
    'Social justice',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS pattern',
      directive: 'Discuss',
      angle: 'Role of Principles of Policy in the 1973 Constitution',
      frequency: 'high',
    },
    {
      year: 'CSS / PMS',
      directive: 'Critically examine',
      angle: 'Social justice, minorities, and women under Principles of Policy',
      frequency: 'medium',
    },
    {
      year: 'One-paper / MPT',
      directive: 'MCQ fact',
      angle: 'Article numbers for minorities, women, Islamic way of life',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Distinguish',
      angle: 'Fundamental Rights vs Principles of Policy',
      frequency: 'high',
    },
  ],
  onePager: [
    'Principles of Policy sit in Part II, Chapter 2: Articles 29 to 40 of the 1973 Constitution.',
    'Art 29: Principles of Policy are set out for the guidance of the state. Art 30: responsibility of each organ of state to act in accordance with those Principles (within its respective sphere).',
    'Islamic and social order: Art 31 Islamic way of life; Art 33 discouragement of parochial and similar prejudices.',
    'Participation and local democracy: Art 32 promotion of local government institutions; Art 34 full participation of women in national life; Art 39 participation of people in Armed Forces.',
    'Family and minorities: Art 35 protection of family, marriage, mother and child; Art 36 protection of minorities.',
    'Welfare cluster: Art 37 promotion of social justice and eradication of social evils; Art 38 promotion of social and economic well-being of the people (classic exam hook for welfare state language).',
    'External orientation: Art 40 strengthening bonds with the Muslim world and promoting international peace.',
    'Exam rule: Principles of Policy are directive/guiding. They are not enforced like Fundamental Rights (Arts 8-28). Use them for policy answers, not as substitute FR citations.',
  ],
  answerSteps: [
    'Define Principles of Policy as Part II Chapter 2 (Arts 29-40) and cite Arts 29-30 on guidance and responsibility.',
    'Contrast briefly with Fundamental Rights: FR justiciable; Principles guide organs of state.',
    'Walk name-level clusters: Islamic life (31), local govt (32), women (34), family (35), minorities (36), social justice/welfare (37-38), Armed Forces (39), Muslim world/peace (40).',
    'Pick 2-3 principles that match the question (e.g. minorities + social justice).',
    'Add one critical line: implementation depends on legislation, budget, and political will.',
    'Close by linking Principles to CSS essays on welfare, federal social policy, and Islamic provisions without overclaiming justiciability.',
  ],
  questionVariants: [
    'Discuss the Principles of Policy in the Constitution of Pakistan.',
    'Distinguish Fundamental Rights from Principles of Policy with examples.',
    'Critically examine constitutional provisions on protection of minorities and participation of women.',
    'Evaluate the welfare and social justice orientation of Articles 37 and 38.',
  ],
  citations: [
    {
      label: 'Location',
      text: 'Part II, Chapter 2, Articles 29 to 40, Constitution of Pakistan 1973.',
    },
    {
      label: 'Arts 29-30',
      text: 'Art 29 sets out Principles of Policy. Art 30 places responsibility on organs of state to observe them in their respective spheres.',
    },
    {
      label: 'High-yield articles',
      text: 'Art 31 Islamic way of life; Art 34 women; Art 36 minorities; Art 37 social justice; Art 38 socio-economic well-being; Art 40 Muslim world and international peace.',
    },
    {
      label: 'Nature',
      text: 'Principles of Policy are guiding principles. They are not treated as Fundamental Rights for ordinary court enforcement.',
    },
  ],
  flashcards: [
    { prompt: 'Which articles are Principles of Policy?', answer: 'Articles 29 to 40' },
    { prompt: 'What does Article 29 introduce?', answer: 'Principles of Policy for the guidance of the state' },
    { prompt: 'Article for Islamic way of life?', answer: 'Article 31' },
    { prompt: 'Article for promotion of local government?', answer: 'Article 32' },
    { prompt: 'Article for full participation of women?', answer: 'Article 34' },
    { prompt: 'Article for protection of family?', answer: 'Article 35' },
    { prompt: 'Article for protection of minorities?', answer: 'Article 36' },
    { prompt: 'Articles for social justice and socio-economic well-being?', answer: 'Articles 37 and 38' },
    { prompt: 'Article for bonds with Muslim world / international peace?', answer: 'Article 40' },
    { prompt: 'Are Principles of Policy justiciable like FR?', answer: 'No. They guide the state; FR (8-28) are the justiciable rights chapter' },
  ],
  mistakes: [
    {
      trap: 'Citing Art 36 as a Fundamental Right.',
      correct: 'Art 36 is a Principle of Policy (protection of minorities). Minority-related FR sit elsewhere in Chapter 1.',
    },
    {
      trap: 'Saying courts enforce Principles of Policy exactly like Arts 8-28.',
      correct: 'Principles guide organs of state. FR are the classic justiciable rights package.',
    },
    {
      trap: 'Confusing Art 31 with Art 2.',
      correct: 'Art 2: Islam is the State religion. Art 31: Islamic way of life as a Principle of Policy.',
    },
    {
      trap: 'Mixing Art 34 with Art 25.',
      correct: 'Art 25 is equality (FR). Art 34 is full participation of women (Principle of Policy).',
    },
    {
      trap: 'Skipping Arts 29-30 and jumping straight to 31.',
      correct: 'Always open with Arts 29-30: what Principles are and who must observe them.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Read Arts 29-40 names only; make a one-line map.' },
    { day: 'Day 2', task: 'Memorise Arts 29, 30, 31, 32.' },
    { day: 'Day 3', task: 'Memorise Arts 34, 35, 36, 37, 38, 40.' },
    { day: 'Day 4', task: 'Drill FR vs Principles contrast with flashcards.' },
    { day: 'Day 5', task: 'Write a 10-minute minorities/women/welfare outline.' },
    { day: 'Day 6', task: 'One-pager + distinguish question practice.' },
    { day: 'Day 7', task: 'Recite article names from memory.' },
  ],
  sourcesLine:
    'Sources: Constitution of Pakistan 1973, Part II Chapter 2 (Arts 29-40); standard CSS PA textbooks on Principles of Policy. Keep name-level accuracy; avoid inventing fake enforcement statistics.',
}
