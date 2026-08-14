import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked markers:
 * - 1956 Constitution: first constitution, parliamentary republic (short-lived; ended with 1958 martial law)
 * - 1962 Constitution: presidential system under Ayub Khan
 * - 1973 Constitution: parliamentary federal republic (enduring text, though suspended/amended)
 * - Elections recur across eras but continuity is the weak point
 * - Caretaker government debates: temporary administrations around elections; exact legal design changed by amendments over time (do not invent one eternal formula)
 * - 18th Amendment 2010: provincial autonomy and parliamentary restoration marker
 * Challenges of continuity: coups, dissolutions, weak parties, centre-province stress
 */
export const DEMOCRACY_EVOLUTION_PAKISTAN_KIT: NoteKitData = {
  id: 'democracy-evolution-pakistan',
  title: 'Evolution of Democratic System in Pakistan',
  subtitle:
    'Parliamentary and presidential experiments, elections, autonomy, and the problem of continuity.',
  syllabusTags: [
    'Democracy in Pakistan',
    'Constitutional development',
    'Political system',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS pattern',
      directive: 'Discuss',
      angle: 'Evolution of the democratic system in Pakistan',
      frequency: 'high',
    },
    {
      year: 'CSS / PMS',
      directive: 'Critically examine',
      angle: 'Parliamentary versus presidential experiments (1956, 1962, 1973)',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Evaluate',
      angle: '18th Amendment and provincial autonomy for democratic federalism',
      frequency: 'medium',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: '1956 parliamentary, 1962 presidential, 1973 parliamentary',
      frequency: 'high',
    },
  ],
  onePager: [
    'Democracy in Pakistan is best written as an evolution of constitutional forms plus repeated struggles for civilian continuity, not as a smooth rise.',
    '1956 Constitution: first constitution, parliamentary design. Short life. Ended with martial law in 1958.',
    '1962 Constitution: presidential system under Ayub Khan. Controlled politics and basic democracies rhetoric. Ended with Ayub’s exit and Yahya’s martial law phase (1969 onward).',
    '1973 Constitution: parliamentary federal republic. The durable text of later politics, even when suspended, amended, or revived.',
    'Elections matter across eras, but continuity fails when assemblies are dissolved early, coups intervene, or parties cannot sustain coalitions.',
    'Caretaker debates: Pakistan has used temporary caretaker setups around elections to manage transition neutrality. Legal details changed over time. Do not invent one fixed eternal formula.',
    '18th Amendment (2010): major boost to provincial autonomy and parliamentary federal practice after military-era presidential distortions.',
    'Core exam judgment: institutions exist on paper. Continuity of civilian rule and federal trust remains the hard test.',
  ],
  answerSteps: [
    'Define democratic evolution as constitutional design plus practice of civilian rule and elections.',
    'Compare 1956 (parliamentary, short), 1962 (presidential, Ayub), and 1973 (parliamentary, enduring text).',
    'Explain why elections alone did not equal consolidation: coups, dissolutions, weak party institutions.',
    'Add caretaker transition debates carefully as an election-management issue, not as the whole democracy story.',
    'Bring in 18th Amendment provincial autonomy as a democratic federal reform marker.',
    'Close on continuity: the main challenge is sustained civilian constitutional politics.',
  ],
  questionVariants: [
    'Discuss the evolution of the democratic system in Pakistan.',
    'Critically examine parliamentary and presidential experiments in Pakistan’s constitutional history.',
    'Evaluate the role of the 18th Amendment in strengthening democratic federalism.',
    'Why has continuity remained the central problem of democracy in Pakistan? Discuss.',
  ],
  citations: [
    {
      label: '1956 system',
      text: 'The 1956 Constitution established Pakistan’s first constitution on a parliamentary model and did not survive the 1958 martial law.',
    },
    {
      label: '1962 system',
      text: 'The 1962 Constitution created a presidential system under Ayub Khan.',
    },
    {
      label: '1973 system',
      text: 'The 1973 Constitution restored a parliamentary federal republic and remains the baseline constitutional text.',
    },
    {
      label: 'Autonomy marker',
      text: 'The 18th Amendment (2010) strengthened provincial autonomy and the parliamentary character of the federation.',
    },
    {
      label: 'Continuity problem',
      text: 'Democratic practice has been interrupted by military takeovers (notably 1958, 1977, 1999) and by repeated political instability between elections.',
    },
  ],
  flashcards: [
    {
      prompt: 'System type under the 1956 Constitution?',
      answer: 'Parliamentary',
    },
    {
      prompt: 'System type under the 1962 Constitution?',
      answer: 'Presidential (Ayub Khan era)',
    },
    {
      prompt: 'System type under the 1973 Constitution?',
      answer: 'Parliamentary federal republic',
    },
    {
      prompt: 'Which constitution lasted as the enduring text?',
      answer: '1973 Constitution',
    },
    {
      prompt: 'What ended the 1956 constitutional order?',
      answer: '1958 martial law',
    },
    {
      prompt: 'What is the continuity problem in one line?',
      answer: 'Elections happen, but civilian constitutional rule is repeatedly interrupted',
    },
    {
      prompt: 'What does the 18th Amendment mainly strengthen for democracy answers?',
      answer: 'Provincial autonomy and parliamentary federalism',
    },
    {
      prompt: 'What are caretaker governments in exam language?',
      answer: 'Temporary setups around elections to manage transition (details changed over time)',
    },
    {
      prompt: 'Name three coup years that broke democratic continuity.',
      answer: '1958, 1977, 1999',
    },
    {
      prompt: 'Why is 1962 important in democracy essays?',
      answer: 'It shows Pakistan’s major presidential experiment versus parliamentary designs',
    },
  ],
  mistakes: [
    {
      trap: 'Calling 1962 parliamentary or 1973 presidential.',
      correct: '1962 = presidential. 1973 = parliamentary federal.',
    },
    {
      trap: 'Saying 1956 was Pakistan’s lasting democratic settlement.',
      correct: '1956 was the first constitution but fell with 1958 martial law.',
    },
    {
      trap: 'Equating one election with consolidated democracy.',
      correct: 'Examiners want continuity, institutions, and constitutional practice.',
    },
    {
      trap: 'Inventing a single unchanging caretaker formula for all decades.',
      correct: 'Caretaker arrangements existed, but legal design changed with amendments and practice.',
    },
    {
      trap: 'Ignoring federalism when writing democracy after 2010.',
      correct: '18th Amendment links democracy to provincial autonomy inside the 1973 frame.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Compare 1956, 1962, and 1973 system types.' },
    { day: 'Day 2', task: 'Memorise which design survived as the baseline text.' },
    { day: 'Day 3', task: 'List continuity breakers: coups and dissolutions.' },
    { day: 'Day 4', task: 'Add caretaker debate in one careful paragraph.' },
    { day: 'Day 5', task: 'Write critically examine parliamentary vs presidential.' },
    { day: 'Day 6', task: 'Link 18th Amendment to democratic federalism.' },
    { day: 'Day 7', task: 'One-pager only. Recite system ladder and judgment line.' },
  ],
  sourcesLine:
    'Sources: Constitutions of 1956, 1962, and 1973; Eighteenth Amendment Act 2010; standard surveys of elections and civil-military interruptions. Avoid partisan democracy scorecards and unsourced caretaker myths.',
}
