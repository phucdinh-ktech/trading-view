import { Tabs, TabsProps } from "antd";

interface TabsComponentProps extends TabsProps {
  extraProp?: string;
}

const TabsComponent = ({ items, onChange, ...rest }: TabsComponentProps) => {
  return (
    <Tabs
      items={items}
      onChange={onChange}
      rootClassName="tabs-custom"
      className="p-[4px]"
      {...rest}
    />
  );
};

export default TabsComponent;
