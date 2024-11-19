import clsx from "clsx";

import svgs from "@/assets/svgs";
import AreaChartComponent from "@/components/common/Charts/AreaChart";

import useWindowSize from "../../hooks/useWindowSize";

interface IMarketIndexCardProps {
  active?: boolean;
}
const MarketIndexCard = (props: IMarketIndexCardProps) => {
  const { active } = props;
  const { width } = useWindowSize();

  if (width < 768)
    return (
      <div className="w-[152px] min-h-[156px] p-[12px] rounded-[16px] border flex flex-col gap-[4px]">
        <div className="flex items-center gap-[6px]">
          <div className="size-[32px]">
            <img
              src={svgs.SAndP500}
              className="w-full h-full rounded-full"
              alt="s-and-p-500"
            />
          </div>
          <div className="flex items-center">
            <p className="text-[16px] text-blackApp font-medium leading-[24px] line-clamp-1">
              S&P 500
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
              5,870.63{" "}
              <span className="text-[11px] font-[400] leading-[16px] tracking-[0.4px] ml-[2px]">
                USD
              </span>
            </span>
          </div>
          <p className="text-[16px] text-redApp font-medium leading-[24px]">
            -1.32%
          </p>
        </div>

        <div className="flex flex-col justify-center items-center">
          <AreaChartComponent
            chartHeight={40}
            chartWidth={152 - 2 * 12}
            isMobile
          />
          <p className="text-[12px] text-[#6a6d78] leading-[16px]">1 day</p>
        </div>
      </div>
    );
  return (
    <div
      className={clsx(
        "w-[350px] max-w-[350px] rounded-[64px] min-h-[66px] flex flex-col justify-center items-start p-[8px_12px]",
        active ? "bg-active" : "bg-white"
      )}
    >
      <div className="flex items-center gap-[2px_8px]">
        <div className="size-[32px]">
          <img
            src={svgs.SAndP500}
            className="w-full h-full rounded-full"
            alt="s-and-p-500"
          />
        </div>
        <div>
          <div className="flex items-center">
            <p className="text-[16px] text-blackApp font-medium leading-[24px]">
              S&P 500
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
              5,870.63{" "}
              <span className="text-[11px] font-[400] leading-[16px] tracking-[0.4px] ml-[2px]">
                USD
              </span>
            </span>
            <span className="text-[16px] text-redApp font-medium leading-[24px]">
              -1.32%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketIndexCard;
