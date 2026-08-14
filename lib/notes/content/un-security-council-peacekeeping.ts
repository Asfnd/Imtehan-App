import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked:
 * - UN Security Council: primary responsibility for international peace and security
 * - 15 members: 5 permanent (P5: China, France, Russia, UK, USA) + 10 non-permanent elected for 2-year terms
 * - P5 veto on substantive matters (classic teaching)
 * - Pakistan is a major historical troop contributor to UN peacekeeping (name-level; avoid inventing exact current ranking numbers unless sourced)
 * - Peacekeeping authorised by UNSC; operations are distinct from Chapter VII enforcement in exam nuance
 */
export const UN_SECURITY_COUNCIL_PEACEKEEPING_KIT: NoteKitData = {
  id: 'un-security-council-peacekeeping',
  title: 'UN Security Council and Peacekeeping',
  subtitle:
    'UNSC structure, P5 veto, and Pakistan peacekeeping contributions at name level for GK and current affairs.',
  syllabusTags: [
    'United Nations',
    'Security Council',
    'Peacekeeping',
    'General knowledge',
    'Current affairs',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'UNSC size, P5 members, veto',
      frequency: 'high',
    },
    {
      year: 'PPSC / NTS',
      directive: 'MCQ fact',
      angle: 'Non-permanent members term length',
      frequency: 'high',
    },
    {
      year: 'CSS MPT',
      directive: 'MCQ fact',
      angle: 'Pakistan and UN peacekeeping',
      frequency: 'medium',
    },
    {
      year: 'CSS pattern',
      directive: 'Discuss',
      angle: 'Role of UNSC in international peace and security',
      frequency: 'medium',
    },
  ],
  onePager: [
    'UN Security Council: principal organ with primary responsibility for international peace and security under the UN Charter.',
    'Composition: 15 members. Permanent five (P5): China, France, Russia, United Kingdom, United States. Ten non-permanent members elected for two-year terms.',
    'Veto: each P5 member can block substantive Council decisions (classic exam fact). Procedural votes are taught as not subject to the same veto practice.',
    'Powers (name-level): investigate disputes, recommend settlement, impose sanctions, authorise use of force, and establish peacekeeping operations when mandated.',
    'UN peacekeeping: deployed with host consent, impartiality, and non-use of force except in self-defence/mandate defence (classic principles). Mandates come from the Security Council.',
    'Pakistan contribution (name-level): long-standing major troop and police contributor to UN missions across Africa, the Middle East, and elsewhere. Pakistani personnel have served in numerous named missions over decades.',
    'Exam use: do not invent a live global ranking number unless you cite a UN yearbook/DPKO snapshot. Safe line: Pakistan is among the historically significant contributors.',
    'Reform debate hook: calls for UNSC expansion and veto restraint appear in current affairs; keep it conceptual unless the question demands detail.',
  ],
  answerSteps: [
    'State UNSC’s primary responsibility for peace and security.',
    'Give structure: 15 members, P5 list, 10 non-permanent for 2 years.',
    'Explain veto on substantive matters.',
    'Describe peacekeeping principles and UNSC mandate link.',
    'Add Pakistan’s contribution at name level without fake rankings.',
    'Close with one reform or effectiveness point if the directive is discuss/evaluate.',
  ],
  questionVariants: [
    'Explain the composition and powers of the UN Security Council.',
    'What is the veto power in the UNSC? Name the permanent members.',
    'Discuss Pakistan’s contribution to UN peacekeeping operations.',
    'Critically examine the effectiveness of the UN Security Council in maintaining peace.',
  ],
  citations: [
    {
      label: 'Size',
      text: 'UN Security Council has 15 members: 5 permanent and 10 non-permanent.',
    },
    {
      label: 'P5',
      text: 'China, France, Russia, United Kingdom, United States.',
    },
    {
      label: 'Non-permanent term',
      text: 'Non-permanent members are elected for two-year terms.',
    },
    {
      label: 'Veto',
      text: 'Permanent members hold veto power on substantive Council decisions (classic teaching).',
    },
    {
      label: 'Pakistan',
      text: 'Pakistan has been a major historical contributor of troops and police to UN peacekeeping missions.',
    },
  ],
  flashcards: [
    { prompt: 'How many members does the UNSC have?', answer: '15' },
    { prompt: 'Name the P5.', answer: 'China, France, Russia, UK, USA' },
    { prompt: 'How long is a non-permanent seat?', answer: 'Two years' },
    { prompt: 'What is the P5 veto?', answer: 'Power to block substantive Security Council decisions' },
    { prompt: 'Who authorises UN peacekeeping mandates?', answer: 'UN Security Council' },
    { prompt: 'Name one classic peacekeeping principle.', answer: 'Consent of parties / impartiality / non-use of force except in self-defence or mandate defence' },
    { prompt: 'Pakistan’s peacekeeping role in one line?', answer: 'Major historical troop and police contributor to UN missions' },
    { prompt: 'Primary UNSC responsibility?', answer: 'International peace and security' },
  ],
  mistakes: [
    {
      trap: 'Saying the General Assembly has the veto.',
      correct: 'Veto belongs to UNSC permanent members on substantive Council decisions.',
    },
    {
      trap: 'Listing Germany or Japan as P5.',
      correct: 'P5 are China, France, Russia, UK, USA. Others may seek reform seats.',
    },
    {
      trap: 'Claiming non-permanent members serve five years.',
      correct: 'Non-permanent term is two years.',
    },
    {
      trap: 'Inventing Pakistan’s exact current UN troop ranking.',
      correct: 'Say major historical contributor unless you cite a specific UN snapshot year.',
    },
    {
      trap: 'Confusing ICJ with UNSC.',
      correct: 'ICJ is the World Court (The Hague). UNSC is the political security organ.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Memorise 15 members, P5 list, 2-year term.' },
    { day: 'Day 2', task: 'Learn veto and substantive vs procedural idea.' },
    { day: 'Day 3', task: 'Peacekeeping principles and UNSC mandate link.' },
    { day: 'Day 4', task: 'Pakistan contribution talking points (no fake ranks).' },
    { day: 'Day 5', task: 'Write a short UNSC effectiveness outline.' },
    { day: 'Day 6', task: 'Drill flashcards.' },
    { day: 'Day 7', task: 'One-pager only.' },
  ],
  sourcesLine:
    'Sources: UN Charter teaching on Security Council; standard GK texts on P5 and veto; UN peacekeeping principles; Pakistan peacekeeping contribution histories. Cite UN data when using rankings.',
}
