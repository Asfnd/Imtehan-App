# 🔧 Google OAuth Configuration Fix

## Problem:
Google sign-in not working on Vercel - missing redirect URIs

## Solution:

### 1. Google Cloud Console Configuration

Go to: https://console.cloud.google.com/apis/credentials

**Client ID:** `798551938463-b2pl32uu67h9605ubieo1fh4e1bs5fv3.apps.googleusercontent.com`

#### Authorized JavaScript origins:
```
https://your-vercel-app.vercel.app
http://localhost:3000
https://qsrkkvrrxorbgvbgekew.supabase.co
```

#### ⚠️ Authorized redirect URIs (CRITICAL):
```
https://qsrkkvrrxorbgvbgekew.supabase.co/auth/v1/callback
```

Optional for localhost testing:
```
http://localhost:3000/auth/callback
```

---

### 2. Supabase Dashboard Configuration

Go to: https://supabase.com/dashboard/project/qsrkkvrrxorbgvbgekew/auth/url-configuration

#### Site URL:
```
https://your-vercel-app.vercel.app
```

#### Redirect URLs:
```
https://your-vercel-app.vercel.app/auth/callback
http://localhost:3000/auth/callback
https://your-vercel-app.vercel.app/*
http://localhost:3000/*
```

---

### 3. Environment Variables (Vercel)

Make sure these are set in Vercel Dashboard:

```env
NEXT_PUBLIC_SUPABASE_URL=https://qsrkkvrrxorbgvbgekew.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_APP_URL=https://your-vercel-app.vercel.app
```

---

## Testing Steps:

### After Configuration:

1. **Wait 5-10 minutes** for Google OAuth changes to propagate

2. **Test on Vercel:**
   - Go to `https://your-vercel-app.vercel.app`
   - Click "Sign in with Google"
   - Should redirect to Google
   - After selecting account, should redirect back to your app
   - Should be signed in successfully

3. **Check Browser Console** for any errors

4. **Check Vercel Logs** if still not working:
   - Go to Vercel Dashboard → Your Project → Logs
   - Look for errors in the `/auth/callback` route

---

## Common Issues:

### Issue 1: "redirect_uri_mismatch"
**Solution:** The redirect URI in Google Console must EXACTLY match:
```
https://qsrkkvrrxorbgvbgekew.supabase.co/auth/v1/callback
```
Note: It's `/auth/v1/callback` not `/auth/callback`

### Issue 2: "Access blocked: This app's request is invalid"
**Solution:** Make sure your OAuth consent screen is configured and published

### Issue 3: Redirects to callback but doesn't sign in
**Solution:** Check Vercel environment variables are set correctly

### Issue 4: Works on localhost but not Vercel
**Solution:** 
- Verify Supabase Site URL is set to your Vercel domain
- Verify Vercel environment variables match your .env.local

---

## Verification Checklist:

- [ ] Google OAuth redirect URI includes Supabase callback URL
- [ ] Google OAuth JavaScript origins include Vercel URL
- [ ] Supabase Site URL is set to Vercel URL
- [ ] Supabase Redirect URLs include Vercel callback
- [ ] Vercel environment variables are set
- [ ] Waited 5-10 minutes after Google OAuth changes
- [ ] Tested on Vercel production URL

---

## What Your Google Console Should Look Like:

```
OAuth 2.0 Client ID

Name: [Your App Name]

Authorized JavaScript origins:
  1. https://your-vercel-app.vercel.app
  2. http://localhost:3000
  3. https://qsrkkvrrxorbgvbgekew.supabase.co

Authorized redirect URIs:
  1. https://qsrkkvrrxorbgvbgekew.supabase.co/auth/v1/callback
  2. http://localhost:3000/auth/callback (optional)
```

---

## Need Your Vercel URL?

If you don't know your Vercel URL:
1. Go to Vercel Dashboard
2. Select your project
3. Look for "Domains" section
4. Copy the `.vercel.app` URL
5. Use that URL in all the configurations above

---

## Status:
⏳ Waiting for configuration
🔄 After configuring, wait 5-10 minutes
✅ Then test on Vercel

**The key is the Supabase callback URL in Google OAuth redirect URIs!**
