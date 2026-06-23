import type { MetadataRoute } from 'next'
import { BASE_URL } from '@/lib/seo/sitemap-builders'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/profile/',
          '/signin/',
          '/auth/',
          '/cdn-cgi/',
          '/exams/*/*/*/set/',
          '/mdcat/*/*/set/',
          '/fsc/*/*/set/',
          '/css/past-papers/view',
          '/css/solved-papers/view',
          '/css/guess-papers/view',
          '/mpt-practice/quiz',
          '/*?*utm_',
          '/*?*ref=',
          '/*?*sort=',
          '/*?*filter=',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: ['/', '/_next/static/', '/_next/image'],
        disallow: [
          '/api/',
          '/admin/',
          '/profile/',
          '/signin/',
          '/auth/',
          '/exams/*/*/*/set/',
          '/mpt-practice/quiz',
        ],
      },
      {
        userAgent: ['AhrefsBot', 'SemrushBot', 'MJ12bot', 'GPTBot', 'CCBot', 'Bytespider'],
        disallow: '/',
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL.replace('https://', ''),
  }
}
