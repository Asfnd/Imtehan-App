import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (English comprehension traps teaching):
 * - Common traps: outside knowledge, extreme wording, half-true details, reverse causation, tone overshoot
 * - Method: evidence first; eliminate; then choose
 * - Complements comprehension-passage-method with a trap-focused drill kit
 * Avoid inventing a fake official FPSC trap taxonomy; patterns are pedagogical
 */
export const READING_COMPREHENSION_TRAPS_KIT: NoteKitData = {
  id: 'reading-comprehension-traps',
  title: 'Reading Comprehension Traps',
  subtitle:
    'Trap types and elimination drills for CSS/PMS and one-paper reading comprehension MCQs.',
  syllabusTags: [
    'English Precis and Composition',
    'Reading comprehension',
    'MCQ method',
    'CSS English',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS Precis and Composition',
      directive: 'Comprehension',
      angle: 'Avoid unsupported inferences and extreme options',
      frequency: 'high',
    },
    {
      year: 'PMS / One-paper English',
      directive: 'MCQ practice',
      angle: 'Main idea and vocabulary-in-context traps',
      frequency: 'high',
    },
    {
      year: 'CSS / PMS',
      directive: 'Method',
      angle: 'How to eliminate trap options systematically',
      frequency: 'high',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'Tone and title choice pitfalls',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Comprehension traps punish world knowledge that the passage never supports. Anchor every choice to a line or a necessary inference from lines.',
    'Trap 1 - Outside knowledge: true in life, absent in text. Cut it first.',
    'Trap 2 - Extreme language: always, never, only, entirely, proves. Softenings in the passage usually defeat extremes.',
    'Trap 3 - Half-right detail: repeats a phrase but changes scope (one paragraph treated as the whole thesis).',
    'Trap 4 - Opposite or distortion: flips the author claim, or swaps cause and effect.',
    'Trap 5 - Tone overshoot: angry/hostile when the passage is merely critical; celebratory when merely positive.',
    'Trap 6 - Vocab first-sense: dictionary meaning that ignores contrast words (but, yet, however) or example clues.',
    'Method: preview stems, mark claim/contrast/conclusion sentences, eliminate, then pick. If two remain, choose the one with clearer textual support and narrower fit.',
  ],
  answerSteps: [
    'Preview question type (main idea, inference, vocab, tone, title).',
    'Locate the relevant sentence before looking at options.',
    'Eliminate outside-knowledge and extreme options.',
    'Eliminate half-right and opposite distortions.',
    'Compare remaining options for scope and tone match.',
    'Confirm with a quick evidence underline.',
  ],
  questionVariants: [
    'List common traps in reading comprehension MCQs and how to avoid them.',
    'How should a candidate eliminate unsupported inferences?',
    'Explain vocabulary-in-context traps with a method.',
    'What is the difference between a valid inference and outside knowledge?',
  ],
  citations: [
    {
      label: 'Evidence rule',
      text: 'Correct options must be supported by the passage, not by general knowledge alone.',
    },
    {
      label: 'Extreme trap',
      text: 'Words like always, never, and only frequently signal trap options when the text is qualified.',
    },
    {
      label: 'Half-right trap',
      text: 'Options may quote a detail but misstate the passage overall scope or thesis.',
    },
    {
      label: 'Tone trap',
      text: 'Tone labels must match intensity; harsh labels often overshoot mild criticism.',
    },
    {
      label: 'Vocab trap',
      text: 'Context beats the first dictionary sense when contrast or example cues appear.',
    },
  ],
  flashcards: [
    {
      prompt: 'What is the outside-knowledge trap?',
      answer: 'An option true in the world but not supported by the passage',
    },
    {
      prompt: 'Name three extreme trap words.',
      answer: 'Always, never, only (also entirely, proves)',
    },
    {
      prompt: 'What is a half-right detail trap?',
      answer: 'Uses a real phrase but wrong scope or thesis',
    },
    {
      prompt: 'What is tone overshoot?',
      answer: 'Choosing a harsher or warmer label than the passage supports',
    },
    {
      prompt: 'How do you beat vocab traps?',
      answer: 'Read nearby contrast, example, and cause cues before locking a meaning',
    },
    {
      prompt: 'Valid inference means what?',
      answer: 'A careful conclusion that must follow from the text',
    },
    {
      prompt: 'First elimination move many toppers use?',
      answer: 'Cut outside-knowledge and extreme options',
    },
    {
      prompt: 'If two options remain, what tie-break helps?',
      answer: 'Prefer clearer textual support and narrower accurate scope',
    },
    {
      prompt: 'Should you answer vocab from memory alone?',
      answer: 'No; context in the sentence controls',
    },
    {
      prompt: 'What should you mark while reading?',
      answer: 'Claim sentences, contrasts, and conclusion lines',
    },
  ],
  mistakes: [
    {
      trap: 'Picking the option that matches your opinion of the topic.',
      correct: 'Match the author passage, not your views.',
    },
    {
      trap: 'Choosing extremes because they sound confident.',
      correct: 'Qualified texts usually defeat always/never options.',
    },
    {
      trap: 'Treating one example as the full main idea.',
      correct: 'Main idea covers the whole arc, not a single detail.',
    },
    {
      trap: 'Ignoring contrast words in vocab questions.',
      correct: 'But/yet/however often flip the expected sense.',
    },
    {
      trap: 'Skipping elimination and reading options first as facts.',
      correct: 'Locate evidence, then eliminate traps, then choose.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Memorise six trap types.' },
    { day: 'Day 2', task: 'Drill extreme and outside-knowledge cuts.' },
    { day: 'Day 3', task: 'Tone and vocab-context drills.' },
    { day: 'Day 4', task: 'Flashcards.' },
    { day: 'Day 5', task: 'Timed passage with elimination notes.' },
    { day: 'Day 6', task: 'Review wrong options by trap label.' },
    { day: 'Day 7', task: 'Recite one-pager method.' },
  ],
  sourcesLine:
    'Sources: standard CSS/PMS English comprehension method notes and pedagogical trap lists. Patterns vary by paper; practise evidence discipline rather than memorising a fake official taxonomy.',
}
