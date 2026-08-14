import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked:
 * - Major ranges: Karakoram, Himalaya, Hindu Kush; K2 in Karakoram
 * - Plateaus: Potohar (Potwar) Plateau; Balochistan Plateau
 * - Plains: Indus plain / Punjab and Sindh alluvial plains
 * - Deserts: Thar, Cholistan, Thal, Kharan
 * - Climate: arid to semi-arid dominance in much of the country; monsoon influence; highland cold climates in north
 * - Khyber Pass: historic strategic pass near Peshawar linking to Afghanistan routes
 * - Distinct from land-people kit: deeper physical landform and climate focus
 */
export const PHYSICAL_GEOGRAPHY_PAKISTAN_KIT: NoteKitData = {
  id: 'physical-geography-pakistan',
  title: 'Physical Geography of Pakistan',
  subtitle:
    'Mountains, plateaus, plains, deserts, climate zones, and strategic passes (Khyber) as crisp MCQ and written facts.',
  syllabusTags: [
    'Pakistan geography',
    'Physical geography',
    'Landforms',
    'General knowledge',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'One-paper / MPT',
      directive: 'MCQ fact',
      angle: 'Ranges, deserts, K2, Khyber Pass',
      frequency: 'high',
    },
    {
      year: 'PPSC / NTS',
      directive: 'MCQ fact',
      angle: 'Plateaus and Indus plain',
      frequency: 'high',
    },
    {
      year: 'CSS / PMS',
      directive: 'Discuss',
      angle: 'Physical diversity and its economic implications',
      frequency: 'medium',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'Climate zone patterns (arid, monsoon, highland)',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Northern high mountains: Himalaya, Karakoram, and Hindu Kush meet in the north. They shape climate, water storage (snow/ice), and strategic frontiers.',
    'K2 (Mount Godwin-Austen) lies in the Karakoram and is a classic peak MCQ.',
    'Plateaus: Potohar (Potwar) Plateau in northern Punjab / adjoining areas; Balochistan Plateau across much of Balochistan.',
    'Plains: vast Indus alluvial plain through Punjab and Sindh; agricultural and demographic heartland.',
    'Deserts: Thar (Sindh and adjoining), Cholistan (southern Punjab), Thal (Punjab), Kharan (Balochistan).',
    'Climate pattern (exam-safe): large arid and semi-arid zones; summer monsoon rains matter for agriculture and floods; northern highlands are colder with snow; coastal south has maritime influence.',
    'Strategic passes: Khyber Pass is the high-yield historic gateway west of Peshawar toward Afghanistan routes. Other named passes appear in deeper papers; master Khyber first.',
    'Drainage frame: Indus and tributaries organise the plain (pair with Indus river system kit for detail).',
    'Exam use: match landform to province/region, peak to range, desert to province, pass to frontier function.',
  ],
  answerSteps: [
    'Open with a landform map: mountains, plateaus, plains, deserts.',
    'Place K2 in Karakoram and name the three northern ranges.',
    'Locate Potohar and Balochistan plateaus; Indus plain as heartland.',
    'List deserts with province tags; add Khyber Pass as strategic link.',
    'Close with climate: arid/semi-arid dominance plus monsoon and highland contrast.',
  ],
  questionVariants: [
    'Describe the major physical regions of Pakistan.',
    'Locate the main deserts and mountain ranges of Pakistan.',
    'Write a short note on the Khyber Pass.',
    'How do landforms influence climate and settlement in Pakistan?',
  ],
  citations: [
    {
      label: 'Northern ranges',
      text: 'Himalaya, Karakoram, and Hindu Kush form the northern mountain complex; K2 is in the Karakoram.',
    },
    {
      label: 'Plateaus and plains',
      text: 'Potohar and Balochistan plateaus; Indus alluvial plain across Punjab and Sindh.',
    },
    {
      label: 'Deserts',
      text: 'Thar, Cholistan, Thal, and Kharan are standard desert names in Pakistan GK.',
    },
    {
      label: 'Khyber Pass',
      text: 'Historic strategic pass near the Peshawar region linking routes toward Afghanistan.',
    },
  ],
  flashcards: [
    {
      prompt: 'Name Pakistan three northern mountain ranges.',
      answer: 'Himalaya, Karakoram, Hindu Kush',
    },
    { prompt: 'In which range is K2?', answer: 'Karakoram' },
    {
      prompt: 'Name two major plateaus.',
      answer: 'Potohar (Potwar) Plateau and Balochistan Plateau',
    },
    {
      prompt: 'What is the main agricultural plain?',
      answer: 'Indus alluvial plain (Punjab and Sindh)',
    },
    {
      prompt: 'Thar Desert is mainly associated with which province?',
      answer: 'Sindh (and adjoining areas)',
    },
    {
      prompt: 'Cholistan Desert is in which province?',
      answer: 'Punjab (southern)',
    },
    { prompt: 'Kharan Desert is in which province?', answer: 'Balochistan' },
    {
      prompt: 'Where is the Khyber Pass?',
      answer: 'West of Peshawar region; historic route toward Afghanistan',
    },
    {
      prompt: 'Dominant climate character over much of Pakistan?',
      answer: 'Arid to semi-arid, with monsoon and highland variations',
    },
    {
      prompt: 'Why do northern mountains matter for water?',
      answer: 'Snow and ice storage feed river systems downstream',
    },
    {
      prompt: 'Thal Desert is in which province?',
      answer: 'Punjab',
    },
    {
      prompt: 'Match peak trap: is K2 in the Himalaya for most MCQs?',
      answer: 'No; teach K2 as Karakoram',
    },
  ],
  mistakes: [
    {
      trap: 'Placing K2 in the Himalaya.',
      correct: 'Standard exam key: K2 is in the Karakoram.',
    },
    {
      trap: 'Putting Cholistan in Sindh and Thar only in Punjab.',
      correct: 'Thar is mainly Sindh-adjoining; Cholistan is southern Punjab.',
    },
    {
      trap: 'Confusing Potohar Plateau with Balochistan Plateau.',
      correct: 'Potohar is northern Punjab region; Balochistan Plateau is in Balochistan.',
    },
    {
      trap: 'Saying Pakistan is uniformly tropical rainforest climate.',
      correct: 'Much of the country is arid/semi-arid; monsoon and highland climates vary by region.',
    },
    {
      trap: 'Locating Khyber Pass in Balochistan.',
      correct: 'Khyber is the classic KP/Peshawar-frontier pass toward Afghanistan routes.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Memorise ranges and K2.' },
    { day: 'Day 2', task: 'Map plateaus, plains, and deserts to provinces.' },
    { day: 'Day 3', task: 'Learn Khyber Pass and climate pattern lines.' },
    { day: 'Day 4', task: 'Drill flashcards hard (location traps).' },
    { day: 'Day 5', task: 'Write a short physical regions note.' },
    { day: 'Day 6', task: 'Cross-link Indus river system kit.' },
    { day: 'Day 7', task: 'Recite landform map from memory.' },
  ],
  sourcesLine:
    'Sources: standard Pakistan physical geography textbooks and one-paper GK keys (ranges, deserts, plateaus, Khyber). Avoid unsourced elevation myths.',
}
