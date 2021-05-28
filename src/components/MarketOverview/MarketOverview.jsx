import * as React from 'react';
import { CircularProgress } from '@material-ui/core';
import { useLatestCoins } from '../../hooks/useLatestCoins';
import { Table } from '../common/MauTable';

export const MarketOverview = () => {
  const { data, isLoading, isError } = useLatestCoins();

  const columns = React.useMemo(
    () => [
      {
        Header: 'Rank',
        accessor: 'rank',
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Price',
        accessor: (rowData) => `$${Number(rowData.price).toFixed(2)}`,
      },
      {
        Header: 'Price change (24h)',
        accessor: (rowData) => `${Number(rowData.priceChange).toFixed(2)}%`,
      },
      {
        Header: 'Market Cap',
        accessor: (rowData) => `$${Number(rowData.marketCap).toFixed()}`,
      },
      {
        Header: 'Volume (24h)',
        accessor: (rowData) => `$${Number(rowData.volume).toFixed()}`,
      },
    ],
    []
  );
  if (isLoading) {
    return <CircularProgress color="inherit" />
  }
  if (isError) {
    return <div>Something went wrong. Come back later</div>
  }

  return (
    <div>
      <Table columns={columns} data={data} />
    </div>
  )
}
