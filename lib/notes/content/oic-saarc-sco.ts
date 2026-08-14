import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked:
 * - OIC: Organization of Islamic Cooperation; founded 1969 (after Al-Aqsa Mosque fire context); HQ Jeddah, Saudi Arabia
 * - SAARC: South Asian Association for Regional Cooperation; founded 1985; HQ Kathmandu, Nepal; 8 members
 * - SCO: Shanghai Cooperation Organisation; Shanghai Five 1996 then SCO 2001; Pakistan and India joined as full members 2017
 * - Avoid inventing fake summit host lists for 2026; teach founding/HQ/purpose and Pakistan angles
 */
export const OIC_SAARC_SCO_KIT: NoteKitData = {
  id: 'oic-saarc-sco',
  title: 'OIC, SAARC and SCO',
  subtitle:
    'Founding years, headquarters, purpose, and Pakistan role angles for MCQs and written Current Affairs.',
  syllabusTags: [
    'International organizations',
    'Current affairs',
    'Regional diplomacy',
    'General knowledge',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'One-paper / MPT',
      directive: 'MCQ fact',
      angle: 'OIC, SAARC, SCO founding years and HQs',
      frequency: 'high',
    },
    {
      year: 'PPSC / NTS',
      directive: 'MCQ fact',
      angle: 'SAARC members; SCO expansion 2017',
      frequency: 'high',
    },
    {
      year: 'CSS / PMS',
      directive: 'Discuss',
      angle: 'Pakistan role in OIC and regional organisations',
      frequency: 'medium',
    },
    {
      year: 'CSS pattern',
      directive: 'Critically examine',
      angle: 'Why SAARC underperforms vs SCO usefulness debate',
      frequency: 'medium',
    },
  ],
  onePager: [
    'OIC: Organization of Islamic Cooperation. Founded 1969. Headquarters: Jeddah, Saudi Arabia.',
    'OIC purpose (exam line): cooperation among Muslim-majority states on political, economic, cultural, and Palestine-related solidarity themes.',
    'Pakistan and OIC: active founding-era member; uses OIC for Muslim world diplomacy, Kashmir/Palestine narrative spaces, and multilateral identity.',
    'SAARC: South Asian Association for Regional Cooperation. Founded 1985. Headquarters: Kathmandu, Nepal.',
    'SAARC members (8): Afghanistan, Bangladesh, Bhutan, India, Maldives, Nepal, Pakistan, Sri Lanka.',
    'SAARC purpose: regional cooperation on development, connectivity, and people-to-people themes. Practice is often stalled by India-Pakistan political tension.',
    'SCO: Shanghai Cooperation Organisation. Formalised 2001 from the earlier Shanghai Five process (from 1996).',
    'SCO classic core: China, Russia, and Central Asian states; later expansion. Pakistan and India became full members in 2017.',
    'SCO purpose (exam line): regional security, counter-terrorism cooperation, and Eurasian political-economic engagement.',
    'Pakistan angles: OIC = Muslim world voice; SAARC = South Asia aspiration with structural limits; SCO = Eurasia/China-Russia track and connectivity diplomacy.',
  ],
  answerSteps: [
    'For MCQs: lock year, HQ, and one purpose line per organisation.',
    'For written: define each body in one sentence, then Pakistan stake in one sentence.',
    'Add a critical contrast: SAARC stalled by rivalry; SCO valued for Eurasia and China track.',
    'Do not invent fake membership counts; use the verified 8 for SAARC and 2017 for Pakistan/India SCO entry.',
    'Close with how organisations serve different geographic identity circles (Muslim world, South Asia, Eurasia).',
  ],
  questionVariants: [
    'Write short notes on OIC, SAARC, and SCO.',
    'When were OIC and SAARC founded, and where are their headquarters?',
    'Discuss Pakistan role in the OIC and the SCO.',
    'Why has SAARC delivered limited regional integration? Critically examine.',
  ],
  citations: [
    {
      label: 'OIC',
      text: 'Organization of Islamic Cooperation founded 1969; headquarters Jeddah, Saudi Arabia.',
    },
    {
      label: 'SAARC',
      text: 'South Asian Association for Regional Cooperation founded 1985; headquarters Kathmandu, Nepal; eight members.',
    },
    {
      label: 'SCO',
      text: 'Shanghai Cooperation Organisation formalised 2001; Pakistan and India joined as full members in 2017.',
    },
    {
      label: 'Pakistan angles',
      text: 'OIC for Muslim world diplomacy; SAARC for South Asian cooperation aspiration; SCO for Eurasian security and connectivity engagement.',
    },
  ],
  flashcards: [
    { prompt: 'OIC founding year?', answer: '1969' },
    { prompt: 'OIC headquarters?', answer: 'Jeddah, Saudi Arabia' },
    { prompt: 'Full form of OIC?', answer: 'Organization of Islamic Cooperation' },
    { prompt: 'SAARC founding year?', answer: '1985' },
    { prompt: 'SAARC headquarters?', answer: 'Kathmandu, Nepal' },
    { prompt: 'How many SAARC members?', answer: 'Eight' },
    {
      prompt: 'Name SAARC members.',
      answer: 'Afghanistan, Bangladesh, Bhutan, India, Maldives, Nepal, Pakistan, Sri Lanka',
    },
    { prompt: 'SCO formal founding year (organisation)?', answer: '2001' },
    {
      prompt: 'When did Pakistan join SCO as a full member?',
      answer: '2017 (with India)',
    },
    {
      prompt: 'One purpose line for SCO?',
      answer: 'Regional security, counter-terrorism cooperation, Eurasian engagement',
    },
    {
      prompt: 'Why is SAARC often called weak in exams?',
      answer: 'India-Pakistan political tension blocks deep regional integration',
    },
    {
      prompt: 'Pakistan OIC use case in one line?',
      answer: 'Muslim world solidarity and multilateral diplomatic platform',
    },
  ],
  mistakes: [
    {
      trap: 'Putting SAARC HQ in New Delhi or Islamabad.',
      correct: 'SAARC HQ is Kathmandu, Nepal.',
    },
    {
      trap: 'Saying OIC HQ is Riyadh.',
      correct: 'OIC headquarters is Jeddah, Saudi Arabia.',
    },
    {
      trap: 'Dating Pakistan SCO membership to 2001.',
      correct: 'SCO formalised 2001; Pakistan (and India) joined as full members in 2017.',
    },
    {
      trap: 'Confusing OIC with OPEC.',
      correct: 'OIC is Islamic cooperation. OPEC is oil exporters.',
    },
    {
      trap: 'Listing only seven SAARC members and forgetting Afghanistan.',
      correct: 'Afghanistan is the eighth member in the standard teaching set.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Memorise founding year and HQ for OIC, SAARC, SCO.' },
    { day: 'Day 2', task: 'Drill SAARC eight members.' },
    { day: 'Day 3', task: 'Write one purpose line and one Pakistan angle for each.' },
    { day: 'Day 4', task: 'Flashcards only (dates and HQs).' },
    { day: 'Day 5', task: 'Outline SAARC limits vs SCO usefulness.' },
    { day: 'Day 6', task: 'One-pager + link to foreign policy principles kit.' },
    { day: 'Day 7', task: 'Recite year/HQ/purpose triad from memory.' },
  ],
  sourcesLine:
    'Sources: OIC, SAARC, and SCO organisational profiles as taught in standard GK and IR materials; SAARC Charter era 1985; SCO expansion reporting for 2017 membership. Avoid unsourced summit trivia lists.',
}
