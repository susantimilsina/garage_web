import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";
import GarageAndYardSales from "../GarageAndYardSales/GarageAndYardSales";
import DownloadApp from "../DownloadApp/DownloadApp";
import FAQAccordion from "../FAQAccordion/FAQAccordion";
import Footer from "../Footer/Footer";
import WorkingSteps from "../WorkingSteps/WorkingSteps";

const Home = () => {
  return (
    <div className="bg-white p-6">
      <Navbar />

      <section id="home">
        <Header />
      </section>
      <div className="mb-11"></div>
      <section id="why_choose_us">
        <GarageAndYardSales />
      </section>
      <div className="mb-11"></div>
      <section id="how_it_works">
        <WorkingSteps />
      </section>
      <div className="mb-11"></div>
      <section id="get_the_app">
        <DownloadApp />
      </section>
      <div className="mb-11"></div>
      <section id="faqs">
        <FAQAccordion />
      </section>
      <div className="mb-11"></div>

      <section id="about_us">
        <Footer />
      </section>
    </div>
  );
};

export default Home;
