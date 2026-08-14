import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked:
 * - Two-Nation Theory: political claim that Muslims and Hindus were distinct nations in British India
 * - Markers used in debate: religion, culture, social order, political interest / power security
 * - Linked to League politics culminating in Lahore Resolution 1940 and Pakistan 1947
 * - Critics' angles belong in balanced CSS answers; do not invent fake survey numbers
 * - Distinguish nation claim from the territorial state created in 1947
 */
export const TWO_NATION_THEORY_KIT: NoteKitData = {
  id: 'two-nation-theory',
  title: 'Two-Nation Theory',
  subtitle:
    'Political nationhood claim, cultural markers, critics’ angles, and clean links to 1940 and 1947.',
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
      angle: 'Two-Nation Theory as the basis of the Pakistan Movement',
      frequency: 'high',
    },
    {
      year: 'CSS / PMS',
      directive: 'Critically examine',
      angle: 'Political claim versus cultural slogan only',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Evaluate',
      angle: 'Critics of Two-Nation Theory and a balanced answer structure',
      frequency: 'medium',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'Link to Lahore 1940 and independence 1947 without myths',
      frequency: 'high',
    },
  ],
  onePager: [
    'Two-Nation Theory: Muslims and Hindus in British India were distinct nations, not only religious communities inside one political nation.',
    'Political core: majoritarian democracy alone would not secure Muslim identity, culture, and power. Separate political arrangement was needed.',
    'Markers used in the debate: religion, social customs, historical memory, and political interest. Use them as arguments, not as proof of hatred.',
    'Idea stage markers: Iqbal’s Allahabad Address (29 December 1930). League stage: Lahore Resolution (23 March 1940). State stage: 14 August 1947.',
    'Nation claim ≠ finished state map. 1947 created a territorial state through partition politics, not by slogan alone.',
    'Critics’ angles for balance: composite nationalism; shared anti-colonial struggle; diversity within each community; later costs of partition. Answer with fair critique, not slogans.',
    'Exam rule: define, explain political logic, give 1940/1947 link, add one critic line, avoid invented quotes and fake statistics.',
  ],
  answerSteps: [
    'Define Two-Nation Theory as a political nationhood claim about Muslims and Hindus in British India.',
    'Explain why League politics treated majoritarian democracy as insufficient protection.',
    'List cultural and religious markers used in the debate without turning the answer into abuse.',
    'Link cleanly to Allahabad 1930 (idea), Lahore 1940 (League demand), and 1947 (state).',
    'Add one balanced critics’ paragraph: composite nationalism and diversity within communities.',
    'Close by separating nation claim from state formation so the answer stays analytical.',
  ],
  questionVariants: [
    'Discuss the Two-Nation Theory as the ideological basis of Pakistan.',
    'Critically examine the Two-Nation Theory. Is it only a cultural argument?',
    'Evaluate critics of the Two-Nation Theory while explaining its political logic.',
    'How does the Two-Nation Theory connect to the Lahore Resolution and 1947 without myths? Discuss.',
  ],
  citations: [
    {
      label: 'Definition',
      text: 'Two-Nation Theory claimed Hindus and Muslims were distinct political nations in British India, not merely two sects inside one nation.',
    },
    {
      label: 'Political logic',
      text: 'The claim argued that Muslim identity and political security required arrangements beyond simple majoritarian rule.',
    },
    {
      label: 'Movement link',
      text: 'The theory informed League politics that led toward the Lahore Resolution (23 March 1940) and independence (14 August 1947).',
    },
    {
      label: 'Idea marker',
      text: 'Iqbal’s Allahabad Address (29 December 1930) is a standard intellectual marker for Muslim homeland politics.',
    },
    {
      label: 'Critical balance',
      text: 'Balanced answers note composite-nationalism critiques and diversity within communities, without inventing survey figures.',
    },
  ],
  flashcards: [
    {
      prompt: 'What is the Two-Nation Theory in one line?',
      answer: 'Muslims and Hindus as distinct political nations in British India',
    },
    {
      prompt: 'What was the political worry behind it?',
      answer: 'Majoritarian democracy alone would not secure Muslim identity and power',
    },
    {
      prompt: 'Name markers used in the debate.',
      answer: 'Religion, social order, culture, political interest',
    },
    {
      prompt: 'Idea-stage date often linked in answers?',
      answer: 'Iqbal’s Allahabad Address, 29 December 1930',
    },
    {
      prompt: 'League territorial demand date?',
      answer: 'Lahore Resolution, 23 March 1940',
    },
    {
      prompt: 'Statehood date?',
      answer: '14 August 1947',
    },
    {
      prompt: 'Nation claim vs state: difference?',
      answer: 'Nation = political community claim; state = territorial sovereign created in 1947',
    },
    {
      prompt: 'One critic angle for CSS balance?',
      answer: 'Composite nationalism / shared anti-colonial politics / internal diversity',
    },
    {
      prompt: 'Trap: proving the theory with fake polls?',
      answer: 'Do not invent numbers. Use political logic and verified landmarks',
    },
    {
      prompt: 'Does Lahore 1940 text equal Two-Nation slogan alone?',
      answer: 'No. It is a League territorial demand shaped by that politics',
    },
  ],
  mistakes: [
    {
      trap: 'Reducing Two-Nation Theory to hatred or only cultural difference.',
      correct: 'Present it as a political claim about power, identity, and security under democracy.',
    },
    {
      trap: 'Saying the theory alone created Pakistan without League politics and 1947 bargaining.',
      correct: 'Link idea to League demand (1940) and statehood (1947). Partition politics mattered.',
    },
    {
      trap: 'Ignoring critics entirely in a critically examine question.',
      correct: 'Add composite nationalism and diversity critiques for balance.',
    },
    {
      trap: 'Inventing quotations, referendum percentages, or fake scholarly surveys.',
      correct: 'Use verified landmarks and clear political reasoning only.',
    },
    {
      trap: 'Mixing nation claim with the exact 1947 map as if they were identical from day one.',
      correct: 'Nationhood claim came first in politics. The territorial settlement was later and contested.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Learn definition and political logic in five lines.' },
    { day: 'Day 2', task: 'Memorise 1930 / 1940 / 1947 link without myths.' },
    { day: 'Day 3', task: 'Write a balanced outline with one critics paragraph.' },
    { day: 'Day 4', task: 'Drill flashcards.' },
    { day: 'Day 5', task: 'Attempt the critically examine variant.' },
    { day: 'Day 6', task: 'One-pager + citations. Practice MCQs.' },
    { day: 'Day 7', task: 'Recite definition, link, and one critic angle from memory.' },
  ],
  sourcesLine:
    'Sources: standard Pakistan Movement and ideology histories; FPSC Ideology of Pakistan syllabus framing. Avoid WhatsApp quote banks and invented statistics.',
}
