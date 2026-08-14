import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked:
 * - Supreme Court apex; High Courts at provincial/territorial level under the 1973 Constitution
 * - Judicial review: courts examine constitutionality of laws/executive acts
 * - Suo motu: court acting on its own motion; debated regarding scope and separation of powers
 * - Exam balance: independence protects constitution; activism critiques concern overreach
 * - Do not invent fake case holdings as absolute one-liners unless carefully framed
 */
export const JUDICIARY_PAKISTAN_BASICS_KIT: NoteKitData = {
  id: 'judiciary-pakistan-basics',
  title: 'Judiciary in Pakistan (Basics)',
  subtitle:
    'Supreme Court and High Courts, judicial review, suo motu debates, and independence vs activism for CSS.',
  syllabusTags: [
    'Constitution',
    'Judiciary',
    'Governance',
    'Pakistan Affairs',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS pattern',
      directive: 'Discuss',
      angle: 'Independence of the judiciary in Pakistan',
      frequency: 'high',
    },
    {
      year: 'CSS / PMS',
      directive: 'Critically examine',
      angle: 'Judicial activism and suo motu jurisdiction',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Evaluate',
      angle: 'Judicial review under the 1973 Constitution',
      frequency: 'medium',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'Supreme Court; High Courts; judicial review concept',
      frequency: 'high',
    },
  ],
  onePager: [
    'Judiciary interprets the Constitution and laws, resolves disputes, and protects fundamental rights within constitutional limits.',
    'Structure basics: Supreme Court is the apex court. High Courts are the principal superior courts for provinces/territories under the constitutional design.',
    'Judicial review: courts can examine whether legislation or executive action conforms to the Constitution. It is a check, not a substitute parliament.',
    'Suo motu (careful): action taken by a court on its own motion, often linked in public debate to Article 184(3) public-interest framing at the Supreme Court. Scope and frequency are contested.',
    'Independence: security of tenure, appointment processes, financial/administrative autonomy ideals, and freedom from partisan control.',
    'Activism debate: supporters see rights protection and accountability; critics warn of policy overreach and strain on separation of powers.',
    'Exam balance: defend constitutional independence, explain review, discuss suo motu carefully, and close with rule of law rather than personality politics.',
  ],
  answerSteps: [
    'Define judiciary\'s constitutional role: interpretation, adjudication, rights protection.',
    'State structure: Supreme Court apex; High Courts below at provincial/territorial level.',
    'Explain judicial review as constitutionality check on law and executive power.',
    'Introduce suo motu carefully as self-initiated scrutiny with contested scope.',
    'Balance independence (necessary) against activism critiques (overreach risks).',
    'Close with institutional reform: delay reduction, access to justice, and predictable jurisprudence.',
  ],
  questionVariants: [
    'Discuss the independence of the judiciary in Pakistan.',
    'Critically examine judicial activism with reference to suo motu powers.',
    'Evaluate judicial review as a pillar of constitutionalism.',
    'Independence without restraint can become overreach. Discuss.',
  ],
  citations: [
    {
      label: 'Structure',
      text: 'Under the 1973 Constitution, the Supreme Court is the apex court and High Courts are the superior courts for provinces/territories.',
    },
    {
      label: 'Judicial review',
      text: 'Judicial review is the power of courts to test laws and executive acts against the Constitution.',
    },
    {
      label: 'Suo motu',
      text: 'Suo motu means the court acts on its own motion; in Pakistan it is often debated in the context of Supreme Court public-interest jurisdiction.',
    },
    {
      label: 'Balance line',
      text: 'Judicial independence protects constitutional supremacy; unchecked policy substitution raises separation-of-powers concerns.',
    },
  ],
  flashcards: [
    {
      prompt: 'What is the apex court of Pakistan?',
      answer: 'Supreme Court',
    },
    {
      prompt: 'What are the principal provincial superior courts called?',
      answer: 'High Courts',
    },
    {
      prompt: 'What is judicial review?',
      answer: 'Court power to test constitutionality of laws/executive acts',
    },
    {
      prompt: 'What does suo motu mean?',
      answer: 'Acting on the court\'s own motion',
    },
    {
      prompt: 'Name one argument for judicial activism.',
      answer: 'Rights protection or accountability of powerful actors',
    },
    {
      prompt: 'Name one critique of activism.',
      answer: 'Policy overreach or strain on separation of powers',
    },
  ],
  mistakes: [
    {
      trap: 'Treating suo motu as unlimited daily governance by courts.',
      correct: 'Explain it carefully as contested self-initiated jurisdiction, not as a blank cheque.',
    },
    {
      trap: 'Equating independence with zero accountability of the judiciary.',
      correct: 'Independence means freedom from partisan control within constitutional ethics and process.',
    },
    {
      trap: 'Saying High Courts are below district courts.',
      correct: 'High Courts are superior courts above the district judiciary.',
    },
    {
      trap: 'Writing only praise or only blame of activism.',
      correct: 'CSS expects a balanced independence vs overreach analysis.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Memorise SC / High Court structure.' },
    { day: 'Day 2', task: 'Define judicial review in two lines.' },
    { day: 'Day 3', task: 'Write suo motu carefully without slogans.' },
    { day: 'Day 4', task: '10-minute independence vs activism outline.' },
    { day: 'Day 5', task: 'Drill flashcards.' },
    { day: 'Day 6', task: 'Practice the restraint variant.' },
    { day: 'Day 7', task: 'One-pager only from memory.' },
  ],
  sourcesLine:
    'Sources: 1973 Constitution judiciary frame; standard constitutional law summaries of judicial review and suo motu debates; FPSC Pakistan Affairs/governance items. Avoid personality-driven case myths.',
}
