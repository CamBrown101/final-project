import React from "react";
import "./ProductionContainer.scss";
import "./ProductionOrder";
import ProductionOrder from "./ProductionOrder";

export default function ProductionContainer(props) {
  console.log(props.location);
  return (
    <div class="prod-container">
      <h1>Production SCreen</h1>
      <ProductionOrder items={props.items} />
    </div>
  );
}
