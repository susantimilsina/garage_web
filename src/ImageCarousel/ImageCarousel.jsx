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
    <div className="container">
      <Swiper
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        spaceBetween={70}
        className="swiper-container"
        pagination={{ clickable: true }}
        autoplay={{
          delay: 1000, // Set to 2000ms for smoother transitions
          disableOnInteraction: false,
        }}
        speed={2000} // Reduced speed for smoother transitions
        navigation={true}
        modules={[Pagination, Navigation, Autoplay]}
        loop={true}
        grabCursor={true}
        style={{ width: "75%" }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <img
              src={slide.url}
              alt={slide.title}
              className="w-full rounded-[16px]"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
