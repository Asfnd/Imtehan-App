import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked exam basics:
 * - 1947-48 first Kashmir war after partition and accession dispute
 * - 1965 Indo-Pak war (separate year trap; not the origin war)
 * - UN involvement: Security Council resolutions calling for ceasefire and self-determination process (name-level; do not invent resolution numbers unless certain)
 * - Simla Agreement 2 July 1972: bilateral frame after 1971 war
 * - LoC (Line of Control) as the ceasefire line evolved into control line (Simla renamed ceasefire line as LoC)
 * - Siachen (1984 conflict start commonly taught) and Kargil (1999) as later markers; avoid sensational claims and invented casualty totals
 */
export const KASHMIR_DISPUTE_BASICS_KIT: NoteKitData = {
  id: 'kashmir-dispute-basics',
  title: 'Kashmir Dispute (Exam Basics)',
  subtitle:
    '1947-48 origins, UN name-level role, Simla 1972 bilateral frame, LoC, and later conflict markers without myths.',
  syllabusTags: [
    'Foreign policy',
    'Pakistan and India',
    'Kashmir dispute',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS pattern',
      directive: 'Discuss',
      angle: 'Origin and nature of the Kashmir dispute',
      frequency: 'high',
    },
    {
      year: 'CSS / PMS',
      directive: 'Critically examine',
      angle: 'UN role versus Simla bilateral framework',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Evaluate',
      angle: 'LoC and later conflict markers (Siachen, Kargil) in the dispute',
      frequency: 'medium',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: '1947-48, 1965 trap, Simla 1972, LoC meaning',
      frequency: 'high',
    },
  ],
  onePager: [
    '1947-48: after partition, Jammu and Kashmir became a disputed accession and war issue between Pakistan and India. This is the origin war, not 1965.',
    'Core dispute: competing claims over the former princely state; people and territory remain contested.',
    'UN role (name-level): Security Council engagement sought ceasefire and a process linked to the will of the people. Do not invent resolution numbers if unsure.',
    '1965: another India-Pakistan war year often mixed with 1947-48 or 1971. Keep years separate.',
    'Simla Agreement (2 July 1972): after the 1971 war, Pakistan and India accepted a bilateral frame for resolving differences, including Kashmir-related issues. Ceasefire line became Line of Control in teaching.',
    'LoC (Line of Control): the military control line; it is not an internationally settled final border.',
    'Later markers: Siachen (1984 commonly taught start) and Kargil (1999) show the dispute can turn hot again. Use as conflict markers, not sensational stories.',
    'Exam rule: origin → UN name-level → war-year traps → Simla bilateral frame → LoC → later markers. No invented casualty totals or fake maps.',
  ],
  answerSteps: [
    'Open with 1947-48 origin: partition, accession dispute, and first war.',
    'State the nature of the dispute: competing sovereignty claims and unfinished settlement.',
    'Explain UN involvement carefully at name-level: ceasefire and self-determination process language.',
    'Separate 1965 from 1947-48 and 1971, then place Simla 1972 as the bilateral diplomatic frame after 1971.',
    'Define LoC and add Siachen/Kargil only as later conflict markers.',
    'Close with a sober line: dispute remains unresolved; answers need law, politics, and restraint, not slogans.',
  ],
  questionVariants: [
    'Discuss the origin and nature of the Kashmir dispute.',
    'Critically examine the UN role and the Simla Agreement in the Kashmir issue.',
    'Evaluate the significance of the Line of Control in Pakistan-India relations.',
    'How should CSS answers treat Siachen and Kargil without sensationalism? Discuss.',
  ],
  citations: [
    {
      label: 'Origin',
      text: 'The Kashmir dispute originates in the 1947-48 conflict over the former princely state of Jammu and Kashmir after partition.',
    },
    {
      label: 'UN name-level',
      text: 'The United Nations Security Council engaged the dispute with resolutions aimed at ceasefire and a process linked to the will of the people. Quote specific resolution numbers only if verified.',
    },
    {
      label: 'War-year caution',
      text: 'Keep 1947-48 (origin), 1965 (later war), and 1971 (Bangladesh war context before Simla) as separate markers.',
    },
    {
      label: 'Simla 1972',
      text: 'The Simla Agreement (2 July 1972) between Pakistan and India emphasised bilateral resolution of differences after the 1971 war.',
    },
    {
      label: 'LoC',
      text: 'The Line of Control is the military control line in Jammu and Kashmir evolving from the ceasefire line. It is not a finally settled international border.',
    },
    {
      label: 'Later markers',
      text: 'Siachen (1984 commonly taught) and the Kargil conflict (1999) are later military markers of unresolved tension. Avoid invented casualty figures.',
    },
  ],
  flashcards: [
    {
      prompt: 'Origin years of the first Kashmir war?',
      answer: '1947-48',
    },
    {
      prompt: 'What is disputed in one line?',
      answer: 'Competing claims over the former princely state of Jammu and Kashmir',
    },
    {
      prompt: 'UN role at name-level?',
      answer: 'Ceasefire and a process linked to the will of the people',
    },
    {
      prompt: 'Year of the Simla Agreement?',
      answer: '1972 (2 July 1972)',
    },
    {
      prompt: 'Simla frame in one line?',
      answer: 'Bilateral resolution of differences between Pakistan and India',
    },
    {
      prompt: 'What does LoC stand for?',
      answer: 'Line of Control',
    },
    {
      prompt: 'Is the LoC a final international border?',
      answer: 'No. It is a military control line, not a finally settled border',
    },
    {
      prompt: 'Two later conflict markers?',
      answer: 'Siachen (1984 taught start) and Kargil (1999)',
    },
    {
      prompt: 'Trap: inventing UN resolution numbers?',
      answer: 'Use name-level UN role unless the number is verified',
    },
    {
      prompt: 'Trap: mixing 1947-48, 1965, and 1971?',
      answer: '1947-48 = Kashmir origin war; 1965 = later Indo-Pak war; 1971 = before Simla',
    },
    {
      prompt: 'Trap: mixing Simla with 1948 war?',
      answer: '1947-48 = origin war; 1972 = Simla bilateral frame',
    },
  ],
  mistakes: [
    {
      trap: 'Inventing UN resolution numbers or fake vote counts.',
      correct: 'Describe UN engagement at name-level unless you have verified the exact resolution citation.',
    },
    {
      trap: 'Calling the LoC a finally settled international border.',
      correct: 'It is a Line of Control, not a final border settlement.',
    },
    {
      trap: 'Treating Simla 1972 as the origin of the dispute.',
      correct: 'Origin is 1947-48. Simla is a later bilateral diplomatic frame after 1971.',
    },
    {
      trap: 'Dating the first Kashmir war to 1965 or 1971.',
      correct: 'First Kashmir war / origin conflict is 1947-48. 1965 and 1971 are later war years.',
    },
    {
      trap: 'Using sensational casualty totals or unverified map claims.',
      correct: 'Name conflict markers (Siachen, Kargil) without invented numbers.',
    },
    {
      trap: 'Writing only slogans without origin, UN, Simla, and LoC structure.',
      correct: 'Use the exam sequence: origin → UN → war-year care → Simla → LoC → later markers.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Memorise 1947-48 origin and dispute nature.' },
    { day: 'Day 2', task: 'Learn UN name-level role and Simla 1972.' },
    { day: 'Day 3', task: 'Define LoC clearly; separate 1965 from 1947-48; add Siachen/Kargil as markers only.' },
    { day: 'Day 4', task: 'Drill flashcards.' },
    { day: 'Day 5', task: 'Attempt UN vs Simla critically examine outline.' },
    { day: 'Day 6', task: 'One-pager + citations.' },
    { day: 'Day 7', task: 'Recite five-beat structure from memory.' },
  ],
  sourcesLine:
    'Sources: standard Pakistan-India and Kashmir dispute histories; Simla Agreement 1972; LoC as control line. Avoid unsourced resolution numbers and sensational casualty myths.',
}
