import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (classical Islamic political thought teaching for exams):
 * - Shura (consultation), adl (justice), amanah (trust), hisbah/accountability themes, maslaha (public interest) at concept level
 * - Carefully: classical concepts, not a modern partisan constitution claim; avoid sectarian polemic
 * Link to ethics of governance without inventing a single mandatory institutional blueprint
 */
export const MUSLIM_POLITICAL_SYSTEM_CONCEPTS_KIT: NoteKitData = {
  id: 'muslim-political-system-concepts',
  title: 'Muslim Political System Concepts (Shura, Justice, Accountability)',
  subtitle:
    'Classical concepts of consultation, justice, trust, and accountability for Islamiat and ethics answers, framed carefully.',
  syllabusTags: [
    'Islamic political system',
    'Shura',
    'Justice',
    'Accountability',
    'Islamiat',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS Islamiat',
      directive: 'Discuss',
      angle: 'Salient features of the Islamic political system',
      frequency: 'high',
    },
    {
      year: 'CSS / PMS',
      directive: 'Explain',
      angle: 'Shura and its significance',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Evaluate',
      angle: 'Justice and accountability of rulers in Islam',
      frequency: 'high',
    },
    {
      year: 'One-paper',
      directive: 'Short',
      angle: 'Amanah, adl, shura definitions',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Exam answers on the Muslim political system should stress ethical and legal principles more than inventing one rigid modern organogram. Core concepts: sovereignty of Allah in belief, rule of law under Shariah objectives, justice, consultation, and public trust.',
    'Shura (consultation): leaders should consult knowledgeable and concerned members of the community in public affairs. It supports legitimacy, collective wisdom, and checks impulsive rule. Do not over-claim a single modern electoral model as the only classical form.',
    'Adl (justice): cornerstone of governance. Rights of people protected; no oppression; equality before law in the ethical ideal. Justice includes social and economic fairness themes in many Islamiat answers.',
    'Amanah (trust): authority is a trust to be discharged for public welfare, not personal property. Corruption and abuse of office violate amanah.',
    'Accountability: rulers and officials are answerable for conduct. Classical teaching emphasises moral accountability before God and social accountability before the people; institutions of complaint and correction appear as themes (including hisbah as commanding good/forbidding wrong in public ethics discourse).',
    'Maslaha (public interest) and maqasid themes: policies should protect faith, life, intellect, lineage, and property in maqasid teaching; public welfare guides discretionary areas carefully.',
    'Rights and dignity: protection of life, property, honour, and religious conscience themes in classical ethics; minorities and weak groups deserve justice, not arbitrary power.',
    'Careful close: present principles (shura, justice, amanah, accountability) as normative guidance for ethical governance; avoid sectarian fights and avoid claiming every modern institution is identical to early practice.',
  ],
  answerSteps: [
    'Open with principles-based framing, not a fake organogram.',
    'Explain shura as consultation and its benefits.',
    'Develop adl and amanah as twin pillars of office.',
    'Add accountability (moral and social) carefully.',
    'Link maslaha/maqasid and protection of rights.',
    'Conclude with ethical governance applicable to modern public service.',
  ],
  questionVariants: [
    'Discuss the salient features of the Islamic political system.',
    'Explain the concept of shura and its importance.',
    'Evaluate justice and accountability of rulers in Islamic teachings.',
    'How do amanah and maslaha guide public authority?',
  ],
  citations: [
    {
      label: 'Shura',
      text: 'Consultation in public affairs as a legitimacy and wisdom principle.',
    },
    {
      label: 'Adl',
      text: 'Justice as the cornerstone against oppression.',
    },
    {
      label: 'Amanah',
      text: 'Authority as trust for public welfare.',
    },
    {
      label: 'Accountability',
      text: 'Moral and social answerability of those in power; public ethics themes.',
    },
  ],
  flashcards: [
    {
      prompt: 'What is shura?',
      answer: 'Consultation in public decision-making',
    },
    {
      prompt: 'What is adl in governance?',
      answer: 'Justice; protection of rights and rejection of oppression',
    },
    {
      prompt: 'What is amanah for a ruler?',
      answer: 'Office as a trust for public welfare',
    },
    {
      prompt: 'Name three core concepts for this topic.',
      answer: 'Shura, justice, accountability (or amanah)',
    },
    {
      prompt: 'What is maslaha?',
      answer: 'Public interest / welfare consideration in policy',
    },
    {
      prompt: 'Maqasid link in one line?',
      answer: 'Protect essentials such as life, faith, intellect, lineage, property',
    },
    {
      prompt: 'How should exams treat modern institutions?',
      answer: 'Principles first; do not force identical organograms',
    },
    {
      prompt: 'Accountability before whom in teaching?',
      answer: 'Before God morally and before people socially',
    },
    {
      prompt: 'What violates amanah?',
      answer: 'Corruption and abuse of public office',
    },
    {
      prompt: 'What tone avoids low marks?',
      answer: 'Careful classical concepts; no sectarian polemic',
    },
  ],
  mistakes: [
    {
      trap: 'Drawing a fake modern cabinet chart as if it were classical law.',
      correct: 'Teach principles: shura, justice, amanah, accountability.',
    },
    {
      trap: 'Sectarian or partisan polemic.',
      correct: 'Stay on shared ethical-political concepts.',
    },
    {
      trap: 'Defining shura as identical to one contemporary election system only.',
      correct: 'Consultation principle with historical flexibility in form.',
    },
    {
      trap: 'Ignoring accountability of rulers.',
      correct: 'Answerability is a high-yield point.',
    },
    {
      trap: 'Omitting justice and rights of the weak.',
      correct: 'Adl includes protection against oppression.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Define shura, adl, amanah.' },
    { day: 'Day 2', task: 'Accountability and hisbah ethics theme.' },
    { day: 'Day 3', task: 'Maslaha and maqasid bridge.' },
    { day: 'Day 4', task: 'Flashcards.' },
    { day: 'Day 5', task: 'Careful modern application paragraph.' },
    { day: 'Day 6', task: '10-minute salient features outline.' },
    { day: 'Day 7', task: 'Recite one-pager.' },
  ],
  sourcesLine:
    'Sources: standard Islamiat notes on Islamic political concepts (shura, justice, amanah, accountability). Keep classical and non-sectarian; avoid invented institutional blueprints.',
}
