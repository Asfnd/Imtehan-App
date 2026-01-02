# Implementation Checklist - imtehan.com Optimization
**Follow this exact order**

---

## ✅ **STEP 1: Connect Domain (Do This First - 10 min)**

### **A. In Vercel Dashboard:**

1. Go to: https://vercel.com/dashboard
2. Select your project (quiz-app)
3. Click: **Settings** → **Domains**
4. Click: **Add Domain**
5. Enter: `imtehan.com`
6. Click: **Add**

Vercel will show DNS records. **COPY THESE** (usually):
```
A record: @ → 76.76.21.21
```

### **B. In Cloudflare Dashboard:**

1. Go to: https://dash.cloudflare.com
2. Select domain: **imtehan.com**
3. Go to: **DNS** → **Records**

4. **DELETE** any existing `A` or `CNAME` records for `@` (root domain)

5. **ADD** these records:

**Record 1:**
- Type: `A`
- Name: `@`
- IPv4 address: `76.76.21.21`
- Proxy status: **Proxied** (orange cloud) ✅
- TTL: Auto
- Click **Save**

**Record 2:**
- Type: `CNAME`
- Name: `www`
- Target: `imtehan.com`
- Proxy status: **Proxied** (orange cloud) ✅
- TTL: Auto
- Click **Save**

6. **Wait 5 minutes** for DNS propagation

