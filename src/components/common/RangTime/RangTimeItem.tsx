import { Button } from "antd";
import clsx from "clsx";

interface IRangTimeItemProps {
  time: string;
  active?: boolean;
  onChange?: (_time: string) => void;
}
const RangTimeItem = (props: IRangTimeItemProps) => {
  const { time, active, onChange } = props;
  return (
    <Button
      className={clsx(
        "border-none shadow-none text-[16px] text-blackApp font-semibold leading-[24px] h-[38px] p-[8px_16px] rounded-[8px] focus:border-none focus:shadow-none focus:outline-none focus-within:border-none focus-within:shadow-none focus-within:outline-none focus-visible:border-none focus-visible:shadow-none focus-visible:outline-none",
        active ? "bg-active" : "bg-white"
      )}
      onClick={() => onChange?.(time)}
    >
      {time}
    </Button>
  );
};

export default RangTimeItem;
