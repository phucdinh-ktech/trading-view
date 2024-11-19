import { createChart, IChartApi, UTCTimestamp } from "lightweight-charts";
import { useEffect, useRef } from "react";

import WrapperRangTime from "@/components/common/RangTime/WrapperRangTime";

import useWindowSize from "../../../hooks/useWindowSize";

interface IAreaChartComponentProps {
  chartWidth?: number;
  chartHeight?: number;
  isMobile?: boolean;
}
const AreaChartComponent = (props: IAreaChartComponentProps) => {
  const { chartHeight, chartWidth, isMobile } = props;
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  const { width } = useWindowSize();

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
        lineColor: "#f23645",
        topColor: "#f23645",
        bottomColor: "#ffffff",
        priceLineVisible: !isMobile,
        lineWidth: 2,
      });

      areaSeries.setData([
        { time: 1529884800 as UTCTimestamp, value: 236.36 },
        { time: 1529888400 as UTCTimestamp, value: 245.89 },
        { time: 1529892000 as UTCTimestamp, value: 220.45 },
        { time: 1529895600 as UTCTimestamp, value: 260.1 },
        { time: 1529899200 as UTCTimestamp, value: 200.75 },
        { time: 1529902800 as UTCTimestamp, value: 290.3 },
        { time: 1529906400 as UTCTimestamp, value: 210.95 },
        { time: 1529910000 as UTCTimestamp, value: 270.0 },
        { time: 1529913600 as UTCTimestamp, value: 230.5 },
        { time: 1529917200 as UTCTimestamp, value: 250.2 },
        { time: 1529920800 as UTCTimestamp, value: 220.1 },
        { time: 1529924400 as UTCTimestamp, value: 280.7 },
        { time: 1529928000 as UTCTimestamp, value: 210.3 },
        { time: 1529931600 as UTCTimestamp, value: 275.5 },
        { time: 1529935200 as UTCTimestamp, value: 230.0 },
        { time: 1529938800 as UTCTimestamp, value: 260.0 },
        { time: 1529942400 as UTCTimestamp, value: 220.9 },
        { time: 1529946000 as UTCTimestamp, value: 245.0 },
        { time: 1529949600 as UTCTimestamp, value: 225.5 },
        { time: 1529953200 as UTCTimestamp, value: 290.0 },
        { time: 1529956800 as UTCTimestamp, value: 210.1 },
        { time: 1529960400 as UTCTimestamp, value: 270.5 },
        { time: 1529964000 as UTCTimestamp, value: 230.1 },
        { time: 1529967600 as UTCTimestamp, value: 260.8 },
      ]);

      chart.timeScale().fitContent();
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }
    };
  }, [width]);

  return (
    <div>
      <div ref={chartContainerRef} />
      <div className="hidden md:block">
        <WrapperRangTime />
      </div>
    </div>
  );
};

export default AreaChartComponent;
