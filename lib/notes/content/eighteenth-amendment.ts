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
    'April 2010: National Assembly 8 April, Senate 15 April, Presidential assent 19 April (Asif Ali Zardari). Published 20 April.',
    'Core aim: restore a parliamentary tilt and deepen provincial autonomy after military-era distortions.',
    'Concurrent Legislative List abolished. Most former concurrent subjects become provincial. Criminal law, criminal procedure, and evidence stay areas both federation and provinces may legislate on.',
    'CCI strengthened: Prime Minister chairs. Must meet at least once in 90 days.',
    'NFC rule: a province share in a later award shall not be less than its share in the previous award.',
    'Objectives Resolution Annex: freely restored for minority rights to profess and practise religion.',
    'Also high yield: NWFP renamed Khyber Pakhtunkhwa; Article 10A fair trial; Article 25A free and compulsory education (ages 5 to 16).',
    'Exam caution: devolution is real on paper. Capacity, finance, and centre-province practice still need a critical line.',
  ],
  answerSteps: [
    'Open with the problem: centre-heavy practice and presidential overreach had weakened the 1973 federal design.',
    'Give the 2010 timeline in one line (8 / 15 / 19 April) and the purpose: parliament and provinces.',
    'Explain Concurrent List abolition, then add the three shared leftovers: criminal law, criminal procedure, evidence.',
    'Add NFC floor and stronger CCI (PM chair, 90-day rule).',
    'Add one precise rights point: freely restored, or Article 25A / 10A.',
    'Close with balance: autonomy gains plus capacity and fiscal limits.',
  ],
  questionVariants: [
    'Critically examine the impact of the 18th Amendment on federalism in Pakistan.',
    'Discuss provincial autonomy after the abolition of the Concurrent Legislative List.',
    'Evaluate whether the 18th Amendment strengthened democracy in Pakistan.',
    'How do the NFC and CCI arrangements after 2010 support cooperative federalism? Discuss.',
  ],
  citations: [
    {
      label: 'Passage timeline',
      text: 'National Assembly: 8 April 2010. Senate: 15 April 2010. Presidential assent: 19 April 2010 (Asif Ali Zardari). Published 20 April 2010.',
    },
    {
      label: 'Concurrent List',
      text: 'Concurrent Legislative List abolished. Most former concurrent subjects become provincial. Criminal law, criminal procedure, and evidence remain shared legislative areas.',
    },
    {
      label: 'CCI',
      text: 'Council of Common Interests reconstituted with the Prime Minister as chair. The Council shall meet at least once in ninety days.',
    },
    {
      label: 'NFC floor',
      text: 'The share of a province in a subsequent NFC Award shall not be less than its share in the previous Award.',
    },
    {
      label: 'Freely (Annex)',
      text: 'Objectives Resolution Annex: freely restored in 2010 for minorities to profess and practise their religions.',
    },
    {
      label: 'Rights inserts',
      text: 'Article 10A: right to a fair trial. Article 25A: free and compulsory education for children aged five to sixteen.',
    },
  ],
  flashcards: [
    { prompt: 'When did the National Assembly pass the 18th Amendment?', answer: '8 April 2010' },
    { prompt: 'When did the Senate pass it?', answer: '15 April 2010' },
    { prompt: 'When did it receive presidential assent?', answer: '19 April 2010' },
    { prompt: 'Who signed the assent in 2010?', answer: 'President Asif Ali Zardari' },
    {
      prompt: 'What happened to the Concurrent Legislative List?',
      answer: 'It was abolished',
    },
    {
      prompt: 'Which three subjects stay shared after the Concurrent List ends?',
      answer: 'Criminal law, criminal procedure, and evidence',
    },
    {
      prompt: 'Who chairs the CCI after the 18th Amendment?',
      answer: 'The Prime Minister',
    },
    {
      prompt: 'How often must the CCI meet at minimum?',
      answer: 'At least once in 90 days',
    },
    {
      prompt: 'What is the NFC provincial share rule after 2010?',
      answer: 'A later award share shall not be less than the previous award share',
    },
    {
      prompt: 'What word was restored in the Objectives Resolution Annex?',
      answer: 'freely',
    },
    {
      prompt: 'What was NWFP renamed?',
      answer: 'Khyber Pakhtunkhwa',
    },
    {
      prompt: 'What does Article 25A provide?',
      answer: 'Free and compulsory education for ages 5 to 16',
    },
  ],
  mistakes: [
    {
      trap: 'Saying every former concurrent subject is now purely provincial with no exception.',
      correct: 'Criminal law, criminal procedure, and evidence remain shared legislative areas.',
    },
    {
      trap: 'Mixing NFC and CCI as the same body.',
      correct: 'NFC is about fiscal shares. CCI is intergovernmental coordination. PM chairs CCI.',
    },
    {
      trap: 'Claiming freely was newly invented in 2010.',
      correct: 'freely was in the 1949 text, missing in the 1985 Annex, restored in 2010.',
    },
    {
      trap: 'Confusing the 17th Amendment with the 18th.',
      correct: '17th strengthened presidential tilt. 18th restored parliamentary and provincial balance.',
    },
    {
      trap: 'Treating devolution as finished in practice because the text changed.',
      correct: 'Constitutional devolution is one step. Capacity and financing still need critique.',
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
