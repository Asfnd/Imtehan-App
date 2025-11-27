export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
        <p className="text-sm text-gray-600 mb-8">Last updated: November 26, 2025</p>

        <div className="space-y-6 text-gray-700">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">1. Information We Collect</h2>
            <p className="mb-3">We collect information that you provide directly to us:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Account Information:</strong> Email address, name (when you sign up)</li>
              <li><strong>Usage Data:</strong> Quiz scores, progress, and performance metrics</li>
              <li><strong>Device Information:</strong> Browser type, IP address, device type</li>
              <li><strong>Feedback:</strong> Any feedback or reports you submit</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">2. How We Use Your Information</h2>
            <p className="mb-3">We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Track your quiz progress and performance</li>
              <li>Send you updates and notifications (if you opt-in)</li>
              <li>Respond to your feedback and support requests</li>
              <li>Detect and prevent fraud or abuse</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">3. Data Storage and Security</h2>
            <p className="mb-3">
              Your data is stored securely using Supabase (PostgreSQL database) with industry-standard encryption.
              We implement appropriate technical and organizational measures to protect your personal information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">4. Third-Party Services</h2>
            <p className="mb-3">We use the following third-party services:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Supabase:</strong> Database and authentication</li>
              <li><strong>Google OAuth:</strong> Sign-in functionality</li>
              <li><strong>Vercel:</strong> Hosting and deployment</li>
            </ul>
            <p className="mt-3">
              These services have their own privacy policies governing their use of your information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">5. Cookies and Tracking</h2>
            <p>
              We use essential cookies to maintain your session and preferences. We do not use tracking cookies
              for advertising purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">6. Your Rights</h2>
            <p className="mb-3">You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Export your data</li>
              <li>Opt-out of communications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">7. Children's Privacy</h2>
            <p>
              Our service is not directed to children under 13. We do not knowingly collect personal information
              from children under 13. If you believe we have collected such information, please contact us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">8. Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify you of any changes by posting
              the new policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">9. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us through the feedback button
              in the app or email us at: <strong>support@cssquizapp.com</strong>
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
