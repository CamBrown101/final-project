import React from 'react';
import './TableItem.scss';
import Axios from 'axios';

export default function TableItem(props) {
  const getOrders = () => {
    const newItems = [];
    console.log(props.id);
    Axios.get(`/api/tables/${props.id}/current-order`).then((res) => {
      if (res.data.id) {
        Axios.get(`/api/orders/${res.data.id}/items`).then((res) => {
          newItems.push(res.data);
          props.setTable({
            id: props.id,
            employee: props.employee,
            seats: props.seats,
            items: newItems,
          });
        });
        // } else {
        //   // CREATE ORDER
        //   const data = {}
        //   Axios.post(`/api/orders/`.then((res) => {}
      }
      // });
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
