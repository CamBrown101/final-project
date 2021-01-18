import React from "react";
import "./ProductionContainer.scss";
import "./ProductionOrder";
import ProductionOrder from "./ProductionOrder";

export default function ProductionContainer(props) {
  const orderElements = props.location.state.orders.map((order) => {
    return <ProductionOrder items={order} />;
  });
  return (
    <div className="prod-screen">
      <h1>Production Screen</h1>
      <div className="prod-container">{orderElements}</div>
    </div>
  );
}
