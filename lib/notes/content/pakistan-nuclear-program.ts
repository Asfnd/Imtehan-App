import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (public exam-level facts only):
 * - Pakistan conducted nuclear tests in May 1998 at Chagai (Balochistan)
 * - Commonly taught dates: 28 May 1998 (Chagai-I) and 30 May 1998 (Chagai-II)
 * - Deterrence doctrine taught at syllabus level: credible minimum deterrence / strategic stability framing
 * - Pakistan is not a party to the Nuclear Non-Proliferation Treaty (NPT)
 * - No classified claims, yields, or facility secrets
 */
export const PAKISTAN_NUCLEAR_PROGRAM_KIT: NoteKitData = {
  id: 'pakistan-nuclear-program',
  title: 'Pakistan Nuclear Program (Exam Facts)',
  subtitle:
    '1998 Chagai tests, deterrence teaching points, and NPT non-member status for Pakistan Affairs exams.',
  syllabusTags: [
    'Pakistan Affairs',
    'Nuclear policy',
    'Foreign policy',
    'Strategic studies basics',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS / PMS',
      directive: 'Discuss',
      angle: 'Significance of Pakistan’s nuclear tests of 1998',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Evaluate',
      angle: 'Nuclear deterrence and strategic stability in South Asia',
      frequency: 'high',
    },
    {
      year: 'One-paper / MPT',
      directive: 'MCQ fact',
      angle: 'Chagai, May 1998, NPT status',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Critically examine',
      angle: 'Non-proliferation regime and Pakistan’s position',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Pakistan conducted nuclear tests in May 1998 at the Chagai site in Balochistan. Exam labels: Chagai-I (28 May 1998) and Chagai-II (30 May 1998).',
    'These tests followed India’s May 1998 tests in the same month. Answers should stay factual and non-sensational.',
    'Public teaching frames Pakistan’s nuclear capability as a deterrence tool for strategic stability, often summarised as credible minimum deterrence in syllabus language.',
    'Do not invent yield numbers, warhead counts, or secret facility claims. Exams reward accurate dates, place, and policy vocabulary, not classified detail.',
    'Nuclear Non-Proliferation Treaty (NPT): cornerstone global non-proliferation treaty. Pakistan is not a party to the NPT (non-member status). India is also outside the NPT as a non-party in the same broad teaching point.',
    'Related vocabulary for essays: deterrence, strategic stability, command and control (at principle level only), export controls, and responsible stewardship. Avoid partisan or conspiratorial narratives.',
    'Youm-e-Takbir is the national remembrance associated with 28 May in public culture. Use it as a date marker, not as technical proof.',
    'Exam use: foreign policy, security dilemma with India, non-proliferation debates, and May 1998 chronology.',
  ],
  answerSteps: [
    'State the hard facts: May 1998, Chagai, Balochistan; 28 and 30 May labels.',
    'Place the tests in the regional context of India’s May 1998 tests without inflammatory language.',
    'Explain deterrence at teaching level: discourage aggression by raising costs; credible minimum deterrence phrasing.',
    'Add NPT non-member status as a non-proliferation regime fact.',
    'Close with responsibility and stability themes, not technical secrets.',
  ],
  questionVariants: [
    'Discuss the significance of Pakistan’s nuclear tests of May 1998.',
    'Evaluate nuclear deterrence as a factor in South Asian strategic stability.',
    'Critically examine Pakistan’s position toward the Nuclear Non-Proliferation Treaty.',
    'How should a CSS answer explain Chagai without sensationalism? Discuss the key facts.',
  ],
  citations: [
    {
      label: 'Tests',
      text: 'Pakistan nuclear tests at Chagai, Balochistan, May 1998 (Chagai-I 28 May; Chagai-II 30 May).',
    },
    {
      label: 'Doctrine teaching',
      text: 'Syllabus-level framing: nuclear capability for deterrence and strategic stability; often summarised as credible minimum deterrence.',
    },
    {
      label: 'NPT',
      text: 'Pakistan is not a party to the Nuclear Non-Proliferation Treaty (NPT).',
    },
    {
      label: 'Scope limit',
      text: 'Public exam facts only. No classified yields, inventories, or site secrets.',
    },
  ],
  flashcards: [
    {
      prompt: 'In which month and year did Pakistan conduct nuclear tests?',
      answer: 'May 1998',
    },
    {
      prompt: 'Where were the tests conducted?',
      answer: 'Chagai, Balochistan',
    },
    {
      prompt: 'What is the date of Chagai-I?',
      answer: '28 May 1998',
    },
    {
      prompt: 'What is the date of Chagai-II?',
      answer: '30 May 1998',
    },
    {
      prompt: 'What public name is linked to 28 May remembrance?',
      answer: 'Youm-e-Takbir',
    },
    {
      prompt: 'What deterrence phrase is common in syllabus teaching?',
      answer: 'Credible minimum deterrence',
    },
    {
      prompt: 'What does deterrence mean at exam level?',
      answer: 'Discouraging aggression by raising the cost of attack',
    },
    {
      prompt: 'Is Pakistan a party to the NPT?',
      answer: 'No',
    },
    {
      prompt: 'What does NPT stand for?',
      answer: 'Nuclear Non-Proliferation Treaty',
    },
    {
      prompt: 'Which neighbouring state’s May 1998 tests are usually linked in chronology?',
      answer: 'India',
    },
    {
      prompt: 'What should you avoid in nuclear-program answers?',
      answer: 'Classified yields, warhead counts, and secret facility claims',
    },
    {
      prompt: 'Name one responsible essay theme beyond the blast date.',
      answer: 'Strategic stability, command responsibility at principle level, or export-control norms',
    },
  ],
  mistakes: [
    {
      trap: 'Writing that Pakistan joined the NPT after 1998.',
      correct: 'Pakistan remains outside the NPT as a non-party.',
    },
    {
      trap: 'Giving invented megaton figures or warhead totals.',
      correct: 'Stick to public dates, place, and doctrine vocabulary.',
    },
    {
      trap: 'Confusing Chagai with Pokhran as Pakistan’s site.',
      correct: 'Pokhran is India’s test site label. Pakistan’s 1998 tests are Chagai.',
    },
    {
      trap: 'Dating the tests to 1999 or 1974.',
      correct: 'Pakistan’s tests: May 1998. Do not mix with other regional nuclear milestones.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Memorise Chagai, May 1998, 28 and 30 May.' },
    { day: 'Day 2', task: 'Learn deterrence and NPT non-member lines.' },
    { day: 'Day 3', task: 'Write a calm 10-minute significance outline.' },
    { day: 'Day 4', task: 'Flashcards on dates and vocabulary.' },
    { day: 'Day 5', task: 'Practice one critically examine answer on NPT.' },
    { day: 'Day 6', task: 'Review mistake traps (Pokhran, yields, NPT).' },
    { day: 'Day 7', task: 'One-pager only. Recite facts without sensational extras.' },
  ],
  sourcesLine:
    'Sources: public record of May 1998 Chagai tests; standard CSS Pakistan Affairs teaching on deterrence and NPT non-party status. No classified or speculative technical claims.',
}
