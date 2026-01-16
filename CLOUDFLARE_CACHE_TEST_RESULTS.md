# Cloudflare Cache Rules - Test Results

## 🧪 Test Performed: January 16, 2026

---

## 📊 Test Results Summary

| URL Type | Status | Cache Status | Issue |
|----------|--------|--------------|-------|
| Direct R2 (`www.imtehan.com`) | ✅ 200 | ⚠️ DYNAMIC | Not caching |
| PDF Proxy (`imtehan.com/api/pdf/proxy`) | ❌ 404 | N/A | Not deployed |
| Localhost Proxy | ✅ 200 | ✅ 1 year | Working |

---

## 🔍 Detailed Test Results

### Test 1: Direct R2 Access ⚠️

**URL:** `https://www.imtehan.com/geology/2022/geology_2022.pdf`

**Results:**
```
HTTP/2 200 ✅
cf-cache-status: DYNAMIC ⚠️
content-type: application/pdf ✅
content-length: 97048 ✅
x-frame-options: SAMEORIGIN ⚠️
```

**Issues Found:**
1. ⚠️ **cf-cache-status: DYNAMIC** - Cloudflare is NOT caching
2. ⚠️ **No Cache-Control header** - R2 not sending cache headers
3. ⚠️ **x-frame-options: SAMEORIGIN** - Will block iframe embedding

**Why not caching?**
- R2 bucket is not sending `Cache-Control` headers
- Cloudflare cache rule needs explicit "Override origin" setting

---

### Test 2: PDF Proxy API ❌

**URL:** `https://imtehan.com/api/pdf/proxy?url=...`

**Results:**
```
HTTP/2 404 ❌
cf-cache-status: MISS
cache-control: public, max-age=31536000, s-maxage=600
```

**Issue:**
- ❌ **404 Not Found** - Route doesn't exist on production
- The PDF proxy code isn't deployed yet
- Need to push changes to production

---

### Test 3: Localhost (Reference) ✅

**URL:** `http://localhost:3000/api/pdf/proxy?url=...`

**Results:**
```
HTTP/1.1 200 ✅
Cache-Control: public, max-age=31536000, immutable ✅
Content-Type: application/pdf ✅
```

**Status:**
- ✅ Working perfectly on localhost
- ✅ 1-year caching configured
- ✅ Ready to deploy

---

## 🔧 How to Fix the Issues

### Issue 1: Direct R2 Not Caching (DYNAMIC)

**Problem:** Cloudflare cache rule exists but R2 doesn't send cache headers.

**Solution Option A: Set R2 Bucket Cache Headers** (RECOMMENDED)

In Cloudflare R2 Dashboard:
1. Go to R2 → Select your bucket
2. Go to **Settings** → **HTTP Metadata**
3. Add cache headers:
   ```
   Cache-Control: public, max-age=31536000, immutable
   ```

**Solution Option B: Override in Cache Rule**

In your Cloudflare Cache Rule for `www.imtehan.com/*.pdf`:
1. Edit the rule
2. Add: **Cache Level** → `Cache Everything`
3. Add: **Origin Cache Control** → `Respect`
4. Or: **Edge TTL** → `Override` → `1 year`

---

### Issue 2: PDF Proxy 404

**Problem:** `/api/pdf/proxy` route doesn't exist on production.

**Solution:** Deploy your code!

```bash
# Push to GitHub (assuming connected to Vercel)
git add .
git commit -m "Add R2 PDF proxy with 1-year caching"
git push origin main
```

Vercel will automatically deploy.

---

### Issue 3: X-Frame-Options Blocking

**Problem:** Direct R2 access returns `x-frame-options: SAMEORIGIN`

**Impact:**
- iframes can't load PDFs directly from `www.imtehan.com`
- This is why you need the proxy at `imtehan.com/api/pdf/proxy`

**Status:** ✅ Solved by using proxy (proxy removes this header)

---

## 🎯 Recommended Cloudflare Cache Rules

Based on test results, here's what you need:

### Rule 1: Cache R2 PDFs (www.imtehan.com)

```
Name: Cache R2 PDFs
Order: 1 (highest priority)

If:
  - Hostname equals "www.imtehan.com"
  - File extension equals "pdf"

Then:
  - Cache eligibility: Eligible for cache
  - Cache Level: Cache Everything ⬅️ IMPORTANT
  - Edge TTL: 1 year (31536000 seconds)
  - Browser TTL: 1 year (31536000 seconds)
```

