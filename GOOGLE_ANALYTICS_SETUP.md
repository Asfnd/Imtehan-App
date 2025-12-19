# Google Analytics 4 Setup Guide

## ✅ Installation Complete!

Google Analytics 4 has been successfully integrated into your CSS Practice App. Follow the steps below to activate it.

---

## 📋 Step 1: Create Google Analytics Account

1. Go to [Google Analytics](https://analytics.google.com)
2. Click **"Start measuring"** or **"Admin"** (bottom left)
3. Create a new **Account** (e.g., "CSS Practice App")
4. Create a new **Property** (e.g., "CSS Practice Production")
5. Select **"Web"** as the platform
6. Enter your website URL (e.g., `https://your-domain.com`)
7. Click **"Create stream"**

---

## 📋 Step 2: Get Your Measurement ID

1. After creating the stream, you'll see a **Measurement ID** (starts with `G-`)
2. Copy this ID (e.g., `G-ABC123XYZ`)
3. Keep this page open - you'll need it later

---

## 📋 Step 3: Add Measurement ID to Your App

### For Local Development:

1. Open `.env.local` in your project root
2. Find the line: `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX`
3. Replace `G-XXXXXXXXXX` with your actual Measurement ID
4. Save the file

Example:
```bash
NEXT_PUBLIC_GA_ID=G-HSB62WEM06
```

### For Production (Vercel):

1. Go to your Vercel dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add a new variable:
   - **Name**: `NEXT_PUBLIC_GA_ID`
   - **Value**: Your Measurement ID (e.g., `G-HSB62WEM06`)
   - **Environment**: Production (and Preview if you want)
5. Click **Save**
6. Redeploy your app

---

## 📋 Step 4: Test the Integration

### Local Testing:

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open your browser's Developer Tools (F12)
3. Go to the **Console** tab
4. Navigate through your app
5. You should see gtag events being logged

### Production Testing:

1. Deploy your app to production
2. Go to Google Analytics dashboard
3. Click **"Realtime"** in the left sidebar
4. Visit your live website
5. You should see yourself as an active user in real-time!

---

## 🎯 What's Being Tracked

Your app now automatically tracks:

### Quiz Events
- ✅ Quiz starts (with subject)
- ✅ Quiz completions (with score)
- ✅ Quiz abandonment

### Paper Events
- ✅ Paper views
- ✅ Paper downloads

### User Events
- ✅ Sign ups
- ✅ Logins
- ✅ Trial limit reached
- ✅ Trial upgrades

### Other Events
- ✅ Page views
- ✅ Search queries
- ✅ Contact form submissions
- ✅ Errors

---

## 📊 How to Use Analytics in Your Code

### Example 1: Track Quiz Events

```typescript
import { useAnalytics } from '@/lib/hooks/useAnalytics'

function MyQuizComponent() {
  const analytics = useAnalytics()

  const handleQuizStart = () => {
    analytics.trackQuizStart('css-mcq', 'General Knowledge')
  }

  const handleQuizComplete = (score: number) => {
    analytics.trackQuizComplete('css-mcq', score, 20, 'General Knowledge')
  }

  // ... rest of component
}
```

### Example 2: Track Paper Views

```typescript
import { useAnalytics } from '@/lib/hooks/useAnalytics'

function PaperViewer() {
  const analytics = useAnalytics()

  useEffect(() => {
    analytics.trackPaperView('past-paper', 'CSS General Knowledge', '2023')
  }, [])

  // ... rest of component
}
```

### Example 3: Track User Actions

```typescript
import { useAnalytics } from '@/lib/hooks/useAnalytics'

function AuthComponent() {
  const analytics = useAnalytics()

  const handleSignUp = () => {
    // ... sign up logic
    analytics.trackSignUp('google')
  }

  const handleLogin = () => {
    // ... login logic
    analytics.trackLogin('google')
  }

  // ... rest of component
}
```

---

## 📈 Viewing Your Analytics

### Real-Time Reports
1. Go to Google Analytics dashboard
2. Click **"Realtime"** → See live users and events

### Event Reports
1. Click **"Reports"** → **"Engagement"** → **"Events"**
2. See all tracked events with counts

### User Reports
1. Click **"Reports"** → **"User"** → **"User attributes"**
2. See user demographics and behavior

### Custom Reports
1. Click **"Explore"** → **"Create new exploration"**
2. Build custom reports with your tracked events

---

## 🔒 Privacy & GDPR Compliance

Your Google Analytics setup is privacy-friendly:

- ✅ No personal information is tracked
- ✅ IP anonymization is enabled by default in GA4
- ✅ Users can opt out via browser settings
- ✅ No cookies are required for basic tracking

For full GDPR compliance, consider adding a cookie consent banner.

---

## 🚀 Next Steps

1. **Set up goals** in Google Analytics for conversions (e.g., quiz completions)
2. **Create custom dashboards** for key metrics
3. **Set up alerts** for important events
4. **Integrate with Google Search Console** for SEO insights
5. **Add more custom events** as your app grows

---

## 📚 Additional Resources

- [Google Analytics 4 Documentation](https://support.google.com/analytics/answer/10089681)
- [GA4 Event Tracking Guide](https://support.google.com/analytics/answer/9322688)
- [Next.js Analytics Guide](https://nextjs.org/docs/app/building-your-application/optimizing/analytics)

---

## 🆘 Troubleshooting

### Events not showing up?

1. Check that `NEXT_PUBLIC_GA_ID` is set correctly
2. Make sure you're not using an ad blocker
3. Wait 24-48 hours for data to appear in standard reports (real-time should work immediately)
4. Check browser console for errors

### Need help?

- Check the [Analytics README](./lib/analytics/README.md) for more examples
- Review the [events.ts](./lib/analytics/events.ts) file for all available tracking functions
- Open an issue on GitHub

---

## ✨ You're All Set!

Your CSS Practice App now has comprehensive analytics tracking. Start collecting insights about your users and improve your app based on real data!

Happy tracking! 📊🎉
