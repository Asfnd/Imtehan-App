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
    'CSS English Essay tests clarity of thought, organisation, relevance, and controlled English, not decorative vocabulary alone.',
    'Topic selection: pick a topic you can argue with facts and logic for the full length. Avoid exotic titles you cannot sustain. Prefer topics with clear causes, effects, and policy or ethical angles.',
    'Outline first (about 10 to 15 minutes is a common practical habit): title understanding, thesis statement, 4 to 6 main headings, and a conclusion point. Do not start writing body paragraphs with no map.',
    'Introduction: define or frame the topic briefly, give context, and end with a clear thesis (your central claim). Do not waste the opening on long stories or quotations that never return.',
    'Body paragraphs: one main idea per paragraph. Topic sentence, explanation, evidence or example, mini-link back to thesis. Keep paragraphs coherent and proportional.',
    'Argument balance: show awareness of the other side, then weigh it. CSS essays reward reasoned judgement, not slogans or pure emotion.',
    'Conclusion: restate the thesis in fresh words, synthesise main strands, and end with a forward-looking but realistic closing line. No new major argument in the last paragraph.',
    'Time pattern (practical coaching, not a fake official grid): many candidates treat the Essay paper as roughly a 100-minute writing task after choosing and outlining. Always follow the latest FPSC instructions on the day. Leave a few minutes to fix grammar and relevance slips.',
    'Avoid: autobiography dump, memorised essays forced onto unmatched topics, fake statistics, and thesaurus overload that hides weak logic.',
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
    { prompt: 'What should you do before writing body paragraphs?', answer: 'Make a short outline and fix a thesis' },
    { prompt: 'What belongs at the end of a strong introduction?', answer: 'A clear thesis statement' },
    { prompt: 'How many main ideas per body paragraph?', answer: 'One main idea' },
    { prompt: 'What is argument balance in a CSS essay?', answer: 'Acknowledge the other side, then weigh it with reasons' },
    { prompt: 'What should a conclusion avoid?', answer: 'Introducing a major new argument' },
    { prompt: 'Name a safe topic-selection rule.', answer: 'Choose a topic you can sustain with logic and examples for full length' },
    { prompt: 'What is a common time habit after topic choice?', answer: 'Outline first, then write, leaving a few minutes to revise' },
    { prompt: 'Why do memorised essays often fail?', answer: 'They miss the exact demand of the chosen topic' },
    { prompt: 'What is storytelling dump?', answer: 'Long personal or narrative filler without analytical argument' },
    { prompt: 'What should evidence do in a body paragraph?', answer: 'Support the topic sentence and link back to the thesis' },
    { prompt: 'Is heavy rare vocabulary enough to score well?', answer: 'No, clarity and organisation matter more' },
    { prompt: 'What should you check in the last minutes?', answer: 'Relevance, grammar slips, and paragraph logic' },
    { prompt: 'How should fake statistics be treated?', answer: 'Avoid inventing numbers; use careful, honest examples' },
    { prompt: 'What does a thesis do?', answer: 'States your central claim for the whole essay' },
    { prompt: 'Name one sign of a weak CSS essay opening.', answer: 'Long quotation or story that never connects to a thesis' },
  ],
  mistakes: [
    {
      trap: 'Starting to write immediately with no outline.',
      correct: 'Outline and thesis first, then paragraphs in order.',
    },
    {
      trap: 'Forcing a memorised essay onto a different topic.',
      correct: 'Answer the exact wording and demand of the chosen title.',
    },
    {
      trap: 'Inventing an official marking scheme (e.g. fake percentage grids) as fact.',
      correct: 'Use method principles: relevance, structure, argument, language. Check current FPSC instructions.',
    },
    {
      trap: 'One-sided rant with no counter-view.',
      correct: 'Show balance, then give a reasoned judgement.',
    },
    {
      trap: 'Autobiography or pure narrative instead of analysis.',
      correct: 'Use examples only to support argument, not as the whole essay.',
    },
    {
      trap: 'Conclusion that only repeats the introduction verbatim or adds a new debate.',
      correct: 'Synthesise main points and close cleanly without a new case.',
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
