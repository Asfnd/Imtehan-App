import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (mainstream Islamiat economic ethics):
 * - Riba (interest/usury) prohibition is a central classical teaching point
 * - Zakat as obligatory wealth purification and redistribution institution
 * - Risk-sharing / profit-loss sharing ideals vs guaranteed interest return
 * - Related concepts: gharar (excessive uncertainty) caution; halal trade and justice in exchange
 * Distinct from zakat-only kit: here emphasize system principles (riba, risk-sharing, circulation of wealth)
 * Avoid inventing modern bank product rulings as universal fiqh
 */
export const ISLAMIC_ECONOMIC_SYSTEM_KIT: NoteKitData = {
  id: 'islamic-economic-system',
  title: 'Islamic Economic System',
  subtitle:
    'Riba prohibition, zakat, risk-sharing ideals, and justice in exchange for CSS Islamiat.',
  syllabusTags: [
    'Islamiat',
    'Islamic economics',
    'Riba',
    'Zakat',
    'Social justice',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS Islamiat',
      directive: 'Discuss',
      angle: 'Salient features of the Islamic economic system',
      frequency: 'high',
    },
    {
      year: 'CSS / PMS',
      directive: 'Explain',
      angle: 'Prohibition of riba and its economic rationale',
      frequency: 'high',
    },
    {
      year: 'Islamiat',
      directive: 'Evaluate',
      angle: 'Zakat and circulation of wealth in Islamic economics',
      frequency: 'high',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'Riba prohibition; zakat; profit-loss sharing theme',
      frequency: 'high',
    },
  ],
  onePager: [
    'Islamic economic ethics aim at lawful earning, justice in exchange, and social solidarity, not only private profit maximisation.',
    'Riba (interest/usury) is prohibited in mainstream syllabus teaching. Classic concern: money earning money without shared real-economy risk can exploit the needy.',
    'Risk-sharing ideal: financing should link return to real business outcomes (profit-loss sharing themes), rather than a guaranteed fixed return detached from enterprise results.',
    'Zakat: obligatory levy on qualifying wealth that purifies property and supports defined beneficiary categories; it is a pillar and a redistributive institution (detail in the zakat kit).',
    'Circulation of wealth: discourage harmful hoarding; encourage productive investment, trade, and spending that sustains community welfare.',
    'Trade ethics: honesty in weights and measures, prohibition of fraud, and caution against excessive uncertainty (gharar) in contracts appear in standard notes.',
    'Property rights: Islam recognises private ownership within moral limits; ownership is a trust (amanah) with social obligations.',
    'Exam method: define objectives (justice, welfare, lawful gain), then explain riba ban, zakat, and risk-sharing; close with relevance to inequality and ethical finance without bank-product fatwa lists.',
  ],
  answerSteps: [
    'State objectives: justice, lawful earning, and solidarity.',
    'Explain riba prohibition and its rationale carefully.',
    'Present risk-sharing / profit-loss sharing as the alternative ideal.',
    'Add zakat and wealth circulation.',
    'Mention trade ethics and gharar caution briefly.',
    'Conclude with social justice relevance for modern economies at principle level.',
  ],
  questionVariants: [
    'Discuss the salient features of the Islamic economic system.',
    'Explain the prohibition of riba in Islam and its significance.',
    'Evaluate the role of zakat in Islamic economic justice.',
    'How does risk-sharing differ from interest-based financing in Islamic teaching?',
  ],
  citations: [
    {
      label: 'Riba',
      text: 'Prohibition of riba is a central Islamic economic teaching in CSS Islamiat.',
    },
    {
      label: 'Risk-sharing',
      text: 'Returns should relate to real enterprise outcomes rather than guaranteed interest alone.',
    },
    {
      label: 'Zakat',
      text: 'Obligatory wealth purification and redistribution supporting social welfare.',
    },
    {
      label: 'Trade ethics',
      text: 'Honesty, anti-fraud norms, and caution against excessive contractual uncertainty (gharar).',
    },
  ],
  flashcards: [
    {
      prompt: 'What is riba in syllabus language?',
      answer: 'Interest/usury prohibited in Islamic economic teaching',
    },
    {
      prompt: 'Why is riba criticised in exam rationale?',
      answer: 'Return without shared real-economy risk can exploit the needy',
    },
    {
      prompt: 'What alternative financing ideal is taught?',
      answer: 'Risk-sharing / profit-loss sharing linked to real outcomes',
    },
    {
      prompt: 'What fiscal-worship institution redistributes wealth?',
      answer: 'Zakat',
    },
    {
      prompt: 'What does circulation of wealth discourage?',
      answer: 'Harmful hoarding; encourages productive use and welfare',
    },
    {
      prompt: 'What is gharar at name level?',
      answer: 'Excessive uncertainty in contracts (caution theme)',
    },
    {
      prompt: 'How is private property framed?',
      answer: 'Recognised ownership with moral limits and trust (amanah)',
    },
    {
      prompt: 'How does this kit differ from the zakat-only kit?',
      answer: 'System principles: riba, risk-sharing, trade ethics, plus zakat',
    },
    {
      prompt: 'Should you list modern bank product rulings as universal?',
      answer: 'No; stay at ethical principles for exams',
    },
    {
      prompt: 'What three headings organise a strong essay?',
      answer: 'Riba ban, zakat/circulation, risk-sharing and trade justice',
    },
  ],
  mistakes: [
    {
      trap: 'Writing only zakat and ignoring riba.',
      correct: 'Riba prohibition is usually required in system answers.',
    },
    {
      trap: 'Claiming Islam bans all profit.',
      correct: 'Lawful trade and profit are allowed; riba and fraud are not.',
    },
    {
      trap: 'Turning the answer into a bank brochure.',
      correct: 'Keep principles; avoid product-by-product fatwa lists.',
    },
    {
      trap: 'Ignoring justice and welfare objectives.',
      correct: 'Open with ethical aims, then instruments.',
    },
    {
      trap: 'Confusing gharar with riba.',
      correct: 'Riba is interest/usury; gharar is excessive uncertainty.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Memorise objectives + riba definition.' },
    { day: 'Day 2', task: 'Risk-sharing vs interest contrast table.' },
    { day: 'Day 3', task: 'Zakat and circulation paragraph.' },
    { day: 'Day 4', task: 'Flashcards.' },
    { day: 'Day 5', task: 'Trade ethics and gharar one paragraph.' },
    { day: 'Day 6', task: '15-minute salient-features essay.' },
    { day: 'Day 7', task: 'Recite one-pager.' },
  ],
  sourcesLine:
    'Sources: mainstream CSS Islamiat primers on Islamic economics; riba prohibition; zakat as redistributive pillar; risk-sharing and trade ethics teaching. Distinct from the dedicated zakat kit. Avoid invented universal rulings on modern bank products.',
}
