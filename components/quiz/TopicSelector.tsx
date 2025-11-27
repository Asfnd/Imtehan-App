'use client'

import { motion } from 'framer-motion'
import { BookOpen, Globe, Sparkles, TrendingUp, Calculator } from 'lucide-react'
import type { QuizTopic } from '@/lib/supabase/types'

interface TopicSelectorProps {
  onSelectTopic: (topic: QuizTopic) => void
}

const topics = [
  {
    name: 'Pakistan Affairs' as QuizTopic,
    icon: Globe,
    color: 'from-green-500 to-emerald-600',
    description: 'History, geography, and politics',
  },
  {
    name: 'Islamiat' as QuizTopic,
    icon: BookOpen,
    color: 'from-blue-500 to-indigo-600',
    description: 'Islamic studies and teachings',
  },
  {
    name: 'General Knowledge' as QuizTopic,
    icon: Sparkles,
    color: 'from-purple-500 to-pink-600',
    description: 'World facts and trivia',
  },
  {
    name: 'Current Affairs' as QuizTopic,
    icon: TrendingUp,
    color: 'from-orange-500 to-red-600',
    description: 'Recent events and news',
  },
  {
    name: 'Math' as QuizTopic,
    icon: Calculator,
    color: 'from-cyan-500 to-blue-600',
    description: 'Numbers and problem solving',
  },
]

export default function TopicSelector({ onSelectTopic }: TopicSelectorProps) {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold mb-2">Choose Your Topic</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Select a topic to start your personalized quiz
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {topics.map((topic, index) => {
          const Icon = topic.icon
          return (
            <motion.button
              key={topic.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelectTopic(topic.name)}
              className="relative overflow-hidden rounded-2xl p-6 text-left bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${topic.color} opacity-10`}
              />
              <div className="relative z-10">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${topic.color} flex items-center justify-center mb-4`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{topic.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {topic.description}
                </p>
              </div>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
