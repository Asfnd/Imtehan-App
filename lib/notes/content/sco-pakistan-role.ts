import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked:
 * - SCO: Shanghai Cooperation Organisation; Shanghai Five 1996, SCO formalised 2001
 * - Pakistan and India became full members in 2017
 * - Classic pillars in teaching: regional security, counter-terrorism cooperation (RATS theme), Eurasian connectivity and economic engagement
 * - Pakistan angles: China-Russia-Central Asia diplomacy, connectivity, status elevation beyond South Asia-only forums
 * Avoid inventing fake summit host calendars for 2026 or claiming SCO replaces all other alliances
 */
export const SCO_PAKISTAN_ROLE_KIT: NoteKitData = {
  id: 'sco-pakistan-role',
  title: 'SCO and Pakistan Role',
  subtitle:
    'Full membership since 2017, security and connectivity pillars, and deeper Eurasia angles for CSS Current Affairs.',
  syllabusTags: [
    'Shanghai Cooperation Organisation',
    'Current affairs',
    'Regional diplomacy',
    'Foreign policy',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS / PMS',
      directive: 'Discuss',
      angle: 'Pakistan role and interests in the SCO',
      frequency: 'high',
    },
    {
      year: 'CSS Current Affairs',
      directive: 'Evaluate',
      angle: 'SCO usefulness for Pakistan connectivity and security diplomacy',
      frequency: 'high',
    },
    {
      year: 'One-paper / MPT',
      directive: 'MCQ fact',
      angle: 'SCO founding path; Pakistan full membership year 2017',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Critically examine',
      angle: 'Opportunities and limits of SCO for Pakistan',
      frequency: 'medium',
    },
  ],
  onePager: [
    'SCO (Shanghai Cooperation Organisation) grew from the Shanghai Five process (from 1996) and was formalised in 2001. It is a Eurasian political-security and cooperation forum centred on China, Russia, and Central Asian engagement, later expanded.',
    'Pakistan and India became full members in 2017. This is the high-yield MCQ date. Membership elevated Pakistan Eurasia diplomacy beyond South Asia-only forums.',
    'Security pillar: regional security dialogue and counter-terrorism cooperation themes (including RATS-related teaching notes). Write cooperation themes, not invented operation lists.',
    'Connectivity and economy: SCO is used in Pakistani answers for Eurasian connectivity, trade facilitation language, and alignment with China-centred and Central Asia corridors (often linked in essays to BRI/CPEC context without equating them).',
    'Diplomatic value: a table with China and Russia plus Central Asian states; useful for multipolar foreign-policy narratives and status signalling.',
    'Limits: consensus politics, India-Pakistan tension can constrain South Asia agenda items, and SCO is not a substitute for bilaterals or for IMF-style economic rescue. Avoid overclaiming.',
    'Exam contrast: SAARC = South Asia aspiration with structural rivalry limits; SCO = Eurasia track with China-Russia weight. OIC = Muslim-world identity track.',
    'Answer close: SCO expands Pakistan diplomatic geography; delivery still depends on connectivity projects, security cooperation quality, and bilateral follow-through.',
  ],
  answerSteps: [
    'Define SCO origin path (Shanghai Five to 2001) in one sentence.',
    'State Pakistan full membership year (2017) and why it matters.',
    'Cover security/counter-terrorism cooperation themes.',
    'Add connectivity and Eurasia diplomacy value.',
    'Give one balanced limit (consensus, India-Pakistan tension, or overclaim risk).',
    'Close by contrasting SCO with SAARC and OIC identity circles.',
  ],
  questionVariants: [
    'Discuss Pakistan role in the Shanghai Cooperation Organisation.',
    'When did Pakistan become a full SCO member, and why does it matter?',
    'Evaluate opportunities and constraints of SCO membership for Pakistan.',
    'How does SCO differ from SAARC in Pakistan foreign-policy framing?',
  ],
  citations: [
    {
      label: 'Origin',
      text: 'Shanghai Five process from 1996; SCO formalised in 2001.',
    },
    {
      label: 'Membership year',
      text: 'Pakistan and India became full SCO members in 2017.',
    },
    {
      label: 'Security theme',
      text: 'Regional security and counter-terrorism cooperation themes (including RATS-related teaching) are standard SCO pillars.',
    },
    {
      label: 'Connectivity theme',
      text: 'Pakistan answers often link SCO to Eurasian connectivity and Central Asia engagement without equating SCO to BRI.',
    },
    {
      label: 'Limit',
      text: 'Consensus politics and India-Pakistan tension can constrain agenda delivery; SCO is not a full economic substitute for bilaterals.',
    },
  ],
  flashcards: [
    {
      prompt: 'What does SCO stand for?',
      answer: 'Shanghai Cooperation Organisation',
    },
    {
      prompt: 'When was SCO formalised?',
      answer: '2001 (after Shanghai Five from 1996)',
    },
    {
      prompt: 'When did Pakistan become a full SCO member?',
      answer: '2017',
    },
    {
      prompt: 'Which other South Asian state joined as a full member with Pakistan in 2017?',
      answer: 'India',
    },
    {
      prompt: 'Name two SCO pillars in exam answers.',
      answer: 'Regional security / counter-terrorism cooperation, and Eurasian connectivity or economic engagement',
    },
    {
      prompt: 'What diplomatic value does SCO give Pakistan?',
      answer: 'A Eurasia table with China, Russia, and Central Asian states',
    },
    {
      prompt: 'Name one structural limit of SCO for Pakistan.',
      answer: 'Consensus politics or India-Pakistan tension constraining some agenda items',
    },
    {
      prompt: 'How should SCO be contrasted with SAARC?',
      answer: 'SAARC is South Asia-focused with rivalry limits; SCO is a Eurasia track with China-Russia weight',
    },
    {
      prompt: 'Should SCO be treated as identical to BRI?',
      answer: 'No; related in connectivity essays but institutionally distinct',
    },
    {
      prompt: 'What closing caution scores?',
      answer: 'Membership expands diplomacy; delivery still needs projects and bilaterals',
    },
  ],
  mistakes: [
    {
      trap: 'Saying Pakistan founded the SCO in 2001.',
      correct: 'SCO formalised 2001 from Shanghai Five. Pakistan joined as a full member in 2017.',
    },
    {
      trap: 'Equating SCO membership with automatic CPEC success.',
      correct: 'SCO is a multilateral forum. CPEC and BRI delivery are separate tracks.',
    },
    {
      trap: 'Claiming SCO replaces SAARC or OIC.',
      correct: 'Different identity circles: Eurasia, South Asia, Muslim world.',
    },
    {
      trap: 'Inventing yearly summit hosts as permanent MCQ facts.',
      correct: 'Lock founding path, 2017 membership, and purpose pillars.',
    },
    {
      trap: 'Ignoring limits and writing only benefits.',
      correct: 'Add one line on consensus politics or bilateral constraints.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Origin path + 2017 membership date.' },
    { day: 'Day 2', task: 'Security and RATS theme paragraph.' },
    { day: 'Day 3', task: 'Connectivity and Eurasia diplomacy.' },
    { day: 'Day 4', task: 'Limits and SAARC/OIC contrast.' },
    { day: 'Day 5', task: 'Flashcards.' },
    { day: 'Day 6', task: '10-minute critically examine outline.' },
    { day: 'Day 7', task: 'Recite one-pager.' },
  ],
  sourcesLine:
    'Sources: standard current affairs primers on SCO founding and 2017 expansion; Pakistan Affairs foreign-policy teaching on Eurasia diplomacy. Avoid invented summit calendars and overclaimed economic rescue narratives.',
}
