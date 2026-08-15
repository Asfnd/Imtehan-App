import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked time-speed-distance (TSD) exam math:
 * - Distance = Speed x Time; Speed = Distance / Time; Time = Distance / Speed
 * - Average speed (equal distances): harmonic mean pattern 2xy/(x+y) for two speeds over same distance
 * - Average speed (equal times): arithmetic mean of speeds
 * - Relative speed: same direction = difference; opposite direction = sum
 * - Train problems: distance = length of train (+ length of platform when crossing platform)
 * Keep units consistent (km/h and hours, or m/s and seconds). Convert: multiply km/h by 5/18 for m/s; multiply m/s by 18/5 for km/h
 */
export const TIME_SPEED_DISTANCE_MATH_KIT: NoteKitData = {
  id: 'time-speed-distance-math',
  title: 'Time, Speed and Distance (Exam Math)',
  subtitle:
    'Core formulas, average-speed traps, relative speed, and unit conversion for one-paper and CSS quantitative sets.',
  syllabusTags: [
    'Mathematics',
    'Time speed distance',
    'Relative speed',
    'Average speed',
    'One-paper math',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'One-paper / MPT',
      directive: 'MCQ fact',
      angle: 'Distance = speed x time; unit conversion',
      frequency: 'high',
    },
    {
      year: 'CSS / PMS aptitude',
      directive: 'Solve',
      angle: 'Average speed and relative speed problems',
      frequency: 'high',
    },
    {
      year: 'One-paper',
      directive: 'MCQ',
      angle: 'Two speeds over same distance (harmonic average)',
      frequency: 'high',
    },
    {
      year: 'PPSC / FPSC',
      directive: 'Solve',
      angle: 'Train crossing platform / opposite direction',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Master identity: Distance = Speed x Time. Rearrange cleanly; never mix hours with minutes without conversion.',
    'Unit conversion: km/h to m/s multiply by 5/18. m/s to km/h multiply by 18/5.',
    'Average speed is total distance divided by total time. It is not always the arithmetic mean of speeds.',
    'Equal distances at speeds x and y: average speed = 2xy/(x+y). Equal times at speeds x and y: average = (x+y)/2.',
    'Relative speed, same direction: |u - v|. Opposite direction: u + v. Meeting or gap-closing uses relative speed.',
    'Trains: time to pass a pole or person uses train length only. Time to pass a platform uses train length + platform length.',
    'Boats (if asked): downstream = still water + current; upstream = still water - current.',
    'Method: draw a one-line sketch, convert units first, then apply the matching average or relative formula.',
    'Answer close: most wrong options come from arithmetic-mean abuse or forgotten platform length.',
  ],
  answerSteps: [
    'Write knowns with units; convert early.',
    'Choose formula: basic D=ST, average, or relative.',
    'For two-speed trips, check equal distance vs equal time.',
    'For trains, decide pole vs platform length rule.',
    'Compute carefully; sanity-check magnitude.',
    'Match options; avoid premature rounding.',
  ],
  questionVariants: [
    'A car covers equal distances at 40 and 60 km/h. Find average speed.',
    'Two trains move in opposite directions. Find relative speed and meeting time.',
    'Convert 72 km/h to m/s and solve a crossing-time problem.',
    'A train passes a platform. Which lengths enter the distance?',
  ],
  citations: [
    {
      label: 'Core identity',
      text: 'Distance = Speed x Time; Speed = Distance / Time; Time = Distance / Speed.',
    },
    {
      label: 'Unit conversion',
      text: 'km/h to m/s: x 5/18. m/s to km/h: x 18/5.',
    },
    {
      label: 'Equal-distance average',
      text: 'For speeds x and y over equal distances, average speed = 2xy/(x+y).',
    },
    {
      label: 'Relative speed',
      text: 'Same direction: difference of speeds. Opposite direction: sum of speeds.',
    },
    {
      label: 'Train platform rule',
      text: 'Crossing a platform uses train length plus platform length as distance.',
    },
  ],
  flashcards: [
    {
      prompt: 'Core TSD identity?',
      answer: 'Distance = Speed x Time',
    },
    {
      prompt: '72 km/h in m/s?',
      answer: '20 m/s (72 x 5/18)',
    },
    {
      prompt: '10 m/s in km/h?',
      answer: '36 km/h (10 x 18/5)',
    },
    {
      prompt: 'Average speed definition?',
      answer: 'Total distance / total time',
    },
    {
      prompt: 'Equal distances at x and y: average speed?',
      answer: '2xy/(x+y)',
    },
    {
      prompt: 'Equal times at x and y: average speed?',
      answer: '(x+y)/2',
    },
    {
      prompt: 'Relative speed opposite direction?',
      answer: 'Sum of speeds',
    },
    {
      prompt: 'Relative speed same direction?',
      answer: 'Absolute difference of speeds',
    },
    {
      prompt: 'Train passing a pole: distance equals?',
      answer: 'Length of the train',
    },
    {
      prompt: 'Train passing a platform: distance equals?',
      answer: 'Train length + platform length',
    },
    {
      prompt: 'Downstream boat speed?',
      answer: 'Still-water speed + current speed',
    },
    {
      prompt: 'Why is (40+60)/2 wrong for equal 40 and 60 km legs?',
      answer: 'Equal distances need 2xy/(x+y) = 48 km/h, not 50',
    },
  ],
  mistakes: [
    {
      trap: 'Using arithmetic mean for equal-distance two-speed trips.',
      correct: 'Use 2xy/(x+y). Example: 40 and 60 over equal legs average 48, not 50.',
    },
    {
      trap: 'Mixing minutes with hours in D=ST.',
      correct: 'Convert to hours or to minutes consistently before multiplying.',
    },
    {
      trap: 'Forgetting platform length when a train crosses a platform.',
      correct: 'Distance = train length + platform length.',
    },
    {
      trap: 'Using sum of speeds for same-direction relative motion.',
      correct: 'Same direction uses the difference; opposite uses the sum.',
    },
    {
      trap: 'Converting km/h to m/s by dividing by 5/18.',
      correct: 'Multiply by 5/18 (or divide by 3.6).',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'D=ST and unit conversion drill.' },
    { day: 'Day 2', task: 'Average speed equal distance vs equal time.' },
    { day: 'Day 3', task: 'Relative speed meeting problems.' },
    { day: 'Day 4', task: 'Flashcards.' },
    { day: 'Day 5', task: 'Train pole vs platform set.' },
    { day: 'Day 6', task: 'Mixed timed MCQs.' },
    { day: 'Day 7', task: 'Error-log only revision.' },
  ],
  sourcesLine:
    'Sources: standard one-paper quantitative aptitude TSD chapters (average speed, relative speed, trains). Prefer formula logic over memorised answer keys alone.',
}
