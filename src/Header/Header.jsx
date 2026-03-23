import ImageCarousel from "../ImageCarousel/ImageCarousel";

const Header = () => {
  return (
    <main className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20">
      <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12">
        <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-merriweather mb-3">
            <span className="text-brand-brown">Find </span>
            <span className="text-brand-red">Garage </span>
            <span className="text-brand-blue">& </span>
            <span className="text-brand-green">Yard </span>
            <span className="text-brand-red">Sale</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-brand-title-color mb-2">
            Simple, Secure & Fast.
          </h2>
          <p className="text-lg text-brand-light-text-color font-rethink max-w-xl mx-auto lg:mx-0">
            Connect with Sellers and Buyers In Your Neighborhood
          </p>
        </div>

        <div className="flex-1 order-1 lg:order-2 mb-8 lg:mb-0">
          <div className="w-full max-w-2xl lg:max-w-3xl mx-auto">
            <ImageCarousel />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Header;
