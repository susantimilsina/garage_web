import React from "react";
import iphone_image from "../../src/assets/iphone_image.png";
import garage_sale from "../../src/assets/garage_sale.png";
import yard_table from "../../src/assets/yard_table.png";
import { ClockIcon, LocationIcon } from "../common/SvgIcons/SvgIcons";

// Reusable Card Component
const SaleCard = ({ image, title, date, location, color, borderColor }) => (
  <div
    className={`absolute ${borderColor} shadow-lg rounded-lg p-4 border-2 flex items-center space-x-4 max-w-xs bg-${color}`}
  >
    <img
      src={image}
      alt={title}
      className="w-12 h-12 rounded-md object-cover"
    />
    <div>
      <h3 className="text-lg font-bold font-rethink">{title}</h3>
      <div className="flex items-center space-x-2 text-sm text-gray-500 font-rethink">
        <ClockIcon color="red" />
        <p>{date}</p>
      </div>
      <div className="flex items-center space-x-2 text-sm text-gray-500 font-rethink">
        <LocationIcon color="green" />
        <span>{location}</span>
      </div>
    </div>
  </div>
);

const SalesItems = () => {
  return (
    <div className="container flex items-center justify-center min-h-screen">
      <div className="relative">
        <img
          src={iphone_image}
          alt="Combined iPhone"
          className="block w-[815px] h-[560px] mx-auto"
        />
        <SaleCard
          image={garage_sale}
          title="Garage Sale"
          date="Sep 11, 2024 - 8:00 AM - 10:00 AM"
          location="10043 Blackbonnet Dr, McMonterey Pl..."
          color="brand-light-pink"
          borderColor="border-pink-200 top-8 left-8"
        />
        <SaleCard
          image={yard_table}
          title="Yard Table Sale"
          date="Sep 27, 2024 - 8:00 AM - 10:00 AM"
          location="10043 Blackbonnet Dr, McMonterey Pl..."
          color="brand-light-green"
          borderColor="border-green-400 bottom-20 right-2"
        />
      </div>
    </div>
  );
};

export default SalesItems;
