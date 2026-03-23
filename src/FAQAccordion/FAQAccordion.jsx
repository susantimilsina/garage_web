import { useState, useRef } from "react";

const FAQAccordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqItems = [
    {
      question: "How do I post my garage sale?",
      answer: (
        <ol className="space-y-4 list-decimal list-inside font-rethink text-brand-light-text-color">
          <li className="pl-2">
            <strong className="text-brand-title-color">Open the App</strong> –
            Launch Garage and Yard Sale and go to "My Sale" → "Add Sale".
          </li>
          <li className="pl-2">
            <strong className="text-brand-title-color">Enter Sale Details</strong>{" "}
            – Input your sale date, time, and address.
          </li>
          <li className="pl-2">
            <strong className="text-brand-title-color">
              Create an Eye-Catching Title
            </strong>{" "}
            – Use a compelling title like "Huge Garage Sale—Furniture, Toys,
            Electronics & More!"
          </li>
          <li className="pl-2">
            <strong className="text-brand-title-color">Add Photos</strong> –
            Upload clear images of your top items.
          </li>
          <li className="pl-2">
            <strong className="text-brand-title-color">List Featured Items</strong>{" "}
            – Highlight categories like Books, Tools, Clothing, Kitchenware.
          </li>
          <li className="pl-2">
            <strong className="text-brand-title-color">Post & Share</strong> –
            Hit "Publish" and share with friends to maximize visibility.
          </li>
        </ol>
      ),
    },
    {
      question: "How do I find sales near me?",
      answer: (
        <ol className="space-y-4 list-decimal list-inside font-rethink text-brand-light-text-color">
          <li className="pl-2">
            <strong className="text-brand-title-color">Open the App</strong> –
            Navigate to the "Find Sales" tab.
          </li>
          <li className="pl-2">
            <strong className="text-brand-title-color">
              Enable Location Services
            </strong>{" "}
            – Grant location access to view nearby sales.
          </li>
          <li className="pl-2">
            <strong className="text-brand-title-color">View Sales</strong> –
            Choose between map or list view.
          </li>
          <li className="pl-2">
            <strong className="text-brand-title-color">Apply Filters</strong> –
            Refine by sale date or category (furniture, electronics, kids' toys).
          </li>
          <li className="pl-2">
            <strong className="text-brand-title-color">Save & Get Directions</strong>{" "}
            – Save interesting sales and get directions.
          </li>
        </ol>
      ),
    },
    {
      question: "Is it free to use the app?",
      answer:
        "Yes! The Garage and Yard Sale app is free to browse and explore. Users can search and save local garage and yard sales without any hidden fees. While browsing is free, posting a sale requires a $10 fee for a 3-day listing period.",
    },
    {
      question: "What is the cost to post a sale?",
      answer:
        "Posting a 3-day sale on Garage and Yard Sale costs $10. This covers photo uploads, detailed sales listing, and local buyer reach, without the additional hassle of printing or advertising.",
    },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 md:px-6">
      <h2 className="text-center text-2xl md:text-3xl font-bold mb-12 text-brand-title-color font-merriweather">
        Frequently asked questions
      </h2>
      <div className="space-y-3">
        {faqItems.map((item, index) => (
          <AccordionItem
            key={index}
            item={item}
            isActive={activeIndex === index}
            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
          />
        ))}
      </div>
    </div>
  );
};

const AccordionItem = ({ item, isActive, onClick }) => {
  const contentRef = useRef(null);

  return (
    <div
      className={`rounded-lg border-2 transition-colors ${
        isActive ? "border-brand-blue bg-white shadow-md" : "border-gray-200 bg-white hover:border-brand-light-orange"
      }`}
    >
      <button
        onClick={onClick}
        className="flex justify-between w-full py-4 px-5 text-left font-bold text-brand-title-color font-rethink focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-inset rounded-lg"
        aria-expanded={isActive}
      >
        {item.question}
        <svg
          className={`w-5 h-5 flex-shrink-0 ml-2 transition-transform duration-300 text-brand-blue ${
            isActive ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: isActive ? contentRef.current?.scrollHeight + "px" : 0 }}
      >
        <div className="px-5 pb-5 text-brand-light-text-color font-rethink text-base">
          {item.answer}
        </div>
      </div>
    </div>
  );
};

export default FAQAccordion;
