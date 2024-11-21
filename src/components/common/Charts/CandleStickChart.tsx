import { Popover } from "antd";
import { TooltipRef } from "antd/es/tooltip";
import {
  createChart,
  IChartApi,
  MouseEventParams,
  UTCTimestamp,
} from "lightweight-charts";
import { MouseEvent, useEffect, useMemo, useRef, useState } from "react";

import WrapperSetting from "@/components/common/Setting/WrapperSetting";

import useWindowSize from "../../../hooks/useWindowSize";
import WrapperRangTime from "@/components/common/RangTime/WrapperRangTime";

function generateCandlestickData(
  days: number,
  startTime: number
): {
  time: UTCTimestamp;
  open: number;
  high: number;
  low: number;
  close: number;
}[] {
  const data = [];
  let currentOpen = 200 + Math.random() * 50; // Giá trị mở cửa ban đầu

  for (let i = 0; i < days; i++) {
    const time = (startTime + i * 24 * 60 * 60) as UTCTimestamp; // Mỗi ngày tăng thêm 24 giờ

    const close = currentOpen + (Math.random() - 0.5) * 50; // Đóng cửa chênh lệch so với mở cửa
    const high = Math.max(currentOpen, close) + Math.random() * 10; // Giá cao nhất
    const low = Math.min(currentOpen, close) - Math.random() * 10; // Giá thấp nhất

    data.push({ time, open: currentOpen, high, low, close });

    currentOpen = close; // Cập nhật giá mở cửa cho ngày tiếp theo
  }

  return data;
}

function generateHistogramData(
  days: number,
  startTime: number
): {
  time: UTCTimestamp;
  value: number;
  color?: string;
}[] {
  const data = [];

  for (let i = 0; i < days; i++) {
    const time = (startTime + i * 24 * 60 * 60) as UTCTimestamp;
    const value = Math.floor(Math.random() * 75);
    const color = value > 35 ? "#90d5c9" : "#f5a2a9";

    data.push({ time, value, color });
  }

  return data;
}

interface ICandlestickChartProps {
  sizes?: (number | string)[];
}
const CandleStickChart = (props: ICandlestickChartProps) => {
  const { sizes } = props;
  const { width } = useWindowSize();
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const popoverRef = useRef<TooltipRef | null>(null);
  const [newPosition, setNewPosition] = useState({
    left: 0,
    top: 0,
  });
  const [price, setPrice] = useState<number>(0);
  const handleLeftClick = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (chartContainerRef.current && popoverRef.current) {
      if (
        e.clientX > chartContainerRef.current.clientWidth ||
        e.clientY > chartContainerRef.current.clientHeight
      ) {
        return;
      }

      const parentRect = chartContainerRef.current.getBoundingClientRect();
      const popoverRect =
        popoverRef.current.nativeElement.getBoundingClientRect();

      // Lấy tọa độ click so với phần tử cha
      const clickX = e.clientX - parentRect.left;
      const clickY = e.clientY - parentRect.top;

      // Tính toán vị trí mặc định của Popover
      let newLeft = clickX;
      let newTop = clickY;

      // Điều chỉnh nếu Popover vượt ra ngoài phần tử cha
      if (newLeft + popoverRect.width > parentRect.width) {
        console.log("newLeft + popoverRect.width > parentRect.width");
        newLeft = parentRect.width - popoverRect.width;
      }
      if (newTop + popoverRect.height > parentRect.height) {
        console.log("newTop + popoverRect.height > parentRect.height");
        newTop = parentRect.height - popoverRect.height;
      }

      // Đảm bảo Popover không vượt qua biên trái hoặc trên
      newLeft = Math.min(newLeft, chartContainerRef.current.clientWidth - 255);

      // Cập nhật style cho Popover
      setNewPosition({
        left: newLeft,
        top: newTop,
      });
    }
  };

  const handleRightClick = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOpenMenu(false);
  };

  const candlestickData = useMemo(() => {
    return generateCandlestickData(30, 1698278400);
  }, []);

  const histogramData = useMemo(() => {
    return generateHistogramData(30, 1698278400);
  }, []);
  useEffect(() => {
    if (chartContainerRef?.current) {
      const chart = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth - 20 || 0,
        height: chartContainerRef.current.clientHeight - 20 || 0,
        layout: { textColor: "#131722" },
        grid: {
          vertLines: {
            visible: true,
            color: "#0505050f",
          },
          horzLines: {
            visible: true,
            color: "#0505050f",
          },
        },
        crosshair: {
          mode: 0,
        },
        timeScale: {
          borderColor: "#0505050f",
          timeVisible: true,
        },
        rightPriceScale: {
          visible: true,
          autoScale: true,
          ticksVisible: true,
          textColor: "black",
          borderVisible: false,
        },
      });

      chartRef.current = chart;

      // Candlestick
      const candlestickSeries = chart.addCandlestickSeries({
        upColor: "#26a69a",
        downColor: "#ef5350",
        borderVisible: false,
        wickUpColor: "#26a69a",
        wickDownColor: "#ef5350",
      });
      candlestickSeries.setData(candlestickData);

      // Histogram
      const historyChartSeries = chart.addHistogramSeries({
        priceLineVisible: false,
        lastValueVisible: false,
      });

      historyChartSeries.setData(histogramData);

      // config scale
      chart.timeScale().fitContent();
      chart.priceScale("right").applyOptions({
        autoScale: false,
        scaleMargins: { top: 0.1, bottom: 0 },
      });

      chart.subscribeClick((params: MouseEventParams) => {
        if (!params || !params.point) return;
        setOpenMenu(true);
        const { y } = params.point;
        const price = candlestickSeries.coordinateToPrice(y);
        setPrice(Number(price));
      });
    }
    return () => {
      // cancel component when unmount
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }
    };
  }, [width, sizes]);

  return (
    <div className="w-full h-full">
      <div
        className="w-full relative pt-[10px] h-[calc(100vh-120px-22px)] md:h-[calc(100vh-120px-55px)] flex items-center justify-center"
        onClick={handleLeftClick}
        ref={chartContainerRef}
        onContextMenu={handleRightClick}
      >
        <Popover
          ref={popoverRef}
          open={openMenu}
          trigger="click"
          content={<WrapperSetting price={price} />}
          arrow={false}
          overlayStyle={{
            left: `${newPosition.left}px`,
            top: "50%",
            transform: "translateY(-50%)",
          }}
          align={{
            overflow: { adjustX: true, adjustY: true },
          }}
          getPopupContainer={() => chartContainerRef.current || document.body}
          rootClassName="hidden md:block"
        />
      </div>
      <WrapperRangTime chart="candlestick" />
    </div>
  );
};

export default CandleStickChart;
