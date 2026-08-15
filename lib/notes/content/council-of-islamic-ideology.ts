import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (CII constitutional body carefully):
 * - Constitution of Pakistan 1973: Arts 228-230 establish and empower the Council of Islamic Ideology (Islamic Council)
 * - Art 228: composition and status as a constitutional advisory body
 * - Art 229: reference by Parliament/President/Governor on whether a proposed law is repugnant to Injunctions of Islam
 * - Art 230: functions include advising on ways to enable Muslims to order lives per Islam, and recommending measures to bring laws into conformity with Islam
 * - Character: recommendatory / advisory in standard exam framing; not a substitute for Parliament or the courts
 * Avoid inventing membership quotas as frozen trivia if unsure; keep to constitutional function map
 */
export const COUNCIL_OF_ISLAMIC_IDEOLOGY_KIT: NoteKitData = {
  id: 'council-of-islamic-ideology',
  title: 'Council of Islamic Ideology',
  subtitle:
    'Arts 228-230 map, advisory functions, and exam-safe limits of the Islamic Council under the 1973 Constitution.',
  syllabusTags: [
    'Council of Islamic Ideology',
    'Islamic provisions',
    '1973 Constitution',
    'Article 228',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS / PMS',
      directive: 'Discuss',
      angle: 'Role of the Council of Islamic Ideology',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Evaluate',
      angle: 'Arts 228-230 and Islamisation advice',
      frequency: 'high',
    },
    {
      year: 'Islamiat / PA overlap',
      directive: 'Critically examine',
      angle: 'Advisory limits of CII versus Parliament and courts',
      frequency: 'medium',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'CII Arts 228-230; recommendatory character',
      frequency: 'high',
    },
  ],
  onePager: [
    'The Council of Islamic Ideology (also called the Islamic Council in constitutional language) is a constitutional body under Articles 228 to 230 of the 1973 Constitution.',
    'Art 228: establishes the Council and deals with composition and related organisational matters in the constitutional text.',
    'Art 229: Parliament, the President, or a Governor may refer a proposed law for advice on whether it is repugnant to the Injunctions of Islam.',
    'Art 230: functions include advising how Muslims may order their lives in accordance with Quran and Sunnah, and recommending how existing laws may be brought into conformity with Islam.',
    'Exam character: CII advice is recommendatory. It guides Islamisation debate; it does not replace legislation by Parliament or adjudication by courts.',
    'Distinguish carefully from the Federal Shariat Court: CII advises; FSC exercises Shariat jurisdiction over laws under Chapter 3A (Arts 203A onward).',
    'Critical line: effectiveness depends on political will to consider recommendations, quality of scholarship on the Council, and clarity about advisory limits.',
    'Answer close: CII is an institutional bridge between Islamic injunctions and the legislative process, valuable when used as advice, not as a parallel legislature.',
  ],
  answerSteps: [
    'Identify CII as a constitutional body under Arts 228-230.',
    'Explain Art 229 reference mechanism for proposed laws.',
    'State Art 230 advisory and conformity-recommendation functions.',
    'Stress recommendatory character versus Parliament and courts.',
    'Distinguish CII from Federal Shariat Court.',
    'Close with a balanced judgment on usefulness and limits.',
  ],
  questionVariants: [
    'Discuss the role of the Council of Islamic Ideology under the 1973 Constitution.',
    'Evaluate Articles 228 to 230 of the Constitution.',
    'Critically examine the advisory limits of the Council of Islamic Ideology.',
    'Distinguish the Council of Islamic Ideology from the Federal Shariat Court.',
  ],
  citations: [
    {
      label: 'Arts 228-230',
      text: 'Council of Islamic Ideology (Islamic Council) is established and empowered under Articles 228 to 230 of the 1973 Constitution.',
    },
    {
      label: 'Art 229',
      text: 'Proposed laws may be referred for advice on repugnancy to the Injunctions of Islam.',
    },
    {
      label: 'Art 230',
      text: 'Functions include advising on Islamic way of life measures and recommending conformity of laws with Islam.',
    },
    {
      label: 'Character',
      text: 'In exam framing, CII recommendations are advisory; Parliament legislates and courts adjudicate.',
    },
    {
      label: 'Contrast',
      text: 'Federal Shariat Court (Chapter 3A, Arts 203A onward) is distinct: judicial Shariat jurisdiction, not merely advisory council work.',
    },
  ],
  flashcards: [
    {
      prompt: 'Which Articles cover the Council of Islamic Ideology?',
      answer: 'Articles 228 to 230',
    },
    {
      prompt: 'What other constitutional name is used for CII?',
      answer: 'Islamic Council',
    },
    {
      prompt: 'What does Article 229 mainly provide?',
      answer: 'Reference of a proposed law for advice on Islamic repugnancy',
    },
    {
      prompt: 'Who may refer a proposed law under Art 229?',
      answer: 'Parliament, the President, or a Governor',
    },
    {
      prompt: 'Name two Art 230 function themes.',
      answer: 'Advise on ordering Muslim life per Islam; recommend bringing laws into conformity with Islam',
    },
    {
      prompt: 'Is CII a legislature?',
      answer: 'No; its role is recommendatory/advisory',
    },
    {
      prompt: 'How does CII differ from the Federal Shariat Court?',
      answer: 'CII advises; FSC exercises Shariat court jurisdiction over laws',
    },
    {
      prompt: 'What critical limit should an answer stress?',
      answer: 'Recommendations need political and legislative follow-through',
    },
    {
      prompt: 'Under which Constitution does CII exist in current form?',
      answer: 'Constitution of 1973',
    },
    {
      prompt: 'Should CII be confused with the Objectives Resolution itself?',
      answer: 'No; Objectives Resolution is Art 2A/annex ideology text; CII is an institutional body',
    },
  ],
  mistakes: [
    {
      trap: 'Writing that CII can strike down laws like a court.',
      correct: 'Striking or examining laws for Shariat repugnancy is FSC territory; CII advises.',
    },
    {
      trap: 'Confusing Arts 228-230 with Arts 203A onward.',
      correct: '228-230 = CII. 203A chapter = Federal Shariat Court.',
    },
    {
      trap: 'Calling CII recommendations automatically binding law.',
      correct: 'They are advisory unless adopted through the legislative process.',
    },
    {
      trap: 'Ignoring Art 229 reference mechanism.',
      correct: 'Reference of proposed laws is a high-yield MCQ and essay point.',
    },
    {
      trap: 'Treating CII as identical to the Council of Common Interests.',
      correct: 'Different body and purpose; do not mix abbreviations casually.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Arts 228-230 overview.' },
    { day: 'Day 2', task: 'Art 229 reference rules.' },
    { day: 'Day 3', task: 'Art 230 functions + advisory character.' },
    { day: 'Day 4', task: 'Flashcards.' },
    { day: 'Day 5', task: 'CII vs FSC contrast paragraph.' },
    { day: 'Day 6', task: '10-minute discuss outline.' },
    { day: 'Day 7', task: 'Recite one-pager.' },
  ],
  sourcesLine:
    'Sources: Constitution of Pakistan Arts 228-230 text and standard Islamic provisions teaching. Keep advisory limits clear; avoid invented membership trivia.',
}
