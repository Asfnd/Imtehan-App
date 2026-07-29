import type { NextConfig } from "next";
import path from "path";
import { PREMIUM_PAGE_PATH } from "./lib/routes";
import {
  ORIGIN_NO_STORE_HEADERS,
  ROBOTS_CACHE_CONTROL,
  SEO_CDN_CACHE_HEADERS,
  SEO_CLOUDFLARE_CACHE_CONTROL,
  SITEMAP_CACHE_CONTROL,
} from "./lib/seo/cdn-cache";

const securityHeaders = [
  // SECURITY: Content Security Policy (re-enabled)
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      // Script sources: self + Google Analytics + Vercel analytics + trusted CDNs + eval for PDF.js
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://vercel.live https://va.vercel-scripts.com https://cdnjs.cloudflare.com https://pagead2.googlesyndication.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://www.google.com https://www.gstatic.com https://connect.facebook.net",
      // Style: self + unsafe-inline (needed for Tailwind CSS)
      "style-src 'self' 'unsafe-inline'",
      // Images: self, data URIs, HTTPS, blobs, and Google profile pictures
      "img-src 'self' data: https: blob: https://lh3.googleusercontent.com https://*.googleusercontent.com https://*.google.com https://*.googleadservices.com https://*.doubleclick.net",
      // Fonts: self and data URIs
      "font-src 'self' data:",
      // API connections to Supabase and R2
      "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://www.imtehan.com https://www.google-analytics.com https://region1.google-analytics.com https://analytics.google.com https://*.google.com https://*.googlesyndication.com https://*.doubleclick.net https://pagead2.googlesyndication.com https://www.googleadservices.com https://*.facebook.com https://*.facebook.net blob: data:",
      // Frames: self + Supabase storage + R2 custom domain + blob (for PDF viewer iframes)
      "frame-src 'self' https://*.supabase.co https://www.imtehan.com https://*.googlesyndication.com https://www.google.com blob: data:",
      // Workers and blobs
      "worker-src 'self' blob:",
      "child-src 'self' blob: https://*.supabase.co",
      // Object/Embed for PDF plugins - allow all for browser PDF viewer
      "object-src 'self' https://*.supabase.co blob: data:",
      // Media sources for PDFs
      "media-src 'self' https://*.supabase.co https://www.imtehan.com blob: data:",
      // Prevent embedding in iframes from external sites
      "frame-ancestors 'none'",
      // Base URI: only self
      "base-uri 'self'",
      // Form submissions only to same origin
      "form-action 'self'",
      // Upgrade insecure requests
      "upgrade-insecure-requests",
    ].join('; '),
  },
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  // SECURITY: X-Frame-Options removed - PDFs served via same-origin proxy (localhost:3000/api/pdf/proxy)
  // This allows iframes to embed the proxied PDFs without cross-origin restrictions
  // Original X-Frame-Options: DENY has been replaced with CSP frame-ancestors 'none' for better control
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  // SECURITY: CORS headers - Allow cross-origin resources for PDF viewing
  // Note: COEP disabled to allow PDF iframes from Supabase storage
  {
    key: 'Cross-Origin-Opener-Policy',
    value: 'same-origin-allow-popups', // Allow popups while maintaining isolation
  },
  {
    key: 'Cross-Origin-Resource-Policy',
    value: 'cross-origin', // Allow cross-origin resource access for images/PDFs
  },
]

/**
 * Development only: avoid production CSP/HSTS/COOP on http://localhost.
 * Firefox is stricter than Chrome about connect-src (HMR WebSockets) and
 * upgrade-insecure-requests on plain HTTP, which can break `next dev`.
 */
const devSecurityHeaders = [
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
]

const appSecurityHeaders =
  process.env.NODE_ENV === 'production' ? securityHeaders : devSecurityHeaders

