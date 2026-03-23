import { Link } from "react-router-dom";

const FindSalesCta = () => {
  return (
    <section
      id="find_sales"
      className="py-16 md:py-20 bg-brand-light-orange"
      aria-labelledby="find-sales-heading"
    >
      <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
        <h2
          id="find-sales-heading"
          className="text-2xl md:text-3xl font-bold text-brand-title-color font-merriweather mb-4"
        >
          Discover Garage & Yard Sales in Your Neighborhood
        </h2>
        <p className="text-brand-light-text-color font-rethink text-lg mb-8 max-w-2xl mx-auto">
          Browse local sales, find great deals on furniture, electronics, toys,
          and more. Connect with sellers and buyers near you.
        </p>
        <Link
          to="/sales"
          className="inline-flex items-center justify-center bg-brand-blue text-white px-10 py-4 rounded-full font-bold font-rethink hover:bg-brand-blue/90 transition-colors text-lg"
        >
          Browse All Sales
        </Link>
      </div>
    </section>
  );
};

export default FindSalesCta;
