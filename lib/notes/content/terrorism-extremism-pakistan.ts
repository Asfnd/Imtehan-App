import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked careful markers (exam balanced tone):
 * - Post-9/11 context: Afghanistan conflict next door and internal terrorism wave inside Pakistan
 * - National Action Plan (NAP) is the name-level national counter-terrorism policy framework often cited after major incidents (notably after 2014 APS attack in exam narratives)
 * - Answer focus: causes, costs, state response themes, deradicalisation and governance, not graphic violence or partisan blame
 * Avoid inventing fake operation casualty tables, fake treaty names, or glorifying any group
 */
export const TERRORISM_EXTREMISM_PAKISTAN_KIT: NoteKitData = {
  id: 'terrorism-extremism-pakistan',
  title: 'Terrorism and Extremism in Pakistan',
  subtitle:
    'Post-9/11 internal security context, NAP at name level, causes and responses in balanced CSS and PMS framing.',
  syllabusTags: [
    'Internal security',
    'Pakistan Affairs',
    'Current Affairs',
    'Governance',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS pattern',
      directive: 'Discuss',
      angle: 'Causes and consequences of terrorism in Pakistan',
      frequency: 'high',
    },
    {
      year: 'CSS / PMS',
      directive: 'Critically examine',
      angle: 'State response and National Action Plan themes',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Evaluate',
      angle: 'Extremism, governance, and social cohesion',
      frequency: 'medium',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'NAP name recognition; post-9/11 security context',
      frequency: 'medium',
    },
  ],
  onePager: [
    'After 9/11, Pakistan faced a severe internal security challenge linked to the Afghan conflict spillover, militant networks, and domestic polarisation. Write analytically, not sensationally.',
    'Costs cited in exams: civilian and security force losses, economic disruption, investment fear, social trauma, and weakened trust in institutions.',
    'Drivers often discussed: ideological extremism, weak regulation of hate speech and militant financing (policy themes), governance gaps, and regional conflict dynamics. Avoid one-cause slogans.',
    'National Action Plan (NAP) is the name-level umbrella for a multi-point national counter-terrorism and counter-extremism agenda frequently referenced in Pakistani exam answers.',
    'Response themes: law enforcement and intelligence coordination, kinetic operations where required, choking terror financing, madrassa and curriculum reform debates, and rehabilitation or deradicalisation language at syllabus level.',
    'Sustainable security needs rule of law, inclusive governance, and narrative countering of hate. Military tools alone are incomplete in critical answers.',
    'Tone rule: condemn terrorism, protect civilian rights language, avoid communal baiting, and do not invent classified operational details.',
  ],
  answerSteps: [
    'Define terrorism and extremism briefly for exam clarity.',
    'Place the problem in post-9/11 and regional conflict context without conspiracy essays.',
    'Explain human, economic, and social costs with sober language.',
    'Name NAP as the national policy frame and list response themes (not a fake numbered dump unless you truly recall it).',
    'Argue that security plus governance and ideology work together.',
    'Close with a balanced path: rule of law, prevention, and regional peace needs.',
  ],
  questionVariants: [
    'Discuss the causes and consequences of terrorism in Pakistan.',
    'Critically examine Pakistan\'s counter-terrorism efforts with reference to the National Action Plan.',
    'Evaluate the link between extremism, governance failure, and internal security.',
    'How can Pakistan counter violent extremism sustainably? Discuss.',
  ],
  citations: [
    {
      label: 'Context',
      text: 'Post-9/11 Afghanistan conflict and internal militant violence shaped Pakistan\'s security agenda.',
    },
    {
      label: 'NAP',
      text: 'National Action Plan (NAP) is the commonly cited national counter-terrorism and counter-extremism framework.',
    },
    {
      label: 'Costs',
      text: 'Human losses, economic disruption, and social polarisation are standard consequence themes.',
    },
    {
      label: 'Response mix',
      text: 'Enforcement, financing controls, narrative and education reforms, and governance improvements appear together in strong answers.',
    },
    {
      label: 'Exam tone',
      text: 'Analytical, rights-respecting, non-communal, and free of invented operational statistics.',
    },
  ],
  flashcards: [
    {
      prompt: 'What does NAP stand for in Pakistan security essays?',
      answer: 'National Action Plan',
    },
    {
      prompt: 'Which global event marks the usual post-2001 security turning point?',
      answer: '9/11 (11 September 2001)',
    },
    {
      prompt: 'Name two cost categories of terrorism for exam answers.',
      answer: 'Human losses; economic disruption (or social polarisation)',
    },
    {
      prompt: 'Why is governance part of counter-extremism?',
      answer: 'Weak institutions and injustice narratives can feed radicalisation pathways',
    },
    {
      prompt: 'Is kinetic force alone enough in critical answers?',
      answer: 'No. Pair security with law, financing controls, and social/ideological measures',
    },
    {
      prompt: 'What tone should CSS answers avoid?',
      answer: 'Graphic sensationalism, communal baiting, and fake casualty tables',
    },
    {
      prompt: 'Name one non-kinetic theme often linked to NAP-type agendas.',
      answer: 'Countering terror financing, hate speech regulation, or education/narrative reform',
    },
    {
      prompt: 'Trap: inventing classified raid details.',
      answer: 'Stay at syllabus policy level. Do not invent ops data.',
    },
    {
      prompt: 'Link Afghanistan briefly to internal security.',
      answer: 'Conflict spillover and militant networks raised Pakistan\'s internal threat environment',
    },
    {
      prompt: 'What closing line scores well?',
      answer: 'Sustainable peace needs security, rule of law, and inclusive governance',
    },
  ],
  mistakes: [
    {
      trap: 'Writing a revenge essay or communal blame dump.',
      correct: 'Stay analytical. Condemn terrorism and discuss institutions and policy.',
    },
    {
      trap: 'Inventing exact NAP point lists or casualty totals from memory myths.',
      correct: 'Use NAP as name-level frame plus accurate themes. Quote numbers only from reliable named sources.',
    },
    {
      trap: 'Claiming terrorism ended permanently after one operation.',
      correct: 'Threat levels change. Critical answers stress sustained prevention.',
    },
    {
      trap: 'Ignoring civilian impact and rights language entirely.',
      correct: 'Security and rights-respecting governance belong together in quality answers.',
    },
    {
      trap: 'Treating extremism as only a foreign import with zero domestic drivers.',
      correct: 'Regional and domestic factors both appear in balanced analysis.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Read post-9/11 context and cost themes.' },
    { day: 'Day 2', task: 'Memorise NAP name and response mix.' },
    { day: 'Day 3', task: 'Write a 10-minute balanced outline on causes.' },
    { day: 'Day 4', task: 'Drill flashcards.' },
    { day: 'Day 5', task: 'Attempt NAP critically examine outline (themes only).' },
    { day: 'Day 6', task: 'One-pager + citations. Practice sober MCQ facts.' },
    { day: 'Day 7', task: 'One-pager only. Recite tone rules and NAP from memory.' },
  ],
  sourcesLine:
    'Sources: FPSC Pakistan Affairs and current affairs security themes; official NAP references at name level; standard academic treatments of post-9/11 Pakistan security. Avoid graphic social-media casualty myths and partisan blogs.',
}
