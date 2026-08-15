import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (high-yield Islamiat MCQ teaching):
 * - Belief in all prophets is an article of faith; Muhammad (PBUH) is the final prophet
 * - Ulul Azm (prophets of strong resolve): commonly taught as Nuh, Ibrahim, Musa, Isa, and Muhammad (peace be upon them)
 * - Other high-yield names: Adam, Yusuf, Dawud, Sulaiman, Yunus, Zakariyya, Yahya (peace be upon them) appear in MCQs
 * - Books linked in teaching: Tawrah (Musa), Zabur (Dawud), Injil (Isa), Quran (Muhammad)
 * Avoid inventing total prophet counts as a single undisputed number; Quran affirms many messengers without requiring a fixed exam total beyond standard teaching caution
 */
export const PROPHETS_IN_ISLAM_HIGH_YIELD_KIT: NoteKitData = {
  id: 'prophets-in-islam-high-yield',
  title: 'Prophets in Islam (High-Yield MCQ)',
  subtitle:
    'Ulul Azm, key prophets, revealed books links, and common MCQ traps for Islamiat one-paper and CSS.',
  syllabusTags: [
    'Islamic Studies',
    'Articles of Faith',
    'Prophets',
    'Ulul Azm',
    'MCQ revision',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'One-paper / MPT',
      directive: 'MCQ fact',
      angle: 'Ulul Azm names; finality of prophethood; revealed books',
      frequency: 'high',
    },
    {
      year: 'CSS / PMS Islamiat',
      directive: 'Discuss',
      angle: 'Belief in prophets and its significance',
      frequency: 'high',
    },
    {
      year: 'Islamiat pattern',
      directive: 'Write short notes',
      angle: 'Ulul Azm prophets',
      frequency: 'high',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'Which book was revealed to which prophet',
      frequency: 'high',
    },
  ],
  onePager: [
    'Iman in prophets (Rusul/Anbiya) means affirming that Allah sent messengers to guide humanity. Muslims believe in all true prophets and that Muhammad (PBUH) is the Seal of the Prophets (final messenger).',
    'Ulul Azm: prophets of firm resolve. Standard MCQ list: Nuh (Noah), Ibrahim (Abraham), Musa (Moses), Isa (Jesus), and Muhammad (peace be upon them).',
    'Why Ulul Azm matter: associated with major covenants, revealed scriptures themes, and steadfastness under severe trials in Quranic narratives.',
    'Books (high-yield links): Tawrah with Musa; Zabur with Dawud; Injil with Isa; Quran with Muhammad (PBUH). Do not shuffle these pairs in MCQs.',
    'Other frequent MCQ prophets: Adam (first human/prophet in teaching), Yusuf (Joseph), Sulaiman (Solomon), Yunus (Jonah), Zakariyya and Yahya, among others named in the Quran.',
    'Titles and roles: Nabi and Rasul distinctions appear in some notes; for one-paper, prioritise names, Ulul Azm set, finality, and book pairs over disputed technicalities.',
    'Written angle: belief in prophets supports moral continuity of revelation, rejects racism of guidance, and completes with finality in the Prophet Muhammad (PBUH).',
    'Trap discipline: do not invent a single compulsory numeric total of all prophets as undisputed dogma for every paper; Quran states Allah sent many messengers.',
  ],
  answerSteps: [
    'State belief in all prophets and finality of Muhammad (PBUH).',
    'List Ulul Azm five names correctly.',
    'Link major books to Musa, Dawud, Isa, and Muhammad.',
    'Add 2-3 other high-yield prophet names if the question allows.',
    'For written answers, explain significance: guidance continuity and moral example.',
    'Avoid fake totals and shuffled book pairs.',
  ],
  questionVariants: [
    'Who are the Ulul Azm prophets? Write short notes.',
    'Discuss belief in prophets as an article of faith.',
    'Match the revealed books with the prophets traditionally associated in teaching.',
    'Why is finality of prophethood significant in Islam?',
  ],
  citations: [
    {
      label: 'Article of faith',
      text: 'Belief in Allah messengers is part of Iman; Muhammad (PBUH) is the final prophet.',
    },
    {
      label: 'Ulul Azm',
      text: 'Standard teaching lists Nuh, Ibrahim, Musa, Isa, and Muhammad (peace be upon them) as Ulul Azm.',
    },
    {
      label: 'Book pairs',
      text: 'Tawrah-Musa, Zabur-Dawud, Injil-Isa, Quran-Muhammad are high-yield MCQ links.',
    },
    {
      label: 'Other names',
      text: 'Adam, Yusuf, Sulaiman, Yunus, Zakariyya, and Yahya are frequent additional MCQ prophets.',
    },
    {
      label: 'Count caution',
      text: 'Quran affirms many messengers; avoid treating one invented total as compulsory undisputed dogma.',
    },
  ],
  flashcards: [
    {
      prompt: 'Name the five Ulul Azm prophets (standard list).',
      answer: 'Nuh, Ibrahim, Musa, Isa, Muhammad (peace be upon them)',
    },
    {
      prompt: 'Who is the final prophet in Islam?',
      answer: 'Muhammad (PBUH), Seal of the Prophets',
    },
    {
      prompt: 'Tawrah is linked with which prophet?',
      answer: 'Musa (Moses)',
    },
    {
      prompt: 'Zabur is linked with which prophet?',
      answer: 'Dawud (David)',
    },
    {
      prompt: 'Injil is linked with which prophet?',
      answer: 'Isa (Jesus)',
    },
    {
      prompt: 'Quran is linked with which prophet?',
      answer: 'Muhammad (PBUH)',
    },
    {
      prompt: 'What does Ulul Azm mean in exam teaching?',
      answer: 'Prophets of strong resolve / firm determination',
    },
    {
      prompt: 'Name three other high-yield prophets besides Ulul Azm.',
      answer: 'Adam, Yusuf, and Yunus (also Dawud, Sulaiman, Zakariyya, Yahya)',
    },
    {
      prompt: 'Must Muslims believe in earlier prophets?',
      answer: 'Yes; belief in all true prophets is required, without denying any',
    },
    {
      prompt: 'What MCQ trap is common with books?',
      answer: 'Shuffling Tawrah, Zabur, Injil, and Quran pairs',
    },
  ],
  mistakes: [
    {
      trap: 'Omitting Muhammad (PBUH) from Ulul Azm or swapping in a wrong fifth name.',
      correct: 'Standard five: Nuh, Ibrahim, Musa, Isa, Muhammad.',
    },
    {
      trap: 'Assigning Injil to Musa or Tawrah to Isa.',
      correct: 'Tawrah-Musa; Injil-Isa; Zabur-Dawud; Quran-Muhammad.',
    },
    {
      trap: 'Denying earlier prophets while affirming only the last.',
      correct: 'Islam requires belief in all true prophets, with finality in Muhammad (PBUH).',
    },
    {
      trap: 'Memorising one disputed total of prophets as the only possible answer forever.',
      correct: 'Prioritise named prophets, Ulul Azm, and book pairs; Quran says many were sent.',
    },
    {
      trap: 'Confusing Dawud and Sulaiman book links.',
      correct: 'Zabur is linked with Dawud in standard teaching.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Ulul Azm five names drill.' },
    { day: 'Day 2', task: 'Book-prophet pairs drill.' },
    { day: 'Day 3', task: 'Other high-yield prophet names.' },
    { day: 'Day 4', task: 'Finality and articles-of-faith paragraph.' },
    { day: 'Day 5', task: 'Flashcards.' },
    { day: 'Day 6', task: 'Short notes on Ulul Azm.' },
    { day: 'Day 7', task: 'Recite one-pager.' },
  ],
  sourcesLine:
    'Sources: standard Islamiat MCQ primers on prophets, Ulul Azm, and revealed books; Articles of Faith teaching. Avoid invented compulsory totals and shuffled book pairs.',
}
