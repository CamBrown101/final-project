import axios from 'axios';
import React from 'react';
import './ProductionContainer.scss';
import './ProductionOrder';
import ProductionOrder from './ProductionOrder';
import Axios from 'axios';

export default function ProductionContainer(props) {
  Axios.get(`/api/orders/production`).then((orders) => {
    console.log(orders);
  });
  return (
    <div className="prod-container">
      <h1>Production SCreen</h1>
      <div className="prod-order-container">
        <ProductionOrder items={props.items} id="1" />
        <ProductionOrder items={props.items} id="2" />
        <ProductionOrder items={props.items} id="3" />
      </div>
    </div>
  );
}
