# Environment Setup Guide for Security Features

## Required Environment Variables

Add these to your `.env.local` file:

```env
# ============================================
# EXISTING (Already configured)
# ============================================

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# ============================================
# NEW (Required for Phase 2 Security)
# ============================================

# Upstash Redis (for rate limiting)
UPSTASH_REDIS_REST_URL= 
UPSTASH_REDIS_REST_TOKEN= 

# hCaptcha (for bot verification)
NEXT_PUBLIC_HCAPTCHA_SITE_KEY= 
HCAPTCHA_SECRET_KEY= 

# ============================================
# OPTIONAL (For Phase 3 - Admin Security)
# ============================================

# Admin IP Whitelist (comma-separated)
ADMIN_ALLOWED_IPS=127.0.0.1,your_ip_address

# Security Alerts Email
SECURITY_ALERT_EMAIL=admin@yourdomain.com
```

## Step-by-Step Setup

### 1. Upstash Redis Setup (Required for Production)

**Why:** Rate limiting needs fast storage. Redis is perfect for this.

**Steps:**
1. Go to https://upstash.com
2. Click "Sign Up" (free tier available)
3. Create new database:
   - Click "Create Database"
   - Choose region closest to your users
   - Select "Free" tier
4. Copy credentials:
   - Click on your database
   - Copy "REST URL" → `UPSTASH_REDIS_REST_URL`
   - Copy "REST Token" → `UPSTASH_REDIS_REST_TOKEN`

**Note:** Without Redis, rate limiting uses in-memory storage (works but not recommended for production).

### 2. hCaptcha Setup (Required for Bot Protection)

**Why:** CAPTCHA verification stops confirmed bots from accessing your app.

**Steps:**
1. Go to https://www.hcaptcha.com
2. Click "Sign Up" (free tier available)
3. Add new site:
   - Click "New Site"
   - Enter your domain (or localhost for testing)
   - Choose "Free" tier
4. Copy credentials:
   - Copy "Site Key" → `NEXT_PUBLIC_HCAPTCHA_SITE_KEY`
   - Copy "Secret Key" → `HCAPTCHA_SECRET_KEY`

**Testing locally:**
- Use `localhost` as domain in hCaptcha settings
- CAPTCHA will work on `http://localhost:3000`

### 3. Verify Setup

Create a test file to verify everything works:

```typescript
// test-security.ts
import { Redis } from '@upstash/redis'

// Test Redis connection
async function testRedis() {
  if (!process.env.UPSTASH_REDIS_REST_URL) {
    console.log('❌ Redis not configured (will use in-memory fallback)')
    return
  }

  try {
    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })

    await redis.set('test', 'hello')
    const value = await redis.get('test')
    
    if (value === 'hello') {
      console.log('✅ Redis connection successful!')
    } else {
      console.log('❌ Redis connection failed')
    }
  } catch (error) {
    console.log('❌ Redis error:', error)
  }
}

// Test hCaptcha configuration
function testHCaptcha() {
  if (!process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY) {
    console.log('❌ hCaptcha not configured')
    return
  }

  console.log('✅ hCaptcha site key configured')
  
  if (!process.env.HCAPTCHA_SECRET_KEY) {
    console.log('⚠️  hCaptcha secret key missing (needed for server-side verification)')
  } else {
    console.log('✅ hCaptcha secret key configured')
  }
}

testRedis()
testHCaptcha()
```

Run with:
```bash
npx tsx test-security.ts
```

## Configuration Options

### Rate Limit Adjustment

Edit `lib/rate-limit/config.ts`:

```typescript
export const rateLimits = {
  quiz: {
    windowMs: 60 * 1000,  // Time window
    max: 10,              // Max requests
    message: 'Too many quiz requests',
  },
  // Adjust other limits as needed
}
```

### Bot Detection Threshold

Edit where CaptchaChallenge is used:

```typescript
<CaptchaChallenge
  botScoreThreshold={0.7}  // 0.0 = never show, 1.0 = always show
  autoShow={true}
/>
```

### Security Headers

Edit `next.config.ts` to adjust CSP or other headers.

## Troubleshooting

### Rate Limiting Not Working

**Problem:** Requests not being rate limited

**Solutions:**
1. Check if Redis is configured (see logs)
2. Verify middleware is running (check network tab)
3. Check rate limit headers in response
4. Try clearing Redis: `redis.flushall()`

### CAPTCHA Not Showing

**Problem:** CAPTCHA never appears

**Solutions:**
1. Check bot score: `getBehaviorAnalyzer().analyze()`
2. Lower threshold: `botScoreThreshold={0.3}`
3. Verify hCaptcha site key is correct
4. Check browser console for errors

### Security Headers Not Applied

**Problem:** Headers missing in response

**Solutions:**
1. Restart dev server
2. Check `next.config.ts` syntax
3. Verify headers in production (not just dev)
4. Check for conflicting middleware

### Redis Connection Errors

**Problem:** "Failed to connect to Redis"

**Solutions:**
1. Verify URL and token are correct
2. Check if Redis database is active
3. Verify network connectivity
4. Use in-memory fallback for testing

## Production Deployment

### Vercel

Add environment variables in Vercel dashboard:
1. Go to Project Settings
2. Click "Environment Variables"
3. Add all variables from `.env.local`
4. Redeploy

### Other Platforms

Ensure environment variables are set in your hosting platform's dashboard.

## Security Best Practices

1. **Never commit `.env.local`** to git
2. **Use different keys** for dev/staging/production
3. **Rotate secrets** regularly
4. **Monitor rate limit** violations
5. **Review bot scores** weekly
6. **Keep packages updated**
7. **Test after deployment**

## Support

If you encounter issues:

1. Check logs: `npm run dev` output
2. Check browser console
3. Check network tab for API responses
4. Review security logs in database
5. Test with curl/Postman

## Quick Start

Minimum setup to get started:

```bash
# 1. Copy example env
cp .env.example .env.local

# 2. Add Supabase credentials (already have these)

# 3. Add Upstash Redis (sign up at upstash.com)
UPSTASH_REDIS_REST_URL=...
UPSTASH_REDIS_REST_TOKEN=...

# 4. Add hCaptcha (sign up at hcaptcha.com)
NEXT_PUBLIC_HCAPTCHA_SITE_KEY=...
HCAPTCHA_SECRET_KEY=...

# 5. Start dev server
npm run dev

# 6. Test at http://localhost:3000
```

That's it! Your security features are now active. 🎉
