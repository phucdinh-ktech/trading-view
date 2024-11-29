import { Divider, Popover } from "antd";
import clsx from "clsx";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

import icons from "@/assets/icons";
import RangTimeItem from "@/components/common/RangTime/RangTimeItem";
import generateDays from "@/utils/functions/generateDays";
export type ChartType = "candlestick" | undefined;

interface IWrapperRangeTimeProps {
  chart?: ChartType;
  handleChangeLimitDay?: (day: number) => void;
}
const WrapperRangTime = (props: IWrapperRangeTimeProps) => {
  const { chart, handleChangeLimitDay } = props;
  const [selectedKey, setSelectedKey] = useState<string>(
    chart === "candlestick" ? "1d" : "1D"
  );
  const [time, setTime] = useState(dayjs().format("HH:mm:ss"));

  const [openRangDate, setOpenRangDate] = useState<boolean>(false);
  const handleChangeKey = (time: string) => {
    setSelectedKey(time);
    const limitDay = generateDays(time);
    handleChangeLimitDay?.(limitDay);
  };

  const rangData =
    chart === "candlestick"
      ? [
          {
            key: "1D",
            title: "1 day in 1 minute interval",
          },
          {
            key: "5D",
            title: "5 day in 1 hour interval",
          },
          {
            key: "1M",
            title: "1 month in 1 day interval",
          },
          {
            key: "3M",
            title: "3 months in 1 day interval",
          },
          {
            key: "6M",
            title: "6 months in 1 day interval",
          },
          {
            key: "1Y",
            title: "1 year in 1 day interval",
          },
          {
            key: "3Y",
            title: "3 years in 1 day interval",
          },
          {
            key: "ALL",
            title: "All in 1 day interval",
          },
        ]
      : [
          {
            key: "1D",
            title: "1 day in 1 minute interval",
          },
          {
            key: "5D",
            title: "5 day in 1 hour interval",
          },
          {
            key: "1M",
            title: "1 month in 1 day interval",
          },
          {
            key: "3M",
            title: "3 months in 1 day interval",
          },
          {
            key: "6M",
            title: "6 months in 1 day interval",
          },
          {
            key: "1Y",
            title: "1 year in 1 day interval",
          },
          {
            key: "3Y",
            title: "3 years in 1 day interval",
          },
          {
            key: "ALL",
            title: "All in 1 day interval",
          },
        ];

  useEffect(() => {
    if (["1d", "1D"].includes(selectedKey)) {
      const limitDay = generateDays("1d");
      handleChangeLimitDay?.(limitDay);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(dayjs().format("HH:mm:ss"));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (chart === "candlestick")
    return (
      <>
        {" "}
        <div className="flex justify-between items-center p-[4px_16px] border-t border-solid border-[#0505050f] h-[38.2px]">
          <div className="hidden md:flex justify-start">
            <div className="flex justify-start gap-[4px]">
              {rangData.map((rang, index) => (
                <RangTimeItem
                  key={index}
                  time={rang.key}
                  onChange={handleChangeKey}
                  active={selectedKey === rang.key}
                  chart={chart}
                  title={rang.title}
                />
              ))}
            </div>
            <div className="p-[8px_4px]">
              <Divider className="h-full" type="vertical" />
            </div>
            <div className="flex justify-center items-center">
              <div className="size-[28px]">
                <img src={icons.calender} className="w-full h-full" />
              </div>
            </div>
          </div>
          <div className="relative flex gap-[6px] md:hidden">
            <div className="absolute">
              <Popover
                open={openRangDate}
                placement="topLeft"
                className="z-50 bg-white p-[16px]"
                trigger={"click"}
                content={
                  <div className="flex flex-col items-start gap-[4px]">
                    {rangData.map((rang, index) => (
                      <RangTimeItem
                        key={index}
                        time={rang.key}
                        onChange={handleChangeKey}
                        active={selectedKey === rang.key}
                        chart={chart}
                        title={rang.title}
                      />
                    ))}
                  </div>
                }
              ></Popover>
            </div>
            <div
              className="flex gap-[4px] cursor-pointer"
              onClick={() => setOpenRangDate(!openRangDate)}
            >
              <span className="relative z-50 text-[14px] text-blackApp leading-[24px] font-medium">
                Date range
              </span>
              <div className="flex justify-center items-center">
                <div className="w-[20px] h-[28px] p-[4px]">
                  <img
                    src={icons.chervonUp}
                    className={clsx(
                      "w-full h-full",
                      openRangDate ? "rotate-180" : "rotate-0"
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="flex justify-start items-center gap-[6px]">
              <span className="text-[14px] text-blackApp leading-[24px] font-medium">
                {time} (UTC+7)
              </span>
              <span className="hidden md:inline-block px-[6px] text-[14px] text-blackApp leading-[24px] font-medium">
                RTH
              </span>
            </div>
            <div className="p-[8px_4px]">
              <Divider className="h-full" type="vertical" />
            </div>

            <div className="flex items-center justify-end gap-[12px]">
              <div className="flex justify-center items-center">
                <div className="size-[14px]">
                  <img src={icons.percent} className="w-full h-full" />
                </div>
              </div>
              <span className="text-[14px] text-blackApp leading-[24px] font-medium">
                log
              </span>
              <span className="text-[14px] text-[#2962ff] leading-[24px] font-medium">
                auto
              </span>
            </div>
          </div>
        </div>
      </>
    );
  return (
    <div className="flex justify-start gap-[4px] mt-[12px]">
      {rangData.map((rang, index) => (
        <RangTimeItem
          key={index}
          time={rang.key}
          onChange={handleChangeKey}
          active={selectedKey === rang.key}
          chart={chart}
          title={rang.title}
        />
      ))}
    </div>
  );
};

export default WrapperRangTime;
