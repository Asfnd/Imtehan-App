import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (CSS Precis and Composition / pair of words teaching):
 * - Method: define both words, contrast meaning, write one clear sentence each
 * - Classic pairs commonly drilled in Pakistani competitive English
 * No invented idiosyncratic meanings; standard exam distinctions
 */
export const PAIR_OF_WORDS_ENGLISH_KIT: NoteKitData = {
  id: 'pair-of-words-english',
  title: 'Pair of Words (CSS English Method)',
  subtitle:
    'Exam method for pair of words plus twelve classic pairs with contrast and sample sentences.',
  syllabusTags: [
    'English',
    'Pair of words',
    'Vocabulary',
    'CSS Precis and Composition',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS Precis and Composition',
      directive: 'Use in sentences',
      angle: 'Pair of words distinctions',
      frequency: 'high',
    },
    {
      year: 'PMS / one-paper',
      directive: 'MCQ / sentences',
      angle: 'Confusable word pairs',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Differentiate',
      angle: 'Homophones and near-synonyms',
      frequency: 'high',
    },
    {
      year: 'Coach pattern',
      directive: 'Method',
      angle: 'Definition then sentence for each word',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Pair of words tests whether you can separate confusable items (homophones, near-homonyms, or close meanings) and use each correctly in a sentence.',
    'Method under pressure: (1) write a short definition or contrast for each word; (2) write one original, unambiguous sentence per word; (3) keep grammar simple so the meaning difference is obvious; (4) never reuse the same sentence frame for both if it hides the contrast.',
    'Scoring habits: correct spelling, correct part of speech, and a context that only fits one meaning. Avoid dictionary dumping without a sentence.',
    'Twelve classic pairs (memorise contrasts):',
    '1) Accept (receive/agree) vs Except (excluding). 2) Affect (usually verb: influence) vs Effect (usually noun: result). 3) Advise (verb) vs Advice (noun).',
    '4) Beside (next to) vs Besides (in addition). 5) Complement (complete/go with) vs Compliment (praise). 6) Council (assembly) vs Counsel (advice / to advise).',
    '7) Desert (dry land / abandon) vs Dessert (sweet course). 8) Eligible (qualified) vs Illegible (unreadable). 9) Emigrate (leave a country) vs Immigrate (enter a country).',
    '10) Farther (physical distance) vs Further (additional / figurative extent). 11) Principal (head / main) vs Principle (rule/moral). 12) Stationary (not moving) vs Stationery (writing materials).',
    'Bonus check: its/it is is not in the twelve, but always proofread look-alikes after you finish.',
  ],
  answerSteps: [
    'Read both words and identify the exact confusion type (sound, spelling, or meaning).',
    'Write a one-line contrast for each.',
    'Compose one clear sentence per word that forces the right meaning.',
    'Check spelling and part of speech.',
    'Read both sentences aloud to confirm they cannot swap.',
  ],
  questionVariants: [
    'Use the following pairs in your own sentences: affect/effect; principal/principle.',
    'Differentiate: emigrate and immigrate.',
    'Make sentences: stationary and stationery.',
    'Explain the difference between advice and advise with examples.',
  ],
  citations: [
    {
      label: 'Method',
      text: 'Contrast briefly, then one unambiguous sentence per word.',
    },
    {
      label: 'High-yield pairs',
      text: 'affect/effect, advice/advise, principal/principle, stationary/stationery, emigrate/immigrate.',
    },
    {
      label: 'Exam habit',
      text: 'Spelling and part of speech matter as much as meaning.',
    },
    {
      label: 'Trap pattern',
      text: 'Wrong options often swap the pair or mix noun with verb. Check word class before meaning.',
    },
  ],
  flashcards: [
    {
      prompt: 'Affect vs Effect (usual exam split)?',
      answer: 'Affect verb (influence); Effect noun (result)',
    },
    {
      prompt: 'Advise vs Advice?',
      answer: 'Advise verb; Advice noun',
    },
    {
      prompt: 'Principal vs Principle?',
      answer: 'Principal head/main; Principle rule or moral',
    },
    {
      prompt: 'Stationary vs Stationery?',
      answer: 'Stationary not moving; Stationery writing materials',
    },
    {
      prompt: 'Emigrate vs Immigrate?',
      answer: 'Emigrate leave a country; Immigrate enter a country',
    },
    {
      prompt: 'Complement vs Compliment?',
      answer: 'Complement completes; Compliment praises',
    },
    {
      prompt: 'Council vs Counsel?',
      answer: 'Council assembly; Counsel advice or to advise',
    },
    {
      prompt: 'Eligible vs Illegible?',
      answer: 'Eligible qualified; Illegible unreadable',
    },
    {
      prompt: 'Beside vs Besides?',
      answer: 'Beside next to; Besides in addition',
    },
    {
      prompt: 'Accept vs Except?',
      answer: 'Accept receive/agree; Except excluding',
    },
    {
      prompt: 'Farther vs Further (teaching split)?',
      answer: 'Farther physical distance; Further additional/figurative',
    },
    {
      prompt: 'Desert vs Dessert?',
      answer: 'Desert dry land or abandon; Dessert sweet course',
    },
  ],
  mistakes: [
    {
      trap: 'Writing two vague sentences that could fit either word.',
      correct: 'Force a context that only one meaning allows.',
    },
    {
      trap: 'Mixing advice/advise parts of speech.',
      correct: 'Advice noun; advise verb.',
    },
    {
      trap: 'Spelling stationery wrong.',
      correct: 'Stationery has er like paper; stationary is the still one.',
    },
    {
      trap: 'Using effect only as a verb in every sentence.',
      correct: 'Default exam split: effect noun, affect verb (unless paper forces rare uses).',
    },
    {
      trap: 'Skipping definitions and only writing sentences.',
      correct: 'Brief contrast plus sentences is the safest method.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Learn the pair-of-words method steps.' },
    { day: 'Day 2', task: 'Pairs 1-4 with sentences.' },
    { day: 'Day 3', task: 'Pairs 5-8 with sentences.' },
    { day: 'Day 4', task: 'Pairs 9-12 with sentences.' },
    { day: 'Day 5', task: 'Flashcards timed.' },
    { day: 'Day 6', task: 'Write all twelve pairs from memory.' },
    { day: 'Day 7', task: 'Recite one-pager method + pair list.' },
  ],
  sourcesLine:
    'Sources: standard CSS Precis and Composition pair-of-words drills and school-key distinctions for confusable English pairs.',
}
