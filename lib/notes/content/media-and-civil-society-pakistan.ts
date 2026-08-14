import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked:
 * - Article 19: freedom of speech/expression subject to reasonable restrictions in the Constitution
 * - Media and civil society: agenda setting, accountability, civic voice; not unlimited rights
 * - Democracy frame: informed public, watchdog role, participation space
 * - Careful: do not invent fake press-freedom rankings as if fixed forever
 */
export const MEDIA_CIVIL_SOCIETY_PAKISTAN_KIT: NoteKitData = {
  id: 'media-and-civil-society-pakistan',
  title: 'Media and Civil Society in Pakistan',
  subtitle:
    'Democratic roles of media and civil society, Article 19 frame, and balanced CSS answer structure.',
  syllabusTags: [
    'Governance',
    'Democracy',
    'Human rights',
    'Pakistan Affairs',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS pattern',
      directive: 'Discuss',
      angle: 'Role of media in strengthening democracy in Pakistan',
      frequency: 'high',
    },
    {
      year: 'CSS / PMS',
      directive: 'Critically examine',
      angle: 'Civil society and democratic accountability',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Evaluate',
      angle: 'Freedom of expression under Article 19',
      frequency: 'medium',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'Article 19 freedom of speech/expression',
      frequency: 'high',
    },
  ],
  onePager: [
    'Media in democracy: informs citizens, sets agendas, scrutinises power, and shapes public debate.',
    'Civil society: organised non-state actors (NGOs, professional bodies, community groups, advocacy networks) that voice interests and demand accountability.',
    'Article 19 frame: freedom of speech and expression is a fundamental right, subject to reasonable restrictions as provided in the Constitution.',
    'Healthy democracy needs both voice and responsibility: free expression plus legality, ethics, and protection against hate, defamation, and disorder where the text allows restrictions.',
    'Opportunities: transparency, human rights awareness, policy debate, disaster and public-service communication.',
    'Constraints: ownership concentration, polarisation, safety of journalists and activists, regulatory overreach fears, and weak civic capacity outside big cities.',
    'Exam rule: define roles → cite Article 19 carefully → give one opportunity and one constraint → close with accountable democracy, not slogan freedom.',
  ],
  answerSteps: [
    'Define media and civil society as democratic intermediaries, not as government.',
    'State Article 19: freedom of speech/expression with constitutional reasonable restrictions.',
    'Explain positive roles: information, watchdog function, participation, rights awareness.',
    'Add limits and risks: polarisation, capture, safety, and misuse of restrictions.',
    'Link to good governance: transparency needs credible institutions and civic ethics.',
    'Close with balance: democracy needs open voice and rule-bound responsibility.',
  ],
  questionVariants: [
    'Discuss the role of media in Pakistan\'s democracy.',
    'Critically examine the contribution of civil society to good governance.',
    'Evaluate freedom of expression in Pakistan with reference to Article 19.',
    'Media freedom without media responsibility weakens democracy. Discuss.',
  ],
  citations: [
    {
      label: 'Article 19',
      text: 'The Constitution guarantees freedom of speech and expression, subject to reasonable restrictions set out in Article 19.',
    },
    {
      label: 'Media role',
      text: 'In democratic theory and exam answers, media informs the public and acts as a watchdog on power.',
    },
    {
      label: 'Civil society role',
      text: 'Civil society organisations channel citizen voice, advocacy, and social accountability outside formal state organs.',
    },
    {
      label: 'Balance line',
      text: 'Rights to expression coexist with constitutional grounds for reasonable restriction; answers should not claim absolute speech.',
    },
  ],
  flashcards: [
    {
      prompt: 'Which Article frames freedom of speech/expression?',
      answer: 'Article 19',
    },
    {
      prompt: 'Is Article 19 an absolute right?',
      answer: 'No. It is subject to reasonable constitutional restrictions',
    },
    {
      prompt: 'Name one democratic role of media.',
      answer: 'Informing citizens or scrutinising power (watchdog)',
    },
    {
      prompt: 'What is civil society in exam language?',
      answer: 'Organised non-state civic actors that voice interests and demand accountability',
    },
    {
      prompt: 'Name one constraint on media/civic space often cited in answers.',
      answer: 'Polarisation, ownership capture, or safety risks',
    },
    {
      prompt: 'What closing balance do examiners like?',
      answer: 'Freedom with responsibility under the Constitution',
    },
  ],
  mistakes: [
    {
      trap: 'Calling Article 19 an absolute unlimited right.',
      correct: 'It includes reasonable restrictions in the constitutional text.',
    },
    {
      trap: 'Treating civil society as only foreign-funded NGOs.',
      correct: 'Include professional, community, and advocacy organisations more broadly.',
    },
    {
      trap: 'Writing only praise of media with no ethics or polarisation line.',
      correct: 'Balanced answers note both watchdog value and quality risks.',
    },
    {
      trap: 'Inventing fixed global ranking numbers as eternal facts.',
      correct: 'Use rankings cautiously, if at all; prefer constitutional and role analysis.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Memorise Article 19 frame in one precise sentence.' },
    { day: 'Day 2', task: 'List three media roles and three civil society roles.' },
    { day: 'Day 3', task: 'Write constraints without slogans.' },
    { day: 'Day 4', task: '10-minute outline on media and democracy.' },
    { day: 'Day 5', task: 'Drill flashcards.' },
    { day: 'Day 6', task: 'Practice the freedom vs responsibility variant.' },
    { day: 'Day 7', task: 'One-pager only from memory.' },
  ],
  sourcesLine:
    'Sources: Constitution of Pakistan Article 19; standard democracy/governance textbooks; FPSC Pakistan Affairs and Essay themes on media and civil society. Avoid unsourced ranking myths.',
}
