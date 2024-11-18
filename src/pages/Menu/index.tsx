import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import icons from "@/assets/icons";
import { paths } from "@/constants/paths";
import useWindowSize from "@/utils/hooks/useWindowSize";

import navbars from "../../navBar.json";

function Menu() {
  const navigate = useNavigate();
  const [currentParentId, setCurrentParentId] = useState<number | null>(null);
  const [title, setTitle] = useState<string>("");

  const currentChildren =
    navbars.find(nav => nav.id === currentParentId)?.children || [];
  const size = useWindowSize();
  useEffect(() => {
    if (size?.width > 768) {
      navigate(paths.HOME);
    }
  }, [size?.width]);
  return (
    <div>
      <div className="flex items-center justify-between p-[20px] border-b">
        <div className="flex items-center gap-[10px]">
          {title !== "" && (
            <button
              onClick={() => {
                setTitle("");
                setCurrentParentId(null);
              }}
            >
              <img
                src={icons.chevronRight}
                width={20}
                className="rotate-[180deg]"
              />
            </button>
          )}
          <h2 className="text-[20px] font-bold">{title || ""}</h2>
        </div>
        <button onClick={() => navigate(paths.HOME)}>
          <img src={icons.close} width={20} />
        </button>
      </div>

      <div className="flex flex-col gap-[10px]">
        {currentParentId === null ? (
          <div className="p-[20px] border-b">
            <ul>
              {navbars.map(nav => (
                <li key={nav.id} className="py-[10px]">
                  <button
                    className="w-full flex items-center gap-[10px] justify-between"
                    onClick={() => {
                      setTitle(nav.title);
                      setCurrentParentId(nav.id);
                    }}
                  >
                    <p className="font-medium">{nav.title}</p>
                    <img src={icons.chevronRight} width={20} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="p-[20px] border-b">
            <ul>
              {currentChildren.map((child, index) => (
                <li key={index} className="py-[10px]">
                  <p className="font-medium uppercase text-[#999] mb-[5px]">
                    {child.header}
                  </p>
                  <ul>
                    {child.children.map((subChild, subIndex) => (
                      <li key={subIndex} className="py-[5px]">
                        <button className="w-full flex items-center gap-[10px]">
                          {subChild.icon && (
                            <img
                              src={subChild.icon}
                              alt="icon"
                              className="w-[16px] h-[16px]"
                            />
                          )}
                          <p>{subChild.title}</p>
                        </button>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        )}

        <button className="w-full flex items-center gap-[10px] p-[10px]">
          <img src={icons.user} width={20} />
          <p className="font-medium text-blue-400">Đăng nhập</p>
        </button>
      </div>
    </div>
  );
}

export default Menu;
