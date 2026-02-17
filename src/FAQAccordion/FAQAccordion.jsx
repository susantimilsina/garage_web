import { useState, useRef } from "react";

const FAQAccordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqItems = [
    {
      question: "How do I post my garage sale?",
      answer: (
        <>
          <ol className="space-y-6">
            <li className="flex flex-col gap-2">
              <h3 className="font-bold text-lg">1. Open the App</h3>
              <p className="text-gray-600">
                Launch Garage and Yard Sale and go to the "My Sale" section and
                go "Add Sale" section.
              </p>
            </li>

            <li className="flex flex-col gap-2">
              <h3 className="font-bold text-lg">2. Enter Sale Details</h3>
              <p className="text-gray-600">
                Input your sale date, time, and address for easy buyer access
                and enhanced shopping experience.
              </p>
            </li>

            <li className="flex flex-col gap-2">
              <h3 className="font-bold text-lg">
                3. Create an Eye-Catching Title
              </h3>
              <p>
                Use a compelling title like "Huge Garage Sale—Furniture, Toys,
                Electronics & More!" to grab the viewer’s attention.
              </p>
            </li>

            <li className="flex flex-col gap-2">
              <h3 className="font-bold text-lg">4. Add Photos</h3>
              <p>
                Upload clear images of your top items to attract more potential
                buyers.
              </p>
            </li>

            <li className="flex flex-col gap-2">
              <h3 className="font-bold text-lg">5. List Featured Items</h3>
              <p>
                Highlight popular categories like "Books, Tools, Clothing,
                Kitchenware" so that shoppers know what to expect.
              </p>
            </li>

            <li className="flex flex-col gap-2">
              <h3 className="font-bold text-lg">6. Post & Share</h3>
              <p>
                Hit “Publish” once you're happy with your post. You can go a
                step further by sharing with your friends and neighbors to
                maximize visibility.
                <br />
                Turn your unused items into cash with a successful garage and
                yard sale TODAY!
              </p>
            </li>
          </ol>

          {/* <p className="mt-2 font-medium">
            Get ready for a successful garage and yard sale and turn your unused
            items into cash!
          </p> */}
        </>
      ),
    },
    {
      question: "How do I find sales near me?",
      answer: (
        <>
          <ol className="space-y-6">
            <li className="flex flex-col gap-2">
              <h3 className="font-bold text-base">1. Open the App</h3>
              <p className="text-gray-600">
                Launch Garage and Yard Sale and navigate to the "Find Sales"
                tab.
              </p>
            </li>

            <li className="flex flex-col gap-2">
              <h3 className="font-bold text-base">
                {" "}
                2. Enable Location Services{" "}
              </h3>
              <p className="text-gray-600">
                Grant the app location access to view nearby sales.
              </p>
            </li>

            <li className="flex flex-col gap-2">
              <h3 className="font-bold text-base">3. View Sales</h3>
              <p className="text-gray-600">
                Choose between map or list view to see details on local sales.
              </p>
            </li>

            <li className="flex flex-col gap-2">
              <h3 className="font-bold text-base"> 4. Apply Filters</h3>
              <p className="text-gray-600">
                Refine your search by sale date or category like “furniture,”
                “electronics,” or “kids’ toys” to find exactly what you’re
                looking for.
              </p>
            </li>

            <li className="flex flex-col gap-2">
              <h3 className="font-bold text-base">5. Save & Get Directions</h3>
              <p className="text-gray-600">
                Save interesting sales to save it to your list by tapping on it,
                and get directions for easy navigation.
              </p>
            </li>
          </ol>
          <p className="mt-2">
            Ready to explore? Start discovering the best deals in your
            neighborhood with Garage and Yard Sale!
          </p>
        </>
      ),
    },
    {
      question: "Is it free to use the app?",
      answer:
        "Yes! The Garage and Yard Sale app is free to browse and explore. Users can search and save local garage and yard sales without any hidden fees. While browsing is free, posting a sale requires a 10$ fee for a 3-day listing period.",
    },
    {
      question: "What is the cost to post a sale?",
      answer:
        "Posting a 3-day sale on Garage and Yard Sale costs 10$. This covers photo uploads, detailed sales listing, and local buyer reach, without the additional hassle of printing or advertising. Allow us to help make your sale a success!",
    },
  ];

  return (
    <div className="container w-full max-w-2xl mx-auto py-14">
      <h2 className="text-center text-4xl font-bold mb-14 text-brand-title-color">
        Frequently asked questions
      </h2>
      {faqItems.map((item, index) => (
        <AccordionItem
          key={index}
          item={item}
          isActive={activeIndex === index}
          onClick={() => setActiveIndex(activeIndex === index ? null : index)}
        />
      ))}
    </div>
  );
};

const AccordionItem = ({ item, isActive, onClick }) => {
  const contentRef = useRef(null);

  return (
    <div className="border-b border-gray-200 pb-5">
      <button
        onClick={onClick}
        className="flex justify-between w-full py-4 text-basefont-medium text-left focus:outline-none font-rethink"
      >
        {item.question}
        <span className="transform transition-transform duration-300 ease-in-out">
          <svg
            className={`w-5 h-5 transition-transform duration-300 ${
              isActive ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: isActive ? contentRef.current?.scrollHeight + "px" : "0",
        }}
      >
        <div className="pb-4 text-gray-700 font-rethink text-base">
          {item.answer}
        </div>
      </div>
    </div>
  );
};

export default FAQAccordion;
