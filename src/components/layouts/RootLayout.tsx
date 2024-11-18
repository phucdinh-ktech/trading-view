import { Outlet } from "react-router-dom";

import Header from "@/components/layouts/Header";

const RootLayout = () => {
  return (
    <div>
      <Header />
      <div className="mt-[60px] min-h-[100vh]">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
