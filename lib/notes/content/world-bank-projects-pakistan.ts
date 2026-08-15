import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (exam-safe World Bank / Pakistan framing):
 * - World Bank Group: development finance; classic pair IBRD (middle-income lending) and IDA (concessional for poorer clients)
 * - Other group labels often taught: IFC (private sector), MIGA (political risk insurance), ICSID (investment dispute settlement)
 * - Pakistan engagement: sector themes (human development, infrastructure, resilience, governance) appear in teaching notes
 * DO NOT invent named active project lists, dollar totals, or fake board approval dates as syllabus certainty
 */
export const WORLD_BANK_PROJECTS_PAKISTAN_KIT: NoteKitData = {
  id: 'world-bank-projects-pakistan',
  title: 'World Bank and Pakistan (Roles and Instrument Types)',
  subtitle:
    'IBRD/IDA roles, instrument types, and Pakistan sector themes without inventing fake project catalogues.',
  syllabusTags: [
    'World Bank',
    'Development finance',
    'Pakistan economy',
    'International organizations',
    'Current affairs',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'One-paper / MPT',
      directive: 'MCQ fact',
      angle: 'IBRD vs IDA roles',
      frequency: 'high',
    },
    {
      year: 'CSS / PMS',
      directive: 'Discuss',
      angle: 'Role of World Bank in developing countries including Pakistan',
      frequency: 'medium',
    },
    {
      year: 'CSS pattern',
      directive: 'Evaluate',
      angle: 'Development lending: benefits and conditionality debates',
      frequency: 'medium',
    },
    {
      year: 'PPSC / NTS',
      directive: 'MCQ fact',
      angle: 'World Bank Group institutions (IBRD, IDA, IFC)',
      frequency: 'high',
    },
  ],
  onePager: [
    'World Bank (exam shorthand): development finance institution from the Bretton Woods family; HQ Washington D.C. Focus is longer-term development, not short-term balance-of-payments rescue (that is more the IMF lane).',
    'IBRD: International Bank for Reconstruction and Development. Classic exam line: lends mainly to middle-income and creditworthy borrowers for development projects and programmes.',
    'IDA: International Development Association. Classic exam line: concessional financing for poorer eligible countries. Treat IBRD/IDA as instrument/client-type distinction, not as two unrelated organisations with invented project lists.',
    'Wider World Bank Group labels often taught: IFC (private-sector finance), MIGA (political risk insurance), ICSID (investment dispute settlement). Know roles, not fake deal sheets.',
    'Pakistan angle (safe): engagement themes include human development, infrastructure, climate resilience, social protection, and governance or public-financial-management support language. Cite themes only.',
    'Instrument types: investment project financing, development policy financing / programmatic support language, and technical assistance or analytic work. Use types, not invented project titles.',
    'Critical debate: financing can support capacity and infrastructure; critics stress debt, conditionality, and ownership. Balanced answers state both without conspiracy tone.',
    'Exam rule: roles and instrument types score; memorising a fake current project catalogue fails.',
  ],
  answerSteps: [
    'Define World Bank as development finance (vs IMF stabilisation lane).',
    'Distinguish IBRD vs IDA by client type and concessionality.',
    'Add IFC/MIGA/ICSID as group role labels if the question asks for the Group.',
    'Give Pakistan sector themes without inventing project names or totals.',
    'Balance benefits (finance, knowledge) with critiques (debt, conditionality).',
    'Close with ownership: projects succeed when institutions deliver, not when loans alone exist.',
  ],
  questionVariants: [
    'Differentiate IBRD and IDA.',
    'Discuss the role of the World Bank in Pakistan development.',
    'Evaluate benefits and risks of World Bank financing for developing countries.',
    'Explain the main institutions of the World Bank Group and their roles.',
  ],
  citations: [
    {
      label: 'IBRD role',
      text: 'IBRD provides development lending oriented to middle-income and creditworthy borrowers.',
    },
    {
      label: 'IDA role',
      text: 'IDA provides concessional financing for poorer eligible countries.',
    },
    {
      label: 'IMF vs Bank',
      text: 'IMF is classically framed around macroeconomic stabilisation and balance-of-payments support; the World Bank around longer-term development finance.',
    },
    {
      label: 'Group labels',
      text: 'IFC (private sector), MIGA (political risk insurance), and ICSID (investment disputes) are standard World Bank Group role labels in GK teaching.',
    },
    {
      label: 'Pakistan framing',
      text: 'Exam-safe Pakistan answers use sector themes (human development, infrastructure, resilience, governance), not invented project lists or frozen dollar totals.',
    },
  ],
  flashcards: [
    {
      prompt: 'What is the classic IBRD role?',
      answer: 'Development lending for middle-income / creditworthy borrowers',
    },
    {
      prompt: 'What is the classic IDA role?',
      answer: 'Concessional financing for poorer eligible countries',
    },
    {
      prompt: 'How does World Bank differ from IMF in exam framing?',
      answer: 'Bank: longer-term development finance; IMF: macroeconomic / BOP stabilisation lane',
    },
    {
      prompt: 'What does IFC focus on?',
      answer: 'Private-sector finance',
    },
    {
      prompt: 'What does MIGA provide?',
      answer: 'Political risk insurance',
    },
    {
      prompt: 'Should students memorise a list of current Pakistan World Bank projects?',
      answer: 'No; memorise roles, instrument types, and sector themes',
    },
    {
      prompt: 'Name two Pakistan sector themes often cited.',
      answer: 'Human development and infrastructure (or resilience / governance)',
    },
    {
      prompt: 'Name one critique of Bank financing.',
      answer: 'Debt burden or conditionality / ownership concerns',
    },
    {
      prompt: 'Where is World Bank HQ taught?',
      answer: 'Washington D.C.',
    },
  ],
  mistakes: [
    {
      trap: 'Inventing named active project lists or exact loan totals as syllabus facts.',
      correct: 'Use IBRD/IDA roles, instrument types, and sector themes only.',
    },
    {
      trap: 'Confusing World Bank with IMF.',
      correct: 'Bank = development finance; IMF = stabilisation / BOP support in classic framing.',
    },
    {
      trap: 'Treating IBRD and IDA as unrelated mystery banks.',
      correct: 'They are the classic pair distinguished by client type and concessionality.',
    },
    {
      trap: 'Writing only praise or only conspiracy critique.',
      correct: 'Balance financing benefits with debt and conditionality debates.',
    },
    {
      trap: 'Forgetting IFC/MIGA when the question asks for World Bank Group.',
      correct: 'Group answers need private-sector and insurance/dispute labels when asked.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'IBRD vs IDA distinction drill.' },
    { day: 'Day 2', task: 'IMF vs World Bank lane contrast.' },
    { day: 'Day 3', task: 'IFC, MIGA, ICSID role labels.' },
    { day: 'Day 4', task: 'Flashcards.' },
    { day: 'Day 5', task: 'Pakistan sector themes paragraph (no fake lists).' },
    { day: 'Day 6', task: '10-minute evaluate outline with balance.' },
    { day: 'Day 7', task: 'Recite one-pager.' },
  ],
  sourcesLine:
    'Sources: Bretton Woods / World Bank Group role primers in standard GK and current affairs notes, plus Pakistan development-finance teaching themes. Do not invent project catalogues or dollar totals.',
}
