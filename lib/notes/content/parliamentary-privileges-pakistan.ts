import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (constitutional teaching):
 * - Article 66: privileges of members; freedom of speech in Majlis-e-Shoora (Parliament), subject to Constitution
 * - Privilege protects House functioning (debate, committees, attendance) and is not a personal licence for crime
 * - Privilege motions and Speakers rulings appear in parliamentary practice teaching
 * - Related: Articles on composition and powers of Parliament; contempt of House themes in notes
 * Avoid inventing fake absolute immunity for all criminal acts or claiming privilege overrides Fundamental Rights wholesale
 */
export const PARLIAMENTARY_PRIVILEGES_PAKISTAN_KIT: NoteKitData = {
  id: 'parliamentary-privileges-pakistan',
  title: 'Parliamentary Privileges in Pakistan',
  subtitle:
    'Article 66, freedom of speech in Parliament, privilege motions, and exam-safe limits for CSS Pakistan Affairs.',
  syllabusTags: [
    '1973 Constitution',
    'Parliament',
    'Parliamentary privileges',
    'Pakistan Affairs',
    'Governance',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS / PMS',
      directive: 'Discuss',
      angle: 'Parliamentary privileges under the Constitution of Pakistan',
      frequency: 'medium',
    },
    {
      year: 'CSS pattern',
      directive: 'Critically examine',
      angle: 'Freedom of speech in Parliament and its limits',
      frequency: 'medium',
    },
    {
      year: 'One-paper / MPT',
      directive: 'MCQ fact',
      angle: 'Article 66; privileges of members',
      frequency: 'medium',
    },
    {
      year: 'CSS pattern',
      directive: 'Evaluate',
      angle: 'Privilege versus accountability and rule of law',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Parliamentary privileges exist so the legislature can debate, inquire, and decide without improper external pressure. In Pakistan teaching, Article 66 is the high-yield constitutional anchor.',
    'Article 66 theme: freedom of speech in Majlis-e-Shoora (Parliament) and related privileges of members, subject to the Constitution. Exact practice details also draw on House rules and precedent.',
    'Functional purpose: protect frank debate, committee work, and attendance; enable the House to discipline its own process through privilege procedures.',
    'Privilege motion: a member may raise that the dignity or functioning of the House (or a member capacity) has been breached. Speaker or House process decides next steps under rules.',
    'Limits (exam-critical): privilege is not a personal shield for ordinary crime outside parliamentary function. It is institutional protection, not absolute private immunity.',
    'Accountability balance: privileges support democracy only if used for legislative work, not to block legitimate inquiry or public accountability narratives.',
    'Link to separation of powers: courts and Parliament each have domains; privilege disputes are sensitive. Avoid inventing a single permanent hierarchy slogan beyond syllabus caution.',
    'Answer close: privileges strengthen Parliament; misuse weakens public trust. Write purpose, Article 66, and limits together.',
  ],
  answerSteps: [
    'Define parliamentary privilege as institutional protection for legislative work.',
    'Cite Article 66 as the constitutional high-yield anchor.',
    'Explain freedom of speech in Parliament and privilege motions briefly.',
    'State clear limits: not personal licence for crime.',
    'Add accountability and public-trust balance.',
    'Close with purpose plus limit in one tight sentence.',
  ],
  questionVariants: [
    'Discuss parliamentary privileges in Pakistan with reference to the Constitution.',
    'Critically examine freedom of speech in Parliament under Article 66.',
    'Evaluate the balance between parliamentary privilege and accountability.',
    'What is a privilege motion? Explain its purpose.',
  ],
  citations: [
    {
      label: 'Article 66',
      text: 'Article 66 is the standard constitutional reference for privileges of members and freedom of speech in Majlis-e-Shoora (Parliament), subject to the Constitution.',
    },
    {
      label: 'Purpose',
      text: 'Privileges protect legislative debate, inquiry, and House functioning from improper obstruction.',
    },
    {
      label: 'Privilege motion',
      text: 'Privilege motions raise alleged breaches of House dignity or functioning for Speaker or House process under rules.',
    },
    {
      label: 'Limit',
      text: 'Privilege is institutional, not a personal licence for ordinary criminal conduct outside parliamentary function.',
    },
    {
      label: 'Accountability',
      text: 'Exam answers should balance privileges with rule of law and public accountability expectations.',
    },
  ],
  flashcards: [
    {
      prompt: 'Which article is the high-yield anchor for parliamentary privileges?',
      answer: 'Article 66',
    },
    {
      prompt: 'What does Article 66 mainly protect in exam teaching?',
      answer: 'Freedom of speech in Parliament and related member privileges, subject to the Constitution',
    },
    {
      prompt: 'What is the institutional purpose of privilege?',
      answer: 'Protect debate, inquiry, and House functioning',
    },
    {
      prompt: 'What is a privilege motion?',
      answer: 'A claim that House dignity or functioning (or member capacity) has been breached',
    },
    {
      prompt: 'Is privilege absolute personal immunity for all crimes?',
      answer: 'No; it is institutional protection, not a personal licence',
    },
    {
      prompt: 'Who typically handles privilege process first in House practice notes?',
      answer: 'Speaker and House rules process',
    },
    {
      prompt: 'What balance sentence scores in critically examine answers?',
      answer: 'Privileges support democracy; misuse harms accountability and trust',
    },
    {
      prompt: 'Should privilege be written as overriding all Fundamental Rights wholesale?',
      answer: 'No; keep to Constitution, rules, and institutional purpose',
    },
    {
      prompt: 'Name two protected legislative activities.',
      answer: 'Floor debate and committee work',
    },
    {
      prompt: 'What closing formula works?',
      answer: 'Purpose + Article 66 + clear limits',
    },
  ],
  mistakes: [
    {
      trap: 'Saying MPs have total immunity from all criminal law forever.',
      correct: 'Privilege protects parliamentary function, not personal crime generally.',
    },
    {
      trap: 'Omitting Article 66 in a constitutional answer.',
      correct: 'Article 66 is the expected anchor in CSS PA teaching.',
    },
    {
      trap: 'Treating privilege motions as ordinary political press releases.',
      correct: 'They are House process tools about dignity and functioning.',
    },
    {
      trap: 'Writing only benefits with no limits.',
      correct: 'Critically examine answers need the accountability limit.',
    },
    {
      trap: 'Confusing parliamentary privilege with Fundamental Rights of citizens.',
      correct: 'Privilege is institutional legislative protection; FR are citizen rights under Arts 8-28.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Article 66 one-liner and purpose.' },
    { day: 'Day 2', task: 'Privilege motion definition.' },
    { day: 'Day 3', task: 'Limits and immunity myth drill.' },
    { day: 'Day 4', task: 'Flashcards.' },
    { day: 'Day 5', task: 'Accountability balance paragraph.' },
    { day: 'Day 6', task: '10-minute critically examine outline.' },
    { day: 'Day 7', task: 'Recite one-pager.' },
  ],
  sourcesLine:
    'Sources: Constitution of Pakistan 1973 teaching on Article 66; standard Pakistan Affairs notes on Parliament and privilege practice. Avoid absolute-immunity myths.',
}
