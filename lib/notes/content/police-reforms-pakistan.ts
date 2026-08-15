import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (carefully balanced police reforms framing):
 * - Police role: law and order, crime prevention/investigation, public safety under rule of law
 * - Reform themes in teaching: depoliticisation, accountability, training, investigation quality, community policing, resource and welfare issues
 * - Legal history language often cites colonial Police Act 1861 inheritance and later reform debates / provincial police order themes without inventing fake nationwide uniform statutes as certainty
 * Keep tone balanced: state capacity and citizen rights; avoid sensational crime lists or partisan blame
 */
export const POLICE_REFORMS_PAKISTAN_KIT: NoteKitData = {
  id: 'police-reforms-pakistan',
  title: 'Police Reforms in Pakistan',
  subtitle:
    'Balanced CSS framing: police role, colonial legacy themes, reform agendas, and rule-of-law accountability.',
  syllabusTags: [
    'Governance',
    'Police reforms',
    'Rule of law',
    'Public administration',
    'Pakistan Affairs',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS / PMS',
      directive: 'Discuss',
      angle: 'Need for police reforms in Pakistan',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Critically examine',
      angle: 'Politicisation and accountability of police',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Evaluate',
      angle: 'Community policing and citizen trust',
      frequency: 'medium',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'Police role under rule of law / colonial Police Act theme',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Police function: maintain public order, prevent and investigate crime, and protect life and property within the Constitution and law. Reform is about making this function professional, impartial, and rights-respecting.',
    'Legacy theme: much teaching links Pakistan policing culture to colonial control-oriented models (often referencing the Police Act 1861 inheritance). Use as historical framing, not as a claim that nothing ever changed.',
    'Reform drivers: public trust gaps, politicisation concerns, investigation quality, training and forensics capacity, resource constraints, and accountability for misuse of force or corruption allegations.',
    'Reform agenda (balanced): operational autonomy with democratic oversight; merit-based posting and promotion; better training and investigation standards; community policing; welfare and equipment; complaint and oversight mechanisms.',
    'Rights balance: effective policing is necessary for citizen security; excess and abuse undermine rule of law. Answers should hold both sides.',
    'Federal-provincial caution: policing is largely a provincial subject in practice and constitutional distribution themes. Avoid inventing a single fake nationwide reform act as current certainty.',
    'Exam close: professional, accountable police under law is a governance deliverable, not a slogan.',
  ],
  answerSteps: [
    'Define police role under rule of law.',
    'Note colonial legacy themes carefully (control vs service orientation).',
    'State problems: politicisation, capacity, trust, accountability.',
    'Propose balanced reforms: autonomy with oversight, merit, training, community policing.',
    'Add rights and provincial-subject caution.',
    'Conclude with citizen security plus lawful accountability.',
  ],
  questionVariants: [
    'Discuss the need for police reforms in Pakistan.',
    'Critically examine politicisation of police and its remedies.',
    'Evaluate community policing as a reform tool.',
    'Effective and accountable police is essential for good governance. Discuss.',
  ],
  citations: [
    {
      label: 'Police role',
      text: 'Police maintain public order and investigate crime under the Constitution and law.',
    },
    {
      label: 'Legacy theme',
      text: 'Teaching notes often link policing culture to colonial control-oriented inheritance (Police Act 1861 theme), used as historical framing.',
    },
    {
      label: 'Reform pillars',
      text: 'Common reform themes: depoliticisation, merit, training/investigation quality, community policing, and accountability mechanisms.',
    },
    {
      label: 'Rights balance',
      text: 'Citizen security requires effective policing; abuse and excess undermine rule of law. Balanced answers hold both.',
    },
    {
      label: 'Provincial caution',
      text: 'Policing is largely treated as a provincial subject in constitutional practice themes; avoid inventing one fake nationwide reform statute as certainty.',
    },
  ],
  flashcards: [
    {
      prompt: 'What is the core police function in exam answers?',
      answer: 'Public order, crime prevention/investigation, and protection of life/property under law',
    },
    {
      prompt: 'Which colonial law theme often appears in police-history notes?',
      answer: 'Police Act 1861 inheritance / control-oriented model',
    },
    {
      prompt: 'Name three police-reform drivers.',
      answer: 'Politicisation, trust gaps, and weak investigation/accountability capacity',
    },
    {
      prompt: 'Name three reform proposals.',
      answer: 'Merit-based postings, better training, and community policing (plus oversight)',
    },
    {
      prompt: 'What rights balance should answers keep?',
      answer: 'Effective security and lawful accountability against abuse',
    },
    {
      prompt: 'Why is provincial framing important?',
      answer: 'Policing is largely a provincial subject in practice themes',
    },
    {
      prompt: 'What is community policing in one line?',
      answer: 'Partnership between police and citizens to prevent crime and build trust',
    },
    {
      prompt: 'What trap weakens police-reform essays?',
      answer: 'Sensational crime lists or one-sided partisan blame without reform structure',
    },
    {
      prompt: 'What closing line scores?',
      answer: 'Professional accountable police under law as a governance deliverable',
    },
  ],
  mistakes: [
    {
      trap: 'Writing sensational crime anecdotes instead of reform structure.',
      correct: 'Use role, legacy theme, problems, and balanced reform pillars.',
    },
    {
      trap: 'Claiming a single fake nationwide reform act as current law certainty.',
      correct: 'Use provincial-subject caution and reform themes.',
    },
    {
      trap: 'Demanding autonomy with no oversight.',
      correct: 'Operational autonomy needs democratic and legal accountability.',
    },
    {
      trap: 'Ignoring citizen rights while discussing tough policing.',
      correct: 'Security and rights are joint rule-of-law requirements.',
    },
    {
      trap: 'Treating police reform as only equipment purchase.',
      correct: 'Culture, merit, investigation quality, and accountability matter as much as hardware.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Police role under rule of law.' },
    { day: 'Day 2', task: 'Colonial legacy theme carefully.' },
    { day: 'Day 3', task: 'Problems and trust gaps outline.' },
    { day: 'Day 4', task: 'Flashcards.' },
    { day: 'Day 5', task: 'Balanced reform pillars + provincial caution.' },
    { day: 'Day 6', task: '10-minute critically examine answer.' },
    { day: 'Day 7', task: 'Recite one-pager.' },
  ],
  sourcesLine:
    'Sources: standard governance and Pakistan Affairs notes on police role, colonial Police Act themes, and reform agendas (merit, accountability, community policing). Keep tone balanced; avoid sensational lists and invented statutes.',
}
