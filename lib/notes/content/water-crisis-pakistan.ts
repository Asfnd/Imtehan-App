import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked:
 * - Per capita water availability narrative: long-term decline toward scarcity stress (avoid fake exact 2026 litres)
 * - Major storages: Tarbela and Mangla are landmark reservoirs on the Indus system
 * - Indus Waters Treaty 1960: India-Pakistan water-sharing framework
 * - Climate stress: monsoon extremes, glacial melt/GLOF risk, drought/flood swings
 */
export const WATER_CRISIS_PAKISTAN_KIT: NoteKitData = {
  id: 'water-crisis-pakistan',
  title: 'Water Crisis in Pakistan',
  subtitle:
    'Scarcity narrative, Tarbela/Mangla storage, Indus Waters Treaty link, and climate stress for CSS answers.',
  syllabusTags: [
    'Environment',
    'Geography',
    'Pakistan Affairs',
    'Climate',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS pattern',
      directive: 'Discuss',
      angle: 'Water scarcity and management in Pakistan',
      frequency: 'high',
    },
    {
      year: 'CSS / PMS',
      directive: 'Critically examine',
      angle: 'Storage capacity and Indus basin management',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Evaluate',
      angle: 'Climate change and Pakistan\'s water security',
      frequency: 'high',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'Tarbela, Mangla, Indus Waters Treaty 1960',
      frequency: 'high',
    },
  ],
  onePager: [
    'Water crisis narrative: rising demand and inefficient use meet limited reliable supply, so per capita availability has been under long-term stress. Speak carefully; avoid invented exact litres for the exam year.',
    'Pakistan depends heavily on the Indus basin for irrigation, cities, and hydropower.',
    'Storage landmarks: Tarbela and Mangla are major reservoirs. Storage helps seasonal regulation but cannot alone fix governance and wastage.',
    'Indus Waters Treaty (1960): India-Pakistan framework allocating rights over eastern and western rivers of the Indus system. Cite as a treaty fact, not as a daily politics rant.',
    'Stress drivers: population and crop demand, canal losses and inefficient irrigation, groundwater over-extraction, pollution, and weak provincial coordination.',
    'Climate stress: monsoon variability, floods and droughts, glacial melt and GLOF risk in the upper basin, and heat-driven demand spikes.',
    'Exam rule: scarcity narrative → storage (Tarbela/Mangla) → treaty link → climate → reforms (efficiency, storage, governance). No fake per capita figures.',
  ],
  answerSteps: [
    'Open with Indus-basin dependence and declining per capita stress carefully.',
    'Explain why storage matters seasonally; name Tarbela and Mangla.',
    'Place the Indus Waters Treaty 1960 as the bilateral legal frame.',
    'Add domestic management failures: waste, groundwater stress, coordination gaps.',
    'Link climate extremes to floods, droughts, and glacial risks.',
    'Close with reforms: efficiency, better storage/regulation, data, and federal-provincial coordination.',
  ],
  questionVariants: [
    'Discuss the water crisis in Pakistan and suggest a way forward.',
    'Critically examine storage and irrigation efficiency in the Indus basin.',
    'Evaluate the Indus Waters Treaty in the context of Pakistan\'s water security.',
    'Climate change has turned water management into a national security issue. Discuss.',
  ],
  citations: [
    {
      label: 'Basin dependence',
      text: 'Pakistan\'s agriculture and large population centres depend primarily on the Indus river system.',
    },
    {
      label: 'Storages',
      text: 'Tarbela and Mangla are major landmark reservoirs used for storage and regulation on the Indus system.',
    },
    {
      label: 'Indus Waters Treaty',
      text: 'The Indus Waters Treaty (1960) is the India-Pakistan water-sharing agreement for the Indus system rivers.',
    },
    {
      label: 'Climate stress',
      text: 'Monsoon extremes, drought-flood swings, and northern glacial melt/GLOF risks intensify water insecurity.',
    },
  ],
  flashcards: [
    {
      prompt: 'Name two landmark storages.',
      answer: 'Tarbela and Mangla',
    },
    {
      prompt: 'When was the Indus Waters Treaty signed?',
      answer: '1960',
    },
    {
      prompt: 'Why is per capita scarcity framed carefully?',
      answer: 'Long-term decline is real; exact current-year litres should not be invented',
    },
    {
      prompt: 'Name one climate-related water stress.',
      answer: 'Monsoon extremes, drought/flood swings, or GLOF/glacial melt risk',
    },
    {
      prompt: 'Name one domestic management failure.',
      answer: 'Inefficient irrigation, canal losses, or groundwater over-extraction',
    },
    {
      prompt: 'What is the Indus Waters Treaty between?',
      answer: 'India and Pakistan',
    },
  ],
  mistakes: [
    {
      trap: 'Inventing exact per capita cubic-metre figures for the current year.',
      correct: 'Describe scarcity stress carefully unless citing a dated source.',
    },
    {
      trap: 'Claiming storage alone solves the crisis.',
      correct: 'Efficiency, groundwater, and governance matter with storage.',
    },
    {
      trap: 'Confusing the Indus Waters Treaty date.',
      correct: '1960.',
    },
    {
      trap: 'Ignoring climate variability.',
      correct: 'Floods, droughts, and glacial risks belong in modern answers.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Memorise Tarbela, Mangla, and Treaty 1960.' },
    { day: 'Day 2', task: 'Write scarcity narrative without fake numbers.' },
    { day: 'Day 3', task: 'List domestic drivers vs climate drivers.' },
    { day: 'Day 4', task: '10-minute outline on water security.' },
    { day: 'Day 5', task: 'Drill flashcards.' },
    { day: 'Day 6', task: 'Practice climate-security variant.' },
    { day: 'Day 7', task: 'One-pager only from memory.' },
  ],
  sourcesLine:
    'Sources: Indus Waters Treaty 1960; standard Indus basin geography (Tarbela, Mangla); climate/water-security themes in FPSC syllabi. Avoid unsourced per capita WhatsApp numbers.',
}
