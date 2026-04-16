import { Link } from "react-router-dom";
import SeoHead from "../components/SeoHead/SeoHead";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SeoHead
        title="Privacy Policy - Find Garage & Yard Sale"
        description="Privacy Policy for Find Garage and Yard Sale. Learn how we collect, use, disclose, and safeguard your information."
        path="/privacy-policy"
      />
      <Navbar />
      <main className="flex-grow pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/"
            className="inline-block text-brand-blue font-rethink hover:underline mb-6"
          >
            ← Back to Home
          </Link>
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-8 md:p-10">
            <h1 className="text-2xl md:text-3xl font-bold text-brand-title-color font-merriweather mb-2">
              Privacy Policy
            </h1>
            <p className="text-sm text-brand-light-text-color font-rethink mb-8">
              Last updated: March 28, 2026
            </p>

            <section className="text-brand-text-color font-rethink leading-relaxed space-y-6">
              <div>
                <h2 className="font-bold text-brand-title-color text-lg mb-2">
                  1. Introduction
                </h2>
                <p>
                  This Privacy Policy explains how we collect, use, disclose, and
                  safeguard your information when you use our mobile application
                  and related services. Please read this privacy policy carefully.
                  If you do not agree with the terms of this privacy policy, please
                  do not access the application.
                </p>
              </div>

              <div>
                <h2 className="font-bold text-brand-title-color text-lg mb-2">
                  2. Information We Collect
                </h2>
                <h3 className="font-semibold text-brand-title-color mt-4 mb-2">
                  2.1 Personal Information
                </h3>
                <p className="mb-2">
                  We may collect personal information that you voluntarily provide
                  to us when you:
                </p>
                <ul className="list-disc pl-8 space-y-1">
                  <li>Register for an account</li>
                  <li>Create an account for listing</li>
                  <li>Contact us for support</li>
                  <li>Participate in surveys or promotions</li>
                </ul>
                <h3 className="font-semibold text-brand-title-color mt-4 mb-2">
                  2.2 Automatically Collected Information
                </h3>
                <p className="mb-2">
                  We automatically collect certain information when you use our app,
                  including:
                </p>
                <ul className="list-disc pl-8 space-y-1">
                  <li>
                    Device information (model, operating system, unique device
                    identifiers)
                  </li>
                  <li>
                    Usage data (app features used, time spent, pages viewed)
                  </li>
                  <li>Location data (with your permission)</li>
                  <li>Log data (IP address, browser type, access times)</li>
                  <li>
                    Transaction information: Payment details (i.e. credit card
                    information) when you pay for your listings.
                  </li>
                  <li>
                    User content: Information you post, such as item descriptions,
                    photos and sale details.
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="font-bold text-brand-title-color text-lg mb-2">
                  3. How We Use Your Information
                </h2>
                <p className="mb-2">We use the information we collect to:</p>
                <ul className="list-disc pl-8 space-y-1">
                  <li>Provide, operate, and maintain our services</li>
                  <li>Process transactions and send related information</li>
                  <li>Send you technical notices and support messages</li>
                  <li>Respond to your comments and questions</li>
                  <li>Improve our app and develop new features</li>
                  <li>Personalize your experience</li>
                  <li>Send marketing communications (with your consent)</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>

              <div>
                <h2 className="font-bold text-brand-title-color text-lg mb-2">
                  4. Information Sharing and Disclosure
                </h2>
                <p className="mb-2">
                  We do not sell, trade, or otherwise transfer your personal
                  information to third parties except in the following
                  circumstances:
                </p>
                <ul className="list-disc pl-8 space-y-1">
                  <li>With your explicit consent</li>
                  <li>
                    To service providers who assist us in operating our app
                  </li>
                  <li>When required by law or to protect our rights</li>
                  <li>In connection with a business transfer or merger</li>
                  <li>To prevent fraud or security issues</li>
                </ul>
              </div>

              <div>
                <h2 className="font-bold text-brand-title-color text-lg mb-2">
                  5. Data Security
                </h2>
                <p>
                  We implement appropriate technical and organizational security
                  measures to protect your personal information against unauthorized
                  access, alteration, disclosure, or destruction. However, no
                  method of transmission over the internet or electronic storage
                  is 100% secure, and we cannot guarantee absolute security.
                </p>
              </div>

              <div>
                <h2 className="font-bold text-brand-title-color text-lg mb-2">
                  6. Your Rights
                </h2>
                <p className="mb-2">
                  Depending on your location, you may have certain rights regarding
                  your personal information:
                </p>
                <ul className="list-disc pl-8 space-y-1">
                  <li>Access and receive a copy of your personal information</li>
                  <li>Correct inaccurate or incomplete information</li>
                  <li>Delete your personal information</li>
                  <li>Restrict or object to certain processing</li>
                  <li>Data portability</li>
                  <li>Withdraw consent at any time</li>
                </ul>
              </div>

              <div>
                <h2 className="font-bold text-brand-title-color text-lg mb-2">
                  7. Cookies and Tracking Technologies
                </h2>
                <p>
                  We use cookies and similar tracking technologies to enhance your
                  experience, analyze usage patterns, and improve our services. You
                  can control cookie settings through your device or browser
                  preferences.
                </p>
              </div>

              <div>
                <h2 className="font-bold text-brand-title-color text-lg mb-2">
                  8. Third-Party Services
                </h2>
                <p>
                  Our app may contain links to third-party websites or services. We
                  are not responsible for the privacy practices of these third
                  parties. We encourage you to read their privacy policies before
                  providing any personal information.
                </p>
              </div>

              <div>
                <h2 className="font-bold text-brand-title-color text-lg mb-2">
                  9. Children&apos;s Privacy
                </h2>
                <p>
                  Our services are not intended for children under 18 years of age.
                  We do not knowingly collect personal information from children
                  under 18. If we become aware that we have collected personal
                  information from a child under 18, we will take steps to delete
                  such information.
                </p>
              </div>

              <div>
                <h2 className="font-bold text-brand-title-color text-lg mb-2">
                  10. Changes to This Privacy Policy
                </h2>
                <p>
                  We may update this Privacy Policy from time to time. We will
                  notify you of any changes by posting the new Privacy Policy on
                  this page and updating the &quot;Last updated&quot; date. You are
                  advised to review this Privacy Policy periodically for any
                  changes.
                </p>
              </div>

              <div>
                <h2 className="font-bold text-brand-title-color text-lg mb-2">
                  11. Contact Us
                </h2>
                <p>
                  If you have any questions about this Privacy Policy or our
                  privacy practices, please contact us:
                </p>
                <p className="mt-2">
                  Email:{" "}
                  <a
                    href="mailto:privacy@findorlookup.com"
                    className="text-brand-blue hover:underline"
                  >
                    privacy@findorlookup.com
                  </a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
