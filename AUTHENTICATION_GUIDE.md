# Authentication System Guide

## Overview

This app uses **Supabase Auth** for a complete, secure authentication system with multiple sign-in methods and password management.

## Features

✅ **Email/Password Authentication**
- Sign up with email and password
- Email verification (configurable)
- Secure password requirements (min 6 characters)

✅ **Google OAuth**
- One-click sign in with Google
- Automatic account creation
- No password needed

✅ **Password Management**
- Forgot password flow
- Password reset via email
- Secure password updates

✅ **Session Management**
- Persistent sessions with Zustand
- Automatic session refresh
- Secure sign out

## Pages

### 1. Login (`/login`)
- Email/password sign in
- Google OAuth sign in
- Link to sign up
- Link to forgot password
- Redirect to dashboard after login

### 2. Sign Up (`/signup`)
- Create account with email/password
- Google OAuth sign up
- Name field for personalization
- Email confirmation handling
- Link to login

### 3. Forgot Password (`/forgot-password`)
- Request password reset email
- Success confirmation
- Back to login link

### 4. Reset Password (`/reset-password`)
- Set new password
- Password confirmation
- Auto-redirect to login after success

### 5. Auth Callback (`/auth/callback`)
- Handles OAuth redirects
- Exchanges code for session
- Redirects to dashboard

## User Flow

### Sign Up Flow
```
1. User visits /signup
2. Options:
   a) Google OAuth → Instant account → Dashboard
   b) Email/Password → Email confirmation → Dashboard
3. User data stored in Supabase
4. Session created and persisted
```

### Login Flow
```
1. User visits /login
2. Options:
   a) Google OAuth → Dashboard
   b) Email/Password → Dashboard
3. Session restored from storage
4. User redirected to dashboard
```

### Password Reset Flow
```
1. User clicks "Forgot?" on login page
2. Enters email on /forgot-password
3. Receives reset email from Supabase
4. Clicks link → /reset-password
5. Sets new password
6. Redirected to /login
```

## Technical Implementation

### Auth Store (`store/auth-store.ts`)
```typescript
- user: User | null
- loading: boolean
- initialized: boolean
- setUser()
- initialize()
- signOut()
```

Uses Zustand with persistence to maintain auth state across page reloads.

### Auth Provider (`components/auth/AuthProvider.tsx`)
Initializes auth state on app load and wraps the entire application.

### Auth Helpers (`lib/auth/auth-helpers.ts`)
Utility functions for:
- signUp()
- signIn()
- signInWithGoogle()
- signOut()
- getCurrentUser()
- resetPassword()
- updatePassword()

### Supabase Client (`lib/supabase/client.ts`)
Configured Supabase client for auth operations.

## Configuration

### Environment Variables
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Supabase Dashboard Settings

#### 1. Email Templates
Customize email templates in Supabase Dashboard:
- **Authentication** → **Email Templates**
- Confirmation email
- Password reset email
- Magic link email

#### 2. OAuth Providers
Enable Google OAuth:
- **Authentication** → **Providers**
- Enable Google
- Add OAuth credentials from Google Cloud Console
- Set redirect URL: `https://your-domain.com/auth/callback`

#### 3. Email Confirmation
Configure email confirmation:
- **Authentication** → **Settings**
- Toggle "Enable email confirmations"
- Set confirmation URL: `https://your-domain.com/auth/callback`

#### 4. Password Requirements
Set password policy:
- **Authentication** → **Settings**
- Minimum password length (default: 6)
- Password strength requirements

## Security Features

### 1. Password Security
- Minimum 6 characters required
- Passwords hashed by Supabase
- Never stored in plain text
- Secure password reset flow

### 2. Session Security
- HTTP-only cookies (server-side)
- Automatic session refresh
- Secure token storage
- Session expiration handling

### 3. OAuth Security
- State parameter validation
- PKCE flow for OAuth
- Secure redirect handling
- Token exchange on server

### 4. Rate Limiting
- Middleware protects auth endpoints
- Prevents brute force attacks
- Configurable limits

## Protected Routes

To protect a route, use the auth store:

```typescript
'use client'

import { useAuthStore } from '@/store/auth-store'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function ProtectedPage() {
  const { user, loading } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading) return <div>Loading...</div>
  if (!user) return null

  return <div>Protected Content</div>
}
```

## Sign Out

Sign out from anywhere:

```typescript
import { useAuthStore } from '@/store/auth-store'

function SignOutButton() {
  const { signOut } = useAuthStore()

  return (
    <button onClick={signOut}>
      Sign Out
    </button>
  )
}
```

## Error Handling

All auth functions return errors in a consistent format:

```typescript
const { error, user } = await signIn({ email, password })

if (error) {
  // Display error to user
  setError(error)
} else {
  // Success - redirect
  router.push('/dashboard')
}
```

## Testing

### Local Testing
1. Start dev server: `npm run dev`
2. Visit `http://localhost:3000/login`
3. Test email/password sign up
4. Test Google OAuth (requires setup)
5. Test password reset flow

### Test Accounts
Create test accounts in Supabase Dashboard:
- **Authentication** → **Users** → **Add User**

## Troubleshooting

### Issue: Email confirmation not working
**Solution:** 
- Check Supabase email settings
- Verify SMTP configuration
- Check spam folder
- Disable email confirmation for testing

### Issue: Google OAuth not working
**Solution:**
- Verify OAuth credentials in Supabase
- Check redirect URLs match
- Ensure Google Cloud Console is configured
- Check browser console for errors

### Issue: Session not persisting
**Solution:**
- Check browser localStorage
- Verify Zustand persistence
- Clear browser cache
- Check for cookie blocking

### Issue: Password reset email not received
**Solution:**
- Check email address is correct
- Verify Supabase email settings
- Check spam folder
- Wait a few minutes (email delay)

## Best Practices

1. **Always validate user input** before sending to Supabase
2. **Show clear error messages** to users
3. **Use loading states** during async operations
4. **Redirect after successful auth** to improve UX
5. **Handle edge cases** (email already exists, weak password, etc.)
6. **Test all flows** before deploying
7. **Monitor auth errors** in production
8. **Keep Supabase packages updated**

## Production Checklist

- [ ] Environment variables set in hosting platform
- [ ] OAuth redirect URLs configured for production domain
- [ ] Email templates customized with branding
- [ ] Password policy configured
- [ ] Rate limiting enabled
- [ ] Error monitoring set up
- [ ] Test all auth flows on production
- [ ] SSL/HTTPS enabled
- [ ] CORS configured correctly
- [ ] Session timeout configured

## Support

For issues with:
- **Supabase Auth**: Check [Supabase Docs](https://supabase.com/docs/guides/auth)
- **OAuth Setup**: See provider-specific guides
- **Email Delivery**: Check Supabase email settings

## Summary

This authentication system provides:
- ✅ Multiple sign-in methods
- ✅ Secure password management
- ✅ Session persistence
- ✅ Complete password reset flow
- ✅ Modern, clean UI
- ✅ Mobile responsive
- ✅ Production-ready

All authentication pages are simple, functional, and follow best practices for security and user experience.
