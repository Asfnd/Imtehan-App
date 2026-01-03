import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Calendar } from 'lucide-react'
import NavigationBar from '@/components/NavigationBar'
import { ArticleSchema } from '@/components/seo/StructuredData'

export const metadata: Metadata = {
  title: 'CSS Optional Subjects Guide: Choose Smart | Imtehan',
  description: 'Complete guide to choosing and preparing for CSS optional subjects. Compare history, geography, economics, sociology, political science and more.',
  alternates: { canonical: 'https://imtehan.com/blog/css-optional-subjects-guide' },
  openGraph: { title: 'CSS Optional Subjects Guide', description: 'Smart guide to choosing CSS optional subjects.', url: 'https://imtehan.com/blog/css-optional-subjects-guide', type: 'article', publishedTime: '2024-12-21T00:00:00Z' },
}

export default function BlogPost() {
  return (
    <main className="min-h-screen bg-[#F9FAFB]">
      <ArticleSchema title="CSS Optional Subjects Guide" description="Guide to choosing CSS optional subjects." content="CSS allows choice of two optional subjects from approved list. Selection is critical - wrong choice can jeopardize entire preparation. Available subjects: History, Geography, Economics, Political Science, Sociology, Law, Philosophy, Journalism, Psychology, Commerce, Agriculture, Geology. Subject selection criteria: Interest and aptitude, overlapping content with compulsory subjects, resource availability, teacher guidance, previous academic strength. Top choices and why: History - connects to current affairs and Pakistan affairs, naturally overlaps with compulsory subjects, abundant resources, essays are easier. Geography - synergy with current affairs, visual understanding easier, moderate depth required. Economics - overlaps with banking/finance questions, develops analytical thinking, helps in policy analysis. Political Science - directly relevant to Pakistan affairs, supports Islamic political concepts, essay-oriented. Sociology - developing field, good for essays, psychological understanding. Best strategy: Choose subjects with natural overlap with compulsory subjects to maximize efficiency. Avoid: Subjects requiring additional language skills, subjects with scarce local resources, subjects far from your interest. Time allocation: 20-25 hours per week per subject (total 40-50 hours). Scoring potential: Each optional subject offers 100 marks - this is where you can excel above competition. Quality resources: Use textbooks, past papers, coaching notes, online lectures. Practice: Solve minimum 200 MCQs per subject monthly. Success depends on matching your aptitude with subject choice!" publishDate="2024-12-21" url="https://imtehan.com/blog/css-optional-subjects-guide" />
      <NavigationBar />
      <article className="max-w-3xl mx-auto px-6 lg:px-8 py-12">
        <Link href="/blog" className="inline-flex items-center gap-2 text-blue-600 mb-6"><ArrowLeft className="w-4 h-4" /> Back</Link>
        <h1 className="text-4xl font-bold mb-6">CSS Optional Subjects Guide: Choose Smart</h1>
        <div className="flex gap-8 text-gray-600 mb-8 pb-8 border-b">
          <div className="flex items-center gap-2"><Calendar className="w-5 h-5" /><span>December 21, 2024</span></div>
          <div className="flex items-center gap-2"><Clock className="w-5 h-5" /><span>11 min read</span></div>
        </div>
        <p className="text-gray-700 leading-relaxed">CSS allows candidates to choose two optional subjects. This choice is critical - selecting subjects aligned with your strengths and interests can significantly boost your overall score. Available optional subjects: History, Geography, Economics, Political Science, Sociology, Law, Philosophy, Journalism, Psychology, Commerce, Agriculture, Geology. Criteria for subject selection: 1) Interest and passion for the subject, 2) Overlap with compulsory subjects reduces preparation load, 3) Resource availability (good textbooks and coaching), 4) Teacher guidance and peer recommendations, 5) Previous academic performance in that subject. Most popular and recommended choices: History - strong connection to current affairs and Pakistan affairs, abundant resources available, essay-oriented suits CSS format, natural overlaps reduce work. Geography - synergy with current affairs knowledge, visual understanding easier than rote memorization, moderate depth required. Economics - overlaps with banking/finance topics, develops analytical skills, helps understand government policies. Political Science - directly relevant to Pakistan affairs and Islamic political concepts, essay-oriented format. Strategy: Choose subjects with natural overlap with compulsory subjects like Pakistan Affairs and Islamic Studies to maximize efficiency. Avoid: Subjects requiring additional language skills, subjects with limited local resources, subjects far from your interest area. Time allocation: 20-25 hours weekly per optional subject (40-50 hours total). Scoring potential: Each optional = 100 marks, this is where you can excel above competition. Success depends on thoughtful subject selection matching your aptitude!</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4 mb-6">
          <div className="border-l-4 border-blue-500 pl-4">
            <p className="font-bold text-gray-900 mb-2">Q: Can I change optional subjects after enrollment?</p>
            <p className="text-gray-700">Technically no, but practically yes before first exam. Contact exam board before registration closes. Some candidates change subjects after first mock test if performance is poor. Timeline: Must decide and register 3-4 months before written exam. Don't postpone decision—changing mid-preparation wastes effort.</p>
          </div>
          <div className="border-l-4 border-blue-500 pl-4">
            <p className="font-bold text-gray-900 mb-2">Q: Is it wise to choose both optionals from same domain (e.g., History + Geography)?</p>
            <p className="text-gray-700">Depends on overlap benefit. History + Geography have 30% overlap (Asia, wars, events). Similar subjects reduce total study hours but limit diversity. Strategy: If you excel at humanities, choose complementary subjects (History + Political Science). If weak in one area, choose two from same domain to leverage resources. Avoid: Two completely unrelated subjects if starting late.</p>
          </div>
          <div className="border-l-4 border-blue-500 pl-4">
            <p className="font-bold text-gray-900 mb-2">Q: What's the scoring potential for optional subjects?</p>
            <p className="text-gray-700">Each optional subject = 100 marks × 2 = 200 total marks (14% of total 1400). Strong performance here differentiates top candidates. Realistic targets: Average candidate 55-65 per optional (110-130 total). Good preparation 70+ per optional (140+ total). Exceptional 80+ (160+). Unlike compulsories where competition is fierce, optionals allow relative advantage if chosen wisely.</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-4">Subject-Specific Guides</h2>
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <Link href="/blog/css-exam-preparation-guide-2025" className="group p-4 bg-blue-50 rounded border border-blue-200 hover:border-blue-400 transition-all">
            <h3 className="font-bold text-gray-900 group-hover:text-blue-600 mb-2">Complete Exam Prep Guide</h3>
            <p className="text-sm text-gray-600">Overall strategy including optional subject selection</p>
          </Link>
          <Link href="/blog/how-to-crack-css-first-attempt" className="group p-4 bg-blue-50 rounded border border-blue-200 hover:border-blue-400 transition-all">
            <h3 className="font-bold text-gray-900 group-hover:text-blue-600 mb-2">Crack CSS First Attempt</h3>
            <p className="text-sm text-gray-600">Strategies including optional subject focus</p>
          </Link>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg mt-8">
          <h3 className="font-semibold mb-2">Prepare all optional subjects</h3>
          <p className="text-gray-700 mb-4">Practice thousands of MCQs across all optional subjects on Imtehan.</p>
          <div className="flex gap-3">
            <Link href="/css/css-practice/subjects" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">Practice Now</Link>
            <Link href="/css/past-papers" className="inline-block bg-white text-blue-600 border border-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50">View Past Papers</Link>
          </div>
        </div>
      </article>
    </main>
  )
}
