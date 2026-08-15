import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (exam-safe national security teaching):
 * - National security is multi-dimensional: traditional military defence plus economic, human, cyber, energy, and environmental security themes
 * - Policy framing: ends, means, ways; whole-of-government coordination; civil-military institutional balance in public discourse
 * - Pakistan notes often mention National Security Policy / National Security Committee at name level; avoid inventing classified text or sensational threat lists
 * Keep calm analytical tone; no operational tactics or graphic content
 */
export const NATIONAL_SECURITY_POLICY_BASICS_KIT: NoteKitData = {
  id: 'national-security-policy-basics',
  title: 'National Security Policy Basics',
  subtitle:
    'Multi-dimensional security concepts, policy ends-means-ways framing, and calm CSS current affairs answer structure.',
  syllabusTags: [
    'National security',
    'Current affairs',
    'Pakistan Affairs',
    'Governance',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS / PMS',
      directive: 'Discuss',
      angle: 'National security challenges of Pakistan in a comprehensive sense',
      frequency: 'high',
    },
    {
      year: 'CSS Current Affairs',
      directive: 'Critically examine',
      angle: 'Economic and human security as pillars of national security',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Evaluate',
      angle: 'Institutional coordination for national security policy',
      frequency: 'medium',
    },
    {
      year: 'One-paper / MPT',
      directive: 'MCQ / short',
      angle: 'Traditional vs non-traditional security vocabulary',
      frequency: 'medium',
    },
  ],
  onePager: [
    'National security protects the state and society from serious threats while enabling peaceful development. Modern exam answers treat it as multi-dimensional, not only military strength.',
    'Traditional dimension: territorial integrity, defence readiness, and deterrence themes at conceptual level. Write analytically; do not invent classified force structures or sensational war scenarios.',
    'Non-traditional dimensions frequently tested: economic security (debt, growth, energy), human security (health, education, social cohesion), cyber and information resilience, food and water security, and climate/disaster risk.',
    'Policy framing useful in essays: ends (what to protect), means (resources and institutions), ways (strategies and coordination). A policy document is only as strong as implementation capacity.',
    'Whole-of-government idea: ministries, provinces, security institutions, and civilian agencies must share priorities. Fragmentation weakens response to complex risks.',
    'Pakistan teaching often references national security policy documents and coordinating forums (for example National Security Committee themes) at name level. Quote concepts, not invented secret clauses.',
    'Trade-offs: security spending versus social investment; openness versus risk management; sovereignty versus cooperation. Balanced answers name the trade-off and propose sequenced priorities.',
    'Answer close: define comprehensive security; list two traditional and two non-traditional pillars relevant to the question; stress coordination, fiscal sustainability, and rights-respecting governance; avoid alarmist language.',
  ],
  answerSteps: [
    'Define national security in comprehensive (multi-dimensional) terms.',
    'Separate traditional and non-traditional pillars briefly.',
    'Apply ends-means-ways or whole-of-government framing.',
    'Link two Pakistan-relevant challenges without sensational detail.',
    'Discuss coordination and resource trade-offs.',
    'Conclude with calm reform priorities: institutions, economy, and human security.',
  ],
  questionVariants: [
    'Discuss national security as a multi-dimensional concept with reference to Pakistan.',
    'Critically examine the place of economic and human security in national security policy.',
    'Evaluate institutional coordination as a condition for effective national security policy.',
    'How do climate and food security relate to national security in exam framing?',
  ],
  citations: [
    {
      label: 'Definition',
      text: 'National security protects state and society while enabling development; exams expect multi-dimensional framing.',
    },
    {
      label: 'Traditional vs non-traditional',
      text: 'Traditional: defence and territorial integrity themes. Non-traditional: economy, human security, cyber, climate, food/water.',
    },
    {
      label: 'Policy logic',
      text: 'Ends, means, and ways; whole-of-government coordination for implementation.',
    },
    {
      label: 'Discipline',
      text: 'Use name-level policy and committee references; avoid classified claims and sensational threat lists.',
    },
  ],
  flashcards: [
    {
      prompt: 'What does multi-dimensional national security mean?',
      answer: 'Security beyond the military, including economic, human, cyber, and environmental themes',
    },
    {
      prompt: 'Name two traditional security themes.',
      answer: 'Territorial integrity and defence readiness / deterrence concepts',
    },
    {
      prompt: 'Name two non-traditional security themes.',
      answer: 'Economic security and human security (or cyber, food, climate)',
    },
    {
      prompt: 'What is ends-means-ways framing?',
      answer: 'Ends are goals; means are resources/institutions; ways are strategies',
    },
    {
      prompt: 'What is whole-of-government in this context?',
      answer: 'Coordinated action across ministries, provinces, and agencies',
    },
    {
      prompt: 'Why does economic security matter for national security?',
      answer: 'Weak fiscal and energy foundations undermine long-term stability and capacity',
    },
    {
      prompt: 'Should answers invent classified policy text?',
      answer: 'No; stay at concept and name-level public teaching',
    },
    {
      prompt: 'Name a common exam trade-off.',
      answer: 'Security spending versus social investment (or openness versus risk management)',
    },
    {
      prompt: 'What tone should CSS answers use?',
      answer: 'Calm, analytical, and non-sensational',
    },
  ],
  mistakes: [
    {
      trap: 'Reducing national security to military hardware only.',
      correct: 'Include economic, human, and other non-traditional pillars.',
    },
    {
      trap: 'Writing sensational threat narratives without analysis.',
      correct: 'Use sober definitions, pillars, and policy logic.',
    },
    {
      trap: 'Inventing secret National Security Policy clauses.',
      correct: 'Use public concept-level framing only.',
    },
    {
      trap: 'Ignoring implementation and coordination.',
      correct: 'Policy documents need institutions and fiscal means.',
    },
    {
      trap: 'Treating human security as unrelated soft talk.',
      correct: 'Health, education, and cohesion support durable security.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Define multi-dimensional national security.' },
    { day: 'Day 2', task: 'Traditional vs non-traditional pillars.' },
    { day: 'Day 3', task: 'Ends-means-ways and whole-of-government.' },
    { day: 'Day 4', task: 'Flashcards.' },
    { day: 'Day 5', task: 'Pakistan application without sensational detail.' },
    { day: 'Day 6', task: '10-minute critically examine outline.' },
    { day: 'Day 7', task: 'Recite one-pager calmly.' },
  ],
  sourcesLine:
    'Sources: standard CSS current affairs teaching on comprehensive national security and public policy coordination. Avoid classified or sensational material.',
}
