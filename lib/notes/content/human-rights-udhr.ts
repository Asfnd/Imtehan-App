import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked:
 * - UDHR adopted 10 December 1948 by UN General Assembly
 * - ICCPR and ICESCR: core covenants (1966 adoption; entered into force 1976)
 * - CEDAW: Convention on the Elimination of All Forms of Discrimination against Women (1979)
 * - CRC: Convention on the Rights of the Child (1989)
 * - Pakistan Constitution 1973: Fundamental Rights classically Arts 8-28
 * Keep article ranges accurate; do not invent treaty articles as Constitution articles
 */
export const HUMAN_RIGHTS_UDHR_KIT: NoteKitData = {
  id: 'human-rights-udhr',
  title: 'Human Rights Framework (UDHR and Core Treaties)',
  subtitle:
    'UDHR 1948, core UN treaties at name level, and Pakistan Fundamental Rights (Arts 8-28).',
  syllabusTags: [
    'Human rights',
    'UDHR',
    'Fundamental Rights',
    'Ethics and governance',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS / PMS',
      directive: 'Discuss',
      angle: 'UDHR and the international human rights framework',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Critically examine',
      angle: 'Fundamental Rights in the Constitution of Pakistan',
      frequency: 'high',
    },
    {
      year: 'One-paper / MPT',
      directive: 'MCQ fact',
      angle: 'UDHR year; ICCPR/ICESCR/CEDAW/CRC names; Arts 8-28',
      frequency: 'high',
    },
    {
      year: 'CSS Ethics',
      directive: 'Evaluate',
      angle: 'Civil and political rights vs economic, social and cultural rights',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Universal Declaration of Human Rights (UDHR) was adopted by the UN General Assembly on 10 December 1948. It is a foundational declaration, not a treaty with the same legal form as later covenants.',
    'Two core covenants often paired in exams: International Covenant on Civil and Political Rights (ICCPR) and International Covenant on Economic, Social and Cultural Rights (ICESCR). Both adopted in 1966; entered into force in 1976.',
    'Together with the UDHR, ICCPR and ICESCR are taught as the International Bill of Human Rights.',
    'CEDAW (1979): Convention on the Elimination of All Forms of Discrimination against Women. CRC (1989): Convention on the Rights of the Child. Memorise full names for MCQs.',
    'Civil and political rights (ICCPR style): life, liberty, fair trial, expression, association. Economic, social and cultural rights (ICESCR style): work, education, health, adequate standard of living.',
    'Pakistan Constitution 1973 places Fundamental Rights mainly in Articles 8 to 28 (classical exam range). Article 8 addresses laws inconsistent with Fundamental Rights.',
    'Examples often asked: Art 9 security of person; Art 10 safeguards as to arrest and detention; Art 14 dignity; Art 19 freedom of speech; Art 25 equality. Use exact article numbers only when sure.',
    'Exam tip: separate international instruments from constitutional rights. Do not call UDHR a Pakistan statute or invent treaty article numbers as Constitution articles.',
  ],
  answerSteps: [
    'Open with human dignity and the post-1945 international rights project.',
    'State UDHR date and nature (declaration, 10 December 1948).',
    'Add ICCPR and ICESCR as twin covenants; name CEDAW and CRC if gender/child rights appear.',
    'Shift to Pakistan: Fundamental Rights Arts 8-28 under the 1973 Constitution.',
    'Give two concrete rights examples and one enforcement idea (courts / constitutional remedies).',
    'Close with a balanced line: rights need institutions and implementation, not only texts.',
  ],
  questionVariants: [
    'Discuss the significance of the Universal Declaration of Human Rights.',
    'Critically examine Fundamental Rights (Articles 8 to 28) in the Constitution of Pakistan.',
    'Evaluate the distinction between civil-political and economic-social-cultural rights.',
    'How do ICCPR and ICESCR complement the UDHR? Discuss.',
  ],
  citations: [
    {
      label: 'UDHR',
      text: 'Adopted 10 December 1948 by the UN General Assembly.',
    },
    {
      label: 'ICCPR / ICESCR',
      text: 'Adopted 1966; entered into force 1976. Core covenants on civil-political and economic-social-cultural rights.',
    },
    {
      label: 'CEDAW / CRC',
      text: 'CEDAW 1979 (women’s discrimination). CRC 1989 (rights of the child).',
    },
    {
      label: 'Pakistan Constitution',
      text: 'Fundamental Rights classically covered in Articles 8 to 28 of the 1973 Constitution.',
    },
  ],
  flashcards: [
    {
      prompt: 'When was the UDHR adopted?',
      answer: '10 December 1948',
    },
    {
      prompt: 'Who adopted the UDHR?',
      answer: 'UN General Assembly',
    },
    {
      prompt: 'Is the UDHR itself a treaty like ICCPR?',
      answer: 'No. It is a declaration (foundational, not the same legal form as the covenants)',
    },
    {
      prompt: 'What does ICCPR stand for?',
      answer: 'International Covenant on Civil and Political Rights',
    },
    {
      prompt: 'What does ICESCR stand for?',
      answer: 'International Covenant on Economic, Social and Cultural Rights',
    },
    {
      prompt: 'When were ICCPR and ICESCR adopted?',
      answer: '1966',
    },
    {
      prompt: 'When did ICCPR and ICESCR enter into force?',
      answer: '1976',
    },
    {
      prompt: 'What three texts are taught as the International Bill of Human Rights?',
      answer: 'UDHR, ICCPR, and ICESCR',
    },
    {
      prompt: 'What does CEDAW stand for?',
      answer: 'Convention on the Elimination of All Forms of Discrimination against Women',
    },
    {
      prompt: 'CEDAW year?',
      answer: '1979',
    },
    {
      prompt: 'What does CRC stand for?',
      answer: 'Convention on the Rights of the Child',
    },
    {
      prompt: 'CRC year?',
      answer: '1989',
    },
    {
      prompt: 'Classical Fundamental Rights article range in Pakistan’s 1973 Constitution?',
      answer: 'Articles 8 to 28',
    },
    {
      prompt: 'Name one civil-political right theme.',
      answer: 'Life, liberty, fair trial, speech, or association',
    },
    {
      prompt: 'Name one economic-social-cultural right theme.',
      answer: 'Education, health, work, or adequate living standard',
    },
  ],
  mistakes: [
    {
      trap: 'Saying UDHR was adopted in 1945 with the UN Charter.',
      correct: 'UN Charter 1945. UDHR 10 December 1948.',
    },
    {
      trap: 'Calling CEDAW the child rights treaty.',
      correct: 'CEDAW is about discrimination against women. CRC is the child rights convention.',
    },
    {
      trap: 'Writing Fundamental Rights as Arts 1-7 or inventing wrong ranges.',
      correct: 'Classical exam range for Fundamental Rights is Arts 8-28.',
    },
    {
      trap: 'Treating ICCPR article numbers as Pakistan Constitution articles.',
      correct: 'Keep international instruments and constitutional articles separate.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Memorise UDHR date and nature.' },
    { day: 'Day 2', task: 'Drill ICCPR and ICESCR names, 1966/1976.' },
    { day: 'Day 3', task: 'Memorise CEDAW 1979 and CRC 1989 full names.' },
    { day: 'Day 4', task: 'Link Arts 8-28 to Pakistan constitutional rights overview.' },
    { day: 'Day 5', task: 'Write a 10-minute UDHR + covenants outline.' },
    { day: 'Day 6', task: 'Flashcards and MCQ traps.' },
    { day: 'Day 7', task: 'One-pager only. Recite dates and acronyms from memory.' },
  ],
  sourcesLine:
    'Sources: UN UDHR (1948); ICCPR and ICESCR (1966/1976); CEDAW (1979); CRC (1989); Constitution of Pakistan 1973 Fundamental Rights Arts 8-28. Keep article ranges accurate.',
}
