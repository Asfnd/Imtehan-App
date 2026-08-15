import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (exam-safe bilateral framing):
 * - Saudi Arabia: major Muslim-world partner; Hajj/Umrah religious link; large Pakistani diaspora/remittances theme
 * - Economic: oil imports, investment interest, deposits/support themes in crisis periods (describe carefully without fake exact figures)
 * - Security/defence: training and defence cooperation themes appear in standard notes
 * - Diplomatic: OIC centrality of Saudi Arabia; Yemen/Middle East conflicts require careful neutrality language in Pakistani policy teaching
 * Avoid inventing treaty texts or exact aid totals as permanent facts
 */
export const PAKISTAN_SAUDI_RELATIONS_KIT: NoteKitData = {
  id: 'pakistan-saudi-relations',
  title: 'Pakistan-Saudi Arabia Relations',
  subtitle:
    'Religious ties, remittances and energy links, investment diplomacy, and Muslim-world partnership for CSS and PMS.',
  syllabusTags: [
    'Foreign policy',
    'Pakistan-Saudi relations',
    'Muslim world',
    'Current affairs',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS / PMS',
      directive: 'Discuss',
      angle: 'Pakistan relations with Saudi Arabia',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Evaluate',
      angle: 'Economic and religious dimensions of Pakistan-Saudi ties',
      frequency: 'high',
    },
    {
      year: 'CSS Current Affairs',
      directive: 'Critically examine',
      angle: 'Saudi investment and financial support themes for Pakistan',
      frequency: 'medium',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'Hajj; remittances; OIC; oil partner themes',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Saudi Arabia is among Pakistan most important partners in the Muslim world. Ties combine religion, economy, labour migration, and diplomacy.',
    'Religious dimension: Saudi Arabia hosts the Two Holy Mosques; Hajj and Umrah create a unique people-to-people and state facilitation link.',
    'Labour and remittances: a large Pakistani workforce in the Kingdom supports household incomes and foreign exchange in standard economic teaching.',
    'Energy and finance: Saudi Arabia is a key oil supplier theme; periodic deposits, deferred oil, or investment pledges appear in crisis-management narratives (cite as themes, not frozen totals).',
    'Defence and training cooperation historically features in bilateral notes; keep to cooperation themes without inventing operational details.',
    'Multilateral: Saudi Arabia weight in the OIC shapes Pakistan Muslim-world diplomacy settings.',
    'Policy caution: Middle East conflicts require careful Pakistani balancing so that bilateral Saudi ties remain strong without unnecessary regional entanglement.',
    'Answer close: deepen investment and skills partnerships, protect worker welfare, keep religious facilitation efficient, and pursue economic diversification beyond crisis-time support.',
  ],
  answerSteps: [
    'Open with strategic importance in the Muslim world.',
    'Explain religious (Hajj/Umrah) and people-to-people links.',
    'Cover remittances/labour and energy/finance pillars.',
    'Add defence cooperation at theme level only.',
    'Note OIC diplomacy and regional balancing caution.',
    'Conclude with investment, worker welfare, and diversification.',
  ],
  questionVariants: [
    'Discuss the significance of Pakistan-Saudi Arabia relations.',
    'Evaluate the economic and religious dimensions of ties with Saudi Arabia.',
    'Critically examine Saudi financial and investment engagement with Pakistan.',
    'How do remittances and labour migration shape Pakistan-Saudi relations?',
  ],
  citations: [
    {
      label: 'Religious link',
      text: 'Hajj and Umrah facilitation and the Two Holy Mosques give unique bilateral soft ties.',
    },
    {
      label: 'Remittances',
      text: 'Pakistani workforce in Saudi Arabia is a major remittance and labour theme in exams.',
    },
    {
      label: 'Energy/finance',
      text: 'Oil supply and periodic financial support/investment themes recur in current affairs teaching.',
    },
    {
      label: 'OIC',
      text: 'Saudi Arabia central role in OIC settings shapes Muslim-world diplomacy.',
    },
  ],
  flashcards: [
    {
      prompt: 'Why are Saudi ties uniquely important for Pakistan?',
      answer: 'Religion, remittances, energy/finance, and Muslim-world diplomacy combined',
    },
    {
      prompt: 'What religious institutions define the soft link?',
      answer: 'Two Holy Mosques; Hajj and Umrah facilitation',
    },
    {
      prompt: 'What economic people-to-people pillar matters most?',
      answer: 'Pakistani labour migration and remittances',
    },
    {
      prompt: 'Name an energy-related theme.',
      answer: 'Saudi Arabia as a key oil supplier partner in teaching',
    },
    {
      prompt: 'How should crisis support be cited?',
      answer: 'As deposits/deferred oil/investment themes, not fake exact totals',
    },
    {
      prompt: 'What multilateral body links Saudi weight to Pakistan diplomacy?',
      answer: 'OIC',
    },
    {
      prompt: 'What regional caution do exams reward?',
      answer: 'Balance Middle East conflicts; avoid unnecessary entanglement',
    },
    {
      prompt: 'What worker-focused closing point scores?',
      answer: 'Protect overseas worker welfare and skills partnerships',
    },
    {
      prompt: 'Should defence details be invented?',
      answer: 'No; keep to cooperation themes only',
    },
    {
      prompt: 'What long-term economic goal should you state?',
      answer: 'Investment-led ties beyond crisis-time support',
    },
  ],
  mistakes: [
    {
      trap: 'Reducing the relationship to only oil money.',
      correct: 'Include religion, remittances, diplomacy, and investment.',
    },
    {
      trap: 'Inventing exact aid or deposit figures as permanent facts.',
      correct: 'Describe support themes without fake precision.',
    },
    {
      trap: 'Ignoring Pakistani workers.',
      correct: 'Labour and remittances are a core pillar.',
    },
    {
      trap: 'Writing partisan Middle East war commentary.',
      correct: 'Keep Pakistani national-interest balancing language.',
    },
    {
      trap: 'Forgetting OIC diplomacy.',
      correct: 'Saudi OIC weight is a standard multilateral point.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Four pillars: religion, labour, energy/finance, diplomacy.' },
    { day: 'Day 2', task: 'Hajj/Umrah and remittances paragraph.' },
    { day: 'Day 3', task: 'Investment and crisis-support themes carefully.' },
    { day: 'Day 4', task: 'Flashcards.' },
    { day: 'Day 5', task: 'OIC + regional balancing sentence.' },
    { day: 'Day 6', task: '10-minute significance essay outline.' },
    { day: 'Day 7', task: 'Recite one-pager.' },
  ],
  sourcesLine:
    'Sources: standard Pakistan Muslim-world and Gulf relations notes; Hajj/Umrah and remittance teaching; OIC diplomacy primers. Avoid invented aid totals and sensational regional polemics.',
}
