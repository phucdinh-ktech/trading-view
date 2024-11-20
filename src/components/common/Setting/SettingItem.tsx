import { Button } from "antd";
import { ReactNode } from "react";

import { IconPositionType } from "@/components/common/Setting/WrapperSetting";
export interface ISettingItemProps {
  title: ReactNode;
  icon?: ReactNode;
  iconPosition?: string;
}
const SettingItem = (props: ISettingItemProps) => {
  const { title, icon, iconPosition } = props;
  return (
    <Button
      className="w-full border-none shadow-none p-0 flex justify-start items-center"
      icon={icon || <div className="min-w-[28px] min-h-[28px]"></div>}
      iconPosition={iconPosition as IconPositionType}
    >
      {title}
    </Button>
  );
};

export default SettingItem;
