import { createChart, IChartApi, ISeriesApi } from "lightweight-charts";
import React, { useEffect, useRef, useState } from "react";

interface LineChartProps {
  data: { time: string; value: number }[];
  height?: number;
  title?: string;
}

const LineChart: React.FC<LineChartProps> = ({
  data,
  height = 300,
  title = "Forward Curve",
}) => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartInstanceRef = useRef<IChartApi | null>(null);
  const lineSeriesRef = useRef<ISeriesApi<"Line"> | null>(null);
  const [width, setWidth] = useState<number>(0); // Trạng thái lưu chiều rộng container

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Cập nhật chiều rộng container
    const resizeObserver = new ResizeObserver(() => {
      if (chartContainerRef.current) {
        const { width } = chartContainerRef.current.getBoundingClientRect();
        setWidth(Math.floor(width)); // Cập nhật chiều rộng
      }
    });

    resizeObserver.observe(chartContainerRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    if (!chartContainerRef.current || width === 0) return;

    // Tạo biểu đồ
    const chart = createChart(chartContainerRef.current, {
      width,
      height,
      layout: {
        textColor: "#000000",
      },
      grid: {
        vertLines: { color: "#e1e1e1" },
        horzLines: { color: "#e1e1e1" },
      },
      crosshair: {
        mode: 1,
      },
      timeScale: {
        borderColor: "#cccccc",
        timeVisible: true,
        secondsVisible: false,
      },
    });

    // Tạo series
    const lineSeries = chart.addLineSeries({
      color: "#2196f3",
      lineWidth: 2,
    });

    lineSeries.setData(data);

    const areaSeries = chart.addAreaSeries({
      topColor: "rgba(33, 150, 243, 0.4)",
      bottomColor: "rgba(33, 150, 243, 0)",
      lineColor: "#2196f3",
      lineWidth: 2,
    });

    areaSeries.setData(data);

    chartInstanceRef.current = chart;
    lineSeriesRef.current = lineSeries;

    return () => {
      chart.remove();
    };
  }, [data, width, height]);

  return (
    <div>
      {title && (
        <h2 className="text-center text-lg font-medium mb-2">{title}</h2>
      )}
      <div
        ref={chartContainerRef}
        style={{ width: "100%", height }} // Đảm bảo container chiếm toàn bộ chiều rộng
      />
    </div>
  );
};

export default LineChart;
