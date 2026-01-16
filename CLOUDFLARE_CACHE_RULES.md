# Cloudflare Cache Rules Review

## ⚠️ Issue Found in Your Cache Rule

Looking at your screenshots, I see a problem with the cache rule you're creating:

### Current Rule (INCORRECT):
```
Hostname: storage.imtehan.com
URL Path contains: /storage/v1/object/public/
```

### Problems:
1. ❌ **Wrong domain**: You're using `www.imtehan.com` for R2, NOT `storage.imtehan.com`
2. ❌ **Wrong path**: `/storage/v1/object/public/` is a Supabase path, NOT R2
3. ❌ This rule won't cache your PDFs

---

## ✅ Correct Cache Rules for Your Setup

### Your Current Architecture:

**PDFs are accessed in 2 ways:**

1. **Through Next.js Proxy** (Most common):
   ```
   https://imtehan.com/api/pdf/proxy?url=...
   ```

2. **Direct R2 Access** (Fallback):
   ```
   https://www.imtehan.com/{subject}/{year}/{filename}.pdf
   ```

---

## 🔧 Recommended Cloudflare Cache Rules

### Rule 1: Cache R2 PDFs (Direct Access)

**Name:** Cache R2 PDFs

**If incoming requests match:**
- Field: `Hostname`
- Operator: `equals`
- Value: `www.imtehan.com`

**AND**
- Field: `File extension`
- Operator: `equals`
- Value: `pdf`

**Then:**
- Cache eligibility: `Eligible for cache`
- Edge TTL: `1 year` (31536000 seconds)
- Browser TTL: `1 year` (31536000 seconds)

---

### Rule 2: Cache API PDF Proxy

**Name:** Cache PDF Proxy API

**If incoming requests match:**
- Field: `Hostname`
- Operator: `equals`
- Value: `imtehan.com`

**AND**
- Field: `URI Path`
- Operator: `equals`
- Value: `/api/pdf/proxy`

**Then:**
- Cache eligibility: `Eligible for cache`
- Edge TTL: `1 year` (31536000 seconds)
- Browser TTL: `1 year` (31536000 seconds)

---

### Rule 3: Bypass Dynamic APIs (You Already Have This ✅)

**Name:** Bypass Dynamic APIs

Keep your existing rule that bypasses caching for dynamic API routes.

---

## 🗑️ Rules to DELETE

### Delete This Rule:
```
Hostname: storage.imtehan.com
URL Path: /storage/v1/object/public/
```

**Why?**
- `storage.imtehan.com` is disabled (see your .env.local line 11)
- You're not using Supabase storage anymore
- You're using R2 on `www.imtehan.com` instead

---

## 📋 Your Complete Cache Rules List (Recommended)

Based on your screenshots, here's what you should have:

| Order | Name | Domain | Path/Type | Status |
|-------|------|--------|-----------|--------|
| 1 | Cache R2 PDFs | www.imtehan.com | *.pdf | ✅ Keep |
| 2 | Cache PDF Proxy API | imtehan.com | /api/pdf/proxy | ✅ Add |
| 3 | Cache Static Assets | imtehan.com | images | ✅ Keep |
| 4 | Cache Audio | imtehan.com | audio | ✅ Keep |
| 5 | Cache Fonts | imtehan.com | fonts | ✅ Keep |
| 6 | Bypass Dynamic APIs | imtehan.com | /api/* (except pdf) | ✅ Keep |
| 7 | Cache Sitemaps | imtehan.com | sitemap | ✅ Keep |
| ❌ | OLD Supabase Rule | storage.imtehan.com | /storage/v1/... | ❌ Delete |

---

## 🧪 How to Test Cache Rules

### Test 1: Direct R2 Access
```bash
curl -I https://www.imtehan.com/geology/2022/geology_2022.pdf
```

**Look for:**
```
cf-cache-status: HIT  (or MISS on first request, HIT on second)
cache-control: public, max-age=31536000, immutable
```

---

### Test 2: Proxy Access
```bash
curl -I https://imtehan.com/api/pdf/proxy?url=https%3A%2F%2Fwww.imtehan.com%2Fgeology%2F2022%2Fgeology_2022.pdf
```

**Look for:**
```
cf-cache-status: HIT  (after first request)
cache-control: public, max-age=31536000, immutable
```

---

## 🎯 Why This Matters

### Without Proper Cache Rules:
- ❌ Every PDF request hits your origin (Vercel/Next.js)
- ❌ Higher bandwidth costs
- ❌ Slower loading for users
- ❌ More load on your application

### With Proper Cache Rules:
- ✅ PDFs cached at Cloudflare edge (super fast)
- ✅ 99% of requests served from cache
- ✅ Massive bandwidth savings
- ✅ Lightning fast loading globally
- ✅ Less load on your application

---

## 📊 Expected Performance

### Before Cache Rules:
```
User in Pakistan requests PDF:
imtehan.com → Vercel (US) → R2 → User
Time: 2-3 seconds
```

### After Cache Rules:
```
User in Pakistan requests PDF:
imtehan.com → Cloudflare Edge (Karachi) → User
Time: 50-100ms (20-30x faster!)
```

---

## 🔧 Step-by-Step: How to Fix

### Step 1: Delete Old Supabase Rule
1. Go to Cloudflare Dashboard
2. Select `imtehan.com`
3. Go to `Caching` → `Cache Rules`
4. Find rule for `storage.imtehan.com`
5. Click ⋮ (three dots) → Delete

### Step 2: Add R2 PDF Cache Rule
1. Click `Create rule`
2. Name: `Cache R2 PDFs`
3. **If incoming requests match:**
   - Hostname equals `www.imtehan.com`
   - AND File extension equals `pdf`
4. **Then:**
   - Cache eligibility: `Eligible for cache`
   - Edge TTL: Custom → `31536000` seconds
   - Browser TTL: Custom → `31536000` seconds
5. Click `Deploy`

### Step 3: Add PDF Proxy Cache Rule
1. Click `Create rule`
2. Name: `Cache PDF Proxy API`
3. **If incoming requests match:**
   - Hostname equals `imtehan.com`
   - AND URI Path equals `/api/pdf/proxy`
4. **Then:**
   - Cache eligibility: `Eligible for cache`
   - Edge TTL: Custom → `31536000` seconds
   - Browser TTL: Custom → `31536000` seconds
5. Click `Deploy`

### Step 4: Test
1. Open: https://imtehan.com/css/past-papers
2. Open any PDF
3. Check browser DevTools → Network tab
4. Look for `cf-cache-status: HIT` on second load

---

## ⚡ Cache Rule Priority

Cloudflare processes rules in order (top to bottom). Recommended order:

1. **Cache R2 PDFs** (highest priority)
2. **Cache PDF Proxy API**
3. **Bypass Dynamic APIs** (must be AFTER PDF proxy)
4. **Cache Static Assets**
5. **Cache Fonts**
6. **Cache Audio**
7. **Cache Sitemaps**

---

## 🎉 Summary

**What to change:**
1. ❌ Delete the `storage.imtehan.com` rule (wrong domain)
2. ✅ Add `www.imtehan.com/*.pdf` rule (R2 direct)
3. ✅ Add `imtehan.com/api/pdf/proxy` rule (proxy)

**Expected results:**
- 🚀 99% cache hit rate for PDFs
- ⚡ 20-30x faster loading globally
- 💰 Massive bandwidth savings
- 🌍 Better user experience worldwide

**Your application already has 1-year caching configured.** These Cloudflare rules will make it even better by caching at the edge!

Want me to help with anything else?
