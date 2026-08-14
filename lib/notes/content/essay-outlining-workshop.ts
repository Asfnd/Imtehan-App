import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked CSS English Essay outlining pedagogy:
 * - Strong outlines move from thesis to sequenced claims, each claim needing evidence, then a fair counterargument and rebuttal
 * - Common failure: topic words dumped as bullets without argument logic
 * - Practice drill: Claim -> Evidence -> Counterargument -> Rebuttal (CECR) for body sections
 * Do not invent a fake official FPSC marking grid
 */
export const ESSAY_OUTLINING_WORKSHOP_KIT: NoteKitData = {
  id: 'essay-outlining-workshop',
  title: 'Essay Outlining Workshop (CSS)',
  subtitle:
    'Deeper outlining drills: thesis, claim-evidence, counterargument, and rebuttal for CSS English Essay.',
  syllabusTags: [
    'CSS English Essay',
    'Outline method',
    'Argumentation',
    'Written expression',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS English Essay',
      directive: 'Write an essay',
      angle: 'Analytical topics needing balanced argument structure',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Method drill',
      angle: 'Build a full outline with counterargument under time pressure',
      frequency: 'high',
    },
    {
      year: 'CSS / PMS English',
      directive: 'Practice',
      angle: 'Convert vague headings into claim-evidence units',
      frequency: 'high',
    },
    {
      year: 'Prep pattern',
      directive: 'Workshop',
      angle: 'Thesis quality and rebuttal strength',
      frequency: 'high',
    },
  ],
  onePager: [
    'A CSS outline is an argument map, not a table of contents of topic nouns. Each major heading should advance the thesis.',
    'Start with a precise thesis: your answerable claim about the topic, not a restatement of the title.',
    'Body design: 3 to 5 claims. Under each claim, park evidence types (fact, example, authority, comparison) before you write prose.',
    'Counterargument slot: steelman the best opposing view in one heading. Then rebut with reason, not insult.',
    'CECR drill for each major section: Claim, Evidence, Counter (mini), Rebuttal or limitation. This prevents one-sided rants.',
    'Order matters: definition/context, causes or stakes, main analytical claims, counterargument, way forward, conclusion echo of thesis.',
    'Time drill: 8 to 12 minutes for outline on exam day is a common practical target. Adjust to your speed; do not invent official timings as law.',
  ],
  answerSteps: [
    'Select a manageable interpretation of the topic and write a one-sentence thesis.',
    'List 3 to 5 claims that must be true for the thesis to stand.',
    'Under each claim, note 1 to 2 evidence bullets (specific, not vague).',
    'Add one serious counterargument heading and a rebuttal heading.',
    'Check coherence: remove headings that do not serve the thesis.',
    'Only then expand into paragraphs in the same order.',
  ],
  questionVariants: [
    'Build a full CSS outline for a given essay topic using claim-evidence-counterargument structure.',
    'Convert a weak noun-outline into an argument outline with thesis and rebuttal.',
    'Drill: write three CECR blocks for causes of a social problem topic.',
    'How should a candidate use counterargument without losing the thesis? Explain with a mini outline.',
  ],
  citations: [
    {
      label: 'Thesis',
      text: 'A thesis is a debatable answer to the topic, not a title echo.',
    },
    {
      label: 'Claim-evidence',
      text: 'Each major heading should state a claim and imply what evidence will support it.',
    },
    {
      label: 'Counterargument',
      text: 'A fair opposing view strengthens credibility when followed by a reasoned rebuttal.',
    },
    {
      label: 'Outline purpose',
      text: 'The outline is an argument map that controls paragraph order under time pressure.',
    },
    {
      label: 'Method caution',
      text: 'No fake official FPSC grid. Use practical pedagogy and examiner-friendly clarity.',
    },
  ],
  flashcards: [
    {
      prompt: 'What is wrong with a noun-only outline?',
      answer: 'It lists topics without argument moves tied to a thesis',
    },
    {
      prompt: 'What does CECR stand for in this workshop?',
      answer: 'Claim, Evidence, Counterargument, Rebuttal',
    },
    {
      prompt: 'What must a thesis do?',
      answer: 'Answer the topic with a clear debatable claim',
    },
    {
      prompt: 'How many main claims are usually enough?',
      answer: 'About 3 to 5',
    },
    {
      prompt: 'What is steelmanning?',
      answer: 'Stating the opposing view in its strongest fair form',
    },
    {
      prompt: 'Where does way forward usually sit?',
      answer: 'After analysis and counterargument, before conclusion',
    },
    {
      prompt: 'Name two evidence types for outline bullets.',
      answer: 'Fact/example; authority/comparison (any accurate pair)',
    },
    {
      prompt: 'What should you do before writing full paragraphs?',
      answer: 'Lock outline coherence to the thesis',
    },
    {
      prompt: 'Trap: treating counterargument as betrayal of your side.',
      answer: 'It builds balance and examiner trust when rebutted well',
    },
    {
      prompt: 'Practical outline time many candidates target?',
      answer: 'Roughly 8 to 12 minutes (personal, not an official rule)',
    },
  ],
  mistakes: [
    {
      trap: 'Copying the essay title as the thesis.',
      correct: 'Write a stance. Titles are prompts; theses are answers.',
    },
    {
      trap: 'Using headings like Causes, Effects, Solution with no claims inside.',
      correct: 'Turn each into a specific claim sentence.',
    },
    {
      trap: 'Skipping counterargument on controversial topics.',
      correct: 'Add one fair opposing view and rebut it.',
    },
    {
      trap: 'Packing 12 micro-headings that cannot be written in time.',
      correct: 'Prefer fewer deeper claims with evidence.',
    },
    {
      trap: 'Inventing a secret FPSC outline format as mandatory law.',
      correct: 'Use clear argument structure. Clarity beats mythology.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Read thesis and CECR method.' },
    { day: 'Day 2', task: 'Convert two noun-outlines into claim outlines.' },
    { day: 'Day 3', task: 'Timed 10-minute outline drill on one past topic.' },
    { day: 'Day 4', task: 'Drill flashcards.' },
    { day: 'Day 5', task: 'Write full outline including counterargument and rebuttal.' },
    { day: 'Day 6', task: 'One-pager + expand one CECR block into a paragraph.' },
    { day: 'Day 7', task: 'One-pager only. Recite outline checklist from memory.' },
  ],
  sourcesLine:
    'Sources: CSS English Essay practical pedagogy; standard argumentation teaching (thesis, evidence, counterargument). Confirm latest FPSC paper instructions each year. Avoid fake marking-scheme myths.',
}
