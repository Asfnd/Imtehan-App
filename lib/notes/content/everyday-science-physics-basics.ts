import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (standard everyday science / one-paper physics teaching):
 * - Newton`s three laws at name level
 * - SI base units commonly tested: m, kg, s, A, K, mol, cd; derived: N, J, W, Pa, V
 * - Light: reflection, refraction, speed in vacuum ~3 x 10^8 m/s
 * - Sound: needs medium; echo; speed in air approx teaching values vary, keep concept-level
 * - Electricity: Ohm`s law V = IR; series/parallel basics
 * Avoid advanced derivation; keep MPT/PPSC crisp facts
 */
export const EVERYDAY_SCIENCE_PHYSICS_BASICS_KIT: NoteKitData = {
  id: 'everyday-science-physics-basics',
  title: 'Everyday Science Physics Basics',
  subtitle:
    'Newton laws, SI units, light and sound basics, and Ohm`s law at name level for MPT/PPSC.',
  syllabusTags: [
    'Everyday science',
    'Physics basics',
    'SI units',
    'MPT / PPSC / NTS',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'One-paper / MPT',
      directive: 'MCQ fact',
      angle: 'Newton`s laws and SI units',
      frequency: 'high',
    },
    {
      year: 'PPSC / NTS',
      directive: 'MCQ fact',
      angle: 'Ohm`s law and basic electricity',
      frequency: 'high',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'Light reflection/refraction and speed of light',
      frequency: 'high',
    },
    {
      year: 'FPSC',
      directive: 'MCQ fact',
      angle: 'Sound needs a medium; echo basics',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Newton 1: a body stays at rest or in uniform motion unless an unbalanced force acts (inertia).',
    'Newton 2: force equals mass times acceleration (F = ma). More force, more acceleration for the same mass.',
    'Newton 3: for every action there is an equal and opposite reaction.',
    'SI base units often tested: length metre (m), mass kilogram (kg), time second (s), current ampere (A), temperature kelvin (K), amount mole (mol), luminous intensity candela (cd).',
    'Derived units: force newton (N), energy/work joule (J), power watt (W), pressure pascal (Pa), potential difference volt (V).',
    'Light: travels in straight lines in uniform media. Reflection: angle of incidence equals angle of reflection. Refraction: bending when entering another medium. Speed in vacuum about 3 x 10^8 m/s.',
    'Sound: mechanical wave that needs a medium. Cannot travel in vacuum. Echo is reflection of sound.',
    'Ohm`s law: V = IR. Voltage (V) equals current (I) times resistance (R). Unit of resistance: ohm.',
  ],
  answerSteps: [
    'Identify the topic: laws, units, light, sound, or electricity.',
    'State the named law or formula in one line.',
    'Add the unit if the question is quantity-based.',
    'For light/sound, use the classic contrast: light can cross vacuum; sound cannot.',
    'For circuits, apply V = IR directly and name the ohm.',
  ],
  questionVariants: [
    'State Newton`s three laws of motion.',
    'Match physical quantities with SI units.',
    'What is Ohm`s law? Define the terms.',
    'Differentiate light and sound with reference to travel in vacuum.',
  ],
  citations: [
    {
      label: 'Newton laws',
      text: 'Inertia; F = ma; action-reaction form the standard three-law teaching set.',
    },
    {
      label: 'SI units',
      text: 'Base units include m, kg, s, A, K, mol, cd. Derived units include N, J, W, Pa, V.',
    },
    {
      label: 'Light',
      text: 'Reflection law; refraction as bending; vacuum speed about 3 x 10^8 m/s.',
    },
    {
      label: 'Sound',
      text: 'Needs a material medium; echo is reflected sound.',
    },
    {
      label: 'Ohm`s law',
      text: 'V = IR; resistance measured in ohms.',
    },
  ],
  flashcards: [
    { prompt: 'Newton`s first law is also called?', answer: 'Law of inertia' },
    { prompt: 'Formula linked with Newton`s second law?', answer: 'F = ma' },
    { prompt: 'Newton`s third law in one line?', answer: 'Action and reaction are equal and opposite' },
    { prompt: 'SI unit of length?', answer: 'Metre (m)' },
    { prompt: 'SI unit of mass?', answer: 'Kilogram (kg)' },
    { prompt: 'SI unit of time?', answer: 'Second (s)' },
    { prompt: 'SI unit of electric current?', answer: 'Ampere (A)' },
    { prompt: 'SI unit of force?', answer: 'Newton (N)' },
    { prompt: 'SI unit of energy/work?', answer: 'Joule (J)' },
    { prompt: 'SI unit of power?', answer: 'Watt (W)' },
    { prompt: 'SI unit of pressure?', answer: 'Pascal (Pa)' },
    { prompt: 'Speed of light in vacuum (approx)?', answer: '3 x 10^8 m/s' },
    { prompt: 'Reflection law for light?', answer: 'Angle of incidence equals angle of reflection' },
    { prompt: 'What is refraction?', answer: 'Bending of light when it enters another medium' },
    { prompt: 'Can sound travel in vacuum?', answer: 'No' },
    { prompt: 'What is an echo?', answer: 'Reflection of sound' },
    { prompt: 'Ohm`s law formula?', answer: 'V = IR' },
    { prompt: 'Unit of resistance?', answer: 'Ohm' },
  ],
  mistakes: [
    {
      trap: 'Saying sound travels in vacuum.',
      correct: 'Sound needs a medium. Light can travel in vacuum.',
    },
    {
      trap: 'Writing force unit as joule.',
      correct: 'Force is newton. Joule is energy/work.',
    },
    {
      trap: 'Reversing Ohm`s law as I = VR.',
      correct: 'V = IR, so I = V/R and R = V/I.',
    },
    {
      trap: 'Confusing mass (kg) with weight.',
      correct: 'Mass is kg. Weight is a force (newtons) in physics teaching.',
    },
    {
      trap: 'Inventing exact echo distance rules not asked.',
      correct: 'Keep echo as reflected sound unless a formula is given in the question.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Memorise Newton`s three laws.' },
    { day: 'Day 2', task: 'SI base and derived units list.' },
    { day: 'Day 3', task: 'Light: reflection, refraction, speed.' },
    { day: 'Day 4', task: 'Sound vs light vacuum contrast + echo.' },
    { day: 'Day 5', task: 'Ohm`s law drills (V, I, R).' },
    { day: 'Day 6', task: 'Mixed physics MCQs.' },
    { day: 'Day 7', task: 'One-pager formulas and units from memory.' },
  ],
  sourcesLine:
    'Sources: standard everyday science physics chapters used in MPT/PPSC/NTS teaching. Stick to named laws, SI units, and Ohm`s law; avoid advanced derivations.',
}
