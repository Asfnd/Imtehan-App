import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked:
 * - Constitutional equality and women-related provisions (Arts. 25, 34, 35 framing)
 * - CEDAW: Convention on the Elimination of All Forms of Discrimination Against Women (name-level; Pakistan is a state party)
 * - Social barriers: education, labour force, mobility, violence, patriarchal norms
 * - Do not invent fake latest labour-force percentages as if fixed forever
 */
export const WOMEN_EMPOWERMENT_PAKISTAN_KIT: NoteKitData = {
  id: 'women-empowerment-pakistan',
  title: 'Women Empowerment in Pakistan',
  subtitle:
    'Constitutional protections, CEDAW name-level, social barriers, and a clean CSS answer structure.',
  syllabusTags: [
    'Gender',
    'Human rights',
    'Governance',
    'Pakistan Affairs',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS pattern',
      directive: 'Discuss',
      angle: 'Women empowerment and socio-economic development',
      frequency: 'high',
    },
    {
      year: 'CSS / PMS',
      directive: 'Critically examine',
      angle: 'Constitutional and legal protections for women',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Evaluate',
      angle: 'Social barriers to women\'s participation',
      frequency: 'high',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'CEDAW meaning; Article 25 equality frame',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Women empowerment: expanding women\'s agency in education, health, work, politics, and personal security.',
    'Constitutional frame: equality before law (Art. 25), full participation of women in national life (Art. 34), and protection of family, mother, and child (Art. 35) are standard exam citations.',
    'CEDAW (name-level): UN Convention on the Elimination of All Forms of Discrimination Against Women. Pakistan is a state party; use it as an international commitment frame, not as a fake domestic statute.',
    'Progress markers (qualitative): legal reforms, reserved seats in legislatures, expanding education access narratives, and policy programmes for social protection and skills.',
    'Barriers: patriarchal norms, education and skills gaps, labour-market constraints, mobility and safety issues, unpaid care work, and weak enforcement of rights.',
    'Answer structure: definition → constitutional/CEDAW frame → barriers → measures (education, law, economic inclusion, political voice) → balanced judgment on implementation gaps.',
    'Exam rule: rights on paper are not outcomes. Always add enforcement, social norms, and data caution.',
  ],
  answerSteps: [
    'Define empowerment as agency plus access to resources and safety.',
    'Cite constitutional protections (Arts. 25, 34, 35) carefully.',
    'Name CEDAW as the key international anti-discrimination convention frame.',
    'Explain social and economic barriers without invented fixed percentages.',
    'Propose measures: education, legal enforcement, economic opportunity, political participation, and safety.',
    'Close with implementation gap: laws need culture, capacity, and accountability.',
  ],
  questionVariants: [
    'Discuss women empowerment in Pakistan with constitutional and social perspectives.',
    'Critically examine barriers to women\'s socio-economic participation.',
    'Evaluate the role of law and international commitments such as CEDAW.',
    'Education is the most effective path to women empowerment. Discuss.',
  ],
  citations: [
    {
      label: 'Article 25',
      text: 'Equality of citizens and non-discrimination frame under Article 25 is a core constitutional citation.',
    },
    {
      label: 'Article 34',
      text: 'Article 34 directs steps to ensure full participation of women in all spheres of national life.',
    },
    {
      label: 'Article 35',
      text: 'Article 35 concerns protection of the family, the mother, and the child.',
    },
    {
      label: 'CEDAW',
      text: 'CEDAW is the UN Convention on the Elimination of All Forms of Discrimination Against Women; cite at name level as an international obligation frame.',
    },
  ],
  flashcards: [
    {
      prompt: 'What does CEDAW stand for?',
      answer:
        'Convention on the Elimination of All Forms of Discrimination Against Women',
    },
    {
      prompt: 'Which Article stresses equality of citizens?',
      answer: 'Article 25',
    },
    {
      prompt: 'Which Article concerns full participation of women?',
      answer: 'Article 34',
    },
    {
      prompt: 'Name one major social barrier.',
      answer: 'Patriarchal norms, education gaps, or safety/mobility constraints',
    },
    {
      prompt: 'Name one empowerment pillar for answers.',
      answer: 'Education, economic inclusion, legal enforcement, or political voice',
    },
    {
      prompt: 'What judgment line closes most CSS answers?',
      answer: 'Legal rights need social change and enforcement capacity',
    },
  ],
  mistakes: [
    {
      trap: 'Treating CEDAW as a Pakistan Act of Parliament.',
      correct: 'CEDAW is an international convention. Cite it as a commitment frame.',
    },
    {
      trap: 'Listing only laws and ignoring social barriers.',
      correct: 'Empowerment answers need norms, education, economy, and safety.',
    },
    {
      trap: 'Inventing precise labour-force or literacy figures for the current year.',
      correct: 'Use trends carefully or speak qualitatively unless you cite a source.',
    },
    {
      trap: 'Reducing empowerment only to reserved seats.',
      correct: 'Political presence matters, but education, work, and safety matter too.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Memorise Arts. 25, 34, 35 one-liners.' },
    { day: 'Day 2', task: 'Learn CEDAW full form and role.' },
    { day: 'Day 3', task: 'List barriers and measures in two columns.' },
    { day: 'Day 4', task: 'Write a 10-minute structured answer.' },
    { day: 'Day 5', task: 'Drill flashcards.' },
    { day: 'Day 6', task: 'Practice education-as-path variant.' },
    { day: 'Day 7', task: 'One-pager only from memory.' },
  ],
  sourcesLine:
    'Sources: Constitution of Pakistan (Arts. 25, 34, 35); CEDAW name-level UN framework; FPSC gender and social-issues syllabus themes. Avoid unsourced percentage myths.',
}
