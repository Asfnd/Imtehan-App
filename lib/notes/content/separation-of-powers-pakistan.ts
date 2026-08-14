import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked:
 * - 1973 Constitution: parliamentary federal republic; Majlis-e-Shoora (Parliament: NA + Senate); Federal Government / Prime Minister; Judiciary headed by Supreme Court teaching frame
 * - Separation of powers: distinct organs with checks and balances rather than rigid US-style wall
 * - 18th Amendment (2010): major parliamentary/provincial empowerment package; name-level only here
 * - Judicial review: courts examine legislation/executive action for constitutional consistency; teach carefully without inventing case lists
 * - Distinct from full Constitution 1973 kit and full 18th Amendment kit
 */
export const SEPARATION_OF_POWERS_PAKISTAN_KIT: NoteKitData = {
  id: 'separation-of-powers-pakistan',
  title: 'Separation of Powers in Pakistan',
  subtitle:
    'Legislature, executive, and judiciary under the 1973 Constitution; checks and balances; 18th Amendment and judicial review at careful name level.',
  syllabusTags: [
    'Constitutional law',
    'Separation of powers',
    '1973 Constitution',
    'Governance',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS / PMS',
      directive: 'Discuss',
      angle: 'Separation of powers under the 1973 Constitution',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Critically examine',
      angle: 'Checks and balances among organs of state',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Evaluate',
      angle: 'Judicial review and parliamentary supremacy tensions',
      frequency: 'medium',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'Organs of state; parliamentary executive basics',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Separation of powers means state functions are divided among legislature, executive, and judiciary so that power is not concentrated in one organ.',
    'Pakistan under the 1973 Constitution is a parliamentary federal republic: separation exists, but executive is drawn from and accountable to Parliament (not a rigid presidential wall).',
    'Legislature: Majlis-e-Shoora (Parliament) with National Assembly and Senate; makes laws, budgets, and oversight.',
    'Executive: Federal Government headed in parliamentary practice by the Prime Minister with Cabinet; implements laws and policy; provincial executives mirror the pattern.',
    'Judiciary: hierarchical courts with the Supreme Court at the apex in the federal judicial teaching frame; interprets Constitution and laws; protects Fundamental Rights.',
    'Checks and balances examples: parliamentary confidence and questions; legislation and budget control; judicial review of unconstitutional action; executive law enforcement within legal limits.',
    'Judicial review (name-level): courts may examine whether legislation or executive acts conform to the Constitution. Teach the concept; do not invent a fake case catalogue.',
    '18th Amendment (2010) name-level: strengthened parliamentary and provincial dimensions of the constitutional design; details belong in the dedicated 18th Amendment kit.',
    'Critical line: formal separation can weaken when assemblies are sidelined, executives overreach, or judicialisation substitutes for political responsibility.',
    'Answer craft: define → map three organs under 1973 → give checks → note parliamentary fusion → add 18th Amendment / judicial review carefully → close with balance not domination.',
  ],
  answerSteps: [
    'Define separation of powers and state why absolute separation is rare in parliamentary systems.',
    'Map legislature, executive, and judiciary under the 1973 Constitution.',
    'Explain checks and balances with two concrete mechanisms.',
    'Add judicial review at concept level; mention 18th Amendment only as parliamentary/provincial strengthening.',
    'Close with the need for balance among organs rather than supremacy of one by practice.',
  ],
  questionVariants: [
    'Discuss separation of powers in Pakistan under the 1973 Constitution.',
    'Explain checks and balances among the legislature, executive, and judiciary.',
    'What is judicial review and why does it matter in Pakistan constitutional design?',
    'Critically examine tensions between parliamentary executive and judicial review.',
  ],
  citations: [
    {
      label: 'Three organs',
      text: 'Legislature (Parliament), executive (parliamentary government), and judiciary are the classic triad under the 1973 Constitution.',
    },
    {
      label: 'Parliamentary character',
      text: 'Executive is fused with legislature through confidence and membership patterns, unlike a rigid presidential separation.',
    },
    {
      label: 'Judicial review',
      text: 'Courts may test laws and executive actions against the Constitution; concept-level teaching is enough unless a named case is required.',
    },
    {
      label: '18th Amendment',
      text: '2010 amendment package strengthened parliamentary and provincial features of the constitutional order at name level.',
    },
  ],
  flashcards: [
    {
      prompt: 'Name the three organs in separation of powers.',
      answer: 'Legislature, executive, judiciary',
    },
    {
      prompt: 'Pakistan system type under 1973 for this topic?',
      answer: 'Parliamentary federal republic',
    },
    {
      prompt: 'What is Majlis-e-Shoora in this frame?',
      answer: 'Parliament (National Assembly and Senate)',
    },
    {
      prompt: 'Who leads the federal executive in parliamentary practice?',
      answer: 'Prime Minister with Cabinet',
    },
    {
      prompt: 'What is checks and balances?',
      answer: 'Each organ can limit or oversee the others so power is not absolute',
    },
    {
      prompt: 'What is judicial review (exam definition)?',
      answer: 'Court examination of laws/executive acts for constitutional consistency',
    },
    {
      prompt: 'Why is Pakistan separation not identical to US presidential separation?',
      answer: 'Parliamentary fusion: executive depends on legislative confidence',
    },
    {
      prompt: '18th Amendment year?',
      answer: '2010',
    },
    {
      prompt: 'One legislative check on executive?',
      answer: 'Vote of confidence/no-confidence and parliamentary oversight',
    },
    {
      prompt: 'One judicial function in the triad?',
      answer: 'Interpret Constitution/laws and protect Fundamental Rights',
    },
  ],
  mistakes: [
    {
      trap: 'Describing Pakistan as a pure presidential separation model.',
      correct: '1973 design is parliamentary: executive and legislature are linked by confidence.',
    },
    {
      trap: 'Ignoring judiciary or reducing it to crime courts only.',
      correct: 'Constitutional interpretation and rights protection are central to the triad.',
    },
    {
      trap: 'Dumping a long invented case list for judicial review.',
      correct: 'State the concept carefully; cite a case only if you know it accurately.',
    },
    {
      trap: 'Confusing this kit with the full Constitution chronology kit.',
      correct: 'Focus organs, checks, parliamentary fusion, and name-level 18th Amendment/review.',
    },
    {
      trap: 'Claiming one organ should permanently dominate.',
      correct: 'Exam expectation is balanced constitutionalism, not organ worship.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Map legislature, executive, judiciary under 1973.' },
    { day: 'Day 2', task: 'Learn parliamentary fusion vs rigid separation.' },
    { day: 'Day 3', task: 'List checks and balances mechanisms.' },
    { day: 'Day 4', task: 'Judicial review definition drill.' },
    { day: 'Day 5', task: 'Write a full discuss answer.' },
    { day: 'Day 6', task: 'Add careful 18th Amendment one-liner; cross-link constitution kits.' },
    { day: 'Day 7', task: 'One-pager from memory.' },
  ],
  sourcesLine:
    'Sources: Constitution of Pakistan 1973 organ design as taught in CSS/PMS; standard separation of powers and judicial review concepts; 18th Amendment (2010) name-level. Avoid unsourced case mythology.',
}
