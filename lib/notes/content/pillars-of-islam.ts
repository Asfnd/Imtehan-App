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
    'Shahadah: no god but Allah; Muhammad (PBUH) is His Messenger. Entry into Islam.',
    'Salah: five daily fard prayers. Rakahs: Fajr 2, Zuhr 4, Asr 4, Maghrib 3, Isha 4. Face Qiblah (Kaaba, Makkah).',
    'Zakat: obligatory alms. Syllabus rate: 2.5% (1/40) on qualifying wealth above nisab after one lunar year (hawl). Not sadaqah.',
    'Sawm: Ramadan fast from dawn (fajr) to sunset (maghrib) for those able.',
    'Hajj: once in a lifetime if able; in Dhul-Hijjah. Key rite often tested: Wuquf at Arafat.',
    'Umrah: lesser pilgrimage, year-round. Highly recommended. Not a Fifth Pillar.',
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
    { prompt: 'Name the Five Pillars in order.', answer: 'Shahadah, Salah, Zakat, Sawm, Hajj' },
    { prompt: 'Shahadah content?', answer: 'No god but Allah; Muhammad (PBUH) is His Messenger' },
    { prompt: 'Fajr fard rakahs?', answer: '2' },
    { prompt: 'Maghrib fard rakahs?', answer: '3' },
    { prompt: 'Zuhr, Asr, Isha fard rakahs?', answer: '4 each' },
    { prompt: 'Standard Zakat rate (cash/qualifying wealth)?', answer: '2.5% (one-fortieth)' },
    { prompt: 'What is hawl?', answer: 'One lunar year of nisab-level wealth possession' },
    { prompt: 'Sawm month?', answer: 'Ramadan' },
    { prompt: 'Daily fast window?', answer: 'Dawn (fajr) to sunset (maghrib)' },
    { prompt: 'Hajj frequency if able?', answer: 'Once in a lifetime' },
    { prompt: 'Hajj month?', answer: 'Dhul-Hijjah' },
    { prompt: 'Is Umrah a pillar?', answer: 'No' },
    { prompt: 'Qiblah direction?', answer: 'Kaaba in Makkah' },
    { prompt: 'Zakat vs sadaqah?', answer: 'Zakat obligatory under conditions; sadaqah voluntary' },
    { prompt: 'Major Hajj standing often tested?', answer: 'Wuquf at Arafat' },
  ],
  mistakes: [
    {
      trap: 'Listing Umrah as a pillar instead of Hajj.',
      correct: 'Five include Hajj. Umrah is a separate lesser pilgrimage.',
    },
    {
      trap: 'Maghrib as 4 fard or Fajr as 4.',
      correct: 'Maghrib 3 fard; Fajr 2 fard.',
    },
    {
      trap: 'Using Ushr rates as the cash Zakat percentage.',
      correct: 'Syllabus cash/qualifying wealth rate: 2.5%. Ushr is a separate agricultural levy.',
    },
    {
      trap: 'Calling every charity payment Zakat.',
      correct: 'Zakat needs nisab, hawl, and categories. Voluntary giving is sadaqah.',
    },
    {
      trap: 'Saying Hajj can be done any month like Umrah.',
      correct: 'Hajj rites are in Dhul-Hijjah. Umrah can be year-round.',
    },
    {
      trap: 'Starting the pillar list with Salah and skipping Shahadah.',
      correct: 'Shahadah is first: belief before the acts of worship.',
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
