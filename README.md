# AI Quiz Platform

An AI-powered quiz learning platform that provides personalized quiz experiences, tracks progress, and offers intelligent insights to help users learn effectively.

## Features

### ✅ Completed (Phase 1-3)

- **Authentication System**
  - Email/password authentication
  - Google OAuth integration
  - Protected routes
  - Session management

- **AI-Powered Quiz Generation**
  - Personalized quizzes using Hugging Face Mistral 7B
  - Adaptive difficulty based on user performance
  - 24-hour caching to minimize API costs
  - Fallback to pre-seeded questions

- **Quiz Taking Experience**
  - Beautiful, animated UI with Framer Motion
  - 15-second timer per question
  - Immediate feedback with explanations
  - Progress tracking
  - Confetti celebration for high scores

- **User Dashboard**
  - Stats overview (XP, level, accuracy, streak)
  - Recent quiz history
  - Streak calendar with 30-day view
  - Level progression with XP bar

- **Gamification**
  - XP system (10 XP per correct answer + bonus)
  - Level progression (Level = floor(sqrt(XP / 100)))
  - Daily streak tracking
  - Streak bonus XP (5% per day, max 25%)

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, TailwindCSS
- **Animations**: Framer Motion, Canvas Confetti
- **State Management**: Zustand
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **AI**: Hugging Face Inference API (Mistral 7B Instruct)
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- Hugging Face API key

### Installation

1. Clone the repository
```bash
git clone <repo-url>
cd quiz-app
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```

Fill in your environment variables:
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
HUGGINGFACE_API_KEY=your-hf-api-key
```

4. Set up the database
```bash
# Run the migration in Supabase SQL Editor
# File: supabase/migrations/001_initial_schema.sql
```

5. Seed quiz questions
```bash
npm run seed
```

6. Start the development server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Project Structure

```
quiz-app/
├── app/                      # Next.js app directory
│   ├── api/                  # API routes
│   │   └── quiz/            # Quiz generation & submission
│   ├── auth/                # Auth pages
│   ├── dashboard/           # User dashboard
│   ├── quiz/                # Quiz taking page
│   └── layout.tsx           # Root layout
├── components/              # React components
│   ├── auth/               # Auth components
│   ├── dashboard/          # Dashboard components
│   ├── quiz/               # Quiz components
│   └── ui/                 # Reusable UI components
├── lib/                    # Utilities and helpers
│   ├── ai/                # AI integration
│   ├── auth/              # Auth helpers
│   ├── seed-data/         # Seed questions
│   └── supabase/          # Supabase client & helpers
├── store/                 # Zustand stores
└── supabase/             # Database migrations
```

## Available Topics

- Pakistan Affairs
- Islamiat
- General Knowledge
- Current Affairs
- Math

## API Routes

### POST /api/quiz/generate
Generate a personalized quiz for a user

**Request:**
```json
{
  "topic": "Math",
  "userId": "user-id"
}
```

**Response:**
```json
{
  "quiz": {
    "id": "quiz-id",
    "topic": "Math",
    "questions": [...],
    "difficulty": "medium"
  },
  "fromCache": false,
  "generatedBy": "ai"
}
```

### POST /api/quiz/submit
Submit quiz answers and get results

**Request:**
```json
{
  "userId": "user-id",
  "quizId": "quiz-id",
  "topic": "Math",
  "answers": [...],
  "timeTaken": 120
}
```

**Response:**
```json
{
  "result": {
    "score": 8,
    "total_questions": 10,
    "xp_earned": 105,
    "level_up": true,
    "new_level": 5
  }
}
```

## Database Schema

### Tables
- `users` - User profiles with XP, level, and streak data
- `quizzes` - Generated quizzes with caching
- `quiz_history` - Completed quiz records
- `insights_cache` - Cached AI insights
- `quiz_packs` - Offline quiz packs

### Materialized View
- `user_topic_performance` - Aggregated performance by topic

## Development Progress

**Completed Tasks: 13/32 (40.6%)**

- ✅ Phase 1: Project Setup (Tasks 1-4)
- ✅ Phase 2: Authentication (Tasks 5-6)
- ✅ Phase 3: Quiz Engine (Tasks 7-10)
- ✅ Phase 4: Quiz Completion (Tasks 11-13)
- ⏳ Phase 5: Analytics (Tasks 14-15)
- ⏳ Phase 6: AI Insights (Tasks 16-17)
- ⏳ Phase 7: Offline Mode (Tasks 18-20)
- ⏳ Phase 8: UI Polish (Tasks 21-23)
- ⏳ Phase 9: Testing (Tasks 24-27)
- ⏳ Phase 10: Deployment (Tasks 28-32)

## Next Steps

1. Implement performance analytics visualization
2. Build AI-powered insights generation
3. Add offline mode support
4. Polish animations and mobile experience
5. Write tests
6. Deploy to production

## Contributing

This is a learning project. Feel free to fork and experiment!

## License

MIT
