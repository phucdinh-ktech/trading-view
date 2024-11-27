import dayjs from "dayjs";
import toast from "react-hot-toast";

const unitData: Record<string, string> = {
  y: "year",
  m: "month",
  d: "day",
};
const generateDays = (period: string): number => {
  const today = dayjs();
  const value = parseInt(period.slice(0, -1), 10);
  const unit = period.slice(-1).toLowerCase();

  // Ensure the unit is valid
  if (!["y", "m", "d"].includes(unit)) {
    toast.error("Invalid period unit. Must be 'Y', 'M', or 'D'.");
    throw new Error("Invalid period unit. Must be 'Y', 'M', or 'D'.");
  }

  const fullUnit = unitData[unit] as "year" | "month" | "day";

  console.log("fullUnit", fullUnit);
  const subTract = today.subtract(value, fullUnit);

  return today.diff(subTract, "day");
};

export default generateDays;
