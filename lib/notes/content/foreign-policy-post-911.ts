import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked careful markers:
 * - 11 September 2001 attacks in the United States
 * - Pakistan under President Pervez Musharraf aligns with US-led War on Terror / Afghan campaign against Al-Qaeda and Taliban regime in Afghanistan
 * - Long Afghan conflict next door: Taliban ousted 2001; protracted insurgency; NATO/ISAF presence; US drawdown debates later
 * - Costs often cited in exams: terrorism inside Pakistan, military and civilian losses, social polarisation, sovereignty debates over drones and border pressure
 * - Benefits often cited: renewed US engagement, economic and military assistance packages (do not invent exact dollar totals unless sourced), frontline-state diplomacy
 * - China partnership deepens as strategic and economic hedge; CPEC formally launched later (2013 onward) as a major China-Pakistan economic marker
 * Avoid invented casualty tables, fake treaty names, or partisan blame essays
 */
export const FOREIGN_POLICY_POST_911_KIT: NoteKitData = {
  id: 'foreign-policy-post-911',
  title: 'Foreign Policy of Pakistan after 9/11',
  subtitle:
    'US alliance after 2001, Afghan theatre costs, China partnership rise, and balanced exam writing.',
  syllabusTags: [
    'Foreign policy of Pakistan',
    'Pakistan and major powers',
    'War on Terror',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS pattern',
      directive: 'Discuss',
      angle: 'Pakistan’s foreign policy choices after 9/11',
      frequency: 'high',
    },
    {
      year: 'CSS / PMS',
      directive: 'Critically examine',
      angle: 'Costs and benefits of alignment with the US War on Terror',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Evaluate',
      angle: 'Balancing US ties with China partnership after 2001',
      frequency: 'medium',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: '9/11 date, Afghan Taliban ouster 2001, CPEC as later China marker',
      frequency: 'medium',
    },
  ],
  onePager: [
    '9/11 (11 September 2001) reset Pakistan’s foreign policy environment overnight: the US led a global campaign against Al-Qaeda and the Taliban regime in Afghanistan.',
    'Pakistan under Musharraf chose alignment with the US-led coalition, ending the previous formal tilt toward the Taliban government in Kabul.',
    'Afghanistan became the central theatre: border security, refugee and militant spillover, and long dependency on how war and peace next door evolved.',
    'Cited benefits in exam answers: restored US engagement, economic and security assistance, debt and trade diplomacy, and frontline-state international profile. Avoid invented exact aid figures.',
    'Cited costs: wave of terrorism inside Pakistan, human and economic losses, domestic polarisation, and sovereignty debates over drones, tribal areas operations, and US pressure.',
    'China partnership rose as a strategic and economic pillar. Later CPEC (from 2013) is the clearest public economic marker of deeper China-Pakistan connectivity, not the only China link.',
    'Balancing is the essay keyword: manage US security cooperation, China economic-strategic ties, Afghan stability needs, and relations with neighbours without one-line slogans.',
  ],
  answerSteps: [
    'Open with the shock of 9/11 and Pakistan’s geography next to Afghanistan.',
    'State the policy choice: alignment with the US-led War on Terror under Musharraf.',
    'Explain Afghanistan as the core external driver of costs and opportunities.',
    'Balance sheet: assistance and diplomatic space versus internal terrorism and sovereignty stress.',
    'Add China as the rising partner and hedge, with CPEC as a later major economic marker.',
    'Close with balancing as continuous strategy, not a one-day decision.',
  ],
  questionVariants: [
    'Discuss the main features of Pakistan’s foreign policy after 9/11.',
    'Critically examine the costs and benefits of Pakistan’s role in the War on Terror.',
    'Evaluate Pakistan’s efforts to balance relations with the United States and China after 2001.',
    'How did the Afghan conflict shape Pakistan’s security and foreign policy after 9/11? Discuss.',
  ],
  citations: [
    {
      label: 'Trigger event',
      text: '11 September 2001 terrorist attacks in the United States opened the War on Terror phase in Pakistan’s foreign policy.',
    },
    {
      label: 'Policy alignment',
      text: 'Pakistan under President Pervez Musharraf aligned with the US-led campaign against Al-Qaeda and the Taliban regime in Afghanistan.',
    },
    {
      label: 'Afghan theatre',
      text: 'Taliban regime was removed from Kabul in 2001. A long conflict and international military presence followed, with lasting effects on Pakistan’s border security.',
    },
    {
      label: 'Internal cost theme',
      text: 'Post-2001 Pakistan faced severe terrorism and militancy challenges linked to the Afghan war environment and domestic extremist networks.',
    },
    {
      label: 'China marker',
      text: 'China-Pakistan strategic partnership deepened in the post-9/11 decades. CPEC, launched in the 2010s (commonly dated from 2013), is a major economic cooperation marker.',
    },
  ],
  flashcards: [
    { prompt: 'Date of 9/11 attacks?', answer: '11 September 2001' },
    {
      prompt: 'Who led Pakistan at the start of post-9/11 alignment?',
      answer: 'Pervez Musharraf',
    },
    {
      prompt: 'Which Afghan regime fell in 2001?',
      answer: 'Taliban regime in Kabul',
    },
    {
      prompt: 'Name one often-cited benefit of US alignment.',
      answer: 'Renewed US engagement and assistance (avoid fake exact totals)',
    },
    {
      prompt: 'Name one often-cited internal cost.',
      answer: 'Terrorism and militancy inside Pakistan',
    },
    {
      prompt: 'Why is Afghanistan central to post-9/11 policy?',
      answer: 'Border security, spillover, and dependence on Afghan war outcomes',
    },
    {
      prompt: 'What later project marks deeper China economic ties?',
      answer: 'CPEC (from 2013 onward as the common exam marker)',
    },
    {
      prompt: 'What essay keyword should structure the conclusion?',
      answer: 'Balancing (US, China, Afghanistan, neighbourhood)',
    },
    {
      prompt: 'Sovereignty debate often linked to which tool?',
      answer: 'Drone strikes and related US counterterror pressure',
    },
    {
      prompt: 'What should you avoid inventing in this topic?',
      answer: 'Exact aid dollars, fake treaties, or unverified casualty tables',
    },
  ],
  mistakes: [
    {
      trap: 'Inventing precise US aid totals or secret deal clauses.',
      correct: 'Discuss assistance as a category. Use only figures you can source.',
    },
    {
      trap: 'Dating CPEC as immediate in 2001.',
      correct: 'China ties deepen after 2001. CPEC is a later 2010s economic marker (commonly 2013).',
    },
    {
      trap: 'Writing only benefits or only betrayal narrative.',
      correct: 'Use a costs and benefits balance sheet. Examiners expect both sides.',
    },
    {
      trap: 'Ignoring Afghanistan as the main theatre.',
      correct: 'Post-9/11 Pakistan policy is inseparable from the Afghan conflict next door.',
    },
    {
      trap: 'Partisan rant about one civilian government as the whole story.',
      correct: 'Start from 2001 state choice under Musharraf, then later continuity and adjustment.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Read 9/11 trigger and Musharraf alignment decision.' },
    { day: 'Day 2', task: 'Map Afghanistan as the core external driver.' },
    { day: 'Day 3', task: 'Draft costs vs benefits table (no fake numbers).' },
    { day: 'Day 4', task: 'Add China partnership and CPEC timing caution.' },
    { day: 'Day 5', task: 'Write critically examine costs and benefits essay outline.' },
    { day: 'Day 6', task: 'Drill flashcards and balancing conclusion line.' },
    { day: 'Day 7', task: 'One-pager only. Recite structure without ranting.' },
  ],
  sourcesLine:
    'Sources: standard Pakistan foreign policy surveys for the post-9/11 period; public timelines of the Afghan conflict after 2001; China-Pakistan economic corridor as a later partnership marker. Avoid unsourced aid tallies and conspiracy timelines.',
}
