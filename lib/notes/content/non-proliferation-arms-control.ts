import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (public exam-level name facts only):
 * - NPT: Nuclear Non-Proliferation Treaty; cornerstone non-proliferation regime; Pakistan not a party
 * - CTBT: Comprehensive Nuclear-Test-Ban Treaty; Pakistan has not ratified (teaching: linked to India/regional reciprocity themes)
 * - FMCT: Fissile Material Cut-off Treaty (proposed/negotiated in CD context); Pakistan stance taught as conditional/concerned about existing stockpiles asymmetry
 * No classified yields, facilities, or operational secrets; careful balanced Pakistan framing
 */
export const NON_PROLIFERATION_ARMS_CONTROL_KIT: NoteKitData = {
  id: 'non-proliferation-arms-control',
  title: 'Non-Proliferation and Arms Control (NPT, CTBT, FMCT)',
  subtitle:
    'Name-level treaty vocabulary and carefully framed Pakistan positions for CSS current affairs and foreign policy.',
  syllabusTags: [
    'Non-proliferation',
    'Arms control',
    'NPT CTBT FMCT',
    'Current affairs',
    'Foreign policy',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS / PMS',
      directive: 'Discuss',
      angle: 'Nuclear non-proliferation regime and South Asia',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Critically examine',
      angle: 'Pakistan position on NPT, CTBT, or FMCT',
      frequency: 'high',
    },
    {
      year: 'One-paper / MPT',
      directive: 'MCQ fact',
      angle: 'Expand NPT, CTBT, FMCT names',
      frequency: 'high',
    },
    {
      year: 'CSS Current Affairs',
      directive: 'Evaluate',
      angle: 'Arms control and strategic stability',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Non-proliferation aims to prevent spread of nuclear weapons. Arms control aims to limit, reduce, or regulate weapons and related materials through treaties and talks. Exams reward correct names and sober Pakistan framing.',
    'NPT (Nuclear Non-Proliferation Treaty): cornerstone global treaty. Common teaching pillars: non-proliferation, disarmament aspiration, and peaceful nuclear energy under safeguards. Pakistan is not a party to the NPT.',
    'Why NPT matters in South Asia answers: India and Pakistan are both outside the NPT as non-parties in standard teaching. Do not invent secret accession deals.',
    'CTBT (Comprehensive Nuclear-Test-Ban Treaty): seeks to ban all nuclear explosions. Entry into force depends on listed states; treat ratification politics carefully. Pakistan teaching often links CTBT decisions to regional reciprocity and India-related conditions rather than unilateral moralising.',
    'FMCT (Fissile Material Cut-off Treaty): proposed treaty concept, long discussed in the Conference on Disarmament (CD), aimed at cutting off production of fissile material for nuclear weapons. Exact text status is negotiation politics; exams want the name and purpose.',
    'Pakistan FMCT teaching (careful): concerns about asymmetry of existing stockpiles and the need for a treaty that addresses existing stocks and strategic balance themes, not only future production. Phrase as policy concern, not as technical inventory.',
    'Related vocabulary: IAEA safeguards (peaceful uses), export controls, strategic stability, credible minimum deterrence (doctrine teaching, not technical detail), Conference on Disarmament.',
    'Answer discipline: expand acronyms first; separate global regime from South Asian security dilemma; avoid classified numbers; close with stability and responsible stewardship language.',
  ],
  answerSteps: [
    'Define non-proliferation vs arms control in one clean pair of sentences.',
    'Expand NPT and state Pakistan non-party status.',
    'Expand CTBT and note reciprocity/regional framing carefully.',
    'Expand FMCT purpose and Pakistan stockpile-asymmetry concern at concept level.',
    'Link to strategic stability without inventing inventories.',
    'Conclude with dialogue, responsibility, and balance language.',
  ],
  questionVariants: [
    'Discuss the Nuclear Non-Proliferation Treaty and Pakistan position.',
    'Critically examine CTBT politics for South Asia.',
    'What is FMCT and why does it appear in Pakistan foreign-policy notes?',
    'Evaluate non-proliferation and arms control as tools of strategic stability.',
  ],
  citations: [
    {
      label: 'NPT',
      text: 'Nuclear Non-Proliferation Treaty; Pakistan is not a party.',
    },
    {
      label: 'CTBT',
      text: 'Comprehensive Nuclear-Test-Ban Treaty; ban on nuclear explosions as the name-level purpose.',
    },
    {
      label: 'FMCT',
      text: 'Fissile Material Cut-off Treaty concept discussed in CD; aims at fissile material for weapons.',
    },
    {
      label: 'Pakistan framing',
      text: 'NPT non-party; CTBT often linked to regional reciprocity teaching; FMCT concerns include existing stockpile asymmetry themes.',
    },
  ],
  flashcards: [
    {
      prompt: 'Expand NPT.',
      answer: 'Nuclear Non-Proliferation Treaty',
    },
    {
      prompt: 'Is Pakistan a party to the NPT?',
      answer: 'No; non-party status in standard teaching',
    },
    {
      prompt: 'Expand CTBT.',
      answer: 'Comprehensive Nuclear-Test-Ban Treaty',
    },
    {
      prompt: 'What does CTBT aim to ban?',
      answer: 'Nuclear explosions / nuclear tests (name-level purpose)',
    },
    {
      prompt: 'Expand FMCT.',
      answer: 'Fissile Material Cut-off Treaty',
    },
    {
      prompt: 'Where is FMCT often discussed institutionally?',
      answer: 'Conference on Disarmament (CD) context',
    },
    {
      prompt: 'What Pakistan FMCT concern is taught carefully?',
      answer: 'Existing stockpile asymmetry / balance themes, not only future cut-off',
    },
    {
      prompt: 'Non-proliferation vs arms control in one line?',
      answer: 'Stop spread vs limit/regulate weapons and related materials',
    },
    {
      prompt: 'Should warhead counts be invented?',
      answer: 'No; keep to names, status, and policy themes',
    },
    {
      prompt: 'What closing vocabulary scores?',
      answer: 'Strategic stability and responsible stewardship',
    },
  ],
  mistakes: [
    {
      trap: 'Confusing NPT, CTBT, and FMCT expansions.',
      correct: 'Memorise the three full names before writing analysis.',
    },
    {
      trap: 'Claiming Pakistan is an NPT member.',
      correct: 'Pakistan is not a party to the NPT.',
    },
    {
      trap: 'Writing classified yields or facility lists.',
      correct: 'Stay at name-level regime and public policy themes.',
    },
    {
      trap: 'Moralising CTBT without regional reciprocity context.',
      correct: 'Use careful reciprocity and balance language taught in notes.',
    },
    {
      trap: 'Treating FMCT as a finished ratified Pakistani treaty.',
      correct: 'Describe it as a proposed/negotiated cut-off concept with contested issues.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Expand NPT CTBT FMCT from memory.' },
    { day: 'Day 2', task: 'NPT pillars + Pakistan non-party fact.' },
    { day: 'Day 3', task: 'CTBT and FMCT careful Pakistan framing.' },
    { day: 'Day 4', task: 'Flashcards.' },
    { day: 'Day 5', task: 'Strategic stability paragraph without numbers.' },
    { day: 'Day 6', task: '10-minute critical examine outline.' },
    { day: 'Day 7', task: 'Recite one-pager.' },
  ],
  sourcesLine:
    'Sources: public non-proliferation primers, CSS foreign-policy notes on NPT/CTBT/FMCT, and Conference on Disarmament teaching. No classified inventories or sensational claims.',
}
