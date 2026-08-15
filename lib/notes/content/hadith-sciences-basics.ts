import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (mainstream Sunni / FPSC Islamiat teaching):
 * - Classification: Sahih, Hasan, Daif (and related terms at syllabus level)
 * - Isnad = chain of narrators; Matn = text of the report
 * - Sihah Sitta: Bukhari, Muslim, Abu Dawud, Tirmidhi, Nasa'i, Ibn Majah
 * - Sahih al-Bukhari and Sahih Muslim have special primacy in Sunni teaching
 * Avoid sectarian controversy; stick to exam framing
 */
export const HADITH_SCIENCES_BASICS_KIT: NoteKitData = {
  id: 'hadith-sciences-basics',
  title: 'Hadith Sciences Basics',
  subtitle:
    'Sahih, Hasan, Daif; isnad and matn; and the six major books (Sihah Sitta) for Islamiat exams.',
  syllabusTags: [
    'Islamic Studies',
    'Hadith sciences',
    'Sihah Sitta',
    'FPSC Islamiat',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS / PMS Islamiat',
      directive: 'Discuss',
      angle: 'Classification of Hadith and methods of verification',
      frequency: 'high',
    },
    {
      year: 'One-paper / MPT',
      directive: 'MCQ fact',
      angle: 'Sihah Sitta names; Bukhari and Muslim primacy',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Explain',
      angle: 'Isnad and matn in Hadith criticism',
      frequency: 'high',
    },
    {
      year: 'CSS / PMS',
      directive: 'Evaluate',
      angle: 'Why authentic Hadith matter for understanding Sunnah',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Hadith: reports of the sayings, actions, approvals, or descriptions of the Prophet Muhammad (peace be upon him). Sunnah is the Prophetic practice; Hadith literature transmits that practice.',
    'Two parts of a report: isnad (chain of narrators) and matn (the text). Classical criticism studies both the chain and the content.',
    'Sahih: sound/authentic by the standards of Hadith scholars (trustworthy continuous chain and acceptable text). Hasan: good; slightly below Sahih in strength but still acceptable in many teachings. Daif: weak due to problems in chain or other defects.',
    'Other labels appear in advanced study (for example Mawdu fabricated). For one-paper exams, master Sahih, Hasan, and Daif first.',
    'Sihah Sitta (six major books in Sunni teaching): Sahih al-Bukhari, Sahih Muslim, Sunan Abu Dawud, Jami al-Tirmidhi, Sunan al-Nasa'i, Sunan Ibn Majah.',
    'Sahih al-Bukhari (Imam al-Bukhari) and Sahih Muslim (Imam Muslim) are given special primacy among the six in mainstream Sunni teaching.',
    'Compilers to recognise: Bukhari, Muslim, Abu Dawud, Tirmidhi, Nasa'i, Ibn Majah.',
    'Exam use: define terms cleanly, name the six books, explain why isnad criticism mattered for preserving Sunnah, and avoid inventing fake book counts.',
  ],
  answerSteps: [
    'Define Hadith and its link to Sunnah in one or two lines.',
    'Explain isnad and matn as the two sides of a report.',
    'Define Sahih, Hasan, and Daif with one clear difference each.',
    'List the Sihah Sitta and note Bukhari and Muslim primacy in Sunni teaching.',
    'Close with why verification protects religious practice from weak or false reports.',
  ],
  questionVariants: [
    'Discuss the classification of Hadith into Sahih, Hasan, and Daif.',
    'Explain the importance of isnad and matn in Hadith sciences.',
    'Write a note on the Sihah Sitta with special reference to Bukhari and Muslim.',
    'Evaluate the role of Hadith criticism in preserving the Sunnah.',
  ],
  citations: [
    {
      label: 'Structure',
      text: 'A Hadith report is studied through isnad (chain) and matn (text).',
    },
    {
      label: 'Grades',
      text: 'Sahih (sound), Hasan (good), Daif (weak) are core syllabus grades.',
    },
    {
      label: 'Sihah Sitta',
      text: 'Bukhari, Muslim, Abu Dawud, Tirmidhi, Nasa'i, Ibn Majah.',
    },
    {
      label: 'Primacy',
      text: 'In mainstream Sunni teaching, Sahih al-Bukhari and Sahih Muslim hold special rank among the six.',
    },
  ],
  flashcards: [
    {
      prompt: 'What is isnad?',
      answer: 'The chain of narrators of a Hadith',
    },
    {
      prompt: 'What is matn?',
      answer: 'The text of the Hadith report',
    },
    {
      prompt: 'What does Sahih mean?',
      answer: 'Sound / authentic by Hadith science standards',
    },
    {
      prompt: 'What does Hasan mean?',
      answer: 'Good; acceptable but generally ranked below Sahih',
    },
    {
      prompt: 'What does Daif mean?',
      answer: 'Weak',
    },
    {
      prompt: 'What does Sihah Sitta mean?',
      answer: 'The six major Hadith books in Sunni teaching',
    },
    {
      prompt: 'Name the six books of Sihah Sitta.',
      answer:
        'Sahih al-Bukhari, Sahih Muslim, Sunan Abu Dawud, Jami al-Tirmidhi, Sunan al-Nasa'i, Sunan Ibn Majah',
    },
    {
      prompt: 'Which two collections have special primacy in Sunni teaching?',
      answer: 'Sahih al-Bukhari and Sahih Muslim',
    },
    {
      prompt: 'Who compiled Sahih al-Bukhari?',
      answer: 'Imam al-Bukhari',
    },
    {
      prompt: 'Who compiled Sahih Muslim?',
      answer: 'Imam Muslim',
    },
    {
      prompt: 'Name the four Sunan / Jami works after Bukhari and Muslim in the six.',
      answer: 'Abu Dawud, Tirmidhi, Nasa'i, Ibn Majah',
    },
    {
      prompt: 'Why study isnad?',
      answer: 'To check continuity and reliability of narrators',
    },
    {
      prompt: 'Why study matn?',
      answer: 'To examine the content of the report itself',
    },
    {
      prompt: 'What is Mawdu in Hadith vocabulary (basic)?',
      answer: 'Fabricated / forged report',
    },
    {
      prompt: 'Hadith mainly transmits which Prophetic idea for exams?',
      answer: 'Sunnah (Prophetic practice and guidance)',
    },
  ],
  mistakes: [
    {
      trap: 'Listing only Bukhari and Muslim as the entire Sihah Sitta.',
      correct: 'They are the foremost two of six. Name all six when asked.',
    },
    {
      trap: 'Saying Hasan means fabricated.',
      correct: 'Hasan is good/acceptable. Mawdu is fabricated. Daif is weak.',
    },
    {
      trap: 'Confusing isnad with matn.',
      correct: 'Isnad = chain. Matn = text.',
    },
    {
      trap: 'Claiming every weak Hadith is intentionally forged.',
      correct: 'Daif means weak. Fabrication is a separate, stronger charge (Mawdu).',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Memorise isnad, matn, Sahih, Hasan, Daif.' },
    { day: 'Day 2', task: 'Memorise all six Sihah Sitta names in order.' },
    { day: 'Day 3', task: 'Drill Bukhari and Muslim primacy facts.' },
    { day: 'Day 4', task: 'Write a short note on why Hadith criticism matters.' },
    { day: 'Day 5', task: 'Flashcards until six books are automatic.' },
    { day: 'Day 6', task: 'Practice MCQs on grades and compilers.' },
    { day: 'Day 7', task: 'One-pager only. Recite six books from memory.' },
  ],
  sourcesLine:
    'Sources: standard Sunni Hadith sciences teaching used in FPSC Islamiat (isnad/matn; Sahih/Hasan/Daif; Sihah Sitta). Avoid sectarian disputes and unsourced rankings beyond syllabus framing.',
}
