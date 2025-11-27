export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Terms of Service</h1>
        <p className="text-sm text-gray-600 mb-8">Last updated: November 26, 2025</p>

        <div className="space-y-6 text-gray-700">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing and using this quiz platform ("Service"), you accept and agree to be bound by the terms
              and provision of this agreement. If you do not agree to these terms, please do not use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">2. Description of Service</h2>
            <p className="mb-3">
              We provide an online quiz platform for CSS, MPT, and other competitive exam preparation. The Service includes:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Practice quizzes and mock tests</li>
              <li>Past papers and MCQs</li>
              <li>Progress tracking and analytics</li>
              <li>Gamification features (points, streaks, levels)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">3. User Accounts</h2>
            <p className="mb-3">To use certain features, you must create an account. You agree to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Notify us immediately of any unauthorized access</li>
              <li>Be responsible for all activities under your account</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">4. Free Trial and Usage Limits</h2>
            <p className="mb-3">
              We offer a free trial with limited access:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>3 CSS quizzes per day</li>
              <li>1 MPT test per day</li>
              <li>5 past papers per day</li>
            </ul>
            <p className="mt-3">
              Signed-in users have unlimited access to all features. We reserve the right to modify these limits at any time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">5. Acceptable Use</h2>
            <p className="mb-3">You agree NOT to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Use the Service for any illegal purpose</li>
              <li>Attempt to gain unauthorized access to the Service</li>
              <li>Copy, scrape, or download content without permission</li>
              <li>Use automated tools (bots) to access the Service</li>
              <li>Share your account with others</li>
              <li>Reverse engineer or decompile any part of the Service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">6. Content Ownership</h2>
            <p className="mb-3">
              All quiz questions, explanations, and content are either:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Owned by us or our licensors</li>
              <li>Public domain (past papers from official sources)</li>
              <li>Used with permission</li>
            </ul>
            <p className="mt-3">
              You may not reproduce, distribute, or create derivative works from our content without explicit permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">7. Disclaimer of Warranties</h2>
            <p>
              The Service is provided "AS IS" and "AS AVAILABLE" without warranties of any kind. We do not guarantee
              that the Service will be uninterrupted, secure, or error-free. We are not responsible for the accuracy
              of quiz content or your exam results.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">8. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages resulting from your use of the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">9. Termination</h2>
            <p>
              We reserve the right to suspend or terminate your account at any time for violations of these terms
              or for any other reason. You may also delete your account at any time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">10. Changes to Terms</h2>
            <p>
              We may modify these terms at any time. Continued use of the Service after changes constitutes
              acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">11. Governing Law</h2>
            <p>
              These terms shall be governed by and construed in accordance with the laws of Pakistan, without
              regard to its conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">12. Contact Information</h2>
            <p>
              For questions about these Terms of Service, please contact us through the feedback button in the app
              or email: <strong>support@cssquizapp.com</strong>
            </p>
          </section>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <a
            href="/dashboard"
            className="text-purple-600 hover:text-purple-700 font-semibold"
          >
            ← Back to Dashboard
          </a>
        </div>
      </div>
    </div>
  )
}
