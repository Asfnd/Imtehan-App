import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked:
 * - 18th Amendment Act 2010: NA 8 Apr, Senate 15 Apr, Presidential assent 19 Apr 2010, published 20 Apr
 * - Major theme: provincial autonomy; Concurrent Legislative List abolished
 * - Restored "freely" in Objectives Resolution Annex
 * - Strengthened parliamentary character after LFO / 17th Amendment era changes
 */
export const EIGHTEENTH_AMENDMENT_KIT: NoteKitData = {
  id: 'eighteenth-amendment',
  title: '18th Amendment (2010)',
  subtitle:
    'Provincial autonomy, the end of the Concurrent List, and how to write this for CSS and one-paper exams.',
  syllabusTags: [
    'Recent constitutional and legal debates (XXVII)',
    'Federalism and provinces',
    'Constitutional amendments',
  ],
  updated: '14 Aug 2026',
  pastPapers: [
    {
      year: 'CSS pattern',
      directive: 'Critically examine',
      angle: 'Impact of the 18th Amendment on federalism',
      frequency: 'high',
    },
    {
      year: 'CSS / PMS',
      directive: 'Discuss',
      angle: 'Provincial autonomy after abolition of the Concurrent List',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Evaluate',
      angle: 'Capacity challenges of provinces after devolution',
      frequency: 'medium',
    },
    {
      year: 'One-paper / MPT',
      directive: 'MCQ fact',
      angle: 'Year 2010, Concurrent List, freely restored',
      frequency: 'high',
    },
  ],
  onePager: [
    'Constitution (Eighteenth Amendment) Act, 2010. Assent 19 April 2010. Published 20 April 2010.',
    'Core political aim: strengthen parliamentary federalism and provincial autonomy.',
    'The Concurrent Legislative List was abolished. Many subjects moved to the provinces.',
    'Renamed NWFP as Khyber Pakhtunkhwa. Updated provincial naming in the Constitution.',
    'Restored the word freely in the Objectives Resolution Annex (minority rights language).',
    'Repealed the Legal Framework Order 2002 package and the Seventeenth Amendment as part of restoring parliamentary balance.',
    'Exam caution: devolution created rights and responsibilities. Capacity, finance, and coordination problems remain part of a strong answer.',
    'Link topics: federalism, 1973 Constitution, Art 2A Annex, education/health after devolution, NFC politics.',
  ],
  answerSteps: [
    'Define the 18th Amendment as a large federalism and parliamentary reset in 2010.',
    'State verified basics: Act of 2010, assent 19 April, Concurrent List abolished.',
    'Explain provincial autonomy: more legislative space, renamed Khyber Pakhtunkhwa, stronger provincial role.',
    'Add one precise rights point: freely restored in the Objectives Resolution Annex.',
    'Give a balanced critique: autonomy is real, but provinces still face capacity, fiscal, and coordination limits.',
    'Close with present relevance: debates on education, health, local government, and centre-province conflict still flow from 2010.',
  ],
  questionVariants: [
    'Critically examine the impact of the 18th Amendment on federalism in Pakistan.',
    'Discuss provincial autonomy after the abolition of the Concurrent Legislative List.',
    'Evaluate whether the 18th Amendment strengthened democracy in Pakistan.',
    'How does the 18th Amendment connect to minority rights language in the Objectives Resolution Annex? Discuss.',
  ],
  citations: [
    {
      label: 'Act and assent',
      text: 'Constitution (Eighteenth Amendment) Act, 2010. Presidential assent on 19 April 2010. Published 20 April 2010.',
    },
    {
      label: 'Concurrent List',
      text: 'The Concurrent Legislative List was abolished. Subjects were largely provincialised.',
    },
    {
      label: 'Provincial name',
      text: 'North-West Frontier Province was renamed Khyber Pakhtunkhwa.',
    },
    {
      label: 'Freely',
      text: 'The 18th Amendment restored the word freely in the Objectives Resolution Annex.',
    },
    {
      label: 'Parliamentary reset',
      text: 'The amendment package repealed the LFO 2002 framework and the Seventeenth Amendment as part of restoring parliamentary balance.',
    },
  ],
  flashcards: [
    { prompt: 'In which year was the 18th Amendment enacted?', answer: '2010' },
    { prompt: 'When did the President assent to the 18th Amendment?', answer: '19 April 2010' },
    {
      prompt: 'What happened to the Concurrent Legislative List?',
      answer: 'It was abolished',
    },
    {
      prompt: 'What was NWFP renamed?',
      answer: 'Khyber Pakhtunkhwa',
    },
    {
      prompt: 'What word was restored in the Objectives Resolution Annex?',
      answer: 'freely',
    },
    {
      prompt: 'Name the main federalism effect of the amendment.',
      answer: 'Greater provincial autonomy through devolution of subjects',
    },
    {
      prompt: 'Which earlier amendment package did the 18th help undo?',
      answer: 'LFO 2002 framework and the Seventeenth Amendment',
    },
    {
      prompt: 'Give one critique for a balanced answer.',
      answer: 'Provinces gained power but still face capacity and fiscal limits',
    },
    {
      prompt: 'Link one social sector to devolution.',
      answer: 'Education and health became more provincial after the Concurrent List ended',
    },
    {
      prompt: 'Which FPSC PA item does this map to?',
      answer: 'Recent constitutional and legal debates (XXVII)',
    },
  ],
  mistakes: [
    {
      trap: 'Saying the 18th Amendment created the 1973 Constitution.',
      correct: 'It amended the existing 1973 Constitution in 2010.',
    },
    {
      trap: 'Claiming all problems of federalism disappeared after 2010.',
      correct: 'Autonomy increased, but capacity, money, and coordination issues remain.',
    },
    {
      trap: 'Forgetting the freely restoration.',
      correct: 'Freely in the Annex is a precise minority-rights mark earner.',
    },
    {
      trap: 'Mixing 18th Amendment with Article 2A insertion.',
      correct: 'Article 2A was inserted in 1985. Freely was restored in 2010.',
    },
    {
      trap: 'Only listing renamed province and stopping.',
      correct: 'Lead with Concurrent List abolition and autonomy, then add naming and freely.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Read overview and before/after federalism table.' },
    { day: 'Day 2', task: 'Memorise 2010 dates, Concurrent List, freely, Khyber Pakhtunkhwa.' },
    { day: 'Day 3', task: 'Write a 10-minute outline on federalism impact.' },
    { day: 'Day 4', task: 'Drill flashcards.' },
    { day: 'Day 5', task: 'Write one full timed answer from the variants.' },
    { day: 'Day 6', task: 'One-pager + citations. Practice MCQs.' },
    { day: 'Day 7', task: 'One-pager only. Add one critique line from memory.' },
  ],
  sourcesLine:
    'Sources: Constitution (Eighteenth Amendment) Act, 2010 (NA publication); Constitution of Pakistan; FPSC Pakistan Affairs syllabus XXVII; link to Objectives Resolution Annex freely language.',
}
