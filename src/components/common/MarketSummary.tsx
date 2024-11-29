import { RightOutlined } from "@ant-design/icons";
import { useState } from "react";

import AreaChartComponent from "@/components/common/Charts/AreaChart";
import WrapperMarket from "@/components/pages/home/WrapperMarket";
import { CustomVolumeFullType } from "@/libs/swr/useFetchTopVolumeFull";

import useWindowSize from "../../hooks/useWindowSize";

const MarketSummary = () => {
  const { width } = useWindowSize();

  const [volume, setVolume] = useState<CustomVolumeFullType>();

  // const items: TabsProps["items"] = [
  //   {
  //     key: "1",
  //     label: "Indices",
  //     children: <WrapperMarket handleChangeTsym={handleChangeTsym} />,
  //   },
  //   {
  //     key: "2",
  //     label: "Stocks",
  //     children: <WrapperMarket handleChangeTsym={handleChangeTsym} />,
  //   },
  //   {
  //     key: "3",
  //     label: "ETFs",
  //     children: <WrapperMarket handleChangeTsym={handleChangeTsym} />,
  //   },
  // ];
  // const onChange = (key: string) => {
  //   console.log(key);
  // };

  const handleChangeVolume = (volume: CustomVolumeFullType) => {
    setVolume(volume);
  };
  return (
    <div className="mt-[24px] md:mt-[32px] md:mb-[24px]">
      <p className="text-[28px] text-blackApp font-semibold leading-[36px] mb-[24px]">
        Market summary
        <RightOutlined className="text-[20px] mr-[4px]" />
      </p>
      {/* <TabsComponent items={items} onChange={onChange} /> */}
      <WrapperMarket handleChangeVolume={handleChangeVolume} />
      {width >= 768 && <AreaChartComponent volume={volume} />}
    </div>
  );
};

export default MarketSummary;
