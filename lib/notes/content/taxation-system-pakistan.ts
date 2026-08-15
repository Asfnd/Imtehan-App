import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (FBR / Pakistan tax teaching):
 * - FBR: Federal Board of Revenue; main federal tax administration
 * - Direct taxes: income tax, corporate tax themes (ability-to-pay idea)
 * - Indirect taxes: sales tax, federal excise, customs duties themes (consumption / trade base)
 * - Challenges: narrow base, undocumented economy, exemptions, compliance, tax-to-GDP debate (no fake ratio claims)
 */
export const TAXATION_SYSTEM_PAKISTAN_KIT: NoteKitData = {
  id: 'taxation-system-pakistan',
  title: 'Taxation System of Pakistan (FBR Concepts)',
  subtitle:
    'Direct vs indirect taxes, FBR role, base-broadening themes, and exam-safe fiscal vocabulary.',
  syllabusTags: [
    'Taxation',
    'FBR',
    'Fiscal policy',
    'Pakistan economy',
    'Current affairs',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS / PMS',
      directive: 'Discuss',
      angle: 'Structure and problems of taxation in Pakistan',
      frequency: 'high',
    },
    {
      year: 'CSS Current Affairs',
      directive: 'Critically examine',
      angle: 'Direct versus indirect tax mix and fairness',
      frequency: 'high',
    },
    {
      year: 'One-paper / MPT',
      directive: 'MCQ fact',
      angle: 'Expand FBR; classify direct and indirect taxes',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Evaluate',
      angle: 'Tax base broadening and documentation',
      frequency: 'medium',
    },
  ],
  onePager: [
    'FBR (Federal Board of Revenue) is the main federal agency for tax policy administration and collection of federal taxes in standard teaching.',
    'Direct taxes: levied on income or profits of persons and companies (income tax and corporate tax themes). Idea: closer link to ability to pay.',
    'Indirect taxes: levied on goods, services, or trade and often passed to consumers (sales tax, federal excise, customs duties themes).',
    'Why the mix matters: heavy reliance on easy-to-collect indirect taxes can be regressive in effect; stronger direct tax compliance supports fairness narratives in CSS answers.',
    'Provincial taxes exist after fiscal federalism (for example agricultural income tax themes and sales tax on services in provincial domains). Do not collapse everything into FBR alone when the question asks federal-provincial split.',
    'Structural challenges taught repeatedly: narrow documented tax base, exemptions and preferential treatments, weak enforcement perception, cash economy, and litigation or refund delays.',
    'Reform vocabulary: broaden base, simplify codes, improve documentation and digital trails, reduce unnecessary exemptions, strengthen audit and facilitation together, and improve taxpayer trust.',
    'Answer close: define FBR; classify direct/indirect with examples; diagnose base and compliance; propose broadening without inventing a fake tax-to-GDP percentage.',
  ],
  answerSteps: [
    'Expand FBR and state its federal collection role.',
    'Define and exemplify direct taxes.',
    'Define and exemplify indirect taxes.',
    'Note fairness and regressivity debates briefly.',
    'Add federal-provincial tax domain awareness if relevant.',
    'Conclude with base-broadening and documentation reforms.',
  ],
  questionVariants: [
    'Discuss the taxation system of Pakistan with reference to FBR.',
    'Critically examine the balance between direct and indirect taxes.',
    'Evaluate measures to broaden the tax base in Pakistan.',
    'How do documentation and digital trails support tax reform?',
  ],
  citations: [
    {
      label: 'FBR',
      text: 'Federal Board of Revenue; main federal tax administration theme.',
    },
    {
      label: 'Direct taxes',
      text: 'Income and corporate tax themes linked to ability to pay.',
    },
    {
      label: 'Indirect taxes',
      text: 'Sales tax, federal excise, and customs duties themes on goods, services, or trade.',
    },
    {
      label: 'Reform lens',
      text: 'Broaden base, document economy, simplify, and balance enforcement with facilitation.',
    },
  ],
  flashcards: [
    {
      prompt: 'Expand FBR.',
      answer: 'Federal Board of Revenue',
    },
    {
      prompt: 'What does FBR mainly do in exam language?',
      answer: 'Administer and collect federal taxes',
    },
    {
      prompt: 'Give two direct tax examples.',
      answer: 'Income tax and corporate tax',
    },
    {
      prompt: 'Give two indirect tax examples.',
      answer: 'Sales tax and customs (or federal excise)',
    },
    {
      prompt: 'Why may heavy indirect taxation be criticised?',
      answer: 'It can be regressive if the burden falls hard on consumers',
    },
    {
      prompt: 'Name a structural tax challenge.',
      answer: 'Narrow documented base or undocumented economy',
    },
    {
      prompt: 'Name one reform theme.',
      answer: 'Base broadening and documentation',
    },
    {
      prompt: 'Are all taxes only federal/FBR?',
      answer: 'No; provinces also have tax domains (for example services / agri themes)',
    },
    {
      prompt: 'Should tax-to-GDP be invented?',
      answer: 'No; quote only with a verified year/source',
    },
  ],
  mistakes: [
    {
      trap: 'Confusing FBR expansion.',
      correct: 'Federal Board of Revenue.',
    },
    {
      trap: 'Calling sales tax a direct tax.',
      correct: 'Sales tax is an indirect tax theme.',
    },
    {
      trap: 'Ignoring provincial tax domains entirely.',
      correct: 'Fiscal federalism splits some bases across federation and provinces.',
    },
    {
      trap: 'Inventing exact tax-to-GDP claims.',
      correct: 'Discuss direction and reform without fake precision.',
    },
    {
      trap: 'Treating enforcement alone as the full solution.',
      correct: 'Pair enforcement with simplification, trust, and facilitation.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'FBR expansion + role.' },
    { day: 'Day 2', task: 'Direct vs indirect examples.' },
    { day: 'Day 3', task: 'Challenges and fairness debate.' },
    { day: 'Day 4', task: 'Flashcards.' },
    { day: 'Day 5', task: 'Federal-provincial awareness.' },
    { day: 'Day 6', task: '10-minute reform outline.' },
    { day: 'Day 7', task: 'Recite one-pager.' },
  ],
  sourcesLine:
    'Sources: standard Pakistan fiscal policy and FBR teaching on direct and indirect tax concepts. Avoid unverified tax-to-GDP headlines.',
}
