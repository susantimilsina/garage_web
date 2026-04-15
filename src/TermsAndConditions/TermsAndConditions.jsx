import { Link } from "react-router-dom";
import SeoHead from "../components/SeoHead/SeoHead";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SeoHead
        title="Terms and Conditions - Find Garage & Yard Sale"
        description="Terms and Conditions for Find Garage and Yard Sale. Read the rules for using our mobile app, website, and services."
        path="/terms-and-conditions"
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
            <h1 className="text-2xl md:text-3xl font-bold text-brand-title-color font-merriweather mb-6">
              Terms and Conditions
            </h1>

            <p className="text-brand-text-color font-rethink leading-relaxed mb-6">
              Welcome to Find Garage and Yard Sale (referred to as &quot;we,&quot;
              &quot;us,&quot; or &quot;our&quot;). These Terms and Conditions
              (&quot;Terms&quot;) govern your use of our mobile app, website, and
              services (collectively, the &quot;Services&quot;). By accessing or
              using our Services, you agree to these Terms. If you do not agree,
              please stop using the Services immediately.
            </p>

            <section className="text-brand-text-color font-rethink leading-relaxed space-y-6">
              <div>
                <h2 className="font-bold text-brand-title-color text-lg mb-2">
                  1. Eligibility
                </h2>
                <p className="mb-2">To use our Services, you must:</p>
                <ul className="list-disc pl-8 space-y-1">
                  <li>Be at least 16 years old.</li>
                  <li>If under 18, have parental or guardian consent.</li>
                  <li>Comply with all applicable laws and these Terms.</li>
                </ul>
              </div>

              <div>
                <h2 className="font-bold text-brand-title-color text-lg mb-2">
                  2. User Accounts
                </h2>
                <ul className="list-disc pl-8 space-y-1">
                  <li>
                    You are responsible for maintaining the confidentiality of your
                    account and password.
                  </li>
                  <li>
                    Provide accurate and up-to-date information during
                    registration.
                  </li>
                  <li>
                    Notify us immediately of any unauthorized access to your
                    account.
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="font-bold text-brand-title-color text-lg mb-2">
                  3. Services Overview
                </h2>
                <p className="mb-2">Our platform allows users to:</p>
                <ul className="list-disc pl-8 space-y-1">
                  <li>
                    Our Find Garage and Yard Sale App. Simply provides a platform
                    to post your Garage, Yard or Estate sale event and for
                    User/Buyer to easily navigate the local Garage, Yard or
                    Estate sale events.
                  </li>
                  <li>
                    We do not participate in any transactions between Buyers and
                    Sellers or we do not guarantee about any seller or any items
                    they sell.
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="font-bold text-brand-title-color text-lg mb-2">
                  4. Prohibited Conduct
                </h2>
                <p className="mb-2">You agree not to:</p>
                <ul className="list-disc pl-8 space-y-1">
                  <li>
                    Engage in fraudulent, misleading, or harmful behavior.
                  </li>
                  <li>Harass, intimidate, or stalk other users.</li>
                  <li>Use the Services for unauthorized commercial purposes.</li>
                </ul>
              </div>

              <div>
                <h2 className="font-bold text-brand-title-color text-lg mb-2">
                  5. Fees and Payments
                </h2>
                <ul className="list-disc pl-8 space-y-1">
                  <li>
                    At present posting is free, but we may start charging a
                    nominal fee per posting in near future.
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="font-bold text-brand-title-color text-lg mb-2">
                  6. User Content
                </h2>
                <ul className="list-disc pl-8 space-y-1">
                  <li>
                    You own the content you post and you are responsible for the
                    wordings you used if it offensive to others.
                  </li>
                  <li>
                    Do not post content that violates laws, infringes on
                    others&apos; rights, or is harmful or offensive.
                  </li>
                  <li>We may remove content at our discretion.</li>
                </ul>
              </div>

              <div>
                <h2 className="font-bold text-brand-title-color text-lg mb-2">
                  7. Disclaimers
                </h2>
                <ul className="list-disc pl-8 space-y-1">
                  <li>
                    The Services are provided &quot;as is&quot; without warranties
                    of any kind.
                  </li>
                  <li>
                    We do not guarantee the accuracy, reliability, or safety of
                    user content or transactions.
                  </li>
                  <li>Use the Services at your own risk.</li>
                </ul>
              </div>

              <div>
                <h2 className="font-bold text-brand-title-color text-lg mb-2">
                  8. Limitation of Liability
                </h2>
                <ul className="list-disc pl-8 space-y-1">
                  <li>
                    We are not liable for any indirect, incidental, or
                    consequential damages arising from the use of our Services.
                  </li>
                  <li>
                    Our total liability is limited to the amount you paid us in
                    the last 30 days.
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="font-bold text-brand-title-color text-lg mb-2">
                  9. Changes to Terms
                </h2>
                <p>
                  We may update these Terms and Conditions at any time without
                  formal notifications unless we make significant changes, we will
                  notify you. Continued use of the Services after changes means
                  you accept the updated Terms.
                </p>
              </div>

              <div>
                <h2 className="font-bold text-brand-title-color text-lg mb-2">
                  10. Contact Us
                </h2>
                <p>For questions or concerns, contact us at:</p>
                <p className="mt-2">
                  Email:{" "}
                  <a
                    href="mailto:support@findgarageandyardsale.com"
                    className="text-brand-blue hover:underline"
                  >
                    support@findgarageandyardsale.com
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

export default TermsAndConditions;
