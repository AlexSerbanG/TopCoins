import * as React from 'react';
import { useTable } from 'react-table';
import MaUTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { useLatestCoins } from '../../api/queries/useLatestCoins';
import { CircularProgress } from '@material-ui/core';

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  })

  // Render the UI for your table
  return (
    <MaUTable {...getTableProps()}>
      <TableHead>
        {headerGroups.map(headerGroup => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <TableCell {...column.getHeaderProps()}>
                {column.render('Header')}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <TableRow {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <TableCell {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </TableCell>
                )
              })}
            </TableRow>
          )
        })}
      </TableBody>
    </MaUTable>
  )
}

const defaultCurrency = "USD";

export const MarketOverview = () => {
  const { data, isLoading, isError } = useLatestCoins({ limit: 100 }, { placeholderData: { data: [] } });
  const tableData = React.useMemo(() => data?.data?.map(
    ({ id, name, cmc_rank, quote }) => {
      const { price, percent_change_24h, market_cap, volume_24h } = quote[defaultCurrency];
      return {
        id,
        name,
        rank: cmc_rank,
        price: price.toFixed(2),
        priceChange: `${percent_change_24h.toFixed(2)}%`,
        marketCap: market_cap.toFixed(2),
        volume: volume_24h.toFixed(2),
      };
    }
  ),
    [data?.data]);

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
        accessor: 'price',
      },
      {
        Header: 'Price change (24h)',
        accessor: 'priceChange',
      },
      {
        Header: 'Market Cap',
        accessor: 'marketCap',
      },
      {
        Header: 'Volume (24h)',
        accessor: 'volume',
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
      <Table columns={columns} data={tableData} />
    </div>
  )
}
