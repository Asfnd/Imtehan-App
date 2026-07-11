import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { isValidRedirectUrl } from '@/lib/security/request-verification'

/**
 * SECURITY: Auth Callback Route
 * - Validates OAuth code
 * - Prevents open redirect attacks
 * - Uses PKCE for secure OAuth flow
 */
export async function GET(request: Request) {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state')
  let next = url.searchParams.get('next') || '/css'

  if (!isValidRedirectUrl(next, url.origin)) {
    next = '/css'
  }

  if (code) {
    try {
      const cookieStore = await cookies()
      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            getAll: () => cookieStore.getAll(),
            setAll: (cookies) => cookies.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
          }
        }
      )

      // SECURITY: Exchange code for session (Supabase handles PKCE validation internally)
      const { error } = await supabase.auth.exchangeCodeForSession(code)

      if (error) {
        console.error('Auth callback error:', error)
        // Redirect to login on auth error instead of showing error
        return NextResponse.redirect(new URL('/signin', url.origin))
      }
    } catch (error) {
      console.error('Auth exchange error:', error)
      // Redirect to login on unexpected error
      return NextResponse.redirect(new URL('/signin', url.origin))
    }
  }

  // SECURITY: Redirect to validated safe URL; welcome=1 triggers one-time follow prompt
  const dest = new URL(next, url.origin)
  if (code) dest.searchParams.set('welcome', '1')
  return NextResponse.redirect(dest)
}