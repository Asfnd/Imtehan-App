import { redirect } from 'next/navigation'

/** Legacy path — Cloudflare still holds stale HTML here; attempt/ is the live route. */
export default async function LegacyMockAttemptRedirect({
  params,
}: {
  params: Promise<{ examSlug: string; mockId: string }>
}) {
  const { examSlug, mockId } = await params
  redirect(`/exams/${examSlug}/attempt/${mockId}`)
}
