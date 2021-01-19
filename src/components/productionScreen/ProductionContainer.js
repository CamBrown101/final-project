import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import './ProductionContainer.scss';
import './ProductionOrder';
import ProductionOrder from './ProductionOrder';

export default function ProductionContainer(props) {
  const [orders, setOrders] = useState([]);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const data = { is_food: props.location.is_food };
  useEffect(() => {
    Axios.get(`/api/orders/production`, data).then((res) => {
      const orderItems = res.data;
      const orders = [];
      orderItems.forEach((item) => {
        orders[item.order_id] = orders[item.order_id]
          ? [...orders[item.order_id], item]
          : [item];
      });
      setOrders(orders);
    });
    //Turn off live update uncommit below code
    // }, []);
  }, [orders]);
  //Turn off auto update comment out above code ^^
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
  let title;
  if (props.location.is_food) {
    title = 'Food';
  } else {
    title = 'Drink';
  }

  return (
    <div className="prod-container">
      <h1>{`${title} Production Screen`}</h1>

      <div className="prod-order-container">{orderElements}</div>
    </div>
  );
}
