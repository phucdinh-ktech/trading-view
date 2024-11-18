import clsx from "clsx";

import svgs from "@/assets/svgs";

interface IMarketIndexCardProps {
  active?: boolean;
}
const MarketIndexCard = (props: IMarketIndexCardProps) => {
  const { active } = props;
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
