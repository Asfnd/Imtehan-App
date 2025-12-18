import type { NextConfig } from "next";

const securityHeaders = [
  // Temporarily disable CSP to fix profile images
  // {
  //   key: 'Content-Security-Policy',
  //   value: [
  //     "default-src 'self'",
  //     "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live https://cdnjs.cloudflare.com",
  //     "style-src 'self' 'unsafe-inline'",
  //     "img-src 'self' data: https: blob: https://lh3.googleusercontent.com",
  //     "font-src 'self' data:",
  //     "connect-src 'self' https://*.supabase.co wss://*.supabase.co",
  //     "frame-src 'self'",
  //     "worker-src 'self' blob:",
  //     "child-src 'self' blob:",
  //     "frame-ancestors 'none'",
  //     "base-uri 'self'",
  //     "form-action 'self'",
  //     "upgrade-insecure-requests",
  //   ].join('; '),
  // },
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
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
  // Temporarily disable CORS restrictions to fix profile images
  // {
  //   key: 'Cross-Origin-Embedder-Policy',
  //   value: 'require-corp',
  // },
  // {
  //   key: 'Cross-Origin-Opener-Policy',
  //   value: 'same-origin',
  // },
  // {
  //   key: 'Cross-Origin-Resource-Policy',
  //   value: 'same-origin',
  // },
]

const nextConfig: NextConfig = {
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
              chunks: 'all',
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
    ],
  },
  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  turbopack: {
    // Empty config to silence the warning
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders.filter(h => h.key !== 'Content-Security-Policy'),
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
      // Cache API routes with shorter duration
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=300, s-maxage=600',
          },
        ],
      },
      // NO CACHE for PDF viewer pages - always fetch fresh
      {
        source: '/solved-papers/view',
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
        source: '/past-papers/view',
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
      // Cache pages with stale-while-revalidate
      {
        source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800',
          },
          // Force cache invalidation for development
          {
            key: 'X-Cache-Bust',
            value: Date.now().toString(),
          },
        ],
      },
    ]
  },
};

export default nextConfig;
