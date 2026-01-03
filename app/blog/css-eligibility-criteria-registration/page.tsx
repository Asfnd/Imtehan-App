import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Calendar } from 'lucide-react'
import NavigationBar from '@/components/NavigationBar'
import { ArticleSchema } from '@/components/seo/StructuredData'

export const metadata: Metadata = {
  title: 'CSS Eligibility Criteria & Registration: Complete Guide | Imtehan',
  description: 'Complete guide to CSS eligibility criteria, registration process, deadlines, and requirements for 2025 examination.',
  alternates: { canonical: 'https://imtehan.com/blog/css-eligibility-criteria-registration' },
  openGraph: { title: 'CSS Eligibility & Registration', description: 'CSS eligibility criteria and registration guide.', url: 'https://imtehan.com/blog/css-eligibility-criteria-registration', type: 'article', publishedTime: '2024-12-23T00:00:00Z' },
}

export default function BlogPost() {
  return (
    <main className="min-h-screen bg-[#F9FAFB]">
      <ArticleSchema title="CSS Eligibility Criteria & Registration" description="CSS eligibility and registration guide." content="CSS eligibility requirements 2025: 1) Age: Between 21-30 years on closing date, 2) Education: Bachelor's degree from recognized university (minimum 2nd division), 3) Citizenship: Pakistani national only, 4) Domicile: Must have one year domicile in Pakistan, 5) Physical fitness: Passed medical test, 6) Character: Clean record, no criminal conviction, 7) Attempts: Maximum 4 attempts allowed. Age calculation: Born between closing date minus 30 years and closing date minus 21 years. Education: Bachelor degree or equivalent, applied sciences, engineering qualify. Domicile: Must establish one year residence in Pakistani province by application closing date. Registration process: Visit FPSC website (www.fpsc.gov.pk), create new account with email, fill application form completely, upload all documents (domicile, degrees, CNIC), pay fee via bank transfer/online portal (approximately 2500 PKR), submit form before deadline. Important deadlines 2025: Application opening date (usually February), Application closing date (typically end April), written exam date (usually August-September), viva voce dates (following months). Document requirements: Valid CNIC or passport, Bachelor's degree certificate, domicile certificate (from DC office), latest character certificate, CV or biodata, fee receipt. Online submission: Must have valid email account, clear scanned documents (PDF format), stable internet connection, keep registration confirmation. Common mistakes: Missing deadlines, incomplete applications, illegible document scans, incorrect domicile certification, unclear CNIC copies. Verification tips: Double-check all details before submission, ensure all required documents are uploaded, verify fee payment, keep receipt and registration number safe. Post-registration: Monitor FPSC website for exam date, download admit card before exam, prepare last-minute revision. CSS eligibility is merit-based - if you meet requirements, you can compete on equal footing!" publishDate="2024-12-23" url="https://imtehan.com/blog/css-eligibility-criteria-registration" />
      <NavigationBar />
      <article className="max-w-3xl mx-auto px-6 lg:px-8 py-12">
        <Link href="/blog" className="inline-flex items-center gap-2 text-blue-600 mb-6"><ArrowLeft className="w-4 h-4" /> Back</Link>
        <h1 className="text-4xl font-bold mb-6">CSS Eligibility Criteria & Registration: Complete Guide</h1>
        <div className="flex gap-8 text-gray-600 mb-8 pb-8 border-b">
          <div className="flex items-center gap-2"><Calendar className="w-5 h-5" /><span>December 23, 2024</span></div>
          <div className="flex items-center gap-2"><Clock className="w-5 h-5" /><span>8 min read</span></div>
        </div>
        <p className="text-gray-700 leading-relaxed">CSS eligibility requirements for 2025: Age between 21-30 years on closing date, bachelor's degree from recognized university (minimum 2nd division), Pakistani national only, one year domicile in Pakistan established by application deadline, passed medical fitness test, clean criminal record, maximum 4 attempts allowed. Education qualification: Bachelor's degree qualifies regardless of subject - engineering, sciences, humanities all eligible, applied sciences accepted. Domicile requirement: Must have legitimate residence in Pakistani province for one full year before application closing date. Documentation needed: Valid CNIC or passport, bachelor's degree certificate, domicile certificate from District Commissioner, latest character certificate, CV/biodata. Registration process: Visit official FPSC website, create account with valid email, fill online application completely, upload clear scanned documents (PDF), pay fee via bank transfer, submit before deadline. Important timelines 2025: Application opening (usually February), Application closing (typically late April), Written exam date (August-September), Viva voce interviews (following months). Fee details: Application fee approximately 2500 PKR, payable through bank transfer, receipt required for reference. Online submission tips: Ensure clear document scans, double-check all entries before submission, keep registration number safely, monitor email for updates. Common mistakes to avoid: Missing closing dates, incomplete applications, unclear/illegible document uploads, incorrect domicile documentation, forgetting fee payment. Post-registration: Monitor FPSC website regularly, download admit card before exam date, prepare final revision. CSS examination is open merit-based - meeting eligibility criteria means you have equal opportunity to compete with all candidates!</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4 mb-6">
          <div className="border-l-4 border-blue-500 pl-4">
            <p className="font-bold text-gray-900 mb-2">Q: What if I'm 30 years old on closing date - am I eligible?</p>
            <p className="text-gray-700">Yes. Eligibility is "between 21-30 years" - exactly 30 on closing date still qualifies. Age is calculated on closing date of application, not exam date. If you turn 31 after application closes, no issue. Check official closing date carefully; it's your reference point.</p>
          </div>
          <div className="border-l-4 border-blue-500 pl-4">
            <p className="font-bold text-gray-900 mb-2">Q: Do I need 2nd division minimum or can I apply with lower division?</p>
            <p className="text-gray-700">FPSC requires minimum 2nd division (60% marks roughly). Lower divisions don't qualify. Borderline cases: Submit application anyway - FPSC may request additional documents proving equivalent qualification. Degree from HEC-approved university in Pakistan carries weight. International degrees must be equivalence-certified by HEC Pakistan.</p>
          </div>
          <div className="border-l-4 border-blue-500 pl-4">
            <p className="font-bold text-gray-900 mb-2">Q: Can domicile be obtained after application or must it precede?</p>
            <p className="text-gray-700">Domicile MUST be obtained before application closing date. Rule: One full year of residence completed by closing date. Start: If today is Dec 2024 and closing is May 2025, your one-year residency must end by May 2025. Plan accordingly: If you lack domicile, you cannot apply. Getting domicile takes 4-8 weeks; start early.</p>
          </div>
          <div className="border-l-4 border-blue-500 pl-4">
            <p className="font-bold text-gray-900 mb-2">Q: If I attempt CSS 4 times unsuccessfully, can I ever reapply?</p>
            <p className="text-gray-700">No. 4 attempts maximum - if you don't pass in 4 tries, no more eligibility. "Pass" means reaching interview stage AND qualifying viva. Withdraw after failing first time? Still counts as one attempt. Strategy: Each attempt counts heavily - prepare thoroughly, don't waste attempts on half-preparation. Space attempts 1-2 years apart if possible to improve preparation quality.</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-4">Next Steps</h2>
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <Link href="/blog/css-exam-preparation-guide-2025" className="group p-4 bg-blue-50 rounded border border-blue-200 hover:border-blue-400 transition-all">
            <h3 className="font-bold text-gray-900 group-hover:text-blue-600 mb-2">CSS Exam Prep Guide</h3>
            <p className="text-sm text-gray-600">Plan your 6-8 month preparation</p>
          </Link>
          <Link href="/blog/how-to-crack-css-first-attempt" className="group p-4 bg-blue-50 rounded border border-blue-200 hover:border-blue-400 transition-all">
            <h3 className="font-bold text-gray-900 group-hover:text-blue-600 mb-2">Crack CSS First Attempt</h3>
            <p className="text-sm text-gray-600">Insider strategies for success</p>
          </Link>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg mt-8">
          <h3 className="font-semibold mb-2">Ready to apply? Start preparing now</h3>
          <p className="text-gray-700 mb-4">Once eligible, begin your preparation journey with expert guidance and 10,000+ practice MCQs.</p>
          <div className="flex gap-3">
            <Link href="/css/css-practice/subjects" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">Begin Practice</Link>
            <Link href="/css/past-papers" className="inline-block bg-white text-blue-600 border border-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50">View Past Papers</Link>
          </div>
        </div>
      </article>
    </main>
  )
}
