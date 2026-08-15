import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (mainstream Sunni fiqh teaching for exams; avoid sectarian fights):
 * - Hajj is the fifth pillar for those who are able (istita'ah)
 * - Umrah is the lesser pilgrimage; can be performed any time of year (outside Hajj rites timing distinctions as taught)
 * - High-yield Hajj steps/arkān themes: Ihram, Wuquf at Arafah, Tawaf, Sa'i; also Muzdalifah, Ramy (stoning), Hady/sacrifice, Halq/Taqsir in ritual sequence teaching
 * - Do not invent contested minority rulings as universal; keep mainstream CSS/PMS MCQ level
 */
export const HAJJ_UMRAH_FIQH_BASICS_KIT: NoteKitData = {
  id: 'hajj-umrah-fiqh-basics',
  title: 'Hajj and Umrah: Fiqh Basics',
  subtitle:
    'Mainstream steps of Hajj, Umrah outline, Ihram, and high-yield MCQ points for Islamic Studies.',
  syllabusTags: [
    'Ibadat',
    'Hajj',
    'Umrah',
    'Islamic Studies',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS / PMS',
      directive: 'Discuss',
      angle: 'Significance and main rites of Hajj',
      frequency: 'high',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'Wuquf at Arafah; Ihram; Tawaf; Sa’i',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Explain',
      angle: 'Difference between Hajj and Umrah',
      frequency: 'high',
    },
    {
      year: 'Islamic Studies',
      directive: 'Outline',
      angle: 'Sequence of major Hajj rituals',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Hajj: pilgrimage to the Sacred House in Makkah in Dhul-Hijjah for those who have the means and ability (istita’ah). It is a pillar of Islam.',
    'Umrah: lesser pilgrimage involving Ihram, Tawaf of the Ka’bah, Sa’i between Safa and Marwah, and cutting/shortening hair. It can be performed throughout the year in mainstream teaching.',
    'Ihram: sacred state with intention (niyyah) and prescribed clothing/restrictions (for men: two unstitched cloths in standard teaching). Entered at designated miqat points.',
    'High-yield Hajj ritual map (mainstream exam sequence themes): enter Ihram → go to Mina → Wuquf (standing) at Arafah on 9 Dhul-Hijjah → Muzdalifah → Ramy (stoning) at Jamarat → Hady/sacrifice where required → Halq or Taqsir (shave/shorten hair) → Tawaf al-Ifadah → Sa’i → later Tawaf al-Wada (farewell) for those leaving.',
    'Wuquf at Arafah is the central pillar-like essential in almost all exam teaching: without Arafah, Hajj is not valid in standard fiqh summaries.',
    'Tawaf: circumambulation of the Ka’bah. Sa’i: walking between Safa and Marwah.',
    'Types often named in notes: Hajj al-Ifrad, Hajj al-Qiran, Hajj al-Tamattu (name-level only unless the paper asks detail).',
    'Spiritual aims: obedience, equality in Ihram, remembrance of Ibrahimic tradition, repentance, and unity of the Ummah. Keep fiqh steps accurate; do not turn the answer into only emotion.',
  ],
  answerSteps: [
    'Define Hajj and state the ability condition (istita’ah).',
    'Contrast Umrah briefly.',
    'Explain Ihram and miqat.',
    'Walk through the main ritual sequence with Arafah emphasised.',
    'Close with spiritual and social significance in 2 to 3 lines.',
  ],
  questionVariants: [
    'Discuss the main rites of Hajj and their significance.',
    'Explain the difference between Hajj and Umrah.',
    'Why is Wuquf at Arafah central to Hajj? Discuss.',
    'Outline the obligations and key steps of Hajj for a person of means.',
  ],
  citations: [
    {
      label: 'Pillar status',
      text: 'Hajj is a pillar of Islam for those who are able (istita’ah).',
    },
    {
      label: 'Arafah',
      text: 'Wuquf at Arafah on 9 Dhul-Hijjah is the central essential in standard exam fiqh.',
    },
    {
      label: 'Umrah core acts',
      text: 'Ihram, Tawaf, Sa’i, and Halq/Taqsir in mainstream summaries.',
    },
    {
      label: 'Ihram',
      text: 'Sacred state with niyyah, entered from miqat, with prescribed restrictions.',
    },
  ],
  flashcards: [
    {
      prompt: 'In which Islamic month is Hajj performed?',
      answer: 'Dhul-Hijjah',
    },
    {
      prompt: 'What does istita’ah mean for Hajj?',
      answer: 'Ability / means (physical and financial capacity in exam language)',
    },
    {
      prompt: 'What is Wuquf at Arafah?',
      answer: 'Standing/presence at Arafah on 9 Dhul-Hijjah; central essential of Hajj',
    },
    {
      prompt: 'What is Tawaf?',
      answer: 'Circumambulation of the Ka’bah',
    },
    {
      prompt: 'What is Sa’i?',
      answer: 'Walking between Safa and Marwah',
    },
    {
      prompt: 'What is Ihram?',
      answer: 'Sacred state with intention and prescribed restrictions for pilgrimage',
    },
    {
      prompt: 'Name one difference: Hajj vs Umrah.',
      answer: 'Hajj is in Dhul-Hijjah with Arafah and related rites; Umrah is lesser and year-round in mainstream teaching',
    },
    {
      prompt: 'What is Halq / Taqsir?',
      answer: 'Shaving or shortening the hair after key rites',
    },
    {
      prompt: 'What is Ramy al-Jamarat?',
      answer: 'Stoning of the pillars / Jamarat',
    },
    {
      prompt: 'What is Tawaf al-Wada?',
      answer: 'Farewell Tawaf before leaving Makkah',
    },
  ],
  mistakes: [
    {
      trap: 'Saying Hajj is valid without Arafah in mainstream fiqh summaries.',
      correct: 'Wuquf at Arafah is the central essential in standard teaching.',
    },
    {
      trap: 'Confusing Umrah with the full Hajj sequence including Arafah.',
      correct: 'Umrah does not include Wuquf at Arafah.',
    },
    {
      trap: 'Treating Ihram as only clothing and forgetting niyyah.',
      correct: 'Ihram is a sacred state beginning with intention (and miqat rules).',
    },
    {
      trap: 'Inventing sectarian disputed details as universal MCQ answers.',
      correct: 'Keep to mainstream shared steps taught in CSS/PMS notes.',
    },
    {
      trap: 'Mixing Mina, Muzdalifah, and Arafah roles.',
      correct: 'Arafah = Wuquf on 9th; Muzdalifah follows; Mina is linked to stay and stoning rites in the sequence.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Define Hajj, Umrah, Ihram, istita’ah.' },
    { day: 'Day 2', task: 'Memorise ritual sequence with Arafah central.' },
    { day: 'Day 3', task: 'Drill Tawaf, Sa’i, Ramy, Halq/Taqsir terms.' },
    { day: 'Day 4', task: 'Flashcards and one-paper MCQs.' },
    { day: 'Day 5', task: 'Write a short outline answer on Hajj rites.' },
    { day: 'Day 6', task: 'One-pager + Hajj vs Umrah contrast.' },
    { day: 'Day 7', task: 'Recite sequence from memory.' },
  ],
  sourcesLine:
    'Sources: mainstream Islamic Studies fiqh summaries on Hajj and Umrah; CSS/PMS ibadat chapters. Prefer shared ritual map over contested minority rulings presented as universal.',
}
