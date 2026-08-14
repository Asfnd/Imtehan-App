import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (mainstream CSS Islamiat / history of Islamic civilization teaching):
 * - Name-level figures: Ibn Sina, Al-Razi, Al-Khwarizmi, Ibn al-Haytham, Al-Biruni, Ibn Rushd
 * - Fields: medicine, mathematics, optics, astronomy, philosophy, architecture
 * - Institutions: Bayt al-Hikmah, hospitals, madrasas (concept level)
 * Avoid exaggerated "invented everything" claims; keep syllabus-safe contributions
 */
export const ISLAMIC_CIVILIZATION_CONTRIBUTIONS_KIT: NoteKitData = {
  id: 'islamic-civilization-contributions',
  title: 'Contributions of Islamic Civilization',
  subtitle:
    'Science, medicine, philosophy, and architecture at name level for CSS Islamiat, without exaggerated claims.',
  syllabusTags: [
    'Islamic Studies',
    'Islamic civilization',
    'Muslim contribution to knowledge',
    'FPSC Islamiat',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS / PMS Islamiat',
      directive: 'Discuss',
      angle: 'Contribution of Islamic civilization to science and learning',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Evaluate',
      angle: 'Role of Muslim scholars in medicine and philosophy',
      frequency: 'high',
    },
    {
      year: 'One-paper / MPT',
      directive: 'MCQ fact',
      angle: 'Ibn Sina, Al-Khwarizmi, Ibn al-Haytham, Al-Razi names and fields',
      frequency: 'high',
    },
    {
      year: 'CSS / PMS',
      directive: 'Explain',
      angle: 'How translation and institutions spread knowledge',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Islamic civilization valued knowledge as a religious and social good. Learning, hospitals, libraries, and teaching circles supported scholarship across regions.',
    'Medicine: Ibn Sina (Avicenna) is linked with the Canon of Medicine. Al-Razi (Rhazes) is linked with clinical observation and classic medical writings in syllabus notes.',
    'Mathematics: Al-Khwarizmi is linked with algebra and algorithms (name origin themes). Decimal and transmission of mathematical methods are often mentioned carefully at concept level.',
    'Optics and method: Ibn al-Haytham (Alhazen) is linked with optics and experimental approach in standard histories.',
    'Astronomy and geography: Al-Biruni and others appear in exams for measurement, geography, and scientific curiosity across cultures.',
    'Philosophy: Ibn Rushd (Averroes) and others engaged Greek philosophy within an Islamic intellectual setting. Keep claims measured.',
    'Architecture and arts: mosques, domes, arches, calligraphy, and geometric design as cultural expressions. Name styles by region without inventing unique "firsts".',
    'Institutions: Bayt al-Hikmah (House of Wisdom) theme for translation and learning in Abbasid Baghdad teaching. Hospitals and madrasas as social institutions.',
  ],
  answerSteps: [
    'Open with the civilizational value of knowledge in Islam (brief, not sermon-length).',
    'Give one solid example each from medicine, maths, and optics with correct names.',
    'Add philosophy and architecture at name or theme level.',
    'Mention institutions (translation, hospitals, teaching) as enabling factors.',
    'Keep tone balanced: contribution and transmission, not monopoly over all world science.',
    'Close with exam takeaway: Islamic civilization as a major link in global knowledge history.',
  ],
  questionVariants: [
    'Discuss the contribution of Muslims to science and medicine.',
    'Evaluate the role of Islamic civilization in the preservation and expansion of knowledge.',
    'Write short notes on Ibn Sina, Al-Khwarizmi, and Ibn al-Haytham.',
    'Explain how institutions of learning supported Islamic intellectual culture.',
  ],
  citations: [
    {
      label: 'Medicine',
      text: 'Ibn Sina linked with Canon of Medicine; Al-Razi with clinical medical writings in standard teaching.',
    },
    {
      label: 'Mathematics',
      text: 'Al-Khwarizmi linked with algebra and algorithmic methods in syllabus histories.',
    },
    {
      label: 'Optics',
      text: 'Ibn al-Haytham linked with optics and experimental inquiry.',
    },
    {
      label: 'Philosophy',
      text: 'Ibn Rushd among major philosophers engaging reason and revelation debates in classical tradition.',
    },
    {
      label: 'Institutions',
      text: 'Bayt al-Hikmah theme, hospitals, and teaching institutions appear as supports for scholarship.',
    },
  ],
  flashcards: [
    { prompt: 'Ibn Sina is mainly linked with which field?', answer: 'Medicine (Canon of Medicine)' },
    { prompt: 'Latinised name often used for Ibn Sina?', answer: 'Avicenna' },
    { prompt: 'Al-Razi is mainly linked with which field?', answer: 'Medicine' },
    { prompt: 'Al-Khwarizmi is mainly linked with which field?', answer: 'Mathematics / algebra' },
    { prompt: 'What word family is linked with Al-Khwarizmi`s name in popular teaching?', answer: 'Algorithm' },
    { prompt: 'Ibn al-Haytham is mainly linked with which field?', answer: 'Optics' },
    { prompt: 'Latinised name often used for Ibn al-Haytham?', answer: 'Alhazen' },
    { prompt: 'Ibn Rushd is mainly linked with which field?', answer: 'Philosophy' },
    { prompt: 'Latinised name often used for Ibn Rushd?', answer: 'Averroes' },
    { prompt: 'What is Bayt al-Hikmah in exam notes?', answer: 'House of Wisdom; translation and learning centre theme in Abbasid Baghdad' },
    { prompt: 'Name one architectural expression of Islamic civilization.', answer: 'Mosque architecture / dome and arch forms / calligraphy' },
    { prompt: 'Al-Biruni is often linked with which areas?', answer: 'Astronomy, geography, and scientific measurement themes' },
    { prompt: 'Exam caution on civilization essays?', answer: 'State contributions clearly; avoid exaggerated invent-everything claims' },
    { prompt: 'Name one social institution supporting learning.', answer: 'Hospitals or madrasas / libraries' },
  ],
  mistakes: [
    {
      trap: 'Claiming Muslims invented all modern science alone.',
      correct: 'State major contributions and transmission roles without monopoly myths.',
    },
    {
      trap: 'Mixing names and fields (e.g. Al-Khwarizmi as optics).',
      correct: 'Khwarizmi maths; Ibn al-Haytham optics; Ibn Sina medicine.',
    },
    {
      trap: 'Using only Latin names without Arabic forms.',
      correct: 'Know both where exams expect them: Ibn Sina/Avicenna, Ibn Rushd/Averroes.',
    },
    {
      trap: 'Writing architecture as only decoration.',
      correct: 'Link form to worship spaces, community life, and design traditions.',
    },
    {
      trap: 'Inventing exact discovery dates not in mainstream notes.',
      correct: 'Prefer name-level fields and well-known works over fake chronology.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Map fields: medicine, maths, optics, philosophy.' },
    { day: 'Day 2', task: 'Memorise five scholar-field pairs.' },
    { day: 'Day 3', task: 'Institutions: Bayt al-Hikmah, hospitals, teaching.' },
    { day: 'Day 4', task: 'Architecture and arts themes.' },
    { day: 'Day 5', task: 'Write a balanced 12-minute essay outline.' },
    { day: 'Day 6', task: 'Flashcards + name traps.' },
    { day: 'Day 7', task: 'One-pager from memory.' },
  ],
  sourcesLine:
    'Sources: standard CSS Islamiat civilization chapters; mainstream histories of medieval Islamic science and learning. Prefer name-level verified associations; avoid WhatsApp invention lists.',
}
