# 🧪 Real-Time Cache Testing - Terminal Guide

## 🎯 **Test Plan:**

1. **Test Static Assets** (should cache)
2. **Test API Endpoints** (should cache 5 min)
3. **Test Dynamic APIs** (should bypass)
4. **Test Redirect** (www → imtehan.com)
5. **Monitor in Real-Time**

---

## 🚀 **Run These Tests:**

### **TEST 1: Static Assets (SVG)**

First request (should be MISS):
```bash
curl -I https://imtehan.com/favicon.svg | grep cf-cache-status
```

Wait 2 seconds, then second request (should be HIT):
```bash
curl -I https://www.imtehan.com/favicon.svg | grep cf-cache-status
```

**Expected:**
```
First: cf-cache-status: MISS
Second: cf-cache-status: HIT
```

---

### **TEST 2: Sounds (MP3)**

```bash
curl -I https://imtehan.com/sounds/correct.mp3 | grep cf-cache-status
curl -I https://imtehan.com/sounds/correct.mp3 | grep cf-cache-status
```

**Expected:**
```
First: MISS
Second: HIT
```

---

### **TEST 3: API Past Papers (should cache 5 min)**

```bash
curl -I https://imtehan.com/api/past-papers | grep cf-cache-status
curl -I https://imtehan.com/api/past-papers | grep cf-cache-status
```

**Expected:**
```
First: MISS
Second: HIT
```

---

### **TEST 4: Dynamic API (should BYPASS - never cache)**

```bash
curl -I https://imtehan.com/api/usage | grep cf-cache-status
curl -I https://imtehan.com/api/usage | grep cf-cache-status
```

**Expected:**
```
Both: BYPASS
```

---

### **TEST 5: Redirect Test (www → imtehan.com)**

```bash
curl -I https://www.imtehan.com/favicon.svg | head -1
```

**Expected:**
```
HTTP/2 301
location: https://imtehan.com/favicon.svg
```

---

### **TEST 6: Full Response Headers (Detailed)**

```bash
curl -I https://imtehan.com/favicon.svg
```

**Look for these headers:**
- `cf-cache-status: HIT` or `MISS` ✅
- `cf-ray: xxx` (Cloudflare ray ID) ✅
- `cache-control: ...` (cache duration) ✅

---

## 📊 **Complete Automated Test Script**

Save this as `test-cache.sh` and run:

```bash
#!/bin/bash

echo "=========================================="
echo "🧪 CLOUDFLARE CACHE TESTING - imtehan.com"
echo "=========================================="

echo -e "\n✓ TEST 1: Static Asset (SVG) - First Request (MISS expected)"
curl -s -I https://imtehan.com/favicon.svg | grep "cf-cache-status"

echo -e "\n✓ TEST 1: Static Asset (SVG) - Second Request (HIT expected)"
sleep 1
curl -s -I https://imtehan.com/favicon.svg | grep "cf-cache-status"

echo -e "\n✓ TEST 2: Sound File (MP3) - First Request (MISS expected)"
curl -s -I https://imtehan.com/sounds/correct.mp3 | grep "cf-cache-status"

echo -e "\n✓ TEST 2: Sound File (MP3) - Second Request (HIT expected)"
sleep 1
curl -s -I https://imtehan.com/sounds/correct.mp3 | grep "cf-cache-status"

echo -e "\n✓ TEST 3: API Past Papers - First Request (MISS expected)"
curl -s -I https://imtehan.com/api/past-papers | grep "cf-cache-status"

echo -e "\n✓ TEST 3: API Past Papers - Second Request (HIT expected)"
sleep 1
curl -s -I https://imtehan.com/api/past-papers | grep "cf-cache-status"

echo -e "\n✓ TEST 4: Dynamic API (Quiz) - First Request (BYPASS expected)"
curl -s -I https://imtehan.com/api/usage | grep "cf-cache-status"

echo -e "\n✓ TEST 4: Dynamic API (Quiz) - Second Request (BYPASS expected)"
sleep 1
curl -s -I https://imtehan.com/api/usage | grep "cf-cache-status"

echo -e "\n✓ TEST 5: www Redirect"
echo "Expected: 301 redirect from www.imtehan.com to imtehan.com"
curl -s -I https://www.imtehan.com/favicon.svg | head -1

echo -e "\n=========================================="
echo "✅ CACHE TESTING COMPLETE"
echo "=========================================="
```

---

## 🎯 **What Each Status Means:**

| Status | Meaning | What to Do |
|--------|---------|-----------|
| **HIT** | ✅ Cached! | Perfect! |
| **MISS** | ⏳ First request | Normal, will be HIT on next request |
| **BYPASS** | ✅ Not cached (correct) | Good for dynamic data |
| **EXPIRED** | ⏳ Cache expired | Cache resets, will be MISS next time |

---

## 📱 **Browser Test (Visual)**

1. Open: https://imtehan.com
2. Press **F12** (DevTools)
3. Go to **Network** tab
4. Reload page
5. Click on any `.svg` file
6. Go to **Response Headers**
7. Look for: `cf-cache-status: HIT`

---

## ⏱️ **Timing Expectations:**

- **Static assets:** Cache 1 year (MISS → HIT immediately)
- **API /past-papers:** Cache 5 minutes (MISS → HIT for 5 min)
- **Dynamic APIs:** Never cache (always BYPASS)

---

## 🚨 **If You See Issues:**

### **All MISS (no HIT):**
- Cache rules not deployed yet (wait 5 min)
- Domain not proxied (check Cloudflare DNS orange cloud)
- Cache rules have wrong hostname

### **All BYPASS (even static):**
- Cache rules set to wrong domain
- Rules not active (green toggle)

### **Redirect not working:**
- Page Rule not created
- Rule not deployed

---

## 🎯 **Success Looks Like:**

```
✓ Static assets: MISS → HIT ✅
✓ API: MISS → HIT ✅
✓ Dynamic: BYPASS (both times) ✅
✓ www redirects to imtehan.com ✅
```

---

## 📊 **Monitor Performance:**

Check response times:

```bash
time curl -I https://imtehan.com/favicon.svg
```

Should be **<100ms** if cached correctly.

---

**Run the tests now and share results!**
