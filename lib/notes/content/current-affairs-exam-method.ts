import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (CSS/PMS Current Affairs method teaching):
 * - Method kit: how to prepare and write CA, not a dump of fake 2026 event lists
 * - Sources hierarchy: Economic Survey, SBP, MOF, reputable newspapers, international orgs
 * - Answer structure: context, facts, analysis, Pakistan angle, way forward
 * - Avoid inventing statistics; teach citation habits
 */
export const CURRENT_AFFAIRS_EXAM_METHOD_KIT: NoteKitData = {
  id: 'current-affairs-exam-method',
  title: 'Current Affairs Exam Method (CSS / PMS)',
  subtitle:
    'How to prepare, select, and write Current Affairs for CSS/PMS without fake numbers or random news dumps.',
  syllabusTags: [
    'Current Affairs',
    'CSS method',
    'PMS method',
    'Answer writing',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS Current Affairs',
      directive: 'Discuss',
      angle: 'Pakistan-focused regional or global issue with analysis',
      frequency: 'high',
    },
    {
      year: 'CSS / PMS',
      directive: 'Critically examine',
      angle: 'Policy problem with causes, impacts, and way forward',
      frequency: 'high',
    },
    {
      year: 'PMS pattern',
      directive: 'Evaluate',
      angle: 'International organization or bilateral issue affecting Pakistan',
      frequency: 'high',
    },
    {
      year: 'One-paper / CA MCQ',
      directive: 'MCQ fact',
      angle: 'Recent verified appointments, summits, indices (only if confirmed)',
      frequency: 'medium',
    },
  ],
  onePager: [
    'CA is not a newspaper scrapbook. Examiners reward organised knowledge: what happened, why it matters, Pakistan stake, and a realistic way forward.',
    'Build a weekly map, not random scrolling: (1) Pakistan economy and governance, (2) foreign policy and neighbours, (3) global geopolitics, (4) climate/energy/tech, (5) international organisations and law.',
    'Source hierarchy: official documents first (Economic Survey, budget briefs, SBP, MOF, NDMA where relevant), then quality analysis, then daily news for updates. Never treat unverified social media as a citation.',
    'Fact discipline: write only numbers you can source. Prefer ranges, trends, and named reports over invented precision. If unsure, analyse qualitatively with named institutions.',
    'Answer skeleton: brief context -> 3 to 4 analytical pillars -> Pakistan implications -> constraints -> way forward (institutional, not slogans). Link CA to Pakistan Affairs and Essay themes when useful.',
    'Revision habit: one-page issue briefs (definition, timeline bullets, stakeholders, 3 arguments, 3 reforms). Update monthly. For MCQs, maintain a verified shortlist; delete rumours.',
  ],
  answerSteps: [
    'Decode the directive: discuss vs critically examine vs evaluate.',
    'Write a 2-line context that defines the issue and time frame.',
    'Pick 3 analytical headings (causes, impacts, actors/institutions).',
    'Add a Pakistan-specific stake and one constraint (capacity, fiscal, politics).',
    'Close with a realistic way forward tied to institutions and sequenced steps.',
  ],
  questionVariants: [
    'How should a CSS candidate structure a Current Affairs answer?',
    'Critically examine a major regional issue affecting Pakistan (method: apply the skeleton).',
    'Discuss the role of reliable sources in Current Affairs preparation.',
    'Evaluate how to link Current Affairs with Pakistan Affairs in exams.',
  ],
  citations: [
    {
      label: 'Method goal',
      text: 'CA answers need context, verified facts, analysis, Pakistan angle, and a realistic way forward.',
    },
    {
      label: 'Source hierarchy',
      text: 'Prefer official reports (Economic Survey, SBP, MOF) and reputable analysis over social media claims.',
    },
    {
      label: 'Fact discipline',
      text: 'Do not invent statistics. Use named sources or qualitative institutional analysis.',
    },
    {
      label: 'Issue brief',
      text: 'Maintain one-page briefs: timeline, stakeholders, arguments, reforms.',
    },
    {
      label: 'Weekly map',
      text: 'Track economy/governance, foreign policy, geopolitics, climate/energy, and international organisations.',
    },
  ],
  flashcards: [
    { prompt: 'What five zones belong on a weekly CA map?', answer: 'Economy/governance; foreign policy; geopolitics; climate/energy/tech; IOs/law' },
    { prompt: 'Name two official Pakistan sources for CA.', answer: 'Economic Survey; SBP (also MOF/budget briefs)' },
    { prompt: 'What is the core CA answer skeleton?', answer: 'Context -> analysis pillars -> Pakistan stake -> constraints -> way forward' },
    { prompt: 'What should you do with an unverified viral number?', answer: 'Do not cite it; verify or drop it' },
    { prompt: 'What belongs in an issue brief?', answer: 'Definition, timeline, stakeholders, arguments, reforms' },
    { prompt: 'How do you handle unsure statistics?', answer: 'Use trends/named reports or qualitative analysis' },
    { prompt: 'What makes a weak CA conclusion?', answer: 'Empty slogans with no institutions or sequence' },
    { prompt: 'How often should briefs be updated?', answer: 'At least monthly for live issues' },
    { prompt: 'Should CA ignore Pakistan Affairs?', answer: 'No; link stakes and domestic institutions where relevant' },
    { prompt: 'What is CA preparation not?', answer: 'A random newspaper scrapbook' },
  ],
  mistakes: [
    {
      trap: 'Dumping headlines without analysis or Pakistan stake.',
      correct: 'Use a structured skeleton with causes, impacts, and way forward.',
    },
    {
      trap: 'Inventing GDP, inflation, or summit “facts” from memory.',
      correct: 'Cite official or reputable sources, or analyse without fake precision.',
    },
    {
      trap: 'Writing only global theory with no Pakistan implication.',
      correct: 'Always ask: how does this affect Pakistan’s interests and policy space?',
    },
    {
      trap: 'Ending with vague “government should take steps”.',
      correct: 'Name institutions, sequencing, and feasible reforms.',
    },
    {
      trap: 'Treating WhatsApp forwards as Current Affairs notes.',
      correct: 'Use a source hierarchy and delete unverified claims.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Build your weekly CA map folders or notebook sections.' },
    { day: 'Day 2', task: 'Write one issue brief using the skeleton.' },
    { day: 'Day 3', task: 'Practice a 10-minute critically examine outline.' },
    { day: 'Day 4', task: 'List your trusted official sources and bookmark them.' },
    { day: 'Day 5', task: 'Update two live briefs; delete one rumour.' },
    { day: 'Day 6', task: 'Full timed answer on one regional issue.' },
    { day: 'Day 7', task: 'One-pager method only. Recite skeleton from memory.' },
  ],
  sourcesLine:
    'Sources: FPSC/PPSC Current Affairs paper patterns; standard CSS answer-writing method teaching. This kit teaches process, not fabricated 2026 event lists.',
}
