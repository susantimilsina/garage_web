import { Link } from "react-router-dom";
import SeoHead from "../components/SeoHead/SeoHead";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SeoHead
        title="Terms of Use - Find Garage & Yard Sale"
        description="Terms of Use for Find Garage and Yard Sale. Read the rules for using our website and services."
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
            <h1 className="text-2xl md:text-3xl font-bold text-brand-title-color font-merriweather mb-2">
              Terms of Use
            </h1>
            <p className="text-sm text-brand-light-text-color font-rethink mb-8">
              Last Updated: April 27, 2026
            </p>

            <section className="text-brand-text-color font-rethink leading-relaxed space-y-6">
              <div>
                <p className="mb-4">
                  These Terms of Use (the &quot;Terms&quot;) are entered into by and between Find
                  Garage and Yard Sale (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or
                  &quot;our&quot;) and any individual or entity (&quot;you&quot; or
                  &quot;User&quot;) accessing or using the website located at
                  www.findgarageandyardsale.com (the &quot;Site&quot;) and any related features,
                  content, listings, tools, or services made available through the Site
                  (collectively, the &quot;Services&quot;).
                </p>
                <p className="mb-4">
                  Please read these Terms carefully before using the Services. By accessing or
                  using the Services, you accept and agree to be bound by these Terms and our
                  Privacy Policy, which is incorporated into these Terms by reference. If you do
                  not agree to these Terms, you must not access or use the Services.
                </p>
                <p>
                  The Services are offered and available to users who are 18 years of age or
                  older and located in the United States. By using the Services, you represent
                  and warrant that you are of legal age to form a binding contract with the
                  Company and meet all eligibility requirements.
                </p>
              </div>

              <div>
                <h2 className="font-bold text-brand-title-color text-lg mb-2">
                  Accessing the Site and Services
                </h2>
                <p>
                  Access to the Site or Services may be interrupted from time to time for
                  maintenance, updates, technical issues, security reasons, or other operational
                  needs. The Company does not guarantee that the Site or Services will be
                  available at all times or that access will be uninterrupted, timely, secure, or
                  error-free. You are responsible for obtaining and maintaining all equipment,
                  software, internet access, and other resources necessary to access and use the
                  Services. We reserve the right to modify, suspend, restrict, or discontinue all
                  or any portion of the Site or Services at any time, with or without notice.
                </p>
              </div>

              <div>
                <h2 className="font-bold text-brand-title-color text-lg mb-2">
                  User Accounts
                </h2>
                <p>
                  Certain features of the Services may require you to create an account. If you
                  create an account, you agree to provide accurate, current, and complete
                  information and to update such information as necessary. You are responsible for
                  maintaining the confidentiality of your account credentials and for all activity
                  that occurs under your account. You agree to notify us promptly if you become
                  aware of any unauthorized access to or use of your account. We reserve the right
                  to suspend, disable, or terminate any account, username, password, listing, or
                  other identifier at any time if we believe you have violated these Terms,
                  provided inaccurate information, misused the Services, or otherwise created risk
                  for the Company, other users, or the public.
                </p>
              </div>

              <div>
                <h2 className="font-bold text-brand-title-color text-lg mb-2">
                  Description of Services
                </h2>
                <p>
                  The Site consists of an online platform that allows users to browse, search for,
                  and publish garage sale and yard sale listings. The Company does not organize,
                  host, sponsor, supervise, verify, or control any garage sale, yard sale, event,
                  transaction, communication, or interaction between users. The Company is not a
                  party to any sale, purchase, agreement, transaction, or dispute between users.
                  Listings are submitted by users, and the Company does not guarantee the
                  accuracy, completeness, legality, safety, reliability, availability, or quality
                  of any listing, event, item, user, or transaction. The Company does not endorse,
                  recommend, verify, or guarantee any listing, event, user, or item referenced on
                  the Services, and any reference to a listing does not constitute an endorsement
                  or approval by the Company.
                </p>
              </div>

              <div>
                <h2 className="font-bold text-brand-title-color text-lg mb-2">
                  Platform Role
                </h2>
                <p className="mb-2">
                  The Site functions solely as a neutral online platform for publishing and
                  viewing listing information.
                </p>
                <p className="mb-2">The Company does not:</p>
                <ul className="list-disc pl-8 space-y-1">
                  <li>verify the identity of users;</li>
                  <li>verify the accuracy of listings;</li>
                  <li>inspect items offered for sale;</li>
                  <li>control the conduct of users;</li>
                  <li>guarantee that any listed event will occur;</li>
                  <li>guarantee that any items listed will be available;</li>
                  <li>participate in payments or transactions between users; or</li>
                  <li>assume responsibility for disputes between users.</li>
                </ul>
                <p className="mt-2">
                  Any reliance on listings or other user-submitted information is at your own risk.
                </p>
              </div>

              <div>
                <h2 className="font-bold text-brand-title-color text-lg mb-2">
                  User Listings and User Content
                </h2>
                <p className="mb-2">
                  Users may submit garage sale or yard sale listings, including addresses, dates,
                  times, item descriptions, images, and other information (&quot;User
                  Content&quot;). You are solely responsible for all User Content you submit. By
                  submitting User Content, you represent and warrant that: (i) all information you
                  submit is accurate, current, complete, and not misleading; (ii) you have the
                  legal right to publish the address, images, descriptions, and other information
                  included in the listing; (iii) your User Content does not violate any applicable
                  law, regulation, or third-party right; (iv) your User Content does not infringe
                  intellectual property, privacy, publicity, property, or contractual rights; (v)
                  your User Content does not contain unlawful, defamatory, threatening, harassing,
                  obscene, discriminatory, fraudulent, or otherwise objectionable material; and
                  (vi) your listing relates to a legitimate garage sale, yard sale, estate sale,
                  moving sale, or similar event.
                </p>
                <p>
                  We may remove, edit, reject, restrict, or disable access to any User Content at
                  any time, with or without notice, if we believe it violates these Terms, may
                  expose the Company to liability, may create safety concerns, or is otherwise
                  inappropriate for the Services.
                </p>
              </div>

              <div>
                <h2 className="font-bold text-brand-title-color text-lg mb-2">
                  Public Location Information
                </h2>
                <p>
                  Listings may include residential addresses, event dates, event times,
                  photographs, and other information that may identify a specific location. By
                  submitting a listing, you acknowledge and agree that such information may be
                  publicly visible to visitors to the Site, search engines, third-party indexing
                  services, and other users. You are solely responsible for deciding whether to
                  make location information publicly available. You should not submit any
                  information that you do not want to be publicly accessible.
                </p>
              </div>

              <div>
                <h2 className="font-bold text-brand-title-color text-lg mb-2">
                  Search Engine Indexing and Archival Copies
                </h2>
                <p>
                  Listings and other public User Content may appear in search engine results,
                  cached pages, third-party archives, screenshots, or other external copies. The
                  Company does not control search engine indexing, third-party sharing,
                  screenshots, caching, or archival systems and cannot guarantee removal of
                  listing information from external platforms after it is removed from the
                  Services.
                </p>
              </div>

              <div>
                <h2 className="font-bold text-brand-title-color text-lg mb-2">
                  Listing Changes, Cancellations, and Accuracy
                </h2>
                <p>
                  Garage and yard sale events may be changed, postponed, canceled, or ended at
                  any time by the listing user. The Company is not responsible for outdated,
                  inaccurate, incomplete, canceled, fraudulent, or misleading listings. Users are
                  responsible for confirming event details before relying on any listing.
                </p>
              </div>

              <div>
                <h2 className="font-bold text-brand-title-color text-lg mb-2">
                  Personal Safety
                </h2>
                <p className="mb-2">
                  Users interact with listings, attend events, communicate with other users, and
                  participate in any transactions at their own risk. The Company does not screen
                  users, inspect locations, verify events, supervise transactions, or guarantee
                  the safety of any person, place, item, or interaction. You are solely
                  responsible for exercising caution, judgment, and appropriate safety measures
                  when attending a listed event or interacting with other users. The Company
                  reserves the right, but has no obligation, to remove, modify, restrict access
                  to, or refuse to publish any listing at any time for any reason, including where
                  the Company believes a listing may violate these Terms, create safety risks,
                  expose the Company to liability, or otherwise be inappropriate for the Services.
                </p>
                <p>
                  The Services are not intended to provide emergency information, real-time event
                  verification, or safety assurances. Users should not rely on listings for
                  time-sensitive decisions, travel planning, or safety-related determinations.
                </p>
              </div>

              <div>
                <h2 className="font-bold text-brand-title-color text-lg mb-2">
                  License to User Content
                </h2>
                <p>
                  By submitting User Content through the Services, you grant the Company a
                  non-exclusive, worldwide, royalty-free, sublicensable, transferable license to
                  use, reproduce, display, publish, distribute, modify, format, and otherwise make
                  available such User Content for purposes of operating, maintaining, improving,
                  promoting, and displaying the Services. You retain ownership of your User
                  Content, subject to the license granted above. You understand that User Content
                  may continue to appear in cached, archived, or external copies after removal
                  from the Services.
                </p>
              </div>

              <div>
                <h2 className="font-bold text-brand-title-color text-lg mb-2">
                  Prohibited Uses
                </h2>
                <p className="mb-2">You agree not to use the Services:</p>
                <ul className="list-disc pl-8 space-y-1">
                  <li>
                    in any manner that violates applicable federal, state, local, or international
                    law or regulation;
                  </li>
                  <li>
                    to submit false, inaccurate, misleading, fraudulent, or deceptive listings;
                  </li>
                  <li>
                    to post listings for events, items, or activities that are unlawful, unsafe,
                    or prohibited;
                  </li>
                  <li>
                    to impersonate any person or entity or misrepresent your affiliation with any
                    person or entity;
                  </li>
                  <li>
                    to post content that is defamatory, abusive, harassing, threatening, obscene,
                    discriminatory, hateful, or otherwise objectionable;
                  </li>
                  <li>
                    to infringe or violate any intellectual property, privacy, publicity,
                    contractual, property, or other rights of any person;
                  </li>
                  <li>
                    to interfere with, disrupt, damage, disable, overburden, or impair the
                    Services;
                  </li>
                  <li>
                    to introduce viruses, malware, harmful code, or other destructive materials;
                  </li>
                  <li>
                    to attempt to gain unauthorized access to the Services, user accounts,
                    systems, servers, or networks;
                  </li>
                  <li>
                    to use bots, spiders, scrapers, crawlers, data-mining tools, or other
                    automated means to access, copy, collect, monitor, or extract data from the
                    Services without prior written permission;
                  </li>
                  <li>
                    to reverse engineer, decompile, disassemble, or otherwise attempt to derive
                    source code or underlying structure of the Services;
                  </li>
                  <li>
                    to use the Services to send spam, unsolicited messages, or unauthorized
                    commercial communications;
                  </li>
                  <li>
                    to use information from the Services for harassment, stalking, fraud, identity
                    theft, or other harmful conduct; and
                  </li>
                  <li>
                    collect, harvest, copy, or store residential address information, event
                    location data, or other listing details for commercial marketing, bulk
                    outreach, resale, aggregation, surveillance, or dataset creation purposes
                    without prior written authorization from the Company.
                  </li>
                </ul>
                <p className="mt-2">
                  We reserve the right to investigate and take appropriate action against
                  violations, including removing listings, suspending accounts, restricting
                  access, and reporting conduct to law enforcement where appropriate.
                </p>
              </div>

              <div>
                <h2 className="font-bold text-brand-title-color text-lg mb-2">
                  Electronic Communications
                </h2>
                <p>
                  By accessing or using the Services, you consent to receive communications from
                  us electronically, including by email, notices posted on the Site, or other
                  electronic means. You agree that all agreements, notices, disclosures, and other
                  communications that we provide electronically satisfy any legal requirement that
                  such communications be in writing.
                </p>
              </div>

              <div>
                <h2 className="font-bold text-brand-title-color text-lg mb-2">
                  Intellectual Property Rights
                </h2>
                <p className="mb-2">
                  The Site and Services, including all content, features, functionality, software,
                  text, graphics, logos, designs, trademarks, service marks, and other materials,
                  excluding User Content, are owned by the Company or its licensors and are
                  protected by intellectual property laws. Subject to your compliance with these
                  Terms, the Company grants you a limited, non-exclusive, non-transferable,
                  revocable license to access and use the Services for personal, non-commercial
                  use. You may not copy, reproduce, distribute, modify, create derivative works
                  of, publicly display, publicly perform, republish, download, store, transmit,
                  sell, sublicense, scrape, or otherwise exploit any portion of the Services
                  except as expressly permitted by these Terms. All rights not expressly granted
                  are reserved by the Company.
                </p>
                <p>
                  If you believe that content available on the Services infringes your copyright,
                  you may submit a written notification to the Company identifying the allegedly
                  infringing material and providing sufficient information for us to locate it,
                  your contact information, a statement of good faith belief that the use is
                  unauthorized, and a statement under penalty of perjury that the information is
                  accurate. The Company may remove allegedly infringing material in accordance
                  with applicable law.
                </p>
              </div>

              <div>
                <h2 className="font-bold text-brand-title-color text-lg mb-2">
                  Third-Party Links and Services
                </h2>
                <p>
                  The Services may contain links to third-party websites, tools, maps, embedded
                  content, or services that are not owned or controlled by the Company. The
                  Company does not control, endorse, verify, or assume responsibility for any
                  third-party websites, services, content, policies, or practices. Your use of
                  third-party services is at your own risk and may be subject to separate terms
                  and privacy policies.
                </p>
              </div>

              <div>
                <h2 className="font-bold text-brand-title-color text-lg mb-2">
                  Disclaimer of Warranties
                </h2>
                <p className="mb-2 uppercase font-semibold text-sm">
                  The Services are provided on an &quot;as is&quot; and &quot;as
                  available&quot; basis without warranties of any kind, whether express or
                  implied.
                </p>
                <p className="mb-2 uppercase text-sm">
                  To the fullest extent permitted by law, the Company disclaims all warranties,
                  express or implied, including warranties of merchantability, fitness for a
                  particular purpose, title, non-infringement, accuracy, availability,
                  reliability, and security.
                </p>
                <p className="uppercase text-sm">
                  The Company does not warrant that: (i) the Services will be uninterrupted,
                  secure, error-free, or available at any particular time or location; (ii) any
                  defects or errors will be corrected; (iii) the Services will be free of viruses
                  or harmful components; (iv) any listing will be accurate, complete, current,
                  lawful, or reliable; (v) any listed event will occur; (vi) any items will be
                  available; or (vii) any user will act lawfully, safely, or honestly.
                </p>
              </div>

              <div>
                <h2 className="font-bold text-brand-title-color text-lg mb-2">
                  Limitation of Liability
                </h2>
                <p className="mb-2 uppercase text-sm">
                  To the fullest extent permitted by law, in no event shall the Company, its
                  affiliates, licensors, service providers, officers, directors, employees,
                  agents, or representatives be liable for any indirect, incidental, consequential,
                  special, exemplary, or punitive damages, including loss of profits, loss of
                  revenue, loss of data, loss of goodwill, business interruption, or personal or
                  property-related damages arising out of or relating to your use of or inability
                  to use the Services.
                </p>
                <p className="mb-2 uppercase text-sm">
                  Without limiting the foregoing, the Company shall not be liable for any damages
                  arising out of or relating to: (i) User Content or listings; (ii) inaccurate,
                  false, misleading, outdated, or fraudulent listings; (iii) canceled or changed
                  events; (iv) conduct of users or third parties; (v) transactions between users;
                  (vi) personal injury, property damage, theft, loss, or disputes arising from
                  attending or relying on a listed event; (vii) search engine indexing or
                  third-party archival copies; or (viii) unauthorized access to or use of your
                  information. To the fullest extent permitted by law, the Company&apos;s total
                  liability arising out of or relating to these Terms or the Services shall not
                  exceed one hundred U.S. dollars ($100).
                </p>
                <p>
                  Some jurisdictions do not allow certain limitations of liability, so some
                  limitations may not apply to you.
                </p>
              </div>

              <div>
                <h2 className="font-bold text-brand-title-color text-lg mb-2">
                  Indemnification
                </h2>
                <p>
                  You agree to defend, indemnify, and hold harmless the Company, its affiliates,
                  licensors, service providers, and each of their respective officers, directors,
                  employees, contractors, agents, representatives, successors, and assigns from
                  and against any claims, demands, actions, damages, liabilities, losses,
                  judgments, penalties, fines, costs, and expenses, including reasonable
                  attorneys&apos; fees, arising out of or relating to: (a) your access to or use
                  of the Services; (b) your User Content or listings; (c) your violation of these
                  Terms; (d) your violation of any applicable law, rule, or regulation; (e) your
                  violation of any third-party right, including intellectual property, privacy,
                  publicity, property, or contractual rights; (f) any dispute, transaction,
                  communication, event, sale, purchase, injury, loss, or damage arising from or
                  relating to a listing you submitted or relied upon; or (g) any false,
                  inaccurate, misleading, unlawful, or incomplete information submitted by you.
                  The Company reserves the right, at its own expense, to assume exclusive defense
                  and control of any matter subject to indemnification. You agree to cooperate
                  with our defense and may not settle any claim without our prior written consent
                  if the settlement imposes any obligation or admission on the Company.
                </p>
              </div>

              <div>
                <h2 className="font-bold text-brand-title-color text-lg mb-2">
                  Termination
                </h2>
                <p>
                  We may suspend, restrict, or terminate your access to the Services at any time,
                  in our sole discretion, for any reason or no reason, including if we believe you
                  have violated these Terms, misused the Services, submitted inaccurate or
                  unlawful content, created risk for other users, or exposed the Company to
                  potential liability. You may stop using the Services at any time. Upon
                  termination, all rights granted to you under these Terms will immediately cease.
                  Provisions that by their nature should survive termination will survive,
                  including provisions relating to intellectual property, User Content licenses,
                  disclaimers, limitation of liability, indemnification, dispute resolution,
                  governing law, and general provisions.
                </p>
              </div>

              <div>
                <h2 className="font-bold text-brand-title-color text-lg mb-2">
                  Dispute Resolution; Binding Arbitration; Class Action Waiver
                </h2>
                <p className="mb-2">
                  To the fullest extent permitted by applicable law, you and the Company agree
                  that any dispute, claim, or controversy arising out of or relating to these
                  Terms, the Site, or the Services shall be resolved exclusively through final and
                  binding arbitration administered by the American Arbitration Association
                  (&quot;AAA&quot;) under its applicable rules. The arbitration shall take place
                  in California unless otherwise required by applicable law. Judgment on the
                  arbitration award may be entered in any court having jurisdiction.
                </p>
                <p className="mb-2 uppercase text-sm">
                  You and the Company agree that arbitration shall be conducted on an individual
                  basis only and not as part of a class, consolidated, collective, or
                  representative action. You and the Company each waive any right to participate
                  in a class action lawsuit, class-wide arbitration, private attorney general
                  action, or other representative proceeding to the fullest extent permitted by
                  law.
                </p>
                <p>
                  Notwithstanding the foregoing, either party may seek injunctive or equitable
                  relief in a court of competent jurisdiction to protect intellectual property
                  rights, confidential information, or against unauthorized access, scraping, or
                  misuse of the Services. You may opt out of this arbitration agreement by sending
                  written notice of your decision to opt out to the Company within thirty (30)
                  days of first accepting these Terms. Your notice must include your name, contact
                  information, and a clear statement that you wish to opt out of arbitration.
                  Opting out of arbitration will not affect any other provisions of these Terms.
                </p>
              </div>

              <div>
                <h2 className="font-bold text-brand-title-color text-lg mb-2">
                  Governing Law and Venue
                </h2>
                <p>
                  These Terms and any dispute arising out of or relating to these Terms or the
                  Services shall be governed by and construed in accordance with the laws of the
                  State of California, without regard to conflict-of-law principles. Subject to
                  the arbitration provision above, you agree that any legal action or proceeding
                  arising out of or relating to these Terms or the Services shall be brought
                  exclusively in the state or federal courts located in California, and you
                  consent to the personal jurisdiction and venue of such courts.
                </p>
              </div>

              <div>
                <h2 className="font-bold text-brand-title-color text-lg mb-2">
                  General Provisions
                </h2>
                <ul className="list-disc pl-8 space-y-2">
                  <li>
                    These Terms constitute the entire agreement between you and the Company
                    regarding your use of the Services and supersede all prior or contemporaneous
                    understandings, agreements, representations, and warranties regarding the
                    Services.
                  </li>
                  <li>
                    If any provision of these Terms is held invalid, illegal, or unenforceable,
                    that provision shall be deemed severed or modified to the minimum extent
                    necessary, and the remaining provisions shall continue in full force and effect.
                  </li>
                  <li>
                    The Company&apos;s failure to enforce any right or provision of these Terms
                    shall not constitute a waiver of such right or provision.
                  </li>
                  <li>
                    You may not assign or transfer these Terms without the Company&apos;s prior
                    written consent. The Company may assign or transfer these Terms without
                    restriction.
                  </li>
                  <li>
                    These Terms do not create any partnership, joint venture, employment,
                    fiduciary, franchise, or agency relationship between you and the Company.
                  </li>
                  <li>
                    No person or entity other than you and the Company has any right to enforce
                    these Terms.
                  </li>
                  <li>
                    The Company shall not be liable for any failure or delay in performance caused
                    by events beyond its reasonable control, including natural disasters, acts of
                    God, labor disputes, governmental actions, power failures, internet or
                    telecommunications interruptions, cyberattacks, platform outages, or other
                    events outside the Company&apos;s reasonable control.
                  </li>
                  <li>Headings are for convenience only and do not affect interpretation.</li>
                </ul>
              </div>

              <div>
                <h2 className="font-bold text-brand-title-color text-lg mb-2">
                  Changes to These Terms
                </h2>
                <p>
                  We may revise or update these Terms from time to time in our sole discretion.
                  Any changes will be effective upon posting the updated Terms on the Site, unless
                  otherwise stated. Your continued access to or use of the Services after revised
                  Terms are posted constitutes acceptance of those changes.
                </p>
              </div>

              <div>
                <h2 className="font-bold text-brand-title-color text-lg mb-2">
                  Contact Information
                </h2>
                <p>If you have questions about these Terms, please contact:</p>
                <p className="mt-2 font-semibold">Find Garage and Yard Sale</p>
                <p className="mt-1">
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

export default TermsAndConditions;
