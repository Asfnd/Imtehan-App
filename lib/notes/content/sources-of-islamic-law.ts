import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (mainstream FPSC Islamiat / Usul teaching):
 * - Primary sources: Quran, Sunnah
 * - Secondary (derived) sources commonly taught: Ijma, Qiyas
 * - Four Sunni schools of fiqh: Hanafi, Maliki, Shafi'i, Hanbali (no ranking bias)
 * - Usul al-Fiqh = methodology of deriving rulings
 * Avoid sectarian controversy; stick to syllabus framing
 */
export const SOURCES_OF_ISLAMIC_LAW_KIT: NoteKitData = {
  id: 'sources-of-islamic-law',
  title: 'Sources of Islamic Law (Usul)',
  subtitle:
    'Quran, Sunnah, Ijma, and Qiyas: primary vs secondary sources, plus a neutral note on the four Sunni madhabs.',
  syllabusTags: [
    'Islamic Studies',
    'Usul al-Fiqh',
    'Sources of Shariah',
    'FPSC Islamiat',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS / PMS Islamiat',
      directive: 'Discuss',
      angle: 'Primary and secondary sources of Islamic law',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Explain',
      angle: 'Role of Ijma and Qiyas in developing rulings',
      frequency: 'high',
    },
    {
      year: 'One-paper / MPT',
      directive: 'MCQ fact',
      angle: 'Names of sources, four madhabs, Usul vs Fiqh',
      frequency: 'high',
    },
    {
      year: 'CSS / PMS',
      directive: 'Evaluate',
      angle: 'How Quran and Sunnah guide later juristic reasoning',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Usul al-Fiqh: principles and methods used to derive Islamic legal rulings (ahkam). Fiqh is the body of rulings; Usul is the method.',
    'Primary sources: (1) Quran, the Word of Allah, highest authority. (2) Sunnah, sayings, actions, and approvals of Prophet Muhammad (PBUH), preserved in Hadith literature.',
    'Secondary sources (commonly taught after Quran and Sunnah): (3) Ijma, consensus of qualified scholars of an age on a legal issue. (4) Qiyas, analogical reasoning that extends a known ruling to a new case sharing the same effective cause (`illah).',
    'Order of priority in classic teaching: Quran first, then Sunnah, then Ijma, then Qiyas. Secondary sources must not contradict clear primary texts.',
    'Four major Sunni schools of fiqh (madhabs): Hanafi (Abu Hanifa), Maliki (Malik ibn Anas), Shafi`i (al-Shafi`i), Hanbali (Ahmad ibn Hanbal). They share the same foundations and differ mainly in methods and secondary rulings.',
    'In Pakistan exams, Hanafi fiqh is historically influential in teaching and practice, but all four are valid Sunni schools. Do not rank them as true vs false.',
    'Exam angle: Shariah sources explain continuity of law, ijtihad within limits, and how Islam addresses new situations without abandoning revelation.',
  ],
  answerSteps: [
    'Define Islamic law briefly and introduce Usul as the method of derivation.',
    'Explain Quran and Sunnah as primary sources with clear authority.',
    'Explain Ijma and Qiyas as secondary tools that operate under the primary texts.',
    'Give one simple example idea for Qiyas (analogy from a known ruling to a similar new case) without inventing weak stories.',
    'Add a short, neutral paragraph on the four Sunni madhabs as schools of interpretation, not rival religions.',
    'Conclude: sources keep Shariah rooted in revelation while allowing disciplined reasoning.',
  ],
  questionVariants: [
    'Discuss the primary and secondary sources of Islamic law.',
    'Explain Ijma and Qiyas with reference to their place after Quran and Sunnah.',
    'What is Usul al-Fiqh? How does it differ from Fiqh?',
    'Write short notes on the four Sunni schools of fiqh without sectarian bias.',
  ],
  citations: [
    {
      label: 'Primary sources',
      text: 'Quran and Sunnah are the primary sources of Islamic law in standard syllabus teaching.',
    },
    {
      label: 'Secondary sources',
      text: 'Ijma (consensus) and Qiyas (analogy) are the main secondary sources commonly examined.',
    },
    {
      label: 'Usul vs Fiqh',
      text: 'Usul al-Fiqh is methodology; Fiqh is the derived body of rulings.',
    },
    {
      label: 'Four madhabs',
      text: 'Hanafi, Maliki, Shafi`i, and Hanbali are the four major Sunni schools of fiqh.',
    },
    {
      label: 'Priority idea',
      text: 'Clear Quran and authentic Sunnah take precedence; Ijma and Qiyas work within that framework.',
    },
  ],
  flashcards: [
    { prompt: 'Name the two primary sources of Islamic law.', answer: 'Quran and Sunnah' },
    { prompt: 'Name the two secondary sources most often taught in exams.', answer: 'Ijma and Qiyas' },
    { prompt: 'What is Usul al-Fiqh?', answer: 'Principles and methods for deriving Islamic legal rulings' },
    { prompt: 'What is Fiqh?', answer: 'The body of Islamic legal rulings derived through Usul' },
    { prompt: 'What is Ijma?', answer: 'Consensus of qualified scholars on a legal issue' },
    { prompt: 'What is Qiyas?', answer: 'Analogical reasoning from a known ruling to a new similar case' },
    { prompt: 'What is `illah in Qiyas teaching?', answer: 'The effective cause shared by the original and new case' },
    { prompt: 'Name the four Sunni madhabs.', answer: 'Hanafi, Maliki, Shafi`i, Hanbali' },
    { prompt: 'Founder associated with the Hanafi school?', answer: 'Abu Hanifa' },
    { prompt: 'Founder associated with the Maliki school?', answer: 'Malik ibn Anas' },
    { prompt: 'Founder associated with the Shafi`i school?', answer: 'Al-Shafi`i' },
    { prompt: 'Founder associated with the Hanbali school?', answer: 'Ahmad ibn Hanbal' },
    { prompt: 'Can Ijma or Qiyas override a clear Quranic text in classic teaching?', answer: 'No' },
    { prompt: 'What does Sunnah include in Usul teaching?', answer: 'Sayings, actions, and approvals of the Prophet (PBUH)' },
    { prompt: 'Why are madhabs called schools of fiqh?', answer: 'They are juristic methods and rulings within Sunni Islam, not separate faiths' },
  ],
  mistakes: [
    {
      trap: 'Putting Ijma or Qiyas above the Quran.',
      correct: 'Quran is highest. Secondary sources operate under primary texts.',
    },
    {
      trap: 'Confusing Sunnah with later customs of a culture.',
      correct: 'Sunnah means Prophetic practice preserved through Hadith, not local custom as such.',
    },
    {
      trap: 'Calling the four madhabs different religions or ranking one as the only Islam.',
      correct: 'They are Sunni schools of fiqh sharing Quran and Sunnah foundations.',
    },
    {
      trap: 'Equating Usul al-Fiqh with Fiqh itself.',
      correct: 'Usul is method; Fiqh is the rulings produced by that method.',
    },
    {
      trap: 'Treating Qiyas as free personal opinion with no link to a known ruling.',
      correct: 'Qiyas needs a base ruling, a new case, and a shared effective cause.',
    },
    {
      trap: 'Mixing Shia jurisprudence debates into a general FPSC Islamiat answer without need.',
      correct: 'Stick to mainstream syllabus: Quran, Sunnah, Ijma, Qiyas, and four Sunni madhabs.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Learn primary vs secondary source map.' },
    { day: 'Day 2', task: 'One-pager on Quran and Sunnah authority.' },
    { day: 'Day 3', task: 'Define Ijma and Qiyas with one clean example idea each.' },
    { day: 'Day 4', task: 'Memorise four madhabs and founders (neutral tone).' },
    { day: 'Day 5', task: 'Write a full discuss answer on sources of Islamic law.' },
    { day: 'Day 6', task: 'Flashcards + trap drills (priority and Usul vs Fiqh).' },
    { day: 'Day 7', task: 'Recite sources order and madhab names from memory.' },
  ],
  sourcesLine:
    'Sources: Standard FPSC Islamiat coverage of Usul al-Fiqh; mainstream textbooks on Quran, Sunnah, Ijma, Qiyas, and the four Sunni schools. Avoid polemical rankings and unsourced claims.',
}
