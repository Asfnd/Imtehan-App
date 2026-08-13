export type NoteTrack = 'fact' | 'written'

export type PastPaperEntry = {
  year: string
  directive: string
  angle: string
  frequency: 'high' | 'medium' | 'niche'
}

export type CitationEntry = {
  label: string
  text: string
}

export type FlashcardAtom = {
  prompt: string
  answer: string
}

export type MistakeTrap = {
  trap: string
  correct: string
}

export type RevisionDay = {
  day: string
  task: string
}

export type NoteKitData = {
  id: string
  title: string
  subtitle: string
  syllabusTags: string[]
  updated: string
  pastPapers: PastPaperEntry[]
  onePager: string[]
  answerSteps: string[]
  questionVariants: string[]
  citations: CitationEntry[]
  flashcards: FlashcardAtom[]
  mistakes: MistakeTrap[]
  revisionPath: RevisionDay[]
  sourcesLine: string
}

export type NoteTopicMeta = {
  slug: string
  title: string
  contentId: string
  /** Subject slugs where this kit may appear (e.g. pakistan-affairs) */
  subjectSlugs: string[]
  /** Optional syllabus topic label match helpers */
  syllabusHints: string[]
  mcqSubjectSlug: string
  mcqTagHint?: string
}

export type NotesModuleSection = {
  slug: string
  label: string
  dbTable: string
}

export type NotesModule = {
  slug: string
  name: string
  category: string
  track: NoteTrack
  hasMcqPractice: boolean
  sections: NotesModuleSection[]
}
