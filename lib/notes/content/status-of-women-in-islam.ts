import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (respectful mainstream FPSC Islamiat syllabus):
 * - Spiritual equality of believers; shared moral accountability
 * - Education encouragement themes; property ownership and contract capacity in classical teaching
 * - Inheritance fixed shares under Quranic rules (name-level; do not invent school-specific tables)
 * - Marriage as contract with mutual rights and duties; mahr; dignified treatment
 * - Distinct from human-rights-in-islam kit: deeper focus on women status cluster alone
 * Avoid polemics, apologetics wars, and contemporary political slogans
 */
export const STATUS_OF_WOMEN_IN_ISLAM_KIT: NoteKitData = {
  id: 'status-of-women-in-islam',
  title: 'Status of Women in Islam',
  subtitle:
    'Spiritual equality, education, property, marriage ethics, and inheritance basics for respectful mainstream Islamiat answers.',
  syllabusTags: [
    'Islamiat',
    'Status of women',
    'Islamic social system',
    'Family ethics',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS / PMS Islamiat',
      directive: 'Discuss',
      angle: 'Status of women in Islam',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Examine',
      angle: 'Rights of women in Islam with reference to education and property',
      frequency: 'high',
    },
    {
      year: 'Islamiat',
      directive: 'Evaluate',
      angle: 'Islamic teachings on family rights and duties of spouses',
      frequency: 'medium',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'Mahr; inheritance share concept; education emphasis themes',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Exam tone: respectful, textual, and analytical. Avoid hostility toward Islam or toward modern rights language; stay with mainstream syllabus points.',
    'Spiritual status: men and women are equal as believers in moral accountability and reward themes commonly taught from Quranic ethics.',
    'Education: seeking knowledge is encouraged for believers; women education and scholarship appear as positive classical and revivalist teaching points in primers.',
    'Economic rights: women may own property, earn, and contract in classical teaching; their wealth is not automatically absorbed by male relatives.',
    'Marriage: a civil-religious contract with offer and acceptance; mahr (dower) is a right of the wife; mutual kindness and responsibility are ethical duties.',
    'Family roles: complementary duties in household and parenting are taught alongside rights; answers should stress dignity and non-oppression (zulm).',
    'Inheritance: Quran fixes shares for heirs including women; shares differ by relation and circumstance. State the principle of guaranteed female inheritance without inventing full school tables.',
    'Method close: present rights clusters (spiritual, educational, economic, marital, inheritance), note that social practice may lag ideals, and call for education and justice consistent with Islamic ethics.',
  ],
  answerSteps: [
    'Set a respectful analytical tone in the introduction.',
    'State spiritual equality and moral accountability.',
    'Cover education and economic/property rights.',
    'Explain marriage contract, mahr, and mutual duties.',
    'Add inheritance principle carefully.',
    'Close by distinguishing ideals from social practice gaps.',
  ],
  questionVariants: [
    'Discuss the status of women in Islam.',
    'Examine the rights of women in Islam regarding education and property.',
    'Evaluate Islamic teachings on the rights and duties of spouses.',
    'Explain the significance of mahr and inheritance rules for women in Islam.',
  ],
  citations: [
    {
      label: 'Spiritual equality',
      text: 'Believing men and women share moral accountability and reward themes in mainstream teaching.',
    },
    {
      label: 'Economic rights',
      text: 'Ownership, earning, and contract capacity for women are classical syllabus points.',
    },
    {
      label: 'Marriage',
      text: 'Marriage as contract with mahr and mutual kindness duties.',
    },
    {
      label: 'Inheritance',
      text: 'Quranic fixed shares include women; guaranteed inheritance is the key principle for exams.',
    },
  ],
  flashcards: [
    {
      prompt: 'What tone should an Islamiat women-status answer use?',
      answer: 'Respectful, mainstream, analytical; no polemics',
    },
    {
      prompt: 'What spiritual point opens strong answers?',
      answer: 'Equal moral accountability of believing men and women',
    },
    {
      prompt: 'Name two economic rights taught classically.',
      answer: 'Property ownership and capacity to contract/earn',
    },
    {
      prompt: 'What is mahr?',
      answer: 'Dower; a right of the wife in the marriage contract',
    },
    {
      prompt: 'How is marriage framed in syllabus notes?',
      answer: 'As a contract with mutual rights and duties',
    },
    {
      prompt: 'What inheritance principle must you state?',
      answer: 'Women have fixed Quranic shares as heirs',
    },
    {
      prompt: 'Should you invent detailed fiqh share tables?',
      answer: 'No; state principle and avoid fake school-specific grids',
    },
    {
      prompt: 'How does this kit differ from human-rights-in-islam?',
      answer: 'Deeper focus on the women-status cluster alone',
    },
    {
      prompt: 'What closing distinction scores marks?',
      answer: 'Islamic ideals vs social practice gaps; call for justice and education',
    },
    {
      prompt: 'What must you avoid?',
      answer: 'Hostile polemics and slogan-only modern politics',
    },
  ],
  mistakes: [
    {
      trap: 'Writing a polemical culture-war essay.',
      correct: 'Stay with syllabus rights clusters and calm analysis.',
    },
    {
      trap: 'Denying female inheritance.',
      correct: 'Quran fixes shares for women heirs; state that clearly.',
    },
    {
      trap: 'Ignoring education and property rights.',
      correct: 'These are high-yield mainstream points.',
    },
    {
      trap: 'Reducing women only to domestic stereotypes.',
      correct: 'Include spiritual, economic, and legal capacity themes.',
    },
    {
      trap: 'Copying the entire human-rights kit.',
      correct: 'Keep focus on status of women headings.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Five clusters: spiritual, education, property, marriage, inheritance.' },
    { day: 'Day 2', task: 'Mahr and marriage-contract paragraph.' },
    { day: 'Day 3', task: 'Inheritance principle without fake tables.' },
    { day: 'Day 4', task: 'Flashcards.' },
    { day: 'Day 5', task: 'Ideals vs practice closing paragraph.' },
    { day: 'Day 6', task: '15-minute status-of-women essay.' },
    { day: 'Day 7', task: 'Recite one-pager calmly.' },
  ],
  sourcesLine:
    'Sources: mainstream FPSC/CSS Islamiat notes on status of women; spiritual equality; education and property; marriage, mahr, and inheritance principles. Keep respectful and non-polemical. Distinct from the broader human-rights-in-islam kit.',
}
