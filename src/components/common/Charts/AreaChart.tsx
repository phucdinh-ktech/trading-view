import { Spin } from "antd";
import { createChart, IChartApi, UTCTimestamp } from "lightweight-charts";
import { useEffect, useRef, useState } from "react";

import WrapperRangTime from "@/components/common/RangTime/WrapperRangTime";
import { useFetchExchangeVol } from "@/libs/swr/useFetchExchangeVol";
import { CustomVolumeFullType } from "@/libs/swr/useFetchTopVolumeFull";
import formatPrice from "@/utils/formatPrice";
import tickMarkFormatter_func from "@/utils/functions/tickMarkFormatter";

import useWindowSize from "../../../hooks/useWindowSize";

interface IAreaChartComponentProps {
  chartWidth?: number;
  chartHeight?: number;
  isMobile?: boolean;
  volume?: CustomVolumeFullType;
}
const AreaChartComponent = (props: IAreaChartComponentProps) => {
  const { chartHeight, chartWidth, isMobile, volume } = props;
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const [dayLimit, setDayLimit] = useState<number>(24);
  const { width } = useWindowSize();

  const { exchangeVolChartData, isLoading } = useFetchExchangeVol({
    tsym: volume?.Internal?.toLowerCase(),
    limit: dayLimit,
  });

  const handleChangeLimitDay = (day: number) => {
    setDayLimit(day);
  };

  useEffect(() => {
    if (chartContainerRef.current) {
      const chart = createChart(chartContainerRef.current, {
        width: width > 1440 ? 1400 : chartWidth || width,
        height: chartHeight || 400,
        layout: {
          textColor: "#131722",
        },

        grid: {
          vertLines: {
            visible: !isMobile,
          },
          horzLines: {
            visible: !isMobile,
          },
        },
        crosshair: {
          mode: 1,
        },

        timeScale: {
          borderColor: "#cccccc",
          timeVisible: !isMobile,
          visible: !isMobile,
        },

        rightPriceScale: {
          minimumWidth: 50,
          visible: !isMobile,
          autoScale: true,
          ticksVisible: true,
          textColor: "black",
          scaleMargins: {
            top: 0.2,
            bottom: 0.2,
          },
        },
        handleScroll: {
          mouseWheel: !isMobile,
          pressedMouseMove: !isMobile,
          horzTouchDrag: !isMobile,
          vertTouchDrag: !isMobile,
        },
      });

      chartRef.current = chart;

      const areaSeries = chart.addAreaSeries({
        lineColor: Number(volume?.PercentChange) >= 0 ? "#089981" : "#f23645",
        topColor: Number(volume?.PercentChange) >= 0 ? "#089981" : "#f23645",
        bottomColor: "#ffffff",
        priceLineVisible: !isMobile,
        lineWidth: 2,
      });

      areaSeries.setData(exchangeVolChartData);
      chart.priceScale("right").applyOptions({
        autoScale: false,
        scaleMargins: { top: 0.1, bottom: 0 },
      });
      chart.applyOptions({
        localization: {
          priceFormatter: formatPrice,
        },
        timeScale: {
          tickMarkFormatter: (ts: UTCTimestamp) =>
            tickMarkFormatter_func(ts, dayLimit),
        },
      });
      chart.timeScale().fitContent();
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }
    };
  }, [width, exchangeVolChartData, volume]);

  return (
    <div>
      <div ref={chartContainerRef} className="relative">
        {isLoading && (
          <div className="absolute z-40 w-full h-full bg-[rgba(0,0,0,0.3)] flex flex-col justify-center items-center">
            <Spin size="large" />
          </div>
        )}
      </div>
      <div className="hidden md:block">
        <WrapperRangTime handleChangeLimitDay={handleChangeLimitDay} />
      </div>
    </div>
  );
};

export default AreaChartComponent;
