import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked:
 * - Zakat is a pillar of Islam and a socio-economic institution: purification of wealth and support for defined categories of beneficiaries
 * - Nisab: minimum threshold of wealth above which zakat becomes due (classically linked to gold/silver measures in fiqh teaching)
 * - Common rate taught for monetary wealth/zakatable assets in many exam primers: 2.5% (1/40) annually when conditions are met
 * - Modern systems: state zakat collection/distribution institutions in some Muslim countries including Pakistan\'s zakat framework at name level
 * Careful: fiqh schools differ on asset details; do not invent fake nationwide collection totals for 2026
 */
export const ZAKAT_SYSTEM_SOCIAL_WELFARE_KIT: NoteKitData = {
  id: 'zakat-system-social-welfare',
  title: 'Zakat System and Social Welfare',
  subtitle:
    'Zakat as socio-economic institution, nisab and rate basics, and modern institutional zakat carefully for Islamiat.',
  syllabusTags: [
    'Islamiat',
    'Ibadaat',
    'Islamic economics',
    'Social welfare',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS Islamiat',
      directive: 'Discuss',
      angle: 'Zakat as a socio-economic institution',
      frequency: 'high',
    },
    {
      year: 'CSS / PMS',
      directive: 'Explain',
      angle: 'Nisab, rate, and objectives of zakat',
      frequency: 'high',
    },
    {
      year: 'Islamiat',
      directive: 'Critically examine',
      angle: 'Modern zakat administration and welfare outcomes',
      frequency: 'medium',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: '2.5% rate; zakat as pillar; nisab concept',
      frequency: 'high',
    },
  ],
  onePager: [
    'Zakat is a pillar of Islam: obligatory almsgiving on qualifying wealth, combining worship and social justice.',
    'Socio-economic role: reduce hardship, circulate wealth, support defined beneficiary categories (Qur\'anic heads of expenditure are the classical frame), and discipline attachment to wealth.',
    'Nisab is the minimum threshold. Below nisab, zakat is not due on that wealth category under standard teaching. Exact gold/silver gram figures vary by reference price; learn the concept first.',
    'Rate commonly taught for cash and similar zakatable wealth: 2.5% (one-fortieth) per lunar year when nisab and other conditions are met. Agricultural produce and livestock have distinct classical rules; do not collapse everything into 2.5% blindly.',
    'Conditions themes: ownership, nisab, passage of a year (hawl) for many asset types, and wealth being productive or liable under fiqh categories.',
    'Modern zakat systems: state or semi-state collection and distribution institutions aim for scale and documentation. Pakistan has a statutory zakat framework at name level. Critical answers note leakage, coverage, and trust issues without inventing fake audit numbers.',
    'Essay upgrade: link zakat to poverty reduction and social solidarity, then add governance quality of distribution.',
  ],
  answerSteps: [
    'Define zakat as worship plus wealth transfer obligation.',
    'State objectives: purification, solidarity, and poverty relief within Shariah categories.',
    'Explain nisab and the common 2.5% monetary rate carefully.',
    'Note that some asset classes have different classical rates/rules.',
    'Discuss modern institutional collection and distribution, with an implementation critique.',
    'Close by linking faith commitment to credible welfare governance.',
  ],
  questionVariants: [
    'Discuss zakat as a socio-economic institution in Islam.',
    'Explain nisab and the rate of zakat with suitable cautions.',
    'Critically examine modern zakat administration as a welfare tool.',
    'How does zakat contribute to social justice? Discuss.',
  ],
  citations: [
    {
      label: 'Status',
      text: 'Zakat is a pillar of Islam and an obligatory due on qualifying wealth.',
    },
    {
      label: 'Nisab',
      text: 'Nisab is the minimum wealth threshold for zakat liability in standard teaching.',
    },
    {
      label: 'Common rate',
      text: '2.5% (1/40) is the commonly taught rate for monetary and similar zakatable wealth when conditions are met.',
    },
    {
      label: 'Social role',
      text: 'Zakat institutionalises solidarity and targeted support for defined beneficiary categories.',
    },
    {
      label: 'Modern systems',
      text: 'State zakat institutions seek scale; effectiveness depends on transparency and targeting quality.',
    },
  ],
  flashcards: [
    {
      prompt: 'Is zakat a pillar of Islam?',
      answer: 'Yes',
    },
    {
      prompt: 'What is nisab?',
      answer: 'Minimum wealth threshold for zakat liability',
    },
    {
      prompt: 'What rate is commonly taught for monetary zakatable wealth?',
      answer: '2.5% (1/40)',
    },
    {
      prompt: 'Name one socio-economic purpose of zakat.',
      answer: 'Poverty relief / wealth circulation / social solidarity',
    },
    {
      prompt: 'Should farm produce always use the 2.5% cash rate in answers?',
      answer: 'No. Classical rules for produce/livestock can differ',
    },
    {
      prompt: 'What does hawl refer to in many zakat discussions?',
      answer: 'Passage of a year on qualifying wealth (where applicable)',
    },
    {
      prompt: 'Modern zakat systems add what institutional idea?',
      answer: 'Organised collection and distribution through official bodies',
    },
    {
      prompt: 'Trap: inventing a 2026 national zakat collection total.',
      answer: 'Avoid. Discuss design and governance quality instead',
    },
    {
      prompt: 'Link zakat to worship in one word pair.',
      answer: 'Ibadah and social justice / fiscal worship',
    },
    {
      prompt: 'Critical angle on state zakat?',
      answer: 'Transparency, targeting, and public trust determine welfare impact',
    },
  ],
  mistakes: [
    {
      trap: 'Calling zakat optional charity like ordinary sadaqah.',
      correct: 'Zakat is obligatory on qualifying wealth. Sadaqah is broader voluntary charity.',
    },
    {
      trap: 'Applying 2.5% to every asset class without fiqh caution.',
      correct: 'State the common monetary rate, then note distinct rules for some categories.',
    },
    {
      trap: 'Memorising fake exact gram prices as eternal constants without noting price linkage.',
      correct: 'Teach nisab as a threshold concept; gold/silver valuations move with prices.',
    },
    {
      trap: 'Praising modern systems with zero implementation critique when asked critically examine.',
      correct: 'Balance ideals with governance and leakage risks.',
    },
    {
      trap: 'Ignoring beneficiary categories entirely.',
      correct: 'Mention that Shariah defines heads of expenditure; do not invent a personal list as revelation.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Read zakat as pillar and socio-economic institution.' },
    { day: 'Day 2', task: 'Memorise nisab concept and 2.5% monetary rate.' },
    { day: 'Day 3', task: 'Write a 10-minute outline on social welfare role.' },
    { day: 'Day 4', task: 'Drill flashcards.' },
    { day: 'Day 5', task: 'Attempt modern administration critically examine outline.' },
    { day: 'Day 6', task: 'One-pager + citations. Practice MCQs.' },
    { day: 'Day 7', task: 'One-pager only. Recite nisab, rate, and cautions.' },
  ],
  sourcesLine:
    'Sources: CSS Islamiat ibadaat and Islamic economics themes; classical fiqh primers on nisab and rates; modern zakat institution discussions at name level. Avoid WhatsApp fake collection statistics.',
}
