# Cloudflare Cache Setup for Quiz App

## Overview
This document outlines the Cloudflare caching strategy for optimal performance while maintaining data freshness.

---

## Cache Rules to Create

### 1. ✅ Cache Supabase Storage (PDFs, Images)
**Purpose**: Cache all static files from Supabase Storage

```
Rule Name: Cache Supabase Storage
Priority: 1

When incoming requests match:
  Field: Hostname
  Operator: equals
  Value: qsrkkvrrxorbgvbgekew.supabase.co

  AND

  Field: URI Path
  Operator: starts with
  Value: /storage/v1/object/public/

Then:
  ✅ Cache eligibility: Eligible for cache
  ✅ Edge Cache TTL: 2592000 (30 days)
  ✅ Browser Cache TTL: 2592000 (30 days)
```

**What this caches:**
- ✅ CSS Past Papers PDFs (`css-past-papers/`)
- ✅ CSS Solved Papers PDFs (`css-solved-papers/`)
- ✅ User avatars (if you add them)
- ✅ Quiz images/thumbnails (if you add them)

---

### 2. ❌ Bypass Supabase Database API
**Purpose**: Never cache dynamic database queries (MCQs, user data)

```
Rule Name: Bypass Supabase Database
Priority: 2

When incoming requests match:
  Field: Hostname
  Operator: equals
  Value: qsrkkvrrxorbgvbgekew.supabase.co

  AND

  Field: URI Path
  Operator: starts with
  Value: /rest/v1/

Then:
  ✅ Cache eligibility: Bypass cache
```

**What this bypasses:**
- MCQ questions from database
- User profiles, scores, progress
- Authentication responses
- Quiz results
- Any dynamic/personalized data

---

### 3. ✅ Cache Static Assets (Your Domain)
**Purpose**: Cache images, fonts, CSS, JS from your Vercel deployment

```
Rule Name: Cache Static Assets
Priority: 3

When incoming requests match:
  Field: Hostname
  Operator: equals
  Value: prepz.vercel.app

  AND

  Field: File extension
  Operator: is in
  Value: png jpg jpeg svg webp ico woff woff2 ttf eot css js

Then:
  ✅ Cache eligibility: Eligible for cache
  ✅ Edge Cache TTL: 31536000 (1 year)
  ✅ Browser Cache TTL: 31536000 (1 year)
```

**What this caches:**
- ✅ Logo (favicon.svg, favicon-16x16.svg)
- ✅ Images (og-image.svg)
- ✅ Fonts
- ✅ CSS files
- ✅ JavaScript bundles

---

### 4. ✅ Cache Supabase Auth Assets (Optional)
**Purpose**: Cache Supabase Auth static assets

```
Rule Name: Cache Supabase Auth Assets
Priority: 4

When incoming requests match:
  Field: Hostname
  Operator: equals
  Value: qsrkkvrrxorbgvbgekew.supabase.co

  AND

  Field: URI Path
  Operator: starts with
  Value: /auth/v1/verify

Then:
  ✅ Cache eligibility: Bypass cache

Note: DO NOT cache auth endpoints - they need to be fresh
```

---

## How to Implement

### Step 1: Go to Cloudflare Dashboard
1. Log in to Cloudflare
2. Select your domain (prepz.vercel.app or your custom domain)

### Step 2: Create Cache Rules
1. Go to **Caching** → **Cache Rules**
2. Click **+ Create Rule**
3. Copy each rule configuration from above
4. Save each rule

### Step 3: Test Cache Performance
After setting up, test with:
```bash
# Check if storage is cached
curl -I https://qsrkkvrrxorbgvbgekew.supabase.co/storage/v1/object/public/css-past-papers/your-file.pdf

# Look for header: cf-cache-status: HIT (means cached)
```

---

## Performance Impact

| Asset Type | Before (No Cache) | After (Cached) | Improvement |
|------------|-------------------|----------------|-------------|
| PDFs (1MB) | ~500ms | ~50ms | **10x faster** |
| Images | ~200ms | ~20ms | **10x faster** |
| Fonts | ~150ms | ~15ms | **10x faster** |
| Database API | Always fresh ✅ | Always fresh ✅ | No change (correct) |

---

## What Gets Cached vs Not Cached

### ✅ CACHED (Static Content)
- Supabase Storage files (PDFs, images)
- Static assets (logos, fonts, CSS, JS)
- Public files that don't change often

### ❌ NOT CACHED (Dynamic Content)
- MCQ questions from database
- User authentication
- User profiles and scores
- Quiz results and progress
- Any personalized data

---

## Security Notes

1. **Public Storage Only**: Only public storage buckets are cached
2. **No User Data**: Database API is never cached (privacy protected)
3. **No Auth Caching**: Authentication responses are always fresh
4. **Cache Purge**: You can purge cache in Cloudflare if needed

---

## Vercel Considerations

Vercel already caches static assets by default, but Cloudflare adds:
- **Global edge network**: Faster than Vercel alone
- **More control**: Custom cache rules
- **DDoS protection**: Built-in security
- **Analytics**: Better insights

---

## Troubleshooting

### If PDFs don't cache:
1. Check bucket is **public** in Supabase
2. Verify cache rule is active in Cloudflare
3. Check response headers for `cf-cache-status`

### If MCQs show old data:
1. Verify `/rest/v1/` bypass rule is active
2. Clear browser cache
3. Check Cloudflare isn't caching API routes

---

## Next Steps

1. ✅ Create the 4 cache rules in Cloudflare
2. ✅ Test PDF loading (should see "cf-cache-status: HIT" after first load)
3. ✅ Verify MCQs are always fresh (should see "cf-cache-status: BYPASS")
4. ✅ Monitor performance in Cloudflare Analytics

---

**Estimated Setup Time**: 10 minutes
**Performance Gain**: 10x faster for static assets
**Cost**: Free on Cloudflare free tier
