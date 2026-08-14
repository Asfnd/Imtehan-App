import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked respectful Seerah facts (mainstream syllabus):
 * - Birth ~570 CE, Year of the Elephant (Aam al-Fil)
 * - Hijra 622 CE, start of Islamic (Hijri) calendar
 * - Badr 2 AH, Uhud 3 AH, Trench (Khandaq/Ahzab) 5 AH
 * - Treaty of Hudaybiyyah 6 AH
 * - Conquest of Makkah 8 AH
 * Tone: respectful; use PBUH; avoid speculative miracles lists as MCQ filler
 */
export const SEERAH_HIGH_YIELD_KIT: NoteKitData = {
  id: 'seerah-high-yield',
  title: 'Seerah High-Yield Facts (Prophet Muhammad PBUH)',
  subtitle:
    'Birth, Hijra, major battles, Hudaybiyyah, and Conquest of Makkah: exam dates and meaning without myth.',
  syllabusTags: [
    'Islamic Studies',
    'Seerah',
    'Life of the Prophet (PBUH)',
    'FPSC Islamiat',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS / PMS Islamiat',
      directive: 'Discuss',
      angle: 'Significance of Hijra in Islamic history',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Evaluate',
      angle: 'Treaty of Hudaybiyyah as a turning point',
      frequency: 'high',
    },
    {
      year: 'One-paper / MPT',
      directive: 'MCQ fact',
      angle: 'Birth year, Hijra 622, Badr, Uhud, Trench, Makkah conquest',
      frequency: 'high',
    },
    {
      year: 'CSS / PMS',
      directive: 'Compare',
      angle: 'Lessons from Badr and Uhud for leadership and discipline',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Prophet Muhammad (PBUH) was born in Makkah about 570 CE, remembered as the Year of the Elephant (Aam al-Fil).',
    'He received first revelation at about age 40. Early Makkan period: preaching Tawhid under pressure and persecution.',
    'Hijra to Madinah: 622 CE. This migration marks the start of the Islamic (Hijri) calendar. Madinah became the base of the Muslim community-state.',
    'Battle of Badr (2 AH): first major battle. Muslims were fewer in number; victory strengthened the community and is a high-yield exam event.',
    'Battle of Uhud (3 AH): fought near Madinah. Early advantage was lost when some archers left their post. Classic lesson: obedience and discipline matter.',
    'Battle of the Trench / Ahzab / Khandaq (5 AH): coalition siege of Madinah; trench defence (associated with Salman al-Farsi`s counsel in standard teaching). Siege failed.',
    'Treaty of Hudaybiyyah (6 AH): agreement with Quraysh. Terms looked hard at first, but it opened a period of peaceful outreach and is called a clear victory in Quranic reference (Surah Al-Fath) in classic teaching.',
    'Conquest of Makkah (8 AH): largely peaceful entry after Quraysh violated related commitments. General amnesty spirit is a major Seerah theme. Kaaba cleared of idols.',
  ],
  answerSteps: [
    'Begin with a respectful one-line identity of the Prophet (PBUH) and the purpose of Seerah study.',
    'Place birth (~570 CE, Year of Elephant) and Hijra (622 CE) as timeline anchors.',
    'Narrate Madinan struggles through Badr, Uhud, and the Trench with one lesson each.',
    'Explain Hudaybiyyah: short-term difficulty, long-term strategic gain.',
    'Describe Conquest of Makkah with emphasis on restraint and amnesty, not triumphal cruelty.',
    'Close with exam takeaway: Seerah teaches faith, patience, strategy, and ethical leadership.',
  ],
  questionVariants: [
    'Discuss the significance of the Hijra of the Prophet (PBUH).',
    'Evaluate the Treaty of Hudaybiyyah as a landmark in Seerah.',
    'Compare the battles of Badr and Uhud and the lessons they offer.',
    'Write short notes on the Battle of the Trench and the Conquest of Makkah.',
  ],
  citations: [
    {
      label: 'Birth',
      text: 'Born in Makkah about 570 CE, Year of the Elephant.',
    },
    {
      label: 'Hijra',
      text: 'Migration to Madinah in 622 CE; start of the Hijri calendar.',
    },
    {
      label: 'Major battles',
      text: 'Badr 2 AH, Uhud 3 AH, Trench (Khandaq/Ahzab) 5 AH.',
    },
    {
      label: 'Hudaybiyyah',
      text: 'Treaty with Quraysh in 6 AH; later seen as strategically decisive.',
    },
    {
      label: 'Conquest of Makkah',
      text: '8 AH; largely peaceful conquest with a strong amnesty theme in standard Seerah.',
    },
  ],
  flashcards: [
    { prompt: 'Approximate birth year of the Prophet (PBUH)?', answer: 'About 570 CE' },
    { prompt: 'What is Aam al-Fil?', answer: 'Year of the Elephant, linked with the Prophet`s birth year in tradition' },
    { prompt: 'In which city was he born?', answer: 'Makkah' },
    { prompt: 'When did Hijra to Madinah take place (CE)?', answer: '622 CE' },
    { prompt: 'What calendar begins with Hijra?', answer: 'Islamic / Hijri calendar' },
    { prompt: 'Battle of Badr: which AH year?', answer: '2 AH' },
    { prompt: 'Battle of Uhud: which AH year?', answer: '3 AH' },
    { prompt: 'Battle of the Trench: which AH year?', answer: '5 AH' },
    { prompt: 'Another name for the Battle of the Trench?', answer: 'Ahzab or Khandaq' },
    { prompt: 'Treaty of Hudaybiyyah: which AH year?', answer: '6 AH' },
    { prompt: 'Conquest of Makkah: which AH year?', answer: '8 AH' },
    { prompt: 'Key Uhud lesson often tested?', answer: 'Discipline and obedience (archers leaving their post)' },
    { prompt: 'Why is Hudaybiyyah called a victory in classic teaching?', answer: 'It opened peaceful expansion and later strategic advantage despite hard terms' },
    { prompt: 'Where did the Prophet (PBUH) migrate to in 622 CE?', answer: 'Madinah (Yathrib)' },
    { prompt: 'Tone of the Conquest of Makkah in standard Seerah?', answer: 'Largely peaceful entry with general amnesty emphasis' },
  ],
  mistakes: [
    {
      trap: 'Dating Hijra to 610 CE or confusing it with first revelation.',
      correct: 'First revelation about age 40 in Makkah; Hijra is 622 CE.',
    },
    {
      trap: 'Swapping Badr and Uhud results or years.',
      correct: 'Badr 2 AH (major early victory). Uhud 3 AH (setback linked to indiscipline).',
    },
    {
      trap: 'Calling Hudaybiyyah a military defeat only and stopping there.',
      correct: 'Terms looked harsh, but strategically it was a turning point toward later success.',
    },
    {
      trap: 'Describing Conquest of Makkah as mass slaughter.',
      correct: 'Standard Seerah stresses largely peaceful conquest and amnesty.',
    },
    {
      trap: 'Writing birth as exactly 571 or 569 as the only possible year without the ~570 / Year of Elephant framing.',
      correct: 'Exams accept about 570 CE / Year of the Elephant as the high-yield answer.',
    },
    {
      trap: 'Mixing CE years and AH years carelessly (e.g. Badr in 622).',
      correct: '622 CE is Hijra. Badr is 2 AH, after settlement in Madinah.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Timeline anchors: ~570 birth, 622 Hijra.' },
    { day: 'Day 2', task: 'Memorise Badr 2, Uhud 3, Trench 5 AH with one lesson each.' },
    { day: 'Day 3', task: 'Hudaybiyyah 6 AH: terms vs long-term gain.' },
    { day: 'Day 4', task: 'Conquest of Makkah 8 AH and amnesty theme.' },
    { day: 'Day 5', task: 'Write a Hijra or Hudaybiyyah discuss answer.' },
    { day: 'Day 6', task: 'Flashcards + date-trap MCQs.' },
    { day: 'Day 7', task: 'One-pager only. Recite full AH sequence from memory.' },
  ],
  sourcesLine:
    'Sources: Standard Seerah syllabus teaching used in FPSC Islamiat; mainstream Prophetic biography timelines for Hijra, Badr, Uhud, Trench, Hudaybiyyah, and Conquest of Makkah. Keep tone respectful; avoid sensational unsourced claims.',
}
