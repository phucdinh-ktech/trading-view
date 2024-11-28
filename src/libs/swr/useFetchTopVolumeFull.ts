import queryString from "query-string";
import useSWR from "swr";

import { urls } from "@/constants/urls";
import { fetcher } from "@/libs/swr/fetcher";
import { ParamsQueryType } from "@/types/common/paramsQuery";
import { VolumeResponseType } from "@/types/response/volume";

export type CustomVolumeFullType = {
  Id: string;
  FullName: string;
  Internal: string;
  FullVolume?: number;
  ImageUrl: string;
  PercentChange?: number;
  Price?: number;
  ToSymbol?: string;
};
const useFetchTopVolumeFull = (params: ParamsQueryType) => {
  const url = queryString.stringifyUrl({
    url: urls.TOP_VOLUME_FULL,
    query: params,
  });

  const { data, isLoading, error, isValidating, mutate } =
    useSWR<VolumeResponseType>(url, fetcher);

  const showData: CustomVolumeFullType[] = [];

  for (const dataItem of data?.Data || []) {
    const customData = {
      Id: dataItem.CoinInfo.Id,
      FullName: dataItem.CoinInfo.FullName,
      Internal: dataItem.CoinInfo.Internal,
      FullVolume: dataItem.RAW?.USD.VOLUMEDAY,
      ImageUrl:
        "https://www.cryptocompare.com/media" + dataItem.CoinInfo.ImageUrl,
      PercentChange: Number(dataItem.RAW?.USD.CHANGEPCTDAY),
      Price: dataItem.RAW?.USD.PRICE,
      ToSymbol: dataItem.RAW?.USD.TOSYMBOL,
    };
    showData.push(customData);
  }
  return {
    data: data?.Data || [],
    showData,
    isLoading,
    error,
    isValidating,
    mutate,
  };
};

export default useFetchTopVolumeFull;
