import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked:
 * - Distinct from UNDP good governance kit: focus civil service ethics values for CSS/PMS
 * - Core values: impartiality, integrity, accountability, merit, responsiveness, conflict of interest avoidance
 * - Pakistan frame: bureaucracy under Constitution/rules; NAB and other bodies as accountability context at name level only
 * - No partisan case narratives
 */
export const PUBLIC_SERVICE_VALUES_KIT: NoteKitData = {
  id: 'public-service-values',
  title: 'Public Service Values and Integrity',
  subtitle:
    'Impartiality, accountability, conflict of interest, merit, and responsiveness for civil service ethics answers.',
  syllabusTags: [
    'Civil service ethics',
    'Public administration',
    'Integrity',
    'CSS Governance and Public Policy',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS / PMS',
      directive: 'Discuss',
      angle: 'Values of public service and their importance',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Critically examine',
      angle: 'Conflict of interest and integrity in bureaucracy',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Evaluate',
      angle: 'Merit versus patronage in civil service',
      frequency: 'high',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'Meaning of impartiality and accountability',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Public service values are the ethical standards that guide civil servants when using public power and public money.',
    'Integrity: honesty and consistency between rules, words, and actions; refusal to misuse office for private gain.',
    'Impartiality: decide on law, merit, and evidence, not on kinship, party, sect, or personal favour.',
    'Accountability: answerability for decisions and results to law, superiors, audit, legislature, courts, and citizens as relevant.',
    'Merit: recruitment, posting, and promotion based on competence and fair process rather than patronage.',
    'Responsiveness: timely, respectful service delivery within legal limits; listen to citizens without illegal favouritism.',
    'Conflict of interest: when private interests could improperly influence official duties. Manage by disclosure, recusal, and refusal of improper benefits.',
    'Related values often listed: legality, transparency, professionalism, confidentiality where required, and political neutrality of the permanent civil service.',
    'Pakistan exam link: constitutional oath and service rules culture; accountability institutions at name level; gap between stated values and patronage pressures.',
    'Answer craft: define value → why it matters → breach example type (not partisan gossip) → reform (codes, training, transparent HR, audit, protection for honest officers).',
  ],
  answerSteps: [
    'Define public service ethics as values guiding use of public authority.',
    'Explain impartiality, integrity, accountability, merit, and responsiveness in turn.',
    'Add conflict of interest with disclosure/recusal remedies.',
    'Link briefly to Pakistan institutional context without partisan storytelling.',
    'Close with how codes, merit HR, and accountability systems protect values.',
  ],
  questionVariants: [
    'Discuss the core values of public service.',
    'What is conflict of interest and how should civil servants manage it?',
    'Critically examine merit and impartiality in Pakistan civil service.',
    'Why is accountability essential for integrity in public administration?',
  ],
  citations: [
    {
      label: 'Integrity and impartiality',
      text: 'Integrity demands honest use of office; impartiality demands decisions on law and merit, not private loyalty.',
    },
    {
      label: 'Accountability',
      text: 'Public officials must be answerable for decisions through legal, administrative, and institutional checks.',
    },
    {
      label: 'Merit',
      text: 'Merit-based HR is a foundation for competent and fair public service.',
    },
    {
      label: 'Conflict of interest',
      text: 'Private interests that could bias official duty should be disclosed and managed by recusal and refusal of improper benefits.',
    },
  ],
  flashcards: [
    {
      prompt: 'What is impartiality in public service?',
      answer: 'Deciding on law, merit, and evidence without favouritism',
    },
    {
      prompt: 'What is integrity?',
      answer: 'Honesty and refusal to misuse public office for private gain',
    },
    {
      prompt: 'What is accountability?',
      answer: 'Answerability for decisions and conduct to lawful forums',
    },
    {
      prompt: 'What does merit mean in civil service?',
      answer: 'Selection and advancement by competence and fair process',
    },
    {
      prompt: 'What is responsiveness?',
      answer: 'Timely lawful service that takes citizens seriously',
    },
    {
      prompt: 'What is conflict of interest?',
      answer: 'Private interest that could improperly influence official duty',
    },
    {
      prompt: 'Name two conflict remedies.',
      answer: 'Disclosure and recusal (also refuse improper gifts/benefits)',
    },
    {
      prompt: 'Why political neutrality matters for permanent civil service?',
      answer: 'Continuity and fairness across changing governments',
    },
    {
      prompt: 'Name three core values to list first in an answer.',
      answer: 'Impartiality, integrity, accountability (add merit and responsiveness)',
    },
    {
      prompt: 'Safe Pakistan institutional link?',
      answer: 'Service rules plus accountability and audit frameworks at name level',
    },
  ],
  mistakes: [
    {
      trap: 'Confusing this kit with UNDP good governance principles lists.',
      correct: 'Governance kit is system principles; this kit is officer-level ethics values.',
    },
    {
      trap: 'Writing partisan scandals as evidence.',
      correct: 'Use types of breach (nepotism, bribery, bias) without factional storytelling.',
    },
    {
      trap: 'Treating responsiveness as doing illegal favours quickly.',
      correct: 'Responsiveness stays inside law and impartiality.',
    },
    {
      trap: 'Defining conflict of interest only as criminal bribery.',
      correct: 'It includes any private interest that could bias duty, even before a bribe.',
    },
    {
      trap: 'Ignoring merit while praising loyalty.',
      correct: 'Exams expect merit and impartiality as integrity pillars.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Memorise five core values with one-line definitions.' },
    { day: 'Day 2', task: 'Write conflict of interest and remedies.' },
    { day: 'Day 3', task: 'Outline merit vs patronage paragraph.' },
    { day: 'Day 4', task: 'Drill flashcards.' },
    { day: 'Day 5', task: 'Full discuss answer on public service values.' },
    { day: 'Day 6', task: 'Cross-revise with good governance kit without mixing lists.' },
    { day: 'Day 7', task: 'One-pager from memory.' },
  ],
  sourcesLine:
    'Sources: standard public administration and civil service ethics teaching for CSS/PMS; conflict of interest and merit concepts used in governance syllabi. Avoid partisan case packs.',
}
