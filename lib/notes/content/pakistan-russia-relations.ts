import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (exam-safe bilateral framing):
 * - Cold War era: Pakistan Western alliances; USSR-India tilt themes in standard teaching
 * - Post-Cold War and recent decades: gradual normalisation, defence dialogue, energy/trade interest themes
 * - Multilateral: SCO membership overlap; Afghanistan stability as shared concern theme
 * - Avoid inventing secret treaties, fake arms deal totals, or partisan Cold War polemics
 */
export const PAKISTAN_RUSSIA_RELATIONS_KIT: NoteKitData = {
  id: 'pakistan-russia-relations',
  title: 'Pakistan-Russia Relations',
  subtitle:
    'From Cold War distance to gradual engagement: energy, defence dialogue, SCO, and Afghanistan themes for CSS and PMS.',
  syllabusTags: [
    'Foreign policy',
    'Pakistan-Russia relations',
    'Current affairs',
    'Pakistan Affairs',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS / PMS',
      directive: 'Discuss',
      angle: 'Evolution of Pakistan-Russia relations',
      frequency: 'medium',
    },
    {
      year: 'CSS pattern',
      directive: 'Evaluate',
      angle: 'Prospects of Pakistan-Russia economic and defence cooperation',
      frequency: 'medium',
    },
    {
      year: 'CSS Current Affairs',
      directive: 'Critically examine',
      angle: 'SCO and regional diplomacy involving Russia and Pakistan',
      frequency: 'medium',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'Cold War alignment themes; SCO; energy cooperation ideas',
      frequency: 'niche',
    },
  ],
  onePager: [
    'Pakistan-Russia ties moved from Cold War distance toward cautious engagement. Exam answers should show history, then current drivers.',
    'Cold War teaching: Pakistan linked to Western security arrangements; the USSR often appeared closer to India in syllabus narratives. Keep this as structural history, not moralising.',
    'Normalisation theme: after the Cold War, contacts widened in diplomacy, limited trade, and selective defence dialogue. Progress is gradual, not a sudden alliance.',
    'Energy and economy: Russia is discussed for oil/gas, investment interest, and possible project cooperation. Cite as themes; avoid invented contract totals.',
    'Defence and training: official dialogue and exercises appear in current-affairs notes at concept level. Do not invent operational details.',
    'Multilateral: both are SCO members. SCO gives a regular diplomatic setting for connectivity, counter-terror talk, and regional stability themes.',
    'Afghanistan: shared interest in stability and reduced spillover risk is a recurring bilateral and regional point.',
    'Answer close: diversify partners without abandoning core interests; deepen trade and energy where viable; use SCO for structured engagement; manage India-Russia and West-Russia externalities carefully.',
  ],
  answerSteps: [
    'Open with historical distance in the Cold War, then the shift to engagement.',
    'Explain economic and energy cooperation as emerging pillars.',
    'Add defence dialogue at theme level only.',
    'Place SCO and Afghanistan as multilateral/regional glue.',
    'Note constraints: India factor, sanctions climate, and limited trade base.',
    'Conclude with diversification and realistic incrementalism.',
  ],
  questionVariants: [
    'Discuss the evolution of Pakistan-Russia relations since the Cold War.',
    'Evaluate prospects of economic and energy cooperation between Pakistan and Russia.',
    'How does the SCO frame Pakistan-Russia engagement?',
    'Critically examine constraints on closer Pakistan-Russia ties.',
  ],
  citations: [
    {
      label: 'Cold War frame',
      text: 'Standard notes place Pakistan nearer Western alliances and the USSR nearer India in that era.',
    },
    {
      label: 'Engagement',
      text: 'Post-Cold War contacts include diplomacy, selective defence dialogue, and energy/trade interest themes.',
    },
    {
      label: 'SCO',
      text: 'Shared SCO membership provides a multilateral meeting ground.',
    },
    {
      label: 'Afghanistan',
      text: 'Regional stability and reduced spillover risk recur as shared concerns.',
    },
  ],
  flashcards: [
    {
      prompt: 'What Cold War pattern do exams expect?',
      answer: 'Pakistan Western-leaning alliances; USSR often closer to India in teaching',
    },
    {
      prompt: 'How should post-Cold War ties be described?',
      answer: 'Gradual normalisation and cautious engagement, not sudden alliance',
    },
    {
      prompt: 'Name two cooperation themes.',
      answer: 'Energy/trade interest and selective defence dialogue',
    },
    {
      prompt: 'Which multilateral body links both states regularly?',
      answer: 'SCO (Shanghai Cooperation Organisation)',
    },
    {
      prompt: 'What regional issue often appears in bilateral notes?',
      answer: 'Afghanistan stability and spillover risk',
    },
    {
      prompt: 'Should arms deal figures be invented?',
      answer: 'No; keep defence to dialogue and theme level',
    },
    {
      prompt: 'What external constraint often matters?',
      answer: 'India-Russia ties and wider sanctions or great-power climate',
    },
    {
      prompt: 'What closing policy line scores?',
      answer: 'Diversify partners with realistic incremental cooperation',
    },
    {
      prompt: 'Is trade historically huge?',
      answer: 'No; limited trade base is a standard constraint point',
    },
    {
      prompt: 'What is the exam trap on history?',
      answer: 'Moralising Cold War blocs instead of structural interests',
    },
  ],
  mistakes: [
    {
      trap: 'Treating Russia as a full replacement for Western partners overnight.',
      correct: 'Describe incremental diversification, not sudden bloc swap.',
    },
    {
      trap: 'Inventing treaty texts or exact deal values.',
      correct: 'Use cooperation themes without fake precision.',
    },
    {
      trap: 'Ignoring Cold War background entirely.',
      correct: 'Brief history then contemporary drivers is the expected structure.',
    },
    {
      trap: 'Omitting SCO.',
      correct: 'SCO is the clean multilateral hook.',
    },
    {
      trap: 'Writing partisan Russia-Ukraine war essays as Pakistan foreign policy.',
      correct: 'Keep Pakistani interest language: stability, energy, diplomacy.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Cold War distance vs post-Cold War engagement outline.' },
    { day: 'Day 2', task: 'Energy, trade, and defence dialogue pillars.' },
    { day: 'Day 3', task: 'SCO and Afghanistan paragraphs.' },
    { day: 'Day 4', task: 'Flashcards.' },
    { day: 'Day 5', task: 'Constraints: India factor, trade base, sanctions climate.' },
    { day: 'Day 6', task: '10-minute evolution essay outline.' },
    { day: 'Day 7', task: 'Recite one-pager.' },
  ],
  sourcesLine:
    'Sources: standard Pakistan foreign policy and current affairs notes on Russia, SCO primers, and Cold War alignment teaching. Avoid invented deal totals and sensational geopolitical polemics.',
}
