import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (one-paper / CSS English vocabulary method teaching):
 * - Teach method first: roots, prefixes, context, antonym logic, trap pairs
 * - 12 classic high-yield synonym/antonym pairs (not a 100-word dump)
 * - Common exam traps: near-synonyms, opposite confusion, register
 * Keep simple English; no invented obscure words
 */
export const ENGLISH_VOCABULARY_HIGH_YIELD_KIT: NoteKitData = {
  id: 'english-vocabulary-high-yield',
  title: 'English Vocabulary High-Yield (Synonyms Antonyms)',
  subtitle:
    'Exam method for one-paper and CSS: roots, traps, and 12 classic synonym/antonym pairs, not a dictionary dump.',
  syllabusTags: [
    'English',
    'Vocabulary',
    'Synonyms and antonyms',
    'CSS MPT / PPSC / NTS',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'One-paper / MPT',
      directive: 'MCQ fact',
      angle: 'Synonym selection from four options',
      frequency: 'high',
    },
    {
      year: 'PPSC / NTS / FPSC',
      directive: 'MCQ fact',
      angle: 'Antonym selection and near-synonym traps',
      frequency: 'high',
    },
    {
      year: 'CSS English pattern',
      directive: 'Vocabulary',
      angle: 'Precise word choice in sentence context',
      frequency: 'medium',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'Prefix/root based meaning',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Method first: do not memorise random lists. Learn roots, prefixes, and elimination.',
    'Step 1: read the stem word. Step 2: note tone (positive/negative). Step 3: eliminate options with wrong tone. Step 4: pick the closest match, not a related idea.',
    'Useful prefixes: un/in/im/il/ir = not; re = again; pre = before; anti = against; mis = wrongly; over/under = degree.',
    'Useful root families: bene = good; mal = bad; chron = time; geo = earth; scrib/script = write; dict = say; port = carry; spect = look.',
    'Synonym trap: options that are associated but not equivalent (brave vs angry). Antonym trap: mild opposite vs strong opposite.',
    'Context check: if a short sentence is given, fit the collocation (make a decision, not do a decision).',
    'Twelve classic pairs (learn both directions): begin/commence; end/terminate; buy/purchase; help/assist; hide/conceal; show/reveal; ask/inquire; short/brief; rich/wealthy; poor/destitute; brave/courageous; lazy/indolent.',
    'Antonym classics: accept/reject; arrive/depart; attack/defend; bless/curse; create/destroy; expand/contract; freedom/slavery; genuine/fake; include/exclude; legal/illegal; optimist/pessimist; scarce/abundant.',
  ],
  answerSteps: [
    'Identify whether the question asks synonym or antonym.',
    'Mark the tone of the stem word before looking at options.',
    'Eliminate wrong tone and merely related words.',
    'Use root/prefix only as support, not as a wild guess.',
    'Confirm with a silent sentence substitution if time allows.',
  ],
  questionVariants: [
    'Choose the synonym of the underlined word.',
    'Choose the antonym of the given word.',
    'Which option is closest in meaning?',
    'Which option is opposite in meaning?',
  ],
  citations: [
    {
      label: 'Method',
      text: 'Tone check + elimination + closest equivalent is the standard one-paper approach.',
    },
    {
      label: 'Roots and prefixes',
      text: 'Common Latin/Greek families help decode unfamiliar words without full dictionary study.',
    },
    {
      label: 'Synonym caution',
      text: 'Related meaning is not always synonym. Choose the nearest match.',
    },
    {
      label: 'Classic pairs',
      text: 'Exam banks recycle commence/terminate, conceal/reveal, assist/help style pairs.',
    },
    {
      label: 'Antonym caution',
      text: 'Pick true opposites, not distant negatives or unrelated words.',
    },
  ],
  flashcards: [
    { prompt: 'First step in a synonym MCQ?', answer: 'Read the stem and mark tone' },
    { prompt: 'Prefix un/in/im/il/ir usually means?', answer: 'Not' },
    { prompt: 'Root bene suggests?', answer: 'Good' },
    { prompt: 'Root mal suggests?', answer: 'Bad' },
    { prompt: 'Synonym of commence?', answer: 'Begin' },
    { prompt: 'Synonym of terminate?', answer: 'End' },
    { prompt: 'Synonym of conceal?', answer: 'Hide' },
    { prompt: 'Synonym of reveal?', answer: 'Show' },
    { prompt: 'Synonym of assist?', answer: 'Help' },
    { prompt: 'Synonym of inquire?', answer: 'Ask' },
    { prompt: 'Synonym of indolent?', answer: 'Lazy' },
    { prompt: 'Synonym of destitute?', answer: 'Very poor' },
    { prompt: 'Antonym of arrive?', answer: 'Depart' },
    { prompt: 'Antonym of expand?', answer: 'Contract' },
    { prompt: 'Antonym of scarce?', answer: 'Abundant' },
    { prompt: 'Antonym of genuine?', answer: 'Fake' },
    { prompt: 'Trap in synonym questions?', answer: 'Choosing a related idea instead of nearest meaning' },
    { prompt: 'Quick check before locking an answer?', answer: 'Substitute the option in a short sentence' },
  ],
  mistakes: [
    {
      trap: 'Memorising 100 disconnected words with no method.',
      correct: 'Learn method + reusable roots + a short classic pair list.',
    },
    {
      trap: 'Choosing a word that appears in the same topic but differs in meaning.',
      correct: 'Synonym means nearest meaning, not same subject area.',
    },
    {
      trap: 'Confusing mild and strong opposites.',
      correct: 'For antonyms, pick the clear opposite demanded by the stem.',
    },
    {
      trap: 'Ignoring tone (positive vs negative).',
      correct: 'Tone elimination removes half the wrong options fast.',
    },
    {
      trap: 'Trusting look-alike spellings (accept/except style traps).',
      correct: 'Check meaning, not visual similarity.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Learn the four-step MCQ method.' },
    { day: 'Day 2', task: 'Memorise key prefixes and roots.' },
    { day: 'Day 3', task: 'Drill 12 synonym pairs both ways.' },
    { day: 'Day 4', task: 'Drill classic antonym pairs.' },
    { day: 'Day 5', task: 'Timed 20 synonym/antonym MCQs.' },
    { day: 'Day 6', task: 'Review only your wrong answers and traps.' },
    { day: 'Day 7', task: 'One-pager method + pairs from memory.' },
  ],
  sourcesLine:
    'Sources: standard one-paper English vocabulary practice patterns (FPSC/PPSC/NTS style). Teach method and high-yield pairs; avoid unverified rare-word dumps.',
}
