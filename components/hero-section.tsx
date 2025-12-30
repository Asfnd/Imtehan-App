'use client'

import { Button } from '@/components/ui/Button'
import { SmartCTAButton } from '@/components/seo/SmartCTAButton'
import Link from 'next/link'
import React from 'react'

export function HeroSection() {
  return (
    <section className="relative w-full h-[500px] md:h-[600px] lg:h-[750px] rounded-3xl overflow-hidden mb-12">
      {/* SVG Background with Grid Pattern */}
      <div className="absolute inset-0 z-0">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1280 750"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* Gradient background */}
            <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 0.02 }} />
              <stop offset="100%" style={{ stopColor: '#1e40af', stopOpacity: 0.05 }} />
            </linearGradient>

            {/* Gradient overlays */}
            <linearGradient id="gradientL" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" style={{ stopColor: '#1e40af', stopOpacity: 0.1 }} />
              <stop offset="100%" style={{ stopColor: '#1e40af', stopOpacity: 0 }} />
            </linearGradient>

            <radialGradient id="radialGrad" cx="40%" cy="20%">
              <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 0.15 }} />
              <stop offset="100%" style={{ stopColor: '#1e40af', stopOpacity: 0 }} />
            </radialGradient>
          </defs>

          {/* Background fill */}
          <rect width="1280" height="750" fill="url(#bgGradient)" />

          {/* Grid pattern */}
          {[...Array(40)].map((_, i) => (
            <React.Fragment key={`row-${i}`}>
              {[...Array(35)].map((_, j) => (
                <rect
                  key={`grid-${i}-${j}`}
                  x={j * 36}
                  y={i * 30}
                  width="35"
                  height="30"
                  fill="none"
                  stroke="rgba(30, 64, 175, 0.08)"
                  strokeWidth="0.5"
                />
              ))}
            </React.Fragment>
          ))}

          {/* Accent circles */}
          <circle cx="900" cy="150" r="120" fill="url(#radialGrad)" />
          <circle cx="200" cy="600" r="100" fill="url(#gradientL)" opacity="0.5" />

          {/* Decorative shapes */}
          <rect
            x="100"
            y="100"
            width="60"
            height="60"
            fill="rgba(59, 130, 246, 0.08)"
            rx="8"
          />
          <rect
            x="1100"
            y="500"
            width="80"
            height="80"
            fill="rgba(59, 130, 246, 0.06)"
            rx="12"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 py-20 text-center">
        <div className="space-y-6 max-w-4xl">
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-50 to-blue-100/50 rounded-full border border-blue-200/60 hover:border-blue-300 transition-colors cursor-default group">
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-700 to-blue-600 bg-clip-text text-transparent group-hover:from-blue-800 group-hover:to-blue-700 transition-all">Master Competitive Exams</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-gray-950 leading-tight space-y-2">
            <div>Your Path to Success</div>
            <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent">
              Starts Here
            </div>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Thousands of authentic practice questions, official past papers, detailed explanations, and intelligent analytics. Everything designed for serious exam preparation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <SmartCTAButton variant="primary" className="text-base md:text-lg px-8 py-3 shadow-lg hover:shadow-xl transition-all">
              Start Free Trial
            </SmartCTAButton>
            <Link href="/css">
              <Button
                variant="outline"
                className="text-base md:text-lg px-8 py-3 border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600 transition-all shadow-sm hover:shadow-md"
              >
                View CSS Resources
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-col sm:flex-row gap-8 justify-center pt-12 text-gray-700">
            <div className="flex flex-col items-center group cursor-default">
              <span className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-blue-800 transition-all">10,000+</span>
              <span className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors">Practice Questions</span>
            </div>
            <div className="flex flex-col items-center group cursor-default">
              <span className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-blue-800 transition-all">500+</span>
              <span className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors">Official Past Papers</span>
            </div>
            <div className="flex flex-col items-center group cursor-default">
              <span className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-blue-800 transition-all">20+</span>
              <span className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors">Comprehensive Subjects</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
