import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (mainstream Seerah / Khulafa-e-Rashideen syllabus teaching):
 * - Four rightly guided caliphs: Abu Bakr, Umar, Uthman, Ali (may Allah be pleased with them)
 * - High-yield: sequence, key achievements, compilation of Quran under Abu Bakr / Uthman, expansion under Umar
 * - Carefully respectful: no sectarian polemic; exam facts only
 * - Do not invent exact army sizes or contested casualty myths as certainty
 */
export const CALIPHATE_RASHIDUN_BASICS_KIT: NoteKitData = {
  id: 'caliphate-rashidun-basics',
  title: 'Rightly Guided Caliphate (Khulafa-e-Rashideen) Basics',
  subtitle:
    'Sequence, high-yield deeds, and exam traps for the four rightly guided caliphs, framed carefully and respectfully.',
  syllabusTags: [
    'Islamiat',
    'Khulafa-e-Rashideen',
    'Islamic history',
    'Seerah aftermath',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS / PMS Islamiat',
      directive: 'Discuss',
      angle: 'Services of the Khulafa-e-Rashideen',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Examine',
      angle: 'Administration and justice under Umar (RA)',
      frequency: 'high',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'Order of caliphs, Quran compilation, Hijri calendar',
      frequency: 'high',
    },
    {
      year: 'Islamiat',
      directive: 'Evaluate',
      angle: 'Role of Abu Bakr (RA) in preserving the early Muslim community',
      frequency: 'high',
    },
  ],
  onePager: [
    'Khulafa-e-Rashideen (rightly guided caliphs): Abu Bakr, Umar, Uthman, Ali (RA). Memorise this order for MCQs.',
    'Abu Bakr (RA): first caliph after the Prophet (PBUH). Stabilised the community after the Prophet’s death, confronted ridda (apostasy / refusal of zakat) challenges, and ordered the first collection of the Quran into a mushaf after many huffaz were martyred (notably after Yamamah).',
    'Umar (RA): second caliph. Famous for justice, administrative organisation, provincial governors, diwan (register), and Hijri calendar formalisation. Major territorial expansion into Persia, Levant, and Egypt is a standard exam theme. Title often linked with Al-Farooq in school texts.',
    'Uthman (RA): third caliph. Ordered the standard Quranic mushaf copies (Uthmani mushaf) and their distribution to major centres to protect the text from dialectal variation disputes. Long caliphate; later fitnah and martyrdom are sensitive exam topics: state facts without sectarian blame games.',
    'Ali (RA): fourth caliph. Known for knowledge, justice, and courage. Period includes major internal conflicts (Jamal, Siffin) ending in arbitration themes. Keep answers balanced and respectful; focus on principles of justice and hardship of fitnah, not factional slogans.',
    'Exam use: sequence, who compiled vs who standardised the Quran, Hijri calendar under Umar, and “services” essays that pair political stability with justice and Quran preservation.',
  ],
  answerSteps: [
    'Open with definition: Khulafa-e-Rashideen as the first four successors after the Prophet (PBUH).',
    'State the order: Abu Bakr, Umar, Uthman, Ali (RA).',
    'Give 2 to 3 high-yield services per caliph (stability, justice/admin, mushaf, knowledge/justice under pressure).',
    'Add one precise Quran fact: collection under Abu Bakr; standardisation under Uthman.',
    'Close with a respectful lesson: consultation, justice, and preservation of faith and community.',
  ],
  questionVariants: [
    'Discuss the services of the Khulafa-e-Rashideen to Islam.',
    'Examine the administrative reforms of Hazrat Umar (RA).',
    'Explain the role of Hazrat Abu Bakr (RA) and Hazrat Uthman (RA) in the compilation of the Quran.',
    'Evaluate the challenges faced by Hazrat Ali (RA) during his caliphate.',
  ],
  citations: [
    {
      label: 'Order',
      text: 'Rightly guided caliphs in order: Abu Bakr, Umar, Uthman, Ali (may Allah be pleased with them).',
    },
    {
      label: 'Quran collection',
      text: 'First collection of the Quran into a mushaf associated with Abu Bakr (RA), after heavy loss of memorisers (notably linked to Yamamah).',
    },
    {
      label: 'Uthmani mushaf',
      text: 'Standard written copies of the Quran commissioned and distributed under Uthman (RA).',
    },
    {
      label: 'Umar administration',
      text: 'Hijri calendar formalisation and strong themes of justice, governors, and diwan registers under Umar (RA).',
    },
    {
      label: 'Respectful framing',
      text: 'Internal conflicts of the later period are historical fitnah topics. Exam answers should stay factual and avoid sectarian polemic.',
    },
  ],
  flashcards: [
    { prompt: 'Name the four rightly guided caliphs in order.', answer: 'Abu Bakr, Umar, Uthman, Ali (RA)' },
    { prompt: 'Who was the first caliph?', answer: 'Abu Bakr (RA)' },
    { prompt: 'Under whom was the Quran first collected into a mushaf?', answer: 'Abu Bakr (RA)' },
    { prompt: 'Under whom were standard Quran copies distributed?', answer: 'Uthman (RA)' },
    { prompt: 'Which caliph is especially linked with Hijri calendar formalisation?', answer: 'Umar (RA)' },
    { prompt: 'What challenge did Abu Bakr (RA) face after the Prophet’s death?', answer: 'Ridda / refusal of zakat and community stability crises' },
    { prompt: 'Name two internal conflicts associated with Ali’s (RA) period.', answer: 'Jamal and Siffin (at syllabus name-level)' },
    { prompt: 'What is a common honorific title associated with Umar (RA) in school texts?', answer: 'Al-Farooq' },
    { prompt: 'What is a high-yield admin theme under Umar (RA)?', answer: 'Justice, governors, diwan registers, organised expansion' },
    { prompt: 'How should fitnah topics be handled in exams?', answer: 'State verified facts respectfully; avoid sectarian blame narratives' },
  ],
  mistakes: [
    {
      trap: 'Saying Uthman first collected the Quran into a mushaf and Abu Bakr only standardised it.',
      correct: 'Collection into a mushaf is linked with Abu Bakr; standardisation and distribution with Uthman.',
    },
    {
      trap: 'Mixing the order of the four caliphs.',
      correct: 'Abu Bakr, then Umar, then Uthman, then Ali (RA).',
    },
    {
      trap: 'Crediting the Hijri calendar to Abu Bakr or Uthman by default.',
      correct: 'Formalisation of the Hijri calendar is a standard Umar (RA) exam point.',
    },
    {
      trap: 'Turning Jamal/Siffin into partisan preaching.',
      correct: 'Name the events carefully as historical fitnah; emphasise justice, unity costs, and lessons without sectarian attack.',
    },
    {
      trap: 'Inventing precise troop counts as if they were undisputed MCQ keys.',
      correct: 'Prefer names, sequence, and institutional facts over contested battlefield statistics.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Memorise the four names in order and one service each.' },
    { day: 'Day 2', task: 'Drill Quran: Abu Bakr collection vs Uthman standardisation.' },
    { day: 'Day 3', task: 'Write a 10-minute outline on Umar’s administration.' },
    { day: 'Day 4', task: 'Flashcards on dates-free facts and titles.' },
    { day: 'Day 5', task: 'Practice a respectful Ali (RA) challenges paragraph.' },
    { day: 'Day 6', task: 'Full services essay outline for all four.' },
    { day: 'Day 7', task: 'One-pager only. Recite order and Quran facts from memory.' },
  ],
  sourcesLine:
    'Sources: mainstream Seerah and Khulafa-e-Rashideen syllabus histories; FPSC Islamiat Islamic history items. Keep tone respectful; avoid sectarian WhatsApp narratives.',
}
