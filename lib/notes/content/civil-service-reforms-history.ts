import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (exam-safe civil service reform history framing):
 * - Colonial ICS legacy shaped Pakistan higher civil service culture
 * - Post-independence continuity: CSP tradition; later occupational group labels (DMG) and PAS naming evolution in teaching
 * - Reform history themes: administrative reforms commissions / committees language, training institutions, accountability, e-governance
 * Avoid inventing fake commission years, fake cadre strength numbers, or fake act titles as certainty
 */
export const CIVIL_SERVICE_REFORMS_HISTORY_KIT: NoteKitData = {
  id: 'civil-service-reforms-history',
  title: 'Civil Service Reforms History (Pakistan)',
  subtitle:
    'ICS legacy, CSP/DMG/PAS framing, and reform-agenda history themes for CSS public administration answers.',
  syllabusTags: [
    'Public administration',
    'Civil service',
    'Bureaucracy reform',
    'Governance',
    'Pakistan Affairs',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS pattern',
      directive: 'Discuss',
      angle: 'Historical evolution of civil service in Pakistan',
      frequency: 'high',
    },
    {
      year: 'CSS / PMS',
      directive: 'Critically examine',
      angle: 'Need and history of civil service reforms',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Evaluate',
      angle: 'Colonial legacy and reform attempts',
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
    'Civil service: permanent professional machinery that implements policy under political leadership. Reform history is about making that machinery more merit-based, accountable, and delivery-oriented.',
    'Colonial baseline: British Indian Civil Service (ICS) tradition shaped hierarchy, generalist district administration, and prestige culture inherited at independence.',
    'Post-independence continuity: Civil Service of Pakistan (CSP) is the classic elite cadre label in exam histories. Later District Management Group (DMG) and Pakistan Administrative Service (PAS) naming are taught as evolution of the administrative service stream, not three unrelated services.',
    'Why reform keeps returning: politicisation concerns, generalist-specialist mismatch, slow service delivery, weak performance management, and accountability gaps.',
    'Reform instruments (theme level): administrative reform commissions/committees language, training and academy strengthening, lateral entry debates, performance appraisal ideas, and e-governance / citizen facilitation.',
    'Careful history rule: cite reform as recurring agenda with themes. Do not invent exact commission titles, years, or cadre numbers unless you have a trusted dated source.',
    'Exam structure that scores: legacy → continuity/naming → problems → reform themes → political will and neutrality balance.',
  ],
  answerSteps: [
    'Define civil service and why reform is a recurring state agenda.',
    'Explain ICS colonial legacy and post-independence continuity.',
    'Frame CSP to DMG to PAS naming carefully as service-stream evolution.',
    'State persistent problems that drive reform debates.',
    'List reform themes: merit, training, accountability, e-governance.',
    'Close with balance: reform needs political will plus protection of professional neutrality.',
  ],
  questionVariants: [
    'Discuss the historical evolution of Pakistan civil service.',
    'Critically examine civil service reform attempts in Pakistan.',
    'Evaluate the colonial legacy of bureaucracy and its reform implications.',
    'Neutral and competent civil service is essential for good governance. Discuss with reform history.',
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
      label: 'Reform drivers',
      text: 'Recurring reform drivers include politicisation concerns, delivery gaps, skills mismatch, and accountability weaknesses.',
    },
    {
      label: 'Reform themes',
      text: 'Standard reform themes: merit, training, performance management, accountability, and e-governance / citizen facilitation.',
    },
    {
      label: 'Source caution',
      text: 'Do not invent exact commission years, act titles, or cadre strength numbers as permanent syllabus facts.',
    },
  ],
  flashcards: [
    {
      prompt: 'What colonial service tradition shaped Pakistan bureaucracy?',
      answer: 'British Indian Civil Service (ICS) tradition',
    },
    {
      prompt: 'What does CSP stand for in exam histories?',
      answer: 'Civil Service of Pakistan',
    },
    {
      prompt: 'What does DMG stand for?',
      answer: 'District Management Group',
    },
    {
      prompt: 'What does PAS stand for?',
      answer: 'Pakistan Administrative Service',
    },
    {
      prompt: 'How should CSP/DMG/PAS be framed?',
      answer: 'As naming evolution of the administrative service stream, not three unrelated services',
    },
    {
      prompt: 'Name three recurring reform themes.',
      answer: 'Merit, training/accountability, and e-governance',
    },
    {
      prompt: 'Name two problems that keep reform on the agenda.',
      answer: 'Politicisation and weak service delivery (or skills mismatch / accountability gaps)',
    },
    {
      prompt: 'Should students invent commission years?',
      answer: 'No; use reform themes unless a trusted dated source is available',
    },
    {
      prompt: 'What closing balance scores?',
      answer: 'Political will for reform plus protection of professional neutrality',
    },
  ],
  mistakes: [
    {
      trap: 'Inventing fake reform commission years or act titles.',
      correct: 'Use recurring reform themes and careful cadre naming.',
    },
    {
      trap: 'Treating CSP, DMG, and PAS as three unrelated services.',
      correct: 'Frame as naming evolution of the elite administrative stream.',
    },
    {
      trap: 'Writing only colonial nostalgia or only anti-bureaucracy slogans.',
      correct: 'Balance legacy strengths with delivery and accountability critiques.',
    },
    {
      trap: 'Ignoring e-governance and citizen facilitation.',
      correct: 'Modern reform answers usually include digital delivery themes.',
    },
    {
      trap: 'Forgetting political will.',
      correct: 'Reform history shows technical ideas fail without political commitment and neutrality safeguards.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'ICS legacy and CSP meaning.' },
    { day: 'Day 2', task: 'DMG/PAS naming evolution carefully.' },
    { day: 'Day 3', task: 'Problems that drive reform.' },
    { day: 'Day 4', task: 'Flashcards.' },
    { day: 'Day 5', task: 'Reform themes outline (no fake years).' },
    { day: 'Day 6', task: '10-minute critically examine answer.' },
    { day: 'Day 7', task: 'Recite one-pager.' },
  ],
  sourcesLine:
    'Sources: standard public administration and Pakistan Affairs notes on ICS legacy, CSP/DMG/PAS framing, and civil service reform agendas. Avoid invented commission calendars and cadre totals.',
}
