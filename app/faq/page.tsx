'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, BookOpen, HelpCircle } from 'lucide-react'
import NavigationBar from '@/components/NavigationBar'

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: "What is Imtehan?",
    answer: "Imtehan is a comprehensive online learning platform designed to help students prepare for competitive examinations like CSS, FPSC, and more. We provide practice tests, past papers, detailed analytics, and personalized learning paths."
  },
  {
    question: "How does the free trial work?",
    answer: "Guest users can try our platform with limited credits (3 CSS quizzes, 1 idiom quiz, 1 MPT test, and 3 past papers). After signing in with Google, you get additional credits to explore more features. For unlimited access, upgrade to Premium."
  },
  {
    question: "What's included in the Premium plan?",
    answer: "Premium subscribers get unlimited access to all practice quizzes, solved past papers with detailed explanations, advanced analytics to track progress and identify weak areas, priority support, and access to all subjects and topics without any restrictions."
  },
  {
    question: "How do I activate my Premium subscription?",
    answer: "After making payment via bank transfer or EasyPaisa, send your payment screenshot along with your registered email to our WhatsApp number. We'll activate your premium account within 30 minutes during working hours (9 AM - 11 PM)."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept payments through UBL Bank transfer (IBAN: PK16UNIL0109000339614961) and EasyPaisa (0304-4244421). Simply transfer the amount and send the screenshot via WhatsApp to +92 326 7426824."
  },
  {
    question: "Can I cancel my Premium subscription?",
    answer: "Premium subscriptions are non-refundable. However, you can choose not to renew when your current subscription period ends. Your premium access will continue until the expiration date."
  },
  {
    question: "How are the practice questions created?",
    answer: "Our practice questions are curated by subject matter experts and are based on past CSS examination papers. They follow the same pattern, difficulty level, and format as actual CSS exams to give you the most realistic practice experience."
  },
  {
    question: "Can I access Imtehan on my mobile phone?",
    answer: "Yes! Imtehan is fully responsive and works seamlessly on all devices - desktop, tablet, and mobile phones. You can practice anytime, anywhere with an internet connection."
  },
  {
    question: "How do analytics help me improve?",
    answer: "Our analytics feature tracks your performance across subjects, identifies your weak areas, shows your improvement trends, and provides personalized recommendations. This data-driven approach helps you focus your study efforts where they're needed most."
  },
  {
    question: "What is the CSS Eligibility Checker?",
    answer: "The CSS Eligibility Checker is a free tool that helps you verify if you meet the requirements for CSS 2026 examination. It checks your age, education, citizenship, domicile, and previous attempts to determine your eligibility status."
  },
  {
    question: "Are the solved papers available for all subjects?",
    answer: "Solved papers with detailed explanations are available for core CSS subjects including Islamic Studies, Pakistan Affairs, English (Précis & Composition), Current Affairs, and more. This is a Premium feature."
  },
  {
    question: "How often is new content added?",
    answer: "We regularly update our question bank and add new past papers as they become available. Premium users also get early access to newly added content and subjects."
  },
  {
    question: "Can I track my study streak?",
    answer: "Yes! Signed-in users can track their daily study streak, which motivates consistent practice. The longer your streak, the better your chances of success!"
  },
  {
    question: "Is there a money-back guarantee?",
    answer: "Due to the digital nature of our content, we don't offer refunds. However, we encourage you to use the free trial to explore the platform before upgrading to Premium."
  },
  {
    question: "How do I contact support?",
    answer: "You can reach us through the Contact page on our website, or send us a message on WhatsApp at +92 326 7426824. Premium users get priority support with faster response times."
  },
  {
    question: "Will my data be secure?",
    answer: "Absolutely! We use industry-standard security measures to protect your data. We don't share your personal information with third parties. Read our Privacy Policy for more details."
  }
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <main className="min-h-screen bg-[#F9FAFB]">
      <NavigationBar />

      {/* Hero Section */}
      <section className="relative bg-white border-b">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16 md:py-20 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-100 mb-6">
            <HelpCircle className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about Imtehan, our features, pricing, and how to get started
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 group"
                >
                  <span className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-200 ${
                      openIndex === index ? 'rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-200 ${
                    openIndex === index ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="px-6 pb-5 pt-0">
                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-white border-t">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Still have questions?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Our support team is here to help. Reach out and we'll get back to you as soon as possible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg"
            >
              Contact Support
            </Link>
            <Link
              href="/css"
              className="inline-flex items-center justify-center px-8 py-3 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-all"
            >
              Start Practicing
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-16 bg-[#F9FAFB]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-6 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-white" />
                </div>
                <span className="font-semibold">Imtehan</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Practice smarter and score higher on competitive exams
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">Practice Tests</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/css" className="text-muted-foreground hover:text-foreground transition-colors">
                    CSS
                  </Link>
                </li>
                <li>
                  <Link href="/mpt-practice" className="text-muted-foreground hover:text-foreground transition-colors">
                    MPT Practice
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">Account</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/signin" className="text-muted-foreground hover:text-foreground transition-colors">
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link href="/css/premium" className="text-muted-foreground hover:text-foreground transition-colors">
                    Premium
                  </Link>
                </li>
                <li>
                  <Link href="/profile" className="text-muted-foreground hover:text-foreground transition-colors">
                    Profile
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">Help</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">Legal</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-4 flex justify-center items-center">
            <p className="text-sm text-muted-foreground">&copy; 2025 Imtehan. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
