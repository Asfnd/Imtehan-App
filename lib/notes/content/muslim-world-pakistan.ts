import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked syllabus-level markers:
 * - OIC: Organisation of Islamic Cooperation; Pakistan is an active member; HQ in Jeddah
 * - Saudi Arabia, Turkey, Iran: major Muslim-world partners with distinct bilateral themes (energy/pilgrimage/security with Saudi; defence and soft power with Turkey; neighbour energy and border management with Iran)
 * - Ummah diplomacy themes: Palestine solidarity language, Muslim cooperation forums, mediation and humanitarian diplomacy at exam level
 * Avoid inventing fake summit outcomes or secret alliance treaties
 */
export const MUSLIM_WORLD_PAKISTAN_KIT: NoteKitData = {
  id: 'muslim-world-pakistan',
  title: 'Pakistan and the Muslim World',
  subtitle:
    'OIC role, Saudi/Turkey/Iran relations at syllabus level, and Ummah diplomacy themes for CSS and PMS.',
  syllabusTags: [
    'Foreign policy of Pakistan',
    'Muslim world',
    'OIC',
    'Current Affairs',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS pattern',
      directive: 'Discuss',
      angle: 'Pakistan\'s role in the Muslim world / OIC',
      frequency: 'high',
    },
    {
      year: 'CSS / PMS',
      directive: 'Critically examine',
      angle: 'Bilateral ties with Saudi Arabia, Turkey, or Iran',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Evaluate',
      angle: 'Ummah solidarity vs national interest realism',
      frequency: 'medium',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'OIC headquarters Jeddah; organisation name',
      frequency: 'high',
    },
  ],
  onePager: [
    'Pakistan\'s identity and foreign policy repeatedly emphasise ties with the Muslim world: diplomacy, defence cooperation, energy and labour links, and moral positions on Palestine and other Ummah causes.',
    'OIC (Organisation of Islamic Cooperation) is the principal multilateral forum. Headquarters: Jeddah, Saudi Arabia. Pakistan participates actively; do not invent fake OIC armies or binding military pacts.',
    'Saudi Arabia: energy, pilgrimage (Hajj/Umrah), investment and labour diaspora themes, and strategic partnership language in standard answers.',
    'Turkey: defence industry and training cooperation narratives, soft-power and people-to-people ties, and political consultation themes at syllabus level.',
    'Iran: neighbour geography, border management, energy and trade potential, and careful management of regional rivalries. Avoid sectarian essay bait.',
    'Ummah diplomacy themes: solidarity rhetoric, mediation offers, humanitarian diplomacy, and OIC caucusing. Critical answers also note limits: member divisions and national interest constraints.',
    'Balance line: Muslim-world engagement supports identity and options, but Pakistan still balances major powers, neighbours, and economic needs.',
  ],
  answerSteps: [
    'Open with identity plus interests: why the Muslim world matters to Pakistan.',
    'Explain OIC as the multilateral frame (name, Jeddah HQ, soft-power limits).',
    'Sketch Saudi, Turkey, and Iran with distinct bilateral themes (not identical clones).',
    'Add Ummah issues (Palestine is the classic) without replacing analysis with slogans.',
    'Insert one critical point: OIC consensus limits and national interest realism.',
    'Close with balanced diplomacy: solidarity plus pragmatic statecraft.',
  ],
  questionVariants: [
    'Discuss Pakistan\'s relations with the Muslim world.',
    'Critically examine the role of the OIC for Pakistan\'s foreign policy.',
    'Evaluate Pakistan\'s ties with Saudi Arabia and Turkey.',
    'How does Ummah solidarity interact with Pakistan\'s national interests? Discuss.',
  ],
  citations: [
    {
      label: 'OIC',
      text: 'Organisation of Islamic Cooperation; headquarters in Jeddah, Saudi Arabia.',
    },
    {
      label: 'Saudi themes',
      text: 'Energy, pilgrimage, labour diaspora, and strategic economic partnership language.',
    },
    {
      label: 'Turkey themes',
      text: 'Defence cooperation narratives, soft power, and political consultation at syllabus level.',
    },
    {
      label: 'Iran themes',
      text: 'Neighbourhood management, border issues, and energy/trade potential handled carefully.',
    },
    {
      label: 'Ummah diplomacy',
      text: 'Solidarity on Palestine and Muslim causes via OIC and bilateral diplomacy, with realist limits.',
    },
  ],
  flashcards: [
    {
      prompt: 'What does OIC stand for?',
      answer: 'Organisation of Islamic Cooperation',
    },
    {
      prompt: 'Where is the OIC headquarters?',
      answer: 'Jeddah, Saudi Arabia',
    },
    {
      prompt: 'Name one Saudi-Pakistan link theme.',
      answer: 'Energy, pilgrimage, labour, or investment partnership',
    },
    {
      prompt: 'Name one Turkey-Pakistan link theme.',
      answer: 'Defence cooperation or soft-power/political ties',
    },
    {
      prompt: 'Why is Iran a distinct case?',
      answer: 'Immediate neighbour with border, energy, and regional-balance sensitivities',
    },
    {
      prompt: 'What classic Ummah cause appears in many Pakistan essays?',
      answer: 'Palestine / Al-Quds solidarity language',
    },
    {
      prompt: 'Trap: claiming OIC is a military alliance like NATO.',
      answer: 'It is a political cooperation organisation, not a NATO clone',
    },
    {
      prompt: 'What critical limit do strong answers mention?',
      answer: 'Member divisions and weak enforcement of OIC resolutions',
    },
    {
      prompt: 'Should answers use sectarian framing for Iran ties?',
      answer: 'No. Stay on state interests and neighbourhood management',
    },
    {
      prompt: 'Balance keyword for essays?',
      answer: 'Solidarity plus national interest realism',
    },
  ],
  mistakes: [
    {
      trap: 'Treating all Muslim states as one identical bloc.',
      correct: 'Differentiate Saudi, Turkey, Iran, and Gulf themes.',
    },
    {
      trap: 'Inventing binding OIC military guarantees.',
      correct: 'OIC is primarily political and cooperative. Note limits honestly.',
    },
    {
      trap: 'Replacing analysis with only emotional Ummah slogans.',
      correct: 'Combine moral positions with interests, capacity, and diplomacy.',
    },
    {
      trap: 'Writing a sectarian rant about Iran or Gulf rivalries.',
      correct: 'Use neighbourhood and balance-of-interest language.',
    },
    {
      trap: 'Forgetting Jeddah as OIC HQ in MCQ prep.',
      correct: 'Jeddah, Saudi Arabia is a high-yield one-paper fact.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Read OIC frame and three bilateral sketches.' },
    { day: 'Day 2', task: 'Memorise OIC name and Jeddah HQ.' },
    { day: 'Day 3', task: 'Write a 10-minute outline on Muslim-world diplomacy.' },
    { day: 'Day 4', task: 'Drill flashcards.' },
    { day: 'Day 5', task: 'Attempt OIC critically examine outline (limits included).' },
    { day: 'Day 6', task: 'One-pager + citations. Practice MCQs.' },
    { day: 'Day 7', task: 'One-pager only. Recite Saudi/Turkey/Iran distinctions.' },
  ],
  sourcesLine:
    'Sources: OIC institutional basics; standard Pakistan foreign policy chapters on the Muslim world; FPSC current affairs and Pakistan Affairs syllabus items. Avoid unsourced WhatsApp summit myths.',
}
