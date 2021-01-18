import React, { useState } from 'react';
import './ProductionOrder.scss';
import './ProductionOrderItem';
import ProductionOrderItem from './ProductionOrderItem';

export default function ProductionOrder({
  setSelectedOrders,
  selectedOrders,
  id,
  items,
}) {
  const [selectedItems, setSelectedItems] = useState([]);
  let cssClass = '';
  if (selectedOrders.find((ele) => ele === id)) {
    cssClass = 'order-selected';
  }
  const orders = items.map((item) => {
    return (
      <ProductionOrderItem
        id={item.id}
        name={item.name}
        mods={item.mods}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
      />
    );
  });

  // const orders = props.items.map((item) => {
  //   return <ProductionOrderItem />
  // })

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
      <h3> ORDER NUMBER: {items[0].order_id}</h3>
      {orders}
    </div>
  );
}
