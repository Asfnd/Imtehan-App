import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked:
 * - Article 25-A: right to free and compulsory education for children of age five to sixteen; inserted via 18th Amendment (2010)
 * - Education is a concurrent/devolved provincial responsibility after 18th Amendment teaching frame
 * - Mix: public schools, private schools, madaris (religious seminaries) at syllabus level
 * - Avoid inventing fake literacy percentages for 2026; use challenge language and frameworks
 */
export const EDUCATION_SYSTEM_PAKISTAN_KIT: NoteKitData = {
  id: 'education-system-pakistan',
  title: 'Education System of Pakistan',
  subtitle:
    'Article 25-A, literacy challenges, public/private/madaris mix, and a clean CSS/PMS answer structure.',
  syllabusTags: [
    'Education policy',
    'Current affairs',
    'Social development',
    '18th Amendment',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS / PMS',
      directive: 'Discuss',
      angle: 'Problems of education in Pakistan and remedies',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Critically examine',
      angle: 'Article 25-A and implementation gaps',
      frequency: 'high',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'Article 25-A age range and 18th Amendment link',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Evaluate',
      angle: 'Public, private, and madaris streams',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Article 25-A (Fundamental Rights): State shall provide free and compulsory education to all children of age five to sixteen years, as may be determined by law.',
    '18th Amendment (2010) era: 25-A inserted; education responsibility heavily provincialised in the post-amendment federal design taught in exams.',
    'System mix at syllabus level: public sector schools and colleges; expanding private sector; madaris (religious seminaries) as a parallel stream for many households.',
    'Literacy and learning challenges: incomplete access, uneven quality, gender and rural-urban gaps, teacher quality and absenteeism themes, curriculum and assessment weaknesses, and out-of-school children.',
    'Do not invent a precise 2026 literacy rate. Say literacy and learning outcomes remain major development challenges, with provincial variation.',
    'Governance issues: fragmented streams, weak regulation of quality, financing stress, and limited bridge between skills and labour market.',
    'Reform answer pillars: implement 25-A with budgets and schools; improve teachers; unify learning standards while respecting diversity; regulate private and madaris quality; girls education and rural access; skills and STEM where relevant.',
    'Exam structure: right (25-A) → structure of system → problems → reforms → short critical close on political will and provincial capacity.',
  ],
  answerSteps: [
    'Open with Article 25-A (ages 5 to 16) and the 18th Amendment context.',
    'Describe the three-stream mix: public, private, madaris.',
    'List 4 to 5 problems (access, quality, equity, governance, learning outcomes).',
    'Offer reforms mapped to problems, not generic slogans.',
    'Close with implementation gap: right exists; delivery depends on finance, teachers, and provincial capacity.',
  ],
  questionVariants: [
    'Discuss the education system of Pakistan and its major challenges.',
    'Critically examine Article 25-A of the Constitution of Pakistan.',
    'Evaluate the role of public, private, and madaris education streams.',
    'Suggest reforms to improve literacy and learning outcomes in Pakistan.',
  ],
  citations: [
    {
      label: 'Article 25-A',
      text: 'Right to free and compulsory education for children aged five to sixteen years, as may be determined by law.',
    },
    {
      label: '18th Amendment link',
      text: 'Article 25-A belongs to the 18th Amendment (2010) era of constitutional change; education delivery is largely provincial in exam teaching.',
    },
    {
      label: 'System mix',
      text: 'Pakistan education landscape includes public schools, private schools, and madaris as major streams at syllabus level.',
    },
    {
      label: 'Challenge frame',
      text: 'Access, quality, gender and regional gaps, and weak learning outcomes are standard analytical themes without requiring fake exact rates.',
    },
  ],
  flashcards: [
    {
      prompt: 'What does Article 25-A guarantee?',
      answer: 'Free and compulsory education for children aged 5 to 16, as determined by law',
    },
    {
      prompt: 'Which amendment era added Article 25-A?',
      answer: '18th Amendment (2010) era',
    },
    {
      prompt: 'Name the three main education streams taught in exams.',
      answer: 'Public, private, and madaris',
    },
    {
      prompt: 'Who mainly delivers school education after the 18th Amendment teaching frame?',
      answer: 'Provinces (provincial responsibility emphasis)',
    },
    {
      prompt: 'Name three education challenges.',
      answer: 'Access gaps; quality/learning deficits; gender or rural-urban inequality',
    },
    {
      prompt: 'Safe literacy language for answers?',
      answer: 'Literacy and learning remain major challenges with provincial variation (avoid fake exact 2026 rates)',
    },
    {
      prompt: 'One reform linked to 25-A?',
      answer: 'Fund and expand free compulsory schooling to cover ages 5 to 16 in practice',
    },
    {
      prompt: 'One madaris-related exam point?',
      answer: 'Parallel stream needing quality regulation and better mainstream linkage, without crude stereotyping',
    },
    {
      prompt: 'Recommended answer order?',
      answer: 'Right → structure → problems → reforms → implementation critique',
    },
    {
      prompt: 'Why is teacher quality high-yield?',
      answer: 'Learning outcomes depend heavily on trained, present, and accountable teachers',
    },
  ],
  mistakes: [
    {
      trap: 'Writing fake exact literacy percentages for the current year.',
      correct: 'Use careful challenge language unless you cite a named official survey figure you actually know.',
    },
    {
      trap: 'Saying Article 25-A covers all ages including university.',
      correct: 'Constitutional right text targets ages five to sixteen.',
    },
    {
      trap: 'Ignoring provincial role after the 18th Amendment.',
      correct: 'Exams expect provincial delivery emphasis with federal standards/support themes.',
    },
    {
      trap: 'Treating madaris only as a security rant.',
      correct: 'Treat as an education stream: access, quality, regulation, and mainstream bridges.',
    },
    {
      trap: 'Listing reforms unrelated to stated problems.',
      correct: 'Map each reform to a named problem (access, quality, equity, governance).',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Memorise Article 25-A age band and 18th Amendment link.' },
    { day: 'Day 2', task: 'Map public, private, madaris roles in one page.' },
    { day: 'Day 3', task: 'List problems and matching reforms.' },
    { day: 'Day 4', task: 'Drill flashcards.' },
    { day: 'Day 5', task: 'Write a 15-minute discuss answer.' },
    { day: 'Day 6', task: 'Revise critically examine 25-A implementation gaps.' },
    { day: 'Day 7', task: 'One-pager from memory.' },
  ],
  sourcesLine:
    'Sources: Constitution of Pakistan Article 25-A; 18th Amendment era teaching on education devolution; standard CSS education policy notes. Avoid unsourced literacy rate memes.',
}
