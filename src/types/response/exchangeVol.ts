import { UTCTimestamp } from "lightweight-charts";

export type DataExchangeVolType = {
  time: UTCTimestamp;
  volume: number;
};
export type ExchangeVolType = {
  Type: number;
  Message: string;
  Data: DataExchangeVolType[];
  TimeFrom: number;
  TimeTo: number;
  FirstValueInArray: boolean;
  ConversionType: string;
  //   RateLimit: Record<string, any>;
  HasWarning: boolean;
};
