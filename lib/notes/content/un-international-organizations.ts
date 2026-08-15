import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked:
 * - UN founded 1945; HQ New York City; principal organs include GA, SC, ICJ, Secretariat, ECOSOC, Trusteeship Council (historical)
 * - IMF and World Bank HQ Washington D.C.; WTO HQ Geneva
 * - OIC: Organization of Islamic Cooperation; HQ Jeddah
 * - SAARC: South Asian Association for Regional Cooperation; HQ Kathmandu
 * - SCO: Shanghai Cooperation Organisation; Secretariat HQ Beijing; classic members teaching includes China Russia and Central Asian states plus later expansion (Pakistan/India joined 2017)
 */
export const UN_INTERNATIONAL_ORGANIZATIONS_KIT: NoteKitData = {
  id: 'un-international-organizations',
  title: 'UN and Major International Organizations',
  subtitle:
    'UN founding and organs, IMF/World Bank/WTO, plus OIC, SAARC and SCO name-level GK for PPSC, NTS and CSS.',
  syllabusTags: [
    'General knowledge',
    'International organizations',
    'Current affairs',
    'UN system',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'UN founding year and HQ',
      frequency: 'high',
    },
    {
      year: 'PPSC / NTS',
      directive: 'MCQ fact',
      angle: 'IMF, World Bank, WTO headquarters',
      frequency: 'high',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'OIC, SAARC, SCO HQs and roles',
      frequency: 'high',
    },
    {
      year: 'CSS MPT',
      directive: 'MCQ fact',
      angle: 'UN principal organs',
      frequency: 'medium',
    },
  ],
  onePager: [
    'UN founded 1945 after WWII. HQ: New York City (USA).',
    'Principal organs: General Assembly, Security Council, ECOSOC, ICJ, Secretariat, Trusteeship Council (inactive in practice).',
    'Security Council: primary responsibility for international peace and security. P5: China, France, Russia, UK, USA.',
    'ICJ (World Court): The Hague, Netherlands. Legal disputes between states.',
    'IMF: BOP/macro support. World Bank: development finance. Both HQ: Washington, D.C.',
    'WTO: rules-based multilateral trade. HQ: Geneva, Switzerland.',
    'OIC: founded 1969; cooperation among Muslim-majority states. HQ: Jeddah, Saudi Arabia.',
    'SAARC: founded 1985; South Asian regional cooperation. HQ: Kathmandu, Nepal. Eight members including Pakistan and India.',
    'SCO: formalised 2001; Eurasian security and cooperation. Secretariat HQ: Beijing. Pakistan and India joined as members in 2017.',
  ],
  answerSteps: [
    'State UN year and HQ first if the question is UN-focused.',
    'Name the organ that matches the function (peace = Security Council; law between states = ICJ; debate of members = General Assembly).',
    'For Bretton Woods vs trade: IMF/World Bank Washington; WTO Geneva.',
    'Add OIC/SAARC/SCO only with HQ and one role line.',
    'Close with Pakistan membership relevance only if asked.',
  ],
  questionVariants: [
    'When was the UN founded and where is its headquarters?',
    'Distinguish IMF, World Bank, and WTO by role and headquarters.',
    'Write short notes on OIC, SAARC, and SCO for one-paper exams.',
    'Name the principal organs of the United Nations.',
  ],
  citations: [
    {
      label: 'UN founding',
      text: 'United Nations established in 1945. Headquarters in New York City.',
    },
    {
      label: 'Principal organs',
      text: 'General Assembly, Security Council, ECOSOC, ICJ, Secretariat, Trusteeship Council.',
    },
    {
      label: 'Bretton Woods / trade HQs',
      text: 'IMF and World Bank in Washington, D.C. WTO in Geneva.',
    },
    {
      label: 'OIC and SAARC',
      text: 'OIC founded 1969, HQ Jeddah. SAARC founded 1985, HQ Kathmandu.',
    },
    {
      label: 'SCO',
      text: 'Shanghai Cooperation Organisation formalised 2001; Secretariat HQ Beijing; Pakistan and India joined as members in 2017.',
    },
  ],
  flashcards: [
    { prompt: 'UN founding year?', answer: '1945' },
    { prompt: 'UN HQ?', answer: 'New York City' },
    { prompt: 'UN organ for peace and security?', answer: 'Security Council' },
    { prompt: 'Security Council P5?', answer: 'China, France, Russia, UK, USA' },
    { prompt: 'ICJ seat?', answer: 'The Hague, Netherlands' },
    { prompt: 'IMF HQ?', answer: 'Washington, D.C.' },
    { prompt: 'World Bank HQ?', answer: 'Washington, D.C.' },
    { prompt: 'WTO HQ?', answer: 'Geneva, Switzerland' },
    {
      prompt: 'IMF vs World Bank focus?',
      answer: 'IMF: BOP/macro. World Bank: development lending/projects.',
    },
    { prompt: 'OIC full form?', answer: 'Organization of Islamic Cooperation' },
    { prompt: 'OIC founding year and HQ?', answer: '1969; Jeddah, Saudi Arabia' },
    { prompt: 'SAARC full form?', answer: 'South Asian Association for Regional Cooperation' },
    { prompt: 'SAARC founding year and HQ?', answer: '1985; Kathmandu, Nepal' },
    { prompt: 'SCO full form?', answer: 'Shanghai Cooperation Organisation' },
    { prompt: 'SCO formal year and Secretariat HQ?', answer: '2001; Beijing' },
    { prompt: 'Pakistan joined SCO as member in?', answer: '2017' },
    {
      prompt: 'League of Nations vs UN?',
      answer: 'League: interwar body. UN founded 1945.',
    },
  ],
  mistakes: [
    {
      trap: 'Saying UN HQ is Geneva.',
      correct: 'UN HQ is New York. Geneva hosts many UN offices and WTO HQ.',
    },
    {
      trap: 'Putting WTO HQ in Washington with IMF.',
      correct: 'WTO is Geneva. IMF and World Bank are Washington, D.C.',
    },
    {
      trap: 'Calling SAARC HQ Islamabad or New Delhi.',
      correct: 'SAARC HQ is Kathmandu, Nepal.',
    },
    {
      trap: 'Dating UN founding to 1919.',
      correct: '1919 links to League of Nations after WWI. UN is 1945.',
    },
    {
      trap: 'Mixing OIC HQ with Makkah-only branding myths.',
      correct: 'Standard exam answer: Jeddah, Saudi Arabia.',
    },
    {
      trap: 'Dating Pakistan's SCO membership to founding-era years.',
      correct: 'Pakistan and India joined as members in 2017.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'UN 1945, NYC HQ, principal organs.' },
    { day: 'Day 2', task: 'Security Council P5 and ICJ Hague.' },
    { day: 'Day 3', task: 'IMF, World Bank, WTO roles and HQs.' },
    { day: 'Day 4', task: 'OIC, SAARC, SCO name-level facts.' },
    { day: 'Day 5', task: 'Flashcard speed drill.' },
    { day: 'Day 6', task: 'Trap drill: Geneva vs New York vs Washington.' },
    { day: 'Day 7', task: 'One-pager only. Recite all HQs.' },
  ],
  sourcesLine:
    'Sources: UN Charter era founding facts; standard GK handbooks for HQs; IMF/World Bank/WTO institutional roles; OIC/SAARC/SCO syllabus-level membership facts. Avoid unsourced WhatsApp HQ myths.',
}
