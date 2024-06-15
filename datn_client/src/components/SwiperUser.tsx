import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { gallerys } from "../data/gallerys";
import { Swiper as SwiperType } from "swiper";

const SwiperUser = () => {
     const handleSwiper = (swiper: SwiperType) => {
          console.log(swiper);
     };

     return (
          <Swiper
               spaceBetween={0}
               slidesPerView={1}
               modules={[Navigation, Pagination]}
               navigation
               pagination={{ clickable: true }}
               onSlideChange={() => console.log("slide change")}
               onSwiper={handleSwiper}
          >
               {gallerys.map((slide) => (
                    <SwiperSlide key={slide.id}>
                         <img src={slide.urlImage} alt={slide.name} />
                    </SwiperSlide>
               ))}
          </Swiper>
     );
};

export default SwiperUser;
