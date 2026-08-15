import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (exam-level food security teaching):
 * - FAO-style dimensions often taught: availability, access, utilization, stability
 * - Pakistan: wheat/staple self-sufficiency themes, irrigation/Indus dependence, climate shocks, storage and prices
 * Avoid inventing exact tonnage or famine claims without verification
 */
export const FOOD_SECURITY_PAKISTAN_KIT: NoteKitData = {
  id: 'food-security-pakistan',
  title: 'Food Security in Pakistan',
  subtitle:
    'Availability, access, utilization, and stability applied to Pakistan agriculture, prices, and climate risks.',
  syllabusTags: [
    'Food security',
    'Agriculture',
    'Current affairs',
    'Pakistan Affairs',
    'Climate and development',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS / PMS',
      directive: 'Discuss',
      angle: 'Food security challenges in Pakistan',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Evaluate',
      angle: 'Agriculture productivity and nutrition outcomes',
      frequency: 'medium',
    },
    {
      year: 'CSS Current Affairs',
      directive: 'Critically examine',
      angle: 'Climate shocks, floods, and food prices',
      frequency: 'high',
    },
    {
      year: 'One-paper',
      directive: 'MCQ / short',
      angle: 'Four pillars of food security',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Food security means people have reliable access to sufficient, safe, and nutritious food for an active healthy life. Exams score the four-pillar frame more than slogans.',
    'Four dimensions (FAO teaching set): availability (production, stocks, imports); access (income, prices, markets); utilization (nutrition, water, sanitation, food safety); stability (continuity over time despite shocks).',
    'Pakistan availability themes: irrigated agriculture on the Indus system; wheat as a staple policy crop; sugarcane, rice, and other crops in regional patterns. Production gains can still leave households insecure if access fails.',
    'Access themes: poverty, inflation of food prices, rural market distance, and shock-driven income loss. Cash transfers (BISP/Ehsaas themes) can support access during stress.',
    'Utilization themes: diet quality, micronutrients, child nutrition, clean water, and hygiene. Calories alone are not nutrition security.',
    'Stability themes: floods, drought, heat, pests, global price spikes, and storage/logistics gaps. 2022-type flood teaching is a reminder that climate can wipe out seasonal availability and incomes together.',
    'Policy toolkit (concept level): productivity and water efficiency; storage and cold chain; price monitoring; targeted support to poor consumers; climate-smart practices; reduce post-harvest loss.',
    'Answer close: raise productivity sustainably; protect access for the poor; improve nutrition and water; build shock resilience in storage and social protection.',
  ],
  answerSteps: [
    'Define food security and list the four dimensions.',
    'Apply availability to Pakistan crops and irrigation.',
    'Explain access via poverty, prices, and markets.',
    'Add utilization (nutrition, WASH) and stability (climate shocks).',
    'Offer a balanced policy toolkit.',
    'Conclude with resilience and poor-household access.',
  ],
  questionVariants: [
    'Discuss food security challenges in Pakistan using the four pillars.',
    'Evaluate the impact of climate shocks on food security.',
    'How do poverty and food inflation affect access to food?',
    'Critically examine policies to improve nutrition security, not only cereal output.',
  ],
  citations: [
    {
      label: 'Definition frame',
      text: 'Sufficient, safe, nutritious food with reliable access over time.',
    },
    {
      label: 'Four pillars',
      text: 'Availability, access, utilization, stability (FAO teaching set).',
    },
    {
      label: 'Pakistan',
      text: 'Indus irrigation, staple crops, price and poverty access issues, climate shocks.',
    },
    {
      label: 'Policy',
      text: 'Productivity, storage, targeted support, climate resilience, nutrition.',
    },
  ],
  flashcards: [
    {
      prompt: 'Name the four food security dimensions.',
      answer: 'Availability, access, utilization, stability',
    },
    {
      prompt: 'What does availability cover?',
      answer: 'Production, stocks, and imports',
    },
    {
      prompt: 'What does access cover?',
      answer: 'Income, prices, and market reach',
    },
    {
      prompt: 'What does utilization cover?',
      answer: 'Nutrition, food safety, water and sanitation',
    },
    {
      prompt: 'What does stability cover?',
      answer: 'Continuity despite shocks over time',
    },
    {
      prompt: 'Why can high wheat output still leave hunger?',
      answer: 'Access and utilization can fail even if availability looks fine',
    },
    {
      prompt: 'Name a major Pakistan production backbone theme.',
      answer: 'Irrigated agriculture on the Indus system',
    },
    {
      prompt: 'Name a stability threat for Pakistan.',
      answer: 'Floods, drought, heat, or global price spikes',
    },
    {
      prompt: 'Name one access-support tool in social protection notes.',
      answer: 'Targeted cash transfers during stress',
    },
    {
      prompt: 'Calories vs nutrition?',
      answer: 'Enough calories is not automatically micronutrient security',
    },
  ],
  mistakes: [
    {
      trap: 'Equating food security with wheat production only.',
      correct: 'Use all four pillars, including access and nutrition.',
    },
    {
      trap: 'Inventing tonnage or import figures.',
      correct: 'Stay conceptual unless a figure is verified.',
    },
    {
      trap: 'Ignoring climate and price shocks.',
      correct: 'Stability is a required pillar in good answers.',
    },
    {
      trap: 'Forgetting utilization and child nutrition.',
      correct: 'Nutrition and WASH belong in utilization.',
    },
    {
      trap: 'Policy list without poor-household access.',
      correct: 'Productivity plus targeted consumer protection.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Memorise four pillars.' },
    { day: 'Day 2', task: 'Pakistan availability and Indus link.' },
    { day: 'Day 3', task: 'Access, prices, poverty paragraph.' },
    { day: 'Day 4', task: 'Flashcards.' },
    { day: 'Day 5', task: 'Climate stability + policy toolkit.' },
    { day: 'Day 6', task: '10-minute discuss outline.' },
    { day: 'Day 7', task: 'Recite one-pager.' },
  ],
  sourcesLine:
    'Sources: FAO food security pillar teaching and Pakistan agriculture/current affairs notes on staples, prices, and climate shocks. Avoid unverified production totals.',
}
