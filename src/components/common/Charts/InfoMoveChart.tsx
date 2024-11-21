import clsx from "clsx";
import { CandlestickData, HistogramData } from "lightweight-charts";
import { useState } from "react";

import icons from "@/assets/icons";

interface IInfoMoveChartProps {
  candlestick?: CandlestickData;
  histogram?: HistogramData;
}
const InfoMoveChart = (props: IInfoMoveChartProps) => {
  const { candlestick, histogram } = props;
  const [toggleVolume, setToggleVolume] = useState(true);
  const diff = Number(candlestick?.close) - Number(candlestick?.open);
  const percent =
    ((Number(candlestick?.close) - Number(candlestick?.open)) * 100) /
    Number(candlestick?.close);
  return (
    <div className="absolute top-[5px] left-[5px] min-w-[300px] h-[100px] z-40 flex flex-col gap-[4px]">
      <div className="flex gap-[12px]">
        <div
          className="w-fit group/title flex items-center hover:outline hover:outline-1 hover:outline-blueApp hover:rounded-[4px]"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-center gap-[4px] px-[3px] rounded-[2px] cursor-pointer hover:bg-hoverApp">
            <div className="size-[18px]">
              <img src={icons.apple} className="w-full h-full rounded-full" />
            </div>
            <p className="text-[16px] text-blackApp font-medium">Apple Inc.</p>
          </div>
          <p className="relative text-[16px] pl-[12px] text-blackApp font-medium before:content-['\2022'] before:inline-block before:z-[-1] before:absolute before:top-0 before:left-0 before:w-[12px] before:text-center">
            <span className="hover:bg-hoverApp px-[3px] rounded-[2px] cursor-pointer">
              1h
            </span>
          </p>
          <p className="text-[16px] text-blackApp px-[3px] font-medium before:content-['\2022'] before:inline-block before:mx-[4px]">
            Cboe One
          </p>
          <div className="hidden group-hover/title:flex items-center px-[3px]">
            <div className="w-[16px] h-[4px]">
              <img src={icons.moreHoz} className="w-full h-full" />
            </div>
          </div>
        </div>

        <div
          className="w-fit flex items-center gap-0 rounded-[40%] overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          <div className="w-[20px] h-[18px] bg-[rgba(149,152,161,0.3)] pl-[2px]">
            <img src={icons.minus} className="w-full h-full" />
          </div>
          <div className="w-[20px] h-[18px] bg-[rgba(245,124,0,0.3)]">
            <img src={icons.d} className="w-full h-full" />
          </div>
          <div className="w-[20px] h-[18px] bg-[rgba(0,188,210,0.3)] pr-[2px]">
            <img src={icons.extend} className="w-full h-full" />
          </div>
        </div>

        <div
          className="w-fit flex items-center gap-[6px]"
          onClick={e => e.stopPropagation()}
        >
          <span className="flex gap-[2px] text-[13px] font-normal text-black">
            O
            <span className={diff > 0 ? "text-[#089981]" : " text-[#ef5350]"}>
              {candlestick?.open.toFixed(2)}
            </span>
          </span>
          <span className="flex gap-[2px] text-[13px] font-normal text-black">
            H
            <span className={diff > 0 ? "text-[#089981]" : " text-[#ef5350]"}>
              {candlestick?.high.toFixed(2)}
            </span>
          </span>
          <span className="flex gap-[2px] text-[13px] font-normal text-black">
            L
            <span className={diff > 0 ? "text-[#089981]" : " text-[#ef5350]"}>
              {candlestick?.low.toFixed(2)}
            </span>
          </span>
          <span className="flex gap-[2px] text-[13px] font-normal text-black">
            C
            <span className={diff > 0 ? "text-[#089981]" : " text-[#ef5350]"}>
              {candlestick?.close.toFixed(2)}
            </span>
          </span>
          <span
            className={clsx(
              "text-[13px] font-normal",
              diff > 0 ? "text-[#089981]" : " text-[#ef5350]"
            )}
          >
            {diff.toFixed(2)} ({percent.toFixed(2)}%)
          </span>
        </div>
      </div>
      <div
        className={clsx(
          "w-fit px-[4px] transition-all delay-500",
          toggleVolume ? "flex " : "hidden"
        )}
        onClick={e => e.stopPropagation()}
      >
        <p className="text-[13px] text-blackApp h-[24px]">
          Volume SMA{" "}
          <span
            style={{
              color: histogram?.color === "#90d5c9" ? "#089981" : "#ef5350",
            }}
          >
            {histogram?.value.toFixed(2)}
          </span>
        </p>
      </div>
      <div
        className="w-fit flex items-center rounded-[2px] mx-[4px] bg-white outline-1 outline outline-[#0505050f] cursor-pointer"
        onClick={e => e.stopPropagation()}
      >
        <div
          className="w-[27px] h-[19px] p-[6px_2px]"
          onClick={() => setToggleVolume(!toggleVolume)}
        >
          <img
            src={icons.chervonUp}
            className={clsx(
              "w-full h-full",
              toggleVolume ? "rotate-180" : "rotate-0"
            )}
          />
        </div>
        <span
          className={clsx(
            "text-[13px] text-blackApp pr-[2px]",
            toggleVolume ? "flex " : "hidden"
          )}
        >
          1
        </span>
      </div>
    </div>
  );
};

export default InfoMoveChart;