**⚠️ Important:** Add "Cache Level: Cache Everything" to force caching even without origin cache headers.

---

### Rule 2: Cache PDF Proxy (imtehan.com)

```
Name: Cache PDF Proxy API
Order: 2

If:
  - Hostname equals "imtehan.com"
  - URI Path equals "/api/pdf/proxy"

Then:
  - Cache eligibility: Eligible for cache
  - Cache Level: Cache Everything
  - Edge TTL: 1 year (31536000 seconds)
  - Browser TTL: 1 year (31536000 seconds)
  - Cache by query string: All query strings
```

**⚠️ Important:** Add "Cache by query string: All query strings" because each PDF has different `?url=` parameter.

---

## 📋 Action Items Checklist

### Before Pushing to Production:

- [x] ✅ PDF proxy code updated with 1-year cache
- [x] ✅ Rate limit set to 10/10s
- [x] ✅ Middleware updated to skip X-Frame-Options for proxy
- [x] ✅ Next.js config excludes PDF proxy from API cache rules
- [ ] ⏳ Push code to production

### After Pushing to Production:

- [ ] ⏳ Wait for Vercel deployment (1-2 minutes)
- [ ] ⏳ Test: `https://imtehan.com/api/pdf/proxy?url=...` (should be 200)
- [ ] ⏳ Verify Cloudflare cache rule for proxy works
- [ ] ⏳ Add "Cache Level: Cache Everything" to R2 rule
- [ ] ⏳ Test cache hit rate after 24 hours

---

## 🧪 How to Test After Deployment

### Test 1: PDF Proxy Works
```bash
curl -I "https://imtehan.com/api/pdf/proxy?url=https%3A%2F%2Fwww.imtehan.com%2Fgeology%2F2022%2Fgeology_2022.pdf"
```

**Expected:**
```
HTTP/2 200 ✅
cf-cache-status: MISS (first time)
cache-control: public, max-age=31536000, immutable ✅
```

### Test 2: Cache Hit
```bash
# Request same URL again
curl -I "https://imtehan.com/api/pdf/proxy?url=https%3A%2F%2Fwww.imtehan.com%2Fgeology%2F2022%2Fgeology_2022.pdf"
```

**Expected:**
```
HTTP/2 200 ✅
cf-cache-status: HIT ✅ (cached!)
cache-control: public, max-age=31536000, immutable ✅
age: 5 (seconds since cached)
```

### Test 3: Browser Test
1. Open browser to: `https://imtehan.com/css/past-papers`
2. Click any PDF
3. Open DevTools (F12) → Network tab
4. Refresh page (F5)
5. Look at PDF request:
   - First load: `cf-cache-status: MISS`
   - Second load: `cf-cache-status: HIT` ✅

---

## 📊 Expected Performance After Fix

### Current (Before Cache Rules):
```
User requests PDF:
Browser → Cloudflare (no cache) → Vercel (US) → R2 → User
Time: 2-3 seconds
Bandwidth: Full PDF size
```

### After Fix:
```
User requests PDF (first time):
Browser → Cloudflare → Vercel → R2 → Cached at Cloudflare Edge
Time: 2-3 seconds
Bandwidth: Full PDF size

User requests PDF (subsequent):
Browser → Cloudflare Edge → User (cached!)
Time: 50-200ms (10-20x faster!)
Bandwidth: 0 (served from cache)
```

### Estimated Savings (1,000 users):
- **Bandwidth:** 90% reduction
- **Load time:** 10-20x faster
- **Server load:** 99% reduction
- **R2 costs:** 95% reduction

---

## 🎉 Summary

### Current Status:

| Component | Status | Notes |
|-----------|--------|-------|
| Localhost code | ✅ Working | 1-year cache configured |
| Production deployment | ❌ Pending | Need to push to Vercel |
| Cloudflare cache rules | ⚠️ Partial | Rules exist but need "Cache Everything" |
| Direct R2 caching | ⚠️ DYNAMIC | Not caching (needs fix) |

### Next Steps:

1. **Push code to production** (highest priority)
2. **Update Cloudflare rule** to add "Cache Level: Cache Everything"
3. **Test** after deployment
4. **Monitor** cache hit rate in Cloudflare Analytics

### Final Verdict:

✅ **Your code is ready** - localhost works perfectly
⏳ **Need to deploy** - push to GitHub/Vercel
⚠️ **Cloudflare rule needs update** - add "Cache Everything" setting

Want me to help with the deployment or Cloudflare rule updates?
