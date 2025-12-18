# CSS Practice App

A comprehensive CSS exam preparation platform built with Next.js 14, featuring practice questions, past papers, and solved papers for CSS (Central Superior Services) examination preparation.

## Features

- **CSS Practice MCQs**: 10,000+ practice questions across 40+ subjects
- **MPT Practice**: MCQ-based preliminary test preparation
- **Past Papers**: Official previous year papers with 1000+ papers across 50+ subjects
- **Solved Papers**: Complete solutions for compulsory subjective papers
- **Google OAuth**: Secure authentication with Google profile integration
- **Responsive Design**: Optimized for desktop and mobile devices
- **Progress Tracking**: Track your performance and improvement
- **CSS Eligibility Checker**: Check your eligibility for CSS 2026

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Authentication**: Supabase Auth with Google OAuth
- **Database**: Supabase PostgreSQL
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with Lucide React icons
- **PDF Viewing**: React-PDF for document viewing
- **Testing**: Jest with React Testing Library

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/AsfandiyarSafi/CSS-App.git
cd CSS-App
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file with:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push to main branch

### Environment Variables for Production

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Project Structure

```
├── app/                    # Next.js 14 App Router
│   ├── dashboard/         # Main dashboard
│   ├── css-practice/      # CSS practice modules
│   ├── mpt-practice/      # MPT practice modules
│   ├── past-papers/       # Past papers viewer
│   ├── solved-papers/     # Solved papers viewer
│   └── api/              # API routes
├── components/            # Reusable UI components
├── lib/                  # Utility functions and configurations
├── public/               # Static assets
└── supabase/            # Database migrations
```

## Key Features Implemented

### Profile Picture Integration
- Google OAuth profile pictures display correctly
- Fallback to user initials if image fails
- Optimized loading with error handling

### Security & Performance
- Content Security Policy configured
- Rate limiting for API endpoints
- Bot detection and prevention
- Optimized bundle splitting
- Image optimization with Next.js

### Mobile Optimization
- Responsive design for all screen sizes
- Touch-friendly interface
- Optimized PDF viewing on mobile

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact through the app's contact form or create an issue on GitHub.