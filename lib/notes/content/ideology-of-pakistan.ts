import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked:
 * - Two-Nation idea: Muslims and Hindus as distinct political nations in British India debate
 * - Iqbal Allahabad Address, 29 December 1930 (Muslim League session)
 * - Iqbal died 21 April 1938; did not draft or move Lahore Resolution 1940
 * - Choudhry Rahmat Ali coined name Pakistan (1933 pamphlet Now or Never)
 * - Jinnah led AIML political demand culminating in Lahore Resolution 23 March 1940 and 1947
 * - Distinguish nation (political community / identity) from state (territorial sovereign entity)
 */
export const IDEOLOGY_OF_PAKISTAN_KIT: NoteKitData = {
  id: 'ideology-of-pakistan',
  title: 'Ideology of Pakistan (Iqbal and Quaid)',
  subtitle:
    'Two-Nation idea, Iqbal and Jinnah roles, nation versus state, and exam traps that lose marks.',
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
      angle: 'Ideology of Pakistan with reference to Iqbal and Quaid-e-Azam',
      frequency: 'high',
    },
    {
      year: 'CSS / PMS',
      directive: 'Critically examine',
      angle: 'Two-Nation Theory as a political claim, not a cultural slogan only',
      frequency: 'high',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'Allahabad 1930 date, Lahore 1940, who coined Pakistan',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Evaluate',
      angle: 'Nation versus state in the Pakistan Movement narrative',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Ideology of Pakistan in exams usually means Muslim political nationalism: a claim that Muslims of British India were a nation entitled to political security and self-rule.',
    'Two-Nation idea: Hindus and Muslims as distinct nations with different religion, social order, and political interests, so simple majoritarian democracy alone was not enough protection.',
    'Allama Iqbal, Allahabad Address, 29 December 1930: proposed a consolidated Muslim state in the north-west of India within or adjoining a federal frame of the time. Idea stage, not a finished map of 1947 Pakistan.',
    'Iqbal died in 1938. Do not credit him with drafting, moving, or passing the Lahore Resolution of 1940.',
    'Choudhry Rahmat Ali coined the name Pakistan in 1933. Naming is not the same as League policy leadership.',
    'Quaid-e-Azam Muhammad Ali Jinnah turned League politics into a mass demand: Lahore Resolution 23 March 1940, then independence on 14 August 1947.',
    'Nation versus state: nation is a political community claim. State is the territorial sovereign created in 1947. Mixing the two creates weak answers.',
    'Exam use: link ideology to constitutional continuity (Objectives Resolution 12 March 1949) without inventing fake quotes or vote counts.',
  ],
  answerSteps: [
    'Define ideology briefly as Muslim political nationalism seeking security and self-rule, not as a poetry essay.',
    'Explain Two-Nation Theory as a political claim about power and identity under British Indian democracy.',
    'Place Iqbal (Allahabad, 29 December 1930) as intellectual and political background, then stop before myths.',
    'Place Jinnah as organisational and constitutional leader of the League demand through 1940 to 1947.',
    'Add one precise distinction: nation claim versus the 1947 state, and one trap line (Iqbal did not draft 1940).',
    'Close by linking ideology to later state documents only where syllabus expects it (for example Objectives Resolution), without overclaiming.',
  ],
  questionVariants: [
    'Discuss the Ideology of Pakistan with special reference to the contribution of Allama Iqbal and Quaid-e-Azam.',
    'Critically examine the Two-Nation Theory as the basis of the Pakistan Movement.',
    'Evaluate the difference between nation and state in explaining the creation of Pakistan.',
    'How did Iqbal’s idea and Jinnah’s leadership relate without confusing dates and roles? Discuss.',
  ],
  citations: [
    {
      label: 'Iqbal marker',
      text: 'Allahabad Address delivered on 29 December 1930 at the All-India Muslim League session.',
    },
    {
      label: 'Iqbal chronology caution',
      text: 'Iqbal died in 1938. The Lahore Resolution was adopted on 23 March 1940. He did not draft or move it.',
    },
    {
      label: 'Name of Pakistan',
      text: 'Choudhry Rahmat Ali coined the name Pakistan in 1933 (pamphlet Now or Never).',
    },
    {
      label: 'League territorial demand',
      text: 'Lahore Resolution, 23 March 1940: All-India Muslim League demand for independent states in contiguous Muslim-majority zones.',
    },
    {
      label: 'Jinnah political role',
      text: 'As League president, Jinnah led the political campaign that translated Muslim nationalism into the demand culminating in Pakistan on 14 August 1947.',
    },
  ],
  flashcards: [
    {
      prompt: 'Date of Iqbal’s Allahabad Address?',
      answer: '29 December 1930',
    },
    {
      prompt: 'Did Iqbal draft the Lahore Resolution?',
      answer: 'No. He died in 1938. The Resolution was in 1940.',
    },
    {
      prompt: 'Who coined the name Pakistan?',
      answer: 'Choudhry Rahmat Ali (1933)',
    },
    {
      prompt: 'What is Two-Nation Theory in one line?',
      answer: 'Muslims and Hindus as distinct nations needing political security, not only cultural difference.',
    },
    {
      prompt: 'Nation versus state, quick distinction?',
      answer: 'Nation = political community claim. State = sovereign territorial entity (1947).',
    },
    {
      prompt: 'Key League date for territorial demand?',
      answer: '23 March 1940 (Lahore Resolution)',
    },
    {
      prompt: 'Who led League politics at Lahore 1940 as president?',
      answer: 'Muhammad Ali Jinnah',
    },
    {
      prompt: 'Who moved the Lahore Resolution?',
      answer: 'A. K. Fazlul Huq',
    },
    {
      prompt: 'Name a post-1947 ideological continuity marker often linked in exams.',
      answer: 'Objectives Resolution, 12 March 1949',
    },
    {
      prompt: 'Common trap: mixing which three dates?',
      answer: '1930 (Iqbal), 1940 (Lahore), 1947 (independence)',
    },
  ],
  mistakes: [
    {
      trap: 'Saying Iqbal drafted or moved the Lahore Resolution.',
      correct: 'Iqbal’s 1930 address is background. He died in 1938. Fazlul Huq moved the 1940 Resolution.',
    },
    {
      trap: 'Treating Rahmat Ali as League policy maker equal to Jinnah.',
      correct: 'He coined the name. League leadership and negotiation were under Jinnah.',
    },
    {
      trap: 'Writing ideology as only religious emotion with no political claim.',
      correct: 'Exam answers need the political claim about nationhood, power, and safeguards.',
    },
    {
      trap: 'Confusing nation with the 1947 state map from day one of Iqbal’s speech.',
      correct: 'Iqbal offered a north-west Muslim homeland idea. The 1947 state was the later outcome of politics and Partition.',
    },
    {
      trap: 'Inventing fake quotes, vote counts, or claiming the 1940 text used the word Pakistan.',
      correct: 'Stick to dated public markers. The Lahore text does not use the word Pakistan.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Read Two-Nation idea and nation versus state distinction.' },
    { day: 'Day 2', task: 'Memorise Iqbal 1930, death 1938, Lahore 1940, independence 1947.' },
    { day: 'Day 3', task: 'Write a 10-minute outline: Iqbal idea, Jinnah leadership.' },
    { day: 'Day 4', task: 'Drill flashcards on traps and movers.' },
    { day: 'Day 5', task: 'Attempt critically examine Two-Nation Theory variant.' },
    { day: 'Day 6', task: 'One-pager + citations. Practice MCQ date mix-ups.' },
    { day: 'Day 7', task: 'One-pager only. Recite roles without myths from memory.' },
  ],
  sourcesLine:
    'Sources: Iqbal Allahabad Address (29 Dec 1930); AIML Lahore Resolution (23 March 1940); standard Pakistan Movement histories; FPSC Ideology of Pakistan syllabus items. Avoid unsourced quote lists and WhatsApp date myths.',
}
