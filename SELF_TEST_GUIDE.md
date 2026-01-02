# 🧪 Complete Self-Testing Guide - imtehan.com Optimization

**Test your setup yourself with these commands**

---

## 📋 **Quick Command Reference**

Copy and paste these commands into your terminal to test everything.

---

## ✅ **TEST 1: Static Assets (SVG) - Should Cache 1 Year**

### First Request (expect MISS):
```bash
curl -I https://imtehan.com/favicon.svg | grep cf-cache-status
```

### Second Request (expect HIT):
```bash
curl -I https://imtehan.com/favicon.svg | grep cf-cache-status
```

**Expected Output:**
```
First:  cf-cache-status: EXPIRED (or MISS)
Second: cf-cache-status: HIT
```

**What this means:**
- ✅ SVG files are being cached by Cloudflare
- ✅ First request warms cache, second hits cache

---

## ✅ **TEST 2: Sound Files (MP3) - Should Cache 1 Year**

### First Request:
```bash
curl -I https://imtehan.com/sounds/correct.mp3 | grep cf-cache-status
```

### Second Request:
```bash
curl -I https://imtehan.com/sounds/correct.mp3 | grep cf-cache-status
```

**Expected Output:**
```
First:  cf-cache-status: EXPIRED (or MISS)
Second: cf-cache-status: HIT
```

**What this means:**
- ✅ Audio files are cached for 1 year
- ✅ Subsequent plays are instant from cache

---

## ✅ **TEST 3: API Past Papers - Should Cache 5 Minutes**

### First Request:
```bash
curl -I https://imtehan.com/api/past-papers | grep cf-cache-status
```

### Wait 2 seconds, Second Request:
```bash
sleep 2 && curl -I https://imtehan.com/api/past-papers | grep cf-cache-status
```

**Expected Output:**
```
First:  cf-cache-status: MISS
Second: cf-cache-status: HIT
```

**What this means:**
- ✅ API responses are cached for 5 minutes
- ✅ Repeated requests within 5 min are fast

---

## ✅ **TEST 4: Dynamic API (Quiz) - Should BYPASS Cache**

### Request 1:
```bash
curl -I https://imtehan.com/api/usage | grep cf-cache-status
```

### Request 2:
```bash
curl -I https://imtehan.com/api/usage | grep cf-cache-status
```

**Expected Output:**
```
First:  cf-cache-status: DYNAMIC (or BYPASS)
Second: cf-cache-status: DYNAMIC (or BYPASS)
```

**What this means:**
- ✅ User data is never cached
- ✅ Always fresh data for personalized content
- ✅ Security is maintained

---

## ✅ **TEST 5: www Redirect - Should 301 to imtehan.com**

```bash
curl -I https://www.imtehan.com/favicon.svg | head -5
```

**Expected Output:**
```
HTTP/2 200
...
```

**What this means:**
- ✅ www domain redirects to imtehan.com
- ✅ User sees consistent domain
- ✅ Cache rules apply after redirect

---

## ✅ **TEST 6: Full Response Headers**

### See complete cache information:
```bash
curl -I https://imtehan.com/favicon.svg
```

**Look for these headers:**
```
cf-cache-status: HIT          ← Cache status
cf-ray: 9b77f107dbb0e20c-MRS  ← Cloudflare ray ID
cache-control: public, max-age=31536000  ← Cache duration
```

---

## ✅ **TEST 7: Get API Response (Check Data)**

### Get actual API response:
```bash
curl https://imtehan.com/api/past-papers | jq '.subjects | length'
```

**Expected Output:**
```
51
```

**What this means:**
- ✅ API returns correct data (51 subjects)
- ✅ Response is valid JSON
- ✅ Data integrity is good

---

## ✅ **TEST 8: Performance - Response Time**

### Measure request time:
```bash
time curl -I https://imtehan.com/favicon.svg > /dev/null
```

**Expected Output:**
```
real    0m0.050s    ← Should be <100ms for cached
user    0m0.010s
sys     0m0.020s
```

**What this means:**
- ✅ <100ms = cached from Cloudflare edge
- ⚠️ 100-300ms = from origin server
- ❌ >500ms = something is wrong

---

## ✅ **TEST 9: Check Redirect Chain**

### See full redirect flow:
```bash
curl -L -v https://www.imtehan.com/favicon.svg 2>&1 | grep -E "HTTP|location|cf-cache"
```

**Expected Output:**
```
HTTP/2 200     ← Ends with 200 OK
cf-cache-status: HIT  ← Eventually cached
```

---

## 📊 **COMPREHENSIVE TEST SCRIPT**

Save this as `test-imtehan.sh` and run:

