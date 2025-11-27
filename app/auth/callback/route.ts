import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const next = requestUrl.searchParams.get('next') ?? '/dashboard'

  if (code) {
    try {
      const cookieStore = await cookies()
      
      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            getAll() {
              return cookieStore.getAll()
            },
            setAll(cookiesToSet) {
              try {
                cookiesToSet.forEach(({ name, value, options }) =>
                  cookieStore.set(name, value, options)
                )
              } catch (error) {
                console.error('Cookie set error:', error)
              }
            },
          },
        }
      )
      
      const { data, error } = await supabase.auth.exchangeCodeForSession(code)
      
      if (error) {
        console.error('Auth exchange error:', error)
        // Redirect to login with error
        return NextResponse.redirect(new URL('/dashboard?auth=error', requestUrl.origin))
      }

      if (data.session) {
        // Success! Build the redirect URL
        const redirectUrl = new URL(next, requestUrl.origin)
        
        // Create response with redirect
        const response = NextResponse.redirect(redirectUrl)
        
        // Ensure cookies are set in the response
        const { access_token, refresh_token } = data.session
        
        // Set cookies manually for better Vercel compatibility
        response.cookies.set('sb-access-token', access_token, {
          path: '/',
          secure: process.env.NODE_ENV === 'production',
          httpOnly: true,
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 7, // 7 days
        })
        
        if (refresh_token) {
          response.cookies.set('sb-refresh-token', refresh_token, {
            path: '/',
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true,
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 30, // 30 days
          })
        }
        
        return response
      }
    } catch (error) {
      console.error('Callback error:', error)
    }
  }

  // Fallback redirect
  return NextResponse.redirect(new URL('/dashboard', requestUrl.origin))
}
