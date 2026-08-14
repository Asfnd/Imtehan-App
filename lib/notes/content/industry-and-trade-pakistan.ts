import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked:
 * - Industrial base: textiles and clothing remain the classic export engine; other clusters include food processing, cement, fertiliser, autos (assembly), and emerging IT/services language in essays
 * - Trade concepts: exports, imports, trade balance/deficit, remittances as current-account support (not merchandise exports)
 * - Structural issues: energy cost, competitiveness, narrow export basket, documentation and SME constraints
 * Avoid inventing exact export dollar totals or deficit figures for 2026 without a named official source
 */
export const INDUSTRY_TRADE_PAKISTAN_KIT: NoteKitData = {
  id: 'industry-and-trade-pakistan',
  title: 'Industry and Trade of Pakistan',
  subtitle:
    'Industrial base, export structure, remittances, and trade deficit concepts for CSS and PMS economy answers.',
  syllabusTags: [
    'Pakistan economy',
    'Industry',
    'Trade',
    'Current Affairs',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS pattern',
      directive: 'Discuss',
      angle: 'Industrial development and structural weaknesses',
      frequency: 'high',
    },
    {
      year: 'CSS / PMS',
      directive: 'Critically examine',
      angle: 'Export performance and trade deficit',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Evaluate',
      angle: 'Role of remittances in external accounts',
      frequency: 'high',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'Textiles as leading export sector; remittances vs trade deficit concepts',
      frequency: 'high',
    },
  ],
  onePager: [
    'Pakistan\'s industrial story for exams centres on a textiles-led manufacturing base plus food processing, construction materials, fertiliser, and limited higher-value diversification.',
    'Textiles and clothing are the classic export engine. Narrow product and market concentration is a frequent critical point.',
    'Trade deficit concept: merchandise imports exceed merchandise exports. Energy, machinery, and intermediate goods often drive the import bill in standard answers.',
    'Remittances are workers\' transfers in the current account. They support external financing but are not the same as goods exports. Keep the distinction crisp.',
    'Competitiveness constraints: energy cost and reliability, logistics, skills, documentation, and SME finance gaps.',
    'Policy themes: export diversification, value addition, special economic zones and CPEC industrial talk (name-level), ease of doing business reforms, and stable macro settings.',
    'Essay balance: industry creates jobs and exports; without competitiveness and diversification, deficits and boom-bust cycles persist.',
  ],
  answerSteps: [
    'Define industry and trade roles in growth, jobs, and external balance.',
    'Describe the industrial base with textiles at the centre and name two other sectors.',
    'Explain trade deficit as imports greater than exports, with typical import drivers.',
    'Separate remittances from merchandise exports and show why remittances matter for the current account.',
    'Add competitiveness and diversification as reform axes.',
    'Close with a balanced line: growth needs industry plus sustainable external accounts.',
  ],
  questionVariants: [
    'Discuss the main features and problems of Pakistan\'s industrial sector.',
    'Critically examine Pakistan\'s export structure and trade deficit.',
    'Evaluate the role of remittances in Pakistan\'s economy.',
    'How can Pakistan diversify exports and strengthen industry? Discuss.',
  ],
  citations: [
    {
      label: 'Industrial core',
      text: 'Textiles and clothing form the classic backbone of Pakistan\'s manufacturing and merchandise exports.',
    },
    {
      label: 'Trade deficit',
      text: 'A merchandise trade deficit means imports of goods exceed exports of goods.',
    },
    {
      label: 'Remittances',
      text: 'Workers\' remittances support the current account; they are not merchandise export earnings.',
    },
    {
      label: 'Competitiveness',
      text: 'Energy cost, logistics, skills, and a narrow export basket are standard constraint themes.',
    },
    {
      label: 'Reform axes',
      text: 'Value addition, market and product diversification, and stable macro/energy policy are recurring solutions.',
    },
  ],
  flashcards: [
    {
      prompt: 'Which sector is Pakistan\'s classic leading merchandise export engine?',
      answer: 'Textiles and clothing',
    },
    {
      prompt: 'What is a merchandise trade deficit?',
      answer: 'Goods imports exceed goods exports',
    },
    {
      prompt: 'Are remittances the same as export earnings?',
      answer: 'No. They are workers\' transfers in the current account.',
    },
    {
      prompt: 'Name two non-textile industrial clusters often cited.',
      answer: 'Food processing, cement, fertiliser, or auto assembly (any accurate pair)',
    },
    {
      prompt: 'Name one competitiveness constraint.',
      answer: 'Energy cost/reliability, logistics, skills, or SME finance',
    },
    {
      prompt: 'What does export diversification mean in exam language?',
      answer: 'Wider products and markets beyond a narrow textiles-heavy basket',
    },
    {
      prompt: 'Why do energy imports matter for the trade bill?',
      answer: 'They often enlarge the import side of the merchandise account',
    },
    {
      prompt: 'Trap: quoting a fake exact deficit for 2026.',
      answer: 'Avoid. Use concepts or cite a named official year.',
    },
    {
      prompt: 'Name one policy theme for industry.',
      answer: 'Value addition, SEZs/CPEC industry (name-level), or ease of doing business',
    },
    {
      prompt: 'Link cotton farming to industry in one line.',
      answer: 'Cotton feeds the textile manufacturing and export chain',
    },
  ],
  mistakes: [
    {
      trap: 'Calling remittances export earnings.',
      correct: 'Remittances are transfers. Exports are goods/services sold abroad.',
    },
    {
      trap: 'Inventing exact dollar totals for exports or deficit without a source year.',
      correct: 'Use concepts and structure. Quote only with a named survey or SBP release year.',
    },
    {
      trap: 'Writing only textiles forever with no critical diversification point.',
      correct: 'Praise the engine, then critique concentration risk.',
    },
    {
      trap: 'Confusing current account with fiscal deficit.',
      correct: 'Trade and remittances sit in external accounts. Fiscal deficit is budget revenues vs spending.',
    },
    {
      trap: 'Treating industry as only large factories.',
      correct: 'SMEs and value chains matter for jobs and exports in balanced answers.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Read industrial base and trade concepts.' },
    { day: 'Day 2', task: 'Memorise textiles, deficit, remittances distinction.' },
    { day: 'Day 3', task: 'Write a 10-minute outline on trade deficit causes.' },
    { day: 'Day 4', task: 'Drill flashcards.' },
    { day: 'Day 5', task: 'Attempt export diversification critically examine outline.' },
    { day: 'Day 6', task: 'One-pager + citations. Practice MCQs.' },
    { day: 'Day 7', task: 'One-pager only. Recite deficit vs remittances from memory.' },
  ],
  sourcesLine:
    'Sources: Pakistan Economic Survey industry/trade chapters; SBP external sector summaries (named year when quoting figures); FPSC economy and current affairs syllabus items. Avoid unsourced WhatsApp trade stats.',
}
