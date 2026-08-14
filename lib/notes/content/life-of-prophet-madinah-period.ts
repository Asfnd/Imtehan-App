import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked respectful Seerah facts (mainstream syllabus):
 * - Hijra 622 CE; Madinah community-state
 * - Charter / Constitution of Madinah: multi-community agreement concept
 * - Battle order: Badr 2 AH, Uhud 3 AH, Trench (Khandaq/Ahzab) 5 AH
 * - Hudaybiyyah 6 AH; Conquest of Makkah 8 AH
 * - Farewell sermon themes: equality, sanctity of life/property, end of usury themes, women's rights framing
 * Tone: respectful; accurate battle order; no inflated casualty myths
 */
export const LIFE_OF_PROPHET_MADINAH_PERIOD_KIT: NoteKitData = {
  id: 'life-of-prophet-madinah-period',
  title: 'Seerah Madinah Period',
  subtitle:
    'Charter of Madinah, Badr Uhud Trench, Hudaybiyyah, Conquest of Makkah, and farewell sermon themes in correct order.',
  syllabusTags: [
    'Islamic Studies',
    'Seerah',
    'Madinah period',
    'FPSC Islamiat',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS / PMS Islamiat',
      directive: 'Discuss',
      angle: 'State and society of Madinah under the Prophet (PBUH)',
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
      angle: 'Badr 2 AH, Uhud 3 AH, Trench 5 AH, Hudaybiyyah 6 AH, Makkah 8 AH',
      frequency: 'high',
    },
    {
      year: 'CSS / PMS',
      directive: 'Explain',
      angle: 'Themes of the Farewell Sermon',
      frequency: 'high',
    },
  ],
  onePager: [
    'After Hijra (622 CE), Madinah became the base of the Muslim community-state. Muhajirun and Ansar formed the core brotherhood.',
    'Charter of Madinah (Constitution of Madinah): a written agreement concept binding Muslims and other local communities into one civic order with mutual duties and security. Exam focus: pluralism and rule-based coexistence, not modern constitution myth-making.',
    'Battle of Badr (2 AH): first major battle. Muslims fewer in number; victory strengthened the community.',
    'Battle of Uhud (3 AH): near Madinah. Early advantage lost when some archers left their post. Lesson: discipline and obedience.',
    'Battle of the Trench / Ahzab / Khandaq (5 AH): coalition siege; trench defence (linked with Salman al-Farsi in standard teaching). Siege failed.',
    'Treaty of Hudaybiyyah (6 AH): agreement with Quraysh. Terms looked hard at first; later opened peaceful outreach. Linked with Surah Al-Fath in classic teaching.',
    'Conquest of Makkah (8 AH): largely peaceful entry after related commitments were broken. Strong amnesty theme. Kaaba cleared of idols.',
    'Farewell Sermon (Hajjat al-Wada): sanctity of life and property, equality of believers, end of jahiliya pride, justice, and dignified treatment of women in standard syllabus themes.',
  ],
  answerSteps: [
    'Begin with Hijra and the need for a secure community in Madinah.',
    'Explain the Charter of Madinah as a multi-community civic pact.',
    'Narrate battles in order: Badr, Uhud, Trench, with one lesson each.',
    'Evaluate Hudaybiyyah: short-term hardness, long-term gain.',
    'Describe Conquest of Makkah with restraint and amnesty.',
    'Close with Farewell Sermon themes as an ethical charter for the ummah.',
  ],
  questionVariants: [
    'Discuss the significance of the Charter of Madinah.',
    'Compare the battles of Badr and Uhud and the lessons they offer.',
    'Evaluate the Treaty of Hudaybiyyah as a landmark in Seerah.',
    'Explain the main themes of the Farewell Sermon of the Prophet (PBUH).',
  ],
  citations: [
    {
      label: 'Madinah base',
      text: 'Hijra 622 CE established Madinah as the centre of the Muslim community-state.',
    },
    {
      label: 'Charter concept',
      text: 'Charter of Madinah: agreement for coexistence and mutual security among communities of the city.',
    },
    {
      label: 'Battle order',
      text: 'Badr 2 AH, Uhud 3 AH, Trench (Khandaq/Ahzab) 5 AH.',
    },
    {
      label: 'Hudaybiyyah and Makkah',
      text: 'Hudaybiyyah 6 AH; Conquest of Makkah 8 AH.',
    },
    {
      label: 'Farewell Sermon',
      text: 'Themes include sanctity of life and property, equality, justice, and dignified treatment of women in standard teaching.',
    },
  ],
  flashcards: [
    { prompt: 'When was Hijra (CE)?', answer: '622 CE' },
    { prompt: 'Who were the Muhajirun?', answer: 'Muslims who migrated from Makkah' },
    { prompt: 'Who were the Ansar?', answer: 'Helpers of Madinah who supported the migrants' },
    { prompt: 'What is the Charter of Madinah in exam terms?', answer: 'A civic agreement for coexistence and mutual security' },
    { prompt: 'Battle of Badr: which AH?', answer: '2 AH' },
    { prompt: 'Battle of Uhud: which AH?', answer: '3 AH' },
    { prompt: 'Key lesson often drawn from Uhud?', answer: 'Obedience and discipline (archers leaving post)' },
    { prompt: 'Battle of the Trench: which AH?', answer: '5 AH' },
    { prompt: 'Other names for the Battle of the Trench?', answer: 'Khandaq or Ahzab' },
    { prompt: 'Whose counsel is linked with the trench idea in standard teaching?', answer: 'Salman al-Farsi' },
    { prompt: 'Treaty of Hudaybiyyah: which AH?', answer: '6 AH' },
    { prompt: 'Why is Hudaybiyyah called a turning point?', answer: 'Hard terms at first, but opened a period of peaceful outreach' },
    { prompt: 'Conquest of Makkah: which AH?', answer: '8 AH' },
    { prompt: 'Tone of Conquest of Makkah in standard Seerah?', answer: 'Largely peaceful with amnesty theme' },
    { prompt: 'Name one Farewell Sermon theme.', answer: 'Equality / sanctity of life and property / justice / women`s dignity' },
    { prompt: 'Correct battle order before Hudaybiyyah?', answer: 'Badr, then Uhud, then Trench' },
  ],
  mistakes: [
    {
      trap: 'Wrong battle order (Uhud before Badr, or Trench before Uhud).',
      correct: 'Badr 2 AH, Uhud 3 AH, Trench 5 AH.',
    },
    {
      trap: 'Dating Conquest of Makkah as 6 AH.',
      correct: 'Hudaybiyyah is 6 AH. Conquest of Makkah is 8 AH.',
    },
    {
      trap: 'Calling the Charter of Madinah a modern Western constitution copy.',
      correct: 'Describe it as a civic pact for coexistence and security in its own historical setting.',
    },
    {
      trap: 'Portraying Conquest of Makkah as revenge slaughter.',
      correct: 'Standard Seerah stress is restraint and general amnesty.',
    },
    {
      trap: 'Mixing Makkah-period events into Madinah timeline.',
      correct: 'First revelation and boycott are Makkah period. Major battles are Madinah period.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Hijra + Charter of Madinah concept.' },
    { day: 'Day 2', task: 'Memorise Badr, Uhud, Trench with AH years.' },
    { day: 'Day 3', task: 'Hudaybiyyah significance outline.' },
    { day: 'Day 4', task: 'Conquest of Makkah: facts and tone.' },
    { day: 'Day 5', task: 'Farewell Sermon themes list.' },
    { day: 'Day 6', task: 'Flashcards on dates and order.' },
    { day: 'Day 7', task: 'Full one-pager from memory.' },
  ],
  sourcesLine:
    'Sources: mainstream Seerah chronologies used in FPSC / CSS Islamiat; standard AH dating for Badr, Uhud, Trench, Hudaybiyyah, and Conquest of Makkah. Stay respectful and avoid inflated battle myths.',
}
