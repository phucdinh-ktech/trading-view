import { useState } from "react";

import RangTimeItem from "@/components/common/RangTime/RangTimeItem";

const WrapperRangTime = () => {
  const [selectedKey, setSelectedKey] = useState<string>();

  const handleChangeKey = (time: string) => {
    setSelectedKey(time);
  };

  return (
    <div className="flex justify-start gap-[4px] mt-[12px]">
      <RangTimeItem
        key="1D"
        time="1D"
        onChange={handleChangeKey}
        active={selectedKey === "1D"}
      />
      <RangTimeItem
        key="1M"
        time="1M"
        onChange={handleChangeKey}
        active={selectedKey === "1M"}
      />
      <RangTimeItem
        key="3M"
        time="3M"
        onChange={handleChangeKey}
        active={selectedKey === "3M"}
      />
      <RangTimeItem
        key="1Y"
        time="1Y"
        onChange={handleChangeKey}
        active={selectedKey === "1Y"}
      />
      <RangTimeItem
        key="3Y"
        time="3Y"
        onChange={handleChangeKey}
        active={selectedKey === "3Y"}
      />
      <RangTimeItem
        key="ALL"
        time="ALL"
        onChange={handleChangeKey}
        active={selectedKey === "ALL"}
      />
    </div>
  );
};

export default WrapperRangTime;
