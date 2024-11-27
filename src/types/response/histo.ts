import { UTCTimestamp } from "lightweight-charts";

export type DataHistoType = {
  close: number;
  conversionSymbol: string;
  conversionType: string;
  high: number;
  low: number;
  open: number;
  time: UTCTimestamp;
  volumefrom: number;
  volumeto: number;
};
export type DataType = {
  Aggregated: boolean;
  Data: DataHistoType[];
  TimeFrom: UTCTimestamp;
  TimeTo: UTCTimestamp;
};

export type HistoType = {
  Data: DataType;
  DataType: boolean;
  Message: string;
  Response: string;
  Type: number;
};
