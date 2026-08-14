import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked:
 * - Four provinces + ICT (Islamabad Capital Territory); also AJ&K and GB in broader political geography teaching
 * - Major ranges: Karakoram, Himalaya, Hindu Kush
 * - Deserts: Thar (Sindh), Cholistan (Punjab), Thal (Punjab), Kharan (Balochistan) at name level
 * - Languages: Urdu national/official use teaching; major regional languages Punjabi Sindhi Pashto Balochi etc.
 * - Population: use "around" language; avoid fake census precision unless stating classic syllabus facts carefully
 */
export const LAND_PEOPLE_PAKISTAN_KIT: NoteKitData = {
  id: 'land-people-pakistan',
  title: 'Land and People of Pakistan',
  subtitle:
    'Provinces and ICT, mountains, deserts, languages, and population features at one-paper syllabus level.',
  syllabusTags: [
    'Pakistan studies',
    'Pakistan geography',
    'Land and people',
    'General knowledge',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'Provinces, capitals, ICT',
      frequency: 'high',
    },
    {
      year: 'PPSC / NTS',
      directive: 'MCQ fact',
      angle: 'Mountain ranges and deserts',
      frequency: 'high',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'Languages of Pakistan',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Discuss',
      angle: 'Geographic diversity and national integration',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Administrative core for exams: four provinces (Punjab, Sindh, Khyber Pakhtunkhwa, Balochistan) plus Islamabad Capital Territory (ICT).',
    'Provincial capitals (classic): Punjab Lahore; Sindh Karachi; KP Peshawar; Balochistan Quetta. Federal capital: Islamabad.',
    'Broader map awareness: Gilgit-Baltistan and Azad Jammu and Kashmir appear in many GK papers as territories with special status (know names; do not invent constitutional trivia).',
    'Northern mountains: Karakoram, Himalaya, and Hindu Kush. K2 (Mount Godwin-Austen) in the Karakoram is a high-yield peak name.',
    'Deserts (name-level): Thar (Sindh / adjoining areas), Cholistan (southern Punjab), Thal (Punjab), Kharan (Balochistan).',
    'Languages: Urdu is the national language in the constitutional teaching frame and a main link language. English is widely used in official and higher education settings. Major regional languages include Punjabi, Sindhi, Pashto, Balochi, and others.',
    'People and population: Pakistan is among the world most populous countries. Population is young and urbanising, with denser settlement in the Indus plains than in deserts or high mountains. Use around language for totals unless you memorise an official census figure.',
    'Exam use: match place to province, range to region, desert to province, and language to region without mixing Sindh/Punjab trap pairs.',
  ],
  answerSteps: [
    'Start with provinces + ICT and capitals.',
    'Add mountains and one peak (K2 / Karakoram) if physical geography is asked.',
    'Name deserts with province tags.',
    'State language framework: Urdu link + major regional languages.',
    'Close with settlement pattern: Indus plains denser than deserts and highlands.',
  ],
  questionVariants: [
    'Name the provinces of Pakistan and their capitals.',
    'Write a short note on the major mountain ranges of Pakistan.',
    'Locate Thar, Cholistan, Thal, and Kharan deserts.',
    'Discuss linguistic diversity in Pakistan for a one-paper style answer.',
  ],
  citations: [
    {
      label: 'Units',
      text: 'Four provinces plus Islamabad Capital Territory form the core administrative teaching set.',
    },
    {
      label: 'Capitals',
      text: 'Lahore, Karachi, Peshawar, Quetta; federal capital Islamabad.',
    },
    {
      label: 'Mountains',
      text: 'Karakoram, Himalaya, Hindu Kush in the north. K2 is in the Karakoram.',
    },
    {
      label: 'Deserts',
      text: 'Thar, Cholistan, Thal, and Kharan are standard desert names in Pakistan GK.',
    },
    {
      label: 'Languages',
      text: 'Urdu as national/link language in syllabus teaching; major regional languages include Punjabi, Sindhi, Pashto, Balochi.',
    },
  ],
  flashcards: [
    {
      prompt: 'Name the four provinces of Pakistan.',
      answer: 'Punjab, Sindh, Khyber Pakhtunkhwa, Balochistan',
    },
    { prompt: 'What does ICT stand for?', answer: 'Islamabad Capital Territory' },
    { prompt: 'Capital of Punjab?', answer: 'Lahore' },
    { prompt: 'Capital of Sindh?', answer: 'Karachi' },
    { prompt: 'Capital of Khyber Pakhtunkhwa?', answer: 'Peshawar' },
    { prompt: 'Capital of Balochistan?', answer: 'Quetta' },
    { prompt: 'Federal capital of Pakistan?', answer: 'Islamabad' },
    {
      prompt: 'Name the three major northern mountain ranges.',
      answer: 'Karakoram, Himalaya, Hindu Kush',
    },
    { prompt: 'K2 lies in which range?', answer: 'Karakoram' },
    { prompt: 'Thar Desert is mainly associated with which province?', answer: 'Sindh' },
    {
      prompt: 'Cholistan Desert is mainly in which province?',
      answer: 'Punjab',
    },
    { prompt: 'Thal Desert is in which province?', answer: 'Punjab' },
    {
      prompt: 'Kharan Desert is in which province?',
      answer: 'Balochistan',
    },
    {
      prompt: 'National language in the usual constitutional teaching frame?',
      answer: 'Urdu',
    },
    {
      prompt: 'Name four major regional languages.',
      answer: 'Punjabi, Sindhi, Pashto, Balochi',
    },
    {
      prompt: 'Where is population density generally highest?',
      answer: 'Indus plains (relative to deserts and high mountains)',
    },
  ],
  mistakes: [
    {
      trap: 'Calling Karachi the capital of Pakistan.',
      correct: 'Islamabad is the federal capital. Karachi is the capital of Sindh and a major economic city.',
    },
    {
      trap: 'Placing K2 in the Himalaya for MCQs that want Karakoram.',
      correct: 'K2 is in the Karakoram range.',
    },
    {
      trap: 'Putting Cholistan in Sindh.',
      correct: 'Cholistan is mainly southern Punjab. Thar is the classic Sindh desert name.',
    },
    {
      trap: 'Claiming a precise population total without an official census reference.',
      correct: 'Say Pakistan is very populous and use around language unless you cite a specific census figure.',
    },
    {
      trap: 'Treating English as the national language instead of Urdu in syllabus MCQs.',
      correct: 'Urdu is the national language in the standard teaching frame; English is widely used officially.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Provinces, ICT, capitals.' },
    { day: 'Day 2', task: 'Mountain ranges and K2.' },
    { day: 'Day 3', task: 'Deserts with province tags.' },
    { day: 'Day 4', task: 'Languages drill.' },
    { day: 'Day 5', task: 'Population and settlement pattern one-pager.' },
    { day: 'Day 6', task: 'Flashcards and map traps.' },
    { day: 'Day 7', task: 'One-pager only. Recite capitals and deserts.' },
  ],
  sourcesLine:
    'Sources: standard Pakistan Studies and geography syllabus items; constitutional language teaching frame; classic GK lists for ranges and deserts. Prefer around language for population totals without a cited census.',
}
