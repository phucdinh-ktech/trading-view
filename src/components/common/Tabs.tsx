import { Tabs, TabsProps } from "antd";

import WrapperMarket from "@/components/pages/home/WrapperMarket";

const TabsComponent = () => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Indices",
      children: <WrapperMarket />,
    },
    {
      key: "2",
      label: "Stocks",
      children: <WrapperMarket />,
    },
    {
      key: "3",
      label: "ETFs",
      children: <WrapperMarket />,
    },
  ];
  const onChange = (key: string) => {
    console.log(key);
  };
  return (
    <Tabs
      defaultActiveKey="1"
      items={items}
      onChange={onChange}
      rootClassName="tabs-custom"
      className="p-[4px]"
    />
  );
};

export default TabsComponent;
