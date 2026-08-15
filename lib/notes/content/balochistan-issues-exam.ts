import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (exam-safe, non-sensational):
 * - Balochistan: largest province by area; strategic coast including Gwadar; sparse population relative to land
 * - Development themes: infrastructure gaps, human development indicators, resource and revenue sharing debates
 * - Security themes: insurgency/separatism as exam topics at concept level; state response and peace/development linkage
 * - Resource framing: natural gas, minerals, coast; NFC/royalty and local benefit debates in standard PA notes
 * Avoid sensational casualty claims, conspiracies, or invented treaty/secret figures
 */
export const BALOCHISTAN_ISSUES_EXAM_KIT: NoteKitData = {
  id: 'balochistan-issues-exam',
  title: 'Balochistan Issues (Exam Framing)',
  subtitle:
    'Development gaps, security challenges, and resource governance for CSS and PMS, kept balanced and non-sensational.',
  syllabusTags: [
    'Pakistan Affairs',
    'Balochistan',
    'Provincial issues',
    'Current affairs',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS / PMS Pakistan Affairs',
      directive: 'Discuss',
      angle: 'Problems of Balochistan and way forward',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Critically examine',
      angle: 'Development versus security approach in Balochistan',
      frequency: 'high',
    },
    {
      year: 'CSS / PMS',
      directive: 'Evaluate',
      angle: 'Resource management and local benefit in Balochistan',
      frequency: 'medium',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'Largest province by area; Gwadar location theme',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Exam frame: treat Balochistan as a multi-dimensional provincial challenge (development, governance, security, and resources), not as a single slogan.',
    'Geography basics: largest province by area; long coast; low population density relative to land; strategic location for ports and corridors.',
    'Development side: gaps in education, health, connectivity, and local economic opportunities appear repeatedly in standard Pakistan Affairs notes.',
    'Governance side: effective local institutions, service delivery, and trust between centre, province, and communities are core written-answer themes.',
    'Resource side: natural gas, minerals, and coastal/port potential raise questions of royalties, employment, and visible local benefit (link carefully to NFC/fiscal federalism ideas without inventing figures).',
    'Security side: exams expect a calm mention of unrest and insurgency themes, with emphasis on rule of law, political inclusion, and development as durable stabilisers.',
    'Strategic projects (including Gwadar/CPEC-linked infrastructure) should be framed as opportunity plus local inclusion and security governance tests.',
    'Answer close: balanced package of political dialogue, rights and justice, jobs and services, transparent resource sharing, and professional security policy. Avoid one-cause myths.',
  ],
  answerSteps: [
    'Open with multi-dimensional framing (development, governance, resources, security).',
    'Give geographic and strategic context in two sentences.',
    'Analyse development and human development gaps.',
    'Discuss resource and fiscal benefit debates carefully.',
    'Add a restrained security paragraph linked to inclusion and rule of law.',
    'Conclude with a practical way-forward package, not slogans.',
  ],
  questionVariants: [
    'Discuss the major issues of Balochistan and suggest a way forward.',
    'Critically examine the development and security dimensions of the Balochistan problem.',
    'Evaluate the role of resource management in addressing grievances in Balochistan.',
    'How can centre-province relations and local inclusion improve outcomes in Balochistan?',
  ],
  citations: [
    {
      label: 'Geographic fact',
      text: 'Balochistan is the largest province of Pakistan by area and has a strategically important coastline.',
    },
    {
      label: 'Development framing',
      text: 'Standard notes stress infrastructure and human development gaps alongside governance and trust issues.',
    },
    {
      label: 'Resource framing',
      text: 'Gas, minerals, and port potential raise royalty, employment, and local-benefit debates in exam literature.',
    },
    {
      label: 'Security framing',
      text: 'Unrest themes are discussed with emphasis on inclusion, justice, and development as long-term stabilisers.',
    },
  ],
  flashcards: [
    {
      prompt: 'What exam frame should open a Balochistan answer?',
      answer: 'Multi-dimensional: development, governance, resources, and security',
    },
    {
      prompt: 'What is Balochistan famous for geographically in MCQs?',
      answer: 'Largest province by area; important coastline (Gwadar theme)',
    },
    {
      prompt: 'Name two development gap themes.',
      answer: 'Education/health services and connectivity/jobs',
    },
    {
      prompt: 'What resource debate do exams often expect?',
      answer: 'Local benefit from gas, minerals, and ports (royalties/jobs)',
    },
    {
      prompt: 'How should security be written in essays?',
      answer: 'Calmly; link stability to inclusion, justice, and development',
    },
    {
      prompt: 'How should CPEC/Gwadar appear in this kit?',
      answer: 'As opportunity plus local inclusion and governance tests',
    },
    {
      prompt: 'What closing package scores well?',
      answer: 'Dialogue, services, transparent resource sharing, professional security',
    },
    {
      prompt: 'What style must you avoid?',
      answer: 'Sensational claims, conspiracies, and one-cause myths',
    },
    {
      prompt: 'Why mention population density carefully?',
      answer: 'Sparse settlement relative to huge land area shapes service delivery costs',
    },
    {
      prompt: 'Should you invent casualty or secret figures?',
      answer: 'No; stay with named institutional and policy themes',
    },
  ],
  mistakes: [
    {
      trap: 'Reducing Balochistan to only a security story.',
      correct: 'Always pair security with development, governance, and resources.',
    },
    {
      trap: 'Using sensational or partisan language.',
      correct: 'Keep analytical, balanced, and syllabus-safe.',
    },
    {
      trap: 'Ignoring local benefit from resources and ports.',
      correct: 'Visible local gains are a high-yield essay point.',
    },
    {
      trap: 'Treating Gwadar as automatic prosperity.',
      correct: 'Infrastructure needs inclusion, skills, and security governance.',
    },
    {
      trap: 'Offering slogans without a way forward.',
      correct: 'End with concrete institutional and policy steps.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Memorise four pillars: development, governance, resources, security.' },
    { day: 'Day 2', task: 'Add geography and Gwadar/strategic coast lines.' },
    { day: 'Day 3', task: 'Write a 10-minute balanced essay outline.' },
    { day: 'Day 4', task: 'Drill flashcards; remove sensational phrasing.' },
    { day: 'Day 5', task: 'One paragraph on resource benefit and NFC-linked ideas.' },
    { day: 'Day 6', task: 'Way-forward package in six bullets.' },
    { day: 'Day 7', task: 'Recite one-pager without notes.' },
  ],
  sourcesLine:
    'Sources: standard Pakistan Affairs provincial-issues notes; geographic facts on area and coast; exam literature on development, fiscal federalism themes, and restrained security framing. Avoid sensational media claims and invented statistics.',
}
