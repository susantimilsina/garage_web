import box from "../assets/icons/box.png";
import navigation from "../assets/icons/navigation.png";
import search from "../assets/icons/search.png";
import sign_up from "../assets/icons/sign_up.png";

const ICON_COLORS = [
  "bg-brand-green",
  "bg-brand-blue",
  "bg-brand-brown",
  "bg-brand-red",
];

const StepCard = ({ step, index }) => (
  <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow">
    <div
      className={`w-14 h-14 ${ICON_COLORS[index % ICON_COLORS.length]} rounded-2xl flex items-center justify-center mb-4`}
    >
      <img src={step.icon} alt="" className="w-8 h-8" />
    </div>
    <h3 className="font-bold text-brand-title-color font-rethink text-lg mb-2">
      {step.title}
    </h3>
    <p className="text-brand-light-text-color font-rethink text-base leading-relaxed">
      {step.description}
    </p>
  </div>
);

const WorkingSteps = () => {
  const steps = [
    {
      title: "1. Sign Up Easily",
      description:
        "Create an account with your email and a secure password.",
      icon: sign_up,
    },
    {
      title: "2. Seamless Navigation",
      description:
        "Explore and filter local sales with our easy-to-use search features.",
      icon: navigation,
    },
    {
      title: "3. Find Sales or Post Your Own",
      description:
        "Browse neighborhood garage and yard sales, or list your items for sale with a few taps.",
      icon: search,
    },
    {
      title: "4. Complete the Sale",
      description:
        "List your items securely and watch your sale go live for a full week.",
      icon: box,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-brand-title-color font-merriweather">
        How It Works
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, index) => (
          <StepCard key={index} step={step} index={index} />
        ))}
      </div>
    </div>
  );
};

export default WorkingSteps;