```bash
#!/bin/bash

echo "=================================================="
echo "🧪 IMTEHAN.COM COMPLETE CACHE TEST"
echo "=================================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Test 1: SVG
echo -e "${BLUE}TEST 1: SVG Static Assets${NC}"
echo "First request (expect MISS/EXPIRED):"
curl -s -I https://imtehan.com/favicon.svg | grep cf-cache-status
sleep 1
echo "Second request (expect HIT):"
curl -s -I https://imtehan.com/favicon.svg | grep cf-cache-status
echo ""

# Test 2: MP3
echo -e "${BLUE}TEST 2: MP3 Sound Files${NC}"
echo "First request:"
curl -s -I https://imtehan.com/sounds/correct.mp3 | grep cf-cache-status
sleep 1
echo "Second request:"
curl -s -I https://imtehan.com/sounds/correct.mp3 | grep cf-cache-status
echo ""

# Test 3: API
echo -e "${BLUE}TEST 3: API Past Papers${NC}"
echo "First request:"
curl -s -I https://imtehan.com/api/past-papers | grep cf-cache-status
sleep 2
echo "Second request:"
curl -s -I https://imtehan.com/api/past-papers | grep cf-cache-status
echo ""

# Test 4: Dynamic API
echo -e "${BLUE}TEST 4: Dynamic API (should BYPASS)${NC}"
echo "Request 1:"
curl -s -I https://imtehan.com/api/usage | grep cf-cache-status
echo "Request 2:"
curl -s -I https://imtehan.com/api/usage | grep cf-cache-status
echo ""

# Test 5: www Redirect
echo -e "${BLUE}TEST 5: www Redirect${NC}"
curl -s -I https://www.imtehan.com/favicon.svg | head -1
echo ""

# Test 6: Performance
echo -e "${BLUE}TEST 6: Performance (should be <100ms for cached)${NC}"
time curl -I https://imtehan.com/favicon.svg > /dev/null 2>&1
echo ""

# Test 7: API Data
echo -e "${BLUE}TEST 7: API Data (should show 51 subjects)${NC}"
echo "Number of subjects:"
curl -s https://imtehan.com/api/past-papers | jq '.subjects | length'
echo ""

echo -e "${GREEN}=================================================="
echo "✅ TESTS COMPLETE"
echo "==================================================${NC}"
```

### How to use:
```bash
# Save the script
nano test-imtehan.sh

# Paste the script above, save (Ctrl+O, Enter, Ctrl+X)

# Make executable
chmod +x test-imtehan.sh

# Run it
./test-imtehan.sh
```

---

## 🎯 **Success Checklist**

After running tests, verify:

- [ ] SVG: MISS → HIT (caching works)
- [ ] MP3: MISS → HIT (sounds cached)
- [ ] API: MISS → HIT (API cached 5 min)
- [ ] Dynamic: BYPASS → BYPASS (never cached)
- [ ] www: Redirects to imtehan.com
- [ ] Performance: <100ms for cached requests
- [ ] API: Returns 51 subjects
- [ ] All status codes: 200 OK

---

## 🔍 **Troubleshooting**

### All Requests Show EXPIRED:
```bash
# Wait 5 minutes for cache to fully deploy
# Then test again
```

### All Show BYPASS:
```bash
# Cache rules might not be active
# Go to Cloudflare → Caching → Cache Rules
# Check all 3 rules are active (green)
```

### www Not Redirecting:
```bash
# Go to Vercel → Domains
# Verify www has 301 redirect to imtehan.com
```

### API Returns Error (403/401):
```bash
# This is normal - API requires auth
# The cf-cache-status header is what matters
```

---

## 📱 **Browser Test (Visual)**

1. Open: `https://imtehan.com`
2. Press `F12` (Open DevTools)
3. Go to **Network** tab
4. Reload page
5. Click on `favicon.svg`
6. Go to **Response Headers**
7. Look for: `cf-cache-status: HIT`

---

## 📊 **Expected Cache Status Values**

| Value | Meaning | Expected For |
|-------|---------|--------------|
| `HIT` | ✅ Cached! | Static assets, API (after 1st request) |
| `MISS` | ⏳ First request | Normal on first load |
| `EXPIRED` | ⏳ Cache expired | Before HIT happens |
| `BYPASS` | ✅ Never cached | Dynamic APIs (correct behavior) |
| `DYNAMIC` | ✅ Never cached | Dynamic content (correct) |

---

## 🚀 **Quick Test (30 seconds)**

Run these 3 commands:

```bash
# Test 1: Static cache
curl -I https://imtehan.com/favicon.svg | grep cf-cache-status

# Test 2: API cache
curl -I https://imtehan.com/api/past-papers | grep cf-cache-status

# Test 3: Dynamic bypass
curl -I https://imtehan.com/api/usage | grep cf-cache-status
```

**Expected Results:**
```
HIT or EXPIRED    ← Static
HIT or MISS       ← API
BYPASS or DYNAMIC ← Dynamic
```

---

## 📈 **Monitoring Over Time**

Run tests regularly to monitor:

```bash
# Morning test
./test-imtehan.sh

# Evening test
./test-imtehan.sh

# Check for consistency
```

---

## ✅ **Everything Looks Good If:**

- ✅ Static assets show HIT after 1st request
- ✅ API shows MISS first, HIT second
- ✅ Dynamic always shows BYPASS/DYNAMIC
- ✅ Performance <100ms for cached content
- ✅ www redirects to imtehan.com
- ✅ All responses return 200 OK (or expected status)

---

**You're set! Run these tests anytime to verify your caching is working perfectly.** 🎯
