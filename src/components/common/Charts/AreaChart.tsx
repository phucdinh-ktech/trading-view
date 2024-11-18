import { createChart, IChartApi } from "lightweight-charts";
import { useEffect, useRef } from "react";

import useWindowSize from "../../../hooks/useWindowSize";
import dayjs from "dayjs";
const AreaChartComponent = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  const { width } = useWindowSize();
  useEffect(() => {
    if (chartContainerRef.current) {
      // Tạo biểu đồ
      const chart = createChart(chartContainerRef.current, {
        width: width > 1440 ? 1400 : width,
        height: 400,
        layout: {
          textColor: "red",
        },
        grid: {
          vertLines: {
            color: "#404040", // Đường dọc
            visible: false,
          },
          horzLines: {
            color: "#404040", // Đường ngang
            visible: false,
          },
        },
        crosshair: {
          mode: 1, // Theo dõi chuột
        },

        timeScale: {
          borderColor: "#cccccc",
          timeVisible: false,
        },

        rightPriceScale: {
          minimumWidth: 50,
          visible: true,
          autoScale: true,
          ticksVisible: true,
          textColor: "black",
          scaleMargins: {
            top: 0.2,
            bottom: 0.2,
          },
        },

        localization: {
          timeFormatter: (timestamp: number) =>
            dayjs(timestamp).format("YYYY-MM-DD HH:mm"),
        },
      });

      chartRef.current = chart;

      const areaSeries = chart.addAreaSeries({
        lineColor: "#f23645",
        topColor: "#f23645",
        bottomColor: "#ffffff",
        baseLineWidth: 1,
      });
      areaSeries.setData([
        { time: "2024-10-20", value: 236.36 },
        { time: "2024-10-21", value: 236.07 },
        { time: "2024-10-22", value: 235.69 },
        { time: "2024-10-23", value: 232.94 },
        { time: "2024-10-24", value: 233.79 },
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

  return <div ref={chartContainerRef} />;
};

export default AreaChartComponent;
