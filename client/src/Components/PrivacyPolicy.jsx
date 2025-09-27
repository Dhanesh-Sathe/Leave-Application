import React from "react";

function PrivacyPolicy() {
  return (
    <div className="bg-gray-50 py-12 px-6">
      <div className="container mx-auto max-w-3xl bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Privacy Policy
        </h1>
        <div className="space-y-8 text-lg text-gray-700">
          {/* Introduction Section */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900">Introduction</h2>
            <p>
              At FlexiLeave, we respect your privacy and are committed to
              protecting your personal information. This Privacy Policy explains
              how we collect, use, share, and protect your data when you use our
              platform. By using our services, you agree to the practices described
              in this policy.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900">
              Information We Collect
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Personal Information: Name, email address, phone number.</li>
              <li>Account Information: Username, password.</li>
              <li>Transactional Information: Payment details, billing address.</li>
              <li>Usage Data: IP address, browser type, browsing history.</li>
              <li>
                Cookies and Tracking Technologies: We use cookies to improve user
                experience.
              </li>
            </ul>
          </section>

          {/* How We Use Your Information */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900">
              How We Use Your Information
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To create and manage your account.</li>
              <li>To process payments and transactions.</li>
              <li>To provide customer support.</li>
              <li>To send marketing and promotional emails (you can opt-out at any time).</li>
              <li>To analyze and improve our platform.</li>
            </ul>
          </section>

          {/* How We Share Your Information */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900">
              How We Share Your Information
            </h2>
            <p>
              We may share your data with:
              <ul className="list-disc pl-6 space-y-2">
                <li>Service Providers: Payment processors, customer support tools, and hosting services.</li>
                <li>Legal Requirements: We may disclose information if required by law or to protect our legal rights.</li>
                <li>Business Partners: To provide additional services related to your use of our platform.</li>
              </ul>
              We will never sell your personal data to third parties.
            </p>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900">Data Retention</h2>
            <p>
              We retain your data for as long as needed to provide our services and
              comply with legal obligations. You may request deletion of your data at
              any time by contacting us.
            </p>
          </section>

          {/* Your Rights Regarding Your Data */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900">
              Your Rights Regarding Your Data
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access and update your personal information.</li>
              <li>Delete your personal information.</li>
              <li>Opt-out of marketing communications.</li>
              <li>Request a copy of your data for portability.</li>
            </ul>
          </section>

          {/* Security of Your Information */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900">
              Security of Your Information
            </h2>
            <p>
              We implement security measures, including encryption, to protect your
              data. However, no method of transmission over the internet is completely
              secure, and we cannot guarantee absolute security.
            </p>
          </section>

          {/* Cookies and Tracking Technologies */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900">
              Cookies and Tracking Technologies
            </h2>
            <p>
              We use cookies to personalize your experience and track website activity.
              You can control cookie preferences through your browser settings.
            </p>
          </section>

          {/* Children’s Privacy */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900">Children’s Privacy</h2>
            <p>
              Our platform is not intended for children under 13, and we do not knowingly
              collect data from children. If you believe we have inadvertently collected
              information from a child, please contact us, and we will delete it.
            </p>
          </section>

          {/* Changes to the Privacy Policy */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900">
              Changes to the Privacy Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of
              any significant changes by posting the updated policy on this page. The
              latest version will always be available here, with the date of the last update.
            </p>
          </section>

          {/* Contact Us Section */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900">Contact Us</h2>
            <p>
              If you have any questions or concerns about this Privacy Policy or your
              personal data, please contact us at{" "}
              <a href="mailto:support@example.com" className="text-blue-500">
                support@example.com
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
