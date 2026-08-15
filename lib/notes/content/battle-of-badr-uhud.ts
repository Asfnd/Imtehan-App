import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (mainstream Seerah MCQ teaching):
 * - Badr: 2 AH / 624 CE; Muslims ~313; Quraysh larger force; victory; key captives/ransom themes
 * - Uhud: 3 AH / 625 CE; archers leaving post; Muslim setback; Hamza (RA) martyred
 * - Deep battle facts for exams; avoid inventing exact disputed casualty tables as absolute certainty
 * - Respectful framing throughout
 */
export const BATTLE_OF_BADR_UHUD_KIT: NoteKitData = {
  id: 'battle-of-badr-uhud',
  title: 'Battles of Badr and Uhud (Seerah Deep Facts)',
  subtitle:
    'Dates, forces, causes, turning points, and MCQ traps for Badr and Uhud without invented casualty myths.',
  syllabusTags: [
    'Seerah',
    'Battle of Badr',
    'Battle of Uhud',
    'Islamiat MCQ',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS / PMS Islamiat',
      directive: 'Discuss',
      angle: 'Significance of the Battle of Badr',
      frequency: 'high',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'Year, Muslim numbers at Badr, archers at Uhud',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Examine',
      angle: 'Causes and lessons of Uhud',
      frequency: 'high',
    },
    {
      year: 'Islamiat',
      directive: 'Compare',
      angle: 'Badr victory vs Uhud setback for early Madinan community',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Badr (2 AH / 624 CE): first major pitched battle between Muslims of Madinah and Quraysh of Makkah. Classic MCQ number: about 313 Muslim fighters against a larger Quraysh force (often taught around 1,000).',
    'Badr cause cluster: interception of a Quraysh caravan (Abu Sufyan) escalated into battle near the wells of Badr. Outcome: clear Muslim victory. High-yield names: Abu Jahl killed; many Quraysh leaders defeated; captives treated with ransom / teaching options in Seerah narratives.',
    'Significance of Badr: morale, legitimacy of the Madinan community, Quranic remembrance as a day of distinction (Furqan themes in teaching), and proof of discipline and faith under the Prophet's (PBUH) leadership.',
    'Uhud (3 AH / 625 CE): fought near Mount Uhud outside Madinah. Quraysh sought revenge after Badr. Muslims initially pressed forward; a critical error came when many archers left their assigned post on the hill, contrary to the Prophet's (PBUH) orders.',
    'Uhud turning point: Khalid ibn al-Walid (then still with Quraysh) exploited the vacated archers' position with a flanking move. Muslims suffered heavy loss and confusion. Hamza ibn Abd al-Muttalib (RA) was martyred. The Prophet (PBUH) was injured.',
    'Lesson cluster for exams: obedience to command, danger of premature pursuit of spoils, patience after setback, and that Uhud was a hard trial, not the end of the mission. Do not invent exact death totals as if every textbook agrees on one number.',
  ],
  answerSteps: [
    'Separate the two battles by year: Badr 2 AH, Uhud 3 AH.',
    'For Badr: cause, ~313 Muslims, victory, significance.',
    'For Uhud: revenge motive, archers' post, flanking, setback, Hamza (RA).',
    'State one clear lesson from each battle.',
    'Close by linking both to leadership, discipline, and community resilience.',
  ],
  questionVariants: [
    'Discuss the significance of the Battle of Badr in early Islamic history.',
    'Examine the causes of the Muslim setback at Uhud.',
    'Compare the Battles of Badr and Uhud with special reference to discipline.',
    'State the year (AH) and approximate Muslim strength at Badr.',
  ],
  citations: [
    {
      label: 'Badr dating',
      text: 'Battle of Badr: 2 AH (624 CE).',
    },
    {
      label: 'Badr force',
      text: 'Muslim force commonly taught as about 313 against a larger Quraysh army.',
    },
    {
      label: 'Uhud dating',
      text: 'Battle of Uhud: 3 AH (625 CE).',
    },
    {
      label: 'Uhud turning point',
      text: 'Many archers left their assigned hill post; Quraysh cavalry under Khalid ibn al-Walid exploited the gap.',
    },
    {
      label: 'Martyr',
      text: 'Hamza (RA) was martyred at Uhud; the Prophet (PBUH) was wounded.',
    },
  ],
  flashcards: [
    { prompt: 'In which Hijri year was Badr fought?', answer: '2 AH' },
    { prompt: 'In which CE year is Badr usually dated?', answer: '624 CE' },
    { prompt: 'Approximate Muslim strength at Badr?', answer: 'About 313' },
    { prompt: 'Outcome of Badr?', answer: 'Muslim victory' },
    { prompt: 'In which Hijri year was Uhud fought?', answer: '3 AH' },
    { prompt: 'What order did many archers disobey at Uhud?', answer: 'They left their assigned post on the hill' },
    { prompt: 'Who led the Quraysh flanking move at Uhud (then not yet Muslim)?', answer: 'Khalid ibn al-Walid' },
    { prompt: 'Which uncle of the Prophet (PBUH) was martyred at Uhud?', answer: 'Hamza (RA)' },
    { prompt: 'Was the Prophet (PBUH) injured at Uhud?', answer: 'Yes' },
    { prompt: 'Name one exam lesson from Uhud.', answer: 'Obedience to command / avoid premature pursuit of spoils' },
  ],
  mistakes: [
    {
      trap: 'Swapping Badr and Uhud years (saying Uhud was 2 AH).',
      correct: 'Badr = 2 AH. Uhud = 3 AH.',
    },
    {
      trap: 'Saying Muslims were defeated at Badr.',
      correct: 'Badr was a Muslim victory. Uhud was the major setback.',
    },
    {
      trap: 'Blaming only numbers and ignoring the archers' post.',
      correct: 'The archers leaving their assigned position is the classic tactical turning point in exam keys.',
    },
    {
      trap: 'Treating Khalid as a Muslim commander at Uhud.',
      correct: 'At Uhud he fought with Quraysh. He embraced Islam later.',
    },
    {
      trap: 'Inventing one "official" casualty table for every MCQ key.',
      correct: 'Prefer year, ~313 at Badr, archers, Hamza (RA), and lessons over disputed exact counts.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Memorise Badr: 2 AH, ~313, victory, significance.' },
    { day: 'Day 2', task: 'Memorise Uhud: 3 AH, archers, Khalid flank, Hamza (RA).' },
    { day: 'Day 3', task: 'Write a compare outline: Badr vs Uhud.' },
    { day: 'Day 4', task: 'Drill flashcards twice.' },
    { day: 'Day 5', task: '10-minute essay on lessons of Uhud.' },
    { day: 'Day 6', task: 'MCQ self-test on years and numbers.' },
    { day: 'Day 7', task: 'One-pager only. Recite both battles from memory.' },
  ],
  sourcesLine:
    'Sources: mainstream Seerah chronologies (2 AH Badr, 3 AH Uhud); standard Islamiat textbooks on Maghazi. Prefer stable syllabus facts over contested casualty WhatsApp lists.',
}
