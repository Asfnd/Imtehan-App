import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (CSS Current Affairs syllabus concept, careful framing):
 * - Hybrid warfare: blending conventional, irregular, informational, cyber, economic, and political tools below or alongside open war
 * - Related vocabulary: information operations, disinformation, cyber disruption, proxy themes, lawfare, economic coercion (concept level)
 * - Exam use: define carefully, give domains, discuss resilience and governance; do not provide attack methods or how-to guidance
 * Keep non-sensational; avoid naming unverified operations as fact
 */
export const HYBRID_WARFARE_CONCEPTS_KIT: NoteKitData = {
  id: 'hybrid-warfare-concepts',
  title: 'Hybrid Warfare Concepts (Current Affairs)',
  subtitle:
    'Syllabus-level definition, tool domains, and resilience framing for CSS current affairs without operational detail.',
  syllabusTags: [
    'Hybrid warfare',
    'Current affairs',
    'Information security',
    'National security concepts',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS Current Affairs',
      directive: 'Discuss',
      angle: 'Hybrid warfare as a contemporary security challenge',
      frequency: 'high',
    },
    {
      year: 'CSS / PMS',
      directive: 'Critically examine',
      angle: 'Information and cyber domains in hybrid conflict',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Evaluate',
      angle: 'Societal resilience against hybrid threats',
      frequency: 'medium',
    },
    {
      year: 'One-paper / MPT',
      directive: 'MCQ / short',
      angle: 'Hybrid warfare definition and tool mix',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Hybrid warfare (exam definition): coordinated use of military and non-military tools (information, cyber, economic, political, and irregular means) to achieve strategic effects, often below the threshold of open declared war.',
    'Why the concept appears in CSS CA: modern rivalry mixes force, narrative, disruption, and pressure. Answers should define the mix, not dramatise it.',
    'Common tool domains in teaching: information and disinformation; cyber disruption at concept level; economic pressure; political interference themes; irregular or proxy pressure; legal and diplomatic instruments (sometimes called lawfare in notes).',
    'Grey-zone idea: actions that create ambiguity about attribution and response, making rapid escalation decisions harder. Phrase as analytical concept, not as a how-to.',
    'Effects sought in syllabus language: confuse public opinion, strain institutions, polarise society, raise costs for the target state, and shape decisions without classic battlefield victory alone.',
    'Resilience response themes (defensive, exam-safe): media literacy, credible official communication, cyber hygiene and incident response capacity at concept level, economic buffers, inter-agency coordination, and rule-of-law continuity.',
    'Pakistan answer habit: relate hybrid challenges to information environment, social cohesion, and institutional trust. Avoid inventing specific secret campaigns or graphic scenarios.',
    'Close: define hybrid warfare cleanly; list domains; explain grey-zone ambiguity; recommend resilience and lawful governance; reject sensational conspiracy dumps.',
  ],
  answerSteps: [
    'Define hybrid warfare as a blend of military and non-military tools.',
    'List key domains: information, cyber, economic, political, irregular.',
    'Explain grey-zone ambiguity briefly.',
    'Discuss societal and institutional resilience measures at concept level.',
    'Link carefully to Pakistan information and cohesion themes if asked.',
    'Conclude with lawful, coordinated, non-sensational response framing.',
  ],
  questionVariants: [
    'Discuss the concept of hybrid warfare in contemporary international politics.',
    'Critically examine information and cyber tools in hybrid conflict.',
    'Evaluate societal resilience as a response to hybrid threats.',
    'How does hybrid warfare differ from conventional warfare in exam framing?',
  ],
  citations: [
    {
      label: 'Definition',
      text: 'Hybrid warfare blends military and non-military tools to achieve strategic effects, often below open war.',
    },
    {
      label: 'Domains',
      text: 'Information/disinformation, cyber, economic pressure, political tools, irregular/proxy themes.',
    },
    {
      label: 'Grey zone',
      text: 'Ambiguous attribution and response thresholds that complicate escalation decisions.',
    },
    {
      label: 'Response',
      text: 'Resilience: media literacy, credible communication, cyber capacity concepts, coordination, rule of law.',
    },
  ],
  flashcards: [
    {
      prompt: 'Define hybrid warfare for CSS.',
      answer: 'Coordinated mix of military and non-military tools for strategic effect, often below open war',
    },
    {
      prompt: 'Name three hybrid tool domains.',
      answer: 'Information, cyber, and economic (or political / irregular)',
    },
    {
      prompt: 'What is the grey-zone idea?',
      answer: 'Ambiguous actions that complicate attribution and response',
    },
    {
      prompt: 'What is disinformation in this context?',
      answer: 'False or misleading narratives spread to shape opinion and decisions',
    },
    {
      prompt: 'Name one resilience theme.',
      answer: 'Media literacy or credible official communication',
    },
    {
      prompt: 'Should answers teach attack methods?',
      answer: 'No; stay at concept and defensive resilience level',
    },
    {
      prompt: 'How does hybrid differ from classic conventional war?',
      answer: 'Greater use of non-military tools and ambiguity, not only open battles',
    },
    {
      prompt: 'Name a Pakistan-linked essay angle.',
      answer: 'Information environment, social cohesion, and institutional trust',
    },
    {
      prompt: 'What tone fits this topic?',
      answer: 'Analytical and non-sensational',
    },
  ],
  mistakes: [
    {
      trap: 'Treating hybrid warfare as only social media memes.',
      correct: 'It is a broader mix including cyber, economic, and political tools.',
    },
    {
      trap: 'Dumping conspiracy claims without definition.',
      correct: 'Start with a clean definition and domains.',
    },
    {
      trap: 'Writing operational how-to content.',
      correct: 'Exam answers stay conceptual and resilience-focused.',
    },
    {
      trap: 'Ignoring societal resilience.',
      correct: 'Cohesion, literacy, and institutions are core response themes.',
    },
    {
      trap: 'Equating hybrid warfare with conventional invasion only.',
      correct: 'Hybrid emphasises blended tools and grey-zone ambiguity.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Memorise clean hybrid warfare definition.' },
    { day: 'Day 2', task: 'List tool domains.' },
    { day: 'Day 3', task: 'Grey zone + resilience themes.' },
    { day: 'Day 4', task: 'Flashcards.' },
    { day: 'Day 5', task: 'Pakistan cohesion angle carefully.' },
    { day: 'Day 6', task: '10-minute discuss outline.' },
    { day: 'Day 7', task: 'Recite one-pager.' },
  ],
  sourcesLine:
    'Sources: standard CSS current affairs syllabus notes on hybrid warfare as a conceptual security challenge. No operational or attack guidance.',
}
