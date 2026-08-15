import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (standard English grammar teaching for CSS / one-paper):
 * - Active: subject does the action. Passive: subject receives the action; be + past participle
 * - Tense map: writes -> is written; wrote -> was written; will write -> will be written; is writing -> is being written; has written -> has been written
 * - Object becomes subject; agent with by if needed; omit agent when unknown/unimportant
 * Imperatives and some intransitive verbs need care; no idiosyncratic inventions
 */
export const ACTIVE_PASSIVE_VOICE_KIT: NoteKitData = {
  id: 'active-passive-voice',
  title: 'Active and Passive Voice Conversion',
  subtitle:
    'Mechanical voice conversion method, tense map, and exam traps for CSS and one-paper English.',
  syllabusTags: [
    'English',
    'Grammar',
    'Active passive voice',
    'CSS / one-paper',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'One-paper / MPT',
      directive: 'MCQ / conversion',
      angle: 'Change active to passive',
      frequency: 'high',
    },
    {
      year: 'PPSC / NTS / FPSC',
      directive: 'Conversion',
      angle: 'Tense-preserving passive forms',
      frequency: 'high',
    },
    {
      year: 'CSS English Precis pattern',
      directive: 'Grammar',
      angle: 'Voice correction and rewrite',
      frequency: 'high',
    },
    {
      year: 'One-paper',
      directive: 'MCQ',
      angle: 'Choose correct passive option',
      frequency: 'high',
    },
  ],
  onePager: [
    'Active voice: the subject performs the action (The chef cooked the meal). Passive voice: the subject receives the action (The meal was cooked by the chef).',
    'Core formula: Object of active -> Subject of passive; use correct tense of be + past participle (V3); add by + agent only if useful.',
    'Present simple: writes -> is/are written. Present continuous: is writing -> is being written. Present perfect: has written -> has been written.',
    'Past simple: wrote -> was/were written. Past continuous: was writing -> was being written. Past perfect: had written -> had been written.',
    'Future simple: will write -> will be written. Modal: can/must write -> can/must be written.',
    'Agreement: be-form matches the new subject number (The letters are written; The letter is written).',
    'Omit by-agent when unknown, obvious, or unimportant (The thief was arrested). Keep agent when identity matters.',
    'Limits: intransitive verbs without object usually have no passive (He slept). Imperatives: Open the door -> Let the door be opened (taught pattern) or similar exam key forms.',
    'Method under pressure: find object, pick tense, write be+V3, fix agreement, decide on by-phrase, check meaning unchanged.',
  ],
  answerSteps: [
    'Identify subject, verb tense, and object in the active sentence.',
    'Move object to subject position.',
    'Select the matching be-form for that tense and new subject number.',
    'Add past participle of the main verb.',
    'Add by-agent only if needed; else omit.',
    'Read once for meaning and agreement.',
  ],
  questionVariants: [
    'Change into passive: She writes a letter.',
    'Change into active: The bridge was built by the engineers.',
    'Convert: They are repairing the road.',
    'Choose the correct passive of: He will finish the work.',
  ],
  citations: [
    {
      label: 'Formula',
      text: 'New subject + be (tense-matched) + past participle (+ by agent if needed).',
    },
    {
      label: 'Present map',
      text: 'writes -> is written; is writing -> is being written; has written -> has been written.',
    },
    {
      label: 'Past/future map',
      text: 'wrote -> was written; will write -> will be written; modal write -> modal be written.',
    },
    {
      label: 'Agent rule',
      text: 'Use by-agent when useful; omit when unknown or unimportant.',
    },
  ],
  flashcards: [
    {
      prompt: 'Active vs passive in one contrast?',
      answer: 'Subject does action vs subject receives action',
    },
    {
      prompt: 'Passive formula?',
      answer: 'be (correct tense) + past participle',
    },
    {
      prompt: 'She writes a letter -> ?',
      answer: 'A letter is written by her',
    },
    {
      prompt: 'They wrote the reports -> ?',
      answer: 'The reports were written by them',
    },
    {
      prompt: 'He is writing a book -> ?',
      answer: 'A book is being written by him',
    },
    {
      prompt: 'She has finished the task -> ?',
      answer: 'The task has been finished by her',
    },
    {
      prompt: 'They will open the shop -> ?',
      answer: 'The shop will be opened by them',
    },
    {
      prompt: 'You must obey the rules -> ?',
      answer: 'The rules must be obeyed',
    },
    {
      prompt: 'When omit by-agent?',
      answer: 'When agent is unknown, obvious, or unimportant',
    },
    {
      prompt: 'Why do some verbs resist passive?',
      answer: 'No object (intransitive) means nothing to promote to subject',
    },
  ],
  mistakes: [
    {
      trap: 'Changing tense while converting voice.',
      correct: 'Preserve tense; only change structure to be+V3.',
    },
    {
      trap: 'Wrong be agreement with new subject.',
      correct: 'Plural new subject needs plural be-form.',
    },
    {
      trap: 'Using V1 or V2 instead of V3.',
      correct: 'Passive needs past participle.',
    },
    {
      trap: 'Forcing passive on verbs with no object.',
      correct: 'Intransitive verbs usually stay active.',
    },
    {
      trap: 'Always inserting by someone.',
      correct: 'Omit agent when it adds nothing.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Learn formula and present tense map.' },
    { day: 'Day 2', task: 'Past, perfect, and future map.' },
    { day: 'Day 3', task: 'Modals and continuous passives.' },
    { day: 'Day 4', task: 'Flashcards.' },
    { day: 'Day 5', task: '30 conversion drills timed.' },
    { day: 'Day 6', task: 'Passive to active reverse drills.' },
    { day: 'Day 7', task: 'Recite one-pager and trap list.' },
  ],
  sourcesLine:
    'Sources: standard school and CSS/one-paper English grammar notes on voice conversion. Use mechanical tense maps; avoid idiosyncratic rules.',
}
