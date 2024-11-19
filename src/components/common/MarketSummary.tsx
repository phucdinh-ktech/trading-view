import { RightOutlined } from "@ant-design/icons";
import { TabsProps } from "antd";

import AreaChartComponent from "@/components/common/Charts/AreaChart";
import TabsComponent from "@/components/common/Tabs";
import WrapperMarket from "@/components/pages/home/WrapperMarket";

const MarketSummary = () => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Indices",
      children: <WrapperMarket />,
    },
    {
      key: "2",
      label: "Stocks",
      children: <WrapperMarket />,
    },
    {
      key: "3",
      label: "ETFs",
      children: <WrapperMarket />,
    },
  ];
  const onChange = (key: string) => {
    console.log(key);
  };
  return (
    <div className="mt-[32px] mb-[80px]">
      <p className="text-[28px] text-blackApp font-semibold leading-[36px] mb-[24px]">
        Market summary
        <RightOutlined className="text-[20px] mr-[4px]" />
      </p>
      <TabsComponent items={items} onChange={onChange} />
      <AreaChartComponent />
    </div>
  );
};

export default MarketSummary;
