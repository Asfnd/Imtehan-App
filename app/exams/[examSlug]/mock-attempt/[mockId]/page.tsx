import { redirect } from 'next/navigation'

/** Legacy path — CF soft-404 / blank-stem trap; live route is /run/:id. */
export default async function LegacyMockAttemptRedirect({
  params,
}: {
  params: Promise<{ examSlug: string; mockId: string }>
}) {
  const { examSlug, mockId } = await params
  redirect(`/exams/${examSlug}/run/${mockId}`)
}
