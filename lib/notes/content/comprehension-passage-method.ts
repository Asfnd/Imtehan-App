import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked CSS/PMS comprehension method:
 * - Typical tasks: main idea, inference, vocabulary in context, tone/attitude, title choice, and sometimes short answers tied to the passage
 * - Method: preview questions, read with purpose, locate evidence lines, eliminate extreme options
 * Avoid inventing a fake official marks grid; patterns vary by paper year and commission
 */
export const COMPREHENSION_PASSAGE_METHOD_KIT: NoteKitData = {
  id: 'comprehension-passage-method',
  title: 'Comprehension Passage Method (CSS/PMS)',
  subtitle:
    'Main idea, inference, and vocabulary-in-context method for CSS and PMS English comprehension.',
  syllabusTags: [
    'English Precis and Composition',
    'Reading comprehension',
    'CSS English',
    'PMS English',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS Precis and Composition',
      directive: 'Reading comprehension',
      angle: 'Passage-based MCQs or short answers on idea and inference',
      frequency: 'high',
    },
    {
      year: 'PMS English pattern',
      directive: 'Comprehension',
      angle: 'Main idea, vocab in context, inference',
      frequency: 'high',
    },
    {
      year: 'CSS / PMS',
      directive: 'Method',
      angle: 'How to avoid trap options and unsupported inferences',
      frequency: 'high',
    },
    {
      year: 'One-paper English',
      directive: 'MCQ practice',
      angle: 'Synonym in context and central theme',
      frequency: 'high',
    },
  ],
  onePager: [
    'Comprehension rewards evidence discipline. Every answer should be traceable to the passage, not to your general knowledge alone.',
    'Step order many toppers use: skim questions first, then read the passage marking claim sentences, contrasts, and conclusion lines.',
    'Main idea: the author\'s central point for the whole passage. Prefer options that cover the full arc. Reject too-narrow details and too-broad world claims.',
    'Inference: what must be true from the text without being stated verbatim. Stay one careful step from the lines. Extreme words (always, never, only) are frequent traps.',
    'Vocabulary in context: meaning is controlled by nearby contrast, example, or cause words. Do not lock the first dictionary sense if the sentence signals irony or special use.',
    'Tone/attitude: map positive, negative, critical, neutral, ironic. Match soft wording. Harsh labels often overshoot.',
    'Elimination method: cut options that contradict a clear line, then cut options that are true in the world but absent from the passage.',
  ],
  answerSteps: [
    'Preview question stems to know what to hunt (idea, vocab, inference, tone).',
    'Read once for structure: opening claim, turns, closing emphasis.',
    'For main idea, write a 8 to 12 word gist in the margin, then match options.',
    'For inference, underline the supporting sentence before choosing.',
    'For vocab, box the target word and use context clues (contrast/example/definition).',
    'Eliminate extremes and outside-knowledge options; pick the best-supported remainder.',
  ],
  questionVariants: [
    'Explain a reliable method for finding the main idea of a CSS comprehension passage.',
    'How should a candidate handle inference questions without overreading? Discuss with steps.',
    'Demonstrate vocabulary-in-context method on a sample sentence with contrast clues.',
    'What elimination rules reduce comprehension errors under time pressure? Explain.',
  ],
  citations: [
    {
      label: 'Evidence rule',
      text: 'Correct options are supported by the passage; outside knowledge is secondary.',
    },
    {
      label: 'Main idea',
      text: 'Central claim of the whole passage, not a local detail.',
    },
    {
      label: 'Inference',
      text: 'A conclusion that follows from the text without requiring wild leaps.',
    },
    {
      label: 'Vocab in context',
      text: 'Sentence neighbourhood (contrast, example, cause) controls meaning.',
    },
    {
      label: 'Trap types',
      text: 'Extreme wording, too narrow, too broad, and true-but-not-in-passage options.',
    },
  ],
  flashcards: [
    {
      prompt: 'Should you often glance at questions before deep reading?',
      answer: 'Yes. Preview stems to read with purpose',
    },
    {
      prompt: 'What is a main idea option that is too narrow?',
      answer: 'A true detail that misses the passage\'s full central point',
    },
    {
      prompt: 'What is a classic inference trap word class?',
      answer: 'Extremes such as always, never, only, must (when unsupported)',
    },
    {
      prompt: 'What controls vocab-in-context meaning?',
      answer: 'Nearby context clues, not only the first dictionary sense',
    },
    {
      prompt: 'Name one context clue type.',
      answer: 'Contrast, example, definition, or cause-effect',
    },
    {
      prompt: 'What is a true-but-not-in-passage trap?',
      answer: 'A fact you know that the author never supports here',
    },
    {
      prompt: 'How do you check an inference before selecting it?',
      answer: 'Underline the supporting line and test if the option must follow',
    },
    {
      prompt: 'Tone matching tip?',
      answer: 'Prefer precise mild labels over exaggerated hostility if text is mild',
    },
    {
      prompt: 'Trap: rewriting the passage with your opinions.',
      answer: 'Stay inside the author\'s claims and evidence',
    },
    {
      prompt: 'Quick gist length for margin notes?',
      answer: 'About 8 to 12 words capturing the central point',
    },
  ],
  mistakes: [
    {
      trap: 'Choosing an option because it is true in real life.',
      correct: 'It must be supported by this passage.',
    },
    {
      trap: 'Equating a repeated detail with the main idea.',
      correct: 'Main idea covers the passage\'s central purpose or claim.',
    },
    {
      trap: 'Making multi-step speculative leaps on inference items.',
      correct: 'Keep inferences tightly tethered to stated lines.',
    },
    {
      trap: 'Ignoring contrast words when solving vocab-in-context.',
      correct: 'But, however, rather, and similar signals often flip meaning.',
    },
    {
      trap: 'Inventing a fixed official marks formula for all years.',
      correct: 'Learn the method. Confirm each paper\'s instructions.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Read method: preview, gist, evidence rule.' },
    { day: 'Day 2', task: 'Drill five main-idea questions with gist notes.' },
    { day: 'Day 3', task: 'Drill inference traps (extremes and leaps).' },
    { day: 'Day 4', task: 'Drill flashcards.' },
    { day: 'Day 5', task: 'Vocab-in-context set using contrast clues.' },
    { day: 'Day 6', task: 'One-pager + one timed mixed passage.' },
    { day: 'Day 7', task: 'One-pager only. Recite elimination rules.' },
  ],
  sourcesLine:
    'Sources: CSS/PMS English Precis and Composition comprehension practice pedagogy; standard reading-test method (main idea, inference, context vocab). Check the latest paper pattern each year.',
}
