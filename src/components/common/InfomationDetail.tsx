import icons from "@/assets/icons";
import LineChart from "@/components/common/Charts/LineChart";

import sampleData from "./Charts/lineChart.json";
function InformationDetail() {
  return (
    <div className="p-[10px]">
      <div className="flex items-start justify-between sticky top-0 z-1 bg-white">
        <span className="text-[20px] font-medium">HDFC</span>
        <div className="flex items-center gap-[8px]">
          <button className="hover:bg-[#F0F3FA] duration-300 p-[2px] rounded-[4px]">
            <img src={icons.grid} alt="icon" width={20} />
          </button>
          <button className="hover:bg-[#F0F3FA] duration-300 p-[2px] rounded-[4px]">
            <img src={icons.edit} alt="icon" width={20} />
          </button>
          <button className="hover:bg-[#F0F3FA] duration-300 p-[2px] rounded-[4px]">
            <img src={icons.more} alt="icon" width={20} />
          </button>
        </div>
      </div>
      <div className="p-4 bg-white rounded-p-[10px]">
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <h1 className="text-lg font-semibold text-[#999]">
              RELIANCE INDS FUTURES
            </h1>
            <p className="text-sm text-gray-500">NSE • Futures</p>
          </div>
          <div>
            <span className="text-xs text-gray-400">Holiday</span>
          </div>
        </div>

        <div className="my-4">
          <div className="text-3xl font-bold text-gray-800">
            1,245.10 <span className="text-xs text-gray-500">INR</span>
          </div>
          <div className="flex items-center space-x-4 mt-2">
            <span className="text-red-500 text-lg">-19.25</span>
            <span className="text-red-500 text-lg">-1.52%</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Last update at Nov 19, 16:59 UTC+7
          </p>
        </div>

        <div className="my-4 bg-purple-100 text-purple-700 p-3 rounded-md">
          <p className="text-sm">
            <strong>6 hours ago</strong> • Chartist Talks: Markets rebound
            imminent despite downward trajectory, says Milan Vaishnav.
          </p>
        </div>

        <div className="my-4">
          <h2 className="text-sm font-semibold text-gray-700 mb-2">
            Forward curve
          </h2>

          <LineChart
            data={sampleData}
            height={400}
            title="Reliance Futures Forward Curve"
          />
        </div>

        <div className="mt-4">
          <h2 className="text-sm font-semibold text-gray-700 mb-2">
            Contract highlights
          </h2>
          <ul className="text-sm text-gray-800">
            <li className="flex justify-between">
              <span>Volume:</span>
              <span className="font-medium">23.79M</span>
            </li>
            <li className="flex justify-between">
              <span>Open interest:</span>
              <span className="font-medium">153.17M</span>
            </li>
            <li className="flex justify-between">
              <span>Contract size:</span>
              <span className="font-medium">500</span>
            </li>
            <li className="flex justify-between">
              <span>Front month:</span>
              <span className="font-medium">RELIANCEX2024</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default InformationDetail;
