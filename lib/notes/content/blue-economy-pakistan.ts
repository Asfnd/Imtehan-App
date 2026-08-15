import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (maritime economy; careful on Gwadar/ports):
 * - Blue economy: sustainable use of ocean resources for growth, jobs, and ocean health (UN/World Bank teaching language)
 * - Pakistan Arabian Sea coast; major commercial ports include Karachi Port and Port Qasim; Gwadar as strategic deep-water node under CPEC teaching
 * - Sectors: shipping/ports, fisheries and aquaculture, shipbuilding/repair themes, coastal tourism, marine minerals carefully, offshore energy potential themes
 * - EEZ and maritime jurisdiction concepts appear in geography and current affairs; avoid inventing exact km2 as permanent frozen trivia unless sourced
 * - Challenges: illegal fishing, pollution, weak value chains, security, and local livelihood inclusion near Gwadar
 * Do not invent port throughput rankings or permanent dollar blue-economy GDP shares
 */
export const BLUE_ECONOMY_PAKISTAN_KIT: NoteKitData = {
  id: 'blue-economy-pakistan',
  title: 'Blue Economy of Pakistan',
  subtitle:
    'Ports, fisheries, shipping, and ocean governance, with careful Gwadar framing for CSS current affairs and geography overlap.',
  syllabusTags: [
    'Blue economy',
    'Maritime economy',
    'Gwadar',
    'Ports',
    'Current affairs',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS / PMS',
      directive: 'Discuss',
      angle: 'Prospects of blue economy for Pakistan',
      frequency: 'high',
    },
    {
      year: 'CSS Current Affairs',
      directive: 'Evaluate',
      angle: 'Ports and maritime trade as engines of growth',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Critically examine',
      angle: 'Gwadar and coastal development in blue-economy framing',
      frequency: 'medium',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'Karachi Port; Port Qasim; Gwadar; Arabian Sea',
      frequency: 'high',
    },
  ],
  onePager: [
    'Blue economy means sustainable ocean-based growth: ports and shipping, fisheries, coastal tourism, and related marine industries, without destroying the marine environment.',
    'Pakistan faces the Arabian Sea. Commercial maritime weight historically centres on Karachi Port and Port Muhammad Bin Qasim; Gwadar is taught as a strategic deep-water and CPEC coastal node.',
    'Ports pillar: efficiency, hinterland connectivity, customs facilitation, and logistics reduce trade costs. Blue economy is not only a new port announcement.',
    'Fisheries pillar: marine catch, aquaculture potential, cold-chain and export value addition. Illegal, unreported, and unregulated fishing and stock stress are standard critique points.',
    'Gwadar carefully: opportunity for logistics and industry, but answers must include local livelihoods, security, governance, and inclusion. Do not collapse blue economy into Gwadar alone.',
    'Ocean governance: EEZ stewardship, coastal zone management, pollution control, and maritime security support a credible blue-economy story.',
    'Climate link: sea-level rise, cyclones, and mangroves or coastal protection belong in a modern answer.',
    'Answer close: upgrade ports and logistics, formalise fisheries value chains, protect ecosystems, and integrate Gwadar with hinterland and local consent.',
  ],
  answerSteps: [
    'Define blue economy as sustainable ocean-based development.',
    'Map Pakistan coastal assets: Karachi, Port Qasim, Gwadar (careful roles).',
    'Explain ports/shipping and fisheries as core pillars.',
    'Add governance: EEZ, pollution, maritime security.',
    'Critically examine Gwadar inclusion and environmental risks.',
    'Conclude with logistics, value chains, and sustainability.',
  ],
  questionVariants: [
    'Discuss the prospects of the blue economy for Pakistan.',
    'Evaluate the role of ports in Pakistan maritime economy.',
    'Critically examine Gwadar within a blue-economy framework.',
    'How can fisheries and coastal management support sustainable growth?',
  ],
  citations: [
    {
      label: 'Concept',
      text: 'Blue economy: sustainable use of ocean resources for economic growth, livelihoods, and ocean health (standard international development teaching).',
    },
    {
      label: 'Ports map',
      text: 'Karachi Port and Port Qasim are Pakistan principal commercial port complexes; Gwadar is a strategic Arabian Sea deep-water node in CPEC teaching.',
    },
    {
      label: 'Fisheries',
      text: 'Marine fisheries and aquaculture are core blue-economy sectors; IUU fishing and weak value chains are recurring constraints.',
    },
    {
      label: 'Gwadar caution',
      text: 'Gwadar opportunity must be paired with local inclusion, security, and governance critique in exam answers.',
    },
    {
      label: 'Governance',
      text: 'EEZ stewardship, coastal management, pollution control, and maritime security underpin a credible blue-economy agenda.',
    },
  ],
  flashcards: [
    {
      prompt: 'What is blue economy in one line?',
      answer: 'Sustainable ocean-based growth for jobs and wealth while protecting the marine environment',
    },
    {
      prompt: 'Name Pakistan two principal commercial port complexes.',
      answer: 'Karachi Port and Port Muhammad Bin Qasim',
    },
    {
      prompt: 'Where is Gwadar and how is it framed?',
      answer: 'Balochistan Arabian Sea coast; strategic deep-water and CPEC coastal node',
    },
    {
      prompt: 'Name three blue-economy sectors for Pakistan.',
      answer: 'Ports/shipping, fisheries/aquaculture, coastal tourism (plus related marine industry themes)',
    },
    {
      prompt: 'What fisheries critique is high-yield?',
      answer: 'IUU fishing, stock stress, and weak cold-chain or export value addition',
    },
    {
      prompt: 'Why is blue economy not equal to Gwadar alone?',
      answer: 'National maritime economy also rests on Karachi/Qasim logistics, fisheries, and coast-wide governance',
    },
    {
      prompt: 'What governance themes support blue economy?',
      answer: 'EEZ stewardship, coastal zone management, pollution control, maritime security',
    },
    {
      prompt: 'What climate angles belong in a modern answer?',
      answer: 'Sea-level rise, cyclones, mangroves or coastal protection',
    },
    {
      prompt: 'What local Gwadar test should appear?',
      answer: 'Livelihoods, inclusion, security, and transparent governance',
    },
    {
      prompt: 'Should you invent blue-economy GDP share figures?',
      answer: 'No; use sector logic unless citing a dated official source',
    },
  ],
  mistakes: [
    {
      trap: 'Equating blue economy only with Gwadar headlines.',
      correct: 'Cover Karachi/Qasim logistics, fisheries, and coast-wide governance too.',
    },
    {
      trap: 'Inventing port ranking or GDP share numbers.',
      correct: 'Explain sector logic. Avoid fake precision.',
    },
    {
      trap: 'Ignoring environmental and livelihood costs.',
      correct: 'Sustainability and inclusion are part of the definition.',
    },
    {
      trap: 'Writing shipping without hinterland connectivity.',
      correct: 'Ports need roads, rail, customs, and logistics to create value.',
    },
    {
      trap: 'Treating EEZ as unlimited resource extraction rights.',
      correct: 'EEZ implies stewardship duties as well as rights.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Define blue economy and list sectors.' },
    { day: 'Day 2', task: 'Ports map: Karachi, Qasim, Gwadar roles.' },
    { day: 'Day 3', task: 'Fisheries and value-chain critique.' },
    { day: 'Day 4', task: 'Flashcards.' },
    { day: 'Day 5', task: 'Gwadar careful paragraph.' },
    { day: 'Day 6', task: '10-minute prospects essay outline.' },
    { day: 'Day 7', task: 'Recite one-pager.' },
  ],
  sourcesLine:
    'Sources: standard current affairs blue-economy primers, Pakistan port geography teaching, and CPEC-Gwadar notes with inclusion caveats. Avoid invented throughput and GDP-share trivia.',
}
