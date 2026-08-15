import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (exam-safe regional framing):
 * - CARs: Kazakhstan, Kyrgyzstan, Tajikistan, Turkmenistan, Uzbekistan (standard five)
 * - Pakistan interest themes: connectivity (land routes via Afghanistan/Iran), energy (gas/oil/electricity ideas), trade, SCO/ECO forums
 * - Geography constraint: no direct land border with CARs; Afghanistan/Iran corridors matter
 * - Avoid inventing completed mega-project status or fake trade volumes as permanent facts
 */
export const PAKISTAN_CENTRAL_ASIA_RELATIONS_KIT: NoteKitData = {
  id: 'pakistan-central-asia-relations',
  title: 'Pakistan and Central Asia Relations',
  subtitle:
    'CARs connectivity, energy corridors, trade potential, and forum diplomacy for CSS and PMS current affairs.',
  syllabusTags: [
    'Foreign policy',
    'Central Asia',
    'Connectivity',
    'Energy',
    'Current affairs',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS / PMS',
      directive: 'Discuss',
      angle: 'Pakistan relations with Central Asian Republics',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Evaluate',
      angle: 'Connectivity and energy potential with Central Asia',
      frequency: 'high',
    },
    {
      year: 'CSS Current Affairs',
      directive: 'Critically examine',
      angle: 'Obstacles to Pakistan-Central Asia trade corridors',
      frequency: 'medium',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'Five CARs; ECO/SCO themes; no direct land border',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Central Asian Republics (CARs): Kazakhstan, Kyrgyzstan, Tajikistan, Turkmenistan, Uzbekistan. Cultural and historical links exist, but modern policy is driven by connectivity and energy.',
    'Geography fact for exams: Pakistan has no direct land border with the five CARs. Access depends on transit through Afghanistan and/or Iran corridors.',
    'Connectivity goal: shorter trade routes linking Central Asia to Pakistani ports (especially Gwadar/Karachi themes) so landlocked CARs reach the Arabian Sea.',
    'Energy themes: gas pipeline ideas, electricity trade concepts, and oil/gas cooperation appear in syllabus and current-affairs teaching. Treat as potential, not guaranteed completed outcomes.',
    'Trade: textiles, agriculture, pharmaceuticals, and transit services are common opportunity lists. Volumes remain constrained by logistics and politics.',
    'Forums: ECO and SCO provide multilateral settings. Bilateral visits and MOUs also appear as diplomacy tools.',
    'Obstacles: Afghanistan instability, weak infrastructure, customs delays, financing gaps, and competing corridors through other neighbours.',
    'Answer close: secure transit reliability, upgrade border terminals and roads, pursue energy projects with bankable finance, and use ECO/SCO for practical facilitation.',
  ],
  answerSteps: [
    'Name the five CARs and state the no-direct-border constraint.',
    'Explain connectivity to Pakistani ports as the strategic hook.',
    'Add energy cooperation as a second pillar.',
    'List forums (ECO, SCO) briefly.',
    'Discuss obstacles honestly: Afghanistan transit, infrastructure, finance.',
    'Conclude with practical corridor and energy facilitation steps.',
  ],
  questionVariants: [
    'Discuss the significance of Central Asia for Pakistan foreign and economic policy.',
    'Evaluate connectivity prospects between Pakistan and the CARs.',
    'What obstacles hinder Pakistan-Central Asia energy and trade links?',
    'How can Pakistani ports serve landlocked Central Asia?',
  ],
  citations: [
    {
      label: 'Five CARs',
      text: 'Kazakhstan, Kyrgyzstan, Tajikistan, Turkmenistan, Uzbekistan.',
    },
    {
      label: 'Geography',
      text: 'No direct Pakistan-CAR land border; transit via Afghanistan/Iran corridors.',
    },
    {
      label: 'Connectivity',
      text: 'Link landlocked CARs to Arabian Sea ports as the core strategic theme.',
    },
    {
      label: 'Energy',
      text: 'Gas, power, and hydrocarbon cooperation appear as potential pillars in exam notes.',
    },
  ],
  flashcards: [
    {
      prompt: 'List the five Central Asian Republics.',
      answer: 'Kazakhstan, Kyrgyzstan, Tajikistan, Turkmenistan, Uzbekistan',
    },
    {
      prompt: 'Does Pakistan share a land border with CARs?',
      answer: 'No; transit depends on Afghanistan and/or Iran corridors',
    },
    {
      prompt: 'What is the main connectivity offer?',
      answer: 'Access to Arabian Sea ports for landlocked CARs',
    },
    {
      prompt: 'Name two multilateral forums often cited.',
      answer: 'ECO and SCO',
    },
    {
      prompt: 'Name one energy cooperation theme.',
      answer: 'Gas pipeline or electricity trade concepts (as potential)',
    },
    {
      prompt: 'What is the biggest transit risk theme?',
      answer: 'Afghanistan instability affecting corridor reliability',
    },
    {
      prompt: 'Should unfinished projects be called completed?',
      answer: 'No; describe potential and progress carefully',
    },
    {
      prompt: 'What closing reforms score?',
      answer: 'Transit reliability, terminals, bankable energy finance',
    },
    {
      prompt: 'Why do CARs matter beyond nostalgia?',
      answer: 'Trade, energy, and strategic depth through connectivity',
    },
    {
      prompt: 'What competing challenge should you mention?',
      answer: 'Alternative corridors through other neighbours',
    },
  ],
  mistakes: [
    {
      trap: 'Claiming a direct Pakistan-Central Asia land border.',
      correct: 'State clearly that transit corridors are required.',
    },
    {
      trap: 'Listing only cultural history without policy pillars.',
      correct: 'Lead with connectivity, energy, trade, and forums.',
    },
    {
      trap: 'Declaring mega-projects finished without evidence.',
      correct: 'Use potential and progress language.',
    },
    {
      trap: 'Ignoring Afghanistan as a transit variable.',
      correct: 'Corridor reliability is a core obstacle.',
    },
    {
      trap: 'Forgetting to name the five republics.',
      correct: 'Open with the CARs list when asked broadly.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Five CARs + no-direct-border map fact.' },
    { day: 'Day 2', task: 'Ports and connectivity paragraph.' },
    { day: 'Day 3', task: 'Energy themes and obstacles.' },
    { day: 'Day 4', task: 'Flashcards.' },
    { day: 'Day 5', task: 'ECO/SCO one-liners.' },
    { day: 'Day 6', task: '10-minute connectivity essay outline.' },
    { day: 'Day 7', task: 'Recite one-pager.' },
  ],
  sourcesLine:
    'Sources: standard Pakistan Central Asia connectivity and energy notes; ECO/SCO primers; geography of landlocked CARs. Avoid invented project completion claims and fake trade totals.',
}
