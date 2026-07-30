import { redirect } from 'next/navigation'

/** Legacy path — CF soft-404 trap; live route is /run/:id. */
export default async function LegacyMockRedirect({
  params,
}: {
  params: Promise<{ examSlug: string; mockId: string }>
}) {
  const { examSlug, mockId } = await params
  redirect(`/exams/${examSlug}/run/${mockId}`)
}
