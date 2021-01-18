import React, { useState } from "react";
import "./ProductionOrder.scss";
import "./ProductionOrderItem";
import ProductionOrderItem from "./ProductionOrderItem";

export default function ProductionOrder(props) {
  const [selectedItems, setSelectedItems] = useState([]);
  const orders = props.items.map((item) => {
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
  console.log(props.items);

  return (
    <div className="prod-order">
      <h3> ORDER NUMBER: {props.items[0].order_id}</h3>
      {orders}
    </div>
  );
}
