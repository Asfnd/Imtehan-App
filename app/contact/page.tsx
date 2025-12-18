'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, MessageCircle, Mail, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react'

export default function ContactPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', subject: 'general', message: '' })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const openWhatsApp = () => {
    const message = formData.message 
      ? `Hi! I'm ${formData.name}. ${formData.message}`
      : `Hi! I need help with CSS preparation.`
    const whatsappUrl = `https://wa.me/923267426824?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const faqData = [
    {
      question: "How do I access the CSS practice questions?",
      answer: "Navigate to the dashboard and click on 'Past CSS MCQs' to start practicing. You'll have instant access to over 2,500+ authentic questions across 50+ subjects, organized by year and topic for systematic preparation."
    },
    {
      question: "Do I need to create an account?",
      answer: "While you can access limited features without an account, creating a free account unlocks unlimited access to all past papers, MCQs, solved papers, and personalized progress tracking. Sign up takes less than 30 seconds!"
    },
    {
      question: "Is this platform free to use?",
      answer: "Yes! Our platform is completely free for all CSS aspirants. We believe quality education should be accessible to everyone. All past papers, MCQs, and study materials are available at no cost."
    },
    {
      question: "What is the CSS eligibility criteria?",
      answer: "To be eligible for CSS, you must: (1) Be a Pakistani citizen, (2) Be between 21-30 years of age, (3) Hold at least a Bachelor's degree from a recognized university, (4) Not have attempted CSS more than 3 times. Use our eligibility checker for instant verification!"
    },
    {
      question: "How many attempts do I have for CSS?",
      answer: "You can attempt the CSS examination a maximum of 3 times. Each attempt must be within the age limit of 21-30 years. Our eligibility checker helps you track your remaining attempts and plan your preparation accordingly."
    },
    {
      question: "What subjects are compulsory in CSS?",
      answer: "CSS has 6 compulsory subjects: (1) English Essay, (2) English Precis & Composition, (3) General Science & Ability, (4) Current Affairs, (5) Pakistan Affairs, (6) Islamic Studies (or Comparative Study of Major Religions for non-Muslims). Each carries 100 marks."
    },
    {
      question: "How many optional subjects should I choose?",
      answer: "You must select 6 optional subjects from the available list. Each optional subject carries 100 marks. Choose subjects based on your academic background, interest, and scoring potential. We recommend consulting with successful CSS officers or mentors."
    },
    {
      question: "Are the past papers authentic?",
      answer: "Absolutely! All our past papers are 100% authentic and sourced directly from official CSS examinations conducted by FPSC. We have papers dating back to 1973, giving you comprehensive historical perspective and pattern analysis."
    },
    {
      question: "Do you provide solved papers?",
      answer: "Yes! We provide detailed solutions for all compulsory subjects including English Essay, English Precis & Composition, General Science & Ability, Current Affairs, Pakistan Affairs, and Islamic Studies. Solutions are prepared by CSS qualified officers and subject experts."
    },
    {
      question: "How often is the content updated?",
      answer: "We update our database immediately after each CSS examination. New past papers, MCQs, and current affairs content are added regularly. Our team ensures you always have access to the latest and most relevant study material."
    },
    {
      question: "Can I download the past papers?",
      answer: "Yes, all past papers are available for viewing and can be accessed anytime. We recommend studying them online for the best experience, but you can also save them for offline reference."
    },
    {
      question: "I'm having trouble accessing papers. What should I do?",
      answer: "First, try refreshing your browser or clearing cache. If the issue persists, contact us via WhatsApp with details about the problem (which paper, error message, etc.). Our technical team responds within 24 hours."
    },
    {
      question: "Which browsers are supported?",
      answer: "Our platform works best on modern browsers including Google Chrome, Mozilla Firefox, Safari, and Microsoft Edge. We recommend using the latest version for optimal performance. Mobile browsers are fully supported too!"
    },
    {
      question: "Can I use this on my mobile phone?",
      answer: "Absolutely! Our platform is fully responsive and optimized for mobile devices. You can practice MCQs, read past papers, and access all features seamlessly on your smartphone or tablet."
    },
    {
      question: "How should I start my CSS preparation?",
      answer: "Start by: (1) Checking your eligibility, (2) Understanding the CSS syllabus and pattern, (3) Selecting your optional subjects wisely, (4) Creating a study schedule, (5) Practicing past papers regularly. Use our MCQ section to test your knowledge and identify weak areas."
    },
    {
      question: "How important are past papers?",
      answer: "Past papers are crucial! They help you understand: (1) Examination pattern and question types, (2) Important topics and their weightage, (3) Time management skills, (4) Answer writing techniques. We recommend solving at least 10 years of past papers for each subject."
    },
    {
      question: "Should I focus more on MCQs or subjective preparation?",
      answer: "Both are equally important! MCQs test your conceptual understanding and speed, while subjective papers assess your analytical and writing skills. Allocate time for both - practice MCQs daily and write at least 2-3 essays/answers weekly."
    },
    {
      question: "How can I get personalized guidance?",
      answer: "Contact us via WhatsApp for one-on-one guidance. Our team includes CSS qualified officers who can provide personalized advice on subject selection, preparation strategy, and answer writing techniques."
    },
    {
      question: "Do you offer any courses or coaching?",
      answer: "Currently, we provide free self-study resources. However, we're planning to launch online courses and mentorship programs soon. Contact us to stay updated about upcoming offerings!"
    },
    {
      question: "How can I report an error or suggest improvements?",
      answer: "We appreciate your feedback! Use the contact form to report errors, suggest features, or share your experience. You can also reach us directly via WhatsApp. Every suggestion helps us improve!"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-300 to-indigo-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-40 h-40 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/3 w-36 h-36 bg-gradient-to-r from-indigo-300 to-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10">
        {/* Compact Header */}
        <div className="bg-white/90 backdrop-blur-md border-b border-indigo-200/50 sticky top-0 z-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
            <div className="flex items-center justify-between">
              <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition-colors px-3 py-2 rounded-lg hover:bg-indigo-50"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="font-medium">Back</span>
              </button>
              <h1 className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Contact & Support</h1>
              <div className="w-16"></div>
            </div>
          </div>
        </div>

        {/* Main Content - Single Screen Layout */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
          
          {/* Hero Section - Enhanced */}
          <div className="text-center mb-10">
            <div className="inline-block mb-4">
              <span className="text-5xl">📞</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
              We're Here to Help You Succeed
            </h1>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
              Have questions about CSS preparation? Need technical support? Want personalized guidance? 
              Our team of CSS qualified officers and experts is ready to assist you.
            </p>
            <div className="flex items-center justify-center gap-6 mt-6 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                <span>Available 24/7</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-500">✓</span>
                <span>Quick Response</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-500">✓</span>
                <span>Expert Guidance</span>
              </div>
            </div>
          </div>

          {/* Quick Info Cards */}
          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all">
              <div className="text-3xl mb-3">⚡</div>
              <div className="text-2xl font-bold mb-1">24/7</div>
              <div className="text-blue-100 text-sm">Available Round the Clock</div>
            </div>
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all">
              <div className="text-3xl mb-3">💬</div>
              <div className="text-2xl font-bold mb-1">Instant</div>
              <div className="text-emerald-100 text-sm">Quick Response Time</div>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all">
              <div className="text-3xl mb-3">🎓</div>
              <div className="text-2xl font-bold mb-1">Expert</div>
              <div className="text-purple-100 text-sm">CSS Qualified Team</div>
            </div>
          </div>

          {/* Two-Column Layout - WhatsApp Left, Form Right */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            
            {/* Left Column - WhatsApp Support */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-emerald-200/60 hover:shadow-2xl transition-all duration-300 h-fit">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-6">
                  <MessageCircle className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-3">WhatsApp Support</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Get instant help with your CSS preparation. Our team of CSS qualified officers is ready to assist you with personalized guidance.
                </p>
                
                <div className="bg-emerald-50 rounded-xl p-4 mb-6 text-left">
                  <div className="text-sm font-semibold text-emerald-800 mb-3">What we can help with:</div>
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 mt-0.5">✓</span>
                      <span>Subject selection guidance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 mt-0.5">✓</span>
                      <span>Preparation strategy & planning</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 mt-0.5">✓</span>
                      <span>Answer writing techniques</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 mt-0.5">✓</span>
                      <span>Study material recommendations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 mt-0.5">✓</span>
                      <span>Technical support & troubleshooting</span>
                    </li>
                  </ul>
                </div>
                
                <button
                  onClick={openWhatsApp}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white py-4 px-8 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl active:scale-95 text-lg mb-3"
                >
                  💬 Start WhatsApp Chat
                </button>
                <p className="text-xs text-slate-500">Average response time: Under 2 hours</p>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-indigo-200/60">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-4">
                  <Mail className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Send Us a Message</h3>
                <p className="text-slate-600">Fill out the form below and we'll get back to you within 24 hours</p>
              </div>
              
              {submitStatus === 'success' && (
                <div className="mb-4 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🎉</span>
                    <div>
                      <div className="font-semibold text-emerald-800">Message Sent!</div>
                      <div className="text-sm text-emerald-700">We'll get back to you soon.</div>
                    </div>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-4 p-4 bg-rose-50 border border-rose-200 rounded-xl">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">😔</span>
                    <div>
                      <div className="font-semibold text-rose-800">Failed to Send</div>
                      <div className="text-sm text-rose-700">Try WhatsApp instead.</div>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Subject</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all"
                  >
                    <option value="general">💬 General Inquiry</option>
                    <option value="technical">🔧 Technical Support</option>
                    <option value="css-help">📚 CSS Preparation Help</option>
                    <option value="eligibility">✅ Eligibility Questions</option>
                    <option value="feedback">💡 Feedback & Suggestions</option>
                    <option value="partnership">🤝 Partnership Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all resize-none"
                    placeholder="How can we help you with CSS preparation?"
                    required
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:from-slate-400 disabled:to-slate-500 text-white py-3 px-6 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl active:scale-95 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? '📤 Sending...' : '📝 Send Message'}
                  </button>
                  <button
                    type="button"
                    onClick={openWhatsApp}
                    className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white py-3 px-6 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl active:scale-95"
                  >
                    💬
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* FAQ Section - Clean and Professional */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-purple-200/60">
            <div className="text-center mb-10">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-500 rounded-3xl flex items-center justify-center shadow-2xl mx-auto mb-6 transform hover:scale-105 transition-transform">
                <HelpCircle className="w-12 h-12 text-white" strokeWidth={2.5} />
              </div>
              <h2 className="text-3xl font-bold text-slate-800 mb-3">Frequently Asked Questions</h2>
              <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                Everything you need to know about CSS preparation, our platform, and how we can help you succeed
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 mb-10">
              {faqData.map((faq, index) => (
                <div key={index} className="border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-all hover:border-purple-300 bg-white">
                  <button
                    onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                    className="w-full px-5 py-4 text-left flex items-start justify-between hover:bg-purple-50 transition-colors group"
                  >
                    <span className="font-semibold text-slate-800 pr-3 leading-snug group-hover:text-purple-700 transition-colors">
                      {faq.question}
                    </span>
                    {expandedFAQ === index ? (
                      <ChevronUp className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5 group-hover:text-purple-500 transition-colors" />
                    )}
                  </button>
                  {expandedFAQ === index && (
                    <div className="px-5 pb-5 text-slate-600 border-t border-purple-100 bg-gradient-to-b from-purple-50/50 to-white">
                      <p className="pt-4 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="text-center bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-8 border border-purple-200">
              <h4 className="text-xl font-bold text-slate-800 mb-2">Still Have Questions?</h4>
              <p className="text-slate-600 mb-6">
                Can't find what you're looking for? Our team is always ready to help you with any queries.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={openWhatsApp}
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white py-3 px-8 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Chat on WhatsApp</span>
                </button>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-3 px-8 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center gap-2"
                >
                  <Mail className="w-5 h-5" />
                  <span>Send Message</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}