import { Divider } from "antd";

import icons from "@/assets/icons";
import svgs from "@/assets/svgs";
import SettingItem, {
  ISettingItemProps,
} from "@/components/common/Setting/SettingItem";

export type IconPositionType = "start" | "end" | undefined;

interface IWrapperSettingProps {
  price: number;
}
const WrapperSetting = (props: IWrapperSettingProps) => {
  const { price } = props;
  const settingData: ISettingItemProps[] = [
    {
      title: `Copy price ${Number(price.toFixed(2))}`,
    },
    {
      title: "Paste",
    },

    {
      title: (
        <div className="w-full flex justify-between items-center">
          Trade <img src={svgs.arrowRight} className="size-[10px]" />{" "}
        </div>
      ),
    },
    {
      title: "Add AAPL to watchlist",
    },
    {
      title: "Lock vertical cursor line by time",
    },
    {
      title: "Object Tree…",
    },
    {
      title: "Remove drawings",
    },
    {
      title: "Remove indicators",
    },
    {
      title: "Hide marks on bars",
      icon: (
        <div className="w-[28px] h-[28px] flex flex-col justify-center items-center">
          <img src={icons.check} className="w-[18px] h-[14px]" />
        </div>
      ),
    },
    {
      title: "Settings…",
      icon: (
        <div className="w-[28px] h-[28px] flex flex-col justify-center items-center">
          <img src={icons.setting} className="size-[28px]" />
        </div>
      ),
    },
  ];

  return (
    <div
      className="flex flex-col items-start gap-[4px]"
      onClick={e => {
        e.stopPropagation();
      }}
    >
      {settingData.map((setting, index) => (
        <>
          <SettingItem
            key={index}
            title={setting.title}
            icon={setting.icon}
            iconPosition={setting?.iconPosition}
          />
          <Divider className="my-0" />
        </>
      ))}
    </div>
  );
};

export default WrapperSetting;
