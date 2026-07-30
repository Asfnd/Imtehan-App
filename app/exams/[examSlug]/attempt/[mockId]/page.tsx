import { redirect } from 'next/navigation'

/** Legacy — /attempt/1 was CF-poisoned with a pre-deploy 404; live path is /run/:id. */
export default async function LegacyAttemptRedirect({
  params,
}: {
  params: Promise<{ examSlug: string; mockId: string }>
}) {
  const { examSlug, mockId } = await params
  redirect(`/exams/${examSlug}/run/${mockId}`)
}
