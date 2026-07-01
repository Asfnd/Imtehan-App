'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'

const FAQ_ITEMS = [
  {
    q: 'How do I get started?',
    a: 'Sign up with your Google account and you\'ll have instant access to all practice materials. No credit card required. You can start practicing within seconds.',
  },
  {
    q: 'Is there a free trial?',
    a: 'Yes! You can try the platform with limited access to get a feel for how it works before committing. After using your free questions, you can sign up to continue practicing.',
  },
  {
    q: 'What exams can I prepare for?',
    a: 'Imtehan covers 230+ exams: CSS MPT, PMS, PPSC, FPSC, FIA, ISSB, MDCAT (PMC/NUMS/AKU/UHS), engineering entry tests, NTS/OTS, police, military, banks, and more  -  with 170,000+ MCQs and detailed explanations.',
  },
  {
    q: 'Can I track my progress?',
    a: 'Absolutely. Our analytics show your performance by subject, question type, and time spent. You\'ll see exactly where you need to improve with detailed insights.',
  },
  {
    q: 'Is the content updated regularly?',
    a: 'Yes, we add new questions and past papers regularly to keep the content current and relevant. Our team continuously updates the platform based on latest exam patterns.',
  },
  {
    q: 'Works on mobile?',
    a: 'Yes, fully responsive on all devices - phones, tablets, and desktops. Practice anywhere, anytime. Your progress syncs across all your devices automatically.',
  },
  {
    q: 'Are explanations included?',
    a: 'Every single question includes detailed explanations that not only tell you the answer, but WHY that\'s the correct answer. We go beyond just MCQ solutions.',
  },
  {
    q: 'How is this different from other platforms?',
    a: 'We focus on authentic content, detailed explanations, real past papers, and meaningful analytics. We don\'t use AI-generated questions or shortcuts. Quality over quantity.',
  },
]

interface FAQItemProps {
  q: string
  a: string
  index: number
  isOpen: boolean
  onToggle: () => void
}

const FAQItem = ({ q, a, isOpen, onToggle }: FAQItemProps) => {
  return (
    <motion.div
      layout
      className="border border-gray-200 rounded-xl overflow-hidden bg-white hover:border-blue-300 hover:shadow-md transition-all duration-300"
    >
      <button
        onClick={onToggle}
        className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-gray-900 text-lg">{q}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-5 h-5 text-blue-600 flex-shrink-0" />
        </motion.div>
      </button>

      <motion.div
        initial={false}
        animate={isOpen ? { height: 'auto' } : { height: 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
          <p className="text-gray-700 leading-relaxed">{a}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 bg-blue-100 rounded-full border border-blue-200 mb-4">
            <span className="text-sm font-semibold text-blue-700">Common Questions</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-950 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to know about our exam preparation platform
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, index) => (
            <FAQItem
              key={index}
              q={item.q}
              a={item.a}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
