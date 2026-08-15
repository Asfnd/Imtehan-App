import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (media ethics + Pakistan governance framing):
 * - Article 19: freedom of speech/expression with reasonable constitutional restrictions
 * - Media ethics themes: accuracy, fairness, privacy, harm avoidance, conflict of interest, hate speech caution
 * - Democracy frame: watchdog role needs responsibility; ethics is not only law
 * Avoid inventing fake press codes as permanent nationwide statutes or fixed global rankings
 */
export const MEDIA_ETHICS_PAKISTAN_KIT: NoteKitData = {
  id: 'media-ethics-pakistan',
  title: 'Media Ethics in Pakistan',
  subtitle:
    'Article 19 frame, journalistic ethics principles, and responsible media for CSS ethics and governance.',
  syllabusTags: [
    'Media ethics',
    'Journalism ethics',
    'Article 19',
    'Governance',
    'Ethics and civics',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS / PMS',
      directive: 'Discuss',
      angle: 'Media ethics and democratic responsibility',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Critically examine',
      angle: 'Freedom of expression vs responsible journalism',
      frequency: 'high',
    },
    {
      year: 'Ethics / Civics',
      directive: 'Evaluate',
      angle: 'Sensationalism, privacy, and public interest',
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
    'Media ethics: professional standards that guide truthful, fair, and non-harmful reporting beyond the minimum of what the law allows.',
    'Article 19 frame: freedom of speech and expression is a fundamental right, subject to reasonable restrictions in the Constitution. Ethics operates inside and alongside this legal frame.',
    'Core principles (exam list): accuracy and verification; fairness and balance; distinction of news and opinion; respect for privacy; minimising harm; avoiding conflict of interest; refusing hate, incitement, and fabricated content.',
    'Public interest test: disclosure may be justified when it serves accountability and citizen welfare; curiosity and ratings are not the same as public interest.',
    'Pakistan governance link: media can strengthen democracy as a watchdog, but sensationalism, polarisation, and unverified claims weaken trust and public order debates.',
    'Self-regulation and professional codes appear in teaching as ethics tools. Cite as principles and institutional ideas; do not invent a single permanent nationwide code text as certainty.',
    'Exam close: free media with ethical responsibility supports informed citizenship and good governance.',
  ],
  answerSteps: [
    'Define media ethics as professional standards, not only state law.',
    'State Article 19 freedom with reasonable restrictions carefully.',
    'List core ethics principles (accuracy, fairness, privacy, harm, conflicts).',
    'Apply public interest vs sensationalism distinction.',
    'Link to democracy: watchdog role needs credibility.',
    'Close with responsible freedom as governance asset.',
  ],
  questionVariants: [
    'Discuss the importance of media ethics in Pakistan.',
    'Critically examine freedom of expression with reference to responsible journalism.',
    'Evaluate sensationalism as an ethical problem in media.',
    'Freedom without responsibility weakens democracy. Discuss in the context of media ethics.',
  ],
  citations: [
    {
      label: 'Article 19',
      text: 'The Constitution guarantees freedom of speech and expression, subject to reasonable restrictions set out in Article 19.',
    },
    {
      label: 'Ethics vs law',
      text: 'Media ethics are professional standards of truthfulness and fairness that go beyond mere legal compliance.',
    },
    {
      label: 'Core principles',
      text: 'Accuracy, fairness, privacy, harm minimisation, and conflict-of-interest avoidance are standard ethics teaching pillars.',
    },
    {
      label: 'Public interest',
      text: 'Public interest means accountability and citizen welfare, not ratings-driven curiosity alone.',
    },
    {
      label: 'Democracy link',
      text: 'A credible watchdog media supports informed citizenship; sensationalism and fabrication weaken democratic trust.',
    },
  ],
  flashcards: [
    {
      prompt: 'What is media ethics in one line?',
      answer: 'Professional standards for truthful, fair, and non-harmful journalism',
    },
    {
      prompt: 'Which constitutional article frames speech/expression?',
      answer: 'Article 19',
    },
    {
      prompt: 'Name four media ethics principles.',
      answer: 'Accuracy, fairness, privacy, and harm minimisation',
    },
    {
      prompt: 'What is the public interest test?',
      answer: 'Disclosure justified by accountability/citizen welfare, not ratings curiosity',
    },
    {
      prompt: 'Why can sensationalism be unethical?',
      answer: 'It trades verification and harm avoidance for attention',
    },
    {
      prompt: 'Should ethics equal only what the law allows?',
      answer: 'No; ethics can require higher professional standards than bare legality',
    },
    {
      prompt: 'Name one conflict-of-interest trap.',
      answer: 'Reporting that serves undisclosed personal, political, or commercial interests',
    },
    {
      prompt: 'What democratic role needs ethical media?',
      answer: 'Watchdog / accountability role with public trust',
    },
    {
      prompt: 'What closing line scores?',
      answer: 'Free media with ethical responsibility supports informed citizenship',
    },
  ],
  mistakes: [
    {
      trap: 'Treating Article 19 as absolute freedom with no restrictions.',
      correct: 'Article 19 includes reasonable constitutional restrictions; ethics still applies.',
    },
    {
      trap: 'Equating ethics with state censorship.',
      correct: 'Ethics is primarily professional responsibility; law is a separate but related frame.',
    },
    {
      trap: 'Inventing a fake permanent nationwide press code text.',
      correct: 'Use principles and self-regulation themes without fake statute certainty.',
    },
    {
      trap: 'Defending any content as public interest.',
      correct: 'Public interest is accountability and welfare, not sensational curiosity.',
    },
    {
      trap: 'Ignoring privacy and harm.',
      correct: 'Accuracy alone is not enough; minimise harm and respect dignity.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Article 19 freedom + restrictions carefully.' },
    { day: 'Day 2', task: 'Core ethics principles list.' },
    { day: 'Day 3', task: 'Public interest vs sensationalism examples.' },
    { day: 'Day 4', task: 'Flashcards.' },
    { day: 'Day 5', task: 'Democracy/watchdog paragraph.' },
    { day: 'Day 6', task: '10-minute critically examine outline.' },
    { day: 'Day 7', task: 'Recite one-pager.' },
  ],
  sourcesLine:
    'Sources: Constitution Article 19 teaching, standard media ethics primers (accuracy, fairness, privacy, harm), and Pakistan governance notes on responsible media. Avoid invented code texts and fixed rankings.',
}
