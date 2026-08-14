import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked:
 * - Classic exam themes: sovereignty, peace, UN Charter, Muslim world solidarity, non-aggression, friendship with all / enmity with none style rhetoric
 * - Continuity from Quaid-era statements through later practice; change via Cold War, Afghanistan, nuclearisation, economic diplomacy
 * - Do not invent fake treaty lists or claim a single static doctrine document as the only source
 */
export const PAKISTAN_FOREIGN_POLICY_PRINCIPLES_KIT: NoteKitData = {
  id: 'pakistan-foreign-policy-principles',
  title: 'Principles of Pakistan Foreign Policy',
  subtitle:
    'Sovereignty, Muslim world, peaceful coexistence, UN and non-aggression themes for CSS answers, with continuity and change after independence.',
  syllabusTags: [
    'Pakistan foreign policy',
    'Current affairs',
    'International relations',
    'CSS Pakistan Affairs',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS pattern',
      directive: 'Discuss',
      angle: 'Guiding principles of Pakistan foreign policy',
      frequency: 'high',
    },
    {
      year: 'CSS / PMS',
      directive: 'Critically examine',
      angle: 'Continuity and change in Pakistan foreign policy since 1947',
      frequency: 'high',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'Sovereignty, UN, Muslim world solidarity themes',
      frequency: 'medium',
    },
    {
      year: 'CSS pattern',
      directive: 'Evaluate',
      angle: 'Peaceful coexistence and non-aggression in practice',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Exam frame: Pakistan foreign policy is taught as guided by durable principles, then tested against changing geopolitics.',
    'Sovereignty and territorial integrity: protect independence, borders, and decision-making autonomy as a core stated aim.',
    'Peaceful coexistence and friendship with all: classic Quaid-era and textbook language that Pakistan seeks good relations without seeking conflict for its own sake.',
    'Non-aggression and respect for international law: preference for peaceful settlement of disputes; UN Charter language is often cited in answers.',
    'United Nations and multilateralism: support for the UN system as a forum for legitimacy, peace, and development diplomacy.',
    'Muslim world solidarity: special affinity with Muslim states and organisations (OIC track) while still dealing with non-Muslim powers on interest grounds.',
    'Regional peace and neighbourhood: India, Afghanistan, Iran, China, and Gulf ties dominate practice; principles meet hard security and economic interests here.',
    'Continuity: sovereignty, Muslim identity diplomacy, UN loyalty, and peace rhetoric recur across eras.',
    'Change: alliance choices in the Cold War, Afghanistan wars, nuclear deterrence after 1998, economic diplomacy and connectivity (including China corridor politics), and shifting US/China/Gulf balances.',
    'Answer craft: list principles first, then show one continuity example and one change example, then a short critical line on gap between rhetoric and practice.',
  ],
  answerSteps: [
    'Define foreign policy briefly as goals and means in external relations.',
    'List 4 to 6 classic principles (sovereignty, peace, UN, Muslim world, non-aggression, peaceful coexistence).',
    'Add Quaid-era or textbook continuity language without mythological quotes you cannot verify.',
    'Show change with one clear era shift (Cold War alliances, Afghanistan, nuclear, economic diplomacy).',
    'Close with a balanced critique: principles guide narrative; interests and capability shape outcomes.',
  ],
  questionVariants: [
    'Discuss the guiding principles of Pakistan foreign policy.',
    'Critically examine continuity and change in Pakistan foreign policy since 1947.',
    'How far do peaceful coexistence and non-aggression explain Pakistan neighbourhood policy?',
    'Evaluate the role of the UN and the Muslim world in Pakistan foreign policy doctrine.',
  ],
  citations: [
    {
      label: 'Sovereignty theme',
      text: 'Protection of sovereignty and territorial integrity is a standard stated principle in Pakistan foreign policy teaching.',
    },
    {
      label: 'Peace and coexistence',
      text: 'Peaceful coexistence and desire for friendly relations appear repeatedly in official and textbook formulations.',
    },
    {
      label: 'UN and law',
      text: 'Support for the United Nations and peaceful dispute settlement under international law is a high-yield answer pillar.',
    },
    {
      label: 'Muslim world',
      text: 'Solidarity with Muslim countries and engagement through forums such as the OIC is a recurring doctrinal theme.',
    },
    {
      label: 'Continuity vs change',
      text: 'Principles show continuity; practice changes with Cold War alignments, Afghanistan, nuclear status, and economic connectivity priorities.',
    },
  ],
  flashcards: [
    {
      prompt: 'Name three classic principles of Pakistan foreign policy.',
      answer: 'Sovereignty; peaceful coexistence; UN / international law support (also Muslim world solidarity, non-aggression)',
    },
    {
      prompt: 'What does sovereignty mean in FP answers?',
      answer: 'Protect independence, borders, and autonomous decision-making',
    },
    {
      prompt: 'Why is the UN theme high-yield?',
      answer: 'Pakistan presents itself as committed to Charter-based peace and multilateral legitimacy',
    },
    {
      prompt: 'What is the Muslim world angle?',
      answer: 'Special solidarity with Muslim states and OIC-track diplomacy',
    },
    {
      prompt: 'Give one continuity point since 1947.',
      answer: 'Recurring stress on sovereignty, peace rhetoric, UN loyalty, Muslim affinity',
    },
    {
      prompt: 'Give one change point since 1947.',
      answer: 'Cold War alliances, Afghanistan wars, nuclear deterrence, economic/connectivity diplomacy',
    },
    {
      prompt: 'What is a safe critical line?',
      answer: 'Principles guide official narrative; strategic interests and capacity shape outcomes',
    },
    {
      prompt: 'Which neighbourhood files test principles in practice?',
      answer: 'India, Afghanistan, Iran, China, and Gulf relations',
    },
    {
      prompt: 'Non-aggression in exam language means what?',
      answer: 'Preference for peaceful dispute settlement and against aggressive war as a stated norm',
    },
    {
      prompt: 'How should an answer be structured?',
      answer: 'Principles list, continuity example, change example, short practice-vs-rhetoric critique',
    },
  ],
  mistakes: [
    {
      trap: 'Treating foreign policy principles as a single fixed statute that never shifts.',
      correct: 'They are durable themes. Practice adapts to eras and interests.',
    },
    {
      trap: 'Listing only Muslim world solidarity and ignoring sovereignty or UN themes.',
      correct: 'Exams expect a balanced set: sovereignty, peace, UN, Muslim world, non-aggression.',
    },
    {
      trap: 'Writing only slogans with no continuity/change analysis.',
      correct: 'Add at least one historical shift (alliances, Afghanistan, nuclear, economic diplomacy).',
    },
    {
      trap: 'Inventing exact quote dates or fake doctrine documents.',
      correct: 'Use verified themes and named eras. Avoid unsourced one-liners.',
    },
    {
      trap: 'Confusing principles kits with event kits (e.g. only post-9/11 chronology).',
      correct: 'This kit is doctrine and answer structure. Chronology kits support examples.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Memorise 5 to 6 guiding principles with one line each.' },
    { day: 'Day 2', task: 'Map each principle to a Pakistan neighbourhood example.' },
    { day: 'Day 3', task: 'Write continuity vs change in a 10-minute outline.' },
    { day: 'Day 4', task: 'Drill flashcards on UN and Muslim world angles.' },
    { day: 'Day 5', task: 'Attempt the critically examine variant.' },
    { day: 'Day 6', task: 'One-pager + citations. Link to OIC/SAARC/SCO facts.' },
    { day: 'Day 7', task: 'Recite principles and one change example from memory.' },
  ],
  sourcesLine:
    'Sources: standard Pakistan foreign policy textbooks and FPSC Pakistan Affairs / IR syllabus themes; Quaid-era peace and friendship formulations as commonly taught; UN Charter peace norms. Avoid unsourced WhatsApp doctrine lists.',
}
