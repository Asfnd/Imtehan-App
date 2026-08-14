import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked:
 * - CPU: control unit + ALU (+ registers/cache hierarchy in modern teaching)
 * - RAM: volatile primary memory; ROM: non-volatile firmware-style memory in classic MCQs
 * - Storage: HDD/SSD secondary storage; bit-byte-KB-MB-GB-TB units
 * - I/O: input (keyboard, mouse, scanner) vs output (monitor, printer, speaker); some devices both (touchscreen)
 * - One-paper IT facts; avoid inventing brand-specific speeds
 */
export const COMPUTER_HARDWARE_BASICS_KIT: NoteKitData = {
  id: 'computer-hardware-basics',
  title: 'Computer Hardware Basics (CPU, RAM, Storage, I/O)',
  subtitle:
    'CPU, memory, storage hierarchy, and input/output devices for classic one-paper computer MCQs.',
  syllabusTags: [
    'Basic computer',
    'Hardware',
    'CPU and memory',
    'One-paper IT',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'CPU parts: ALU and control unit',
      frequency: 'high',
    },
    {
      year: 'PPSC / NTS',
      directive: 'MCQ fact',
      angle: 'RAM vs ROM; volatile vs non-volatile',
      frequency: 'high',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'HDD vs SSD; bit-byte units',
      frequency: 'high',
    },
    {
      year: 'CSS MPT',
      directive: 'MCQ fact',
      angle: 'Input vs output devices',
      frequency: 'high',
    },
  ],
  onePager: [
    'Hardware: physical parts of a computer. Software: programs and instructions.',
    'CPU (Central Processing Unit): brain of the computer. Classic parts: Control Unit (CU) directs operations; ALU (Arithmetic Logic Unit) does arithmetic and logic. Registers hold immediate data; cache is fast memory near the CPU.',
    'RAM (Random Access Memory): primary working memory. Volatile: contents lost when power is off. More RAM generally helps multitasking.',
    'ROM (Read Only Memory): non-volatile memory for firmware/bootstrap instructions in classic MCQ framing. Not a substitute for RAM.',
    'Secondary storage: keeps data when power is off. HDD (magnetic disks) vs SSD (flash memory, typically faster, no moving parts). USB flash drives are portable secondary storage.',
    'Units: bit (0/1) to byte (8 bits) to KB, MB, GB, TB (powers of 1024 in classic binary teaching; some marketing uses 1000).',
    'Input devices: keyboard, mouse, scanner, microphone, webcam. Output devices: monitor, printer, speaker, projector. Touchscreen is both input and output.',
    'Motherboard connects CPU, RAM, storage controllers, and I/O interfaces. Ports (USB, HDMI) are external connection points.',
  ],
  answerSteps: [
    'Define hardware vs software if the stem is broad.',
    'Explain CPU with CU + ALU (+ register/cache if marks allow).',
    'Contrast RAM (volatile primary) with ROM and with secondary storage.',
    'Name HDD vs SSD difference in one line.',
    'Classify listed devices as input, output, or both.',
    'Close with a unit conversion if the MCQ is quantitative.',
  ],
  questionVariants: [
    'What are the main parts of a CPU? Explain briefly.',
    'Differentiate RAM and ROM.',
    'Differentiate HDD and SSD.',
    'Classify keyboard, monitor, and touchscreen as input/output devices.',
  ],
  citations: [
    {
      label: 'CPU',
      text: 'CPU includes the Control Unit and ALU; it executes instructions.',
    },
    {
      label: 'RAM',
      text: 'RAM is volatile primary memory used while programs run.',
    },
    {
      label: 'Storage',
      text: 'Secondary storage (HDD/SSD) retains data without power.',
    },
    {
      label: 'Byte',
      text: 'One byte equals eight bits in standard teaching.',
    },
  ],
  flashcards: [
    { prompt: 'Two classic CPU parts?', answer: 'Control Unit and ALU' },
    { prompt: 'Is RAM volatile?', answer: 'Yes' },
    { prompt: 'ROM volatile or non-volatile?', answer: 'Non-volatile' },
    { prompt: '1 byte = how many bits?', answer: '8' },
    { prompt: 'HDD vs SSD in one word difference?', answer: 'SSD is typically faster / no moving parts (flash)' },
    { prompt: 'Keyboard: input or output?', answer: 'Input' },
    { prompt: 'Monitor: input or output?', answer: 'Output' },
    { prompt: 'Touchscreen: input or output?', answer: 'Both' },
    { prompt: 'What does ALU do?', answer: 'Arithmetic and logic operations' },
    { prompt: 'Secondary storage example?', answer: 'HDD, SSD, or USB flash drive' },
  ],
  mistakes: [
    {
      trap: 'Saying RAM keeps files after shutdown.',
      correct: 'RAM is volatile. Secondary storage keeps files after power-off.',
    },
    {
      trap: 'Calling the monitor an input device.',
      correct: 'Monitor is output (unless it is a touchscreen, which is both).',
    },
    {
      trap: 'Treating ROM as the main working memory for apps.',
      correct: 'Apps run from RAM. ROM holds firmware-type instructions in classic framing.',
    },
    {
      trap: 'Saying 1 byte = 1 bit.',
      correct: '1 byte = 8 bits.',
    },
    {
      trap: 'Confusing CPU with UPS.',
      correct: 'CPU processes instructions. UPS is a power backup device.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'CPU: CU, ALU, register, cache labels.' },
    { day: 'Day 2', task: 'RAM vs ROM vs secondary storage.' },
    { day: 'Day 3', task: 'HDD vs SSD and memory units.' },
    { day: 'Day 4', task: 'Input/output device classification drill.' },
    { day: 'Day 5', task: 'Motherboard/ports name-level.' },
    { day: 'Day 6', task: 'Flashcards + trap questions.' },
    { day: 'Day 7', task: 'One-pager only.' },
  ],
  sourcesLine:
    'Sources: standard basic computer / one-paper IT hardware chapters. Pair with computer-networking-basics for OSI/TCP questions.',
}
