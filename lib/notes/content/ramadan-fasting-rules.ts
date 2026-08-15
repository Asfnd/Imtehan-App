import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (mainstream teaching for exams):
 * - Sawm (fasting) in Ramadan is a pillar of Islam
 * - Conditions themes: Islam, puberty/maturity, sanity, ability/health; intention (niyyah)
 * - Exemptions/concessions commonly taught: illness, travel, menstruation/post-natal bleeding, pregnancy/breastfeeding where harm feared (with qada/fidya themes as per mainstream notes), old age/chronic inability with fidya in many summaries
 * - What breaks the fast in MCQ teaching: deliberate eating/drinking, etc.; avoid fringe debates
 */
export const RAMADAN_FASTING_RULES_KIT: NoteKitData = {
  id: 'ramadan-fasting-rules',
  title: 'Ramadan Fasting Rules (Sawm)',
  subtitle:
    'Conditions, exemptions, what invalidates the fast, and high-yield MCQ points for Islamic Studies.',
  syllabusTags: [
    'Sawm',
    'Ramadan',
    'Ibadat',
    'Islamic Studies',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'Who must fast; exemptions; what breaks the fast',
      frequency: 'high',
    },
    {
      year: 'CSS / PMS',
      directive: 'Discuss',
      angle: 'Significance of Sawm and its rules',
      frequency: 'medium',
    },
    {
      year: 'Islamic Studies',
      directive: 'Explain',
      angle: 'Rulings for the traveller and the sick',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Outline',
      angle: 'Conditions of obligation and qada/fidya themes',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Sawm in Ramadan: abstaining from food, drink, and marital relations from true dawn (Fajr) to sunset (Maghrib), with intention, as a pillar of Islam.',
    'Who is obliged (mainstream exam list): adult (baligh), sane Muslim who is physically able; intention (niyyah) is required in standard teaching.',
    'Common exemptions / concessions: illness; travelling; menstruation and post-natal bleeding; pregnancy or breastfeeding where fasting harms mother or child (as taught); permanent inability (e.g. chronic illness/old age) often linked to fidya in notes.',
    'Qada: making up missed fasts later. Fidya: feeding a needy person in lieu where permanent inability applies in mainstream summaries.',
    'What invalidates the fast (high-yield deliberate acts): eating or drinking deliberately; marital relations during fasting hours; and other listed invalidators in the syllabus notes. Forgetfulness is treated more leniently in many mainstream MCQ keys (do not invent fringe exceptions).',
    'Suhoor (pre-dawn meal) and Iftar (breaking fast) are sunnah practices strongly associated with Ramadan discipline.',
    'Spiritual aims: taqwa, self-control, empathy with the poor, gratitude, and Qur’an engagement. Pair ethics with rules in essay answers.',
    'Exam caution: state mainstream school-shared points. If a paper asks a madhhab-specific detail, answer carefully; otherwise avoid contested hair-splitting.',
  ],
  answerSteps: [
    'Define Sawm with timing (dawn to sunset) and niyyah.',
    'List who must fast and main conditions.',
    'Explain exemptions with qada vs fidya.',
    'State major invalidators for MCQ clarity.',
    'Close with spiritual and social wisdom of Ramadan.',
  ],
  questionVariants: [
    'Explain the conditions and exemptions related to fasting in Ramadan.',
    'Who is obliged to fast, and what breaks the fast? Outline.',
    'Discuss the significance of Sawm as a pillar of Islam.',
    'Differentiate qada and fidya in the context of missed fasts.',
  ],
  citations: [
    {
      label: 'Definition',
      text: 'Abstaining from food, drink, and marital relations from dawn to sunset with intention in Ramadan.',
    },
    {
      label: 'Obligation themes',
      text: 'Adult, sane, able Muslim; niyyah required in standard teaching.',
    },
    {
      label: 'Exemptions',
      text: 'Illness, travel, menstruation/post-natal bleeding, pregnancy/breastfeeding where harm feared; permanent inability with fidya themes.',
    },
    {
      label: 'Qada vs fidya',
      text: 'Qada = make up later; fidya = compensation by feeding the needy where permanent inability applies in mainstream notes.',
    },
  ],
  flashcards: [
    {
      prompt: 'From when to when does the daily fast run?',
      answer: 'From true dawn (Fajr) to sunset (Maghrib)',
    },
    {
      prompt: 'Name three groups commonly exempted or given concession.',
      answer: 'Sick, traveller, menstruating woman (also pregnancy/breastfeeding where harm feared)',
    },
    {
      prompt: 'What is qada?',
      answer: 'Making up a missed fast later',
    },
    {
      prompt: 'What is fidya in fasting notes?',
      answer: 'Feeding a needy person in compensation (permanent inability themes)',
    },
    {
      prompt: 'Name two acts that invalidate a fast when deliberate.',
      answer: 'Eating/drinking; marital relations during fasting hours',
    },
    {
      prompt: 'What is Suhoor?',
      answer: 'Pre-dawn meal before the fast begins',
    },
    {
      prompt: 'What is Iftar?',
      answer: 'Meal/time of breaking the fast at sunset',
    },
    {
      prompt: 'Is Sawm a pillar of Islam?',
      answer: 'Yes',
    },
    {
      prompt: 'Why is niyyah mentioned in fasting MCQs?',
      answer: 'Intention is required in standard teaching of a valid fast',
    },
    {
      prompt: 'Main spiritual aim often cited?',
      answer: 'Taqwa / God-consciousness and self-discipline',
    },
  ],
  mistakes: [
    {
      trap: 'Saying travellers can never make up fasts.',
      correct: 'Travel is a concession; missed fasts are typically made up (qada) later.',
    },
    {
      trap: 'Confusing qada with fidya.',
      correct: 'Qada = make up; fidya = compensation feeding where permanent inability applies.',
    },
    {
      trap: 'Claiming menstruation does not affect fasting obligation in mainstream notes.',
      correct: 'Menstruating women do not fast those days and make up later in standard teaching.',
    },
    {
      trap: 'Listing only ethics and forgetting legal conditions in an ibadat answer.',
      correct: 'Pair spiritual aims with conditions, exemptions, and invalidators.',
    },
    {
      trap: 'Teaching fringe disputed cases as the only MCQ key.',
      correct: 'Stick to mainstream shared rulings unless the paper specifies a school.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Define Sawm, timing, and niyyah.' },
    { day: 'Day 2', task: 'Memorise who must fast and exemptions.' },
    { day: 'Day 3', task: 'Drill qada vs fidya and invalidators.' },
    { day: 'Day 4', task: 'Flashcards and MCQs.' },
    { day: 'Day 5', task: 'Write a short rules outline answer.' },
    { day: 'Day 6', task: 'One-pager + spiritual aims paragraph.' },
    { day: 'Day 7', task: 'Recite conditions and exemptions from memory.' },
  ],
  sourcesLine:
    'Sources: mainstream Islamic Studies chapters on Sawm/Ramadan; CSS/PMS ibadat MCQ lists for conditions, exemptions, qada, and fidya. Avoid presenting disputed fringe opinions as universal keys.',
}
