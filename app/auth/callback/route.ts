import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const next = requestUrl.searchParams.get('next') ?? '/dashboard'
  const error = requestUrl.searchParams.get('error')
  const errorDescription = requestUrl.searchParams.get('error_description')

  console.log('Auth callback:', { code: !!code, next, error, errorDescription })

  // Handle OAuth errors
  if (error) {
    console.error('OAuth error:', error, errorDescription)
    return NextResponse.redirect(new URL(`/dashboard?auth=error&message=${encodeURIComponent(errorDescription || error)}`, requestUrl.origin))
  }

  if (code) {
    try {
      const cookieStore = await cookies()
      
      // Create the response first
      const redirectUrl = new URL(next, requestUrl.origin)
      redirectUrl.searchParams.set('auth', 'success')
      const response = NextResponse.redirect(redirectUrl)
      
      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            getAll() {
              return cookieStore.getAll()
            },
            setAll(cookiesToSet) {
              cookiesToSet.forEach(({ name, value, options }) => {
                // Set on both cookie store and response
                cookieStore.set(name, value, options)
                response.cookies.set(name, value, {
                  ...options,
                  httpOnly: true,
                  secure: process.env.NODE_ENV === 'production',
                  sameSite: 'lax',
                  path: '/',
                })
              })
            },
          },
        }
      )
      
      console.log('Exchanging code for session...')
      const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
      
      if (exchangeError) {
        console.error('Auth exchange error:', exchangeError)
        return NextResponse.redirect(new URL(`/dashboard?auth=error&message=${encodeURIComponent(exchangeError.message)}`, requestUrl.origin))
      }

      if (data.session) {
        console.log('Session created successfully for user:', data.user?.email)
        console.log('Session expires at:', data.session.expires_at)
        console.log('Access token length:', data.session.access_token?.length)
        console.log('Refresh token length:', data.session.refresh_token?.length)
        
        console.log('Redirecting to:', redirectUrl.toString())
        
        // Log all cookies being set
        const allCookies = cookieStore.getAll()
        console.log('Cookies set:', allCookies.map(c => ({ name: c.name, value: c.value?.substring(0, 20) + '...' })))
        
        return response
      } else {
        console.error('No session created')
        return NextResponse.redirect(new URL('/dashboard?auth=error&message=No session created', requestUrl.origin))
      }
    } catch (error) {
      console.error('Callback error:', error)
      return NextResponse.redirect(new URL(`/dashboard?auth=error&message=${encodeURIComponent('Authentication failed')}`, requestUrl.origin))
    }
  }

  console.log('No code provided, redirecting to dashboard')
  return NextResponse.redirect(new URL('/dashboard?auth=error&message=No authorization code', requestUrl.origin))
}
