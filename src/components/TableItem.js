import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import "./TableItem.scss";
import Axios from "axios";
export default function TableItem(props) {
  const { user } = useContext(UserContext);
  const getOrders = () => {
    const newItems = [];
    Axios.get(`/api/tables/${props.id}/current-order`).then((res) => {
      const orderId = res.data.id;
      if (res.data.id) {
        const orderId = res.data.id;
        Axios.get(`/api/orders/${res.data.id}/items`).then((res) => {
          newItems.push(res.data);
          props.setTable({
            id: props.id,
            employee: props.employee,
            seats: props.seats,
            items: newItems,
            orderId: orderId,
          });
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
  return (
    <div
      className="table-item"
      onClick={() => {
        getOrders();
      }}
    >
      <h3>Employee: {props.employee}</h3>
      <h3>Seats: {props.seats}</h3>
      <br />
    </div>
  );
}
