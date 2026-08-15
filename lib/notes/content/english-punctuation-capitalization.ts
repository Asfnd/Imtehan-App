import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked for one-paper English:
 * - Punctuation: full stop, comma, semicolon, colon, apostrophe, quotation marks, question/exclamation marks, hyphen vs dash awareness (teach hyphen; avoid relying on en/em dash in kit text)
 * - Capitalization: sentence start, proper nouns, titles, pronoun I, days/months, nationalities
 * - Keep practical MCQ and sentence-correction style
 */
export const ENGLISH_PUNCTUATION_CAPITALIZATION_KIT: NoteKitData = {
  id: 'english-punctuation-capitalization',
  title: 'English Punctuation and Capitalization',
  subtitle:
    'High-yield punctuation marks, capitalization rules, and common one-paper error traps.',
  syllabusTags: [
    'English grammar',
    'Punctuation',
    'Capitalization',
    'One-paper English',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'One-paper',
      directive: 'MCQ / correction',
      angle: 'Comma, apostrophe, capitalization errors',
      frequency: 'high',
    },
    {
      year: 'FPSC / PPSC pattern',
      directive: 'Choose correct sentence',
      angle: 'Punctuation in compound and complex sentences',
      frequency: 'high',
    },
    {
      year: 'CSS English (Precis & Composition)',
      directive: 'Apply',
      angle: 'Clean punctuation in précis and pair sentences',
      frequency: 'medium',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'Its vs it’s; proper nouns; titles',
      frequency: 'high',
    },
  ],
  onePager: [
    'Full stop (period): ends a declarative sentence. Question mark: ends a direct question. Exclamation mark: strong emotion or command (use sparingly in exams).',
    'Comma: separates items in a list; sets off introductory phrases; joins independent clauses with a coordinating conjunction (and, but, or, so, yet); sets off non-essential information.',
    'Semicolon: joins two closely related independent clauses without a conjunction; also separates complex list items that already contain commas.',
    'Colon: introduces a list, explanation, or quotation after a complete independent clause.',
    'Apostrophe: shows possession (the student’s book; students’ hostel) and forms contractions (don’t, it’s). Never use apostrophe for simple plurals (CDs, 1990s).',
    'Quotation marks: enclose direct speech or exact quotations. Punctuation placement follows the style taught in your paper key; prefer consistency.',
    'Capitalize: first word of a sentence; pronoun I; proper nouns (names of people, places, organizations); days and months (not seasons usually); nationalities and languages; titles with names (Prime Minister X) when used as part of the name.',
    'Do not capitalize ordinary common nouns mid-sentence (government, university, river) unless part of a proper name (University of Punjab, Indus River).',
    'High-yield traps: its (possessive) vs it’s (it is); your vs you’re; their/there/they’re; unnecessary commas between subject and verb; missing capitals on proper nouns.',
  ],
  answerSteps: [
    'Identify sentence type (statement, question, list, possession).',
    'Apply the matching mark: stop, comma, semicolon, colon, apostrophe.',
    'Scan for proper nouns and sentence-initial capitals.',
    'Check contraction vs possessive pairs (it’s/its).',
    'Read the corrected sentence aloud for clause boundaries.',
  ],
  questionVariants: [
    'Correct the punctuation and capitalization in the given sentences.',
    'Choose the correctly punctuated option.',
    'Differentiate the uses of comma, semicolon, and colon with examples.',
    'Explain common capitalization rules for one-paper English.',
  ],
  citations: [
    {
      label: 'Comma with coordinating conjunction',
      text: 'Independent clause, coordinating conjunction + independent clause.',
    },
    {
      label: 'Apostrophe',
      text: 'Possession and contractions; not ordinary plurals.',
    },
    {
      label: 'Capitalization',
      text: 'Sentence start, I, proper nouns, days/months, nationalities/languages, titles with names.',
    },
    {
      label: 'its vs it’s',
      text: 'its = possessive; it’s = it is / it has.',
    },
  ],
  flashcards: [
    {
      prompt: 'When do you use a semicolon between clauses?',
      answer: 'To join two related independent clauses without a coordinating conjunction',
    },
    {
      prompt: 'When is a colon appropriate before a list?',
      answer: 'After a complete independent clause that introduces the list',
    },
    {
      prompt: 'Its or it’s for possession?',
      answer: 'its (no apostrophe)',
    },
    {
      prompt: 'Do you capitalize names of seasons in normal use?',
      answer: 'Usually no (summer, winter)',
    },
    {
      prompt: 'Students hostel: where does the apostrophe go for plural owners?',
      answer: 'students’ hostel',
    },
    {
      prompt: 'Name three things you capitalize.',
      answer: 'Sentence start, proper nouns, pronoun I (also days/months, nationalities)',
    },
    {
      prompt: 'Is a comma required before and in every list?',
      answer: 'Style varies; know your paper key. Clarity matters more than fighting over the Oxford comma alone',
    },
    {
      prompt: 'What is wrong with Pakistan’s Economy is Weak as a mid-sentence common-noun habit?',
      answer: 'Do not capitalize ordinary common nouns like economy unless part of a title',
    },
    {
      prompt: 'Direct question ends with?',
      answer: 'Question mark',
    },
    {
      prompt: 'Contraction of do not?',
      answer: 'don’t',
    },
  ],
  mistakes: [
    {
      trap: 'Using it’s for possession.',
      correct: 'it’s = it is; possessive is its.',
    },
    {
      trap: 'Putting apostrophes on simple plurals (CD’s, 1990’s) as a default.',
      correct: 'Ordinary plurals usually need no apostrophe.',
    },
    {
      trap: 'Capitalizing every important-looking noun.',
      correct: 'Capitalize proper nouns and sentence starts, not random emphasis.',
    },
    {
      trap: 'Joining two independent clauses with only a comma (comma splice).',
      correct: 'Use a full stop, semicolon, or comma + coordinating conjunction.',
    },
    {
      trap: 'Using a colon after a fragment that is not an independent clause.',
      correct: 'Colon usually follows a complete clause introducing what follows.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Revise stop, question, exclamation, comma uses.' },
    { day: 'Day 2', task: 'Drill semicolon vs colon with 10 examples.' },
    { day: 'Day 3', task: 'Apostrophe: possession vs contraction vs plurals.' },
    { day: 'Day 4', task: 'Capitalization rules sheet + MCQs.' },
    { day: 'Day 5', task: 'Correct 15 error sentences.' },
    { day: 'Day 6', task: 'One-pager + its/it’s drill.' },
    { day: 'Day 7', task: 'Timed one-paper punctuation set.' },
  ],
  sourcesLine:
    'Sources: standard one-paper English grammar and punctuation guides; FPSC/PPSC sentence-correction patterns; CSS Precis & Composition mechanics. Prefer rule + example over rote mark names alone.',
}
