import React, { useState } from "react";

interface DataItem {
  group?: string;
  symbol: string;
  last: number;
  chg: number;
  "chg%": string;
  icon?: string;
}

type SortDirection = "asc" | "desc" | null;

interface DataTableProps {
  data: DataItem[];
  grouped: boolean;
}

const DataTable: React.FC<DataTableProps> = ({
  data: initialData,
  grouped,
}) => {
  const [data, setData] = useState<DataItem[]>(initialData);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof DataItem | null;
    direction: SortDirection;
  }>({ key: null, direction: null });

  const handleSort = (key: keyof DataItem) => {
    let direction: SortDirection = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sortedData = [...data].sort((a, b) => {
      const aValue = a[key] ?? "";
      const bValue = b[key] ?? "";

      if (aValue < bValue) {
        return direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    setSortConfig({ key, direction });
    setData(sortedData);
  };

  return (
    <div className="overflow-x-auto w-full">
      <table className="table-auto w-full border-collapse text-left">
        <thead>
          <tr>
            {["symbol", "last", "chg", "chg%"].map(key => (
              <th
                key={key}
                className="py-2 px-4 border-b cursor-pointer text-[12px]"
                onClick={() => handleSort(key as keyof DataItem)}
              >
                <div className="flex items-center gap-2">
                  <span className="capitalize font-medium">{key}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {!grouped &&
            data.map((item, index) => (
              <tr key={`no-group-${index}`} className="hover:bg-gray-100">
                <td
                  className={`py-2 px-4 border-b text-[12px] flex items-center gap-2`}
                >
                  {item.icon && (
                    <img
                      src={item.icon}
                      alt={item.symbol}
                      className="w-5 h-5 rounded-full"
                    />
                  )}
                  {item.symbol}
                </td>
                <td className="py-2 px-4 border-b text-[12px]">
                  {item.last.toFixed(2)}
                </td>
                <td
                  className={`py-2 px-4 border-b text-[12px] ${
                    item.chg > 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {item.chg.toFixed(2)}
                </td>
                <td
                  className={`py-2 px-4 border-b text-[12px] ${
                    item["chg%"].startsWith("-")
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {item["chg%"]}
                </td>
              </tr>
            ))}

          {grouped &&
            Object.entries(
              data.reduce(
                (groups, item) => {
                  const groupKey = item.group || "UNGROUPED";
                  if (!groups[groupKey]) groups[groupKey] = [];
                  groups[groupKey].push(item);
                  return groups;
                },
                {} as Record<string, DataItem[]>
              )
            ).map(([group, items]) => (
              <React.Fragment key={group}>
                <tr className="hover:bg-[#F0F3FA] cursor-pointer w-full text-[#999]">
                  <td
                    colSpan={4}
                    className="py-2 px-4 font-medium text-[12px] flex items-center gap-[4px]"
                  >
                    {group.toUpperCase()}
                  </td>
                </tr>
                {items.map((item, index) => (
                  <tr key={`${group}-${index}`} className="hover:bg-gray-100">
                    <td
                      className={`py-2 px-4 border-b text-[12px] flex items-center gap-2`}
                    >
                      {item.icon && (
                        <img
                          src={item.icon}
                          alt={item.symbol}
                          className="w-5 h-5 rounded-full"
                        />
                      )}
                      {item.symbol}
                    </td>
                    <td className="py-2 px-4 border-b text-[12px]">
                      {item.last.toFixed(2)}
                    </td>
                    <td
                      className={`py-2 px-4 border-b text-[12px] ${
                        item.chg > 0 ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {item.chg.toFixed(2)}
                    </td>
                    <td
                      className={`py-2 px-4 border-b text-[12px] ${
                        item["chg%"].startsWith("-")
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                    >
                      {item["chg%"]}
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
