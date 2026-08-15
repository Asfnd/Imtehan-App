import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked:
 * - Election Commission of Pakistan: constitutional body; Art 218 establishes ECP; Art 219 duties (conduct of elections etc.) in standard teaching
 * - Adult franchise: universal adult suffrage for citizens meeting constitutional/legal age and other legal qualifications
 * - National Assembly and Provincial Assemblies: primarily first-past-the-post (FPTP / plurality) in single-member constituencies for general seats
 * - Senate: indirectly elected by provincial assemblies (and other designated electors as per constitutional scheme)
 * - President: elected by electoral college (NA, Senate, Provincial Assemblies) under the Constitution
 * - Legal frame themes: Representation of the People Act, 1976 and Elections Act reforms (Elections Act, 2017 is a major consolidation name in teaching)
 * Avoid inventing seat totals that change by census/delimitation as permanent frozen facts without care
 */
export const ELECTION_SYSTEM_PAKISTAN_KIT: NoteKitData = {
  id: 'election-system-pakistan',
  title: 'Election System of Pakistan',
  subtitle:
    'ECP, adult franchise, FPTP for assemblies, and indirect elections for Senate and President for CSS and PMS.',
  syllabusTags: [
    'Election Commission',
    'Adult franchise',
    'FPTP',
    'Electoral system',
    'Constitution',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS / PMS',
      directive: 'Discuss',
      angle: 'Electoral system of Pakistan',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Evaluate',
      angle: 'Role of the Election Commission of Pakistan',
      frequency: 'high',
    },
    {
      year: 'CSS / PMS',
      directive: 'Critically examine',
      angle: 'FPTP strengths and weaknesses in Pakistan',
      frequency: 'medium',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'Art 218 ECP; adult franchise; FPTP; Senate indirect',
      frequency: 'high',
    },
  ],
  onePager: [
    'Pakistan electoral system combines adult franchise for general assembly elections with institutional management by the Election Commission of Pakistan (ECP).',
    'ECP: constitutional body under Article 218. Article 219 sets out duties including conducting elections to assemblies and related electoral functions in standard teaching.',
    'Adult franchise: citizens who meet the legal voting age and other legal qualifications can vote. It is a foundational democratic principle in Pakistan Affairs answers.',
    'FPTP (first-past-the-post / plurality): for National Assembly and Provincial Assembly general seats, the candidate with the most votes in a constituency wins, even without an absolute majority.',
    'Reserved seats for women and non-Muslims follow constitutional and statutory allocation rules (proportional allocation among parties in standard teaching). Do not confuse with FPTP general seats.',
    'Senate: indirectly elected, mainly by provincial assemblies under the constitutional scheme. Not a direct popular FPTP chamber.',
    'President: elected by an electoral college of the two houses of Parliament and the Provincial Assemblies.',
    'Statute themes: Representation of the People Act 1976 historically framed many assembly election rules; Elections Act 2017 is a major consolidation/reform name in recent teaching.',
    'Answer close: free and fair polls need ECP independence, accurate rolls, delimitation integrity, campaign finance discipline, and peaceful acceptance of results.',
  ],
  answerSteps: [
    'Open with adult franchise and constitutional democracy.',
    'Explain ECP under Arts 218-219.',
    'Define FPTP for NA/PA general seats.',
    'Distinguish reserved seats, Senate, and presidential election modes.',
    'Add legal frame themes (ROPA / Elections Act 2017).',
    'Conclude with fairness conditions beyond ballot day.',
  ],
  questionVariants: [
    'Discuss the electoral system of Pakistan.',
    'Evaluate the role of the Election Commission of Pakistan.',
    'Critically examine first-past-the-post elections in Pakistan.',
    'Explain adult franchise and how different houses are elected.',
  ],
  citations: [
    {
      label: 'ECP',
      text: 'Article 218 establishes the Election Commission of Pakistan. Article 219 sets out its duties in the constitutional scheme.',
    },
    {
      label: 'Adult franchise',
      text: 'Assembly elections rest on universal adult suffrage for qualified citizens.',
    },
    {
      label: 'FPTP',
      text: 'National and Provincial Assembly general seats use first-past-the-post in single-member constituencies.',
    },
    {
      label: 'Indirect elections',
      text: 'Senate is indirectly elected. President is elected by an electoral college of Parliament and Provincial Assemblies.',
    },
    {
      label: 'Statutes',
      text: 'Representation of the People Act 1976 and Elections Act 2017 are major statutory names in election-law teaching.',
    },
  ],
  flashcards: [
    {
      prompt: 'Which Article establishes the ECP?',
      answer: 'Article 218',
    },
    {
      prompt: 'Which Article sets out ECP duties in standard teaching?',
      answer: 'Article 219',
    },
    {
      prompt: 'What does adult franchise mean?',
      answer: 'Voting rights for all adult citizens who meet legal qualifications',
    },
    {
      prompt: 'What system elects NA/PA general seat members?',
      answer: 'First-past-the-post (plurality) in single-member constituencies',
    },
    {
      prompt: 'Does FPTP require 50% plus one votes?',
      answer: 'No; the highest vote total wins even without an absolute majority',
    },
    {
      prompt: 'How is the Senate mainly elected?',
      answer: 'Indirectly, chiefly by provincial assemblies under the constitutional scheme',
    },
    {
      prompt: 'Who elects the President?',
      answer: 'An electoral college of NA, Senate, and Provincial Assemblies',
    },
    {
      prompt: 'Name two major election statute labels.',
      answer: 'Representation of the People Act 1976; Elections Act 2017',
    },
    {
      prompt: 'Name one FPTP strength and one weakness.',
      answer: 'Strength: simple local accountability. Weakness: can waste votes and distort seat-vote share',
    },
    {
      prompt: 'Are reserved seats filled the same way as general FPTP seats?',
      answer: 'No; they follow separate constitutional/statutory allocation rules',
    },
  ],
  mistakes: [
    {
      trap: 'Saying the Senate is directly elected by popular FPTP.',
      correct: 'Senate is indirectly elected under the constitutional scheme.',
    },
    {
      trap: 'Claiming FPTP always produces majority vote winners.',
      correct: 'Winners need only the most votes, not necessarily 50%+.',
    },
    {
      trap: 'Treating ECP as an ordinary executive department.',
      correct: 'ECP is a constitutional body (Art 218).',
    },
    {
      trap: 'Confusing reserved seat allocation with general constituency FPTP.',
      correct: 'Keep the two mechanisms distinct.',
    },
    {
      trap: 'Inventing permanent seat totals without delimitation caution.',
      correct: 'Seat numbers can change with law and delimitation; focus on system logic.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'ECP Arts 218-219.' },
    { day: 'Day 2', task: 'Adult franchise + FPTP definition.' },
    { day: 'Day 3', task: 'Senate and President election modes.' },
    { day: 'Day 4', task: 'Flashcards.' },
    { day: 'Day 5', task: 'FPTP strengths/weaknesses paragraph.' },
    { day: 'Day 6', task: '10-minute discuss outline.' },
    { day: 'Day 7', task: 'Recite one-pager.' },
  ],
  sourcesLine:
    'Sources: Constitution Arts 218-219 and electoral college provisions, ROPA/Elections Act teaching notes, and standard Pakistan Affairs electoral-system primers. Avoid outdated seat trivia as frozen facts.',
}
