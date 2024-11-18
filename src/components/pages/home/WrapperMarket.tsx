import { useRef } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";

import svgs from "@/assets/svgs";
import "swiper/css";
import "swiper/css/navigation";
import MarketIndexCard from "@/components/common/MarketIndexCard";

import useWindowSize from "../../../hooks/useWindowSize";

const WrapperMarket = () => {
  const { width } = useWindowSize();
  const swiperRef = useRef<SwiperClass | null>(null);
  const handlePrev = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  const length = width >= 1280 ? 4 : width >= 1024 ? 3 : 2;

  return (
    <div className="relative px-[55px]">
      <Swiper
        className="mySwiper"
        modules={[Navigation]}
        onSwiper={swiper => {
          swiperRef.current = swiper;
        }}
      >
        <SwiperSlide>
          <div className="flex justify-start items-center gap-[24px]">
            {Array.from({
              length: length,
            }).map((_, index) => (
              <MarketIndexCard key={index} active={index === 0} />
            ))}
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex justify-start items-center gap-[12px]">
            {Array.from({
              length: length,
            }).map((_, index) => (
              <MarketIndexCard key={index} active={index === 0} />
            ))}
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex justify-start items-center gap-[12px]">
            {Array.from({
              length: length,
            }).map((_, index) => (
              <MarketIndexCard key={index} active={index === 0} />
            ))}
          </div>
        </SwiperSlide>
      </Swiper>

      <div
        className="absolute size-[50px] flex justify-center items-center left-0 top-[50%] translate-y-[-50%] bg-white rounded-full shadow-md z-10 cursor-pointer"
        onClick={handlePrev}
      >
        <div className="w-[10px] h-[16px]">
          <img src={svgs.arrowLeft} className="w-full h-full" />
        </div>
      </div>
      <div
        className="absolute size-[50px] flex justify-center items-center right-0 top-[50%] translate-y-[-50%] bg-white rounded-full shadow-md z-10 cursor-pointer"
        onClick={handleNext}
      >
        <div className="w-[10px] h-[16px]">
          <img src={svgs.arrowRight} className="w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default WrapperMarket;
