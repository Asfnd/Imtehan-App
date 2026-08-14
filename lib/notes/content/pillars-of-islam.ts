import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (mainstream FPSC Islamiat teaching):
 * - Five pillars: Shahadah, Salah, Zakat, Sawm, Hajj
 * - Five daily prayers: Fajr 2, Zuhr 4, Asr 4, Maghrib 3, Isha 4 (fard rakahs)
 * - Zakat: commonly taught as 2.5% (1/40) on qualifying wealth above nisab, held for a lunar year
 * - Sawm: Ramadan, from dawn to sunset
 * - Hajj: once in lifetime if able; Umrah is lesser pilgrimage, not a pillar
 * Avoid sectarian disputes on secondary fiqh details
 */
export const PILLARS_OF_ISLAM_KIT: NoteKitData = {
  id: 'pillars-of-islam',
  title: 'Five Pillars of Islam',
  subtitle:
    'Shahadah, Salah, Zakat, Sawm, and Hajj: conditions, rates, prayer counts, and Hajj vs Umrah for MCQ and written.',
  syllabusTags: [
    'Islamic Studies',
    'Ibadat',
    'Pillars of Islam',
    'FPSC Islamiat',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS / PMS Islamiat',
      directive: 'Discuss',
      angle: 'Significance of the Five Pillars in Muslim life and social order',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Explain',
      angle: 'Zakat as worship and economic justice (rate, nisab idea)',
      frequency: 'high',
    },
    {
      year: 'One-paper / MPT',
      directive: 'MCQ fact',
      angle: 'Prayer rakahs, pillars list, Hajj vs Umrah, Ramadan fasting',
      frequency: 'high',
    },
    {
      year: 'PMS / CSS',
      directive: 'Compare',
      angle: 'Hajj and Umrah: obligations, timing, and status',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Five Pillars (Arkan al-Islam): Shahadah, Salah, Zakat, Sawm (Ramadan), Hajj.',
    'Shahadah: testimony that there is no god but Allah and Muhammad (PBUH) is His Messenger. Entry into Islam and foundation of belief.',
    'Salah: five daily obligatory prayers. Standard fard rakahs: Fajr 2, Zuhr 4, Asr 4, Maghrib 3, Isha 4. Facing the Qiblah (Kaaba, Makkah).',
    'Zakat: obligatory alms on qualifying wealth. Classic syllabus teaching: 2.5% (one-fortieth) when wealth reaches nisab and a lunar year (hawl) has passed. Not the same as voluntary charity (sadaqah).',
    'Sawm: fasting in Ramadan from dawn (fajr) to sunset (maghrib). Exempt categories and makeup (qada) or fidya appear in fiqh, but the pillar itself is Ramadan fasting for those able.',
    'Hajj: pilgrimage to Makkah in Dhul-Hijjah, once in a lifetime for those with means and ability. Includes key rites such as Tawaf, Sa`i, Arafat (pillar of Hajj in classic teaching).',
    'Umrah: lesser pilgrimage, can be performed year-round. It is highly recommended but not one of the Five Pillars. Do not call Umrah a pillar.',
  ],
  answerSteps: [
    'Define the Five Pillars as the core acts of worship that structure Muslim belief and practice.',
    'List them in order and give one clear sentence on each pillar.',
    'Add exam detail where marks often sit: Salah rakahs, Zakat 2.5% teaching, Ramadan timing, Hajj once if able.',
    'Distinguish Zakat from sadaqah, and Hajj from Umrah.',
    'Link briefly to social outcomes: discipline (Salah), purification of wealth (Zakat), self-control (Sawm), unity (Hajj).',
    'Close without sectarian debate: stick to syllabus facts, not disputed secondary rulings.',
  ],
  questionVariants: [
    'Discuss the Five Pillars of Islam and their significance in individual and collective life.',
    'Explain Zakat as an institution of worship and economic justice in Islam.',
    'Differentiate between Hajj and Umrah. Why is only Hajj counted among the Pillars?',
    'Write short notes on Salah and Sawm with special reference to their spiritual and social benefits.',
  ],
  citations: [
    {
      label: 'Pillars list',
      text: 'Shahadah, Salah, Zakat, Sawm, Hajj form the Five Pillars in standard Sunni syllabus teaching.',
    },
    {
      label: 'Salah counts',
      text: 'Fard rakahs commonly taught: Fajr 2, Zuhr 4, Asr 4, Maghrib 3, Isha 4.',
    },
    {
      label: 'Zakat rate',
      text: 'Standard teaching for cash and similar qualifying wealth: 2.5% (1/40) above nisab after one lunar year.',
    },
    {
      label: 'Sawm',
      text: 'Obligatory fasting in Ramadan from dawn to sunset for those who meet the conditions.',
    },
    {
      label: 'Hajj vs Umrah',
      text: 'Hajj is a pillar, once in lifetime if able, in Dhul-Hijjah. Umrah is not a pillar.',
    },
  ],
  flashcards: [
    { prompt: 'Name the Five Pillars of Islam.', answer: 'Shahadah, Salah, Zakat, Sawm, Hajj' },
    { prompt: 'What is the Shahadah?', answer: 'Testimony: no god but Allah, and Muhammad (PBUH) is His Messenger' },
    { prompt: 'How many fard rakahs in Fajr?', answer: '2' },
    { prompt: 'How many fard rakahs in Maghrib?', answer: '3' },
    { prompt: 'Fard rakahs of Zuhr, Asr, and Isha?', answer: '4 each' },
    { prompt: 'Standard Zakat rate on qualifying wealth (syllabus teaching)?', answer: '2.5% (one-fortieth)' },
    { prompt: 'What is hawl in Zakat teaching?', answer: 'One lunar year of possession of nisab-level wealth' },
    { prompt: 'When is Sawm obligatory as a pillar?', answer: 'In the month of Ramadan (for those able)' },
    { prompt: 'From when to when does the daily fast run?', answer: 'Dawn (fajr) to sunset (maghrib)' },
    { prompt: 'How often is Hajj obligatory if conditions are met?', answer: 'Once in a lifetime' },
    { prompt: 'In which Islamic month is Hajj performed?', answer: 'Dhul-Hijjah' },
    { prompt: 'Is Umrah one of the Five Pillars?', answer: 'No' },
    { prompt: 'What direction do Muslims face in Salah?', answer: 'Qiblah (Kaaba in Makkah)' },
    { prompt: 'How does Zakat differ from sadaqah?', answer: 'Zakat is obligatory under conditions; sadaqah is voluntary charity' },
    { prompt: 'Name one major standing of Hajj day often tested.', answer: 'Standing at Arafat (Wuquf)' },
  ],
  mistakes: [
    {
      trap: 'Listing Umrah as a Fifth Pillar instead of Hajj, or calling Umrah a pillar.',
      correct: 'The five include Hajj, not Umrah. Umrah is a separate, lesser pilgrimage.',
    },
    {
      trap: 'Writing Maghrib as 4 fard rakahs or Fajr as 4.',
      correct: 'Maghrib is 3 fard; Fajr is 2 fard.',
    },
    {
      trap: 'Confusing Zakat percentage with Ushr rates or inventing a different cash rate.',
      correct: 'Syllabus standard for qualifying wealth (cash etc.): 2.5%. Ushr is a separate agricultural levy topic.',
    },
    {
      trap: 'Treating every charity payment as Zakat.',
      correct: 'Zakat has nisab, hawl, and categories. Voluntary giving is sadaqah.',
    },
    {
      trap: 'Saying Hajj can be done any month like Umrah and still calling that the pillar obligation.',
      correct: 'Hajj rites are in Dhul-Hijjah. Umrah can be year-round.',
    },
    {
      trap: 'Skipping Shahadah and starting the list with Salah.',
      correct: 'Shahadah is the first pillar: belief before the acts of worship.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Memorise the five names in order and one-line meanings.' },
    { day: 'Day 2', task: 'Drill Salah fard rakahs for all five prayers.' },
    { day: 'Day 3', task: 'Revise Zakat 2.5%, nisab idea, and Zakat vs sadaqah.' },
    { day: 'Day 4', task: 'Sawm timing, Ramadan, and Hajj vs Umrah table from memory.' },
    { day: 'Day 5', task: 'Write a 15-minute answer on significance of the Pillars.' },
    { day: 'Day 6', task: 'Flashcards + mistake traps (MCQ speed drill).' },
    { day: 'Day 7', task: 'One-pager only. Recite rakahs and Hajj/Umrah distinction.' },
  ],
  sourcesLine:
    'Sources: Standard FPSC Islamiat syllabus topics on Arkan al-Islam; mainstream textbook teaching on Salah rakahs, Zakat 2.5%, Ramadan fasting, and Hajj. Avoid sectarian fringe rulings and unsourced rate myths.',
}
