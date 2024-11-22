import icons from "@/assets/icons";

function RightSideBar() {
  return (
    <div className="w-[50px] flex flex-col items-center bg-white p-[10px]">
      <button className="size-[40px] flex items-center justify-center">
        <img src={icons.clock} alt="icon" width={30} />
      </button>
      <button className="size-[40px] flex items-center justify-center">
        <img src={icons.layer} alt="icon" width={30} />
      </button>
      <button className="size-[40px] flex items-center justify-center border-b">
        <img src={icons.lightP} alt="icon" width={30} />
      </button>
      <button className="size-[40px] flex items-center justify-center">
        <img src={icons.msgSquare} alt="icon" width={30} />
      </button>
      <button className="size-[40px] flex items-center justify-center">
        <img src={icons.light} alt="icon" width={30} />
      </button>
    </div>
  );
}

export default RightSideBar;
