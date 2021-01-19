import React from 'react';
import TableItem from './TableItem';
import './TableContainer.scss';

export default function TableContainer({
  bill,
  setTable,
  setBill,
  tables,
  table,
}) {
  const tableItems = tables.map((tableInfo) => (
    <TableItem
      key={tableInfo.id}
      id={tableInfo.id}
      employee={tableInfo.firstname}
      seats={tableInfo.number_of_seats}
      status={tableInfo.status}
      setTable={setTable}
      setBill={setBill}
      table={table}
      bill={bill}
    />
  ));

  return <div className="table-container">{tableItems}</div>;
}
