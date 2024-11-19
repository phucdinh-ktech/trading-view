import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
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
  const [isFirst, setIsFirst] = useState<boolean>(true);
  const [isLast, setIsLast] = useState<boolean>(false);
  const handlePrev = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  const length = width >= 1280 ? 4 : 3;
  const handleSlideChange = (swiper: SwiperClass) => {
    if (swiper.activeIndex === 0) {
      setIsFirst(true);
      return;
    }

    if (swiper.activeIndex === length - 1) {
      setIsLast(true);
      return;
    }

    setIsFirst(false);
    setIsLast(false);
  };

  if (width < 768)
    return (
      <div>
        <Swiper
          className="mySwiper"
          modules={[Navigation]}
          breakpoints={{
            300: { slidesPerView: 2.2, spaceBetween: 4 },
            400: {
              slidesPerView: 2.4,
              spaceBetween: 4,
            },
          }}
        >
          <div className="flex justify-start items-center gap-[12px] md:gap-[24px]">
            {Array.from({
              length: 10,
            }).map((_, index) => (
              <SwiperSlide className="h-full" key={index}>
                <MarketIndexCard active={index === 0} />
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </div>
    );
  return (
    <div className="relative px-0 md:px-[55px]">
      <Swiper
        className="mySwiper"
        modules={[Navigation]}
        onSwiper={swiper => {
          swiperRef.current = swiper;
        }}
        onSlideChange={handleSlideChange}
      >
        <SwiperSlide className="h-full">
          <div className="flex justify-start items-center gap-[12px] md:gap-[24px]">
            {Array.from({
              length: length,
            }).map((_, index) => (
              <MarketIndexCard key={index} active={index === 0} />
            ))}
          </div>
        </SwiperSlide>
        <SwiperSlide className="h-full">
          <div className="flex justify-start items-center  gap-[12px] md:gap-[24px]">
            {Array.from({
              length: length,
            }).map((_, index) => (
              <MarketIndexCard key={index} active={index === 0} />
            ))}
          </div>
        </SwiperSlide>
        <SwiperSlide className="h-full">
          <div className="flex justify-start items-center  gap-[12px] md:gap-[24px]">
            {Array.from({
              length: length,
            }).map((_, index) => (
              <MarketIndexCard key={index} active={index === 0} />
            ))}
          </div>
        </SwiperSlide>
      </Swiper>

      <div
        className={clsx(
          "absolute size-[50px] left-0 top-[50%] translate-y-[-50%] bg-white rounded-full shadow-md z-10 cursor-pointer",
          isFirst ? "hidden" : "hidden md:flex justify-center items-center"
        )}
        onClick={handlePrev}
      >
        <div className="w-[10px] h-[16px]">
          <img src={svgs.arrowLeft} className="w-full h-full" />
        </div>
      </div>
      <div
        className={clsx(
          "absolute size-[50px] right-0 top-[50%] translate-y-[-50%] bg-white rounded-full shadow-md z-10 cursor-pointer",
          isLast ? "hidden" : "hidden md:flex justify-center items-center "
        )}
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
