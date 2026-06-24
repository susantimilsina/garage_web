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
              Last Updated: April 27, 2026
            </p>

            <section className="text-brand-text-color font-rethink leading-relaxed space-y-6">
              <div>
                <p className="mb-4">
                  Find Garage and Yard Sale (&quot;Company,&quot; &quot;we,&quot;
                  &quot;our,&quot; or &quot;us&quot;) is committed to protecting the privacy and
                  security of users of our website located at www.findgarageandyardsale.com (the
                  &quot;Site&quot;) and related services (collectively, the
                  &quot;Services&quot;). This Privacy Policy explains how we collect, use,
                  disclose, and safeguard Personal Information when users browse garage sale
                  listings, submit listings, subscribe to alerts, or otherwise interact with the
                  Services.
                </p>
                <p className="mb-4">
                  By using the Services, you accept and agree to the practices described in this
                  Privacy Policy. If you do not agree with any part of this Privacy Policy, you
                  should not use the Services.
                </p>
                <p>
                  Use of the Services is also subject to our Terms of Use, which establish
                  additional conditions governing access to and use of the Services.
                </p>
              </div>

              <div>
                <h2 className="font-bold text-brand-title-color text-lg mb-2">
                  What Information Do We Collect?
                </h2>
                <p className="mb-2">
                  When you use our Services, we may collect, store, and process various kinds of
                  data, including Personal Information about you. &quot;Personal
                  Information&quot; refers to information that identifies, relates to, describes,
                  references, or could reasonably be linked with a particular individual or
                  household.
                </p>
                <p className="mb-2">
                  Specifically, we may collect information when you:
                </p>
                <ul className="list-disc pl-8 space-y-1 mb-4">
                  <li>submit a garage sale or yard sale listing</li>
                  <li>create or manage a user account (if available)</li>
                  <li>subscribe to listing alerts or newsletters</li>
                  <li>search for listings by location</li>
                  <li>upload images or descriptions to listings</li>
                  <li>contact us through the Site</li>
                  <li>communicate with us regarding support requests</li>
                  <li>voluntarily provide information through the Services</li>
                </ul>
                <p className="mb-2">We may collect:</p>
                <ul className="list-disc pl-8 space-y-1">
                  <li>name</li>
                  <li>email address</li>
                  <li>city and state</li>
                  <li>garage sale or yard sale listing address</li>
                  <li>event dates and times</li>
                  <li>item descriptions included in listings</li>
                  <li>photographs uploaded to listings</li>
                  <li>communications submitted through the Site</li>
                  <li>IP address</li>
                  <li>browser and device information</li>
                  <li>approximate location derived from IP address</li>
                  <li>usage and interaction data relating to the Services</li>
                </ul>
                <p className="mt-3">
                  If you submit a listing, certain information (including listing address, event
                  dates, item descriptions, and images) may be publicly visible to users of the
                  Site and may be indexed by search engines.
                </p>
              </div>

              <div>
                <h2 className="font-bold text-brand-title-color text-lg mb-2">
                  Sources of Personal Information
                </h2>
                <p>
                  We collect Personal Information from several categories of sources. These
                  include information provided directly by users when they submit listings, upload
                  images, subscribe to alerts, communicate with us, or otherwise interact with the
                  Services. We also collect information automatically from devices used to access
                  the Services through cookies, analytics tools, log files, and similar
                  technologies. In addition, we may receive information from service providers
                  that support analytics, hosting, infrastructure, mapping functionality, and
                  email delivery services. Certain information may also become publicly available
                  where users choose to publish listing content through the Services that is
                  visible to other users or search engines.
                </p>
              </div>

              <div>
                <h2 className="font-bold text-brand-title-color text-lg mb-2">
                  Sensitive Personal Information
                </h2>
                <p className="mb-2">
                  Certain information collected through the Services may qualify as &quot;Sensitive
                  Personal Information&quot; under applicable law. Depending on how users interact
                  with the Services, this may include:
                </p>
                <ul className="list-disc pl-8 space-y-1">
                  <li>
                    precise geolocation information if a user enables location-sharing through
                    browser permissions
                  </li>
                  <li>account login credentials (if user accounts are available)</li>
                </ul>
                <p className="mt-3">
                  We collect Sensitive Personal Information only as reasonably necessary to
                  provide the Services requested by users, such as enabling location-based listing
                  functionality, maintaining account security, and supporting Site operations. We
                  do not use Sensitive Personal Information to infer characteristics about users
                  or for purposes unrelated to providing the Services.
                </p>
              </div>

              <div>
                <h2 className="font-bold text-brand-title-color text-lg mb-2">
                  Why We Collect Information
                </h2>
                <p className="mb-2">
                  We collect, use, retain, and disclose Personal Information only as reasonably
                  necessary and proportionate to achieve the operational purposes for which it was
                  collected. We may use Personal Information for the following purposes:
                </p>
                <ul className="list-disc pl-8 space-y-1">
                  <li>to operate, maintain, and improve the Services;</li>
                  <li>
                    to publish and display garage sale and yard sale listings submitted by users;
                  </li>
                  <li>to enable users to search for listings by location and date;</li>
                  <li>to provide geographically relevant search results;</li>
                  <li>
                    to communicate with users regarding listings, service updates, and support
                    requests;
                  </li>
                  <li>
                    to send newsletters, listing alerts, or other communications where permitted
                    by law;
                  </li>
                  <li>to respond to inquiries and feedback;</li>
                  <li>to monitor Site usage and improve functionality and performance;</li>
                  <li>to prevent fraud, spam, abuse, or unauthorized activity;</li>
                  <li>
                    to maintain the safety, security, and integrity of the Services;
                  </li>
                  <li>to comply with legal obligations;</li>
                  <li>to enforce applicable terms, policies, or agreements;</li>
                  <li>
                    to evaluate or complete a merger, divestiture, restructuring, reorganization,
                    dissolution, or other transfer of some or all assets, including transfers of
                    Personal Information as part of such transactions; and
                  </li>
                  <li>
                    for any other purpose disclosed at the time information is collected or with
                    user consent.
                  </li>
                </ul>
                <p className="mt-3">
                  We do not use Personal Information for automated decision-making that produces
                  legal or similarly significant effects concerning users.
                </p>
              </div>

              <div>
                <h2 className="font-bold text-brand-title-color text-lg mb-2">
                  How We Use Cookies and Tracking Technologies
                </h2>
                <p className="mb-2">
                  We use cookies and similar tracking technologies (such as pixels, log files, and
                  analytics tools) to support the operation and performance of the Services.
                </p>
                <p className="mb-2">These technologies help us:</p>
                <ul className="list-disc pl-8 space-y-1 mb-4">
                  <li>maintain Site functionality and security;</li>
                  <li>remember user preferences;</li>
                  <li>understand how users interact with the Services;</li>
                  <li>improve usability and performance; or</li>
                  <li>measure traffic and engagement trends.</li>
                </ul>
                <p className="mb-4">
                  We may use third-party analytics providers, such as Google Analytics or similar
                  tools, to help us understand how visitors use the Services. These providers may
                  collect information about your interactions with the Site over time and across
                  different websites, subject to their own privacy policies. Users may adjust
                  browser settings to refuse cookies or alert them when cookies are being used.
                  However, some parts of the Services may not function properly without cookies.
                </p>

                <h3 className="font-semibold text-brand-title-color mt-4 mb-3">
                  Categories of Cookies We Use
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold">Strictly necessary cookies</p>
                    <p>
                      These cookies are required for the operation of the Services and enable core
                      functionality such as page navigation, security protections, fraud
                      prevention, and network management. Because these cookies are essential to
                      the operation of the Services, they cannot be disabled without affecting
                      functionality.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold">Functional cookies</p>
                    <p>
                      These cookies allow the Services to remember choices you make, such as
                      location preferences or display settings, and provide enhanced, more
                      personalized features.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold">Analytics cookies</p>
                    <p>
                      These cookies help us understand how visitors interact with the Services by
                      collecting information about page visits, traffic sources, search activity,
                      and usage patterns. This information helps us improve the performance,
                      usability, and reliability of the Services. Analytics cookies may be set by
                      us or by third-party analytics providers acting on our behalf.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold">Performance and infrastructure cookies</p>
                    <p>
                      These cookies support load balancing, error monitoring, and system
                      performance improvements to ensure the Services function reliably across
                      devices and browsers.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold">Embedded service cookies</p>
                    <p>
                      Where the Services include third-party features such as mapping tools,
                      geolocation functionality, or embedded content, those providers may place
                      cookies or similar technologies on your device in accordance with their own
                      privacy policies.
                    </p>
                  </div>
                </div>
                <p className="mt-3">
                  Users can adjust browser settings to refuse or limit cookies. However, disabling
                  cookies may affect the availability or functionality of certain features of the
                  Services.
                </p>
              </div>

              <div>
                <h2 className="font-bold text-brand-title-color text-lg mb-2">
                  How We Share Personal Information
                </h2>
                <p className="mb-4">
                  We may disclose Personal Information to the following categories of recipients,
                  as reasonably necessary to operate the Services and comply with applicable law:
                </p>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-brand-title-color mb-2">
                      Service Providers
                    </h3>
                    <p className="mb-2">
                      We may share Personal Information with vendors that provide services on our
                      behalf, including: website hosting providers; analytics providers; mapping
                      and geolocation service providers; email delivery and notification vendors;
                      customer support service providers; spam detection and security monitoring
                      vendors; or infrastructure and performance monitoring providers.
                    </p>
                    <p>
                      These service providers process Personal Information only as necessary to
                      perform services for us and are not permitted to use Personal Information for
                      their own independent purposes except as permitted by law.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-brand-title-color mb-2">
                      Legal Compliance and Protection
                    </h3>
                    <p className="mb-2">
                      We may disclose Personal Information where reasonably necessary to comply
                      with legal obligations or to protect the Services, our users, or others.
                      This may include disclosure:
                    </p>
                    <ul className="list-disc pl-8 space-y-1">
                      <li>
                        to comply with applicable laws, regulations, legal processes, subpoenas,
                        court orders, or governmental requests;
                      </li>
                      <li>
                        to respond to lawful requests from public authorities, including to meet
                        national security or law enforcement requirements;
                      </li>
                      <li>to enforce our Terms of Use, policies, or other agreements;</li>
                      <li>
                        to detect, investigate, prevent, or address fraud, spam, abuse,
                        unauthorized activity, or violations of law;
                      </li>
                      <li>
                        to protect the rights, property, safety, or security of the Company, the
                        Services, our users, or the public;
                      </li>
                      <li>
                        to investigate suspected misconduct involving user-submitted listings or
                        misuse of the Services;
                      </li>
                      <li>to establish, exercise, or defend legal claims;</li>
                      <li>
                        to support auditing, compliance, and corporate governance functions; or
                      </li>
                      <li>
                        in connection with disputes, claims, or investigations relating to the use
                        of the Services.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-brand-title-color mb-2">
                      Business Transfers
                    </h3>
                    <p className="mb-2">
                      Personal Information may be disclosed or transferred as part of any actual
                      or contemplated merger, acquisition, financing, asset sale, restructuring,
                      reorganization, dissolution, bankruptcy, or other corporate transaction
                      involving all or part of our business.
                    </p>
                    <p>
                      If such a transaction is completed, Personal Information may be transferred
                      as part of the assets of the Company and may be used by the successor entity
                      in accordance with this Privacy Policy or a successor privacy policy that
                      provides materially similar protections.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-brand-title-color mb-2">
                      With User Consent or Direction
                    </h3>
                    <p>
                      We may disclose Personal Information where users request or direct us to do
                      so, including when users choose to publish listings or otherwise make
                      information publicly available through the Services.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="font-bold text-brand-title-color text-lg mb-2">
                  Sale or Sharing of Personal Information
                </h2>
                <p>
                  We do not sell Personal Information for monetary consideration. We also do not
                  share Personal Information for cross-context behavioral advertising as defined
                  under the California Consumer Privacy Act, as amended by the California Privacy
                  Rights Act (&quot;CCPA/CPRA&quot;). We do not knowingly sell or share the
                  Personal Information of users under the age of 16 for cross-context behavioral
                  advertising purposes. Based on our current configuration of the Services, we do
                  not engage in such sharing. If our data practices change in the future in a
                  manner that constitutes &quot;sale&quot; or &quot;sharing&quot; under applicable
                  law, we will update this Privacy Policy and provide any required rights or
                  opt-out mechanisms.
                </p>
              </div>

              <div>
                <h2 className="font-bold text-brand-title-color text-lg mb-2">
                  Data Retention
                </h2>
                <p className="mb-2">
                  We retain Personal Information for as long as reasonably necessary to provide
                  the Services and fulfill the purposes described in this Privacy Policy, unless a
                  longer retention period is required or permitted by law.
                </p>
                <p className="mb-2">
                  In determining appropriate retention periods, we consider:
                </p>
                <ul className="list-disc pl-8 space-y-1 mb-4">
                  <li>the amount, nature, and sensitivity of the Personal Information;</li>
                  <li>the potential risk of harm from unauthorized use or disclosure;</li>
                  <li>the purposes for which the information is processed;</li>
                  <li>whether those purposes can be achieved through other means; and</li>
                  <li>
                    applicable legal, regulatory, tax, accounting, or reporting obligations.
                  </li>
                </ul>
                <p className="mb-2">We may retain Personal Information as necessary to:</p>
                <ul className="list-disc pl-8 space-y-1">
                  <li>provide and maintain the Services;</li>
                  <li>display and manage user-submitted listings;</li>
                  <li>
                    communicate with users regarding listings and service updates;
                  </li>
                  <li>
                    detect, prevent, and investigate fraud, spam, abuse, or misuse of the
                    Services;
                  </li>
                  <li>comply with legal obligations;</li>
                  <li>resolve disputes;</li>
                  <li>enforce agreements and policies;</li>
                  <li>
                    maintain the security and integrity of the Services; or
                  </li>
                  <li>establish, exercise, or defend legal claims.</li>
                </ul>
                <p className="mt-3">
                  Garage sale and yard sale listing content may remain publicly visible until
                  removed by the user or deleted through routine system maintenance processes.
                  Even after removal of listings from the Services, limited copies of Personal
                  Information may remain in backup systems for a temporary period as part of
                  standard technical and disaster-recovery processes.
                </p>
              </div>

              <div>
                <h2 className="font-bold text-brand-title-color text-lg mb-2">
                  Search Engine Indexing and Archived Content
                </h2>
                <p>
                  Listings published on the Services may be indexed by third-party search engines
                  and may remain visible in cached or archived versions of webpages even after
                  removal from the Services. We do not control search engine indexing or
                  third-party archival systems and cannot guarantee removal from those external
                  platforms.
                </p>
              </div>

              <div>
                <h2 className="font-bold text-brand-title-color text-lg mb-2">
                  California Privacy Rights
                </h2>
                <p className="mb-4">
                  If you are a California resident, you have certain rights under the California
                  Consumer Privacy Act, as amended by the CCPA/CPRA, subject to applicable
                  exceptions.
                </p>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold">Right to Know</p>
                    <p className="mb-1">
                      You have the right to request that we disclose:
                    </p>
                    <ul className="list-disc pl-8 space-y-1">
                      <li>
                        the categories of Personal Information we collect about you;
                      </li>
                      <li>
                        the categories of sources from which Personal Information is collected;
                      </li>
                      <li>
                        the business or commercial purposes for collecting, using, or disclosing
                        Personal Information;
                      </li>
                      <li>
                        the categories of third parties to whom Personal Information is disclosed;
                        and
                      </li>
                      <li>
                        the specific pieces of Personal Information we have collected about you.
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold">Right to Delete</p>
                    <p>
                      You have the right to request deletion of Personal Information we have
                      collected from you, subject to certain legal exceptions.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold">Right to Correct</p>
                    <p>
                      You have the right to request correction of inaccurate Personal Information
                      maintained about you.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold">Right to Opt Out of Sale or Sharing</p>
                    <p>
                      We do not sell Personal Information for monetary consideration. We also do
                      not share Personal Information for cross-context behavioral advertising as
                      defined under applicable law.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold">
                      Right to Limit Use of Sensitive Personal Information
                    </p>
                    <p>
                      We do not use Sensitive Personal Information for purposes other than those
                      reasonably necessary to provide the Services requested by users.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold">Right to Non-Discrimination</p>
                    <p>
                      We will not discriminate against you for exercising any of your privacy
                      rights under the CCPA/CPRA.
                    </p>
                  </div>
                </div>
                <p className="mt-4">
                  California residents may submit privacy rights requests by contacting us at:{" "}
                  <a
                    href="mailto:support@findorlookup.com"
                    className="text-brand-blue hover:underline"
                  >
                    support@findorlookup.com
                  </a>
                  . Requests must include sufficient information to allow us to verify your
                  identity and confirm you are the person about whom we collected Personal
                  Information.
                </p>
              </div>

              <div>
                <h2 className="font-bold text-brand-title-color text-lg mb-2">
                  Children&apos;s Privacy
                </h2>
                <p>
                  The Services are not directed to children under the age of 13, and we do not
                  knowingly collect Personal Information from children under 13. If we become
                  aware that Personal Information has been collected from a child under the age of
                  13 without verified parental consent, we will take reasonable steps to delete
                  that information. Parents or guardians who believe their child has provided
                  Personal Information through the Services may contact us at{" "}
                  <a
                    href="mailto:support@findorlookup.com"
                    className="text-brand-blue hover:underline"
                  >
                    support@findorlookup.com
                  </a>{" "}
                  to request deletion of that information. We do not knowingly sell or share the
                  Personal Information of individuals under the age of 16 for cross-context
                  behavioral advertising purposes.
                </p>
              </div>

              <div>
                <h2 className="font-bold text-brand-title-color text-lg mb-2">
                  Public Listings and User-Generated Content
                </h2>
                <p className="mb-2">
                  The Services allow users to submit garage sale and yard sale listings that may
                  include addresses, event dates and times, item descriptions, and images
                  (&quot;User-Generated Content&quot;). User-Generated Content submitted through
                  the Services is intended for public display and may be visible to visitors to
                  the Site, search engines, third-party indexing services, or other users of the
                  Services.
                </p>
                <p className="mb-2">
                  By submitting a listing, you acknowledge that information included in your
                  listing may become publicly accessible and may be copied, shared, or
                  redistributed by others. Listings published on the Services may appear in search
                  engine results and may remain visible in cached or archived versions of webpages
                  even after removal from the Services. We do not control third-party indexing or
                  archival systems and cannot guarantee removal from those external platforms.
                </p>
                <p>
                  Users should avoid including Personal Information in listings that they do not
                  wish to make publicly available. The Company does not verify the accuracy of
                  listing content submitted by users and is not responsible for information
                  voluntarily disclosed in public listings.
                </p>
              </div>

              <div>
                <h2 className="font-bold text-brand-title-color text-lg mb-2">
                  License to Use Submitted Content
                </h2>
                <p>
                  By submitting User-Generated Content through the Services, you grant the Company
                  a non-exclusive, worldwide, royalty-free license to use, reproduce, display,
                  distribute, and publish that content for purposes of operating, improving, and
                  promoting the Services. You represent that you have the right to provide any
                  content you submit and that such content does not violate applicable law or the
                  rights of any third party.
                </p>
              </div>

              <div>
                <h2 className="font-bold text-brand-title-color text-lg mb-2">
                  Do Not Track Signals
                </h2>
                <p>
                  Some web browsers transmit &quot;Do Not Track&quot; (&quot;DNT&quot;) signals
                  to websites indicating that a user does not wish to be tracked across different
                  websites over time. Because there is currently no uniform industry standard
                  governing how websites should interpret Do Not Track signals, the Services do
                  not respond to DNT signals at this time. However, users may adjust browser
                  settings to refuse cookies or limit tracking technologies as described above.
                </p>
              </div>

              <div>
                <h2 className="font-bold text-brand-title-color text-lg mb-2">
                  Third-Party Services and Embedded Content
                </h2>
                <p className="mb-2">
                  The Services may include integrations with third-party service providers that
                  support Site functionality. These may include:
                </p>
                <ul className="list-disc pl-8 space-y-1">
                  <li>
                    mapping and geolocation providers (such as Google Maps or similar services);
                  </li>
                  <li>
                    analytics providers that help us understand how users interact with the
                    Services;
                  </li>
                  <li>infrastructure and hosting providers; or</li>
                  <li>email notification and delivery providers.</li>
                </ul>
                <p className="mt-3">
                  These third-party providers may collect information directly from your device
                  when you interact with embedded features or content on the Services. Information
                  collected by third-party providers is subject to their own privacy policies and
                  practices. We encourage users to review the privacy policies of any third-party
                  services they interact with through the Services.
                </p>
              </div>

              <div>
                <h2 className="font-bold text-brand-title-color text-lg mb-2">
                  Security of Information
                </h2>
                <p>
                  We implement reasonable administrative, technical, and organizational safeguards
                  designed to protect Personal Information from unauthorized access, disclosure,
                  alteration, or destruction. However, no method of transmitting information over
                  the Internet or storing information electronically can be guaranteed to be
                  completely secure. As a result, we cannot guarantee absolute security of
                  Personal Information. Users submit information to the Services at their own
                  risk. Because certain features of the Services involve the public display of
                  user-submitted listing information, including addresses, event details, and
                  images, users should carefully consider what information they choose to make
                  publicly available.
                </p>
              </div>

              <div>
                <h2 className="font-bold text-brand-title-color text-lg mb-2">
                  U.S. Audience and Data Processing Location
                </h2>
                <p>
                  The Services are intended for users located in the United States. If you access
                  the Services from outside the United States, you acknowledge that your
                  information may be transferred to, stored in, and processed in the United
                  States, where privacy laws may differ from those in your jurisdiction. By using
                  the Services, you consent to the transfer of your information to the United
                  States.
                </p>
              </div>

              <div>
                <h2 className="font-bold text-brand-title-color text-lg mb-2">
                  Changes to This Privacy Policy
                </h2>
                <p>
                  We may update this Privacy Policy from time to time to reflect changes in our
                  practices, technologies, legal requirements, or the Services. When we make
                  changes, we will update the &quot;Last Updated&quot; date at the top of this
                  Privacy Policy. If we make material changes, we may provide additional notice as
                  appropriate under the circumstances, such as posting a notice on the Site or
                  updating users through available communication channels. Your continued use of
                  the Services after any updates become effective constitutes acceptance of the
                  revised Privacy Policy.
                </p>
              </div>

              <div>
                <h2 className="font-bold text-brand-title-color text-lg mb-2">
                  Contact Information
                </h2>
                <p>
                  If you have questions about this Privacy Policy or our privacy practices, you
                  may contact us at:
                </p>
                <p className="mt-2">
                  Email:{" "}
                  <a
                    href="mailto:support@findorlookup.com"
                    className="text-brand-blue hover:underline"
                  >
                    support@findorlookup.com
                  </a>
                </p>
                <p className="mt-1">
                  Mailing Address: 13945 Van Nuys Blvd, Arleta, California 91331-4543, United
                  States
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
