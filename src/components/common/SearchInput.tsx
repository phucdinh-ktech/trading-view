import icons from "@/assets/icons";

function SearchInput() {
  return (
    <div className="bg-[#F0F3FA] rounded-[20px] max-w-[300px] flex items-center gap-[10px] p-[10px] ">
      <img src={icons.search} alt="search-icon" />
      <input
        placeholder="Tìm kiếm (Ctrl+K)"
        className="bg-transparent focus-within:outline-none"
      />
    </div>
  );
}

export default SearchInput;
