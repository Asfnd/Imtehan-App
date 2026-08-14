export { slugifyTopic } from '@/lib/notes/slugify'
export type {
  NoteTrack,
  NoteKitData,
  NoteTopicMeta,
  NotesModule,
  NotesModuleSection,
} from '@/lib/notes/types'
export type { ReadyKitButton } from '@/lib/notes/modules'
export {
  getNotesModule,
  listNotesModules,
  listNotesModulesByCategory,
  listSyllabusTopicsForSection,
  countKitsForModule,
  listReadyKitsForExam,
  categoryLabel,
  CSS_WRITTEN_PA_TOPICS,
} from '@/lib/notes/modules'
export {
  listRegisteredTopics,
  getRegisteredTopic,
  getRegisteredTopicForSubject,
  getNoteKit,
  resolveTopicKit,
} from '@/lib/notes/topic-registry'
