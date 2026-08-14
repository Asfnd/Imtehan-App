import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked careful markers:
 * - Durand Line: colonial-era boundary (1893) between British India and Afghanistan; remains a sensitive name-level border issue in Pakistan-Afghanistan relations
 * - Refugees: large Afghan refugee presence in Pakistan across decades of conflict (speak in trends, avoid fake exact headcounts for 2026)
 * - Post-2021: Taliban return to power in Kabul after US/NATO withdrawal; Pakistan faces border security, trade, refugees, and recognition/diplomacy debates
 * Exam framing: geography, security interdependence, trade transit, refugees, and diplomacy. Avoid conspiracy essays and invented treaties.
 */
export const AFGHANISTAN_PAKISTAN_RELATIONS_KIT: NoteKitData = {
  id: 'afghanistan-pakistan-relations',
  title: 'Afghanistan-Pakistan Relations',
  subtitle:
    'Durand Line at name level, refugees, security interdependence, and careful post-2021 exam framing.',
  syllabusTags: [
    'Foreign policy of Pakistan',
    'Neighbourhood',
    'Afghanistan',
    'Current Affairs',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS pattern',
      directive: 'Discuss',
      angle: 'Pakistan-Afghanistan relations: issues and prospects',
      frequency: 'high',
    },
    {
      year: 'CSS / PMS',
      directive: 'Critically examine',
      angle: 'Border security and refugee challenges',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Evaluate',
      angle: 'Implications of post-2021 Afghanistan for Pakistan',
      frequency: 'high',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'Durand Line 1893; neighbour geography',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Pakistan and Afghanistan share a long border, tribal and trade linkages, and deep security interdependence. Geography makes isolation impossible.',
    'Durand Line (1893) is the colonial-era boundary often cited as a sensitive name-level issue in bilateral politics. Keep it factual; do not invent modern treaty myths.',
    'Afghan conflicts (Soviet war, civil war, post-2001 war, and post-2021 transition) repeatedly produced refugee inflows, militant spillover risk, and trade disruption for Pakistan.',
    'Refugees: Pakistan hosted large Afghan refugee populations for decades. Discuss humanitarian, economic, and security management themes without fake precise 2026 census numbers.',
    'Post-2021 framing for exams: Taliban authorities in Kabul after foreign troop withdrawal; Pakistan seeks border stability, counter-terror cooperation, managed refugee policy, and trade or transit normality. Recognition and diplomacy remain contested internationally; write carefully.',
    'Positive agenda themes: peaceful Afghanistan, trade corridors, people-to-people ties, and regional connectivity without proxy-war language.',
    'Critical balance: blame games score poorly. Interdependence, border management, and inclusive Afghan stability are stronger analytical frames.',
  ],
  answerSteps: [
    'Open with geography and security interdependence.',
    'State Durand Line as a name-level historical border marker (1893).',
    'Explain conflict cycles and refugee/security spillover for Pakistan.',
    'Address post-2021 carefully: stability needs, border security, trade, refugees.',
    'Add one critical point: sustainable peace requires Afghan inclusivity and regional non-interference norms.',
    'Close with prospects: managed borders, economic links, and diplomacy over slogans.',
  ],
  questionVariants: [
    'Discuss the main issues in Pakistan-Afghanistan relations.',
    'Critically examine the impact of Afghan conflicts on Pakistan.',
    'Evaluate Pakistan\'s challenges and options after the 2021 change in Kabul.',
    'How do the Durand Line and refugee questions shape bilateral ties? Discuss.',
  ],
  citations: [
    {
      label: 'Durand Line',
      text: 'Durand Line (1893) is the colonial-era boundary between British India and Afghanistan, still a sensitive bilateral marker.',
    },
    {
      label: 'Interdependence',
      text: 'Shared border, trade/transit, refugees, and security spillovers tie the two states tightly.',
    },
    {
      label: 'Refugees',
      text: 'Pakistan hosted large Afghan refugee populations across successive Afghan wars; treat figures as trends unless sourced.',
    },
    {
      label: 'Post-2021',
      text: 'After 2021, Kabul\'s political change raised border security, refugee, trade, and diplomacy questions for Pakistan.',
    },
    {
      label: 'Exam caution',
      text: 'Avoid invented recognition claims, fake treaties, and conspiracy narratives.',
    },
  ],
  flashcards: [
    {
      prompt: 'In which year was the Durand Line agreed?',
      answer: '1893',
    },
    {
      prompt: 'What is the Durand Line in one sentence?',
      answer: 'Colonial-era boundary between British India and Afghanistan',
    },
    {
      prompt: 'Name two long-running bilateral issue themes.',
      answer: 'Border/security management and refugees (or trade/transit)',
    },
    {
      prompt: 'Why does Afghan instability hit Pakistan hard?',
      answer: 'Spillover risk, refugees, trade disruption, and border pressure',
    },
    {
      prompt: 'What year marks the post-US/NATO withdrawal transition often tested?',
      answer: '2021',
    },
    {
      prompt: 'Trap: inventing an exact current refugee headcount.',
      answer: 'Use trends or cite a named UNHCR/official source year',
    },
    {
      prompt: 'Name one constructive bilateral agenda item.',
      answer: 'Trade/transit, border management, or peaceful connectivity',
    },
    {
      prompt: 'Should answers claim Pakistan fully controls Afghan outcomes?',
      answer: 'No. Stress interdependence and limits of unilateral control',
    },
    {
      prompt: 'What tone fits post-2021 CSS answers?',
      answer: 'Careful, factual, non-conspiratorial, focused on security and diplomacy',
    },
    {
      prompt: 'Link Durand Line to exam caution.',
      answer: 'Name-level historical fact; do not invent modern legal fairy tales',
    },
  ],
  mistakes: [
    {
      trap: 'Writing a conspiracy essay about foreign puppets as the whole story.',
      correct: 'Use geography, institutions, and interests. Keep claims sourceable.',
    },
    {
      trap: 'Inventing exact refugee totals or recognition dates from memory myths.',
      correct: 'Speak in careful trends or cite named official/UN sources.',
    },
    {
      trap: 'Ignoring the Durand Line when the question is about border disputes.',
      correct: 'It is the classic name-level marker. State 1893 factually.',
    },
    {
      trap: 'Treating post-2021 as simple victory or simple disaster in one word.',
      correct: 'Use a balance sheet: security risks, diplomacy, trade, humanitarian management.',
    },
    {
      trap: 'Forgetting Pakistan\'s own stake in a peaceful Afghanistan.',
      correct: 'Stability next door is a Pakistani national interest in standard answers.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Read geography, Durand Line, refugee themes.' },
    { day: 'Day 2', task: 'Memorise 1893 and interdependence logic.' },
    { day: 'Day 3', task: 'Write a 10-minute outline on post-2021 challenges.' },
    { day: 'Day 4', task: 'Drill flashcards.' },
    { day: 'Day 5', task: 'Attempt critically examine border and refugee outline.' },
    { day: 'Day 6', task: 'One-pager + citations. Practice MCQs.' },
    { day: 'Day 7', task: 'One-pager only. Recite Durand Line and post-2021 frame.' },
  ],
  sourcesLine:
    'Sources: standard Pakistan foreign policy texts; Durand Line historical marker (1893); UNHCR and official refugee discussions when quoting numbers; FPSC neighbourhood syllabus items. Avoid partisan social-media war myths.',
}
