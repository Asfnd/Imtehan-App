import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (mainstream FPSC Islamiat human rights / ethics teaching):
 * - Dignity (karamah), justice (adl), equality of human origin themes
 * - Women's rights syllabus framing: inheritance, education, contract, dignity (classical teaching points)
 * - Minority protections in classical Madinah / dhimmah teaching at concept level
 * - Link to Maqasid carefully: life, religion, intellect, lineage, property as higher objectives framing
 * Avoid polemics; stick to syllabus-safe classical points
 */
export const HUMAN_RIGHTS_IN_ISLAM_KIT: NoteKitData = {
  id: 'human-rights-in-islam',
  title: 'Human Rights in Islam',
  subtitle:
    'Dignity, justice, women`s rights syllabus framing, minority protections, and a careful Maqasid link for CSS Islamiat.',
  syllabusTags: [
    'Islamic Studies',
    'Human rights in Islam',
    'Maqasid al-Shariah',
    'FPSC Islamiat',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS / PMS Islamiat',
      directive: 'Discuss',
      angle: 'Concept of human rights in Islam',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Examine',
      angle: 'Status and rights of women in Islam (syllabus framing)',
      frequency: 'high',
    },
    {
      year: 'CSS / PMS',
      directive: 'Evaluate',
      angle: 'Protection of minorities in Islamic teaching',
      frequency: 'medium',
    },
    {
      year: 'CSS pattern',
      directive: 'Explain',
      angle: 'Maqasid al-Shariah as a framework for human welfare',
      frequency: 'high',
    },
  ],
  onePager: [
    'Islam links rights to human dignity (karamah) and justice (adl). Human beings are accountable moral agents, not mere subjects of power.',
    'Equality of origin is a common syllabus theme: shared humanity, rejection of racial arrogance (Farewell Sermon theme often cited).',
    'Justice includes fair dealing, due process themes, and prohibition of oppression (zulm) in classical ethics teaching.',
    'Women`s rights in exam framing: spiritual equality as believers; rights to ownership and contract; inheritance share under fixed rules; emphasis on education and dignified treatment. Avoid polemical overclaim or denial.',
    'Family ethics: mutual rights and duties of spouses; care of parents and children as moral obligations in standard notes.',
    'Minority protections: classical teaching stresses security of life, property, and worship arrangements under Muslim governance models (Madinah charter spirit; later dhimmah concept at name level). Frame carefully as historical-legal teaching, not modern politics slogans.',
    'Maqasid al-Shariah (higher objectives): commonly taught as protection of religion, life, intellect, lineage, and property. Use as a welfare and rights framework, not as a freestyle rewrite of all law.',
    'Exam method: define dignity and justice, give concrete rights clusters, then close with Maqasid as the ethical umbrella.',
  ],
  answerSteps: [
    'Define human rights in Islam through dignity and justice, not only through modern charter language.',
    'State equality of human origin and rejection of racial pride.',
    'Present women`s rights points used in the syllabus with balance.',
    'Add minority protection as classical teaching of security and fair dealing.',
    'Link carefully to Maqasid: five objectives as a human-welfare frame.',
    'Close without comparing in a hostile or preachy tone; stay analytical.',
  ],
  questionVariants: [
    'Discuss the concept of human rights in Islam.',
    'Examine the rights of women in Islam with reference to classical teachings.',
    'Evaluate Islamic teachings on the protection of minorities.',
    'Explain how Maqasid al-Shariah support human welfare and rights.',
  ],
  citations: [
    {
      label: 'Dignity and justice',
      text: 'Karamah (dignity) and adl (justice) are core framing ideas in Islamiat human-rights answers.',
    },
    {
      label: 'Women`s rights framing',
      text: 'Syllabus points commonly include spiritual equality, property and contract rights, inheritance rules, and dignified treatment.',
    },
    {
      label: 'Minorities',
      text: 'Classical teaching stresses security and fair dealing; Madinah charter spirit and dhimmah appear at concept level.',
    },
    {
      label: 'Maqasid',
      text: 'Five higher objectives commonly taught: religion, life, intellect, lineage, property.',
    },
    {
      label: 'Farewell Sermon link',
      text: 'Equality and sanctity themes from the Farewell Sermon are often used as ethical support.',
    },
  ],
  flashcards: [
    { prompt: 'Arabic term often used for human dignity?', answer: 'Karamah' },
    { prompt: 'Arabic term for justice in this topic?', answer: 'Adl' },
    { prompt: 'What is zulm in ethics answers?', answer: 'Oppression / injustice' },
    { prompt: 'Name one women`s rights point used in CSS framing.', answer: 'Property ownership / inheritance share / education / dignified treatment' },
    { prompt: 'Are men and women equal as believers in syllabus teaching?', answer: 'Yes, in spiritual accountability and faith' },
    { prompt: 'Name one minority-protection idea in classical teaching.', answer: 'Security of life and property / freedom of worship arrangements under pact models' },
    { prompt: 'What document spirit is often cited for early coexistence?', answer: 'Charter of Madinah' },
    { prompt: 'What is dhimmah at name level?', answer: 'Classical protected-community arrangement under Muslim rule' },
    { prompt: 'What does Maqasid al-Shariah mean?', answer: 'Higher objectives of Islamic law' },
    { prompt: 'List the five common Maqasid.', answer: 'Religion, life, intellect, lineage, property' },
    { prompt: 'Which Maqsad covers protection of life?', answer: 'Hifz al-nafs (life)' },
    { prompt: 'Which Maqsad covers intellect / reason?', answer: 'Hifz al-aql' },
    { prompt: 'Exam caution on this topic?', answer: 'Use syllabus framing; avoid polemics and overclaims' },
    { prompt: 'Good closing frame for essays?', answer: 'Dignity + justice + Maqasid as welfare umbrella' },
  ],
  mistakes: [
    {
      trap: 'Copying UDHR article numbers as if they were Quranic verses.',
      correct: 'Use Islamic concepts first; compare with modern charters only if the question asks.',
    },
    {
      trap: 'Denying any women`s rights discussion or making exaggerated modern claims.',
      correct: 'Stay with balanced syllabus points: dignity, property, inheritance, education, fair treatment.',
    },
    {
      trap: 'Using Maqasid to invent any ruling you like.',
      correct: 'Maqasid is a higher-objectives frame, not a free rewrite of all law.',
    },
    {
      trap: 'Treating minority protections as optional charity only.',
      correct: 'Classical teaching frames security and fair dealing as obligations of just order.',
    },
    {
      trap: 'Ignoring justice and reducing the topic to slogans.',
      correct: 'Anchor answers in karamah, adl, concrete rights, then Maqasid.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Define dignity, justice, and shared humanity.' },
    { day: 'Day 2', task: 'Women`s rights syllabus points list.' },
    { day: 'Day 3', task: 'Minority protection concepts (Madinah / dhimmah name level).' },
    { day: 'Day 4', task: 'Memorise five Maqasid.' },
    { day: 'Day 5', task: 'Write a 12-minute outline linking rights to Maqasid.' },
    { day: 'Day 6', task: 'Flashcards and trap review.' },
    { day: 'Day 7', task: 'One-pager from memory.' },
  ],
  sourcesLine:
    'Sources: standard CSS / PMS Islamiat chapters on human rights, women`s status, minorities, and Maqasid al-Shariah. Keep classical syllabus framing; avoid polemical internet claims.',
}
