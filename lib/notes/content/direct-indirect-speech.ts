import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (standard English grammar teaching for CSS / one-paper):
 * - Direct speech: exact words in quotation marks. Indirect (reported): speaker content without quotes; tense/pronoun/time shifts
 * - Common backshift: present->past; past->past perfect; will->would; can->could; may->might
 * - Questions and imperatives have special patterns; no idiosyncratic inventions
 */
export const DIRECT_INDIRECT_SPEECH_KIT: NoteKitData = {
  id: 'direct-indirect-speech',
  title: 'Direct and Indirect Speech',
  subtitle:
    'Reporting method, tense backshift, pronoun and time changes, plus question and imperative patterns for exams.',
  syllabusTags: [
    'English',
    'Grammar',
    'Direct indirect speech',
    'Reported speech',
    'CSS / one-paper',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'One-paper / MPT',
      directive: 'Conversion',
      angle: 'Change direct to indirect speech',
      frequency: 'high',
    },
    {
      year: 'PPSC / NTS / FPSC',
      directive: 'MCQ',
      angle: 'Correct reported form',
      frequency: 'high',
    },
    {
      year: 'CSS English Precis pattern',
      directive: 'Grammar',
      angle: 'Narration change',
      frequency: 'high',
    },
    {
      year: 'One-paper',
      directive: 'Conversion',
      angle: 'Questions and commands in indirect speech',
      frequency: 'high',
    },
  ],
  onePager: [
    'Direct speech quotes the exact words (He said, "I am ready."). Indirect (reported) speech reports the content without quotation marks (He said that he was ready.).',
    'Core method: identify reporting verb and clause type (statement, question, command/request); shift pronouns; apply tense backshift when the reporting verb is in the past; adjust time/place words; remove quotes and join with that/if/whether/to as needed.',
    'Common backshift (reporting verb past): am/is -> was; are -> were; have/has -> had; do/does -> did; present continuous -> past continuous; past simple -> past perfect; will -> would; can -> could; may -> might; must -> must/had to (keys vary; follow paper pattern).',
    'No backshift when reporting verb is present/future, or when the statement is still true / universal fact in many keys (He says that water boils at 100C). Follow the exam key if it forces shift anyway.',
    'Pronouns: change by speaker/listener point of view (I/we/you adjust to he/she/they/him/her as context requires).',
    'Time and place map (common): now -> then; today -> that day; tomorrow -> the next day; yesterday -> the previous day; here -> there; this -> that.',
    'Questions: remove question marks; use ask/inquire; yes-no questions take if/whether; wh-questions keep the wh-word; use statement word order (He asked if I was ready; She asked where he lived).',
    'Commands/requests: use tell/ask/order + object + to-infinitive (He told me to wait; She asked him not to go).',
    'Said vs told: told usually needs an object (told me); said that is common for statements without a compulsory personal object in many drills.',
  ],
  answerSteps: [
    'Classify the sentence: statement, question, or command/request.',
    'Pick the reporting verb (said/told/asked/ordered).',
    'Change pronouns to fit the new speaker viewpoint.',
    'Apply tense backshift if the reporting verb is past.',
    'Adjust time/place words and joiners (that/if/whether/to).',
    'Check word order for questions and to-infinitive for commands.',
  ],
  questionVariants: [
    'Change into indirect speech: She said, "I am writing a letter."',
    'Change into indirect speech: He said to me, "Where do you live?"',
    'Change into indirect speech: The teacher said, "Open your books."',
    'Change into direct speech: He asked if I could help him.',
  ],
  citations: [
    {
      label: 'Definition',
      text: 'Direct quotes exact words; indirect reports content without quotes.',
    },
    {
      label: 'Backshift',
      text: 'With past reporting verb: present->past, will->would, can->could, etc.',
    },
    {
      label: 'Questions',
      text: 'if/whether for yes-no; keep wh-word; statement order.',
    },
    {
      label: 'Commands',
      text: 'tell/ask + object + to-infinitive (or not to).',
    },
  ],
  flashcards: [
    {
      prompt: 'Direct vs indirect in one line?',
      answer: 'Exact quoted words vs reported content without quotes',
    },
    {
      prompt: 'will becomes what in common backshift?',
      answer: 'would',
    },
    {
      prompt: 'can becomes what?',
      answer: 'could',
    },
    {
      prompt: 'How do yes-no questions join in indirect speech?',
      answer: 'ask + if/whether + statement order',
    },
    {
      prompt: 'How do wh-questions join?',
      answer: 'ask + wh-word + statement order',
    },
    {
      prompt: 'Command pattern?',
      answer: 'told/asked + object + to-infinitive',
    },
    {
      prompt: 'tomorrow often becomes?',
      answer: 'the next day (or following day)',
    },
    {
      prompt: 'yesterday often becomes?',
      answer: 'the previous day (or day before)',
    },
    {
      prompt: 'said vs told?',
      answer: 'told usually needs an object (told me)',
    },
    {
      prompt: 'When might backshift be skipped?',
      answer: 'Present reporting verb, or universal truth still true (per many keys)',
    },
  ],
  mistakes: [
    {
      trap: 'Keeping question word order after conversion.',
      correct: 'Use statement order: where he lived, not where did he live.',
    },
    {
      trap: 'Forgetting pronoun changes.',
      correct: 'Shift I/you/we to match the reporting context.',
    },
    {
      trap: 'Using said me.',
      correct: 'Use told me, or said to me / said that.',
    },
    {
      trap: 'Leaving quotation marks in indirect speech.',
      correct: 'Remove quotes and join with that/if/to as needed.',
    },
    {
      trap: 'Ignoring time/place shifts when the key expects them.',
      correct: 'Apply now/today/here maps with past reporting verbs.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Definition + statement backshift table.' },
    { day: 'Day 2', task: 'Pronoun and time/place maps.' },
    { day: 'Day 3', task: 'Questions: if/whether and wh-patterns.' },
    { day: 'Day 4', task: 'Commands/requests with to-infinitive.' },
    { day: 'Day 5', task: 'Flashcards.' },
    { day: 'Day 6', task: 'Convert 10 mixed sentences under time.' },
    { day: 'Day 7', task: 'Recite one-pager.' },
  ],
  sourcesLine:
    'Sources: standard English grammar teaching on narration / reported speech for CSS and one-paper exams. Follow the paper key on optional backshift edge cases.',
}
