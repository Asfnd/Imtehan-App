import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (Islamiat ethics themes, careful Hadith teaching):
 * - Focus on well-known ethical themes attributed in mainstream teaching: honesty, trust (amanah), good manners (akhlaq), kindness, control of anger, truthfulness
 * - Do NOT fabricate exact Arabic text, full isnad chains, or invented Bukhari/Muslim numbers
 * - Phrase as widely taught Prophetic ethical themes / famous meanings; students should verify wording from recognised collections in class notes
 */
export const HADITH_ON_ETHICS_HIGH_YIELD_KIT: NoteKitData = {
  id: 'hadith-on-ethics-high-yield',
  title: 'Hadith on Ethics (High-Yield Themes)',
  subtitle:
    'Honesty, manners, trust, and kindness themes from mainstream Prophetic ethics teaching without fabricated chains.',
  syllabusTags: [
    'Islamic Studies',
    'Hadith ethics',
    'Akhlaq',
    'Islamiat',
    'Moral teachings',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS / PMS Islamiat',
      directive: 'Discuss',
      angle: 'Ethical teachings of the Prophet with reference to Hadith themes',
      frequency: 'high',
    },
    {
      year: 'One-paper / MPT',
      directive: 'MCQ / short',
      angle: 'Honesty, amanah, and good character themes',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Explain',
      angle: 'Akhlaq and social manners in the light of Sunnah',
      frequency: 'high',
    },
    {
      year: 'Islamiat pattern',
      directive: 'Evaluate',
      angle: 'Relevance of Prophetic ethics for modern society',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Islamiat answers on ethics should emphasise that faith is incomplete without good character (akhlaq). Hadith literature is a major source for Prophetic moral guidance alongside the Quran.',
    'Honesty and truthfulness: mainstream teaching stresses speaking truth, avoiding lies and fraud, and integrity in speech and trade. Use the theme; do not invent a fake Arabic sentence or isnad.',
    'Amanah (trust): fulfilling trusts, keeping promises, and responsible use of authority are classic exam themes. Betrayal of trust is condemned in ethical teaching.',
    'Good manners and gentleness: kindness in speech, humility, and courteous dealing with people appear repeatedly in Sunnah ethics notes.',
    'Anger control and forbearance: restraining anger and responding with patience is a high-yield personal ethics point in Islamiat papers.',
    'Mercy and kindness to others: compassion toward the weak, neighbours, and the vulnerable is a standard Prophetic character theme in teaching syllabi.',
    'Method rule for this kit: state the ethical lesson and its social application. If you quote Arabic or a collection name, use only wording verified in your course notes; never fabricate chain numbers.',
    'Answer close: define akhlaq; pick three themes (honesty, amanah, manners); apply to family, market, and public office; link briefly to building a just society.',
  ],
  answerSteps: [
    'Define akhlaq and its link to faith and Sunnah.',
    'Present honesty/truthfulness as a Hadith ethics theme.',
    'Add amanah (trust and promise-keeping).',
    'Add manners, mercy, or anger control as needed by the question.',
    'Apply each theme to a social or administrative example.',
    'Conclude without fabricated Arabic chains or invented reference numbers.',
  ],
  questionVariants: [
    'Discuss the ethical teachings of the Prophet with reference to Hadith themes.',
    'Explain the importance of honesty and trust (amanah) in Islamic ethics.',
    'Evaluate good manners (akhlaq) as a pillar of Muslim social life.',
    'How do Prophetic ethics guide behaviour in public office?',
  ],
  citations: [
    {
      label: 'Akhlaq focus',
      text: 'Faith is linked to good character in mainstream Islamiat ethics teaching.',
    },
    {
      label: 'Honesty theme',
      text: 'Truthfulness and integrity in speech and dealings are classic Prophetic ethics themes.',
    },
    {
      label: 'Amanah theme',
      text: 'Fulfilling trusts and promises is a high-yield Hadith ethics topic.',
    },
    {
      label: 'Method caution',
      text: 'Do not fabricate Arabic text, isnad chains, or collection numbers; verify quotes from recognised notes.',
    },
  ],
  flashcards: [
    {
      prompt: 'What is akhlaq in Islamiat language?',
      answer: 'Moral character and manners',
    },
    {
      prompt: 'Name three high-yield Hadith ethics themes.',
      answer: 'Honesty, amanah (trust), and good manners',
    },
    {
      prompt: 'What does amanah emphasise?',
      answer: 'Fulfilling trusts, promises, and responsible authority',
    },
    {
      prompt: 'Name a personal ethics theme often tested.',
      answer: 'Control of anger / forbearance',
    },
    {
      prompt: 'Name a social ethics theme.',
      answer: 'Kindness, mercy, or good neighbourly conduct',
    },
    {
      prompt: 'Should you invent Bukhari numbers?',
      answer: 'No; never fabricate collection numbers or chains',
    },
    {
      prompt: 'How should Arabic quotes be handled?',
      answer: 'Only use wording verified in recognised course notes',
    },
    {
      prompt: 'Why link ethics to public office?',
      answer: 'Amanah and honesty apply to power and public trust',
    },
    {
      prompt: 'Faith without character is incomplete means?',
      answer: 'Belief should appear as ethical conduct in daily life',
    },
  ],
  mistakes: [
    {
      trap: 'Fabricating Arabic Hadith text or full isnad chains.',
      correct: 'Use verified wording only; otherwise teach the theme in English.',
    },
    {
      trap: 'Inventing Bukhari/Muslim volume-hadith numbers.',
      correct: 'Do not invent reference numbers.',
    },
    {
      trap: 'Writing theology without social application.',
      correct: 'Apply honesty, amanah, and manners to real settings.',
    },
    {
      trap: 'Reducing ethics to rituals only.',
      correct: 'Akhlaq covers speech, trade, trust, and treatment of others.',
    },
    {
      trap: 'Ignoring anger control and gentleness themes.',
      correct: 'Personal restraint is a standard high-yield ethics point.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Akhlaq definition + method caution.' },
    { day: 'Day 2', task: 'Honesty and truthfulness theme.' },
    { day: 'Day 3', task: 'Amanah and public trust.' },
    { day: 'Day 4', task: 'Manners, mercy, anger control.' },
    { day: 'Day 5', task: 'Flashcards.' },
    { day: 'Day 6', task: '10-minute discuss outline.' },
    { day: 'Day 7', task: 'Recite themes without fake chains.' },
  ],
  sourcesLine:
    'Sources: mainstream Islamiat ethics teaching on Prophetic character themes. Verify any Arabic wording or collection references from recognised Hadith notes; do not fabricate chains.',
}
