import icons from "@/assets/icons";
import DataTable from "@/components/common/DataTable";

import data from "../../pages/Trading/data.json";
function SideBarChart() {
  const HeaderSideBar = () => {
    return (
      <div className="flex items-center justify-between mb-[12px] sticky bg-white top-0 z-1">
        <button className="flex items-center gap-[4px] hover:bg-[#F0F3FA] duration-300 p-[10px] rounded-[10px]">
          <h3 className="text-[16px] font-bold text-[#999]">Watchlist</h3>
          <img
            src={icons.chevronRight}
            alt="icon"
            width={16}
            className="rotate-90"
          />
        </button>
        <div className="flex items-center gap-[8px]">
          <button className="hover:bg-[#F0F3FA] duration-300 p-[2px] rounded-[4px]">
            <img src={icons.plus} alt="icon" width={20} />
          </button>
          <button className="hover:bg-[#F0F3FA] duration-300 p-[2px] rounded-[4px]">
            <img src={icons.chart} alt="icon" width={20} />
          </button>
          <button className="hover:bg-[#F0F3FA] duration-300 p-[2px] rounded-[4px]">
            <img src={icons.more} alt="icon" width={20} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="">
      <HeaderSideBar />
      <div className="max-h-[40%] overflow-y-auto">
        <DataTable data={data} grouped />
      </div>
    </div>
  );
}

export default SideBarChart;
