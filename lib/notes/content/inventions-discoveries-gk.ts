import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (classic one-paper GK inventions/discoveries):
 * - High-yield inventor-invention and discoverer-discovery pairs
 * - Prefer stable school-key facts; note that attribution can be contested historically
 * - Exam method: learn pairs and common traps (Bell/telephone; Edison/bulb; Wright brothers/flight)
 */
export const INVENTIONS_DISCOVERIES_GK_KIT: NoteKitData = {
  id: 'inventions-discoveries-gk',
  title: 'Inventions and Discoveries (High-Yield GK)',
  subtitle:
    'Classic inventor-invention and scientist-discovery pairs for one-paper General Knowledge MCQs.',
  syllabusTags: [
    'General Knowledge',
    'Inventions',
    'Discoveries',
    'One-paper GK',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'One-paper / MPT',
      directive: 'MCQ fact',
      angle: 'Who invented X / who discovered Y',
      frequency: 'high',
    },
    {
      year: 'PPSC / NTS / FPSC',
      directive: 'Match list',
      angle: 'Scientist-invention matching',
      frequency: 'high',
    },
    {
      year: 'CSS GK pattern',
      directive: 'MCQ fact',
      angle: 'Telephone, printing press, penicillin, gravity, relativity',
      frequency: 'medium',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'Distinguish invention vs discovery wording',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Exam habit: inventions are made (devices/processes); discoveries are found (laws, elements, microbes). Keys sometimes blur wording; read the stem carefully.',
    'Communication / print cluster: Johannes Gutenberg-printing press (movable type in Europe teaching); Alexander Graham Bell-telephone (classic key); Guglielmo Marconi-radio (often taught); Tim Berners-Lee-World Wide Web (not “the whole internet”).',
    'Electricity / light / sound cluster: Thomas Edison commonly keyed with practical incandescent bulb; Michael Faraday-electromagnetic induction; James Watt associated with improved steam engine (not “invented fire”).',
    'Transport cluster: Wright brothers-powered airplane flight (Kitty Hawk teaching); Karl Benz often keyed with practical automobile; George Stephenson associated with early steam locomotive development in school keys.',
    'Medicine / biology cluster: Edward Jenner-smallpox vaccine; Louis Pasteur-pasteurisation / germ work themes; Alexander Fleming-penicillin; William Harvey-blood circulation; Robert Koch linked with tuberculosis bacillus in many keys.',
    'Physics / chemistry cluster: Isaac Newton-laws of motion / universal gravitation (discovery framing); Albert Einstein-relativity; Marie Curie-radioactivity research / radium-polonium associations; Dmitri Mendeleev-periodic table; James Chadwick-neutron (classic advanced key).',
  ],
  answerSteps: [
    'Classify the stem: invention or discovery.',
    'Recall the standard school-key pair first.',
    'Watch near-miss distractors (Edison vs Swan; Bell vs competitors).',
    'For modern IT, separate WWW (Berners-Lee) from internet infrastructure.',
    'Mark only the keyed association unless the question asks for nuance.',
  ],
  questionVariants: [
    'Who invented the telephone / printing press / airplane?',
    'Who discovered penicillin / circulation of blood / neutron?',
    'Match list: scientist with invention or discovery.',
    'Tim Berners-Lee is associated with which development?',
  ],
  citations: [
    {
      label: 'Telephone',
      text: 'Classic one-paper key: Alexander Graham Bell associated with the telephone.',
    },
    {
      label: 'Penicillin',
      text: 'Alexander Fleming associated with the discovery of penicillin.',
    },
    {
      label: 'Flight',
      text: 'Wright brothers associated with powered airplane flight in standard keys.',
    },
    {
      label: 'WWW',
      text: 'Tim Berners-Lee associated with the World Wide Web.',
    },
    {
      label: 'Periodic table',
      text: 'Dmitri Mendeleev associated with the periodic table in school keys.',
    },
  ],
  flashcards: [
    { prompt: 'Telephone (classic key)?', answer: 'Alexander Graham Bell' },
    { prompt: 'Printing press (Europe teaching)?', answer: 'Johannes Gutenberg' },
    { prompt: 'Penicillin?', answer: 'Alexander Fleming' },
    { prompt: 'Powered airplane flight?', answer: 'Wright brothers' },
    { prompt: 'World Wide Web?', answer: 'Tim Berners-Lee' },
    { prompt: 'Periodic table?', answer: 'Dmitri Mendeleev' },
    { prompt: 'Smallpox vaccine?', answer: 'Edward Jenner' },
    { prompt: 'Blood circulation?', answer: 'William Harvey' },
    { prompt: 'Neutron?', answer: 'James Chadwick' },
    { prompt: 'Radio (often taught)?', answer: 'Guglielmo Marconi' },
    { prompt: 'Practical automobile (common key)?', answer: 'Karl Benz' },
    { prompt: 'Pasteurisation association?', answer: 'Louis Pasteur' },
  ],
  mistakes: [
    {
      trap: 'Crediting Berners-Lee with inventing the entire internet.',
      correct: 'Standard key: World Wide Web. Internet infrastructure is broader.',
    },
    {
      trap: 'Mixing Fleming (penicillin) with Jenner (smallpox vaccine).',
      correct: 'Fleming-penicillin; Jenner-smallpox vaccine.',
    },
    {
      trap: 'Writing Newton “invented gravity”.',
      correct: 'Frame as discovery/formulation of universal gravitation / laws of motion.',
    },
    {
      trap: 'Marking Edison for every electrical device.',
      correct: 'Use the specific classic associations; Faraday for induction is a common separate key.',
    },
    {
      trap: 'Ignoring that historical attribution can be contested, then arguing in an MCQ.',
      correct: 'For MCQs, mark the standard school key unless the stem asks otherwise.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Memorise communication and print pairs.' },
    { day: 'Day 2', task: 'Memorise medicine/biology pairs.' },
    { day: 'Day 3', task: 'Memorise physics/chemistry pairs.' },
    { day: 'Day 4', task: 'Memorise transport and electricity pairs.' },
    { day: 'Day 5', task: 'Mixed match-list drill.' },
    { day: 'Day 6', task: 'Trap drill: WWW vs internet; Jenner vs Fleming.' },
    { day: 'Day 7', task: 'One-pager only. Recite 20 pairs from memory.' },
  ],
  sourcesLine:
    'Sources: standard one-paper GK invention/discovery lists used in FPSC/PPSC/NTS preparation. Prefer stable school keys; historical priority disputes are usually beyond MCQ scope.',
}
