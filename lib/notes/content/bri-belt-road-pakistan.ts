import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked:
 * - BRI: Belt and Road Initiative (China); umbrella for overland Belt and Maritime Silk Road themes
 * - CPEC: China-Pakistan Economic Corridor is Pakistan flagship bilateral corridor often placed under the BRI frame
 * - Exam need: BRI as wider Eurasia/Africa connectivity vision; CPEC as Pakistan-specific implementation track
 * - Themes: infrastructure, energy, industrial cooperation, ports/logistics, debt and governance caution
 * Avoid inventing exact BRI country counts or permanent project cost totals as syllabus facts
 */
export const BRI_BELT_ROAD_PAKISTAN_KIT: NoteKitData = {
  id: 'bri-belt-road-pakistan',
  title: 'Belt and Road Initiative (BRI) and Pakistan',
  subtitle:
    'BRI as the wider China connectivity frame, with CPEC as Pakistan corridor, for CSS and PMS answers beyond CPEC-only notes.',
  syllabusTags: [
    'Belt and Road Initiative',
    'CPEC',
    'China foreign policy',
    'Current affairs',
    'Connectivity',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS / PMS',
      directive: 'Discuss',
      angle: 'Belt and Road Initiative and its significance for Pakistan',
      frequency: 'high',
    },
    {
      year: 'CSS Current Affairs',
      directive: 'Evaluate',
      angle: 'BRI opportunities and risks for Pakistan beyond CPEC slogans',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Critically examine',
      angle: 'How CPEC sits inside the BRI frame',
      frequency: 'high',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'BRI meaning; CPEC as Pakistan corridor theme',
      frequency: 'medium',
    },
  ],
  onePager: [
    'BRI (Belt and Road Initiative) is China connectivity and cooperation vision linking overland Belt corridors and Maritime Silk Road themes across Eurasia and beyond.',
    'For Pakistan, CPEC (China-Pakistan Economic Corridor) is the high-yield bilateral corridor often presented as Pakistan main BRI-related track: energy, infrastructure, Gwadar/port logistics, and industrial cooperation themes.',
    'Exam discipline: BRI is the umbrella frame; CPEC is the Pakistan-specific implementation story. Do not write as if BRI equals only CPEC, or as if CPEC automatically covers all BRI geography.',
    'Opportunity pillars: infrastructure gap-filling, energy projects, logistics and ports, industrial parks or SEZ language, and deeper China partnership signalling.',
    'Risk and caution pillars (balanced answers): debt sustainability debates, project selection and transparency, local employment and security costs, and the need for Pakistani reform capacity to absorb investment.',
    'Wider BRI angles useful beyond CPEC: Pakistan place in China Eurasia diplomacy, maritime connectivity narratives, and third-country cooperation language (cite as themes).',
    'Multilateral overlap: SCO and Central Asia connectivity essays can mention BRI as a parallel China-led connectivity story without merging institutions.',
    'Answer close: treat BRI as strategic opportunity that still requires governance, fiscal prudence, and export-oriented industrial delivery inside Pakistan.',
  ],
  answerSteps: [
    'Define BRI in one sentence (Belt + Maritime Silk Road themes).',
    'Place CPEC as Pakistan flagship corridor inside that frame.',
    'List opportunity pillars (energy, infrastructure, logistics, industry).',
    'Add balanced risks (debt, transparency, absorption capacity).',
    'Give one beyond-CPEC BRI angle (Eurasia/maritime diplomacy).',
    'Conclude with governance and export delivery as success conditions.',
  ],
  questionVariants: [
    'Discuss the Belt and Road Initiative and its relevance for Pakistan.',
    'How does CPEC fit within the BRI framework? Critically examine.',
    'Evaluate opportunities and risks of BRI-linked projects for Pakistan.',
    'Write short notes on BRI beyond CPEC for Pakistani foreign policy.',
  ],
  citations: [
    {
      label: 'BRI definition',
      text: 'Belt and Road Initiative is China connectivity vision covering overland Belt and Maritime Silk Road cooperation themes.',
    },
    {
      label: 'CPEC placement',
      text: 'CPEC is Pakistan flagship bilateral corridor commonly framed as the main BRI-related track for Pakistan.',
    },
    {
      label: 'Opportunity themes',
      text: 'Energy, infrastructure, ports/logistics, and industrial cooperation are standard opportunity pillars in teaching.',
    },
    {
      label: 'Risk themes',
      text: 'Balanced answers include debt sustainability, transparency, and absorption or governance capacity cautions.',
    },
    {
      label: 'Beyond CPEC',
      text: 'BRI essays should distinguish the global/regional frame from the Pakistan-specific CPEC implementation story.',
    },
  ],
  flashcards: [
    {
      prompt: 'What does BRI stand for?',
      answer: 'Belt and Road Initiative',
    },
    {
      prompt: 'What two classic BRI geographic themes appear in notes?',
      answer: 'Overland Belt corridors and Maritime Silk Road themes',
    },
    {
      prompt: 'What is CPEC in BRI framing?',
      answer: 'Pakistan flagship bilateral corridor under the wider BRI-related frame',
    },
    {
      prompt: 'Name three CPEC/BRI opportunity pillars for Pakistan.',
      answer: 'Energy, infrastructure, and ports or logistics (plus industry/SEZ language)',
    },
    {
      prompt: 'Name two risk lines for a balanced answer.',
      answer: 'Debt sustainability debates and transparency or project-selection concerns',
    },
    {
      prompt: 'Should BRI be equated only with CPEC?',
      answer: 'No; BRI is wider; CPEC is Pakistan main track',
    },
    {
      prompt: 'Should SCO be merged into BRI as one institution?',
      answer: 'No; related connectivity stories, different institutions',
    },
    {
      prompt: 'What success condition closes strong answers?',
      answer: 'Governance, fiscal prudence, and export-oriented industrial delivery',
    },
    {
      prompt: 'Why avoid memorising permanent BRI country counts?',
      answer: 'Participation lists and branding evolve; exams reward concepts and Pakistan angles',
    },
    {
      prompt: 'Name one beyond-CPEC BRI angle.',
      answer: 'Pakistan place in China Eurasia or maritime connectivity diplomacy',
    },
  ],
  mistakes: [
    {
      trap: 'Writing BRI and CPEC as identical terms.',
      correct: 'BRI is the wider initiative; CPEC is Pakistan corridor track.',
    },
    {
      trap: 'Listing only benefits with zero risk language.',
      correct: 'Add debt, transparency, and absorption-capacity caution.',
    },
    {
      trap: 'Inventing exact permanent project cost totals.',
      correct: 'Use themes unless citing a dated official figure carefully.',
    },
    {
      trap: 'Claiming BRI automatically solves Pakistan fiscal crisis.',
      correct: 'Connectivity helps only with governance and productive use of capital.',
    },
    {
      trap: 'Ignoring industrial and export delivery.',
      correct: 'Infrastructure without competitiveness is incomplete.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'BRI definition vs CPEC placement.' },
    { day: 'Day 2', task: 'Opportunity pillars outline.' },
    { day: 'Day 3', task: 'Risk and governance caution paragraph.' },
    { day: 'Day 4', task: 'Beyond-CPEC Eurasia/maritime angle.' },
    { day: 'Day 5', task: 'Flashcards.' },
    { day: 'Day 6', task: '10-minute critically examine outline.' },
    { day: 'Day 7', task: 'Recite one-pager.' },
  ],
  sourcesLine:
    'Sources: standard current affairs and Pakistan Affairs teaching on BRI and CPEC framing; connectivity and debt-governance primers. Avoid invented country counts and permanent cost totals.',
}
