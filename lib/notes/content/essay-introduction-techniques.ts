import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (CSS English Essay pedagogy):
 * - Introduction jobs: hook attention, define/interpret the topic, state thesis/stance, signpost the outline
 * - Common techniques: definition, quotation (sparingly), anecdote (rare and relevant), contrast, question, startling fact (only if accurate)
 * - Failures: long history dump, dictionary paste without argument, apology, off-topic story
 * Do not invent a fake official FPSC marking grid
 */
export const ESSAY_INTRODUCTION_TECHNIQUES_KIT: NoteKitData = {
  id: 'essay-introduction-techniques',
  title: 'Essay Introduction Techniques (CSS)',
  subtitle:
    'Hooks, thesis, and signposting for CSS English Essay openings without wasted words.',
  syllabusTags: [
    'CSS English Essay',
    'Introduction techniques',
    'Thesis statement',
    'Written expression',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS English Essay',
      directive: 'Write an essay',
      angle: 'Openings that frame argumentative topics clearly',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Method drill',
      angle: 'Build a thesis-led introduction under time pressure',
      frequency: 'high',
    },
    {
      year: 'CSS / PMS English',
      directive: 'Practice',
      angle: 'Avoid history dumps and vague openings',
      frequency: 'high',
    },
    {
      year: 'Coach / academy pattern',
      directive: 'Common failure',
      angle: 'Hook without thesis; quotation without link',
      frequency: 'medium',
    },
  ],
  onePager: [
    'A good introduction does four jobs: engage the reader, interpret the topic, state a clear thesis (your central claim), and signpost the main lines of argument.',
    'Technique 1 - Definition/interpretation: redefine key terms in the title so the examiner sees your angle. Avoid copying a dictionary entry with no argument.',
    'Technique 2 - Context bridge: one or two sentences of relevant contemporary or conceptual context, then pivot to thesis. Do not write a mini-history of civilisation.',
    'Technique 3 - Contrast or paradox: show tension in the topic (for example freedom versus order) to justify why the essay matters.',
    'Technique 4 - Question hook: one sharp question that your thesis answers. Multiple rhetorical questions waste space.',
    'Technique 5 - Quotation: use sparingly, only if accurate and immediately linked to your thesis. A floating quote is a common trap.',
    'Thesis rule: one clear sentence stating what you will argue. Signpost: briefly name the body pillars that will prove it. Keep the whole introduction short enough that the body gets most of the time.',
    'Close the intro and move on: no apology ("I will try"), no announcing "In this essay I will discuss everything", and no examples that belong in body paragraphs.',
  ],
  answerSteps: [
    'Interpret the title and choose an arguable thesis.',
    'Pick one hook technique that fits the topic (definition, contrast, context, question).',
    'Write 4 to 8 tight sentences: hook, interpretation, thesis, signpost.',
    'Cut history dumps, apologies, and unused quotations.',
    'Ensure every intro sentence points toward the body plan.',
    'Leave time for body development; do not over-polish the opening.',
  ],
  questionVariants: [
    'Write an introduction for an essay on education and national development.',
    'Convert a vague topic into a thesis-led opening paragraph.',
    'Improve an introduction that begins with a long historical narrative.',
    'Practice a contrast hook and a definition hook for the same title.',
  ],
  citations: [
    {
      label: 'Four jobs',
      text: 'Engage, interpret topic, state thesis, signpost argument lines.',
    },
    {
      label: 'Techniques',
      text: 'Definition, context bridge, contrast/paradox, question, sparing quotation.',
    },
    {
      label: 'Thesis rule',
      text: 'One clear central claim that the body will prove.',
    },
    {
      label: 'Common failures',
      text: 'History dump, dictionary paste, apology, floating quotation, off-topic story.',
    },
  ],
  flashcards: [
    {
      prompt: 'Name the four jobs of an essay introduction.',
      answer: 'Engage, interpret, thesis, signpost',
    },
    {
      prompt: 'What is a thesis in CSS essay language?',
      answer: 'The central claim your essay will argue',
    },
    {
      prompt: 'Name three introduction techniques.',
      answer: 'Definition, contrast, and question (or context / quotation)',
    },
    {
      prompt: 'When is a quotation safe?',
      answer: 'When accurate and immediately linked to the thesis',
    },
    {
      prompt: 'What is a history dump?',
      answer: 'A long past narrative that delays the argument',
    },
    {
      prompt: 'Should the introduction list every example?',
      answer: 'No; examples belong mainly in the body',
    },
    {
      prompt: 'What is signposting?',
      answer: 'Briefly naming the main argument pillars ahead',
    },
    {
      prompt: 'Name an apology trap.',
      answer: 'Phrases like "I will try to discuss" that weaken authority',
    },
    {
      prompt: 'How long should the intro stay relative to the essay?',
      answer: 'Short enough that the body gets most of the time',
    },
  ],
  mistakes: [
    {
      trap: 'Opening with a multi-page history before any thesis.',
      correct: 'Bridge briefly, then state the claim.',
    },
    {
      trap: 'Pasting a dictionary definition with no angle.',
      correct: 'Interpret terms to serve your thesis.',
    },
    {
      trap: 'Using a quotation that never connects to the argument.',
      correct: 'Link every quote to the thesis immediately.',
    },
    {
      trap: 'Writing "In this essay I will discuss" as the whole intro.',
      correct: 'State a real claim and signpost pillars.',
    },
    {
      trap: 'Putting body-level examples inside the introduction.',
      correct: 'Reserve detailed evidence for body paragraphs.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Four jobs of an introduction.' },
    { day: 'Day 2', task: 'Practice definition and contrast hooks.' },
    { day: 'Day 3', task: 'Thesis + signpost drills.' },
    { day: 'Day 4', task: 'Flashcards.' },
    { day: 'Day 5', task: 'Edit three weak intros.' },
    { day: 'Day 6', task: 'Timed intro (5 to 7 minutes).' },
    { day: 'Day 7', task: 'Recite technique list and traps.' },
  ],
  sourcesLine:
    'Sources: standard CSS English Essay pedagogy on openings, thesis, and signposting. No invented official FPSC marking grid.',
}
