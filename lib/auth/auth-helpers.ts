import { createClient } from '../supabase/client'
import type { User } from '@supabase/supabase-js'

export interface SignUpData {
  email: string
  password: string
  username: string
}

export interface SignInData {
  email: string
  password: string
}

// Sign up with email and password
export async function signUp({ email, password, username }: SignUpData) {
  try {
    const supabase = createClient()
    // Check if username is already taken
    const { data: existingUser } = await supabase
      .from('users')
      .select('username')
      .eq('username', username)
      .single()

    if (existingUser) {
      return {
        error: 'Username already taken',
        user: null,
      }
    }

    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    })

    if (authError) {
      return {
        error: authError.message,
        user: null,
      }
    }

    if (!authData.user) {
      return {
        error: 'Failed to create user',
        user: null,
      }
    }

    // User is created in Supabase Auth, no separate profile table needed
    return {
      error: null,
      user: authData.user,
    }
  } catch (error) {
    console.error('Sign up error:', error)
    return {
      error: 'An unexpected error occurred',
      user: null,
    }
  }
}

// Sign in with email and password
export async function signIn({ email, password }: SignInData) {
  try {
    const supabase = createClient()
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return {
        error: error.message,
        user: null,
      }
    }

    if (!data.user) {
      return {
        error: 'Failed to sign in',
        user: null,
      }
    }

    // Get user profile
    const { data: profile } = await supabase
      .from('users')
      .select('*')
      .eq('id', data.user.id)
      .single()

    return {
      error: null,
      user: profile as User,
    }
  } catch (error) {
    console.error('Sign in error:', error)
    return {
      error: 'An unexpected error occurred',
      user: null,
    }
  }
}

// Sign in with Google OAuth
export async function signInWithGoogle() {
  try {
    const supabase = createClient()
    const redirectTo = `${window.location.origin}/auth/callback`
    
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    })

    if (error) {
      let errorMessage = error.message
      if (error.message.includes('redirect_uri_mismatch')) {
        errorMessage = 'Redirect URI mismatch. Please check Google Console configuration.'
      } else if (error.message.includes('invalid_client')) {
        errorMessage = 'Invalid OAuth client. Please check that Google OAuth is properly configured.'
      }
      
      return {
        error: errorMessage,
      }
    }

    return {
      error: null,
      data,
    }
  } catch (error: any) {
    return {
      error: error?.message || 'An unexpected error occurred.',
    }
  }
}

// Sign in with Facebook OAuth
export async function signInWithFacebook() {
  try {
    const supabase = createClient()
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'facebook',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      return {
        error: error.message,
      }
    }

    return {
      error: null,
      data,
    }
  } catch (error) {
    console.error('Facebook sign in error:', error)
    return {
      error: 'An unexpected error occurred',
    }
  }
}

// Sign out
export async function signOut() {
  try {
    const supabase = createClient()
    const { error } = await supabase.auth.signOut()

    if (error) {
      return {
        error: error.message,
      }
    }

    return {
      error: null,
    }
  } catch (error) {
    console.error('Sign out error:', error)
    return {
      error: 'An unexpected error occurred',
    }
  }
}

// Get current session
export async function getSession() {
  try {
    const supabase = createClient()
    const { data, error } = await supabase.auth.getSession()

    if (error) {
      return {
        error: error.message,
        session: null,
      }
    }

    return {
      error: null,
      session: data.session,
    }
  } catch (error) {
    console.error('Get session error:', error)
    return {
      error: 'An unexpected error occurred',
      session: null,
    }
  }
}

// Get current user
export async function getCurrentUser(): Promise<User | null> {
  try {
    const supabase = createClient()
    const { data: { user: authUser } } = await supabase.auth.getUser()

    if (!authUser) {
      return null
    }

    const { data: profile } = await supabase
      .from('users')
      .select('*')
      .eq('id', authUser.id)
      .single()

    return profile as User
  } catch (error) {
    console.error('Get current user error:', error)
    return null
  }
}

// Refresh session
export async function refreshSession() {
  try {
    const supabase = createClient()
    const { data, error } = await supabase.auth.refreshSession()

    if (error) {
      return {
        error: error.message,
        session: null,
      }
    }

    return {
      error: null,
      session: data.session,
    }
  } catch (error) {
    console.error('Refresh session error:', error)
    return {
      error: 'An unexpected error occurred',
      session: null,
    }
  }
}

// Reset password
export async function resetPassword(email: string) {
  try {
    const supabase = createClient()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    })

    if (error) {
      return {
        error: error.message,
      }
    }

    return {
      error: null,
    }
  } catch (error) {
    console.error('Reset password error:', error)
    return {
      error: 'An unexpected error occurred',
    }
  }
}

// Update password
export async function updatePassword(newPassword: string) {
  try {
    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    })

    if (error) {
      return {
        error: error.message,
      }
    }

    return {
      error: null,
    }
  } catch (error) {
    console.error('Update password error:', error)
    return {
      error: 'An unexpected error occurred',
    }
  }
}
