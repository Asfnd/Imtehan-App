import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (FSC under 1973 carefully):
 * - Part VII, Chapter 3A of the Constitution: Federal Shariat Court (from Art 203A onward)
 * - Jurisdiction theme: examine and decide whether a law or provision is repugnant to the Injunctions of Islam as in Quran and Sunnah (constitutional Shariat jurisdiction name-level)
 * - Appeals / review pathway in teaching: Shariat Appellate Bench of the Supreme Court (standard exam label)
 * - Distinct from ordinary High Courts and from the Council of Islamic Ideology (advisory)
 * - Historical note carefully: FSC created in the Zia period and entrenched in the constitutional chapter; do not invent fake case holdings as permanent trivia
 * Avoid overstating that FSC replaced all civil courts or that every law has been Islamised
 */
export const FEDERAL_SHARIAT_COURT_KIT: NoteKitData = {
  id: 'federal-shariat-court',
  title: 'Federal Shariat Court',
  subtitle:
    'Chapter 3A (Arts 203A onward), Shariat jurisdiction over laws, and contrast with CII for CSS and Islamiat overlap.',
  syllabusTags: [
    'Federal Shariat Court',
    'Islamic provisions',
    '1973 Constitution',
    'Article 203A',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS / PMS',
      directive: 'Discuss',
      angle: 'Role of the Federal Shariat Court',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Evaluate',
      angle: 'Shariat jurisdiction under Chapter 3A',
      frequency: 'high',
    },
    {
      year: 'Islamiat / PA',
      directive: 'Critically examine',
      angle: 'FSC as an Islamisation institution and its limits',
      frequency: 'medium',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'Art 203A chapter; repugnancy jurisdiction; contrast with CII',
      frequency: 'high',
    },
  ],
  onePager: [
    'The Federal Shariat Court (FSC) is provided in Part VII, Chapter 3A of the 1973 Constitution, beginning at Article 203A.',
    'Core jurisdiction theme: decide whether a law or a provision of a law is repugnant to the Injunctions of Islam as laid down in the Holy Quran and Sunnah.',
    'Institutional place: a specialised constitutional court for Shariat questions about laws, distinct from ordinary civil and criminal appellate work of High Courts (except where the constitutional scheme assigns overlapping or related roles).',
    'Appellate teaching label: decisions may be taken to the Shariat Appellate Bench of the Supreme Court in the standard exam map.',
    'Contrast with Council of Islamic Ideology: CII (Arts 228-230) advises on Islamisation; FSC adjudicates Shariat repugnancy questions about laws.',
    'Link to Art 227: the broader constitutional mandate to bring laws into conformity with Islam sits alongside institutional tools (CII advice and FSC jurisdiction).',
    'Critical limits: not every dispute is a Shariat-court matter; Fundamental Rights and parliamentary legislation still structure the wider legal system. Do not claim total Islamisation of the statute book.',
    'Answer close: FSC is a key Islamic-provisions institution; write jurisdiction carefully, keep CII distinct, and avoid mythic case trivia.',
  ],
  answerSteps: [
    'Locate FSC in Chapter 3A from Art 203A.',
    'State repugnancy-to-Islam jurisdiction over laws at name level.',
    'Note Shariat Appellate Bench pathway in teaching.',
    'Distinguish FSC from High Courts and from CII.',
    'Link to Art 227 conformity mandate without overclaim.',
    'Close with balanced limits of Shariat jurisdiction.',
  ],
  questionVariants: [
    'Discuss the role of the Federal Shariat Court under the 1973 Constitution.',
    'Evaluate Chapter 3A Shariat jurisdiction.',
    'Critically examine the Federal Shariat Court as an Islamisation institution.',
    'Distinguish the Federal Shariat Court from the Council of Islamic Ideology.',
  ],
  citations: [
    {
      label: 'Chapter 3A',
      text: 'Federal Shariat Court is provided in Part VII Chapter 3A of the Constitution, from Article 203A onward.',
    },
    {
      label: 'Jurisdiction theme',
      text: 'Examine whether laws or provisions are repugnant to the Injunctions of Islam as in the Quran and Sunnah.',
    },
    {
      label: 'Appeal label',
      text: 'Standard teaching maps appeals/review to the Shariat Appellate Bench of the Supreme Court.',
    },
    {
      label: 'Contrast with CII',
      text: 'CII advises under Arts 228-230. FSC adjudicates Shariat questions about laws.',
    },
    {
      label: 'Art 227 link',
      text: 'Art 227 conformity/non-repugnancy mandate is the wider constitutional policy backdrop for Islamic institutions.',
    },
  ],
  flashcards: [
    {
      prompt: 'Where is the Federal Shariat Court placed in the Constitution?',
      answer: 'Part VII, Chapter 3A, from Article 203A onward',
    },
    {
      prompt: 'What is the FSC core jurisdiction theme?',
      answer: 'Whether a law or provision is repugnant to Islamic Injunctions (Quran and Sunnah)',
    },
    {
      prompt: 'What Supreme Court bench label appears in FSC appeal teaching?',
      answer: 'Shariat Appellate Bench of the Supreme Court',
    },
    {
      prompt: 'How does FSC differ from CII?',
      answer: 'FSC adjudicates; CII advises',
    },
    {
      prompt: 'Which Article cluster covers CII instead?',
      answer: 'Articles 228 to 230',
    },
    {
      prompt: 'Which Article states the broad conformity mandate for laws?',
      answer: 'Article 227',
    },
    {
      prompt: 'Is FSC the same as a provincial High Court?',
      answer: 'No; it is a specialised constitutional Shariat court under Chapter 3A',
    },
    {
      prompt: 'Should answers claim every statute is already Islamised?',
      answer: 'No; jurisdiction and mandate differ from completed Islamisation',
    },
    {
      prompt: 'What trap mixes FSC with Objectives Resolution?',
      answer: 'Objectives Resolution is Art 2A ideology text; FSC is a court institution',
    },
    {
      prompt: 'What balanced closing line scores?',
      answer: 'Specialised Shariat jurisdiction over laws, with clear limits and CII contrast',
    },
  ],
  mistakes: [
    {
      trap: 'Saying CII and FSC are the same body.',
      correct: 'CII advises (228-230). FSC adjudicates (203A chapter).',
    },
    {
      trap: 'Claiming FSC replaced all ordinary courts.',
      correct: 'FSC has specialised Shariat jurisdiction over laws; ordinary courts continue.',
    },
    {
      trap: 'Inventing famous case holdings as permanent MCQ facts without source.',
      correct: 'Stick to constitutional structure unless a named leading case is required and verified.',
    },
    {
      trap: 'Ignoring the Shariat Appellate Bench pathway.',
      correct: 'Include the Supreme Court Shariat Appellate Bench label in the institutional map.',
    },
    {
      trap: 'Writing that Art 227 alone creates the FSC.',
      correct: 'Art 227 is the conformity mandate; FSC is Chapter 3A from Art 203A.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Chapter 3A / Art 203A location.' },
    { day: 'Day 2', task: 'Repugnancy jurisdiction wording.' },
    { day: 'Day 3', task: 'FSC vs CII vs High Courts.' },
    { day: 'Day 4', task: 'Flashcards.' },
    { day: 'Day 5', task: 'Art 227 link paragraph.' },
    { day: 'Day 6', task: '10-minute discuss outline.' },
    { day: 'Day 7', task: 'Recite one-pager.' },
  ],
  sourcesLine:
    'Sources: Constitution Chapter 3A (Arts 203A onward), Art 227 teaching, and standard Islamic provisions primers distinguishing FSC from CII. Avoid unsourced case mythology.',
}
