import React from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { Table } from './components';
import './App.css'
import { makeData } from './utils'
import { Person } from "./types";

function App() {
  const rerender = React.useReducer(() => ({}), {})[1];
  const getColumnId = (props: { column: { id: unknown; }; }) => props.column.id;
  const getCellValue = (info: { getValue: () => unknown; }) => info.getValue();

  const columns = React.useMemo<ColumnDef<Person>[]>(() => [
    {
      Header: () => null,
      id: 'expander',
      cell: ({ row }) => (
        <button
          {...{
            onClick: row.getToggleExpandedHandler(),
            style: { cursor: 'pointer' },
          }}
        >
          {row.getIsExpanded() ? '👇' : '👉'}
        </button>
      ),
    },
    {
      header: 'Name',
      footer: getColumnId,
      columns: [
        {
          accessorKey: 'firstName',
          cell: ({ row, getValue }) => (
            <div
              style={{
                paddingLeft: `${row.depth * 2}rem`,
              }}
            >
              {getValue()}
            </div>
          ),
          footer: getColumnId,
        }, {
          accessorKey: 'lastName',
          cell: getCellValue,
          footer: getColumnId,
        }, {
          accessorFn: (row : Person) => (`${row.firstName} ${row.lastName}`),
          id: 'fullName',
          cell: getCellValue,
          footer: getColumnId,
        }
      ],
    },
    {
      header: 'Info',
      footer: getColumnId,
      columns: [
        {
          accessorKey: 'age',
          header: 'Age',
          footer: getColumnId,
        },
        {
          header: 'More Info',
          columns: [
            {
              accessorKey: 'visits',
              header: 'Visits',
              footer: getColumnId,
            },
            {
              accessorKey: 'status',
              header: 'Status',
              footer: getColumnId,
            },
            {
              accessorKey: 'progress',
              header: 'Profile Progress',
              footer: getColumnId,
            },
          ],
        },
      ],
    },
  ], []);

  const [data, setData] = React.useState(() => makeData(100, 2));
  const refreshData = () => setData(() => makeData(100, 2));


  console.log('app', data, columns);

  return (
    <>
      <Table {...{data, columns}} />
      <hr />
      <div>
        <button onClick={() => rerender()}>Force Rerender</button>
      </div>
      <div>
        <button onClick={() => refreshData()}>Refresh Data</button>
      </div>
    </>
  )
}

export default App;
