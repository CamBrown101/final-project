import React, { useState } from 'react';
import './ProductionOrder.scss';
import './ProductionOrderItem';
import ProductionOrderItem from './ProductionOrderItem';

export default function ProductionOrder(props) {
  // const orders = props.items.map((item) => {
  //   return <ProductionOrderItem />
  // })
  const [selectedItems, setSelectedItems] = useState([]);
  return (
    <div className="prod-order">
      <h3> ORDER NUMBER</h3>
      orders
      <br />
      <ProductionOrderItem
        id="1"
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
      />
      <ProductionOrderItem
        id="2"
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
      />
      <ProductionOrderItem
        id="3"
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
      />
      <ProductionOrderItem
        id="4"
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
      />
    </div>
  );
}
