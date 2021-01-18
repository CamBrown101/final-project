import axios from 'axios';
import React, { useState } from 'react';
import './ProductionContainer.scss';
import './ProductionOrder';
import ProductionOrder from './ProductionOrder';
import Axios from 'axios';

export default function ProductionContainer(props) {
  const [selectedOrders, setSelectedOrders] = useState([]);
  Axios.get(`/api/orders/production`).then((orders) => {
    console.log(props.location);
  });
  return (
    <div className="prod-container">
      <h1>Production SCreen</h1>
      <div className="prod-order-container">
        <ProductionOrder
          items={props.items}
          id="1"
          selectedOrders={selectedOrders}
          setSelectedOrders={setSelectedOrders}
        />
        <ProductionOrder
          items={props.items}
          id="2"
          selectedOrders={selectedOrders}
          setSelectedOrders={setSelectedOrders}
        />
        <ProductionOrder
          items={props.items}
          id="3"
          selectedOrders={selectedOrders}
          setSelectedOrders={setSelectedOrders}
        />
      </div>
    </div>
  );
}
