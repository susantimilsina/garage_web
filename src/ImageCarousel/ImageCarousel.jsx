import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import intro1 from "../assets/sliders/slider_1.jpg";
import intro2 from "../assets/sliders/slider_2.jpg";
import intro3 from "../assets/sliders/slider_3.jpg";
// import intro4 from "../assets/sliders/slider_4.png";
// import intro5 from "../assets/sliders/5.jpg";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

export default function ImageCarousel() {
  const slides = [
    { url: intro1, title: "Mobile Screen 1" },
    { url: intro2, title: "Mobile Screen 2" },
    { url: intro3, title: "Mobile Screen 3" },
  ];

  // Preload images to reduce blinking
  slides.forEach((slide) => {
    const img = new Image();
    img.src = slide.url;
  });

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
              className="w-full h-auto max-h-[320px] sm:max-h-[400px] md:max-h-[450px] object-fit rounded-2xl shadow-lg"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
