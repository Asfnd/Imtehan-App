import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked respectful Seerah facts (mainstream syllabus):
 * - Birth ~570 CE, Year of the Elephant (Aam al-Fil), Makkah, Banu Hashim
 * - First revelation ~age 40 in Cave Hira; Surah Al-Alaq (Iqra)
 * - Early converts: Khadijah, Ali, Abu Bakr, Zayd (standard teaching order themes)
 * - Boycott of Banu Hashim; Year of Sorrow (deaths of Khadijah and Abu Talib)
 * - Isra and Miraj (name-level); Hijra causes and 622 CE destination Madinah
 * Tone: respectful; use PBUH; no speculative miracle dumps
 */
export const LIFE_OF_PROPHET_MAKKAH_PERIOD_KIT: NoteKitData = {
  id: 'life-of-prophet-makkah-period',
  title: 'Seerah Makkah Period',
  subtitle:
    'Birth to Hijra: first revelation, early converts, boycott, Year of Sorrow, Isra and Miraj at name level, and causes of migration.',
  syllabusTags: [
    'Islamic Studies',
    'Seerah',
    'Makkah period',
    'FPSC Islamiat',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS / PMS Islamiat',
      directive: 'Discuss',
      angle: 'Challenges faced by the Prophet (PBUH) in Makkah',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Explain',
      angle: 'Significance of the first revelation and early da`wah',
      frequency: 'high',
    },
    {
      year: 'One-paper / MPT',
      directive: 'MCQ fact',
      angle: 'Birth year, Cave Hira, early converts, Year of Sorrow, Hijra 622',
      frequency: 'high',
    },
    {
      year: 'CSS / PMS',
      directive: 'Evaluate',
      angle: 'Causes and significance of the Hijra',
      frequency: 'high',
    },
  ],
  onePager: [
    'Prophet Muhammad (PBUH) was born in Makkah about 570 CE (Year of the Elephant, Aam al-Fil), of the Banu Hashim clan of Quraysh.',
    'Known before Prophethood for honesty (Al-Amin). Married Khadijah (RA). Lived a life of trust and trade.',
    'First revelation at about age 40 in Cave Hira. Opening command: Iqra (Read) from Surah Al-Alaq. Brought by angel Jibril in standard teaching.',
    'Early converts in classic lists include Khadijah (RA), Ali (RA), Abu Bakr (RA), and Zayd ibn Harithah (RA). Private then public preaching of Tawhid.',
    'Quraysh opposition grew: persecution of weaker Muslims, social pressure, and the boycott of Banu Hashim (economic and social isolation).',
    'Year of Sorrow (Aam al-Huzn): deaths of Khadijah (RA) and Abu Talib. Protection and support in Makkah weakened.',
    'Isra and Miraj: night journey and ascension, taught at name level in exams. Linked with the gift of Salah in standard Seerah notes.',
    'Hijra (622 CE) to Madinah: caused by persecution, need for a safe base, and invitation from Madinan supporters (Ansar). Marks start of the Hijri calendar.',
  ],
  answerSteps: [
    'Open with respectful identity: Prophet Muhammad (PBUH), birth in Makkah ~570 CE.',
    'State first revelation: age about 40, Cave Hira, Iqra / Al-Alaq.',
    'Name early converts and the shift from private to public invitation to Tawhid.',
    'Describe opposition: persecution, boycott, Year of Sorrow.',
    'Mention Isra and Miraj briefly at name level without overclaiming.',
    'Close with Hijra causes and 622 CE as the calendar anchor.',
  ],
  questionVariants: [
    'Discuss the Makkan period of the Prophet (PBUH) with special reference to persecution and patience.',
    'Explain the importance of the first revelation in Islamic history.',
    'Evaluate the causes that led to the Hijra from Makkah to Madinah.',
    'Write short notes on the Year of Sorrow and the boycott of Banu Hashim.',
  ],
  citations: [
    {
      label: 'Birth',
      text: 'Born in Makkah about 570 CE, Year of the Elephant, Banu Hashim.',
    },
    {
      label: 'First revelation',
      text: 'About age 40 in Cave Hira; Surah Al-Alaq (Iqra); linked with Jibril in standard teaching.',
    },
    {
      label: 'Early converts',
      text: 'Classic syllabus names include Khadijah, Ali, Abu Bakr, and Zayd (RA).',
    },
    {
      label: 'Year of Sorrow',
      text: 'Deaths of Khadijah (RA) and Abu Talib; protection in Makkah weakened.',
    },
    {
      label: 'Hijra',
      text: 'Migration to Madinah in 622 CE; start of the Hijri calendar.',
    },
  ],
  flashcards: [
    { prompt: 'Approximate birth year of the Prophet (PBUH)?', answer: 'About 570 CE' },
    { prompt: 'In which city was he born?', answer: 'Makkah' },
    { prompt: 'What is Aam al-Fil?', answer: 'Year of the Elephant' },
    { prompt: 'Which clan did he belong to?', answer: 'Banu Hashim' },
    { prompt: 'What honorific title was he known by before Prophethood?', answer: 'Al-Amin (the trustworthy)' },
    { prompt: 'At about what age did first revelation come?', answer: 'About 40' },
    { prompt: 'Where did first revelation occur?', answer: 'Cave Hira' },
    { prompt: 'Which surah opens with Iqra?', answer: 'Surah Al-Alaq' },
    { prompt: 'Name the first believer among adults (standard teaching).', answer: 'Khadijah (RA)' },
    { prompt: 'Name one early male convert often listed first among men.', answer: 'Abu Bakr (RA) or Ali (RA), per classic lists' },
    { prompt: 'What was the boycott of Banu Hashim?', answer: 'Social and economic isolation by Quraysh' },
    { prompt: 'What is Aam al-Huzn?', answer: 'Year of Sorrow' },
    { prompt: 'Whose deaths mark the Year of Sorrow?', answer: 'Khadijah (RA) and Abu Talib' },
    { prompt: 'What are Isra and Miraj at exam name level?', answer: 'Night journey and ascension' },
    { prompt: 'When was the Hijra (CE)?', answer: '622 CE' },
    { prompt: 'Where did the Prophet (PBUH) migrate?', answer: 'Madinah (Yathrib)' },
    { prompt: 'Name one major cause of Hijra.', answer: 'Persecution in Makkah / need for a safe community base' },
  ],
  mistakes: [
    {
      trap: 'Placing Badr or Uhud in the Makkah period.',
      correct: 'Major battles belong to the Madinah period after Hijra.',
    },
    {
      trap: 'Saying first revelation was Surah Al-Fatiha.',
      correct: 'Standard teaching: first revealed verses are from Surah Al-Alaq (Iqra).',
    },
    {
      trap: 'Dating Hijra as 570 CE.',
      correct: 'Birth ~570 CE. Hijra is 622 CE.',
    },
    {
      trap: 'Treating Isra and Miraj as the start of the Hijri calendar.',
      correct: 'Hijra to Madinah (622 CE) starts the Hijri calendar.',
    },
    {
      trap: 'Disrespectful or speculative tone about sacred events.',
      correct: 'Keep name-level, mainstream, and respectful syllabus wording.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Timeline: birth, first revelation, Hijra.' },
    { day: 'Day 2', task: 'Early converts and stages of preaching.' },
    { day: 'Day 3', task: 'Boycott and Year of Sorrow facts.' },
    { day: 'Day 4', task: 'Isra and Miraj name-level + Salah link if asked.' },
    { day: 'Day 5', task: 'Write causes of Hijra in six lines.' },
    { day: 'Day 6', task: 'Dense flashcard drill.' },
    { day: 'Day 7', task: 'One-pager from memory only.' },
  ],
  sourcesLine:
    'Sources: mainstream Seerah syllabus (Makkah period); standard FPSC Islamiat timelines for birth, revelation, and Hijra. Keep tone respectful; avoid unsourced miracle lists.',
}
