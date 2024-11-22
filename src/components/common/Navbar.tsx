import { Link } from "react-router-dom";

import icons from "@/assets/icons";

import navbars from "../../navBar.json";
function NavBar() {
  return (
    <ul className="flex items-center gap-[12px]">
      {navbars?.map((nav, index) => (
        <li key={index} className="relative group">
          <button className="hover:bg-[#F0F3FA] duration-300 rounded-[20px] p-[10px]">
            <span className="text-[14px] font-medium">{nav?.title}</span>
          </button>

          <div className="hidden group-hover:block absolute top-full left-0 w-[250px] mt-[10px] rounded-[10px] shadow-md border bg-white z-[51] before:content-[''] before:absolute before:-top-[10px] before:left-0 before:w-full before:h-[10px]">
            {nav?.children?.map((child, childIndex) => (
              <div key={childIndex} className="rounded-[5px]">
                {child?.header !== "" && (
                  <span className="uppercase text-[12px] block p-[5px] text-[#999]">
                    {child?.header}
                  </span>
                )}
                <ul>
                  {child?.children?.map((item, subIndex) => (
                    <Link to={item?.path || "#"}>
                      {" "}
                      <li
                        key={subIndex}
                        className="p-[10px] hover:bg-[#F0F3FA] cursor-pointer rounded-[5px]"
                      >
                        <button className="w-full flex items-center gap-[5px] justify-between">
                          <div className="flex items-center gap-[10px]">
                            {item?.icon && (
                              <img
                                src={item?.icon}
                                alt="icon"
                                className="w-[16px] h-[16px]"
                              />
                            )}
                            <span className="text-nowrap">{item?.title}</span>
                          </div>
                          {child?.header && (
                            <img
                              src={icons.chevronRight}
                              alt="icon"
                              className="w-[16px] h-[16px]"
                            />
                          )}
                        </button>
                      </li>
                    </Link>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default NavBar;
