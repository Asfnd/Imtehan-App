import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (classic one-paper GK capitals teaching):
 * - High-yield clusters: South Asia, Central Asia, Middle East, Europe oddities, Africa, Americas, Pacifica
 * - Focus on frequently tested and often confused pairs
 * - Do not invent obscure microstate capitals as if they were CSS keys
 */
export const WORLD_CAPITALS_HIGH_YIELD_KIT: NoteKitData = {
  id: 'world-capitals-high-yield',
  title: 'World Capitals High-Yield Clusters',
  subtitle:
    'Classic GK capital clusters and confusion pairs for one-paper and CSS General Knowledge.',
  syllabusTags: [
    'General Knowledge',
    'World capitals',
    'One-paper GK',
    'Geography basics',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'One-paper / MPT',
      directive: 'MCQ fact',
      angle: 'Capital of X / country of capital Y',
      frequency: 'high',
    },
    {
      year: 'PPSC / NTS / FPSC',
      directive: 'MCQ fact',
      angle: 'Confused pairs (Australia, Netherlands, South Africa, Tanzania)',
      frequency: 'high',
    },
    {
      year: 'CSS GK pattern',
      directive: 'MCQ fact',
      angle: 'Regional capital clusters',
      frequency: 'medium',
    },
    {
      year: 'One-paper',
      directive: 'Match list',
      angle: 'Country-capital matching',
      frequency: 'high',
    },
  ],
  onePager: [
    'South Asia cluster: India-New Delhi; Pakistan-Islamabad; Bangladesh-Dhaka; Sri Lanka-Sri Jayawardenepura Kotte (commercial Colombo often traps); Nepal-Kathmandu; Bhutan-Thimphu; Maldives-Male; Afghanistan-Kabul.',
    'China and East Asia traps: China-Beijing; Japan-Tokyo; South Korea-Seoul; North Korea-Pyongyang; Mongolia-Ulaanbaatar; Taiwan often listed Taipei in GK keys (political status is separate from MCQ capital habit).',
    'Central / West Asia: Kazakhstan-Astana (also known as Nur-Sultan in an intervening period; check latest key carefully); Uzbekistan-Tashkent; Turkmenistan-Ashgabat; Kyrgyzstan-Bishkek; Tajikistan-Dushanbe; Iran-Tehran; Iraq-Baghdad; Saudi Arabia-Riyadh; UAE-Abu Dhabi (Dubai is not the capital); Qatar-Doha; Turkey-Ankara (not Istanbul).',
    'Europe oddities: Netherlands-Amsterdam (seat of government The Hague is a classic trap); Switzerland-Bern; Portugal-Lisbon; Greece-Athens; Czechia-Prague; Ukraine-Kyiv; Russia-Moscow.',
    'Africa / multi-capital traps: South Africa has Pretoria (administrative), Cape Town (legislative), Bloemfontein (judicial) in common GK teaching; Tanzania-Dodoma (Dar es Salaam often wrongly chosen); Egypt-Cairo; Nigeria-Abuja (not Lagos); Kenya-Nairobi; Ethiopia-Addis Ababa.',
    'Americas / Oceania: USA-Washington, D.C.; Canada-Ottawa (not Toronto); Brazil-Brasilia (not Rio/Sao Paulo); Argentina-Buenos Aires; Australia-Canberra (not Sydney); New Zealand-Wellington (not Auckland).',
  ],
  answerSteps: [
    'Learn by region clusters, not alphabetical cramming.',
    'Drill confusion pairs daily (Sydney/Canberra, Istanbul/Ankara, Dubai/Abu Dhabi).',
    'For multi-capital South Africa, know which function is asked if specified.',
    'Rehearse match-the-list by covering one column.',
    'Keep a personal “always miss” list of 15 capitals.',
  ],
  questionVariants: [
    'What is the capital of Australia / Canada / Brazil / Nigeria?',
    'Match the following countries with their capitals.',
    'Which city is the capital of the UAE / Turkey / Netherlands?',
    'Identify the odd one out in a capital list.',
  ],
  citations: [
    {
      label: 'Australia trap',
      text: 'Capital of Australia is Canberra, not Sydney or Melbourne.',
    },
    {
      label: 'Turkey trap',
      text: 'Capital of Turkey is Ankara, not Istanbul.',
    },
    {
      label: 'UAE trap',
      text: 'Capital of the UAE is Abu Dhabi, not Dubai.',
    },
    {
      label: 'Canada / Brazil',
      text: 'Canada: Ottawa. Brazil: Brasilia.',
    },
    {
      label: 'South Africa',
      text: 'Common GK teaching lists Pretoria, Cape Town, and Bloemfontein for different government functions.',
    },
  ],
  flashcards: [
    { prompt: 'Capital of Australia?', answer: 'Canberra' },
    { prompt: 'Capital of Canada?', answer: 'Ottawa' },
    { prompt: 'Capital of Brazil?', answer: 'Brasilia' },
    { prompt: 'Capital of Turkey?', answer: 'Ankara' },
    { prompt: 'Capital of UAE?', answer: 'Abu Dhabi' },
    { prompt: 'Capital of Nigeria?', answer: 'Abuja' },
    { prompt: 'Capital of New Zealand?', answer: 'Wellington' },
    { prompt: 'Capital of Tanzania (modern GK key)?', answer: 'Dodoma' },
    { prompt: 'Capital of Netherlands?', answer: 'Amsterdam (The Hague often tested as seat of government)' },
    { prompt: 'Administrative capital commonly listed for South Africa?', answer: 'Pretoria' },
    { prompt: 'Capital of Kazakhstan (current common name in many keys)?', answer: 'Astana (note prior Nur-Sultan period in some materials)' },
    { prompt: 'Capital of Sri Lanka (official)?', answer: 'Sri Jayawardenepura Kotte (Colombo is commercial hub trap)' },
  ],
  mistakes: [
    {
      trap: 'Marking Sydney as Australia’s capital.',
      correct: 'Canberra is the capital.',
    },
    {
      trap: 'Marking Dubai as UAE’s capital or Istanbul as Turkey’s.',
      correct: 'Abu Dhabi and Ankara respectively.',
    },
    {
      trap: 'Marking Toronto, Rio, Lagos, or Auckland as capitals.',
      correct: 'Ottawa, Brasilia, Abuja, Wellington.',
    },
    {
      trap: 'Ignoring South Africa’s multi-capital teaching.',
      correct: 'Know Pretoria / Cape Town / Bloemfontein function split used in many keys.',
    },
    {
      trap: 'Memorising only Europe and skipping Asia-Africa confusion pairs.',
      correct: 'Most one-paper traps sit in Asia, Africa, and Oceania pairs.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Drill South Asia + East Asia cluster.' },
    { day: 'Day 2', task: 'Drill Central/West Asia confusion pairs.' },
    { day: 'Day 3', task: 'Drill Europe oddities.' },
    { day: 'Day 4', task: 'Drill Africa multi-capital and moved-capital traps.' },
    { day: 'Day 5', task: 'Drill Americas and Oceania.' },
    { day: 'Day 6', task: 'Mixed MCQ set of 40 capitals.' },
    { day: 'Day 7', task: 'One-pager clusters only. Recite top 20 traps.' },
  ],
  sourcesLine:
    'Sources: standard one-paper GK country-capital lists; commonly tested confusion pairs in FPSC/PPSC/NTS keys. Prefer high-yield clusters over obscure microstate cramming.',
}
