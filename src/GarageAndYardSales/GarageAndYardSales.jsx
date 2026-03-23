import { Link } from "react-router-dom";
import box from "../assets/icons/box.png";
import compass from "../assets/icons/compass.png";
import rocket from "../assets/icons/rocket.png";
import security from "../assets/icons/security.png";
import connection from "../assets/icons/connection.png";
import eco from "../assets/icons/eco.png";
import clean from "../assets/icons/clean.png";
import save_money from "../assets/icons/save-money.png";

const ICON_BGS = [
  "bg-brand-brown",
  "bg-brand-green",
  "bg-brand-blue",
  "bg-brand-red",
  "bg-brand-brown",
  "bg-brand-green",
  "bg-brand-blue",
  "bg-brand-red",
];

const FeatureCard = ({ imgSrc, title, description, iconBg }) => (
  <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow h-full flex flex-col">
    <div
      className={`w-14 h-14 ${iconBg} rounded-2xl flex items-center justify-center mb-4 flex-shrink-0`}
    >
      <img src={imgSrc} alt="" className="w-8 h-8" />
    </div>
    <h3 className="font-bold text-brand-title-color font-rethink text-lg mb-2">
      {title}
    </h3>
    <p className="text-brand-light-text-color font-rethink text-base leading-relaxed flex-grow">
      {description}
    </p>
  </div>
);

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
      title: "2. Excellent way to find your Treasure",
      description:
        'With our garage and yard sales, you get to turn items otherwise trashed by others into valuable "treasures."',
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
      description:
        "Securely connect with sellers or buyers through our in-app messaging system for safe transactions.",
    },
    {
      imgSrc: eco,
      title: "5. The Eco-Friendly Choice",
      description:
        "Support sustainability by giving your items a second life and promoting reuse within your community.",
    },
    {
      imgSrc: save_money,
      title: "6. Zero Hidden Costs",
      description:
        "Skip shipping fees, platform charges, or placard expenses–all transactions are conducted in person. Massive savings are guaranteed for everyone.",
    },
    {
      imgSrc: connection,
      title: "7. Community Connection",
      description:
        "Establish your terms – from pricing to timing and enjoy a hassle-free selling experience right from the comfort of your home.",
    },
    {
      imgSrc: clean,
      title: "8. Keep your Community Clean",
      description:
        "With a well-organized garage sale, you declutter your space without having to put up street signs, creating a welcoming treasure trove for local shoppers.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-brand-title-color font-merriweather">
        Why Choose Garage and Yard Sale?
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            imgSrc={feature.imgSrc}
            title={feature.title}
            description={feature.description}
            iconBg={ICON_BGS[index]}
          />
        ))}
      </div>

      <div className="text-center mt-10">
        <Link
          to="/sales"
          className="inline-block text-brand-blue font-bold font-rethink hover:underline"
        >
          Find Garage Sales in Your Neighborhood →
        </Link>
      </div>
    </div>
  );
};

export default GarageAndYardSales;
