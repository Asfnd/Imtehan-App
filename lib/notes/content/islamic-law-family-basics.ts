import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (syllabus-level Islamic family law teaching, non-sectarian):
 * - Marriage as contract (nikah): offer/acceptance, witnesses, mahr, mutual rights
 * - Divorce concepts at name-level: talaq, khula, iddah (waiting period)
 * - Inheritance: Quranic fixed shares (faraid) principle; do not invent school-specific fraction tables as universal
 * - Carefully non-sectarian: mainstream exam framing only
 */
export const ISLAMIC_LAW_FAMILY_BASICS_KIT: NoteKitData = {
  id: 'islamic-law-family-basics',
  title: 'Islamic Family Law Basics (Marriage, Divorce, Inheritance)',
  subtitle:
    'Syllabus-level nikah, divorce concepts, iddah, and faraid principles for Islamiat, framed carefully and non-sectarian.',
  syllabusTags: [
    'Islamic law',
    'Nikah',
    'Divorce',
    'Inheritance',
    'Islamiat',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS / PMS Islamiat',
      directive: 'Discuss',
      angle: 'Islamic concept of marriage and mutual rights of spouses',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Explain',
      angle: 'Principles of inheritance in Islam',
      frequency: 'high',
    },
    {
      year: 'Islamiat',
      directive: 'Examine',
      angle: 'Divorce and waiting period (iddah) in Islamic law',
      frequency: 'medium',
    },
    {
      year: 'One-paper',
      directive: 'Short',
      angle: 'Mahr, nikah essentials, khula',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Marriage (nikah) in Islamic law is a solemn contract, not a casual private promise. Core elements in mainstream teaching: offer and acceptance (ijab and qabul), competent parties, and witnesses. Mahr (dower) is the wife’s right.',
    'Purpose cluster for answers: lawful companionship, chastity, mutual kindness, family formation, and clear rights/duties. Spiritual equality of believers sits beside differentiated legal roles in classical fiqh. Stay syllabus-level and respectful.',
    'Mutual rights theme: maintenance (nafaqah) duties of the husband in classical teaching; obedience and cooperation framed within justice and kindness; dignity and fair treatment for both spouses. Avoid culture-specific extremes as if they were Quranic commands.',
    'Divorce: Islam permits dissolution when the marriage cannot continue with justice, but discourages frivolous breakup. Name-level concepts: talaq (husband-initiated in classical categories), khula (wife-initiated release often involving return of mahr or negotiated consideration), and judicial dissolution themes in later practice.',
    'Iddah: waiting period after divorce or widowhood before remarriage. Purposes taught in exams: clarity of lineage, time for reflection/reconciliation where relevant, and dignified transition. Do not invent one universal day-count table for every case without noting widow vs divorcee distinctions at a careful level.',
    'Inheritance (mirath / faraid): Quran sets fixed shares for designated heirs. Key principle: estate distribution follows divine allocation rules, not pure testamentary freedom. A will (wasiyyah) is limited in classical teaching (commonly taught as up to one-third for non-heir bequests). Do not invent contested school fraction charts as the only exam truth.',
  ],
  answerSteps: [
    'Define nikah as a contract with witnesses and mahr.',
    'State purpose and mutual rights in two crisp sentences.',
    'Explain that divorce is allowed but regulated; name talaq, khula, iddah.',
    'State faraid principle: fixed Quranic shares and limited wasiyyah.',
    'Close with justice, lineage clarity, and family stability as objectives.',
  ],
  questionVariants: [
    'Discuss the Islamic concept of marriage and the rights of spouses.',
    'Explain the principles of inheritance (faraid) in Islam.',
    'Examine divorce and iddah in Islamic family law.',
    'What is mahr? Why is nikah treated as a contract?',
  ],
  citations: [
    {
      label: 'Nikah',
      text: 'Marriage is a contract requiring offer and acceptance, with witnesses and mahr as a wife’s right in mainstream teaching.',
    },
    {
      label: 'Divorce concepts',
      text: 'Syllabus name-level: talaq, khula, and iddah as regulated pathways and waiting rules.',
    },
    {
      label: 'Iddah purpose',
      text: 'Waiting period supports lineage clarity, reflection where relevant, and dignified transition.',
    },
    {
      label: 'Faraid',
      text: 'Inheritance follows Quranic fixed shares for designated heirs; unrestricted free disposal of the whole estate is not the classical model.',
    },
    {
      label: 'Wasiyyah limit',
      text: 'Classical teaching commonly limits bequests (for non-heirs) to about one-third of the estate.',
    },
  ],
  flashcards: [
    { prompt: 'What is nikah in legal terms?', answer: 'A solemn marriage contract' },
    { prompt: 'Name two essentials often listed for nikah.', answer: 'Offer/acceptance (ijab-qabul) and witnesses (plus mahr as wife’s right)' },
    { prompt: 'What is mahr?', answer: 'Dower; a right of the wife' },
    { prompt: 'What is khula at syllabus level?', answer: 'Wife-initiated release from marriage, often with negotiated consideration' },
    { prompt: 'What is iddah?', answer: 'Waiting period after divorce or widowhood before remarriage' },
    { prompt: 'What does faraid refer to?', answer: 'Quranic fixed-share inheritance rules' },
    { prompt: 'Is the whole estate freely disposable by will in classical teaching?', answer: 'No; wasiyyah is limited (commonly up to one-third for non-heir bequests)' },
    { prompt: 'Name one purpose of iddah taught in exams.', answer: 'Clarity of lineage / dignified transition' },
    { prompt: 'How should school-specific fraction disputes be handled?', answer: 'State principles; avoid inventing one universal contested table' },
    { prompt: 'What tone should family-law Islamiat answers keep?', answer: 'Respectful, syllabus-level, non-sectarian' },
  ],
  mistakes: [
    {
      trap: 'Treating nikah as only a private verbal promise with no legal form.',
      correct: 'Mainstream teaching treats it as a contract with offer/acceptance, witnesses, and mahr.',
    },
    {
      trap: 'Saying Islam forbids all divorce.',
      correct: 'Divorce is permitted under regulated conditions but discouraged as a casual first resort.',
    },
    {
      trap: 'Confusing khula with ordinary talaq.',
      correct: 'Khula is the wife-initiated pathway (negotiated release); talaq is the classical husband-initiated category cluster.',
    },
    {
      trap: 'Writing that a person may will away the entire estate freely.',
      correct: 'Classical wasiyyah is limited; faraid fixed shares govern heirs.',
    },
    {
      trap: 'Dumping one madhab’s full fraction chart as “the only Islam”.',
      correct: 'For general papers, stress Quranic faraid principles and stay non-sectarian unless the question asks for a school.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Memorise nikah essentials and mahr.' },
    { day: 'Day 2', task: 'Learn talaq, khula, iddah definitions.' },
    { day: 'Day 3', task: 'Write a short inheritance principles paragraph.' },
    { day: 'Day 4', task: 'Flashcards on family-law terms.' },
    { day: 'Day 5', task: '10-minute answer on mutual rights of spouses.' },
    { day: 'Day 6', task: 'One critically framed iddah purpose note.' },
    { day: 'Day 7', task: 'One-pager only. Recite definitions from memory.' },
  ],
  sourcesLine:
    'Sources: mainstream Islamiat family-law syllabus outlines; Quranic faraid principle teaching. Keep non-sectarian; do not invent school-specific fraction tables as universal keys.',
}
