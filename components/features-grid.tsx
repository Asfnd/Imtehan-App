'use client'

import { BookOpen, Target, BarChart3, Clock, Zap, Users } from 'lucide-react'

const FEATURES = [
  {
    title: 'Question Bank',
    description: '100,000+ MCQs with detailed explanations across 20+ exams',
    icon: BookOpen,
    size: 'lg',
  },
  {
    title: 'Real Exam Papers',
    description: 'Practice with official past papers to understand question patterns',
    icon: Target,
    size: 'lg',
  },
  {
    title: 'Progress Analytics',
    description: 'Track performance across subjects and identify weak areas',
    icon: BarChart3,
    size: 'lg',
  },
  {
    title: 'Timed Mock Tests',
    description: 'Simulate real exam conditions with auto-grading',
    icon: Clock,
    size: 'sm',
  },
  {
    title: 'Instant Feedback',
    description: 'Get solutions explained step-by-step',
    icon: Zap,
    size: 'sm',
  },
  {
    title: 'Collaborative Community',
    description: 'Learn with other aspirants and share insights',
    icon: Users,
    size: 'sm',
  },
]

const FeatureCard = ({
  title,
  description,
  icon: Icon,
  size,
}: {
  title: string
  description: string
  icon: any
  size: string
}) => {
  const isLarge = size === 'lg'

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-gray-200/80 bg-gradient-to-br from-white to-blue-50/30 p-6 transition-all duration-300 hover:border-blue-400/60 hover:shadow-xl hover:shadow-blue-200/20 cursor-pointer transform hover:-translate-y-1 ${
        isLarge ? 'md:col-span-1' : 'md:col-span-1'
      }`}
    >
      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Animated accent line */}
      <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-blue-600 to-blue-400 w-0 group-hover:w-full transition-all duration-700" />

      <div className="relative z-10 space-y-4">
        <div className="inline-block p-3 bg-gradient-to-br from-blue-100/80 to-blue-50 rounded-xl group-hover:from-blue-200 group-hover:to-blue-100 transition-all duration-300 shadow-sm group-hover:shadow-md">
          <Icon className="w-6 h-6 text-blue-600 group-hover:text-blue-700 transition-colors" />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">{title}</h3>
          <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors">{description}</p>
        </div>
      </div>
    </div>
  )
}

export function FeaturesGrid() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 bg-blue-100 rounded-full border border-blue-200 mb-4">
            <span className="text-sm font-semibold text-blue-700">Platform Features</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-950 mb-4">
            Built for Exam Preparation
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Practice tools that match how Pakistan's competitive exams actually work
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  )
}
