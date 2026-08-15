import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked for basic computer / one-paper IT:
 * - Binary (base 2), octal (base 8), decimal (base 10), hexadecimal (base 16) with digits 0-9 and A-F
 * - Boolean operations: AND, OR, NOT (and often XOR in extended MCQs)
 * - Truth tables and simple gate logic at name level
 * - Do not invent advanced digital design beyond MCQ syllabus
 */
export const BOOLEAN_LOGIC_NUMBER_SYSTEMS_KIT: NoteKitData = {
  id: 'boolean-logic-number-systems',
  title: 'Boolean Logic and Number Systems',
  subtitle:
    'Binary, hex, and AND/OR/NOT truth tables for basic computer MCQs.',
  syllabusTags: [
    'Basic computer',
    'Number systems',
    'Boolean logic',
    'One-paper IT',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'One-paper',
      directive: 'MCQ',
      angle: 'Binary/hex conversion and place value',
      frequency: 'high',
    },
    {
      year: 'One-paper',
      directive: 'MCQ',
      angle: 'AND, OR, NOT truth table outputs',
      frequency: 'high',
    },
    {
      year: 'FPSC / PPSC IT pattern',
      directive: 'MCQ',
      angle: 'Bit, byte, and base identification',
      frequency: 'medium',
    },
    {
      year: 'Basic computer',
      directive: 'MCQ',
      angle: 'XOR or simple Boolean expression evaluation',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Number system: a method of representing numbers with a base (radix). Decimal base 10; binary base 2 (digits 0,1); octal base 8 (0-7); hexadecimal base 16 (0-9 and A-F for 10-15).',
    'Binary place values (from right): 1, 2, 4, 8, 16, 32, … Powers of 2. Convert binary→decimal by summing place values where bits are 1.',
    'Decimal→binary: repeated divide by 2; remainders form bits from bottom to top (standard exam method).',
    'Hexadecimal: each hex digit maps to 4 bits (nibble). Example pattern: A=10=1010, F=15=1111. Group binary bits in fours to convert to hex.',
    'Bit = binary digit (0 or 1). Nibble = 4 bits. Byte = 8 bits (common MCQ).',
    'Boolean logic: values TRUE/FALSE or 1/0. AND: 1 only if both inputs 1. OR: 1 if at least one input 1. NOT: inverts 0↔1.',
    'XOR (exclusive OR) often appears: 1 if inputs differ. Useful for parity MCQs.',
    'Truth table habit: list all input combinations, then write outputs for the operator or expression (e.g. A AND (NOT B)).',
    'Exam tip: convert carefully with place values; for logic, rewrite the expression and evaluate step by step. Do not guess from word associations alone.',
  ],
  answerSteps: [
    'Identify whether the question is conversion or Boolean evaluation.',
    'For conversion: write place values or 4-bit hex groups.',
    'For logic: build a mini truth table or substitute 0/1 into the expression.',
    'Apply AND/OR/NOT (and XOR if present) in parentheses order.',
    'Re-check bit grouping and that hex digits stay within 0-F.',
  ],
  questionVariants: [
    'Convert (101101)_2 to decimal.',
    'Convert decimal 45 to binary and hexadecimal.',
    'Give the truth table of AND, OR, and NOT.',
    'Evaluate (A OR B) AND (NOT A) for given A,B values.',
  ],
  citations: [
    {
      label: 'Bases',
      text: 'Binary 2, octal 8, decimal 10, hexadecimal 16 (digits 0-9, A-F).',
    },
    {
      label: 'Hex ↔ binary',
      text: 'One hex digit = 4 bits.',
    },
    {
      label: 'AND / OR / NOT',
      text: 'AND: both 1; OR: any 1; NOT: invert.',
    },
    {
      label: 'Byte',
      text: '8 bits in standard one-paper teaching.',
    },
  ],
  flashcards: [
    { prompt: 'Binary digits are?', answer: '0 and 1' },
    {
      prompt: 'Hex digits for ten to fifteen?',
      answer: 'A, B, C, D, E, F',
    },
    {
      prompt: 'How many bits in one hex digit?',
      answer: '4',
    },
    {
      prompt: 'How many bits in a byte?',
      answer: '8',
    },
    {
      prompt: 'AND output is 1 when?',
      answer: 'All inputs are 1',
    },
    {
      prompt: 'OR output is 0 when?',
      answer: 'All inputs are 0',
    },
    {
      prompt: 'NOT 1 equals?',
      answer: '0',
    },
    {
      prompt: 'XOR is 1 when?',
      answer: 'Inputs are different',
    },
    {
      prompt: 'Place values of 4-bit binary from right?',
      answer: '1, 2, 4, 8',
    },
    {
      prompt: 'What is a nibble?',
      answer: '4 bits',
    },
  ],
  mistakes: [
    {
      trap: 'Reading binary place values from the left without checking length.',
      correct: 'Assign powers of 2 from the rightmost bit.',
    },
    {
      trap: 'Using digits 8 or 9 in octal.',
      correct: 'Octal digits only go 0-7.',
    },
    {
      trap: 'Confusing AND with OR.',
      correct: 'AND needs all 1s; OR needs any 1.',
    },
    {
      trap: 'Treating hex A as decimal 11.',
      correct: 'A = 10, B = 11, …, F = 15.',
    },
    {
      trap: 'Grouping binary into threes when converting to hex.',
      correct: 'Hex uses groups of 4 bits; octal uses groups of 3.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Memorise bases, bits, nibble, byte.' },
    { day: 'Day 2', task: 'Binary ↔ decimal conversions (10 drills).' },
    { day: 'Day 3', task: 'Hex ↔ binary grouping drills.' },
    { day: 'Day 4', task: 'AND/OR/NOT truth tables from memory.' },
    { day: 'Day 5', task: 'Mixed Boolean expressions + XOR.' },
    { day: 'Day 6', task: 'One-pager + timed MCQs.' },
    { day: 'Day 7', task: 'Recite operators and hex map A-F.' },
  ],
  sourcesLine:
    'Sources: standard Basic Computer / ICT one-paper chapters on number systems and Boolean operators; FPSC/PPSC IT MCQ patterns. Keep to conversion methods and truth tables, not advanced circuit design.',
}
