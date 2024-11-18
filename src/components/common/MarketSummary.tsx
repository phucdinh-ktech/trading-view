import { RightOutlined } from "@ant-design/icons";

import AreaChartComponent from "@/components/common/Charts/AreaChart";
import TabsComponent from "@/components/common/Tabs";

const MarketSummary = () => {
  return (
    <div className="mt-[32px] mb-[80px]">
      <p className="text-[28px] text-blackApp font-semibold leading-[36px] mb-[24px]">
        Market summary
        <RightOutlined className="text-[20px] mr-[4px]" />
      </p>
      <TabsComponent />
      <AreaChartComponent />
    </div>
  );
};

export default MarketSummary;
