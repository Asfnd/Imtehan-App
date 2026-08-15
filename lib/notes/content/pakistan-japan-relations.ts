import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (exam-safe bilateral framing):
 * - Japan: major East Asian economy; ODA/development cooperation, infrastructure, and technology themes
 * - People-to-people: training, scholarships, and technical cooperation recur in teaching notes
 * - Multilateral: Asia connectivity and quality-infrastructure diplomacy language (cite themes)
 * Avoid inventing exact yen-loan totals, fake project completion lists, or permanent FDI ranks
 */
export const PAKISTAN_JAPAN_RELATIONS_KIT: NoteKitData = {
  id: 'pakistan-japan-relations',
  title: 'Pakistan-Japan Relations',
  subtitle:
    'ODA, infrastructure, technology, and skills cooperation themes for CSS and PMS foreign policy.',
  syllabusTags: [
    'Foreign policy',
    'Pakistan-Japan relations',
    'East Asia',
    'Development cooperation',
    'Current affairs',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS / PMS',
      directive: 'Discuss',
      angle: 'Pakistan relations with Japan',
      frequency: 'medium',
    },
    {
      year: 'CSS pattern',
      directive: 'Evaluate',
      angle: 'Japanese development cooperation and infrastructure themes',
      frequency: 'medium',
    },
    {
      year: 'CSS Current Affairs',
      directive: 'Critically examine',
      angle: 'Technology and human-resource cooperation with Japan',
      frequency: 'medium',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'Japan as major Asian development partner theme',
      frequency: 'niche',
    },
  ],
  onePager: [
    'Japan is a high-yield East Asian partner for Pakistan: advanced economy, development cooperation tradition, and technology or skills interest.',
    'Development pillar: official development assistance (ODA) style cooperation, soft loans, and grant themes appear in exam histories. Cite as instrument types, not frozen yen totals.',
    'Infrastructure and transport cooperation language is common in teaching notes. Avoid inventing a permanent project catalogue for MCQs.',
    'Human capital: technical training, scholarships, and industrial skills transfer support soft-power and productivity narratives.',
    'Economic pillar: trade, investment interest, and quality-manufacturing or SME themes. Volumes change; use direction, not invented ranks.',
    'Strategic setting: ties sit in Asia connectivity and diversified foreign-policy balancing, without turning the answer into bloc slogans.',
    'Answer close: convert Japanese capital, technology, and training into deliverable infrastructure and skills outcomes with institutional follow-through.',
  ],
  answerSteps: [
    'Open with Japan as a major East Asian economic and development partner.',
    'Explain ODA / development-cooperation instruments as themes.',
    'Add infrastructure and technology cooperation language carefully.',
    'Cover training, scholarships, and skills transfer.',
    'Note trade and investment interest without fake totals.',
    'Conclude with delivery: quality projects plus human-capital upgrading.',
  ],
  questionVariants: [
    'Discuss the significance of Pakistan-Japan relations.',
    'Evaluate Japanese development cooperation with Pakistan.',
    'How can technology and skills cooperation with Japan help Pakistan economy?',
    'Critically examine infrastructure partnership themes with Japan.',
  ],
  citations: [
    {
      label: 'Partner profile',
      text: 'Japan is taught as a major East Asian economy and a long-standing development-cooperation partner for Pakistan.',
    },
    {
      label: 'ODA theme',
      text: 'Official development assistance style cooperation (soft loans and grants as instrument types) is a standard bilateral pillar.',
    },
    {
      label: 'Human capital',
      text: 'Technical training and scholarship themes support skills-transfer narratives.',
    },
    {
      label: 'Infrastructure caution',
      text: 'Infrastructure cooperation appears as a theme; do not invent permanent project lists or completion claims for exams.',
    },
    {
      label: 'Economic theme',
      text: 'Trade and investment interest form the commercial pillar (cite themes, not permanent volumes).',
    },
  ],
  flashcards: [
    {
      prompt: 'Why is Japan high-yield for Pakistan foreign-policy answers?',
      answer: 'Advanced economy with ODA, infrastructure, technology, and skills themes',
    },
    {
      prompt: 'What does ODA stand for in this bilateral context?',
      answer: 'Official development assistance',
    },
    {
      prompt: 'Name two human-capital themes.',
      answer: 'Technical training and scholarships',
    },
    {
      prompt: 'Should yen-loan totals be memorised as permanent facts?',
      answer: 'No; use instrument types and cooperation themes',
    },
    {
      prompt: 'Name two economic pillars besides aid.',
      answer: 'Trade and investment interest',
    },
    {
      prompt: 'What trap weakens Japan answers?',
      answer: 'Inventing a fake permanent project list',
    },
    {
      prompt: 'What closing line scores?',
      answer: 'Convert Japanese capital and training into infrastructure and skills delivery',
    },
    {
      prompt: 'How should strategic setting be framed?',
      answer: 'Asia connectivity and diversified foreign-policy engagement, not bloc slogans',
    },
    {
      prompt: 'Name one soft-power outcome of Japan ties.',
      answer: 'Industrial or technical skills transfer',
    },
  ],
  mistakes: [
    {
      trap: 'Inventing exact ODA totals or permanent project lists.',
      correct: 'Use instrument types and cooperation themes. Cite dated sources only when you have them.',
    },
    {
      trap: 'Writing only cultural goodwill with no development or skills pillar.',
      correct: 'Exams expect ODA, infrastructure, technology, and human-capital analysis.',
    },
    {
      trap: 'Treating Japan as interchangeable with China or Gulf partners.',
      correct: 'Japan answers lean on quality infrastructure, ODA instruments, and skills transfer.',
    },
    {
      trap: 'Ignoring training and scholarships.',
      correct: 'Human-capital cooperation is a standard soft-power paragraph.',
    },
    {
      trap: 'Overclaiming strategic alignment as a military alliance.',
      correct: 'Keep framing as economic, development, and diversified Asia engagement.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Map Japan partner profile and ODA meaning.' },
    { day: 'Day 2', task: 'Infrastructure and technology themes (no fake lists).' },
    { day: 'Day 3', task: 'Training and scholarship paragraph.' },
    { day: 'Day 4', task: 'Flashcards.' },
    { day: 'Day 5', task: 'Trade and investment themes only.' },
    { day: 'Day 6', task: '10-minute evaluate outline.' },
    { day: 'Day 7', task: 'Recite one-pager.' },
  ],
  sourcesLine:
    'Sources: standard Pakistan Affairs and current affairs notes on East Asia and Japan, ODA and development-cooperation primers in FPSC-style teaching. Avoid invented yen totals or project catalogues.',
}
