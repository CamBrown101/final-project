import React from "react";
import "./ProductionOrder.scss";
import "./ProductionOrderItem";
import ProductionOrderItem from "./ProductionOrderItem";

export default function ProductionOrder(props) {
  const orders = props.items.map((item) => {
    return <ProductionOrderItem name={item.name} mods={item.mods} />;
  });
  console.log(props.items);
  return (
    <div className="prod-order">
      <h3> ORDER NUMBER: {props.items[0].order_id}</h3>
      {orders}
      <br />
    </div>
  );
}
