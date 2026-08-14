import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked:
 * - 1973 Constitution: federal parliamentary republic with provinces
 * - 18th Amendment (2010): major provincial autonomy package; concurrent list abolished
 * - NFC Award: National Finance Commission mechanism for vertical/horizontal fiscal shares
 * - Centre-province tensions are recurring around resources, roles, and capacity
 * - Do not invent fake NFC percentage schedules or fake article numbers beyond known framing
 */
export const FEDERATION_PROVINCIAL_AUTONOMY_KIT: NoteKitData = {
  id: 'federation-provincial-autonomy',
  title: 'Federation and Provincial Autonomy',
  subtitle:
    '1973 federal design, 18th Amendment and concurrent list, NFC Award concept, centre-province tensions.',
  syllabusTags: [
    'Constitutional development',
    'Federalism',
    'Governance',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS pattern',
      directive: 'Discuss',
      angle: 'Federalism and provincial autonomy under the 1973 Constitution',
      frequency: 'high',
    },
    {
      year: 'CSS / PMS',
      directive: 'Critically examine',
      angle: '18th Amendment and devolution of subjects to provinces',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Evaluate',
      angle: 'NFC Award and fiscal federalism in centre-province relations',
      frequency: 'medium',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: '18th Amendment concurrent list abolition; NFC concept',
      frequency: 'high',
    },
  ],
  onePager: [
    '1973 Constitution designs Pakistan as a federation: centre and provinces share power under a written constitution.',
    'Federal idea: unity with provincial space for culture, development, and local delivery. Senate is the formal provincial voice in Parliament.',
    '18th Amendment (2010): major autonomy package. Concurrent Legislative List abolished; many subjects moved toward provincial responsibility.',
    'Autonomy is not secession. Provinces gain legislative and administrative space within the federation.',
    'NFC Award (National Finance Commission): constitutional fiscal mechanism for sharing resources between federation and provinces (and among provinces).',
    'Centre-province tensions: resources, roles after devolution, capacity gaps, and political trust. Capacity and coordination matter as much as legal text.',
    'Exam rule: state federal design, name 18th Amendment change, explain NFC concept, add one tension line. Do not invent fake NFC percentage tables.',
  ],
  answerSteps: [
    'Define federation under the 1973 Constitution: divided powers, written constitution, provincial units.',
    'Explain why provincial autonomy matters for legitimacy and service delivery.',
    'State the 18th Amendment fact: concurrent list abolished and subjects devolved toward provinces (2010).',
    'Explain NFC Award as the fiscal sharing mechanism, not as a memorised fake percentage sheet.',
    'Add centre-province tensions: money, roles, capacity, and coordination after devolution.',
    'Close with a balanced judgment: legal autonomy needs administrative capacity to work.',
  ],
  questionVariants: [
    'Discuss federalism and provincial autonomy in Pakistan under the 1973 Constitution.',
    'Critically examine the 18th Amendment as a turning point in centre-province relations.',
    'Evaluate the role of the NFC Award in Pakistan’s fiscal federalism.',
    'Provincial autonomy without capacity is incomplete. Discuss.',
  ],
  citations: [
    {
      label: 'Federal design',
      text: 'The 1973 Constitution establishes a federal parliamentary republic with provinces as constituent units.',
    },
    {
      label: '18th Amendment',
      text: 'The Eighteenth Amendment (2010) strengthened provincial autonomy and abolished the Concurrent Legislative List.',
    },
    {
      label: 'Autonomy meaning',
      text: 'Provincial autonomy means greater provincial legislative and administrative space within the federation, not exit from the federation.',
    },
    {
      label: 'NFC Award',
      text: 'The National Finance Commission Award is the constitutional process for distributing financial resources between the federation and the provinces.',
    },
    {
      label: 'Tensions',
      text: 'Centre-province disputes commonly concern fiscal shares, post-devolution roles, and unequal provincial capacity.',
    },
  ],
  flashcards: [
    {
      prompt: 'What system does the 1973 Constitution create?',
      answer: 'A federal parliamentary republic with provinces',
    },
    {
      prompt: 'Year of the 18th Amendment?',
      answer: '2010',
    },
    {
      prompt: 'What list did the 18th Amendment abolish?',
      answer: 'Concurrent Legislative List',
    },
    {
      prompt: 'What does concurrent list abolition mean in practice?',
      answer: 'Many subjects shifted toward provincial responsibility',
    },
    {
      prompt: 'What does NFC stand for?',
      answer: 'National Finance Commission',
    },
    {
      prompt: 'What is an NFC Award?',
      answer: 'Fiscal sharing arrangement between federation and provinces (and among provinces)',
    },
    {
      prompt: 'Is provincial autonomy the same as secession?',
      answer: 'No. It is space inside the federation',
    },
    {
      prompt: 'Name one centre-province tension theme.',
      answer: 'Resources / post-devolution roles / capacity gaps',
    },
    {
      prompt: 'Trap: inventing exact NFC percentage tables?',
      answer: 'Explain the concept. Quote shares only from a verified Award text',
    },
    {
      prompt: 'Senate’s federal role in one line?',
      answer: 'Provincial voice in Parliament',
    },
  ],
  mistakes: [
    {
      trap: 'Saying the 18th Amendment created Pakistan’s federation.',
      correct: '1973 already designed a federation. The 18th Amendment deepened provincial autonomy.',
    },
    {
      trap: 'Treating concurrent list abolition as abolition of the federation.',
      correct: 'It shifted subjects toward provinces inside the same federal constitution.',
    },
    {
      trap: 'Memorising invented NFC percentage schedules as if they were permanent law.',
      correct: 'NFC Awards are periodic arrangements. Explain the mechanism; verify any share figures before using them.',
    },
    {
      trap: 'Equating autonomy demands with anti-state politics in every case.',
      correct: 'Autonomy is a constitutional federal theme. Critique capacity and coordination, not the idea itself by default.',
    },
    {
      trap: 'Ignoring capacity after praising devolution.',
      correct: 'Legal transfer of subjects needs provincial administrative and fiscal capacity to deliver services.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Learn 1973 federal design in five lines.' },
    { day: 'Day 2', task: 'Memorise 18th Amendment year and concurrent list fact.' },
    { day: 'Day 3', task: 'Write NFC concept without fake percentages.' },
    { day: 'Day 4', task: 'Drill flashcards.' },
    { day: 'Day 5', task: 'Attempt critically examine 18th Amendment outline.' },
    { day: 'Day 6', task: 'One-pager + citations.' },
    { day: 'Day 7', task: 'Recite design, amendment, NFC, and one tension from memory.' },
  ],
  sourcesLine:
    'Sources: 1973 Constitution federal design; Eighteenth Amendment (2010) concurrent list abolition; NFC as constitutional finance mechanism. Avoid unsourced percentage tables.',
}
