import { redirect } from 'next/navigation'
import { primaryNotesPathForSlug } from '@/lib/seo/notes-seo'

/** Old pilot URL → canonical kit path */
export default function LegacyObjectivesResolutionRedirect() {
  redirect(
    primaryNotesPathForSlug('objectives-resolution-article-2a') ??
      '/notes/css-written/pakistan-affairs/objectives-resolution-article-2a',
  )
}
