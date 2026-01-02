# Step-by-Step Cloudflare Setup Guide
**Visual walkthrough for setting up cache rules**

---

## 🎯 Quick Reference Card

**Copy this to your second monitor while setting up:**

```
RULE 1: Cache PDFs
  Match: qsrkkvrrxorbgvbgekew.supabase.co + /storage/v1/object/public/css-past-papers
  Cache: 30 days

RULE 2: Cache Solved Papers
  Match: qsrkkvrrxorbgvbgekew.supabase.co + /storage/v1/object/public/css-solved-papers
  Cache: 30 days

RULE 3: Bypass Database
  Match: qsrkkvrrxorbgvbgekew.supabase.co + /rest/v1/
  Action: BYPASS

RULE 4: Bypass Auth
  Match: qsrkkvrrxorbgvbgekew.supabase.co + /auth/v1/
  Action: BYPASS

RULE 5: Cache Static Assets
  Match: prepz.vercel.app + .(mp3|svg|png|jpg|etc.)
  Cache: 1 year

RULE 6: Cache Metadata API
  Match: prepz.vercel.app + /api/past-papers
  Cache: 5 minutes

RULE 7: Bypass Dynamic APIs
  Match: prepz.vercel.app + /api/quiz/* + /api/usage + etc.
  Action: BYPASS

RULE 8: Cache robots.txt
  Match: prepz.vercel.app + /robots.txt
  Cache: 1 day
```

---

## 📋 Step-by-Step Instructions

### **RULE 1: Cache Supabase PDFs (css-past-papers)**

1. **Go to:** Cloudflare Dashboard → Your Domain → **Caching** → **Cache Rules**

2. **Click:** "+ Create Rule"

3. **Rule name:** `Cache Supabase PDFs`

4. **When incoming requests match:**
   - Click "Edit expression"
   - Paste this:
   ```
   (http.host eq "qsrkkvrrxorbgvbgekew.supabase.co" and starts_with(http.request.uri.path, "/storage/v1/object/public/css-past-papers"))
   ```

5. **Then:**
   - **Cache eligibility:** Select "Eligible for cache"
   - **Edge Cache TTL:** Select "Override origin" → Enter `2592000` (30 days)
   - **Browser Cache TTL:** Select "Override origin" → Enter `2592000` (30 days)

6. **Click:** "Deploy"

---

### **RULE 2: Cache Solved Papers PDFs**

1. **Click:** "+ Create Rule"

2. **Rule name:** `Cache Solved Papers PDFs`

3. **When incoming requests match:**
   - Click "Edit expression"
   - Paste:
   ```
   (http.host eq "qsrkkvrrxorbgvbgekew.supabase.co" and starts_with(http.request.uri.path, "/storage/v1/object/public/css-solved-papers"))
   ```

4. **Then:**
   - **Cache eligibility:** "Eligible for cache"
   - **Edge Cache TTL:** `2592000`
   - **Browser Cache TTL:** `2592000`

5. **Click:** "Deploy"

---

### **RULE 3: Bypass Supabase Database (CRITICAL)**

1. **Click:** "+ Create Rule"

2. **Rule name:** `Bypass Supabase Database`

3. **When incoming requests match:**
   - Click "Edit expression"
   - Paste:
   ```
   (http.host eq "qsrkkvrrxorbgvbgekew.supabase.co" and starts_with(http.request.uri.path, "/rest/v1/"))
   ```

4. **Then:**
   - **Cache eligibility:** Select "Bypass cache"

5. **Click:** "Deploy"

---

### **RULE 4: Bypass Supabase Auth (CRITICAL)**

1. **Click:** "+ Create Rule"

2. **Rule name:** `Bypass Supabase Auth`

3. **When incoming requests match:**
   - Click "Edit expression"
   - Paste:
   ```
   (http.host eq "qsrkkvrrxorbgvbgekew.supabase.co" and starts_with(http.request.uri.path, "/auth/v1/"))
   ```

