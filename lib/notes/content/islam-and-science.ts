import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (mainstream CSS Islamiat "Islam and Science" theme):
 * - Quranic encouragement of reflection, knowledge, and observation (concept level; avoid inventing verse numbers unless sure)
 * - Harmony of revelation and reason in syllabus teaching (not conflict narrative)
 * - Historical Muslim contribution bridge (link carefully to civilization kit names)
 * - Ethics of science: benefit humanity, avoid harm; knowledge as trust
 * Avoid sectarian debates, pseudoscience miracles lists, and exaggerated "Islam invented modern science" claims
 */
export const ISLAM_AND_SCIENCE_KIT: NoteKitData = {
  id: 'islam-and-science',
  title: 'Islam and Science',
  subtitle:
    'Knowledge ethic, reflection, and Muslim scientific tradition for CSS Islamiat, without exaggerated claims.',
  syllabusTags: [
    'Islamic Studies',
    'Islam and science',
    'Knowledge in Islam',
    'FPSC Islamiat',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS / PMS Islamiat',
      directive: 'Discuss',
      angle: 'Islam and science: compatibility and contribution',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Evaluate',
      angle: 'Role of Muslim scholars in the development of science',
      frequency: 'high',
    },
    {
      year: 'CSS / PMS',
      directive: 'Explain',
      angle: 'Islamic emphasis on knowledge and observation',
      frequency: 'high',
    },
    {
      year: 'One-paper / MPT',
      directive: 'MCQ fact',
      angle: 'Names linked to medicine, maths, optics in Islamic civilization',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Islamiat syllabus treats science as organised study of nature and useful knowledge, not as hostility to faith. The theme is harmony: seek knowledge, reflect on creation, serve human welfare.',
    'Knowledge ethic: seeking useful knowledge is encouraged in mainstream teaching. Ignorance is not praised. Learning is linked to responsibility and humility before God.',
    'Reflection theme: believers are urged to observe heavens, earth, and living systems as signs (ayat) inviting thought. This supports a culture of curiosity without turning every natural fact into a forced miracle claim.',
    'Reason and revelation: syllabus answers usually reject a false choice between faith and science. Revelation guides purpose and ethics; empirical methods study how the world works.',
    'Historical bridge: Muslim civilization hosted translation, hospitals, observatories, and scholars in medicine, mathematics, optics, and astronomy (Ibn Sina, Al-Razi, Al-Khwarizmi, Ibn al-Haytham, Al-Biruni as name-level examples).',
    'Method lesson: observation, recording, and careful reasoning mattered in that tradition. Credit transmission of knowledge across cultures honestly.',
    'Ethics of science today: pursue benefit, avoid harm, protect life and environment, and reject knowledge used for oppression. Technology needs moral limits.',
    'Answer close: revive research culture, fund education, integrate ethics with STEM, and avoid both anti-science rhetoric and exaggerated historical slogans.',
  ],
  answerSteps: [
    'Define the topic as compatibility of faith ethic with scientific inquiry.',
    'Explain the knowledge and reflection themes carefully.',
    'Give two or three measured historical examples with correct fields.',
    'Add ethics of modern science (benefit, harm prevention).',
    'Reject both science-denial and miracle-list exaggeration.',
    'Conclude with education, research, and moral responsibility.',
  ],
  questionVariants: [
    'Discuss the relationship between Islam and science.',
    'Evaluate Muslim contributions to scientific knowledge.',
    'How does Islam encourage the pursuit of knowledge?',
    'What ethical limits should guide scientific progress in an Islamic perspective?',
  ],
  citations: [
    {
      label: 'Knowledge ethic',
      text: 'Mainstream teaching encourages useful knowledge and reflection on creation.',
    },
    {
      label: 'Harmony frame',
      text: 'Revelation guides purpose/ethics; empirical study explains natural processes.',
    },
    {
      label: 'Historical names',
      text: 'Ibn Sina, Al-Razi, Al-Khwarizmi, Ibn al-Haytham appear as syllabus-safe examples.',
    },
    {
      label: 'Ethics',
      text: 'Science should benefit humanity and avoid harm; knowledge is a trust.',
    },
  ],
  flashcards: [
    {
      prompt: 'What exam frame should open the answer?',
      answer: 'Harmony of faith ethic and scientific inquiry, not conflict',
    },
    {
      prompt: 'What is the knowledge ethic in one line?',
      answer: 'Seek useful knowledge with responsibility and humility',
    },
    {
      prompt: 'What does reflection on creation support?',
      answer: 'Curiosity and observation without forced miracle lists',
    },
    {
      prompt: 'Name three scholar-field pairs.',
      answer: 'Ibn Sina medicine; Al-Khwarizmi maths; Ibn al-Haytham optics',
    },
    {
      prompt: 'What institutional themes can you cite?',
      answer: 'Translation, hospitals, observatories, libraries',
    },
    {
      prompt: 'How to treat transmission of knowledge?',
      answer: 'Honest cross-cultural credit; no monopoly slogans',
    },
    {
      prompt: 'What modern ethics point scores?',
      answer: 'Benefit humanity; prevent harm; moral limits on technology',
    },
    {
      prompt: 'What two extremes should you avoid?',
      answer: 'Anti-science rhetoric and exaggerated invention claims',
    },
    {
      prompt: 'What closing policy line helps?',
      answer: 'Fund education/research and integrate ethics with STEM',
    },
    {
      prompt: 'Should you invent verse numbers?',
      answer: 'No; keep to concept-level Quranic themes unless sure',
    },
  ],
  mistakes: [
    {
      trap: 'Writing a miracle catalogue as science.',
      correct: 'Use knowledge ethic, history, and method carefully.',
    },
    {
      trap: 'Claiming Muslims invented all modern science.',
      correct: 'Give measured contributions and transmission honesty.',
    },
    {
      trap: 'Declaring faith and science always at war.',
      correct: 'Syllabus expects compatibility with ethical guidance.',
    },
    {
      trap: 'Listing names without fields.',
      correct: 'Pair each scholar with a clear domain.',
    },
    {
      trap: 'Ignoring ethics of modern technology.',
      correct: 'Benefit and harm prevention close the essay well.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Harmony frame + knowledge ethic paragraph.' },
    { day: 'Day 2', task: 'Four scholar-field flash facts.' },
    { day: 'Day 3', task: 'Ethics of science paragraph.' },
    { day: 'Day 4', task: 'Flashcards.' },
    { day: 'Day 5', task: 'Link to Islamic civilization kit names.' },
    { day: 'Day 6', task: '10-minute Islam and science outline.' },
    { day: 'Day 7', task: 'Recite one-pager.' },
  ],
  sourcesLine:
    'Sources: mainstream CSS Islamiat notes on Islam and science; Muslim civilization contribution primers. Avoid pseudoscience lists and exaggerated historical claims.',
}
