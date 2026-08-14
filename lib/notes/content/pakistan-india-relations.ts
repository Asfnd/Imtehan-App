import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked treaty and war markers:
 * - Kashmir dispute begins with 1947 accession conflict and first war 1947-48; UNCIP process and ceasefire line follow
 * - Indus Waters Treaty signed 19 September 1960 (World Bank brokered)
 * - 1965 India-Pakistan war; Tashkent Declaration January 1966 (Ayub Khan and Lal Bahadur Shastri, Soviet mediation at Tashkent)
 * - 1971 war and separation of East Pakistan; Simla Agreement 2 July 1972 (Bhutto and Indira Gandhi)
 * - Kargil conflict 1999
 * - Composite dialogue and CBMs appear in later peace process phases (2000s especially). Do not invent fake round counts.
 */
export const PAKISTAN_INDIA_RELATIONS_KIT: NoteKitData = {
  id: 'pakistan-india-relations',
  title: 'Pakistan-India Relations since 1947',
  subtitle:
    'Kashmir core dispute, wars and agreements, water treaty, and how to keep years accurate.',
  syllabusTags: [
    'Pakistan and its neighbours',
    'Kashmir dispute',
    'Foreign policy of Pakistan',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS pattern',
      directive: 'Discuss',
      angle: 'Pakistan-India relations since 1947 with focus on Kashmir',
      frequency: 'high',
    },
    {
      year: 'CSS / PMS',
      directive: 'Critically examine',
      angle: 'Wars of 1965 and 1971 and their diplomatic settlements',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Evaluate',
      angle: 'Indus Waters Treaty and water as a bilateral issue',
      frequency: 'medium',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'IWT 1960, Tashkent 1966, Simla 1972, Kargil 1999',
      frequency: 'high',
    },
  ],
  onePager: [
    'Since 1947, Pakistan-India relations have been shaped by Partition violence, competing nation-building, and above all the Kashmir dispute.',
    'First Kashmir war 1947-48 produced a ceasefire line (later contexts include the Line of Control after 1972). Kashmir remains the core unresolved political dispute.',
    'Indus Waters Treaty, 19 September 1960: World Bank-brokered water-sharing arrangement on the Indus system. High-yield MCQ date.',
    '1965 war: major conventional conflict. Ended diplomatically with the Tashkent Declaration, January 1966.',
    '1971 war: linked to the East Pakistan crisis and led to the independence of Bangladesh. Simla Agreement signed 2 July 1972 between Zulfikar Ali Bhutto and Indira Gandhi.',
    'Kargil conflict, 1999: limited war in the Kashmir region after both states had demonstrated nuclear capability in 1998. Raised escalation risks.',
    'Peace toolkit in later decades: composite dialogue phases, confidence-building measures (CBMs), trade and people-to-people ideas. Progress has been uneven and frequently interrupted.',
    'Exam writing: keep war and treaty years exact. Analyse structure (dispute, security, water, diplomacy). Avoid communal ranting.',
  ],
  answerSteps: [
    'Open with Kashmir as the core dispute rooted in 1947-48.',
    'Place major wars in order: 1947-48, 1965, 1971, Kargil 1999.',
    'Attach the matching diplomatic markers: Tashkent 1966 after 1965; Simla 1972 after 1971.',
    'Add Indus Waters Treaty 1960 as the main durable technical regime on water.',
    'Mention later dialogue and CBMs as incomplete peace efforts, not permanent settlement.',
    'Close with a balanced judgment on what remains unresolved (especially Kashmir) versus managed issues (water treaty framework).',
  ],
  questionVariants: [
    'Discuss Pakistan-India relations since 1947 with special reference to the Kashmir dispute.',
    'Critically examine the wars of 1965 and 1971 and the settlements that followed.',
    'Evaluate the significance of the Indus Waters Treaty (1960) in bilateral relations.',
    'How have composite dialogue and CBMs tried to manage Pakistan-India tensions? Discuss.',
  ],
  citations: [
    {
      label: 'Core dispute',
      text: 'Kashmir conflict begins with the 1947-48 war after Partition and remains the central political dispute.',
    },
    {
      label: 'Indus Waters Treaty',
      text: 'Signed on 19 September 1960 with World Bank brokerage between Pakistan and India.',
    },
    {
      label: 'Tashkent',
      text: 'Tashkent Declaration, January 1966, followed the 1965 war (Soviet-hosted talks at Tashkent).',
    },
    {
      label: 'Simla',
      text: 'Simla Agreement signed on 2 July 1972 by Zulfikar Ali Bhutto and Indira Gandhi after the 1971 war.',
    },
    {
      label: 'Kargil',
      text: 'Kargil conflict took place in 1999 in the Kashmir region.',
    },
  ],
  flashcards: [
    {
      prompt: 'What is the core political dispute since 1947?',
      answer: 'Kashmir',
    },
    {
      prompt: 'Years of the first Kashmir war?',
      answer: '1947-48',
    },
    {
      prompt: 'Indus Waters Treaty date?',
      answer: '19 September 1960',
    },
    {
      prompt: 'Who brokered the Indus Waters Treaty?',
      answer: 'World Bank',
    },
    {
      prompt: 'Diplomatic settlement after the 1965 war?',
      answer: 'Tashkent Declaration, January 1966',
    },
    {
      prompt: 'Simla Agreement date?',
      answer: '2 July 1972',
    },
    {
      prompt: 'Who signed Simla for Pakistan?',
      answer: 'Zulfikar Ali Bhutto',
    },
    {
      prompt: 'Kargil conflict year?',
      answer: '1999',
    },
    {
      prompt: '1971 war’s major political outcome for Pakistan?',
      answer: 'Separation of East Pakistan / independence of Bangladesh',
    },
    {
      prompt: 'What are CBMs in this topic?',
      answer: 'Confidence-building measures to reduce tension and build limited trust',
    },
    {
      prompt: 'Name the four war markers to remember in order.',
      answer: '1947-48, 1965, 1971, Kargil 1999',
    },
  ],
  mistakes: [
    {
      trap: 'Dating Tashkent as 1965 or mixing it with Simla.',
      correct: 'Tashkent = January 1966 after the 1965 war. Simla = 2 July 1972 after 1971.',
    },
    {
      trap: 'Writing Indus Waters Treaty as 1965 or 1972.',
      correct: 'IWT was signed on 19 September 1960.',
    },
    {
      trap: 'Treating Kargil as 1971 or as a full-scale all-front war like 1965.',
      correct: 'Kargil was 1999, a limited conflict in the Kashmir region with high escalation risk.',
    },
    {
      trap: 'Claiming Kashmir was fully settled by Simla.',
      correct: 'Simla set a bilateral framework and LoC context. The dispute was not finally resolved.',
    },
    {
      trap: 'Inventing fake composite dialogue round numbers or treaty clauses.',
      correct: 'Describe dialogue and CBMs as a process. Use only verified treaty names and years.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Read Kashmir 1947-48 as the core dispute.' },
    { day: 'Day 2', task: 'Memorise IWT 1960, Tashkent 1966, Simla 1972, Kargil 1999.' },
    { day: 'Day 3', task: 'Timeline the four wars and matching diplomacy.' },
    { day: 'Day 4', task: 'Drill flashcards on dates and signatories.' },
    { day: 'Day 5', task: 'Write critically examine on 1965 and 1971 settlements.' },
    { day: 'Day 6', task: 'Add water + CBMs paragraph practice.' },
    { day: 'Day 7', task: 'One-pager only. Recite year ladder from memory.' },
  ],
  sourcesLine:
    'Sources: Indus Waters Treaty (1960); Tashkent Declaration (1966); Simla Agreement (1972); standard histories of 1947-48, 1965, 1971, and Kargil 1999. Avoid WhatsApp year swaps and unsourced dialogue scorecards.',
}
