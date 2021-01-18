import axios from 'axios';
import React, { useState } from 'react';
import './ProductionContainer.scss';
import './ProductionOrder';
import ProductionOrder from './ProductionOrder';

export default function ProductionContainer(props) {
  const [selectedOrders, setSelectedOrders] = useState([]);
  const orderElements = props.location.state.orders.map((order, index) => {
    return (
      <ProductionOrder
        items={order}
        id={index}
        selectedOrders={selectedOrders}
        setSelectedOrders={setSelectedOrders}
      />
    );
  });

  return (
    <div className="prod-container">
      <h1>Production Screen</h1>

      <div className="prod-order-container">{orderElements}</div>
    </div>
  );
}
