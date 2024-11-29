import dayjs from "dayjs";
import { UTCTimestamp } from "lightweight-charts";

const tickMarkFormatter_func = (ts: UTCTimestamp, dayLimit: number) => {
  const format = dayjs.unix(ts);
  if (dayLimit > 5) {
    if (format.isSame(format.startOf("year"), "day"))
      return format.format("YYYY");
    if (format.isSame(format.startOf("month"), "day"))
      return format.format("MMM");
    return format.format("DD");
  }

  if (format.format("HH:mm") === "00:00") return dayjs.unix(ts).format("DD");
  return format.format("HH:mm");
};

export default tickMarkFormatter_func;
