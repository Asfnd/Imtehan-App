import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (standard everyday science / one-paper chemistry teaching):
 * - Acids/bases and pH scale: acids <7, neutral 7, bases >7
 * - Periodic table groups: alkali metals Group 1; halogens Group 17; noble gases Group 18 (IUPAC)
 * - Water hardness: Ca and Mg salts; temporary vs permanent at concept level
 * - Air composition: ~78% N2, ~21% O2, CO2 small; argon as major noble gas in air
 * - Common compounds: H2O, CO2, NaCl, CaCO3, H2SO4, NH3
 * Keep MCQ crisp; no invented exotic reactions
 */
export const EVERYDAY_SCIENCE_CHEMISTRY_BASICS_KIT: NoteKitData = {
  id: 'everyday-science-chemistry-basics',
  title: 'Everyday Science Chemistry Basics',
  subtitle:
    'Acids bases pH, periodic table groups, water hardness, gases in air, and common compounds for crisp MCQs.',
  syllabusTags: [
    'Everyday science',
    'Chemistry basics',
    'Acids and bases',
    'MPT / PPSC / NTS',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'One-paper / MPT',
      directive: 'MCQ fact',
      angle: 'pH scale and acid/base examples',
      frequency: 'high',
    },
    {
      year: 'PPSC / NTS',
      directive: 'MCQ fact',
      angle: 'Composition of air and common gases',
      frequency: 'high',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'Hard water causes and softening idea',
      frequency: 'high',
    },
    {
      year: 'FPSC',
      directive: 'MCQ fact',
      angle: 'Periodic table groups: alkali metals, halogens, noble gases',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Acids taste sour in classic school notes and turn blue litmus red. Bases feel soapy and turn red litmus blue. Neutralisation: acid + base -> salt + water.',
    'pH scale: below 7 acidic; 7 neutral; above 7 basic/alkaline. Pure water is about pH 7. Stronger acid means lower pH in ordinary teaching.',
    'Periodic table (IUPAC group numbers in modern keys): Group 1 alkali metals (e.g. Na, K). Group 17 halogens (e.g. F, Cl, Br, I). Group 18 noble gases (He, Ne, Ar, Kr, Xe, Rn).',
    'Hard water: does not lather easily with soap. Caused mainly by calcium and magnesium salts.',
    'Temporary hardness: often linked with bicarbonates; can be reduced by boiling in standard teaching. Permanent hardness: linked with sulphates/chlorides; needs chemical softening methods in school notes.',
    'Air by volume (approx exam figures): nitrogen about 78%, oxygen about 21%, argon about 0.9%, carbon dioxide about 0.03 to 0.04%.',
    'Common compounds: H2O water; CO2 carbon dioxide; NaCl sodium chloride; CaCO3 calcium carbonate; H2SO4 sulphuric acid; NH3 ammonia; HCl hydrochloric acid; NaOH sodium hydroxide.',
    'MCQ method: match name to formula, group to example element, and pH side to acid or base.',
  ],
  answerSteps: [
    'Decide if the question is pH, periodic group, hardness, air, or formula.',
    'For acids/bases, place the value on the pH scale first.',
    'For groups, recall one example element with the group name.',
    'For hard water, name Ca/Mg and temporary vs permanent if asked.',
    'For air, use the standard percentage pair N2 ~78% and O2 ~21%.',
  ],
  questionVariants: [
    'What is the pH of a neutral solution?',
    'Which gases make up most of air?',
    'What causes hardness of water?',
    'Name elements belonging to alkali metals, halogens, and noble gases.',
  ],
  citations: [
    {
      label: 'pH',
      text: 'pH < 7 acid; 7 neutral; > 7 base. Pure water about pH 7.',
    },
    {
      label: 'Groups',
      text: 'Group 1 alkali metals; Group 17 halogens; Group 18 noble gases in IUPAC numbering used in modern keys.',
    },
    {
      label: 'Hard water',
      text: 'Mainly calcium and magnesium salts; temporary vs permanent hardness in school chemistry.',
    },
    {
      label: 'Air',
      text: 'About 78% nitrogen and 21% oxygen by volume in standard exam figures.',
    },
    {
      label: 'Compounds',
      text: 'High-yield formulas include H2O, CO2, NaCl, CaCO3, H2SO4, NH3.',
    },
  ],
  flashcards: [
    { prompt: 'pH less than 7 means?', answer: 'Acidic' },
    { prompt: 'pH equal to 7 means?', answer: 'Neutral' },
    { prompt: 'pH greater than 7 means?', answer: 'Basic / alkaline' },
    { prompt: 'Litmus: acids turn blue litmus what colour?', answer: 'Red' },
    { prompt: 'Acid + base produces?', answer: 'Salt and water' },
    { prompt: 'Group 1 elements are called?', answer: 'Alkali metals' },
    { prompt: 'Name two alkali metals.', answer: 'Sodium and potassium (Na, K)' },
    { prompt: 'Group 17 elements are called?', answer: 'Halogens' },
    { prompt: 'Name two halogens.', answer: 'Chlorine and fluorine (or bromine, iodine)' },
    { prompt: 'Group 18 elements are called?', answer: 'Noble gases' },
    { prompt: 'Name two noble gases.', answer: 'Helium and neon (or argon)' },
    { prompt: 'Hard water is mainly due to which ions/salts?', answer: 'Calcium and magnesium' },
    { prompt: 'Temporary hardness is often reduced by?', answer: 'Boiling (standard school teaching)' },
    { prompt: 'Approximate % of nitrogen in air?', answer: 'About 78%' },
    { prompt: 'Approximate % of oxygen in air?', answer: 'About 21%' },
    { prompt: 'Formula of sodium chloride?', answer: 'NaCl' },
    { prompt: 'Formula of calcium carbonate?', answer: 'CaCO3' },
    { prompt: 'Formula of sulphuric acid?', answer: 'H2SO4' },
    { prompt: 'Formula of ammonia?', answer: 'NH3' },
  ],
  mistakes: [
    {
      trap: 'Saying pH 7 is acidic.',
      correct: 'pH 7 is neutral. Acids are below 7.',
    },
    {
      trap: 'Writing oxygen as the largest part of air.',
      correct: 'Nitrogen is about 78%. Oxygen is about 21%.',
    },
    {
      trap: 'Blaming hardness only on sodium salts.',
      correct: 'Hardness is mainly calcium and magnesium salts.',
    },
    {
      trap: 'Using old group labels without knowing modern IUPAC numbers.',
      correct: 'Know alkali metals = Group 1, halogens = 17, noble gases = 18 for modern keys.',
    },
    {
      trap: 'Mixing formulas (CO for CO2, or H2SO4 as hydrochloric acid).',
      correct: 'CO2 carbon dioxide; HCl hydrochloric acid; H2SO4 sulphuric acid.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'pH scale + litmus + neutralisation.' },
    { day: 'Day 2', task: 'Periodic groups with two examples each.' },
    { day: 'Day 3', task: 'Hard water: cause and temporary vs permanent.' },
    { day: 'Day 4', task: 'Air percentages and gas names.' },
    { day: 'Day 5', task: 'Common compound formulas drill.' },
    { day: 'Day 6', task: 'Mixed chemistry MCQs.' },
    { day: 'Day 7', task: 'One-pager from memory.' },
  ],
  sourcesLine:
    'Sources: standard everyday science chemistry notes for MPT/PPSC/NTS. Use mainstream pH, air composition, hardness, and IUPAC group teaching; avoid exotic reaction lists.',
}
