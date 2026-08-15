import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (Islamiat knowledge theme):
 * - Seeking knowledge is a major Quran and Sunnah emphasis in mainstream teaching
 * - Classical distinction often taught: beneficial religious knowledge and useful worldly knowledge used ethically
 * - Related: literacy, reflection, teaching others, humility of the learner, avoiding ignorance
 * Avoid fabricating exact Arabic verses/hadith chains; state widely taught meanings carefully
 */
export const IMPORTANCE_OF_KNOWLEDGE_ISLAM_KIT: NoteKitData = {
  id: 'importance-of-knowledge-islam',
  title: 'Importance of Knowledge in Islam',
  subtitle:
    'Seeking knowledge, teaching, reflection, and ethical use of learning for Islamiat exams.',
  syllabusTags: [
    'Islamic Studies',
    'Importance of knowledge',
    'Ilm',
    'Islamiat',
    'Education in Islam',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS / PMS Islamiat',
      directive: 'Discuss',
      angle: 'Importance of knowledge in Islam',
      frequency: 'high',
    },
    {
      year: 'One-paper / MPT',
      directive: 'MCQ / short',
      angle: 'Seeking knowledge as a religious emphasis',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Explain',
      angle: 'Religious and worldly knowledge in Islamic teaching',
      frequency: 'high',
    },
    {
      year: 'Islamiat pattern',
      directive: 'Evaluate',
      angle: 'Role of education in Muslim society',
      frequency: 'medium',
    },
  ],
  onePager: [
    'In Islamiat teaching, knowledge (ilm) is a pathway to correct belief, ethical action, and social reform. Ignorance is treated as a root of error and injustice.',
    'Seeking knowledge: mainstream notes emphasise that Muslims are encouraged to seek knowledge as a form of worshipful effort. State the theme; verify any Arabic wording from recognised sources rather than inventing it.',
    'Quranic emphasis in exam language: reading, reflection, using reason, and observing creation as signs. Exact verse citation should come from verified course notes.',
    'Prophetic emphasis in teaching: virtue of the scholar and student, spreading beneficial knowledge, and warning against concealing knowledge needed by people.',
    'Types often distinguished: knowledge of faith and law that guides worship and ethics; and worldly sciences and skills that serve human welfare when used within moral limits.',
    'Adab of knowledge: humility, honesty in transmission, intention to benefit creation, and avoiding arrogance. Knowledge without character is incomplete in Islamiat ethics framing.',
    'Social application: education for both men and women in contemporary teaching answers; scientific inquiry; professional competence; and public literacy as community strength.',
    'Close: define ilm; explain religious duty to seek and share beneficial knowledge; balance deeni and useful worldly learning; link to ethical responsibility.',
  ],
  answerSteps: [
    'Define knowledge (ilm) and contrast it with ignorance.',
    'State the duty/virtue of seeking knowledge in mainstream teaching.',
    'Add Quranic reflection themes carefully without fabricated quotes.',
    'Distinguish religious guidance knowledge and useful worldly knowledge.',
    'Add adab: humility, honesty, and service.',
    'Conclude with education as individual and social obligation.',
  ],
  questionVariants: [
    'Discuss the importance of knowledge in Islam.',
    'Explain the Islamic approach to religious and worldly knowledge.',
    'Evaluate the role of education in building an ethical Muslim society.',
    'How does the adab of knowledge shape the character of a student?',
  ],
  citations: [
    {
      label: 'Core claim',
      text: 'Seeking beneficial knowledge is a major emphasis in Quran and Sunnah teaching themes.',
    },
    {
      label: 'Dual scope',
      text: 'Religious guidance knowledge and useful worldly knowledge under ethical limits.',
    },
    {
      label: 'Adab',
      text: 'Humility, honest transmission, sound intention, and service to others.',
    },
    {
      label: 'Method caution',
      text: 'Do not fabricate Arabic verses or Hadith chains; verify wording from recognised notes.',
    },
  ],
  flashcards: [
    {
      prompt: 'What is ilm in Islamiat language?',
      answer: 'Knowledge',
    },
    {
      prompt: 'Why is seeking knowledge emphasised?',
      answer: 'It guides belief, ethics, and social reform; ignorance breeds error',
    },
    {
      prompt: 'Name two knowledge scopes often taught.',
      answer: 'Religious/ethical guidance and useful worldly sciences/skills',
    },
    {
      prompt: 'Name two adab of knowledge.',
      answer: 'Humility and honesty in transmission (or sound intention)',
    },
    {
      prompt: 'What is a social application of this topic?',
      answer: 'Education, literacy, and ethical professional competence',
    },
    {
      prompt: 'Should Arabic quotes be invented?',
      answer: 'No; verify from recognised Quran/Hadith notes',
    },
    {
      prompt: 'Knowledge without character is incomplete means?',
      answer: 'Learning should produce ethical conduct, not arrogance',
    },
    {
      prompt: 'Name a Prophetic teaching theme on knowledge.',
      answer: 'Virtue of learning/teaching and sharing beneficial knowledge',
    },
    {
      prompt: 'How does reflection fit?',
      answer: 'Using reason and observing creation as signs in Quranic teaching themes',
    },
  ],
  mistakes: [
    {
      trap: 'Fabricating Quranic verses or Hadith chains.',
      correct: 'State verified themes only; check Arabic from recognised notes.',
    },
    {
      trap: 'Rejecting all worldly knowledge as un-Islamic.',
      correct: 'Useful worldly knowledge is valued when ethically guided.',
    },
    {
      trap: 'Treating knowledge as status only.',
      correct: 'Adab requires humility and service.',
    },
    {
      trap: 'Ignoring teaching and transmission duties.',
      correct: 'Sharing beneficial knowledge is part of the ethic.',
    },
    {
      trap: 'Writing slogans without social application.',
      correct: 'Link to education, literacy, and ethical professions.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Define ilm vs ignorance.' },
    { day: 'Day 2', task: 'Duty to seek knowledge theme.' },
    { day: 'Day 3', task: 'Religious and worldly scopes.' },
    { day: 'Day 4', task: 'Adab of the learner/scholar.' },
    { day: 'Day 5', task: 'Flashcards.' },
    { day: 'Day 6', task: '10-minute discuss outline.' },
    { day: 'Day 7', task: 'Recite one-pager carefully.' },
  ],
  sourcesLine:
    'Sources: mainstream Islamiat notes on the importance of knowledge. Verify any Arabic Quran or Hadith wording from recognised references; do not fabricate chains.',
}
