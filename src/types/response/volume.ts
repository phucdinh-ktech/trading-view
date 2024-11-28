export type CoinInfoType = {
  Id: string;
  Name: string;
  FullName: string;
  Internal: string;
  ImageUrl: string;
  Url: string;
  Algorithm: string;
  ProofType: string;
  AssetLaunchDate?: string;
  MaxSupply: number;
  BlockNumber?: number;
  BlockTime?: number;
  BlockReward?: number;
};

export type MarketDataType = {
  USD: {
    TYPE: string;
    MARKET: string;
    FROMSYMBOL: string;
    TOSYMBOL: string;
    FLAGS: string;
    LASTMARKET: string;
    PRICE: number;
    LASTUPDATE: number;
    LASTVOLUME: number;
    LASTVOLUMETO: number;
    VOLUMEHOUR: number;
    VOLUMEHOURTO: number;
    OPENHOUR: number;
    HIGHHOUR: number;
    LOWHOUR: number;
    VOLUMEDAY: number;
    VOLUMEDAYTO: number;
    OPENDAY: number;
    HIGHDAY: number;
    LOWDAY: number;
    VOLUME24HOUR: number;
    VOLUME24HOURTO: number;
    OPEN24HOUR: number;
    HIGH24HOUR: number;
    LOW24HOUR: number;
    CHANGE24HOUR: number;
    CHANGEPCT24HOUR: number;
    CHANGEDAY: number;
    CHANGEPCTDAY: number;
    CHANGEHOUR: number;
    CHANGEPCTHOUR: number;
    SUPPLY: number;
    MKTCAP: number;
    CIRCULATINGSUPPLY?: number;
    TOTALVOLUME24H?: number;
    TOTALVOLUME24HTO?: number;
  };
};

export type DisplayDataType = {
  USD: {
    FROMSYMBOL: string;
    TOSYMBOL: string;
    MARKET: string;
    PRICE: string;
    LASTUPDATE: string;
    LASTVOLUME: string;
    LASTVOLUMETO: string;
    VOLUMEHOUR: string;
    VOLUMEHOURTO: string;
    OPENHOUR: string;
    HIGHHOUR: string;
    LOWHOUR: string;
    VOLUMEDAY: string;
    VOLUMEDAYTO: string;
    OPENDAY: string;
    HIGHDAY: string;
    LOWDAY: string;
    VOLUME24HOUR: string;
    VOLUME24HOURTO: string;
    OPEN24HOUR: string;
    HIGH24HOUR: string;
    LOW24HOUR: string;
    CHANGE24HOUR: string;
    CHANGEPCT24HOUR: string;
    CHANGEDAY: string;
    CHANGEPCTDAY: string;
    CHANGEHOUR: string;
    CHANGEPCTHOUR: string;
    SUPPLY: string;
    MKTCAP: string;
    CIRCULATINGSUPPLY?: string;
    TOTALVOLUME24H?: string;
    TOTALVOLUME24HTO?: string;
    IMAGEURL: string;
  };
};

export type CoinDataType = {
  CoinInfo: CoinInfoType;
  RAW?: MarketDataType;
  DISPLAY?: DisplayDataType;
};

export type VolumeResponseType = {
  Message: string;
  Type: number;
  MetaData: object;
  Count: number;
  SponsoredData: object[];
  Data: CoinDataType[];
};
