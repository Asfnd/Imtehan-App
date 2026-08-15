import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (exam-safe bilateral framing):
 * - Turkey: major Muslim-world and Eurasian partner; defence industry and training cooperation themes
 * - High-level visits and strategic partnership language recur in standard foreign-policy notes
 * - Economic: trade interest, construction, energy and investment themes (cite as themes, not frozen totals)
 * - Soft power: cultural affinity, education and people-to-people links
 * - Multilateral overlap: OIC and other Muslim-world forums
 * Avoid inventing treaty texts, exact trade volumes, or secret defence clauses as permanent facts
 */
export const PAKISTAN_TURKEY_RELATIONS_KIT: NoteKitData = {
  id: 'pakistan-turkey-relations',
  title: 'Pakistan-Turkey Relations',
  subtitle:
    'Strategic partnership themes, defence-industry links, trade diplomacy, and Muslim-world affinity for CSS and PMS.',
  syllabusTags: [
    'Foreign policy',
    'Pakistan-Turkey relations',
    'Muslim world',
    'Current affairs',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS / PMS',
      directive: 'Discuss',
      angle: 'Pakistan relations with Turkey',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Evaluate',
      angle: 'Defence and economic dimensions of Pakistan-Turkey ties',
      frequency: 'high',
    },
    {
      year: 'CSS Current Affairs',
      directive: 'Critically examine',
      angle: 'Strategic partnership language versus delivery gaps',
      frequency: 'medium',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'Muslim-world partner; defence cooperation themes; OIC overlap',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Turkey is among Pakistan most valued partners outside the Gulf: Muslim-world affinity plus Eurasian and defence-industry interest.',
    'Strategic partnership framing appears repeatedly in bilateral communiques. Treat it as political language, then test delivery in trade and industry.',
    'Defence and training cooperation, plus interest in defence industry collaboration, are high-yield exam pillars. Keep to themes; do not invent platform lists as permanent facts.',
    'Economic pillar: trade, construction, energy, and investment interest. Volumes and projects change; write as cooperation agenda, not frozen statistics.',
    'Soft power: cultural affinity, education exchanges, and diaspora or tourism links support people-to-people diplomacy.',
    'Multilateral: shared OIC and Muslim-world forums give diplomatic bandwidth beyond the bilateral track.',
    'Regional caution: Turkey active Middle East and Eurasia diplomacy requires Pakistani answers that stay balanced and interest-based.',
    'Answer close: convert affinity into trade, skills, industry, and reliable defence-industrial cooperation without overclaiming.',
  ],
  answerSteps: [
    'Open with Turkey strategic importance in the Muslim world and Eurasia.',
    'Explain partnership framing and high-level political warmth as context.',
    'Cover defence/training and defence-industry cooperation at theme level.',
    'Add trade, investment, and construction/energy pillars carefully.',
    'Note soft power and OIC multilateral overlap.',
    'Conclude with delivery: trade volume, industry, and institutional follow-through.',
  ],
  questionVariants: [
    'Discuss the significance of Pakistan-Turkey relations.',
    'Evaluate the defence and economic dimensions of ties with Turkey.',
    'Critically examine whether strategic partnership language matches outcomes.',
    'How do Muslim-world affinity and soft power shape Pakistan-Turkey relations?',
  ],
  citations: [
    {
      label: 'Partnership framing',
      text: 'Bilateral notes repeatedly use strategic partnership language for Pakistan-Turkey ties; treat as political framing, then assess delivery.',
    },
    {
      label: 'Defence theme',
      text: 'Defence cooperation and defence-industry interest are standard high-yield pillars in exam teaching.',
    },
    {
      label: 'Economic theme',
      text: 'Trade, construction, energy, and investment interest form the economic pillar (cite as themes, not frozen totals).',
    },
    {
      label: 'Soft power',
      text: 'Cultural affinity and education or people-to-people links support the relationship beyond hard security.',
    },
    {
      label: 'Multilateral',
      text: 'Shared Muslim-world forums, especially OIC settings, provide diplomatic overlap.',
    },
  ],
  flashcards: [
    {
      prompt: 'What broad partnership label often appears in Pakistan-Turkey notes?',
      answer: 'Strategic partnership framing (political language to assess against delivery)',
    },
    {
      prompt: 'Name two hard-security pillars of the relationship.',
      answer: 'Defence/training cooperation and defence-industry collaboration interest',
    },
    {
      prompt: 'Name three economic cooperation themes.',
      answer: 'Trade, construction, and energy or investment interest',
    },
    {
      prompt: 'What soft-power elements should an answer include?',
      answer: 'Cultural affinity, education exchanges, people-to-people links',
    },
    {
      prompt: 'Which multilateral Muslim-world forum often overlaps?',
      answer: 'OIC',
    },
    {
      prompt: 'Why should trade volumes not be memorised as permanent facts?',
      answer: 'They change; exams reward themes and direction, not invented precision',
    },
    {
      prompt: 'What regional caution belongs in a balanced answer?',
      answer: 'Keep Pakistani interests clear amid Turkey wider Middle East and Eurasia diplomacy',
    },
    {
      prompt: 'What closing line scores?',
      answer: 'Convert affinity into trade, industry, skills, and reliable defence-industrial cooperation',
    },
    {
      prompt: 'Should an answer invent platform lists as permanent facts?',
      answer: 'No; keep defence cooperation at theme level unless citing a dated source',
    },
    {
      prompt: 'How does Turkey differ from a Gulf remittance partner in exam framing?',
      answer: 'More Eurasia and defence-industry weight; less classic labour-remittance centrepiece',
    },
  ],
  mistakes: [
    {
      trap: 'Treating strategic partnership wording as proof that all projects are complete.',
      correct: 'Partnership language is framing. Assess trade, industry, and institutional delivery.',
    },
    {
      trap: 'Inventing exact defence contract totals or secret clauses.',
      correct: 'Use cooperation themes. Avoid fake precision.',
    },
    {
      trap: 'Writing only cultural brotherhood with no economic or defence pillar.',
      correct: 'Affinity helps, but exams expect defence-industry and trade analysis.',
    },
    {
      trap: 'Confusing Turkey with Saudi Arabia remittance-centred answers.',
      correct: 'Turkey answers lean more on Eurasia, defence industry, and trade diplomacy.',
    },
    {
      trap: 'Ignoring OIC or Muslim-world multilateral overlap.',
      correct: 'Add one clean multilateral sentence for breadth.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Map partnership framing vs delivery test.' },
    { day: 'Day 2', task: 'Defence and defence-industry themes only.' },
    { day: 'Day 3', task: 'Trade, investment, construction outline.' },
    { day: 'Day 4', task: 'Flashcards.' },
    { day: 'Day 5', task: 'Soft power + OIC paragraph.' },
    { day: 'Day 6', task: '10-minute critically examine outline.' },
    { day: 'Day 7', task: 'Recite one-pager.' },
  ],
  sourcesLine:
    'Sources: standard Pakistan Affairs and current affairs notes on Turkey, OIC primers, and bilateral partnership themes in FPSC-style foreign policy teaching. Avoid invented trade totals and unsourced defence claims.',
}
