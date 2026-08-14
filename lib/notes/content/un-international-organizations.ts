import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked:
 * - UN founded 1945; HQ New York City; principal organs include GA, SC, ICJ, Secretariat, ECOSOC, Trusteeship Council (historical)
 * - IMF and World Bank HQ Washington D.C.; WTO HQ Geneva
 * - OIC: Organization of Islamic Cooperation; HQ Jeddah
 * - SAARC: South Asian Association for Regional Cooperation; HQ Kathmandu
 * - SCO: Shanghai Cooperation Organisation; classic members teaching includes China Russia and Central Asian states plus later expansion (Pakistan/India joined 2017)
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
    'United Nations founded in 1945 after World War II. Headquarters: New York City (USA).',
    'Principal organs commonly taught: General Assembly, Security Council, Economic and Social Council (ECOSOC), International Court of Justice (ICJ), Secretariat, and Trusteeship Council (now inactive in practice).',
    'Security Council has primary responsibility for international peace and security. Permanent five (P5): China, France, Russia, UK, USA.',
    'ICJ (World Court) sits at The Hague, Netherlands. It settles legal disputes between states.',
    'IMF: monetary cooperation and BOP support. World Bank: development finance. Both HQ: Washington, D.C.',
    'WTO (World Trade Organization): rules-based multilateral trade. HQ: Geneva, Switzerland.',
    'OIC (Organization of Islamic Cooperation): cooperation among Muslim-majority states. HQ: Jeddah, Saudi Arabia.',
    'SAARC: South Asian regional cooperation. HQ: Kathmandu, Nepal. Members include Afghanistan, Bangladesh, Bhutan, India, Maldives, Nepal, Pakistan, Sri Lanka.',
    'SCO (Shanghai Cooperation Organisation): Eurasian security and cooperation forum. Pakistan and India became members in 2017 (high-yield expansion fact).',
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
      text: 'OIC HQ Jeddah. SAARC HQ Kathmandu.',
    },
    {
      label: 'SCO',
      text: 'Shanghai Cooperation Organisation; Pakistan and India joined as members in 2017.',
    },
  ],
  flashcards: [
    { prompt: 'When was the UN founded?', answer: '1945' },
    { prompt: 'Where is UN headquarters?', answer: 'New York City' },
    {
      prompt: 'Which UN organ is mainly for international peace and security?',
      answer: 'Security Council',
    },
    {
      prompt: 'Name the P5 of the UN Security Council.',
      answer: 'China, France, Russia, UK, USA',
    },
    {
      prompt: 'Where does the ICJ sit?',
      answer: 'The Hague, Netherlands',
    },
    { prompt: 'IMF headquarters?', answer: 'Washington, D.C.' },
    { prompt: 'World Bank headquarters?', answer: 'Washington, D.C.' },
    { prompt: 'WTO headquarters?', answer: 'Geneva, Switzerland' },
    {
      prompt: 'IMF main focus vs World Bank?',
      answer: 'IMF: BOP and macro monetary issues; World Bank: development lending/projects',
    },
    {
      prompt: 'What does OIC stand for?',
      answer: 'Organization of Islamic Cooperation',
    },
    { prompt: 'OIC headquarters?', answer: 'Jeddah, Saudi Arabia' },
    {
      prompt: 'What does SAARC stand for?',
      answer: 'South Asian Association for Regional Cooperation',
    },
    { prompt: 'SAARC headquarters?', answer: 'Kathmandu, Nepal' },
    {
      prompt: 'What does SCO stand for?',
      answer: 'Shanghai Cooperation Organisation',
    },
    {
      prompt: 'In which year did Pakistan join the SCO as a member?',
      answer: '2017',
    },
    {
      prompt: 'Is League of Nations the same as the UN?',
      answer: 'No. League of Nations was the earlier interwar body; UN was founded in 1945',
    },
  ],
  mistakes: [
    {
      trap: 'Saying UN HQ is in Geneva.',
      correct: 'UN HQ is New York. Geneva hosts many UN offices and also WTO HQ.',
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
      correct: '1919 is associated with the League of Nations era after WWI. UN is 1945.',
    },
    {
      trap: 'Mixing OIC HQ with Makkah only branding myths.',
      correct: 'Standard exam answer: Jeddah, Saudi Arabia.',
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
