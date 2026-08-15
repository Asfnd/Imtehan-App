import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (Islamiat / ethics syllabus themes):
 * - Khalifah (stewardship) of Earth; amanah (trust); prohibition of israf (waste) and fasad (corruption/spoilage)
 * - Mercy to creatures; balance (mizan); water and resource ethics at principle level
 * - Link to modern environment answers without inventing fake hadith citations
 * - Carefully respectful, mainstream framing
 */
export const ENVIRONMENTAL_ETHICS_ISLAM_KIT: NoteKitData = {
  id: 'environmental-ethics-islam',
  title: 'Environmental Ethics in Islam',
  subtitle:
    'Stewardship, trust, balance, anti-waste, and mercy to creation for Islamiat and ethics answers.',
  syllabusTags: [
    'Islamic ethics',
    'Environment',
    'Khalifah',
    'Amanah',
    'Islamiat',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS / PMS Islamiat',
      directive: 'Discuss',
      angle: 'Islamic teachings on environment and conservation',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Examine',
      angle: 'Concept of khalifah and amanah regarding natural resources',
      frequency: 'high',
    },
    {
      year: 'Ethics / Islamiat',
      directive: 'Evaluate',
      angle: 'Israf and fasad as ethical problems for the environment',
      frequency: 'medium',
    },
    {
      year: 'One-paper',
      directive: 'Short',
      angle: 'Stewardship of Earth in Islam',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Core frame: humans are trustees (khalifah / stewards) on Earth, not absolute owners who may destroy without accountability. Natural resources are an amanah (trust) before God.',
    'Balance (mizan) theme: creation is ordered; excess and disorder harm people and other creatures. Environmental harm is not only technical; it is a moral failure when caused by greed, waste, or negligence.',
    'Israf (wastefulness) and fasad (corruption / spoilage on Earth) are high-yield ethical vocabulary for answers. Link them to overconsumption, pollution, and reckless resource use without inventing fake statistics.',
    'Mercy to creation: kindness to animals, care for plants, and protection of water sources appear as classical ethical themes in mainstream teaching. Planting, not wasting water, and avoiding cruelty are exam-friendly examples.',
    'Social justice link: environmental damage often hits the poor first (floods, smog, unsafe water). Islamic ethics of justice and public interest (maslaha) support conservation policies, clean air/water, and responsible development.',
    'Exam method: define principles (stewardship, trust, balance, anti-waste, mercy), give 2 to 3 concrete applications (water, trees, pollution, climate resilience), then close with accountability and public good. Do not invent weak or fabricated hadith texts.',
  ],
  answerSteps: [
    'Define environmental ethics in Islam through khalifah and amanah.',
    'Add balance (mizan) and condemn israf and fasad.',
    'Give examples: water care, planting, animal mercy, anti-pollution duty.',
    'Link to justice for vulnerable communities.',
    'Close with accountability before God and responsibility to future generations.',
  ],
  questionVariants: [
    'Discuss Islamic teachings on the environment and conservation of resources.',
    'Examine the concepts of khalifah and amanah in relation to nature.',
    'Evaluate the relevance of Islamic ethics to modern environmental crises.',
    'Explain israf and fasad as environmental ethical problems.',
  ],
  citations: [
    {
      label: 'Stewardship',
      text: 'Human role as khalifah (steward) on Earth is a standard Islamiat environmental ethics frame.',
    },
    {
      label: 'Trust',
      text: 'Resources are an amanah; use is accountable, not absolute private destruction rights.',
    },
    {
      label: 'Anti-waste',
      text: 'Israf (waste) and fasad (corruption/spoilage) are key ethical terms for environmental answers.',
    },
    {
      label: 'Mercy',
      text: 'Mercy to animals and care for living creation are mainstream ethical themes in teaching.',
    },
    {
      label: 'Public interest',
      text: 'Maslaha and justice support conservation, clean water/air, and protection of the vulnerable.',
    },
  ],
  flashcards: [
    { prompt: 'What does khalifah mean in environmental ethics answers?', answer: 'Steward / trustee role of humans on Earth' },
    { prompt: 'What is amanah here?', answer: 'Trust: resources held with accountability' },
    { prompt: 'What is israf?', answer: 'Wastefulness / excess' },
    { prompt: 'What is fasad in this context?', answer: 'Corruption or spoilage on Earth' },
    { prompt: 'What is mizan as an ethics theme?', answer: 'Balance / measure in creation' },
    { prompt: 'Name one water ethics point.', answer: 'Do not waste water; protect sources' },
    { prompt: 'Name one mercy-to-creation example.', answer: 'Kindness to animals / planting and care for plants' },
    { prompt: 'How do you link environment to justice?', answer: 'Pollution and disasters hit the poor hardest' },
    { prompt: 'Should you invent hadith quotes for marks?', answer: 'No; use verified principles and careful references' },
    { prompt: 'Name three principle keywords for a quick outline.', answer: 'Khalifah, amanah, israf/fasad (plus mercy/balance)' },
  ],
  mistakes: [
    {
      trap: 'Reducing Islam’s environment teaching to modern slogans only, with no classical concepts.',
      correct: 'Lead with khalifah, amanah, israf, fasad, mercy, and balance.',
    },
    {
      trap: 'Claiming humans have absolute ownership with no moral limits on nature.',
      correct: 'Stewardship and trust imply accountability and limits.',
    },
    {
      trap: 'Inventing fake hadith or exact “green verses” lists from memory.',
      correct: 'Use established principles; cite only what you can verify.',
    },
    {
      trap: 'Ignoring justice: treating environment as only a lifestyle topic.',
      correct: 'Link pollution and disasters to harm against the vulnerable and public interest.',
    },
    {
      trap: 'Dumping Pakistan smog data with no ethical frame when the question is Islamiat.',
      correct: 'If using current examples, still ground them in Islamic ethical principles.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Memorise khalifah, amanah, israf, fasad, mizan.' },
    { day: 'Day 2', task: 'Write three application examples (water, trees, pollution).' },
    { day: 'Day 3', task: '10-minute outline on Islamic environmental ethics.' },
    { day: 'Day 4', task: 'Flashcards twice.' },
    { day: 'Day 5', task: 'Add a justice/maslaha paragraph.' },
    { day: 'Day 6', task: 'Practice evaluate variant with modern crisis link.' },
    { day: 'Day 7', task: 'One-pager only. Recite principle keywords from memory.' },
  ],
  sourcesLine:
    'Sources: mainstream Islamiat ethics teaching on stewardship and anti-waste; FPSC-style environment-in-Islam questions. Avoid fabricated hadith lists.',
}
