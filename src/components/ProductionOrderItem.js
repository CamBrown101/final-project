import React from "react";
import "./ProductionOrderItem.scss";

export default function ProductionOrderItem({ name, price }) {
  return (
    <li className="production-order-item">
      <p className="item-name">{name}</p>
      <p className="item-price">${price.toFixed(2)}</p>
    </li>
  );
}
