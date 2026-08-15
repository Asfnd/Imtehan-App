import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked high-yield Arabic terms for Islamiat MCQs:
 * - Tawhid: oneness of Allah
 * - Shirk: associating partners with Allah
 * - Iman: faith; Islam: submission; Ihsan: excellence in worship (Hadith Jibril triad often taught)
 * - Ijtihad: independent juristic reasoning; Ijma: consensus; Qiyas: analogical reasoning
 * - Fiqh: Islamic jurisprudence; Usul al-Fiqh: principles of jurisprudence
 * - Sunnah: Prophetic practice; Hadith: report of Prophetic sayings/acts
 * - Zakat, Sawm, Salah, Hajj: pillars vocabulary
 * - Taqwa: God-consciousness; Tawba: repentance; Risalah: prophethood; Akhirah: hereafter
 * Keep definitions exam-safe and non-sectarian; avoid inventing rare technical senses as the only meaning
 */
export const ARABIC_TERMS_ISLAMAT_MCQ_KIT: NoteKitData = {
  id: 'arabic-terms-islamiat-mcq',
  title: 'Arabic Terms for Islamiat MCQs',
  subtitle:
    'High-yield creed, law, and worship vocabulary: tawhid, shirk, ijtihad, ijma, qiyas, and related exam terms.',
  syllabusTags: [
    'Islamiat',
    'Arabic terms',
    'Tawhid',
    'Ijtihad',
    'Fiqh',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'One-paper / MPT',
      directive: 'MCQ fact',
      angle: 'Definitions of tawhid, shirk, ijtihad, ijma, qiyas',
      frequency: 'high',
    },
    {
      year: 'CSS Islamiat',
      directive: 'Discuss',
      angle: 'Ijtihad and sources of Islamic law vocabulary',
      frequency: 'high',
    },
    {
      year: 'CSS / PMS',
      directive: 'Explain',
      angle: 'Key Arabic terms in Islamic creed and jurisprudence',
      frequency: 'medium',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'Iman, Islam, Ihsan; Taqwa; Sunnah vs Hadith',
      frequency: 'high',
    },
  ],
  onePager: [
    'Tawhid: absolute oneness and uniqueness of Allah. Shirk: associating partners with Allah. These are core creed MCQ poles.',
    'Iman (faith), Islam (submission), and Ihsan (excellence in worship) appear together in Hadith Jibril teaching as layered religious vocabulary.',
    'Risalah: prophethood/message. Akhirah: hereafter. Taqwa: God-consciousness or piety. Tawba: repentance.',
    'Sunnah: Prophetic practice and normative example. Hadith: narrated report of what the Prophet said, did, or approved.',
    'Fiqh: Islamic jurisprudence (human understanding of rulings). Usul al-Fiqh: principles and methods of deriving rulings.',
    'Ijma: consensus of qualified scholars (classical teaching). Qiyas: analogical reasoning from a known ruling to a new case.',
    'Ijtihad: effort of a qualified jurist to derive a ruling where texts need interpretive labour. Muqallid follows; Mujtahid performs ijtihad (name-level).',
    'Worship vocabulary: Salah (prayer), Zakat (alms), Sawm (fasting), Hajj (pilgrimage). Jihad: struggle in the path of Allah (do not reduce only to warfare in exam definitions).',
    'Answer/MCQ close: precise one-line definitions beat vague essays. Keep Sunnah/Hadith and Ijtihad/Ijma/Qiyas distinctions clean.',
  ],
  answerSteps: [
    'Open with creed pair: tawhid vs shirk.',
    'Add Iman/Islam/Ihsan and hereafter vocabulary.',
    'Distinguish Sunnah and Hadith.',
    'Map fiqh toolkit: ijma, qiyas, ijtihad.',
    'List pillar terms cleanly.',
    'Close with two classic MCQ traps (Sunnah/Hadith; ijtihad vs revelation).',
  ],
  questionVariants: [
    'Explain the meaning of tawhid and shirk.',
    'Distinguish ijtihad, ijma, and qiyas.',
    'Clarify the difference between Sunnah and Hadith.',
    'Define key Arabic terms frequently asked in Islamiat MCQs.',
  ],
  citations: [
    {
      label: 'Creed poles',
      text: 'Tawhid is oneness of Allah. Shirk is associating partners with Allah.',
    },
    {
      label: 'Hadith Jibril triad',
      text: 'Iman, Islam, and Ihsan are taught together as layered definitions of faith, submission, and excellence.',
    },
    {
      label: 'Sunnah vs Hadith',
      text: 'Sunnah is Prophetic normative practice. Hadith is the reported narration of Prophetic sayings, acts, or approvals.',
    },
    {
      label: 'Usul toolkit',
      text: 'Ijma (consensus), Qiyas (analogy), and Ijtihad (juristic effort) are high-yield usul and fiqh terms.',
    },
    {
      label: 'Fiqh',
      text: 'Fiqh is jurisprudence; Usul al-Fiqh is the methodology of deriving rulings.',
    },
  ],
  flashcards: [
    { prompt: 'Tawhid?', answer: 'Oneness and uniqueness of Allah' },
    { prompt: 'Shirk?', answer: 'Associating partners with Allah' },
    { prompt: 'Iman / Islam / Ihsan?', answer: 'Faith / submission / excellence in worship' },
    { prompt: 'Sunnah?', answer: 'Prophetic practice and normative example' },
    { prompt: 'Hadith?', answer: 'Narrated report of Prophetic sayings, acts, or approvals' },
    { prompt: 'Ijtihad?', answer: 'Qualified juristic effort to derive a ruling through interpretive labour' },
    { prompt: 'Ijma?', answer: 'Consensus of qualified scholars (classical teaching)' },
    { prompt: 'Qiyas?', answer: 'Analogical reasoning from a known case to a new case' },
    { prompt: 'Fiqh vs Usul al-Fiqh?', answer: 'Fiqh = jurisprudence; Usul = principles/methods of deriving rulings' },
    { prompt: 'Taqwa?', answer: 'God-consciousness / piety' },
    { prompt: 'Risalah and Akhirah?', answer: 'Prophethood (message) and the hereafter' },
    {
      prompt: 'Salah, Zakat, Sawm, Hajj?',
      answer: 'Prayer, alms, fasting, pilgrimage',
    },
  ],
  mistakes: [
    {
      trap: 'Treating Sunnah and Hadith as identical words.',
      correct: 'Hadith narrates; Sunnah is the normative Prophetic practice those reports help establish.',
    },
    {
      trap: 'Calling ijtihad a new revelation.',
      correct: 'Ijtihad is human juristic effort within the sources, not wahy.',
    },
    {
      trap: 'Defining jihad only as war in every MCQ.',
      correct: 'Primary sense is struggle in Allah path; warfare is one contested application, not the sole dictionary line.',
    },
    {
      trap: 'Confusing ijma with qiyas.',
      correct: 'Ijma is consensus; qiyas is analogy.',
    },
    {
      trap: 'Writing shirk as ordinary sin without partnership with Allah.',
      correct: 'Shirk specifically means associating partners with Allah.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Tawhid, shirk, iman, islam, ihsan.' },
    { day: 'Day 2', task: 'Sunnah vs Hadith drill.' },
    { day: 'Day 3', task: 'Ijtihad, ijma, qiyas, fiqh.' },
    { day: 'Day 4', task: 'Flashcards full set.' },
    { day: 'Day 5', task: 'Pillars vocabulary + taqwa/tawba.' },
    { day: 'Day 6', task: 'Mixed MCQ self-test.' },
    { day: 'Day 7', task: 'Recite one-pager definitions.' },
  ],
  sourcesLine:
    'Sources: standard Islamiat primers on creed and usul vocabulary, Hadith Jibril teaching, and FPSC-style Arabic-term MCQ lists. Keep definitions mainstream and non-sectarian.',
}
