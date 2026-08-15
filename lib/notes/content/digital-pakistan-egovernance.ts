import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked:
 * - Digital Pakistan Policy 2018 is a standard named federal policy milestone in teaching
 * - E-governance themes: online services, e-office, digital identity (NADRA), tax e-filing, land and court digitisation pilots (cite as themes)
 * - Aims: access, transparency, efficiency, inclusion; constraints: connectivity gaps, literacy, cybersecurity, procurement capacity
 * - Do not invent user counts, fake completion rates, or claim all government services are fully digital
 */
export const DIGITAL_PAKISTAN_EGOVERNANCE_KIT: NoteKitData = {
  id: 'digital-pakistan-egovernance',
  title: 'Digital Pakistan and E-Governance',
  subtitle:
    'Digital policy milestones, public e-services, NADRA identity backbone, and delivery constraints for CSS and PMS.',
  syllabusTags: [
    'Digital Pakistan',
    'E-governance',
    'Public administration',
    'Current affairs',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS / PMS',
      directive: 'Discuss',
      angle: 'E-governance as a tool of good governance in Pakistan',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Evaluate',
      angle: 'Digital Pakistan agenda and citizen services',
      frequency: 'high',
    },
    {
      year: 'CSS Current Affairs',
      directive: 'Critically examine',
      angle: 'Digital divide and cybersecurity constraints on e-governance',
      frequency: 'medium',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'Digital Pakistan Policy 2018; NADRA identity theme',
      frequency: 'medium',
    },
  ],
  onePager: [
    'E-governance uses ICTs to deliver public services, improve transparency, and reduce transaction costs between citizen and state.',
    'Digital Pakistan Policy 2018 is a named federal milestone often cited for a whole-of-government digital agenda (access, skills, governance, economy themes).',
    'Identity backbone: NADRA digital identity underpins many e-services and know-your-customer type processes in Pakistani public administration teaching.',
    'Service examples (themes): tax e-filing, online applications, e-office workflows, and sector digitisation pilots in land or courts. Status varies; do not claim universal completion.',
    'Governance gains: less discretion at counters, audit trails, faster processing, and better data for policy if systems work.',
    'Constraints: uneven broadband and device access, digital literacy, provincial capacity gaps, legacy paper processes, and cybersecurity or privacy risks.',
    'Inclusion test: women, rural poor, and persons with disabilities can be left behind if channels are only online.',
    'Answer close: pair digital front doors with assisted service centres, cyber resilience, open data where appropriate, and measurable service-level standards.',
  ],
  answerSteps: [
    'Define e-governance and link to transparency and efficiency.',
    'Cite Digital Pakistan Policy 2018 as a named milestone.',
    'Explain NADRA identity as an enabler of services.',
    'Give two or three service themes without fake coverage rates.',
    'Critically examine digital divide and cybersecurity.',
    'Conclude with inclusion and service standards.',
  ],
  questionVariants: [
    'Discuss the role of e-governance in improving public service delivery in Pakistan.',
    'Evaluate the Digital Pakistan agenda for citizens and businesses.',
    'Critically examine constraints on digitising government in Pakistan.',
    'How does digital identity support e-governance?',
  ],
  citations: [
    {
      label: 'Policy milestone',
      text: 'Digital Pakistan Policy 2018 is a standard named federal digital agenda milestone in exam teaching.',
    },
    {
      label: 'E-governance aim',
      text: 'Use ICTs for citizen services, transparency, and lower transaction costs.',
    },
    {
      label: 'Identity backbone',
      text: 'NADRA digital identity is a recurring enabler theme for Pakistani e-services.',
    },
    {
      label: 'Service themes',
      text: 'Tax e-filing, e-office, and online applications appear as common examples; coverage is uneven.',
    },
    {
      label: 'Constraints',
      text: 'Connectivity, literacy, capacity, legacy processes, and cybersecurity limit delivery.',
    },
  ],
  flashcards: [
    {
      prompt: 'What is e-governance?',
      answer: 'Use of ICTs to deliver public services and improve transparency and efficiency',
    },
    {
      prompt: 'Which 2018 policy name is high-yield?',
      answer: 'Digital Pakistan Policy 2018',
    },
    {
      prompt: 'What identity institution underpins many e-services?',
      answer: 'NADRA',
    },
    {
      prompt: 'Name three e-governance service themes.',
      answer: 'Tax e-filing, online applications, e-office workflows',
    },
    {
      prompt: 'Name three expected governance gains.',
      answer: 'Less counter discretion, audit trails, faster processing',
    },
    {
      prompt: 'Name four delivery constraints.',
      answer: 'Connectivity gaps, digital literacy, capacity limits, cybersecurity risks',
    },
    {
      prompt: 'What is the inclusion test?',
      answer: 'Whether rural poor, women, and persons with disabilities can still access services',
    },
    {
      prompt: 'Should answers claim all services are fully digital?',
      answer: 'No; digitisation is partial and uneven',
    },
    {
      prompt: 'What closing package scores?',
      answer: 'Assisted centres, cyber resilience, measurable service standards',
    },
    {
      prompt: 'How does e-governance link to good governance vocabulary?',
      answer: 'Transparency, accountability, efficiency, and participation channels',
    },
  ],
  mistakes: [
    {
      trap: 'Claiming universal online delivery of all government services.',
      correct: 'Describe selective progress and remaining paper or hybrid processes.',
    },
    {
      trap: 'Ignoring the digital divide.',
      correct: 'Access and literacy gaps are required critical points.',
    },
    {
      trap: 'Treating NADRA as only a security agency with no service role.',
      correct: 'In e-governance answers, stress identity as a service enabler.',
    },
    {
      trap: 'Inventing app download or user statistics.',
      correct: 'Use institutional themes unless citing a dated source.',
    },
    {
      trap: 'Forgetting cybersecurity and privacy.',
      correct: 'Digital state capacity includes protecting citizen data.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Define e-governance + 2018 policy name.' },
    { day: 'Day 2', task: 'NADRA and service themes.' },
    { day: 'Day 3', task: 'Gains vs constraints table.' },
    { day: 'Day 4', task: 'Flashcards.' },
    { day: 'Day 5', task: 'Inclusion and cyber paragraph.' },
    { day: 'Day 6', task: '10-minute evaluate outline.' },
    { day: 'Day 7', task: 'Recite one-pager.' },
  ],
  sourcesLine:
    'Sources: Digital Pakistan Policy 2018 teaching summaries, NADRA identity-service notes, and standard public administration e-governance primers. Avoid invented coverage percentages.',
}
