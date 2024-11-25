import icons from "@/assets/icons";

interface CustomTitleProps {
  title: string;
  onPress?: () => void;
  hasSearchInput?: boolean;
}

function CustomTitle({
  title,
  onPress,
  hasSearchInput = false,
}: CustomTitleProps) {
  return (
    <div className="flex items-center justify-between group gap-[8px]">
      <span className="text-[12px] font-medium uppercase">{title}</span>
      {hasSearchInput && (
        <div className="p-[5px] rounded-[4px] border flex items-center justify-between gap-[4px] bg-transparent focus-within:bg-white transition-colors duration-300">
          <img src={icons.search} alt="icon-search" width={20} />
          <input
            placeholder=""
            className="h-full w-full bg-transparent focus:bg-white focus:outline-none"
          />
        </div>
      )}
      <button onClick={onPress}>
        <img
          src={icons.slider}
          alt="icon"
          className="w-[14px] opacity-0 group-hover:opacity-100 transition-opacity"
        />
      </button>
    </div>
  );
}

export default CustomTitle;
