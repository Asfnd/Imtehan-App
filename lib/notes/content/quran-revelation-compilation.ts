import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked classic syllabus facts:
 * - Revelation over about 23 years
 * - First revelation in Cave Hira (Jabal al-Nur), Surah Al-Alaq 96:1-5 commonly taught
 * - Makki and Madani classification by period of revelation
 * - Compilation into a mushaf under Abu Bakr (after Yamama losses), Zayd ibn Thabit leading
 * - Standardization and copies under Uthman ibn Affan
 * Avoid inventing disputed verse counts as absolute where schools differ; keep careful classic facts
 */
export const QURAN_REVELATION_COMPILATION_KIT: NoteKitData = {
  id: 'quran-revelation-compilation',
  title: 'Revelation and Compilation of the Quran',
  subtitle:
    'Twenty-three years of revelation, Makki and Madani, Cave Hira, Abu Bakr compilation, and Uthman standardization.',
  syllabusTags: [
    'Islamic Studies',
    'Ulum al-Quran',
    'Revelation and compilation',
    'FPSC Islamiat',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'CSS / PMS Islamiat',
      directive: 'Discuss',
      angle: 'Process of revelation and preservation of the Quran',
      frequency: 'high',
    },
    {
      year: 'CSS pattern',
      directive: 'Explain',
      angle: 'Compilation under Abu Bakr and standardization under Uthman',
      frequency: 'high',
    },
    {
      year: 'One-paper / MPT',
      directive: 'MCQ fact',
      angle: 'Cave Hira, first revelation, Makki/Madani, Zayd ibn Thabit',
      frequency: 'high',
    },
    {
      year: 'CSS / PMS',
      directive: 'Differentiate',
      angle: 'Makki and Madani revelations: themes and context',
      frequency: 'medium',
    },
  ],
  onePager: [
    'The Quran was revealed to Prophet Muhammad (PBUH) gradually over about 23 years, not all at once.',
    'First revelation: Cave Hira on Jabal al-Nur near Makkah. Angel Jibril brought the first verses. Classic teaching points to the opening of Surah Al-Alaq (Read in the name of your Lord...).',
    'Wahy (revelation) came in stages suited to events, questions, and community needs. This gradual method aided memorisation and practice.',
    'Makki revelations: mostly before Hijra, often shorter surahs, faith in Tawhid, Akhirah, moral reform, and patience under persecution.',
    'Madani revelations: mostly after Hijra to Madinah, often longer passages, law, social order, jihad rules in context, and relations with other communities.',
    'During the Prophet`s life: writing by scribes and strong oral memorisation (huffaz). The Quran was complete as revelation before his death; a single official bound mushaf for the ummah came later.',
    'Abu Bakr (RA): after heavy losses of memorizers at Yamama, ordered collection into a compiled mushaf. Zayd ibn Thabit led the work, using written fragments and testimony of memorizers. That collection later passed into Umar`s keeping, then Hafsa`s (RA).',
    'Uthman (RA): as Islam spread, dialect and reading differences risked dispute. He commissioned a standard written copy from the Abu Bakr/Umar-era collection (via Hafsa) and sent official copies to major centres, with a policy of unity around that standard text.',
  ],
  answerSteps: [
    'Open with the nature of the Quran as divine revelation and the 23-year timeline.',
    'State first revelation facts: Cave Hira, Jibril, opening of Al-Alaq in classic teaching.',
    'Explain Makki vs Madani by period and typical themes, not by guessing every surah from memory unless sure.',
    'Describe preservation in the Prophetic era: memory plus writing by scribes.',
    'Narrate Abu Bakr compilation (reason: Yamama; method: Zayd; written + oral verification).',
    'Narrate Uthman standardization (reason: unity of text across regions; official copies).',
    'Close: gradual revelation plus careful compilation explain both authenticity and historical care in syllabus terms.',
  ],
  questionVariants: [
    'Discuss the revelation of the Quran with special reference to its gradual nature.',
    'Explain the compilation of the Quran under Abu Bakr and its standardization under Uthman.',
    'Differentiate between Makki and Madani revelations.',
    'Write a note on the first revelation in Cave Hira and its significance.',
  ],
  citations: [
    {
      label: 'Duration',
      text: 'Revelation spanned about 23 years of the Prophetic mission.',
    },
    {
      label: 'First revelation',
      text: 'Cave Hira near Makkah; first verses commonly taught from Surah Al-Alaq.',
    },
    {
      label: 'Makki / Madani',
      text: 'Classification mainly by whether revelation came before or after Hijra, with typical theme differences.',
    },
    {
      label: 'Abu Bakr compilation',
      text: 'Official collection into a mushaf after Yamama, led by Zayd ibn Thabit under Abu Bakr.',
    },
    {
      label: 'Uthman standardization',
      text: 'Official standard copies prepared from the earlier compiled mushaf (via Hafsa) and distributed to unite the community on one written standard.',
    },
  ],
  flashcards: [
    { prompt: 'About how long did Quranic revelation take?', answer: 'About 23 years' },
    { prompt: 'Where did the first revelation occur?', answer: 'Cave Hira (Jabal al-Nur) near Makkah' },
    { prompt: 'Which angel brought revelation?', answer: 'Jibril (Gabriel)' },
    { prompt: 'Which surah opening is classically linked to the first revelation?', answer: 'Surah Al-Alaq (Iqra)' },
    { prompt: 'What does Makki mainly mean in Ulum al-Quran teaching?', answer: 'Revealed before Hijra (typical teaching)' },
    { prompt: 'What does Madani mainly mean?', answer: 'Revealed after Hijra to Madinah (typical teaching)' },
    { prompt: 'Name one typical Makki theme.', answer: 'Tawhid, Akhirah, or moral reform under persecution' },
    { prompt: 'Name one typical Madani theme.', answer: 'Law, social organization, or community rules' },
    { prompt: 'Who ordered the first official compilation into a mushaf?', answer: 'Abu Bakr (RA)' },
    { prompt: 'Which battle losses pushed the compilation decision?', answer: 'Battle of Yamama (loss of many huffaz)' },
    { prompt: 'Who headed the compilation committee work?', answer: 'Zayd ibn Thabit' },
    { prompt: 'Where was the Abu Bakr mushaf kept before Uthman`s project?', answer: 'With Umar, then Hafsa (RA)' },
    { prompt: 'Who ordered standardization and official copies for the provinces?', answer: 'Uthman ibn Affan (RA)' },
    { prompt: 'Was the Quran revealed all at once?', answer: 'No, gradually over about 23 years' },
    { prompt: 'How was the Quran preserved in the Prophet`s lifetime?', answer: 'Memorisation and writing by scribes' },
    { prompt: 'Why did Uthman standardize the text?', answer: 'To prevent conflict from regional reading/writing differences and protect unity' },
  ],
  mistakes: [
    {
      trap: 'Saying Uthman was the first to collect the Quran into a mushaf.',
      correct: 'Abu Bakr ordered the first official compilation. Uthman standardized and distributed official copies.',
    },
    {
      trap: 'Claiming the Quran was only oral and never written in the Prophet`s time.',
      correct: 'Both memorisation and writing by scribes existed; later work organised the official mushaf.',
    },
    {
      trap: 'Dating first revelation to Madinah or confusing Hira with Mount Arafat.',
      correct: 'First revelation: Cave Hira near Makkah.',
    },
    {
      trap: 'Defining Makki/Madani only by where a surah is read today, not by revelation period.',
      correct: 'Classic teaching uses period relative to Hijra (with known scholarly nuances).',
    },
    {
      trap: 'Inventing exact modern printing details or fake verse-number controversies as exam facts.',
      correct: 'Stick to 23 years, Hira, Makki/Madani, Abu Bakr, Zayd, Uthman.',
    },
    {
      trap: 'Crediting Umar alone as the sole compiler and skipping Abu Bakr and Zayd.',
      correct: 'Umar urged the project; Abu Bakr ordered it; Zayd executed the compilation.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Timeline: 23 years, first revelation, Hijra divide.' },
    { day: 'Day 2', task: 'Makki vs Madani themes table from memory.' },
    { day: 'Day 3', task: 'Abu Bakr compilation story: Yamama, Zayd, method.' },
    { day: 'Day 4', task: 'Uthman standardization: reason and action.' },
    { day: 'Day 5', task: 'Write a full discuss answer on revelation and preservation.' },
    { day: 'Day 6', task: 'Flashcards + common MCQ traps.' },
    { day: 'Day 7', task: 'One-pager only. Recite sequence Abu Bakr then Uthman.' },
  ],
  sourcesLine:
    'Sources: Standard Ulum al-Quran syllabus items; mainstream Seerah and Islamic history teaching on Cave Hira, Abu Bakr compilation, and Uthman`s mushaf. Avoid unsourced internet verse myths.',
}
