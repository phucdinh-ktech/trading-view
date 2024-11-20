import { Splitter } from "antd";
import { useState } from "react";

import CandleStickChart from "@/components/common/Charts/CandleStickChart";
import InformationDetail from "@/components/common/InfomationDetail";
import SideBarChart from "@/components/common/SideBarChart";
import useWindowSize from "@/utils/hooks/useWindowSize";

const Trading = () => {
  const [sizes, setSizes] = useState<(number | string)[]>(["70%", "30%"]);
  const size = useWindowSize();
  const handleResize = (newSizes: (number | string)[]) => {
    setSizes(newSizes);
  };

  return (
    <>
      {size?.width < 768 ? (
        <CandleStickChart />
      ) : (
        <Splitter
          style={{
            height: "calc(100vh - 120px)",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          }}
          onResize={handleResize}
        >
          <Splitter.Panel collapsible min="30%" size={sizes[0]}>
            <CandleStickChart sizes={sizes} />
          </Splitter.Panel>

          <Splitter.Panel size={sizes[1]}>
            <Splitter layout="vertical">
              <Splitter.Panel min={"0%"} size={"40%"}>
                <SideBarChart />
              </Splitter.Panel>
              <Splitter.Panel min={"0%"}>
                <InformationDetail />
              </Splitter.Panel>
            </Splitter>
          </Splitter.Panel>
        </Splitter>
      )}
    </>
  );
};

export default Trading;
