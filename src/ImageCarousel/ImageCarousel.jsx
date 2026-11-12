import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
// Served from public/ under fixed names, so index.html can start the first one downloading early
const intro1 = "/hero/slider_1.webp";
const intro2 = "/hero/slider_2.webp";
const intro3 = "/hero/slider_3.webp";
// import intro4 from "../assets/sliders/slider_4.png";
// import intro5 from "../assets/sliders/5.jpg";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

export default function ImageCarousel() {
  const slides = [
    { url: intro1, title: "Mobile Screen 1" },
    { url: intro2, title: "Mobile Screen 2" },
    { url: intro3, title: "Mobile Screen 3" },
  ];

  return (
    <div className="w-full">
      <Swiper
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 16 },
          640: { slidesPerView: 1, spaceBetween: 24 },
          768: { slidesPerView: 2, spaceBetween: 24 },
          1024: { slidesPerView: 3, spaceBetween: 32 },
        }}
        className="swiper-container !overflow-visible"
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        speed={600}
        navigation={true}
        modules={[Pagination, Navigation, Autoplay]}
        loop={true}
        grabCursor={true}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="!h-auto">
            <img
              src={slide.url}
              alt={slide.title}
              width={440}
              height={934}
              // The first slide is usually the largest thing on screen, so it loads first
              loading={index === 0 ? "eager" : "lazy"}
              // React 18 only renders this attribute in lowercase
              // eslint-disable-next-line react/no-unknown-property
              fetchpriority={index === 0 ? "high" : "auto"}
              decoding="async"
              className="w-full h-auto max-h-[320px] sm:max-h-[400px] md:max-h-[450px] object-fit rounded-2xl shadow-lg"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
