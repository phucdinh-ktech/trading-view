/* eslint-disable import/order */
import images from "@/assets/images";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import BlogCard from "@/components/common/BlogCard";
import { RightOutlined } from "@ant-design/icons";
import TabsComponent from "@/components/common/Tabs";
import { TabsProps } from "antd";
import useWindowSize from "@/utils/hooks/useWindowSize";

function BlogSwiper() {
  const size = useWindowSize();
  const blogs = [
    {
      thumbnail: images.chart1,
      title: "Banco India Short Term Trade",
      description:
        "The stock has been in a consolidation stage since 4 months, Area around 805 has been resistance, On and after the breakout, a strong bullish momentum is visible along with",
      actor: "zenni_10",
      time: "18 hours ago",
    },
    {
      thumbnail: images.chart2,
      title: "Banco India Short Term Trade",
      description:
        "The stock has been in a consolidation stage since 4 months, Area around 805 has been resistance, On and after the breakout, a strong bullish momentum is visible along with",
      actor: "zenni_10",
      time: "18 hours ago",
    },
    {
      thumbnail: images.chart3,
      title: "Banco India Short Term Trade",
      description:
        "The stock has been in a consolidation stage since 4 months, Area around 805 has been resistance, On and after the breakout, a strong bullish momentum is visible along with",
      actor: "zenni_10",
      time: "18 hours ago",
    },
    {
      thumbnail: images.chart4,
      title: "Banco India Short Term Trade",
      description:
        "The stock has been in a consolidation stage since 4 months, Area around 805 has been resistance, On and after the breakout, a strong bullish momentum is visible along with",
      actor: "zenni_10",
      time: "18 hours ago",
    },
    {
      thumbnail: images.chart5,
      title: "Banco India Short Term Trade",
      description:
        "The stock has been in a consolidation stage since 4 months, Area around 805 has been resistance, On and after the breakout, a strong bullish momentum is visible along with",
      actor: "zenni_10",
      time: "18 hours ago",
    },
    {
      thumbnail: images.chart6,
      title: "Banco India Short Term Trade",
      description:
        "The stock has been in a consolidation stage since 4 months, Area around 805 has been resistance, On and after the breakout, a strong bullish momentum is visible along with",
      actor: "zenni_10",
      time: "18 hours ago",
    },
    {
      thumbnail: images.chart7,
      title: "Banco India Short Term Trade",
      description:
        "The stock has been in a consolidation stage since 4 months, Area around 805 has been resistance, On and after the breakout, a strong bullish momentum is visible along with",
      actor: "zenni_10",
      time: "18 hours ago",
    },
  ];
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Indices",
      children: "",
    },
    {
      key: "2",
      label: "Stocks",
      children: "",
    },
    {
      key: "3",
      label: "ETFs",
      children: "",
    },
  ];
  const onChange = (key: string) => {
    console.log(key);
  };
  return (
    <div className="my-[24px]">
      <p className="text-[28px] text-blackApp font-semibold leading-[36px] mb-[24px]">
        Community ideas
        <RightOutlined className="text-[20px] mr-[4px]" />
      </p>
      <TabsComponent items={items} onChange={onChange} />
      <Swiper
        slidesPerView={size?.width < 768 ? 1 : 3}
        spaceBetween={30}
        // pagination={{ clickable: true }}
        navigation
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {blogs?.map((item, index) => (
          <SwiperSlide key={index}>
            <BlogCard
              key={index}
              thumbnail={item?.thumbnail}
              time={item?.time}
              actor={item?.actor}
              description={item?.description}
              title={item?.title}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default BlogSwiper;
