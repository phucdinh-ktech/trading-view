import { useNavigate } from "react-router-dom";

import icons from "@/assets/icons";
import images from "@/assets/images";
import NavBar from "@/components/common/Navbar";
import SearchInput from "@/components/common/SearchInput";
import { paths } from "@/constants/paths";

function Header() {
  const navigate = useNavigate();
  return (
    <div className="h-[60px] shadow-lg border-b bg-white flex items-center justify-between px-[10px] fixed top-0 w-full">
      <div className="flex items-center gap-[10px]">
        <button
          className="p-[10px] rounded-full hover:bg-[#F0F3FA] duration-300 items-center gap-[10px] lg:hidden flex"
          onClick={() => navigate(paths.MENU)}
        >
          <img src={icons.menu} width={20} />
        </button>
        <div className="flex items-center gap-[10px]">
          <img src={images.logo} alt="logo" className="size-[50px]" />
          <h3 className="font-bold text-[#C74830] text-[20px]">K-Tech</h3>
        </div>
      </div>
      <div className="items-center gap-[12px] lg:flex hidden">
        <SearchInput />
        <NavBar />
      </div>
      <div className="flex items-center gap-[12px]">
        <button className="p-[10px] rounded-[20px] hover:bg-[#F0F3FA] duration-300 items-center gap-[10px] lg:flex hidden">
          <img src={icons.global} width={20} />
          <span className="text-[16px] font-medium">VI</span>
        </button>
        <button className="p-[10px] rounded-full hover:bg-[#F0F3FA] duration-300 items-center gap-[10px] lg:flex hidden">
          <img src={icons.user} width={20} />
        </button>
        <button className="p-[10px] rounded-full hover:bg-[#F0F3FA] duration-300 items-center gap-[10px] lg:hidden flex">
          <img src={icons.search} width={20} />
        </button>
        <button
          className="p-[10px] rounded-[10px] duration-300 flex items-center gap-[10px] w-[100px] justify-center"
          style={{
            background: `linear-gradient(90deg, #2376F3, #394EFE, #BA0FFC)`,
          }}
        >
          <span className="text-[16px] font-medium text-white">Bắt đầu</span>
        </button>
      </div>
    </div>
  );
}

export default Header;
