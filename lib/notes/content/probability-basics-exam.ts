import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (one-paper / aptitude probability basics):
 * - Probability of event = favourable / total equally likely outcomes (classical definition)
 * - Range: 0 <= P(E) <= 1; P(certain)=1; P(impossible)=0
 * - Complement: P(not E) = 1 - P(E)
 * - Addition for mutually exclusive events: P(A or B) = P(A)+P(B); general: P(A)+P(B)-P(A and B)
 * - Independent events: P(A and B) = P(A)P(B)
 * Keep handwritten MCQ methods; avoid advanced distributions beyond one-paper scope
 */
export const PROBABILITY_BASICS_EXAM_KIT: NoteKitData = {
  id: 'probability-basics-exam',
  title: 'Probability Basics for One-Paper Exams',
  subtitle:
    'Classical probability, complements, mutually exclusive and independent events for CSS/PPSC aptitude MCQs.',
  syllabusTags: [
    'General math',
    'Probability',
    'One-paper math',
    'Aptitude',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'One-paper',
      directive: 'MCQ',
      angle: 'Classical probability favourable/total',
      frequency: 'high',
    },
    {
      year: 'One-paper',
      directive: 'MCQ',
      angle: 'Complement rule',
      frequency: 'high',
    },
    {
      year: 'CSS / PMS aptitude pattern',
      directive: 'Solve',
      angle: 'Mutually exclusive vs independent events',
      frequency: 'high',
    },
    {
      year: 'One-paper',
      directive: 'MCQ',
      angle: 'Cards, coins, dice basic problems',
      frequency: 'high',
    },
  ],
  onePager: [
    'Classical definition (equally likely outcomes): P(E) = number of favourable outcomes / total outcomes.',
    'Bounds: probability is always between 0 and 1 inclusive. Impossible event has probability 0; certain event has probability 1.',
    'Complement rule: P(E) + P(not E) = 1, so P(not E) = 1 - P(E). Use this when "at least one" counting is hard.',
    'Mutually exclusive (disjoint) events cannot happen together. For two mutually exclusive events, P(A or B) = P(A) + P(B).',
    'General addition (when overlap possible): P(A or B) = P(A) + P(B) - P(A and B).',
    'Independent events: occurrence of one does not change the other. Then P(A and B) = P(A) x P(B).',
    'Coins/dice/cards: list sample space carefully (coin: 2 faces; die: 6 faces; cards: 52 with 4 suits / 13 ranks in standard deck teaching).',
    'Exam method: write total and favourable counts explicitly; check whether events are exclusive or independent before picking a formula.',
  ],
  answerSteps: [
    'Identify the sample space and whether outcomes are equally likely.',
    'Count favourable outcomes for the asked event.',
    'Apply P = favourable/total, or complement if easier.',
    'If two events, decide exclusive vs overlapping vs independent.',
    'Use addition or multiplication formula accordingly and simplify.',
  ],
  questionVariants: [
    'A fair die is rolled. Find the probability of getting an even number.',
    'Find the probability of not getting a head in a single fair coin toss.',
    'If P(A)=0.3, P(B)=0.4, and A,B mutually exclusive, find P(A or B).',
    'Two fair coins are tossed. Find the probability of two heads if tosses are independent.',
  ],
  citations: [
    {
      label: 'Classical probability',
      text: 'P(E) = favourable / total equally likely outcomes.',
    },
    {
      label: 'Complement',
      text: 'P(not E) = 1 - P(E).',
    },
    {
      label: 'Mutually exclusive',
      text: 'P(A or B) = P(A) + P(B) when A and B cannot occur together.',
    },
    {
      label: 'Independent',
      text: 'P(A and B) = P(A)P(B) when events are independent.',
    },
  ],
  flashcards: [
    {
      prompt: 'Classical probability formula?',
      answer: 'Favourable outcomes / total equally likely outcomes',
    },
    {
      prompt: 'Range of any probability?',
      answer: '0 to 1 inclusive',
    },
    {
      prompt: 'Complement rule?',
      answer: 'P(not E) = 1 - P(E)',
    },
    {
      prompt: 'Mutually exclusive addition rule?',
      answer: 'P(A or B) = P(A) + P(B)',
    },
    {
      prompt: 'General addition rule?',
      answer: 'P(A or B) = P(A) + P(B) - P(A and B)',
    },
    {
      prompt: 'Independent multiplication rule?',
      answer: 'P(A and B) = P(A) x P(B)',
    },
    {
      prompt: 'P(even) on a fair die?',
      answer: '3/6 = 1/2',
    },
    {
      prompt: 'When is complement especially useful?',
      answer: 'At least one problems where direct counting is messy',
    },
    {
      prompt: 'Standard deck size in exam teaching?',
      answer: '52 cards',
    },
    {
      prompt: 'Before choosing a formula, check what?',
      answer: 'Whether events are exclusive, overlapping, or independent',
    },
  ],
  mistakes: [
    {
      trap: 'Adding probabilities for independent and events.',
      correct: 'For and with independence, multiply; addition is for or.',
    },
    {
      trap: 'Using P(A)+P(B) when events can overlap.',
      correct: 'Subtract P(A and B) unless mutually exclusive.',
    },
    {
      trap: 'Forgetting equally likely assumption.',
      correct: 'Classical formula needs equally likely outcomes.',
    },
    {
      trap: 'Writing probabilities greater than 1.',
      correct: 'Recount favourable/total; check arithmetic.',
    },
    {
      trap: 'Confusing mutually exclusive with independent.',
      correct: 'Exclusive means cannot occur together; independent means no influence.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Memorise classical definition and bounds.' },
    { day: 'Day 2', task: 'Complement drills (10 MCQs).' },
    { day: 'Day 3', task: 'Mutually exclusive vs general addition table.' },
    { day: 'Day 4', task: 'Independent events multiplication drills.' },
    { day: 'Day 5', task: 'Coins, dice, cards mixed set.' },
    { day: 'Day 6', task: 'Flashcards + mistake traps.' },
    { day: 'Day 7', task: 'Timed 15-question probability quiz.' },
  ],
  sourcesLine:
    'Sources: standard one-paper general math / aptitude primers on classical probability, complements, mutually exclusive and independent events. Stay within basic MCQ scope; avoid advanced distributions.',
}
