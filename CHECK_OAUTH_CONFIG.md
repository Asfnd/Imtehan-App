# 🔍 OAuth Configuration Diagnostic

## Quick Check: What's Your Vercel URL?

**Find it here:** https://vercel.com/dashboard → Your Project → Domains

Example: `https://quiz-app-xyz123.vercel.app`

---

## Step-by-Step Fix:

### 1️⃣ Google Cloud Console

**URL:** https://console.cloud.google.com/apis/credentials

**Your Client ID:** `798551938463-b2pl32uu67h9605ubieo1fh4e1bs5fv3.apps.googleusercontent.com`

Click on your OAuth 2.0 Client ID, then:

#### Add to "Authorized JavaScript origins":
```
https://YOUR-VERCEL-URL.vercel.app
http://localhost:3000
https://qsrkkvrrxorbgvbgekew.supabase.co
```

#### ⚠️ Add to "Authorized redirect URIs" (THIS IS THE KEY):
```
https://qsrkkvrrxorbgvbgekew.supabase.co/auth/v1/callback
```

**Click SAVE** and wait 5-10 minutes.

---

### 2️⃣ Supabase Dashboard

**URL:** https://supabase.com/dashboard/project/qsrkkvrrxorbgvbgekew/auth/url-configuration

#### Set "Site URL" to:
```
https://YOUR-VERCEL-URL.vercel.app
```

#### Add to "Redirect URLs":
```
https://YOUR-VERCEL-URL.vercel.app/auth/callback
http://localhost:3000/auth/callback
```

**Click SAVE**.

---

### 3️⃣ Vercel Environment Variables

**URL:** https://vercel.com/dashboard → Your Project → Settings → Environment Variables

Make sure these exist:
```
NEXT_PUBLIC_SUPABASE_URL = https://qsrkkvrrxorbgvbgekew.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_APP_URL = https://YOUR-VERCEL-URL.vercel.app
```

If you add/change any, **redeploy** your app.

---

## 🧪 Test It:

1. Wait 5-10 minutes after Google OAuth changes
2. Go to your Vercel URL
3. Click "Sign in with Google"
4. Should work! ✅

---

## 🐛 Still Not Working?

### Check the Error Message:

#### Error: "redirect_uri_mismatch"
**Fix:** The redirect URI must be EXACTLY:
```
https://qsrkkvrrxorbgvbgekew.supabase.co/auth/v1/callback
```
Note: `/auth/v1/callback` (not `/auth/callback`)

#### Error: "Access blocked: This app's request is invalid"
**Fix:** 
1. Go to OAuth consent screen in Google Console
2. Make sure it's configured
3. Add test users if in "Testing" mode
4. Or publish the app

#### Error: Redirects but doesn't sign in
**Fix:**
1. Check Vercel logs for errors
2. Verify environment variables in Vercel
3. Make sure Supabase Site URL matches your Vercel URL

---

## 📸 What It Should Look Like:

### Google Console - Authorized redirect URIs:
```
✅ https://qsrkkvrrxorbgvbgekew.supabase.co/auth/v1/callback
```

### Supabase - Site URL:
```
✅ https://your-vercel-app.vercel.app
```

### Supabase - Redirect URLs:
```
✅ https://your-vercel-app.vercel.app/auth/callback
✅ http://localhost:3000/auth/callback
```

---

## 🎯 The Most Common Mistake:

People forget to add the **Supabase callback URL** to Google OAuth redirect URIs.

**The magic URL you need:**
```
https://qsrkkvrrxorbgvbgekew.supabase.co/auth/v1/callback
```

This is where Google redirects after authentication, and Supabase handles the rest.

---

## Need Help?

1. Share your Vercel URL
2. Share the exact error message you see
3. Share a screenshot of your Google OAuth configuration

Then I can help debug further!
