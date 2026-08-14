import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked:
 * - Colonial legacy: ICS tradition shaped Pakistan's higher civil service culture
 * - Framing carefully: CSP (Civil Service of Pakistan) era; DMG (District Management Group); PAS (Pakistan Administrative Service) renaming/rebrand framing in modern usage
 * - Reform agendas: accountability, merit, training, e-governance, politicisation controls
 * - Do not invent fake cadre strength numbers or fake reform act titles
 */
export const BUREAUCRACY_REFORM_PAKISTAN_KIT: NoteKitData = {
  id: 'bureaucracy-reform-pakistan',
  title: 'Bureaucracy Reform in Pakistan',
  subtitle:
    'Colonial legacy, CSP/DMG/PAS framing, and reform agendas (accountability, e-governance) for CSS PA.',
  syllabusTags: [
    'Governance',
    'Public administration',
    'Civil service',
    'Pakistan Affairs',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS pattern',
      directive: 'Discuss',
      angle: 'Colonial legacy and Pakistan\'s bureaucracy',
      frequency: 'high',
    },
    {
      year: 'CSS / PMS',
      directive: 'Critically examine',
      angle: 'Need for civil service reform',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Evaluate',
      angle: 'E-governance and accountability in public administration',
      frequency: 'medium',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'CSP / DMG / PAS name framing',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Bureaucracy: permanent executive machinery that implements policy, delivers services, and advises political leadership.',
    'Colonial legacy: British Indian Civil Service (ICS) tradition shaped hierarchy, generalist district administration, and rule-bound prestige culture inherited at independence.',
    'CSP/DMG/PAS framing (careful): Civil Service of Pakistan (CSP) is the classic post-independence elite cadre label in exam histories; District Management Group (DMG) was the district administration occupational group label; Pakistan Administrative Service (PAS) is the later name used for that administrative service stream. Treat as name evolution, not as three unrelated services.',
    'Strengths claimed: continuity, nationwide presence, crisis administration, and policy memory.',
    'Critiques: politicisation, generalist over-specialisation gaps, slow delivery, accountability gaps, and resistance to reform.',
    'Reform agendas: merit-based induction and promotion, performance appraisal, training and specialization, anti-corruption accountability, citizen facilitation, and e-governance (digital services, transparency, reduced discretion where possible).',
    'Exam rule: legacy → cadre name framing carefully → problems → reforms. Avoid invented ordinance numbers.',
  ],
  answerSteps: [
    'Define bureaucracy and its democratic role under political leadership.',
    'Explain colonial ICS legacy and post-independence continuity.',
    'Frame CSP → DMG → PAS naming carefully as administrative-service evolution.',
    'State problems: politicisation, delivery gaps, accountability, and skills mismatch.',
    'Propose reforms: merit, training, e-governance, and enforceable accountability.',
    'Close with balance: reform needs political will and institutional protection of neutrality.',
  ],
  questionVariants: [
    'Discuss the colonial legacy of Pakistan\'s bureaucracy.',
    'Critically examine the case for civil service reform in Pakistan.',
    'Evaluate e-governance as a tool of bureaucratic reform.',
    'Neutral bureaucracy is essential for democratic governance. Discuss.',
  ],
  citations: [
    {
      label: 'Colonial legacy',
      text: 'Pakistan inherited an ICS-influenced higher civil service model emphasising district administration and hierarchical control.',
    },
    {
      label: 'Cadre naming',
      text: 'Exam histories commonly use CSP, later DMG, and PAS for the elite administrative service stream; treat as naming evolution.',
    },
    {
      label: 'Accountability',
      text: 'Reform agendas stress performance, integrity institutions, and reduced arbitrary discretion.',
    },
    {
      label: 'E-governance',
      text: 'E-governance uses digital processes to improve transparency, speed, and citizen access to services.',
    },
  ],
  flashcards: [
    {
      prompt: 'What colonial service shaped Pakistan\'s elite admin culture?',
      answer: 'Indian Civil Service (ICS) tradition',
    },
    {
      prompt: 'What does CSP stand for in older exam language?',
      answer: 'Civil Service of Pakistan',
    },
    {
      prompt: 'What does DMG stand for?',
      answer: 'District Management Group',
    },
    {
      prompt: 'What does PAS stand for in modern framing?',
      answer: 'Pakistan Administrative Service',
    },
    {
      prompt: 'Name two reform pillars.',
      answer: 'Merit/accountability and e-governance (also training/specialization)',
    },
    {
      prompt: 'Name one classic critique of bureaucracy.',
      answer: 'Politicisation or slow service delivery',
    },
  ],
  mistakes: [
    {
      trap: 'Treating CSP, DMG, and PAS as three totally separate unrelated services.',
      correct: 'In CSS answers, frame them as naming/organisational evolution of the elite administrative stream.',
    },
    {
      trap: 'Blaming only colonial legacy for every current failure.',
      correct: 'Add post-independence politicisation and reform gaps.',
    },
    {
      trap: 'Equating e-governance with buying computers only.',
      correct: 'It means process redesign, transparency, and citizen service.',
    },
    {
      trap: 'Inventing fake cadre strength statistics.',
      correct: 'Stay conceptual unless you have a sourced figure.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Write colonial legacy in five lines.' },
    { day: 'Day 2', task: 'Memorise CSP/DMG/PAS framing carefully.' },
    { day: 'Day 3', task: 'List problems and reforms in two columns.' },
    { day: 'Day 4', task: '10-minute e-governance paragraph.' },
    { day: 'Day 5', task: 'Drill flashcards.' },
    { day: 'Day 6', task: 'Practice neutrality vs politicisation variant.' },
    { day: 'Day 7', task: 'One-pager only from memory.' },
  ],
  sourcesLine:
    'Sources: standard Pakistan public administration histories (ICS/CSP legacy; DMG/PAS naming); FPSC governance and public administration themes. Avoid unsourced cadre-strength myths.',
}
