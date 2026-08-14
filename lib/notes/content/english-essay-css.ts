import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked CSS English Essay method (practical teaching):
 * - Essay is a major paper; candidates commonly plan roughly around 100 minutes for the essay task within the English Essay paper pattern (confirm latest FPSC paper instructions each year)
 * - Core skills: topic selection, outline, thesis, coherent paragraphs, balanced argument, conclusion
 * - Avoid inventing fake official marking schemes or guaranteed word counts as if FPSC published a secret grid
 * - Do not dump autobiography or pure storytelling without argument
 */
export const ENGLISH_ESSAY_CSS_KIT: NoteKitData = {
  id: 'english-essay-css',
  title: 'CSS English Essay (Structure and Method)',
  subtitle:
    'Topic choice, outline, thesis, body, conclusion, time use, and argument balance for the CSS English Essay paper.',
  syllabusTags: [
    'CSS English Essay',
    'Essay writing method',
    'FPSC English',
    'Written expression',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS English Essay',
      directive: 'Write an essay',
      angle: 'Argumentative / analytical topics from politics, society, economy, ethics, education',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Method question (prep)',
      angle: 'How to build outline and thesis under time pressure',
      frequency: 'high',
    },
    {
      year: 'CSS / PMS English',
      directive: 'Practice',
      angle: 'Balanced discussion without one-sided rant or story dump',
      frequency: 'high',
    },
    {
      year: 'Coach / academy pattern',
      directive: 'Common failure',
      angle: 'Weak introduction, no outline logic, abrupt ending',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Essay marks: clarity, organisation, relevance, controlled English. Vocabulary alone does not carry the paper.',
    'Topic rule: pick what you can argue with logic and examples for full length. Drop exotic titles you cannot sustain.',
    'Outline first (about 10-15 minutes common habit): thesis, 4-6 headings, conclusion point. No map, no body.',
    'Introduction: frame the issue briefly; end with a clear thesis. No long story or orphan quotation.',
    'Body: one idea per paragraph. Topic sentence, explain, evidence, link back to thesis.',
    'Balance: acknowledge the other side, then weigh it. Examiners reward judgement, not slogans.',
    'Conclusion: restate thesis in fresh words; synthesise; no new major argument.',
    'Time habit (coaching, not official grid): outline, write, leave minutes for grammar and relevance. Follow that day’s FPSC instructions.',
    'Fail patterns: autobiography dump, forced memorised essays, fake statistics, thesaurus overload.',
  ],
  answerSteps: [
    'Read all topics. Strike out those you cannot support with structure and examples.',
    'Choose one topic and write a one-sentence thesis you can defend.',
    'Build a short outline: intro points, 4 to 6 body headings, conclusion.',
    'Write the introduction with context plus thesis.',
    'Develop body paragraphs in outline order, one idea each, with balance where needed.',
    'Conclude by synthesising, not repeating the introduction word for word.',
    'Spend the last minutes cutting irrelevance and fixing agreement, articles, and punctuation.',
  ],
  questionVariants: [
    'How should a CSS candidate select and outline an English Essay topic?',
    'What makes a strong thesis and introduction in the CSS English Essay?',
    'Explain how to keep argumentative balance without losing a clear stance.',
    'Discuss common reasons CSS essays fail despite fluent English.',
  ],
  citations: [
    {
      label: 'Skill focus',
      text: 'Essay success depends on relevance, organisation, argument, and clear English more than ornamental words.',
    },
    {
      label: 'Outline habit',
      text: 'A short outline before writing is standard coaching advice for coherence under time pressure.',
    },
    {
      label: 'Thesis',
      text: 'Introduction should frame the issue and state a clear central claim.',
    },
    {
      label: 'Paragraph unit',
      text: 'Each body paragraph should carry one main idea linked to the thesis.',
    },
    {
      label: 'Marking caution',
      text: 'Do not invent a fake official FPSC marking grid. Follow current paper instructions and examiner expectations of clarity and substance.',
    },
  ],
  flashcards: [
    { prompt: 'First move after choosing a topic?', answer: 'Short outline + fixed thesis' },
    { prompt: 'End of a strong introduction?', answer: 'Clear thesis statement' },
    { prompt: 'Ideas per body paragraph?', answer: 'One' },
    { prompt: 'What is argument balance?', answer: 'Acknowledge the other side, then weigh it with reasons' },
    { prompt: 'Conclusion must avoid?', answer: 'A major new argument' },
    { prompt: 'Safe topic-selection rule?', answer: 'Choose what you can sustain with logic and examples' },
    { prompt: 'Why memorised essays fail?', answer: 'They miss the exact demand of the chosen title' },
    { prompt: 'What is storytelling dump?', answer: 'Narrative filler without analytical argument' },
    { prompt: 'Role of evidence in a paragraph?', answer: 'Support the topic sentence and link to the thesis' },
    { prompt: 'Is rare vocabulary enough?', answer: 'No. Clarity and organisation matter more' },
    { prompt: 'Last-minute checks?', answer: 'Relevance, grammar slips, paragraph logic' },
    { prompt: 'Fake statistics rule?', answer: 'Do not invent numbers; use careful, honest examples' },
    { prompt: 'What does a thesis state?', answer: 'Your central claim for the whole essay' },
    { prompt: 'Weak opening sign?', answer: 'Long quotation or story with no thesis link' },
    { prompt: 'Typical outline size?', answer: 'Thesis plus about 4 to 6 body headings' },
  ],
  mistakes: [
    {
      trap: 'Writing body paragraphs with no outline.',
      correct: 'Outline and thesis first, then paragraphs in order.',
    },
    {
      trap: 'Forcing a memorised essay onto a different title.',
      correct: 'Answer the exact wording and demand of the chosen topic.',
    },
    {
      trap: 'Citing a fake FPSC percentage marking grid as official fact.',
      correct: 'Use method: relevance, structure, argument, language. Check current paper instructions.',
    },
    {
      trap: 'One-sided rant with no counter-view.',
      correct: 'Show balance, then give a reasoned judgement.',
    },
    {
      trap: 'Autobiography or pure narrative instead of analysis.',
      correct: 'Examples support argument; they are not the whole essay.',
    },
    {
      trap: 'Conclusion that only copies the intro or opens a new debate.',
      correct: 'Synthesise main points and close cleanly.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Learn selection rules and outline template.' },
    { day: 'Day 2', task: 'Practice 5 thesis statements for past topics.' },
    { day: 'Day 3', task: 'Write 3 introductions with clear theses.' },
    { day: 'Day 4', task: 'Drill body paragraph pattern: topic, explain, evidence, link.' },
    { day: 'Day 5', task: 'Full timed essay under a realistic clock.' },
    { day: 'Day 6', task: 'Mark your own essay against mistakes list.' },
    { day: 'Day 7', task: 'One-pager method only. Recite outline steps from memory.' },
  ],
  sourcesLine:
    'Sources: Practical CSS English Essay coaching consensus on outline, thesis, paragraphing, and time management; FPSC English Essay paper pattern as published each year. Do not treat academy marking myths as official rules.',
}
