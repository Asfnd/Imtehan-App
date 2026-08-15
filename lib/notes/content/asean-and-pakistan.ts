import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (exam-safe regional organisation framing):
 * - ASEAN: Association of Southeast Asian Nations; founded 1967 (Bangkok Declaration)
 * - Classic founding five often taught: Indonesia, Malaysia, Philippines, Singapore, Thailand; later expansion to 10 members in standard GK
 * - Pakistan is not an ASEAN member; engagement is usually Sectoral Dialogue Partner / looking-east themes in teaching notes
 * Avoid inventing fake summit host lists or permanent trade-bloc membership claims
 */
export const ASEAN_AND_PAKISTAN_KIT: NoteKitData = {
  id: 'asean-and-pakistan',
  title: 'ASEAN and Pakistan',
  subtitle:
    'ASEAN founding purpose, membership framing, and Pakistan looking-east / dialogue-partner themes for CA and GK.',
  syllabusTags: [
    'International organizations',
    'ASEAN',
    'Southeast Asia',
    'Pakistan foreign policy',
    'Current affairs',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'One-paper / MPT',
      directive: 'MCQ fact',
      angle: 'ASEAN founding year and full form',
      frequency: 'high',
    },
    {
      year: 'PPSC / NTS',
      directive: 'MCQ fact',
      angle: 'ASEAN purpose and Southeast Asia regionalism',
      frequency: 'high',
    },
    {
      year: 'CSS / PMS',
      directive: 'Discuss',
      angle: 'Pakistan engagement with ASEAN and looking-east policy',
      frequency: 'medium',
    },
    {
      year: 'CSS pattern',
      directive: 'Evaluate',
      angle: 'Economic and diplomatic value of ASEAN for Pakistan',
      frequency: 'medium',
    },
  ],
  onePager: [
    'ASEAN: Association of Southeast Asian Nations. Founded 1967 (Bangkok Declaration). Purpose: regional peace, stability, and economic-social cooperation among Southeast Asian states.',
    'Membership framing (exam-safe): ASEAN is a Southeast Asian regional organisation. Standard teaching ends at ten members after gradual expansion from the founding core. Do not invent extra permanent members.',
    'Pakistan status: Pakistan is not an ASEAN member state. Engagement is taught as dialogue/partner and looking-east diplomacy, not as full membership.',
    'Why ASEAN matters for Pakistan: market access themes, connectivity to East and Southeast Asia, diplomatic diversification, and learning from regional economic integration models.',
    'ASEAN centrality language: ASEAN often presents itself as a hub for wider Asia-Pacific dialogue architectures. Cite as diplomatic setting, not as a Pakistan membership claim.',
    'Constraints: geography distance, competition with stronger regional players, and limited institutional depth of Pakistan-ASEAN ties compared with SAARC/SCO familiarity in Pakistani syllabi.',
    'Answer close: convert looking-east rhetoric into concrete trade, skills, and diplomatic diversification outcomes without claiming ASEAN membership.',
  ],
  answerSteps: [
    'Define ASEAN: full form, 1967 founding, Southeast Asia purpose.',
    'Clarify Pakistan is not a member; engagement is dialogue/partner style.',
    'Explain looking-east rationale: markets, connectivity, diversification.',
    'Add one constraint: distance, competition, or thin institutional follow-through.',
    'Close with deliverable diplomacy: trade, people-to-people, and regional forums.',
  ],
  questionVariants: [
    'Discuss the significance of ASEAN for Pakistan foreign policy.',
    'Evaluate Pakistan looking-east engagement with Southeast Asia.',
    'What is ASEAN? Explain its founding purpose and Pakistan status.',
    'Critically examine opportunities and limits of Pakistan-ASEAN ties.',
  ],
  citations: [
    {
      label: 'Full form and founding',
      text: 'ASEAN means Association of Southeast Asian Nations, founded in 1967 (Bangkok Declaration).',
    },
    {
      label: 'Purpose',
      text: 'ASEAN aims at regional peace, stability, and economic-social cooperation in Southeast Asia.',
    },
    {
      label: 'Pakistan status',
      text: 'Pakistan is not an ASEAN member; exam answers should use dialogue/partner and looking-east framing.',
    },
    {
      label: 'Looking east',
      text: 'Engagement themes include market access, connectivity, and diplomatic diversification toward East and Southeast Asia.',
    },
    {
      label: 'Membership caution',
      text: 'Teach ASEAN as a Southeast Asian organisation with gradual expansion to the standard ten-member frame; do not invent extra members.',
    },
  ],
  flashcards: [
    {
      prompt: 'What does ASEAN stand for?',
      answer: 'Association of Southeast Asian Nations',
    },
    {
      prompt: 'In which year was ASEAN founded?',
      answer: '1967',
    },
    {
      prompt: 'Which declaration is linked with ASEAN founding?',
      answer: 'Bangkok Declaration',
    },
    {
      prompt: 'Is Pakistan an ASEAN member?',
      answer: 'No',
    },
    {
      prompt: 'How should Pakistan-ASEAN status be framed?',
      answer: 'Dialogue/partner and looking-east engagement, not membership',
    },
    {
      prompt: 'Name two reasons ASEAN matters for Pakistan.',
      answer: 'Market access themes and diplomatic diversification',
    },
    {
      prompt: 'What is ASEAN centrality in exam language?',
      answer: 'ASEAN as a hub for wider Asia-Pacific dialogue architectures',
    },
    {
      prompt: 'Name one constraint on Pakistan-ASEAN ties.',
      answer: 'Geographic distance or thinner institutional follow-through than familiar regional forums',
    },
    {
      prompt: 'What trap fails MCQs?',
      answer: 'Calling Pakistan an ASEAN member',
    },
  ],
  mistakes: [
    {
      trap: 'Calling Pakistan an ASEAN member.',
      correct: 'Pakistan engages through looking-east / dialogue-partner framing, not membership.',
    },
    {
      trap: 'Confusing ASEAN with SAARC or SCO.',
      correct: 'ASEAN is Southeast Asian; SAARC is South Asian; SCO is Eurasian security-political organisation.',
    },
    {
      trap: 'Inventing fake summit hosts or permanent trade volumes.',
      correct: 'Use founding facts, purpose, and engagement themes.',
    },
    {
      trap: 'Writing only slogans without opportunity and constraint.',
      correct: 'Balance looking-east gains with distance and delivery limits.',
    },
    {
      trap: 'Forgetting 1967 / Bangkok Declaration.',
      correct: 'Founding year and declaration are high-yield MCQ facts.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Memorise ASEAN full form, 1967, Bangkok Declaration.' },
    { day: 'Day 2', task: 'Pakistan non-member vs dialogue/partner framing.' },
    { day: 'Day 3', task: 'Looking-east opportunities outline.' },
    { day: 'Day 4', task: 'Flashcards.' },
    { day: 'Day 5', task: 'Constraints paragraph.' },
    { day: 'Day 6', task: '10-minute discuss outline.' },
    { day: 'Day 7', task: 'Recite one-pager.' },
  ],
  sourcesLine:
    'Sources: standard current affairs and GK notes on ASEAN founding and purpose, plus Pakistan looking-east / dialogue-partner framing in FPSC-style teaching. Avoid invented membership claims.',
}
