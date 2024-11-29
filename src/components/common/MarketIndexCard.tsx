import clsx from "clsx";

import svgs from "@/assets/svgs";
import AreaChartComponent from "@/components/common/Charts/AreaChart";
import { CustomVolumeFullType } from "@/libs/swr/useFetchTopVolumeFull";
import { formatNumberWithCommas } from "@/utils/functions/formatNumberWithCommas";

import useWindowSize from "../../hooks/useWindowSize";

interface IMarketIndexCardProps {
  active?: boolean;
  item: CustomVolumeFullType;
  handleSelected?: (coinInfoId: string, volume: CustomVolumeFullType) => void;
  volume?: CustomVolumeFullType;
}
const MarketIndexCard = (props: IMarketIndexCardProps) => {
  const { active, item, handleSelected, volume } = props;
  const { width } = useWindowSize();

  if (width < 768)
    return (
      <div
        className="w-[152px] min-h-[156px] p-[12px] rounded-[16px] border flex flex-col gap-[4px] cursor-pointer"
        onClick={() => handleSelected?.(item.Id, item)}
      >
        <div className="flex items-center gap-[6px]">
          <div className="size-[32px]">
            <img
              src={item?.ImageUrl}
              className="w-full h-full rounded-full"
              alt="s-and-p-500"
            />
          </div>
          <div className="flex items-center">
            <p className="text-[16px] text-blackApp font-medium leading-[24px] line-clamp-1">
              {item?.FullName}
            </p>
            <div className="size-[18px] ml-[4px]">
              <img
                src={svgs.marketClose}
                alt="market-close"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
        <div>
          <div className="flex gap-[6px]">
            <span className="text-[16px] text-blackApp font-medium leading-[24px]">
              {formatNumberWithCommas(Number(item?.Price).toFixed(2))}{" "}
              <span className="text-[11px] font-[400] leading-[16px] tracking-[0.4px] ml-[2px]">
                {item.ToSymbol}
              </span>
            </span>
          </div>
          <span
            className={clsx(
              "text-[16px font-medium leading-[24px]",
              Number(item?.PercentChange) > 0 ? "text-greenApp" : "text-redApp"
            )}
          >
            {Number(item?.PercentChange) > 0
              ? `+${Number(item?.PercentChange).toFixed(6)}`
              : Number(item?.PercentChange).toFixed(6)}{" "}
            %
          </span>
        </div>

        <div className="flex flex-col justify-center items-center">
          <AreaChartComponent
            chartHeight={40}
            chartWidth={152 - 2 * 12}
            isMobile
            volume={volume}
          />
          <p className="text-[12px] text-[#6a6d78] leading-[16px]">1 day</p>
        </div>
      </div>
    );
  return (
    <div
      className={clsx(
        "w-[350px] max-w-[350px] rounded-[64px] min-h-[66px] flex flex-col justify-center items-start p-[8px_12px] cursor-pointer",
        active ? "bg-active" : "bg-white"
      )}
      onClick={() => handleSelected?.(item.Id, item)}
    >
      <div className="flex items-center gap-[2px_8px]">
        <div className="size-[32px]">
          <img
            src={item?.ImageUrl}
            className="w-full h-full rounded-full"
            alt="s-and-p-500"
          />
        </div>
        <div>
          <div className="flex items-center">
            <p className="text-[16px] text-blackApp font-medium leading-[24px]">
              {item?.FullName}
            </p>
            <div className="size-[18px] ml-[4px]">
              <img
                src={svgs.marketClose}
                alt="market-close"
                className="w-full h-full"
              />
            </div>
          </div>

          <div className="flex gap-[12px]">
            <span className="text-[16px] text-blackApp font-medium leading-[24px]">
              {formatNumberWithCommas(Number(item?.Price).toFixed(2))}{" "}
              <span className="text-[11px] font-[400] leading-[16px] tracking-[0.4px] ml-[2px]">
                {item.ToSymbol}
              </span>
            </span>
            <span
              className={clsx(
                "text-[16px font-medium leading-[24px]",
                Number(item?.PercentChange) > 0
                  ? "text-greenApp"
                  : "text-redApp"
              )}
            >
              {Number(item?.PercentChange) > 0
                ? `+${Number(item?.PercentChange).toFixed(6)}`
                : Number(item?.PercentChange).toFixed(6)}{" "}
              %
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketIndexCard;
