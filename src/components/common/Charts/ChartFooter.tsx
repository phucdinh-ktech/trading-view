/* eslint-disable no-unused-vars */
import { Table, TabsProps } from "antd";
import clsx from "clsx";
import { useState } from "react";

import icons from "@/assets/icons";
import AvatarColumn from "@/components/common/AvatarColumn";
import CustomTitle from "@/components/CustomTitle";
import { formatNumberCompact } from "@/utils/functions/formatNumberCompact";
import { formatNumberWithCommas } from "@/utils/functions/formatNumberWithCommas";

import useWindowSize from "../../../hooks/useWindowSize";
import dataSource from "../../../pages/Trading/dataSource.json";

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "Stock Screener",
    children: "Content of Tab Pane 1",
  },
  {
    key: "2",
    label: "Pine Editor",
    children: "Content of Tab Pane 2",
  },
  {
    key: "3",
    label: "Strategy Tester",
    children: "Content of Tab Pane 3",
  },
  {
    key: "4",
    label: "Replay Trading",
    children: "Content of Tab Pane 3",
  },
  {
    key: "5",
    label: "Trading Panel",
    children: "Content of Tab Pane 3",
  },
];

interface IChartFooterProps {
  handleChangeFooterSize?: (size: number) => void;
  footerSize?: number;
}
const ChartFooter = (props: IChartFooterProps) => {
  const { handleChangeFooterSize, footerSize } = props;
  const { width } = useWindowSize();
  const [toggleFooter, setToggleFooter] = useState<boolean>(false);
  const [selectedKey, setSelectedKey] = useState<string>("1");
  const onChangeHeader = (key: string) => {
    setSelectedKey(key);
  };
  const columns = [
    {
      title: <CustomTitle title="Ticker" hasSearchInput />,
      dataIndex: "ticker",
      key: "ticker",
      sorter: (a: { ticker: string }, b: { ticker: string }) =>
        a.ticker.localeCompare(b.ticker),
      showSorterTooltip: false,
      render: (text: string) => (
        <div className="flex items-center gap-[4px]">
          <AvatarColumn
            textColor="#fff"
            backgroundColor="#999"
            name={text}
            size={30}
          />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: <CustomTitle title="Giá" />,
      dataIndex: "price",
      key: "price",
      sorter: (a: { price: number }, b: { price: number }) => a.price - b.price,
      showSorterTooltip: false,
      render: (price: number) => (
        <div className="flex items-end gap-[4px]">
          <p>{formatNumberWithCommas(price)}</p>
          <span className="text-[10px] text-[#999]">VND</span>
        </div>
      ),
    },
    {
      title: <CustomTitle title="% thay đổi" />,
      dataIndex: "changePercent",
      key: "changePercent",
      sorter: (a: { change: number }, b: { change: number }) =>
        a.change - b.change,
      render: (change: number) => (
        <span
          style={{
            color: change > 0 ? "green" : change < 0 ? "red" : "black",
          }}
        >
          {change}%
        </span>
      ),
      showSorterTooltip: false,
    },
    {
      title: <CustomTitle title="TH.Đổi" />,
      dataIndex: "change",
      key: "change",
      sorter: (a: { marketCap: number }, b: { marketCap: number }) =>
        a.marketCap - b.marketCap,
      showSorterTooltip: false,
      render: (price: number) => (
        <div className="flex items-end gap-[4px]">
          <p>{formatNumberWithCommas(price)}</p>
          <span className="text-[10px] text-[#999]">VND</span>
        </div>
      ),
    },
    {
      title: <CustomTitle title="Đánh giá kĩ thuật" />,
      dataIndex: "assessment",
      key: "assessment",
      sorter: (a: { marketCap: number }, b: { marketCap: number }) =>
        a.marketCap - b.marketCap,
      showSorterTooltip: false,
      render: (text: string) => {
        const isIncreasing = text.includes("Tăng");

        return (
          <div className="flex items-center gap-[4px]">
            <img
              src={isIncreasing ? icons.chevronsUp : icons.chevronsDown}
              alt="icon"
              width={14}
            />
            <p
              className={`${isIncreasing ? "text-[#2962ff]" : "text-[#f7525f]"}`}
            >
              {text}
            </p>
          </div>
        );
      },
    },

    {
      title: <CustomTitle title="Khối lượng" />,
      dataIndex: "volume",
      key: "volume",
      sorter: (a: { marketCap: number }, b: { marketCap: number }) =>
        a.marketCap - b.marketCap,
      showSorterTooltip: false,
      render: (text: number) => <p>{formatNumberCompact(text)}</p>,
    },
    {
      title: <CustomTitle title="Khối lượng * giá" />,
      dataIndex: "volumeXprice",
      key: "volumeXprice",
      sorter: (a: { marketCap: number }, b: { marketCap: number }) =>
        a.marketCap - b.marketCap,
      showSorterTooltip: false,
      render: (text: number) => <p>{formatNumberCompact(text)}</p>,
    },
    {
      title: <CustomTitle title="Giá trị vốn hóa thị trường" />,
      dataIndex: "marketCap",
      key: "marketCap",
      sorter: (a: { marketCap: number }, b: { marketCap: number }) =>
        a.marketCap - b.marketCap,
      showSorterTooltip: false,
      render: (text: number) => <p>{formatNumberCompact(text)}</p>,
    },
    {
      title: <CustomTitle title="P/E" />,
      dataIndex: "pe",
      key: "pe",
      sorter: (a: { marketCap: number }, b: { marketCap: number }) =>
        a.marketCap - b.marketCap,
      showSorterTooltip: false,
    },
    {
      title: <CustomTitle title="EPS(TTM)" />,
      dataIndex: "eps",
      key: "eps",
      sorter: (a: { marketCap: number }, b: { marketCap: number }) =>
        a.marketCap - b.marketCap,
      showSorterTooltip: false,
      render: (price: number) => (
        <div className="flex items-end gap-[4px]">
          <p>{formatNumberWithCommas(price)}</p>
          <span className="text-[10px] text-[#999]">VND</span>
        </div>
      ),
    },
    {
      title: <CustomTitle title="Nhân viên" />,
      dataIndex: "employee",
      key: "employee",
      sorter: (a: { marketCap: number }, b: { marketCap: number }) =>
        a.marketCap - b.marketCap,
      showSorterTooltip: false,
      render: (text: number) => <p>{formatNumberCompact(text)}</p>,
    },
    {
      title: <CustomTitle title="Khu vực" />,
      dataIndex: "location",
      key: "location",
      sorter: (a: { marketCap: number }, b: { marketCap: number }) =>
        a.marketCap - b.marketCap,
      showSorterTooltip: false,
    },
  ];

  return (
    <>
      <div className="w-full h-full flex flex-col items-start">
        <div className="w-full flex justify-between items-center gap-[12px] h-[38.2px] px-[18px] border-b-[2px] border-solid border-[#0505050f]">
          <div className="flex justify-start items-center gap-[12px]">
            {items.map((item, index) => (
              <button
                key={index}
                onClick={() => onChangeHeader(item.key)}
                className={clsx(
                  "text-[14px] text-blackApp font-semibold hover:bg-active leading-[18px] p-[5px_10px] rounded-[4px]",
                  selectedKey === item.key ? "text-blueApp" : ""
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="flex justify-end items-center">
            {!toggleFooter ? (
              <div
                className="w-[38px] h-full p-[5px_10px] cursor-pointer"
                onClick={() => {
                  setToggleFooter(true);
                  handleChangeFooterSize?.(50);
                }}
              >
                <img src={icons.arrowUpFooter} className="w-full h-full" />
              </div>
            ) : (
              <div
                className="w-[38px] h-full p-[5px_10px] cursor-pointer"
                onClick={() => {
                  setToggleFooter(false);
                  handleChangeFooterSize?.(7);
                }}
              >
                <img src={icons.minusFooter} className="w-full h-full" />
              </div>
            )}
            <div
              className="w-[38px] h-full p-[5px] cursor-pointer"
              onClick={() =>
                handleChangeFooterSize?.(footerSize === 100 ? 7 : 100)
              }
            >
              <img
                src={footerSize === 100 ? icons.zoomOut : icons.zoom}
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
        <div className="w-full h-full shadow-sm p-[12px_20px_10px]">
          <div className="flex justify-between items-center gap-[6px]">
            <div className="flex items-center gap-[12px] h-[32px]">
              <div className="flex justify-center items-center w-fit h-[32px] border border-solid border-[#e0e3eb] rounded-[2px]">
                <div className="w-[32px] flex justify-center items-center cursor-pointer">
                  <div className="size-[18px]">
                    <img src={icons.refresh} className="w-full h-full" />
                  </div>
                </div>
                <div className="w-[1px] h-full bg-[#e0e3eb]"></div>
                <div className="w-[32px] flex justify-center items-center cursor-pointer">
                  <div className="size-[18px] p-[3px]">
                    <img src={icons.moreVer} className="w-full h-full" />
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center w-fit h-[32px] border border-solid border-[#e0e3eb] rounded-[2px]">
                <div className="p-[4px_20px_4px_12px]">
                  <p className="relative text-[12px] text-[#6a6d78] font-bold triangle">
                    Overview
                  </p>
                </div>
                <div className="w-[1px] h-full bg-[#e0e3eb]"></div>
                <div className="size-[32px] p-[9px_10px]">
                  <img src={icons.column} className="w-full h-full" />
                </div>
              </div>
              {width >= 1400 && (
                <div className="items-center h-[32px] gap-[10px] flex">
                  <button className="bg-[#868993] text-white p-[5px_10px] text-[13px] h-[25.2px] flex items-center rounded-[2px]">
                    Overview
                  </button>
                  <button className="bg-[#f1f3f6] text-[#868993] p-[5px_10px] text-[13px] h-[25.2px] flex items-center rounded-[2px]">
                    Performance
                  </button>
                  <button className="bg-[#f1f3f6] text-[#868993] p-[5px_10px] text-[13px] h-[25.2px] flex items-center rounded-[2px]">
                    Extended Hours
                  </button>
                  <button className="relative triangle-button bg-[#f1f3f6] text-[#868993] p-[5px_10px] text-[13px] h-[25.2px] flex items-center rounded-[2px]"></button>
                </div>
              )}
            </div>
            <div className="h-[32px] flex items-center gap-[6px]">
              <div className="flex items-center h-[32px] gap-[10px]">
                <div className="w-[32px] p-[7px] border border-solid border-[#e0e3eb] rounded-[2px] cursor-pointer">
                  <img src={icons.download} className="w-full h-full" />
                </div>
              </div>
              <div className="flex items-center h-[32px] gap-[10px] ml-[12px] border border-solid border-[#e0e3eb] rounded-[2px] p-[4px_20px_4px_12px] cursor-pointer">
                <p className="relative triangle text-[#6a6d78] text-[12px] font-semibold">
                  1 <sup className="text-[#6a6d78] text-[10px]">D</sup>
                </p>
              </div>
              <div className="w-[32px] h-[32px] p-[5px]">
                <img src={icons.us} className="w-full h-full rounded-full" />
              </div>

              <div className="flex items-center h-[32px]">
                <div className="h-full flex border border-solid border-[#e0e3eb] rounded-l-[2px] p-[4px_20px_4px_12px] cursor-pointer">
                  <p className="relative triangle text-[#6a6d78] text-[12px] font-semibold">
                    Most capitalized*
                  </p>
                </div>
                <button className="h-full flex items-center gap-[7px] bg-blueApp p-[4px_12px] text-white rounded-r-[2px] text-[12px] font-semibold cursor-pointer">
                  Filters
                  <div className="size-[14px] p-[1px]">
                    <img src={icons.toggle} className="w-full h-full" />
                  </div>
                </button>
              </div>
            </div>
          </div>
          <Table
            columns={columns}
            dataSource={dataSource}
            scroll={{ x: "max-content" }}
          />
        </div>
      </div>
    </>
  );
};

export default ChartFooter;
