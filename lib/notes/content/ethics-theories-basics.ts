import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (standard ethics / public administration teaching):
 * - Utilitarianism: greatest happiness / consequentialist (Bentham, Mill)
 * - Kant: duty, categorical imperative, respect for persons (deontology)
 * - Virtue ethics: character and phronesis (Aristotle tradition)
 * - Rawls: justice as fairness; original position; veil of ignorance
 * Exam use: apply frameworks to civil service dilemmas without partisan claims
 */
export const ETHICS_THEORIES_BASICS_KIT: NoteKitData = {
  id: 'ethics-theories-basics',
  title: 'Ethical Theories for Civil Service Exams',
  subtitle:
    'Utilitarianism, Kantian duty ethics, virtue ethics, and Rawls justice as fairness for public service answers.',
  syllabusTags: [
    'Ethics and integrity',
    'Ethical theories',
    'Public administration ethics',
    'CSS Ethics',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS Ethics pattern',
      directive: 'Discuss',
      angle: 'Utilitarianism vs duty ethics in public decisions',
      frequency: 'high',
    },
    {
      year: 'CSS / PMS',
      directive: 'Critically examine',
      angle: 'Virtue ethics and civil servant character',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Evaluate',
      angle: 'Rawls justice as fairness and equity in policy',
      frequency: 'medium',
    },
    {
      year: 'One-paper / MPT',
      directive: 'MCQ fact',
      angle: 'Names: Bentham, Mill, Kant, Aristotle, Rawls; key terms',
      frequency: 'high',
    },
  ],
  onePager: [
    'Utilitarianism: choose the act with greatest overall good (welfare/happiness). Classic names: Bentham, Mill. Consequentialist.',
    'Utilitarian strength: cost-benefit clarity. Limit: minority rights can be sacrificed for majority gain.',
    'Kant (deontology): act from duty. Categorical imperative: universalizable maxims; treat persons as ends, never merely as means.',
    'Kant strength: protects dignity and honesty when lying seems useful. Limit: colliding duties (truth vs rescue).',
    'Virtue ethics (Aristotle tradition): character first. Courage, temperance, justice, phronesis (practical wisdom).',
    'Rawls, A Theory of Justice (1971): justice as fairness. Original position behind a veil of ignorance.',
    'Rawls priority teaching: equal basic liberties; fair equality of opportunity; difference principle (inequalities benefit the least advantaged).',
    'Exam move: name the theory, state its test, apply one public dilemma (procurement, whistleblowing, allocation), then state one limit.',
  ],
  answerSteps: [
    'Define the dilemma in one line (who is affected, what duty or value is at stake).',
    'Name two theories clearly (for example utilitarianism and Kant) with one accurate label each.',
    'Apply each test to the same facts: outcomes vs duty / dignity.',
    'Bring in virtue ethics if the question is about integrity and character of the civil servant.',
    'Use Rawls only when equity, fairness of institutions, or least-advantaged groups are central.',
    'Close with a balanced judgment: which framework fits best and one honest limit.',
  ],
  questionVariants: [
    'Discuss utilitarianism and Kantian ethics as guides for civil servants facing hard choices.',
    'Critically examine virtue ethics as a foundation for integrity in public service.',
    'Evaluate Rawls justice as fairness for designing equitable public policy.',
    'How would a utilitarian and a Kantian decide differently about lying to protect a policy goal? Discuss.',
  ],
  citations: [
    {
      label: 'Utilitarianism',
      text: 'Consequentialist ethics associated with Bentham and Mill; greatest overall welfare or happiness as the decision test.',
    },
    {
      label: 'Kant',
      text: 'Duty ethics / deontology; categorical imperative; persons as ends in themselves.',
    },
    {
      label: 'Virtue ethics',
      text: 'Character-centred ethics in the Aristotelian tradition; practical wisdom (phronesis) and virtues of the agent.',
    },
    {
      label: 'Rawls',
      text: 'Justice as fairness; original position and veil of ignorance; equal liberties, fair opportunity, difference principle.',
    },
    {
      label: 'Exam use',
      text: 'Apply named frameworks to public service dilemmas; avoid inventing fake quotes or partisan examples.',
    },
  ],
  flashcards: [
    { prompt: 'Utilitarianism type?', answer: 'Consequentialist (outcomes decide)' },
    { prompt: 'Two classic utilitarian thinkers?', answer: 'Jeremy Bentham and John Stuart Mill' },
    { prompt: 'Utilitarian test?', answer: 'Greatest overall good / happiness / welfare' },
    { prompt: 'Common utilitarian criticism?', answer: 'Can sacrifice minority rights for majority gain' },
    { prompt: 'Kant’s ethics type?', answer: 'Duty ethics / deontology' },
    { prompt: 'Kant’s famous moral law idea?', answer: 'Categorical imperative' },
    { prompt: 'Kant on persons?', answer: 'Treat as ends, never merely as means' },
    { prompt: 'Virtue ethics focuses on?', answer: 'Character and virtues of the agent' },
    { prompt: 'Classical virtue ethics thinker?', answer: 'Aristotle' },
    { prompt: 'What is phronesis?', answer: 'Practical wisdom' },
    { prompt: 'Author of A Theory of Justice (1971)?', answer: 'John Rawls' },
    { prompt: 'Rawls’s main label?', answer: 'Justice as fairness' },
    { prompt: 'Veil of ignorance?', answer: 'Choose principles without knowing your own social status' },
    { prompt: 'Difference principle (exam level)?', answer: 'Inequalities should benefit the least advantaged' },
    {
      prompt: 'One public dilemma for application?',
      answer: 'Procurement bias, whistleblowing, or scarce resource allocation',
    },
  ],
  mistakes: [
    {
      trap: 'Calling Kant a utilitarian because he wants good outcomes.',
      correct: 'Kant is duty-based. Outcomes do not decide rightness the utilitarian way.',
    },
    {
      trap: 'Saying virtue ethics is only about feelings.',
      correct: 'It is cultivated character, habits, and practical wisdom, not mood alone.',
    },
    {
      trap: 'Writing that Rawls demands absolute income equality.',
      correct: 'He allows inequalities if they fit fair opportunity and benefit the least advantaged.',
    },
    {
      trap: 'Mixing Bentham and Kant as the same school.',
      correct: 'Bentham: utilitarianism. Kant: duty ethics. Different tests.',
    },
    {
      trap: 'Using partisan Pakistan cases as if they prove a theory.',
      correct: 'Use neutral public service dilemmas and name the ethical test accurately.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Memorise four labels: utilitarianism, Kant duty, virtue, Rawls.' },
    { day: 'Day 2', task: 'Write one sentence test for each theory.' },
    { day: 'Day 3', task: 'Apply utilitarianism vs Kant to one procurement dilemma.' },
    { day: 'Day 4', task: 'Drill flashcards on names and key terms.' },
    { day: 'Day 5', task: 'Write a 10-minute outline on virtue ethics and integrity.' },
    { day: 'Day 6', task: 'Practice a Rawls equity paragraph for policy fairness.' },
    { day: 'Day 7', task: 'One-pager only. Recite limits of each theory from memory.' },
  ],
  sourcesLine:
    'Sources: standard moral philosophy teaching (Bentham, Mill, Kant, Aristotle tradition, Rawls A Theory of Justice); CSS Ethics and Integrity syllabus framing. Keep names and labels accurate; avoid invented quotes.',
}
