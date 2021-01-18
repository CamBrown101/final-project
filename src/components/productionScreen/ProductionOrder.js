import React, { useState } from 'react';
import './ProductionOrder.scss';
import './ProductionOrderItem';
import ProductionOrderItem from './ProductionOrderItem';

export default function ProductionOrder({
  setSelectedOrders,
  selectedOrders,
  id,
}) {
  const [selectedItems, setSelectedItems] = useState([]);
  // const orders = props.items.map((item) => {
  //   return <ProductionOrderItem />
  // })
  let cssClass = '';
  if (selectedOrders.find((ele) => ele === id)) {
    cssClass = 'order-selected';
  }
  return (
    <div
      className={'prod-order ' + cssClass}
      onClick={() => {
        setSelectedOrders([...selectedOrders, id]);
        if (selectedOrders.find((ele) => ele === id)) {
          cssClass = '';
          setSelectedOrders(
            [...selectedOrders].splice(
              [...selectedOrders].find((ele) => ele === id),
              1
            )
          );
        }
      }}>
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
