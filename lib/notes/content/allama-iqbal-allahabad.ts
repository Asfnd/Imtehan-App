import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked:
 * - Allahabad Address, 29 December 1930, All-India Muslim League session
 * - Iqbal proposed a consolidated Muslim state in north-western India (idea stage)
 * - Iqbal died 21 April 1938; did not draft or move Lahore Resolution 1940
 * - Choudhry Rahmat Ali coined name Pakistan (1933); distinct from Iqbal's address
 * - Lahore Resolution 23 March 1940 is later League territorial demand under Jinnah
 */
export const ALLAMA_IQBAL_ALLAHABAD_KIT: NoteKitData = {
  id: 'allama-iqbal-allahabad',
  title: 'Allama Iqbal and the Allahabad Address',
  subtitle:
    'What Iqbal said on 29 December 1930, how it differs from Rahmat Ali and 1940, and exam traps.',
  syllabusTags: [
    'Ideology of Pakistan',
    'Freedom movement',
    'Muslim nationalism',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS pattern',
      directive: 'Discuss',
      angle: 'Iqbal’s contribution to the idea of a Muslim homeland',
      frequency: 'high',
    },
    {
      year: 'CSS / PMS',
      directive: 'Critically examine',
      angle: 'Allahabad Address as idea, not the 1947 map or Lahore text',
      frequency: 'high',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: '29 Dec 1930, Allahabad, League session, death 1938',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Evaluate',
      angle: 'Iqbal, Rahmat Ali, and 1940 Resolution roles without myths',
      frequency: 'medium',
    },
  ],
  onePager: [
    '29 December 1930: Allama Muhammad Iqbal delivers the Allahabad Address at the All-India Muslim League session.',
    'Core idea: a consolidated Muslim state in north-western India so Muslims could live by their own political and cultural personality.',
    'This is an intellectual and political proposal about Muslim selfhood in British India. It is not a finished constitutional draft of 1947 Pakistan.',
    'Iqbal died on 21 April 1938. He did not draft, move, or pass the Lahore Resolution of 23 March 1940.',
    'Choudhry Rahmat Ali coined the name Pakistan in 1933 (Now or Never). Naming is separate from Iqbal’s 1930 address and from League leadership.',
    'Lahore 1940 under Quaid-e-Azam made a League territorial demand (independent states in Muslim-majority zones). Different stage from Allahabad.',
    'Exam use: ideology, Two-Nation background, sequence Iqbal 1930 then League 1940 then 1947. Keep roles and dates clean.',
  ],
  answerSteps: [
    'Open with the Muslim political problem after World War I: how Muslims would secure identity and power in a future India.',
    'State the hard facts: Allahabad Address, 29 December 1930, AIML session, Iqbal as presidential address.',
    'Explain the content in one clear line: north-western Muslim consolidated state idea for cultural and political selfhood.',
    'Separate Rahmat Ali (name, 1933) and Lahore 1940 (League demand under Jinnah) from Iqbal’s idea stage.',
    'Add one critical point: Allahabad is not the 1947 map and Iqbal did not live to see Lahore 1940.',
    'Close by linking idea to later League politics without inventing quotes or vote counts.',
  ],
  questionVariants: [
    'Discuss the significance of Allama Iqbal’s Allahabad Address in the Pakistan Movement.',
    'Critically examine Iqbal’s north-western Muslim state idea. How does it differ from the Lahore Resolution?',
    'Evaluate the roles of Iqbal and Choudhry Rahmat Ali without confusing naming with League policy.',
    'Iqbal provided the idea and Jinnah provided the organisation. Discuss with dates.',
  ],
  citations: [
    {
      label: 'Date and place',
      text: 'Allahabad Address delivered on 29 December 1930 at the All-India Muslim League session at Allahabad.',
    },
    {
      label: 'Core idea',
      text: 'Iqbal proposed a consolidated Muslim state in the north-western region of India as a political homeland idea for Muslims.',
    },
    {
      label: 'Death',
      text: 'Iqbal died on 21 April 1938, before the Lahore Resolution of 23 March 1940.',
    },
    {
      label: 'Name caution',
      text: 'Choudhry Rahmat Ali coined Pakistan in 1933. That naming act is not the same as Iqbal’s 1930 address.',
    },
    {
      label: '1940 contrast',
      text: 'Lahore Resolution (23 March 1940) was an AIML territorial demand under Jinnah’s presidency. Iqbal did not draft or move it.',
    },
  ],
  flashcards: [
    { prompt: 'Date of Iqbal’s Allahabad Address?', answer: '29 December 1930' },
    { prompt: 'Where was the Address delivered?', answer: 'Allahabad (AIML session)' },
    {
      prompt: 'What was Iqbal’s core political proposal?',
      answer: 'A consolidated Muslim state in north-western India',
    },
    { prompt: 'When did Iqbal die?', answer: '21 April 1938' },
    {
      prompt: 'Did Iqbal draft or move the Lahore Resolution?',
      answer: 'No. He died in 1938; Lahore Resolution is 23 March 1940',
    },
    {
      prompt: 'Who coined the name Pakistan?',
      answer: 'Choudhry Rahmat Ali (1933)',
    },
    {
      prompt: 'Is Allahabad the same as the 1947 map of Pakistan?',
      answer: 'No. It is an idea-stage proposal, not the finished 1947 state map',
    },
    {
      prompt: 'Name one later League landmark after Iqbal.',
      answer: 'Lahore Resolution, 23 March 1940',
    },
    {
      prompt: 'Which party session hosted the Allahabad Address?',
      answer: 'All-India Muslim League',
    },
    {
      prompt: 'Trap: mixing Iqbal with who?',
      answer: 'Rahmat Ali (naming) or Fazlul Huq (mover of 1940)',
    },
    {
      prompt: 'Does the 1940 Lahore text use the word Pakistan?',
      answer: 'No',
    },
  ],
  mistakes: [
    {
      trap: 'Saying Iqbal drafted or moved the Lahore Resolution of 1940.',
      correct: 'Iqbal died in 1938. Fazlul Huq moved the 1940 Resolution under Jinnah’s League presidency.',
    },
    {
      trap: 'Treating Allahabad as a complete map of modern Pakistan.',
      correct: 'It was a north-western Muslim consolidated state idea. The 1947 settlement came later through politics and partition.',
    },
    {
      trap: 'Crediting Iqbal with coining the name Pakistan.',
      correct: 'Choudhry Rahmat Ali coined Pakistan in 1933. Iqbal’s 1930 address is the idea marker.',
    },
    {
      trap: 'Collapsing Iqbal, Rahmat Ali, and 1940 into one event.',
      correct: 'Keep sequence: Allahabad 1930 (idea), Rahmat Ali 1933 (name), Lahore 1940 (League demand).',
    },
    {
      trap: 'Using invented quotations as if they were official League text.',
      correct: 'Stick to verified markers: date, session, north-western state idea, death before 1940.',
    },
    {
      trap: 'Dating Allahabad to 1940 or confusing it with Lahore Resolution.',
      correct: 'Allahabad Address = 29 December 1930. Lahore Resolution = 23 March 1940.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Read one-pager and fix the 1930 / 1933 / 1940 sequence.' },
    { day: 'Day 2', task: 'Memorise date, place, core idea, and death year.' },
    { day: 'Day 3', task: 'Write a 10-minute outline on Iqbal’s contribution without myths.' },
    { day: 'Day 4', task: 'Drill flashcards on Rahmat Ali vs Iqbal vs 1940.' },
    { day: 'Day 5', task: 'Attempt the critically examine variant (idea vs Resolution).' },
    { day: 'Day 6', task: 'One-pager + citations. Practice MCQs.' },
    { day: 'Day 7', task: 'Recite date, idea, and three traps from memory.' },
  ],
  sourcesLine:
    'Sources: standard Pakistan Movement histories; AIML Allahabad session marker (29 December 1930); FPSC ideology syllabus items. Avoid unsourced quote myths and WhatsApp date swaps.',
}
