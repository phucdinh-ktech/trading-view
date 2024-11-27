import { Splitter } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

import CandleStickChart from "@/components/common/Charts/CandleStickChart";
import ChartFooter from "@/components/common/Charts/ChartFooter";
import ChartHeader from "@/components/common/Charts/ChartHeader";
import InformationDetail from "@/components/common/InfomationDetail";
import RightSideBar from "@/components/common/RightSideBar";
import SideBarChart from "@/components/common/SideBarChart";
import useWindowSize from "@/utils/hooks/useWindowSize";

const Trading = () => {
  const { width } = useWindowSize();
  const [sizes, setSizes] = useState<(number | string)[]>(["70%", "30%"]);
  const [footerSize, setFooterSize] = useState<number>(7);
  const size = useWindowSize();

  const handleResize = (newSizes: (number | string)[]) => {
    setSizes(newSizes);
  };

  const handleChangeFooterSize = (size: number) => {
    setFooterSize(size);
  };
  useEffect(() => {
    const newSizes = width >= 1400 ? ["70%", "30%"] : ["100%", 0];
    setSizes(newSizes);
  }, [width]);

  return (
    <>
      <ChartHeader />
      {size?.width < 768 ? (
        <>
          <div className="w-full h-[2px] bg-[#0505050f]"></div>
          <CandleStickChart />
        </>
      ) : (
        <div className="flex gap-[2px]">
          <Splitter
            style={{
              height: "calc(100vh - 100px)",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
              width: "calc(100vw - 55px)",
            }}
            onResize={handleResize}
          >
            <Splitter.Panel min="30%" size={sizes[0]}>
              <Splitter layout="vertical">
                <Splitter.Panel
                  min={"0%"}
                  size={`${100 - footerSize}%`}
                  resizable={false}
                >
                  <CandleStickChart sizes={sizes} footerSize={footerSize} />
                </Splitter.Panel>
                <Splitter.Panel
                  min={"0%"}
                  size={`${footerSize}%`}
                  className="flex items-center w-full !p-0"
                  collapsible={false}
                >
                  <ChartFooter
                    handleChangeFooterSize={handleChangeFooterSize}
                    footerSize={footerSize}
                  />
                </Splitter.Panel>
              </Splitter>
            </Splitter.Panel>

            <Splitter.Panel size={sizes[1]} collapsible>
              <Splitter layout="vertical">
                <Splitter.Panel min={"0%"} size={"40%"}>
                  <SideBarChart />
                </Splitter.Panel>
                <Splitter.Panel min={"10%"}>
                  <InformationDetail />
                </Splitter.Panel>
              </Splitter>
            </Splitter.Panel>
          </Splitter>
          <RightSideBar />
        </div>
      )}
    </>
  );
};

export default Trading;
