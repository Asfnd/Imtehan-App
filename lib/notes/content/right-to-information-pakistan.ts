import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (RTI name-level carefully):
 * - Art 19A (18th Amendment): every citizen shall have the right to have access to information in all matters of public importance subject to regulation and reasonable restrictions
 * - Federal: Freedom of Information Ordinance, 2002 (earlier federal FOI frame); Right of Access to Information Act, 2017 (current federal RTI statute name in standard teaching)
 * - Punjab Transparency and Right to Information Act, 2013
 * - Khyber Pakhtunkhwa Right to Information Act, 2013
 * - Sindh Transparency and Right to Information Act, 2016 (often cited; confirm year carefully in teaching)
 * - Balochistan Freedom of Information Act, 2005 (older provincial FOI frame in standard notes)
 * Avoid inventing fake commission case counts or claiming RTI works perfectly in practice
 */
export const RIGHT_TO_INFORMATION_PAKISTAN_KIT: NoteKitData = {
  id: 'right-to-information-pakistan',
  title: 'Right to Information in Pakistan',
  subtitle:
    'Article 19A, federal and provincial RTI statutes at name level, and transparency practice for CSS and PMS.',
  syllabusTags: [
    'Right to information',
    'Article 19A',
    'Transparency',
    'Good governance',
    'Constitution',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS / PMS',
      directive: 'Discuss',
      angle: 'Right to information as a tool of accountability',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Evaluate',
      angle: 'Article 19A and RTI laws in Pakistan',
      frequency: 'high',
    },
    {
      year: 'Ethics / Civics',
      directive: 'Critically examine',
      angle: 'Gaps between RTI law and implementation',
      frequency: 'medium',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'Art 19A; Right of Access to Information Act 2017; provincial Act names',
      frequency: 'high',
    },
  ],
  onePager: [
    'Right to information (RTI) lets citizens request public records so that secrecy shrinks and accountability rises.',
    'Constitution: Article 19A (18th Amendment) guarantees citizens access to information in matters of public importance, subject to law and reasonable restrictions.',
    'Federal frame carefully: Freedom of Information Ordinance, 2002 was an earlier federal FOI instrument. Right of Access to Information Act, 2017 is the current federal RTI statute name in standard teaching.',
    'Provincial name-level map (teach carefully): Punjab Transparency and Right to Information Act 2013; Khyber Pakhtunkhwa Right to Information Act 2013; Sindh Transparency and Right to Information Act 2016; Balochistan Freedom of Information Act 2005.',
    'Institutional idea: public information officers, timelines for response, and independent information commissions or equivalent oversight where statutes provide them.',
    'Practice gaps: delayed replies, over-broad exemptions, weak proactive disclosure, and uneven commission capacity.',
    'Link to good governance: RTI supports transparency, media scrutiny, and anti-corruption agendas when enforced.',
    'Answer close: strengthen proactive disclosure, narrow secrecy culture, resource commissions, and protect requesters.',
  ],
  answerSteps: [
    'Define RTI and link to accountability.',
    'State Article 19A precisely.',
    'Distinguish federal FOI 2002 from Right of Access to Information Act 2017.',
    'Give provincial Act names at recognition level.',
    'Explain implementation gaps.',
    'Conclude with proactive disclosure and commission capacity.',
  ],
  questionVariants: [
    'Discuss the significance of the right to information in Pakistan.',
    'Evaluate Article 19A and the federal RTI framework.',
    'Critically examine implementation of provincial RTI laws.',
    'How does RTI strengthen good governance?',
  ],
  citations: [
    {
      label: 'Art 19A',
      text: 'Every citizen shall have the right to have access to information in all matters of public importance, subject to regulation and reasonable restrictions (18th Amendment).',
    },
    {
      label: 'Federal statutes',
      text: 'Freedom of Information Ordinance 2002 (earlier federal FOI). Right of Access to Information Act 2017 (current federal RTI name in standard teaching).',
    },
    {
      label: 'Punjab / KP',
      text: 'Punjab Transparency and Right to Information Act 2013. Khyber Pakhtunkhwa Right to Information Act 2013.',
    },
    {
      label: 'Sindh / Balochistan',
      text: 'Sindh Transparency and Right to Information Act 2016. Balochistan Freedom of Information Act 2005.',
    },
    {
      label: 'Practice',
      text: 'Timelines, PIOs, and information commissions matter only if exemptions are not abused and disclosure is proactive.',
    },
  ],
  flashcards: [
    {
      prompt: 'Which Article guarantees RTI after the 18th Amendment?',
      answer: 'Article 19A',
    },
    {
      prompt: 'What is the current federal RTI statute name in standard teaching?',
      answer: 'Right of Access to Information Act, 2017',
    },
    {
      prompt: 'What earlier federal FOI instrument is often contrasted with 2017?',
      answer: 'Freedom of Information Ordinance, 2002',
    },
    {
      prompt: 'Name the Punjab RTI statute (year).',
      answer: 'Punjab Transparency and Right to Information Act, 2013',
    },
    {
      prompt: 'Name the KP RTI statute (year).',
      answer: 'Khyber Pakhtunkhwa Right to Information Act, 2013',
    },
    {
      prompt: 'Name the Sindh RTI statute (year) carefully taught.',
      answer: 'Sindh Transparency and Right to Information Act, 2016',
    },
    {
      prompt: 'Name the Balochistan FOI statute (year) in standard notes.',
      answer: 'Balochistan Freedom of Information Act, 2005',
    },
    {
      prompt: 'What institutional roles appear in RTI laws?',
      answer: 'Public information officers, response timelines, information commissions or equivalent',
    },
    {
      prompt: 'Name three implementation gaps.',
      answer: 'Delays, over-broad exemptions, weak proactive disclosure',
    },
    {
      prompt: 'How does RTI link to good governance?',
      answer: 'Transparency and accountability reduce secrecy and support anti-corruption scrutiny',
    },
  ],
  mistakes: [
    {
      trap: 'Confusing Article 19 (speech) with Article 19A (information).',
      correct: '19 is freedom of speech/expression related. 19A is access to information.',
    },
    {
      trap: 'Naming only the 2002 Ordinance as if it is still the sole federal law.',
      correct: 'Teach 2017 Right of Access to Information Act as the current federal RTI name.',
    },
    {
      trap: 'Inventing identical Act titles for all provinces.',
      correct: 'Use the name-level map carefully; Balochistan still often cited under FOI 2005.',
    },
    {
      trap: 'Claiming RTI works perfectly because laws exist.',
      correct: 'Law on books differs from delayed replies and secrecy culture.',
    },
    {
      trap: 'Forgetting reasonable restrictions language in Art 19A.',
      correct: 'The right is subject to regulation and reasonable restrictions.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Art 19A wording and meaning.' },
    { day: 'Day 2', task: 'Federal 2002 vs 2017 names.' },
    { day: 'Day 3', task: 'Memorise four provincial statute names.' },
    { day: 'Day 4', task: 'Flashcards.' },
    { day: 'Day 5', task: 'Implementation gaps paragraph.' },
    { day: 'Day 6', task: '10-minute discuss outline.' },
    { day: 'Day 7', task: 'Recite one-pager.' },
  ],
  sourcesLine:
    'Sources: Constitution Art 19A text, federal Right of Access to Information Act 2017 teaching notes, and provincial RTI/FOI statute name lists in governance primers. Avoid invented commission statistics.',
}
