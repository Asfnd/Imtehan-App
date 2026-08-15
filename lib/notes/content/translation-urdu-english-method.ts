import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (CSS English Precis and Composition translation method):
 * - Urdu to English and English to Urdu translation appear in CSS English paper patterns
 * - Method: sense-for-sense accuracy, natural target idiom, preserve tone, avoid word-by-word calques
 * - Common traps: literal idioms, tense drift, article errors into English, izafat/compound mishandling
 * - Practice discipline: read full sentence, draft meaning, polish grammar, compare key nouns
 * Do not invent a fake official marking rubric percentage as law
 */
export const TRANSLATION_URDU_ENGLISH_METHOD_KIT: NoteKitData = {
  id: 'translation-urdu-english-method',
  title: 'Urdu-English Translation Method (CSS)',
  subtitle:
    'Sense-based translation technique, idiom handling, and common error traps for the CSS English paper.',
  syllabusTags: [
    'English',
    'Translation',
    'CSS Precis and Composition',
    'Urdu-English',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS English',
      directive: 'Translate',
      angle: 'Urdu passage into English',
      frequency: 'high',
    },
    {
      year: 'CSS English',
      directive: 'Translate',
      angle: 'English passage into Urdu',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Method',
      angle: 'Accuracy, fluency, and tone in translation',
      frequency: 'medium',
    },
    {
      year: 'Practice',
      directive: 'Drill',
      angle: 'Idioms and official/formal register',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Goal: convey complete meaning in natural target language. Sense-for-sense beats word-for-word calques.',
    'Step 1: read the whole sentence/paragraph once for topic, tense, and tone (formal, narrative, argumentative).',
    'Step 2: identify backbone: subject, verb, object/complements, and connectors (cause, contrast, condition).',
    'Step 3: draft in plain target language without chasing rare synonyms. Clarity scores higher than ornamental diction.',
    'Step 4: fix grammar in the target language (English articles/prepositions/tense; Urdu gender/agreement/izafat where needed).',
    'Idioms: translate the function, not the skin. Urdu idioms often need English equivalents or plain paraphrase.',
    'Culture-bound terms: keep recognised proper names; explain only if meaning would otherwise break.',
    'Final pass checklist: nothing omitted, nothing added, tone preserved, punctuation readable, no mixed-language residue.',
  ],
  answerSteps: [
    'Read full source text for meaning and tone.',
    'Mark verbs and logical connectors.',
    'Draft sense-based target sentences.',
    'Repair grammar and articles/agreement.',
    'Replace literal idioms with natural equivalents.',
    'Do a final omission/addition check.',
  ],
  questionVariants: [
    'Translate the following Urdu passage into English.',
    'Translate the following English passage into Urdu.',
    'Explain the method of accurate Urdu-English translation for CSS.',
    'How should idioms be handled in CSS translation?',
  ],
  citations: [
    {
      label: 'Core principle',
      text: 'Sense-for-sense accuracy with natural target idiom outperforms literal calques.',
    },
    {
      label: 'Process',
      text: 'Read fully, draft meaning, then polish grammar and tone.',
    },
    {
      label: 'Idioms',
      text: 'Translate function or use an equivalent; do not copy images blindly.',
    },
    {
      label: 'Final check',
      text: 'No omission, no addition, tone preserved.',
    },
  ],
  flashcards: [
    {
      prompt: 'What beats word-for-word translation in CSS?',
      answer: 'Sense-for-sense meaning in natural target language',
    },
    {
      prompt: 'What should you identify before drafting?',
      answer: 'Subject-verb backbone, tense, tone, and connectors',
    },
    {
      prompt: 'How should idioms be handled?',
      answer: 'Translate function or use an equivalent paraphrase',
    },
    {
      prompt: 'Name a common English-target grammar trap from Urdu.',
      answer: 'Article and preposition errors; tense drift',
    },
    {
      prompt: 'Name a common Urdu-target trap from English.',
      answer: 'Agreement/gender issues and awkward calques',
    },
    {
      prompt: 'What diction level usually scores better?',
      answer: 'Clear natural prose over rare ornamental words',
    },
    {
      prompt: 'What belongs in the final checklist?',
      answer: 'No omission, no addition, tone and punctuation OK',
    },
    {
      prompt: 'Should you invent marking-scheme percentages?',
      answer: 'No; practise accuracy, fluency, and completeness',
    },
    {
      prompt: 'What do you do with recognised proper names?',
      answer: 'Keep them; do not distort famous names',
    },
    {
      prompt: 'First reading purpose?',
      answer: 'Capture topic, tense, and tone before translating',
    },
  ],
  mistakes: [
    {
      trap: 'Translating each Urdu word in order into English.',
      correct: 'Rebuild natural English sentence order for the same meaning.',
    },
    {
      trap: 'Literal idiom images that sound absurd.',
      correct: 'Use equivalent idiom or plain sense.',
    },
    {
      trap: 'Changing tense to sound stylish.',
      correct: 'Preserve source tense unless grammar forces adjustment.',
    },
    {
      trap: 'Adding commentary not in the source.',
      correct: 'Translate; do not improve the author arguments.',
    },
    {
      trap: 'Leaving half a sentence untranslated under time pressure.',
      correct: 'Prioritise complete meaning over fancy vocabulary.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Memorise six-step method.' },
    { day: 'Day 2', task: 'Translate one short Urdu paragraph to English.' },
    { day: 'Day 3', task: 'Translate one short English paragraph to Urdu.' },
    { day: 'Day 4', task: 'Idiom equivalent drill (10 items).' },
    { day: 'Day 5', task: 'Flashcards + grammar trap list.' },
    { day: 'Day 6', task: 'Timed 20-minute mixed translation set.' },
    { day: 'Day 7', task: 'Review errors; rewrite weak sentences.' },
  ],
  sourcesLine:
    'Sources: CSS English Precis and Composition translation practice norms; sense-based translation teaching; idiom and grammar trap lists used in standard academies. Avoid invented official mark-weight claims.',
}
