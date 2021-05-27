import * as React from 'react';
import { useTable } from 'react-table';
import MaUTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { CircularProgress } from '@material-ui/core';
import { useLatestCoins } from '../../hooks/useLatestCoins';

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
