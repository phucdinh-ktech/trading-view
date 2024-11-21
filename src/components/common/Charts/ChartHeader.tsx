import { Divider } from "antd";

import icons from "@/assets/icons";

const ChartHeader = () => {
  return (
    <div className="relative z-50 flex justify-between items-center w-full h-[38px] bg-white px-[8px] mb-[2px] border-t border-solid border-[#0505050f]">
      <div className="flex justify-start gap-[6px]">
        <div className="flex justify-start items-center h-[38px]">
          <div className="flex justify-start items-center w-[138px] min-w-[138px]">
            <div className="size-[28px] p-[3px]">
              <img src={icons.search} className="w-full h-full" />
            </div>
            <span className="mr-[2px]">AAPL</span>
          </div>
          <div className="size-[28px] flex justify-center items-center">
            <img src={icons.addCircle} className="w-full h-full" />
          </div>
        </div>
        <div>
          <Divider type="vertical" className="m-0 h-full" />
        </div>
        <div className="flex justify-center items-center">1H</div>
        <div>
          <Divider type="vertical" className="m-0 h-full" />
        </div>
        <div className="flex justify-center items-center">
          <div className="size-[28px]">
            <img src={icons.candle} className="w-full h-full" />
          </div>
        </div>
        <div>
          <Divider type="vertical" className="m-0 h-full" />
        </div>
        <div className="flex justify-center items-center">
          <div className="size-[28px]">
            <img src={icons.fx} className="w-full h-full" />
          </div>
          <div className="size-[28px]">
            <img src={icons.app} className="w-full h-full" />
          </div>
        </div>
        <div>
          <Divider type="vertical" className="m-0 h-full" />
        </div>
        <div className="flex justify-center items-center">
          <div className="size-[28px]">
            <img src={icons.undo} className="w-full h-full" />
          </div>
          <div className="size-[28px]">
            <img src={icons.redo} className="w-full h-full" />
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-[6px]">
        <div className="flex justify-center items-center">
          <div className="w-[21px] h-[19px]">
            <img src={icons.square} className="w-full h-full" />
          </div>
        </div>
        <div>
          <span>Save</span>
        </div>
        <div className="flex justify-center items-center">
          <div className="w-[20px] h-[28px] p-[4px]">
            <img src={icons.chervonUp} className="w-full h-full" />
          </div>
        </div>

        <div>
          <Divider type="vertical" className="m-0 h-full" />
        </div>
        <div className="flex items-center">
          <div className="size-[28px]">
            <img src={icons.searchTool} className="w-full h-full" />
          </div>
          <div className="size-[28px]">
            <img src={icons.setting} className="w-full h-full" />
          </div>
          <div className="size-[28px]">
            <img src={icons.screenFull} className="w-full h-full" />
          </div>
          <div className="w-[28px] h-[28px]">
            <img src={icons.camera} className="w-full h-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartHeader;
