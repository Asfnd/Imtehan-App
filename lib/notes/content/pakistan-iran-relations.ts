import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (exam-safe bilateral framing):
 * - Neighbours with long border; Balochistan-Sistan connectivity and security interdependence themes
 * - Economic themes: border trade, energy ideas (gas pipeline proposals in exam literature), cultural/religious ties
 * - Security themes: cross-border militancy concerns and need for border management cooperation
 * - Multilateral overlap: OIC; occasional regional forum themes; careful Iran nuclear/sanctions externalities in current affairs
 * Avoid sensational sectarian framing; keep state-to-state interests balanced
 */
export const PAKISTAN_IRAN_RELATIONS_KIT: NoteKitData = {
  id: 'pakistan-iran-relations',
  title: 'Pakistan-Iran Relations',
  subtitle:
    'Neighbourhood diplomacy, border security, energy and trade themes, and balanced exam framing for CSS and PMS.',
  syllabusTags: [
    'Foreign policy',
    'Pakistan-Iran relations',
    'Current affairs',
    'Pakistan Affairs',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS / PMS',
      directive: 'Discuss',
      angle: 'Pakistan-Iran relations: prospects and challenges',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Evaluate',
      angle: 'Border security and economic cooperation with Iran',
      frequency: 'medium',
    },
    {
      year: 'CSS Current Affairs',
      directive: 'Critically examine',
      angle: 'Energy cooperation ideas with Iran',
      frequency: 'medium',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'Neighbour; western border; OIC membership theme',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Pakistan and Iran are immediate neighbours with a long shared border. Geography forces cooperation on security, trade, and people movement.',
    'Historical-cultural links and Muslim-world diplomacy (including OIC settings) provide a cooperative vocabulary in exam answers.',
    'Economic agenda: border markets/trade facilitation, transit potential, and recurring energy cooperation proposals (gas pipeline ideas appear in standard current-affairs teaching).',
    'Security agenda: both sides face cross-border militancy and smuggling challenges; answers should stress joint border management and intelligence cooperation themes.',
    'External constraints: Iran sanctions environment and wider Middle East alignments can limit project banking and trade smoothness; note as constraint, not as conspiracy.',
    'Pakistan interest: stable western border, energy options, and diversified neighbourhood ties without choosing hostile camps.',
    'Iran interest: secure eastern border, trade outlets, and regional engagement. Convergence exists when borders are calm and trade rules work.',
    'Answer close: institutionalise border mechanisms, expand lawful trade, pursue energy projects only with realistic financing and diplomacy, and keep sectarian narratives out of state policy framing.',
  ],
  answerSteps: [
    'Open with neighbour geography and interdependence.',
    'Cover trade/energy cooperation themes carefully.',
    'Add border security cooperation needs.',
    'Note external constraints (sanctions/regional alignments) briefly.',
    'State convergent interests of both sides.',
    'Conclude with practical cooperation agenda.',
  ],
  questionVariants: [
    'Discuss prospects and challenges in Pakistan-Iran relations.',
    'Evaluate the importance of border management in Pakistan-Iran ties.',
    'Critically examine energy and trade cooperation between Pakistan and Iran.',
    'How can Pakistan balance relations with Iran and other Gulf partners?',
  ],
  citations: [
    {
      label: 'Geography',
      text: 'Long shared border makes security and trade interdependence unavoidable.',
    },
    {
      label: 'Economy',
      text: 'Border trade and energy cooperation proposals are recurring exam themes.',
    },
    {
      label: 'Security',
      text: 'Cross-border militancy and smuggling require joint border management themes.',
    },
    {
      label: 'Constraints',
      text: 'Sanctions environment and regional alignments can limit project delivery.',
    },
  ],
  flashcards: [
    {
      prompt: 'Why are Pakistan-Iran ties structurally important?',
      answer: 'Immediate neighbours with a long shared border',
    },
    {
      prompt: 'Name two cooperation pillars in exam answers.',
      answer: 'Border security and trade/energy facilitation',
    },
    {
      prompt: 'What energy theme often appears in current affairs notes?',
      answer: 'Gas pipeline / energy import cooperation proposals',
    },
    {
      prompt: 'What security problem do both sides share in teaching?',
      answer: 'Cross-border militancy and smuggling challenges',
    },
    {
      prompt: 'Name one external constraint on projects.',
      answer: 'Sanctions-related financing and trade frictions',
    },
    {
      prompt: 'What multilateral setting often links both?',
      answer: 'OIC / Muslim-world diplomacy themes',
    },
    {
      prompt: 'What Pakistan interest should you state?',
      answer: 'Stable western border and diversified energy/neighbourhood options',
    },
    {
      prompt: 'What tone must you avoid?',
      answer: 'Sensational sectarian framing of bilateral state relations',
    },
    {
      prompt: 'What closes a strong essay?',
      answer: 'Institutional border mechanisms plus realistic trade/energy steps',
    },
    {
      prompt: 'Should you invent secret treaty clauses?',
      answer: 'No; keep to public cooperation themes and constraints',
    },
  ],
  mistakes: [
    {
      trap: 'Writing only religion/culture without interests.',
      correct: 'Lead with border, security, trade, and energy interests.',
    },
    {
      trap: 'Ignoring sanctions/financing constraints.',
      correct: 'Note external limits on project delivery.',
    },
    {
      trap: 'Using sectarian polemics.',
      correct: 'Keep respectful state-to-state analysis.',
    },
    {
      trap: 'Claiming automatic deep economic integration.',
      correct: 'Potential exists; delivery depends on security and banking.',
    },
    {
      trap: 'Forgetting balance with Gulf partners.',
      correct: 'Diversified diplomacy is a mature closing point.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Neighbour geography + two pillars memorise.' },
    { day: 'Day 2', task: 'Trade/energy paragraph.' },
    { day: 'Day 3', task: 'Border security paragraph.' },
    { day: 'Day 4', task: 'Flashcards.' },
    { day: 'Day 5', task: 'Constraints and balance-with-Gulf sentence.' },
    { day: 'Day 6', task: '10-minute prospects-and-challenges outline.' },
    { day: 'Day 7', task: 'Recite one-pager.' },
  ],
  sourcesLine:
    'Sources: standard Pakistan foreign-policy neighbourhood notes on Iran; border trade and energy-proposal teaching; OIC framing. Keep non-sectarian and avoid invented secret deals.',
}
