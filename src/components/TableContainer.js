import React from "react";
import TableItem from "./TableItem";
import "./TableContainer.scss";

export default function TableContainer(props) {
  const menuItems = props.tables.map((table) => (
    <TableItem
      key={table.id}
      employee={table.firstname}
      seats={table.number_of_seats}
      status={table.status}
    />
  ));

  return <div className="table-container">{menuItems}</div>;
}
