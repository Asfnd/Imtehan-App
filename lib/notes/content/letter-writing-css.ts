import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (CSS Precis and Composition / formal writing teaching):
 * - Formal letter: sender address, date, receiver, salutation, body, complimentary close, signature
 * - Official/application tone: polite, clear purpose, short paragraphs, concrete request
 * - Report writing: heading, introduction, findings/discussion, conclusion/recommendations (exam pattern)
 * Follow paper instructions; avoid inventing a single official mark scheme as absolute law
 */
export const LETTER_WRITING_CSS_KIT: NoteKitData = {
  id: 'letter-writing-css',
  title: 'Letter and Report Writing for CSS English',
  subtitle:
    'Formal letter layout, application tone, and report structure for CSS Precis and Composition.',
  syllabusTags: [
    'CSS Precis and Composition',
    'Letter writing',
    'Report writing',
    'English',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS Precis and Composition',
      directive: 'Write a letter',
      angle: 'Formal / official letter on a given situation',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Write a report',
      angle: 'Event, inquiry, or problem report with recommendations',
      frequency: 'high',
    },
    {
      year: 'PMS / CSS English',
      directive: 'Application',
      angle: 'Job, leave, or complaint application format',
      frequency: 'medium',
    },
    {
      year: 'Coach pattern',
      directive: 'Method',
      angle: 'Tone, layout, and paragraph discipline',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Formal letter layout (common teaching order): sender address, date, receiver name/designation/address, salutation, subject line (if taught/required), body, complimentary close, signature and name.',
    'Salutation: Dear Sir/Madam when name unknown; Dear Mr/Ms X when known. Close: Yours faithfully (Sir/Madam) or Yours sincerely (named person) in many school keys. Follow the paper key if it differs.',
    'Body method: open with purpose in one sentence; give facts in short paragraphs; state clear request or action; close politely. No slang, no aggression, no irrelevant story.',
    'Application letter: purpose, brief credentials or grounds, specific request, contact courtesy. Keep one page mindset unless told otherwise.',
    'Complaint letter: state problem, evidence/date, impact, and fair remedy sought. Stay factual.',
    'Report writing: title/heading; introduction (what/why); body (facts, findings, discussion); conclusion; recommendations. Use impersonal tone and numbered points when useful.',
    'Report vs letter: letter is addressed communication; report is structured information for a decision-maker. Both need clarity and relevance.',
    'Exam discipline: answer the exact scenario, keep word economy, check names/dates, and leave a clean margin layout.',
  ],
  answerSteps: [
    'Read the scenario and identify letter vs report vs application.',
    'Sketch layout blocks before writing full sentences.',
    'State purpose early; support with only relevant facts.',
    'For reports, separate findings from recommendations.',
    'Close with correct courtesy line and signature block.',
    'Proofread tone, grammar, and whether the ask is clear.',
  ],
  questionVariants: [
    'Write a formal letter to a deputy commissioner about a civic problem in your area.',
    'Write an application for the post of research officer.',
    'Prepare a report on a college seminar for the principal.',
    'Write a complaint letter about delayed public service delivery.',
  ],
  citations: [
    {
      label: 'Letter layout',
      text: 'Address, date, receiver, salutation, body, close, signature in standard formal teaching.',
    },
    {
      label: 'Tone',
      text: 'Polite, purposeful, factual, and concise.',
    },
    {
      label: 'Report parts',
      text: 'Heading, introduction, findings/discussion, conclusion, recommendations.',
    },
    {
      label: 'Close pairs',
      text: 'Yours faithfully with Sir/Madam; Yours sincerely with a named addressee in many keys.',
    },
  ],
  flashcards: [
    {
      prompt: 'List formal letter layout blocks.',
      answer: 'Sender address, date, receiver, salutation, body, close, signature',
    },
    {
      prompt: 'When use Yours faithfully in many school keys?',
      answer: 'When salutation is Dear Sir/Madam (name unknown)',
    },
    {
      prompt: 'When use Yours sincerely in many school keys?',
      answer: 'When the addressee is named',
    },
    {
      prompt: 'What comes first in the body?',
      answer: 'Clear purpose sentence',
    },
    {
      prompt: 'Name report sections.',
      answer: 'Heading, introduction, findings, conclusion, recommendations',
    },
    {
      prompt: 'Letter vs report in one contrast?',
      answer: 'Addressed message vs structured decision information',
    },
    {
      prompt: 'Complaint letter must include?',
      answer: 'Problem, evidence/date, impact, fair remedy',
    },
    {
      prompt: 'What tone fails in CSS letters?',
      answer: 'Slang, aggression, or irrelevant storytelling',
    },
    {
      prompt: 'Application letter core?',
      answer: 'Purpose, grounds/credentials, specific request',
    },
    {
      prompt: 'Best layout habit under time pressure?',
      answer: 'Sketch blocks first; keep short paragraphs',
    },
  ],
  mistakes: [
    {
      trap: 'Writing an informal chatty letter for an official task.',
      correct: 'Use formal tone and full layout.',
    },
    {
      trap: 'Mixing findings and recommendations in reports.',
      correct: 'State facts first, then recommend.',
    },
    {
      trap: 'Forgetting the ask.',
      correct: 'Every letter needs a clear requested action.',
    },
    {
      trap: 'Inventing a rigid national mark grid as law.',
      correct: 'Follow the paper instructions and clear method.',
    },
    {
      trap: 'Wrong complimentary close for the salutation.',
      correct: 'Match close to named vs unnamed addressee as taught.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Memorise letter layout blocks.' },
    { day: 'Day 2', task: 'Write one complaint and one application.' },
    { day: 'Day 3', task: 'Report template with five headings.' },
    { day: 'Day 4', task: 'Flashcards.' },
    { day: 'Day 5', task: 'Timed formal letter (20 minutes).' },
    { day: 'Day 6', task: 'Timed short report (25 minutes).' },
    { day: 'Day 7', task: 'Recite one-pager and fix tone errors.' },
  ],
  sourcesLine:
    'Sources: standard CSS Precis and Composition letter/report method notes and school formal English layout teaching. Follow each paper instructions over rigid coach folklore.',
}
