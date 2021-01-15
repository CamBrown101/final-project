import React from 'react';
import './TableItem.scss';

export default function TableItem(props) {
  return (
    <div
      className="table-item"
      onClick={() =>
        props.setTable({
          id: props.id,
          employee: props.employee,
          seats: props.seats,
        })
      }>
      <h3>Employee: {props.employee}</h3>
      <h3>Seats: {props.seats}</h3>
      <br />
    </div>
  );
}
