import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (exam-safe bilateral framing):
 * - UK: historic colonial link ending 1947; Commonwealth membership; large Pakistani diaspora
 * - Themes: trade, education, defence cooperation language, development and climate diplomacy
 * - Aid and DFID/FCDO-era development engagement appear in teaching; treat as evolving policy, not fixed yearly totals
 * - Soft power: universities, legal and parliamentary traditions, media and cultural links
 * Avoid inventing permanent aid figures, secret defence clauses, or partisan diaspora politics as facts
 */
export const PAKISTAN_UK_RELATIONS_KIT: NoteKitData = {
  id: 'pakistan-uk-relations',
  title: 'Pakistan-UK Relations',
  subtitle:
    'Commonwealth and diaspora links, trade and education, and carefully framed aid history for CSS and PMS.',
  syllabusTags: [
    'Foreign policy',
    'Pakistan-UK relations',
    'Commonwealth',
    'Current affairs',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS / PMS',
      directive: 'Discuss',
      angle: 'Pakistan relations with the United Kingdom',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Evaluate',
      angle: 'Diaspora, Commonwealth, and economic dimensions of Pakistan-UK ties',
      frequency: 'high',
    },
    {
      year: 'CSS Current Affairs',
      directive: 'Critically examine',
      angle: 'UK development engagement and post-Brexit trade diplomacy with Pakistan',
      frequency: 'medium',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'Commonwealth; diaspora; historic link to 1947',
      frequency: 'medium',
    },
  ],
  onePager: [
    'The UK is a historic partner: colonial past ending with independence in 1947, then Commonwealth membership and continued diplomatic, legal, and educational links.',
    'Diaspora pillar: a large British Pakistani community shapes people-to-people ties, remittances themes, and political attention in both capitals. Keep analysis institutional, not partisan.',
    'Economic pillar: trade, investment interest, and education (universities and professional training). Volumes change; write themes, not frozen statistics.',
    'Development and aid history: UK has been a long-running development partner. Agency names and envelopes evolve (DFID into FCDO-era framing). Cite carefully as policy history, never as permanent annual totals.',
    'Security and defence cooperation language appears in bilateral notes; keep to themes unless you have a dated official source.',
    'Soft power: English language, common-law familiarity, parliamentary practice comparisons, and cultural or media links.',
    'Post-Brexit caution: UK trade diplomacy with Pakistan is often discussed as opportunity plus delivery gaps. Test claims against outcomes.',
    'Answer close: convert diaspora and Commonwealth affinity into trade, skills, education, and predictable institutional cooperation.',
  ],
  answerSteps: [
    'Open with historic link (1947) and Commonwealth membership.',
    'Explain diaspora and people-to-people weight carefully.',
    'Cover trade, investment, and education pillars.',
    'Add development/aid as evolving policy history (no fake totals).',
    'Note defence cooperation at theme level and soft power.',
    'Conclude with delivery: market access, skills, and institutional reliability.',
  ],
  questionVariants: [
    'Discuss the significance of Pakistan-UK relations.',
    'Evaluate the role of the Pakistani diaspora in Pakistan-UK ties.',
    'Critically examine Commonwealth and development dimensions of the relationship.',
    'How should post-Brexit trade diplomacy with the UK be assessed?',
  ],
  citations: [
    {
      label: 'Historic frame',
      text: 'Independence in 1947 followed British colonial rule; Pakistan later engaged the UK as a Commonwealth and bilateral partner.',
    },
    {
      label: 'Commonwealth',
      text: 'Commonwealth membership is a standard institutional frame for Pakistan-UK multilateral overlap.',
    },
    {
      label: 'Diaspora',
      text: 'A large British Pakistani diaspora is a high-yield people-to-people and soft-power theme in exam teaching.',
    },
    {
      label: 'Aid history caution',
      text: 'UK development engagement is real but evolving; do not invent permanent yearly aid totals or treat agency labels as frozen forever.',
    },
    {
      label: 'Economic theme',
      text: 'Trade, investment interest, and education links form the core economic soft-power pillar.',
    },
  ],
  flashcards: [
    {
      prompt: 'What historic date frames the modern Pakistan-UK state relationship?',
      answer: 'Independence in 1947 (end of British colonial rule in that territory)',
    },
    {
      prompt: 'Which multilateral club often appears in Pakistan-UK notes?',
      answer: 'The Commonwealth',
    },
    {
      prompt: 'What people-to-people pillar is especially high-yield?',
      answer: 'British Pakistani diaspora links',
    },
    {
      prompt: 'Name three economic or soft-power pillars.',
      answer: 'Trade, investment interest, and education or university links',
    },
    {
      prompt: 'How should UK aid be written in answers?',
      answer: 'As evolving development policy history, not invented permanent totals',
    },
    {
      prompt: 'What post-Brexit angle is exam-safe?',
      answer: 'Trade diplomacy opportunity plus delivery-gap test',
    },
    {
      prompt: 'What defence writing rule applies?',
      answer: 'Keep cooperation at theme level unless citing a dated source',
    },
    {
      prompt: 'Name two soft-power traditions often compared.',
      answer: 'Common-law familiarity and parliamentary practice',
    },
    {
      prompt: 'What closing line scores?',
      answer: 'Convert diaspora and Commonwealth affinity into trade, skills, and education delivery',
    },
    {
      prompt: 'Should diaspora politics be narrated as partisan fact?',
      answer: 'No; stay institutional and people-to-people',
    },
  ],
  mistakes: [
    {
      trap: 'Inventing exact UK aid envelopes as everlasting facts.',
      correct: 'Aid policy and agency labels evolve. Use careful history language.',
    },
    {
      trap: 'Writing only colonial history with no contemporary pillars.',
      correct: 'Add diaspora, trade, education, Commonwealth, and development themes.',
    },
    {
      trap: 'Treating Commonwealth membership as automatic preferential trade forever.',
      correct: 'Commonwealth is institutional affinity. Trade outcomes need separate evidence.',
    },
    {
      trap: 'Copying Gulf remittance templates onto the UK without education and legal soft power.',
      correct: 'UK answers usually need education, institutions, and Commonwealth framing.',
    },
    {
      trap: 'Inventing secret defence treaties as permanent syllabus facts.',
      correct: 'Use cooperation themes unless you cite a dated official source.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: '1947 historic frame + Commonwealth one-liners.' },
    { day: 'Day 2', task: 'Diaspora paragraph (institutional tone).' },
    { day: 'Day 3', task: 'Trade, education, investment outline.' },
    { day: 'Day 4', task: 'Aid history caution drills.' },
    { day: 'Day 5', task: 'Flashcards.' },
    { day: 'Day 6', task: '10-minute post-Brexit critically examine.' },
    { day: 'Day 7', task: 'Recite one-pager.' },
  ],
  sourcesLine:
    'Sources: standard Pakistan Affairs and current affairs notes on the UK and Commonwealth, diaspora themes, and carefully framed development-cooperation history in FPSC-style teaching. Avoid invented aid totals.',
}
