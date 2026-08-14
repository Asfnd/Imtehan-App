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
    'Usul al-Fiqh = method of deriving rulings (ahkam). Fiqh = the body of rulings. Do not conflate them.',
    'Primary sources: Quran (highest authority); Sunnah (sayings, actions, approvals of the Prophet PBUH).',
    'Secondary sources (classic exam pair): Ijma (scholarly consensus); Qiyas (analogy via shared `illah).',
    'Priority: Quran, then Sunnah, then Ijma, then Qiyas. Secondary tools cannot override clear primary texts.',
    'Four Sunni madhabs: Hanafi (Abu Hanifa), Maliki (Malik ibn Anas), Shafi`i (al-Shafi`i), Hanbali (Ahmad ibn Hanbal).',
    'Madhabs share Quran and Sunnah foundations; they differ in method and secondary rulings, not as rival faiths.',
    'Pakistan exam note: Hanafi practice is historically influential; all four remain valid Sunni schools. No true-vs-false ranking.',
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
    { prompt: 'Two primary sources?', answer: 'Quran and Sunnah' },
    { prompt: 'Two secondary sources most tested?', answer: 'Ijma and Qiyas' },
    { prompt: 'What is Usul al-Fiqh?', answer: 'Principles and methods for deriving Islamic legal rulings' },
    { prompt: 'What is Fiqh?', answer: 'The body of Islamic legal rulings derived through Usul' },
    { prompt: 'What is Ijma?', answer: 'Consensus of qualified scholars on a legal issue' },
    { prompt: 'What is Qiyas?', answer: 'Analogical reasoning from a known ruling to a new similar case' },
    { prompt: 'What is `illah?', answer: 'Effective cause shared by original and new case in Qiyas' },
    { prompt: 'Four Sunni madhabs?', answer: 'Hanafi, Maliki, Shafi`i, Hanbali' },
    { prompt: 'Hanafi founder?', answer: 'Abu Hanifa' },
    { prompt: 'Maliki founder?', answer: 'Malik ibn Anas' },
    { prompt: 'Shafi`i founder?', answer: 'Al-Shafi`i' },
    { prompt: 'Hanbali founder?', answer: 'Ahmad ibn Hanbal' },
    { prompt: 'Can Ijma/Qiyas override clear Quran?', answer: 'No' },
    { prompt: 'Sunnah includes?', answer: 'Sayings, actions, and approvals of the Prophet (PBUH)' },
    { prompt: 'Classic source order?', answer: 'Quran, Sunnah, Ijma, Qiyas' },
  ],
  mistakes: [
    {
      trap: 'Ranking Ijma or Qiyas above the Quran.',
      correct: 'Quran is highest. Secondary sources operate under primary texts.',
    },
    {
      trap: 'Equating Sunnah with later local custom.',
      correct: 'Sunnah means Prophetic practice preserved through Hadith, not culture as such.',
    },
    {
      trap: 'Calling the four madhabs different religions or the only true Islam.',
      correct: 'They are Sunni schools of fiqh sharing Quran and Sunnah foundations.',
    },
    {
      trap: 'Using Usul and Fiqh as synonyms.',
      correct: 'Usul is method; Fiqh is the rulings produced.',
    },
    {
      trap: 'Treating Qiyas as free personal opinion.',
      correct: 'Qiyas needs a base ruling, a new case, and a shared effective cause.',
    },
    {
      trap: 'Dragging Shia jurisprudence debates into a general FPSC answer without need.',
      correct: 'Stick to syllabus: Quran, Sunnah, Ijma, Qiyas, four Sunni madhabs.',
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
