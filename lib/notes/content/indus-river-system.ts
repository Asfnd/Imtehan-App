import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked:
 * - Indus main stem; eastern tributaries Jhelum Chenab Ravi Beas Sutlej (classic teaching set)
 * - Western tributaries commonly taught: Kabul, Kurram, Gomal, etc. (name-level)
 * - Indus Waters Treaty 1960: World Bank role; India eastern rivers, Pakistan western rivers allocation framework
 * - Tarbela (Indus), Mangla (Jhelum) as major storage names
 * - Do not invent fake discharge numbers or treaty article trivia beyond syllabus level
 */
export const INDUS_RIVER_SYSTEM_KIT: NoteKitData = {
  id: 'indus-river-system',
  title: 'Indus River System and Water Resources',
  subtitle:
    'Indus and its tributaries, Indus Waters Treaty 1960, and major dams/barrages for CSS and PPSC.',
  syllabusTags: [
    'Pakistan geography',
    'Water resources',
    'Indus Waters Treaty',
    'Physical geography',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'Eastern and western tributaries of the Indus',
      frequency: 'high',
    },
    {
      year: 'CSS / PPSC',
      directive: 'MCQ fact',
      angle: 'Indus Waters Treaty 1960 and World Bank',
      frequency: 'high',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'Tarbela and Mangla locations / rivers',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Discuss',
      angle: 'Water security and Indus basin irrigation',
      frequency: 'medium',
    },
  ],
  onePager: [
    'The Indus is Pakistan’s principal river system for irrigation, hydropower, and settlement patterns in the plains.',
    'Classic eastern tributaries (left-bank teaching set): Jhelum, Chenab, Ravi, Beas, Sutlej.',
    'Western tributaries (right-bank teaching set, name-level): Kabul, Kurram, Gomal (and related western inflows).',
    'Indus Waters Treaty (IWT) signed at Karachi on 19 September 1960 between India and Pakistan, with the World Bank playing a facilitating role.',
    'Treaty framework commonly taught: eastern rivers (Ravi, Beas, Sutlej) allocated primarily to India; western rivers (Indus, Jhelum, Chenab) primarily to Pakistan, with detailed use rules.',
    'Classic trap: Jhelum and Chenab are eastern tributaries in geography lists, but western rivers under IWT.',
    'Tarbela Dam: major storage on the Indus. Mangla Dam: major storage on the Jhelum. Both are high-yield MCQ names.',
    'Barrages divert river water into canals (irrigation network). Dams store water and often generate hydropower.',
    'Exam caution: stick to named facts, year 1960, World Bank role, and river allocation teaching frame. Deeper institutions live in the IWT deep kit.',
  ],
  answerSteps: [
    'Locate the Indus system on the map of Pakistan in one sentence.',
    'List eastern and western tributaries in the classic exam order.',
    'State IWT 1960, parties, and World Bank role.',
    'Give the eastern vs western rivers allocation teaching frame.',
    'Add Tarbela (Indus) and Mangla (Jhelum) if water resources or hydropower is asked.',
  ],
  questionVariants: [
    'Name the eastern and western tributaries of the Indus commonly taught in Pakistan geography.',
    'Write a short note on the Indus Waters Treaty 1960.',
    'Distinguish dams and barrages with Pakistani examples.',
    'Where are Tarbela and Mangla dams located in terms of rivers?',
  ],
  citations: [
    {
      label: 'Eastern tributaries',
      text: 'Classic set: Jhelum, Chenab, Ravi, Beas, Sutlej.',
    },
    {
      label: 'Western tributaries',
      text: 'Commonly taught western inflows include Kabul, Kurram, and Gomal.',
    },
    {
      label: 'Treaty',
      text: 'Indus Waters Treaty signed at Karachi on 19 September 1960 by India and Pakistan with World Bank facilitation.',
    },
    {
      label: 'Allocation teaching frame',
      text: 'Eastern rivers (Ravi, Beas, Sutlej) primarily to India; western rivers (Indus, Jhelum, Chenab) primarily to Pakistan, subject to treaty rules.',
    },
    {
      label: 'Geography vs IWT trap',
      text: 'Jhelum and Chenab are eastern tributaries in geography lists but western rivers under the IWT allocation frame.',
    },
    {
      label: 'Major dams',
      text: 'Tarbela on the Indus; Mangla on the Jhelum.',
    },
  ],
  flashcards: [
    {
      prompt: 'Name the five eastern tributaries of the Indus (classic list).',
      answer: 'Jhelum, Chenab, Ravi, Beas, Sutlej',
    },
    {
      prompt: 'Name three western tributaries often asked in MCQs.',
      answer: 'Kabul, Kurram, Gomal',
    },
    {
      prompt: 'In which year was the Indus Waters Treaty signed?',
      answer: '1960',
    },
    {
      prompt: 'Which two countries signed the Indus Waters Treaty?',
      answer: 'India and Pakistan',
    },
    {
      prompt: 'Which institution helped facilitate the Indus Waters Treaty?',
      answer: 'World Bank',
    },
    {
      prompt: 'Which rivers are the eastern rivers in the IWT teaching frame?',
      answer: 'Ravi, Beas, Sutlej',
    },
    {
      prompt: 'Which rivers are the western rivers in the IWT teaching frame?',
      answer: 'Indus, Jhelum, Chenab',
    },
    {
      prompt: 'Tarbela Dam is on which river?',
      answer: 'Indus',
    },
    {
      prompt: 'Mangla Dam is on which river?',
      answer: 'Jhelum',
    },
    {
      prompt: 'What is the main job of a barrage?',
      answer: 'Divert river water into canals (control/diversion), not large multi-year storage like a major dam',
    },
    {
      prompt: 'Why is the Indus system vital for Pakistan?',
      answer: 'Irrigation, agriculture, settlement in the plains, and hydropower',
    },
    {
      prompt: 'Beas is mainly associated with which country in the IWT eastern set?',
      answer: 'India (eastern rivers allocation teaching frame)',
    },
  ],
  mistakes: [
    {
      trap: 'Putting Ravi or Sutlej in the western rivers list.',
      correct: 'Western teaching set for IWT: Indus, Jhelum, Chenab. Ravi, Beas, Sutlej are eastern.',
    },
    {
      trap: 'Putting Jhelum or Chenab in the IWT eastern rivers list because they are eastern tributaries geographically.',
      correct: 'Geography eastern tributaries ≠ IWT eastern rivers. Under IWT, Jhelum and Chenab are western rivers.',
    },
    {
      trap: 'Saying Tarbela is on the Jhelum.',
      correct: 'Tarbela is on the Indus. Mangla is on the Jhelum.',
    },
    {
      trap: 'Dating the Indus Waters Treaty to 1947 or 1971.',
      correct: 'Treaty signed 19 September 1960 (Karachi).',
    },
    {
      trap: 'Calling the UN the treaty facilitator instead of the World Bank.',
      correct: 'World Bank facilitated the Indus Waters Treaty process.',
    },
    {
      trap: 'Treating barrage and dam as identical.',
      correct: 'Dams store (and often generate power). Barrages mainly divert/control flow into canals.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Memorise eastern tributaries in order.' },
    { day: 'Day 2', task: 'Memorise western tributaries and Indus main stem role.' },
    { day: 'Day 3', task: 'IWT 1960, World Bank, eastern vs western rivers.' },
    { day: 'Day 4', task: 'Tarbela, Mangla, dam vs barrage.' },
    { day: 'Day 5', task: 'Map sketch from memory.' },
    { day: 'Day 6', task: 'Flashcards and trap drills.' },
    { day: 'Day 7', task: 'One-pager only. Recite treaty facts.' },
  ],
  sourcesLine:
    'Sources: standard Pakistan physical geography texts; Indus Waters Treaty 1960 public framework; classic CSS/PPSC water resources MCQ sets. Avoid unsourced discharge WhatsApp figures.',
}
