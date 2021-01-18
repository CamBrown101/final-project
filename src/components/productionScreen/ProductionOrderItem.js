import React from "react";
import "./ProductionOrderItem.scss";

export default function ProductionOrderItem({ name, mods }) {
  const modBoolean = mods === "null";
  return (
    <li>
      <div className="prod-item">
        <p className="prod-item-name">name</p>
      </div>
      {!modBoolean ? <p className="mod">mods</p> : <></>}
    </li>
  );
}
