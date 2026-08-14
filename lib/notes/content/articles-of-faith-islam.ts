import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (mainstream FPSC Islamiat teaching):
 * - Six Articles of Faith (Imaniyat / Arkan al-Iman): Allah, angels, books, prophets, Last Day, Qadr
 * - Distinct from Five Pillars (acts of worship)
 * - Major revealed books commonly listed: Tawrat, Zabur, Injil, Quran
 * - Seal of Prophethood: Muhammad (PBUH)
 * Avoid sectarian disputes on secondary Qadr debates
 */
export const ARTICLES_OF_FAITH_ISLAM_KIT: NoteKitData = {
  id: 'articles-of-faith-islam',
  title: 'Articles of Faith (Imaniyat)',
  subtitle:
    'Six articles of Iman: Allah, angels, books, prophets, Day of Judgment, and Qadr, with MCQ-ready distinctions from the Pillars.',
  syllabusTags: [
    'Islamic Studies',
    'Imaniyat',
    'Articles of Faith',
    'FPSC Islamiat',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS / PMS Islamiat',
      directive: 'Discuss',
      angle: 'Articles of Faith and their place in a Muslim worldview',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Explain',
      angle: 'Belief in prophets and finality of Prophethood',
      frequency: 'high',
    },
    {
      year: 'One-paper / MPT',
      directive: 'MCQ fact',
      angle: 'Six articles list, books of revelation, Qadr, Last Day',
      frequency: 'high',
    },
    {
      year: 'CSS / PMS',
      directive: 'Differentiate',
      angle: 'Articles of Faith versus Five Pillars',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Six Articles of Faith (Arkan al-Iman / Imaniyat): belief in Allah, angels (malaika), revealed books, prophets (rusul), Day of Judgment, and divine decree (Qadr).',
    'Belief in Allah (Tawhid): one God, Creator, without partners. Core of Islamic creed.',
    'Angels: created beings who obey Allah. They are not worshipped. Jibril (Gabriel) is linked with revelation in standard teaching.',
    'Revealed books commonly taught: Tawrat (Torah), Zabur (Psalms), Injil (Gospel), and the Quran as the final revelation.',
    'Prophets: Allah sent messengers for guidance. Muhammad (PBUH) is the Seal of the Prophets (Khatam an-Nabiyyin).',
    'Day of Judgment (Akhirah): accountability, resurrection, reward and punishment. Life is a trust and a test.',
    'Qadr: divine decree and knowledge. Human beings remain responsible for choices in syllabus framing. Do not turn this into sectarian debate.',
    'Pillars are acts. Articles are beliefs. Mixing the two lists is a common MCQ trap.',
  ],
  answerSteps: [
    'Define Imaniyat as the core beliefs of Islam, then list the six articles in order.',
    'Explain Tawhid in one clear sentence as the foundation.',
    'Cover angels and books with names examiners expect, without myth padding.',
    'State prophethood and Seal of Prophethood with respect.',
    'Link Last Day to accountability and ethics.',
    'Close with Qadr as divine decree plus human responsibility, and note the belief vs practice distinction.',
  ],
  questionVariants: [
    'Discuss the Articles of Faith in Islam and their significance in Muslim life.',
    'Explain belief in prophethood with special reference to the finality of Prophethood.',
    'Differentiate between the Articles of Faith and the Five Pillars of Islam.',
    'Write short notes on belief in the Day of Judgment and Qadr.',
  ],
  citations: [
    {
      label: 'Six articles',
      text: 'Belief in Allah, angels, books, prophets, Day of Judgment, and Qadr form the standard six Articles of Faith in FPSC-style teaching.',
    },
    {
      label: 'Books',
      text: 'Commonly listed revealed scriptures include Tawrat, Zabur, Injil, and the Quran as the final book.',
    },
    {
      label: 'Prophethood',
      text: 'Muhammad (PBUH) is taught as the Seal of the Prophets.',
    },
    {
      label: 'Belief vs practice',
      text: 'Articles of Faith are beliefs (Iman). Five Pillars are obligatory acts (Ibadat).',
    },
    {
      label: 'Qadr framing',
      text: 'Qadr means divine decree. Standard exam answers keep human moral responsibility intact.',
    },
  ],
  flashcards: [
    { prompt: 'How many Articles of Faith are taught in standard Islamiat?', answer: 'Six' },
    { prompt: 'Name the six Articles of Faith.', answer: 'Allah, angels, books, prophets, Day of Judgment, Qadr' },
    { prompt: 'What is Tawhid?', answer: 'Belief in the oneness of Allah' },
    { prompt: 'Are angels worshipped in Islam?', answer: 'No' },
    { prompt: 'Which angel is linked with revelation?', answer: 'Jibril (Gabriel)' },
    { prompt: 'Name four revealed books commonly listed in exams.', answer: 'Tawrat, Zabur, Injil, Quran' },
    { prompt: 'Which book is the final revelation?', answer: 'The Quran' },
    { prompt: 'What does Seal of the Prophets mean for Muhammad (PBUH)?', answer: 'He is the last prophet' },
    { prompt: 'What does Akhirah / Day of Judgment emphasise?', answer: 'Accountability after death' },
    { prompt: 'What is Qadr?', answer: 'Divine decree' },
    { prompt: 'Articles of Faith vs Five Pillars: which is belief?', answer: 'Articles of Faith' },
    { prompt: 'Articles of Faith vs Five Pillars: which is practice?', answer: 'Five Pillars' },
    { prompt: 'Arabic term often used for Articles of Faith?', answer: 'Imaniyat or Arkan al-Iman' },
    { prompt: 'Trap: is Zakat an Article of Faith?', answer: 'No. Zakat is a Pillar (act of worship)' },
  ],
  mistakes: [
    {
      trap: 'Listing Five Pillars when asked for Articles of Faith.',
      correct: 'Articles are six beliefs. Pillars are five acts.',
    },
    {
      trap: 'Saying angels are objects of worship.',
      correct: 'Angels are created servants of Allah. Worship is for Allah alone.',
    },
    {
      trap: 'Forgetting Qadr in the six-article list.',
      correct: 'Standard list ends with belief in divine decree (Qadr).',
    },
    {
      trap: 'Claiming the Quran is not the final book.',
      correct: 'Syllabus teaching: Quran is the final revelation; Muhammad (PBUH) is the Seal of Prophets.',
    },
    {
      trap: 'Turning Qadr into fatalism that cancels responsibility.',
      correct: 'Exam framing keeps divine decree together with human accountability.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Memorise the six articles in order.' },
    { day: 'Day 2', task: 'Drill Tawhid, angels, and books with names.' },
    { day: 'Day 3', task: 'Revise prophethood and Seal of Prophets.' },
    { day: 'Day 4', task: 'Write five lines on Akhirah and Qadr.' },
    { day: 'Day 5', task: 'Contrast Articles vs Pillars until automatic.' },
    { day: 'Day 6', task: 'Flashcards + MCQ traps.' },
    { day: 'Day 7', task: 'One-pager only from memory.' },
  ],
  sourcesLine:
    'Sources: standard FPSC / CSS Islamiat creed teaching on Arkan al-Iman; mainstream Sunni syllabus lists of books and prophethood. Avoid sectarian Qadr polemics and unverified miracle catalogues.',
}
