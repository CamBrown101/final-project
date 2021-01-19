import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import './ProductionContainer.scss';
import './ProductionOrder';
import ProductionOrder from './ProductionOrder';

export default function ProductionContainer(props) {
  const [orders, setOrders] = useState([]);
  const [selectedOrders, setSelectedOrders] = useState([]);
  console.log(orders);
  useEffect(() => {
    Axios.get(`/api/orders/production`).then((res) => {
      const orderItems = res.data;
      const orders = [];
      orderItems.forEach((item) => {
        orders[item.order_id] = orders[item.order_id]
          ? [...orders[item.order_id], item]
          : [item];
      });
      setOrders(orders);
    });
  }, [orders]);
  let orderElements = [];
  if (orders) {
    orderElements = orders.map((order, index) => {
      return (
        <ProductionOrder
          key={index}
          id={index}
          items={order}
          selectedOrders={selectedOrders}
          setSelectedOrders={setSelectedOrders}
        />
      );
    });
  }

  return (
    <div className="prod-container">
      <h1>Production Screen</h1>

      <div className="prod-order-container">{orderElements}</div>
    </div>
  );
}
