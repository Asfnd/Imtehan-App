import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked established markers:
 * - 7 October 1958: martial law under President Iskander Mirza; Ayub Khan as Chief Martial Law Administrator, then presidential rule (Ayub era)
 * - 25 March 1969: Ayub resigns; Yahya Khan martial law period leading into 1971 crisis
 * - 5 July 1977: General Zia-ul-Haq removes Bhutto government
 * - 12 October 1999: General Pervez Musharraf coup against Nawaz Sharif government
 * - Hybrid / guided periods after coups: LFO-style legal engineering, controlled politics
 * - 18th Amendment 2010: major civilian federalism and parliamentary restoration marker (not a full CMR cure-all)
 * Exam caution: analyse institutions and chronology; avoid partisan ranting and invented conspiracy details
 */
export const CIVIL_MILITARY_RELATIONS_KIT: NoteKitData = {
  id: 'civil-military-relations',
  title: 'Civil-Military Relations in Pakistan',
  subtitle:
    'Coup eras, hybrid politics, and civilian constitutional markers without partisan ranting.',
  syllabusTags: [
    'Political evolution',
    'Civil-military relations',
    'Constitutional development',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS pattern',
      directive: 'Discuss',
      angle: 'Civil-military imbalance and democratic continuity in Pakistan',
      frequency: 'high',
    },
    {
      year: 'CSS / PMS',
      directive: 'Critically examine',
      angle: 'Military interventions of 1958, 1977, and 1999',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Evaluate',
      angle: 'Hybrid regimes and constitutional engineering after coups',
      frequency: 'medium',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'Coup years: 1958, 1977, 1999; 18th Amendment year 2010',
      frequency: 'high',
    },
  ],
  onePager: [
    'Civil-military relations (CMR) in Pakistan exams mean the balance between elected civilian authority and the military’s institutional role in security and, at times, politics.',
    '1958: martial law begins (7 October 1958). Ayub Khan’s era follows as the first long military-dominated political order, later linked to the 1962 presidential constitution.',
    '1977: on 5 July 1977 General Zia-ul-Haq removes the Bhutto government. A long military-led period follows, with Islamisation and controlled political experiments.',
    '1999: on 12 October 1999 General Pervez Musharraf ousts the Nawaz Sharif government. Another military-led order follows, with Legal Framework Order style constitutional changes.',
    'Hybrid periods: after coups, rulers often keep some elections, parties, or cabinets while retaining decisive military control. Call this hybrid or guided politics, not full civilian supremacy.',
    'Civilian markers: 1973 Constitution as the baseline parliamentary text; 18th Amendment (2010) as a major attempt to strengthen parliament and provincial autonomy after military-era distortions.',
    'Writing rule: use dated institutional facts. Do not turn the answer into praise or abuse of living parties. Examiners reward balance and structure.',
  ],
  answerSteps: [
    'Define CMR as civilian supremacy versus military institutional intervention in politics.',
    'Give the three classic coup markers with dates: 1958 (Ayub era), 1977 (Zia), 1999 (Musharraf).',
    'Explain why interventions recur in exam language: weak party institutions, security state role, legitimacy crises, and constitutional fragility.',
    'Add hybrid politics: elections under military dominance, legal instruments, and controlled civilian space.',
    'Bring one civilian reform marker: 1973 text and/or 18th Amendment federal-parliamentary restoration.',
    'Close with a sober judgment: continuity needs civilian capacity and rule of law, not slogans.',
  ],
  questionVariants: [
    'Discuss civil-military relations as a challenge to democratic continuity in Pakistan.',
    'Critically examine the military interventions of 1958, 1977, and 1999.',
    'Evaluate the idea of hybrid regimes in Pakistan’s political history.',
    'How does the 18th Amendment relate to civilian federalism after periods of military dominance? Discuss.',
  ],
  citations: [
    {
      label: '1958 marker',
      text: 'Martial law proclaimed on 7 October 1958. Ayub Khan emerges as the central military ruler of the following era.',
    },
    {
      label: '1977 marker',
      text: 'On 5 July 1977 General Zia-ul-Haq removes the elected Bhutto government and imposes martial law.',
    },
    {
      label: '1999 marker',
      text: 'On 12 October 1999 General Pervez Musharraf takes power after conflict with the Nawaz Sharif government.',
    },
    {
      label: 'Constitutional baseline',
      text: 'The 1973 Constitution is the enduring parliamentary federal text later suspended or amended under military-led periods, then revived and reformed.',
    },
    {
      label: 'Civilian federal marker',
      text: '18th Amendment (2010) strengthens provincial autonomy and parliamentary character after earlier military-era presidential distortions.',
    },
  ],
  flashcards: [
    { prompt: 'Date of 1958 martial law proclamation?', answer: '7 October 1958' },
    { prompt: 'Military ruler most linked to the post-1958 era?', answer: 'Ayub Khan' },
    { prompt: 'Date of Zia’s takeover?', answer: '5 July 1977' },
    { prompt: 'Date of Musharraf’s coup?', answer: '12 October 1999' },
    {
      prompt: 'What does hybrid regime mean in CMR answers?',
      answer: 'Elections or civilians exist, but decisive control remains with military-led authority.',
    },
    {
      prompt: 'Which constitution is the main post-1971 civilian baseline?',
      answer: '1973 Constitution',
    },
    {
      prompt: 'Which amendment is a key 2010 civilian federalism marker?',
      answer: '18th Amendment',
    },
    {
      prompt: 'Name three classic coup years for MCQs.',
      answer: '1958, 1977, 1999',
    },
    {
      prompt: 'What writing style loses marks in CMR answers?',
      answer: 'Partisan ranting and conspiracy claims without dated institutional facts',
    },
    {
      prompt: 'Ayub-era constitution type often contrasted with 1973?',
      answer: '1962 presidential system',
    },
  ],
  mistakes: [
    {
      trap: 'Mixing coup years (especially 1977 with 1999).',
      correct: '1977 = Zia. 1999 = Musharraf. 1958 = Ayub-era martial law start.',
    },
    {
      trap: 'Calling every period after a coup a complete absence of politics.',
      correct: 'Many were hybrid: some elections and cabinets under military dominance.',
    },
    {
      trap: 'Claiming the 18th Amendment ended the military’s security role.',
      correct: 'It is a civilian federal and parliamentary reform marker, not a full CMR settlement.',
    },
    {
      trap: 'Writing a party manifesto or abuse essay.',
      correct: 'Use institutions, chronology, and constitutional instruments. Stay analytical.',
    },
    {
      trap: 'Inventing secret meeting details or fake vote counts for coups.',
      correct: 'Stick to public established dates and constitutional consequences.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Read CMR definition and the three coup eras.' },
    { day: 'Day 2', task: 'Memorise 7 Oct 1958, 5 Jul 1977, 12 Oct 1999.' },
    { day: 'Day 3', task: 'Outline causes of recurrent intervention (institutional, not ranting).' },
    { day: 'Day 4', task: 'Drill flashcards on hybrid politics and 1962 vs 1973.' },
    { day: 'Day 5', task: 'Write critically examine on 1958/1977/1999.' },
    { day: 'Day 6', task: 'Link 1973 and 18th Amendment as civilian markers.' },
    { day: 'Day 7', task: 'One-pager only. Recite dates and judgment line from memory.' },
  ],
  sourcesLine:
    'Sources: standard Pakistan political histories for 1958, 1977, and 1999 markers; 1973 Constitution and Eighteenth Amendment Act 2010 as civilian legal milestones. Avoid partisan social-media timelines and unsourced conspiracy narratives.',
}
