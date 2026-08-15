import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (exam-safe bilateral framing):
 * - UAE: major Gulf partner; large Pakistani diaspora and remittances theme
 * - Economic: trade, investment, energy, logistics and ports interest
 * - Diplomatic: GCC setting; crisis-time financial or oil support themes appear in teaching (cite carefully)
 * - Soft power: labour mobility, education, tourism and business links
 * Avoid inventing exact deposit amounts, Emirati aid totals, or fake treaty texts as permanent facts
 */
export const PAKISTAN_UAE_RELATIONS_KIT: NoteKitData = {
  id: 'pakistan-uae-relations',
  title: 'Pakistan-UAE Relations',
  subtitle:
    'Remittances and diaspora, Gulf investment diplomacy, energy links, and GCC partnership for CSS and PMS.',
  syllabusTags: [
    'Foreign policy',
    'Pakistan-UAE relations',
    'Muslim world',
    'Gulf',
    'Current affairs',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS / PMS',
      directive: 'Discuss',
      angle: 'Pakistan relations with the United Arab Emirates',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Evaluate',
      angle: 'Economic and labour dimensions of Pakistan-UAE ties',
      frequency: 'high',
    },
    {
      year: 'CSS Current Affairs',
      directive: 'Critically examine',
      angle: 'UAE investment and financial engagement with Pakistan',
      frequency: 'medium',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'Diaspora; remittances; Gulf partner; GCC theme',
      frequency: 'medium',
    },
  ],
  onePager: [
    'The UAE is a core Gulf partner for Pakistan: labour migration, remittances, trade, investment, and energy diplomacy.',
    'Diaspora and remittances: a large Pakistani workforce in the Emirates supports households and foreign exchange in standard economic teaching.',
    'Investment and business: UAE entities appear in Pakistan investment and real-estate or infrastructure interest narratives. Cite as themes; do not freeze deal sizes.',
    'Energy and finance: oil and periodic financial support or deposits feature in crisis-management notes. Treat as episodic themes, not permanent entitlements.',
    'Logistics and connectivity: UAE ports and aviation hubs shape regional trade geography relevant to Pakistan Gulf commerce.',
    'Diplomatic setting: UAE weight inside the GCC and wider Muslim world frames bilateral diplomacy.',
    'Policy caution: worker welfare, visa or labour-market rules, and diversification beyond remittances should appear in critical answers.',
    'Answer close: protect workers, deepen productive investment, expand skills and trade, and keep Gulf diplomacy stable.',
  ],
  answerSteps: [
    'Open with UAE importance as a Gulf economic and labour partner.',
    'Explain diaspora and remittances as the people-centred pillar.',
    'Cover trade, investment, energy, and logistics themes.',
    'Place UAE in GCC and Muslim-world diplomacy.',
    'Add worker-welfare and diversification critique.',
    'Conclude with investment quality and stable Gulf engagement.',
  ],
  questionVariants: [
    'Discuss the significance of Pakistan-UAE relations.',
    'Evaluate the labour and remittance dimensions of ties with the UAE.',
    'Critically examine UAE investment engagement with Pakistan.',
    'How do GCC dynamics shape Pakistan-UAE diplomacy?',
  ],
  citations: [
    {
      label: 'Labour and remittances',
      text: 'Large Pakistani workforce in the UAE is a major remittance and diaspora theme in exams.',
    },
    {
      label: 'Investment theme',
      text: 'UAE investment interest in Pakistan recurs in current affairs teaching; cite as theme, not frozen deal totals.',
    },
    {
      label: 'Energy and finance',
      text: 'Oil supply and episodic financial support themes appear in crisis-management narratives.',
    },
    {
      label: 'GCC setting',
      text: 'UAE role inside the GCC frames bilateral diplomacy for Pakistan Gulf policy.',
    },
    {
      label: 'Worker welfare',
      text: 'Critical answers should include labour protections and market-access risks for Pakistani workers.',
    },
  ],
  flashcards: [
    {
      prompt: 'What is the people-centred pillar of Pakistan-UAE ties?',
      answer: 'Large diaspora and remittances from Pakistani workers',
    },
    {
      prompt: 'Name three economic pillars beyond remittances.',
      answer: 'Trade, investment, and energy or logistics links',
    },
    {
      prompt: 'Which regional grouping frames UAE Gulf diplomacy?',
      answer: 'GCC',
    },
    {
      prompt: 'Why avoid memorising exact UAE deposit figures?',
      answer: 'They are episodic and change; exams reward themes',
    },
    {
      prompt: 'What logistics angle is exam-useful?',
      answer: 'UAE ports and aviation hubs in regional trade geography',
    },
    {
      prompt: 'What critical line should appear on labour?',
      answer: 'Worker welfare and vulnerability to visa or labour-market rule changes',
    },
    {
      prompt: 'How should crisis-time financial support be phrased?',
      answer: 'As episodic engagement, not a permanent entitlement',
    },
    {
      prompt: 'What closing agenda scores?',
      answer: 'Protect workers, deepen productive investment, expand skills and trade',
    },
    {
      prompt: 'Is UAE mainly a defence-industry partner like Turkey in exam framing?',
      answer: 'No; UAE answers centre remittances, investment, energy, and Gulf diplomacy',
    },
    {
      prompt: 'Name one soft-power or people link besides remittances.',
      answer: 'Business, education, or tourism and travel links',
    },
  ],
  mistakes: [
    {
      trap: 'Inventing exact aid, deposit, or investment totals as permanent facts.',
      correct: 'Use themes. Flag figures only if dated and sourced.',
    },
    {
      trap: 'Writing only remittances with no investment or diplomacy pillar.',
      correct: 'Balance labour, investment, energy, and GCC diplomacy.',
    },
    {
      trap: 'Ignoring worker welfare in a critically examine answer.',
      correct: 'Labour protection is a required critical angle.',
    },
    {
      trap: 'Confusing UAE with Saudi religious Hajj-centred answers.',
      correct: 'UAE is Gulf economic/labour/investment weighted; Hajj is Saudi-centred.',
    },
    {
      trap: 'Claiming all announced investment MOUs are completed projects.',
      correct: 'Distinguish announcements from implemented investment.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Diaspora and remittances pillar.' },
    { day: 'Day 2', task: 'Trade, investment, energy outline.' },
    { day: 'Day 3', task: 'GCC diplomacy paragraph.' },
    { day: 'Day 4', task: 'Flashcards.' },
    { day: 'Day 5', task: 'Worker welfare critique.' },
    { day: 'Day 6', task: '10-minute evaluate essay outline.' },
    { day: 'Day 7', task: 'Recite one-pager.' },
  ],
  sourcesLine:
    'Sources: standard Pakistan Affairs and current affairs notes on Gulf partners, remittance teaching, and GCC primers. Avoid WhatsApp figures for deposits and unsourced MOU completion claims.',
}
