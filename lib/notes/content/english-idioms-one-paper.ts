import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked:
 * - Idiom method for one-paper: meaning first, then short sentence, then trap near-synonyms
 * - Twelve high-yield idioms with standard meanings for CSS/PPSC English
 * - No en/em dashes; keep meanings crisp and exam-safe
 */
export const ENGLISH_IDIOMS_ONE_PAPER_KIT: NoteKitData = {
  id: 'english-idioms-one-paper',
  title: 'English Idioms for One-Paper Exams',
  subtitle:
    'A method plus 12 high-yield idioms with meanings for CSS/PPSC English.',
  syllabusTags: [
    'English',
    'Vocabulary',
    'Idioms',
    'One-paper',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS / PPSC',
      directive: 'MCQ fact',
      angle: 'Choose correct meaning of the idiom',
      frequency: 'high',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'Idiom in sentence completion',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Practice',
      angle: 'Replace underlined idiom with correct sense',
      frequency: 'medium',
    },
    {
      year: 'PPSC / NTS',
      directive: 'MCQ fact',
      angle: 'Common figurative expressions',
      frequency: 'high',
    },
  ],
  onePager: [
    'Method: learn meaning → one short example → one near-trap distractor you will reject.',
    'Do not translate idioms word by word. Ask what situation the phrase signals.',
    'In MCQs, eliminate literal readings first (e.g. real cats/dogs in weather idioms).',
    'Group revision beats random lists: success/failure, secrecy, effort, conflict, time.',
    'Twelve high-yield set: break the ice; hit the nail on the head; once in a blue moon; burn the midnight oil; a blessing in disguise; cry over spilt milk; spill the beans; under the weather; the ball is in your court; bite off more than you can chew; call it a day; cost an arm and a leg.',
    'Meanings (crisp): start conversation comfortably; say exactly right; very rarely; study/work late; hidden good in bad event; regret past uselessly; reveal secret; feel unwell; your turn to act; take on too much; stop work for now; very expensive.',
    'Exam rule: if two options feel close, pick the one matching register (formal exam English prefers standard figurative sense).',
  ],
  answerSteps: [
    'Read the full sentence before choosing an idiom meaning.',
    'Reject literal word-by-word glosses.',
    'Match the idiom to situation type (effort, secrecy, rarity, cost, etc.).',
    'If writing, use the idiom sparingly and correctly; one clear example beats stuffing.',
    'Revise with flashcards: prompt = idiom, answer = meaning only first.',
    'Then reverse: prompt = meaning, answer = idiom.',
  ],
  questionVariants: [
    'Choose the correct meaning of: hit the nail on the head.',
    'The project cost an arm and a leg means the project was ___.',
    'Replace the underlined idiom with its nearest meaning.',
    'Which idiom means to reveal a secret?',
  ],
  citations: [
    {
      label: 'Method',
      text: 'One-paper idiom success depends on figurative meaning recognition, not literal translation.',
    },
    {
      label: 'Core set',
      text: 'Twelve repeatedly tested figurative phrases covering start, accuracy, rarity, effort, secrecy, health, turn-taking, overcommitment, stopping, and cost.',
    },
  ],
  flashcards: [
    { prompt: 'break the ice', answer: 'make people feel comfortable; start conversation' },
    { prompt: 'hit the nail on the head', answer: 'describe or identify something exactly right' },
    { prompt: 'once in a blue moon', answer: 'very rarely' },
    { prompt: 'burn the midnight oil', answer: 'work or study late into the night' },
    { prompt: 'a blessing in disguise', answer: 'something bad that leads to a good result' },
    { prompt: 'cry over spilt milk', answer: 'waste time regretting what cannot be changed' },
    { prompt: 'spill the beans', answer: 'reveal a secret' },
    { prompt: 'under the weather', answer: 'feel slightly ill / unwell' },
    { prompt: 'the ball is in your court', answer: 'it is your turn to take action' },
    {
      prompt: 'bite off more than you can chew',
      answer: 'take on more than you can handle',
    },
    { prompt: 'call it a day', answer: 'stop working on something for now' },
    { prompt: 'cost an arm and a leg', answer: 'be very expensive' },
  ],
  mistakes: [
    {
      trap: 'Reading spill the beans as dropping food.',
      correct: 'It means reveal a secret.',
    },
    {
      trap: 'Reading under the weather as climate report.',
      correct: 'It means feeling unwell.',
    },
    {
      trap: 'Treating once in a blue moon as monthly.',
      correct: 'It means very rarely, not a fixed calendar month.',
    },
    {
      trap: 'Using burn the midnight oil for early morning only.',
      correct: 'Core sense is working late at night.',
    },
    {
      trap: 'Memorising idioms without example sentences.',
      correct: 'Pair each idiom with one short situation sentence.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Learn method: meaning, example, trap.' },
    { day: 'Day 2', task: 'Memorise idioms 1-6 with meanings.' },
    { day: 'Day 3', task: 'Memorise idioms 7-12 with meanings.' },
    { day: 'Day 4', task: 'Reverse drill: meaning → idiom.' },
    { day: 'Day 5', task: 'Do 20 mixed MCQs.' },
    { day: 'Day 6', task: 'Write one sentence for each idiom.' },
    { day: 'Day 7', task: 'Rapid flashcard run; list traps only.' },
  ],
  sourcesLine:
    'Sources: standard CSS/PPSC English idiom lists and one-paper practice patterns. Prefer common figurative senses used in exam keys.',
}
