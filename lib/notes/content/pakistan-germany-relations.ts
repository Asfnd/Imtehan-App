import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (exam-safe bilateral framing):
 * - Germany: major EU economy; trade, development cooperation, and technical education themes
 * - Large Pakistani diaspora and student mobility appear in standard foreign-policy notes
 * - Soft power: culture, vocational training, renewable energy and climate cooperation themes
 * - Multilateral: EU setting and G7/European diplomacy context (cite as setting, not as treaty text)
 * Avoid inventing exact aid totals, fake treaty clauses, or permanent trade volumes
 */
export const PAKISTAN_GERMANY_RELATIONS_KIT: NoteKitData = {
  id: 'pakistan-germany-relations',
  title: 'Pakistan-Germany Relations',
  subtitle:
    'EU trade partner, development cooperation, diaspora and skills themes for CSS and PMS foreign policy.',
  syllabusTags: [
    'Foreign policy',
    'Pakistan-Germany relations',
    'European Union',
    'Current affairs',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS / PMS',
      directive: 'Discuss',
      angle: 'Pakistan relations with Germany',
      frequency: 'medium',
    },
    {
      year: 'CSS pattern',
      directive: 'Evaluate',
      angle: 'Economic and development dimensions of Pakistan-Germany ties',
      frequency: 'medium',
    },
    {
      year: 'CSS Current Affairs',
      directive: 'Critically examine',
      angle: 'Germany as an EU gateway for Pakistan trade and skills',
      frequency: 'medium',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'EU partner; development cooperation; diaspora themes',
      frequency: 'low',
    },
  ],
  onePager: [
    'Germany is among Pakistan most important European partners: a large EU economy with trade, investment interest, and development-cooperation history.',
    'Economic pillar: exports (textiles and other goods themes), investment interest, and industrial or SME cooperation language. Cite themes, not frozen totals.',
    'Development and technical cooperation: vocational training, education, renewable energy, and climate or governance projects recur in teaching notes.',
    'People-to-people: Pakistani diaspora and student mobility support soft power and remittance or skills transfer narratives.',
    'Political setting: bilateral ties sit inside wider EU and European diplomacy. Treat Germany as a gateway, not as the whole EU.',
    'Security and migration diplomacy appear in European agendas; keep answers interest-based and avoid inventing crisis lists as permanent facts.',
    'Answer close: convert EU access, skills, and green-tech cooperation into deliverable trade and human-capital outcomes without overclaiming.',
  ],
  answerSteps: [
    'Open with Germany weight as a major EU economy and bilateral partner.',
    'Cover trade and investment as the economic pillar (themes only).',
    'Add development cooperation: training, education, energy/climate.',
    'Note diaspora and student mobility as soft power.',
    'Place ties in the EU multilateral setting.',
    'Conclude with delivery: market access, skills, and institutional follow-through.',
  ],
  questionVariants: [
    'Discuss the significance of Pakistan-Germany relations.',
    'Evaluate the economic and development dimensions of ties with Germany.',
    'How does Germany fit into Pakistan engagement with the European Union?',
    'Critically examine people-to-people and skills cooperation with Germany.',
  ],
  citations: [
    {
      label: 'Partner profile',
      text: 'Germany is taught as a major European Union economy and a leading bilateral European partner for Pakistan.',
    },
    {
      label: 'Economic theme',
      text: 'Trade and investment interest form the core economic pillar (cite as themes, not permanent volumes).',
    },
    {
      label: 'Development theme',
      text: 'Development and technical cooperation themes include vocational training, education, and energy or climate projects.',
    },
    {
      label: 'People-to-people',
      text: 'Diaspora and student mobility support soft-power and skills-transfer narratives.',
    },
    {
      label: 'EU setting',
      text: 'Bilateral ties are usually framed inside wider EU and European diplomacy, with Germany as a key gateway.',
    },
  ],
  flashcards: [
    {
      prompt: 'Why is Germany high-yield in Pakistan foreign-policy notes?',
      answer: 'Major EU economy with trade, development, and skills cooperation themes',
    },
    {
      prompt: 'Name two economic pillars of the relationship.',
      answer: 'Trade and investment interest',
    },
    {
      prompt: 'Name three development-cooperation themes.',
      answer: 'Vocational training, education, and renewable energy or climate projects',
    },
    {
      prompt: 'What people-to-people factors should an answer include?',
      answer: 'Diaspora links and student mobility',
    },
    {
      prompt: 'How should Germany be placed multilaterally?',
      answer: 'Inside the wider EU and European diplomacy setting',
    },
    {
      prompt: 'Should aid totals be memorised as permanent facts?',
      answer: 'No; volumes change. Use cooperation themes.',
    },
    {
      prompt: 'What closing line scores?',
      answer: 'Convert EU access and skills into trade and human-capital delivery',
    },
    {
      prompt: 'What trap weakens Germany answers?',
      answer: 'Treating Germany as if it were the entire European Union',
    },
    {
      prompt: 'Name one soft-power theme beyond remittances.',
      answer: 'Technical education and vocational training cooperation',
    },
    {
      prompt: 'What European agenda theme may appear carefully?',
      answer: 'Migration and security diplomacy (keep interest-based, avoid invented crisis lists)',
    },
  ],
  mistakes: [
    {
      trap: 'Inventing exact aid or trade totals as everlasting facts.',
      correct: 'Use themes and direction. Cite dated sources only when you have them.',
    },
    {
      trap: 'Writing only cultural goodwill with no trade or skills pillar.',
      correct: 'Exams expect economic, development, and EU-setting analysis.',
    },
    {
      trap: 'Equating Germany with the whole EU.',
      correct: 'Germany is a major gateway partner inside a wider EU relationship.',
    },
    {
      trap: 'Ignoring diaspora and student mobility.',
      correct: 'People-to-people links are a standard soft-power paragraph.',
    },
    {
      trap: 'Copying Gulf remittance templates onto Germany.',
      correct: 'Germany answers lean more on EU trade, skills, and development cooperation.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Map Germany as EU gateway vs bilateral partner.' },
    { day: 'Day 2', task: 'Trade and investment themes only.' },
    { day: 'Day 3', task: 'Development, training, climate outline.' },
    { day: 'Day 4', task: 'Flashcards.' },
    { day: 'Day 5', task: 'Diaspora and student-mobility paragraph.' },
    { day: 'Day 6', task: '10-minute critically examine outline.' },
    { day: 'Day 7', task: 'Recite one-pager.' },
  ],
  sourcesLine:
    'Sources: standard Pakistan Affairs and current affairs notes on Europe and Germany, EU partnership themes, and development-cooperation primers in FPSC-style teaching. Avoid invented aid totals.',
}
