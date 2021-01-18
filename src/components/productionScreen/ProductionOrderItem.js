import React from "react";
import "./ProductionOrderItem.scss";

export default function ProductionOrderItem({
  name,
  price,
  id,
  setSelected,
  selected,
  mods,
  seat,
}) {
  const modBoolean = mods === "null";
  return (
    <li>
      <div className="item">
        <p className="item-name">{name}</p>
      </div>
      {!modBoolean ? <p className="mod">{mods}</p> : <></>}
    </li>
  );
}
