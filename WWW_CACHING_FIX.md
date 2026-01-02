# 🔍 www vs imtehan.com - Cache Rules Clarification

## ⚠️ **The Issue You Found:**

Your cache rules say:
```
When: (http.host eq "imtehan.com" and ...)
```

This means rules **ONLY match** `imtehan.com` - NOT `www.imtehan.com`

---

## 🤔 **What Happens:**

### **Visitor goes to imtehan.com:**
```
imtehan.com → Cloudflare → Checks cache rules
              → http.host = "imtehan.com" → RULE MATCHES ✅
              → Cache rules apply
```

### **Visitor goes to www.imtehan.com:**
```
www.imtehan.com → Cloudflare → Checks cache rules
                → http.host = "www.imtehan.com" → RULE DOES NOT MATCH ❌
                → Cache rules DO NOT apply
                → Served from origin (slower)
```

---

## ❌ **Current Problem:**

Your cache rules don't cover `www.imtehan.com` at all!

This means:
- `imtehan.com` → **Cached** ✅
- `www.imtehan.com` → **NOT cached** ❌

---

## ✅ **Solution: Add www to Cache Rules**

You need to update your 3 cache rules to include BOTH domains.

### **RULE 1: Cache Static Assets (FIX)**

**Instead of:**
```
(http.host eq "imtehan.com" and http.request.uri.path matches "\\.(mp3|svg|png|jpg|jpeg|webp|ico|woff|woff2|ttf)$")
```

**Use this:**
```
((http.host eq "imtehan.com" or http.host eq "www.imtehan.com") and http.request.uri.path matches "\\.(mp3|svg|png|jpg|jpeg|webp|ico|woff|woff2|ttf)$")
```

The key change: `(http.host eq "imtehan.com" or http.host eq "www.imtehan.com")`

---

### **RULE 2: Cache API (FIX)**

**Instead of:**
```
(http.host eq "imtehan.com" and starts_with(http.request.uri.path, "/api/past-papers"))
```

**Use this:**
```
((http.host eq "imtehan.com" or http.host eq "www.imtehan.com") and starts_with(http.request.uri.path, "/api/past-papers"))
```

---

### **RULE 3: Bypass Dynamic APIs (FIX)**

**Instead of:**
```
(http.host eq "imtehan.com" and (starts_with(http.request.uri.path, "/api/quiz") or http.request.uri.path eq "/api/usage" or http.request.uri.path eq "/api/contact"))
```

**Use this:**
```
((http.host eq "imtehan.com" or http.host eq "www.imtehan.com") and (starts_with(http.request.uri.path, "/api/quiz") or http.request.uri.path eq "/api/usage" or http.request.uri.path eq "/api/contact"))
```

---

## 🔄 **How to Update Rules:**

1. Go to **Caching → Cache Rules**
2. Click **Edit** on each rule (pencil icon)
3. Click **Edit expression**
4. Change the first part from:
   ```
   http.host eq "imtehan.com"
   ```
   To:
   ```
   (http.host eq "imtehan.com" or http.host eq "www.imtehan.com")
   ```
5. Save each rule

---

## 📊 **Result After Fix:**

| URL | Cache Status |
|-----|--------------|
| `imtehan.com/favicon.svg` | ✅ Cached (1 year) |
| `www.imtehan.com/favicon.svg` | ✅ Cached (1 year) |
| `imtehan.com/api/past-papers` | ✅ Cached (5 min) |
| `www.imtehan.com/api/past-papers` | ✅ Cached (5 min) |
| `imtehan.com/api/quiz/submit` | ✅ Bypassed |
| `www.imtehan.com/api/quiz/submit` | ✅ Bypassed |

---

## ✅ **Best Practice Going Forward:**

**Always include both domains in Cloudflare rules:**
```
(http.host eq "imtehan.com" or http.host eq "www.imtehan.com")
```

This ensures rules work for:
- Users visiting `imtehan.com`
- Users visiting `www.imtehan.com`
- Both get same caching benefits

---

## 🎯 **Action Required:**

1. Edit all 3 cache rules
2. Add `or http.host eq "www.imtehan.com"` to each
3. Save each rule
4. Done!

**Takes 5 minutes to fix**

---

## 🧪 **Test After Fix:**

```bash
# Test both domains work with cache
curl -I https://imtehan.com/favicon.svg
curl -I https://www.imtehan.com/favicon.svg

# Both should show cf-cache-status: HIT (after 2nd request)
```

---

## ❓ **Any Problems It Creates?**

**No! None at all.**

In fact, NOT including www is the problem (which you found).

Including both is the correct solution.

---

**Go fix the 3 rules now! Takes 5 minutes. Let me know when done!**
