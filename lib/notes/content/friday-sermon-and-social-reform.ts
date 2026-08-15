import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (Islamiat social role, carefully framed):
 * - Jumuah (Friday) prayer includes two khutbahs (sermons) before the congregational prayer in standard fiqh teaching
 * - Khutbah is a public teaching moment: tawhid, taqwa, social ethics, justice, and community reminders
 * - Social reform angle: khutbah can encourage honesty, anti-usury ethics, family duties, neighbour rights, and civic responsibility themes
 * - Caution: state or political misuse debates exist; exam answers should stress authentic religious ethics, not partisan mobilisation scripts
 * Avoid inventing a single mandatory nationwide sermon text or claiming khutbah replaces all other reform institutions
 */
export const FRIDAY_SERMON_SOCIAL_REFORM_KIT: NoteKitData = {
  id: 'friday-sermon-and-social-reform',
  title: 'Friday Sermon (Khutbah) and Social Reform',
  subtitle:
    'Jumuah khutbah as ethical teaching and community reminder, with careful social-reform framing for Islamiat.',
  syllabusTags: [
    'Islamic Studies',
    'Ibadaat',
    'Jumuah',
    'Khutbah',
    'Islamic ethics',
    'Social reform',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS / PMS Islamiat',
      directive: 'Discuss',
      angle: 'Role of Friday sermon in moral and social reform',
      frequency: 'medium',
    },
    {
      year: 'Islamiat pattern',
      directive: 'Evaluate',
      angle: 'Khutbah as a tool of ethical education in the Muslim community',
      frequency: 'medium',
    },
    {
      year: 'One-paper Islamiat',
      directive: 'MCQ fact',
      angle: 'Jumuah; two khutbahs before prayer themes',
      frequency: 'medium',
    },
    {
      year: 'Islamiat',
      directive: 'Critically examine',
      angle: 'Potential and limits of khutbah-based social reform',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Jumuah (Friday prayer) is a weekly congregational obligation for those required to attend in standard teaching. It includes khutbah (sermon) before the prayer.',
    'Classic fiqh teaching: two khutbahs form the sermon structure before the Friday prayer. The khatib addresses the congregation with Quran, Hadith, and ethical counsel.',
    'Spiritual core: reminder of Allah, taqwa, salah discipline, and accountability in the hereafter. Social reform builds on this moral base rather than replacing it.',
    'Social ethics themes often suitable in khutbah: honesty in trade, avoidance of exploitation, family responsibility, neighbour rights, care for the poor, and rejection of injustice.',
    'Community function: a regular public forum that can correct rumours with knowledge, encourage reconciliation, and promote civic manners consistent with Islamic ethics.',
    'Careful limit: khutbah is religious teaching. Answers should not reduce it to partisan politics. Critically examine responses may note misuse risks when sermons become campaign scripts.',
    'Reform realism: lasting social change also needs law, education, economic opportunity, and personal practice. Khutbah is one powerful weekly lever, not the whole reform state.',
    'Answer close: authentic khutbah strengthens taqwa and social ethics; credibility requires knowledge, sincerity, and community relevance without hate or factional abuse.',
  ],
  answerSteps: [
    'Define Jumuah and the place of khutbah before the prayer.',
    'State the spiritual purpose (taqwa and reminder).',
    'Link ethical themes to social reform examples carefully.',
    'Explain community education and cohesion functions.',
    'Add limits: not partisan mobilisation; not sole reform tool.',
    'Close with sincerity, knowledge, and complementary institutions.',
  ],
  questionVariants: [
    'Discuss the role of the Friday sermon in social reform.',
    'Evaluate khutbah as a means of ethical education in Islam.',
    'Critically examine the potential and limits of Jumuah sermons for reforming society.',
    'How does Jumuah connect worship with community responsibility?',
  ],
  citations: [
    {
      label: 'Jumuah structure',
      text: 'Standard teaching places two khutbahs before the Friday congregational prayer.',
    },
    {
      label: 'Spiritual purpose',
      text: 'Khutbah reminds believers of tawhid, taqwa, and accountability before Allah.',
    },
    {
      label: 'Social ethics',
      text: 'Sermons commonly address honesty, justice, family duties, and care for the vulnerable as Islamic ethics.',
    },
    {
      label: 'Community forum',
      text: 'Weekly congregation makes khutbah a recurring public teaching and cohesion opportunity.',
    },
    {
      label: 'Limit',
      text: 'Khutbah supports reform but does not replace law, education, and personal practice; partisan misuse weakens credibility.',
    },
  ],
  flashcards: [
    {
      prompt: 'What is khutbah in the Jumuah context?',
      answer: 'The Friday sermon delivered before the congregational prayer',
    },
    {
      prompt: 'How many khutbahs are taught in the classic Friday structure?',
      answer: 'Two',
    },
    {
      prompt: 'What is the spiritual core of khutbah?',
      answer: 'Reminder of Allah, taqwa, and accountability',
    },
    {
      prompt: 'Name three social-ethics themes suitable for khutbah.',
      answer: 'Honesty in trade, justice, and care for the poor (also family and neighbour rights)',
    },
    {
      prompt: 'Why is Jumuah powerful for community teaching?',
      answer: 'It is a regular weekly public congregation',
    },
    {
      prompt: 'What misuse risk should critically examine answers note?',
      answer: 'Reducing khutbah to partisan campaign scripts',
    },
    {
      prompt: 'Does khutbah alone complete social reform?',
      answer: 'No; law, education, economy, and personal practice also matter',
    },
    {
      prompt: 'What qualities raise khutbah credibility?',
      answer: 'Knowledge, sincerity, and relevant ethical counsel without hate',
    },
    {
      prompt: 'How should worship and society be linked in answers?',
      answer: 'Taqwa as moral base for social ethics and civic manners',
    },
    {
      prompt: 'What closing line scores?',
      answer: 'Authentic weekly ethics teaching plus complementary reform institutions',
    },
  ],
  mistakes: [
    {
      trap: 'Treating khutbah as optional small talk with no religious structure.',
      correct: 'It is integral to Jumuah teaching, classically as two sermons before prayer.',
    },
    {
      trap: 'Turning the answer into a partisan political manifesto.',
      correct: 'Keep Islamic ethics, taqwa, and community responsibility framing.',
    },
    {
      trap: 'Claiming khutbah alone can fix all social problems.',
      correct: 'It is one lever among law, education, and personal practice.',
    },
    {
      trap: 'Ignoring spiritual purpose and writing only sociology.',
      correct: 'Start with tawhid and taqwa, then social ethics.',
    },
    {
      trap: 'Inventing a single mandatory national sermon text as fiqh fact.',
      correct: 'Themes are guided by Quran and Sunnah; exact wording varies by khatib and context.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Jumuah + two khutbahs structure.' },
    { day: 'Day 2', task: 'Spiritual purpose paragraph.' },
    { day: 'Day 3', task: 'Social ethics theme list.' },
    { day: 'Day 4', task: 'Limits and misuse caution.' },
    { day: 'Day 5', task: 'Flashcards.' },
    { day: 'Day 6', task: '10-minute critically examine outline.' },
    { day: 'Day 7', task: 'Recite one-pager.' },
  ],
  sourcesLine:
    'Sources: standard Islamiat teaching on Jumuah and khutbah; Islamic ethics primers on social responsibility. Avoid partisan sermon scripts and overclaiming reform monopoly.',
}
