import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (SEZs and CPEC industrial cooperation):
 * - Pakistan Special Economic Zones Act, 2012 provides the main federal SEZ legal framework in standard teaching
 * - CPEC industrial cooperation includes planned SEZs / industrial parks (names commonly taught include Rashakai, Dhabeji, Allama Iqbal Industrial City / Faisalabad area, Bostan, among others). Confirm spelling; do not invent completion or occupancy rates
 * - Policy aim: export-oriented industry, investment facilitation, utilities and one-window themes
 * - Board of Investment / SEZ institutional facilitation appears in official framing
 * Avoid inventing exact Chinese investment totals, factory counts, or fake inaugurated-vs-operational claims as permanent facts
 */
export const SPECIAL_ECONOMIC_ZONES_PAKISTAN_KIT: NoteKitData = {
  id: 'special-economic-zones-pakistan',
  title: 'Special Economic Zones in Pakistan',
  subtitle:
    'SEZ Act framework, CPEC industrial cooperation zones, and investment facilitation tests for CSS and PMS.',
  syllabusTags: [
    'SEZs',
    'CPEC',
    'Industrial policy',
    'Investment',
    'Current affairs',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS / PMS',
      directive: 'Discuss',
      angle: 'Role of Special Economic Zones in industrialisation',
      frequency: 'high',
    },
    {
      year: 'CSS Current Affairs',
      directive: 'Evaluate',
      angle: 'CPEC industrial cooperation and SEZs',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Critically examine',
      angle: 'Why SEZ announcements often outpace operational results',
      frequency: 'medium',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'SEZ Act 2012; CPEC SEZ names at recognition level',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Special Economic Zones are demarcated industrial areas with facilitation for investment, utilities, and often export-oriented production under a dedicated legal and administrative regime.',
    'Legal frame: Pakistan Special Economic Zones Act, 2012 is the standard federal statute name in exam teaching for the SEZ regime.',
    'CPEC link: industrial cooperation under CPEC includes planned SEZs and industrial parks meant to relocate or attract manufacturing and create jobs along corridor nodes.',
    'Name-level CPEC-linked examples often taught: Rashakai (KP), Dhabeji (Sindh), Allama Iqbal Industrial City / Faisalabad area (Punjab), Bostan (Balochistan). Treat as planned cooperation sites; do not invent occupancy rates.',
    'Policy promise: one-window facilitation, reliable power and infrastructure, tax or incentive packages as notified, and plug-and-play industrial land.',
    'Delivery tests: land acquisition, utilities, security, skills, logistics to ports, and actual firm entry. Announcements are not operations.',
    'Federal-provincial coordination matters because land and local services sit with provinces while investment promotion is multi-tier.',
    'Answer close: SEZs work when infrastructure, governance, and export logistics are real; CPEC SEZs must be judged by factories and jobs, not ribbon cuttings.',
  ],
  answerSteps: [
    'Define SEZs and state the SEZ Act 2012 frame.',
    'Link to CPEC industrial cooperation purpose.',
    'Name two or three planned SEZs carefully.',
    'Explain facilitation tools: utilities, one-window, incentives.',
    'Critically examine delivery gaps: land, power, skills, logistics.',
    'Conclude with operational criteria for success.',
  ],
  questionVariants: [
    'Discuss the role of Special Economic Zones in Pakistan industrialisation.',
    'Evaluate CPEC industrial cooperation through the SEZ lens.',
    'Critically examine constraints on making SEZs operational.',
    'How can SEZs support exports and employment in Pakistan?',
  ],
  citations: [
    {
      label: 'Legal frame',
      text: 'Special Economic Zones Act, 2012 is the standard federal SEZ statute name in Pakistani exam teaching.',
    },
    {
      label: 'CPEC industrial aim',
      text: 'CPEC industrial cooperation includes planned SEZs and industrial parks for manufacturing and jobs along corridor nodes.',
    },
    {
      label: 'Named sites (recognition)',
      text: 'Commonly taught planned sites include Rashakai, Dhabeji, Allama Iqbal Industrial City / Faisalabad area, and Bostan (confirm status; do not invent occupancy).',
    },
    {
      label: 'Facilitation tools',
      text: 'One-window processes, utilities, industrial land, and notified incentives are the SEZ promise in policy notes.',
    },
    {
      label: 'Delivery test',
      text: 'Land, power, security, skills, and port logistics determine whether SEZs become operational.',
    },
  ],
  flashcards: [
    {
      prompt: 'What federal statute frames SEZs in standard teaching?',
      answer: 'Special Economic Zones Act, 2012',
    },
    {
      prompt: 'What is an SEZ in one line?',
      answer: 'A facilitated industrial zone with dedicated rules to attract investment and often export-oriented industry',
    },
    {
      prompt: 'How do SEZs connect to CPEC?',
      answer: 'As industrial cooperation nodes for manufacturing and jobs along the corridor',
    },
    {
      prompt: 'Name four commonly taught CPEC-linked SEZ / industrial sites.',
      answer: 'Rashakai, Dhabeji, Allama Iqbal Industrial City / Faisalabad area, Bostan',
    },
    {
      prompt: 'Which province is Rashakai associated with in teaching?',
      answer: 'Khyber Pakhtunkhwa',
    },
    {
      prompt: 'Which province is Dhabeji associated with?',
      answer: 'Sindh',
    },
    {
      prompt: 'What facilitation tools do SEZs promise?',
      answer: 'One-window processes, utilities, industrial land, notified incentives',
    },
    {
      prompt: 'What is the key delivery trap in SEZ answers?',
      answer: 'Confusing announcements and ground-breaking with operational factories',
    },
    {
      prompt: 'Why does federal-provincial coordination matter?',
      answer: 'Land and local services are provincial; investment promotion is multi-tier',
    },
    {
      prompt: 'What success metrics should close an answer?',
      answer: 'Firm entry, exports, jobs, and reliable utilities or logistics',
    },
  ],
  mistakes: [
    {
      trap: 'Claiming every named CPEC SEZ is fully operational with fixed factory counts.',
      correct: 'Name sites carefully as planned cooperation locations; judge by delivery.',
    },
    {
      trap: 'Inventing Chinese investment totals for each zone.',
      correct: 'Use industrial-cooperation logic without fake precision.',
    },
    {
      trap: 'Ignoring utilities, land, and logistics constraints.',
      correct: 'These are the real make-or-break factors.',
    },
    {
      trap: 'Writing SEZs as only tax holidays.',
      correct: 'Infrastructure, governance, and skills matter as much as incentives.',
    },
    {
      trap: 'Confusing SEZs with ordinary industrial estates without the SEZ legal frame.',
      correct: 'Mention the SEZ Act 2012 regime when defining SEZs.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'SEZ definition + Act 2012.' },
    { day: 'Day 2', task: 'CPEC industrial cooperation logic.' },
    { day: 'Day 3', task: 'Memorise four site names with provinces.' },
    { day: 'Day 4', task: 'Flashcards.' },
    { day: 'Day 5', task: 'Delivery constraints paragraph.' },
    { day: 'Day 6', task: '10-minute evaluate outline.' },
    { day: 'Day 7', task: 'Recite one-pager.' },
  ],
  sourcesLine:
    'Sources: Special Economic Zones Act 2012 teaching notes, CPEC industrial cooperation primers, and Board of Investment style SEZ overviews. Avoid unsourced occupancy and investment-total claims.',
}
