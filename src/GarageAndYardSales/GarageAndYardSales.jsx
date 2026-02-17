import box from "../assets/icons/box.png";
import compass from "../assets/icons/compass.png";
import rocket from "../assets/icons/rocket.png";
import security from "../assets/icons/security.png";
import connection from "../assets/icons/connection.png";
import eco from "../assets/icons/eco.png";
import clean from "../assets/icons/clean.png";
import save_money from "../assets/icons/save-money.png";

// FeatureCard Component
const FeatureCard = ({ imgSrc, title, description }) => {
  return (
    <div className="w-full sm:w-2/5 lg:w-1/4 p-3 my-2">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 bg-brand-brown rounded-2xl flex items-center justify-center mb-3">
          <img src={imgSrc} alt={title} />
        </div>
        <h3 className="font-semibold mb-1 font-rethink text-brand-text-color text-base leading-6	text-center">
          {title}
        </h3>
        <p className="text-base text-center max-w-[400px] font-rethink text-brand-light-text-color leading-6	">
          {description}
        </p>
      </div>
    </div>
  );
};

const GarageAndYardSales = () => {
  const features = [
    {
      imgSrc: box,
      title: "1. Sell Smartly, Earn Instantly",
      description:
        "Post your garage or yard sale with photos, image descriptions, and preferred dates. Transform your unwanted items into immediate cash.",
    },
    {
      imgSrc: rocket,
      title: "2. Excellent way to find your Treasure ",
      description: (
        <>
          With our garage and yard sales, you get to turn items otherwise
          trashed by others into valuable "treasures."
        </>
      ),
    },
    {
      imgSrc: compass,
      title: "3. Find Nearby Sales",
      description:
        "Search for sales going on around your neighborhood through our convenient list views and maps.",
    },

    {
      imgSrc: security,
      title: "4. Safe and Secure Platform",
      description: (
        <>
          Securely connect with sellers or buyers through our in-app messaging
          system for safe transactions.
        </>
      ),
    },
    {
      imgSrc: eco,
      title: "5. The Eco-Friendly Choice",
      description: (
        <>
          Support sustainability by giving your items a second life and
          promoting reuse within your community.
        </>
      ),
    },
    {
      imgSrc: save_money,
      title: "6. Zero Hidden Costs ",
      description: (
        <>
          Skip shipping fees, platform charges, or placard expenses–all
          transactions are conducted in person. Massive savings are guaranteed
          for everyone.
        </>
      ),
    },
    {
      imgSrc: connection,
      title: "7. Community Connection ",
      description: (
        <>
          Establish your terms – from pricing to timing and enjoy a hassle-free
          selling experience right from the comfort of your home.
        </>
      ),
    },
    {
      imgSrc: clean,
      title: "8. Keep your Community Clean ",
      description: (
        <>
          With a well-organized garage sale, you declutter your space without
          having to put up street signs, creating a welcoming treasure trove for
          local shoppers.
        </>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-14 text-brand-title-color">
        Why Choose Garage and Yard Sale?
      </h1>

      <div className="flex flex-wrap justify-center">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            imgSrc={feature.imgSrc}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </div>
  );
};

export default GarageAndYardSales;
