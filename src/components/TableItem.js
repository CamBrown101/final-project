import React from 'react';
import './TableItem.scss';
import Axios from 'axios';

export default function TableItem(props) {
  const getOrders = () => {
    const newItems = [];
    Axios.get(`/api/orders/${props.id}/items`).then((res) => {
      newItems.push(res.data);
      props.setTable({
        id: props.id,
        employee: props.employee,
        seats: props.seats,
        items: newItems,
      });
    });
  };

  return (
    <div
      className="table-item"
      onClick={() => {
        getOrders();
      }}>
      <h3>Employee: {props.employee}</h3>
      <h3>Seats: {props.seats}</h3>
      <br />
    </div>
  );
}
