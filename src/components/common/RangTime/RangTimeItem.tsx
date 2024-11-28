import { Button } from "antd";
import clsx from "clsx";

import { ChartType } from "@/components/common/RangTime/WrapperRangTime";

interface IRangTimeItemProps {
  time: string;
  active?: boolean;
  onChange?: (_time: string) => void;
  chart: ChartType;
  title: string;
}
const RangTimeItem = (props: IRangTimeItemProps) => {
  const { time, active, onChange, chart, title } = props;

  if (chart === "candlestick")
    return (
      <Button
        className={clsx(
          "border-none shadow-none text-[14px] text-blackApp font-semibold leading-[24px] h-[38px] p-[0_6px] rounded-[4px] focus:border-none focus:shadow-none focus:outline-none focus-within:border-none focus-within:shadow-none focus-within:outline-none focus-visible:border-none focus-visible:shadow-none focus-visible:outline-none",
          active ? "bg-active" : "bg-white"
        )}
        onClick={() => onChange?.(time)}
      >
        <span className="block md:!hidden">{title}</span>
        <span className="hidden md:block">{time}</span>
      </Button>
    );

  return (
    <Button
      className={clsx(
        "border-none shadow-none text-[16px] text-blackApp font-semibold leading-[24px] h-[38px] p-[8px_16px] rounded-[8px] focus:border-none focus:shadow-none focus:outline-none focus-within:border-none focus-within:shadow-none focus-within:outline-none focus-visible:border-none focus-visible:shadow-none focus-visible:outline-none",
        active ? "bg-active" : "bg-white"
      )}
      onClick={() => onChange?.(time)}
    >
      <span className="block md:hidden">{title}</span>
      <span className="hidden md:block">{time}</span>
    </Button>
  );
};

export default RangTimeItem;
