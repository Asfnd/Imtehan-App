# Google Analytics Setup Guide

## 1. Get Your Google Analytics ID

1. Go to [Google Analytics](https://analytics.google.com)
2. Create a new GA4 property for your website
3. Copy the Measurement ID (starts with `G-`)
4. Add it to your `.env.local` file:

```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## 2. Usage Examples

### In React Components

```typescript
import { useAnalytics } from '@/lib/hooks/useAnalytics'

function QuizComponent() {
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

### Direct Event Tracking

```typescript
import { trackPaperView, trackSignUp } from '@/lib/analytics/events'

// Track paper views
trackPaperView('past-paper', 'CSS General Knowledge', '2023')

// Track user registration
trackSignUp('google')
```

## 3. Available Events

### Quiz Events
- `trackQuizStart(quizType, subject?)`
- `trackQuizComplete(quizType, score, totalQuestions, subject?)`
- `trackQuizAbandoned(quizType, questionsAnswered)`

### Paper Events
- `trackPaperView(paperType, subject, year?)`
- `trackPaperDownload(paperType, subject, year?)`

### User Events
- `trackSignUp(method)`
- `trackLogin(method)`
- `trackTrialLimitReached(featureType)`
- `trackTrialUpgrade()`

### Other Events
- `trackSearch(searchTerm, category)`
- `trackContactSubmit()`
- `trackError(errorType, errorMessage)`

## 4. Privacy Considerations

- All tracking is anonymous by default
- No personal information is sent to Google Analytics
- Users can opt out via browser settings
- GDPR compliant when used properly

## 5. Testing

To test if analytics is working:

1. Add your GA ID to `.env.local`
2. Run your app in development
3. Check the browser console for gtag events
4. View real-time reports in Google Analytics dashboard