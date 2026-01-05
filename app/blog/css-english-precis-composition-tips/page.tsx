import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Calendar } from 'lucide-react'
import NavigationBar from '@/components/NavigationBar'
import { ArticleSchema } from '@/components/seo/StructuredData'

export const metadata: Metadata = {
  title: 'CSS English Précis and Composition: Tips with Practice | Imtehan',
  description: 'Master CSS English Précis & Composition section. Grammar rules, writing techniques, and practice questions to score 80+ marks.',
  alternates: { canonical: 'https://imtehan.com/blog/css-english-precis-composition-tips' },
  openGraph: { title: 'CSS English Précis & Composition Guide', description: 'Master précis writing and composition with expert tips and practice.', url: 'https://imtehan.com/blog/css-english-precis-composition-tips', type: 'article', publishedTime: '2026-01-03T00:00:00Z' },
}

export default function BlogPost() {
  return (
    <main className="min-h-screen bg-[#F9FAFB]">
      <ArticleSchema
        title="CSS English Précis and Composition: Tips with Practice"
        description="Master précis and composition section with grammar and technique tips."
        content="CSS English Précis & Composition (50 marks) tests technical writing skills. Section breakdown: Précis (20 marks) - Summarize 250-word passage in 60-70 words, test comprehension and condensing ability. Composition (30 marks) - Write short essay 200-300 words on given topic, test expression and clarity. Scoring criteria: Précis accuracy 60%, brevity 40%. Composition: Expression 40%, Structure 30%, Ideas 30%. Précis tips: Read passage 2-3 times for complete understanding, Identify main idea vs supporting details, Write draft roughly 60-70 words exactly, Check if all main points included, Rewrite for better flow and grammar. Common précis mistakes: Too long (exceeding word limit), Too short (missing main points), Too detailed (including minor details), Poor grammar, Awkward phrasing. Précis technique: Don't copy sentences from passage, Use your own words and structure, Combine related ideas, Remove examples and illustrations, Keep only essential information. Composition tips: Choose topic you understand, Plan 3-point argument if essay, Write 200-250 words minimum, Use clear English not complex vocabulary, Check grammar and punctuation. High-frequency topics: Technology impact, Education importance, Social responsibility, Environmental issues, Health and fitness, Youth empowerment. Composition structure: Introduction (20 words) - Hook and thesis, Body (150 words) - 2-3 main points with explanation, Conclusion (30 words) - Summary and final thought. Grammar rules: Subject-verb agreement, Correct article usage (a/an/the), Proper tense consistency, Comma placement, Sentence fragments. Practice approach: 2 précis weekly + 1 composition weekly, Get feedback on grammar and flow, Time yourself (20 min précis, 25 min composition), Review high-quality sample answers. Scoring potential: With practice, 80+ marks achievable in précis & composition!"
        publishDate="2026-01-03"
        url="https://imtehan.com/blog/css-english-precis-composition-tips"
      />
      <NavigationBar />
      <article className="max-w-3xl mx-auto px-6 lg:px-8 py-12">
        <Link href="/blog" className="inline-flex items-center gap-2 text-blue-600 mb-6"><ArrowLeft className="w-4 h-4" /> Back</Link>
        <h1 className="text-4xl font-bold mb-6">CSS English Précis and Composition: Expert Tips & Practice Guide</h1>
        <div className="flex gap-8 text-gray-600 mb-8 pb-8 border-b">
          <div className="flex items-center gap-2"><Calendar className="w-5 h-5" /><span>January 3, 2026</span></div>
          <div className="flex items-center gap-2"><Clock className="w-5 h-5" /><span>10 min read</span></div>
        </div>

        <p className="text-gray-700 leading-relaxed mb-6">
          CSS English Précis & Composition (50 marks) is often overlooked, yet it's where you can reliably score 80+ marks with proper technique. Unlike essay or MCQs with subjective difficulty, précis and composition have clear, learnable rules. Master these rules and you'll score consistently high.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Section Breakdown</h2>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="border rounded-lg p-6 bg-blue-50">
            <h3 className="font-bold text-lg mb-3">Précis (20 marks)</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Original passage: 250 words</li>
              <li>• Your précis: 60-70 words exactly</li>
              <li>• Time allowed: 20 minutes</li>
              <li>• Tests: Comprehension & condensing</li>
            </ul>
          </div>
          <div className="border rounded-lg p-6 bg-green-50">
            <h3 className="font-bold text-lg mb-3">Composition (30 marks)</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Topic provided (choice of 3)</li>
              <li>• Your essay: 200-300 words</li>
              <li>• Time allowed: 25 minutes</li>
              <li>• Tests: Expression & clarity</li>
            </ul>
          </div>
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-4">Part 1: Mastering Précis Writing</h2>

        <h3 className="text-xl font-bold mt-6 mb-3">What Is a Précis?</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          A précis is a shortened version of a text that captures all essential information while eliminating unnecessary details. Think of it as "extract the skeleton of the passage."
        </p>

        <h3 className="text-xl font-bold mt-6 mb-3">The 5-Step Précis Formula</h3>

        <div className="space-y-6 mb-6">
          <div className="border-l-4 border-blue-600 pl-4">
            <p className="font-bold text-lg text-blue-900 mb-2">Step 1: Read the Passage (5 minutes)</p>
            <p className="text-gray-700">Read the entire passage 2-3 times. Don't take notes yet. Just understand the main idea.</p>
          </div>

          <div className="border-l-4 border-blue-600 pl-4">
            <p className="font-bold text-lg text-blue-900 mb-2">Step 2: Identify Main Ideas (3 minutes)</p>
            <p className="text-gray-700 mb-3">Ask yourself: "If I could explain this passage in 3 sentences, what would they be?"</p>
            <p className="text-gray-700">Example: Passage about climate change</p>
            <ul className="list-disc pl-6 text-gray-700 mt-2">
              <li>Main Idea 1: Human activities cause climate change</li>
              <li>Main Idea 2: Consequences are severe (floods, droughts)</li>
              <li>Main Idea 3: We must act immediately</li>
            </ul>
          </div>

          <div className="border-l-4 border-blue-600 pl-4">
            <p className="font-bold text-lg text-blue-900 mb-2">Step 3: Write Draft (8-10 minutes)</p>
            <p className="text-gray-700 mb-3">Write roughly without worrying about word count. Include all main ideas in your own words. Aim for ~70-80 words.</p>
            <div className="bg-gray-100 p-3 rounded text-sm mt-2 font-mono">
              "Climate change, primarily caused by human activities, poses severe threats including devastating floods and droughts globally. These consequences demand immediate international action and policy changes to prevent catastrophic environmental collapse."
            </div>
          </div>

          <div className="border-l-4 border-blue-600 pl-4">
            <p className="font-bold text-lg text-blue-900 mb-2">Step 4: Cut to 60-70 Words (3 minutes)</p>
            <p className="text-gray-700 mb-3">Remove unnecessary words and redundancies.</p>
            <div className="bg-gray-100 p-3 rounded text-sm mt-2 font-mono">
              "Human activities cause climate change, leading to severe floods and droughts. Immediate international action is essential to prevent environmental catastrophe."
            </div>
            <p className="text-gray-700 mt-3 text-sm"><strong>Word count: 25 words</strong> (Now expand slightly to reach 60-70)</p>
          </div>

          <div className="border-l-4 border-blue-600 pl-4">
            <p className="font-bold text-lg text-blue-900 mb-2">Step 5: Final Polish (2-3 minutes)</p>
            <p className="text-gray-700">Check grammar, flow, word count. Ensure all main ideas are covered.</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-4">Précis: What to INCLUDE vs EXCLUDE</h2>

        <div className="overflow-x-auto mb-6">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-green-100">
                <th className="border p-3 text-left">INCLUDE ✅</th>
                <th className="border p-3 text-left">EXCLUDE ❌</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-3">Main thesis/argument</td>
                <td className="border p-3">Illustrative examples</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border p-3">Supporting points (2-3)</td>
                <td className="border p-3">Anecdotes or stories</td>
              </tr>
              <tr>
                <td className="border p-3">Conclusions/recommendations</td>
                <td className="border p-3">Repetitions or emphasis</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border p-3">Specific data if crucial</td>
                <td className="border p-3">Author opinions (vs facts)</td>
              </tr>
              <tr>
                <td className="border p-3">Contrasts or paradoxes</td>
                <td className="border p-3">Detailed explanations</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-4">Common Précis Mistakes</h2>

        <div className="space-y-4 mb-6">
          <div className="bg-red-50 p-4 rounded border-l-4 border-red-500">
            <p className="font-bold text-red-900">❌ Copying Sentences from Passage</p>
            <p className="text-gray-700 mt-2">Examiners want YOUR understanding, not plagiarism. Rewrite in your own words.</p>
          </div>
          <div className="bg-red-50 p-4 rounded border-l-4 border-red-500">
            <p className="font-bold text-red-900">❌ Exceeding 70 Words</p>
            <p className="text-gray-700 mt-2">Word limit is strict. 71 words = mark deduction.</p>
          </div>
          <div className="bg-red-50 p-4 rounded border-l-4 border-red-500">
            <p className="font-bold text-red-900">❌ Under 60 Words</p>
            <p className="text-gray-700 mt-2">Too short means you missed important ideas. Aim for 65-70.</p>
          </div>
          <div className="bg-red-50 p-4 rounded border-l-4 border-red-500">
            <p className="font-bold text-red-900">❌ Including Examples and Details</p>
            <p className="text-gray-700 mt-2">A précis removes examples. Keep only the essence.</p>
          </div>
          <div className="bg-red-50 p-4 rounded border-l-4 border-red-500">
            <p className="font-bold text-red-900">❌ Poor Grammar</p>
            <p className="text-gray-700 mt-2">Even if condensed correctly, bad grammar loses marks.</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-4">Part 2: Mastering Composition Writing</h2>

        <h3 className="text-xl font-bold mt-6 mb-3">Composition Structure</h3>

        <div className="bg-blue-50 p-6 rounded-lg mb-6">
          <div className="space-y-4">
            <div>
              <p className="font-bold text-blue-900">Paragraph 1: Introduction (20 words)</p>
              <p className="text-gray-700 mt-2">Hook the reader. State your position clearly.</p>
              <p className="text-gray-700 mt-2 text-sm italic">"Climate change represents humanity's greatest challenge, demanding urgent global action to prevent irreversible environmental destruction."</p>
            </div>

            <div className="border-t pt-4">
              <p className="font-bold text-blue-900">Paragraph 2: Main Point 1 (60-80 words)</p>
              <p className="text-gray-700 mt-2">Develop one argument with explanation and brief evidence.</p>
              <p className="text-gray-700 mt-2 text-sm italic">"First, rising temperatures cause catastrophic weather patterns. Droughts devastate agriculture in Africa and Asia, forcing millions into poverty..."</p>
            </div>

            <div className="border-t pt-4">
              <p className="font-bold text-blue-900">Paragraph 3: Main Point 2 (60-80 words)</p>
              <p className="text-gray-700 mt-2">Develop second argument.</p>
              <p className="text-gray-700 mt-2 text-sm italic">"Second, rising sea levels threaten coastal cities. Bangladesh, Indonesia, and Pacific nations face existential threats as islands disappear..."</p>
            </div>

            <div className="border-t pt-4">
              <p className="font-bold text-blue-900">Paragraph 4: Conclusion (30 words)</p>
              <p className="text-gray-700 mt-2">Summarize and end powerfully.</p>
              <p className="text-gray-700 mt-2 text-sm italic">"Therefore, immediate international cooperation is essential. The next decade determines whether we prevent catastrophe or face irreversible collapse."</p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-4">High-Frequency Composition Topics</h2>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-green-50 p-4 rounded">
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>• Technology impact on society</li>
              <li>• Importance of education</li>
              <li>• Social media effects</li>
              <li>• Environmental conservation</li>
            </ul>
          </div>
          <div className="bg-green-50 p-4 rounded">
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>• Youth empowerment</li>
              <li>• Work-life balance</li>
              <li>• Health and fitness</li>
              <li>• Women empowerment</li>
            </ul>
          </div>
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-4">Grammar Rules That Matter Most</h2>

        <div className="space-y-4 mb-6">
          <div className="bg-yellow-50 p-4 rounded">
            <p className="font-bold">Subject-Verb Agreement</p>
            <p className="text-gray-700 mt-2">❌ "The team are playing well" | ✅ "The team is playing well"</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded">
            <p className="font-bold">Articles (a/an/the)</p>
            <p className="text-gray-700 mt-2">❌ "I went to school" (implies your school) | ✅ "I went to the school" (specific school)</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded">
            <p className="font-bold">Tense Consistency</p>
            <p className="text-gray-700 mt-2">❌ "Climate change is a problem and was a concern" | ✅ "Climate change is a problem and remains a concern"</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded">
            <p className="font-bold">Comma Placement</p>
            <p className="text-gray-700 mt-2">❌ "Students, who study regularly, pass exams" (wrong) | ✅ "Students who study regularly pass exams" (no comma if restrictive)</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-4">Practice Schedule (4 Weeks)</h2>

        <div className="bg-purple-50 p-6 rounded-lg mb-6">
          <h3 className="font-bold text-purple-900 mb-4">Week 1-2: Foundation</h3>
          <ul className="space-y-2 text-gray-700 mb-6">
            <li>• 2 précis per week (40 minutes each)</li>
            <li>• 1 composition per week (30 minutes)</li>
            <li>• Focus on understanding and accuracy, not speed</li>
          </ul>

          <h3 className="font-bold text-purple-900 mb-4">Week 3: Timed Practice</h3>
          <ul className="space-y-2 text-gray-700 mb-6">
            <li>• 2 précis under 20-minute timing</li>
            <li>• 1 composition under 25-minute timing</li>
            <li>• Get feedback from mentors</li>
          </ul>

          <h3 className="font-bold text-purple-900 mb-4">Week 4: Full Tests</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• Take full 50-mark test (both sections) in 45 minutes</li>
            <li>• Repeat 2-3 times</li>
            <li>• Aim for 40+ marks consistently</li>
          </ul>
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-4">Word Count Tips</h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Précis must be 60-70 words. Many students guess. Here's how to count accurately:
        </p>

        <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
          <li>Use your pen to mark every 10 words</li>
          <li>Count by hand (not phone calculator—numbers matter)</li>
          <li>Contractions count as 1 word (don't = 1, not 2)</li>
          <li>Hyphenated words count as 1 (well-known = 1)</li>
          <li>Numbers count as 1 (2023 = 1 word, not 4)</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">Scoring Breakdown</h2>

        <div className="overflow-x-auto mb-6">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-blue-100">
                <th className="border p-3 text-left">Component</th>
                <th className="border p-3 text-left">Marks</th>
                <th className="border p-3 text-left">Criteria</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-3"><strong>Précis</strong></td>
                <td className="border p-3">20</td>
                <td className="border p-3">Completeness (60%), Brevity (40%)</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border p-3"><strong>Composition</strong></td>
                <td className="border p-3">30</td>
                <td className="border p-3">Expression (40%), Structure (30%), Ideas (30%)</td>
              </tr>
              <tr>
                <td className="border p-3"><strong>Total</strong></td>
                <td className="border p-3">50</td>
                <td className="border p-3">Achievable 40-50 with practice</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-bold mt-12 mb-6">Frequently Asked Questions</h2>

        <div className="space-y-6 mb-8">
          <div className="border-b pb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">How strict is the 60-70 word limit for précis?</h3>
            <p className="text-gray-700 leading-relaxed">
              Very strict. Most examiners count words carefully. 60-70 words means exactly that range. 71 words = deduction (usually 1-2 marks). 59 words = also penalized. Aim for 65-68 words as a safe zone. Count EVERY word including articles (a, an, the). Contractions like "don't" count as 1 word. Numbers count as 1 word each (2025 = 1 word). Hyphenated words count as 1 (well-known = 1). Practice counting manually multiple times—don't rely on computer word counts which may vary.
            </p>
          </div>

          <div className="border-b pb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Can I use the exact words from the passage in my précis?</h3>
            <p className="text-gray-700 leading-relaxed">
              No. Examiners specifically want YOUR understanding expressed in YOUR words. Copying 3+ consecutive words from original passage = plagiarism and mark deduction. Rewrite every sentence. However, technical terms or names (Pakistan, climate change, etc.) can remain the same. Challenge yourself: Read passage, close it, then write from memory. This ensures you're writing your own words. Using synonyms shows better comprehension. "The government implemented" becomes "Authorities adopted." "A severe problem" becomes "A critical challenge."
            </p>
          </div>

          <div className="border-b pb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">What should I do if I can't fit all main ideas in 70 words?</h3>
            <p className="text-gray-700 leading-relaxed">
              You're including too many details or explaining too much. Re-examine the passage: identify 3 MAIN ideas maximum (not 5-6 supporting points). Use compression techniques: combine related ideas, eliminate examples, remove explanations, keep only essential information. If you truly have 4+ main ideas, pick the 3 most important ones. The passage usually has a clear hierarchy—some ideas are central, others are supporting. Focus on the central thesis and 2-3 key supporting ideas. Practice identifying main idea vs supporting detail by reading sample précis answers.
            </p>
          </div>

          <div className="border-b pb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">How much time should I allocate for précis vs composition?</h3>
            <p className="text-gray-700 leading-relaxed">
              Allocate time proportional to marks: Précis = 20 marks in 20 minutes (1 minute per mark). Composition = 30 marks in 25 minutes. Total = 45 minutes for 50 marks. This gives you 2-3 minutes buffer for review. Practice with this exact timing. In exam, don't exceed 20 minutes on précis no matter what. If you're struggling, write what you can and move to composition (which has higher marks). A rushed but grammatically sound composition scores better than a perfect précis with mediocre composition.
            </p>
          </div>

          <div className="border-b pb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">What makes a composition "expression" different from "ideas"?</h3>
            <p className="text-gray-700 leading-relaxed">
              Ideas (30 marks) = Content quality: Are your arguments strong? Are they logical and original? Do you make a convincing case? Expression (40 marks) = Writing quality: Is your English clear and correct? Do you use varied sentence structures? Is vocabulary appropriate and sophisticated? Is grammar flawless? Example: Same idea poorly expressed loses marks. "Technology is good because it helps people" (weak) vs "Technology accelerates human productivity through automation and connectivity, enabling economies to flourish" (strong expression). Write simply but correctly rather than complexity with errors.
            </p>
          </div>

          <div className="border-b pb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Can I write 4-5 paragraphs instead of the suggested structure?</h3>
            <p className="text-gray-700 leading-relaxed">
              The suggested structure (Introduction + 2 Body Paragraphs + Conclusion = 4 paragraphs) is a guideline, not a rule. You can write 5-6 paragraphs if: (1) Each paragraph is substantial (40+ words), not thin one-liners; (2) You maintain clear structure (still intro, body arguments, conclusion); (3) Your 200-300 word target is met. Most examiners prefer the 4-paragraph structure because it's clear and well-balanced. More paragraphs risk fragmented ideas or padding. Fewer paragraphs (3 total) might feel rushed. Stick to 4 unless you have compelling reason for more.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mt-12 mb-6">Related Resources</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Link href="/blog/css-english-essay-structure-examples" className="group bg-blue-50 p-6 rounded-lg border border-blue-200 hover:border-blue-400 transition-all">
            <h3 className="font-bold text-gray-900 group-hover:text-blue-600 mb-2">CSS English Essay Structure and Examples</h3>
            <p className="text-sm text-gray-600 mb-3">Master essay writing with perfect structure and real examples</p>
            <span className="text-blue-600 text-sm font-semibold">Read more →</span>
          </Link>

          <Link href="/blog/css-time-management-3-hour-mcq-exam" className="group bg-blue-50 p-6 rounded-lg border border-blue-200 hover:border-blue-400 transition-all">
            <h3 className="font-bold text-gray-900 group-hover:text-blue-600 mb-2">CSS Time Management During MCQ Exam</h3>
            <p className="text-sm text-gray-600 mb-3">Master time allocation for all exam components</p>
            <span className="text-blue-600 text-sm font-semibold">Read more →</span>
          </Link>

          <Link href="/blog/css-exam-preparation-guide-2025" className="group bg-blue-50 p-6 rounded-lg border border-blue-200 hover:border-blue-400 transition-all">
            <h3 className="font-bold text-gray-900 group-hover:text-blue-600 mb-2">Complete CSS Exam Preparation Guide 2025</h3>
            <p className="text-sm text-gray-600 mb-3">Comprehensive guide covering all exam sections</p>
            <span className="text-blue-600 text-sm font-semibold">Read more →</span>
          </Link>

          <Link href="/blog/best-css-preparation-books-resources" className="group bg-blue-50 p-6 rounded-lg border border-blue-200 hover:border-blue-400 transition-all">
            <h3 className="font-bold text-gray-900 group-hover:text-blue-600 mb-2">Best CSS Preparation Books &amp; Resources</h3>
            <p className="text-sm text-gray-600 mb-3">Recommended resources for comprehensive English practice</p>
            <span className="text-blue-600 text-sm font-semibold">Read more →</span>
          </Link>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg mt-8">
          <h3 className="font-semibold mb-2">Practice Précis & Composition Online</h3>
          <p className="text-gray-700 mb-4">Get real précis passages and composition topics with instant feedback on grammar and word count. Track your improvement over time.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/css/subjects" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">Start Practicing</Link>
            <Link href="/css/past-papers" className="inline-block bg-white text-blue-600 border border-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50">View Past Papers</Link>
          </div>
        </div>
      </article>
    </main>
  )
}
