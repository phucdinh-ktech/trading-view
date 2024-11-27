import {
  CandlestickData,
  HistogramData,
  UTCTimestamp,
} from "lightweight-charts";
import queryString from "query-string";
import useSWR from "swr";

import { urls } from "@/constants/urls";
import { fetcher } from "@/libs/swr/fetcher";
import { ParamsQueryType } from "@/types/common/paramsQuery";
import { HistoType } from "@/types/response/histo";

export const useFetchMinute = (params: ParamsQueryType) => {
  const url = queryString.stringifyUrl({
    url: urls.HISTO_MiMUTE,
    query: {
      ...params,
      limit: params.limit || 0 * 24,
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, isLoading, error, isValidating, mutate } = useSWR<HistoType>(
    url,
    fetcher
  );

  const dataCandleStick: CandlestickData[] = [];
  const dataHistogram: HistogramData[] = [];

  for (const dataHis of data?.Data?.Data || []) {
    dataCandleStick.push({
      time: dataHis.time,
      open: dataHis.open,
      close: dataHis.close,
      low: dataHis.low,
      high: dataHis.high,
    });

    dataHistogram.push({
      time: dataHis.time,
      value: dataHis.open - dataHis.close,
    });
  }
  return {
    data,
    dataCandleStick,
    dataHistogram,
    isLoading,
    error,
    isValidating,
    mutate,
  };
};

export const useFetchHour = (params: ParamsQueryType) => {
  const limit = params.limit || 0;

  const selectUrl = limit > 7 ? urls.HISTO_DAY : urls.HISTO_HOUR;

  const selectLimit = limit > 15 ? limit : limit > 5 ? limit * 12 : limit * 24;

  const url = queryString.stringifyUrl({
    url: selectUrl,
    query: {
      ...params,
      limit: selectLimit,
    },
  });

  console.log("queryString.stringifyUrl", {
    url: selectUrl,
    query: {
      ...params,
      limit: selectLimit,
    },
    limit,
  });

  const { data, isLoading, error, isValidating, mutate } = useSWR<HistoType>(
    url,
    fetcher
  );

  const dataCandleStick: CandlestickData[] = [];
  const dataHistogram: HistogramData[] = [];

  for (const dataHis of data?.Data?.Data || []) {
    dataCandleStick.push({
      time: (Number(dataHis.time) + 7 * 60 * 60) as UTCTimestamp,
      open: dataHis.open,
      close: dataHis.close,
      low: dataHis.low,
      high: dataHis.high,
    });

    dataHistogram.push({
      time: (Number(dataHis.time) + 7 * 60 * 60) as UTCTimestamp,
      value: dataHis.volumefrom,
    });
  }
  return {
    data,
    dataCandleStick,
    dataHistogram,
    isLoading,
    error,
    isValidating,
    mutate,
  };
};

export const useFetchDay = (params: ParamsQueryType) => {
  const url = queryString.stringifyUrl({
    url: urls.HISTO_DAY,
    query: params,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, isLoading, error, isValidating, mutate } = useSWR<HistoType>(
    url,
    fetcher
  );

  const dataCandleStick: CandlestickData[] = [];
  const dataHistogram: HistogramData[] = [];

  for (const dataHis of data?.Data?.Data || []) {
    dataCandleStick.push({
      time: dataHis.time,
      open: dataHis.open,
      close: dataHis.close,
      low: dataHis.low,
      high: dataHis.high,
    });

    dataHistogram.push({
      time: dataHis.time,
      value: dataHis.volumefrom,
    });
  }
  return {
    data,
    dataCandleStick,
    dataHistogram,
    isLoading,
    error,
    isValidating,
    mutate,
  };
};
