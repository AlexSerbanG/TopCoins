import { useQuery } from "react-query";

export const getUseLatestCoinsQueryKey = ({ limit }) => [
  'getLatestCoints',
  limit
];

export const useLatestCoins = ({ limit } = { limit: 100 }, queryConfig) => useQuery(
  getUseLatestCoinsQueryKey(limit),
  async () => {
    const resp = await fetch(`/cryptocurrency/listings/latest`, {
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
