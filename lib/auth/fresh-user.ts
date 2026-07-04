import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

/**
 * Return the signed-in user with up-to-date user_metadata (premium flags).
 * Refreshes the session when one exists so manual Supabase activations apply
 * without forcing sign-out.
 */
export async function getFreshAuthUser(): Promise<User | null> {
  const supabase = createClient()
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    const { data: { user } } = await supabase.auth.getUser()
    return user ?? null
  }

  const { data: refreshed, error } = await supabase.auth.refreshSession()
  if (!error && refreshed.session?.user) {
    return refreshed.session.user
  }

  const { data: { user } } = await supabase.auth.getUser()
  return user ?? session.user ?? null
}
