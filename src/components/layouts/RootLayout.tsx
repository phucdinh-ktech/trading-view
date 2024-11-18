import { Outlet } from "react-router-dom";

import Header from "@/components/layouts/Header";

const RootLayout = () => {
  return (
    <div className="relative">
      <Header />
      <div className="max-w-[1440px] mx-auto px-[20px] mt-[80px]">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