4. **Then:**
   - **Cache eligibility:** "Bypass cache"

5. **Click:** "Deploy"

---

### **RULE 5: Cache Static Assets (Sounds, Icons)**

1. **Click:** "+ Create Rule"

2. **Rule name:** `Cache Static Assets`

3. **When incoming requests match:**
   - Click "Edit expression"
   - Paste:
   ```
   (http.host eq "prepz.vercel.app" and http.request.uri.path matches "\\.(mp3|svg|png|jpg|jpeg|webp|ico|woff|woff2|ttf|eot)$")
   ```

4. **Then:**
   - **Cache eligibility:** "Eligible for cache"
   - **Edge Cache TTL:** `31536000` (1 year)
   - **Browser Cache TTL:** `31536000` (1 year)

5. **Click:** "Deploy"

---

### **RULE 6: Cache Past Papers Metadata API**

1. **Click:** "+ Create Rule"

2. **Rule name:** `Cache Past Papers Metadata`

3. **When incoming requests match:**
   - Click "Edit expression"
   - Paste:
   ```
   (http.host eq "prepz.vercel.app" and starts_with(http.request.uri.path, "/api/past-papers"))
   ```

4. **Then:**
   - **Cache eligibility:** "Eligible for cache"
   - **Edge Cache TTL:** `300` (5 minutes)
   - **Browser Cache TTL:** `300` (5 minutes)

5. **Click:** "Deploy"

---

### **RULE 7: Bypass Dynamic APIs (CRITICAL)**

1. **Click:** "+ Create Rule"

2. **Rule name:** `Bypass Dynamic APIs`

3. **When incoming requests match:**
   - Click "Edit expression"
   - Paste:
   ```
   (http.host eq "prepz.vercel.app" and (http.request.uri.path eq "/api/quiz/submit" or starts_with(http.request.uri.path, "/api/quiz/") or http.request.uri.path eq "/api/usage" or http.request.uri.path eq "/api/contact" or http.request.uri.path eq "/api/newsletter" or starts_with(http.request.uri.path, "/api/solved-papers")))
   ```

4. **Then:**
   - **Cache eligibility:** "Bypass cache"

5. **Click:** "Deploy"

---

### **RULE 8: Cache robots.txt**

1. **Click:** "+ Create Rule"

2. **Rule name:** `Cache robots.txt`

3. **When incoming requests match:**
   - Click "Edit expression"
   - Paste:
   ```
   (http.host eq "prepz.vercel.app" and http.request.uri.path eq "/robots.txt")
   ```

4. **Then:**
   - **Cache eligibility:** "Eligible for cache"
   - **Edge Cache TTL:** `86400` (1 day)
   - **Browser Cache TTL:** `86400` (1 day)

5. **Click:** "Deploy"

---

## ✅ Verification Checklist

After creating all rules, verify:

- [ ] **8 cache rules created** in Cloudflare Dashboard
- [ ] All rules show **"Active"** status (green toggle)
- [ ] Rules are in correct **priority order** (1-8)

---

## 🧪 Testing Your Setup

### **Test 1: PDF Caching (Should Cache)**

```bash
# First request (cache MISS)
curl -I https://qsrkkvrrxorbgvbgekew.supabase.co/storage/v1/object/public/css-past-papers/economics/2024/economics-2024.pdf

# Look for: cf-cache-status: MISS

# Second request (cache HIT)
curl -I https://qsrkkvrrxorbgvbgekew.supabase.co/storage/v1/object/public/css-past-papers/economics/2024/economics-2024.pdf

# Look for: cf-cache-status: HIT ✅
```

### **Test 2: Database API (Should Bypass)**

```bash
curl -I https://qsrkkvrrxorbgvbgekew.supabase.co/rest/v1/css_mcqs

# Look for: cf-cache-status: BYPASS ✅
```

### **Test 3: Auth API (Should Bypass)**

