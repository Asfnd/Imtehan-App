import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (CSS/PMS economy answer method):
 * - Pakistan Economic Survey is an annual MOF document; use it as a citation habit
 * - Method kit: how to read chapters and deploy figures; do NOT invent fake 2026 numbers
 * - Typical use: growth, fiscal, external, social, energy/agriculture chapters
 * - Teach "as per latest Economic Survey" phrasing when year-specific recall is unsafe
 */
export const PAKISTAN_ECONOMIC_SURVEY_HOW_TO_READ_KIT: NoteKitData = {
  id: 'pakistan-economic-survey-how-to-read',
  title: 'How to Read Pakistan Economic Survey for Answers',
  subtitle:
    'Method for using the Economic Survey in CSS/PMS answers: chapters, citation habits, and traps. No fake year numbers.',
  syllabusTags: [
    'Pakistan economy',
    'Economic Survey',
    'CSS method',
    'Answer writing',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS Pakistan Affairs / Economy',
      directive: 'Discuss',
      angle: 'Growth, fiscal stress, or social sector with Survey-backed framing',
      frequency: 'high',
    },
    {
      year: 'CSS / PMS',
      directive: 'Critically examine',
      angle: 'Structural issues using official data language',
      frequency: 'high',
    },
    {
      year: 'Essay / CA',
      directive: 'Evaluate',
      angle: 'Agriculture, energy, or external sector with Survey chapter logic',
      frequency: 'medium',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'What Economic Survey is and who publishes it (not invented stats)',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Pakistan Economic Survey is an annual document of the Ministry of Finance. It reviews the economy for the fiscal year and is a primary citation source for competitive exams.',
    'Do not memorise random viral numbers. Learn the chapter map: growth and investment, agriculture, industry/manufacturing, fiscal development, money and credit, trade and payments, energy, social protection/education/health (as titled in the edition you use).',
    'Reading method: open overview first for narrative, then jump to the chapter matching your question. Note definitions (GDP, fiscal deficit concept, current account) before copying a figure.',
    'Citation habit: “According to the Pakistan Economic Survey [year]…” only when you actually checked that edition. If unsure of the exact figure, write trend language and name the Survey as the place to verify, rather than inventing decimals.',
    'Answer use: one precise official figure beats five unsourced claims. Pair data with analysis (why the number moved; what policy constraint it signals). Cross-check sensitive points with SBP or budget documents when needed.',
    'Trap awareness: Survey figures can be revised later; provisional vs final matters. Do not confuse Economic Survey with the federal budget speech, PBS census releases, or SBP annual report. Each has a different job.',
  ],
  answerSteps: [
    'Identify which Survey chapter matches the question (fiscal, external, agri, social).',
    'State the institutional source: Pakistan Economic Survey, Ministry of Finance.',
    'Use at most 1 to 2 verified figures; explain what they mean.',
    'Add structural analysis and constraints.',
    'Close with policy way forward tied to the same theme.',
  ],
  questionVariants: [
    'How should candidates use the Pakistan Economic Survey in exam answers?',
    'Discuss Pakistan’s growth challenges using an official-data method (no invented stats).',
    'Explain the difference between Economic Survey, budget documents, and SBP reports.',
    'Critically examine why unsourced economic numbers weaken CSS answers.',
  ],
  citations: [
    {
      label: 'Publisher',
      text: 'Pakistan Economic Survey is issued by the Ministry of Finance as an annual economic review.',
    },
    {
      label: 'Chapter map',
      text: 'Use overview plus thematic chapters (growth, agri, industry, fiscal, money, trade, energy, social) matching the question.',
    },
    {
      label: 'Citation rule',
      text: 'Quote year-specific figures only from an edition you have actually checked.',
    },
    {
      label: 'Document boundaries',
      text: 'Do not confuse Economic Survey with the budget speech, PBS releases, or SBP annual report.',
    },
    {
      label: 'Revision caution',
      text: 'Survey data may be provisional and later revised; prefer careful wording over false precision.',
    },
  ],
  flashcards: [
    { prompt: 'Who publishes the Pakistan Economic Survey?', answer: 'Ministry of Finance' },
    { prompt: 'What is the Survey mainly for in exams?', answer: 'Official narrative and figures for economy answers' },
    { prompt: 'Should you invent 2026 decimals if you forgot the table?', answer: 'No' },
    { prompt: 'What do you read first in a new edition?', answer: 'Overview / growth narrative, then the relevant chapter' },
    { prompt: 'Name three chapter themes often used in answers.', answer: 'Fiscal; trade/payments; agriculture (also energy/social)' },
    { prompt: 'What is a safe citation stem?', answer: 'According to the Pakistan Economic Survey [year]…' },
    { prompt: 'How many figures should a paragraph usually carry?', answer: 'One or two verified figures, then analysis' },
    { prompt: 'Name one document often confused with the Survey.', answer: 'Federal budget speech or SBP annual report' },
    { prompt: 'What if a figure might be provisional?', answer: 'Word carefully; note that revisions happen' },
    { prompt: 'What beats five unsourced claims?', answer: 'One precise official figure with explanation' },
  ],
  mistakes: [
    {
      trap: 'Memorising WhatsApp “Survey figures” without opening the PDF.',
      correct: 'Check the edition, then cite. Otherwise use qualitative official framing.',
    },
    {
      trap: 'Treating the budget speech as the Economic Survey.',
      correct: 'Survey is the MOF annual review document; budget is a separate fiscal statement process.',
    },
    {
      trap: 'Dumping numbers with zero analysis.',
      correct: 'Explain what the figure implies for structure and policy.',
    },
    {
      trap: 'Inventing fake 2026 GDP or inflation “Survey” stats.',
      correct: 'This kit forbids fabricated year numbers; verify or omit.',
    },
    {
      trap: 'Using one old Survey forever without noticing a newer edition exists.',
      correct: 'Update your working edition; mark the year in citations.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Download/open the latest Survey PDF and skim the contents page.' },
    { day: 'Day 2', task: 'Make a one-page chapter map with your own headings.' },
    { day: 'Day 3', task: 'Practice citing one real figure you actually checked.' },
    { day: 'Day 4', task: 'Write a fiscal or external paragraph with Survey method.' },
    { day: 'Day 5', task: 'Compare Survey vs budget vs SBP in five lines.' },
    { day: 'Day 6', task: 'Timed answer using at most two verified figures.' },
    { day: 'Day 7', task: 'One-pager method only. Recite chapter map from memory.' },
  ],
  sourcesLine:
    'Sources: Ministry of Finance Pakistan Economic Survey (editions as published); CSS economy answer-writing practice. Method kit only; no fabricated 2026 statistics.',
}
