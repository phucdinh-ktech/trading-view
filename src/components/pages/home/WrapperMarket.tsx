import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";

import svgs from "@/assets/svgs";
import "swiper/css";
import "swiper/css/navigation";
import MarketIndexCard from "@/components/common/MarketIndexCard";
import useFetchTopVolumeFull, {
  CustomVolumeFullType,
} from "@/libs/swr/useFetchTopVolumeFull";

import useWindowSize from "../../../hooks/useWindowSize";

const WrapperMarket = () => {
  const { width } = useWindowSize();
  const swiperRef = useRef<SwiperClass | null>(null);
  const [isFirst, setIsFirst] = useState<boolean>(true);
  const [isLast, setIsLast] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>();
  const [subs, setSubs] = useState<string[]>([]);
  const [currentData, setCurrentData] = useState<CustomVolumeFullType[]>([]);
  const handlePrev = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  const { showData, isLoading } = useFetchTopVolumeFull({
    tsym: "USD",
    limit: 16,
  });

  const chunkArray = (
    array: CustomVolumeFullType[],
    size: number
  ): CustomVolumeFullType[][] => {
    const result: CustomVolumeFullType[][] = []; // Array of arrays (2D array)
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  const chunkedDataDesktop = chunkArray(currentData, 4);

  const handleSlideChange = (swiper: SwiperClass) => {
    if (swiper.activeIndex === 0) {
      setIsFirst(true);
      return;
    }

    if (swiper.activeIndex === 2) {
      setIsLast(true);
      return;
    }

    setIsFirst(false);
    setIsLast(false);
  };

  const handleSelected = (coinInfoId: string) => {
    setSelected(coinInfoId);
  };

  useEffect(() => {
    if (!isLoading && showData) {
      setSelected(showData?.[0].Id);
      const subs = showData.map(item => `5~CCCAGG~${item.Internal}~USD`);
      setSubs(subs);
      setCurrentData(showData);
    }
  }, [isLoading, showData]);

  useEffect(() => {
    if (subs.length > 0) {
      const apiKey =
        "6af44b9120c716f3fe1faadcecbeb4e2a27fa4f6158e7ec942781573f807b64b";
      const ccStreamer = new WebSocket(
        "wss://streamer.cryptocompare.com/v2?api_key=" + apiKey
      );

      ccStreamer.onopen = function () {
        const subRequest = {
          action: "SubAdd",
          subs: subs, // Example: BTC to USD price and volume data
        };
        ccStreamer.send(JSON.stringify(subRequest));
      };

      ccStreamer.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.TYPE === "5") {
          const realTimeData = currentData.map(item => {
            if (item.Internal === data.FROMSYMBOL) {
              const isChange = Number(data.PRICE) !== Number(item.Price);

              const percent = isChange
                ? ((Number(data.PRICE) - Number(item.Price)) * 100) /
                  Number(item.Price)
                : item.PercentChange;
              return {
                ...item,
                PercentChange: percent,
                Price: data.PRICE,
              };
            }

            return item;
          });

          setCurrentData(realTimeData);
        }
      };

      // Clean up the WebSocket connection when the component unmounts
      return () => {
        ccStreamer.close();
      };
    }
  }, [subs]);

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
            {currentData?.map((item, index) => (
              <SwiperSlide key={index} className="h-full">
                <MarketIndexCard
                  key={index}
                  active={item?.Id === selected}
                  item={item}
                  handleSelected={handleSelected}
                />
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
        {chunkedDataDesktop?.map((chunk, chunkIndex) => (
          <SwiperSlide key={chunkIndex} className="h-full">
            <div className="flex justify-start items-center gap-[12px] md:gap-[24px]">
              {chunk.map((item, index) => (
                <MarketIndexCard
                  key={index}
                  active={item?.Id === selected}
                  item={item}
                  handleSelected={handleSelected}
                />
              ))}
            </div>
          </SwiperSlide>
        ))}
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
