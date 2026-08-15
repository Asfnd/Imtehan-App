import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (exam-safe bilateral framing):
 * - France: major EU political and economic power; trade, culture, education, and defence-industry themes
 * - Soft power: French language/culture institutes, student mobility themes in teaching notes
 * - Multilateral: EU setting; G7/European diplomacy context (cite as setting, not treaty text)
 * Avoid inventing exact aid totals, fake defence contracts as permanent facts, or frozen trade volumes
 */
export const PAKISTAN_FRANCE_RELATIONS_KIT: NoteKitData = {
  id: 'pakistan-france-relations',
  title: 'Pakistan-France Relations',
  subtitle:
    'EU partner themes: trade, culture, education, and carefully framed defence-industry links for CSS and PMS.',
  syllabusTags: [
    'Foreign policy',
    'Pakistan-France relations',
    'European Union',
    'Current affairs',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS / PMS',
      directive: 'Discuss',
      angle: 'Pakistan relations with France',
      frequency: 'medium',
    },
    {
      year: 'CSS pattern',
      directive: 'Evaluate',
      angle: 'Economic and cultural dimensions of Pakistan-France ties',
      frequency: 'medium',
    },
    {
      year: 'CSS Current Affairs',
      directive: 'Critically examine',
      angle: 'France as an EU gateway for Pakistan diplomacy and skills',
      frequency: 'medium',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'EU partner; culture and education cooperation themes',
      frequency: 'niche',
    },
  ],
  onePager: [
    'France is among Pakistan important European partners: a major EU political economy with trade, investment interest, and cultural-education cooperation history.',
    'Economic pillar: exports and market access themes, investment interest, and industrial or energy cooperation language. Cite themes, not frozen totals.',
    'Defence and dual-use industry themes appear in some bilateral notes. Keep exam wording careful: cooperation interest and capability themes, not invented contract lists.',
    'Soft power: French language and culture institutes, student mobility, and academic exchange support people-to-people narratives.',
    'Political setting: bilateral ties sit inside wider EU and European diplomacy. Treat France as a key European partner, not as the whole EU.',
    'Climate, urban transport, and development-cooperation themes recur in teaching outlines. Avoid inventing project IDs as permanent syllabus facts.',
    'Answer close: convert EU access, skills, culture, and selective industry cooperation into deliverable outcomes without overclaiming.',
  ],
  answerSteps: [
    'Open with France weight as a major EU political and economic partner.',
    'Cover trade and investment as the economic pillar (themes only).',
    'Add culture, language, and education or student mobility.',
    'Note defence-industry themes carefully without fake contract lists.',
    'Place ties in the EU multilateral setting.',
    'Conclude with delivery: market access, human capital, and institutional follow-through.',
  ],
  questionVariants: [
    'Discuss the significance of Pakistan-France relations.',
    'Evaluate the economic and cultural dimensions of ties with France.',
    'How does France fit into Pakistan engagement with the European Union?',
    'Critically examine people-to-people and education cooperation with France.',
  ],
  citations: [
    {
      label: 'Partner profile',
      text: 'France is taught as a major European Union power and a leading bilateral European partner for Pakistan.',
    },
    {
      label: 'Economic theme',
      text: 'Trade and investment interest form a core economic pillar (cite as themes, not permanent volumes).',
    },
    {
      label: 'Soft power',
      text: 'Language, culture institutes, and student mobility support soft-power and skills-transfer narratives.',
    },
    {
      label: 'Defence theme caution',
      text: 'Defence-industry cooperation appears as a bilateral theme in some notes; avoid inventing contract numbers as everlasting facts.',
    },
    {
      label: 'EU setting',
      text: 'Bilateral ties are usually framed inside wider EU and European diplomacy, with France as a key gateway partner.',
    },
  ],
  flashcards: [
    {
      prompt: 'Why is France high-yield in Pakistan foreign-policy notes?',
      answer: 'Major EU power with trade, culture, education, and selective industry cooperation themes',
    },
    {
      prompt: 'Name two economic pillars of the relationship.',
      answer: 'Trade and investment interest',
    },
    {
      prompt: 'Name two soft-power themes.',
      answer: 'French language/culture institutes and student mobility',
    },
    {
      prompt: 'How should defence-industry links be framed in exams?',
      answer: 'As cooperation themes, not invented permanent contract lists',
    },
    {
      prompt: 'How should France be placed multilaterally?',
      answer: 'Inside the wider EU and European diplomacy setting',
    },
    {
      prompt: 'Should aid or trade totals be memorised as permanent facts?',
      answer: 'No; volumes change. Use cooperation themes.',
    },
    {
      prompt: 'What closing line scores?',
      answer: 'Convert EU access and skills into trade and human-capital delivery',
    },
    {
      prompt: 'What trap weakens France answers?',
      answer: 'Treating France as if it were the entire European Union',
    },
    {
      prompt: 'Name one non-trade theme that often appears.',
      answer: 'Climate, urban transport, or development-cooperation language',
    },
  ],
  mistakes: [
    {
      trap: 'Inventing exact aid, trade, or defence-contract totals as everlasting facts.',
      correct: 'Use themes and direction. Cite dated sources only when you have them.',
    },
    {
      trap: 'Writing only cultural goodwill with no trade or EU setting.',
      correct: 'Exams expect economic, soft-power, and EU-setting analysis.',
    },
    {
      trap: 'Equating France with the whole EU.',
      correct: 'France is a major gateway partner inside a wider EU relationship.',
    },
    {
      trap: 'Ignoring student mobility and language institutes.',
      correct: 'People-to-people links are a standard soft-power paragraph.',
    },
    {
      trap: 'Copying Gulf remittance templates onto France.',
      correct: 'France answers lean more on EU trade, culture, education, and selective industry themes.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Map France as EU gateway vs bilateral partner.' },
    { day: 'Day 2', task: 'Trade and investment themes only.' },
    { day: 'Day 3', task: 'Culture, language, education outline.' },
    { day: 'Day 4', task: 'Flashcards.' },
    { day: 'Day 5', task: 'Careful defence-industry paragraph (no fake lists).' },
    { day: 'Day 6', task: '10-minute critically examine outline.' },
    { day: 'Day 7', task: 'Recite one-pager.' },
  ],
  sourcesLine:
    'Sources: standard Pakistan Affairs and current affairs notes on Europe and France, EU partnership themes, and development or culture cooperation primers in FPSC-style teaching. Avoid invented aid or contract totals.',
}
