import React, { useContext } from 'react';
import { UserContext } from '../UserContext';
import './TableItem.scss';
import Axios from 'axios';

export default function TableItem(props) {
  const { user } = useContext(UserContext);
  const getOrders = () => {
    const newItems = [];
    Axios.get(`/api/tables/${props.id}/current-order`).then((res) => {
      const orderId = res.data.id;
      if (orderId) {
        Axios.get(`/api/orders/${res.data.id}/items`).then((res) => {
          newItems.push(res.data);
          props.setTable({
            tableId: props.id,
            employee: props.employee,
            seats: props.seats,
            items: newItems,
            orderId: orderId,
          });
          console.log(newItems);
          // const newBill = newItems.map((item, index) => ({
          //   id: index,
          //   name: item.content,
          //   price: item.price,
          // }));
          // const total = (arr) => {
          //   let total = 0;
          //   for (const each of arr) {
          //     total = total + each.price;
          //   }
          //   return total;
          // };

          // const newTotal = total(newBill);
          // const newTax = newTotal * (12 / 100);
          // props.setBill({
          //   ...props.bill,
          //   items: newBill,
          //   tax: newTax,
          //   subtotal: newTotal,
          //   total: newTotal + newTax,
          // });
        });
      } else {
        // CREATE ORDER
        const data = { id: user.id, tableId: props.id };
        Axios.post(`/api/orders/`, data).then((res) => {
          props.setTable({
            id: props.id,
            employee: user.name,
            seats: props.seats,
            items: [],
          });
        });
      }
    });
  };

  const clearBill = () => {
    props.setBill({
      items: [],
      tax: 0,
      subtotal: 0,
      total: 0,
    });
    props.setTable([]);
  };

  return (
    <div
      className="table-item"
      onClick={() => {
        clearBill();
        getOrders();
      }}
    >
      <h3>Employee: {props.employee}</h3>
      <h3>Seats: {props.seats}</h3>
      <br />
    </div>
  );
}
