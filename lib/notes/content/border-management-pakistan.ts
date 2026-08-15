import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (exam-safe policy framing):
 * - Eastern border (India): Line of Control / international boundary themes; fencing and surveillance as management concepts in public teaching
 * - Western border (Afghanistan): long, porous historically; fencing and regulated crossing themes in contemporary notes
 * - Iran border: trade and security management themes
 * - Concepts: fencing, border terminals, customs, immigration, anti-smuggling, coordination among agencies
 * Keep to public policy concepts; no operational tactics, maps of weak points, or how-to evasion content
 */
export const BORDER_MANAGEMENT_PAKISTAN_KIT: NoteKitData = {
  id: 'border-management-pakistan',
  title: 'Border Management in Pakistan',
  subtitle:
    'Eastern and western border challenges, fencing and regulation concepts, and institutional coordination for CSS and PMS.',
  syllabusTags: [
    'Pakistan Affairs',
    'Security',
    'Border management',
    'Governance',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS / PMS',
      directive: 'Discuss',
      angle: 'Border management challenges of Pakistan',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Evaluate',
      angle: 'Fencing and regulated crossings on western borders',
      frequency: 'high',
    },
    {
      year: 'CSS Current Affairs',
      directive: 'Critically examine',
      angle: 'Smuggling, illegal migration, and border governance',
      frequency: 'medium',
    },
    {
      year: 'One-paper',
      directive: 'MCQ / short',
      angle: 'Eastern vs western border management themes',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Border management means controlling and facilitating movement of people and goods while protecting security, revenue, and public health. It is both a security and a governance subject.',
    'Eastern border with India: managed through established boundary and LoC arrangements in syllabus language. Fencing, surveillance, and strict crossing rules feature as management concepts in public teaching.',
    'Western border with Afghanistan: historically more porous in exam literature. Contemporary policy emphasises fencing, documented crossing, and reducing irregular movement and smuggling.',
    'Iran border: combines security concerns with legitimate border trade. Management seeks orderly terminals rather than informal flows.',
    'Core tools in notes: physical barriers where adopted, border terminals/checkposts, customs and immigration procedures, identity documentation, and technology-assisted monitoring at concept level.',
    'Challenges: difficult terrain, informal trade incentives, refugee and migration pressures, cross-border militancy concerns, and coordination gaps among agencies.',
    'Good management balances facilitation and control: legitimate trade and travel should be easier at official points, while irregular routes lose advantage.',
    'Answer close: complete regulated infrastructure, strengthen terminals and customs IT, improve inter-agency coordination, and pair hard measures with livelihood and trade facilitation so communities cooperate.',
  ],
  answerSteps: [
    'Define border management as security plus facilitation.',
    'Contrast eastern (India) and western (Afghanistan) challenges carefully.',
    'Add Iran border trade-security mix briefly.',
    'List concept tools: fencing, terminals, customs, documentation.',
    'Discuss smuggling and coordination problems without operational detail.',
    'Conclude with regulated facilitation plus institutional reform.',
  ],
  questionVariants: [
    'Discuss the challenges of border management in Pakistan.',
    'Evaluate fencing as a tool of western border management.',
    'How can Pakistan reduce smuggling while promoting legal trade?',
    'Compare eastern and western border management issues.',
  ],
  citations: [
    {
      label: 'Definition',
      text: 'Border management controls and facilitates people and goods while protecting security and revenue.',
    },
    {
      label: 'Eastern theme',
      text: 'India border/LoC management uses strict regulation and fencing/surveillance concepts in public teaching.',
    },
    {
      label: 'Western theme',
      text: 'Afghanistan border notes stress porosity historically and fencing plus documented crossing today.',
    },
    {
      label: 'Policy balance',
      text: 'Make legal terminals efficient so informal routes lose incentive.',
    },
  ],
  flashcards: [
    {
      prompt: 'What two goals does border management combine?',
      answer: 'Control (security/revenue) and facilitation (legal trade/travel)',
    },
    {
      prompt: 'What is a standard eastern border teaching theme?',
      answer: 'Strict regulation with fencing/surveillance concepts',
    },
    {
      prompt: 'What western border problem recurs in exams?',
      answer: 'Historical porosity; need for fencing and documented crossing',
    },
    {
      prompt: 'Name three management tools at concept level.',
      answer: 'Fencing, border terminals, customs/immigration procedures',
    },
    {
      prompt: 'Why mention Iran border separately?',
      answer: 'Security plus legitimate border trade management',
    },
    {
      prompt: 'What economic crime theme appears often?',
      answer: 'Smuggling and informal trade incentives',
    },
    {
      prompt: 'What institutional weakness should you cite?',
      answer: 'Coordination gaps among border-related agencies',
    },
    {
      prompt: 'What facilitation principle scores?',
      answer: 'Make official points faster and cheaper than informal routes',
    },
    {
      prompt: 'Should answers give tactical breach methods?',
      answer: 'No; stay at public policy concept level',
    },
    {
      prompt: 'What social companion to hard measures helps?',
      answer: 'Livelihood and legal trade facilitation for border communities',
    },
  ],
  mistakes: [
    {
      trap: 'Writing only fencing without facilitation.',
      correct: 'Pair barriers with efficient legal terminals.',
    },
    {
      trap: 'Treating all borders as identical.',
      correct: 'Distinguish eastern, western, and Iran-facing challenges.',
    },
    {
      trap: 'Giving operational or evasion detail.',
      correct: 'Keep to syllabus policy concepts only.',
    },
    {
      trap: 'Ignoring customs and documentation.',
      correct: 'Procedures and identity systems are core tools.',
    },
    {
      trap: 'Blaming geography alone.',
      correct: 'Include incentives, institutions, and coordination.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Definition + eastern vs western contrast.' },
    { day: 'Day 2', task: 'Fencing and terminals as concepts.' },
    { day: 'Day 3', task: 'Smuggling and agency coordination paragraph.' },
    { day: 'Day 4', task: 'Flashcards.' },
    { day: 'Day 5', task: 'Iran border trade-security note.' },
    { day: 'Day 6', task: '10-minute challenges essay outline.' },
    { day: 'Day 7', task: 'Recite one-pager.' },
  ],
  sourcesLine:
    'Sources: standard Pakistan Affairs security and governance notes on border management, fencing, and trade facilitation. Stay at public policy level; avoid operational or evasion content.',
}
