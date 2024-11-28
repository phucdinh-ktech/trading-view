import { Popover, Spin } from "antd";
import { TooltipRef } from "antd/es/tooltip";
import clsx from "clsx";
import dayjs from "dayjs";
import {
  createChart,
  IChartApi,
  MouseEventParams,
  UTCTimestamp,
  CandlestickData,
  HistogramData,
} from "lightweight-charts";
import { MouseEvent, useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";

import InfoMoveChart from "@/components/common/Charts/InfoMoveChart";
import WrapperRangTime from "@/components/common/RangTime/WrapperRangTime";
import WrapperSetting from "@/components/common/Setting/WrapperSetting";
import { useFetchHour } from "@/libs/swr/PairOHLCV";
import formatPrice from "@/utils/formatPrice";

import useWindowSize from "../../../hooks/useWindowSize";

interface ICandlestickChartProps {
  sizes?: (number | string)[];
  footerSize?: number;
}
const CandleStickChart = (props: ICandlestickChartProps) => {
  const { sizes, footerSize } = props;
  const { width } = useWindowSize();
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const popoverRef = useRef<TooltipRef | null>(null);
  const [chartMoveData, setChartMoveData] = useState<{
    candlestick?: CandlestickData;
    histogram?: HistogramData;
  }>();
  const [newPosition, setNewPosition] = useState({
    left: 0,
    top: 0,
  });

  const [currentCandleStickData, setCurrentCandleStickData] = useState<
    CandlestickData[]
  >([]);
  const [currentHistogramData, setCurrentHistogramData] = useState<
    HistogramData[]
  >([]);

  const [dayLimit, setDayLimit] = useState<number>(24);

  const [newCandlestickData, setNewCandlestickData] =
    useState<CandlestickData>();
  const [newHistogramData, setNewHistogramData] = useState<HistogramData>();
  const [price, setPrice] = useState<number>(0);
  const [timeUpdate, setTimeIUpdate] = useState<string>("");
  const ccStreamerRef = useRef<WebSocket | null>(null);
  const [currentSubs, setCurrentSubs] = useState<string[]>([]);
  const { dataCandleStick, dataHistogram, isLoading } = useFetchHour({
    fsym: "BTC",
    tsym: "USD",
    limit: dayLimit,
  });
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
        newLeft = parentRect.width - popoverRect.width;
      }
      if (newTop + popoverRect.height > parentRect.height) {
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

  const handleChangeLimitDay = (day: number) => {
    setDayLimit(day);
  };
  useEffect(() => {
    if (chartContainerRef?.current) {
      const chart = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth - 20 || 0,
        height: Math.max(chartContainerRef.current.clientHeight - 20, 0) || 0,
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
      candlestickSeries.setData(currentCandleStickData || []);

      // Histogram
      const histogramChartSeries = chart.addHistogramSeries({
        priceLineVisible: false,
        lastValueVisible: false,
      });

      histogramChartSeries.setData(currentHistogramData || []);

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

      chart.subscribeCrosshairMove((params: MouseEventParams) => {
        if (!params || !params.point) return;

        const candlestickData = params.seriesData.get(
          candlestickSeries
        ) as CandlestickData;
        const histogramData = params.seriesData.get(
          histogramChartSeries
        ) as HistogramData;

        setChartMoveData({
          candlestick: candlestickData,
          histogram: histogramData,
        });
      });

      chart.applyOptions({
        localization: {
          // priceFormatter: formatPrice,
          // timeFormatter: (ts: UTCTimestamp) =>
          //   dayjs.unix(ts).format("DD-MM-YYYY HH:mm:ss"),
        },
        timeScale: {
          tickMarkFormatter: (ts: UTCTimestamp) => {
            const format = dayjs.unix(ts);
            if (dayLimit > 5) {
              if (format.isSame(format.startOf("year"), "day"))
                return format.format("YYYY");
              if (format.isSame(format.startOf("month"), "day"))
                return format.format("MMM");
              return format.format("DD");
            }

            if (format.format("HH:mm") === "00:00")
              return dayjs.unix(ts).format("DD");
            return format.format("HH:mm");
          },
        },
      });
    }
    return () => {
      // cancel component when unmount
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }
    };
  }, [width, sizes, footerSize, currentCandleStickData, currentHistogramData]);

  useEffect(() => {
    if (!isLoading) {
      if (dataCandleStick) {
        setCurrentCandleStickData(dataCandleStick);
      }
      if (dataHistogram) {
        setCurrentHistogramData(dataHistogram);
      }
    }
  }, [dataCandleStick?.length, dataHistogram?.length, isLoading]);

  useEffect(() => {
    const apiKey =
      "6af44b9120c716f3fe1faadcecbeb4e2a27fa4f6158e7ec942781573f807b64b";
    ccStreamerRef.current = new WebSocket(
      `wss://streamer.cryptocompare.com/v2?api_key=${apiKey}`
    );

    // Set up the WebSocket connection

    ccStreamerRef.current.onmessage = event => {
      const data = JSON.parse(event.data);

      setTimeIUpdate(dayjs().format("DD-MM-YYYY HH:mm:ss"));
      if (data?.TYPE === "24") {
        setNewCandlestickData({
          time: data.TS,
          open: data.OPEN,
          close: data.CLOSE,
          low: data.LOW,
          high: data.HIGH,
        });

        setNewHistogramData({
          time: data.TS,
          value: data.VOLUMEFROM,
        });
      }

      if (data?.TYPE === "429") {
        toast.error(`Type: ${data?.TYPE} - Message: ${data?.MESSAGE}`);
      }
    };

    // Cleanup WebSocket connection on unmount
    return () => {
      ccStreamerRef.current?.close();
    };
  }, []); // Only run once on mount to avoid creating multiple WebSocket connections

  useEffect(() => {
    if (ccStreamerRef.current) {
      const handleSubscription = () => {
        if (dayLimit === 1 && !currentSubs.includes("24~CCCAGG~BTC~USD~m")) {
          if (currentSubs.length > 0) {
            const unSubRequest = {
              action: "SubRemove",
              subs: ["24~CCCAGG~BTC~USD~H", "24~CCCAGG~BTC~USD~D"],
            };
            ccStreamerRef.current?.send(JSON.stringify(unSubRequest));
          }

          const subRequest = {
            action: "SubAdd",
            subs: ["24~CCCAGG~BTC~USD~m"],
          };
          ccStreamerRef.current?.send(JSON.stringify(subRequest));
          setCurrentSubs(["24~CCCAGG~BTC~USD~m"]);
        } else if (
          dayLimit >= 5 &&
          dayLimit < 30 &&
          !currentSubs.includes("24~CCCAGG~BTC~USD~H")
        ) {
          const unSubRequest = {
            action: "SubRemove",
            subs: ["24~CCCAGG~BTC~USD~m", "24~CCCAGG~BTC~USD~D"],
          };
          ccStreamerRef.current?.send(JSON.stringify(unSubRequest));

          const subRequest = {
            action: "SubAdd",
            subs: ["24~CCCAGG~BTC~USD~H"],
          };
          ccStreamerRef.current?.send(JSON.stringify(subRequest));
          setCurrentSubs(["24~CCCAGG~BTC~USD~H"]);
        } else if (
          dayLimit >= 30 &&
          !currentSubs.includes("24~CCCAGG~BTC~USD~D")
        ) {
          const unSubRequest = {
            action: "SubRemove",
            subs: ["24~CCCAGG~BTC~USD~m", "24~CCCAGG~BTC~USD~H"],
          };
          ccStreamerRef.current?.send(JSON.stringify(unSubRequest));

          const subRequest = {
            action: "SubAdd",
            subs: ["24~CCCAGG~BTC~USD~D"],
          };
          ccStreamerRef.current?.send(JSON.stringify(subRequest));
          setCurrentSubs(["24~CCCAGG~BTC~USD~D"]);
        }
      };

      // Nếu WebSocket đã mở, gọi handleSubscription ngay lập tức
      if (ccStreamerRef.current.readyState === WebSocket.OPEN) {
        handleSubscription();
      } else {
        // Đảm bảo logic sẽ chạy khi WebSocket mở
        ccStreamerRef.current.onopen = () => {
          handleSubscription();
        };
      }
    }
  }, [dayLimit]);

  useEffect(() => {
    if (newCandlestickData && newCandlestickData.time) {
      setCurrentCandleStickData(prev => {
        if (!prev) return prev;

        const lastItem = prev[prev.length - 1];

        const lastTime = dayjs.unix(lastItem?.time as number);

        const newTime = dayjs.unix(newCandlestickData?.time as number);

        if (!newTime.isAfter(lastTime) && !newTime.isSame(lastTime)) {
          return prev;
        }

        const isSameHour = newTime.isSame(lastTime, "hour");

        const isSameDay = newTime.isSame(lastTime, "day");

        if (dayLimit >= 30) {
          if (isSameDay) {
            // is same hour, update last value
            const updateLastItem = {
              time: lastItem.time,
              open: newCandlestickData.open,
              close: newCandlestickData.close,
              high: newCandlestickData.high,
              low: newCandlestickData.low,
            };
            setChartMoveData(prev => ({
              ...prev,
              candlestick: updateLastItem,
            }));
            return [...prev.slice(0, -1), updateLastItem];
          } else {
            // add new
            return [...prev, newCandlestickData];
          }
        } else {
          if (isSameHour) {
            // is same hour, update last value
            const updateLastItem = {
              time: lastItem.time,
              open: newCandlestickData.open,
              close: newCandlestickData.close,
              high: newCandlestickData.high,
              low: newCandlestickData.low,
            };

            setChartMoveData(prev => ({
              ...prev,
              candlestick: updateLastItem,
            }));
            return [...prev.slice(0, -1), updateLastItem];
          } else {
            // add new
            setChartMoveData(prev => ({
              ...prev,
              candlestick: newCandlestickData,
            }));
            return [...prev, newCandlestickData];
          }
        }
      });
    }

    if (newHistogramData && newHistogramData.time) {
      setCurrentHistogramData(prev => {
        if (!prev) return prev;

        const lastItem = prev[prev.length - 1];
        const lastTime = dayjs(lastItem?.time as number);

        const newTime = dayjs(newCandlestickData?.time as number);

        // Skip update if new data is not after the last item
        if (!newTime.isAfter(lastTime) && !newTime.isSame(lastTime))
          return prev;

        const isSameHour = newTime.isSame(lastTime, "hour");
        const isSameDay = newTime.isSame(lastTime, "day");

        if (dayLimit >= 30) {
          // Handling based on the `dayLimit` value
          if (isSameDay) {
            // Update the last item's value if the new data is within the same day
            const updatedLastItem = {
              time: lastItem.time,
              value: newHistogramData.value,
            };
            setChartMoveData(prev => ({
              ...prev,
              histogram: updatedLastItem,
            }));
            return [...prev.slice(0, -1), updatedLastItem];
          } else {
            // Add the new data
            return [...prev, newHistogramData];
          }
        } else {
          if (isSameHour) {
            // Update the last item's value if the new data is within the same hour
            const updatedLastItem = {
              time: lastItem.time,
              value: newHistogramData.value,
            };

            setChartMoveData(prev => ({
              ...prev,
              histogram: updatedLastItem,
            }));
            return [...prev.slice(0, -1), updatedLastItem];
          } else {
            // Add the new data
            setChartMoveData(prev => ({
              ...prev,
              histogram: newHistogramData,
            }));
            return [...prev, newHistogramData];
          }
        }
      });
    }
  }, [newCandlestickData?.time, newHistogramData?.time, dayLimit, isLoading]);
  const heightCalc: Record<number, string> = {
    7: "md:h-[calc(100vh-120px-65px)]",
    50: "md:h-[calc(50vh-90px)]",
    100: "md:h-0",
  };
  return (
    <div className="w-full h-full">
      <div
        className={clsx(
          "w-full relative pt-[10px] h-[calc(100vh-120px-22px)] flex items-center justify-center",
          heightCalc[footerSize || 7]
        )}
        onClick={handleLeftClick}
        ref={chartContainerRef}
        onContextMenu={handleRightClick}
      >
        {isLoading && (
          <div className="absolute z-40 w-full h-full bg-[rgba(0,0,0,0.3)] flex flex-col justify-center items-center">
            <Spin size="large" />
          </div>
        )}

        <InfoMoveChart
          histogram={chartMoveData?.histogram}
          candlestick={chartMoveData?.candlestick}
        />
      </div>
      {width >= 768 && (
        <Popover
          ref={popoverRef}
          open={openMenu}
          trigger="click"
          content={<WrapperSetting price={price} />}
          arrow={false}
          overlayStyle={{
            // left: newPosition.left ? `${newPosition.left}px` : 0,
            // bottom: chartContainerRef.current?.clientHeight
            //   ? `${(Number(chartContainerRef.current?.clientHeight) - 428) / 2}px`
            //   : "10px",
            inset: `auto auto  ${
              chartContainerRef.current?.clientHeight
                ? `${Math.max(0, Number(chartContainerRef.current?.clientHeight) - newPosition.top - 428)}px`
                : "10px"
            } ${newPosition.left ? `${newPosition.left}px` : 0} `,
          }}
          align={{
            overflow: { adjustX: true, adjustY: true },
          }}
          getPopupContainer={() => chartContainerRef.current || document.body}
        />
      )}
      <WrapperRangTime
        chart="candlestick"
        handleChangeLimitDay={handleChangeLimitDay}
        chartContainerRef={chartContainerRef}
      />
    </div>
  );
};

export default CandleStickChart;
