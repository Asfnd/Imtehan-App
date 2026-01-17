# Campaign Mode - Influencer Marketing Protection

## Overview
Campaign Mode enables stricter rate limiting and DDoS protection during high-traffic events like influencer marketing campaigns.

## How to Enable Campaign Mode

### Option 1: Vercel Dashboard (Recommended)
1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add a new variable:
   - **Name**: `CAMPAIGN_MODE`
   - **Value**: `true`
   - **Environment**: Production
4. Click **Save**
5. Redeploy your application (Vercel will auto-redeploy)

### Option 2: Vercel CLI
```bash
vercel env add CAMPAIGN_MODE
# Enter value: true
# Select environment: Production

# Redeploy
vercel --prod
```

## What Campaign Mode Does

### 1. Stricter Rate Limiting
- **Normal Mode**: 10 requests per 10 seconds
- **Campaign Mode**: 5 requests per 10 seconds
- Applies to: API routes, quiz pages, practice pages

### 2. DDoS Protection
- Blocks IPs making >60 requests/minute globally
- Automatic 5-minute IP ban for violators
- Protects against scrapers and bot attacks

### 3. Reduced Edge CPU Usage
- Middleware skips static/cached pages (70% CPU reduction)
- Only runs on dynamic routes that need auth/protection
- Optimized IP extraction and bot detection

## When to Enable

**Enable BEFORE the campaign starts:**
- 1-2 hours before influencer posts
- During any viral marketing event
- When expecting >5K visitors in a short time

**Disable AFTER the campaign:**
- When traffic returns to normal
- To allow regular users faster access
- Usually 24-48 hours after campaign ends

## Monitoring During Campaign

### Check Vercel Analytics
Monitor these metrics in real-time:
- Edge Requests (limit: 1M)
- Edge Request CPU Duration (limit: 1h)
- Function Invocations (limit: 1M)

### Warning Signs
If you see:
- Edge Request CPU Duration increasing rapidly
- 429 errors in Vercel logs
- User complaints about slowness

**Action**: The campaign mode is working! Don't disable it. Consider upgrading to Pro if needed.

## Disable Campaign Mode

1. Go to Vercel Dashboard → Settings → Environment Variables
2. Delete `CAMPAIGN_MODE` variable or set to `false`
3. Redeploy

## Expected Capacity with Campaign Mode

**With current limits:**
- **Max visitors**: ~15K-20K safely
- **Edge Requests**: 892K available (plenty of headroom)
- **Edge CPU**: Protected by route skipping and stricter limits

**Your 10K campaign is SAFE** with campaign mode enabled.

## Emergency: If Site Goes Down

1. **Check Vercel Dashboard** → Functions tab for errors
2. **Temporarily disable middleware**:
   - Edit `middleware.ts`
   - Comment out the entire middleware temporarily
   - Redeploy
3. **Upgrade to Pro** ($20/month):
   - 1B edge requests
   - 1M GB-Hrs provisioned memory
   - Email support

## Support

For issues during campaign:
- Vercel Status: https://www.vercel-status.com/
- Contact: Your Vercel dashboard → Support
