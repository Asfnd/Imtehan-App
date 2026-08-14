import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked classic GK:
 * - Continents: Africa, Antarctica, Asia, Europe, North America, South America, Australia (Oceania teaching variants exist; keep seven-continent school set)
 * - Oceans: Pacific, Atlantic, Indian, Southern (Antarctic), Arctic
 * - Highest peak: Mount Everest (Nepal/China border, Himalaya)
 * - Long rivers: Nile and Amazon compete in "longest" teaching; Nile often keyed longest; Amazon huge by discharge
 * - Deserts: Sahara largest hot desert; Antarctica largest overall desert by dryness teaching
 * - Tropics: Tropic of Cancer / Capricorn; Equator
 * - Avoid inventing 2026 measurement updates; use durable school/exam facts
 */
export const WORLD_PHYSICAL_GEOGRAPHY_BASICS_KIT: NoteKitData = {
  id: 'world-physical-geography-basics',
  title: 'World Physical Geography Basics',
  subtitle:
    'Continents, oceans, highest peaks, longest rivers, deserts, and tropics for CSS MPT, PMS, and PPSC GK.',
  syllabusTags: [
    'World geography',
    'General knowledge',
    'Physical geography',
    'One-paper',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'One-paper / MPT',
      directive: 'MCQ fact',
      angle: 'Continents, oceans, Everest, Sahara',
      frequency: 'high',
    },
    {
      year: 'PPSC / NTS',
      directive: 'MCQ fact',
      angle: 'Longest rivers and tropics',
      frequency: 'high',
    },
    {
      year: 'CSS MPT',
      directive: 'MCQ fact',
      angle: 'Ocean and desert superlatives',
      frequency: 'high',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'Equator and Tropics of Cancer/Capricorn',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Continents (seven-continent school set): Africa, Antarctica, Asia, Australia, Europe, North America, South America.',
    'Oceans: Pacific (largest), Atlantic, Indian, Southern (Antarctic), Arctic (smallest).',
    'Highest mountain on Earth: Mount Everest in the Himalaya (Nepal-China border).',
    'Other peak names often tested: K2 (Pakistan/China Karakoram), Kangchenjunga, etc. Master Everest and K2 first.',
    'Long rivers: Nile (Africa) is the classic longest-river key in many Pakistan papers; Amazon (South America) is the giant by discharge/volume teaching. If options fight, know both claims exist in general knowledge debates.',
    'Other river names: Yangtze (China), Mississippi-Missouri system (USA), Congo, Yenisei teaching variants appear in deeper lists.',
    'Deserts: Sahara (Africa) is the largest hot desert. Antarctica is often taught as the largest desert overall because of extreme dryness. Gobi, Arabian, Kalahari, Atacama are name-level.',
    'Tropics: Equator (0°). Tropic of Cancer (~23.5°N). Tropic of Capricorn (~23.5°S). Tropical zone lies between the tropics.',
    'Exam habit: lock superlative + location continent. Do not invent new 2026 re-measurement debates in one-paper answers.',
  ],
  answerSteps: [
    'For MCQs, identify the category first (ocean, desert, river, peak, line of latitude).',
    'Attach the fact to a continent or country border.',
    'For river longest questions, prefer Nile as the common key and note Amazon discharge if the stem asks volume.',
    'For deserts, separate hot desert (Sahara) from largest overall desert teaching (Antarctica).',
    'Close revision with tropics latitudes.',
  ],
  questionVariants: [
    'Which is the largest ocean and which is the smallest?',
    'Where is Mount Everest located?',
    'Distinguish Sahara and Antarctica as desert superlatives.',
    'Define the Equator and the Tropics of Cancer and Capricorn.',
  ],
  citations: [
    {
      label: 'Oceans',
      text: 'Pacific is the largest ocean; Arctic is the smallest in the five-ocean teaching set.',
    },
    {
      label: 'Everest',
      text: 'Mount Everest is the highest peak; Himalaya; Nepal-China border.',
    },
    {
      label: 'Rivers',
      text: 'Nile is the classic longest-river key; Amazon is supreme in discharge in standard teaching.',
    },
    {
      label: 'Deserts and tropics',
      text: 'Sahara largest hot desert; Antarctica often largest desert overall; tropics at about 23.5° N/S.',
    },
  ],
  flashcards: [
    { prompt: 'Largest ocean?', answer: 'Pacific Ocean' },
    { prompt: 'Smallest ocean?', answer: 'Arctic Ocean' },
    { prompt: 'Highest peak on Earth?', answer: 'Mount Everest' },
    {
      prompt: 'Everest mountain range and border?',
      answer: 'Himalaya; Nepal-China border',
    },
    {
      prompt: 'Classic longest river key in many Pakistan MCQs?',
      answer: 'Nile',
    },
    {
      prompt: 'Amazon is best known as what kind of river superlative?',
      answer: 'Greatest discharge / volume (South America)',
    },
    { prompt: 'Largest hot desert?', answer: 'Sahara (Africa)' },
    {
      prompt: 'Often taught largest desert overall?',
      answer: 'Antarctica (extreme dryness)',
    },
    { prompt: 'Latitude of the Equator?', answer: '0°' },
    {
      prompt: 'Tropic of Cancer approximate latitude?',
      answer: 'About 23.5° North',
    },
    {
      prompt: 'Tropic of Capricorn approximate latitude?',
      answer: 'About 23.5° South',
    },
    {
      prompt: 'Name the seven continents (school set).',
      answer: 'Africa, Antarctica, Asia, Australia, Europe, North America, South America',
    },
  ],
  mistakes: [
    {
      trap: 'Saying Atlantic is the largest ocean.',
      correct: 'Pacific is the largest.',
    },
    {
      trap: 'Placing Everest only in India.',
      correct: 'Nepal-China border in the Himalaya.',
    },
    {
      trap: 'Calling Sahara the largest desert in every sense without the Antarctica teaching caveat.',
      correct: 'Sahara is largest hot desert; Antarctica is often keyed largest overall desert.',
    },
    {
      trap: 'Mixing Tropic of Cancer with Capricorn hemispheres.',
      correct: 'Cancer is north; Capricorn is south.',
    },
    {
      trap: 'Inventing a new longest river based on a viral 2026 post.',
      correct: 'Use durable exam keys: Nile length tradition; Amazon discharge.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Memorise continents and five oceans with size order ends.' },
    { day: 'Day 2', task: 'Lock Everest and K2 facts.' },
    { day: 'Day 3', task: 'Rivers: Nile vs Amazon distinction.' },
    { day: 'Day 4', task: 'Deserts and tropics latitudes.' },
    { day: 'Day 5', task: 'Full flashcard drill.' },
    { day: 'Day 6', task: 'Mixed MCQ practice set.' },
    { day: 'Day 7', task: 'Rapid oral recall of superlatives.' },
  ],
  sourcesLine:
    'Sources: standard school/exam world physical geography keys used in CSS MPT, PMS, PPSC, and NTS. Prefer durable superlatives over viral re-measurement claims.',
}
