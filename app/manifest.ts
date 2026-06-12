import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Imtehan: CSS, PMS, MDCAT & Competitive Exam Prep',
    short_name: 'Imtehan',
    description:
      'Pakistan\'s exam prep, done right: 150,000+ practice MCQs, past papers, real mock tests and AI scan-to-solve for CSS, PMS, MDCAT, PPSC, FPSC and 200+ exams.',
    start_url: '/?utm_source=pwa',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#0f172a',
    theme_color: '#3B5BDB',
    lang: 'en',
    dir: 'ltr',
    categories: ['education', 'productivity', 'books'],
    icons: [
      { src: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icon-512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
    shortcuts: [
      { name: 'CSS Preparation', url: '/css', description: 'CSS MCQs, past papers & guess papers' },
      { name: 'MDCAT Practice', url: '/mdcat', description: '18,000+ MDCAT MCQs' },
      { name: 'Browse All Exams', url: '/exams', description: '200+ competitive exams' },
      { name: 'Blog', url: '/blog', description: 'Exam strategy guides' },
    ],
  }
}
