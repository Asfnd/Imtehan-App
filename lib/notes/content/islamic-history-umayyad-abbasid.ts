import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (high-yield carefully respectful Islamic history teaching):
 * - Umayyad Caliphate: first dynastic caliphate after Khulafa-e-Rashideen; capital Damascus; Muawiya often taught as founder figure in school chronologies
 * - Expansion themes: North Africa, Spain (Andalus), and further east appear in standard notes
 * - Abbasid Caliphate: succeeded Umayyads; capital Baghdad; classical age associated with learning, translation, and administration themes
 * - Keep factual and non-sectarian; avoid invented battle casualty myths and contested polemics as certainty
 */
export const ISLAMIC_HISTORY_UMAYYAD_ABBASID_KIT: NoteKitData = {
  id: 'islamic-history-umayyad-abbasid',
  title: 'Islamic History: Umayyad and Abbasid Caliphates',
  subtitle:
    'High-yield chronology, capitals, and civilisation themes for CSS/PMS Islamiat, framed carefully and respectfully.',
  syllabusTags: [
    'Islamiat',
    'Islamic history',
    'Umayyad',
    'Abbasid',
    'Islamic civilization',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS / PMS Islamiat',
      directive: 'Discuss',
      angle: 'Achievements of the Umayyad and Abbasid periods',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Compare',
      angle: 'Umayyad and Abbasid administration and culture',
      frequency: 'high',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'Capitals Damascus and Baghdad; dynastic sequence',
      frequency: 'high',
    },
    {
      year: 'Islamiat',
      directive: 'Examine',
      angle: 'Contribution of Abbasids to learning and civilisation',
      frequency: 'high',
    },
  ],
  onePager: [
    'After the Khulafa-e-Rashideen, Islamic political history is commonly taught through two major dynastic caliphates: Umayyad then Abbasid. Memorise sequence for MCQs.',
    'Umayyad Caliphate: first hereditary dynastic caliphate in standard school chronologies. Capital: Damascus. Muawiya is widely taught as the founder figure of Umayyad rule.',
    'Umayyad high-yield themes: territorial expansion (North Africa, Andalus/Spain, and further frontiers in teaching outlines), Arabic administrative consolidation, and postal/military organisation themes. Keep expansion as geography themes, not invented casualty lists.',
    'Abbasid Caliphate: succeeded the Umayyads. Capital: Baghdad (classic exam fact). Often associated with a classical age of learning, translation movement, sciences, and sophisticated bureaucracy in mainstream notes.',
    'Civilisation scoring points: paper, libraries, translation of knowledge traditions, and urban scholarly culture under Abbasid patronage themes. Avoid inventing exact library catalogue numbers.',
    'Careful framing: later political fragmentation and regional dynasties appear in advanced notes. For one-paper and core essays, prioritise capitals, sequence, expansion vs learning contrast, and respectful non-sectarian tone.',
    'Exam use: Damascus vs Baghdad, dynastic shift, expansion (Umayyad) vs intellectual flourishing (Abbasid) as a clean compare structure.',
  ],
  answerSteps: [
    'Place both dynasties after the rightly guided caliphs in sequence.',
    'State Umayyad capital Damascus and founder framing (Muawiya) carefully.',
    'Give Umayyad themes: expansion and administrative consolidation.',
    'State Abbasid capital Baghdad and succession after Umayyads.',
    'Give Abbasid themes: learning, translation, sciences, bureaucracy.',
    'Close with a respectful civilisation lesson: political power plus knowledge culture.',
  ],
  questionVariants: [
    'Discuss the main features of the Umayyad Caliphate.',
    'Examine the contribution of the Abbasids to Islamic civilisation.',
    'Compare the Umayyad and Abbasid periods.',
    'Baghdad under the Abbasids became a centre of learning. Discuss.',
  ],
  citations: [
    {
      label: 'Sequence',
      text: 'In standard teaching, the Umayyad dynastic caliphate follows the Khulafa-e-Rashideen and precedes the Abbasid caliphate.',
    },
    {
      label: 'Umayyad capital',
      text: 'Damascus is the classic capital associated with the Umayyad Caliphate.',
    },
    {
      label: 'Abbasid capital',
      text: 'Baghdad is the classic capital associated with the Abbasid Caliphate.',
    },
    {
      label: 'Umayyad theme',
      text: 'Territorial expansion and administrative consolidation are standard Umayyad high-yield themes.',
    },
    {
      label: 'Abbasid theme',
      text: 'Learning, translation, sciences, and bureaucratic culture are standard Abbasid civilisation themes.',
    },
  ],
  flashcards: [
    {
      prompt: 'What was the classic Umayyad capital?',
      answer: 'Damascus',
    },
    {
      prompt: 'What was the classic Abbasid capital?',
      answer: 'Baghdad',
    },
    {
      prompt: 'Which dynasty comes first: Umayyad or Abbasid?',
      answer: 'Umayyad, then Abbasid',
    },
    {
      prompt: 'Who is widely taught as founder figure of Umayyad rule?',
      answer: 'Muawiya',
    },
    {
      prompt: 'Name two Umayyad high-yield themes.',
      answer: 'Territorial expansion and administrative consolidation',
    },
    {
      prompt: 'Name two Abbasid high-yield themes.',
      answer: 'Learning/translation and sciences (or bureaucracy)',
    },
    {
      prompt: 'Which region name is often linked with Muslim Spain in Umayyad-era expansion notes?',
      answer: 'Andalus',
    },
    {
      prompt: 'What compare structure scores in essays?',
      answer: 'Umayyad expansion/administration vs Abbasid learning/civilisation',
    },
    {
      prompt: 'What tone should Islamiat history answers keep?',
      answer: 'Factual, respectful, and non-sectarian',
    },
  ],
  mistakes: [
    {
      trap: 'Swapping Damascus and Baghdad.',
      correct: 'Umayyad: Damascus; Abbasid: Baghdad.',
    },
    {
      trap: 'Placing Abbasids before Umayyads.',
      correct: 'Sequence in standard teaching: Umayyad then Abbasid.',
    },
    {
      trap: 'Inventing exact casualty figures or polemical blame narratives.',
      correct: 'Use geography, administration, and civilisation themes.',
    },
    {
      trap: 'Writing only battles with no learning or administration.',
      correct: 'Abbasid answers especially need civilisation and knowledge themes.',
    },
    {
      trap: 'Sectarian sloganising.',
      correct: 'Keep CSS/PMS answers factual and respectful.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Sequence after Khulafa-e-Rashideen.' },
    { day: 'Day 2', task: 'Umayyad: Damascus, Muawiya, expansion themes.' },
    { day: 'Day 3', task: 'Abbasid: Baghdad, learning, translation.' },
    { day: 'Day 4', task: 'Flashcards twice.' },
    { day: 'Day 5', task: 'Compare table: expansion vs civilisation.' },
    { day: 'Day 6', task: '10-minute discuss outline.' },
    { day: 'Day 7', task: 'Recite one-pager.' },
  ],
  sourcesLine:
    'Sources: mainstream Islamiat Islamic history notes on Umayyad and Abbasid chronology, capitals, expansion, and civilisation themes. Keep respectful non-sectarian framing; avoid invented casualty myths.',
}
