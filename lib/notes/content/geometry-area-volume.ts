import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (standard school / one-paper general math teaching):
 * - Plane: rectangle, square, triangle, parallelogram, circle, trapezium area formulas
 * - Solid: cube, cuboid, cylinder, cone, sphere volume (and common surface area where tested)
 * - Units: area square units; volume cubic units
 * Keep crisp formula recall; no invented exotic shapes
 */
export const GEOMETRY_AREA_VOLUME_KIT: NoteKitData = {
  id: 'geometry-area-volume',
  title: 'Geometry: Area and Volume Formulas',
  subtitle:
    'High-yield plane area and solid volume formulas for one-paper general math MCQs.',
  syllabusTags: [
    'General math',
    'Geometry',
    'Mensuration',
    'One-paper math',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'One-paper',
      directive: 'MCQ',
      angle: 'Area of triangle, circle, trapezium',
      frequency: 'high',
    },
    {
      year: 'One-paper',
      directive: 'MCQ',
      angle: 'Volume of cylinder, cone, sphere',
      frequency: 'high',
    },
    {
      year: 'PPSC / NTS / FPSC',
      directive: 'MCQ',
      angle: 'Cube and cuboid surface area / volume',
      frequency: 'high',
    },
    {
      year: 'One-paper',
      directive: 'MCQ',
      angle: 'Unit conversion between area and volume',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Rectangle area = l × w. Perimeter = 2(l + w). Square area = a². Perimeter = 4a.',
    'Triangle area = (1/2) × base × height. If sides a,b,c known, Heron: s = (a+b+c)/2, area = √[s(s-a)(s-b)(s-c)] when asked.',
    'Parallelogram area = base × height. Rhombus area = (1/2) × d1 × d2 (diagonals).',
    'Trapezium (trapezoid) area = (1/2) × (sum of parallel sides) × height = (1/2)(a+b)h.',
    'Circle: area = πr². Circumference = 2πr. Use π = 22/7 or 3.14 as the question states.',
    'Cuboid volume = lwh. Total surface area = 2(lw + lh + wh). Cube volume = a³. TSA = 6a².',
    'Cylinder: volume = πr²h. Curved surface area = 2πrh. Total surface area = 2πr(h+r).',
    'Cone: volume = (1/3)πr²h. Curved surface area = πrl (l = slant height). Sphere: volume = (4/3)πr³. Surface area = 4πr².',
    'Method: write formula, substitute, keep units consistent (cm² vs cm³). Cancel π only when it cancels in options.',
  ],
  answerSteps: [
    'Identify the shape and whether area or volume is asked.',
    'Write the standard formula before substituting numbers.',
    'Check units and π instruction (22/7 vs 3.14).',
    'For composite figures, split into known shapes and add/subtract areas or volumes.',
    'Match the option; recompute if a factor like 1/2 or 1/3 was missed.',
  ],
  questionVariants: [
    'Find the area of a triangle with base 10 and height 6.',
    'A cylinder has radius r and height h. Write volume and CSA formulas.',
    'Differentiate surface area of a cube and volume of a cube.',
    'Find the volume of a sphere of radius 7 (use π = 22/7).',
  ],
  citations: [
    {
      label: 'Triangle',
      text: 'Area = (1/2) × base × height in standard teaching.',
    },
    {
      label: 'Circle',
      text: 'Area = πr²; circumference = 2πr.',
    },
    {
      label: 'Cylinder / cone / sphere',
      text: 'V = πr²h; V = (1/3)πr²h; V = (4/3)πr³.',
    },
    {
      label: 'Cube / cuboid',
      text: 'V = a³; V = lwh; TSA cube = 6a²; TSA cuboid = 2(lw+lh+wh).',
    },
  ],
  flashcards: [
    {
      prompt: 'Area of rectangle and square?',
      answer: 'l×w and a²',
    },
    {
      prompt: 'Area of triangle?',
      answer: '(1/2) × base × height',
    },
    {
      prompt: 'Area of trapezium?',
      answer: '(1/2)(a+b)h where a,b are parallel sides',
    },
    {
      prompt: 'Circle area and circumference?',
      answer: 'πr² and 2πr',
    },
    {
      prompt: 'Cuboid volume and TSA?',
      answer: 'lwh and 2(lw+lh+wh)',
    },
    {
      prompt: 'Cube volume and TSA?',
      answer: 'a³ and 6a²',
    },
    {
      prompt: 'Cylinder volume and CSA?',
      answer: 'πr²h and 2πrh',
    },
    {
      prompt: 'Cone volume?',
      answer: '(1/3)πr²h',
    },
    {
      prompt: 'Sphere volume and surface area?',
      answer: '(4/3)πr³ and 4πr²',
    },
    {
      prompt: 'Rhombus area via diagonals?',
      answer: '(1/2) × d1 × d2',
    },
  ],
  mistakes: [
    {
      trap: 'Using (1/2)πr² for circle area.',
      correct: 'Circle area is πr²; (1/2) appears in triangle/trapezium.',
    },
    {
      trap: 'Forgetting 1/3 in cone volume.',
      correct: 'Cone volume is one-third of cylinder with same r and h.',
    },
    {
      trap: 'Mixing CSA and TSA of cylinder.',
      correct: 'CSA = 2πrh; TSA = 2πr(h+r).',
    },
    {
      trap: 'Giving area answer in cubic units.',
      correct: 'Area uses square units; volume uses cubic units.',
    },
    {
      trap: 'Ignoring the paper π value.',
      correct: 'Follow 22/7 or 3.14 as instructed.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Plane figures formula sheet.' },
    { day: 'Day 2', task: 'Cube, cuboid, cylinder formulas.' },
    { day: 'Day 3', task: 'Cone and sphere formulas.' },
    { day: 'Day 4', task: 'Flashcards.' },
    { day: 'Day 5', task: '20 mensuration MCQs timed.' },
    { day: 'Day 6', task: 'Composite area practice (2 shapes).' },
    { day: 'Day 7', task: 'Recite one-pager formulas aloud.' },
  ],
  sourcesLine:
    'Sources: standard general mathematics mensuration formulas used in Pakistani one-paper exams. Keep π and units as the question specifies.',
}
