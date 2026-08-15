import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (mainstream Islamiat teaching on Ibadah):
 * - Ibadah: worship/servitude to Allah; broader than ritual alone in syllabus essays
 * - Includes ritual pillars and everyday obedience, ethics, and lawful living done for God
 * - Conditions often taught: sincerity (ikhlas), conformity to guidance, and lawful means
 * - Link to pillars without collapsing ibadah to only the five
 * Avoid sectarian disputes on secondary fiqh forms
 */
export const CONCEPT_OF_IBADAH_KIT: NoteKitData = {
  id: 'concept-of-ibadah',
  title: 'Concept of Ibadah (Worship) in Islam',
  subtitle:
    'Broad meaning of worship: rituals, sincerity, and everyday obedience for CSS Islamiat.',
  syllabusTags: [
    'Islamic Studies',
    'Ibadah',
    'Worship',
    'FPSC Islamiat',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS / PMS Islamiat',
      directive: 'Discuss',
      angle: 'Concept of Ibadah in Islam',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Explain',
      angle: 'Ibadah as ritual and as a complete way of life',
      frequency: 'high',
    },
    {
      year: 'CSS / PMS',
      directive: 'Evaluate',
      angle: 'Role of sincerity in worship',
      frequency: 'medium',
    },
    {
      year: 'One-paper / MPT',
      directive: 'MCQ / short',
      angle: 'Pillars as forms of ibadah; meaning of worship',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Ibadah means worship and servitude to Allah. In syllabus teaching it is wider than prayer alone: it covers devotion, obedience, and living by guidance for the sake of God.',
    'Narrow sense: ritual acts such as Salah, Zakat, Sawm, and Hajj (with Shahadah as the foundation of faith). These are core visible forms of worship.',
    'Broad sense: any lawful word or deed done with sincerity for Allah can enter the meaning of ibadah in essay teaching: honesty in work, kindness, seeking knowledge, justice, and avoiding haram.',
    'Purpose: express Tawhid practically, purify the self, discipline desire, and build a moral social order. Worship connects belief to behaviour.',
    'Conditions often stressed: sincerity (ikhlas) so worship is not for show; following prophetic guidance rather than inventing rites; and using lawful means.',
    'Balance: Islam rejects empty ritual without ethics, and also rejects ethics talk that abandons prescribed worship. Both ritual and character matter.',
    'Social dimension: collective prayers, Zakat, and Hajj train solidarity. Private worship trains conscience when no one is watching.',
    'Answer close: define narrow and broad meanings, give pillar examples, stress sincerity, and show how daily conduct becomes worship when aligned with faith.',
  ],
  answerSteps: [
    'Define ibadah as servitude and worship of Allah.',
    'Explain narrow (rituals) and broad (life obedience) meanings.',
    'Link to pillars with one sentence each where useful.',
    'Stress sincerity and conformity to guidance.',
    'Show social and moral outcomes briefly.',
    'Conclude that worship unites belief, ritual, and conduct.',
  ],
  questionVariants: [
    'Discuss the concept of Ibadah in Islam.',
    'Explain how Ibadah covers both rituals and daily life.',
    'Why is sincerity essential in worship?',
    'How do the pillars of Islam express the idea of ibadah?',
  ],
  citations: [
    {
      label: 'Definition',
      text: 'Ibadah is worship and servitude to Allah in mainstream Islamiat teaching.',
    },
    {
      label: 'Broad meaning',
      text: 'Lawful acts done with sincerity for God can fall within worship in essay framing.',
    },
    {
      label: 'Ritual core',
      text: 'Salah, Zakat, Sawm, and Hajj are central ritual forms linked to the pillars.',
    },
    {
      label: 'Sincerity',
      text: 'Ikhlas: worship for Allah, not for reputation or show.',
    },
  ],
  flashcards: [
    {
      prompt: 'Define ibadah in one line.',
      answer: 'Worship and servitude to Allah',
    },
    {
      prompt: 'Narrow vs broad ibadah?',
      answer: 'Rituals vs sincere lawful living for God',
    },
    {
      prompt: 'Name the main ritual forms linked to pillars.',
      answer: 'Salah, Zakat, Sawm, Hajj (with Shahadah as faith foundation)',
    },
    {
      prompt: 'What is ikhlas?',
      answer: 'Sincerity: doing worship for Allah alone',
    },
    {
      prompt: 'Why is showy worship criticised in teaching?',
      answer: 'It breaks sincerity and turns ritual into display',
    },
    {
      prompt: 'Can work be ibadah in essay teaching?',
      answer: 'Yes, if lawful and done with sincere intention for God',
    },
    {
      prompt: 'What balance do examiners reward?',
      answer: 'Rituals plus ethics; not one without the other',
    },
    {
      prompt: 'What social forms train solidarity?',
      answer: 'Collective prayer, Zakat, and Hajj themes',
    },
    {
      prompt: 'What personal form trains conscience?',
      answer: 'Private worship and honest conduct when unseen',
    },
    {
      prompt: 'Should secondary fiqh disputes dominate?',
      answer: 'No; stay with syllabus concept and mainstream conditions',
    },
  ],
  mistakes: [
    {
      trap: 'Reducing ibadah to Salah only.',
      correct: 'Include pillars and the broad life meaning.',
    },
    {
      trap: 'Saying anything a person likes is worship.',
      correct: 'Lawful means, sincerity, and guidance matter.',
    },
    {
      trap: 'Ignoring sincerity.',
      correct: 'Ikhlas is a high-yield essay point.',
    },
    {
      trap: 'Separating ethics from worship completely.',
      correct: 'Syllabus links belief, ritual, and conduct.',
    },
    {
      trap: 'Writing a fiqh fatwa catalogue.',
      correct: 'Keep concept-level Islamiat structure.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Definition + narrow/broad split.' },
    { day: 'Day 2', task: 'Pillars as ritual ibadah.' },
    { day: 'Day 3', task: 'Sincerity and conditions paragraph.' },
    { day: 'Day 4', task: 'Flashcards.' },
    { day: 'Day 5', task: 'Social vs private worship examples.' },
    { day: 'Day 6', task: '10-minute concept essay outline.' },
    { day: 'Day 7', task: 'Recite one-pager.' },
  ],
  sourcesLine:
    'Sources: mainstream CSS Islamiat notes on ibadah, pillars, and sincerity. Avoid sectarian secondary disputes and invented rulings.',
}
