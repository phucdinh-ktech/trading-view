import { AreaData } from "lightweight-charts";
import queryString from "query-string";
import useSWR from "swr";

import { urls } from "@/constants/urls";
import { fetcher } from "@/libs/swr/fetcher";
import { ParamsQueryType } from "@/types/common/paramsQuery";
import { ExchangeVolType } from "@/types/response/exchangeVol";

export const useFetchExchangeVol = (params: ParamsQueryType) => {
  const limit = params.limit || 0;

  const selectUrl = limit > 7 ? urls.EXCHANGE_VOL_DAY : urls.EXCHANGE_VOL_HOUR;

  const selectLimit = limit > 15 ? limit : limit > 5 ? limit * 12 : limit * 24;
  const url = params.tsym
    ? queryString.stringifyUrl({
        url: selectUrl,
        query: {
          ...params,
          limit: selectLimit,
        },
      })
    : null;

  const { data, isLoading, error, isValidating, mutate } =
    useSWR<ExchangeVolType>(url, url ? fetcher : null);

  const exchangeVolChartData: AreaData[] = [];

  for (const item of data?.Data || []) {
    const customData = {
      time: item.time,
      value: item.volume,
    };

    exchangeVolChartData.push(customData);
  }
  return { data, exchangeVolChartData, isLoading, error, isValidating, mutate };
};
