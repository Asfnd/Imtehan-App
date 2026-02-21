'use client'

import { useParams, useRouter } from 'next/navigation'
import {
  Target, Zap, Trophy, Award, Star, Sparkles, Flame, TrendingUp, Brain,
  BookOpen, Clock, Shield, Layers, BarChart2, Cpu, Activity, Crosshair,
  Flag, FileText, CheckCircle
} from 'lucide-react'
import { getExamConfig } from '@/lib/exam-configs'
import NavigationBar from '@/components/NavigationBar'

export default function MockTestsPage() {
  const params = useParams()
  const router = useRouter()
  const examSlug = params.examSlug as string
  const config = getExamConfig(examSlug)

  if (!config) {
    router.push('/exams')
    return null
  }

  const t  = config.totalMCQs
  const d  = config.duration
  const q  = (pct: number) => Math.round(t * pct)
  const m  = (pct: number) => Math.round(d * pct)

  // 20 mocks — sorted Standard → Advanced → Expert
  const mockTests = [
    // ── Standard (1–7) ──────────────────────────────────────────
    { id:  1, title: 'Mock Test 1',  description: 'Full exam simulation',      icon: Target,      questions: q(1),    difficulty: 'Standard', time: m(1)    },
    { id:  2, title: 'Mock Test 2',  description: 'Past paper pattern',         icon: FileText,    questions: q(1),    difficulty: 'Standard', time: m(1)    },
    { id:  3, title: 'Mock Test 3',  description: 'Subject-wise balanced',      icon: Layers,      questions: q(1),    difficulty: 'Standard', time: m(1)    },
    { id:  4, title: 'Mock Test 4',  description: 'Core concepts focus',        icon: BookOpen,    questions: q(1),    difficulty: 'Standard', time: m(1)    },
    { id:  5, title: 'Mock Test 5',  description: '75% length warm-up',         icon: Star,        questions: q(0.75), difficulty: 'Standard', time: m(0.75) },
    { id:  6, title: 'Mock Test 6',  description: 'Mixed topics sampler',       icon: Zap,         questions: q(0.75), difficulty: 'Standard', time: m(0.75) },
    { id:  7, title: 'Mock Test 7',  description: 'Quick 50% revision',         icon: Clock,       questions: q(0.5),  difficulty: 'Standard', time: m(0.5)  },
    // ── Advanced (8–14) ─────────────────────────────────────────
    { id:  8, title: 'Mock Test 8',  description: 'Advanced full simulation',   icon: TrendingUp,  questions: q(1),    difficulty: 'Advanced', time: m(1)    },
    { id:  9, title: 'Mock Test 9',  description: 'High-yield MCQ focus',       icon: Flame,       questions: q(1),    difficulty: 'Advanced', time: m(1)    },
    { id: 10, title: 'Mock Test 10', description: 'Comprehensive deep-dive',    icon: BarChart2,   questions: q(1),    difficulty: 'Advanced', time: m(1)    },
    { id: 11, title: 'Mock Test 11', description: '75% analytical test',        icon: Brain,       questions: q(0.75), difficulty: 'Advanced', time: m(0.75) },
    { id: 12, title: 'Mock Test 12', description: 'Speed & pressure test',      icon: Activity,    questions: q(0.5),  difficulty: 'Advanced', time: m(0.4)  },
    { id: 13, title: 'Mock Test 13', description: 'Intensive practice set',     icon: Trophy,      questions: q(1),    difficulty: 'Advanced', time: m(1)    },
    { id: 14, title: 'Mock Test 14', description: 'Rapid fire — 25% blitz',     icon: Crosshair,   questions: q(0.25), difficulty: 'Advanced', time: m(0.2)  },
    // ── Expert (15–20) ──────────────────────────────────────────
    { id: 15, title: 'Mock Test 15', description: 'Expert level full test',     icon: Shield,      questions: q(1),    difficulty: 'Expert',   time: m(1)    },
    { id: 16, title: 'Mock Test 16', description: 'Ultimate challenge',         icon: Award,       questions: q(1),    difficulty: 'Expert',   time: m(1)    },
    { id: 17, title: 'Mock Test 17', description: '75% champions drill',        icon: Cpu,         questions: q(0.75), difficulty: 'Expert',   time: m(0.75) },
    { id: 18, title: 'Mock Test 18', description: 'Final comprehensive review', icon: CheckCircle, questions: q(1),    difficulty: 'Expert',   time: m(1)    },
    { id: 19, title: 'Mock Test 19', description: 'Grand master simulation',    icon: Sparkles,    questions: q(1),    difficulty: 'Expert',   time: m(1)    },
    { id: 20, title: 'Mock Test 20', description: 'The final assessment',       icon: Flag,        questions: q(1),    difficulty: 'Expert',   time: m(1)    },
  ]

  const diffColor = (d: string) =>
    d === 'Expert' ? 'text-red-500' : d === 'Advanced' ? 'text-orange-500' : 'text-green-600'

  const diffGroups = ['Standard', 'Advanced', 'Expert']

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">Mock Tests</h1>
          <p className="text-gray-600">20 tests sorted by difficulty — start from Mock 1</p>
          <div className="mt-3 flex items-center justify-center gap-6 text-sm text-gray-600">
            <div><span className="font-semibold text-gray-900">20</span> mock tests</div>
            <div className="w-px h-4 bg-gray-300" />
            <div><span className="font-semibold text-gray-900">{d}m</span> max duration</div>
            <div className="w-px h-4 bg-gray-300" />
            <div><span className="font-semibold text-gray-900">{t}</span> MCQs full test</div>
          </div>
        </div>

        {diffGroups.map((group) => {
          const groupMocks = mockTests.filter((m) => m.difficulty === group)
          return (
            <div key={group} className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className={`text-sm font-semibold ${diffColor(group)}`}>{group}</span>
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-xs text-gray-400">{groupMocks.length} tests</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {groupMocks.map((mock) => {
                  const Icon = mock.icon
                  return (
                    <div
                      key={mock.id}
                      className="group relative bg-white rounded-lg border border-gray-200 hover:border-blue-400 shadow-sm hover:shadow-md hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer hover:-translate-y-1 overflow-hidden"
                      onClick={() => router.push(`/exams/${examSlug}/mock/${mock.id}`)}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div className="relative p-5 text-center">
                        <div className="w-10 h-10 mx-auto rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center mb-3 shadow-sm group-hover:scale-105 transition-all duration-300">
                          <Icon className="w-5 h-5 text-white" />
                        </div>

                        <h3 className="text-sm font-semibold text-gray-900 mb-1 group-hover:text-blue-900 transition-colors">{mock.title}</h3>
                        <p className="text-[11px] text-gray-500 mb-3">{mock.description}</p>

                        <div className="bg-blue-50 rounded-lg p-2.5 mb-3 border border-blue-100">
                          <div className="text-lg font-bold text-blue-600">{mock.questions}</div>
                          <div className="text-[10px] text-gray-500">
                            {mock.time}m • <span className={`font-semibold ${diffColor(mock.difficulty)}`}>{mock.difficulty}</span>
                          </div>
                        </div>

                        <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-1.5 px-3 rounded-md font-medium text-xs transition-all">
                          Start
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
