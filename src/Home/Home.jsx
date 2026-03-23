import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";
import GarageAndYardSales from "../GarageAndYardSales/GarageAndYardSales";
import DownloadApp from "../DownloadApp/DownloadApp";
import FAQAccordion from "../FAQAccordion/FAQAccordion";
import Footer from "../Footer/Footer";
import WorkingSteps from "../WorkingSteps/WorkingSteps";
import FindSalesCta from "../components/FindSalesCta/FindSalesCta";
import SeoHead from "../components/SeoHead/SeoHead";

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I post my garage sale?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Open the app, go to My Sale > Add Sale. Enter sale date, time, and address. Create a compelling title, add photos, list featured categories, then hit Publish. Share with friends to maximize visibility.",
      },
    },
    {
      "@type": "Question",
      name: "How do I find sales near me?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Open the Find Sales tab, enable location services, view sales in map or list view. Apply filters by date or category. Save interesting sales and get directions.",
      },
    },
    {
      "@type": "Question",
      name: "Is it free to use the app?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! Browsing and exploring garage sales is free. Posting a sale costs $10 for a 3-day listing.",
      },
    },
    {
      "@type": "Question",
      name: "What is the cost to post a sale?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Posting a 3-day sale costs $10. This covers photo uploads, detailed listing, and local buyer reach.",
      },
    },
  ],
};

const Home = () => {
  return (
    <div className="min-h-screen">
      <SeoHead
        title="Find Garage & Yard Sale - Discover Local Sales Near You"
        description="Discover local garage and yard sales near you. Simple, secure, and fast. Connect with sellers and buyers in your neighborhood. Browse sales or post your own."
        faqSchema={FAQ_SCHEMA}
      />
      <Navbar />

      <section id="home" className="bg-white pt-16">
        <Header />
      </section>

      <FindSalesCta />

      <section id="how_it_works" className="py-16 md:py-20 bg-white">
        <WorkingSteps />
      </section>

      <section id="why_choose_us" className="py-16 md:py-20 bg-brand-light-border-pink">
        <GarageAndYardSales />
      </section>

      <section id="get_the_app">
        <DownloadApp />
      </section>

      <section id="faqs" className="py-16 md:py-20 bg-brand-light-border-green">
        <FAQAccordion />
      </section>

      <section id="about_us">
        <Footer />
      </section>
    </div>
  );
};

export default Home;
