import type { NoteTopicMeta, NoteKitData } from '@/lib/notes/types'
import { OBJECTIVES_RESOLUTION_KIT } from '@/lib/notes/content/objectives-resolution-article-2a'
import { CONSTITUTION_1973_KIT } from '@/lib/notes/content/constitution-1973'
import { EIGHTEENTH_AMENDMENT_KIT } from '@/lib/notes/content/eighteenth-amendment'
import { LAHORE_RESOLUTION_KIT } from '@/lib/notes/content/lahore-resolution-1940'

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
  {
    slug: 'constitution-1973',
    title: '1973 Constitution of Pakistan',
    contentId: 'constitution-1973',
    subjectSlugs: ['pakistan-affairs'],
    syllabusHints: [
      '1973 constitution',
      'constitutions of pakistan',
      'constitutional history',
      'constitutional development',
      'parliamentary system',
      'political evolution since 1971',
    ],
    mcqSubjectSlug: 'pakistan-affairs',
    mcqTagHint: 'constitution',
  },
  {
    slug: 'eighteenth-amendment',
    title: '18th Amendment (2010)',
    contentId: 'eighteenth-amendment',
    subjectSlugs: ['pakistan-affairs'],
    syllabusHints: [
      '18th amendment',
      'eighteenth amendment',
      'provincial autonomy',
      'recent constitutional',
      'federalism',
      'constitutional amendments',
    ],
    mcqSubjectSlug: 'pakistan-affairs',
    mcqTagHint: 'constitution',
  },
  {
    slug: 'lahore-resolution-1940',
    title: 'Lahore Resolution (Pakistan Resolution) 1940',
    contentId: 'lahore-resolution-1940',
    subjectSlugs: ['pakistan-affairs'],
    syllabusHints: [
      'lahore resolution',
      'pakistan resolution',
      'pakistan resolutions',
      'freedom movement',
      'ideology of pakistan',
      '1940',
    ],
    mcqSubjectSlug: 'pakistan-affairs',
    mcqTagHint: 'pakistan-movement',
  },
]

const KITS: Record<string, NoteKitData> = {
  'objectives-resolution-article-2a': OBJECTIVES_RESOLUTION_KIT,
  'constitution-1973': CONSTITUTION_1973_KIT,
  'eighteenth-amendment': EIGHTEENTH_AMENDMENT_KIT,
  'lahore-resolution-1940': LAHORE_RESOLUTION_KIT,
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
