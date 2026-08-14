import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked markers:
 * - 16 December 1971: Fall of Dhaka; East Pakistan becomes Bangladesh
 * - 1973 Constitution: NA passed 10 April 1973; commenced 14 August 1973 under Bhutto era
 * - 5 July 1977: Zia-ul-Haq martial law; Zia dies 17 August 1988
 * - Democracy decade roughly 1988-1999: alternating PPP and PML governments; repeated dissolutions
 * - 12 October 1999: Musharraf coup; military-led order into 2000s
 * - 2008: civilian transition after Musharraf exit process; elected governments continue with interruptions and crises
 * - 18th Amendment 2010: major civilian reform marker (provincial autonomy / parliamentary tilt)
 */
export const POLITICAL_EVOLUTION_1971_KIT: NoteKitData = {
  id: 'political-evolution-1971',
  title: 'Political Evolution since 1971',
  subtitle:
    'From the 1971 break to the 1973 Constitution, military interruptions, and civilian reform markers.',
  syllabusTags: [
    'Political evolution since 1971',
    'Constitutional development',
    'Democracy in Pakistan',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS pattern',
      directive: 'Discuss',
      angle: 'Political evolution of Pakistan since 1971',
      frequency: 'high',
    },
    {
      year: 'CSS / PMS',
      directive: 'Critically examine',
      angle: '1973 Constitution as the centrepiece after the East Pakistan crisis',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Evaluate',
      angle: 'Democratic experiments of 1988-99 and post-2008 transitions',
      frequency: 'medium',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: '1971, 1973 Constitution dates, 1977, 1999, 18th Amendment 2010',
      frequency: 'high',
    },
  ],
  onePager: [
    '16 December 1971: Fall of Dhaka. East Pakistan separates as Bangladesh. Western Pakistan must rebuild politics, identity, and a constitution.',
    'Zulfikar Ali Bhutto leads the post-1971 civilian order. The 1973 Constitution (passed 10 April 1973, enforced 14 August 1973) becomes the new parliamentary federal baseline.',
    '5 July 1977: General Zia-ul-Haq removes Bhutto. A long military-dominated period follows until Zia’s death in 1988.',
    '1988 to 1999: elected governments alternate, mainly PPP and PML, but continuity is weak because of dissolutions, weak coalitions, and civil-military tension.',
    '12 October 1999: Musharraf coup ends the 1990s democratic cycle and opens another military-led political order.',
    'From 2008: Pakistan returns to elected civilian governments. Transitions continue, but crises, judicial politics, and civil-military stress remain part of the story.',
    '18th Amendment (2010) is the clearest civilian reform marker of this later phase: stronger provincial autonomy and a parliamentary federal tilt.',
    'Exam arc: crisis (1971) to constitution (1973) to interruption (1977, 1999) to incomplete civilian consolidation (1988-99 and post-2008).',
  ],
  answerSteps: [
    'Start with 1971 as the break that forced a new political settlement in the remaining Pakistan.',
    'Place the 1973 Constitution as the institutional answer under Bhutto.',
    'Show interruption: Zia 1977 and the long military phase to 1988.',
    'Describe 1988-99 democracy as real elections with weak continuity.',
    'Add Musharraf 1999, then post-2008 civilian transitions and the 18th Amendment as reform marker.',
    'Close with a clear judgment: evolution is real, but interruption and incomplete consolidation define the pattern.',
  ],
  questionVariants: [
    'Discuss the political evolution of Pakistan since 1971.',
    'Critically examine the place of the 1973 Constitution in post-1971 politics.',
    'Evaluate democratic politics between 1988 and 1999.',
    'How does the 18th Amendment fit into Pakistan’s political evolution after military rule? Discuss.',
  ],
  citations: [
    {
      label: '1971 break',
      text: 'On 16 December 1971 Dhaka fell and East Pakistan emerged as Bangladesh.',
    },
    {
      label: '1973 Constitution',
      text: 'National Assembly passed the Constitution on 10 April 1973. It commenced on 14 August 1973.',
    },
    {
      label: 'Zia interruption',
      text: 'On 5 July 1977 General Zia-ul-Haq imposed martial law. He died on 17 August 1988.',
    },
    {
      label: '1999 interruption',
      text: 'On 12 October 1999 General Pervez Musharraf took power, ending the 1988-99 electoral cycle.',
    },
    {
      label: 'Civilian reform marker',
      text: '18th Amendment (2010) deepened provincial autonomy and parliamentary federal design after earlier military-era distortions.',
    },
  ],
  flashcards: [
    {
      prompt: 'Date linked to Fall of Dhaka / 1971 break?',
      answer: '16 December 1971',
    },
    {
      prompt: 'When did the 1973 Constitution commence?',
      answer: '14 August 1973',
    },
    {
      prompt: 'Who dominated the immediate post-1971 civilian leadership?',
      answer: 'Zulfikar Ali Bhutto',
    },
    {
      prompt: 'Zia takeover date?',
      answer: '5 July 1977',
    },
    {
      prompt: 'Approximate democracy decade before Musharraf?',
      answer: '1988 to 1999',
    },
    {
      prompt: 'Musharraf coup date?',
      answer: '12 October 1999',
    },
    {
      prompt: 'What begins as a major civilian transition year after Musharraf?',
      answer: '2008',
    },
    {
      prompt: 'Key 2010 civilian reform marker?',
      answer: '18th Amendment',
    },
    {
      prompt: 'Why is 1971 central to this topic?',
      answer: 'It ended the two-wing state and forced a new constitutional politics in remaining Pakistan',
    },
    {
      prompt: 'One weakness of 1988-99 democracy?',
      answer: 'Repeated dissolutions and weak continuity despite elections',
    },
  ],
  mistakes: [
    {
      trap: 'Starting the post-1971 story without mentioning the 1971 break.',
      correct: 'Open with East Pakistan’s separation as the political reset.',
    },
    {
      trap: 'Dating the 1973 Constitution as 1971 or 1972.',
      correct: 'Passed April 1973, enforced 14 August 1973.',
    },
    {
      trap: 'Treating 1988-99 as stable consolidated democracy.',
      correct: 'Elections existed, but continuity was repeatedly broken.',
    },
    {
      trap: 'Mixing Zia 1977 with Musharraf 1999.',
      correct: '1977 = Zia. 1999 = Musharraf.',
    },
    {
      trap: 'Calling the 18th Amendment the creation of democracy itself.',
      correct: 'It is a major civilian federal reform marker within the 1973 framework, not the birth of democracy.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Read 1971 break and need for a new constitution.' },
    { day: 'Day 2', task: 'Memorise 1973 passage and commencement dates.' },
    { day: 'Day 3', task: 'Timeline Zia 1977 to 1988 and democracy 1988-99.' },
    { day: 'Day 4', task: 'Add Musharraf 1999 and post-2008 transition.' },
    { day: 'Day 5', task: 'Write discuss essay outline on evolution since 1971.' },
    { day: 'Day 6', task: 'Drill flashcards and 18th Amendment marker.' },
    { day: 'Day 7', task: 'One-pager only. Recite the era ladder from memory.' },
  ],
  sourcesLine:
    'Sources: standard political histories of 1971 and after; 1973 Constitution dates; public markers for 1977, 1988-99, 1999, 2008, and Eighteenth Amendment Act 2010. Avoid partisan score-settling narratives.',
}
