import { useQuery } from "react-query";

export const getUseLatestCoinsQueryKey = (limit) => [
  'getLatestCoins',
  limit
];

export const useLatestCoinsByLimit = ({ limit } = { limit: 100 }, queryConfig) => useQuery(
  getUseLatestCoinsQueryKey(limit),
  async () => {
    const resp = await fetch(`/cryptocurrency/listings/latest?limit=${limit}`, {
      // ideally, this key is set up in an Env variable
      // and all the requests towards this api are intercepted, and, while proxying, the auth headers are added,
      // so you don't have to manually add them for each request
      headers: {
        'X-CMC_PRO_API_KEY': 'eac62381-b848-47e3-87e8-ae8323d2f3cd'
      }
    });
    if (!resp.ok) {
      throw (resp);
    }
    return resp.json();
  },
  queryConfig,
);
