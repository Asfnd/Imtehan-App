import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked:
 * - Bretton Woods 1944: IMF and World Bank (IBRD) designed; HQ Washington D.C.
 * - IMF: balance of payments / macroeconomic stability support; quotas and SDRs in advanced GK
 * - World Bank Group: development finance; IBRD and IDA are the classic pair in teaching
 * - WTO (1995) succeeded GATT (1947); HQ Geneva; aims at rules-based trade liberalisation
 * - Rounds: GATT Uruguay Round led to WTO; Doha Development Agenda is the long-running WTO round label (often stalled in teaching)
 * - Deeper than the general UN organisations kit; still avoid inventing fake current membership fees
 */
export const WORLD_ORGANIZATIONS_IMF_WB_WTO_KIT: NoteKitData = {
  id: 'world-organizations-imf-wb-wto',
  title: 'IMF, World Bank and WTO (Bretton Woods to Trade Rounds)',
  subtitle:
    'Deeper Bretton Woods and WTO rounds kit: IMF vs Bank vs WTO roles, HQs, and exam-safe round concepts.',
  syllabusTags: [
    'International organizations',
    'IMF',
    'World Bank',
    'WTO',
    'Bretton Woods',
    'General knowledge',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'Bretton Woods institutions and HQs',
      frequency: 'high',
    },
    {
      year: 'PPSC / NTS',
      directive: 'MCQ fact',
      angle: 'IMF vs World Bank purpose',
      frequency: 'high',
    },
    {
      year: 'CSS MPT',
      directive: 'MCQ fact',
      angle: 'GATT to WTO; Uruguay Round; Geneva HQ',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Discuss',
      angle: 'Role of IMF/World Bank programmes in developing economies',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Bretton Woods Conference (1944, New Hampshire, USA) designed the post-war monetary order. Twin institutions: IMF and the World Bank (IBRD).',
    'Both Bretton Woods twins are headquartered in Washington, D.C. Do not place them in New York (that is the UN HQ trap).',
    'IMF: short-to-medium term support for balance of payments and macroeconomic stability; surveillance and policy programmes. Quota subscriptions underpin voting weight in classic teaching.',
    'World Bank: long-term development finance and poverty reduction projects. IBRD (middle-income lending) and IDA (concessional finance for poorer countries) are the high-yield Bank labels.',
    'SDR (Special Drawing Right): IMF reserve asset / unit of account concept for advanced MCQs; do not invent current SDR basket weights unless revising from a sourced note.',
    'GATT 1947: General Agreement on Tariffs and Trade. Multilateral trade rounds cut tariffs. Uruguay Round (1986-1994) created the WTO.',
    'WTO from 1995: rules-based multilateral trading system. HQ Geneva, Switzerland. Covers goods, services (GATS), and intellectual property (TRIPS) at name level.',
    'Doha Development Agenda (launched 2001): WTO round framed around development concerns; widely taught as incomplete/stalled. Prefer that careful line over fake final outcomes.',
  ],
  answerSteps: [
    'Open with Bretton Woods 1944 and the twin institutions.',
    'Differentiate IMF (BOP/macro) from World Bank (development finance / IBRD-IDA).',
    'State both HQs as Washington, D.C., and WTO HQ as Geneva.',
    'Trace GATT 1947 to Uruguay Round to WTO 1995.',
    'Add one round concept (Uruguay success vs Doha difficulties).',
    'Close with Pakistan-relevant hook if asked: programme conditionality, trade rules, or export competitiveness.',
  ],
  questionVariants: [
    'Differentiate the roles of the IMF and the World Bank.',
    'What was decided at Bretton Woods? Name the institutions that followed.',
    'Trace the evolution from GATT to the WTO with reference to trade rounds.',
    'Discuss why the Doha Round has been difficult to conclude.',
  ],
  citations: [
    {
      label: 'Bretton Woods',
      text: '1944 conference that designed the IMF and the World Bank (IBRD).',
    },
    {
      label: 'HQs',
      text: 'IMF and World Bank: Washington, D.C. WTO: Geneva, Switzerland.',
    },
    {
      label: 'IMF vs Bank',
      text: 'IMF focuses on macroeconomic and BOP stability. World Bank focuses on long-term development finance.',
    },
    {
      label: 'WTO origin',
      text: 'WTO established 1995 following the Uruguay Round of GATT negotiations.',
    },
    {
      label: 'Doha',
      text: 'Doha Development Agenda launched in 2001; commonly taught as unfinished/stalled.',
    },
  ],
  flashcards: [
    { prompt: 'When and where was Bretton Woods?', answer: '1944, Bretton Woods, New Hampshire, USA' },
    { prompt: 'Which twins came from Bretton Woods?', answer: 'IMF and World Bank (IBRD)' },
    { prompt: 'IMF and World Bank HQ?', answer: 'Washington, D.C.' },
    { prompt: 'WTO HQ?', answer: 'Geneva, Switzerland' },
    { prompt: 'IMF main focus?', answer: 'Balance of payments and macroeconomic stability' },
    { prompt: 'World Bank main focus?', answer: 'Long-term development finance and poverty reduction' },
    { prompt: 'GATT started in which year?', answer: '1947' },
    { prompt: 'Which round created the WTO?', answer: 'Uruguay Round (WTO from 1995)' },
    { prompt: 'When was the Doha Round launched?', answer: '2001' },
    { prompt: 'IDA in one line?', answer: 'World Bank’s concessional window for poorer countries' },
  ],
  mistakes: [
    {
      trap: 'Placing IMF HQ in New York.',
      correct: 'IMF and World Bank are in Washington, D.C. UN HQ is New York.',
    },
    {
      trap: 'Saying WTO was founded at Bretton Woods in 1944.',
      correct: 'Bretton Woods created IMF/Bank. WTO came in 1995 after GATT’s Uruguay Round.',
    },
    {
      trap: 'Treating IMF and World Bank as identical.',
      correct: 'IMF: macro/BOP. Bank: development projects and long-term lending.',
    },
    {
      trap: 'Claiming the Doha Round fully concluded with a single big deal.',
      correct: 'Doha is widely taught as incomplete/stalled; use careful wording.',
    },
    {
      trap: 'Confusing IBRD with IMF.',
      correct: 'IBRD is the original World Bank lending arm. IMF is the Fund.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Bretton Woods 1944 + twin HQs.' },
    { day: 'Day 2', task: 'IMF vs World Bank vs IDA/IBRD labels.' },
    { day: 'Day 3', task: 'GATT 1947, Uruguay Round, WTO 1995, Geneva.' },
    { day: 'Day 4', task: 'Doha 2001 careful narrative.' },
    { day: 'Day 5', task: 'Write IMF programme impact outline (concept-level).' },
    { day: 'Day 6', task: 'Drill flashcards and HQ traps.' },
    { day: 'Day 7', task: 'One-pager only.' },
  ],
  sourcesLine:
    'Sources: Bretton Woods history; IMF/World Bank institutional primers; GATT/WTO round summaries (Uruguay, Doha). Deeper companion to the general UN organisations notes kit.',
}
