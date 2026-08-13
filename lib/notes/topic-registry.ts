import type { NoteTopicMeta } from '@/lib/notes/types'
import { OBJECTIVES_RESOLUTION_KIT } from '@/lib/notes/content/objectives-resolution-article-2a'
import type { NoteKitData } from '@/lib/notes/types'

const TOPICS: NoteTopicMeta[] = [
  {
    slug: 'objectives-resolution-article-2a',
    title: 'Objectives Resolution and Article 2A',
    contentId: 'objectives-resolution-article-2a',
    subjectSlugs: ['pakistan-affairs'],
    syllabusHints: [
      'objectives resolution',
      'article 2a',
      'constitutional history',
      'constitutional development',
      '1973 constitutions',
      'ideology of pakistan',
      'recent constitutional',
    ],
    mcqSubjectSlug: 'pakistan-affairs',
    mcqTagHint: 'constitution',
  },
]

const KITS: Record<string, NoteKitData> = {
  'objectives-resolution-article-2a': OBJECTIVES_RESOLUTION_KIT,
}

export function listRegisteredTopics(): NoteTopicMeta[] {
  return TOPICS
}

export function getRegisteredTopic(slug: string): NoteTopicMeta | null {
  return TOPICS.find((t) => t.slug === slug) ?? null
}

export function getRegisteredTopicForSubject(subjectSlug: string): NoteTopicMeta[] {
  return TOPICS.filter((t) => t.subjectSlugs.includes(subjectSlug))
}

export function getNoteKit(contentId: string): NoteKitData | null {
  return KITS[contentId] ?? null
}

export function resolveTopicKit(
  topicSlug: string
): { meta: NoteTopicMeta; kit: NoteKitData } | null {
  const meta = getRegisteredTopic(topicSlug)
  if (!meta) return null
  const kit = getNoteKit(meta.contentId)
  if (!kit) return null
  return { meta, kit }
}
