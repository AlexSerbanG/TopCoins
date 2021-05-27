import { useContext, useMemo } from "react";
import { useLatestCoinsByLimit } from "../api/queries/useLatestCoinsByLimit"
import { ResultSizeContext } from "../components/contexts/ResultSizeContext";

const defaultCurrency = "USD";

export const useLatestCoins = (config) => {
  const { resultsSize } = useContext(ResultSizeContext);
  const { data, ...rest } = useLatestCoinsByLimit({ limit: resultsSize }, {
    placeholderData: { data: [] },
    ...config
  });
  const tableData = useMemo(() => data?.data?.map(
    ({ id, name, cmc_rank, quote }) => {
      const { price, percent_change_24h, market_cap, volume_24h } = quote[defaultCurrency];
      return {
        id,
        name,
        rank: cmc_rank,
        price: price.toFixed(2),
        priceChange: percent_change_24h, //.toFixed(2),
        marketCap: market_cap, //.toFixed(2),
        volume: volume_24h, //.toFixed(2),
      };
    }
  ),
    [data?.data]);

  return {
    data: tableData,
    ...rest,
  }
}
