import type { NextConfig } from "next";
import path from "path";
import { PREMIUM_PAGE_PATH } from "./lib/routes";

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
  // Fix: multiple lockfiles warning — pin the tracing root to this project
  outputFileTracingRoot: path.join(__dirname),
  // Production optimizations
  productionBrowserSourceMaps: false, // Disable source maps in production for faster builds
  poweredByHeader: false, // Remove X-Powered-By header
  reactStrictMode: true, // Enable strict mode for better performance
  
  webpack: (config, { isServer, dev }) => {
    // Existing aliases for PDF.js
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    
    // Production optimizations
    if (!dev) {
      // Minimize bundle size
      config.optimization = {
        ...config.optimization,
        minimize: true,
        usedExports: true, // Tree shaking
        sideEffects: false, // Better tree shaking
      };
    }
    
    // Optimize bundle splitting
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: 25,
          minSize: 20000,
          cacheGroups: {
            // Framework chunk (React, React-DOM)
            framework: {
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
              name: 'framework',
              chunks: 'all',
              priority: 40,
              enforce: true,
            },
            // Lucide icons - separate chunk
            icons: {
              test: /[\\/]node_modules[\\/]lucide-react[\\/]/,
              name: 'icons',
              chunks: 'all',
              priority: 30,
            },
            // Separate react-pdf into its own chunk
            reactPdf: {
              test: /[\\/]node_modules[\\/](react-pdf|pdfjs-dist)[\\/]/,
              name: 'react-pdf',
              chunks: 'async', // Only load when needed
              priority: 25,
            },
            // Separate Supabase into its own chunk
            supabase: {
              test: /[\\/]node_modules[\\/]@supabase[\\/]/,
              name: 'supabase',
              chunks: 'async',
              priority: 20,
            },
            // Vendor chunks
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
              priority: 10,
            },
            // Common components chunk
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'all',
              priority: 5,
              reuseExistingChunk: true,
            },
          },
        },
      };
    }
    
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
        headers: [
          {
            key: 'Cache-Control',
            value: 'private, no-store',
          },
        ],
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
      // SEO discovery files — short CDN TTL so deploys propagate quickly
      {
        source: '/robots.txt',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=300, s-maxage=3600' }],
      },
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=60, s-maxage=300, stale-while-revalidate=600',
          },
          { key: 'CDN-Cache-Control', value: 'max-age=300' },
        ],
      },
      {
        source: '/sitemap-index',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=60, s-maxage=300, stale-while-revalidate=600',
          },
          { key: 'CDN-Cache-Control', value: 'max-age=300' },
        ],
      },
      {
        source: '/sitemap/:segment.xml',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=300, s-maxage=3600' }],
      },
      {
        source: '/imtehan-indexnow-key.txt',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=86400' }],
      },
      // Cache pages with stale-while-revalidate
      {
        source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800',
          },
        ],
      },
    ]
  },
};

// Export Next.js config
export default nextConfig;
