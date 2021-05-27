import * as React from 'react';
import { useLatestCoins } from '../api/queries/useLatestCoins';

export const MarketOverview = () => {
  const { data, isLoading, } = useLatestCoins();
  return <ul>
    {data?.map(i => <li key={i.id}>{i.name}</li>)}
  </ul>
}
