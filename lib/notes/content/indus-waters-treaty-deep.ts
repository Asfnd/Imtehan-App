import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (deeper than indus-river-system kit):
 * - Indus Waters Treaty 1960: India-Pakistan; World Bank facilitating role
 * - Allocation teaching: eastern rivers (Ravi, Beas, Sutlej) primarily India; western rivers (Indus, Jhelum, Chenab) primarily Pakistan
 * - Mechanism themes: Permanent Indus Commission; dispute settlement ladder (neutral expert / Court of Arbitration) in standard teaching
 * - Exam angles: water security, run-of-river vs storage debates, climate stress, and treaty resilience
 * Do not invent fake article numbers or invent current case outcomes as settled law unless carefully labelled as contested/process
 */
export const INDUS_WATERS_TREATY_DEEP_KIT: NoteKitData = {
  id: 'indus-waters-treaty-deep',
  title: 'Indus Waters Treaty (Deep Dive)',
  subtitle:
    '1960 allocation framework, institutions, dispute mechanisms, and water-security angles deeper than the river-system overview kit.',
  syllabusTags: [
    'Pakistan Affairs',
    'Indus Waters Treaty',
    'Water security',
    'Foreign policy',
    'Geography',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS / PMS',
      directive: 'Discuss',
      angle: 'Salient features of the Indus Waters Treaty 1960',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Critically examine',
      angle: 'Relevance of IWT for Pakistan water security',
      frequency: 'high',
    },
    {
      year: 'CSS / PMS',
      directive: 'Evaluate',
      angle: 'Dispute resolution under the Indus Waters Treaty',
      frequency: 'medium',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: '1960; World Bank; eastern vs western rivers',
      frequency: 'high',
    },
  ],
  onePager: [
    'This kit goes deeper than river names and dams: focus on treaty design, institutions, and dispute politics. Use the Indus river system kit for tributary geography.',
    'Indus Waters Treaty (IWT) signed in 1960 between India and Pakistan, with the World Bank in a facilitating role. It is a classic water-sharing agreement in exam literature.',
    'Allocation frame commonly taught: eastern rivers (Ravi, Beas, Sutlej) primarily for India; western rivers (Indus, Jhelum, Chenab) primarily for Pakistan, subject to detailed permitted uses.',
    'Design idea: reduce day-to-day conflict by partitioning rivers rather than sharing every drop on all six rivers jointly (exam explanation, not propaganda).',
    'Institution: Permanent Indus Commission (commissioners from both sides) for data exchange, inspection themes, and first-line dispute handling in standard notes.',
    'Dispute ladder (syllabus level): unresolved issues can move to neutral expert and/or Court of Arbitration pathways under the treaty framework. Describe as process, not as a scoreboard of winners.',
    'Hydrology politics: debates often centre on upstream works (run-of-river hydro vs storage concerns), timing of flows, and information sharing. Stick to concepts; avoid invented technical verdicts.',
    'Contemporary stress: climate variability, glacier melt uncertainty, population and irrigation demand, and political trust deficits test treaty resilience. Answer close: diplomacy, data transparency, efficient domestic water use, and storage on Pakistan side where feasible.',
  ],
  answerSteps: [
    'State year 1960, parties, and World Bank role.',
    'Explain eastern vs western river allocation clearly.',
    'Describe Permanent Indus Commission function.',
    'Outline dispute settlement ladder at concept level.',
    'Add water-security and climate stress paragraph.',
    'Conclude with treaty resilience plus domestic water management.',
  ],
  questionVariants: [
    'Discuss the salient features of the Indus Waters Treaty 1960.',
    'Critically examine the importance of the Indus Waters Treaty for Pakistan.',
    'Evaluate dispute resolution mechanisms under the Indus Waters Treaty.',
    'How do climate and demand pressures affect Indus basin water politics?',
  ],
  citations: [
    {
      label: 'Year and parties',
      text: 'IWT 1960 between India and Pakistan with World Bank facilitation.',
    },
    {
      label: 'Allocation',
      text: 'Eastern rivers primarily India; western rivers primarily Pakistan in standard teaching.',
    },
    {
      label: 'Institution',
      text: 'Permanent Indus Commission handles cooperation and first-line disputes.',
    },
    {
      label: 'Disputes',
      text: 'Neutral expert and Court of Arbitration pathways appear in syllabus-level treaty teaching.',
    },
  ],
  flashcards: [
    {
      prompt: 'When was the Indus Waters Treaty signed?',
      answer: '1960',
    },
    {
      prompt: 'Which third party facilitated the IWT in teaching?',
      answer: 'World Bank',
    },
    {
      prompt: 'Name the eastern rivers in the classic allocation frame.',
      answer: 'Ravi, Beas, Sutlej',
    },
    {
      prompt: 'Name the western rivers in the classic allocation frame.',
      answer: 'Indus, Jhelum, Chenab',
    },
    {
      prompt: 'What institution is the first cooperation forum?',
      answer: 'Permanent Indus Commission',
    },
    {
      prompt: 'Name two higher dispute pathways taught at syllabus level.',
      answer: 'Neutral expert and Court of Arbitration',
    },
    {
      prompt: 'How does this kit differ from the river-system kit?',
      answer: 'Treaty institutions and disputes, not tributary geography alone',
    },
    {
      prompt: 'What upstream debate theme appears in essays?',
      answer: 'Run-of-river works vs storage/flow-timing concerns',
    },
    {
      prompt: 'Name two contemporary stress factors.',
      answer: 'Climate variability and rising irrigation/population demand',
    },
    {
      prompt: 'What domestic point should close a strong answer?',
      answer: 'Efficient water use and storage/management inside Pakistan',
    },
  ],
  mistakes: [
    {
      trap: 'Only listing tributaries without treaty institutions.',
      correct: 'Add Commission and dispute ladder for a deep IWT answer.',
    },
    {
      trap: 'Inventing article numbers and fake case verdicts.',
      correct: 'Keep to allocation, institutions, and process language.',
    },
    {
      trap: 'Claiming the treaty abolished all water conflict.',
      correct: 'It reduces conflict through rules; disputes still arise.',
    },
    {
      trap: 'Ignoring Pakistan domestic water inefficiency.',
      correct: 'Treaty politics plus domestic management both matter.',
    },
    {
      trap: 'Mixing Beas into western rivers.',
      correct: 'Beas is in the eastern set in classic teaching.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Memorise 1960, World Bank, eastern/western lists.' },
    { day: 'Day 2', task: 'Commission + dispute ladder diagram.' },
    { day: 'Day 3', task: 'Write salient-features one-pager from memory.' },
    { day: 'Day 4', task: 'Flashcards drill.' },
    { day: 'Day 5', task: 'Critical water-security paragraph.' },
    { day: 'Day 6', task: 'Contrast this kit with Indus river system kit.' },
    { day: 'Day 7', task: 'Full 15-minute IWT essay outline.' },
  ],
  sourcesLine:
    'Sources: Indus Waters Treaty 1960 teaching in Pakistan Affairs and geography notes; World Bank facilitation; Permanent Indus Commission and dispute-pathway primers. Deeper than the river-system overview kit. Avoid invented article trivia and sensational verdict claims.',
}