```bash
curl -I https://qsrkkvrrxorbgvbgekew.supabase.co/auth/v1/signup

# Look for: cf-cache-status: BYPASS ✅
```

### **Test 4: Static Assets (Should Cache)**

```bash
# First request
curl -I https://prepz.vercel.app/sounds/correct.mp3

# Second request
curl -I https://prepz.vercel.app/sounds/correct.mp3

# Look for: cf-cache-status: HIT ✅
```

### **Test 5: Metadata API (Should Cache for 5 min)**

```bash
# First request
curl -I https://prepz.vercel.app/api/past-papers

# Second request within 5 minutes
curl -I https://prepz.vercel.app/api/past-papers

# Look for: cf-cache-status: HIT ✅
```

---

## 🎨 Visual Rule Priority

```
Priority 1: Cache PDFs                    [CACHE: 30 days]
         ↓
Priority 2: Cache Solved Papers           [CACHE: 30 days]
         ↓
Priority 3: Bypass Database               [BYPASS] ⚠️
         ↓
Priority 4: Bypass Auth                   [BYPASS] ⚠️
         ↓
Priority 5: Cache Static Assets           [CACHE: 1 year]
         ↓
Priority 6: Cache Metadata API            [CACHE: 5 min]
         ↓
Priority 7: Bypass Dynamic APIs           [BYPASS] ⚠️
         ↓
Priority 8: Cache robots.txt              [CACHE: 1 day]
```

---

## 📊 Expected Results After Setup

**Immediate (within 1 hour):**
- PDF cache hit ratio: 0% → 60%
- Static asset cache hit ratio: 0% → 80%

**After 24 hours:**
- PDF cache hit ratio: 60% → 85%
- Bandwidth saved: ~50%
- Faster page loads

**After 1 week:**
- PDF cache hit ratio: 85% → 95%
- Bandwidth saved: ~70%
- Lower Supabase costs

---

## ⚠️ Common Mistakes to Avoid

1. ❌ **Don't** cache `/rest/v1/` paths (database)
2. ❌ **Don't** cache `/auth/v1/` paths (authentication)
3. ❌ **Don't** cache `/api/quiz/*` (dynamic content)
4. ❌ **Don't** set cache TTL too low (defeats purpose)
5. ❌ **Don't** forget to click "Deploy" on each rule
6. ✅ **Do** test each rule after creating
7. ✅ **Do** check cache status headers
8. ✅ **Do** monitor analytics after setup

---

## 🆘 Troubleshooting

### **Problem: Rules not showing up**
- **Solution:** Wait 5 minutes for Cloudflare to propagate rules globally

### **Problem: PDFs still slow**
- **Check:** Is Cloudflare proxied (orange cloud) for your domain?
- **Check:** Are you using the correct Supabase hostname?
- **Check:** Is the bucket public in Supabase?

### **Problem: Users seeing stale MCQs**
- **Check:** Is Rule 3 (Bypass Database) active?
- **Check:** Is the bypass rule higher priority than cache rules?
- **Fix:** Clear Cloudflare cache manually

### **Problem: Cache hit ratio low**
- **Wait:** Cache builds up over 24-48 hours
- **Check:** Are users visiting the same PDFs multiple times?
- **Monitor:** Cloudflare Analytics → Cache Analytics

---

## 📞 Support

If you need help:
1. Check Cloudflare Community Forums
2. Review Cloudflare Cache Rules documentation
3. Contact Cloudflare Support (if on paid plan)

---

## 🎉 You're Done!

**Next Steps:**
1. Monitor cache hit ratio in Cloudflare Analytics
2. Check page load speed improvements
3. Monitor Supabase bandwidth usage (should decrease)
4. Celebrate faster load times! 🎊

---

**Total Setup Time:** 15-20 minutes
**Difficulty:** Easy (copy-paste configuration)
**Impact:** High (10x performance improvement)
