import type { MetadataRoute } from 'next'
import { BASE_URL } from '@/lib/seo/sitemap-builders'

const WILDCARD_DISALLOWS = [
  '/api/',
  '/admin/',
  '/profile/',
  '/signin/',
  '/auth/',
  '/portal/',
  '/delete-account/',
  '/quiz/',
  '/cdn-cgi/',
  '/exams/*/*/analytics/',
  '/exams/*/*/*/batch/',
  '/css/past-papers/view',
  '/css/solved-papers/view',
  '/css/guess-papers/view',
  '/mpt-practice/quiz',
  '/*?*utm_',
  '/*?*ref=',
  '/*?*sort=',
  '/*?*filter=',
] as const

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [...WILDCARD_DISALLOWS],
      },
      {
        userAgent: 'Googlebot',
        allow: ['/', '/_next/static/', '/_next/image'],
        disallow: [...WILDCARD_DISALLOWS],
      },
      {
        userAgent: ['AhrefsBot', 'SemrushBot', 'MJ12bot'],
        disallow: '/',
      },
    ],
    sitemap: [`${BASE_URL}/sitemap.xml`, `${BASE_URL}/sitemap/notes.xml`],
    host: BASE_URL.replace('https://', ''),
  }
}