7. **Test:** Open https://imtehan.com in browser
   - Should redirect to Vercel (may show Vercel error initially - that's OK)

---

## ✅ **STEP 2: Cloudflare Performance Settings (5 min)**

### **A. Speed → Optimization:**

1. Go to: **Speed** → **Optimization**

2. **Auto Minify:**
   - ✅ JavaScript
   - ✅ CSS
   - ✅ HTML
   - Click **Save**

3. **Brotli:**
   - ✅ Enabled

4. **Early Hints:**
   - ✅ Enabled

### **B. Network Settings:**

1. Go to: **Network**

2. **HTTP/3 (with QUIC):**
   - ✅ Enabled

3. **0-RTT Connection Resumption:**
   - ✅ Enabled

4. **WebSockets:**
   - ✅ Enabled

### **C. SSL/TLS Settings:**

1. Go to: **SSL/TLS** → **Overview**

2. **Encryption mode:**
   - Select: **Full (strict)**

3. Go to: **SSL/TLS** → **Edge Certificates**

4. **Always Use HTTPS:**
   - ✅ On

5. **Automatic HTTPS Rewrites:**
   - ✅ On

6. **Minimum TLS Version:**
   - Select: **TLS 1.2**

---

## ✅ **STEP 3: Create Cache Rules (10 min)**

Go to: **Caching** → **Cache Rules** → Click **+ Create Rule**

### **RULE 1: Cache Static Assets**

1. **Rule name:** `Cache Static Assets`

2. **When incoming requests match:**
   - Click: **Edit expression**
   - Paste:
```
(http.host eq "imtehan.com" and http.request.uri.path matches "\\.(mp3|svg|png|jpg|jpeg|webp|ico|woff|woff2|ttf|eot|css|js)$")
```

3. **Then:**
   - **Cache eligibility:** Select "Eligible for cache"
   - **Edge Cache TTL:**
     - Select "Override origin"
     - Enter: `31536000` (1 year)
   - **Browser Cache TTL:**
     - Select "Override origin"
     - Enter: `31536000` (1 year)

4. Click: **Deploy**

---

### **RULE 2: Cache Next.js Static Files**

1. Click: **+ Create Rule**

2. **Rule name:** `Cache Next.js Static`

3. **When incoming requests match:**
```
(http.host eq "imtehan.com" and starts_with(http.request.uri.path, "/_next/static/"))
```

4. **Then:**
   - **Cache eligibility:** Eligible for cache
   - **Edge Cache TTL:** `31536000` (1 year)
   - **Browser Cache TTL:** `31536000` (1 year)

5. Click: **Deploy**

---

### **RULE 3: Cache Metadata API**

1. Click: **+ Create Rule**

2. **Rule name:** `Cache Metadata API`

3. **When incoming requests match:**
```
(http.host eq "imtehan.com" and starts_with(http.request.uri.path, "/api/past-papers"))
```

4. **Then:**
   - **Cache eligibility:** Eligible for cache
   - **Edge Cache TTL:** `300` (5 minutes)
   - **Browser Cache TTL:** `300` (5 minutes)

5. Click: **Deploy**

---

### **RULE 4: Bypass Dynamic APIs**

1. Click: **+ Create Rule**

2. **Rule name:** `Bypass Dynamic APIs`

3. **When incoming requests match:**
```
(http.host eq "imtehan.com" and (starts_with(http.request.uri.path, "/api/quiz") or http.request.uri.path eq "/api/usage" or http.request.uri.path eq "/api/contact" or http.request.uri.path eq "/api/newsletter" or starts_with(http.request.uri.path, "/api/solved-papers")))
```

4. **Then:**
   - **Cache eligibility:** Select "Bypass cache"

5. Click: **Deploy**

---

## ✅ **STEP 4: Code Updates (Claude will do this)**

I'll update:
- ✅ .env.local (domain URL)
- ✅ app/layout.tsx (metadata)
- ✅ app/sitemap.ts (sitemap URLs)
- ✅ Create storage-config.ts (custom domain support)
- ✅ Update PDF storage utilities

---

## ✅ **STEP 5: Set Up storage.imtehan.com (15 min)**

### **A. Create Cloudflare Worker:**

1. Go to: **Workers & Pages** → **Create**

2. Click: **Create Worker**

3. **Name:** `storage-proxy`

4. Click: **Deploy** (we'll edit code in next step)

5. Click: **Edit Code**

6. **Delete all code** and paste this:

```javascript
export default {
  async fetch(request) {
    const url = new URL(request.url)

    // Replace storage.imtehan.com with Supabase URL
    const supabaseUrl = url.href.replace(
      'storage.imtehan.com',
      'qsrkkvrrxorbgvbgekew.supabase.co'
    )

    // Forward request to Supabase
    const response = await fetch(supabaseUrl, {
      method: request.method,
      headers: request.headers,
      body: request.body,
      redirect: 'follow'
    })

    // Clone response and add cache headers
    const newResponse = new Response(response.body, response)

    // Add aggressive cache headers for Cloudflare
    newResponse.headers.set('Cache-Control', 'public, max-age=2592000')
    newResponse.headers.set('CDN-Cache-Control', 'public, max-age=2592000')

    return newResponse
  }
}
```

7. Click: **Save and Deploy**

8. **Copy the worker URL** (e.g., `storage-proxy.your-subdomain.workers.dev`)

---

### **B. Add Worker Route:**

1. Go back to: **Workers & Pages** → Click your worker → **Settings** → **Triggers**

2. Click: **Add Route**

3. **Route:** `storage.imtehan.com/*`

4. **Zone:** Select `imtehan.com`

5. Click: **Save**

---

### **C. Add DNS Record:**

1. Go to: **DNS** → **Records**

2. Click: **Add Record**

3. **Record details:**
   - Type: `AAAA`
   - Name: `storage`
   - IPv6 address: `100::`
   - Proxy status: **Proxied** (orange cloud) ✅
   - TTL: Auto

4. Click: **Save**

**Note:** The worker route will override this DNS, but the record is required.

---

### **D. Create Cache Rule for Storage:**

1. Go to: **Caching** → **Cache Rules** → **+ Create Rule**

2. **Rule name:** `Cache Storage Files`

3. **When incoming requests match:**
```
(http.host eq "storage.imtehan.com" and starts_with(http.request.uri.path, "/storage/v1/object/public/"))
```

4. **Then:**
   - **Cache eligibility:** Eligible for cache
   - **Edge Cache TTL:** `2592000` (30 days)
   - **Browser Cache TTL:** `2592000` (30 days)

5. Click: **Deploy**

---

## ✅ **STEP 6: Test Everything**

After deployment, test:

```bash
# Test main domain
curl -I https://imtehan.com

# Test storage proxy
curl -I https://storage.imtehan.com/storage/v1/object/public/css-past-papers/economics/2024/economics-2024.pdf

# Test static asset caching
curl -I https://imtehan.com/sounds/correct.mp3

# Test API bypass
curl -I https://imtehan.com/api/usage
```

---

## 📊 **Success Criteria**

After implementation:

- ✅ https://imtehan.com loads your app
- ✅ https://www.imtehan.com redirects to imtehan.com
- ✅ Static assets show `cf-cache-status: HIT` (after 2nd request)
- ✅ PDFs load from storage.imtehan.com
- ✅ All quiz functionality works
- ✅ User authentication works
- ✅ Quiz submissions work

---

## 🚨 **If Something Breaks**

**Domain not loading:**
- Wait 10-15 minutes for DNS propagation
- Clear browser cache
- Try incognito mode

**Worker not working:**
- Check route is `storage.imtehan.com/*` (not `storage.imtehan.com`)
- Verify DNS is proxied (orange cloud)

**Quiz not working:**
- Check bypass rule is active
- Verify API endpoints aren't cached

---

**Ready? Start with STEP 1!**
