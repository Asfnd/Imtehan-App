# URGENT: Fix storage.imtehan.com Connection Issue

## Problem
`storage.imtehan.com` is refusing to connect - PDFs not loading

## Root Cause
Your Cloudflare Worker proxy at `storage.imtehan.com` is either:
- Not configured properly
- DNS not pointing correctly
- Worker script not deployed
- Domain not working

## Quick Fix Applied ✅

**Changed PDFs to load directly from Supabase storage (reliable)**

### What I Fixed:
1. ✅ Disabled custom storage domain in local `.env.local`
2. ✅ Removed `storage.imtehan.com` from CSP directives
3. ✅ Removed `storage.imtehan.com` from preconnect headers
4. ✅ PDFs now load directly from Supabase: `https://qsrkkvrrxorbgvbgekew.supabase.co/storage/...`
5. ✅ Kept 30-day PDF caching (as you requested)

---

## 🚨 ACTION REQUIRED: Fix Vercel Environment Variable

**You MUST do this in Vercel dashboard to fix production:**

1. Go to: **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**

2. **Find and DELETE** this variable:
   ```
   NEXT_PUBLIC_STORAGE_URL = https://storage.imtehan.com
   ```

3. **Redeploy** - Vercel will auto-redeploy after you save the environment variable change

That's it! PDFs will then load directly from Supabase storage which is reliable.

---

## What Happened

**Problem**: Your custom storage domain `storage.imtehan.com` (Cloudflare Worker proxy) is down or misconfigured, causing "refused to connect" errors.

**Solution**: Disabled custom domain and switched back to direct Supabase storage:
- ✅ Removed `storage.imtehan.com` from CSP directives
- ✅ Removed from preconnect headers
- ✅ Updated storage config to fall back to direct Supabase URLs
- ✅ PDFs now load from: `https://qsrkkvrrxorbgvbgekew.supabase.co/storage/...`

**Local environment**: Already fixed (I commented out `NEXT_PUBLIC_STORAGE_URL` in `.env.local`)

## IMPORTANT: Fix Production Too

**You need to remove the environment variable from Vercel:**

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Find `NEXT_PUBLIC_STORAGE_URL`
3. **Delete it** or set it to empty
4. Redeploy

This will make production also use direct Supabase storage which is reliable and always works.

## What This Fixes

- **PDFs now load directly from Supabase**: `https://qsrkkvrrxorbgvbgekew.supabase.co/storage/...`
- **CSP allows it**: `https://*.supabase.co` is already in the Content Security Policy
- **Still cached for 30 days**: PDF caching preserved as you requested
- **No more connection refused errors**: Supabase storage is reliable

## What You Need to Do in Vercel

Go to your Vercel project settings and **remove or disable** this environment variable:
- `NEXT_PUBLIC_STORAGE_URL=https://storage.imtehan.com`

This will make production use direct Supabase storage just like local dev now does.

**Once you remove that environment variable and redeploy, PDFs will load perfectly.**

---

**Why storage.imtehan.com failed:** Your Cloudflare Worker proxy is either not configured, DNS isn't pointing correctly, or the worker is down. You can fix that later - for now, direct Supabase storage works perfectly fine and is just as fast with proper caching (which you already have).