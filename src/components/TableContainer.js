import React from 'react';
import TableItem from './TableItem';
import './TableContainer.scss';

export default function TableContainer({ setTable, setBill, tables }) {
  const menuItems = tables.map((table) => (
    <TableItem
      key={table.id}
      id={table.id}
      employee={table.firstname}
      seats={table.number_of_seats}
      status={table.status}
      setTable={setTable}
      setBill={setBill}
    />
  ));

  return <div className="table-container">{menuItems}</div>;
}
