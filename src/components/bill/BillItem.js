import React from "react";
import "./BillItem.scss";
export default function BillItem({
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
    <li
      className={selected === id ? "bill-item selected" : "bill-item"}
      onClick={() => {
        if (selected === id) {
          setSelected(null);
        } else {
          setSelected(id);
        }
      }}
    >
      <div className="item">
        <p>{seat}</p>
        <p className="item-name">{name}</p>
        <p className="item-price">${price.toFixed(2)}</p>
      </div>
      {!modBoolean ? <p className="mod">{mods}</p> : <></>}
    </li>
  );
}
