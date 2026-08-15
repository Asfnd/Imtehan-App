import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked high-yield markers only:
 * - 1857 uprising / War of Independence (context start for Muslim politics narratives)
 * - Aligarh Movement (Sir Syed Ahmad Khan) after 1857
 * - All-India Muslim League founded 30 December 1906, Dhaka
 * - Lucknow Pact 1916
 * - Nehru Report 1928; Jinnah's Fourteen Points 1929
 * - Round Table Conferences early 1930s (London)
 * - Provincial elections 1937
 * - Lahore Resolution 23 March 1940
 * - Cabinet Mission 1946
 * - 3 June Plan 1947 (Mountbatten Plan)
 * - Pakistan independence 14 August 1947
 */
export const PAKISTAN_MOVEMENT_1857_1947_KIT: NoteKitData = {
  id: 'pakistan-movement-1857-1947',
  title: 'Pakistan Movement Timeline (1857 to 1947)',
  subtitle:
    'High-yield dates from 1857 to 14 August 1947 for CSS/PMS Pakistan Affairs without fluff.',
  syllabusTags: [
    'Freedom movement',
    'Ideology of Pakistan',
    'Political history',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS pattern',
      directive: 'Discuss',
      angle: 'Major landmarks of the Pakistan Movement from 1857 to 1947',
      frequency: 'high',
    },
    {
      year: 'CSS / PMS',
      directive: 'Trace',
      angle: 'Evolution of Muslim political demand through key dates',
      frequency: 'high',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'League 1906, Lucknow 1916, Lahore 1940, 3 June Plan, 14 Aug',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Evaluate',
      angle: 'Turning points after 1937 toward Lahore and partition',
      frequency: 'medium',
    },
  ],
  onePager: [
    '1857: War of Independence / uprising. Exam start point for Muslim political trauma and later reform politics.',
    'Aligarh Movement (Sir Syed Ahmad Khan): education and loyalist modernisation after 1857. Context for later Muslim elite politics.',
    '30 December 1906: All-India Muslim League founded at Dhaka.',
    '1916: Lucknow Pact between Congress and League on shared constitutional demands.',
    '1928 Nehru Report; 1929 Jinnah’s Fourteen Points: clash over constitutional safeguards.',
    '29 December 1930: Iqbal’s Allahabad Address (homeland idea). Early 1930s: Round Table Conferences. 1937: provincial elections reshape League strategy.',
    '23 March 1940: Lahore Resolution (Fazlul Huq mover; text does not say Pakistan). 1946: Cabinet Mission. 3 June 1947: Mountbatten / 3 June Plan. 14 August 1947: independence.',
    'Exam rule: crisp dates only. Do not invent fake vote counts or claim every event equalled Pakistan by name.',
  ],
  answerSteps: [
    'Open with 1857 as political context, then Aligarh as Muslim educational-political recovery.',
    'Give League founding (1906) and Lucknow Pact (1916) as early organisational markers.',
    'Explain the constitutional fight: Nehru Report (1928) and Fourteen Points (1929).',
    'Move through Round Tables and 1937 elections into Lahore 1940 as territorial demand.',
    'Close with Cabinet Mission (1946), 3 June Plan (1947), and 14 August 1947 independence.',
  ],
  questionVariants: [
    'Trace the major landmarks of the Pakistan Movement from 1857 to 1947.',
    'Discuss the significance of 1906, 1916, 1940, and 1947 in Muslim politics.',
    'Evaluate how League politics changed after the 1937 elections toward the Lahore Resolution.',
    'Write a crisp timeline answer from the Nehru Report to the 3 June Plan.',
  ],
  citations: [
    {
      label: '1857 and Aligarh',
      text: '1857 uprising is the usual narrative start. Aligarh Movement under Sir Syed Ahmad Khan followed as educational and political reform among Muslims.',
    },
    {
      label: 'League founding',
      text: 'All-India Muslim League was founded on 30 December 1906 at Dhaka.',
    },
    {
      label: 'Lucknow',
      text: 'Lucknow Pact between Indian National Congress and All-India Muslim League was concluded in 1916.',
    },
    {
      label: 'Constitutional clash',
      text: 'Nehru Report 1928; Jinnah’s Fourteen Points 1929.',
    },
    {
      label: 'Endgame markers',
      text: 'Iqbal Allahabad Address 29 December 1930; Lahore Resolution 23 March 1940; Cabinet Mission 1946; 3 June Plan 1947; Pakistan independence 14 August 1947.',
    },
  ],
  flashcards: [
    { prompt: 'Usual narrative start year?', answer: '1857' },
    { prompt: 'Who led the Aligarh Movement?', answer: 'Sir Syed Ahmad Khan' },
    { prompt: 'Date and place of Muslim League founding?', answer: '30 December 1906, Dhaka' },
    { prompt: 'Year of Lucknow Pact?', answer: '1916' },
    { prompt: 'Year of Nehru Report?', answer: '1928' },
    { prompt: 'Year of Jinnah’s Fourteen Points?', answer: '1929' },
    { prompt: 'Provincial elections that reshaped League strategy?', answer: '1937' },
    { prompt: 'Iqbal Allahabad Address date?', answer: '29 December 1930' },
    { prompt: 'Lahore Resolution date?', answer: '23 March 1940' },
    { prompt: 'Who moved the Lahore Resolution?', answer: 'A. K. Fazlul Huq' },
    { prompt: 'Cabinet Mission year?', answer: '1946' },
    { prompt: '3 June Plan year?', answer: '1947' },
    { prompt: 'Pakistan independence date?', answer: '14 August 1947' },
    {
      prompt: 'Trap: mixing 23 March 1940 with 14 August 1947?',
      answer: '1940 = Lahore Resolution; 1947 = independence',
    },
    {
      prompt: 'Trap: mixing 23 March 1940 with 12 March 1949?',
      answer: '1940 = Lahore Resolution; 1949 = Objectives Resolution',
    },
  ],
  mistakes: [
    {
      trap: 'Saying the Muslim League was founded in 1940.',
      correct: 'League founded 30 December 1906 at Dhaka. 1940 is the Lahore Resolution.',
    },
    {
      trap: 'Mixing Lucknow Pact (1916) with Lahore Resolution (1940).',
      correct: '1916 = Congress-League pact. 1940 = League territorial demand.',
    },
    {
      trap: 'Calling the Nehru Report a League document.',
      correct: 'Nehru Report 1928 was Congress-side constitutional proposal. League answered with Fourteen Points (1929).',
    },
    {
      trap: 'Treating Cabinet Mission and 3 June Plan as the same event.',
      correct: 'Cabinet Mission 1946; 3 June Plan 1947. Different years and plans.',
    },
    {
      trap: 'Skipping Allahabad 1930 or crediting Iqbal with drafting Lahore 1940.',
      correct: 'Allahabad 29 Dec 1930 = idea marker. Iqbal died 1938. Lahore 1940 mover = Fazlul Huq.',
    },
    {
      trap: 'Inventing exact seat tallies for every election in a timeline essay.',
      correct: 'Name the landmark years. Add detailed numbers only if you have verified them.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Memorise the full date chain from 1857 to 1947.' },
    { day: 'Day 2', task: 'Drill League 1906, Lucknow 1916, Lahore 1940.' },
    { day: 'Day 3', task: 'Write a 10-minute timeline without fluff.' },
    { day: 'Day 4', task: 'Flashcards on Nehru Report vs Fourteen Points.' },
    { day: 'Day 5', task: 'Attempt endgame markers: 1946, 3 June, 14 Aug.' },
    { day: 'Day 6', task: 'One-pager + MCQs.' },
    { day: 'Day 7', task: 'Recite the whole chain from memory in under two minutes.' },
  ],
  sourcesLine:
    'Sources: standard Pakistan Movement chronologies; AIML founding and Lahore session markers; Cabinet Mission and 3 June Plan as standard endgame landmarks. Avoid unsourced date swaps.',
}
