import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";
import SeoHead from "../../components/SeoHead/SeoHead";
import { ClockIcon, LocationIcon } from "../../common/SvgIcons/SvgIcons";
import { getSaleById } from "../../api/garageYardApi";
import {
  formatAddress,
  formatSaleDates,
  formatAllTimeSlots,
  getSaleImages,
  getSaleThumbnail,
  isSaleExpired,
} from "../../utils/saleHelpers";
import { APP_STORE_URL, PLAY_STORE_URL } from "../../common/constants";
import play_store from "../../assets/play_store.png";
import app_store from "../../assets/app_store.png";
import garage_sale from "../../assets/garage_sale.png";

const SaleDetail = () => {
  const { id } = useParams();
  const [sale, setSale] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) {
      setNotFound(true);
      setLoading(false);
      return;
    }
    const fetchSale = async () => {
      setLoading(true);
      setNotFound(false);
      try {
        const data = await getSaleById(id);
        setSale(data);
        setNotFound(!data);
      } catch {
        setNotFound(true);
        setSale(null);
      } finally {
        setLoading(false);
      }
    };
    fetchSale();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <div className="flex-grow flex items-center justify-center py-32">
          <div className="animate-pulse text-center">
            <div className="w-16 h-16 bg-brand-light-orange rounded-full mx-auto mb-4" />
            <p className="text-brand-light-text-color font-rethink">
              Loading sale...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (notFound || !sale) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-grow flex items-center justify-center px-6 py-24">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-brand-title-color font-merriweather mb-4">
              Sale Not Found
            </h1>
            <p className="text-brand-light-text-color font-rethink mb-6">
              This sale may have expired or been removed.
            </p>
            <Link
              to="/sales"
              className="inline-block bg-brand-blue text-white px-8 py-3 rounded-full font-bold font-rethink hover:bg-brand-blue/90"
            >
              Browse All Sales
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const images = getSaleImages(sale);
  const thumbnail = getSaleThumbnail(sale) || garage_sale;
  const fallbackImages = images.length > 0 ? images : [thumbnail];
  const title = sale?.title || "Garage Sale";
  const description = sale?.description || "";
  const type = sale?.type || "Garage";
  const address = formatAddress(
    sale?.location ?? sale?.address ?? sale?.place
  );
  const dateStr = formatSaleDates(sale);
  const categories = sale?.category ?? sale?.categories ?? [];
  const categoryNames = categories
    .map((c) => (typeof c === "string" ? c : c?.name))
    .filter(Boolean);
  const expired = isSaleExpired(sale);
  const timeSlotStrings = formatAllTimeSlots(sale);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SeoHead
        title={`${title} - Find Garage & Yard Sale`}
        description={
          description
            ? `${description.slice(0, 155)}...`
            : `${type} sale - ${address}. ${dateStr}`
        }
        path={`/sale/${id}`}
        image={
          fallbackImages[0]?.startsWith("http") ? fallbackImages[0] : undefined
        }
        breadcrumbItems={[
          { name: "Home", url: "/" },
          { name: "Sales", url: "/sales" },
          { name: title, url: undefined },
        ]}
      />
      <Navbar />

      <main className="flex-grow pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          {/* Breadcrumb */}
          <nav className="text-sm text-brand-light-text-color font-rethink mb-6" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-brand-blue">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link to="/sales" className="hover:text-brand-blue">
              Sales
            </Link>
            <span className="mx-2">/</span>
            <span className="text-brand-title-color line-clamp-1">{title}</span>
          </nav>

          {/* Image carousel */}
          <div className="mb-8 rounded-xl overflow-hidden shadow-md border border-gray-100">
            {fallbackImages.length > 1 ? (
              <Swiper
                pagination={{ clickable: true }}
                navigation
                modules={[Pagination, Navigation]}
              >
                {fallbackImages.map((img, i) => (
                  <SwiperSlide key={i}>
                    <img
                      src={img}
                      alt={`${title} - Image ${i + 1}`}
                      className="w-full aspect-video object-cover"
                      onError={(e) => {
                        e.target.src = garage_sale;
                      }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <img
                src={fallbackImages[0]}
                alt={title}
                className="w-full aspect-video object-cover"
                onError={(e) => {
                  e.target.src = garage_sale;
                }}
              />
            )}
          </div>

          {/* Content card */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden mb-8">
            <div className="p-6 md:p-8">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-block px-4 py-1.5 bg-brand-blue text-white text-sm font-semibold rounded-full">
                  {type}
                </span>
                {expired && (
                  <span className="inline-block px-4 py-1.5 bg-brand-red text-white text-sm font-semibold rounded-full">
                    Expired
                  </span>
                )}
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-brand-title-color font-merriweather mb-4">
                {title}
              </h1>
              {expired && (
                <p className="text-brand-light-text-color font-rethink mb-4 -mt-2">
                  This sale has ended. Browse other listings below.
                </p>
              )}

              <div className="flex flex-wrap gap-6 text-brand-light-text-color font-rethink mb-6">
                <div className="flex items-start gap-2">
                  <span className="shrink-0 mt-0.5">
                    <ClockIcon color="red" />
                  </span>
                  {timeSlotStrings.length > 0 ? (
                    timeSlotStrings.length === 1 ? (
                      <span>{timeSlotStrings[0]}</span>
                    ) : (
                      <ul className="list-disc list-inside space-y-1">
                        {timeSlotStrings.map((slot, i) => (
                          <li key={i}>{slot}</li>
                        ))}
                      </ul>
                    )
                  ) : (
                    <span>{dateStr}</span>
                  )}
                </div>
                <div className="flex items-start gap-2">
                  <LocationIcon color="green" />
                  <span>{address}</span>
                </div>
              </div>

              {categoryNames.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {categoryNames.map((name) => (
                    <span
                      key={name}
                      className="px-3 py-1 bg-brand-light-orange text-brand-brown rounded-full text-sm font-rethink"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              )}

              {description && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-brand-title-color font-rethink mb-2">
                    Description
                  </h2>
                  <p className="text-brand-light-text-color font-rethink whitespace-pre-wrap leading-relaxed">
                    {description}
                  </p>
                </div>
              )}

              {/* Open in App CTA */}
              <div className={`border-t border-gray-200 pt-8 -mx-6 md:-mx-8 -mb-6 md:-mb-8 px-6 md:px-8 py-6 rounded-b-xl ${expired ? "bg-gray-100" : "bg-brand-light-orange/30"}`}>
                <h3 className="text-lg font-bold text-brand-title-color font-rethink mb-2">
                  {expired ? "Sale Ended" : "Open in App"}
                </h3>
                <p className="text-brand-light-text-color font-rethink mb-4">
                  {expired
                    ? "This listing has expired. Download the app to find active garage and yard sales near you."
                    : "Get directions, save this sale, and message the seller in the Garage & Yard Sale app."}
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href={PLAY_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={play_store}
                      alt="Get Find Garage and Yard Sale on Google Play"
                      className="h-12"
                    />
                  </a>
                  <a
                    href={APP_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={app_store}
                      alt="Download Find Garage and Yard Sale on the App Store"
                      className="h-12"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SaleDetail;
