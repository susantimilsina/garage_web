import { Link } from "react-router-dom";
import { ClockIcon, LocationIcon } from "../../common/SvgIcons/SvgIcons";
import { getSaleThumbnail, formatAddress, formatSaleDates, isSaleExpired } from "../../utils/saleHelpers";
import garage_sale from "../../assets/garage_sale.png";

const typeBadgeColors = {
  Garage: "bg-brand-pink text-brand-red",
  Yard: "bg-brand-light-green text-brand-green",
  Estate: "bg-brand-light-orange text-brand-brown",
};

const SaleCard = ({ sale }) => {
  const thumbnail = getSaleThumbnail(sale) || garage_sale;
  const title = sale?.title || "Untitled Sale";
  const type = sale?.type || "Garage";
  const expired = isSaleExpired(sale);
  const dateStr = formatSaleDates(sale);
  const address = formatAddress(sale?.location);
  const badgeClass = typeBadgeColors[type] || typeBadgeColors.Garage;
  const categories = sale?.category ?? sale?.categories ?? [];
  const categoryNames = categories
    .map((c) => (typeof c === "string" ? c : c?.name))
    .filter(Boolean)
    .slice(0, 3)
    .join(", ");

  return (
    <Link
      to={`/sale/${sale?.id}`}
      className="block bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 font-rethink"
    >
      <div className="aspect-video bg-brand-light-orange/20 relative overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e) => {
            e.target.src = garage_sale;
          }}
        />
        <span
          className={`absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full ${badgeClass}`}
        >
          {type}
        </span>
        {expired && (
          <span className="absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full bg-brand-red text-white">
            Expired
          </span>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-brand-title-color line-clamp-2 mb-3 font-rethink">
          {title}
        </h3>
        <div className="flex items-start gap-2 text-sm text-brand-light-text-color mb-2 font-rethink">
          <ClockIcon color="red" />
          <span className="line-clamp-1">{dateStr}</span>
        </div>
        <div className="flex items-start gap-2 text-sm text-brand-light-text-color font-rethink">
          <LocationIcon color="green" />
          <span className="line-clamp-2">{address}</span>
        </div>
        {categoryNames && (
          <p className="text-xs text-brand-light-text-color mt-3 line-clamp-1 font-rethink">
            {categoryNames}
          </p>
        )}
      </div>
    </Link>
  );
};

export default SaleCard;