const nextConfig: NextConfig = {
  // Docker / Oracle deploy (deploy/oracle/Dockerfile copies .next/standalone)
  output: 'standalone',
  // Fix: multiple lockfiles warning — pin the tracing root to this project
  outputFileTracingRoot: path.join(__dirname),
  // Production optimizations
  productionBrowserSourceMaps: false, // Disable source maps in production for faster builds
  poweredByHeader: false, // Remove X-Powered-By header
  reactStrictMode: true, // Enable strict mode for better performance
  
  webpack: (config) => {
    // Existing aliases for PDF.js
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    // Do NOT override splitChunks / sideEffects — custom "common" cacheGroups
    // previously emitted a referenced chunk that was missing in production (404),
    // which broke client hydration so all interactive buttons stayed dead.
    return config;
  },
  // Enable experimental features for better performance
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', '@supabase/supabase-js'],
    webpackBuildWorker: true, // Faster builds with workers
  },
  // Compress static assets
  compress: true,
  // Enable static optimization
  trailingSlash: false,
  // Optimize images
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error'],
    } : false,
  },
  turbopack: {
    // Empty config to silence the warning
  },
  async rewrites() {
    return [
      {
        source: '/imtehan-indexnow-key.txt',
        destination: '/imtehan-indexnow-key',
      },
      {
        source: '/sitemap-index.xml',
        destination: '/sitemap-index',
      },
      {
        source: '/sitemap/mcq/:bank/:page.xml',
        destination: '/sitemap-mcq/:bank/:page',
      },
      {
        source: '/sitemap/:segment.xml',
        destination: '/sitemap-segment/:segment',
      },
    ]
  },
  async redirects() {
    return [
      // Repair absolute URL concatenated onto a path segment
      // (e.g. /exams/foohttps:/imtehan.com/exams/foo after // → / collapse).
      {
        source: '/exams/:slug([^/]*?)https\\:/:path*',
        destination: '/exams/:slug',
        permanent: true,
      },
      {
        source: '/mcq/:bank/:id([^/]*?)https\\:/:path*',
        destination: '/mcq/:bank/:id',
        permanent: true,
      },
      // Law-GAT official syllabus section rename (CSS optional subjects → HEC/PBC divisions)
      {
        source: '/exams/hec-law-gat/constitutional-law',
        destination: '/exams/hec-law-gat/constitution',
        permanent: true,
      },
      // Bust Cloudflare soft-404 on /mock/:id — attempts live at /mock-attempt/:id
      {
        source: '/exams/:exam/mock/:mockId(\\d+)',
        destination: '/exams/:exam/mock-attempt/:mockId',
        permanent: false,
      },
      {
        source: '/exams/hec-law-gat/constitutional-law/:path*',
        destination: '/exams/hec-law-gat/constitution/:path*',
        permanent: true,
      },
      {
        source: '/exams/hec-law-gat/muslim-law',
        destination: '/exams/hec-law-gat/jurisprudence',
        permanent: true,
      },
      {
        source: '/exams/hec-law-gat/muslim-law/:path*',
        destination: '/exams/hec-law-gat/jurisprudence/:path*',
        permanent: true,
      },
      {
        source: '/exams/hec-law-gat/law',
        destination: '/exams/hec-law-gat/criminal-law',
        permanent: true,
      },
      {
        source: '/exams/hec-law-gat/law/:path*',
        destination: '/exams/hec-law-gat/criminal-law/:path*',
        permanent: true,
      },
      {
        source: '/exams/hec-law-gat/mercantile-law',
        destination: '/exams/hec-law-gat',
        permanent: true,
      },
      {
        source: '/exams/hec-law-gat/mercantile-law/:path*',
        destination: '/exams/hec-law-gat',
        permanent: true,
      },
      // Redirect old CSS practice routes to new structure
      {
        source: '/css-practice',
        destination: '/css/css-practice',
        permanent: true,
      },
      {
        source: '/css-practice/:path*',
        destination: '/css/css-practice/:path*',
        permanent: true,
      },
      // Redirect old past papers routes
      {
        source: '/past-papers',
        destination: '/css/past-papers',
        permanent: true,
      },
      {
        source: '/past-papers/:path*',
        destination: '/css/past-papers/:path*',
        permanent: true,
      },
      // Redirect old solved papers routes
      {
        source: '/solved-papers',
        destination: '/css/solved-papers',
        permanent: true,
      },
      {
        source: '/solved-papers/:path*',
        destination: '/css/solved-papers/:path*',
        permanent: true,
      },
      // Redirect old CSS GSA routes
      {
        source: '/css-gsa',
        destination: '/css/css-gsa',
        permanent: true,
      },
      {
        source: '/css-gsa/:path*',
        destination: '/css/css-gsa/:path*',
        permanent: true,
      },
      {
        source: '/premium',
        destination: PREMIUM_PAGE_PATH,
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      // PDF proxy route - CRITICAL: No X-Frame-Options to allow iframe embedding
      {
        source: '/api/pdf/proxy',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, OPTIONS',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable', // 1 year
          },
          // IMPORTANT: Do NOT set X-Frame-Options here - API route handles it
        ],
      },
      {
        source: '/:path((?!api/pdf/proxy).*)',  // Exclude /api/pdf/proxy from security headers
        headers: appSecurityHeaders,
      },
      // Cache static assets (JS, CSS, images)
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Cache images
      {
        source: '/_next/image/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=31536000',
          },
        ],
      },
      // API routes: no public caching — authenticated responses must not be cached by CDN
      {
        source: '/api/:path((?!pdf/proxy).*)*',
        headers: [...ORIGIN_NO_STORE_HEADERS],
      },
      // Gated / interactive HTML — origin must not advertise SEO TTL (Cloudflare bypass too)
      {
        source: '/profile/:path*',
        headers: [...ORIGIN_NO_STORE_HEADERS],
      },
      {
        source: '/admin/:path*',
        headers: [...ORIGIN_NO_STORE_HEADERS],
      },
      {
        source: '/auth/:path*',
        headers: [...ORIGIN_NO_STORE_HEADERS],
      },
      {
        source: '/signin',
        headers: [...ORIGIN_NO_STORE_HEADERS],
      },
      {
        source: '/community',
        headers: [...ORIGIN_NO_STORE_HEADERS],
      },
      {
        source: '/quiz/:path*',
        headers: [...ORIGIN_NO_STORE_HEADERS],
      },
      // Exam mocks are interactive (noindex) — never edge-cache soft-404 HTML
      {
        source: '/exams/:exam/mock-attempt/:mockId',
        headers: [...ORIGIN_NO_STORE_HEADERS],
      },
      {
        source: '/exams/:exam/mock/:mockId',
        headers: [...ORIGIN_NO_STORE_HEADERS],
      },
      {
        source: '/mpt-practice/:path*',
        headers: [...ORIGIN_NO_STORE_HEADERS],
      },
      {
        source: '/css/css-practice/:path*',
        headers: [...ORIGIN_NO_STORE_HEADERS],
      },
      // NO CACHE for PDF viewer pages - always fetch fresh
      {
        source: '/css/solved-papers/view',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
          },
          {
            key: 'Pragma',
            value: 'no-cache',
          },
          {
            key: 'Expires',
            value: '0',
          },
        ],
      },
      {
        source: '/css/past-papers/view',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
          },
          {
            key: 'Pragma',
            value: 'no-cache',
          },
          {
            key: 'Expires',
            value: '0',
          },
        ],
      },
      // SEO discovery files
      {
        source: '/robots.txt',
        headers: [{ key: 'Cache-Control', value: ROBOTS_CACHE_CONTROL }],
      },
      {
        source: '/sitemap.xml',
        headers: [
          { key: 'Cache-Control', value: SITEMAP_CACHE_CONTROL },
          { key: 'CDN-Cache-Control', value: 'max-age=86400' },
        ],
      },
      {
        source: '/sitemap-index',
        headers: [
          { key: 'Cache-Control', value: SITEMAP_CACHE_CONTROL },
          { key: 'CDN-Cache-Control', value: 'max-age=86400' },
        ],
      },
      {
        source: '/sitemap/:segment.xml',
        headers: [{ key: 'Cache-Control', value: SITEMAP_CACHE_CONTROL }],
      },
      {
        source: '/sitemap/mcq/:bank/:page.xml',
        headers: [{ key: 'Cache-Control', value: SITEMAP_CACHE_CONTROL }],
      },
      {
        source: '/mcq/:bank/:id',
        headers: [...SEO_CDN_CACHE_HEADERS],
      },
      {
        source: '/exams/:exam/:subject/:mode/set/:set',
        headers: [...SEO_CDN_CACHE_HEADERS],
      },
      {
        source: '/exams/:exam/:subject/difficulty/:level/set/:set',
        headers: [...SEO_CDN_CACHE_HEADERS],
      },
      {
        source: '/exams/:exam/:subject/topic/:tag/set/:set',
        headers: [...SEO_CDN_CACHE_HEADERS],
      },
      {
        source: '/mdcat/:subject/:topic/set/:set',
        headers: [...SEO_CDN_CACHE_HEADERS],
      },
      {
        source: '/fsc/:subject/:chapter/set/:set',
        headers: [...SEO_CDN_CACHE_HEADERS],
      },
      {
        source: '/imtehan-indexnow-key.txt',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=86400' }],
      },
      // Marketing / hub HTML — 7d edge cache (Cloudflare + Vercel CDN)
      // Exclude exam mock attempts (interactive / noindex) — see no-store rule above
      {
        source:
          '/((?!api|auth|profile|admin|signin|community|quiz|mpt-practice|css/css-practice|css/solved-papers/view|css/past-papers/view|css/guess-papers/view|exams/.+/mock-attempt/[0-9]+|exams/.+/mock/[0-9]+|_next/static|_next/image|favicon.ico).*)',
        headers: [{ key: 'Cache-Control', value: SEO_CLOUDFLARE_CACHE_CONTROL }],
      },
    ]
  },
};

// Export Next.js config
export default nextConfig;
