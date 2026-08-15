import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked:
 * - Classic deficiency pairs: A night blindness; B1 (thiamine) beriberi; C scurvy; D rickets (children) / osteomalacia (adults); B12 pernicious anemia; B3 pellagra; iodine goitre
 * - Insulin from pancreas; diabetes mellitus linked to insulin deficiency/resistance teaching
 * - Thyroid: thyroxine; hypo vs hyper basics; iodine for thyroid hormone synthesis
 * - Avoid inventing non-standard deficiency claims
 */
export const VITAMINS_HORMONES_BASICS_KIT: NoteKitData = {
  id: 'vitamins-hormones-basics',
  title: 'Vitamins, Hormones and Deficiency Diseases',
  subtitle:
    'Classic deficiency pairs, insulin and diabetes, and thyroid basics for everyday science MCQs.',
  syllabusTags: [
    'Everyday science',
    'Human body',
    'Vitamins and deficiencies',
    'Hormones',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'Vitamin deficiency disease pairs',
      frequency: 'high',
    },
    {
      year: 'PPSC / NTS',
      directive: 'MCQ fact',
      angle: 'Insulin, pancreas, diabetes',
      frequency: 'high',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'Thyroid hormone and iodine / goitre',
      frequency: 'high',
    },
    {
      year: 'FPSC',
      directive: 'MCQ fact',
      angle: 'Fat-soluble vs water-soluble vitamins',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Vitamins are organic micronutrients needed in small amounts. Deficiency causes classic exam diseases.',
    'High-yield pairs: Vitamin A night blindness; Vitamin B1 (thiamine) beriberi; Vitamin C scurvy; Vitamin D rickets in children (osteomalacia in adults); Vitamin B12 pernicious anemia; Vitamin B3 (niacin) pellagra.',
    'Fat-soluble vitamins often taught: A, D, E, K. Water-soluble: B-complex and C.',
    'Hormones are chemical messengers from endocrine glands. Insulin is produced by the pancreas (beta cells in islets of Langerhans in standard teaching).',
    'Diabetes mellitus: high blood sugar linked to lack of insulin or poor insulin action (insulin resistance). Exams often ask gland and hormone name.',
    'Thyroid gland produces thyroxine (T4) and related hormones. Iodine is needed to make thyroid hormones. Iodine deficiency is linked to goitre.',
    'Hypothyroidism: underactive thyroid (weight gain, slowing symptoms in classic lists). Hyperthyroidism: overactive thyroid (weight loss, fast metabolism teaching).',
    'Keep answers as pairs: nutrient or hormone -> gland or disease. Do not invent rare deficiency names.',
  ],
  answerSteps: [
    'Identify whether the question is vitamin, mineral, or hormone.',
    'State the classic pair in one line (A = night blindness).',
    'For diabetes, name pancreas + insulin + high blood sugar.',
    'For thyroid, name thyroxine + iodine + goitre if deficiency is asked.',
    'Add fat-soluble vs water-soluble only if useful.',
  ],
  questionVariants: [
    'Match vitamins with their deficiency diseases.',
    'Which hormone is deficient or ineffective in diabetes mellitus?',
    'Write a short note on thyroid hormone and iodine.',
    'Differentiate fat-soluble and water-soluble vitamins with examples.',
  ],
  citations: [
    {
      label: 'Vitamin A',
      text: 'Deficiency linked to night blindness.',
    },
    {
      label: 'B vitamins and C/D',
      text: 'B1 beriberi; B3 pellagra; B12 pernicious anemia; C scurvy; D rickets (children) / osteomalacia (adults).',
    },
    {
      label: 'Insulin',
      text: 'Produced by the pancreas; regulates blood glucose. Diabetes mellitus involves insulin deficiency or resistance.',
    },
    {
      label: 'Thyroid',
      text: 'Thyroid hormones (e.g. thyroxine) need iodine. Iodine deficiency is associated with goitre.',
    },
    {
      label: 'Solubility teaching',
      text: 'Fat-soluble: A, D, E, K. Water-soluble: B-complex and C.',
    },
  ],
  flashcards: [
    { prompt: 'Vitamin A deficiency causes?', answer: 'Night blindness' },
    { prompt: 'Vitamin B1 (thiamine) deficiency causes?', answer: 'Beriberi' },
    { prompt: 'Vitamin C deficiency causes?', answer: 'Scurvy' },
    { prompt: 'Vitamin D deficiency in children?', answer: 'Rickets' },
    { prompt: 'Vitamin D deficiency in adults (classic pair)?', answer: 'Osteomalacia' },
    {
      prompt: 'Vitamin B12 deficiency is classically linked to?',
      answer: 'Pernicious anemia',
    },
    { prompt: 'Vitamin B3 (niacin) deficiency causes?', answer: 'Pellagra' },
    {
      prompt: 'Name the fat-soluble vitamins.',
      answer: 'A, D, E, K',
    },
    {
      prompt: 'Name water-soluble vitamin groups in classic teaching.',
      answer: 'B-complex and Vitamin C',
    },
    {
      prompt: 'Which gland produces insulin?',
      answer: 'Pancreas',
    },
    {
      prompt: 'Insulin mainly controls what?',
      answer: 'Blood glucose (sugar) levels',
    },
    {
      prompt: 'Diabetes mellitus is linked to which hormone problem?',
      answer: 'Insulin deficiency or insulin resistance',
    },
    {
      prompt: 'Which mineral is needed for thyroid hormone synthesis?',
      answer: 'Iodine',
    },
    {
      prompt: 'Iodine deficiency is classically linked to?',
      answer: 'Goitre',
    },
    {
      prompt: 'Main hormone often named from the thyroid in MCQs?',
      answer: 'Thyroxine (T4)',
    },
    {
      prompt: 'Hypothyroidism means?',
      answer: 'Underactive thyroid / low thyroid hormone activity',
    },
    {
      prompt: 'Hyperthyroidism means?',
      answer: 'Overactive thyroid / excess thyroid hormone activity',
    },
  ],
  mistakes: [
    {
      trap: 'Linking Vitamin C to rickets.',
      correct: 'Rickets (children) / osteomalacia (adults) = Vitamin D. Scurvy = Vitamin C.',
    },
    {
      trap: 'Saying insulin is produced by the thyroid.',
      correct: 'Insulin is from the pancreas. Thyroid makes thyroxine.',
    },
    {
      trap: 'Calling night blindness a Vitamin D disease.',
      correct: 'Night blindness is Vitamin A deficiency.',
    },
    {
      trap: 'Mixing beriberi with pellagra.',
      correct: 'Beriberi = B1. Pellagra = B3 (niacin).',
    },
    {
      trap: 'Saying goitre is only a Vitamin A issue.',
      correct: 'Classic goitre link in MCQs is iodine deficiency affecting the thyroid.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Memorise A, B1, C, D deficiency pairs.' },
    { day: 'Day 2', task: 'Add B12, B3, and fat vs water soluble.' },
    { day: 'Day 3', task: 'Insulin, pancreas, diabetes.' },
    { day: 'Day 4', task: 'Thyroid, thyroxine, iodine, goitre.' },
    { day: 'Day 5', task: 'Trap drill on swapped pairs.' },
    { day: 'Day 6', task: 'Full flashcard set.' },
    { day: 'Day 7', task: 'One-pager only. Recite all classic pairs.' },
  ],
  sourcesLine:
    'Sources: standard everyday science and biology MCQ lists for vitamin deficiencies, endocrine glands, and thyroid-iodine teaching. Stick to classic pairs used in one-paper exams.',
}
